import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Package,
  Plus,
  Check,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  Zap,
  RotateCcw,
  Star,
  Award
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const COMBO_PACKS = [
  {
    id: 'pack-2',
    name: '2-Jar Starter Combo Box',
    requiredCount: 2,
    price: 449,
    mrp: 549,
    discount: '18% OFF',
    savings: 100,
    image: '/images/products/combo-2pack-duo.jpg',
    desc: 'Pick any 2 Marusthali Achar jars (400g each)'
  },
  {
    id: 'pack-3',
    name: '3-Jar Family Combo Box',
    requiredCount: 3,
    price: 649,
    mrp: 799,
    discount: '19% OFF',
    savings: 150,
    popular: true,
    image: '/images/products/combo-3pack-heritage.jpg',
    desc: 'Pick any 3 Marusthali Achar jars (400g each)'
  },
  {
    id: 'pack-4',
    name: '4-Jar Royal Combo Box',
    requiredCount: 4,
    price: 849,
    mrp: 1099,
    discount: '23% OFF',
    savings: 250,
    bestValue: true,
    image: '/images/products/combo-4pack-royal.jpg',
    desc: 'Pick any 4 Marusthali Achar jars (400g each)'
  }
];

const ACHAR_BOX_FLAVORS = [
  {
    id: 'mango-classic',
    name: 'Classic Mango Achar',
    tag: 'Bestseller Jar',
    spice: 'Medium Spicy',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-mango-jar.jpg'
  },
  {
    id: 'red-chilli',
    name: 'Stuffed Red Chilli Achar',
    tag: 'Rajasthani Special',
    spice: 'Hot & Zesty',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-chilli-jar.jpg'
  },
  {
    id: 'nimbu-khatta-meetha',
    name: 'Khatta-Meetha Nimbu Achar',
    tag: 'Sun-Cured',
    spice: 'Mild & Tangy',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-lemon-jar.jpg'
  },
  {
    id: 'garlic-special',
    name: 'Desi Lasun (Garlic) Achar',
    tag: 'Digestive',
    spice: 'Bold Garlic',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-garlic-jar.jpg'
  },
  {
    id: 'mixed-pachranga',
    name: 'Pachranga Mixed Achar',
    tag: 'Family Favorite',
    spice: 'Medium Spicy',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-mixed-jar.jpg'
  },
  {
    id: 'green-chilli',
    name: 'Bharwa Hari Mirch Achar',
    tag: 'Fresh Batch',
    spice: 'Chatpata',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-green-chilli-jar.jpg'
  },
  {
    id: 'marwari-heritage',
    name: 'Rajasthani Heritage Methi Achar',
    tag: 'Sikar Traditional',
    spice: 'Traditional',
    weight: '400g Glass Jar',
    image: '/images/products/marusthali-heritage-jar.jpg'
  },
  {
    id: 'spiced-kairi',
    name: 'Marwari Masala Kairi Achar',
    tag: 'Cold-Pressed Oil',
    spice: 'Bold Masala',
    weight: '400g Glass Jar',
    image: '/images/products/mango-jar-classic.jpg'
  }
];

