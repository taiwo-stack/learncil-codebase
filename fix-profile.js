require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function fixProfile() {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing env variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Find the exact user uuid for learncildev@gmail.com inside the auth.users table
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error('Failed to list users:', listError);
    process.exit(1);
  }

  const specificUser = users.find(u => u.email === 'learncildev@gmail.com');
  
  if (!specificUser) {
    console.log('Account highly likely not created inside Supabase Auth yet!');
    process.exit(0);
  }

  console.log(`Found Auth User: ${specificUser.id}. Attempting to establish profile link...`);

  // Forcefully insert relying on Service Role secret to bypass all Row Level Security issues
  const { error: insertError } = await supabase.from('profiles').upsert([{
    id: specificUser.id,
    email: specificUser.email,
    role: 'admin',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  }]);

  if (insertError) {
    console.error('Insertion failed:', insertError);
  } else {
    console.log('Success! Administrator profile row effectively created.');
  }
}

fixProfile();
