import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, X, UploadCloud } from 'lucide-react';
import { products as initialProducts } from '../../data';
import { Product } from '../../types';

export const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Products Management</h1>
          <p className="text-gray-500 text-sm">Manage unlimited inventory across all vaults.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white p-4 text-white rounded-2xl border shadow-sm space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-purple-500 rounded-lg"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded shadow-sm object-cover" />
                    <span className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">{product.name}</span>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">Active</span>
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

      {/* Add Product Modal (Mock) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden mt-10 mb-10">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input type="text" placeholder="e.g. Vintage Rolex Submariner" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500">
                      <option>Jewelries</option>
                      <option>Cars</option>
                      <option>Shoes</option>
                      <option>Real Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                    <input type="number" placeholder="4500000" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (Cloudinary/S3 Dropzone)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <UploadCloud size={32} className="mb-2" />
                    <p className="text-sm">Click or drag images here</p>
                    <p className="text-xs mt-1">Supports unlimited HD uploads</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rich Description</label>
                <textarea rows={4} placeholder="Enter detailed product description..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500"></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t flex justify-end space-x-3 bg-gray-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
