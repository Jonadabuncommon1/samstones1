import React, { useState } from 'react';
import { motion } from 'motion/react';
import { marketplaceCategories } from '../../data';
import { ProductCard } from './ProductCard';
import { useAppContext } from '../../store/AppContext';
import { searchProducts } from '../../utils/searchProducts';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

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
  } = useAppContext();

  const [sortMode, setSortMode] = useState<string>('default');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  React.useEffect(() => {
    let slidesCount = 0;
    if (activeCategory === 'clothes') slidesCount = 7;
    else if (activeCategory === 'shoes') slidesCount = 8;
    else if (activeCategory === 'bags') slidesCount = 10;
    else if (activeCategory === 'jewelries') slidesCount = 11;
    else if (activeCategory === 'cars') slidesCount = 9;
    else if (activeCategory === 'phone-accessories') slidesCount = 8;
    else if (activeCategory === 'drinks') slidesCount = 12;
    else if (activeCategory === 'cosmetics') slidesCount = 9;
    else if (activeCategory === 'provisions') slidesCount = 7;
    else if (activeCategory === 'real-estates') slidesCount = 6;

    if (slidesCount > 0) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slidesCount);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeCategory]);

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
        {activeCategory === 'clothes' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/clothes_banner/475129829461745168.jfif',
              '/clothes_banner/7036943163674607.jfif',
              '/clothes_banner/8725793022364305.jfif',
              '/clothes_banner/8725793022525261.jfif',
              '/clothes_banner/Boost your clothing brands online presence with….jfif',
              '/clothes_banner/Neste inverno vão apostar nas possíveis cores….jfif',
              '/clothes_banner/Showcase stunning women\'s clothing with this sleek….jfif'
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
        ) : activeCategory === 'shoes' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/shoes_banner/23784704275095894.jfif',
              '/shoes_banner/269301252720455208.jfif',
              '/shoes_banner/8725793019860175.jfif',
              '/shoes_banner/Grenson is a brand with a rich history_ Read more….jfif',
              '/shoes_banner/Sapato Calçado Sapatos Couro Background.jfif',
              '/shoes_banner/Thrilled to team up with Symbol Premium on this… (1).jfif',
              '/shoes_banner/Thrilled to team up with Symbol Premium on this….jfif',
              '/shoes_banner/shoes,promotion,banner,hand painted shoes,casual….jfif'
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
        ) : activeCategory === 'bags' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/bags_banner/#SOLIDO #LeatherSet #LuxuryGift #GenuineLeather….jfif',
              '/bags_banner/35536284552701188.jfif',
              '/bags_banner/40673202880283899.jfif',
              '/bags_banner/4151824649955901.jfif',
              '/bags_banner/475411304427336233.jfif',
              '/bags_banner/Because how you carry yourself should look this….jfif',
              '/bags_banner/Coach purse collection_ credit_ mj_heyzhou.jfif',
              '/bags_banner/Discover how to choose between a bold orange or a….jfif',
              '/bags_banner/Luxury Handbags & Jewellery for Women _ USA UK….jfif',
              '/bags_banner/To be honest, I always tell myself I will be calm….jfif'
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
        ) : activeCategory === 'jewelries' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/jewelry_banner/#ads #graphiac #design #designer #rolex #watch….jfif',
              '/jewelry_banner/10133167906819409.jfif',
              '/jewelry_banner/342836590411457201.jfif',
              '/jewelry_banner/7177680652812627.jfif',
              '/jewelry_banner/Cabochonsforyou - Etsy.jfif',
              '/jewelry_banner/Check out new work on my @Behance profile_ _Luxury….jfif',
              '/jewelry_banner/Elegance is not standing out, but being….jfif',
              '/jewelry_banner/Every jewel tells a story of beauty and grace….jfif',
              '/jewelry_banner/Explore our bold Men’s Jewelry Collection in rich….jfif',
              '/jewelry_banner/Luxury watches for women - Explore how their….jfif',
              '/jewelry_banner/ست پولکی موجود شد ✨♥️  وزن ست ~ 7_690 گرم   طلا ١٨….jfif'
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
        ) : activeCategory === 'cars' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/cars_banner/1085226841442819628.jfif',
              '/cars_banner/140033869660053313.jfif',
              '/cars_banner/185562447142309321.jfif',
              '/cars_banner/330099847704768797.jfif',
              '/cars_banner/617274692714101964.jfif',
              '/cars_banner/8725793024795439.jfif',
              '/cars_banner/G-Class_ A Sparkling declaration of love in….jfif',
              '/cars_banner/Social media marketing.jfif',
              '/cars_banner/Toyota C-HR luxury showcase poster.jfif'
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
        ) : activeCategory === 'phone-accessories' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/phone_accessories_banner/1618549863575624.jfif',
              '/phone_accessories_banner/637822365989565620.jfif',
              '/phone_accessories_banner/8SECVANTAGE AUDIO 🎧 _ Hear The Future….jfif',
              '/phone_accessories_banner/Gadget Guard Black Ice Cornice Curved Edition….jfif',
              '/phone_accessories_banner/Phone Cases & Phone Cover & Cell Phone Cases….jfif',
              '/phone_accessories_banner/Planning your next trip_ Discover the best travel….jfif',
              '/phone_accessories_banner/Upgrade your mobile experience with these….jfif',
              '/phone_accessories_banner/we buy phones we sale phones  we swap phones.jfif'
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
        ) : activeCategory === 'drinks' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/drinks_banner/1057008975022101832.jfif',
              '/drinks_banner/1090434128553582279.jfif',
              '/drinks_banner/16 Unique Travel Souvenirs That Will Actually Get….jfif',
              '/drinks_banner/18507048459343603.jfif',
              '/drinks_banner/33284484740558832.jfif',
              '/drinks_banner/386394843039365447.jfif',
              '/drinks_banner/571394271460425029.jfif',
              '/drinks_banner/739364463866770394.jfif',
              '/drinks_banner/940126490982445638.jfif',
              '/drinks_banner/Most Expensive Whiskey _ दुनिया की सबसे महंगी शराब.jfif',
              '/drinks_banner/Search Images _ Photos, videos, logos….jfif',
              '/drinks_banner/The Booze That Came Before.jfif'
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
        ) : activeCategory === 'cosmetics' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/cosmetics_banner/#banner #Banner design #Cosmetic banner #product….jfif',
              '/cosmetics_banner/128141551892472686.jfif',
              '/cosmetics_banner/16818198597842986.jfif',
              '/cosmetics_banner/196469602488323973.jfif',
              '/cosmetics_banner/978829300280184490.jfif',
              '/cosmetics_banner/Best care of the skin with scented almond oil_.jfif',
              '/cosmetics_banner/Natural family skincare products_ Available for….jfif',
              '/cosmetics_banner/The latest report by IMARC Group, titled “Color….jfif',
              '/cosmetics_banner/….jfif'
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
        ) : activeCategory === 'provisions' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/provisions_banner/104216178873361808.jfif',
              '/provisions_banner/111675265755964422.jfif',
              '/provisions_banner/36521446970895902.jfif',
              '/provisions_banner/36521446970899870.jfif',
              '/provisions_banner/683702787222699867.jfif',
              '/provisions_banner/957296464533939491.jfif',
              '/provisions_banner/Is your red meat intake harming your health_ Use….jfif'
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
        ) : activeCategory === 'real-estates' ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {[
              '/real_estates_banner/140806231468527.jfif',
              '/real_estates_banner/652810908524685883.jfif',
              '/real_estates_banner/8022105582125257.jfif',
              '/real_estates_banner/JASMINE ESTATE A pristine expanse of prime land….jfif',
              '/real_estates_banner/Seneca Property and Asset Management _ Real estate….jfif',
              '/real_estates_banner/अब 3BHK घर सिर्फ सपना नहीं, हकीकत है! 🏡 जयपुर के….jfif'
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
        ) : (
          <img 
            src={categoryData?.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000'} 
            alt={categoryName}
            className="w-full h-full object-cover opacity-60"
          />
        )}

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-4">
          <div className="flex space-x-2 text-xs uppercase tracking-widest font-semibold text-gray-500">
            <button onClick={() => setCurrentView('home')} className="hover:text-[#109121] transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => { setActiveCategory(null); setCurrentView('categories'); }} className="hover:text-[#109121] transition-colors">Explore</button>
            <span>/</span>
            <span className="text-[#109121] font-bold">{categoryName}</span>
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
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#109121] rounded-xl shadow-none placeholder-gray-400 transition-colors"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative group">
              <button className="flex items-center justify-between space-x-2 px-4 py-2 rounded-xl text-sm uppercase tracking-widest font-semibold text-gray-600 hover:text-[#109121] border border-gray-200 bg-white hover:border-[#109121] transition-colors h-full">
                <span>{sortMode === 'default' ? 'Sort' : sortMode === 'price-asc' ? 'Low to High' : sortMode === 'price-desc' ? 'High to Low' : sortMode === 'popularity' ? 'Popularity' : 'New Arrivals'}</span>
                <ChevronDown size={14} />
              </button>
              <div className="glass-card absolute right-0 top-full mt-2 w-48 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden border border-white/10 shadow-none">
                <button onClick={() => setSortMode('default')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] ${sortMode === 'default' ? 'font-bold text-[#109121]' : 'text-gray-600'}`}>Default</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('price-asc')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] ${sortMode === 'price-asc' ? 'font-bold text-[#109121]' : 'text-gray-600'}`}>Price: Low to High</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('price-desc')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] ${sortMode === 'price-desc' ? 'font-bold text-[#109121]' : 'text-gray-600'}`}>Price: High to Low</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('popularity')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] ${sortMode === 'popularity' ? 'font-bold text-[#109121]' : 'text-gray-600'}`}>Popularity</button>
                <div className="h-px w-full bg-white/5" />
                <button onClick={() => setSortMode('new')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[#e6f4e8] ${sortMode === 'new' ? 'font-bold text-[#109121]' : 'text-gray-600'}`}>New Arrivals</button>
              </div>
            </div>
            
            <button className="glass flex items-center space-x-2 p-2 bg-white/5 border border-white/10 rounded-xl hover:border-[#109121] transition-colors md:hidden shadow-none">
              <SlidersHorizontal size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Filters Sidebar (Desktop) and Main Content */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <h3 className="font-serif text-2xl font-bold mb-6 text-gray-900">Shop Categories</h3>
            
            <div className="space-y-8 p-6 rounded-2xl border border-gray-200 bg-[#e6f4e8]/50 shadow-none">
              <div>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => setActiveCategory('trending')}
                      className={`text-sm tracking-wide transition-colors ${activeCategory === 'trending' ? 'text-[#109121] font-bold' : 'text-gray-400 hover:text-[#109121]'}`}
                    >
                      Trending
                    </button>
                  </li>
                  {marketplaceCategories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => setActiveCategory(cat.id)}
                        className={`text-sm tracking-wide transition-colors ${activeCategory === cat.id ? 'text-[#109121] font-bold' : 'text-gray-400 hover:text-[#109121]'}`}
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
                    <h3 className="text-2xl font-serif text-gray-900 mb-2">Not available at this moment</h3>
                    <p className="text-gray-600 font-medium max-w-md mx-auto">
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
                    <h3 className="text-2xl font-serif text-gray-900 mb-2">No selections found.</h3>
                    <p className="text-gray-400 font-medium">Try adjusting your filters.</p>
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
