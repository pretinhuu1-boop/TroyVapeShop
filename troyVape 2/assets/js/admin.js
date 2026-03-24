/**
 * Cloud Lab Store - Admin Logic Reprogrammed
 */

import { getProducts, updateProduct, deleteProduct, createProduct, bulkDeleteProducts, updateStock, createSale, getSales, uploadImage } from './products.js';
import { protectPage, logout, login } from './auth.js';
import { formatCurrency } from './utils.js';

let allProducts = [];
let allSales = [];
let selectedProductIds = new Set();

// Ensure date format correctly from iso
const formatDate = (isoStr) => new Date(isoStr).toLocaleDateString('pt-BR');

// Tab Management
const initTabs = () => {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active', 'opacity-100', 'bg-white/10'));
            tab.classList.add('active', 'opacity-100', 'bg-white/10');
            tab.classList.remove('opacity-50');

            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(tab.dataset.target).classList.remove('hidden');
        });
    });
};

// Data Loading
const refreshData = async () => {
    try {
        allProducts = await getProducts();
        try {
            allSales = await getSales();
        } catch (e) {
            console.warn("Tabela de sales não encontrada ainda. Ignorando analytics.", e);
        }

        renderAnalytics();
        renderSpreadsheet();
        renderInventory();
        populateSaleModalSelect();
    } catch (error) {
        console.error("Erro carregando dados master:", error);
    }
};

// =======================
// DASHBOARD & ANALYTICS
// =======================

const renderAnalytics = () => {
    const revenueEl = document.getElementById('analytics-revenue');
    const itemsEl = document.getElementById('analytics-items');
    const stockEl = document.getElementById('analytics-stock');
    const salesTable = document.getElementById('sales-table-body');

    let totalRevenue = 0;
    let totalItems = 0;
    let totalStock = allProducts.reduce((acc, p) => acc + (p.stock || 0), 0);

    // Estoque por marca
    const stockByBrand = allProducts.reduce((acc, p) => {
        const brand = p.brand || 'Sem Marca';
        acc[brand] = (acc[brand] || 0) + (p.stock || 0);
        return acc;
    }, {});
    const brandStockEl = document.getElementById('analytics-stock-by-brand');
    if (brandStockEl) {
        brandStockEl.replaceChildren();
        Object.entries(stockByBrand).sort((a, b) => b[1] - a[1]).forEach(([brand, qty]) => {
            const row = document.createElement('div');
            row.className = 'flex justify-between items-center text-xs';
            const nameSpan = document.createElement('span');
            nameSpan.className = 'text-white/50 uppercase tracking-wider';
            nameSpan.textContent = brand;
            const qtySpan = document.createElement('span');
            qtySpan.className = 'font-bold text-white';
            qtySpan.textContent = qty;
            row.append(nameSpan, qtySpan);
            brandStockEl.appendChild(row);
        });
    }

    salesTable.innerHTML = '';

    allSales.forEach(s => {
        totalRevenue += Number(s.total_price);
        totalItems += Number(s.quantity);

        salesTable.innerHTML += `
            <tr>
                <td class="text-xs text-white/50">${formatDate(s.created_at)}</td>
                <td class="font-bold">${s.products ? s.products.name : 'Produto Excluído'}</td>
                <td>${s.quantity}x</td>
                <td class="text-[#00D4FF] font-black">${formatCurrency(s.total_price)}</td>
                <td class="text-xs text-white/50">${s.customer_info || '-'}</td>
            </tr>
        `;
    });

    revenueEl.textContent = formatCurrency(totalRevenue);
    itemsEl.textContent = totalItems;
    stockEl.textContent = totalStock;
};

