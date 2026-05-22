import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem, ViewState } from '../types';
import { loadProducts, saveProducts, createProductId } from './productStorage';
import { isAdminSessionActive, setAdminSession, verifyAdminLogin } from './adminAuth';
import { searchProducts } from '../utils/searchProducts';

interface AppContextProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  activeCategory: string | null;
  setActiveCategory: (val: string | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchSubmitted: boolean;
  submitSearch: (query: string) => void;
  clearSearch: () => void;
  searchProductsGlobally: (query: string) => Product[];
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => { ok: boolean; error?: string };
  logoutAdmin: () => void;
  openAdminPortal: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, _setCurrentView] = useState<ViewState>('home');

  const setCurrentView = useCallback((view: ViewState) => {
    _setCurrentView(view);
    // Push state to browser history to prevent PWA from closing on back navigation
    window.history.pushState({ view }, '', '');
  }, []);

  useEffect(() => {
    // Listen for browser/hardware back button
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        _setCurrentView(event.state.view);
      } else {
        // Fallback to home if no state (e.g., returned to initial load)
        _setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => isAdminSessionActive());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const persistProducts = useCallback((next: Product[]) => {
    setProducts(next);
    saveProducts(next);
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const created: Product = { ...product, id: createProductId() };
    persistProducts([created, ...products]);
    return created;
  }, [products, persistProducts]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    persistProducts(products.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, [products, persistProducts]);

  const deleteProduct = useCallback((id: string) => {
    persistProducts(products.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((i) => i.product.id !== id));
    setWishlist((prev) => prev.filter((pid) => pid !== id));
  }, [products, persistProducts]);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const submitSearch = useCallback((query: string) => {
    const q = query.trim();
    setSearchQuery(q);
    setSearchSubmitted(!!q);
    setActiveCategory(null);
    setCurrentView('shop');
    window.scrollTo(0, 0);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchSubmitted(false);
  }, []);

  const searchProductsGlobally = useCallback(
    (query: string) => searchProducts(products, query),
    [products]
  );

  const loginAdmin = useCallback((email: string, password: string) => {
    if (!verifyAdminLogin(email, password)) {
      return { ok: false, error: 'Invalid email or password.' };
    }
    setAdminSession(true);
    setIsAdminAuthenticated(true);
    return { ok: true };
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminSession(false);
    setIsAdminAuthenticated(false);
    setCurrentView('home');
    window.location.hash = '';
  }, []);

  const openAdminPortal = useCallback(() => {
    window.location.hash = 'admin';
    setCurrentView('admin');
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === item.product.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeProductId,
        setActiveProductId,
        activeCategory,
        setActiveCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        cartOpen,
        setCartOpen,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        searchQuery,
        setSearchQuery,
        searchSubmitted,
        submitSearch,
        clearSearch,
        searchProductsGlobally,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        openAdminPortal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
