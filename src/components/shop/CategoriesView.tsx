import React from 'react';
import { motion } from 'motion/react';
import { marketplaceCategories } from '../../data';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export const CategoriesView = () => {
  const { setCurrentView, setActiveCategory, goBack } = useAppContext();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent text-gray-900 dark:text-gray-100 relative transition-colors duration-500">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-start mb-6">
          <button 
            onClick={() => {
              goBack();
              window.scrollTo(0, 0);
            }} 
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white hover:text-[#109121] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#E8B93D] mb-4">
            Discover the best <span className="text-[#109121]">Product Collections!</span>
          </h1>
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-lg font-serif italic font-bold">
            Explore our diverse collection of premium offerings curated for the modern luxury lifestyle.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {marketplaceCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_14px_rgba(16,145,33,0.15)] hover:border-[#109121]/30 group glass-card transition-all duration-300"
            >
              <button 
                className="absolute inset-0 w-full h-full z-20 cursor-pointer opacity-0" 
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentView('category');
                  window.scrollTo(0, 0);
                }}
                aria-label={`View ${category.name}`}
              />
              <div className="h-64 relative overflow-hidden bg-[#e6f4e8]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-[#E8B93D] group-hover:text-[#F3CE6E] transition-colors flex items-center drop-shadow-[0_0_8px_rgba(232,185,61,0.3)]">
                  {(() => {
                    const IconComp = (LucideIcons as any)[category.icon || 'HelpCircle'];
                    return <IconComp size={72} />;
                  })()}
                  <span className="sr-only">{category.name}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-white text-sm mb-6 line-clamp-2">{category.description}</p>
                <div className="uppercase tracking-widest text-xs font-bold text-[#109121] group-hover:text-[#0a5f15] transition-colors flex items-center space-x-2">
                  <span>Explore Product</span>
                  <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
