/**
 * Troy Vape - Main Store Logic
 * Note: grid.innerHTML = '' is used only to clear the container, not to inject untrusted content.
 * Product cards are built via safe DOM methods in product-card.js.
 */

import { getProducts, getProduct } from './products.js';
import { createProductCard } from '../../components/product-card.js';
import { openProductModal, closeProductModal } from '../../components/modal.js';
import { createReview } from './reviews.js';
import { debounce } from './utils.js';

const SAMPLE_PRODUCTS = [
    { id: 'sample-1', name: 'ELFBAR BC5000', brand: 'ELFBAR', puffs: 5000, price: 89.90, flavor: 'Blue Razz Ice', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=400&fit=crop', description: 'Recarregável USB-C, bateria 650mAh, 13mL de líquido, 50mg nicotina salt, dual mesh coil para sabor intenso e consistente.', flavors: ['Blue Razz Ice', 'Watermelon Ice', 'Strawberry Mango', 'Peach Mango', 'Cranberry Grape'], stock: 30 },
    { id: 'sample-2', name: 'Lost Mary MO5000', brand: 'Lost Mary', puffs: 5000, price: 99.90, promo: true, oldPrice: 129.90, flavor: 'Peach Mango Watermelon', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop', description: 'Design ergonômico, bateria 500mAh USB-C, 13.5mL nic salt, mesh coil para vapor suave e denso.', flavors: ['Peach Mango Watermelon', 'Black Mint', 'Blueberry Raspberry Lemon', 'Citrus Sunrise', 'Grape Jelly'], stock: 15 },
    { id: 'sample-3', name: 'OXBAR G8000', brand: 'OXBAR', puffs: 8000, price: 99.90, flavor: 'Rainbow Drop', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop', description: 'Shell transparente, bateria 650mAh USB-C, 16mL, mesh coil 1.2ohm, 50mg nic salt, lanyard incluso.', flavors: ['Rainbow Drop', 'Sunset Watermelon', 'Kiwi Passion Kick', 'Cool Mint', 'Strawberry Ice'], stock: 20 },
    { id: 'sample-4', name: 'WAKA soPro PA7000', brand: 'WAKA', puffs: 7000, price: 109.90, flavor: 'Blueberry Raspberry', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', description: 'Modo duplo (normal e boost), bateria 850mAh USB-C, 14mL, mesh coil 0.6ohm, 50mg nicotina salt.', flavors: ['Blueberry Raspberry', 'Mango Peach', 'Watermelon Chill', 'Strawberry Burst', 'Fresh Mint'], stock: 18 },
    { id: 'sample-5', name: 'Geek Bar Pulse 15000', brand: 'Geek Bar', puffs: 15000, price: 139.90, promo: true, oldPrice: 179.90, flavor: 'Mexican Mango', image: 'https://images.unsplash.com/photo-1633113216120-53ca0a7be5bc?w=400&h=400&fit=crop', description: 'Dual-mode (Regular 15K / Pulse 7.5K puffs), tela HD, bateria 650mAh USB-C, 16mL, dual mesh coil, 50mg nic salt.', flavors: ['Mexican Mango', 'Strawberry Banana', 'Watermelon Ice', 'Tropical Rainbow Blast', 'Sour Apple Ice'], stock: 10 },
    { id: 'sample-6', name: 'RAZ CA6000', brand: 'RAZ', puffs: 6000, price: 89.90, flavor: 'Dragon Fruit Lemonade', image: 'https://images.unsplash.com/photo-1614850715649-1d0106568def?w=400&h=400&fit=crop', description: 'Bateria 650mAh USB-C, 10mL, airflow ajustável, grip em couro, gancho para lanyard, mesh coil premium.', flavors: ['Dragon Fruit Lemonade', 'Frozen Strawberry', 'Blue Raz', 'Cactus Jack', 'Spearmint'], stock: 22 },
    { id: 'sample-7', name: 'Flum Pebble 6000', brand: 'Flum', puffs: 6000, price: 79.90, flavor: 'Aloe Watermelon Splash', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop', description: 'Design anti-vazamento, bateria 600mAh USB-C, 14mL, proteção contra curto-circuito e sobrecarga, mesh coil.', flavors: ['Aloe Watermelon Splash', 'Cool Mint', 'Strawberry Banana', 'Blueberry Mint', 'Watermelon Icy'], stock: 35 },
    { id: 'sample-8', name: 'Funky Republic Ti7000', brand: 'Funky Republic', puffs: 7000, price: 99.90, flavor: 'Rainbow Cloudz', image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop', description: 'Display digital de juice e bateria, 600mAh USB-C, 17mL, QUAQ Tech mesh coil, 50mg nicotina salt.', flavors: ['Rainbow Cloudz', 'Blue Razz Ice', 'Passion Fruit Lime Kiwi', 'Peach Pie', 'Watermelon Ice'], stock: 12 },
    { id: 'sample-9', name: 'North FT12000', brand: 'North', puffs: 12000, price: 139.90, flavor: 'Strawberry Watermelon Kiwi', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop', description: 'Três modos de potência, dual plaid mesh coils, airflow ajustável, 650mAh USB-C, 15mL, indicadores de juice e bateria.', flavors: ['Strawberry Watermelon Kiwi', 'Blue Slurpie', 'Kiwi Dragon Fruit', 'Cool Mint', 'Apple Gummies'], stock: 8 },
    { id: 'sample-10', name: 'Ignite V50', brand: 'Ignite', puffs: 5000, price: 79.90, flavor: 'Aloe Grape', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop', description: 'Auto-draw, bateria 650mAh USB-C recarregável, 12mL, 50mg nicotina salt, mesh coil technology.', flavors: ['Aloe Grape', 'Blue Raspberry Ice', 'Watermelon Bubble Gum', 'Banana Ice', 'Green Apple'], stock: 25 },
    { id: 'sample-11', name: 'HQD Cuvie Mars 8000', brand: 'HQD', puffs: 8000, price: 109.90, flavor: 'Purple Rain', image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400&h=400&fit=crop', description: 'Alta capacidade, bateria 650mAh USB-C, 18mL de líquido premium, 50mg nic salt, draw-activated mesh coil.', flavors: ['Purple Rain', 'Desert Breeze', 'Lush Ice', 'Strawberry Banana', 'Colombian Coffee'], stock: 17 },
    { id: 'sample-12', name: 'Zovoo Dragbar B5000', brand: 'Zovoo', puffs: 5000, price: 69.90, promo: true, oldPrice: 89.90, flavor: 'Kiwi Passion Fruit Guava', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop', description: 'Compacto, bateria 500mAh USB-C, 13mL, disponível em 0/20/50mg, mesh coil com draw activation.', flavors: ['Kiwi Passion Fruit Guava', 'Pina Colada', 'Strawberry Ice Cream', 'Watermelon Lychee', 'Blue Razz Ice'], stock: 40 },
    { id: 'sample-13', name: 'Orion Bar 10000', brand: 'Lost Vape', puffs: 10000, price: 139.90, flavor: 'Peach Mango Watermelon', image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop', description: 'Smart display, bateria 650mAh USB-C, 20mL, mesh coil 1.0ohm, 50mg nic salt, indicadores de juice e bateria.', flavors: ['Peach Mango Watermelon', 'Blue Razz Ice', 'Kiwi Passion Fruit Guava', 'Strawberry Chew', 'Miami Mint'], stock: 14 },
    { id: 'sample-14', name: 'Vapetasia x Air 6000', brand: 'Vapetasia', puffs: 6000, price: 74.90, flavor: 'Killer Kustard', image: 'https://images.unsplash.com/photo-1604076913837-52ab5f7c1ac2?w=400&h=400&fit=crop', description: 'Collab com Air Bar, bateria 500mAh USB-C, 11mL, 50mg nic salt, mesh coil para clouds densas e throat hit forte.', flavors: ['Killer Kustard', 'Straw Bae', 'Blue Razz', 'Royalty Two', 'Cherry Peachade'], stock: 28 },
    { id: 'sample-15', name: 'Breeze Pro 2000', brand: 'Breeze Smoke', puffs: 2000, price: 49.90, flavor: 'Lush Ice', image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=400&fit=crop', description: 'Compacto não-recarregável, bateria 1000mAh integrada, 6mL, 50mg nic salt, mesh coil para sabor consistente.', flavors: ['Lush Ice', 'Banana Mint', 'Cherry Cola', 'Lemon Mint', 'Strawberry Cream'], stock: 50 }
];

let currentProducts = [];
let activeFilter = 'all';
let activeSort = 'default';

// ─── Smart Search (fuzzy) ───
const fuzzyMatch = (text, query) => {
    const t = text.toLowerCase();
    const q = query.toLowerCase();
    if (t.includes(q)) return true;
    let qi = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
        if (t[i] === q[qi]) qi++;
    }
    return qi === q.length;
};

const smartFilter = (products, searchTerm) => {
    if (!searchTerm) return products;
    return products.filter(p =>
        fuzzyMatch(p.name, searchTerm) ||
        fuzzyMatch(p.brand, searchTerm) ||
        (p.flavor && fuzzyMatch(p.flavor, searchTerm)) ||
        (p.flavors && p.flavors.some(f => fuzzyMatch(f, searchTerm)))
    );
};

const categoryFilter = (products, filter) => {
    if (filter === 'all') return products;
    if (filter === 'promo') return products.filter(p => p.promo);
    if (filter === '5000') return products.filter(p => p.puffs <= 5000);
    if (filter === '8000') return products.filter(p => p.puffs > 5000 && p.puffs <= 8000);
    if (filter === '10000') return products.filter(p => p.puffs > 8000);
    return products;
};

const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
        case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
        case 'puffs-desc': return sorted.sort((a, b) => b.puffs - a.puffs);
        case 'name-asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default: return sorted;
    }
};

// ─── Render ───
const clearElement = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };

const renderProducts = (products) => {
    const grid = document.getElementById('product-grid');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    if (!grid) return;

    clearElement(grid);

    if (resultsCount) {
        resultsCount.textContent = `${products.length} produto${products.length !== 1 ? 's' : ''}`;
    }

    if (products.length === 0) {
        emptyState?.classList.remove('hidden');
        return;
    } else {
        emptyState?.classList.add('hidden');
    }

    products.forEach((product, i) => {
        const card = createProductCard(product, handleProductClick);
        card.style.animationDelay = `${Math.min(i * 0.05, 0.4)}s`;
        card.classList.add('animate-fade-up');
        grid.appendChild(card);
        injectProductSchema(product);
    });
};

const injectProductSchema = (product) => {
    const scriptId = `schema-product-${product.id}`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description || `Pod ${product.name} - ${product.brand} - ${product.puffs} puffs.`,
        "brand": { "@type": "Brand", "name": product.brand },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "BRL",
            "price": product.price,
            "availability": "https://schema.org/InStock"
        }
    });
    document.head.appendChild(script);
};

const handleProductClick = async (productId) => {
    let product = currentProducts.find(p => p.id === productId);
    if (!product) {
        try { product = await getProduct(productId); }
        catch (e) { console.warn("Could not fetch product:", e.message); }
    }
    if (product) openProductModal(product, handleReviewSubmit);
};

const handleReviewSubmit = async (productId, rating, comment) => {
    try { await createReview(productId, rating, comment); }
    catch (error) { console.error("Error submitting review:", error); }
};

const applyAllFilters = () => {
    const searchTerm = document.getElementById('search-input')?.value || '';
    let filtered = smartFilter(currentProducts, searchTerm);
    filtered = categoryFilter(filtered, activeFilter);
    filtered = sortProducts(filtered, activeSort);
    renderProducts(filtered);
};

const debouncedFilter = debounce(applyAllFilters, 200);

// ─── Init ───
document.addEventListener('DOMContentLoaded', async () => {
    try {
        currentProducts = await getProducts();
        if (!currentProducts || currentProducts.length === 0) {
            currentProducts = SAMPLE_PRODUCTS;
        }
    } catch (error) {
        console.warn("Using sample products:", error.message);
        currentProducts = SAMPLE_PRODUCTS;
    }
    renderProducts(currentProducts);

    document.getElementById('search-input')?.addEventListener('input', debouncedFilter);

    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.dataset.filter;
            applyAllFilters();
        });
    });

    document.getElementById('sort-select')?.addEventListener('change', (e) => {
        activeSort = e.target.value;
        applyAllFilters();
    });

    document.getElementById('reset-filters')?.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        activeFilter = 'all';
        activeSort = 'default';
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        document.querySelector('.category-pill[data-filter="all"]')?.classList.add('active');
        const sortSel = document.getElementById('sort-select');
        if (sortSel) sortSel.value = 'default';
        renderProducts(currentProducts);
    });

    document.getElementById('close-modal-btn')?.addEventListener('click', closeProductModal);
    document.getElementById('modal-overlay')?.addEventListener('click', closeProductModal);
});
