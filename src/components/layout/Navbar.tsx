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
          {/* Left: Logo Brand (Visible on both desktop & mobile) */}
          <div 
            className="flex items-center cursor-pointer group relative" 
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/samstones-logo.jpg"
              alt="Samstones Logo"
              className="h-10 md:h-12 w-auto mr-2.5 md:mr-3.5 object-contain rounded-lg shadow-sm animate-fade-in"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-sans text-lg md:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white uppercase transition-colors duration-300">
                SAMSTONES
              </span>
              <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-widest text-[#109121] dark:text-[#16C72E] uppercase mt-0.5 transition-colors duration-300">
                MARKETPLACE
              </span>
            </div>
          </div>

          {/* Right: Desktop Links, Action Icons & Mobile Menu Button */}
          <div className="flex items-center space-x-5 md:space-x-6">
            {/* Desktop Menu links (Option 2 - smaller font size 10px, shifted to top right) */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.view)}
                  className="text-[10px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              
              {/* Desktop Sign In / Sign Out (Reduced size 10px, text link) */}
              <button
                onClick={() => {
                  if (!user) {
                    setCurrentView('auth');
                  } else {
                    supabase.auth.signOut();
                  }
                }}
                className="text-[10px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors relative group"
              >
                {user ? 'Sign Out' : 'Sign In'}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* Icons */}
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

            {/* Mobile Auth Fallback Icon */}
            <button
              onClick={() => {
                if (!user) {
                  setCurrentView('auth');
                } else {
                  supabase.auth.signOut();
                }
              }}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors relative flex items-center animate-fade-in"
              title={!user ? "Sign In" : "Sign Out"}
            >
              {!user ? <LogIn size={20} /> : <LogOut size={20} />}
            </button>

            {/* Mobile Menu Button (Positioned at the far right, styled with brand green icon matching Image 1) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-900 dark:text-white hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors p-1 flex items-center justify-center animate-fade-in"
              aria-label="Toggle Menu"
            >
              <Menu size={24} className="text-[#109121] dark:text-[#16C72E]" strokeWidth={2.5} />
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
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div 
                  className="flex items-center cursor-pointer group relative"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('home');
                  }}
                >
                  <img
                    src="/samstones-logo.jpg"
                    alt="Samstones Logo"
                    className="h-10 w-auto mr-2.5 object-contain rounded-lg shadow-sm"
                  />
                  <div className="flex flex-col justify-center leading-none">
                    <span className="font-sans text-lg font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                      SAMSTONES
                    </span>
                    <span className="font-sans text-[9px] font-bold tracking-widest text-[#109121] dark:text-[#16C72E] uppercase mt-0.5">
                      MARKETPLACE
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] p-1 flex items-center justify-center"
                  aria-label="Close Menu"
                >
                  <X size={26} className="text-[#109121] dark:text-[#16C72E]" strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Left-aligned navigation links matching Image 2 */}
              <div className="flex flex-col space-y-5 mt-6 flex-grow justify-start items-start px-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.view)}
                    className="text-left text-xl font-sans font-semibold text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-all duration-200 py-0.5 relative group w-full"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#109121] transition-all duration-300 group-hover:w-12"></span>
                  </button>
                ))}

                {/* Divider Line */}
                <div className="w-full border-t border-gray-100 dark:border-gray-800 my-4" />

                {/* Secondary smaller links (size 12px) */}
                <button
                  onClick={() => {
                    handleNavClick('wishlist');
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ''}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Your Cart {cartItemsCount > 0 ? `(${cartItemsCount})` : ''}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!user) {
                      setCurrentView('auth');
                    } else {
                      supabase.auth.signOut();
                    }
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  {user ? 'Sign Out' : 'Sign In / Register'}
                </button>
              </div>

              {/* Bottom Drawer Action (Contact Support) */}
              <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
                <a
                  href="https://wa.me/2348065179554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white text-center py-4 rounded-xl uppercase text-sm tracking-widest font-bold block transition-all"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

