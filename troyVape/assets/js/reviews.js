/**
 * Cloud Lab Store - Reviews Service
 */

import { supabase, isSupabaseConfigured } from './supabase.js';

export const getReviews = async (productId) => {
    if (!isSupabaseConfigured) {
        return []; // Sem avaliações no modo local
    }

    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
    return data;
};

export const createReview = async (productId, rating, comment) => {
    if (!isSupabaseConfigured) {
        throw new Error('Avaliações não habilitadas no modo offline.');
    }

    const { data, error } = await supabase
        .from('reviews')
        .insert([{
            product_id: productId,
            rating,
            comment,
            date: new Date().toLocaleDateString('pt-BR')
        }])
        .select();

    if (error) throw error;
    return data[0];
};
