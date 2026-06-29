import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klvdemooqzjottxacxwc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdmRlbW9vcXpqb3R0eGFjeHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTUxODQsImV4cCI6MjA5NDk3MTE4NH0.fAo_dPkgXtZlLIt_OpePsjVLVTQcpqFuDLswuz06EJM'
);

const newProducts = [
  // Cosmetics
  {
    id: 'prod-' + Date.now() + '-1',
    name: 'Rejuvenating Night Cream',
    price: 45000,
    description: 'Premium anti-aging night cream with retinol and hyaluronic acid for glowing skin.',
    category: 'Cosmetics',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000'],
    isNew: true
  },
  {
    id: 'prod-' + Date.now() + '-2',
    name: 'Luxury Rose Water Toner',
    price: 15000,
    description: '100% pure organic rose water to hydrate and balance your skin pH.',
    category: 'Cosmetics',
    images: ['https://images.unsplash.com/photo-1608248593842-83b6329fc427?auto=format&fit=crop&q=80&w=1000']
  },
  // Phones & Accessories
  {
    id: 'prod-' + Date.now() + '-3',
    name: 'iPhone 15 Pro Max',
    price: 1850000,
    description: 'Brand new sealed iPhone 15 Pro Max 256GB Natural Titanium.',
    category: 'Phone Accessories',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true
  },
  {
    id: 'prod-' + Date.now() + '-4',
    name: 'Anker 20000mAh Power Bank',
    price: 35000,
    description: 'Fast charging high capacity power bank for all devices.',
    category: 'Phone Accessories',
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=1000']
  },
  // Drinks
  {
    id: 'prod-' + Date.now() + '-5',
    name: 'Hennessy VSOP Cognac',
    price: 85000,
    description: 'Premium cognac, perfectly balanced. 70cl bottle.',
    category: 'Drinks',
    images: ['https://images.unsplash.com/photo-1569529465841-dfecdab7503a?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true
  },
  // Provisions
  {
    id: 'prod-' + Date.now() + '-6',
    name: 'Kellogg\'s Corn Flakes (1kg)',
    price: 8500,
    description: 'Family size breakfast cereal. Original crisp taste.',
    category: 'Provisions',
    images: ['https://images.unsplash.com/photo-1521508605481-9b7a4de4b407?auto=format&fit=crop&q=80&w=1000']
  },
  {
    id: 'prod-' + Date.now() + '-7',
    name: 'Peak Full Cream Milk Powder',
    price: 16000,
    description: 'Rich and creamy instant milk powder, 900g tin.',
    category: 'Provisions',
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1000']
  },
  // Cars
  {
    id: 'prod-' + Date.now() + '-8',
    name: 'Toyota Camry 2021 XSE',
    price: 24000000,
    description: 'Foreign used, fully loaded, panoramic roof, red leather interior.',
    category: 'Cars',
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=1000'],
    year: '2021',
    mileage: '35,000 miles'
  },
  // Real Estates
  {
    id: 'prod-' + Date.now() + '-9',
    name: '4 Bedroom Terrace Duplex',
    price: 180000000,
    description: 'Brand new luxury terrace with BQ in a secure estate in Lekki Phase 1.',
    category: 'Real Estates',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000'],
    location: 'Lekki Phase 1, Lagos'
  },
  // Bags
  {
    id: 'prod-' + Date.now() + '-10',
    name: 'Gucci Marmont Crossbody',
    price: 1200000,
    description: 'Authentic designer crossbody bag in classic black leather.',
    category: 'Bags',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000']
  }
];

async function seed() {
  // Delete the test product
  await supabase.from('products').delete().like('id', 'test-%');

  const { data, error } = await supabase.from('products').insert(newProducts);
  if (error) {
    console.error('Seed failed:', error.message);
  } else {
    console.log('Seeded ' + newProducts.length + ' products successfully!');
  }
}

seed();
