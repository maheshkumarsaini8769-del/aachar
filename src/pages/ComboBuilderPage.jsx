import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  Package, 
  Trash2, 
  CheckCircle2,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// 3 Combo Pack Box Options
const COMBO_PACK_OPTIONS = [
  {
    id: 'pack-2',
    name: '2-Jar Starter Combo Box',
    subtitle: 'Classic Starter Pair',
    requiredCount: 2,
    price: 449,
    mrp: 549,
    discount: '18% OFF',
    savings: 100,
    image: '/images/products/combo-2pack-duo.jpg',
    desc: 'Pick any 2 Marusthali Achar jar boxes (400g each).'
  },
  {
    id: 'pack-3',
    name: '3-Jar Family Combo Box',
    subtitle: 'Most Loved Family Selection',
    requiredCount: 3,
    price: 649,
    mrp: 799,
    discount: '19% OFF',
    savings: 150,
    popular: true,
    image: '/images/products/combo-3pack-heritage.jpg',
    desc: 'Our bestselling 3-jar combo box for daily family meals.'
  },
  {
    id: 'pack-4',
    name: '4-Jar Royal Combo Box',
    subtitle: 'Grand Family Crate',
    requiredCount: 4,
    price: 849,
    mrp: 1099,
    discount: '23% OFF',
    savings: 250,
    bestValue: true,
    image: '/images/products/combo-4pack-royal.jpg',
    desc: 'Best value combo box with 4 full 400g Marusthali Achar jars.'
  }
];

// 12 Authentic Marusthali Achar Jar Boxes
const FLAVOUR_CATALOG = [
  { 
    id: 'mango-classic', 
    name: 'Classic Mango Achar', 
    image: '/images/products/marusthali-mango-jar.jpg', 
    tag: 'Bestseller Jar', 
    spice: 'Medium Spicy 🌶️', 
    weight: '400g Glass Jar',
    category: 'mango',
    desc: 'Tart Ramkela mangoes sun-cured with stone-ground spices in cold-pressed mustard oil.'
  },
  { 
    id: 'nimbu-khatta-meetha', 
    name: 'Sweet & Tangy Nimbu Achar', 
    image: '/images/products/marusthali-lemon-jar.jpg', 
    tag: 'Sun-Cured Jar', 
    spice: 'Mild & Sweet 🍋', 
    weight: '400g Glass Jar',
    category: 'citrus',
    desc: 'Thin-skin Kagzi lemons aged in digestive black salt and pure jaggery.'
  },
  { 
    id: 'stuffed-red-chilli', 
    name: 'Stuffed Red Chilli Achar', 
    image: '/images/products/marusthali-chilli-jar.jpg', 
    tag: 'Fiery Heritage', 
    spice: 'Hot & Zesty 🌶️🌶️', 
    weight: '400g Glass Jar',
    category: 'spicy',
    desc: 'Whole sun-dried red chillies generously stuffed with roasted amchur-rai masala.'
  },
  { 
    id: 'mix-pachranga', 
    name: 'Pachranga Mixed Achar', 
    image: '/images/products/marusthali-mixed-jar.jpg', 
    tag: 'Pachranga Blend', 
    spice: 'Medium Spicy 🌶️', 
    weight: '400g Glass Jar',
    category: 'all',
    desc: 'Wholesome medley of mango, carrot, green chilli, lime, and ginger.'
  },
  { 
    id: 'country-garlic', 
    name: 'Desi Lasun (Garlic) Achar', 
    image: '/images/products/marusthali-garlic-jar.jpg', 
    tag: 'Digestive Jar', 
    spice: 'Rich & Pungent 🧄', 
    weight: '400g Glass Jar',
    category: 'spicy',
    desc: 'Golden hand-peeled garlic cloves steeped in mustard paste and aromatic spices.'
  },
  { 
    id: 'green-chilli-bharwa', 
    name: 'Rajasthani Green Chilli Achar', 
    image: '/images/products/marusthali-green-chilli-jar.jpg', 
    tag: 'Fresh Batch', 
    spice: 'Chatpata 🌶️', 
    weight: '400g Glass Jar',
    category: 'spicy',
    desc: 'Crisp green chillies stuffed with yellow rai, fennel, and tangy amchur masala.'
  },
  { 
    id: 'rajasthani-marwari', 
    name: 'Royal Marwari Heritage Achar', 
    image: '/images/products/marusthali-heritage-jar.jpg', 
    tag: 'Sikar Special', 
    spice: 'Medium Spicy 🌶️', 
    weight: '400g Glass Jar',
    category: 'mango',
    desc: 'Royal Shekhawati recipe prepared in glazed ceramic barnis with compounded hing.'
  },
  { 
    id: 'methi-dana-aam', 
    name: 'Methi Dana & Mango Achar', 
    image: '/images/products/marusthali-heritage-jar.jpg', 
    tag: 'Ayurvedic Jar', 
    spice: 'Mild & Wholesome 🌿', 
    weight: '400g Glass Jar',
    category: 'all',
    desc: 'Plump sprouted methi seeds soaked in tangy raw mango extract.'
  },
  { 
    id: 'kachha-kairi', 
    name: 'Crisp Green Kairi Achar', 
    image: '/images/products/mango-jar-classic.jpg', 
    tag: 'Fresh Harvest', 
    spice: 'Tangy Crunch 🥭', 
    weight: '400g Glass Jar',
    category: 'mango',
    desc: 'Early harvest raw baby mango chunks tossed with kalonji and cold-pressed mustard oil.'
  },
  { 
    id: 'chatpata-spiced', 
    name: 'Tangy Chatpata Mango Achar', 
    image: '/images/products/mango-jar-spiced.jpg', 
    tag: 'Extra Tangy', 
    spice: 'Zesty & Fiery 🌶️', 
    weight: '400g Glass Jar',
    category: 'spicy',
    desc: 'Stone-ground cracked black pepper, roasted jeera, and dry amchur punch.'
  },
  { 
    id: 'marwari-masala-mango', 
    name: 'Thick Masala Mango Achar', 
    image: '/images/products/marusthali-mango-jar.jpg', 
    tag: 'Rich Masala', 
    spice: 'Spicy Masala 🌶️', 
    weight: '400g Glass Jar',
    category: 'mango',
    desc: 'Generous clinging masala paste prepared with yellow rai and whole fennel.'
  },
  { 
    id: 'gunda-lesua', 
    name: 'Royal Gunda & Kairi Achar', 
    image: '/images/products/mango-jar-spiced.jpg', 
    tag: 'Desert Delicacy', 
    spice: 'Traditional 🏺', 
    weight: '400g Glass Jar',
    category: 'all',
    desc: 'Wild green Lasoda berries stuffed with grated mango and sun-cured in clay pots.'
  }
];

