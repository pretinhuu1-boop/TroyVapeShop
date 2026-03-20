// Troy Vape — CRM Module (Canvas App)
//
// Exposes `window.troyCRM` for agent interaction via canvas eval.
// Persists contacts, interactions, and lead stages to localStorage.
// Syncs with the Lit UI view (crm.ts) via shared localStorage keys.

const CRM_CONTACTS_KEY = "troy_crm_contacts";
const CRM_INTERACTIONS_KEY = "troy_crm_interactions";

// --- State ---
let contacts = {}; // phone → Contact
let interactions = []; // Interaction[]

// --- Types (JSDoc for clarity) ---
/**
 * @typedef {Object} Contact
 * @property {string} phone        - E.164 phone number
 * @property {string} name         - Customer name (or "Anônimo")
 * @property {string} stage        - Lead stage: new|interested|negotiating|ordered|paid|delivered|returning
 * @property {string[]} tags       - Customer tags
 * @property {number} firstContact - Unix timestamp of first interaction
 * @property {number} lastContact  - Unix timestamp of last interaction
 * @property {number} totalOrders  - Total orders placed
 * @property {number} totalSpent   - Total amount spent (BRL)
 * @property {string} notes        - Operator notes
 */

/**
 * @typedef {Object} Interaction
 * @property {string} phone        - Contact phone
 * @property {string} intent       - sale|support|info|browsing
 * @property {string[]} products   - Products mentioned
 * @property {number} timestamp    - Unix timestamp
 */

const VALID_STAGES = [
  "new",
  "interested",
  "negotiating",
  "ordered",
  "paid",
  "delivered",
  "returning",
];
const VALID_INTENTS = new Set(["sale", "support", "info", "browsing"]);

// --- Persistence ---
function loadCRM() {
  try {
    const savedContacts = localStorage.getItem(CRM_CONTACTS_KEY);
    if (savedContacts) {
      contacts = JSON.parse(savedContacts);
    }

    const savedInteractions = localStorage.getItem(CRM_INTERACTIONS_KEY);
    if (savedInteractions) {
      interactions = JSON.parse(savedInteractions);
    }
  } catch (e) {
    console.warn("[CRM] Erro ao carregar estado:", e);
  }
}

function saveCRM() {
  localStorage.setItem(CRM_CONTACTS_KEY, JSON.stringify(contacts));
  localStorage.setItem(CRM_INTERACTIONS_KEY, JSON.stringify(interactions));
}

// --- Helpers ---
function normalizePhone(phone) {
  if (!phone) {
    return "";
  }
  return String(phone).replace(/\D/g, "");
}

function createContact(phone, name) {
  return {
    phone,
    name: name || "Anônimo",
    stage: "new",
    tags: [],
    firstContact: Date.now(),
    lastContact: Date.now(),
    totalOrders: 0,
    totalSpent: 0,
    notes: "",
  };
}

