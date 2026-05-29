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
      <div className="absolute inset-0 bg-black/30 pointer-events-none" /> {/* Optional backdrop for legibility */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-6 text-white drop-shadow-md">SAMSTONES</h2>
            <p className="text-white font-medium text-sm md:text-base leading-relaxed mb-6 drop-shadow-sm">
              The premier luxury marketplace converging fashion, real estate, automotive, and lifestyle in one seamless digital marketplace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-lg backdrop-blur-sm"><Instagram size={18} strokeWidth={2} /></a>
              <a href="https://www.facebook.com/share/15y5yJ2Xfff/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-lg backdrop-blur-sm"><Facebook size={18} strokeWidth={2} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-white hover:text-[#109121] transition-colors shadow-lg backdrop-blur-sm"><Twitter size={18} strokeWidth={2} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold tracking-widest uppercase mb-6 text-white drop-shadow-md">Universes</h3>
            <ul className="space-y-4 text-sm md:text-base font-medium">
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">Fashion & Apparel</a></li>
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">Automobiles</a></li>
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">Real Estate</a></li>
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">Jewelry & Watches</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold tracking-widest uppercase mb-6 text-white drop-shadow-md">Customer Support</h3>
            <ul className="space-y-4 text-sm md:text-base font-medium">
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">WhatsApp Support</a></li>
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">Secure Shipping</a></li>
              <li><a href="#" className="text-white hover:text-[#DFB722] transition-colors drop-shadow-sm">Global Network</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold tracking-widest uppercase mb-6 text-white drop-shadow-md">Shop Categories</h3>
            <p className="text-white font-medium text-sm md:text-base mb-6 drop-shadow-sm">Subscribe for exclusive access to rare drops and private listings.</p>
            <form className="flex bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-1 overflow-hidden">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent border-none outline-none text-sm font-medium text-white px-4 w-full placeholder-white/70"
              />
              <button type="button" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors shadow-md">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-white drop-shadow-sm">
          <p>&copy; {new Date().getFullYear()} Samstones International Resources Ltd.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <button
              onClick={() => { setCurrentView('privacy'); window.scrollTo(0, 0); }}
              className="hover:text-[#DFB722] transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => { setCurrentView('terms'); window.scrollTo(0, 0); }}
              className="hover:text-[#DFB722] transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
