import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { formatPrice } from '../data';

export const WhatsAppCart = () => {
  const { cart, removeFromCart, updateQuantity, cartOpen, setCartOpen } = useAppContext();

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let message = "Hello, I would like to order from the vault:\n\n";
    
    cart.forEach(item => {
      message += `* ${item.product.name} x${item.quantity}\n`;
      if (item.selectedSize) message += `  Size: ${item.selectedSize}\n`;
      if (item.selectedColor) message += `  Color: ${item.selectedColor}\n`;
      message += `  Price: ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });
    
    message += `*Total Order Value: ${formatPrice(totalAmount)}*\n\n`;
    message += "Please let me know the next steps for payment and delivery.";

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/2348065179554?text=${encodedMessage}`;
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col pointer-events-auto shadow-2xl text-white transition-colors"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-2xl rounded-full transition-colors" />
              <div className="flex items-center space-x-2 relative z-10">
                <ShoppingBag size={20} className="text-pink-400" />
                <h2 className="font-serif text-xl font-bold">Your Vault</h2>
                <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 relative">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 blur-2xl rounded-full pointer-events-none transition-colors" />
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 relative z-10">
                  <ShoppingBag size={48} className="mb-2 text-white/10" />
                  <p className="font-serif text-lg text-white">Your vault is empty.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="text-xs font-bold tracking-widest uppercase text-pink-400 hover:text-white transition-colors"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <div className="space-y-6 relative z-10">
                  {cart.map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} 
                      className="flex space-x-4 glass p-3 rounded-2xl shadow-none"
                    >
                      <div className="w-24 h-24 bg-white/5 rounded-xl flex-shrink-0 overflow-hidden border border-white/10">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover object-center opacity-90"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-white text-sm line-clamp-1">{item.product.name}</h3>
                            { (item.selectedColor || item.selectedSize) && (
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                              {[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}
                            </p>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors bg-white/5"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center space-x-3 glass px-2 py-1 rounded-lg border border-white/10">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-white hover:text-pink-400 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-white hover:text-pink-400 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-bold text-pink-400 text-sm tracking-wide">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black relative z-10 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{formatPrice(totalAmount)}</span>
                </div>
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black flex items-center justify-center space-x-3 py-4 rounded-xl uppercase text-sm font-bold tracking-widest transition-transform transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-gray-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.265-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.203.048-.376-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.076-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.226 1.365.195 1.88.121.574-.09 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.552 4.136 1.6 5.922L.15 23.85l6.082-1.597A11.954 11.954 0 0 0 12.002 24c6.621 0 12-5.373 12-12s-5.379-12-12-12zm0 21.996c-1.803 0-3.565-.48-5.112-1.396l-.367-.217-3.79 1.002.996-3.69-.239-.379A9.972 9.972 0 0 1 2.004 12c0-5.516 4.485-10 10-10s10 4.484 10 10-4.485 9.996-10 9.996z"/></svg>
                  <span>Checkout on WhatsApp</span>
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
