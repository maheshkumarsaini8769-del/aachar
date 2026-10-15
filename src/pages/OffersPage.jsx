import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ChevronRight, ArrowRight } from 'lucide-react';
import { offers } from '../data/offers';
import { useCart } from '../context/CartContext';

export const OffersPage = ({ onNavigate }) => {
  const { applyCoupon, openCart } = useCart();
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Special Offers</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-900 border border-red-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-red-700" />
            <span>Exclusive Savings</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-brown">
            Special Offers & Seasonal Deals
          </h1>
          <p className="text-xs sm:text-sm text-brand-brownMuted leading-relaxed">
            Authentic Indian pickles crafted by village women, at honest prices. Apply codes directly at checkout or click below to copy.
          </p>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {offers.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-border hover:border-brand-yellow/80 transition-all shadow-warm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {offer.tag}
                  </span>
                  <span className="text-xs text-brand-brownMuted font-bold">
                    {offer.hindiTitle}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown">
                  {offer.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-brownMuted leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Coupon Box */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 border-2 border-dashed border-brand-yellow bg-amber-50/60 px-4 py-2 rounded-xl">
                  <span className="font-mono text-sm sm:text-base font-extrabold text-brand-brown tracking-wider">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                    copiedCode === offer.code
                      ? 'bg-emerald-700 text-white'
                      : 'bg-brand-brown hover:bg-brand-brownLight text-white'
                  }`}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied to Cart!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy & Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free Shipping Highlight Banner */}
        <div className="bg-brand-cream rounded-3xl p-6 sm:p-8 border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-brown">
              Free Pan-India Delivery on Orders Above ₹499
            </h3>
            <p className="text-xs text-brand-brownMuted mt-1">
              No code required. Automatically applied in your cart during checkout.
            </p>
          </div>
          <button
            onClick={() => onNavigate('all-products')}
            className="bg-brand-green hover:bg-brand-greenHover text-white px-6 py-2.5 rounded-full text-xs font-bold shrink-0 transition-colors"
          >
            Start Shopping Pickles →
          </button>
        </div>

      </div>
    </div>
  );
};
