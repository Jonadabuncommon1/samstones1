import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { marketplaceCategories } from '../../data';

export const CategoriesManager = () => {
  const [categories] = useState(marketplaceCategories);
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Categories / Vaults</h1>
          <p className="text-gray-500 text-sm">Create and organize unlimited categories.</p>
        </div>
        <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          <span>New Category</span>
        </button>
      </div>

      <div className="bg-white p-4 text-white rounded-2xl border shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">Vault Name</th>
                <th className="px-6 py-4">Items Count</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img src={cat.image} alt="" className="w-10 h-10 rounded shadow-sm object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">{cat.name}</div>
                      <div className="text-xs max-w-xs truncate">{cat.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ∞
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">Featured</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-gray-400 hover:text-purple-500"><Edit size={16} /></button>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
