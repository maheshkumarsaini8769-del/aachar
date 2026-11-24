import React, { useState } from 'react';
import { Utensils, Sparkles, Flame, Check, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

export const DishPairingSommelier = ({ onNavigate, onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedDishId, setSelectedDishId] = useState('paratha');
  const [addedItem, setAddedItem] = useState(false);

  const dishes = [
    {
      id: 'paratha',
      name: 'Aloo / Gobi Paratha',
      emoji: '🫓',
      category: 'Breakfast Favorite',
      recommendedProductId: 'aam-classic',
      secondaryProductId: 'khatta-meetha-nimbu',
      tagline: 'The Ultimate Indian Breakfast Pairing',
      whyItWorks: 'Crisp, tangy raw mango cubes steeped in pungent cold-pressed mustard oil cut right through rich melted butter and spiced potato stuffing.',
      flavorProfile: {
        tanginess: '95%',
        spice: 'Medium (Balanced)',
        texture: 'Crunchy Kairi & Whole Saunf',
        bestEatenWith: 'Hot Paratha with a dollop of fresh white butter (Makhan)'
      }
    },
    {
      id: 'dalbaati',
      name: 'Dal Baati Churma',
      emoji: '🍲',
      category: 'Royal Rajasthani',
      recommendedProductId: 'garlic-lahsun',
      secondaryProductId: 'bharwa-lal-mirch',
      tagline: 'Desert Royalty in Every Bite',
      whyItWorks: 'The deep, pungent, slow-roasted garlic pods and whole red chillies awaken the earthy richness of ghee-soaked baatis and spiced panchmel dal.',
      flavorProfile: {
        tanginess: '75%',
        spice: 'Fiery & Warming (Teekha)',
        texture: 'Whole Tender Sikar Garlic Cloves',
        bestEatenWith: 'Crushed baati dipped generously in warm desi ghee'
      }
    },
    {
      id: 'khichdi',
      name: 'Moong Dal Khichdi / Tahari',
      emoji: '🍚',
      category: 'Comfort Soul Food',
      recommendedProductId: 'heeng-aam',
      secondaryProductId: 'nimbu-khatta-meetha',
      tagline: 'Pure Comfort for Body & Soul',
      whyItWorks: 'Soothing hing (asafoetida) raw mango achar revives gentle moong dal khichdi, aiding digestion and giving an addictive savory punch.',
      flavorProfile: {
        tanginess: '90%',
        spice: 'Mild & Digestive',
        texture: 'Juicy Mango Slivers with Heeng Tadka',
        bestEatenWith: 'Warm khichdi, roasted papad, and a bowl of curd'
      }
    },
    {
      id: 'sattu',
      name: 'Sattu Paratha / Litti Chokha',
      emoji: '🌯',
      category: 'Rustic Desi Classic',
      recommendedProductId: 'bharwa-lal-mirch',
      secondaryProductId: 'green-chilli-hari-mirch',
      tagline: 'Smoky, Spiced & Unforgettable',
      whyItWorks: 'Plump Banarasi red chillies stuffed with amchur, fennel, and kalonji burst open to provide the sharp spicy contrast needed for dry roasted sattu flour.',
      flavorProfile: {
        tanginess: '85%',
        spice: 'Bold & Aromatic',
        texture: 'Whole Stuffed Pod with Grainy Spices',
        bestEatenWith: 'Fire-roasted baingan bharta and sattu litti'
      }
    },
    {
      id: 'curdrice',
      name: 'Curd Rice / Thayir Sadam',
      emoji: '🥣',
      category: 'Cooling Summer Meal',
      recommendedProductId: 'green-chilli-hari-mirch',
      secondaryProductId: 'nimbu-khatta-meetha',
      tagline: 'Fire & Ice Equilibrium',
      whyItWorks: 'The crisp, mustard-spiced crunch of solar-cured green chillies creates electric contrast against cool, creamy temple-style tempered curd rice.',
      flavorProfile: {
        tanginess: '80%',
        spice: 'Crisp Green Heat',
        texture: 'Firm slit green chillies with yellow mustard seeds',
        bestEatenWith: 'Chilled curd rice tempered with curry leaves and mustard'
      }
    },
    {
      id: 'puri',
      name: 'Puri Chole / Bedmi Puri',
      emoji: '🫓',
      category: 'Weekend Feast',
      recommendedProductId: 'pachranga-mix',
      secondaryProductId: 'aam-classic',
      tagline: 'The Grand Wedding Feast Flavor',
      whyItWorks: 'The colorful harmony of lotus stem, carrot, mango, lemon, and green chillies brings multiple layers of bite and tanginess to spiced chickpea gravy.',
      flavorProfile: {
        tanginess: '90%',
        spice: 'Classic Zesty Tang',
        texture: 'Multi-vegetable crunchy medley',
        bestEatenWith: 'Piping hot puffed puris and urad dal masala'
      }
    }
  ];

  const activeDish = dishes.find(d => d.id === selectedDishId) || dishes[0];
  const matchedProduct = products.find(p => p.id === activeDish.recommendedProductId) || products[0];

  const handleAddPairing = () => {
    addToCart(matchedProduct, '500 g', 1, `🍽️ Pairing for ${activeDish.name}`);
    setAddedItem(true);
    setTimeout(() => setAddedItem(false), 2200);
  };

  return (
    <section 
      id="dish-pairing-sommelier" 
      className="py-14 sm:py-18 bg-transparent border-b border-[#E5D5BC]/60 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-200 text-[#251208] border border-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
            <Utensils className="w-4 h-4 text-amber-800" />
            <span>AI Achar Sommelier • Culinary Dish Matcher</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1F110B] tracking-tight">
            What Are You Cooking Today?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#5A493F] font-semibold max-w-xl mx-auto leading-relaxed">
            Pick your meal below. We match the exact sun-cured pickle recipe crafted to elevate its authentic taste profile.
          </p>
        </div>

        {/* Meal Selector Horizontal Scrollable Strip */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-8 custom-scrollbar justify-start sm:justify-center">
          {dishes.map((dish) => {
            const isSelected = dish.id === selectedDishId;
            return (
              <button
                key={dish.id}
                onClick={() => setSelectedDishId(dish.id)}
                className={`px-4 py-2.5 rounded-2xl flex items-center gap-2.5 transition-all shrink-0 cursor-pointer border-2 text-left ${
                  isSelected
                    ? 'bg-[#2A1408] text-white border-[#C59A3F] shadow-lg scale-102 ring-2 ring-amber-400/30'
                    : 'bg-white/90 text-[#3B2519] border-[#D8BE95] hover:bg-amber-50/70 hover:border-[#C59A3F]'
                }`}
              >
                <span className="text-xl sm:text-2xl">{dish.emoji}</span>
                <div>
                  <div className={`font-serif font-black text-xs sm:text-sm leading-tight ${isSelected ? 'text-amber-300' : 'text-[#1F110B]'}`}>
                    {dish.name}
                  </div>
                  <div className={`text-[10px] font-semibold ${isSelected ? 'text-amber-100/70' : 'text-gray-500'}`}>
                    {dish.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Sommelier Pairing Presentation Card */}
        <div className="bg-gradient-to-b from-[#FFFDF8]/95 via-[#FAF4EA]/90 to-[#F5E8CD]/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 border-2 border-[#D8BE95] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
          
          {/* Left Column: Product Image & Quick Visuals (4 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-[360px] rounded-3xl overflow-hidden shadow-md border-2 border-amber-300/80 bg-amber-950/10 group">
              <img 
                src={matchedProduct.image || '/images/products/jar-mango-classic.jpg'} 
                alt={matchedProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badge Overlay */}
              <div className="absolute top-3 left-3 bg-[#1F110B]/90 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full border border-amber-400/40 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Holy Grail Pairing</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#1F110B] text-xs font-black px-3 py-1 rounded-full shadow-md border border-amber-300">
                ₹{matchedProduct.price} <span className="text-[10px] font-semibold text-gray-500 line-through">₹{matchedProduct.mrp}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300">
              <Check className="w-3.5 h-3.5" />
              <span>Solar Cured • Kacchi Ghani Mustard Oil Seal</span>
            </div>
          </div>

          {/* Right Column: Sommelier Tasting Notes & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-amber-900 text-xs font-black uppercase tracking-wider mb-1">
                <span>{activeDish.emoji} {activeDish.name}</span>
                <span>+</span>
                <span className="text-[#8B2500]">🏺 {matchedProduct.name}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1F110B] tracking-tight">
                {activeDish.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E3D33] font-medium leading-relaxed mt-2 bg-white/70 p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
                {activeDish.whyItWorks}
              </p>
            </div>

            {/* Flavor Matrix Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Tanginess & Acidity</span>
                <div className="font-black text-[#1F110B] flex items-center justify-between">
                  <span>{activeDish.flavorProfile.tanginess}</span>
                  <span className="text-amber-600">⚡ Natural Raw Kairi</span>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Spice Level</span>
                <div className="font-black text-[#8B2500] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{activeDish.flavorProfile.spice}</span>
                </div>
              </div>

              <div className="col-span-2 bg-white/80 p-3 rounded-xl border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Artisanal Texture & Mouthfeel</span>
                <div className="font-black text-[#1F110B]">
                  {activeDish.flavorProfile.texture}
                </div>
              </div>

              <div className="col-span-2 bg-amber-100/80 p-3 rounded-xl border border-amber-300 text-[#251208] space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">Chef's Serving Suggestion</span>
                <p className="font-semibold text-xs text-[#2A1408]">
                  {activeDish.flavorProfile.bestEatenWith}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddPairing}
                className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#D97706] via-amber-500 to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>{addedItem ? 'Added to Cart!' : `Add ${matchedProduct.name} (₹${matchedProduct.price})`}</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('product-detail', { productId: matchedProduct.id })}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-[#1F110B] border-2 border-[#D8BE95] font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Recipe Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
