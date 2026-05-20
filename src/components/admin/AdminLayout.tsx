import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHome } from './DashboardHome';
import { ProductsManager } from './ProductsManager';
import { CategoriesManager } from './CategoriesManager';
import { MediaManager } from './MediaManager';
import { Settings } from './Settings';
import { Menu, X } from 'lucide-react';

export type AdminView = 'dashboard' | 'products' | 'categories' | 'media' | 'settings';

export const AdminLayout = () => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'media':
        return <MediaManager />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardHome onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 flex font-sans pt-24 z-50">
      {/* Mobile Sidebar Overlay */}
      {!sidebarOpen && (
        <button 
          className="fixed top-28 left-4 z-50 p-2 bg-white border rounded-lg shadow-sm md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transition-transform duration-300 md:translate-x-0 pt-24 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentView={currentView} onChangeView={setCurrentView} closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 md:ml-64 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
          {renderView()}
        </div>
      </div>
    </div>
  );
};
