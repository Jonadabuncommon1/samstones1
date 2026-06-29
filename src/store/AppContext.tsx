import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem, ViewState } from '../types';
import { fetchProductsFromDB, getInitialProductsFromStorage, addProductToDB, updateProductInDB, deleteProductFromDB, createProductId } from './productStorage';
import { supabase } from '../lib/supabase';
import { searchProducts } from '../utils/searchProducts';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AppContextProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  goBack: () => void;
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
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
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
  loginAdmin: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  openAdminPortal: () => void;
  user: User | null;
  loadingAuth: boolean;
  loadingProducts: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const getInitialView = (): ViewState => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const validViews: ViewState[] = ['home', 'shop', 'categories', 'category', 'product', 'cart', 'wishlist', 'about', 'contact', 'admin', 'terms', 'privacy', 'auth'];
    if (validViews.includes(path as ViewState)) {
      return path as ViewState;
    }
    return 'home';
  };

  const [currentView, _setCurrentView] = useState<ViewState>(getInitialView);
  const [viewHistory, setViewHistory] = useState<ViewState[]>([]);

  const setCurrentView = useCallback((view: ViewState) => {
    _setCurrentView((prev) => {
      if (prev !== view) {
        setViewHistory((h) => [...h, prev]);
      }
      return view;
    });
    // Push state to browser history to sync URL
    const url = view === 'home' ? '/' : `/${view}`;
    const finalUrl = view === 'admin' ? `${url}${window.location.hash}` : url;
    window.history.pushState({ view }, '', finalUrl);
  }, []);

  const goBack = useCallback(() => {
    setViewHistory((h) => {
      if (h.length === 0) {
        _setCurrentView('home');
        return [];
      }
      const newHistory = [...h];
      const prevView = newHistory.pop();
      if (prevView) {
        _setCurrentView(prevView);
        const url = prevView === 'home' ? '/' : `/${prevView}`;
        window.history.pushState({ view: prevView }, '', url);
      }
      return newHistory;
    });
  }, []);

  useEffect(() => {
    // Listen for browser/hardware back button
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        _setCurrentView(event.state.view);
        setViewHistory((h) => {
          if (h.length > 0) {
            const newHistory = [...h];
            newHistory.pop();
            return newHistory;
          }
          return h;
        });
      } else {
        // Fallback based on URL path
        const path = window.location.pathname.replace('/', '') as ViewState;
        const validViews: ViewState[] = ['home', 'shop', 'categories', 'category', 'product', 'cart', 'wishlist', 'about', 'contact', 'admin', 'terms', 'privacy', 'auth'];
        const view = validViews.includes(path) ? path : 'home';
        _setCurrentView(view);
        setViewHistory([]);
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
  const [products, setProducts] = useState<Product[]>(getInitialProductsFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    // Check initial Supabase auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdminAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminAuthenticated(!!session);
    });

    const unsubscribeFirebase = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });

    return () => {
      subscription.unsubscribe();
      unsubscribeFirebase();
    };
  }, []);

  useEffect(() => {
    fetchProductsFromDB().then((data) => {
      setProducts(data);
      setLoadingProducts(false);
    });
  }, []);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash.startsWith('#admin')) {
        // Only set to admin if we're not already on the admin path
        if (window.location.pathname !== '/admin') {
          setCurrentView('admin');
        }
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [setCurrentView]);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    const created: Product = { 
      ...product, 
      id: createProductId(),
      created_at: new Date().toISOString()
    };
    await addProductToDB(created);
    setProducts((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    updateProductInDB(id, updates);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    deleteProductFromDB(id);
    setCart((prev) => prev.filter((i) => i.product.id !== id));
    setWishlist((prev) => prev.filter((pid) => pid !== id));
  }, []);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const submitSearch = useCallback((query: string) => {
    const q = query.trim().toLowerCase();
    
    // Keyword Navigation Routing
    if (q === 'home') {
      setCurrentView('home');
      window.scrollTo(0, 0);
      return;
    }
    if (q === 'support' || q === 'contact' || q === 'contact us') {
      setCurrentView('contact');
      window.scrollTo(0, 0);
      return;
    }
    if (q === 'product categories' || q === 'categories' || q === 'all 10 categories' || q === 'all categories') {
      setCurrentView('categories');
      window.scrollTo(0, 0);
      return;
    }
    if (q === 'wishlist' || q === 'wish list') {
      setCurrentView('wishlist');
      window.scrollTo(0, 0);
      return;
    }
    if (q === 'shop' || q === 'store' || q === 'all products') {
      setSearchQuery('');
      setSearchSubmitted(false);
      setActiveCategory(null);
      setCurrentView('shop');
      window.scrollTo(0, 0);
      return;
    }
    if (q === 'about' || q === 'about us') {
      setCurrentView('about');
      window.scrollTo(0, 0);
      return;
    }
    if (q === 'cart' || q === 'shopping cart') {
      setCurrentView('cart');
      window.scrollTo(0, 0);
      return;
    }

    setSearchQuery(query.trim());
    setSearchSubmitted(!!query.trim());
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

  const loginAdmin = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    
    if (error) {
      return { ok: false, error: error.message };
    }
    
    setIsAdminAuthenticated(true);
    return { ok: true };
  }, []);

  const logoutAdmin = useCallback(async () => {
    await supabase.auth.signOut();
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
        goBack,
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
        user,
        loadingAuth,
        loadingProducts,
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
