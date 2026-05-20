import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { products, formatPrice } from '../../data';
import { Heart, ChevronRight, MessageCircle, Star, ShoppingBag, ShieldCheck, Truck, Minus, Plus, ArrowLeft } from 'lucide-react';

export const ProductDetailView = () => {
  const { activeProductId, setCurrentView, addToCart, wishlist, toggleWishlist } = useAppContext();
  const product = products.find(p => p.id === activeProductId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col justify-center items-center bg-black text-white transition-colors duration-500">
        <h2 className="text-2xl font-serif mb-4">Vault Item Not Found</h2>
        <button 
          onClick={() => setCurrentView('category')}
          className="border-b-2 border-pink-500 pb-1 uppercase tracking-widest text-xs font-bold hover:text-pink-400 transition-colors"
        >
          Return to Vaults
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedSize,
      selectedColor,
    });
  };

  const handleDirectWhatsApp = () => {
    let message = `Hello, I want to order this product from the vault:\n\n`;
    message += `*Product Name*: ${product.name}\n`;
    if (selectedSize) message += `*Size*: ${selectedSize}\n`;
    if (selectedColor) message += `*Color*: ${selectedColor}\n`;
    message += `*Quantity*: ${quantity}\n`;
    message += `*Total Price*: ${formatPrice(product.price * quantity)}\n\n`;
    message += `Is it available?`;

    const url = `https://wa.me/2348065179554?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-black text-white relative transition-colors duration-500">
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-purple-900/10 blur-[150px] pointer-events-none transition-colors" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500 font-bold">
          <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => setCurrentView('category')} className="hover:text-white transition-colors">Vaults</button>
          <ChevronRight size={12} />
          <span className="text-pink-400">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0 no-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-white/5 border transition-all duration-300 ${selectedImage === idx ? 'border-purple-500 opacity-100' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 bg-white/5 aspect-[4/5] md:aspect-[3/4] relative overflow-hidden rounded-2xl glass-card border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  key={selectedImage}
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-90"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 lg:py-8 flex flex-col">
            <div className="mb-2 flex items-center space-x-3">
               <span className="text-xs tracking-widest uppercase font-bold text-pink-400">{product.category}</span>
               {product.isNew && <span className="text-[10px] uppercase font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">New Arrival</span>}
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-serif text-white mb-4 font-bold tracking-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{formatPrice(product.price)}</p>
              <div className="flex items-center space-x-1 border-l border-white/20 pl-4">
                 <Star size={14} className="text-yellow-500 fill-current" />
                 <Star size={14} className="text-yellow-500 fill-current" />
                 <Star size={14} className="text-yellow-500 fill-current" />
                 <Star size={14} className="text-yellow-500 fill-current" />
                 <Star size={14} className="text-yellow-500 fill-current" />
                 <span className="text-xs text-gray-400 font-medium ml-1">(24)</span>
              </div>
            </div>

            <div className="prose prose-sm text-gray-300 mb-10 leading-relaxed max-w-none font-medium">
              <p>{product.description}</p>
              
              {(product.location || product.year || product.mileage) && (
                <ul className="mt-6 mb-4 space-y-3 border-t border-white/10 pt-6">
                  {product.location && (
                    <li className="flex items-center justify-between glass p-3 rounded-lg shadow-none">
                      <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Location</span>
                      <span className="font-semibold text-white">{product.location}</span>
                    </li>
                  )}
                  {product.year && (
                    <li className="flex items-center justify-between glass p-3 rounded-lg shadow-none">
                      <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Model Year</span>
                      <span className="font-semibold text-white">{product.year}</span>
                    </li>
                  )}
                  {product.mileage && (
                    <li className="flex items-center justify-between glass p-3 rounded-lg shadow-none">
                      <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Mileage</span>
                      <span className="font-semibold text-white">{product.mileage}</span>
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-8 mb-10">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Color: <span className="text-gray-400">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border rounded-lg font-semibold transition-all duration-300 ${
                        selectedColor === color ? 'border-purple-500 bg-purple-500/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-white">Size: <span className="text-gray-400">{selectedSize}</span></h3>
                  {(product.category === "Shoes" || product.category === "Clothes") && (
                    <button className="text-xs uppercase font-bold tracking-widest text-pink-400 border-b border-pink-400/30 hover:border-pink-400 transition-colors">Size Guide</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-12 flex items-center justify-center text-sm border font-semibold rounded-lg transition-all duration-300 px-3 ${
                        selectedSize === size ? 'border-pink-500 bg-pink-500/10 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Quantity</h3>
                <div className="flex items-center space-x-6 glass border border-white/5 p-2 rounded-xl inline-flex shadow-none">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4 mb-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-black py-4 px-8 rounded-xl flex items-center justify-center space-x-2 uppercase text-sm tracking-widest font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Vault</span>
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-14 w-full sm:w-16 rounded-xl border flex items-center justify-center transition-colors ${
                    isWishlisted ? 'border-pink-500 text-pink-400 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white glass'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
                </button>
              </div>
              
              <button 
                onClick={handleDirectWhatsApp}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl flex justify-center items-center space-x-3 uppercase text-sm tracking-widest font-bold hover:bg-[#128C7E] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.2)]"
              >
                <MessageCircle size={20} />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Guarantees Accordion Info */}
            <div className="mt-auto border-t border-white/10 pt-8 grid grid-cols-2 gap-4">
               <div className="flex items-center space-x-3 glass border border-white/5 p-4 rounded-xl shadow-none">
                 <ShieldCheck size={24} className="text-purple-400" />
                 <div>
                    <h4 className="text-sm font-bold text-white">Genuine Quality</h4>
                    <p className="text-xs text-gray-400">100% Authenticity</p>
                 </div>
              </div>
              <div className="flex items-center space-x-3 glass border border-white/5 p-4 rounded-xl shadow-none">
                 <Truck size={24} className="text-pink-400" />
                 <div>
                    <h4 className="text-sm font-bold text-white">Fast Delivery</h4>
                    <p className="text-xs text-gray-400">Secure shipping</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
