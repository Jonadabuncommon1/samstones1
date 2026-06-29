import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

async function fix() {
  await supabase.from('products').update({
    images: ['https://picsum.photos/seed/toner/600/800']
  }).eq('name', 'Luxury Rose Water Toner');

  await supabase.from('products').update({
    images: ['https://picsum.photos/seed/cognac/600/800']
  }).eq('name', 'Hennessy VSOP Cognac');

  await supabase.from('products').update({
    images: ['https://picsum.photos/seed/cereal/600/800']
  }).eq('name', 'Kellogg\'s Corn Flakes (1kg)');

  await supabase.from('products').update({
    images: ['https://picsum.photos/seed/camry/800/600']
  }).eq('name', 'Toyota Camry 2021 XSE');
  
  console.log('Fixed URLs with Picsum!');
}

fix();
