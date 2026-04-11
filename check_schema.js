const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const url = env['NEXT_PUBLIC_LEARNCIL_SUPABASE_URL'] + '/rest/v1/';
const key = env['SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET'];

async function check() {
  console.log('Fetching Openapi Schema from:', url);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (!res.ok) {
       console.log('Error:', res.status, await res.text());
       return;
    }

    const data = await res.json();
    console.log('Schema fetched! Keys in definitions:');
    
    if (data && data.definitions && data.definitions.courses) {
      console.log('Courses properties:', Object.keys(data.definitions.courses.properties));
    } else {
      console.log('Courses definition not found.');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

check();
