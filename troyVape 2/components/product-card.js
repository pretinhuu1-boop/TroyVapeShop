/**
 * Product Card Component - Cloud Lab
 * Note: Product data comes from our own trusted sources (Supabase or hardcoded samples),
 * not from user input, so innerHTML usage here is safe.
 */

import { formatCurrency } from '../assets/js/utils.js';

const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

export const createProductCard = (product, onClick) => {
    const card = document.createElement('div');
    card.className = `product-card cursor-pointer ${product.promo ? 'promo-card' : ''}`;
    card.onclick = () => onClick(product.id);

    const safeName = escapeHtml(product.name);
    const safeBrand = escapeHtml(product.brand);

    const promoBadge = product.promo
        ? `<div class="absolute top-3 right-3 z-10 promo-badge-green">Promo</div>`
        : '';

    const oldPriceHtml = product.promo && product.oldPrice
        ? `<span class="text-white/25 line-through text-xs">${escapeHtml(formatCurrency(product.oldPrice))}</span>`
        : '';

    const puffsFormatted = product.puffs >= 1000
        ? `${(product.puffs / 1000).toFixed(product.puffs % 1000 === 0 ? 0 : 1)}K`
        : product.puffs;

    // Image element created safely
    const imgContainer = document.createElement('div');
    imgContainer.className = 'product-image';

    if (product.promo) {
        const badge = document.createElement('div');
        badge.className = 'absolute top-3 right-3 z-10 promo-badge-green';
        badge.textContent = 'Promo';
        imgContainer.appendChild(badge);
    }

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'w-full h-full object-cover';
    img.referrerPolicy = 'no-referrer';
    img.loading = 'lazy';
    imgContainer.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const overlayText = document.createElement('span');
    overlayText.className = 'text-[11px] font-medium text-white/80 tracking-wide';
    overlayText.textContent = 'Ver detalhes →';
    overlay.appendChild(overlayText);
    imgContainer.appendChild(overlay);

    card.appendChild(imgContainer);

    // Info section
    const info = document.createElement('div');
    info.className = 'p-4 md:p-5 flex-grow flex flex-col';

    // Brand + puffs row
    const topRow = document.createElement('div');
    topRow.className = 'flex justify-between items-center mb-2';

    const brandSpan = document.createElement('span');
    brandSpan.className = 'text-[10px] uppercase tracking-[0.15em] font-bold text-gradient-gold';
    brandSpan.textContent = product.brand;
    topRow.appendChild(brandSpan);

    const puffsSpan = document.createElement('span');
    puffsSpan.className = 'text-[10px] uppercase tracking-[0.1em] font-semibold text-white/25';
    puffsSpan.textContent = `${puffsFormatted} puffs`;
    topRow.appendChild(puffsSpan);

    info.appendChild(topRow);

    // Name
    const nameEl = document.createElement('h3');
    nameEl.className = 'text-sm md:text-base font-bold mb-3 leading-tight tracking-tight';
    nameEl.textContent = product.name;
    info.appendChild(nameEl);

    // Price + CTA
    const bottom = document.createElement('div');
    bottom.className = 'mt-auto';

    const priceRow = document.createElement('div');
    priceRow.className = 'flex items-baseline gap-2 mb-3';

    if (product.promo && product.oldPrice) {
        const oldPrice = document.createElement('span');
        oldPrice.className = 'text-white/25 line-through text-xs';
        oldPrice.textContent = formatCurrency(product.oldPrice);
        priceRow.appendChild(oldPrice);
    }

    const price = document.createElement('span');
    price.className = 'text-lg md:text-xl font-black text-gradient-gold';
    price.textContent = formatCurrency(product.price);
    priceRow.appendChild(price);

    bottom.appendChild(priceRow);

    const cta = document.createElement('a');
    cta.href = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá tenho interesse no ' + product.name)}`;
    cta.target = '_blank';
    cta.onclick = (e) => e.stopPropagation();
    cta.className = 'w-full block text-center btn-primary py-2.5 md:py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider';
    const ctaSpan = document.createElement('span');
    ctaSpan.textContent = 'Comprar';
    cta.appendChild(ctaSpan);
    bottom.appendChild(cta);

    info.appendChild(bottom);
    card.appendChild(info);

    return card;
};
