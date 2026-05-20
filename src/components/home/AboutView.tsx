import React from 'react';
import { motion } from 'motion/react';

export const AboutView = () => {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-black text-white transition-colors duration-500">
      {/* Editorial Header */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-20">
        <img 
          src="https://images.unsplash.com/photo-1515347619152-1bf035db20d1?auto=format&fit=crop&q=80&w=2000" 
          alt="Brand Story" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white tracking-tight"
          >
            Our Heritage
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif text-white mb-8">Samstones International Resources Ltd</h2>
        <div className="prose prose-lg text-gray-400 mx-auto leading-relaxed mb-16">
          <p className="mb-6">
            Founded with a vision to redefine luxury fashion on the African continent, Samstones represents the pinnacle of sartorial elegance bridging traditional craftsmanship and modern global aesthetics.
          </p>
          <p className="mb-6">
            Every garment is a testament to meticulous construction. We source the finest silks, linens, and hand-woven fabrics, collaborating with master artisans to create pieces that not only adorn the body but tell a story of cultural richness.
          </p>
          <p>
            Our commitment lies in providing an exclusive, personalized experience for our distinguished clientele. From bespoke consultations to effortless WhatsApp ordering, we ensure that the Samstones experience is as refined as the garments we create.
          </p>
        </div>

        <div className="border border-white/20 p-12 max-w-2xl mx-auto bg-white/5">
          <h3 className="font-serif text-2xl mb-4 italic text-white">"Elegance is an attitude, rooted in heritage."</h3>
          <p className="uppercase tracking-widest text-xs font-semibold text-gray-400">— Founder & Creative Director</p>
        </div>
      </div>
    </div>
  );
};