const setupSaleModal = () => {
    const btnOpen = document.getElementById('open-sale-modal-btn');
    const btnClose = document.getElementById('close-sale-modal-overlay');
    const modal = document.getElementById('sale-modal');
    const form = document.getElementById('sale-form');
    const qtyInput = document.getElementById('sale-qty');
    const priceInput = document.getElementById('sale-total');
    const prodSelect = document.getElementById('sale-product');

    const closeModal = () => modal.classList.add('hidden');
    const openModal = () => {
        form.reset();
        modal.classList.remove('hidden');
    };

    btnOpen.onclick = openModal;
    btnClose.onclick = closeModal;

    // Auto calculate price
    qtyInput.addEventListener('input', () => {
        const prodId = prodSelect.value;
        const prod = allProducts.find(p => p.id === prodId);
        if (prod) {
            priceInput.value = (prod.price * qtyInput.value).toFixed(2);
        }
    });

    prodSelect.addEventListener('change', () => {
        const prod = allProducts.find(p => p.id === prodSelect.value);
        if (prod) {
            priceInput.value = (prod.price * qtyInput.value).toFixed(2);
        }
    });

    form.onsubmit = async (e) => {
        e.preventDefault();
        const product_id = prodSelect.value;
        const quantity = parseInt(qtyInput.value);
        const total_price = parseFloat(priceInput.value);
        const customer_info = document.getElementById('sale-info').value;

        try {
            await createSale({ product_id, quantity, total_price, customer_info });
            // Lower stock
            const prod = allProducts.find(p => p.id === product_id);
            if (prod) {
                const newStock = Math.max(0, (prod.stock || 0) - quantity);
                await updateStock(product_id, newStock);
            }
            closeModal();
            await refreshData();
            alert('Venda registrada com sucesso!');
        } catch (err) {
            alert('Erro ao registrar venda, certifique-se que o banco de dados de vendas existe. Erro: ' + err.message);
        }
    };
};

const setupCreateProductModal = () => {
    const btnOpen = document.getElementById('add-product-row-btn');
    const btnClose = document.getElementById('close-cp-modal-overlay');
    const btnClose2 = document.getElementById('close-cp-btn');
    const modal = document.getElementById('create-product-modal');
    const form = document.getElementById('create-product-form');

    const closeModal = () => modal.classList.add('hidden');
    const openModal = () => {
        form.reset();
        modal.classList.remove('hidden');
    };

    btnOpen.onclick = openModal;
    btnClose.onclick = closeModal;
    btnClose2.onclick = closeModal;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        const fileInput = document.getElementById('cp-image');
        let imageUrl = "https://picsum.photos/seed/pod_new/400/400"; // fallback

        try {
            btn.textContent = 'Enviando Imagem...';
            btn.disabled = true;

            if (fileInput.files && fileInput.files.length > 0) {
                imageUrl = await uploadImage(fileInput.files[0]);
            }

            btn.textContent = 'Salvando Produto...';

            const newProd = {
                name: document.getElementById('cp-name').value,
                brand: document.getElementById('cp-brand').value,
                price: parseFloat(document.getElementById('cp-price').value),
                puffs: parseInt(document.getElementById('cp-puffs').value) || 0,
                flavor: document.getElementById('cp-flavor').value,
                stock: parseInt(document.getElementById('cp-stock').value) || 0,
                promo: document.getElementById('cp-promo').checked,
                image: imageUrl
            };

            await createProduct(newProd);
            closeModal();
            await refreshData();
            alert('Produto cadastrado com sucesso!');
        } catch (err) {
            alert("Erro ao criar produto: " + err.message);
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    };
};

