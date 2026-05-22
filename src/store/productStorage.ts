import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { products as seedProducts } from '../data';

export async function fetchProductsFromDB(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    if (data && data.length > 0) {
      return data.map((item: any) => {
        const product = { ...item };
        if (product.image && !product.images) {
          product.images = [product.image];
        }
        return product;
      }) as Product[];
    }
  } catch (err) {
    console.error('Supabase fetch failed:', err);
  }
  
  // Fallback to local storage if supabase isn't configured yet
  const STORAGE_KEY = 'samstones_products';
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [...seedProducts];
}

export async function addProductToDB(product: Product): Promise<void> {
  const dbProduct: any = { ...product };
  if (dbProduct.images && dbProduct.images.length > 0) {
    dbProduct.image = dbProduct.images[0];
  }
  // Remove arrays that might cause supabase insert errors if columns don't exist
  delete dbProduct.images;
  delete dbProduct.colors;
  delete dbProduct.sizes;

  const { error } = await supabase.from('products').insert([dbProduct]);
  if (error) console.error('Error adding product:', error);
}

export async function updateProductInDB(id: string, updates: Partial<Product>): Promise<void> {
  const dbUpdates: any = { ...updates };
  if (dbUpdates.images && dbUpdates.images.length > 0) {
    dbUpdates.image = dbUpdates.images[0];
  }
  delete dbUpdates.images;
  delete dbUpdates.colors;
  delete dbUpdates.sizes;

  const { error } = await supabase.from('products').update(dbUpdates).eq('id', id);
  if (error) console.error('Error updating product:', error);
}

export async function deleteProductFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.error('Error deleting product:', error);
}

export function createProductId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
