import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey && supabaseUrl !== 'your_supabase_url'

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseKey)
    : null
