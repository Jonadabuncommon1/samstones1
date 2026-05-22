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
      return data as Product[];
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
  const { error } = await supabase.from('products').insert([product]);
  if (error) console.error('Error adding product:', error);
}

export async function updateProductInDB(id: string, updates: Partial<Product>): Promise<void> {
  const { error } = await supabase.from('products').update(updates).eq('id', id);
  if (error) console.error('Error updating product:', error);
}

export async function deleteProductFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.error('Error deleting product:', error);
}

export function createProductId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
