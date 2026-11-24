import React, { useState, useEffect } from 'react';
import { Layers, Check, Sparkles, X } from 'lucide-react';

export const WALLPAPER_CATEGORIES = [
  { id: 'heritage', label: '🏛️ Heritage & Textures (Non-Desert)' },
  { id: 'desert', label: '🏜️ Desert Sand Waves' }
];

export const WALLPAPER_OPTIONS = [
  // ================= NON-DESERT HERITAGE & ARTISANAL TEXTURES =================
  {
    id: 'royal-block-print',
    category: 'heritage',
    name: 'Royal Block Print',
    emoji: '🌺',
    tag: 'Recommended • Royal Heritage',
    desc: 'Traditional Rajasthani block print on warm buttermilk cream parchment',
    url: '/images/wallpapers/tharswad-seamless-block-print.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.45) 0%, rgba(253, 248, 238, 0.52) 800px, rgba(250, 245, 235, 0.56) 100%)'
  },
  {
    id: 'sandstone-jaali',
    category: 'heritage',
    name: 'Haveli Sandstone Jaali',
    emoji: '🏛️',
    tag: 'Jaisalmer Palace Carving',
    desc: 'Intricate royal carved sandstone floral lattice filigree in warm golden cream',
    url: '/images/wallpapers/tharswad-seamless-sandstone-jaali.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.50) 0%, rgba(253, 248, 238, 0.58) 800px, rgba(250, 245, 235, 0.62) 100%)'
  },
  {
    id: 'khadi-linen',
    category: 'heritage',
    name: 'Organic Khadi Linen',
    emoji: '🌾',
    tag: 'Handloom Cotton Fabric',
    desc: 'Tactile natural woven linen with subtle herbal botanical mustard flower sprigs',
    url: '/images/wallpapers/tharswad-seamless-khadi-linen.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.40) 0%, rgba(253, 248, 238, 0.48) 800px, rgba(250, 245, 235, 0.52) 100%)'
  },
  {
    id: 'seed-paper',
    category: 'heritage',
    name: 'Artisanal Seed Paper',
    emoji: '📜',
    tag: 'Handmade Herbal Deckle',
    desc: 'Deckle-edge handmade cream paper with crushed mustard seeds and plant fibers',
    url: '/images/wallpapers/tharswad-seamless-handmade-paper.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.38) 0%, rgba(253, 248, 238, 0.45) 800px, rgba(250, 245, 235, 0.50) 100%)'
  },

  // ================= DESERT SAND WAVES COLLECTION =================
  {
    id: 'dunes-flow',
    category: 'desert',
    name: 'Thar Dune Waves',
    emoji: '🏜️',
    tag: 'Continuous Desert Dunes',
    desc: 'Flowing S-curve sand dunes with natural wind-swept ripple crests',
    url: '/images/wallpapers/tharswad-seamless-dunes-flow.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.40) 0%, rgba(254, 250, 240, 0.48) 800px, rgba(253, 248, 238, 0.52) 100%)'
  },
  {
    id: 'silky-ripples',
    category: 'desert',
    name: 'Silky Sand Ripples',
    emoji: '✨',
    tag: 'Luxury Minimalist Dunes',
    desc: 'Soft golden cream dunes with delicate wind ripples and gentle lighting',
    url: '/images/wallpapers/tharswad-silky-waves.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.35) 0%, rgba(254, 250, 240, 0.45) 800px, rgba(253, 248, 238, 0.50) 100%)'
  },
  {
    id: 'deep-waves',
    category: 'desert',
    name: 'Deep Texture Waves',
    emoji: '🌊',
    tag: 'High Texture Thar Sand',
    desc: 'Sharp wind-carved desert ridges with prominent natural sand waves',
    url: '/images/wallpapers/tharswad-seamless-pure-waves.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.42) 0%, rgba(254, 250, 240, 0.50) 800px, rgba(253, 248, 238, 0.55) 100%)'
  },
  {
    id: 'terracotta-earth',
    category: 'desert',
    name: 'Terracotta Earth',
    emoji: '🏺',
    tag: 'Warm Amber Heritage',
    desc: 'Sun-baked Rajasthani terracotta earth tones and mustard spice warmth',
    url: '/images/wallpapers/tharswad-seamless-terracotta.jpg',
    repeat: 'repeat-y',
    overlay: 'linear-gradient(to bottom, rgba(254, 251, 244, 0.45) 0%, rgba(254, 250, 240, 0.52) 800px, rgba(253, 248, 238, 0.58) 100%)'
  }
];

