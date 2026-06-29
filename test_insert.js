import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

async function testInsert() {
  const { data, error } = await supabase.from('products').insert([{
    id: 'test-' + Date.now(),
    name: 'Test Product',
    price: 100,
    category: 'Cosmetics',
    description: 'Test',
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000']
  }]);
  
  if (error) {
    console.error('Insert failed:', error.message);
  } else {
    console.log('Insert succeeded!');
  }
}

testInsert();
