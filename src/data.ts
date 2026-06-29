import { Product } from './types';

export const marketplaceCategories = [
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Luxury sneakers, heels, sandals, and designer footwear.',
    image: '/cat_shoes_new.png',
    icon: 'Footprints'
  },
  {
    id: 'bags',
    name: 'Bags',
    description: 'Premium handbags, backpacks, purses, and travel bags.',
    image: '/cat_bags_new.png',
    icon: 'Briefcase'
  },
  {
    id: 'clothes',
    name: 'Clothes',
    description: 'Modern fashion wear, native wear, streetwear, and luxury outfits.',
    image: '/cat_clothes_new.png',
    icon: 'Shirt'
  },
  {
    id: 'jewelries',
    name: 'Jewelries',
    description: 'Gold jewelry, necklaces, rings, bracelets, earrings, and luxury accessories.',
    image: '/cat_jewelries_new.png',
    icon: 'Gem'
  },
  {
    id: 'cars',
    name: 'Cars',
    description: 'Luxury cars, SUVs, sedans, and vehicle listings.',
    image: '/cat_cars_new.png',
    icon: 'Car'
  },
  {
    id: 'phone-accessories',
    name: 'Phone Accessories',
    description: 'Chargers, AirPods, cases, power banks, smartwatches, and gadgets.',
    image: '/cat_phone_accessories_new.png',
    icon: 'Headphones'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    description: 'Soft drinks, wines, champagne, energy drinks, and beverages.',
    image: '/cat_drinks_new.png',
    icon: 'Wine'
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    description: 'Skincare, makeup, perfumes, beauty products, and self-care items.',
    image: '/cat_cosmetics_new.png',
    icon: 'Sparkles'
  },
  {
    id: 'provisions',
    name: 'Provisions',
    description: 'Groceries, food items, household essentials, and packaged goods.',
    image: '/cat_provisions_new.png',
    icon: 'ShoppingBasket'
  },
  {
    id: 'real-estates',
    name: 'Real Estates',
    description: 'Properties, apartments, lands, offices, and luxury homes.',
    image: '/cat_real_estates_new.png',
    icon: 'Building'
  }
];

export const products: Product[] = [];;

/** Formatted Naira amount (symbol + number). Apply `font-bold text-[#000000]` on the element. */
export const formatPrice = (price: number) => {
  return `₦${price.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
};
