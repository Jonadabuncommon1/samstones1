import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { marketplaceCategories, formatPrice } from '../../data';
import { ProductCard } from '../shop/ProductCard';
import { Search, ArrowRight, ShieldCheck, Zap, Globe, ShoppingBag } from 'lucide-react';

export const HomeView = () => {
  const { setCurrentView, setActiveCategory, products, submitSearch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const featuredCars = products.filter(p => p.category === 'Cars').slice(0, 4);
  const featuredRealEstate = products.filter(p => p.category === 'Real Estates').slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      submitSearch(searchQuery);
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 selection:bg-[#109121]/10 overflow-hidden">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#e6f4e8] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#e6f4e8] blur-[150px] rounded-full pointer-events-none -z-10" />

      <section className="relative pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center bg-[#109121] rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6 w-fit border border-white/20"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-white">WE MEET YOUR NEEDS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Discover the Finest <br />
              <span className="text-white">Assets & Supplies.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-lg mb-10 max-w-lg"
            >
              Shop premium groceries, luxury vehicles, high-end real estate, and exclusive fashion, all sourced for <span className="text-[#DFB722]">quality</span> and directly delivered.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearch}
              className="flex w-full max-w-md bg-white rounded-full p-2 shadow-lg"
            >
              <div className="flex items-center pl-4 pr-2 w-full">
                <Search size={20} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for premium items..."
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-[#109121] hover:bg-[#0c6c19] text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Search
              </button>
            </motion.form>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative border-4 border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src="/premium_marketplace.png"
              alt="Premium Marketplace Assets"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 z-20 flex space-x-4">
              <div className="bg-white backdrop-blur px-4 py-2 rounded-lg flex items-center space-x-3 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-[#109121]/10 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-[#109121]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500"><span className="text-[#DFB722]">Quality</span></p>
                  <p className="text-sm font-bold text-gray-900">Guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Shop by <span className="text-[#109121]">Category</span>
          </h2>
          <button
            onClick={() => { setCurrentView('category'); window.scrollTo(0, 0); }}
            className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {marketplaceCategories.slice(0, 5).map((category) => (
            <div
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setCurrentView('category'); window.scrollTo(0, 0); }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/10 transition-all group"
            >
              <div className="w-16 h-16 mx-auto bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <img src={category.image} alt={category.name} className="w-12 h-12 rounded-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#109121] transition-colors">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-[#109121] rounded-3xl p-8 md:p-12 border border-[#109121]/30 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="mb-6 md:mb-0">
            <span className="bg-[#109121]/10 text-[#109121] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block border border-[#109121]/30">
              Limited Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Fresh Assets & Provisions</h2>
            <p className="text-gray-600 max-w-md">10% off your first concierge order when using the exclusive code.</p>
          </div>
          <button
            onClick={() => { setCurrentView('category'); window.scrollTo(0, 0); }}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center space-x-2 shrink-0"
          >
            <ShoppingBag size={20} />
            <span>Shop Now</span>
          </button>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Popular <span className="text-[#109121]">Items</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Featured <span className="text-[#109121]">Motors</span>
              </h2>
              <button
                onClick={() => { setActiveCategory('Cars'); setCurrentView('category'); window.scrollTo(0, 0); }}
                className="text-[#109121] hover:text-[#109121] transition-colors text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {featuredCars.map(car => (
                <div
                  key={car.id}
                  className="flex gap-4 bg-white/40 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
                  onClick={() => { setActiveCategory('Cars'); setCurrentView('category'); window.scrollTo(0, 0); }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-[#16C72E] text-sm md:text-base">{car.name}</h4>
                    <p className="font-bold text-[#000000] mb-2">
                      {formatPrice(car.price)}
                    </p>
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

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Prime <span className="text-[#109121]">Estates</span>
              </h2>
              <button
                onClick={() => { setActiveCategory('Real Estates'); setCurrentView('category'); window.scrollTo(0, 0); }}
                className="text-[#109121] hover:text-green-300 transition-colors text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {featuredRealEstate.map(estate => (
                <div
                  key={estate.id}
                  className="flex gap-4 bg-white/40 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
                  onClick={() => { setActiveCategory('Real Estates'); setCurrentView('category'); window.scrollTo(0, 0); }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={estate.images[0]} alt={estate.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-[#16C72E] text-sm md:text-base">{estate.name}</h4>
                    <p className="font-bold text-[#000000] mb-2">
                      {formatPrice(estate.price)}
                    </p>
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

      <section className="border-t border-white/10 py-16 bg-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2"><span className="text-[#DFB722]">Quality</span> Guarantee</h3>
              <p className="text-gray-400 text-sm">Verified luxury assets and fresh provisions.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">Swift concierge shipping directly to your doorstep.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <Globe size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Global Support</h3>
              <p className="text-gray-400 text-sm">Dedicated VIP concierge available 24/7 globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
