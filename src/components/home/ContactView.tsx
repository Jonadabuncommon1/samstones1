import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactView = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen text-white transition-colors duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Client Relations</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          We invite you to connect with our dedicated team for bespoke tailoring inquiries, styling advice, or order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-20 text-center">
        <div className="border border-white/10 glass p-8 flex flex-col items-center hover:border-gold transition-colors">
          <Phone className="text-gold mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-white">WhatsApp Support</h3>
          <p className="text-gray-400 text-sm mb-6 flex-1">Instant assistance for orders and sizing guidance.</p>
          <a 
            href="https://wa.me/2348065179554" 
            target="_blank" 
            rel="noopener noreferrer"
            className="uppercase tracking-widest text-xs font-semibold hover:text-gold transition-colors pb-1 border-b border-white hover:border-gold inline-block text-white"
          >
            +234 806 517 9554
          </a>
        </div>

        <div className="border border-white/10 glass p-8 flex flex-col items-center hover:border-gold transition-colors">
          <Mail className="text-gold mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-white">Email</h3>
          <p className="text-gray-400 text-sm mb-6 flex-1">For press, partnerships, and general inquiries.</p>
          <a 
            href="#" 
            className="uppercase tracking-widest text-xs font-semibold hover:text-gold transition-colors pb-1 border-b border-white hover:border-gold inline-block text-white"
          >
            info@samstones.com
          </a>
        </div>

        <div className="border border-white/10 glass p-8 flex flex-col items-center hover:border-gold transition-colors">
          <MapPin className="text-gold mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-white">Atelier</h3>
          <p className="text-gray-400 text-sm mb-6 flex-1">Visit our flagship atelier in Lagos for fittings (By Appointment Only).</p>
          <span className="uppercase tracking-widest text-xs font-semibold text-white">
            Lagos, Nigeria
          </span>
        </div>
      </div>
    </div>
  );
};