// --- Public API ---
window.troyCRM = {
  /**
   * Register or update a contact. If already exists, updates name and lastContact.
   * @param {{ phone: string, name?: string }} data
   * @returns {{ isNew: boolean, contact: Contact }}
   */
  registerContact(data) {
    const phone = normalizePhone(data.phone);
    if (!phone) {
      return { error: "phone_required" };
    }

    const isNew = !contacts[phone];

    if (isNew) {
      contacts[phone] = createContact(phone, data.name);
    } else {
      contacts[phone].lastContact = Date.now();
      if (data.name && data.name !== "Anônimo") {
        contacts[phone].name = data.name;
      }
    }

    saveCRM();

    // Log to dashboard feed if available
    if (window.troyDashboard?.logActivity) {
      const label = isNew ? "Novo contato" : "Contato retornou";
      window.troyDashboard.logActivity(
        "message",
        `${label}: ${contacts[phone].name} (...${phone.slice(-4)})`,
      );
    }

    return { isNew, contact: { ...contacts[phone] } };
  },

  /**
   * Track an interaction (intent + products mentioned).
   * @param {{ phone: string, intent: string, products?: string[] }} data
   * @returns {{ success: boolean }}
   */
  trackInteraction(data) {
    const phone = normalizePhone(data.phone);
    if (!phone) {
      return { error: "phone_required" };
    }

    const intent = VALID_INTENTS.has(data.intent) ? data.intent : "browsing";

    const interaction = {
      phone,
      intent,
      products: data.products || [],
      timestamp: Date.now(),
    };

    interactions.push(interaction);

    // Keep max 500 interactions in memory
    if (interactions.length > 500) {
      interactions = interactions.slice(-500);
    }

    // Update contact's lastContact
    if (contacts[phone]) {
      contacts[phone].lastContact = Date.now();
    }

    saveCRM();
    return { success: true };
  },

  /**
   * Update the lead stage for a contact.
   * @param {string} phone
   * @param {string} stage - new|interested|negotiating|ordered|paid|delivered|returning
   * @returns {{ success: boolean, oldStage?: string, newStage?: string }}
   */
  updateStage(phone, stage) {
    phone = normalizePhone(phone);
    if (!phone || !contacts[phone]) {
      return { error: "contact_not_found" };
    }
    if (!VALID_STAGES.includes(stage)) {
      return { error: "invalid_stage", valid: VALID_STAGES };
    }

    const oldStage = contacts[phone].stage;
    contacts[phone].stage = stage;
    contacts[phone].lastContact = Date.now();

    // Track order stats
    if (stage === "ordered") {
      contacts[phone].totalOrders++;
    }

    saveCRM();

    if (window.troyDashboard?.logActivity) {
      window.troyDashboard.logActivity(
        "system",
        `Lead ${contacts[phone].name}: ${oldStage} → ${stage}`,
      );
    }

    return { success: true, oldStage, newStage: stage };
  },

  /**
   * Add a tag to a contact.
   * @param {string} phone
   * @param {string} tag
   */
  addTag(phone, tag) {
    phone = normalizePhone(phone);
    if (!contacts[phone]) {
      return { error: "contact_not_found" };
    }
    if (!contacts[phone].tags.includes(tag)) {
      contacts[phone].tags.push(tag);
      saveCRM();
    }
    return { success: true, tags: [...contacts[phone].tags] };
  },

  /**
   * Update operator notes for a contact.
   * @param {string} phone
   * @param {string} notes
   */
  setNotes(phone, notes) {
    phone = normalizePhone(phone);
    if (!contacts[phone]) {
      return { error: "contact_not_found" };
    }
    contacts[phone].notes = notes;
    saveCRM();
    return { success: true };
  },

  /**
   * Record a purchase amount for a contact.
   * @param {string} phone
   * @param {number} amount
   */
  recordPurchase(phone, amount) {
    phone = normalizePhone(phone);
    if (!contacts[phone]) {
      return { error: "contact_not_found" };
    }
    contacts[phone].totalSpent += amount;
    contacts[phone].totalOrders++;
    contacts[phone].lastContact = Date.now();
    saveCRM();
    return {
      success: true,
      totalSpent: contacts[phone].totalSpent,
      totalOrders: contacts[phone].totalOrders,
    };
  },

  // --- Read Operations ---

  /**
   * Get a single contact by phone.
   */
  getContact(phone) {
    phone = normalizePhone(phone);
    return contacts[phone] ? { ...contacts[phone] } : null;
  },

  /**
   * Get all contacts, optionally filtered by stage.
   */
  getContacts(stage) {
    const all = Object.values(contacts);
    if (stage && VALID_STAGES.includes(stage)) {
      return all.filter((c) => c.stage === stage);
    }
    return all;
  },

  /**
   * Get interactions for a specific contact.
   */
  getInteractions(phone) {
    phone = normalizePhone(phone);
    return interactions.filter((i) => i.phone === phone);
  },

  /**
   * Get CRM summary stats.
   */
  getStats() {
    const all = Object.values(contacts);
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    return {
      totalContacts: all.length,
      byStage: VALID_STAGES.reduce((acc, s) => {
        acc[s] = all.filter((c) => c.stage === s).length;
        return acc;
      }, {}),
      activeToday: all.filter((c) => now - c.lastContact < day).length,
      activeWeek: all.filter((c) => now - c.lastContact < 7 * day).length,
      totalRevenue: all.reduce((sum, c) => sum + c.totalSpent, 0),
      avgTicket:
        all.filter((c) => c.totalOrders > 0).length > 0
          ? all.reduce((sum, c) => sum + c.totalSpent, 0) /
            all.filter((c) => c.totalOrders > 0).length
          : 0,
      topIntents: interactions.slice(-100).reduce((acc, i) => {
        acc[i.intent] = (acc[i.intent] || 0) + 1;
        return acc;
      }, {}),
    };
  },

  /**
   * Search contacts by name (partial match).
   */
  searchContacts(query) {
    if (!query) {
      return [];
    }
    const q = query.toLowerCase();
    return Object.values(contacts).filter(
      (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q),
    );
  },
};

// --- Cross-tab sync ---
window.addEventListener("storage", (e) => {
  if (e.key === CRM_CONTACTS_KEY || e.key === CRM_INTERACTIONS_KEY) {
    loadCRM();
  }
});

// --- Init ---
loadCRM();
console.log("[CRM] Módulo carregado —", Object.keys(contacts).length, "contatos");
