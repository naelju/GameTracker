import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY  

export const supabase = createClient(supabaseUrl, supabaseKey)

// Create Supabase client with admin key if provided, otherwise use regular key
export const getSupabaseClient = (adminKey = '') => {
  const key = adminKey || import.meta.env.VITE_SUPABASE_ANON_KEY
  return createClient(supabaseUrl, key)
}
