import React from 'react';
import { ShoppingBag, Users, DollarSign, Activity } from 'lucide-react';
import { AdminView } from './AdminLayout';

export const DashboardHome = ({ onChangeView }: { onChangeView: (view: AdminView) => void }) => {
  const stats = [
    { title: 'Total Revenue', value: '₦45.2M', icon: DollarSign, trend: '+12.5%' },
    { title: 'Active Products', value: '1,245', icon: ShoppingBag, trend: '+3.2%' },
    { title: 'New Visitors', value: '8,409', icon: Users, trend: '+14.1%' },
    { title: 'Active Inquiries', value: '42', icon: Activity, trend: '+5.0%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Platform Overview</h1>
        <p className="text-gray-500">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <stat.icon size={20} className="text-purple-600" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center space-x-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">New WhatsApp Inquiry for "Phantom 2024"</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold mb-4">System Health</h2>
          <div className="space-y-4 text-sm">
             <div className="flex justify-between items-center">
               <span className="text-gray-500">Image CDN</span>
               <span className="text-green-500 font-medium">Operational</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-gray-500">Database Connection</span>
               <span className="text-green-500 font-medium">Stable</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-gray-500">API Latency</span>
               <span className="text-gray-900 font-medium">24ms</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
