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

function AppContent() {
  const { currentView, isAdminAuthenticated, loadingAuth } = useAppContext();

  if (loadingAuth) {
    return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#109121]"></div></div>;
  }

  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-black overflow-x-hidden selection:bg-[#109121]/10 transition-colors duration-500">
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

      <Footer />
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
