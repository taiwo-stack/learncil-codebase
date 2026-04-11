const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env['NEXT_PUBLIC_LEARNCIL_SUPABASE_URL'];
const serviceKey = env['SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET'];

const supabase = createClient(supabaseUrl, serviceKey);

async function debugAuth() {
  const email = 'learncildev@gmail.com';
  console.log('Checking for user:', email);

  // 1. Check profiles table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (profileError) {
    console.log('Profile fetch error (might not exist):', profileError.message);
  } else {
    console.log('Profile found:', profile);
  }

  // 2. Check auth.users via admin API
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError) {
    console.error('Auth admin error:', authError.message);
  } else {
    const user = users.find(u => u.email === email);
    if (user) {
      console.log('User found in auth.users:', {
        id: user.id,
        email: user.email,
        last_sign_in_at: user.last_sign_in_at
      });
      
      if (profile && profile.id !== user.id) {
        console.warn('CRITICAL: Profile ID mismatch! Profile ID:', profile.id, 'Auth ID:', user.id);
      }
    } else {
      console.log('User NOT found in auth.users.');
    }
  }
}

debugAuth();
