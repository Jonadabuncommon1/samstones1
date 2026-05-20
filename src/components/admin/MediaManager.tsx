import React from 'react';
import { UploadCloud, Image as ImageIcon, Search, Folder } from 'lucide-react';
import { products as initialProducts, marketplaceCategories } from '../../data';

export const MediaManager = () => {
  // Aggregate all images simply for display
  const allImages = [
    ...marketplaceCategories.map(c => c.image),
    ...initialProducts.flatMap(p => p.images)
  ].slice(0, 16); // Take just a sample

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Media Library</h1>
          <p className="text-gray-500 text-sm">Manage infinite uploads synced to Cloudinary/AWS S3.</p>
        </div>
        <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <UploadCloud size={16} />
          <span>Upload Media</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search images..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-purple-500 rounded-lg"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
            <Folder size={16} />
            <span>Folders</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allImages.map((img, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg border overflow-hidden relative group">
              <img src={img} alt={`Media ${i}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button className="bg-white/20 p-2 rounded-full text-white hover:bg-purple-500"><ImageIcon size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
