import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

async function testUpdate() {
  const { data, error } = await supabase.from('products').update({ name: 'Testing Update' }).eq('id', 'prod-samstones-3').select();
  console.log('Updated:', data);
  console.log('Error:', error);
}

testUpdate();
