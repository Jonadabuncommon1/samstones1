import React, { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setCurrentView } = useAppContext();

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('privacy');
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-[#f8f9fa] dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 z-[9999] px-4 py-4 shadow-lg flex flex-col sm:flex-row items-center justify-center gap-4 text-sm"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="flex-1 m-0 text-center sm:text-left">
              This website uses cookies to enhance navigation and personalize your experience. By continuing, you agree to our use of cookies as described in our{' '}
              <a 
                href="#" 
                onClick={handlePrivacyClick}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button 
                onClick={handleReject}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium whitespace-nowrap text-sm"
              >
                Do not continue
              </button>
              <button 
                onClick={handleDismiss}
                className="px-4 py-2 bg-[#109121] text-white rounded-md hover:bg-[#0c6b18] transition-colors font-medium whitespace-nowrap text-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
