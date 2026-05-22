import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { ProductCard } from './ProductCard';

export const WishlistView = () => {
  const { wishlist, setCurrentView, products } = useAppContext();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Your Wishlist</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-semibold">
          {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <p className="text-gray-500 text-lg mb-8 font-serif italic">Your wishlist is currently empty.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="bg-[#109121] text-white border border-[#109121] px-8 py-3 uppercase text-xs tracking-widest font-bold hover:bg-[#0a5f15] transition-colors rounded-xl"
          >
            Discover Pieces
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};
