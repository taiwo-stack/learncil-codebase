const fs = require('fs');

async function checkDb() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const url = env.match(/NEXT_PUBLIC_LEARNCIL_SUPABASE_URL=(.*)/)[1].trim();
    const key = env.match(/SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET=(.*)/)[1].trim();

    console.log('Target Project URL:', url);

    const check = async (table) => {
        console.log(`\nChecking table: ${table}`);
        try {
            const res = await fetch(`${url}/rest/v1/${table}?select=count`, {
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Prefer': 'count=exact'
                }
            });
            const data = await res.json();
            if (!res.ok) {
                console.error(`Error fetching ${table}:`, data);
            } else {
                console.log(`${table} count:`, res.headers.get('content-range'));
                // Fetch a sample
                const sampleRes = await fetch(`${url}/rest/v1/${table}?limit=1`, {
                    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
                });
                const sample = await sampleRes.json();
                console.log(`${table} Sample:`, JSON.stringify(sample, null, 2));
            }
        } catch (e) {
            console.error(`Fetch failed for ${table}:`, e.message);
        }
    };

    await check('appointments');
    await check('site_settings');
    await check('profiles');
}

checkDb();