const populateSaleModalSelect = () => {
    const select = document.getElementById('sale-product');
    select.innerHTML = '<option value="" disabled selected>Selecione o produto...</option>';
    allProducts.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.name} (R$ ${p.price})</option>`;
    });
};

// =======================
// SPREADSHEET (Produtos)
// =======================

const renderSpreadsheet = () => {
    const tbody = document.getElementById('spreadsheet-body');
    const searchVal = document.getElementById('filter-search').value.toLowerCase();
    const promoFilter = document.getElementById('filter-promo').value;

    tbody.innerHTML = '';

    let filtered = allProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.brand.toLowerCase().includes(searchVal) || (p.flavor && p.flavor.toLowerCase().includes(searchVal));
        if (!matchesSearch) return false;

        if (promoFilter === 'promo' && !p.promo) return false;
        if (promoFilter === 'normal' && p.promo) return false;

        return true;
    });

    filtered.forEach(p => {
        const isChecked = selectedProductIds.has(p.id);
        const tr = document.createElement('tr');
        tr.className = 'group transition-colors';

        // Editable cells setup
        tr.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox" class="row-checkbox cursor-pointer" data-id="${p.id}" ${isChecked ? 'checked' : ''}>
            </td>
            <td class="editable-cell min-w-[150px]">
                <input type="text" value="${p.name}" data-field="name" data-id="${p.id}">
            </td>
            <td class="editable-cell min-w-[120px]">
                <input type="text" value="${p.brand}" data-field="brand" data-id="${p.id}">
            </td>
            <td class="editable-cell min-w-[80px]">
                <input type="number" step="0.01" value="${p.price}" data-field="price" data-id="${p.id}" class="text-[#00D4FF] font-bold">
            </td>
            <td class="editable-cell min-w-[80px]">
                <input type="number" value="${p.stock || 0}" data-field="stock" data-id="${p.id}" class="text-white font-bold">
            </td>
            <td class="editable-cell w-[80px]">
                <input type="number" value="${p.puffs}" data-field="puffs" data-id="${p.id}">
            </td>
            <td class="editable-cell min-w-[150px]">
                <input type="text" value="${p.flavor || ''}" data-field="flavor" data-id="${p.id}" placeholder="Ex: Menta, Açai">
            </td>
            <td class="editable-cell w-[60px] text-center">
                <input type="checkbox" data-field="promo" data-id="${p.id}" ${p.promo ? 'checked' : ''}>
            </td>
            <td class="text-right whitespace-nowrap">
                <span class="opacity-0 group-hover:opacity-100 transition duration-200 text-[10px] text-white/40 mr-2 uppercase tracking-widest auto-save-badge-${p.id}"></span>
                <button class="text-red-500 hover:text-red-400 font-bold p-2 delete-single-btn" data-id="${p.id}">X</button>
            </td>
        `;

        // Direct Blur saves to database (Inline Edits)
        tr.querySelectorAll('input').forEach(input => {
            if (input.classList.contains('row-checkbox')) return; // ignore primary checkbox

            input.addEventListener('change', async (e) => {
                const badge = tr.querySelector(`.auto-save-badge-${p.id}`);
                badge.textContent = 'Salvando...';
                badge.classList.remove('opacity-0');

                try {
                    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                    if (e.target.type === 'number') val = parseFloat(val);

                    await updateProduct(p.id, { [e.target.dataset.field]: val });

                    badge.textContent = 'Salvo ✓';
                    badge.classList.add('text-green-500');
                    setTimeout(() => { badge.classList.add('opacity-0'); badge.classList.remove('text-green-500'); }, 2000);

                    const pIndex = allProducts.findIndex(pr => pr.id === p.id);
                    if (pIndex !== -1) allProducts[pIndex][e.target.dataset.field] = val;
                    if (e.target.dataset.field === 'stock') renderInventory();
                } catch (err) {
                    badge.textContent = 'Erro!';
                    badge.classList.add('text-red-500');
                }
            });
        });

        tbody.appendChild(tr);
    });

    bindSpreadsheetEvents();
    updateBulkActionsUI();
};

const setupProductsActions = () => {
    // Top bar filters
    document.getElementById('filter-search').addEventListener('input', renderSpreadsheet);
    document.getElementById('filter-promo').addEventListener('change', renderSpreadsheet);

    // Global check all
    document.getElementById('check-all').addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const visibleRows = document.querySelectorAll('.row-checkbox');
        visibleRows.forEach(cb => {
            cb.checked = isChecked;
            if (isChecked) selectedProductIds.add(cb.dataset.id);
            else selectedProductIds.delete(cb.dataset.id);
        });
        updateBulkActionsUI();
    });

    // Bulk delete
    document.getElementById('bulk-delete-btn').addEventListener('click', async () => {
        if (!selectedProductIds.size) return;
        if (confirm(`Excluir permanentemente ${selectedProductIds.size} produtos?`)) {
            try {
                await bulkDeleteProducts(Array.from(selectedProductIds));
                selectedProductIds.clear();
                document.getElementById('check-all').checked = false;
                await refreshData();
            } catch (error) {
                alert("Erro exclusão em massa: " + error.message);
            }
        }
    });
};