export const WallpaperSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('heritage');
  const [selectedId, setSelectedId] = useState(() => {
    return localStorage.getItem('tharswad_wallpaper') || 'royal-block-print';
  });

  const applyWallpaper = (option) => {
    if (!option) return;
    document.body.style.backgroundImage = `${option.overlay}, url('${option.url}')`;
    document.body.style.backgroundPosition = 'center top, center top';
    document.body.style.backgroundRepeat = `no-repeat, ${option.repeat}`;
    document.body.style.backgroundSize = '100% 100%, 100% auto';
    document.body.style.backgroundAttachment = 'scroll';
    setSelectedId(option.id);
    localStorage.setItem('tharswad_wallpaper', option.id);
  };

  useEffect(() => {
    const saved = localStorage.getItem('tharswad_wallpaper') || 'royal-block-print';
    const opt = WALLPAPER_OPTIONS.find(o => o.id === saved) || WALLPAPER_OPTIONS[0];
    applyWallpaper(opt);
    if (opt.category) {
      setActiveCategory(opt.category);
    }
  }, []);

  const currentOption = WALLPAPER_OPTIONS.find(o => o.id === selectedId) || WALLPAPER_OPTIONS[0];
  const filteredOptions = WALLPAPER_OPTIONS.filter(o => o.category === activeCategory);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-40 select-none">
      {/* Expanded Choice Modal / Glass Bar */}
      {isOpen && (
        <div className="mb-3 w-80 md:w-96 bg-[#FFFDF9]/95 backdrop-blur-xl border border-[#D8B47E]/60 rounded-3xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D4B4]/60">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentOption.emoji || '🎨'}</span>
              <div>
                <h4 className="text-sm font-serif font-black text-[#231209]">TharSwad Backgrounds</h4>
                <p className="text-[11px] text-[#8C4A10]">Heritage Non-Desert & Desert Styles</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-[#F3E5D0] text-[#78350F] transition-colors"
              aria-label="Close switcher"
            >
              <X size={16} />
            </button>
          </div>

          {/* Category Tabs: Heritage (Non-Desert) vs Desert Waves */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4E8D3]/80 rounded-xl mt-3">
            {WALLPAPER_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer text-center ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#9C4E15] to-[#B45309] text-white shadow-xs'
                    : 'text-[#6B462C] hover:text-[#231209]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Wallpaper Choice Cards */}
          <div className="mt-3 space-y-2 max-h-72 overflow-y-auto no-scrollbar pr-0.5">
            {filteredOptions.map((opt) => {
              const isSelected = opt.id === selectedId;
              return (
                <button
                  key={opt.id}
                  onClick={() => applyWallpaper(opt)}
                  className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#FBF2E0] to-[#F7E7CD] border-[#B45309] shadow-sm ring-1 ring-[#B45309]' 
                      : 'bg-white/80 hover:bg-[#FDF6E9] border-[#E8D4B4]/80'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#D8B47E]/60 flex-shrink-0 bg-[#F4E8D3] shadow-xs">
                    <img src={opt.url} alt={opt.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-xs text-[#231209] truncate flex items-center gap-1.5">
                        <span>{opt.emoji}</span>
                        <span>{opt.name}</span>
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-[#B45309] bg-[#FDE68A]/80 px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                          <Check size={10} /> Active
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#9C4E15] font-bold block mt-0.5">{opt.tag}</span>
                    <p className="text-[10px] text-[#6B5A4B] truncate mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 text-center border-t border-[#E8D4B4]/50">
            <p className="text-[10px] text-[#8C4A10] font-medium">
              ✨ All wallpapers scroll naturally with the page with 0 cuts.
            </p>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#D8B47E] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-medium text-[#231209] group cursor-pointer"
        title="Change website background wallpaper"
      >
        <span className="text-base group-hover:rotate-12 transition-transform">{currentOption.emoji || '🎨'}</span>
        <span className="hidden sm:inline font-semibold text-[#8C4A10]">Theme:</span>
        <span className="text-[#231209] font-serif font-black">{currentOption.name}</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
      </button>
    </div>
  );
};
