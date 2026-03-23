import { html, nothing } from "lit";

/* ── Relationship with Canvas Dashboard ──────────────────────────
 * A parallel Canvas version exists at `src/canvas-host/vape-dashboard/dashboard.js`.
 * The agent interacts with that version via `canvas eval` → `window.troyDashboard.*`.
 * Both share the same localStorage keys below and stay in sync automatically.
 * The canvas version's `window.troyDashboard` is the canonical API contract.
 * This Lit version listens for `storage` events to auto-refresh when data changes.
 * ────────────────────────────────────────────────────────────── */

/* ── Storage Keys ────────────────────────────────────────────── */
const STORAGE_KEY = "troy_vape_orders";
const FEED_KEY = "troy_vape_feed";
const METRICS_KEY = "troy_vape_metrics";
const CONFIG_KEY = "troy_vape_config";

/* ── Types ───────────────────────────────────────────────────── */
interface OrderItem {
  quantity: number;
  name: string;
  sku: string;
  price?: number;
  flavor?: string;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: number;
  isNew?: boolean;
}

interface FeedEvent {
  icon: string;
  message: string;
  time: number;
}

interface Metrics {
  conversations: number;
  catalogs: number;
  checkouts: number;
  payments: number;
}

interface HoursConfig {
  weekdays: string; // e.g. "08:00-17:00"
  saturday: string; // e.g. "08:00-16:00"
  sunday: string; // e.g. "" (closed)
}

interface BusinessRules {
  warranty: string; // e.g. "Não trabalhamos com garantia"
  shippingDeadline: string; // e.g. "48h úteis"
  wholesaleMinQty: number; // e.g. 10
  paymentMethod: string; // e.g. "Pix"
}

interface VapeConfig {
  whatsapp: string;
  pix: string;
  storeName: string;
  hours: HoursConfig;
  llmModel: string;
  businessRules: BusinessRules;
}

/* ── State (module-scoped, survives re-renders) ──────────────── */
let orders: Order[] = [];
let feed: FeedEvent[] = [];
let metrics: Metrics = { conversations: 0, catalogs: 0, checkouts: 0, payments: 0 };
let config: VapeConfig = {
  whatsapp: "",
  pix: "",
  storeName: "Cloud Lab",
  hours: { weekdays: "08:00-17:00", saturday: "08:00-16:00", sunday: "" },
  llmModel: "deepseek/deepseek-r1",
  businessRules: {
    warranty: "Não trabalhamos com garantia",
    shippingDeadline: "48h úteis",
    wholesaleMinQty: 10,
    paymentMethod: "Pix",
  },
};
let loaded = false;
let showConfigSaved = false;
let configSavedTimer: number | null = null;
let storageListenerBound = false;

/* ── Form state (event-driven, no getElementById) ───────────── */
let formWa = "";
let formPix = "";
let formName = "";
let formHoursWeekdays = "";
let formHoursSaturday = "";
let formHoursSunday = "";
let formLlmModel = "";
let formWarranty = "";
let formShippingDeadline = "";
let formWholesaleMinQty = "";
let formPaymentMethod = "";
let formInitialized = false;

/** Sync form state from config (on load / external changes). */
function syncFormFromConfig() {
  formWa = config.whatsapp;
  formPix = config.pix;
  formName = config.storeName;
  formHoursWeekdays = config.hours?.weekdays ?? "08:00-17:00";
  formHoursSaturday = config.hours?.saturday ?? "08:00-16:00";
  formHoursSunday = config.hours?.sunday ?? "";
  formLlmModel = config.llmModel ?? "deepseek/deepseek-r1";
  formWarranty = config.businessRules?.warranty ?? "Não trabalhamos com garantia";
  formShippingDeadline = config.businessRules?.shippingDeadline ?? "48h úteis";
  formWholesaleMinQty = String(config.businessRules?.wholesaleMinQty ?? 10);
  formPaymentMethod = config.businessRules?.paymentMethod ?? "Pix";
}

