export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  colors?: string[];
  sizes?: string[];
  images: string[];
  isNew?: boolean;
  isTrending?: boolean;
  location?: string;
  year?: string;
  mileage?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type ViewState = 'home' | 'shop' | 'categories' | 'category' | 'product' | 'cart' | 'wishlist' | 'about' | 'contact' | 'admin';
