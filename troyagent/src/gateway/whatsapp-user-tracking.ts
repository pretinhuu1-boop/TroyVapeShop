/**
 * WhatsApp User Tracking & Conversation Logging
 * Auto-registers WhatsApp users in the customers table and logs conversations/messages.
 * Runs as background tasks to avoid blocking message processing.
 */
import https from "node:https";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://coiwajcdvqbrxbshdnwl.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

// In-memory cache to avoid hitting Supabase on every message
const knownPhones = new Map<string, string>(); // phone -> customer_id
const activeConversations = new Map<string, string>(); // phone -> conversation_id

function supabaseGet(path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
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
    const req = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });
      response.on("end", () => {
        resolve({ status: response.statusCode ?? 500, body: data });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

function supabaseWrite(
  path: string,
  method: string,
  body: string,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
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
    const req = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });
      response.on("end", () => {
        resolve({ status: response.statusCode ?? 500, body: data });
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

/**
 * Find or create a customer by phone number.
 * Returns the customer ID.
 */
async function ensureCustomer(phone: string, name?: string): Promise<string> {
  // Check cache first
  const cached = knownPhones.get(phone);
  if (cached) return cached;

  // Look up by phone
  const result = await supabaseGet(
    `customers?phone=eq.${encodeURIComponent(phone)}&select=id,name&limit=1`,
  );
  if (result.status === 200) {
    const rows = JSON.parse(result.body);
    if (rows.length > 0) {
      const id = rows[0].id;
      knownPhones.set(phone, id);

      // Update name if we have a new one and existing is empty
      if (name && !rows[0].name) {
        await supabaseWrite(
          `customers?id=eq.${id}`,
          "PATCH",
          JSON.stringify({ name, updated_at: new Date().toISOString() }),
        ).catch(() => {});
      }
      return id;
    }
  }

  // Create new customer
  const newCustomer = {
    name: name || phone,
    phone,
    type: "b2c",
    notes: `Auto-registrado via WhatsApp em ${new Date().toISOString()}`,
  };
  const createResult = await supabaseWrite(
    "customers",
    "POST",
    JSON.stringify(newCustomer),
  );
  if (createResult.status === 201 || createResult.status === 200) {
    const rows = JSON.parse(createResult.body);
    if (rows.length > 0) {
      const id = rows[0].id;
      knownPhones.set(phone, id);
      console.log(
        `[TAURA-TRACK] Auto-registered WhatsApp user: ${name || phone} (${phone}) -> ${id}`,
      );
      return id;
    }
  }

  throw new Error(`Failed to create customer for phone ${phone}: ${createResult.body}`);
}

/**
 * Find or create an active conversation for a customer.
 * Returns the conversation ID.
 */
async function ensureConversation(
  customerId: string,
  phone: string,
): Promise<string> {
  // Check cache
  const cached = activeConversations.get(phone);
  if (cached) return cached;

  // Look for existing active conversation
  const result = await supabaseGet(
    `conversations?customer_id=eq.${customerId}&status=eq.active&channel=eq.whatsapp&select=id&order=started_at.desc&limit=1`,
  );
  if (result.status === 200) {
    const rows = JSON.parse(result.body);
    if (rows.length > 0) {
      const id = rows[0].id;
      activeConversations.set(phone, id);
      return id;
    }
  }

  // Create new conversation
  const newConv = {
    customer_id: customerId,
    channel: "whatsapp",
    status: "active",
  };
  const createResult = await supabaseWrite(
    "conversations",
    "POST",
    JSON.stringify(newConv),
  );
  if (createResult.status === 201 || createResult.status === 200) {
    const rows = JSON.parse(createResult.body);
    if (rows.length > 0) {
      const id = rows[0].id;
      activeConversations.set(phone, id);
      console.log(
        `[TAURA-TRACK] New conversation started for ${phone} -> ${id}`,
      );
      return id;
    }
  }

  throw new Error(`Failed to create conversation: ${createResult.body}`);
}

/**
 * Log a message to the messages table.
 */
async function logMessage(
  conversationId: string,
  role: "user" | "assistant" | "system",
  content: string,
): Promise<void> {
  const msg = {
    conversation_id: conversationId,
    role,
    content: content.substring(0, 10000), // Limit content length
  };
  await supabaseWrite("messages", "POST", JSON.stringify(msg));
}

/**
 * Main tracking function called on each inbound WhatsApp message.
 * Runs as a background task — does not block message processing.
 */
export async function trackInboundMessage(params: {
  senderPhone: string;
  senderName?: string;
  messageBody: string;
  sessionKey: string;
  chatType: string;
}): Promise<{ customerId: string; conversationId: string } | null> {
  // Only track DM messages, not groups
  if (params.chatType === "group") return null;
  if (!params.senderPhone) return null;

  try {
    const customerId = await ensureCustomer(
      params.senderPhone,
      params.senderName,
    );
    const conversationId = await ensureConversation(
      customerId,
      params.senderPhone,
    );

    // Log the inbound message
    await logMessage(conversationId, "user", params.messageBody);

    return { customerId, conversationId };
  } catch (err: any) {
    console.error(
      `[TAURA-TRACK] Error tracking inbound message: ${err.message}`,
    );
    return null;
  }
}

/**
 * Log an outbound (assistant) reply.
 */
export async function trackOutboundMessage(params: {
  senderPhone: string;
  replyText: string;
}): Promise<void> {
  if (!params.senderPhone || !params.replyText) return;

  try {
    const customerId = knownPhones.get(params.senderPhone);
    if (!customerId) return; // Not tracked yet

    const conversationId = activeConversations.get(params.senderPhone);
    if (!conversationId) return;

    await logMessage(conversationId, "assistant", params.replyText);
  } catch (err: any) {
    console.error(
      `[TAURA-TRACK] Error tracking outbound message: ${err.message}`,
    );
  }
}
