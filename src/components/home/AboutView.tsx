import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Heart, Star, Layers, Tag, CheckCircle, ChevronDown, Footprints, Briefcase, Shirt, Gem, Sparkles, Wine, Home, Smartphone, Car, Building, Users } from 'lucide-react';
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

const productDetails = [
  {
    title: "Premium Shoes & Footwear",
    desc: "Step into ultimate comfort and style with an elite collection of footwear sourced from the world's finest retail hubs.",
    icon: <Footprints className="text-[#109121]" />
  },
  {
    title: "Fashion Bags & Accessories",
    desc: "Elevate your everyday look with statement pieces and premium bags designed for the modern trendsetter.",
    icon: <Briefcase className="text-[#109121]" />
  },
  {
    title: "Clothing & Fashion Items",
    desc: "Stay ahead of the trends with high-quality apparel crafted to make you look and feel confident.",
    icon: <Shirt className="text-[#109121]" />
  },
  {
    title: "Jewelry & Luxury Accessories",
    desc: "Add a touch of elegance to your collection with pristine, hand-selected luxury pieces built to shine.",
    icon: <Gem className="text-[#109121]" />
  },
  {
    title: "Cosmetics & Beauty Products",
    desc: "Flawless formulations and premium beauty essentials to enhance your natural glow.",
    icon: <Sparkles className="text-[#109121]" />
  },
  {
    title: "Drinks & Beverages",
    desc: "A sophisticated curation of refreshing, high-quality drinks perfect for any occasion or celebration.",
    icon: <Wine className="text-[#109121]" />
  },
  {
    title: "Provisions & Household Essentials",
    desc: "Keep your home running seamlessly with trusted, top-tier daily essentials and household necessities.",
    icon: <Home className="text-[#109121]" />
  },
  {
    title: "Phone Accessories & Gadgets",
    desc: "Power your digital lifestyle with high-performance, durable accessories and cutting-edge tech.",
    icon: <Smartphone className="text-[#109121]" />
  },
  {
    title: "Cars & Vehicle Sales",
    desc: "Drive with confidence in premium-certified, high-performing brand-new and cleanly maintained used vehicles.",
    icon: <Car className="text-[#109121]" />
  },
  {
    title: "Real Estate & Property-Related Services",
    desc: "Secure your future with meticulously vetted, prime property opportunities and trusted real estate services.",
    icon: <Building className="text-[#109121]" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const AboutView = () => {
  const [activeProductIdx, setActiveProductIdx] = React.useState<number | null>(null);
  const { user, setCurrentView } = useAppContext();

  const commitments = [
    'Delivering authentic and quality products',
    'Maintaining excellent customer service',
    'Building long-term customer relationships',
    'Conducting business ethically and responsibly',
    'Continuously improving our services and operations',
  ];

  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      body: 'We are committed to offering products that meet high standards of quality and value.',
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      body: 'Our customers remain at the centre of everything we do. We aim to provide a seamless and satisfying shopping experience.',
    },
    {
      icon: Star,
      title: 'Reliability & Trust',
      body: 'We conduct our business with integrity, transparency, and professionalism.',
    },
    {
      icon: Layers,
      title: 'Diverse Product Range',
      body: 'From fashion and accessories to vehicles, cosmetics, provisions, and real estate, we provide a broad selection under one trusted brand.',
    },
    {
      icon: Tag,
      title: 'Affordable Pricing',
      body: 'We aim to make quality products accessible at competitive and fair prices.',
    },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-500">

      {/* Hero Banner */}
      <div 
        className="relative h-[60vh] w-full overflow-hidden mb-20 flex flex-col items-center justify-center text-center px-4 shadow-xl"
        style={{
          backgroundImage: 'url("/about_bg_pattern_v2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-[#073d0e]/60 pointer-events-none mix-blend-multiply" />
        {/* Decorative blobs and radial glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none filter blur-2xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#E8B93D]/10 rounded-full pointer-events-none filter blur-3xl" />

        {/* Large, Bolder Family Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8 relative z-10 w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#E8B93D] shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-8 ring-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300 bg-transparent"
        >
          <Users className="w-24 h-24 md:w-32 md:h-32 text-[#E8B93D] drop-shadow-[0_0_8px_rgba(232,185,61,0.3)]" strokeWidth={2.5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#E8B93D] text-xs font-bold uppercase tracking-widest mb-3 relative z-10 drop-shadow-sm"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif text-white tracking-tight font-bold relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          Samstones
          <br />
          <span className="font-medium tracking-wide text-[#E8B93D]">Marketplace</span>
        </motion.h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Who We Are */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#109121] mb-3 block">Who We Are</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              A Dynamic, Customer-Focused Business
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Samstones Marketplace</strong> is a dynamic and customer-focused business committed to providing quality products and reliable services across multiple industries. Based in Lagos State, Nigeria, we pride ourselves on delivering value, authenticity, affordability, and customer satisfaction in every transaction.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our company operates with professionalism, integrity, and a strong commitment to excellence, serving individuals, families, and businesses with a wide range of products tailored to modern lifestyle and everyday needs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl p-8 border border-[#109121]/10 relative overflow-hidden"
            style={{
              backgroundImage: 'url("/about_commitment_bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10 grid grid-cols-2 gap-6 text-center">
              {[
                { value: '10+', label: 'Product Categories' },
                { value: 'Lagos', label: 'Based In, Nigeria' },
                { value: '100%', label: 'Authentic Products' },
                { value: '24/7', label: 'WhatsApp Support', isLink: true },
              ].map((stat) => 
                stat.isLink ? (
                  <a
                    key={stat.label}
                    href={`https://wa.me/2348065179554?text=${encodeURIComponent(supportMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (!user) { e.preventDefault(); setCurrentView('auth'); } }}
                    className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-5 shadow-sm block hover:scale-105 transition-transform border border-transparent hover:border-[#109121]/30 cursor-pointer text-center decoration-transparent"
                  >
                    <p className="text-2xl font-serif font-bold text-[#109121]">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-white mt-1 font-medium">{stat.label}</p>
                  </a>
                ) : (
                  <div key={stat.label} className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-5 shadow-sm">
                    <p className="text-2xl font-serif font-bold text-[#109121]">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-white mt-1 font-medium">{stat.label}</p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </section>

        {/* Products & Services */}
        <section>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#109121] mb-3 block">What We Offer</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Our Products &amp; Services</h2>
            <p className="text-gray-500 dark:text-gray-300 mt-3 max-w-xl mx-auto">
              We offer carefully selected products and services across various categories, combining quality, durability, style, and affordability.
            </p>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {productDetails.map((item, idx) => {
              const isExpanded = activeProductIdx === idx;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  onClick={() => setActiveProductIdx(isExpanded ? null : idx)}
                  className={`border rounded-2xl p-4 md:p-5 cursor-pointer transition-all duration-300 ${
                    isExpanded 
                      ? 'bg-gradient-to-r from-[#e6f4e8] to-[#f4fbf5] dark:from-[#109121]/20 dark:to-[#109121]/5 border-[#109121] shadow-md scale-[1.01]' 
                      : 'bg-[#e6f4e8] dark:bg-[#109121]/15 border-[#109121]/30 dark:border-gray-800 hover:border-[#109121]/50 hover:bg-[#d8edd9] dark:hover:bg-[#109121]/25 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-gray-900 dark:text-gray-100 font-bold text-sm md:text-base">
                        {item.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 dark:text-gray-500 dark:text-white"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-4 pl-9 leading-relaxed border-l-2 border-[#109121]/20">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#109121] rounded-3xl p-8 text-white shadow-xl hover:shadow-[#109121]/20 hover:scale-[1.01] transition-all duration-300">
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4 block">Our Mission</span>
            <p className="text-white/95 leading-relaxed text-sm md:text-base">
              To provide high-quality products and dependable services that enhance everyday living through excellence, affordability, trust, and convenience. At <strong>Samstones Marketplace</strong>, we are committed to delivering exceptional value across fashion, automobiles, beauty, lifestyle essentials, and real estate while maintaining professionalism, customer satisfaction, and integrity in every aspect of our business.
            </p>
          </div>
          <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl hover:shadow-black/20 hover:scale-[1.01] transition-all duration-300">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 block">Our Vision</span>
            <p className="text-white/95 leading-relaxed text-sm md:text-base">
              To become one of Nigeria’s most trusted and recognised multi-sector retail and lifestyle brands, renowned for quality, innovation, integrity, and outstanding customer service. We aspire to empower individuals and communities by providing access to premium products, reliable services, and modern commerce solutions that inspire confidence and elevate lifestyles.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#109121] mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">The Samstones Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:border-[#109121]/30 hover:shadow-md transition-all group bg-white dark:bg-[#1A1A1A]">
                <div className="w-12 h-12 bg-[#e6f4e8] dark:bg-[#109121]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#109121] transition-colors">
                  <r.icon size={22} className="text-[#109121] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-base mb-2 text-[#E8B93D]">{r.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 dark:text-white text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment */}
        <section 
          className="rounded-3xl p-8 md:p-12 border border-[#109121]/10 relative overflow-hidden"
          style={{
            backgroundImage: 'url("/about_commitment_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 text-center mb-8">
            <span className="text-sm font-black uppercase tracking-widest text-white mb-3 block drop-shadow-md">Our Commitment</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">What We Stand For</h2>
          </div>
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            {commitments.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 shadow-sm">
                <CheckCircle size={18} className="text-[#109121] mt-0.5 flex-shrink-0" />
                <span className="text-[#374151] dark:text-black font-bold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