export const ComboBuilderPage = ({ onNavigate, viewParams }) => {
  const { addCustomComboToCart } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();

  const initialPack = (viewParams?.preselectedPack && COMBO_PACK_OPTIONS.find(p => p.id === viewParams.preselectedPack)) || COMBO_PACK_OPTIONS[1];
  const [selectedPack, setSelectedPack] = useState(initialPack);
  
  const [selectedFlavours, setSelectedFlavours] = useState([
    'mango-classic',
    'nimbu-khatta-meetha',
    'stuffed-red-chilli'
  ]);

  const [filterCategory, setFilterCategory] = useState('all');

  const [includeGiftNote, setIncludeGiftNote] = useState(false);
  const [giftNoteData, setGiftNoteData] = useState({
    to: '',
    from: '',
    message: ''
  });

  const [addedSuccess, setAddedSuccess] = useState(false);

  const handlePackChange = (pack) => {
    setSelectedPack(pack);
    if (selectedFlavours.length > pack.requiredCount) {
      setSelectedFlavours(selectedFlavours.slice(0, pack.requiredCount));
    }
  };

  const handleToggleFlavour = (flavourId) => {
    if (selectedFlavours.includes(flavourId)) {
      setSelectedFlavours(selectedFlavours.filter(id => id !== flavourId));
    } else {
      if (selectedFlavours.length < selectedPack.requiredCount) {
        setSelectedFlavours([...selectedFlavours, flavourId]);
      }
    }
  };

  const handleRemoveFromSlot = (index) => {
    const updated = [...selectedFlavours];
    updated.splice(index, 1);
    setSelectedFlavours(updated);
  };

  const handleAutoFill = () => {
    const bestsellers = [
      'mango-classic', 
      'nimbu-khatta-meetha', 
      'stuffed-red-chilli', 
      'mix-pachranga'
    ];
    setSelectedFlavours(bestsellers.slice(0, selectedPack.requiredCount));
  };

  const handleClearAll = () => {
    setSelectedFlavours([]);
  };

  const isBoxComplete = selectedFlavours.length === selectedPack.requiredCount;
  const remainingCount = selectedPack.requiredCount - selectedFlavours.length;

  const performAddToCart = () => {
    const payload = {
      packSize: selectedPack.name,
      price: selectedPack.price,
      mrp: selectedPack.mrp,
      packagingTheme: 'Marusthali Achar Combo Box',
      flavours: selectedFlavours.map(id => {
        const item = FLAVOUR_CATALOG.find(f => f.id === id);
        return item ? item.name : id;
      }),
      giftNote: includeGiftNote && (giftNoteData.to || giftNoteData.message) ? giftNoteData : null
    };

    addCustomComboToCart(payload);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2500);
  };

  const handleAddToCart = () => {
    if (!isBoxComplete) return;
    if (!isLoggedIn) {
      openAuthModal(() => {
        performAddToCart();
      });
      return;
    }
    performAddToCart();
  };

  const handleBuyNow = () => {
    if (!isBoxComplete) return;
    if (!isLoggedIn) {
      openAuthModal(() => {
        performAddToCart();
        onNavigate('checkout');
      });
      return;
    }
    performAddToCart();
    onNavigate('checkout');
  };

  const filteredFlavours = FLAVOUR_CATALOG.filter(f => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'mango') return f.category === 'mango';
    if (filterCategory === 'spicy') return f.category === 'spicy';
    if (filterCategory === 'citrus') return f.category === 'citrus';
    return true;
  });

  return (
    <div className="bg-transparent min-h-screen pb-32">
      
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-b from-[#2A150B] via-[#3D2314] to-[#2D1810] text-white pt-8 pb-14 border-b-2 border-amber-500/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-amber-200 mb-4 font-bold">
            <button onClick={() => onNavigate('home')} className="hover:text-[#FBBF24] transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-white font-extrabold">Build Your Own Achar Combo</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/50 px-4 py-1.5 rounded-full text-xs font-black text-[#FBBF24]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MARUSTHALI ACHAR • CUSTOM COMBO BUILDER</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
              Build Your Own <br className="hidden sm:inline" />
              <span className="text-[#FBBF24]">Achar Combo Pack</span>
            </h1>

            <p className="text-xs sm:text-sm text-amber-50 font-semibold leading-relaxed max-w-xl mx-auto">
              Choose your Combo Box size (2, 3, or 4 Jars), click on your favorite Marusthali Achar Jar Boxes below to fill your slots, and get up to <strong className="text-[#FBBF24] font-extrabold">23% bundle savings</strong>!
            </p>

            {/* 3-Step Breadcrumb Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-3 text-xs font-extrabold text-white">
              <span className="bg-black/45 px-3.5 py-1.5 rounded-full border border-amber-400/50 text-amber-100">
                1. Choose Combo Size
              </span>
              <span className="text-[#FBBF24] font-black">→</span>
              <span className="bg-black/45 px-3.5 py-1.5 rounded-full border border-amber-400/50 text-amber-100">
                2. Fill Your Achar Jar Boxes
              </span>
              <span className="text-[#FBBF24] font-black">→</span>
              <span className="bg-black/45 px-3.5 py-1.5 rounded-full border border-amber-400/50 text-amber-100">
                3. Add Combo to Cart
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-4 space-y-8">
        
        {/* ================= STEP 1: CHOOSE COMBO BOX SIZE ================= */}
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DDCD] shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#EFE8DD] mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs font-black flex items-center justify-center">1</span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F110B]">
                  Select Combo Box Size
                </h2>
              </div>
              <p className="text-xs text-[#4A3B32] font-bold mt-0.5">
                How many Marusthali Achar Jar Boxes would you like in your combo?
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-[#1E5631] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Save Up to ₹250 on Combos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COMBO_PACK_OPTIONS.map(pack => {
              const isSelected = selectedPack.id === pack.id;
              return (
                <button
                  key={pack.id}
                  onClick={() => handlePackChange(pack)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all relative flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#D97706] bg-[#FFF9EE] shadow-md ring-2 ring-[#D97706]/40'
                      : 'border-[#E8DDCD] bg-white hover:border-[#D97706]/60 hover:bg-[#FAF6EE]'
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-3 left-4 bg-[#F5A623] text-[#1F110B] font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      ⭐ Most Popular Combo
                    </span>
                  )}
                  {pack.bestValue && (
                    <span className="absolute -top-3 left-4 bg-[#1E5631] text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      👑 Best Value Pack
                    </span>
                  )}

                  <div className="space-y-2.5">
                    <div className="relative h-36 w-full rounded-xl overflow-hidden border border-[#E5D9C5] bg-[#FAF6EE]">
                      <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-[10px] font-black text-[#FBBF24] bg-[#2D1810]/90 px-2 py-0.5 rounded">
                        {pack.requiredCount} Jar Boxes
                      </span>
                      <span className="absolute top-2 right-2 text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded">
                        {pack.discount}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-black text-base sm:text-lg text-[#1F110B]">
                        {pack.name}
                      </h3>
                      <p className="text-xs text-[#4A3B32] font-medium mt-0.5">
                        {pack.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EFE8DD] mt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-[#1F110B]">
                        ₹{pack.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through ml-1.5 font-bold">
                        ₹{pack.mrp}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#1E5631]">
                      Save ₹{pack.savings}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= STEP 2: LIVE ACHAR BOX SLOTS & FLAVOUR JAR BOXES ================= */}
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DDCD] shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFE8DD] gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs font-black flex items-center justify-center">2</span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F110B]">
                  Choose Your Achar Jar Boxes ({selectedFlavours.length} of {selectedPack.requiredCount} Boxes Filled)
                </h2>
              </div>
              <p className="text-xs text-[#4A3B32] font-bold mt-0.5">
                Click on any Marusthali Achar Jar Box below to place it into your Combo Box slots.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleAutoFill}
                className="inline-flex items-center gap-1.5 bg-[#FAF5EC] hover:bg-amber-100 text-[#1F110B] text-xs font-extrabold px-3.5 py-2 rounded-xl border border-amber-300 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current text-amber-600" />
                <span>Auto-Fill Bestsellers</span>
              </button>
              {selectedFlavours.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-1 text-red-700 hover:bg-red-50 text-xs font-extrabold px-3 py-2 rounded-xl border border-red-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Empty Box</span>
                </button>
              )}
            </div>
          </div>

          {/* --- LIVE ACHAR BOX TRAY (VISUAL RECTANGULAR ACHAR BOXES) --- */}
          <div className="bg-gradient-to-br from-[#2D1810] via-[#3D2314] to-[#2D1810] rounded-2xl p-4 sm:p-6 border-2 border-[#F5A623]/60 shadow-inner">
            <div className="flex items-center justify-between mb-4 text-xs font-extrabold">
              <span className="text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-[#FBBF24]" />
                <span>Your {selectedPack.name}:</span>
                <span className={isBoxComplete ? 'text-emerald-300' : 'text-[#FBBF24]'}>
                  {isBoxComplete 
                    ? '✓ All Achar Boxes Packed!' 
                    : `Select ${remainingCount} more Achar Box${remainingCount > 1 ? 'es' : ''}`}
                </span>
              </span>
              <span className="text-[#1F110B] bg-[#FBBF24] px-3 py-1 rounded-full font-black">
                {selectedFlavours.length} / {selectedPack.requiredCount} Boxes
              </span>
            </div>

            {/* Slots Grid */}
            <div className={`grid gap-4 ${
              selectedPack.requiredCount === 2 
                ? 'grid-cols-2 max-w-xl mx-auto' 
                : selectedPack.requiredCount === 3 
                ? 'grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto' 
                : 'grid-cols-2 sm:grid-cols-4'
            }`}>
              {Array.from({ length: selectedPack.requiredCount }).map((_, idx) => {
                const flavourId = selectedFlavours[idx];
                const flavour = flavourId ? FLAVOUR_CATALOG.find(f => f.id === flavourId) : null;

                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-3 flex flex-col justify-between transition-all ${
                      flavour 
                        ? 'bg-white border-2 border-[#FBBF24] shadow-md' 
                        : 'border-2 border-dashed border-amber-300/60 bg-white/10 min-h-[210px] items-center justify-center text-center'
                    }`}
                  >
                    {flavour ? (
                      <>
                        <div className="w-full flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black uppercase bg-[#2D1810] text-[#FBBF24] px-2 py-0.5 rounded">
                            Achar Box #{idx + 1}
                          </span>
                          <button
                            onClick={() => handleRemoveFromSlot(idx)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded-lg cursor-pointer"
                            title="Remove Box"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden border border-[#E5D9C5] bg-[#FAF6EE] relative">
                          <img
                            src={flavour.image}
                            alt={flavour.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1.5 right-1.5 bg-[#1E5631] text-white text-[9px] font-black px-2 py-0.5 rounded">
                            400g Jar
                          </span>
                        </div>

                        <div className="mt-2 text-left">
                          <p className="text-xs sm:text-sm font-extrabold text-[#1F110B] line-clamp-1">
                            {flavour.name}
                          </p>
                          <p className="text-[10px] font-bold text-[#B45309]">{flavour.spice}</p>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-1.5 py-4 text-center">
                        <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/50 text-[#FBBF24] flex items-center justify-center mx-auto text-lg font-black">
                          +
                        </div>
                        <span className="text-xs font-extrabold text-white block">
                          Empty Achar Box #{idx + 1}
                        </span>
                        <span className="text-[11px] text-amber-200 block">
                          Click any Achar Jar below
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- CATEGORY FILTER TABS --- */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All 12 Achar Boxes' },
              { id: 'mango', label: '🥭 Mango Achar Boxes' },
              { id: 'spicy', label: '🌶️ Spicy Mirch & Lasun Boxes' },
              { id: 'citrus', label: '🍋 Nimbu & Tangy Boxes' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-[#2D1810] text-[#FBBF24] shadow-xs'
                    : 'bg-[#FAF5EC] text-[#1F110B] border border-[#D5C7B8] hover:bg-amber-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* --- 12 ACHAR JAR BOXES GRID --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFlavours.map(flavour => {
              const isSelected = selectedFlavours.includes(flavour.id);
              const isBoxFull = selectedFlavours.length >= selectedPack.requiredCount && !isSelected;

              return (
                <div
                  key={flavour.id}
                  onClick={() => !isBoxFull && handleToggleFlavour(flavour.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#1E5631] bg-emerald-50/70 shadow-md ring-2 ring-[#1E5631]/20'
                      : isBoxFull
                      ? 'border-[#E8DDCD] bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-[#E8DDCD] bg-white hover:border-[#D97706] hover:shadow-md'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Rectangular/Square Achar Jar Box Image */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-[#D5C7B8] bg-[#FAF6EE] shadow-2xs">
                      <img
                        src={flavour.image}
                        alt={flavour.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-[#2D1810]/90 text-[#FBBF24] text-[10px] font-black px-2 py-0.5 rounded-md">
                        {flavour.tag}
                      </span>
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#1E5631]/40 flex items-center justify-center text-white">
                          <div className="bg-[#1E5631] text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                            <Check className="w-4 h-4 stroke-[3]" /> In Box
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] font-extrabold text-[#6B5744] mb-1">
                        <span>{flavour.weight}</span>
                        <span>{flavour.spice}</span>
                      </div>
                      <h4 className="font-serif font-black text-sm sm:text-base text-[#1F110B] line-clamp-1">
                        {flavour.name}
                      </h4>
                      <p className="text-[11px] text-[#4A3B32] font-medium line-clamp-2 mt-1 leading-snug">
                        {flavour.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EFE8DD]">
                    <button
                      type="button"
                      disabled={isBoxFull}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E5631] text-white shadow-xs'
                          : isBoxFull
                          ? 'bg-gray-200 text-gray-500'
                          : 'bg-[#F5A623] hover:bg-[#E09415] text-[#1F110B] shadow-xs'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added in Box</span>
                        </>
                      ) : isBoxFull ? (
                        <span>Combo Box Full</span>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add Achar Box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ================= STEP 3 (OPTIONAL): ADD NOTE ================= */}
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DDCD] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFE8DD] gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E5631] text-white text-xs font-black flex items-center justify-center">3</span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F110B]">
                  Special Packing Note (Optional)
                </h2>
              </div>
              <p className="text-xs text-[#4A3B32] font-medium mt-0.5">
                Sending this Combo Pack to family or friends? Add a complimentary greeting note inside the box.
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer bg-[#FAF5EC] px-3.5 py-1.5 rounded-full border border-amber-300 self-start sm:self-auto">
              <input
                type="checkbox"
                checked={includeGiftNote}
                onChange={(e) => setIncludeGiftNote(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-xs font-extrabold text-[#1F110B]">
                Add Note to Box
              </span>
            </label>
          </div>

          {includeGiftNote && (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
              <div>
                <label className="text-xs font-extrabold text-[#1F110B] block mb-1">To (Receiver Name)</label>
                <input
                  type="text"
                  placeholder="e.g. Papa & Maa"
                  value={giftNoteData.to}
                  onChange={(e) => setGiftNoteData({ ...giftNoteData, to: e.target.value })}
                  className="w-full bg-[#FAF5EC] border border-[#D5C7B8] rounded-xl px-3 py-2 text-xs font-bold text-[#1F110B] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#1F110B] block mb-1">From (Your Name)</label>
                <input
                  type="text"
                  placeholder="e.g. Mahesh"
                  value={giftNoteData.from}
                  onChange={(e) => setGiftNoteData({ ...giftNoteData, from: e.target.value })}
                  className="w-full bg-[#FAF5EC] border border-[#D5C7B8] rounded-xl px-3 py-2 text-xs font-bold text-[#1F110B] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#1F110B] block mb-1">Message</label>
                <input
                  type="text"
                  placeholder="e.g. Homemade Rajasthani achar from Sikar!"
                  value={giftNoteData.message}
                  onChange={(e) => setGiftNoteData({ ...giftNoteData, message: e.target.value })}
                  className="w-full bg-[#FAF5EC] border border-[#D5C7B8] rounded-xl px-3 py-2 text-xs font-bold text-[#1F110B] focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}
        </section>

        {/* 4 Trust Inclusions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-extrabold text-[#1F110B]">
          <div className="bg-white rounded-2xl p-3 border border-[#E8DDCD]">
            <span className="text-base block mb-0.5">🏺</span>
            <span>100% Mustard Oil</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-[#E8DDCD]">
            <span className="text-base block mb-0.5">📦</span>
            <span>Marusthali Combo Box</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-[#E8DDCD]">
            <span className="text-base block mb-0.5">🥄</span>
            <span>Free Wooden Spoon</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-[#E8DDCD]">
            <span className="text-base block mb-0.5">🚚</span>
            <span>Safe Courier Packing</span>
          </div>
        </div>

      </div>

      {/* ================= STICKY BOTTOM SUMMARY BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#D97706] shadow-xl py-2.5 sm:py-3 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xs sm:text-base text-[#1F110B] truncate">
                {selectedPack.name}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded">
                {selectedPack.discount}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-[#4A3B32] mt-0.5">
              {isBoxComplete ? (
                <span className="text-[#1E5631] font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>All {selectedPack.requiredCount} Achar Boxes ready!</span>
                </span>
              ) : (
                <span className="text-[#B45309] font-extrabold">
                  Pick {remainingCount} more Achar Box{remainingCount > 1 ? 'es' : ''} to complete
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[9px] text-[#4A3B32] uppercase font-extrabold block">Total</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-2xl font-black text-[#1F110B]">
                  ₹{selectedPack.price}
                </span>
                <span className="text-xs text-gray-400 line-through hidden sm:inline">
                  ₹{selectedPack.mrp}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!isBoxComplete}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                  isBoxComplete
                    ? 'bg-[#F5A623] hover:bg-[#E09415] text-[#1F110B] active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedSuccess 
                    ? '✓ Added!' 
                    : isBoxComplete 
                    ? 'Add Combo to Cart' 
                    : `Pick ${remainingCount} More`}
                </span>
              </button>

              {isBoxComplete && (
                <button
                  onClick={handleBuyNow}
                  className="bg-[#1E5631] hover:bg-[#153e23] text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-md transition-all active:scale-95 hidden sm:flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Buy Combo Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ComboBuilderPage;