const bindSpreadsheetEvents = () => {
    // Row checks
    document.querySelectorAll('.row-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked) selectedProductIds.add(e.target.dataset.id);
            else selectedProductIds.delete(e.target.dataset.id);
            updateBulkActionsUI();
        });
    });

    // Sub delete
    document.querySelectorAll('.delete-single-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (confirm("Deletar produto?")) {
                try {
                    await deleteProduct(e.target.dataset.id);
                    await refreshData();
                } catch (err) { alert('Erro: ' + err.message) }
            }
        });
    });
};

const updateBulkActionsUI = () => {
    const act = document.getElementById('bulk-actions');
    const cnt = document.getElementById('selected-count');
    if (selectedProductIds.size > 0) {
        act.classList.remove('hidden');
        cnt.textContent = selectedProductIds.size;
    } else {
        act.classList.add('hidden');
    }
};

// =======================
// INVENTORY
// =======================

const renderInventory = () => {
    const tbody = document.getElementById('inventory-body');
    tbody.innerHTML = '';

    allProducts.forEach(p => {
        tbody.innerHTML += `
            <tr class="hover:bg-white/5 transition border-b border-white/5">
                <td>
                    <div class="font-bold text-sm">${p.name}</div>
                    <div class="text-[10px] text-white/50 uppercase tracking-widest">${p.brand} | ${p.flavor || 'Sem sabor'}</div>
                </td>
                <td class="text-center font-black text-xl text-[#00D4FF]">${p.stock || 0}</td>
                <td class="text-center">
                    <div class="inline-flex glass-card p-1 rounded-lg gap-2">
                        <input type="number" min="1" id="stock-val-${p.id}" value="1" class="w-16 bg-transparent text-center border border-white/10 rounded outline-none text-white focus:border-[#FF6321]">
                        <button class="bg-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition px-3 py-1 font-bold rounded" onclick="window.handleStockMove('${p.id}', 1)">+</button>
                        <button class="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition px-3 py-1 font-bold rounded" onclick="window.handleStockMove('${p.id}', -1)">-</button>
                    </div>
                </td>
            </tr>
        `;
    });
};

// Globally attach for inline onclicks in inventory
window.handleStockMove = async (id, multiplier) => {
    const input = document.getElementById(`stock-val-${id}`);
    const amount = parseInt(input.value) || 0;
    if (amount <= 0) return;

    const prod = allProducts.find(p => String(p.id) === String(id));
    if (!prod) return;

    const newStock = Math.max(0, (prod.stock || 0) + (amount * multiplier));

    try {
        await updateStock(id, newStock);
        prod.stock = newStock;
        renderInventory();
        renderSpreadsheet();
    } catch (err) {
        alert("Erro no estoque: " + err.message);
    }
};

// =======================
// INITIALIZATION
// =======================

document.addEventListener('DOMContentLoaded', async () => {

    // Check Auth
    protectPage(async () => {
        initTabs();
        setupProductsActions();
        setupSaleModal();
        setupCreateProductModal();
        await refreshData();
    });

    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const btn = loginForm.querySelector('button');
            const originalText = btn.textContent;

            try {
                btn.textContent = 'Autenticando...';
                btn.disabled = true;
                await login(email, password);
                await protectPage(async () => {
                    initTabs();
                    setupProductsActions();
                    setupSaleModal();
                    setupCreateProductModal();
                    await refreshData();
                });
            } catch (error) {
                alert('Erro de login: ' + (error.message || 'Verifique suas credenciais.'));
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    if (logoutBtn) logoutBtn.onclick = logout;
});
