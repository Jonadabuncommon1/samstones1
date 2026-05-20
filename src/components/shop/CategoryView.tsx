import React, { useState } from 'react';
import { motion } from 'motion/react';
import { products, marketplaceCategories } from '../../data';
import { ProductCard } from './ProductCard';
import { useAppContext } from '../../store/AppContext';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export const CategoryView = () => {
  const { activeCategory, setCurrentView, setActiveCategory } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<string>('default');

  const categoryData = marketplaceCategories.find(c => c.id === activeCategory);
  const categoryName = categoryData?.name || 'All Vaults';
  
  let categoryProducts = products;
  if (categoryData) {
    categoryProducts = products.filter(p => p.category === categoryData.name);
  }

  // Filter & Search Logic
  if (searchQuery) {
    categoryProducts = categoryProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  let displayProducts = [...categoryProducts];

  if (sortMode === 'price-asc') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortMode === 'price-desc') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortMode === 'popularity') {
    displayProducts.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
  } else if (sortMode === 'new') {
    displayProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const trendingProducts = categoryProducts.filter(p => p.isTrending);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-black text-white relative transition-colors duration-500">
       {/* Background ambient glow */}
       <div className="fixed top-0 left-0 w-[50%] h-[50%] bg-purple-900/10 blur-[150px] pointer-events-none transition-colors" />
       
      {/* Category Hero */}
      <div className="relative h-[40vh] md:h-[50vh] w-full mb-12 border-b border-white/5">
        <img 
          src={categoryData?.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000'} 
          alt={categoryName}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white mb-4 tracking-tight"
          >
            {categoryName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto md:text-lg font-medium"
          >
            {categoryData?.description || 'Explore our comprehensive collection of luxury assets.'}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-4">
          <div className="flex space-x-2 text-xs uppercase tracking-widest font-semibold text-gray-500">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => { setActiveCategory(null); setCurrentView('categories'); }} className="hover:text-white transition-colors">Explore</button>
            <span>/</span>
            <span className="text-white">{categoryName}</span>
          </div>

          <div className="flex items-center w-full md:w-auto space-x-4">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search vault..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 rounded-xl glass shadow-none placeholder-gray-500 transition-colors"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative group">
              <button className="glass flex items-center justify-between space-x-2 px-4 py-2 rounded-xl text-sm uppercase tracking-widest font-semibold text-gray-300 hover:text-white hover:border-purple-500 transition-colors h-full">
                <span>{sortMode === 'default' ? 'Sort' : sortMode === 'price-asc' ? 'Low to High' : sortMode === 'price-desc' ? 'High to Low' : sortMode === 'popularity' ? 'Popularity' : 'New Arrivals'}</span>
                <ChevronDown size={14} />
              </button>
              <div className="glass-card absolute right-0 top-full mt-2 w-48 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden border border-white/10 shadow-none">
                <button onClick={() => setSortMode('default')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/10 ${sortMode === 'default' ? 'font-bold text-white' : 'text-gray-400'}`}>Default</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('price-asc')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/10 ${sortMode === 'price-asc' ? 'font-bold text-white' : 'text-gray-400'}`}>Price: Low to High</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('price-desc')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/10 ${sortMode === 'price-desc' ? 'font-bold text-white' : 'text-gray-400'}`}>Price: High to Low</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('popularity')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/10 ${sortMode === 'popularity' ? 'font-bold text-white' : 'text-gray-400'}`}>Popularity</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('new')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/10 ${sortMode === 'new' ? 'font-bold text-white' : 'text-gray-400'}`}>New Arrivals</button>
              </div>
            </div>
            
            <button className="glass flex items-center space-x-2 p-2 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500 transition-colors md:hidden shadow-none">
              <SlidersHorizontal size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Filters Sidebar (Desktop) and Main Content */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <h3 className="font-serif text-2xl font-bold mb-6 text-white">Vaults</h3>
            
            <div className="space-y-8 glass p-6 rounded-2xl border border-white/5 shadow-none">
              <div>
                <ul className="space-y-3">
                  {marketplaceCategories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => setActiveCategory(cat.id)}
                        className={`text-sm tracking-wide transition-colors ${activeCategory === cat.id ? 'text-pink-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => setActiveCategory(null)}
                      className={`text-sm tracking-wide transition-colors block mt-4 pt-4 border-t border-white/10 w-full text-left ${!activeCategory ? 'text-pink-400 font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                      All Vaults
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {displayProducts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {displayProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-32 glass rounded-3xl border border-white/5 shadow-none">
                <h3 className="text-2xl font-serif text-white mb-2">No selections found.</h3>
                <p className="text-gray-400 font-medium">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
