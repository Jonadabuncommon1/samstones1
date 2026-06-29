import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show for 2 seconds, then trigger fade-out
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black"
        >
          {/* A very big, very thin black (or white in dark mode) rolling circle */}
          <div className="relative flex items-center justify-center mb-8">
            <div
              className="rounded-full border-[1.5px] border-transparent border-t-black dark:border-t-white border-l-black dark:border-l-white animate-[splash-spin_1s_linear_infinite]"
              style={{
                width: 220,
                height: 220,
              }}
            />
          </div>

          {/* Welcome to Samstones Marketplace text using theme colors */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-base sm:text-lg tracking-[0.2em] uppercase font-bold text-center px-6"
            style={{ fontFamily: '"Black Ops One", system-ui' }}
          >
            <span className="text-[#109121]">Welcome to </span>
            <span className="text-[#E8A317]">Samstones</span>
            <span className="text-[#109121]"> Marketplace</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
