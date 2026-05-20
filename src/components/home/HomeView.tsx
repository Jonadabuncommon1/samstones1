import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { products, marketplaceCategories } from '../../data';
import { ProductCard } from '../shop/ProductCard';
import { Search, ArrowRight, ShieldCheck, Zap, Globe, ShoppingBag } from 'lucide-react';

export const HomeView = () => {
  const { setCurrentView, setActiveCategory } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const featuredCars = products.filter(p => p.category === 'Cars').slice(0, 4);
  const featuredRealEstate = products.filter(p => p.category === 'Real Estates').slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('category');
    }
  };

  return (
    <div className="w-full bg-black text-white selection:bg-purple-500/30 overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-pink-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section (AIRO Inspired) */}
      <section className="relative pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-sm">
          
          <div className="flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full mb-6 w-fit border border-white/5"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Premium Marketplace</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Discover the Finest <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Assets & Supplies.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg mb-10 max-w-lg"
            >
              Shop premium groceries, luxury vehicles, high-end real estate, and exclusive fashion—all sourced for quality and directly delivered.
            </motion.p>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearch}
              className="flex w-full max-w-md bg-black/40 border border-white/20 rounded-xl p-2 backdrop-blur-md"
            >
              <div className="flex items-center pl-4 pr-2 w-full">
                <Search size={20} className="text-gray-400 mr-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for premium items..." 
                  className="w-full bg-transparent border-none outline-none text-white placeholder:text-gray-500"
                />
              </div>
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Search
              </button>
            </motion.form>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
              alt="Premium Groceries & Assets" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 z-20 flex space-x-4">
              <div className="bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Quality</p>
                  <p className="text-sm font-bold text-white">Guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories (AIRO Circular/Pill Style) */}
      <section className="py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Shop by <span className="text-purple-400">Category</span></h2>
          <button 
            onClick={() => { setCurrentView('category'); window.scrollTo(0, 0); }}
            className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
             <span>View All</span>
             <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {marketplaceCategories.slice(0, 5).map((category) => (
            <div 
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setCurrentView('category'); window.scrollTo(0,0); }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/10 transition-all group"
            >
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <img src={category.image} alt={category.name} className="w-12 h-12 rounded-full object-cover" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-gradient-to-r from-purple-900/60 to-pink-900/60 rounded-3xl p-8 md:p-12 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="mb-6 md:mb-0">
            <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block border border-pink-500/30">Limited Offer</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Fresh Assets & Provisions</h2>
            <p className="text-gray-300 max-w-md">10% off your first concierge order when using the exclusive code.</p>
          </div>
          <button 
            onClick={() => { setCurrentView('category'); window.scrollTo(0,0); }}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center space-x-2 shrink-0"
          >
            <ShoppingBag size={20} />
            <span>Shop Now</span>
          </button>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Popular <span className="text-pink-400">Items</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Heavy Assets Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cars */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-serif font-bold text-white">Featured <span className="text-blue-400">Motors</span></h2>
                 <button onClick={() => { setActiveCategory('Cars'); setCurrentView('category'); window.scrollTo(0,0); }} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">View All</button>
               </div>
               <div className="space-y-4">
                 {featuredCars.map(car => (
                   <div key={car.id} className="flex gap-4 bg-black/40 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5" onClick={() => { setActiveCategory('Cars'); setCurrentView('category'); window.scrollTo(0,0); }}>
                     <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                       <img src={car.images[0]} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-white text-sm md:text-base">{car.name}</h4>
                        <p className="font-bold text-blue-400 mb-2">{car.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-500">
                          {car.year && <span>{car.year}</span>}
                          {car.year && car.mileage && <span>•</span>}
                          {car.mileage && <span>{car.mileage}</span>}
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Real Estate */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-serif font-bold text-white">Prime <span className="text-green-400">Estates</span></h2>
                 <button onClick={() => { setActiveCategory('Real Estates'); setCurrentView('category'); window.scrollTo(0,0); }} className="text-green-400 hover:text-green-300 transition-colors text-sm font-medium">View All</button>
               </div>
               <div className="space-y-4">
                 {featuredRealEstate.map(estate => (
                   <div key={estate.id} className="flex gap-4 bg-black/40 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5" onClick={() => { setActiveCategory('Real Estates'); setCurrentView('category'); window.scrollTo(0,0); }}>
                     <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                       <img src={estate.images[0]} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-white text-sm md:text-base">{estate.name}</h4>
                        <p className="font-bold text-green-400 mb-2">{estate.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-500">
                          {estate.location && <span>{estate.location}</span>}
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* Services Grid (AIRO Style features) */}
      <section className="border-t border-white/10 py-16 bg-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-400 text-sm">Verified luxury assets and fresh provisions.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 text-pink-400">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">Swift concierge shipping directly to your doorstep.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                <Globe size={32} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Global Support</h3>
              <p className="text-gray-400 text-sm">Dedicated VIP concierge available 24/7 globally.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

