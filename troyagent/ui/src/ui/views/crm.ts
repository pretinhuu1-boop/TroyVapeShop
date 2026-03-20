import { html, nothing } from "lit";

/* ── API Config (backend proxy) ───────────────────────────── */
const API_BASE = "/api";

/* ── Types ───────────────────────────────────────────────── */
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  type: "b2c" | "b2b";
  company_name: string | null;
  cpf_cnpj: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface CRMState {
  state: {
    requestUpdate?: () => void;
  };
  requestUpdate?: () => void;
}

/* ── State ───────────────────────────────────────────────── */
let customers: Customer[] = [];
let loading = false;
let loaded = false;
let error: string | null = null;
let typeFilter: "all" | "b2c" | "b2b" = "all";
let searchQuery = "";
let selectedId: string | null = null;
let showForm = false;
let editing: Customer | null = null;
let deleteTarget: Customer | null = null;
let refreshInterval: number | null = null;
let showSavedBadge = false;
let savedTimer: number | null = null;

let formFields = {
  name: "",
  phone: "",
  email: "",
  type: "b2c" as "b2c" | "b2b",
  company_name: "",
  city: "",
  state: "",
  notes: "",
};

/* ── Trigger Update (handles { state } wrapper pattern) ─── */
function triggerUpdate(s: CRMState) {
  if (typeof s.requestUpdate === "function") {
    s.requestUpdate();
  } else if (s.state && typeof s.state.requestUpdate === "function") {
    s.state.requestUpdate();
  }
}

/* ── Gateway API ─────────────────────────────────────────── */
async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function fetchCustomers(): Promise<Customer[]> {
  return apiFetch("/customers");
}

/* ── Load & Refresh ──────────────────────────────────────── */
async function loadCustomers(state: CRMState, force = false) {
  if (loaded && !force) return;
  loading = true;
  error = null;
  triggerUpdate(state);
  try {
    customers = await fetchCustomers();
    loaded = true;
  } catch (e: any) {
    error = e.message || "Erro ao carregar clientes";
    console.error("[crm] load error:", e);
  } finally {
    loading = false;
    triggerUpdate(state);
  }
}

function startAutoRefresh(state: CRMState) {
  if (refreshInterval) return;
  refreshInterval = window.setInterval(() => {
    loadCustomers(state, true);
  }, 30000);
}

/* ── Helpers ─────────────────────────────────────────────── */
function filteredCustomers(): Customer[] {
  let filtered = customers;
  if (typeFilter !== "all") {
    filtered = filtered.filter((c) => c.type === typeFilter);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email || "").toLowerCase().includes(q) ||
        (c.company_name || "").toLowerCase().includes(q) ||
        (c.city || "").toLowerCase().includes(q),
    );
  }
  return filtered;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min}min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  return `${Math.floor(d / 30)}m`;
}

function maskPhone(phone: string): string {
  if (!phone || phone.length < 8) return phone;
  // Show country code + last 4
  if (phone.startsWith("+595")) return `🇵🇾 ...${phone.slice(-4)}`;
  if (phone.startsWith("+55")) return `🇧🇷 ...${phone.slice(-4)}`;
  return `...${phone.slice(-4)}`;
}

function fullPhone(phone: string): string {
  if (phone.startsWith("+595")) return `🇵🇾 ${phone}`;
  if (phone.startsWith("+55")) return `🇧🇷 ${phone}`;
  return phone;
}

