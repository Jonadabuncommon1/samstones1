import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { marketplaceCategories, formatPrice } from '../../data';
import { ProductCard } from '../shop/ProductCard';
import { Search, ArrowRight, ShieldCheck, Zap, Globe, ShoppingBag, Shirt, Footprints, Briefcase, Gem, Car, Home, Sparkles, Wine, Headphones, ArrowUpRight, ArrowLeft, Target, Eye, Lightbulb } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const HomeView = () => {
  const { setCurrentView, setActiveCategory, products, submitSearch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'motto' | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [stepWidth, setStepWidth] = useState(304);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const categoriesRef = React.useRef<HTMLDivElement>(null);
  const [servicesHintOffset, setServicesHintOffset] = useState(0);

  // Animation hint to show slideability
  React.useEffect(() => {
    const timer1 = setTimeout(() => {
      if (categoriesRef.current) {
        categoriesRef.current.scrollBy({ left: 80, behavior: 'smooth' });
      }
      setServicesHintOffset(-60);
    }, 1200);

    const timer2 = setTimeout(() => {
      if (categoriesRef.current) {
        categoriesRef.current.scrollBy({ left: -80, behavior: 'smooth' });
      }
      setServicesHintOffset(0);
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const coreServices = [
    {
      id: 'clothes',
      title: 'Luxury Fashion',
      image: '/cat_clothes_new.jpg',
      icon: Shirt
    },
    {
      id: 'shoes',
      title: 'Premium Footwear',
      image: '/cat_shoes_new.jpg',
      icon: Footprints
    },
    {
      id: 'bags',
      title: 'Designer Bags',
      image: '/cat_bags_new.jpg',
      icon: Briefcase
    },
    {
      id: 'jewelries',
      title: 'Jewellery & Watches',
      image: '/cat_jewelries_new.jpg',
      icon: Gem
    },
    {
      id: 'cars',
      title: 'Cars & Automobiles',
      image: '/cat_cars_new.jpg',
      icon: Car
    },
    {
      id: 'real-estates',
      title: 'Real Estate',
      image: '/cat_real_estates_new.jpg',
      icon: Home
    },
    {
      id: 'cosmetics',
      title: 'Cosmetics & Beauty',
      image: '/cat_cosmetics_new.jpg',
      icon: Sparkles
    },
    {
      id: 'drinks',
      title: 'Drinks & Beverages',
      image: '/cat_drinks_new.jpg',
      icon: Wine
    },
    {
      id: 'phone-accessories',
      title: 'Phone Accessories',
      image: '/cat_phone_accessories_new.jpg',
      icon: Headphones
    },
    {
      id: 'provisions',
      title: 'Provisions & Essentials',
      image: '/cat_provisions_new.jpg',
      icon: ShoppingBag
    }
  ];

  const dynamicCoreServices = React.useMemo(() => {
    return coreServices.map(service => {
      const categoryProducts = products.filter(p => p.category === service.id);
      
      categoryProducts.sort((a, b) => {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return timeB - timeA;
      });

      const mostRecentProduct = categoryProducts[0];
      const dynamicImage = (mostRecentProduct && mostRecentProduct.images && mostRecentProduct.images.length > 0) 
        ? mostRecentProduct.images[0] 
        : service.image;

      return {
        ...service,
        image: dynamicImage
      };
    });
  }, [products]);

  React.useEffect(() => {
    const handleResize = () => {
      setStepWidth(window.innerWidth >= 768 ? 304 : 256);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicCoreServices.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, dynamicCoreServices.length]);

  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      submitSearch(searchQuery);
    }
  };

  return (
    <div className="w-full bg-transparent text-gray-900 dark:text-gray-100 selection:bg-[#109121]/10 overflow-hidden transition-colors duration-500">

      <section className="relative pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative grid grid-cols-1 xl:grid-cols-2 gap-12 items-start rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden border border-[#DFB722]/30 bg-white min-h-[500px] xl:min-h-[550px]"
          style={{ 
            backgroundImage: "url('/premium_marketplace.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Subtle overlay to enhance contrast slightly if needed */}
          <div className="absolute inset-0 bg-white/10 pointer-events-none z-0" />

          {/* Left Column - Premium Text overlay pushed to the top left to avoid overlap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex flex-col justify-start text-left max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-[#109121]/10 px-4 py-2 rounded-full mb-6 w-fit border border-[#109121]/20 hover:border-[#109121]/60 hover:shadow-[0_0_20px_rgba(16,145,33,0.4)] transition-all duration-300 cursor-default animate-shine"
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#109121] relative z-10">WE MEET YOUR NEEDS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-black text-[#109121] mb-6 leading-tight"
            >
              Discover the Finest Assets & Supplies.
            </motion.h1>

          </motion.div>

          {/* Right Column - Kept empty to display the luxury house, car, phones, and brand stripes of the collage background */}
          <div className="hidden xl:block w-full h-full pointer-events-none" />

        </div>
      </section>

      <section className="py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#109121]">
            Categories
          </h2>
        </div>

        <div className="relative group">
          <button 
            onClick={() => {
              if (categoriesRef.current) {
                categoriesRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-5 z-40 w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] shadow-md border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-all md:opacity-0 md:group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ArrowLeft size={18} />
          </button>

          <motion.div 
            ref={categoriesRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-flow-col auto-cols-[calc(50%-0.5rem)] sm:auto-cols-[calc(33.333%-0.666rem)] lg:auto-cols-[calc(20%-0.8rem)] gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar scroll-smooth relative z-10"
          >
            {marketplaceCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="snap-start relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center group/card shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <button 
                  className="absolute inset-0 w-full h-full z-20 cursor-pointer opacity-0" 
                  onClick={() => { setActiveCategory(category.id); setCurrentView('category'); window.scrollTo(0, 0); }}
                  aria-label={`View ${category.name}`}
                />
                <div className="relative z-10 w-24 h-24 mx-auto bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 group-hover/card:scale-110 transition-all duration-300 shadow-lg border border-[#109121]/20 text-[#109121] group-hover/card:text-[#0a5f15] group-hover/card:bg-[#109121]/20">
                  {(() => {
                    const IconComp = (LucideIcons as any)[category.icon || 'HelpCircle'];
                    return <IconComp size={56} />;
                  })()}
                  <span className="sr-only">{category.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <button 
            onClick={() => {
              if (categoriesRef.current) {
                categoriesRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-5 z-40 w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] shadow-md border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#109121] dark:hover:text-[#16C72E] transition-all md:opacity-0 md:group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </section>




      {/* Modern Premium "Core Services" Section inspired by Interlink */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div 
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-[2.5rem] p-8 lg:p-16 shadow-2xl overflow-hidden border border-[#DFB722]/30"
          style={{ 
            backgroundImage: "url('/footer_bg_new.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dynamic Background Blur Effects */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#DFB722]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#109121]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Left Side (60% width) - Sliding Service Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 w-full overflow-hidden relative">
            <div 
              className="relative w-full py-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div ref={carouselRef} className="overflow-hidden w-full">
                <motion.div
                  drag="x"
                  dragConstraints={{ 
                    left: -(dynamicCoreServices.length * stepWidth - (carouselRef.current?.offsetWidth || 0) - 24), 
                    right: 0 
                  }}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, info) => {
                    setIsDragging(false);
                    const dragOffset = info.offset.x;
                    const threshold = 50;
                    if (dragOffset < -threshold) {
                      setCurrentIndex((prev) => Math.min(prev + 1, dynamicCoreServices.length - 1));
                    } else if (dragOffset > threshold) {
                      setCurrentIndex((prev) => Math.max(prev - 1, 0));
                    }
                  }}
                  animate={{ x: -currentIndex * stepWidth + servicesHintOffset }}
                  transition={{ type: "spring", stiffness: 85, damping: 17 }}
                  className="flex gap-6 cursor-grab active:cursor-grabbing w-max py-2 px-1"
                >
                  {dynamicCoreServices.map((service, index) => {
                    const IconComponent = service.icon;
                    const isActive = index === currentIndex;
                    return (
                      <motion.div
                        key={service.id}
                        whileHover={{ y: -8 }}
                        className={`w-[240px] md:w-[280px] h-[340px] md:h-[420px] flex-shrink-0 relative rounded-3xl overflow-hidden group shadow-xl border transition-all duration-500 cursor-pointer ${
                          isActive ? 'border-[#DFB722] shadow-[#DFB722]/20' : 'border-white/10 hover:border-[#DFB722]/30'
                        }`}
                        onClick={() => {
                          if (!isDragging) {
                            setActiveCategory(service.id);
                            setCurrentView('category');
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        {/* Slide Category Image */}
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#031505] via-black/30 to-transparent z-10" />

                        {/* Slide Card Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                          <div className="flex items-end justify-between">
                            <div className="flex flex-col text-left">
                              {/* Service Icon */}
                              <div className="w-10 h-10 bg-[#DFB722]/25 backdrop-blur-md rounded-full flex items-center justify-center mb-3 text-[#DFB722] border border-[#DFB722]/30 group-hover:bg-[#DFB722] group-hover:text-black transition-colors duration-300">
                                <IconComponent size={20} />
                              </div>
                              {/* Service Title */}
                              <h4 className="font-sans font-black text-white text-lg md:text-xl tracking-wide group-hover:text-[#DFB722] transition-colors duration-300">
                                {service.title}
                              </h4>
                            </div>

                            {/* Small Arrow Icon */}
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-[#DFB722] group-hover:text-black group-hover:border-[#DFB722] transition-all duration-300">
                              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Slider Controls & Premium Indicator Dots */}
              <div className="flex items-center space-x-4 mt-6 justify-start">
                <button 
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#DFB722] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white/5 active:scale-95"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="flex space-x-1.5">
                  {dynamicCoreServices.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex ? 'w-6 bg-[#DFB722]' : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, dynamicCoreServices.length - 1))}
                  disabled={currentIndex === dynamicCoreServices.length - 1}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#DFB722] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white/5 active:scale-95"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side (40% width) - Text Content & CTAs (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col text-left relative z-10 lg:pl-8">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#DFB722] mb-6 leading-tight">
              Redefining Modern Commerce & Lifestyle.
            </h2>
            <p className="text-white font-bold text-sm md:text-base leading-relaxed mb-6 drop-shadow-md">
              At Samstones Marketplace, we provide premium products and reliable services designed to meet modern lifestyle and everyday needs with quality, elegance, and convenience.
            </p>
            <p className="text-white font-bold text-sm leading-relaxed mb-8 drop-shadow-md">
              We deliver premium fashion, automobiles, beauty products, lifestyle essentials, and real estate solutions with a commitment to quality, trust, and customer satisfaction. Designed for modern living. Delivered with excellence.
            </p>

            <div className="flex flex-row items-center gap-3 w-full">
              <button
                onClick={() => { setCurrentView('categories'); window.scrollTo(0, 0); }}
                className="flex-1 bg-[#DFB722] hover:bg-[#cdaf20] text-black font-extrabold px-3 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(223,183,34,0.3)] hover:shadow-[0_0_30px_rgba(223,183,34,0.8)] active:scale-95 cursor-pointer text-[10px] sm:text-xs tracking-wider uppercase text-center whitespace-nowrap"
              >
                Explore Services
              </button>
              <button
                onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }}
                className="flex-1 border border-[#DFB722]/30 text-[#DFB722] hover:bg-[#DFB722]/10 font-bold px-3 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer text-[10px] sm:text-xs tracking-wider uppercase text-center whitespace-nowrap"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Expandable Mission, Vision & Motto Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-xs font-semibold tracking-widest text-[#109121] uppercase dark:text-green-400">
            About Samstones Marketplace
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
          {[
            { id: 'mission', title: 'Mission', icon: Target },
            { id: 'vision', title: 'Vision', icon: Eye },
            { id: 'motto', title: 'Motto', icon: Lightbulb }
          ].map((sec) => {
            const isActive = activeTab === sec.id;
            const IconComp = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(isActive ? null : sec.id as any)}
                className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-[#109121] border-[#109121] text-white shadow-lg scale-105' 
                    : 'bg-white dark:bg-[#111] border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 hover:border-[#109121] hover:shadow-md'
                }`}
              >
                <IconComp size={48} strokeWidth={2} className={`mb-3 ${isActive ? 'text-white' : 'text-[#109121]'}`} />
                <span className="font-bold text-xs sm:text-sm tracking-wider uppercase">{sec.title}</span>
              </button>
            );
          })}
        </div>

        <div className="relative transition-all duration-500">
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 text-center shadow-inner"
            >
              {activeTab === 'mission' && (
                <div>
                  <h3 className="text-sm font-bold text-[#109121] dark:text-[#16C72E] mb-3 uppercase tracking-widest">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    To provide high-quality products and dependable services that enhance everyday living through excellence, affordability, trust, and convenience. At <strong>Samstones Marketplace</strong>, we are committed to delivering exceptional value across fashion, automobiles, beauty, lifestyle essentials, and real estate while maintaining professionalism, customer satisfaction, and integrity in every aspect of our business.
                  </p>
                </div>
              )}
              {activeTab === 'vision' && (
                <div>
                  <h3 className="text-sm font-bold text-[#109121] dark:text-[#16C72E] mb-3 uppercase tracking-widest">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    To become one of Nigeria’s most trusted and recognised multi-sector retail and lifestyle brands, renowned for quality, innovation, integrity, and outstanding customer service. We aspire to empower individuals and communities by providing access to premium products, reliable services, and modern commerce solutions that inspire confidence and elevate lifestyles.
                  </p>
                </div>
              )}
              {activeTab === 'motto' && (
                <div>
                  <h3 className="text-sm font-bold text-[#109121] dark:text-[#16C72E] mb-3 uppercase tracking-widest">Our Motto</h3>
                  <p className="text-gray-800 dark:text-gray-100 font-serif italic text-base sm:text-lg font-medium leading-relaxed">
                    "Precision, Quality, and Reliability at Its Finest."
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 py-16 bg-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 dark:text-white text-sm">Verified luxury assets and fresh provisions.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121]">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-white text-sm">Swift and reliable shipping directly to your doorstep.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#109121]/10 rounded-full flex items-center justify-center mb-4 text-[#109121] overflow-hidden">
                <Globe size={32} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Global Support</h3>
              <p className="text-gray-600 dark:text-white text-sm">Dedicated customer support available 24/7 globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
