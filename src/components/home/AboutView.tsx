import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Star, Layers, Tag, CheckCircle } from 'lucide-react';

export const AboutView = () => {
  const products = [
    'Premium shoes and footwear',
    'Fashion bags and accessories',
    'Clothing and fashion items',
    'Jewellery and luxury accessories',
    'Cars and vehicle sales',
    'Phone accessories and gadgets',
    'Drinks and beverages',
    'Cosmetics and beauty products',
    'Provisions and household essentials',
    'Real estate and property-related services',
  ];

  const commitments = [
    <>Delivering authentic and <span className="text-[#DFB722] font-black">quality</span> products</>,
    'Maintaining excellent customer service',
    'Building long-term customer relationships',
    'Conducting business ethically and responsibly',
    'Continuously improving our services and operations',
  ];

  const reasons = [
    {
      icon: ShieldCheck,
      title: <><span className="text-[#DFB722] font-black">Quality</span> Assurance</>,
      body: <>We are committed to offering products that meet high standards of <span className="text-[#DFB722] font-black">quality</span> and value.</>,
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
      body: <>We aim to make <span className="text-[#DFB722] font-black">quality</span> products accessible at competitive and fair prices.</>,
    },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-500">

      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-20 bg-gradient-to-br from-[#0B5C15] via-[#109121] to-[#073D0E] flex flex-col items-center justify-center text-center px-4 shadow-xl">
        {/* Decorative blobs and radial glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none filter blur-2xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#DFB722]/10 rounded-full pointer-events-none filter blur-3xl" />

        {/* Large, Bolder Family Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8 relative z-10 w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden bg-white p-4 border-4 border-[#DFB722] shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-8 ring-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/about_hero.jpg"
            alt="About Samstones"
            className="w-full h-full object-contain filter contrast-125"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#DFB722] text-xs font-bold uppercase tracking-widest mb-3 relative z-10 drop-shadow-sm"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif text-white tracking-tight font-bold relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          Samstones International
          <br />
          <span className="font-medium tracking-wide text-[#DFB722]">Resources Ltd</span>
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
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              A Dynamic, Customer-Focused Business
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Samstones International Resources Ltd</strong> is a dynamic and customer-focused business committed to providing <span className="text-[#DFB722] font-black">quality</span> products and reliable services across multiple industries. Based in Lagos State, Nigeria, we pride ourselves on delivering value, authenticity, affordability, and customer satisfaction in every transaction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our company operates with professionalism, integrity, and a strong commitment to excellence, serving individuals, families, and businesses with a wide range of products tailored to modern lifestyle and everyday needs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#e6f4e8] rounded-3xl p-8 border border-[#109121]/10"
          >
            <div className="grid grid-cols-2 gap-6 text-center">
              {[
                { value: '10+', label: 'Product Categories' },
                { value: 'Lagos', label: 'Based In, Nigeria' },
                { value: '100%', label: 'Authentic Products' },
                { value: '24/7', label: 'WhatsApp Support' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
                  <p className="text-2xl font-serif font-bold text-[#109121]">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Products & Services */}
        <section>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#109121] mb-3 block">What We Offer</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Our Products &amp; Services</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We offer carefully selected products and services across various categories, combining <span className="text-[#DFB722] font-black">quality</span>, durability, style, and affordability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-[#e6f4e8] rounded-xl px-5 py-4 border border-[#109121]/10">
                <CheckCircle size={18} className="text-[#109121] flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#109121] rounded-3xl p-8 text-white shadow-xl hover:shadow-[#109121]/20 hover:scale-[1.01] transition-all duration-300">
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4 block">Our Mission</span>
            <p className="text-white/95 leading-relaxed text-sm md:text-base">
              To provide high-quality products and dependable services that enhance everyday living through excellence, affordability, trust, and convenience. At <strong>Samstones International Resources Ltd</strong>, we are committed to delivering exceptional value across fashion, automobiles, beauty, lifestyle essentials, and real estate while maintaining professionalism, customer satisfaction, and integrity in every aspect of our business.
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
            <h2 className="text-3xl font-serif font-bold text-gray-900">The Samstones Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="border border-gray-100 rounded-2xl p-6 hover:border-[#109121]/30 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-[#e6f4e8] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#109121] transition-colors">
                  <r.icon size={22} className="text-[#109121] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment */}
        <section className="bg-[#e6f4e8] rounded-3xl p-8 md:p-12 border border-[#109121]/10">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#109121] mb-3 block">Our Commitment</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="max-w-xl mx-auto space-y-4">
            {commitments.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 shadow-sm">
                <CheckCircle size={18} className="text-[#109121] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
