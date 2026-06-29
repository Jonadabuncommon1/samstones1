import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

async function testAuth() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@samstones.com',
    password: 'SamstonesResources@jw.org26'
  });
  console.log('Auth:', authData?.user?.email, authError?.message);

  if (authData.user) {
    const { data: updateData, error: updateError } = await supabase.from('products').update({ name: 'Toyota Camry 2021 XSE Updated' }).eq('id', 'prod-samstones-8').select();
    console.log('Update Data:', updateData);
    console.log('Update Error:', updateError);

    const { data: deleteData, error: deleteError } = await supabase.from('products').delete().eq('id', 'prod-samstones-8').select();
    console.log('Delete Data:', deleteData);
    console.log('Delete Error:', deleteError);
  }
}

testAuth();
