import React from 'react';
import { Heart, Trash2, ShoppingBag, ChevronRight, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage = ({ onNavigate, onQuickView }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">My Wishlist</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-brand-border mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
              My Saved Pickles <span className="text-lg font-sans font-normal text-brand-brownMuted">({savedProducts.length} items)</span>
            </h1>
            <p className="text-xs text-brand-brownMuted mt-1">
              Your favorite traditional achar jars saved for quick checkout
            </p>
          </div>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-border space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-brown">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-brand-brownMuted">
              Click the heart icon on any pickle card to save it for later.
            </p>
            <button
              onClick={() => onNavigate('all-products')}
              className="bg-brand-green hover:bg-brand-greenHover text-white px-6 py-2.5 rounded-full text-xs font-bold transition-colors"
            >
              Browse All Pickles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
