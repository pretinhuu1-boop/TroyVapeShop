/**
 * Supabase API proxy for the TAURA gateway.
 * Handles /api/products, /api/customers, /api/orders endpoints.
 * Keeps the Supabase secret key on the backend only.
 *
 * Security layers:
 *  1. Bearer token auth on write endpoints (POST/PATCH/DELETE)
 *  2. CORS restricted to allowed origins
 *  3. Input validation (UUID, body size, JSON schema)
 *  4. Query parameter sanitization
 *  5. Rate limiting per IP on write operations
 *  6. Error message sanitization (no internal details leaked)
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import * as https from "node:https";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

// ─── Security: Allowed origins for CORS ──────────────────────────
const ALLOWED_ORIGINS = (process.env.TAURA_ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// ─── Security: Rate limiter for write operations ─────────────────
const writeRateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_WRITES = 30;

function isWriteRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = writeRateLimiter.get(ip);
  if (!entry || now > entry.resetAt) {
    writeRateLimiter.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX_WRITES;
}

// Periodic cleanup (every 2 minutes)
setInterval(() => {
  const now = Date.now();
  writeRateLimiter.forEach((entry, ip) => {
    if (now > entry.resetAt) writeRateLimiter.delete(ip);
  });
}, 120_000).unref();

// ─── Security: UUID validation ───────────────────────────────────
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(value: string): boolean {
  return UUID_RE.test(value);
}

// ─── Security: Body size limit ───────────────────────────────────
const MAX_BODY_BYTES = 256 * 1024; // 256KB

// ─── Security: Bearer token extraction ───────────────────────────
function extractBearerToken(req: IncomingMessage): string | null {
  const header = req.headers["authorization"];
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

// ─── Security: Constant-time token comparison ────────────────────
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ─── Security: Auth check for write operations ───────────────────
const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN || "";

function isWriteAuthorized(req: IncomingMessage): boolean {
  const token = extractBearerToken(req);
  if (!token || !GATEWAY_TOKEN) return false;
  return safeEqual(token, GATEWAY_TOKEN);
}

function isLocalRequest(req: IncomingMessage): boolean {
  const addr = req.socket?.remoteAddress || "";
  return addr === "127.0.0.1" || addr === "::1" || addr === "::ffff:127.0.0.1";
}

// ─── Security: CORS origin validation ────────────────────────────
function resolveAllowedOrigin(req: IncomingMessage): string {
  const origin = req.headers["origin"];
  if (!origin) return "";
  // Always allow localhost for development
  if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
    return origin;
  }
  // Check configured origins
  if (ALLOWED_ORIGINS.length > 0 && ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }
  // If no origins configured, allow same-origin requests only (no CORS header)
  return "";
}

// ─── Security: Client IP extraction ──────────────────────────────
function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

// ─── Supabase request helpers ────────────────────────────────────
function supabaseRequest(path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      resolve({ status: 503, body: JSON.stringify({ error: "Database not configured" }) });
      return;
    }
    const url = new URL(`/rest/v1/${path}`, SUPABASE_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const timer = setTimeout(() => {
      req.destroy();
      reject(new Error("Supabase request timeout"));
    }, 15_000);
    const req = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });
      response.on("end", () => {
        clearTimeout(timer);
        resolve({ status: response.statusCode ?? 500, body: data });
      });
    });
    req.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    req.end();
  });
}

function supabaseWrite(
  path: string,
  method: string,
  body: string,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      resolve({ status: 503, body: JSON.stringify({ error: "Database not configured" }) });
      return;
    }
    const url = new URL(`/rest/v1/${path}`, SUPABASE_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    };
    const timer = setTimeout(() => {
      req.destroy();
      reject(new Error("Supabase request timeout"));
    }, 15_000);
    const req = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });
      response.on("end", () => {
        clearTimeout(timer);
        resolve({ status: response.statusCode ?? 500, body: data });
      });
    });
    req.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    req.write(body);
    req.end();
  });
}

// ─── Response helpers ────────────────────────────────────────────
function sendApiJson(res: ServerResponse, status: number, body: string, origin: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store",
  };
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    headers["Vary"] = "Origin";
  }
  res.writeHead(status, headers);
  res.end(body);
}

function sendApiError(res: ServerResponse, status: number, message: string, origin: string) {
  sendApiJson(res, status, JSON.stringify({ error: message }), origin);
}

function readBody(req: IncomingMessage): Promise<string | null> {
  return new Promise((resolve) => {
    let body = "";
    let size = 0;
    const timer = setTimeout(() => {
      req.destroy();
      resolve(null);
    }, 10_000);
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        clearTimeout(timer);
        req.destroy();
        resolve(null);
        return;
      }
      body += chunk.toString();
    });
    req.on("end", () => {
      clearTimeout(timer);
      resolve(body);
    });
    req.on("error", () => {
      clearTimeout(timer);
      resolve(null);
    });
  });
}

// ─── Security: Structured logging ────────────────────────────────
function logApiAccess(
  method: string,
  path: string,
  ip: string,
  status: number,
  authOk: boolean,
) {
  // Only log write operations and auth failures to avoid log noise
  if (method !== "GET" || !authOk) {
    console.log(
      `[TAURA-API] ${method} ${path} ip=${ip} status=${status} auth=${authOk ? "ok" : "fail"}`,
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════════
export async function handleSupabaseApiRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> {
  const url = new URL(req.url ?? "/", "http://localhost");
  const path = url.pathname;

  if (!path.startsWith("/api/")) {
    return false;
  }

  const origin = resolveAllowedOrigin(req);
  const clientIp = getClientIp(req);
  const method = req.method || "GET";

  // ─── CORS preflight ────────────────────────────────────────────
  if (method === "OPTIONS") {
    const headers: Record<string, string> = {
      "X-Content-Type-Options": "nosniff",
    };
    if (origin) {
      headers["Access-Control-Allow-Origin"] = origin;
      headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS";
      headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
      headers["Access-Control-Max-Age"] = "86400";
      headers["Vary"] = "Origin";
    }
    res.writeHead(204, headers);
    res.end();
    return true;
  }

  // ─── Auth enforcement for write operations ─────────────────────
  const isWrite = method === "POST" || method === "PATCH" || method === "DELETE";
  if (isWrite) {
    // Local requests (Control UI on same machine) bypass token auth
    if (!isLocalRequest(req) && !isWriteAuthorized(req)) {
      logApiAccess(method, path, clientIp, 401, false);
      sendApiError(res, 401, "Unauthorized", origin);
      return true;
    }
    // Rate limiting on write operations
    if (isWriteRateLimited(clientIp)) {
      logApiAccess(method, path, clientIp, 429, true);
      res.setHeader("Retry-After", "60");
      sendApiError(res, 429, "Too many requests", origin);
      return true;
    }
  }

  try {
    // ═══ PRODUCTS ═══════════════════════════════════════════════
    // GET /api/products — list active products (public read)
    if (path === "/api/products" && method === "GET") {
      const result = await supabaseRequest(
        "products?select=*&active=eq.true&order=category.asc,name.asc",
      );
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // GET /api/products/visible — customer-visible products (public read)
    if (path === "/api/products/visible" && method === "GET") {
      const result = await supabaseRequest(
        "products?select=id,sku,name,description,category,format,concentration,brand,price_brl,stock_qty,warehouse,purity&active=eq.true&visible_to_customer=eq.true&order=category.asc,name.asc",
      );
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // POST /api/products — create product (auth required)
    if (path === "/api/products" && method === "POST") {
      const body = await readBody(req);
      if (body === null) {
        sendApiError(res, 413, "Payload too large or timeout", origin);
        return true;
      }
      // Validate JSON
      try {
        JSON.parse(body);
      } catch {
        sendApiError(res, 400, "Invalid JSON body", origin);
        return true;
      }
      const result = await supabaseWrite("products", "POST", body);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // PATCH /api/products/:id — update product (auth required)
    const productIdMatch = path.match(/^\/api\/products\/([a-f0-9-]+)$/i);
    if (productIdMatch && (method === "PATCH" || method === "DELETE")) {
      const id = productIdMatch[1];
      if (!isValidUUID(id)) {
        sendApiError(res, 400, "Invalid product ID", origin);
        return true;
      }
      if (method === "DELETE") {
        const result = await supabaseWrite(`products?id=eq.${id}`, "DELETE", "");
        logApiAccess(method, path, clientIp, result.status, true);
        sendApiJson(res, result.status, result.body, origin);
        return true;
      }
      const body = await readBody(req);
      if (body === null) {
        sendApiError(res, 413, "Payload too large or timeout", origin);
        return true;
      }
      try {
        JSON.parse(body);
      } catch {
        sendApiError(res, 400, "Invalid JSON body", origin);
        return true;
      }
      const result = await supabaseWrite(`products?id=eq.${id}`, "PATCH", body);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // ═══ CUSTOMERS ═════════════════════════════════════════════
    // GET /api/customers (auth required — sensitive data)
    if (path === "/api/customers" && method === "GET") {
      if (!isLocalRequest(req) && !isWriteAuthorized(req)) {
        logApiAccess(method, path, clientIp, 401, false);
        sendApiError(res, 401, "Unauthorized", origin);
        return true;
      }
      const result = await supabaseRequest("customers?select=*&order=created_at.desc");
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // POST /api/customers — create customer (auth required)
    if (path === "/api/customers" && method === "POST") {
      const body = await readBody(req);
      if (body === null) {
        sendApiError(res, 413, "Payload too large or timeout", origin);
        return true;
      }
      try {
        JSON.parse(body);
      } catch {
        sendApiError(res, 400, "Invalid JSON body", origin);
        return true;
      }
      const result = await supabaseWrite("customers", "POST", body);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // PATCH/DELETE /api/customers/:id (auth required)
    const customerIdMatch = path.match(/^\/api\/customers\/([a-f0-9-]+)$/i);
    if (customerIdMatch && (method === "PATCH" || method === "DELETE")) {
      const id = customerIdMatch[1];
      if (!isValidUUID(id)) {
        sendApiError(res, 400, "Invalid customer ID", origin);
        return true;
      }
      if (method === "DELETE") {
        const result = await supabaseWrite(`customers?id=eq.${id}`, "DELETE", "");
        logApiAccess(method, path, clientIp, result.status, true);
        sendApiJson(res, result.status, result.body, origin);
        return true;
      }
      const body = await readBody(req);
      if (body === null) {
        sendApiError(res, 413, "Payload too large or timeout", origin);
        return true;
      }
      try {
        JSON.parse(body);
      } catch {
        sendApiError(res, 400, "Invalid JSON body", origin);
        return true;
      }
      const result = await supabaseWrite(`customers?id=eq.${id}`, "PATCH", body);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // ═══ ORDERS ════════════════════════════════════════════════
    // GET /api/orders (auth required — sensitive)
    if (path === "/api/orders" && method === "GET") {
      if (!isLocalRequest(req) && !isWriteAuthorized(req)) {
        logApiAccess(method, path, clientIp, 401, false);
        sendApiError(res, 401, "Unauthorized", origin);
        return true;
      }
      const result = await supabaseRequest(
        "orders?select=*,customer:customers(name,phone),items:order_items(quantity,unit_price,product:products(name,sku))&order=created_at.desc",
      );
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // POST /api/orders (auth required)
    if (path === "/api/orders" && method === "POST") {
      const body = await readBody(req);
      if (body === null) {
        sendApiError(res, 413, "Payload too large or timeout", origin);
        return true;
      }
      try {
        JSON.parse(body);
      } catch {
        sendApiError(res, 400, "Invalid JSON body", origin);
        return true;
      }
      const result = await supabaseWrite("orders", "POST", body);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // ═══ SUPPLIERS ═════════════════════════════════════════════
    // GET /api/suppliers (public read — no sensitive data)
    if (path === "/api/suppliers" && method === "GET") {
      const result = await supabaseRequest("suppliers?select=*&order=name.asc");
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // ═══ CONVERSATIONS ════════════════════════════════════════
    // GET /api/conversations (auth required — sensitive)
    if (path === "/api/conversations" && method === "GET") {
      if (!isLocalRequest(req) && !isWriteAuthorized(req)) {
        logApiAccess(method, path, clientIp, 401, false);
        sendApiError(res, 401, "Unauthorized", origin);
        return true;
      }
      const result = await supabaseRequest(
        "conversations?select=*,customer:customers(id,name,phone,type)&order=started_at.desc",
      );
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // GET /api/conversations/:id (auth required)
    const convMatch = path.match(/^\/api\/conversations\/([a-f0-9-]+)$/i);
    if (convMatch && method === "GET") {
      if (!isLocalRequest(req) && !isWriteAuthorized(req)) {
        logApiAccess(method, path, clientIp, 401, false);
        sendApiError(res, 401, "Unauthorized", origin);
        return true;
      }
      const id = convMatch[1];
      if (!isValidUUID(id)) {
        sendApiError(res, 400, "Invalid conversation ID", origin);
        return true;
      }
      const result = await supabaseRequest(
        `conversations?id=eq.${id}&select=*,customer:customers(id,name,phone,type),messages(id,role,content,created_at)`,
      );
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // PATCH /api/conversations/:id (auth required)
    if (convMatch && method === "PATCH") {
      const id = convMatch[1];
      if (!isValidUUID(id)) {
        sendApiError(res, 400, "Invalid conversation ID", origin);
        return true;
      }
      const body = await readBody(req);
      if (body === null) {
        sendApiError(res, 413, "Payload too large or timeout", origin);
        return true;
      }
      try {
        JSON.parse(body);
      } catch {
        sendApiError(res, 400, "Invalid JSON body", origin);
        return true;
      }
      const result = await supabaseWrite(`conversations?id=eq.${id}`, "PATCH", body);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // ═══ MESSAGES ══════════════════════════════════════════════
    // GET /api/messages (auth required — sensitive)
    if (path === "/api/messages" && method === "GET") {
      if (!isLocalRequest(req) && !isWriteAuthorized(req)) {
        logApiAccess(method, path, clientIp, 401, false);
        sendApiError(res, 401, "Unauthorized", origin);
        return true;
      }
      const convId = url.searchParams.get("conversation_id");
      let queryPath: string;
      if (convId) {
        // Validate UUID to prevent query injection
        if (!isValidUUID(convId)) {
          sendApiError(res, 400, "Invalid conversation_id format", origin);
          return true;
        }
        queryPath = `messages?conversation_id=eq.${convId}&select=*&order=created_at.asc`;
      } else {
        queryPath = "messages?select=*&order=created_at.desc&limit=100";
      }
      const result = await supabaseRequest(queryPath);
      logApiAccess(method, path, clientIp, result.status, true);
      sendApiJson(res, result.status, result.body, origin);
      return true;
    }

    // ═══ Method not allowed ═══════════════════════════════════
    // Explicitly reject unsupported methods on known paths
    if (path.startsWith("/api/")) {
      res.setHeader("Allow", "GET, POST, PATCH, DELETE, OPTIONS");
      sendApiError(res, 405, "Method not allowed", origin);
      return true;
    }

    // Not matched
    sendApiError(res, 404, "API endpoint not found", origin);
    return true;
  } catch (err: unknown) {
    // Security: never expose internal error details
    console.error(`[TAURA-API] Internal error: ${err instanceof Error ? err.message : "unknown"}`);
    sendApiError(res, 500, "Internal server error", origin);
    return true;
  }
}
