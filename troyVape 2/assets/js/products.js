import { supabase, isSupabaseConfigured } from './supabase.js'

// Toggle para usar API local (Express + SQLite) em vez do Supabase
const USE_LOCAL_API = true; 

export const getProducts = async () => {
    if (USE_LOCAL_API) {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Erro ao buscar produtos localmente');
        return res.json();
    }

    if (!isSupabaseConfigured) return []

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export const getProduct = async (id) => {
    if (USE_LOCAL_API) {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar produto localmente');
        return res.json();
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export const createProduct = async (productData) => {
    if (USE_LOCAL_API) {
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Erro ao criar produto localmente');
        return res.json();
    }

    const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()

    if (error) throw error
    return data[0]
}

export const updateProduct = async (id, productData) => {
    if (USE_LOCAL_API) {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Erro ao atualizar produto localmente');
        return res.json();
    }

    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()

    if (error) throw error
    return data[0]
}

export const deleteProduct = async (id) => {
    if (USE_LOCAL_API) {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao deletar produto localmente');
        return true;
    }

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

export const filterProducts = (products, searchTerm) => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        (p.flavor && p.flavor.toLowerCase().includes(term))
    );
};

// ----- NEW MASS/STOCK/SALES ENDPOINTS -----

export const bulkDeleteProducts = async (ids) => {
    if (USE_LOCAL_API) {
        // SQLite: Excluir um por um ou endpoint múltiplo. 
        // Para simplificar, rodamos um loop.
        for (const id of ids) {
            await deleteProduct(id);
        }
        return true;
    }

    const { error } = await supabase
        .from('products')
        .delete()
        .in('id', ids);
    if (error) throw error;
    return true;
};

export const updateStock = async (id, newStock) => {
    if (USE_LOCAL_API) {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: newStock })
        });
        if (!res.ok) throw new Error('Erro ao atualizar estoque localmente');
        return res.json();
    }

    const { data, error } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', id)
        .select();
    if (error) throw error;
    return data[0];
};

export const createSale = async (saleData) => {
    if (USE_LOCAL_API) {
        const res = await fetch('/api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saleData)
        });
        if (!res.ok) throw new Error('Erro ao registrar venda localmente');
        return res.json();
    }

    const { data, error } = await supabase
        .from('sales')
        .insert([saleData])
        .select();
    if (error) throw error;
    return data[0];
};

export const getSales = async () => {
    if (USE_LOCAL_API) {
        const res = await fetch('/api/sales');
        if (!res.ok) throw new Error('Erro ao buscar vendas localmente');
        return res.json();
    }

    const { data, error } = await supabase
        .from('sales')
        .select(`
            *,
            products ( name, price )
        `)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const uploadImage = async (file) => {
    if (USE_LOCAL_API) {
        // Para API local, convertemos para base64 e retornamos o base64 diretamente!
        // O server.js vai receber o base64 no POST/PUT e salvar em arquivo.
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
};
