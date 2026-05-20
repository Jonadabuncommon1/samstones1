import React from 'react';
import { Product } from '../../types';
import { formatPrice } from '../../data';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProductId, setCurrentView, addToCart } = useAppContext();

  const handleView = () => {
    setActiveProductId(product.id);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || '',
      selectedColor: product.colors?.[0] || '',
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group cursor-pointer h-full border border-white/5 bg-white/5 rounded-xl overflow-hidden glass-card shadow-none transition-all duration-300 hover:border-purple-500/30"
      onClick={handleView}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black">
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 shadow-lg rounded-full">
            New
          </span>
        )}
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
        
        {/* Actions Overlay */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex space-x-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            onClick={handleQuickAdd}
            className="flex-1 glass text-white py-3 px-4 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-xl shadow-lg border border-white/20"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
          <a
            href={`https://wa.me/2348065179554?text=Hello%20I%20am%20interested%20in%20this%20product:%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#25D366] text-white p-3 flex items-center justify-center hover:bg-[#128C7E] transition-colors rounded-xl shadow-lg"
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.265-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.203.048-.376-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.076-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.226 1.365.195 1.88.121.574-.09 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.552 4.136 1.6 5.922L.15 23.85l6.082-1.597A11.954 11.954 0 0 0 12.002 24c6.621 0 12-5.373 12-12s-5.379-12-12-12zm0 21.996c-1.803 0-3.565-.48-5.112-1.396l-.367-.217-3.79 1.002.996-3.69-.239-.379A9.972 9.972 0 0 1 2.004 12c0-5.516 4.485-10 10-10s10 4.484 10 10-4.485 9.996-10 9.996z"/></svg>
          </a>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold tracking-wide text-white mb-2 group-hover:text-pink-400 transition-colors truncate">{product.name}</h3>
        
        {product.location && (
          <p className="text-xs text-gray-400 mb-2 flex items-center">
            <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            {product.location}
          </p>
        )}
        
        {(product.year || product.mileage) && (
          <p className="text-xs text-gray-500 mb-2 flex items-center space-x-2">
            {product.year && <span>{product.year}</span>}
            {product.year && product.mileage && <span>&bull;</span>}
            {product.mileage && <span>{product.mileage}</span>}
          </p>
        )}

        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mt-2">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
};
