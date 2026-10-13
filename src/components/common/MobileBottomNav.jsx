import React from 'react';
import { Home, Grid, Tag, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav = ({ currentView, onNavigate }) => {
  const { totalItemsCount, openCart } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-t-2 border-brand-yellow/30 py-1.5 px-2 shadow-lg">
      <div className="grid grid-cols-5 text-center">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${currentView === 'home' ? 'text-brand-green font-bold scale-105' : 'text-brand-brownMuted hover:text-brand-brown'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Shop All */}
        <button
          onClick={() => onNavigate('all-products')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${currentView === 'all-products' ? 'text-brand-green font-bold scale-105' : 'text-brand-brownMuted hover:text-brand-brown'}`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Achar</span>
        </button>

        {/* Build Combo Center Pill Highlighted */}
        <button
          onClick={() => onNavigate('combo-builder')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            currentView === 'combo-builder'
              ? 'text-amber-800 font-extrabold scale-110'
              : 'text-amber-700 hover:text-amber-900 font-bold'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-brand-brown flex items-center justify-center shadow-xs">
            ✨
          </div>
          <span className="text-[9px] mt-0.5 font-bold">Combo</span>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 text-brand-brownMuted relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-green text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
        </button>

        {/* Account */}
        <button
          onClick={() => onNavigate('account')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${currentView === 'account' ? 'text-brand-green font-bold scale-105' : 'text-brand-brownMuted hover:text-brand-brown'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Account</span>
        </button>

      </div>
    </div>
  );
};
