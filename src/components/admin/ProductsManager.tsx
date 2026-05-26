import React, { useMemo, useState } from 'react';
import { Plus, Search, Edit, Trash2, X, UploadCloud, Loader2 } from 'lucide-react';
import { marketplaceCategories } from '../../data';
import { Product } from '../../types';
import { useAppContext } from '../../store/AppContext';
import { formatPrice } from '../../data';
import { uploadImage } from '../../lib/supabase';

type FormState = {
  name: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  isNew: boolean;
  isTrending: boolean;
};

const emptyForm = (): FormState => ({
  name: '',
  category: marketplaceCategories[0]?.name || 'Shoes',
  price: '',
  description: '',
  images: [],
  isNew: false,
  isTrending: false,
});

export const ProductsManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, search]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setSelectedFiles([]);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      images: product.images || [],
      isNew: !!product.isNew,
      isTrending: !!product.isTrending,
    });
    setSelectedFiles([]);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setSelectedFiles([]);
    setFormError('');
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setFormError('Enter a valid price in Naira.');
      return;
    }
    if (form.images.length === 0 && selectedFiles.length === 0) {
      setFormError('At least one image is required.');
      return;
    }

    setIsUploading(true);
    setFormError('');

    try {
      const uploadedUrls: string[] = [...form.images];
      
      for (const file of selectedFiles) {
        try {
          const url = await uploadImage(file);
          if (url) {
            uploadedUrls.push(url);
          }
        } catch (err: any) {
          throw new Error(`Upload failed: ${err.message || 'Unknown error'}`);
        }
      }

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price,
        description: form.description.trim() || 'Premium listing from Samstones Marketplace.',
        images: uploadedUrls,
        isNew: form.isNew,
        isTrending: form.isTrending,
      };

      if (editingId) {
        updateProduct(editingId, payload);
      } else {
        addProduct(payload);
      }

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      closeModal();
    } catch (error: any) {
      setFormError(error.message || 'Failed to publish product. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove "${name}" from the marketplace?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm font-medium">
          Product saved successfully. Storefront and platform overview updated.
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Products Management</h1>
          <p className="text-gray-500 text-sm">Add, edit, or remove listings. Changes appear on the site immediately.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-[#109121] hover:bg-[#0a5f15] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white p-4 text-gray-900 rounded-2xl border shadow-sm space-y-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#109121] rounded-lg"
          />
        </div>

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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No products match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <img src={product.images[0]} alt="" className="w-10 h-10 rounded shadow-sm object-cover" />
                      <span className="font-bold text-[#16C72E] line-clamp-1 max-w-[200px]">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-[#000000]">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEdit(product)}
                        className="text-gray-400 hover:text-[#109121] inline-flex p-1"
                        aria-label="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-gray-400 hover:text-red-500 inline-flex p-1"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handlePublish}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-10"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button type="button" onClick={closeModal} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {formError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{formError}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-[#109121]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-[#109121]"
                    >
                      {marketplaceCategories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-[#109121]"
                    />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.isNew}
                        onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                      />
                      New arrival
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.isTrending}
                        onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
                      />
                      Trending
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (Max 5)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 text-center">
                    <UploadCloud size={28} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Click to select files from your device</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const totalImages = form.images.length + selectedFiles.length + files.length;
                        if (totalImages > 5) {
                          setFormError('Maximum 5 images allowed per product.');
                          return;
                        }
                        setFormError('');
                        setSelectedFiles((prev) => [...prev, ...files]);
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#109121] file:text-white hover:file:bg-[#0a5f15] cursor-pointer"
                    />
                    
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {form.images.map((url, idx) => (
                        <div key={`existing-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      {selectedFiles.map((file, idx) => (
                        <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border">
                          <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-[#109121]"
                />
              </div>
            </div>

            <div className="p-6 border-t flex justify-end space-x-3 bg-gray-50">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 bg-[#109121] hover:bg-[#0a5f15] text-white rounded-lg text-sm font-medium flex items-center space-x-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{editingId ? 'Save Changes' : 'Publish Product'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
