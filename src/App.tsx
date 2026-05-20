/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
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
import { AdminLayout } from './components/admin/AdminLayout';

import { CategoriesView } from './components/shop/CategoriesView';
import { CategoryView } from './components/shop/CategoryView';

function AppContent() {
  const { currentView } = useAppContext();

  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-white bg-black overflow-x-hidden selection:bg-purple-500/30 transition-colors duration-500">
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
      </main>

      <Footer />
      <WhatsAppCart />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
