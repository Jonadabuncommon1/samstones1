import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { formatPrice } from '../data';
import toast from 'react-hot-toast';

export const WhatsAppCart = () => {
  const { cart, removeFromCart, updateQuantity, cartOpen, setCartOpen, user, setCurrentView } = useAppContext();

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let message = "🌟 *SAMSTONES MARKETPLACE* 🌟\n";
    message += "===========================================\n";
    message += "Hello! I would like to place an order for the following items from your premium marketplace:\n\n";

    cart.forEach((item, idx) => {
      message += `${idx + 1}. 🛍️ *${item.product.name}* (Qty: ${item.quantity})\n`;
      if (item.selectedSize) message += `   📏 Size: ${item.selectedSize}\n`;
      if (item.selectedColor) message += `   🎨 Color: ${item.selectedColor}\n`;
      message += `   💰 Price: ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });

    message += "-------------------------------------------\n";
    message += `💰 *Total Order Value*: *${formatPrice(totalAmount)}*\n`;
    message += "-------------------------------------------\n\n";
    message += "Please confirm availability and provide the next steps for payment and delivery. Thank you!";

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
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 pointer-events-auto"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white border-l border-gray-200 z-50 flex flex-col pointer-events-auto shadow-2xl text-gray-900 dark:text-white transition-colors"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 relative overflow-hidden bg-[#e6f4e8]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#109121]/10 blur-2xl rounded-full transition-colors" />
              <div className="flex items-center space-x-2 relative z-10">
                <ShoppingBag size={20} className="text-[#109121]" />
                <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                <span className="bg-[#109121] text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-500 dark:text-white hover:text-gray-900 dark:text-white hover:bg-white/80 rounded-full transition-colors relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 relative bg-white">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-white space-y-4 relative z-10">
                  <ShoppingBag size={48} className="mb-2 text-[#e6f4e8]" />
                  <p className="font-serif text-lg text-gray-900 dark:text-white">Your cart is empty.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="text-xs font-bold tracking-widest uppercase text-[#109121] hover:text-[#0a5f15] transition-colors"
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
                      className="flex space-x-4 glass p-3 rounded-2xl shadow-none border border-gray-100"
                    >
                      <div className="w-24 h-24 bg-[#e6f4e8] rounded-xl flex-shrink-0 overflow-hidden border border-gray-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{item.product.name}</h3>
                            {(item.selectedColor || item.selectedSize) && (
                              <p className="text-xs text-gray-500 dark:text-white mt-1 uppercase tracking-wider font-semibold">
                                {[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-gray-400 dark:text-white hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center space-x-3 bg-[#e6f4e8] px-2 py-1 rounded-lg border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-gray-700 dark:text-white hover:text-[#109121] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-gray-700 dark:text-white hover:text-[#109121] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-bold text-[#000000] text-sm tracking-wide">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-[#e6f4e8] relative z-10 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 dark:text-white text-sm font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif font-bold text-xl text-[#000000]">{formatPrice(totalAmount)}</span>
                </div>
                <button
                  onClick={() => {
                    if (!user) {
                      setCartOpen(false);
                      setCurrentView('auth');
                    } else {
                      window.open(generateWhatsAppMessage(), '_blank');
                    }
                  }}
                  className="w-full bg-[#109121] text-white flex items-center justify-center space-x-3 py-4 rounded-xl uppercase text-sm font-bold tracking-widest transition-transform transform active:scale-95 hover:bg-[#0a5f15]"
                >
                  <MessageCircle size={20} className="text-white" />
                  <span>Checkout on WhatsApp</span>
                </button>
                
                {user && (
                  <div className="mt-5 text-center bg-white/50 dark:bg-black/10 p-3 rounded-lg border border-[#109121]/20">
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1.5 font-medium">Love Samstones? Invite friends and earn rewards!</p>
                    <button 
                      onClick={() => {
                        const referralUrl = `${window.location.origin}/?ref=${user.uid}`;
                        navigator.clipboard.writeText(referralUrl);
                        toast.success('Referral link copied to clipboard!');
                      }}
                      className="text-xs font-extrabold text-[#C8A96B] hover:text-yellow-600 uppercase tracking-widest underline transition-colors"
                    >
                      Copy My Referral Link
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
