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

async function listProfiles() {
  console.log('Listing all profiles:');
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error listing profiles:', error.message);
  } else {
    console.log('Profiles counts:', data.length);
    console.log(JSON.stringify(data, null, 2));
  }
}

listProfiles();
