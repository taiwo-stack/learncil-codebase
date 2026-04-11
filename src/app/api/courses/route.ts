import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET /api/courses — always serves data (fallback to static if DB is unavailable)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET || '';

    const url = `${supabaseUrl}/rest/v1/courses?status=eq.published&order=created_at.asc${type !== 'all' ? `&type=eq.${type}` : ''}`;
    
    try {
      const res = await fetch(url, {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`
        }
      });
      
      if (!res.ok) {
        const err = await res.json();
        console.warn('[/api/courses] Database query error:', err.message);
        return NextResponse.json({ error: err.message, source: 'database' }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json({ data: data || [], count: data?.length || 0, source: 'database' });
    } catch (e: any) {
      console.error('[/api/courses] Exception:', e);
      return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
    }


  // If no credentials are provided
  return NextResponse.json({ error: 'Supabase credentials missing' }, { status: 500 });
}

// Helper: call Supabase REST/PostgREST directly via raw HTTP to bypass stale schema cache
async function supabaseRest(
  method: 'POST' | 'PATCH' | 'DELETE',
  supabaseUrl: string,
  serviceKey: string,
  path: string,
  body?: object,
  extraHeaders?: Record<string, string>
) {
  const url = `${supabaseUrl}/rest/v1/${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...extraHeaders
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let json: any = null;
  try { json = JSON.parse(text); } catch { json = text; }
  return { ok: res.ok, status: res.status, json };
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;
  const body = await request.json();

  const { ok, status, json } = await supabaseRest('POST', supabaseUrl, serviceKey, 'courses', body);
  if (!ok) {
    const errMsg = json?.message || json?.error || JSON.stringify(json);
    return NextResponse.json({ error: errMsg, code: json?.code }, { status: 500 });
  }
  return NextResponse.json({ data: Array.isArray(json) ? json[0] : json });
}

export async function PATCH(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;
  const body = await request.json();
  const { id, ...updates } = body;

  const { ok, status, json } = await supabaseRest(
    'PATCH',
    supabaseUrl,
    serviceKey,
    `courses?id=eq.${encodeURIComponent(id)}`,
    updates
  );
  if (!ok) {
    const errMsg = json?.message || json?.error || JSON.stringify(json);
    return NextResponse.json({ error: errMsg, code: json?.code }, { status: 500 });
  }
  return NextResponse.json({ data: Array.isArray(json) ? json[0] : json });
}

export async function DELETE(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { ok, json } = await supabaseRest(
    'DELETE',
    supabaseUrl,
    serviceKey,
    `courses?id=eq.${encodeURIComponent(id)}`
  );
  if (!ok) {
    const errMsg = json?.message || json?.error || JSON.stringify(json);
    return NextResponse.json({ error: errMsg, code: json?.code }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
