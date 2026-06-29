import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

const newProducts = [
  // Empty Category 1: Shoes
  {
    id: 'prod-samstones-shoes-1',
    name: 'Nike Air Max 270 React',
    price: 125000,
    description: 'Premium running shoes with responsive cushioning and sleek design.',
    category: 'Shoes',
    images: [
      'https://picsum.photos/seed/shoe1/800/800',
      'https://picsum.photos/seed/shoe2/800/800',
      'https://picsum.photos/seed/shoe3/800/800'
    ],
    isNew: true,
    isTrending: true
  },
  // Empty Category 2: Clothes
  {
    id: 'prod-samstones-clothes-1',
    name: 'Vintage Oversized Denim Jacket',
    price: 45000,
    description: 'Classic washed denim jacket. Perfect for casual streetwear looks.',
    category: 'Clothes',
    images: [
      'https://picsum.photos/seed/clothes1/800/800',
      'https://picsum.photos/seed/clothes2/800/800',
      'https://picsum.photos/seed/clothes3/800/800'
    ],
    isNew: true
  },
  // Empty Category 3: Jewelries
  {
    id: 'prod-samstones-jewelries-1',
    name: '18K Solid Gold Cuban Link Chain',
    price: 850000,
    description: 'Authentic 18k solid gold chain. 24 inches long with diamond clasp.',
    category: 'Jewelries',
    images: [
      'https://picsum.photos/seed/jewelry1/800/800',
      'https://picsum.photos/seed/jewelry2/800/800',
      'https://picsum.photos/seed/jewelry3/800/800'
    ],
    isTrending: true
  }
];

async function seedEmptyCategories() {
  const { error } = await supabase.from('products').insert(newProducts);
  if (error) {
    console.log('Error inserting:', error);
  } else {
    console.log('Successfully inserted products into empty categories with 3 images each!');
  }
}
seedEmptyCategories();
