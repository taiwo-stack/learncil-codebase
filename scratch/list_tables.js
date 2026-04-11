const fs = require('fs');

async function listTables() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const url = env.match(/NEXT_PUBLIC_LEARNCIL_SUPABASE_URL=(.*)/)[1].trim();
    const key = env.match(/SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET=(.*)/)[1].trim();

    console.log('Listing all tables in public schema...');
    try {
        // Querying the pg_tables view via RPC or a raw query if enabled, 
        // but here we just try to fetch a known non-existent table to see the error hint
        const res = await fetch(`${url}/rest/v1/`, {
            headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
        });
        const data = await res.json();
        console.log('Available routes:', data);
    } catch (e) {
        console.error('Failed to list tables:', e.message);
    }
}

listTables();
