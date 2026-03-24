/**
 * Product Form Component Logic
 */

import { fileToBase64 } from '../assets/js/utils.js';

export const initProductForm = (formId, options = {}) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const imageInput = document.getElementById('p-image');
    const previewImg = document.getElementById('preview-img');
    const imagePreview = document.getElementById('image-preview');
    const cancelBtn = document.getElementById('cancel-btn');
    
    let currentImageBase64 = '';

    // Image Preview Handler
    if (imageInput) {
        imageInput.addEventListener('change', async function() {
            const file = this.files[0];
            if (file) {
                try {
                    currentImageBase64 = await fileToBase64(file);
                    if (previewImg) previewImg.src = currentImageBase64;
                    if (imagePreview) imagePreview.classList.remove('hidden');
                } catch (error) {
                    console.error("Error converting image:", error);
                }
            }
        });
    }

    // Form Submit Handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('product-id')?.value;
        const productData = {
            name: document.getElementById('p-name').value,
            brand: document.getElementById('p-brand').value,
            puffs: parseInt(document.getElementById('p-puffs').value),
            price: parseFloat(document.getElementById('p-price').value),
            promo: document.getElementById('p-promo').checked,
            flavor: document.getElementById('p-flavors').value,
        };

        if (currentImageBase64) {
            productData.image = currentImageBase64;
        } else if (id) {
            // If editing and no new image, keep the old one
            const existingImg = previewImg?.src;
            if (existingImg && !existingImg.includes('data:image/')) {
                productData.image = existingImg;
            }
        }

        if (options.onSubmit) {
            await options.onSubmit(id, productData);
        }
        
        resetForm();
    });

    // Cancel Handler
    if (cancelBtn) {
        cancelBtn.onclick = () => {
            resetForm();
            if (options.onCancel) options.onCancel();
        };
    }

    const resetForm = () => {
        form.reset();
        if (document.getElementById('product-id')) document.getElementById('product-id').value = '';
        if (imagePreview) imagePreview.classList.add('hidden');
        currentImageBase64 = '';
        
        // Reset UI labels
        const formTitle = document.getElementById('form-title');
        const submitBtn = document.getElementById('submit-btn');
        if (formTitle) formTitle.textContent = 'Adicionar Produto';
        if (submitBtn) submitBtn.textContent = 'Salvar Produto';
        if (cancelBtn) cancelBtn.classList.add('hidden');
    };

    const fillForm = (product) => {
        if (document.getElementById('product-id')) document.getElementById('product-id').value = product.id;
        document.getElementById('p-name').value = product.name;
        document.getElementById('p-brand').value = product.brand;
        document.getElementById('p-puffs').value = product.puffs;
        document.getElementById('p-price').value = product.price;
        document.getElementById('p-promo').checked = product.promo;
        document.getElementById('p-flavors').value = product.flavor || '';
        
        if (previewImg) previewImg.src = product.image;
        if (imagePreview) imagePreview.classList.remove('hidden');
        currentImageBase64 = '';

        const formTitle = document.getElementById('form-title');
        const submitBtn = document.getElementById('submit-btn');
        if (formTitle) formTitle.textContent = 'Editar Produto';
        if (submitBtn) submitBtn.textContent = 'Atualizar Produto';
        if (cancelBtn) cancelBtn.classList.remove('hidden');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        resetForm,
        fillForm
    };
};
