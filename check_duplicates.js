import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

async function check() {
  const { data, error } = await supabase.from('products').select('id, name');
  console.log(data);
}
check();
