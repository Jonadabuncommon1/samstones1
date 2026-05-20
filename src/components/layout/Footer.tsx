import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

export const Footer = () => {
  const { setCurrentView } = useAppContext();

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-purple-900/30 relative overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-6 text-gradient">SAMSTONES</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The premier luxury marketplace converging fashion, real estate, automotive, and lifestyle in one seamless digital vault.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-none"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-none"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-none"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-purple-400">Universes</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Fashion & Apparel</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Automobiles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Real Estate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Jewelry & Watches</a></li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-purple-400">Concierge</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Secure Shipping</a></li>
              <li><button onClick={() => setCurrentView('admin')} className="text-gray-400 hover:text-white transition-colors">Admin Dashboard</button></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Global Network</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-purple-400">The Vault</h3>
            <p className="text-gray-400 text-sm mb-6 font-medium">Subscribe for exclusive access to rare drops and private listings.</p>
            <form className="flex bg-white/5 rounded-xl border border-white/10 shadow-none p-1 overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-transparent border-none outline-none text-sm text-white px-4 w-full placeholder-gray-500"
              />
              <button type="button" className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-gray-500">
          <p>&copy; {new Date().getFullYear()} Samstones International Resources Ltd.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