/* ── Render ───────────────────────────────────────────────── */
export function renderCRM(state: CRMState) {
  void loadCustomers(state);
  startAutoRefresh(state);

  const filtered = filteredCustomers();
  const b2cCount = customers.filter((c) => c.type === "b2c").length;
  const b2bCount = customers.filter((c) => c.type === "b2b").length;
  const citiesCount = new Set(customers.map((c) => c.city).filter(Boolean)).size;
  const selected = selectedId ? customers.find((c) => c.id === selectedId) : null;

  /* ── Handlers ── */
  const handleSearch = (e: Event) => {
    searchQuery = (e.target as HTMLInputElement).value;
    triggerUpdate(state);
  };

  const handleTypeFilter = (t: "all" | "b2c" | "b2b") => () => {
    typeFilter = t;
    triggerUpdate(state);
  };

  const handleSelect = (id: string) => () => {
    selectedId = selectedId === id ? null : id;
    triggerUpdate(state);
  };

  const handleAdd = () => {
    editing = null;
    formFields = {
      name: "",
      phone: "",
      email: "",
      type: "b2c",
      company_name: "",
      city: "",
      state: "",
      notes: "",
    };
    showForm = true;
    triggerUpdate(state);
  };

  const handleEdit = (c: Customer) => {
    editing = { ...c };
    formFields = {
      name: c.name,
      phone: c.phone,
      email: c.email || "",
      type: c.type,
      company_name: c.company_name || "",
      city: c.city || "",
      state: c.state || "",
      notes: c.notes || "",
    };
    showForm = true;
    triggerUpdate(state);
  };

  const onField = (field: keyof typeof formFields) => (e: Event) => {
    (formFields as any)[field] = (e.target as HTMLInputElement).value;
  };

  const handleCancel = () => {
    showForm = false;
    editing = null;
    triggerUpdate(state);
  };

  const handleSave = async () => {
    const name = formFields.name.trim();
    const phone = formFields.phone.trim();
    if (!name || !phone) return;

    const payload: any = {
      name,
      phone,
      email: formFields.email || null,
      type: formFields.type,
      company_name: formFields.company_name || null,
      city: formFields.city || null,
      state: formFields.state || null,
      notes: formFields.notes || null,
    };

    try {
      if (editing) {
        payload.id = editing.id;
        payload.updated_at = new Date().toISOString();
        // We'd need a PATCH endpoint — for now reload
        // TODO: implement PATCH /api/customers/:id
      }
      // POST creates new
      const result = await apiFetch("/customers", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (result?.[0]) {
        customers.unshift(result[0]);
      }
      showForm = false;
      editing = null;
      showFeedback(state);
    } catch (e: any) {
      error = e.message;
    }
    triggerUpdate(state);
  };

  const handleDelete = (c: Customer) => {
    deleteTarget = c;
    triggerUpdate(state);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/customers/${deleteTarget.id}`, { method: "DELETE" });
      customers = customers.filter((x) => x.id !== deleteTarget!.id);
      if (selectedId === deleteTarget.id) selectedId = null;
      deleteTarget = null;
      showFeedback(state);
    } catch (e: any) {
      error = e.message;
    }
    triggerUpdate(state);
  };

  const cancelDelete = () => {
    deleteTarget = null;
    triggerUpdate(state);
  };

  function showFeedback(st: CRMState) {
    showSavedBadge = true;
    if (savedTimer) clearTimeout(savedTimer);
    savedTimer = window.setTimeout(() => {
      showSavedBadge = false;
      triggerUpdate(st);
    }, 2500);
  }

  /* ── Template ── */
  return html`
    <div class="tv-catalogo">
      <!-- KPI Bar -->
      <div class="tv-kpi-grid">
        <div class="tv-kpi">
          <div class="tv-kpi-icon">👥</div>
          <div>
            <div class="tv-kpi-value">${customers.length}</div>
            <div class="tv-kpi-label">Total Clientes</div>
          </div>
        </div>
        <div class="tv-kpi">
          <div class="tv-kpi-icon">🛒</div>
          <div>
            <div class="tv-kpi-value">${b2cCount}</div>
            <div class="tv-kpi-label">Pessoa Fisica (B2C)</div>
          </div>
        </div>
        <div class="tv-kpi">
          <div class="tv-kpi-icon">🏢</div>
          <div>
            <div class="tv-kpi-value">${b2bCount}</div>
            <div class="tv-kpi-label">Empresas (B2B)</div>
          </div>
        </div>
        <div class="tv-kpi">
          <div class="tv-kpi-icon">📍</div>
          <div>
            <div class="tv-kpi-value">${citiesCount}</div>
            <div class="tv-kpi-label">Cidades</div>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="tv-panel-header">
        <div class="tv-search-bar">
          <input
            type="text"
            placeholder="Buscar por nome, telefone, email, empresa..."
            .value=${searchQuery}
            @input=${handleSearch}
          />
        </div>
        <div class="tv-header-actions">
          ${showSavedBadge ? html`<span class="tv-saved-badge">✓ Sincronizado</span>` : nothing}
          ${loading ? html`<span class="tv-saved-badge" style="border-color: rgba(52,152,219,0.3); color: #3498db;">⟳ Carregando...</span>` : nothing}
          ${error ? html`<span class="tv-saved-badge" style="border-color: rgba(239,68,68,0.3); color: #ef4444;" title=${error}>⚠ Erro</span>` : nothing}
          <button class="tv-btn-sm" @click=${() => { loaded = false; loadCustomers(state, true); }}>🔄 Atualizar</button>
          <button class="tv-btn-gold" @click=${handleAdd}>+ Novo Cliente</button>
        </div>
      </div>

      <!-- Type Filter Bar -->
      <div class="tv-category-bar">
        <button class="tv-cat-btn ${typeFilter === "all" ? "active" : ""}" @click=${handleTypeFilter("all")}>
          Todos <span class="tv-cat-count">${customers.length}</span>
        </button>
        <button class="tv-cat-btn ${typeFilter === "b2c" ? "active" : ""}" @click=${handleTypeFilter("b2c")}>
          🛒 B2C <span class="tv-cat-count">${b2cCount}</span>
        </button>
        <button class="tv-cat-btn ${typeFilter === "b2b" ? "active" : ""}" @click=${handleTypeFilter("b2b")}>
          🏢 B2B <span class="tv-cat-count">${b2bCount}</span>
        </button>
      </div>

      <!-- Delete Confirmation -->
      ${deleteTarget ? html`
        <div class="tv-confirm-bar">
          <span>Excluir <strong>${deleteTarget.name}</strong> (${deleteTarget.phone})?</span>
          <button class="tv-btn-danger" @click=${confirmDelete}>Confirmar</button>
          <button class="tv-btn-sm" @click=${cancelDelete}>Cancelar</button>
        </div>
      ` : nothing}

      <!-- Customer Form -->
      ${showForm ? html`
        <div class="tv-panel tv-form-panel">
          <h3>${editing ? `Editar: ${editing.name}` : "Novo Cliente"}</h3>
          <div class="tv-form-grid">
            <div class="tv-config-field">
              <label>Nome *</label>
              <input type="text" .value=${formFields.name} @input=${onField("name")} placeholder="Nome completo" />
            </div>
            <div class="tv-config-field">
              <label>Telefone *</label>
              <input type="text" .value=${formFields.phone} @input=${onField("phone")} placeholder="+55 11 99999-9999" />
            </div>
            <div class="tv-config-field">
              <label>Email</label>
              <input type="email" .value=${formFields.email} @input=${onField("email")} placeholder="email@exemplo.com" />
            </div>
            <div class="tv-config-field">
              <label>Tipo</label>
              <select .value=${formFields.type} @change=${onField("type")}>
                <option value="b2c">B2C - Pessoa Fisica</option>
                <option value="b2b">B2B - Empresa</option>
              </select>
            </div>
            <div class="tv-config-field">
              <label>Empresa</label>
              <input type="text" .value=${formFields.company_name} @input=${onField("company_name")} placeholder="Nome da empresa (se B2B)" />
            </div>
            <div class="tv-config-field">
              <label>Cidade</label>
              <input type="text" .value=${formFields.city} @input=${onField("city")} placeholder="Cidade" />
            </div>
            <div class="tv-config-field">
              <label>Estado/Depto</label>
              <input type="text" .value=${formFields.state} @input=${onField("state")} placeholder="SP, RJ, Alto Paraná..." />
            </div>
            <div class="tv-config-field" style="grid-column: span 2;">
              <label>Notas</label>
              <textarea rows="2" .value=${formFields.notes} @input=${onField("notes")} placeholder="Observacoes sobre o cliente"></textarea>
            </div>
          </div>
          <div class="tv-config-actions">
            <button class="tv-btn-gold" @click=${handleSave}>${editing ? "Atualizar" : "Adicionar"}</button>
            <button class="tv-btn-outline" @click=${handleCancel}>Cancelar</button>
          </div>
        </div>
      ` : nothing}

      <!-- Customer List -->
      ${filtered.length === 0 && !loading ? html`
        <div class="tv-empty">
          ${searchQuery || typeFilter !== "all"
            ? "Nenhum cliente encontrado com esse filtro."
            : "Nenhum cliente cadastrado. Clique em '+ Novo Cliente' para começar."}
        </div>
      ` : nothing}

      <!-- Customer Grid -->
      <div class="tv-product-grid">
        ${filtered.map((c) => html`
          <div class="tv-product-card ${selectedId === c.id ? "tv-card-selected" : ""}" @click=${handleSelect(c.id)}>
            <div class="tv-product-img" style="
              display: flex; align-items: center; justify-content: center;
              font-size: 2.5rem; background: rgba(107, 15, 26, 0.06);
            ">
              ${c.type === "b2b" ? "🏢" : "👤"}
            </div>
            <div class="tv-product-body">
              <div class="tv-product-header">
                <strong>${c.name}</strong>
                <span class="tv-badge tv-badge--category" style="
                  background: ${c.type === "b2b" ? "rgba(139, 92, 246, 0.12)" : "rgba(59, 130, 246, 0.12)"};
                  color: ${c.type === "b2b" ? "#8b5cf6" : "#3b82f6"};
                ">${c.type === "b2b" ? "🏢 B2B" : "🛒 B2C"}</span>
              </div>
              <div class="tv-product-sku">
                ${fullPhone(c.phone)}
                ${c.email ? html` · ✉️ ${c.email}` : nothing}
              </div>
              ${c.company_name ? html`<div class="tv-product-sku" style="color: var(--tv-lime-light, #8a1322);">🏢 ${c.company_name}</div>` : nothing}
              ${c.city ? html`<div class="tv-product-sku">📍 ${c.city}${c.state ? `, ${c.state}` : ""}</div>` : nothing}
              ${c.notes ? html`<div class="tv-product-desc">${c.notes}</div>` : nothing}
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px">
                <span style="font-size:0.72rem;color:var(--tv-text-muted)">Cadastro: ${formatDate(c.created_at)}</span>
                <span style="font-size:0.72rem;color:var(--tv-text-muted)">Atualizado: ${timeAgo(c.updated_at)}</span>
              </div>
              <div class="tv-product-actions">
                <button class="tv-btn-sm" @click=${(e: Event) => { e.stopPropagation(); handleEdit(c); }}>✏️ Editar</button>
                <button class="tv-btn-sm tv-btn-sm--danger" @click=${(e: Event) => { e.stopPropagation(); handleDelete(c); }}>🗑️</button>
              </div>
            </div>
          </div>
        `)}
      </div>

      <!-- Selected Customer Detail -->
      ${selected ? html`
        <div class="tv-panel" style="border-left: 3px solid var(--accent, #6B0F1A); margin-top: 1rem;">
          <h3 style="margin: 0 0 0.75rem; font-size: 1.1rem;">${selected.name}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
            <div><span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Telefone</span><br/><strong>${fullPhone(selected.phone)}</strong></div>
            <div><span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Email</span><br/><strong>${selected.email || "—"}</strong></div>
            <div><span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Tipo</span><br/><strong>${selected.type === "b2b" ? "Empresa (B2B)" : "Pessoa Fisica (B2C)"}</strong></div>
            ${selected.company_name ? html`<div><span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Empresa</span><br/><strong>${selected.company_name}</strong></div>` : nothing}
            <div><span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Localidade</span><br/><strong>${selected.city || "—"}${selected.state ? `, ${selected.state}` : ""}</strong></div>
            <div><span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Cadastrado em</span><br/><strong>${formatDate(selected.created_at)}</strong></div>
          </div>
          ${selected.notes ? html`
            <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 10px;">
              <span style="font-size:0.7rem;color:var(--tv-text-muted);text-transform:uppercase;">Notas</span><br/>
              <span style="font-size: 0.85rem;">${selected.notes}</span>
            </div>
          ` : nothing}
        </div>
      ` : nothing}
    </div>
  `;
}
