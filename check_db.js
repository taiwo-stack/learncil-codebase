
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env['NEXT_PUBLIC_LEARNCIL_SUPABASE_URL'];
const serviceKey = env['SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET'];

if (!supabaseUrl || !serviceKey) {
  console.error('Missing credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function check() {
  console.log('Searching for "courses" table in all schemas...');
  try {
    const { data: tableLocation, error } = await supabase
      .from('information_schema.tables')
      .select('table_schema, table_name')
      .eq('table_name', 'courses');

    if (error) {
      console.error('Error searching schemas:', error);
    } else {
      console.log('Found "courses" at:', tableLocation);
    }

    const { data: buckets } = await supabase.storage.listBuckets();
    console.log('Buckets:', buckets?.map(b => b.name));

  } catch (err) {
    console.error('Diag error:', err);
  }
}

check();
