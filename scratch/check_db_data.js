const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkData() {
  console.log('Checking appointments...');
  const { data: apts, error: aptError } = await supabase.from('appointments').select('count');
  if (aptError) console.error('Appointments error:', aptError);
  else console.log('Appointment count:', apts);

  console.log('Checking site_settings...');
  const { data: settings, error: settingsError } = await supabase.from('site_settings').select('*');
  if (settingsError) console.error('Site Settings error:', settingsError);
  else console.log('Site Settings data:', settings);
}

checkData();
