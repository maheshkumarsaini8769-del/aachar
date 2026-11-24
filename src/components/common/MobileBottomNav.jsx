import React from 'react';
import { Home, Grid, Tag, ShoppingBag, User, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomNav = ({ currentView, onNavigate }) => {
  const { totalItemsCount, openCart } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-xl border-t border-[#D8B47E]/60 py-1.5 px-2 shadow-2xl">
      <div className="grid grid-cols-5 text-center">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${currentView === 'home' ? 'text-[#9C4E15] font-black scale-105' : 'text-[#6B5A4B] hover:text-[#231209]'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Shop All */}
        <button
          onClick={() => onNavigate('all-products')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${currentView === 'all-products' ? 'text-[#9C4E15] font-black scale-105' : 'text-[#6B5A4B] hover:text-[#231209]'}`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Achar</span>
        </button>

        {/* Build Combo Center Pill Highlighted */}
        <button
          onClick={() => onNavigate('combo-builder')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentView === 'combo-builder'
              ? 'text-[#9C4E15] font-black scale-110'
              : 'text-[#8C4A10] hover:text-[#231209] font-bold'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#D97706] to-[#9C4E15] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
          </div>
          <span className="text-[9px] mt-0.5 font-bold">Combo</span>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 text-[#6B5A4B] relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#9C4E15] to-[#B45309] text-[#FDE68A] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs ring-1 ring-white animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
        </button>

        {/* Account / Profile */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              openAuthModal(() => onNavigate('account'));
            } else {
              onNavigate('account');
            }
          }}
          className={`flex flex-col items-center justify-center py-1 transition-all ${currentView === 'account' ? 'text-[#9C4E15] font-black scale-105' : 'text-[#6B5A4B] hover:text-[#231209]'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isLoggedIn ? 'Account' : 'Profile'}</span>
        </button>

      </div>
    </div>
  );
};
