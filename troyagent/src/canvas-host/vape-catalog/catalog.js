// Troy Vape - Catálogo de Vendas (Dual-Mode: Canvas + Browser)

function getConfiguredWhatsApp() {
  try {
    const cfg = JSON.parse(localStorage.getItem("troy_vape_config") || "{}");
    if (cfg.whatsapp) {
      return cfg.whatsapp;
    }
  } catch (_e) {
    /* ignore */
  }
  return new URLSearchParams(window.location.search).get("wa") || "5511999999999";
}
const WHATSAPP_NUMBER = getConfiguredWhatsApp();

let cart = [];
let activeCategory = "all";
let searchQuery = "";

// --- Stock Integration ---
function getStockData() {
  try {
    return JSON.parse(localStorage.getItem("troy_vape_stock") || "{}");
  } catch {
    return {};
  }
}

function hasStockData() {
  const stock = getStockData();
  return Object.keys(stock).length > 0;
}

function getAvailableFlavors(product) {
  const stock = getStockData();
  const s = stock[product.sku];
  // If no stock data or no flavor filter, show all flavors
  if (!s || !s.flavors || s.flavors.length === 0) {
    return product.flavors || [];
  }
  // Filter to only flavors in stock
  return (product.flavors || []).filter((f) => s.flavors.includes(f));
}

// Cross-tab sync: re-render when stock changes in another tab/canvas
window.addEventListener("storage", (e) => {
  if (e.key === "troy_vape_stock") {
    buildCategoryFilter();
    renderProducts();
  }
});