export const ComboPacksSection = ({ onNavigate }) => {
  const { addCustomComboToCart } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();

  const [selectedPack, setSelectedPack] = useState(COMBO_PACKS[1]); // Default 3-Jar Family Combo
  const [selectedFlavours, setSelectedFlavours] = useState([
    'mango-classic',
    'red-chilli',
    'nimbu-khatta-meetha'
  ]);
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
    } else if (selectedFlavours.length < selectedPack.requiredCount) {
      setSelectedFlavours([...selectedFlavours, flavourId]);
    }
  };

  const handleRemoveSlot = (index) => {
    const updated = [...selectedFlavours];
    updated.splice(index, 1);
    setSelectedFlavours(updated);
  };

  const handleAutoFill = () => {
    const topIds = ['mango-classic', 'red-chilli', 'nimbu-khatta-meetha', 'garlic-special'];
    setSelectedFlavours(topIds.slice(0, selectedPack.requiredCount));
  };

  const isBoxComplete = selectedFlavours.length === selectedPack.requiredCount;
  const remainingCount = selectedPack.requiredCount - selectedFlavours.length;

  const performAddCombo = () => {
    addCustomComboToCart({
      packSize: selectedPack.name,
      price: selectedPack.price,
      mrp: selectedPack.mrp,
      packagingTheme: 'Marusthali Achar Combo Box',
      flavours: selectedFlavours.map(id => {
        const item = ACHAR_BOX_FLAVORS.find(f => f.id === id);
        return item ? item.name : id;
      }),
      giftNote: null
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleAddToCart = () => {
    if (!isBoxComplete) return;
    if (!isLoggedIn) {
      openAuthModal(() => performAddCombo());
      return;
    }
    performAddCombo();
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#FAF5EC] via-[#FDFBF7] to-[#FAF5EC] border-b border-[#E5D9C5] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-black text-[#1F110B] uppercase tracking-wider bg-[#FDE68A] border-2 border-[#D97706] px-4 py-1.5 rounded-full shadow-2xs mb-3">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>MARUSTHALI ACHAR • BUILD YOUR OWN COMBO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1F110B] tracking-tight">
            Build Your Own <span className="text-[#B45309]">Achar Combo Pack</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A3B32] font-bold mt-2.5">
            Step 1: Choose your Combo Box size (2, 3, or 4 Jars) • Step 2: Click on your favorite Achar Jar Boxes below to fill your combo & save up to 23%!
          </p>
        </div>

        {/* STEP 1: Choose Combo Pack Size Cards (With Real Combo Box Images) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {COMBO_PACKS.map((pack) => {
            const isSelected = selectedPack.id === pack.id;
            return (
              <div
                key={pack.id}
                onClick={() => handlePackChange(pack)}
                className={`rounded-3xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#FFF9EE] border-[#D97706] shadow-lg ring-2 ring-[#F5A623]/40'
                    : 'bg-white border-[#E5D9C5] hover:border-[#D97706]'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-5 bg-[#F5A623] text-[#1F110B] font-black text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs border border-[#2D1810]/20 inline-flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Most Popular Combo</span>
                  </span>
                )}
                {pack.bestValue && (
                  <span className="absolute -top-3 left-5 bg-[#1E5631] text-white font-black text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs inline-flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-300" />
                    <span>Best Value Pack</span>
                  </span>
                )}

                <div>
                  {/* Combo Box Photo */}
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden border border-[#E5D9C5] mb-4 bg-[#FAF6EE]">
                    <img
                      src={pack.image}
                      alt={pack.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#2D1810]/90 text-[#FBBF24] text-[11px] font-black px-2.5 py-1 rounded-lg">
                      {pack.requiredCount} Achar Boxes
                    </span>
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-xs">
                      {pack.discount}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-black text-[#1F110B]">{pack.name}</h3>
                  <p className="text-xs text-[#4A3B32] font-bold mt-1">{pack.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DDCD] flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#1F110B]">₹{pack.price}</span>
                    <span className="text-xs text-gray-500 line-through ml-1.5 font-bold">₹{pack.mrp}</span>
                    <span className="block text-[11px] font-extrabold text-[#1E5631]">Save ₹{pack.savings}</span>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    isSelected
                      ? 'bg-[#2D1810] text-[#FBBF24]'
                      : 'bg-[#FAF6EE] text-[#1F110B] border border-[#D5C7B8]'
                  }`}>
                    {isSelected ? '✓ Selected Box' : 'Select Box'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* STEP 2: LIVE COMBO BOX TRAY + ACHAR JAR BOXES SELECTOR */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-[#D97706]/50 shadow-xl space-y-7">
          
          {/* Live Combo Box Tray Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DDCD]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#2D1810] text-[#FBBF24] text-xs font-black">
                  LIVE COMBO BOX
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#1F110B]">
                  Your {selectedPack.name} ({selectedFlavours.length}/{selectedPack.requiredCount} Achar Boxes Filled)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A3B32] font-bold mt-1">
                {isBoxComplete
                  ? '🎉 Your Marusthali Achar Combo Box is ready! Click "Add Combo to Cart" below.'
                  : `👇 Click on any Achar Box below to fill your remaining ${remainingCount} jar slot${remainingCount > 1 ? 's' : ''}.`}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleAutoFill}
                className="inline-flex items-center gap-1.5 bg-[#FFF9EE] hover:bg-amber-100 text-[#1F110B] text-xs font-extrabold px-3.5 py-2 rounded-xl border border-[#D97706] transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#D97706] fill-current" />
                <span>Auto-Fill Bestsellers</span>
              </button>
              {selectedFlavours.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedFlavours([])}
                  className="inline-flex items-center gap-1 text-red-700 hover:bg-red-50 text-xs font-extrabold px-3 py-2 rounded-xl border border-red-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Empty Box</span>
                </button>
              )}
            </div>
          </div>

          {/* LIVE VISUAL ACHAR BOX SLOTS (Rectangular Jar Boxes, NOT circles!) */}
          <div className="bg-gradient-to-br from-[#2D1810] via-[#3D2314] to-[#2D1810] rounded-2xl p-4 sm:p-6 border-2 border-[#F5A623]/50 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs sm:text-sm font-extrabold text-amber-200 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#FBBF24]" />
                <span>Inside Your Marusthali Achar Combo Box:</span>
              </span>
              <span className="text-xs font-black bg-[#F5A623] text-[#1F110B] px-3 py-1 rounded-full">
                {selectedFlavours.length} of {selectedPack.requiredCount} Jars Packed
              </span>
            </div>

            <div className={`grid gap-4 ${
              selectedPack.requiredCount === 2
                ? 'grid-cols-2 max-w-xl mx-auto'
                : selectedPack.requiredCount === 3
                ? 'grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto'
                : 'grid-cols-2 lg:grid-cols-4'
            }`}>
              {Array.from({ length: selectedPack.requiredCount }).map((_, idx) => {
                const flavourId = selectedFlavours[idx];
                const flavour = flavourId ? ACHAR_BOX_FLAVORS.find(f => f.id === flavourId) : null;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl p-3 transition-all flex flex-col justify-between ${
                      flavour
                        ? 'bg-white border-2 border-[#FBBF24] shadow-md'
                        : 'bg-white/10 border-2 border-dashed border-amber-300/50 min-h-[210px] items-center justify-center text-center'
                    }`}
                  >
                    {flavour ? (
                      <>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase bg-[#2D1810] text-[#FBBF24] px-2 py-0.5 rounded">
                              Achar Box #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSlot(idx)}
                              className="text-red-600 hover:bg-red-50 p-1 rounded-lg transition-colors cursor-pointer"
                              title="Remove Jar Box"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Rectangular Achar Jar Box Image */}
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

                          <h4 className="text-xs sm:text-sm font-extrabold text-[#1F110B] mt-2 line-clamp-1">
                            {flavour.name}
                          </h4>
                          <p className="text-[10px] font-bold text-[#B45309]">{flavour.spice}</p>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/50 text-[#FBBF24] flex items-center justify-center mx-auto text-xl font-black">
                          +
                        </div>
                        <p className="text-xs font-extrabold text-white">Empty Achar Box #{idx + 1}</p>
                        <p className="text-[11px] text-amber-200 font-semibold">
                          Click any Achar Jar Box below to fill this slot
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FLAVOR SELECTION GRID: REAL MARUSTHALI ACHAR JAR BOXES */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif text-lg sm:text-xl font-black text-[#1F110B]">
                Choose Your Flavors (Marusthali Achar 400g Jar Boxes):
              </h4>
              <span className="text-xs font-extrabold text-[#1E5631]">
                100% Cold-Pressed Sarson Oil • Sikar Homemade
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ACHAR_BOX_FLAVORS.map((flavour) => {
                const isSelected = selectedFlavours.includes(flavour.id);
                const isBoxFull = selectedFlavours.length >= selectedPack.requiredCount && !isSelected;

                return (
                  <div
                    key={flavour.id}
                    onClick={() => !isBoxFull && handleToggleFlavour(flavour.id)}
                    className={`rounded-2xl p-3.5 border-2 transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#1E5631] bg-emerald-50/70 shadow-md ring-2 ring-[#1E5631]/20'
                        : isBoxFull
                        ? 'border-[#E8DDCD] bg-gray-50 opacity-60 cursor-not-allowed'
                        : 'border-[#E8DDCD] bg-[#FAF6EE]/60 hover:bg-white hover:border-[#D97706] hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Square Achar Jar Box Frame */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-[#D5C7B8] bg-white mb-3 shadow-2xs">
                        <img
                          src={flavour.image}
                          alt={flavour.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-[#2D1810]/90 text-[#FBBF24] text-[10px] font-black px-2 py-0.5 rounded-md">
                          {flavour.tag}
                        </span>
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#1E5631]/35 flex items-center justify-center">
                            <div className="bg-[#1E5631] text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                              <Check className="w-4 h-4 stroke-[3]" /> Added in Box
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-extrabold text-[#6B5744] mb-1">
                        <span>{flavour.weight}</span>
                        <span>{flavour.spice}</span>
                      </div>
                      <h5 className="font-serif font-black text-sm sm:text-base text-[#1F110B] line-clamp-1">
                        {flavour.name}
                      </h5>
                    </div>

                    <button
                      type="button"
                      disabled={isBoxFull}
                      className={`mt-3 w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E5631] text-white'
                          : isBoxFull
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#F5A623] hover:bg-[#e09210] text-[#1F110B] shadow-2xs'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>In Combo Box (Remove)</span>
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
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-5 border-t-2 border-[#E8DDCD] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF6EE] p-4 sm:p-5 rounded-2xl">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-lg sm:text-xl font-black text-[#1F110B]">
                  {selectedPack.name}
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                  Save ₹{selectedPack.savings}
                </span>
              </div>
              <p className="text-xs text-[#4A3B32] font-bold mt-0.5">
                Total Combo Price: <strong className="text-lg font-black text-[#1E5631]">₹{selectedPack.price}</strong>{' '}
                <span className="line-through text-gray-400">₹{selectedPack.mrp}</span> • Free Wooden Spoon & Safe Glass Packing
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isBoxComplete}
                className={`flex-1 sm:flex-initial px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  isBoxComplete
                    ? 'bg-[#1E5631] hover:bg-[#153e23] text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedSuccess
                    ? '✓ Combo Box Added to Cart!'
                    : isBoxComplete
                    ? `Add ${selectedPack.requiredCount}-Jar Combo to Cart (₹${selectedPack.price})`
                    : `Pick ${remainingCount} More Achar Box${remainingCount > 1 ? 'es' : ''}`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('combo-builder')}
                className="flex-1 sm:flex-initial bg-[#F5A623] hover:bg-[#e09210] text-[#1F110B] font-black text-xs sm:text-sm px-5 py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span>See All 12 Flavors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComboPacksSection;
