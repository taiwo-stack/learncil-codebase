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

async function createAdmin() {
  const email = 'learncildev@gmail.com';
  const password = 'Learncildev';
  
  console.log('Creating admin user:', email);

  // 1. Create user in auth.users
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  });

  if (error) {
    console.error('Sign up error:', error.message);
    if (error.message.includes('already exists')) {
        console.log('User already exists, checking profile...');
    } else {
        process.exit(1);
    }
  }

  const user = data.user || (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === email);
  
  if (!user) {
    console.error('Could not find user after creation attempt.');
    process.exit(1);
  }

  console.log('User ID:', user.id);

  // 2. Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert([
      {
        id: user.id,
        email: email,
        role: 'admin',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      }
    ]);

  if (profileError) {
    console.error('Profile creation error:', profileError.message);
    process.exit(1);
  }

  console.log('Admin account and profile successfully created/updated.');
}

createAdmin();
