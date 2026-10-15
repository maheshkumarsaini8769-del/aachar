import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Check, 
  Truck, 
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const CartPage = ({ onNavigate, onQuickView }) => {
  const {
    cartItems,
    totalItemsCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalMrp,
    discountAmount,
    shippingFee,
    isFreeShipping,
    finalTotal,
    appliedCoupon,
    pendingCoupon,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { isLoggedIn, openAuthModal } = useAuth();
  const [couponCode, setCouponCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  const handleProceedCheckout = () => {
    if (!isLoggedIn) {
      openAuthModal(() => {
        onNavigate('checkout');
      });
    } else {
      onNavigate('checkout');
    }
  };

  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const upsellProducts = products.filter(p => !cartItems.some(i => i.productId === p.id)).slice(0, 4);

  return (
    <div 
      className="min-h-screen py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 252, 245, 0.40), rgba(253, 248, 238, 0.50)), url('/images/wallpapers/wallpaper-10-champagne-tile.jpg')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '260px auto',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Your Cart</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-brand-border mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
              Your Cart <span className="text-lg font-sans font-normal text-brand-brownMuted">({cartItems.length} items)</span>
            </h1>
            <p className="text-xs text-brand-brownMuted mt-1">
              Handcrafted, preservative-free Indian pickles prepared with pure mustard oil
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-brand-red hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-border space-y-4 max-w-md mx-auto my-12">
            <div className="w-20 h-20 bg-brand-cream rounded-full mx-auto flex items-center justify-center text-4xl">
              🏺
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-brown">
              Your cart is currently empty
            </h2>
            <p className="text-xs text-brand-brownMuted">
              Add your favorite traditional pickles and savor the nostalgic flavors of home.
            </p>
            <button
              onClick={() => onNavigate('all-products')}
              className="bg-brand-green hover:bg-brand-greenHover text-white px-8 py-3 rounded-full text-xs font-bold transition-colors shadow-sm"
            >
              Explore All Pickles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Items Column (Col 8) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Bar */}
              <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-yellow" />
                    {isFreeShipping ? (
                      <span className="text-brand-green">🎉 You have qualified for FREE Pan-India Delivery!</span>
                    ) : (
                      <span>Add <strong>₹{remainingForFreeShipping}</strong> more to unlock <strong>FREE Delivery</strong></span>
                    )}
                  </span>
                  <span>{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-brand-green h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Table/Cards */}
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div 
                    key={item.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-border flex gap-4 items-center justify-between shadow-xs hover:border-brand-yellow/60 transition-colors"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 min-w-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-brand-border bg-brand-cream shrink-0" 
                      />
                      <div className="min-w-0">
                        <h3 className="font-serif font-bold text-sm sm:text-base text-brand-brown truncate">
                          {item.name}
                        </h3>
                        <span className="inline-block text-[11px] font-semibold text-brand-brownMuted bg-brand-cream px-2 py-0.5 rounded mt-1">
                          Pack: {item.size}
                        </span>
                        {item.customNote && (
                          <div className="mt-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md w-fit">
                            📝 Custom Kitchen Request: {item.customNote}
                          </div>
                        )}
                        <div className="text-xs text-brand-brownMuted mt-1 sm:hidden">
                          Unit: ₹{item.price}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-brand-border rounded-xl bg-brand-bg shrink-0">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-brand-cream text-brand-brown rounded-l-xl transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-brand-brown min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-brand-cream text-brand-brown rounded-r-xl transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right shrink-0">
                      <div className="text-sm sm:text-base font-extrabold text-brand-brown">
                        ₹{item.price * item.quantity}
                      </div>
                      {item.mrp && item.mrp > item.price && (
                        <div className="text-[11px] text-gray-400 line-through">
                          ₹{item.mrp * item.quantity}
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-brand-brownMuted hover:text-brand-red mt-1 inline-flex items-center gap-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span className="hidden sm:inline text-[11px]">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping button */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('all-products')}
                  className="text-xs font-bold text-brand-green hover:underline inline-flex items-center gap-1"
                >
                  <span>← Continue Browsing More Achar</span>
                </button>
              </div>

            </div>

            {/* Right Summary Column (Col 4) */}
            <div className="lg:col-span-4 space-y-5">
              
              <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-warm space-y-5 sticky top-28">
                
                {/* Apply Coupon */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brand-brown uppercase tracking-wider">
                    Apply Coupon Code:
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-full text-xs shadow-2xs">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                        <span className="font-mono bg-emerald-200/80 px-1.5 py-0.2 rounded text-[11px]">{appliedCoupon.code}</span>
                        <span className="text-[11px]">Applied! Saved ₹{discountAmount}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:text-red-800 font-bold underline cursor-pointer ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : pendingCoupon ? (
                    <div className="flex items-center justify-between px-3 py-1.5 bg-amber-50/95 border border-amber-300/80 rounded-full text-xs shadow-2xs">
                      <div className="flex items-center gap-1.5 text-amber-950 font-semibold truncate">
                        <Tag className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                        <span className="font-mono font-black text-amber-950 text-[11px] bg-amber-200/70 px-1.5 py-0.2 rounded">
                          {pendingCoupon.code}
                        </span>
                        <span className="text-[11px] truncate text-[#78350F]">
                          Add ₹{pendingCoupon.minOrder - subtotal} more to auto-apply!
                        </span>
                      </div>
                      <button 
                        type="button"
                        onClick={removeCoupon}
                        className="text-stone-500 hover:text-red-700 font-bold text-[11px] ml-2 shrink-0 cursor-pointer hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <form onSubmit={handleApply} className="relative flex items-center">
                        <Tag className="w-3.5 h-3.5 text-brand-brownMuted absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon code (e.g. DESI10)"
                          className="w-full bg-brand-bg hover:bg-white focus:bg-white border border-brand-border focus:border-brand-yellow rounded-full pl-8.5 pr-20 py-2 text-xs font-bold uppercase text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-yellow/30 transition-all shadow-2xs"
                        />
                        <button
                          type="submit"
                          disabled={!couponCode.trim()}
                          className="absolute right-1 px-3.5 py-1 bg-[#2D1810] hover:bg-[#43251A] disabled:opacity-40 disabled:hover:bg-[#2D1810] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                          Apply
                        </button>
                      </form>

                      {/* Smooth Micro-Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                        <span className="text-[10px] font-bold text-[#8C6542] shrink-0">Offers:</span>
                        {[
                          { code: 'DESI10', label: '10% OFF' },
                          { code: 'FESTIVE15', label: '15% OFF' },
                          { code: 'FREESHIP', label: 'Free Ship' },
                          { code: 'BUY3GET1', label: '25% OFF' }
                        ].map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setCouponCode(c.code);
                              applyCoupon(c.code);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF5EC] hover:bg-[#F3E8D3] border border-[#E5D7C3] hover:border-[#B45309] text-[10px] text-[#2D1810] transition-all cursor-pointer shrink-0 active:scale-95 group shadow-2xs"
                          >
                            <span className="font-mono font-extrabold text-[#92400E] group-hover:text-[#B45309]">{c.code}</span>
                            <span className="text-[#6D5344] font-medium">({c.label})</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-brand-red font-semibold px-2 pt-0.5">{couponError}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-brand-brown pt-2 border-t border-brand-border">
                  <div className="flex justify-between">
                    <span className="text-brand-brownMuted">Subtotal ({totalItemsCount} items)</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-green font-bold">
                      <span>Coupon Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-brand-brownMuted">Estimated Delivery</span>
                    <span className="font-bold">
                      {shippingFee === 0 ? <span className="text-brand-green">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="border-t border-brand-border pt-3 flex justify-between text-base font-extrabold text-brand-brown">
                    <span>Final Amount</span>
                    <span className="text-xl text-brand-green">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Proceed to Checkout CTA (Mustard Yellow matching reference) */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown py-4 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="text-[11px] text-center text-brand-brownMuted flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Secure Checkout • Cash on Delivery Available</span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* You May Also Like Section */}
        {upsellProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-brand-border">
            <h3 className="font-serif text-2xl font-bold text-brand-brown mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {upsellProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
