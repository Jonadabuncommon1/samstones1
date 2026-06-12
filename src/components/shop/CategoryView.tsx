import React, { useState } from 'react';
import { motion } from 'motion/react';
import { marketplaceCategories } from '../../data';
import { ProductCard } from './ProductCard';
import { useAppContext } from '../../store/AppContext';
import { searchProducts } from '../../utils/searchProducts';
import { Search, SlidersHorizontal, ChevronDown, ArrowLeft, ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const CategoryView = () => {
  const {
    products,
    activeCategory,
    setCurrentView,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    searchSubmitted,
    submitSearch,
    clearSearch,
    searchProductsGlobally,
    goBack,
  } = useAppContext();

  const [sortMode, setSortMode] = useState<string>('default');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  let effectiveCategory = activeCategory;
  if (searchSubmitted && searchQuery.trim().length > 0 && !activeCategory) {
    const q = searchQuery.toLowerCase().trim();
    if (q.includes('cloth') || q.includes('suit') || q.includes('senator')) effectiveCategory = 'clothes';
    else if (q.includes('shoe') || q.includes('sneaker')) effectiveCategory = 'shoes';
    else if (q.includes('bag') || q.includes('clutch')) effectiveCategory = 'bags';
    else if (q.includes('jewel') || q.includes('ring') || q.includes('neck')) effectiveCategory = 'jewelries';
    else if (q.includes('car') || q.includes('benz') || q.includes('lexus')) effectiveCategory = 'cars';
    else if (q.includes('phone') || q.includes('airpod') || q.includes('accessor')) effectiveCategory = 'phone-accessories';
    else if (q.includes('drink') || q.includes('wine') || q.includes('champagne')) effectiveCategory = 'drinks';
    else if (q.includes('cosmetic') || q.includes('perfume') || q.includes('cologne')) effectiveCategory = 'cosmetics';
    else if (q.includes('provision') || q.includes('rice') || q.includes('food')) effectiveCategory = 'provisions';
    else if (q.includes('real') || q.includes('estate') || q.includes('land') || q.includes('house')) effectiveCategory = 'real-estates';
  }

  React.useEffect(() => {
    let slidesCount = 0;
    let delay = 5000;
    if (effectiveCategory === 'clothes') slidesCount = 7;
    else if (effectiveCategory === 'trending') { slidesCount = 3; delay = 7000; }
    else if (effectiveCategory === 'shoes') slidesCount = 8;
    else if (effectiveCategory === 'bags') slidesCount = 10;
    else if (effectiveCategory === 'jewelries') slidesCount = 11;
    else if (effectiveCategory === 'cars') slidesCount = 9;
    else if (effectiveCategory === 'phone-accessories') slidesCount = 8;
    else if (effectiveCategory === 'drinks') slidesCount = 12;
    else if (effectiveCategory === 'cosmetics') slidesCount = 9;
    else if (effectiveCategory === 'provisions') slidesCount = 7;
    else if (effectiveCategory === 'real-estates') slidesCount = 6;

    if (slidesCount > 0) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slidesCount);
      }, delay);
      return () => clearInterval(interval);
    }
  }, [effectiveCategory]);

  const categoryData = marketplaceCategories.find(
    c => c.id === activeCategory || c.name === activeCategory
  );
  const isGlobalSearch = searchSubmitted && searchQuery.trim().length > 0;
  const categoryName = isGlobalSearch
    ? `Search: "${searchQuery}"`
    : activeCategory === 'trending'
    ? 'Trending'
    : categoryData?.name || 'All Categories';

  let categoryProducts = products;
  if (isGlobalSearch) {
    categoryProducts = searchProductsGlobally(searchQuery);
  } else if (activeCategory === 'trending') {
    categoryProducts = products.filter((p) => p.isTrending);
  } else if (categoryData) {
    categoryProducts = products.filter((p) => p.category === categoryData.name);
  }

  if (searchQuery.trim() && !isGlobalSearch) {
    categoryProducts = searchProducts(categoryProducts, searchQuery);
  }

  let displayProducts = [...categoryProducts];

  if (sortMode === 'price-asc') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortMode === 'price-desc') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortMode === 'popularity') {
    displayProducts.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
  } else if (sortMode === 'new') {
    displayProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const trendingProducts = categoryProducts.filter(p => p.isTrending);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-transparent text-gray-900 dark:text-gray-100 relative transition-colors duration-500">
       
      {/* Category Hero */}
      <div className="relative h-[40vh] md:h-[50vh] w-full mb-12 border-b border-white/5">
        {effectiveCategory === 'clothes' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/clothes_banner/clothes_banner_img_1.jfif',
              '/clothes_banner/clothes_banner_img_2.jfif',
              '/clothes_banner/clothes_banner_img_3.jfif',
              '/clothes_banner/clothes_banner_img_4.jfif',
              '/clothes_banner/clothes_banner_img_5.jfif',
              '/clothes_banner/clothes_banner_img_6.jfif',
              '/clothes_banner/clothes_banner_img_7.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Clothes slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'shoes' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/shoes_banner/shoes_banner_img_1.jfif',
              '/shoes_banner/shoes_banner_img_2.jfif',
              '/shoes_banner/shoes_banner_img_3.jfif',
              '/shoes_banner/shoes_banner_img_4.jfif',
              '/shoes_banner/shoes_banner_img_5.jfif',
              '/shoes_banner/shoes_banner_img_6.jfif',
              '/shoes_banner/shoes_banner_img_7.jfif',
              '/shoes_banner/shoes_banner_img_8.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Shoes slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'bags' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/bags_banner/bags_banner_img_1.jfif',
              '/bags_banner/bags_banner_img_2.jfif',
              '/bags_banner/bags_banner_img_3.jfif',
              '/bags_banner/bags_banner_img_4.jfif',
              '/bags_banner/bags_banner_img_5.jfif',
              '/bags_banner/bags_banner_img_6.jfif',
              '/bags_banner/bags_banner_img_7.jfif',
              '/bags_banner/bags_banner_img_8.jfif',
              '/bags_banner/bags_banner_img_9.jfif',
              '/bags_banner/bags_banner_img_10.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Bags slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'jewelries' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/jewelry_banner/jewelry_banner_img_1.jfif',
              '/jewelry_banner/jewelry_banner_img_2.jfif',
              '/jewelry_banner/jewelry_banner_img_3.jfif',
              '/jewelry_banner/jewelry_banner_img_4.jfif',
              '/jewelry_banner/jewelry_banner_img_5.jfif',
              '/jewelry_banner/jewelry_banner_img_6.jfif',
              '/jewelry_banner/jewelry_banner_img_7.jfif',
              '/jewelry_banner/jewelry_banner_img_8.jfif',
              '/jewelry_banner/jewelry_banner_img_9.jfif',
              '/jewelry_banner/jewelry_banner_img_10.jfif',
              '/jewelry_banner/jewelry_banner_img_11.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Jewelry slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'cars' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/cars_banner/cars_banner_img_1.jfif',
              '/cars_banner/cars_banner_img_2.jfif',
              '/cars_banner/cars_banner_img_3.jfif',
              '/cars_banner/cars_banner_img_4.jfif',
              '/cars_banner/cars_banner_img_5.jfif',
              '/cars_banner/cars_banner_img_6.jfif',
              '/cars_banner/cars_banner_img_7.jfif',
              '/cars_banner/cars_banner_img_8.jfif',
              '/cars_banner/cars_banner_img_9.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Cars slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'phone-accessories' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/phone_accessories_banner/phone_accessories_banner_img_1.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_2.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_3.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_4.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_5.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_6.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_7.jfif',
              '/phone_accessories_banner/phone_accessories_banner_img_8.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Phone Accessories slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'drinks' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/drinks_banner/drinks_banner_img_1.jfif',
              '/drinks_banner/drinks_banner_img_2.jfif',
              '/drinks_banner/drinks_banner_img_3.jfif',
              '/drinks_banner/drinks_banner_img_4.jfif',
              '/drinks_banner/drinks_banner_img_5.jfif',
              '/drinks_banner/drinks_banner_img_6.jfif',
              '/drinks_banner/drinks_banner_img_7.jfif',
              '/drinks_banner/drinks_banner_img_8.jfif',
              '/drinks_banner/drinks_banner_img_9.jfif',
              '/drinks_banner/drinks_banner_img_10.jfif',
              '/drinks_banner/drinks_banner_img_11.jfif',
              '/drinks_banner/drinks_banner_img_12.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Drinks slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'cosmetics' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/cosmetics_banner/cosmetics_banner_img_1.jfif',
              '/cosmetics_banner/cosmetics_banner_img_2',
              '/cosmetics_banner/cosmetics_banner_img_3.jfif',
              '/cosmetics_banner/cosmetics_banner_img_4.jfif',
              '/cosmetics_banner/cosmetics_banner_img_5.jfif',
              '/cosmetics_banner/cosmetics_banner_img_6.jfif',
              '/cosmetics_banner/cosmetics_banner_img_7.jfif',
              '/cosmetics_banner/cosmetics_banner_img_8.jfif',
              '/cosmetics_banner/cosmetics_banner_img_9.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Cosmetics slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'provisions' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/provisions_banner/provisions_banner_img_1.jfif',
              '/provisions_banner/provisions_banner_img_2.jfif',
              '/provisions_banner/provisions_banner_img_3.jfif',
              '/provisions_banner/provisions_banner_img_4.jfif',
              '/provisions_banner/provisions_banner_img_5.jfif',
              '/provisions_banner/provisions_banner_img_6.jfif',
              '/provisions_banner/provisions_banner_img_7.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Provisions slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'real-estates' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/real_estates_banner/real_estates_banner_img_1.jfif',
              '/real_estates_banner/real_estates_banner_img_2.jfif',
              '/real_estates_banner/real_estates_banner_img_3.jfif',
              '/real_estates_banner/real_estates_banner_img_4.jfif',
              '/real_estates_banner/real_estates_banner_img_5.jfif',
              '/real_estates_banner/real_estates_banner_img_6.jfif'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Real Estates slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : effectiveCategory === 'trending' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/banner1.png',
              '/banner2.png',
              '/banner3.png'
            ].map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
                <img
                  src={imgSrc}
                  alt={`Trending slide ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <img 
              src={categoryData?.image || '/cart_laptop.jpg'} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl scale-110"
            />
            <img 
              src={categoryData?.image || '/cart_laptop.jpg'} 
              alt={categoryName}
              className="absolute inset-0 w-full h-full object-contain opacity-100"
            />
          </>
        )}

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-gray-100 dark:border-gray-800/80 w-full">
          <div className="flex items-center justify-between w-full md:w-auto md:flex-1 mr-4">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-white">
              <button onClick={() => setCurrentView('home')} className="hover:text-[#109121] transition-colors">Home</button>
              <ChevronRight size={10} />
              <button onClick={() => { setActiveCategory(null); setCurrentView('categories'); }} className="hover:text-[#109121] transition-colors">Explore</button>
              <ChevronRight size={10} />
              <span className="text-[#109121] font-bold">{categoryName}</span>
            </div>
            <button 
              onClick={() => {
                goBack();
                window.scrollTo(0, 0);
              }} 
              className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white hover:text-[#109121] transition-colors mr-4 md:mr-0"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          </div>

          <div className="flex items-center w-full md:w-auto space-x-4">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch(searchQuery);
                }}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#109121] rounded-xl shadow-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between space-x-2 px-4 py-2 rounded-xl text-sm uppercase tracking-widest font-semibold text-gray-600 dark:text-white hover:text-[#109121] border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] hover:border-[#109121] transition-colors h-full">
                <span>{sortMode === 'default' ? 'Sort' : sortMode === 'price-asc' ? 'Low to High' : sortMode === 'price-desc' ? 'High to Low' : sortMode === 'popularity' ? 'Popularity' : 'New Arrivals'}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`glass-card absolute right-0 top-full mt-2 w-48 rounded-xl transition-all z-50 overflow-hidden border border-white/10 shadow-lg dark:bg-[#1a1a1a] ${isSortOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <button onClick={() => { setSortMode('default'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] dark:hover:bg-[#109121]/20 ${sortMode === 'default' ? 'font-bold text-[#109121]' : 'text-gray-600 dark:text-white'}`}>Default</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => { setSortMode('price-asc'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] dark:hover:bg-[#109121]/20 ${sortMode === 'price-asc' ? 'font-bold text-[#109121]' : 'text-gray-600 dark:text-white'}`}>Price: Low to High</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => { setSortMode('price-desc'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] dark:hover:bg-[#109121]/20 ${sortMode === 'price-desc' ? 'font-bold text-[#109121]' : 'text-gray-600 dark:text-white'}`}>Price: High to Low</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => { setSortMode('popularity'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] dark:hover:bg-[#109121]/20 ${sortMode === 'popularity' ? 'font-bold text-[#109121]' : 'text-gray-600 dark:text-white'}`}>Popularity</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => { setSortMode('new'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] dark:hover:bg-[#109121]/20 ${sortMode === 'new' ? 'font-bold text-[#109121]' : 'text-gray-600 dark:text-white'}`}>New Arrivals</button>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center space-x-2 p-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-[#109121] transition-colors md:hidden shadow-sm">
              <SlidersHorizontal size={18} className="text-gray-600 dark:text-white hover:text-[#109121]" />
            </button>
          </div>
        </div>

        {/* Filters Sidebar and Main Content */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Filters */}
          <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 mb-6 md:mb-0`}>
            <h3 className="font-serif text-2xl font-bold mb-6 text-gray-900 dark:text-white">Shop Categories</h3>
            
            <div className="space-y-8 p-6 rounded-2xl border border-gray-200 bg-[#e6f4e8]/50 shadow-none">
              <div>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => setActiveCategory('trending')}
                      className={`text-sm tracking-wide transition-colors ${activeCategory === 'trending' ? 'text-[#109121] font-bold' : 'text-gray-400 dark:text-white hover:text-[#109121]'}`}
                    >
                      Trending
                    </button>
                  </li>
                  {marketplaceCategories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => setActiveCategory(cat.id)}
                        className={`text-sm tracking-wide transition-colors ${activeCategory === cat.id ? 'text-[#109121] font-bold' : 'text-gray-400 dark:text-white hover:text-[#109121]'}`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}

                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {displayProducts.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {displayProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-32 rounded-3xl border border-gray-200 bg-[#e6f4e8]/40 shadow-none px-6">
                {searchQuery.trim() ? (
                  <>
                    <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Not available at this moment</h3>
                    <p className="text-gray-600 dark:text-white font-medium max-w-md mx-auto">
                      We could not find &ldquo;{searchQuery}&rdquo; in our catalog right now. Try another search or browse categories.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        clearSearch();
                        setActiveCategory(null);
                      }}
                      className="mt-6 text-sm font-bold uppercase tracking-widest text-[#109121] hover:text-[#0a5f15]"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">No selections found.</h3>
                    <p className="text-gray-400 dark:text-white font-medium">Try adjusting your filters.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
