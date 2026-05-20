import React from 'react';
import { Save } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Store Settings</h1>
          <p className="text-gray-500 text-sm">Configure global platform behavior.</p>
        </div>
        <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-8">
        
        {/* Info Setup */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Business Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" defaultValue="Samstones International Resources Ltd" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input type="text" defaultValue="+2348065179554" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500" />
            </div>
          </div>
        </div>

        {/* Database Config */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Infrastructure Integrations</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Database Provider</label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500">
                <option value="supabase">Supabase / PostgreSQL</option>
                <option value="firebase">Firebase Firestore</option>
                <option value="mongodb">MongoDB Atlas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Storage CDN</label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-purple-500">
                <option value="cloudinary">Cloudinary Images & video</option>
                <option value="s3">AWS S3</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-2">These integrations enable the platform to support unlimited scale and ultra-fast media loading.</p>
        </div>

      </div>
    </div>
  );
};
