import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { cart, wishlist, setCurrentView, setCartOpen, submitSearch } = useAppContext();
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
            className="lg:hidden text-gray-900 hover:text-[#109121] transition-colors mr-4"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 cursor-pointer group relative" onClick={() => handleNavClick('home')}>
            <div className="flex flex-col justify-center">
              <h1 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 drop-shadow-sm group-hover:drop-shadow-md flex items-center">
                <img
                  src="/header-image.jpg"
                  alt="Feature"
                  className="h-7 md:h-8 w-auto mr-2 md:mr-3 object-contain rounded"
                />
                <span>
                  Samstones <span className="font-light">Marketplace</span>
                </span>
              </h1>
            </div>
          </div>

          <div className="flex-1 hidden lg:flex justify-center space-x-8 px-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.view)}
                className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors relative group"
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>
            <button 
              onClick={() => handleNavClick('wishlist')}
              className="text-gray-600 hover:text-gray-900 transition-colors relative"
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
              className="text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#109121] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
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
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100"
          >
            <div className="p-6 flex flex-col h-full text-gray-900">
              <div className="flex justify-between items-center mb-12">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-gradient">SAMSTONES</h1>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-[#109121]">
                  <X size={28} />
                </button>
              </div>
              <div className="flex flex-col space-y-8 flex-grow justify-center items-center">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.view)}
                    className="text-center text-4xl font-serif font-bold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="mt-8 border-t border-gray-200 pt-8">
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

