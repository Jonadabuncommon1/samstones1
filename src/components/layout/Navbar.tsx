import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { cart, wishlist, setCurrentView, setCartOpen } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', view: 'home' as const },
    { name: 'Shop', view: 'shop' as const },
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
          isScrolled ? 'glass shadow-lg py-4 border-b' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-purple-400 transition-colors mr-4"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-4 cursor-pointer group relative" onClick={() => handleNavClick('home')}>
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 w-full h-full flex items-center justify-center border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300">
                <img 
                  src="/logo.png" 
                  alt="Samstones Logo" 
                  className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ imageRendering: 'auto' }}
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">S</div>';
                    }
                  }} 
                />
              </div>
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white transition-colors duration-300 drop-shadow-sm group-hover:drop-shadow-md flex items-center">
                <img 
                  src="/header-image.jpg" 
                  alt="Feature" 
                  className="h-7 md:h-8 w-auto mr-2 md:mr-3 object-contain rounded" 
                />
                <span>Samstones <span className="font-light">Marketplace</span></span>
              </h1>
            </div>
          </div>

          <div className="flex-1 hidden lg:flex justify-center space-x-8 px-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.view)}
                className="text-xs font-semibold tracking-widest uppercase text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Links Right & Icons */}
          <div className="flex items-center space-x-5 md:space-x-6 ml-auto lg:ml-0">
            <button className="hidden sm:block text-gray-300 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={() => handleNavClick('wishlist')}
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {cartItemsCount}
                </span>
              )}
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl"
          >
            <div className="p-6 flex flex-col h-full text-white">
              <div className="flex justify-between items-center mb-12">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-gradient">SAMSTONES</h1>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={28} />
                </button>
              </div>
              <div className="flex flex-col space-y-8 flex-grow justify-center items-center">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.view)}
                    className="text-center text-4xl font-serif font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="mt-8 border-t border-gray-800 pt-8">
                <a
                  href="https://wa.me/2348065179554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-center py-4 rounded-xl uppercase text-sm tracking-widest font-bold block shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
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

