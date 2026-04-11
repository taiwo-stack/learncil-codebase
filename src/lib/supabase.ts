import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_ANON_KEY || '';

if (supabaseUrl) {
  const projectRef = supabaseUrl.includes('supabase.co') 
    ? supabaseUrl.split('//')[1].split('.')[0] 
    : 'unknown';
  console.log(`[Supabase DEBUG] Target Project: ${projectRef}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

