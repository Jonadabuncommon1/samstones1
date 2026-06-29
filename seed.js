import { createClient } from '@supabase/supabase-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const brainDir = 'C:\\Users\\ed\\.gemini\\antigravity-ide\\brain\\788cfec0-dc64-4208-8d73-0f79f46a72b1';

// I will look up the specific generated image filenames here
// In Node, I can just scan the directory for the prefixes
const files = fs.readdirSync(brainDir);

const categories = [
  { name: 'Shoes', prefix: 'shoes_', title: 'Premium Leather Oxford Shoes', price: 120000, desc: 'Handcrafted premium leather Oxford shoes, perfect for formal occasions.', isTrending: true },
  { name: 'Bags', prefix: 'bags_', title: 'Luxury Leather Handbag', price: 85000, desc: 'A stunning designer leather handbag with gold accents and premium finish.', isTrending: true },
  { name: 'Clothes', prefix: 'clothes_', title: 'Tailored Senator Suit', price: 150000, desc: 'Impeccably tailored African Senator suit made from the finest materials.', isTrending: true },
  { name: 'Jewelries', prefix: 'jewelries_', title: 'Exquisite Diamond Necklace', price: 450000, desc: 'A sparkling diamond necklace set on white gold, perfect for statements.', isTrending: true },
  { name: 'Cars', prefix: 'cars_', title: '2024 Luxury SUV', price: 180000000, desc: 'Brand new luxury SUV with advanced tech, panoramic roof, and leather interior.', isTrending: true },
  { name: 'Phone Accessories', prefix: 'phone_accessories_', title: 'Premium Wireless Earbuds', price: 150000, desc: 'High-fidelity active noise-canceling wireless earbuds.', isTrending: true },
  { name: 'Drinks', prefix: 'drinks_', title: 'Vintage Luxury Champagne', price: 250000, desc: 'A rare bottle of vintage champagne for your finest celebrations.', isTrending: false },
  { name: 'Cosmetics', prefix: 'cosmetics_', title: 'Signature Gold Perfume', price: 95000, desc: 'An exotic, long-lasting premium fragrance with notes of oud and vanilla.', isTrending: false },
  { name: 'Provisions', prefix: 'provisions_', title: 'Luxury Gift Hamper', price: 120000, desc: 'A beautifully arranged hamper packed with premium imported provisions.', isTrending: false },
  { name: 'Real Estates', prefix: 'real_estates_', title: 'Modern Infinity Pool Mansion', price: 450000000, desc: 'A breathtaking modern mansion in a prime location featuring a stunning infinity pool.', isTrending: false }
];

async function seed() {
  console.log('Starting seed process...');
  
  for (const cat of categories) {
    // Find the image file
    const imgFile = files.find(f => f.startsWith(cat.prefix) && f.endsWith('.png'));
    if (!imgFile) {
      console.error(`Could not find image for ${cat.name}`);
      continue;
    }
    
    const imgPath = path.join(brainDir, imgFile);
    const imgData = fs.readFileSync(imgPath);
    
    // Upload to Supabase
    const ext = '.png';
    const filename = `seed-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
    
    console.log(`Uploading ${cat.name} image to Supabase...`);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filename, imgData, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error(`Failed to upload ${cat.name}:`, uploadError);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(uploadData.path);
      
    const imageUrl = publicUrlData.publicUrl;
    
    // Create product in Firestore
    const productId = `prod-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const productData = {
      id: productId,
      name: cat.title,
      description: cat.desc,
      price: cat.price,
      category: cat.name,
      images: [imageUrl],
      isTrending: cat.isTrending,
      isNew: true,
      colors: cat.name === 'Shoes' || cat.name === 'Bags' || cat.name === 'Clothes' ? ['Black', 'Brown'] : [],
      sizes: cat.name === 'Shoes' ? ['40', '42', '44'] : cat.name === 'Clothes' ? ['M', 'L', 'XL'] : [],
    };
    
    console.log(`Adding ${cat.name} to Firestore...`);
    try {
      await setDoc(doc(db, 'products', productId), productData);
      console.log(`Successfully added ${cat.name}!`);
    } catch (dbError) {
      console.error(`Failed to add ${cat.name} to DB:`, dbError);
    }
  }
  
  console.log('Seed complete!');
  process.exit(0);
}

seed();
