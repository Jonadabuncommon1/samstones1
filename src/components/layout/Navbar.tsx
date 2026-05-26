import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search, LogOut, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAppContext } from '../../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { cart, wishlist, setCurrentView, setCartOpen, submitSearch, user } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', view: 'home' as const },
    { name: 'Categories', view: 'categories' as const },
    { name: 'About', view: 'about' as const },
    { name: 'Contact', view: 'contact' as const }
  ];

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'glass dark:glass shadow-lg py-4 border-b dark:border-gray-800' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-gray-900 hover:text-[#109121] transition-colors mr-4"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 cursor-pointer group relative" onClick={() => handleNavClick('home')}>
            <div className="flex flex-col justify-center">
              <h1 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 drop-shadow-sm group-hover:drop-shadow-md flex items-center">
                <img
                  src="/logo-meck.jpg"
                  alt="Samstones Logo"
                  className="h-10 md:h-12 w-auto mr-2 md:mr-3 object-contain rounded"
                />
                <span>
                  <span className="text-[#DFB722]">Samstones</span> <span className="font-light text-black dark:text-white">Marketplace</span>
                </span>
              </h1>
            </div>
          </div>

          <div className="flex-1 hidden lg:flex justify-center space-x-8 px-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.view)}
                className="text-xs font-semibold tracking-widest uppercase text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Links Right & Icons */}
          <div className="flex items-center space-x-5 md:space-x-6 ml-auto lg:ml-0">
            <div className="hidden sm:block relative">
              {searchOpen ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (navSearch.trim()) {
                      submitSearch(navSearch);
                      setSearchOpen(false);
                      setNavSearch('');
                    }
                  }}
                  className="flex items-center bg-white border border-gray-200 rounded-full pl-3 pr-1 py-1 shadow-sm"
                >
                  <input
                    type="text"
                    autoFocus
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-40 md:w-52 text-sm outline-none text-gray-900"
                  />
                  <button type="submit" className="bg-[#109121] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Go
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>
            <button 
              onClick={() => handleNavClick('wishlist')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#109121] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#109121] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (!user) {
                  setCurrentView('auth');
                } else {
                  supabase.auth.signOut();
                }
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors relative ml-2 flex items-center"
              title={!user ? "Sign In" : "Sign Out"}
            >
              {!user ? <LogIn size={20} /> : <LogOut size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800"
          >
            <div className="p-6 flex flex-col h-full text-gray-900 dark:text-gray-100">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-2.5">
                  <img
                    src="/logo-meck.jpg"
                    alt="Logo"
                    className="h-10 w-auto object-contain rounded"
                  />
                  <span className="font-sans text-xl font-bold text-gray-900 dark:text-white">
                    <span className="text-[#DFB722]">Samstones</span> <span className="font-light text-black dark:text-white">Marketplace</span>
                  </span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-[#109121]">
                  <X size={28} />
                </button>
              </div>
              <div className="flex flex-col space-y-8 flex-grow justify-center items-center">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.view)}
                    className="text-center text-4xl font-serif font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                <a
                  href="https://wa.me/2348065179554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white text-center py-4 rounded-xl uppercase text-sm tracking-widest font-bold block transition-all"
                >
                  Contact Support
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!user) {
                      setCurrentView('auth');
                    } else {
                      supabase.auth.signOut();
                    }
                  }}
                  className={`w-full mt-4 bg-transparent border-2 text-center py-4 rounded-xl uppercase text-sm tracking-widest font-bold block transition-all ${
                    !user 
                      ? 'border-[#109121] text-[#109121] hover:bg-[#109121] hover:text-white dark:border-[#16C72E] dark:text-[#16C72E] dark:hover:bg-[#16C72E] dark:hover:text-white'
                      : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-600 dark:text-red-600 dark:hover:bg-red-600 dark:hover:text-white'
                  }`}
                >
                  {!user ? 'Sign In / Register' : 'Sign Out'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

