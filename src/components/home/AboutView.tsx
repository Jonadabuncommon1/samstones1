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
      <div className="relative h-[55vh] w-full overflow-hidden mb-20 bg-[#109121] flex flex-col items-center justify-center text-center px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        {/* Two-people icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 relative z-10"
        >
          <svg
            viewBox="0 0 200 130"
            className="w-28 h-20 fill-white/90"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="42" cy="22" r="14" />
            <path d="M42 40 C42 40 20 52 10 38 C6 32 14 26 20 32 C26 38 34 48 42 54 C50 48 58 38 64 32 C70 26 78 32 74 38 C64 52 42 40 42 40Z" />
            <path d="M28 62 C28 62 24 90 26 108 C27 116 34 118 38 112 C40 106 40 88 42 82 C44 88 44 106 46 112 C50 118 57 116 58 108 C60 90 56 62 56 62Z" />
            <circle cx="158" cy="22" r="14" />
            <path d="M158 40 C158 40 136 52 126 38 C122 32 130 26 136 32 C142 38 150 48 158 54 C166 48 174 38 180 32 C186 26 194 32 190 38 C180 52 158 40 158 40Z" />
            <path d="M144 62 C144 62 140 90 142 108 C143 116 150 118 154 112 C156 106 156 88 158 82 C160 88 160 106 162 112 C166 118 173 116 174 108 C176 90 172 62 172 62Z" />
            <path d="M64 32 Q100 8 136 32" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4 relative z-10"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif text-white tracking-tight font-bold relative z-10"
        >
          Samstones International
          <br />
          <span className="font-light">Resources Ltd</span>
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
          <div className="bg-[#109121] rounded-3xl p-8 text-white">
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4 block">Our Mission</span>
            <p className="text-white/95 leading-relaxed text-base">
              To become a trusted household and commercial brand by providing <span className="text-[#DFB722] font-black">quality</span> products and dependable services while building lasting relationships with our customers through honesty, consistency, and professionalism.
            </p>
          </div>
          <div className="bg-gray-900 rounded-3xl p-8 text-white">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 block">Our Vision</span>
            <p className="text-white/95 leading-relaxed text-base">
              To be recognised as one of Nigeria's leading multi-service and retail brands known for excellence, reliability, innovation, and customer satisfaction.
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
