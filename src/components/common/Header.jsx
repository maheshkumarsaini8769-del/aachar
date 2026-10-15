import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  LayoutGrid,
  MoreHorizontal,
  Settings,
  MapPin,
  Boxes
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { useProducts } from '../../context/ProductContext';

export const Header = ({ currentView, onNavigate }) => {
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, openAuthModal } = useAuth();
  const { currentLocation, openLocationModal } = useLocation();
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Category roundels data
  const roundels = [
    { 
      id: 'all', 
      name: 'All Pickles', 
      mobileName: 'All', 
      isAll: true,
      slug: 'all' 
    },
    { 
      id: 'mango', 
      name: 'Mango Pickle', 
      mobileName: 'Mango', 
      image: '/images/categories/roundel-mango.jpg', 
      slug: 'mango' 
    },
    { 
      id: 'nimbu', 
      name: 'Lemon Pickle', 
      mobileName: 'Lemon', 
      image: '/images/categories/roundel-nimbu.jpg', 
      slug: 'nimbu' 
    },
    { 
      id: 'mirchi', 
      name: 'Red Chilli', 
      mobileName: 'Chilli', 
      image: '/images/categories/roundel-chilli.jpg', 
      slug: 'red-mirch' 
    },
    { 
      id: 'green-mirch', 
      name: 'Green Chilli', 
      mobileName: 'Green', 
      image: '/images/categories/cat-greenmirch-hi.jpg', 
      slug: 'green-mirch' 
    },
    { 
      id: 'mixed', 
      name: 'Mixed Pickle', 
      mobileName: 'Mixed', 
      image: '/images/categories/roundel-mixed.jpg', 
      slug: 'mix' 
    },
    { 
      id: 'garlic', 
      name: 'Garlic Pickle', 
      mobileName: 'Garlic', 
      image: '/images/categories/roundel-garlic.jpg', 
      slug: 'garlic' 
    },
    { 
      id: 'methi', 
      name: 'Methi Pickle', 
      mobileName: 'Methi', 
      image: '/images/categories/roundel-methi.jpg', 
      slug: 'methi' 
    },
    { 
      id: 'heritage', 
      name: 'Heritage Achar', 
      mobileName: 'Heritage', 
      image: '/images/categories/roundel-heritage.jpg', 
      slug: 'heritage' 
    },
    { 
      id: 'more', 
      name: 'All Categories', 
      mobileName: 'More', 
      isMore: true,
      slug: 'all-categories' 
    }
  ];

  // Filter products when search changes
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.hindiName && p.hindiName.includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q))
      ).slice(0, 6);
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onNavigate('product-detail', { productId });
  };

  const handleRoundelClick = (item) => {
    if (item.isAll) {
      onNavigate('all-products');
    } else if (item.isMore) {
      onNavigate('all-categories');
    } else {
      onNavigate('category', { categoryId: item.slug });
    }
  };

  const cartBadgeCount = totalItemsCount > 0 ? totalItemsCount : 3;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5D9C5] shadow-sm">
        
        {/* 1. Main Header Row (High Contrast & Crisp Text) */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            
            {/* Mobile: Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-[#1F110B] hover:bg-[#FAF5EC] rounded-xl transition-colors cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Brand Logo with Leaf */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center md:items-start group text-left transition-transform shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-1.5 relative">
                <span className="text-[#1E5631] transform -translate-y-1.5 -mr-1">
                  <svg className="w-5 h-5 fill-current text-[#1E5631]" viewBox="0 0 24 24">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
                  </svg>
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#1F110B]">
                  Marusthali <span className="text-[#B45309]">Achar</span>
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#2D1810] font-bold tracking-wide leading-none mt-1">
                Traditional Taste, Delivered to Every Home
              </span>
            </button>

            {/* Desktop Search Bar (High Contrast Input & Placeholder) */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                  placeholder="Search for mango, lemon, garlic, or chilli pickles..."
                  className="w-full bg-[#F7F3EB] hover:bg-[#F0E9DC] focus:bg-white border border-[#D5C7B8] focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/25 rounded-full pl-10 pr-8 py-2.5 text-xs sm:text-sm text-[#1F110B] placeholder-[#4A3B32] font-semibold transition-all outline-none"
                />
                <Search className="w-4 h-4 text-[#2D1810] absolute left-3.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D1810] hover:text-black text-xs bg-[#E5D9C5] rounded-full w-4 h-4 flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Search Dropdown Results */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#D5C7B8] overflow-hidden z-50">
                  <div className="p-2.5 text-[11px] font-extrabold text-[#2D1810] uppercase tracking-wider bg-[#FAF6EE] border-b border-[#E8DDCD]">
                    Matching Achar ({searchResults.length})
                  </div>
                  <div className="divide-y divide-[#F5EFE6] max-h-72 overflow-y-auto">
                    {searchResults.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProduct(p.id)}
                        className="w-full text-left p-2.5 hover:bg-[#FAF6EE] flex items-center gap-3 transition-colors group cursor-pointer"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-10 h-10 object-cover rounded-xl border border-[#E0D4C3] group-hover:scale-105 transition-transform" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-extrabold text-[#1F110B] truncate group-hover:text-[#1E5631]">{p.name}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#4A3B32] font-bold">
                            <span className="text-[#1E5631] font-black">₹{p.price}</span>
                            <span className="line-through text-gray-500">₹{p.mrp}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4A3B32] group-hover:text-[#1F110B] transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Right Actions (Admin, Settings/Account, Wishlist, Cart) */}
            <div className="hidden md:flex items-center space-x-6 shrink-0">
              {/* Admin Panel Button */}
              <button 
                onClick={() => onNavigate('admin')}
                className="flex flex-col items-center group text-[#1F110B] hover:text-[#B45309] transition-colors cursor-pointer"
                title="Store Admin Panel (Products & Box Pricing)"
              >
                <div className="relative">
                  <Boxes className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform text-[#B45309]" />
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[8px] font-black px-1 py-0.2 rounded-full">
                    Admin
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#B45309] mt-0.5">Admin</span>
              </button>

              {/* Single Clean Account & Settings Button */}
              <button 
                onClick={() => onNavigate('account', { tab: 'menu' })}
                className="flex flex-col items-center group text-[#1F110B] hover:text-[#B45309] transition-colors cursor-pointer"
                title="Account & Settings"
              >
                <Settings className="w-5 h-5 stroke-[2.2] group-hover:rotate-45 transition-transform duration-300" />
                <span className="text-xs font-extrabold text-[#1F110B] group-hover:text-[#B45309] mt-0.5">Settings</span>
              </button>

              {/* Wishlist */}
              <button 
                onClick={() => onNavigate('wishlist')}
                className="flex flex-col items-center group text-[#1F110B] hover:text-[#B45309] transition-colors relative cursor-pointer"
                title="Wishlist"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-extrabold text-[#1F110B] group-hover:text-[#B45309] mt-0.5">Wishlist</span>
              </button>

              {/* Cart with Red Notification Badge */}
              <button 
                onClick={openCart}
                className="flex flex-col items-center group text-[#1F110B] hover:text-[#B45309] transition-colors relative cursor-pointer"
                title="Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1.5 -right-2 bg-[#E53935] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartBadgeCount}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#1F110B] group-hover:text-[#B45309] mt-0.5">Cart</span>
              </button>
            </div>

            {/* Mobile Right Icons (Admin, Settings, Wishlist & Cart) */}
            <div className="flex md:hidden items-center space-x-1.5">
              <button 
                onClick={() => onNavigate('admin')}
                className="p-1.5 text-[#B45309] relative"
                aria-label="Admin"
                title="Admin Panel"
              >
                <Boxes className="w-5 h-5 stroke-[2.2]" />
              </button>
              <button 
                onClick={() => onNavigate('account', { tab: 'menu' })}
                className="p-1.5 text-[#1F110B] relative"
                aria-label="Settings"
                title="Settings"
              >
                <Settings className="w-5 h-5 stroke-[2.2]" />
              </button>
              <button 
                onClick={() => onNavigate('wishlist')}
                className="p-1.5 text-[#1F110B] relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[2.2]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={openCart}
                className="p-1.5 text-[#1F110B] relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                <span className="absolute top-0 right-0 bg-[#E53935] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartBadgeCount}
                </span>
              </button>
            </div>

          </div>

          {/* Mobile Full-Width High-Contrast Search Input */}
          <div className="md:hidden mt-2.5">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                placeholder="Search for mango, lemon, garlic pickles..."
                className="w-full bg-[#F7F3EB] border border-[#D5C7B8] rounded-full pl-9 pr-3 py-2 text-xs text-[#1F110B] placeholder-[#4A3B32] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              />
              <Search className="w-3.5 h-3.5 text-[#2D1810] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {/* Mobile Dropdown Search */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="mt-1 bg-white rounded-2xl shadow-lg border border-[#D5C7B8] overflow-hidden">
                {searchResults.slice(0, 4).map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="w-full text-left p-2.5 hover:bg-[#FAF6EE] flex items-center gap-2.5 border-b border-gray-100 last:border-b-0"
                  >
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-[#1F110B] truncate">{p.name}</p>
                      <p className="text-[10px] text-[#1E5631] font-extrabold">₹{p.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Visual Category Roundels Strip - Rendered on Home View */}
      {(currentView === 'home' || !currentView) && (
        <nav aria-label="Pickle Categories" className="bg-[#FAF6EE] border-b border-[#E5D9C5] shadow-xs">
          <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
            <div className="flex items-start justify-start xl:justify-between gap-2 sm:gap-3.5 lg:gap-4 overflow-x-auto no-scrollbar scroll-smooth px-1 touch-pan-x">
              {roundels.map((cat) => {
                if (cat.isAll) {
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleRoundelClick(cat)}
                      className="flex flex-col items-center group shrink-0 focus:outline-none cursor-pointer min-w-[64px] sm:min-w-[88px] md:min-w-[98px] px-1 text-center active:scale-95 transition-transform"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[76px] md:h-[76px] aspect-square shrink-0 rounded-full bg-[#FDEFD6] border-2 border-[#E6B87A] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-[#D97706] group-hover:shadow-md transition-all">
                        <LayoutGrid className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#2D1810] stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#1F110B] group-hover:text-[#B45309] text-center leading-tight mt-1.5 transition-colors">
                        <span className="hidden sm:inline">{cat.name}</span>
                        <span className="sm:hidden">{cat.mobileName}</span>
                      </span>
                    </button>
                  );
                }

                if (cat.isMore) {
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleRoundelClick(cat)}
                      className="flex flex-col items-center group shrink-0 focus:outline-none cursor-pointer min-w-[64px] sm:min-w-[88px] md:min-w-[98px] px-1 text-center active:scale-95 transition-transform"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[76px] md:h-[76px] aspect-square shrink-0 rounded-full bg-white border-2 border-[#D5C7B8] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-[#D97706] group-hover:shadow-md transition-all">
                        <MoreHorizontal className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#2D1810] stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#1F110B] group-hover:text-[#B45309] text-center leading-tight mt-1.5 transition-colors">
                        <span className="hidden sm:inline">{cat.name}</span>
                        <span className="sm:hidden">{cat.mobileName}</span>
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleRoundelClick(cat)}
                    className="flex flex-col items-center group shrink-0 focus:outline-none cursor-pointer min-w-[64px] sm:min-w-[88px] md:min-w-[98px] px-1 text-center active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[76px] md:h-[76px] aspect-square shrink-0 rounded-full overflow-hidden border-2 border-[#E6B87A] group-hover:border-[#D97706] shadow-xs group-hover:shadow-md transition-all relative bg-amber-50">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover aspect-square rounded-full block transition-transform duration-300 group-hover:scale-105"
                        loading="eager"
                      />
                    </div>

                    <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#1F110B] group-hover:text-[#B45309] text-center leading-tight mt-1.5 transition-colors">
                      <span className="hidden sm:inline">{cat.name}</span>
                      <span className="sm:hidden">{cat.mobileName}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDCD]">
                <div className="font-serif text-xl font-black text-[#1F110B]">
                  Marusthali<span className="text-[#B45309]">Achar</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5 text-[#2D1810]" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('home'); }}
                  className="w-full text-left py-2 font-extrabold text-[#1F110B] hover:text-[#B45309]"
                >
                  Home
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('all-categories'); }}
                  className="w-full text-left py-2 font-extrabold text-[#1F110B] hover:text-[#B45309] flex items-center justify-between"
                >
                  <span>All Categories (10 Collections)</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-extrabold">NEW</span>
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('category', { categoryId: 'jain' }); }}
                  className="w-full text-left py-2 font-extrabold text-emerald-900 hover:text-emerald-950 flex items-center justify-between"
                >
                  <span>🌿 Jain Family Special (No Garlic)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">SATVIK</span>
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('all-products'); }}
                  className="w-full text-left py-2 font-extrabold text-[#1F110B] hover:text-[#B45309]"
                >
                  All Achar (37 Varieties)
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('combo-builder'); }}
                  className="w-full text-left py-2 font-extrabold text-[#B45309]"
                >
                  Build Your Own Combo ✨
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('festive'); }}
                  className="w-full text-left py-2 font-extrabold text-rose-800"
                >
                  Festive Special Hampers 🎁
                </button>
                <button 
                  onClick={() => { 
                    setIsMobileMenuOpen(false); 
                    onNavigate('account', { tab: 'orders' }); 
                  }}
                  className="w-full text-left py-2 font-extrabold text-[#B45309] flex items-center justify-between"
                >
                  <span>My Orders & Live Tracking</span>
                  <span className="text-xs">🚚</span>
                </button>
                <button 
                  onClick={() => { 
                    setIsMobileMenuOpen(false); 
                    onNavigate('account', { tab: 'settings' }); 
                  }}
                  className="w-full text-left py-2 font-extrabold text-[#1E5631] flex items-center justify-between"
                >
                  <span>Settings, Taste & Support Center</span>
                  <span className="text-xs">⚙️</span>
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('our-story'); }}
                  className="w-full text-left py-2 font-extrabold text-[#1F110B]"
                >
                  Our Village Heritage & Story
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate('store-location'); }}
                  className="w-full text-left py-2 font-extrabold text-[#1F110B]"
                >
                  Store Location & Outlets
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DDCD]">
              <div className="text-xs text-[#2D1810] font-bold text-center">
                100% Traditional Homemade Rajasthani Achar
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
