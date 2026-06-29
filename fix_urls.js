import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

async function fix() {
  await supabase.from('products').update({
    images: ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1000']
  }).eq('name', 'Luxury Rose Water Toner');

  await supabase.from('products').update({
    images: ['https://images.unsplash.com/photo-1569529465841-dfecdab7503a?auto=format&fit=crop&q=80&w=1000']
  }).eq('name', 'Hennessy VSOP Cognac');

  await supabase.from('products').update({
    images: ['https://images.unsplash.com/photo-1521508605481-9b7a4de4b407?auto=format&fit=crop&q=80&w=1000']
  }).eq('name', 'Kellogg\'s Corn Flakes (1kg)');

  await supabase.from('products').update({
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=1000']
  }).eq('name', 'Toyota Camry 2021 XSE');
  
  console.log('Fixed URLs!');
}

fix();
