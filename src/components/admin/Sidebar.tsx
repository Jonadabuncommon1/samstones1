import React from 'react';
import { LayoutDashboard, ShoppingBag, FolderTree, Image as ImageIcon, Settings as SettingsIcon, LogOut, X } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { AdminView } from './AdminLayout';

interface SidebarProps {
  currentView: AdminView;
  onChangeView: (view: AdminView) => void;
  closeSidebar: () => void;
}

export const Sidebar = ({ currentView, onChangeView, closeSidebar }: SidebarProps) => {
  const { setCurrentView } = useAppContext();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="h-full flex flex-col pt-4">
      <div className="px-6 flex justify-between items-center mb-8">
        <h2 className="font-serif text-xl font-bold">Admin Panel</h2>
        <button onClick={closeSidebar} className="md:hidden text-gray-500 hover:text-black">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onChangeView(item.id as AdminView);
              if (window.innerWidth < 768) closeSidebar();
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id 
                ? 'bg-purple-50 text-purple-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={() => setCurrentView('home')}
          className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Exit Admin</span>
        </button>
      </div>
    </div>
  );
};
