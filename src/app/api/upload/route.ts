import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_LEARNCIL_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_LEARNCIL_SERVICE_ROLE_SECRET!;
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    const bucketName = 'course_materials';

    // 1. Ensure bucket exists and is public
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
      console.error('[Upload] listBuckets error:', listError);
      return NextResponse.json({ error: `Storage access error: ${listError.message}` }, { status: 500 });
    }
    
    if (!buckets?.find((b) => b.name === bucketName)) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, { public: true });
      if (createError) {
        console.error('[Upload] createBucket error:', createError);
        return NextResponse.json({ error: `Could not create storage bucket: ${createError.message}` }, { status: 500 });
      }
    }

    // 2. Prepare file data
    const fileExt = file.name.split('.').pop() || 'pdf';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload using SDK with Buffer
    console.log(`[Upload] Attempting SDK upload: ${fileName} to ${bucketName}`);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type || 'application/pdf',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('[Upload] SDK upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('API Upload Exception:', error);
    if (error.message?.includes('ECONNRESET')) {
      return NextResponse.json({ 
        error: 'Connection reset (ECONNRESET). This often happens if the bucket "course_materials" is missing or your network is blocking the request. Please verify the bucket exists in your Supabase dashboard.' 
      }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
