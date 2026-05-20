import { Product } from './types';

export const marketplaceCategories = [
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Luxury sneakers, heels, sandals, and designer footwear.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
    icon: 'Footprints'
  },
  {
    id: 'bags',
    name: 'Bags',
    description: 'Premium handbags, backpacks, purses, and travel bags.',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=1000',
    icon: 'Briefcase'
  },
  {
    id: 'clothes',
    name: 'Clothes',
    description: 'Modern fashion wear, native wear, streetwear, and luxury outfits.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000',
    icon: 'Shirt'
  },
  {
    id: 'jewelries',
    name: 'Jewelries',
    description: 'Gold jewelry, necklaces, rings, bracelets, earrings, and luxury accessories.',
    image: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?auto=format&fit=crop&q=80&w=1000',
    icon: 'Gem'
  },
  {
    id: 'cars',
    name: 'Cars',
    description: 'Luxury cars, SUVs, sedans, and vehicle listings.',
    image: 'https://images.unsplash.com/photo-1503376760367-1b612164ad40?auto=format&fit=crop&q=80&w=1000',
    icon: 'Car'
  },
  {
    id: 'phone-accessories',
    name: 'Phone Accessories',
    description: 'Chargers, AirPods, cases, power banks, smartwatches, and gadgets.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1000',
    icon: 'Headphones'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    description: 'Soft drinks, wines, champagne, energy drinks, and beverages.',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1000',
    icon: 'Wine'
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    description: 'Skincare, makeup, perfumes, beauty products, and self-care items.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=1000',
    icon: 'Sparkles'
  },
  {
    id: 'provisions',
    name: 'Provisions',
    description: 'Groceries, food items, household essentials, and packaged goods.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000',
    icon: 'ShoppingBasket'
  },
  {
    id: 'real-estates',
    name: 'Real Estates',
    description: 'Properties, apartments, lands, offices, and luxury homes.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    icon: 'Building'
  }
];

export const products: Product[] = [
  // Shoes
  {
    id: 's1',
    name: 'Italian Leather Oxfords',
    price: 85000,
    description: 'Premium handcrafted leather oxfords for the modern gentleman.',
    category: 'Shoes',
    colors: ['Black', 'Brown'],
    sizes: ['40', '41', '42', '43', '44'],
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true,
  },
  // Bags
  {
    id: 'b1',
    name: 'Heritage Beaded Clutch',
    price: 45000,
    description: 'A handcrafted evening clutch featuring traditional beadwork.',
    category: 'Bags',
    colors: ['Gold', 'Silver'],
    images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=1000'],
    isNew: true,
  },
  // Clothes
  {
    id: 'c1',
    name: 'Onyx Black Senator Suit',
    price: 150000,
    description: 'Impeccably tailored from premium Italian wool and traditional Nigerian woven accents.',
    category: 'Clothes',
    colors: ['Black', 'Navy'],
    sizes: ['M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true,
  },
  // Jewelries
  {
    id: 'j1',
    name: 'Coral Choker Statement',
    price: 60000,
    description: 'Authentic Nigerian coral beads modernized into a structural choker.',
    category: 'Jewelries',
    colors: ['Coral Red'],
    images: ['https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?auto=format&fit=crop&q=80&w=1000'],
  },
  // Cars
  {
    id: 'car1',
    name: '2023 Mercedes-Benz G-Class',
    price: 150000000,
    description: 'Luxury SUV in pristine condition. Foreign used, full options.',
    category: 'Cars',
    colors: ['Obsidian Black'],
    year: '2023',
    mileage: '12,000 km',
    images: ['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000'],
    isNew: true,
  },
  // Phone Accessories
  {
    id: 'pa1',
    name: 'AirPods Pro (2nd Gen)',
    price: 180000,
    description: 'Active Noise Cancellation and personalized spatial audio.',
    category: 'Phone Accessories',
    colors: ['White'],
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true,
  },
  // Drinks
  {
    id: 'd1',
    name: 'Dom Pérignon Vintage 2012',
    price: 250000,
    description: 'Iconic vintage champagne. Perfect for celebrations.',
    category: 'Drinks',
    images: ['https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1000'],
  },
  // Cosmetics
  {
    id: 'cos1',
    name: 'Tom Ford Oud Wood',
    price: 220000,
    description: '50ml Eau de Parfum. A rare, exotic, and distinctive fragrance.',
    category: 'Cosmetics',
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true,
  },
  // Provisions
  {
    id: 'pr1',
    name: 'Premium Basmati Rice (5kg)',
    price: 18500,
    description: 'Long grain, aromatic Basmati rice. Perfect for jollof or fried rice.',
    category: 'Provisions',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000'],
  },
  // Real Estates
  {
    id: 're1',
    name: 'Luxury 5-Bedroom Detached Duplex',
    price: 350000000,
    description: 'Contemporary architecture with a swimming pool, smart home automation, and 2 rooms BQ.',
    category: 'Real Estates',
    location: 'Lekki Phase 1, Lagos',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'],
    isTrending: true,
    isNew: true,
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};
