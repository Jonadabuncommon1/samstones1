/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './store/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppCart } from './components/WhatsAppCart';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomeView } from './components/home/HomeView';
import { ProductDetailView } from './components/shop/ProductDetailView';
import { WishlistView } from './components/shop/WishlistView';
import { AboutView } from './components/home/AboutView';
import { ContactView } from './components/home/ContactView';
import { TermsView } from './components/home/TermsView';
import { PrivacyView } from './components/home/PrivacyView';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { CategoriesView } from './components/shop/CategoriesView';
import { CategoryView } from './components/shop/CategoryView';
import { AuthView } from './components/auth/AuthView';
import { AIChatWidget } from './components/AIChatWidget';

import { ThemeProvider } from './components/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { currentView, isAdminAuthenticated, loadingAuth } = useAppContext();
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);
  const [isPageChanging, setIsPageChanging] = React.useState(false);
  const prevViewRef = React.useRef(currentView);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000); // 2.0s premium initial loader
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (prevViewRef.current !== currentView) {
      setIsPageChanging(true);
      prevViewRef.current = currentView;
      const timer = setTimeout(() => {
        setIsPageChanging(false);
      }, 750); // Quick page changing animation
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  if (loadingAuth) {
    return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#109121]"></div></div>;
  }

  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminLayout />;
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-black overflow-x-hidden selection:bg-[#109121]/10 transition-colors duration-500 relative">
      {/* Animated Brand Loader Overlay (Identical dynamic style to INTERLINK) */}
      <AnimatePresence>
        {(isInitialLoading || isPageChanging) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0A] transition-colors duration-500"
          >
            <div className="flex flex-col items-center">
              {/* Dynamic Rotating SVG Loader */}
              <motion.svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="mb-10"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-gray-100 dark:stroke-gray-900"
                  strokeWidth="3.5"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#109121"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, rotate: 0 }}
                  animate={{ 
                    pathLength: [0.15, 0.75, 0.15],
                    rotate: [0, 360, 720]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>

              {/* SAMSTONES Staggered Spelling Entrance */}
              <div className="flex gap-2 md:gap-4 justify-center">
                {"SAMSTONES".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-widest text-[#109121] dark:text-[#DFB722]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mt-4 font-black"
              >
                International
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Global Dynamic Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.9, 1],
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#e6f4e8] dark:bg-[#109121]/10 blur-[150px] rounded-full pointer-events-none -z-10 transition-colors"
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1.1, 1],
          x: [0, -20, 40, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#e6f4e8] dark:bg-[#109121]/10 blur-[150px] rounded-full pointer-events-none -z-10 transition-colors"
      />

      <Navbar />

      <main className="flex-grow w-full">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <CategoryView />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'category' && <CategoryView />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'terms' && <TermsView />}
        {currentView === 'privacy' && <PrivacyView />}
        {currentView === 'auth' && <AuthView />}
      </main>

      {currentView === 'home' && <Footer />}
      <WhatsAppCart />
      <FloatingWhatsApp />
      <AIChatWidget />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
