/**
 * Modal Component Logic
 */

import { getReviews } from '../assets/js/reviews.js';
import { formatCurrency } from '../assets/js/utils.js';

export const openProductModal = async (product, onReviewSubmit) => {
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-image');
    if (modalImg) {
        modalImg.src = product.image;
        modalImg.alt = product.name;
    }
    
    const brandEl = document.getElementById('modal-brand');
    const puffsEl = document.getElementById('modal-puffs');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-description');
    const priceEl = document.getElementById('modal-price');

    if (brandEl) brandEl.textContent = product.brand;
    if (puffsEl) puffsEl.textContent = `${product.puffs} Puffs`;
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) descEl.textContent = product.description || product.flavor || 'Sem descrição disponível.';
    if (priceEl) priceEl.textContent = formatCurrency(product.price);
    
    // Render Flavors & Whatsapp Link
    const flavorsContainer = document.getElementById('modal-flavors');
    const whatsappBtn = document.getElementById('modal-whatsapp-btn');
    
    if (flavorsContainer) {
        flavorsContainer.innerHTML = '';
        const flavorData = product.flavors || product.flavor;
        
        if (flavorData) {
            const flavors = Array.isArray(flavorData) ? flavorData : flavorData.split(',').map(f => f.trim());
            let selectedFlavor = flavors[0];

            const updateWhatsappLink = (flavor) => {
                if (whatsappBtn) {
                    whatsappBtn.href = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Tenho interesse no ' + product.name + ' (Sabor: ' + flavor + ')')}`;
                }
            };

            // Initial update
            updateWhatsappLink(selectedFlavor);

            flavors.forEach((flavor, index) => {
                const btn = document.createElement('button');
                btn.className = `flavor-pill px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border`;
                btn.textContent = flavor;

                // Estilo inicial
                if (index === 0) {
                    btn.style.backgroundColor = 'var(--gold, #fbbf24)';
                    btn.style.color = '#000';
                    btn.style.borderColor = 'var(--gold, #fbbf24)';
                } else {
                    btn.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    btn.style.borderColor = 'rgba(255,255,255,0.1)';
                    btn.style.color = 'rgba(255,255,255,0.5)';
                }

                btn.onclick = () => {
                    // Desmarcar todos
                    document.querySelectorAll('.flavor-pill').forEach(b => {
                        b.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        b.style.borderColor = 'rgba(255,255,255,0.1)';
                        b.style.color = 'rgba(255,255,255,0.5)';
                    });
                    // Marcar atual
                    btn.style.backgroundColor = 'var(--gold, #fbbf24)';
                    btn.style.color = '#000';
                    btn.style.borderColor = 'var(--gold, #fbbf24)';
                    selectedFlavor = flavor;
                    updateWhatsappLink(selectedFlavor);
                };

                flavorsContainer.appendChild(btn);
            });
            document.getElementById('modal-flavors-container')?.classList.remove('hidden');
        } else {
            document.getElementById('modal-flavors-container')?.classList.add('hidden');
            if (whatsappBtn) {
                whatsappBtn.href = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Tenho interesse no ' + product.name)}`;
            }
        }
    }
    
    await renderReviews(product.id);
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';

    // Set up review form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.onsubmit = async (e) => {
            e.preventDefault();
            const rating = document.querySelector('input[name="rating"]:checked')?.value;
            const comment = document.getElementById('review-comment').value;

            if (!rating) {
                alert('Por favor, selecione uma nota.');
                return;
            }

            if (onReviewSubmit) {
                await onReviewSubmit(product.id, parseInt(rating), comment);
                await renderReviews(product.id);
            }
            e.target.reset();
        };
    }
};

export const closeProductModal = () => {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
};

export const renderReviews = async (productId) => {
    const productReviews = await getReviews(productId);
    const list = document.getElementById('reviews-list');
    if (!list) return;
    
    list.innerHTML = '';

    if (productReviews.length === 0) {
        list.innerHTML = '<p class="text-white/30 text-xs italic">Ainda não há avaliações para este produto.</p>';
        return;
    }

    productReviews.forEach(rev => {
        const div = document.createElement('div');
        div.className = 'border-b border-white/5 pb-4';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="text-[#fbbf24] text-xs">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</div>
                <span class="text-[10px] text-white/20 uppercase font-bold">${rev.date || new Date(rev.created_at).toLocaleDateString()}</span>
            </div>
            <p class="text-sm text-white/60 leading-relaxed">${rev.comment}</p>
        `;
        list.appendChild(div);
    });
};