/* ── Cross-tab sync keys ────────────────────────────────────── */
const SYNC_KEYS = new Set([STORAGE_KEY, FEED_KEY, METRICS_KEY, CONFIG_KEY]);

/* ── Persistence ─────────────────────────────────────────────── */
function reload() {
  try {
    const o = localStorage.getItem(STORAGE_KEY);
    if (o) {
      orders = JSON.parse(o);
    }
    const f = localStorage.getItem(FEED_KEY);
    if (f) {
      feed = JSON.parse(f);
    }
    const m = localStorage.getItem(METRICS_KEY);
    if (m) {
      metrics = { ...metrics, ...JSON.parse(m) };
    }
    const c = localStorage.getItem(CONFIG_KEY);
    if (c) {
      config = { ...config, ...JSON.parse(c) };
    }
    syncFormFromConfig();
  } catch {
    /* ignore corrupt data */
  }
}

function load() {
  if (loaded) {
    return;
  }
  reload();
  loaded = true;
}

/** Listen for storage changes from the canvas dashboard (cross-tab sync). */
function bindStorageSync(requestUpdate: () => void) {
  if (storageListenerBound) {
    return;
  }
  storageListenerBound = true;
  window.addEventListener("storage", (e) => {
    if (e.key && SYNC_KEYS.has(e.key)) {
      reload();
      requestUpdate();
    }
  });
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  localStorage.setItem(FEED_KEY, JSON.stringify(feed));
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

function saveConfig() {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

/* ── Helpers ─────────────────────────────────────────────────── */
function fmt(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function genId() {
  return "TV-" + Date.now().toString(36).toUpperCase().slice(-6);
}

function addFeed(type: string, message: string) {
  const icons: Record<string, string> = {
    message: "💬",
    checkout: "🛒",
    payment: "💰",
    forward: "📦",
    system: "⚙️",
    catalog: "📋",
  };
  feed.unshift({ icon: icons[type] ?? "📌", message, time: Date.now() });
  if (feed.length > 50) {
    feed = feed.slice(0, 50);
  }
  save();
}

function buildForwardMsg(orderData: {
  customer?: string;
  items?: OrderItem[];
  total?: number;
  address?: string;
  cep?: string;
  paymentStatus?: string;
}) {
  const store = config.storeName || "Cloud Lab";
  const items = (orderData.items ?? [])
    .map((i) => {
      let line = `- ${i.quantity}x ${i.name} (${i.sku})`;
      if (i.flavor) {
        line += `\n  Sabor: ${i.flavor}`;
      }
      return line;
    })
    .join("\n");
  return [
    `🚨 NOVO PEDIDO - ${store.toUpperCase()} 🚨`,
    "--------------------------------",
    `CLIENTE: ${orderData.customer ?? "Anônimo"}`,
    "PRODUTOS:",
    items,
    "--------------------------------",
    "ENTREGA:",
    orderData.address ?? "(endereço pendente)",
    `CEP: ${orderData.cep ?? "(pendente)"}`,
    "--------------------------------",
    `TOTAL: ${fmt(orderData.total ?? 0)}`,
    `STATUS: ${(orderData.paymentStatus ?? "PAGO").toUpperCase()} (Comprovante recebido)`,
  ].join("\n");
}

/* ── Public API (window.troyDashboard) ───────────────────────── */
function exposeApi(requestUpdate: () => void) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- global API bridge
  (window as any).troyDashboard = {
    addOrder(data: { customer?: string; items?: OrderItem[]; total?: number }) {
      const order: Order = {
        id: genId(),
        customer: data.customer ?? "Anônimo",
        items: data.items ?? [],
        total: data.total ?? 0,
        status: "novo",
        createdAt: Date.now(),
        isNew: true,
      };
      orders.push(order);
      save();
      addFeed("checkout", `Novo pedido ${order.id} de ${order.customer} — ${fmt(order.total)}`);
      requestUpdate();
      return order.id;
    },
    updateStatus(orderId: string, newStatus: string) {
      const o = orders.find((x) => x.id === orderId);
      if (!o) {
        return false;
      }
      const old = o.status;
      o.status = newStatus;
      save();
      addFeed("system", `Pedido ${orderId}: ${old.toUpperCase()} → ${newStatus.toUpperCase()}`);
      requestUpdate();
      return true;
    },
    trackEvent(type: string) {
      if (type in metrics) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dynamic metric key
        (metrics as any)[type]++;
        save();
        requestUpdate();
      }
    },
    logActivity(type: string, msg: string) {
      addFeed(type, msg);
      requestUpdate();
    },
    getOrders: () => [...orders],
    getMetrics: () => ({ ...metrics }),
    getConfig: () => ({ ...config }),
    forwardOrder(data: {
      customer?: string;
      items?: OrderItem[];
      total?: number;
      address?: string;
      cep?: string;
    }) {
      const msg = buildForwardMsg(data);
      if (!config.whatsapp) {
        addFeed("system", "⚠️ Número do escritório não configurado!");
        requestUpdate();
        return { success: false, reason: "no_whatsapp_configured" };
      }
      addFeed("forward", `Pedido encaminhado para escritório (...${config.whatsapp.slice(-4)})`);
      requestUpdate();
      return { success: true, whatsapp: config.whatsapp, pix: config.pix, message: msg };
    },
  };
}

/* ── KPI computation ─────────────────────────────────────────── */
function kpis() {
  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
  const paid = todayOrders.filter((o) => ["pago", "separado", "enviado"].includes(o.status));
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  const pending = todayOrders.filter((o) => o.status === "novo").length;
  const completed = todayOrders.filter((o) => ["separado", "enviado"].includes(o.status)).length;
  const ticket = paid.length > 0 ? revenue / paid.length : 0;
  return { revenue, pending, completed, ticket };
}

/* ── Render (pure Lit html) ──────────────────────────────────── */
export interface VendasRenderState {
  requestUpdate: () => void;
}

export function renderVendas(state: VendasRenderState) {
  load();
  exposeApi(state.requestUpdate);
  bindStorageSync(state.requestUpdate);

  const k = kpis();
  const rate =
    metrics.conversations > 0 ? ((metrics.payments / metrics.conversations) * 100).toFixed(1) : "0";
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Initialize form state once from config
  if (!formInitialized) {
    syncFormFromConfig();
    formInitialized = true;
  }

  const handleSaveConfig = () => {
    config.whatsapp = formWa.replace(/\D/g, "");
    config.pix = formPix.trim();
    config.storeName = formName.trim() || "Cloud Lab";
    config.hours = {
      weekdays: formHoursWeekdays.trim() || "08:00-17:00",
      saturday: formHoursSaturday.trim() || "08:00-16:00",
      sunday: formHoursSunday.trim(),
    };
    config.llmModel = formLlmModel || "deepseek/deepseek-r1";
    config.businessRules = {
      warranty: formWarranty.trim() || "Não trabalhamos com garantia",
      shippingDeadline: formShippingDeadline.trim() || "48h úteis",
      wholesaleMinQty: parseInt(formWholesaleMinQty) || 10,
      paymentMethod: formPaymentMethod.trim() || "Pix",
    };
    formWa = config.whatsapp; // cleaned digits only
    saveConfig();
    addFeed(
      "system",
      `Config salva — WA: ...${config.whatsapp.slice(-4) || "???"}, Pix: ${config.pix ? "✓" : "✗"}, Modelo: ${config.llmModel}`,
    );
    // Show saved badge via state (no getElementById)
    showConfigSaved = true;
    if (configSavedTimer) {
      clearTimeout(configSavedTimer);
    }
    configSavedTimer = window.setTimeout(() => {
      showConfigSaved = false;
      state.requestUpdate();
    }, 2500);
    state.requestUpdate();
  };

  const handleTestForward = () => {
    if (!config.whatsapp) {
      addFeed("system", "⚠️ Configure o número do escritório antes de testar");
      state.requestUpdate();
      return;
    }
    const testMsg = buildForwardMsg({
      customer: "Cliente Teste",
      items: [{ quantity: 1, name: "Produto Teste", sku: "TEST-001", flavor: "Grape Ice" }],
      total: 99.9,
      address: "Rua Exemplo, 123 — São Paulo/SP",
      cep: "01234-567",
    });
    addFeed("forward", `📤 Teste:\n${testMsg}`);
    state.requestUpdate();
  };

  const handleClearFeed = () => {
    feed = [];
    save();
    state.requestUpdate();
  };

  const handleFilterChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- global API bridge
    (window as any).__tvFilter = select.value;
    state.requestUpdate();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- global API bridge
  const filter = (window as any).__tvFilter ?? "all";
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const sorted = [...filtered].toSorted((a, b) => b.createdAt - a.createdAt);

  return html`
    <div class="tv-dashboard">
      <!-- Date -->
      <div class="tv-date">${today}</div>

      <!-- KPI Cards -->
      <div class="tv-kpi-grid">
        <div class="tv-kpi"><span class="tv-kpi-icon">💰</span><div><div class="tv-kpi-value">${fmt(k.revenue)}</div><div class="tv-kpi-label">Faturamento Hoje</div></div></div>
        <div class="tv-kpi"><span class="tv-kpi-icon">📦</span><div><div class="tv-kpi-value">${k.pending}</div><div class="tv-kpi-label">Pedidos Pendentes</div></div></div>
        <div class="tv-kpi"><span class="tv-kpi-icon">✅</span><div><div class="tv-kpi-value">${k.completed}</div><div class="tv-kpi-label">Concluídos Hoje</div></div></div>
        <div class="tv-kpi"><span class="tv-kpi-icon">🎫</span><div><div class="tv-kpi-value">${fmt(k.ticket)}</div><div class="tv-kpi-label">Ticket Médio</div></div></div>
      </div>

      <!-- Orders + Feed -->
      <div class="tv-content-grid">
        <div class="tv-panel">
          <div class="tv-panel-header">
            <h3>Pedidos</h3>
            <select class="tv-select" @change=${handleFilterChange}>
              <option value="all" ?selected=${filter === "all"}>Todos</option>
              <option value="novo" ?selected=${filter === "novo"}>Novo</option>
              <option value="pago" ?selected=${filter === "pago"}>Pago</option>
              <option value="separado" ?selected=${filter === "separado"}>Separado</option>
              <option value="enviado" ?selected=${filter === "enviado"}>Enviado</option>
            </select>
          </div>
          <div class="tv-table-wrap">
            <table class="tv-table">
              <thead><tr><th>ID</th><th>Cliente</th><th>Produtos</th><th>Total</th><th>Status</th><th>Hora</th></tr></thead>
              <tbody>
                ${
                  sorted.length === 0
                    ? html`<tr><td colspan="6" class="tv-empty">Nenhum pedido ${filter !== "all" ? `com status "${filter}"` : ""}.</td></tr>`
                    : sorted.map((o) => {
                        const prods = o.items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
                        return html`
                        <tr class="tv-order-row">
                          <td class="tv-order-id">${o.id}</td>
                          <td>${o.customer}</td>
                          <td class="tv-products-cell" title=${prods}>${prods}</td>
                          <td class="tv-order-total">${fmt(o.total)}</td>
                          <td><span class="tv-badge tv-badge--${o.status}">${o.status.toUpperCase()}</span></td>
                          <td>${fmtTime(o.createdAt)}</td>
                        </tr>`;
                      })
                }
              </tbody>
            </table>
          </div>
        </div>

        <div class="tv-panel">
          <div class="tv-panel-header">
            <h3>Feed de Atividades</h3>
            <button class="tv-btn-sm" @click=${handleClearFeed}>Limpar</button>
          </div>
          <div class="tv-feed">
            ${
              feed.length === 0
                ? html`
                    <div class="tv-empty">Aguardando eventos...</div>
                  `
                : feed.slice(0, 20).map(
                    (ev, i) => html`
                  <div class="tv-feed-item ${i === 0 ? "tv-feed-item--latest" : ""}">
                    <span class="tv-feed-icon">${ev.icon}</span>
                    <span class="tv-feed-msg">${ev.message}</span>
                    <span class="tv-feed-time">${fmtTime(ev.time)}</span>
                  </div>`,
                  )
            }
          </div>
        </div>
      </div>

      <!-- Metrics -->
      <div class="tv-panel">
        <h3>Métricas de Conversão</h3>
        <div class="tv-metrics-grid">
          <div class="tv-metric"><div class="tv-metric-label">Conversas Iniciadas</div><div class="tv-metric-value">${metrics.conversations}</div></div>
          <div class="tv-metric"><div class="tv-metric-label">Catálogos Abertos</div><div class="tv-metric-value">${metrics.catalogs}</div></div>
          <div class="tv-metric"><div class="tv-metric-label">Checkouts Enviados</div><div class="tv-metric-value">${metrics.checkouts}</div></div>
          <div class="tv-metric"><div class="tv-metric-label">Pagamentos Confirmados</div><div class="tv-metric-value">${metrics.payments}</div></div>
          <div class="tv-metric"><div class="tv-metric-label">Taxa de Conversão</div><div class="tv-metric-value tv-gold">${rate}%</div></div>
        </div>
      </div>

      <!-- Config Header -->
      <div class="tv-panel-header" style="margin-bottom:0;">
        <h3>⚙️ Configurações</h3>
        ${
          showConfigSaved
            ? html`
                <span class="tv-saved-badge">✓ Salvo</span>
              `
            : nothing
        }
      </div>

      <!-- Config Cards Grid -->
      <div class="tv-settings-grid">

        <!-- Card: Loja & Pagamento -->
        <div class="tv-settings-card">
          <div class="tv-settings-card-header">
            <span class="tv-settings-card-icon">💳</span>
            <div>
              <h4 class="tv-settings-card-title">Loja & Pagamento</h4>
              <p class="tv-settings-card-desc">WhatsApp, Pix e nome da loja</p>
            </div>
          </div>
          <div class="tv-settings-card-body">
            <div class="tv-config-field">
              <label>WhatsApp do Escritório</label>
              <input type="tel" .value=${formWa} @input=${(e: Event) => {
                formWa = (e.target as HTMLInputElement).value;
              }} placeholder="5511999999999" />
            </div>
            <div class="tv-config-field">
              <label>Chave Pix</label>
              <input type="text" .value=${formPix} @input=${(e: Event) => {
                formPix = (e.target as HTMLInputElement).value;
              }} placeholder="email@loja.com ou CPF/CNPJ" />
            </div>
            <div class="tv-config-field">
              <label>Nome da Loja</label>
              <input type="text" .value=${formName} @input=${(e: Event) => {
                formName = (e.target as HTMLInputElement).value;
              }} placeholder="Cloud Lab" />
            </div>
          </div>
        </div>

        <!-- Card: Horário de Atendimento -->
        <div class="tv-settings-card">
          <div class="tv-settings-card-header">
            <span class="tv-settings-card-icon">🕐</span>
            <div>
              <h4 class="tv-settings-card-title">Horário de Atendimento</h4>
              <p class="tv-settings-card-desc">Dias e horários de funcionamento</p>
            </div>
          </div>
          <div class="tv-settings-card-body">
            <div class="tv-config-field">
              <label>Segunda a Sexta</label>
              <input type="text" .value=${formHoursWeekdays} @input=${(e: Event) => {
                formHoursWeekdays = (e.target as HTMLInputElement).value;
              }} placeholder="08:00-17:00" />
              <span class="tv-hint">HH:MM-HH:MM (vazio = fechado)</span>
            </div>
            <div class="tv-config-field">
              <label>Sábado</label>
              <input type="text" .value=${formHoursSaturday} @input=${(e: Event) => {
                formHoursSaturday = (e.target as HTMLInputElement).value;
              }} placeholder="08:00-16:00" />
            </div>
            <div class="tv-config-field">
              <label>Domingo</label>
              <input type="text" .value=${formHoursSunday} @input=${(e: Event) => {
                formHoursSunday = (e.target as HTMLInputElement).value;
              }} placeholder="Fechado (deixe vazio)" />
            </div>
          </div>
        </div>

        <!-- Card: Modelo de IA -->
        <div class="tv-settings-card">
          <div class="tv-settings-card-header">
            <span class="tv-settings-card-icon">🤖</span>
            <div>
              <h4 class="tv-settings-card-title">Modelo de IA</h4>
              <p class="tv-settings-card-desc">Motor que responde seus clientes</p>
            </div>
          </div>
          <div class="tv-settings-card-body">
            <div class="tv-config-field">
              <label>Modelo LLM (OpenRouter)</label>
              <select class="tv-select tv-select-full" .value=${formLlmModel} @change=${(
                e: Event,
              ) => {
                formLlmModel = (e.target as HTMLSelectElement).value;
              }}>
                <option value="deepseek/deepseek-r1" ?selected=${formLlmModel === "deepseek/deepseek-r1"}>DeepSeek R1 (Reasoning)</option>
                <option value="qwen/qwq-32b" ?selected=${formLlmModel === "qwen/qwq-32b"}>Qwen QwQ 32B</option>
                <option value="anthropic/claude-sonnet-4" ?selected=${formLlmModel === "anthropic/claude-sonnet-4"}>Claude Sonnet 4</option>
                <option value="anthropic/claude-haiku-4" ?selected=${formLlmModel === "anthropic/claude-haiku-4"}>Claude Haiku 4</option>
                <option value="openai/gpt-4o" ?selected=${formLlmModel === "openai/gpt-4o"}>GPT-4o</option>
                <option value="openai/gpt-4o-mini" ?selected=${formLlmModel === "openai/gpt-4o-mini"}>GPT-4o Mini</option>
                <option value="google/gemini-2.5-flash" ?selected=${formLlmModel === "google/gemini-2.5-flash"}>Gemini 2.5 Flash</option>
              </select>
              <span class="tv-hint">Modelos com reasoning pensam antes de responder</span>
            </div>
          </div>
        </div>

        <!-- Card: Regras de Negócio -->
        <div class="tv-settings-card">
          <div class="tv-settings-card-header">
            <span class="tv-settings-card-icon">📋</span>
            <div>
              <h4 class="tv-settings-card-title">Regras de Negócio</h4>
              <p class="tv-settings-card-desc">Garantia, envio, atacado e pagamento</p>
            </div>
          </div>
          <div class="tv-settings-card-body">
            <div class="tv-config-field">
              <label>Política de Garantia</label>
              <input type="text" .value=${formWarranty} @input=${(e: Event) => {
                formWarranty = (e.target as HTMLInputElement).value;
              }} placeholder="Não trabalhamos com garantia" />
            </div>
            <div class="tv-config-field">
              <label>Prazo de Envio</label>
              <input type="text" .value=${formShippingDeadline} @input=${(e: Event) => {
                formShippingDeadline = (e.target as HTMLInputElement).value;
              }} placeholder="48h úteis" />
            </div>
            <div class="tv-settings-card-row">
              <div class="tv-config-field">
                <label>Qtd Mín. Atacado</label>
                <input type="number" .value=${formWholesaleMinQty} @input=${(e: Event) => {
                  formWholesaleMinQty = (e.target as HTMLInputElement).value;
                }} placeholder="10" min="1" />
              </div>
              <div class="tv-config-field">
                <label>Pagamento</label>
                <input type="text" .value=${formPaymentMethod} @input=${(e: Event) => {
                  formPaymentMethod = (e.target as HTMLInputElement).value;
                }} placeholder="Pix" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Config Actions -->
      <div class="tv-config-actions">
        <button class="tv-btn-gold" @click=${handleSaveConfig}>Salvar Configurações</button>
        <button class="tv-btn-outline" @click=${handleTestForward}>📤 Testar Encaminhamento</button>
      </div>
    </div>
  `;
}
