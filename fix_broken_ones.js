import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

const fixedProducts = [
  {
    id: 'prod-samstones-2-fixed',
    name: 'Luxury Rose Water Toner',
    price: 15000,
    description: '100% pure organic rose water to hydrate and balance your skin pH.',
    category: 'Cosmetics',
    images: ['https://picsum.photos/seed/toner123/600/800']
  },
  {
    id: 'prod-samstones-5-fixed',
    name: 'Hennessy VSOP Cognac',
    price: 85000,
    description: 'Premium cognac, perfectly balanced. 70cl bottle.',
    category: 'Drinks',
    images: ['https://picsum.photos/seed/cognac123/600/800'],
    isTrending: true
  },
  {
    id: 'prod-samstones-6-fixed',
    name: 'Kellogg\'s Corn Flakes (1kg)',
    price: 8500,
    description: 'Family size breakfast cereal. Original crisp taste.',
    category: 'Provisions',
    images: ['https://picsum.photos/seed/cereal123/600/800']
  },
  {
    id: 'prod-samstones-8-fixed',
    name: 'Toyota Camry 2021 XSE',
    price: 24000000,
    description: 'Foreign used, fully loaded, panoramic roof, red leather interior.',
    category: 'Cars',
    images: ['https://picsum.photos/seed/camry123/800/600'],
    year: '2021',
    mileage: '35,000 miles'
  }
];

async function fix() {
  // Delete the broken ones
  await supabase.from('products').delete().eq('id', 'prod-samstones-5');
  await supabase.from('products').delete().eq('id', 'prod-samstones-6');
  await supabase.from('products').delete().eq('id', 'prod-samstones-8');
  
  // Insert the fixed ones
  const { error } = await supabase.from('products').insert(fixedProducts);
  if (error) {
    console.log('Error inserting:', error);
  } else {
    console.log('Successfully replaced broken products with guaranteed working Picsum images!');
  }
}
fix();
