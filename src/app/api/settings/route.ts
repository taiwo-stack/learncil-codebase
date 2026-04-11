import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      // If table doesn't exist or isn't in cache, return empty data to prevent crash
      if (error.code === 'PGRST116' || error.code === 'PGRST205' || error.message.includes('not found')) {
        return NextResponse.json({ data: {}, warning: 'site_settings table not found in cache. Run NOTIFY pgrst, \'reload schema\'; in SQL editor.' });
      }
      throw error;
    }

    // Convert array of {key, value} to object {key: value}
    const settings = data.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json({ data: settings });
  } catch (error: any) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      .select();

    if (error) {
      if (error.code === 'PGRST205') {
        return NextResponse.json({ error: 'Schema cache error. Please try again in 30 seconds.' }, { status: 503 });
      }
      throw error;
    }

    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    console.error('Settings PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
