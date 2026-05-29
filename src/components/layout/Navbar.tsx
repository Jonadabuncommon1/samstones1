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

          {/* Middle: Links & Search */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-5 px-8">
            <button onClick={() => handleNavClick('home')} className="text-[12px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => handleNavClick('about')} className="text-[12px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => handleNavClick('categories')} className="text-[12px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Product Categories
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => handleNavClick('wishlist')} className="text-[12px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ''}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => window.open('https://wa.me/2348065179554', '_blank')} className="text-[12px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#109121] transition-all duration-300 group-hover:w-full"></span>
            </button>

            {/* Very small search function */}
            <form onSubmit={(e) => { e.preventDefault(); if (navSearch.trim()) submitSearch(navSearch); }} className="relative flex items-center ml-4">
              <input 
                type="text" 
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search..." 
                className="w-32 h-6 pl-6 pr-2 text-[10px] bg-gray-100 dark:bg-gray-800 rounded-full outline-none focus:ring-1 focus:ring-[#109121] transition-all"
              />
              <Search size={10} className="absolute left-2 text-gray-400" />
            </form>
          </div>

          {/* Right: Cart (pic 2) & Sign Out & Mobile Menu */}
          <div className="flex items-center space-x-5 md:space-x-6">
            <div className="hidden lg:flex items-center space-x-5">
              {/* Cart as Pic 2 */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative group flex items-center justify-center hover:scale-105 transition-transform"
                title="Your Cart"
              >
                <img src="/pic2.png" alt="Cart" className="w-5 h-5 object-contain" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              {/* Sign In / Sign Out */}
              <button
                onClick={() => {
                  if (!user) {
                    setCurrentView('auth');
                  } else {
                    supabase.auth.signOut();
                  }
                }}
                className="text-[12px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors relative group flex items-center"
              >
                {user ? 'Sign Out' : 'Sign In'}
              </button>
            </div>

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
              
              {/* Left-aligned navigation links matching user request (size 12 font) */}
              <div className="flex flex-col space-y-6 mt-8 flex-grow justify-start items-start px-2">
                {/* Home */}
                <button
                  onClick={() => {
                    handleNavClick('home');
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Home
                </button>

                {/* About */}
                <button
                  onClick={() => {
                    handleNavClick('about');
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  About
                </button>

                {/* Product Categories */}
                <button
                  onClick={() => {
                    handleNavClick('categories');
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Product Categories
                </button>

                {/* Your cart */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Your Cart {cartItemsCount > 0 ? `(${cartItemsCount})` : ''}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => {
                    handleNavClick('wishlist');
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ''}
                </button>

                {/* Support */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('https://wa.me/2348065179554', '_blank');
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  Support
                </button>

                {/* Signout */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!user) {
                      setCurrentView('auth');
                    } else {
                      supabase.auth.signOut();
                    }
                  }}
                  className="text-left text-[12px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors py-1.5 w-full"
                >
                  {user ? 'Sign Out' : 'Sign In / Register'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

