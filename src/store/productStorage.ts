import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { products as seedProducts } from '../data';

export function getInitialProductsFromStorage(): Product[] {
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

export async function fetchProductsFromDB(): Promise<Product[]> {
  // Always try Supabase first
  try {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      if (data.length > 0) {
        try {
          localStorage.setItem('samstones_products', JSON.stringify(data));
        } catch {}
        return data as Product[];
      }
    } else if (error) {
      console.error('Supabase fetch error:', error.message);
    }
  } catch (err) {
    console.error('Supabase fetch failed:', err);
  }
  
  // Fallback to local storage only if Supabase is completely unreachable
  return getInitialProductsFromStorage();
}

export async function addProductToDB(product: Product): Promise<void> {
  try {
    const { error } = await supabase.from('products').insert([product]);
    if (error) throw error;
    // Sync localStorage with successful Supabase write
    try {
      const raw = localStorage.getItem('samstones_products');
      const existing = raw ? JSON.parse(raw) : [];
      localStorage.setItem('samstones_products', JSON.stringify([product, ...existing]));
    } catch {}
  } catch (error: any) {
    console.error('Error adding product to Supabase:', error);
    // Supabase failed — still save to localStorage as fallback
    try {
      const raw = localStorage.getItem('samstones_products');
      const products = raw ? JSON.parse(raw) : [...seedProducts];
      localStorage.setItem('samstones_products', JSON.stringify([product, ...products]));
    } catch (e) {}
    throw error; // Re-throw so the UI can show the error
  }
}

export async function updateProductInDB(id: string, updates: Partial<Product>): Promise<void> {
  try {
    const { error } = await supabase.from('products').update(updates).eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating product:', error);
  }

  // LocalStorage Fallback
  try {
    const raw = localStorage.getItem('samstones_products');
    if (raw) {
      let products = JSON.parse(raw);
      products = products.map((p: any) => p.id === id ? { ...p, ...updates } : p);
      localStorage.setItem('samstones_products', JSON.stringify(products));
    }
  } catch (e) {}
}

export async function deleteProductFromDB(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting product:', error);
  }

  // LocalStorage Fallback
  try {
    const raw = localStorage.getItem('samstones_products');
    if (raw) {
      let products = JSON.parse(raw);
      products = products.filter((p: any) => p.id !== id);
      localStorage.setItem('samstones_products', JSON.stringify(products));
    }
  } catch (e) {}
}

export function createProductId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