const INLINE_PRODUCTS = [
  {
    id: "ignite-tadalafil",
    sku: "IGNITE-TADALAFIL",
    name: "Ignite Tadalafil Spray 20mg",
    description: "Spray de performance Ignite. 120 doses.",
    price: 100.1,
    image: "https://ignitesaude.com/cdn/shop/files/teste_img_2_spray.jpg?v=1758025041",
    category: "Ignite",
    flavors: ["Grape", "Cherry", "Menthol"],
  },
  {
    id: "ignite-v-nano",
    sku: "IGNITE-V-NANO",
    name: "Ignite V Nano 1.000 Puffs",
    description: "Compacto e potente.",
    price: 22.95,
    image: "images/ignite-v-nano.png",
    category: "Ignite",
    flavors: ["Passion Sour Kiwi"],
  },
  {
    id: "ignite-v80",
    sku: "IGNITE-V80",
    name: "Ignite V80 New Edition 8.000 Puffs",
    description: "Nova edição limitada com 8k puffs.",
    price: 64.93,
    image:
      "https://puffignite.co/cdn/shop/files/V80_BlackEdition_SinglePackDevice_0001_tobacco_5000x.jpg?v=1718828985",
    category: "Ignite",
    flavors: ["Blueberry Ice", "Grape Ice", "Passion Fruit Sour Kiwi"],
  },
  {
    id: "ignite-v15",
    sku: "IGNITE-V15",
    name: "Ignite V15 1500 Puffs",
    description: "O clássico da Ignite. Favorito do mercado.",
    price: 69.92,
    image: "images/ignite-v15.png",
    category: "Ignite",
    flavors: [
      "Grape",
      "Blueberry Ice",
      "Icy Mint",
      "Pineapple Ice",
      "Menthol",
      "Strawberry Kiwi",
      "Strawberry Watermelon Ice",
      "Kiwi Passion Fruit Guava",
    ],
  },
  {
    id: "elfbar-bc-pro",
    sku: "ELFBAR-BC-PRO",
    name: "ElfBar BC Pro 45.000 Puffs",
    description: "Capacidade monstro com display de bateria e juice.",
    price: 94.95,
    image:
      "http://shopelfbar.ca/cdn/shop/files/ELFBAR-BC-PRO-80K-Blue-Razz-Ice-Disposable-Vape-Nic-Salt-Official-Store-1.png?v=1767882455",
    category: "ElfBar",
    flavors: [
      "Kiwi Passion Fruit Guava",
      "Strawberry Ice",
      "Pineapple Ice",
      "Grape Twist",
      "Tropical Baja",
      "Americano Ice",
      "Cool Menthol",
      "Strawberry Kiwi",
      "Grape Ice",
      "Green Apple Ice",
      "Watermelon Peach Frost",
      "Miami Mint",
      "Blueberry Strawberry Coconut",
      "Watermelon Ice",
    ],
  },
  {
    id: "elfbar-ice-king",
    sku: "ELFBAR-ICE-KING",
    name: "ElfBar Ice King 40.000 Puffs",
    description: "Refresco extremo com tecnologia Dual Mesh.",
    price: 79.95,
    image: "images/elfbar-ice-king.png",
    category: "ElfBar",
    flavors: [
      "Green Apple",
      "Hawaiian Splash",
      "Neon Twist",
      "Passion Flash",
      "Peach Blue",
      "Strawberry Park",
      "Triple Berry",
      "Wild Berry",
      "Black Mint",
    ],
  },
  {
    id: "nikbar-30000",
    sku: "NIKBAR-30000",
    name: "Nikbar 30.000 Puffs",
    description: "Sabor intenso e nuvens densas.",
    price: 64.95,
    image:
      "https://www.wolfshopbrasil.net/wp-content/uploads/2025/10/Principal-Pod-Descartavel-NIKBAR-30K-na-Wolf-Shop-Brasil-1200x900.jpg",
    category: "Nikbar",
    flavors: [
      "Strawberry Kiwi",
      "Menthol",
      "Grape Ice",
      "Watermelon Cherry",
      "Blueberry Ice",
      "Strawberry Apple Watermelon",
      "Sour Apple Ice",
      "Fresh Mint",
      "Strawberry Ice",
      "Miami Mint",
    ],
  },
  {
    id: "lost-mary-dura",
    sku: "LOST-MARY-DURA",
    name: "Lost Mary Dura 35.000 Puffs",
    description: "Design ergonômico e durabilidade sem igual.",
    price: 75.0,
    image:
      "https://admin.elementvape.com/media/catalog/product/l/o/lost_mary_mt35k_turbo_disposable_-_default.png",
    category: "Lost Mary",
    flavors: [
      "Hawaiian Mint",
      "Hawaiian Juice",
      "Blue RAZZ Ice",
      "Summer Orange",
      "Pineapple Ice",
      "Mango Ice",
      "Grapefruit Passion Guava",
    ],
  },
  {
    id: "lifepod-eco-8000",
    sku: "LIFEPOD-ECO-8000",
    name: "Life Pod Eco 8.000 Puffs (Refil)",
    description: "Ecológico e econômico. Refil para sistema Eco.",
    price: 39.9,
    image:
      "https://cdn.sistemawbuy.com.br/arquivos/61793d4f71e57473a93a378e72c4df88/produtos/6615434dbde6e/bb9970950233811f7393495cdfaf41a6-6615434e0fc80.jpg",
    category: "Life Pod",
    flavors: [
      "White Mocha Ice",
      "Lemon Grass",
      "Mango Ice",
      "Golden Kiwi Fruit",
      "Pear Ice",
      "Green Grape Ice",
      "Coconut Water",
      "Banana Ice",
      "Cactus",
      "Strawberry Ice",
      "Love 66",
      "Tropical",
      "Apple Kiwi Ice",
      "Lemon Kiwi",
      "Apple Melon Ice",
      "Apple Grape Ice",
      "Triple Berry",
      "Coke Ice",
    ],
  },
  {
    id: "black-sheep-30000",
    sku: "BLACK-SHEEP-30000",
    name: "The Black Sheep 30.000 Puffs",
    description: "Estilo rebelde com sabores marcantes.",
    price: 84.9,
    image: "images/black-sheep-30k.png",
    category: "The Black Sheep",
    flavors: [
      "Fresh Mint/Grape",
      "Grape/Passion Fruit",
      "Grape/Watermelon Bubble",
      "Cherry Raspberry/Watermelon Strawberry",
      "Grape/Strawberry Banana",
      "Menthol/Watermelon Green Apple",
      "Grape/Strawberry Kiwi",
    ],
  },
  {
    id: "oxbar-32000-refil",
    sku: "OXBAR-32000-REFIL",
    name: "Oxbar 32.000 (Somente Refil)",
    description: "Refil de alto rendimento para aparelhos Oxbar.",
    price: 60.0,
    image: "images/oxbar-32k-refil.png",
    category: "Oxbar",
    flavors: [
      "Fanta Strawberry",
      "Grape Paradise",
      "Ox Love",
      "Banana Ice",
      "Apple Kiwi Ice",
      "Watermelon Ice",
      "Red Ice",
    ],
  },
];

