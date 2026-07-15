import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search, LogOut, LogIn, ArrowLeft, User } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAppContext } from '../../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from '../ThemeToggle';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { cart, wishlist, currentView, setCurrentView, setCartOpen, submitSearch, user, goBack } = useAppContext();
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
        className={`fixed left-0 right-0 mx-auto z-50 transition-all duration-300 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-full ${
          isScrolled ? 'top-2 sm:top-4 shadow-xl py-2 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl' : 'top-4 sm:top-8 shadow-lg py-3 sm:py-4 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl'
        }`}
      >
        <div className="w-full px-4 sm:px-6 flex justify-between items-center">
          {/* Left: Back Button & Logo Brand */}
          <div className="flex items-center space-x-2">
            {currentView !== 'home' && (
              <button 
                onClick={() => {
                  goBack();
                  window.scrollTo(0, 0);
                }} 
                className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center border border-gray-200 dark:border-gray-700"
                title="Go Back"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div 
              className="flex items-center cursor-pointer group relative" 
              onClick={() => handleNavClick('home')}
            >
              <img
                src="/logo.png"
                alt="Samstones Logo"
                className="h-10 md:h-12 w-auto mr-2 md:mr-3 object-contain rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              />
              <div className="flex flex-col justify-center leading-none">
                <span
                  style={{ fontFamily: '"Playfair Display", serif' }}
                  className="text-xl md:text-2xl lg:text-3xl tracking-wide text-[#E8A317] dark:text-yellow-400 transition-colors duration-300 drop-shadow-sm font-bold"
                >
                  Samstones
                </span>
              </div>
            </div>
          </div>

          {/* Middle: Links & Search */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 px-8">
            <button onClick={() => handleNavClick('home')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors relative group ${currentView === 'home' ? 'text-[#109121] dark:text-[#16C72E]' : 'text-gray-800 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E]'}`}>
              Home
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#109121] transition-all duration-300 ${currentView === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button onClick={() => handleNavClick('about')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors relative group ${currentView === 'about' ? 'text-[#109121] dark:text-[#16C72E]' : 'text-gray-800 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E]'}`}>
              About
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#109121] transition-all duration-300 ${currentView === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button onClick={() => handleNavClick('categories')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors relative group ${currentView === 'categories' ? 'text-[#109121] dark:text-[#16C72E]' : 'text-gray-800 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E]'}`}>
              Product Categories
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#109121] transition-all duration-300 ${currentView === 'categories' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button onClick={() => handleNavClick('wishlist')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors relative group ${currentView === 'wishlist' ? 'text-[#109121] dark:text-[#16C72E]' : 'text-gray-800 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E]'}`}>
              Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ''}
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#109121] transition-all duration-300 ${currentView === 'wishlist' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button onClick={() => handleNavClick('contact')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors relative group ${currentView === 'contact' ? 'text-[#109121] dark:text-[#16C72E]' : 'text-gray-800 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E]'}`}>
              Support
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#109121] transition-all duration-300 ${currentView === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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
              <Search size={10} className="absolute left-2 text-gray-400 dark:text-white" />
            </form>
          </div>

          {/* Right: Cart (pic 2) & Sign Out & Mobile Menu */}
          <div className="flex items-center space-x-5 md:space-x-6">
            <div className="hidden lg:flex items-center space-x-8">
              {/* Cart as Pic 2 */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative group flex items-center justify-center hover:scale-[1.03] transition-transform duration-200"
                title="Your Cart"
              >
                <ShoppingBag size={20} strokeWidth={2.25} className="text-gray-700 dark:text-gray-300 group-hover:text-[#18B64B] transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E5484D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
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
                    signOut(auth).then(() => {
                      toast.success('Successfully signed out');
                    });
                  }
                }}
                className="btn-primary px-4 py-2 flex items-center space-x-2 text-sm font-semibold"
                title={user ? 'Sign Out' : 'Sign In'}
              >
                {user ? <LogOut size={18} strokeWidth={2.25} /> : <User size={18} strokeWidth={2.25} />}
                <span>{user ? 'Sign Out' : 'Sign In'}</span>
              </button>

              {/* Theme Toggle dropdown */}
              <ThemeToggle />
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
                    src="/logo.png"
                    alt="Samstones Logo"
                    className="h-10 md:h-12 w-auto mr-2 md:mr-3 object-contain rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex flex-col justify-center leading-none">
                    <span
                      style={{ fontFamily: '"Playfair Display", serif' }}
                      className="text-xl md:text-2xl lg:text-3xl tracking-wide text-yellow-500 dark:text-yellow-400 drop-shadow-sm font-bold"
                    >
                      Samstones
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Mobile Theme Toggle */}
                  <ThemeToggle />
                  
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-gray-400 dark:text-white hover:text-[#109121] dark:hover:text-[#16C72E] p-1 flex items-center justify-center"
                    aria-label="Close Menu"
                  >
                    <X size={26} className="text-[#109121] dark:text-[#16C72E]" strokeWidth={2.5} />
                  </button>
                </div>
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
                    handleNavClick('contact');
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
                      signOut(auth).then(() => {
                        toast.success('Successfully signed out');
                      });
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

