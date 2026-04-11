import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Visit this URL: http://localhost:3000/api/setup-courses
// It will test if the server can see the 'courses' table using the Service Role Key.
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ 
      error: 'Missing environment variables',
      url_present: !!supabaseUrl,
      key_present: !!serviceRoleKey
    }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const projectRef = supabaseUrl.split('//')[1].split('.')[0];

  try {
    // TEST 1: Check if the table exists in the system catalog
    const { data: tableCheck, error: tableError } = await supabase
      .rpc('get_table_info', { table_name_input: 'courses' }); // We might not have this function, let's try raw select

    // TEST 2: Try to fetch directly
    const { data, error, status, statusText } = await supabase
      .from('courses')
      .select('count')
      .limit(1);

    return NextResponse.json({
      project: projectRef,
      diagnostics: {
        status,
        statusText,
        error_code: error?.code,
        error_message: error?.message,
        did_find_table: !error || error.code !== 'PGRST205',
        data_count: data
      },
      instructions: error?.code === 'PGRST205' 
        ? "The table 'courses' is MISSION from the database. Please run the courses_seed.sql in the Supabase SQL Editor for project: " + projectRef
        : "The table exists! If the dashboard says it's missing, it is a CACHE issue. Try clearing your browser cache."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
