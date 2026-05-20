import React from 'react';
import { motion } from 'motion/react';
import { marketplaceCategories } from '../../data';
import { useAppContext } from '../../store/AppContext';

export const CategoriesView = () => {
  const { setCurrentView, setActiveCategory } = useAppContext();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black text-white relative transition-colors duration-500">
      {/* Background ambient glow */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-pink-900/10 blur-[150px] pointer-events-none transition-colors" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Discover <span className="text-pink-400">Universes</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explore our diverse collection of premium offerings curated for the modern luxury lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketplaceCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => { setActiveCategory(category.id); setCurrentView('category'); window.scrollTo(0,0); }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] hover:border-pink-500/30 cursor-pointer group glass-card transition-all duration-300"
            >
              <div className="h-64 relative overflow-hidden bg-black">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <h2 className="absolute bottom-6 left-6 font-serif text-3xl text-white font-bold tracking-wide group-hover:text-pink-300 transition-colors">{category.name}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{category.description}</p>
                <div className="uppercase tracking-widest text-xs font-bold text-white group-hover:text-pink-400 transition-colors flex items-center space-x-2">
                  <span>Explore Vault</span>
                  <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
