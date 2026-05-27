import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { marketplaceCategories, formatPrice } from '../../data';
import { ProductCard } from '../shop/ProductCard';
import { Search, ArrowRight, ShieldCheck, Zap, Globe, ShoppingBag } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const HomeView = () => {
  const { setCurrentView, setActiveCategory, products, submitSearch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'motto' | null>(null);

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
    <div className="w-full bg-transparent text-gray-900 dark:text-gray-100 selection:bg-[#109121]/10 overflow-hidden transition-colors duration-500">

      <section className="relative pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-12 items-center rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/myvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 z-10" />

          <div className="relative z-20 flex flex-col justify-center text-left">
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
              className="text-4xl md:text-6xl font-serif font-black text-[#DFB722] mb-6 leading-tight"
            >
              Discover the Finest Assets & Supplies.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-lg mb-10 max-w-lg"
            >
              Shop premium groceries, luxury vehicles, high-end real estate, and exclusive fashion, all sourced for quality and directly delivered.
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {marketplaceCategories.slice(0, 5).map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              onClick={() => { setActiveCategory(category.id); setCurrentView('category'); window.scrollTo(0, 0); }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/10 group shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 mx-auto bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg border border-[#109121]/20">
                <img src={category.image} alt={category.name} className="w-20 h-20 rounded-full object-cover shadow-sm" />
              </div>
              <h3 className="font-black text-[#109121] text-base group-hover:text-green-700 group-hover:underline transition-colors">{category.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-[#109121] rounded-3xl p-8 md:p-12 border border-[#109121]/30 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="mb-6 md:mb-0">
            <span className="bg-[#109121]/10 text-[#109121] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block border border-[#109121]/30">
              Limited Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#DFB722] mb-2">Curated Essentials. Everyday Convenience</h2>
            <p className="text-white max-w-md">Quality provisions and lifestyle products for modern living.</p>
          </div>
          <button
            onClick={() => { setCurrentView('category'); window.scrollTo(0, 0); }}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center space-x-2 shrink-0 shadow-lg"
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
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
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
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {featuredCars.map(car => (
                <motion.div
                  key={car.id}
                  variants={cardVariants}
                  className="flex gap-4 bg-white/40 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5 shadow-sm"
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
                </motion.div>
              ))}
            </motion.div>
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
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {featuredRealEstate.map(estate => (
                <motion.div
                  key={estate.id}
                  variants={cardVariants}
                  className="flex gap-4 bg-white/40 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5 shadow-sm"
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expandable Mission, Vision & Motto Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-xs font-semibold tracking-widest text-[#109121] uppercase dark:text-green-400">
            About Samstones International Resources Ltd
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
          {[
            { id: 'mission', title: 'Mission', icon: '🎯' },
            { id: 'vision', title: 'Vision', icon: '✨' },
            { id: 'motto', title: 'Motto', icon: '💎' }
          ].map((sec) => {
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(isActive ? null : sec.id as any)}
                className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-[#109121] border-[#109121] text-white shadow-lg scale-105' 
                    : 'bg-white dark:bg-[#111] border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 hover:border-[#109121] hover:shadow-md'
                }`}
              >
                <span className="text-xl sm:text-2xl mb-2">{sec.icon}</span>
                <span className="font-bold text-xs sm:text-sm tracking-wider uppercase">{sec.title}</span>
              </button>
            );
          })}
        </div>

        <div className="relative transition-all duration-500">
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 text-center shadow-inner"
            >
              {activeTab === 'mission' && (
                <div>
                  <h3 className="text-sm font-bold text-[#109121] dark:text-[#16C72E] mb-3 uppercase tracking-widest">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    To provide high-quality products and dependable services that enhance everyday living through excellence, affordability, trust, and convenience. At <strong>Samstones International Resources Ltd</strong>, we are committed to delivering exceptional value across fashion, automobiles, beauty, lifestyle essentials, and real estate while maintaining professionalism, customer satisfaction, and integrity in every aspect of our business.
                  </p>
                </div>
              )}
              {activeTab === 'vision' && (
                <div>
                  <h3 className="text-sm font-bold text-[#109121] dark:text-[#16C72E] mb-3 uppercase tracking-widest">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    To become one of Nigeria’s most trusted and recognised multi-sector retail and lifestyle brands, renowned for quality, innovation, integrity, and outstanding customer service. We aspire to empower individuals and communities by providing access to premium products, reliable services, and modern commerce solutions that inspire confidence and elevate lifestyles.
                  </p>
                </div>
              )}
              {activeTab === 'motto' && (
                <div>
                  <h3 className="text-sm font-bold text-[#109121] dark:text-[#16C72E] mb-3 uppercase tracking-widest">Our Motto</h3>
                  <p className="text-gray-800 dark:text-gray-100 font-serif italic text-base sm:text-lg font-medium leading-relaxed">
                    "Precision, Quality, and Reliability at Its Finest."
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 py-16 bg-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-400 text-sm">Verified luxury assets and fresh provisions.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">Swift and reliable shipping directly to your doorstep.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121] overflow-hidden">
                <img
                  src="/samstones-logo.jpg"
                  alt="Samstones Logo"
                  className="w-10 h-10 object-contain rounded-full shadow-sm"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Global Support</h3>
              <p className="text-gray-400 text-sm">Dedicated customer support available 24/7 globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
