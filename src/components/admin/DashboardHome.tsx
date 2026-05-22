import React, { useMemo } from 'react';
import { ShoppingBag, Package, TrendingUp, Layers } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { formatPrice } from '../../data';
import { AdminView } from './AdminLayout';

export const DashboardHome = ({ onChangeView }: { onChangeView: (view: AdminView) => void }) => {
  const { products } = useAppContext();

  const overview = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const categories = new Set(products.map((p) => p.category));
    const trending = products.filter((p) => p.isTrending).length;
    const newItems = products.filter((p) => p.isNew).length;
    return { totalValue, categories: categories.size, trending, newItems };
  }, [products]);

  const stats = [
    { title: 'Active Products', value: String(products.length), icon: ShoppingBag, sub: 'Live catalog count' },
    { title: 'Catalog Value', value: formatPrice(overview.totalValue), icon: TrendingUp, sub: 'Sum of listed prices' },
    { title: 'Categories', value: String(overview.categories), icon: Layers, sub: 'Unique product categories' },
    { title: 'New Listings', value: String(overview.newItems), icon: Package, sub: `${overview.trending} trending` },
  ];

  const recent = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 10);
  }, [products]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Platform Overview</h1>
        <p className="text-gray-500">Analytics update instantly when products are added, edited, or removed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e6f4e8] rounded-xl">
                <stat.icon size={20} className="text-[#109121]" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-[#000000]">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Upload History</h2>
          <button
            type="button"
            onClick={() => onChangeView('products')}
            className="text-sm font-semibold text-[#109121] hover:text-[#0a5f15]"
          >
            Manage products →
          </button>
        </div>
        {recent.length === 0 ? (
          <p className="text-gray-500 text-sm">No products yet. Add your first listing from Products.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-gray-500 border-b">
                <tr>
                  <th className="py-3 pr-4">Product</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Upload Date & Time</th>
                  <th className="py-3 pr-4">Price</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-bold text-[#16C72E]">{p.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{p.category}</td>
                    <td className="py-3 pr-4 text-sm text-gray-500 whitespace-nowrap">
                      {p.created_at ? new Date(p.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'Legacy Upload'}
                    </td>
                    <td className="py-3 pr-4 font-bold text-[#000000]">{formatPrice(p.price)}</td>
                    <td className="py-3">
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
