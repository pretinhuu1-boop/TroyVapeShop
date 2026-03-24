/**
 * Cloud Lab Store - Authentication Module
 * Handles Supabase Auth integration
 */

import { supabase, isSupabaseConfigured } from './supabase.js';

/**
 * Login with email and password
 * @param {string} email 
 * @param {string} password 
 */
export const login = async (email, password) => {
    if (!isSupabaseConfigured) {
        // Fallback para desenvolvimento local sem Supabase
        if (password === 'admin' || password === '123456') {
            localStorage.setItem('cloud_lab_admin_session', 'true');
            return { user: { email: email || 'admin@cloudlab.com' } };
        } else {
            throw new Error('Senha incorreta para o modo de desenvolvimento local.');
        }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    if (error) throw error;
    return data;
};

/**
 * Logout current user
 */
export const logout = async () => {
    if (!isSupabaseConfigured) {
        localStorage.removeItem('cloud_lab_admin_session');
        window.location.reload();
        return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.reload();
};

/**
 * Get current session
 */
export const getSession = async () => {
    if (!isSupabaseConfigured) {
        const loggedIn = localStorage.getItem('cloud_lab_admin_session');
        return loggedIn === 'true' ? { user: { email: 'Admin Local' } } : null;
    }

    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) return null;
    return session;
};

/**
 * Check if user is authenticated
 */
export const checkSession = async () => {
    const session = await getSession();
    return !!session;
};

/**
 * Protect a page - redirect to login if not authenticated
 * This is a helper for admin.js
 */
export const protectPage = async (onAuthSuccess) => {
    const session = await getSession();
    
    const loginSection = document.getElementById('login-section');
    const adminDashboard = document.getElementById('admin-dashboard');
    
    if (!session) {
        if (loginSection) loginSection.classList.remove('hidden');
        if (adminDashboard) adminDashboard.classList.add('hidden');
    } else {
        if (loginSection) loginSection.classList.add('hidden');
        if (adminDashboard) adminDashboard.classList.remove('hidden');
        if (onAuthSuccess) onAuthSuccess(session);
    }
};
