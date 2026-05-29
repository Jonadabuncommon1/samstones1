import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/2348065179554?text=Hello"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-28 right-4 md:right-6 z-40 w-14 h-14 bg-white rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center group border border-gray-100 dark:border-gray-800"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
    >
      <img src="/pic1.jpg" alt="WhatsApp" className="w-8 h-8 object-contain" />
      <span className="absolute right-full mr-4 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat to Buy
      </span>
    </motion.a>
  );
};

