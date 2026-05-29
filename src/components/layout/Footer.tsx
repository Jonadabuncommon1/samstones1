import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
export const Footer = () => {
  const { setCurrentView } = useAppContext();
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-6 text-white">SAMSTONES</h2>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              The premier luxury marketplace converging fashion, real estate, automotive, and lifestyle in one seamless digital marketplace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/share/15y5yJ2Xfff/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-none"><Twitter size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-[#e6f4e8]">Universes</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Fashion & Apparel</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Automobiles</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Real Estate</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Jewelry & Watches</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-[#e6f4e8]">Customer Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">WhatsApp Support</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Secure Shipping</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Global Network</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-[#e6f4e8]">Shop Categories</h3>
            <p className="text-white/80 text-sm mb-6 font-medium">Subscribe for exclusive access to rare drops and private listings.</p>
            <form className="flex bg-white/15 rounded-xl border border-white/25 shadow-none p-1 overflow-hidden">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent border-none outline-none text-sm text-white px-4 w-full placeholder-white/50"
              />
              <button type="button" className="bg-white text-[#109121] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-[#e6f4e8] transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-white/60">
          <p>&copy; {new Date().getFullYear()} Samstones International Resources Ltd.</p>
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
