import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { ProductsAdminManager } from '../components/admin/ProductsAdminManager';

export const ProductsAdminPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] pb-24">
      {/* Top Admin Bar */}
      <div className="bg-[#2D1810] text-white py-3.5 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/70 font-semibold">DesiRasoi Admin Portal</span>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 bg-[#F5A623] text-[#1F110B] px-3.5 py-1.5 rounded-xl text-xs font-black shadow cursor-pointer hover:bg-[#e09210]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Storefront Home</span>
          </button>
        </div>
      </div>

      {/* Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <ProductsAdminManager onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default ProductsAdminPage;