let PRODUCTS = [...INLINE_PRODUCTS];

// --- Data Loading ---
async function loadProducts() {
  try {
    const response = await fetch("./vape-products.json");
    if (response.ok) {
      PRODUCTS = await response.json();
    }
  } catch (_e) {
    console.log("Usando dados inline (modo local).");
  }
  buildCategoryFilter();
  renderProducts();
}

// --- Utilities ---
function formatPrice(val) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
}

function isCanvasMode() {
  return typeof window.openclawSendUserAction === "function";
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// --- Category Filter ---
function buildCategoryFilter() {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  const bar = document.getElementById("category-bar");
  if (!bar) {
    return;
  }

  const counts = {};
  PRODUCTS.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  bar.innerHTML = `
        <button class="cat-btn active" data-cat="all">Todos <span class="cat-count">${PRODUCTS.length}</span></button>
        ${categories
          .map(
            (c) => `
            <button class="cat-btn" data-cat="${c}">${c} <span class="cat-count">${counts[c]}</span></button>
        `,
          )
          .join("")}
    `;

  bar.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.cat;
      renderProducts();
    });
  });
}

// --- Search ---
function initSearch() {
  const input = document.getElementById("search-input");
  if (!input) {
    return;
  }
  input.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

// --- Product Rendering ---
function getFilteredProducts() {
  const stock = getStockData();
  const stockActive = hasStockData();

  return PRODUCTS.filter((p) => {
    // Stock filter: if stock data exists, hide unavailable products
    if (stockActive) {
      const s = stock[p.sku];
      if (s && (s.available === false || s.qty === 0)) {
        return false;
      }
    }

    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      (p.flavors && p.flavors.some((f) => f.toLowerCase().includes(searchQuery)));
    return matchCat && matchSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">Nenhum produto encontrado.</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((p) => {
      const availFlavors = getAvailableFlavors(p);
      const flavorOptions =
        availFlavors.length > 0
          ? `<select id="flavor-${p.id}" class="flavor-select">
                ${availFlavors.map((f) => `<option value="${f}">${f}</option>`).join("")}
               </select>`
          : "";

      return `
        <div class="product-card" data-category="${p.category}">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div class=\\'img-placeholder\\'><svg width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'rgba(212,175,55,0.4)\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><path d=\\'M21 15l-5-5L5 21\\'/></svg><span>Imagem indisponível</span></div>';">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                ${flavorOptions}
            </div>
            <div class="price-row">
                <div class="price">${formatPrice(p.price)}</div>
                <div class="qty-container" style="display: flex; align-items: center; gap: 8px;">
                    <input type="number" id="qty-${p.id}" value="1" min="1" class="qty-input">
                    <button class="add-btn" onclick="addToCart('${p.id}')">Adicionar</button>
                </div>
            </div>
        </div>
    `;
    })
    .join("");
}

// --- Cart ---
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const flavorSelect = document.getElementById(`flavor-${productId}`);
  const selectedFlavor = flavorSelect ? flavorSelect.value : null;
  const qtyInput = document.getElementById(`qty-${productId}`);
  const quantity = parseInt(qtyInput.value) || 1;

  const existingIndex = cart.findIndex(
    (item) => item.id === productId && item.selectedFlavor === selectedFlavor,
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ ...product, selectedFlavor, quantity });
  }

  updateUI();
  showToast(`✓ ${product.name} adicionado!`);

  if (isCanvasMode()) {
    window.openclawSendUserAction({
      name: "product_added_to_cart",
      context: { productId, selectedFlavor, quantity, cartSize: cart.length },
    });
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateUI();
}

function updateUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
  document.getElementById("cart-label").innerText = totalItems === 1 ? "item" : "itens";

  const badge = document.getElementById("cart-count");
  if (totalItems > 0) {
    badge.classList.add("has-items");
  } else {
    badge.classList.remove("has-items");
  }

  const itemsList = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  let total = 0;
  itemsList.innerHTML = cart
    .map((item, idx) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
            <div class="cart-item">
                <div class="cart-item-header">
                    <span>${item.quantity}x ${item.name}</span>
                    <span>${formatPrice(itemTotal)}</span>
                </div>
                ${item.selectedFlavor ? `<div class="cart-item-flavor">Sabor: ${item.selectedFlavor}</div>` : ""}
                <button class="cart-item-remove" onclick="removeFromCart(${idx})">✕</button>
            </div>
        `;
    })
    .join("");

  totalEl.innerText = formatPrice(total);

  // Update mode indicator
  const modeEl = document.getElementById("mode-indicator");
  if (modeEl) {
    modeEl.textContent = isCanvasMode() ? "🔗 Canvas Mode" : "📱 Browser Mode";
    modeEl.className = `mode-indicator ${isCanvasMode() ? "canvas" : "browser"}`;
  }
}

// --- Checkout ---
function buildWhatsAppMessage() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  let msg = `🛒 *PEDIDO TROY VAPE*\n\n`;
  cart.forEach((item) => {
    msg += `▸ ${item.quantity}x ${item.name}`;
    if (item.selectedFlavor) {
      msg += ` (${item.selectedFlavor})`;
    }
    msg += ` — ${formatPrice(item.price * item.quantity)}\n`;
  });
  msg += `\n💰 *Total: ${formatPrice(total)}*\n\nGostaria de finalizar este pedido!`;
  return msg;
}

function checkout() {
  if (cart.length === 0) {
    showToast("Adicione itens ao carrinho primeiro!");
    return;
  }

  if (isCanvasMode()) {
    // Canvas mode: send action back to the agent
    window.openclawSendUserAction({
      name: "checkout_initiated",
      context: {
        items: cart.map((item) => ({
          sku: item.sku,
          name: item.name,
          price: item.price,
          flavor: item.selectedFlavor,
          quantity: item.quantity,
        })),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      },
    });
    showToast("Pedido enviado! Continue no chat.");
    document.getElementById("checkout-drawer").classList.remove("open");
    cart = [];
    updateUI();
  } else {
    // Browser mode: redirect to WhatsApp with pre-filled message
    const message = encodeURIComponent(buildWhatsAppMessage());
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(waUrl, "_blank");
    showToast("Redirecionando para o WhatsApp...");
    document.getElementById("checkout-drawer").classList.remove("open");
    cart = [];
    updateUI();
  }
}

// --- Event Listeners ---
document.getElementById("cart-status").addEventListener("click", () => {
  document.getElementById("checkout-drawer").classList.add("open");
});

document.getElementById("btn-fechar").addEventListener("click", () => {
  document.getElementById("checkout-drawer").classList.remove("open");
});

document.getElementById("btn-finalizar").addEventListener("click", checkout);

// Close drawer on backdrop click
document.getElementById("checkout-drawer").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove("open");
  }
});

// Expose to inline onclick handlers in templates
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

// --- Init ---
void loadProducts();
initSearch();
