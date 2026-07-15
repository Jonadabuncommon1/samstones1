import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { useAppContext } from '../../store/AppContext';
const supportMessage = `Hello 👋
Welcome to Samstones Marketplace Customer Support.

Thank you for reaching out to us. Our support team is available to assist you with:
• General enquiries
• Product information
• Order support
• Delivery assistance
• Complaints or feedback
• Business enquiries

Kindly send us a message describing how we may assist you, and a representative will respond as soon as possible.

We appreciate your patience and thank you for choosing Samstones.

Precision, Quality, and Reliability at Its Finest.`;

export const Footer = () => {
  const { setCurrentView, setActiveCategory, user } = useAppContext();

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentView('category');
    window.scrollTo(0, 0);
  };

  return (
    <footer 
      className="text-white pt-20 pb-10 border-t border-[#0a5f15] relative overflow-hidden transition-colors"
      style={{
        backgroundImage: "url('/footer_bg_new.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 md:gap-4 mb-6">
              <img src="/logo.png" alt="Samstones Logo" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain bg-white p-1 rounded-lg shadow-md" />
              <h2
                style={{ fontFamily: '"Ralika", serif' }}
                className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-yellow-500 mb-0 drop-shadow-sm font-bold"
              >Samstones</h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              The premier luxury marketplace converging fashion, real estate, automotive, and lifestyle in one seamless digital marketplace.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/samstones001" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/share/15y5yJ2Xfff/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><Twitter size={18} /></a>
              <a href="https://t.me/+QPUQUoIWMWwyNzA8" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><FaTelegramPlane size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-green-100">Categories</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => handleCategoryClick('clothes')} className="text-white/80 hover:text-white transition-colors text-left w-full">Fashion & Apparel</button></li>
              <li><button onClick={() => handleCategoryClick('cars')} className="text-white/80 hover:text-white transition-colors text-left w-full">Automobiles</button></li>
              <li><button onClick={() => handleCategoryClick('real-estates')} className="text-white/80 hover:text-white transition-colors text-left w-full">Real Estate</button></li>
              <li><button onClick={() => handleCategoryClick('jewelries')} className="text-white/80 hover:text-white transition-colors text-left w-full">Jewelry & Watches</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-green-100">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href={`https://wa.me/2348065179554?text=${encodeURIComponent(supportMessage)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => { if (!user) { e.preventDefault(); setCurrentView('auth'); } }} className="text-white/80 hover:text-white transition-colors">WhatsApp Support</a></li>
              <li><a href="mailto:support@samstonesresources.com" className="text-white/80 hover:text-white transition-colors">Email Support</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Secure Shipping</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Global Network</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); import('react-hot-toast').then(m => m.default.success('Referral program coming soon!')); }} className="text-[#DFB722] hover:text-yellow-300 font-bold transition-colors">Refer & Earn Program</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-white/60">
          <p>&copy; {new Date().getFullYear()} Samstones Marketplace. A brand of Samstones International Resources Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={() => { setCurrentView('privacy'); window.scrollTo(0, 0); }}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => { setCurrentView('terms'); window.scrollTo(0, 0); }}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
