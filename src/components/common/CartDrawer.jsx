import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const CartDrawer = ({ onNavigate }) => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    totalMrp, 
    discountAmount, 
    shippingFee, 
    isFreeShipping, 
    finalTotal,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { isLoggedIn, openAuthModal } = useAuth();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    if (!isLoggedIn) {
      openAuthModal(() => {
        onNavigate('checkout');
      });
    } else {
      onNavigate('checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-brand-bg h-full shadow-2xl flex flex-col z-10 border-l border-brand-border animate-slide-left">
        
        {/* Header */}
        <div className="p-4 bg-brand-cream border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-green" />
            <h3 className="font-serif text-lg font-bold text-brand-brown">
              Your Cart <span className="text-sm font-sans font-normal text-brand-brownMuted">({cartItems.length} items)</span>
            </h3>
          </div>
          <button 
            onClick={closeCart}
            className="p-1.5 text-brand-brown hover:bg-brand-border/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FFF8E7] px-4 py-2.5 border-b border-amber-200">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-brand-yellow" />
              {isFreeShipping ? (
                <span className="text-brand-green font-bold">🎉 You have unlocked FREE Pan-India Delivery!</span>
              ) : (
                <span>Add <strong>₹{remainingForFreeShipping}</strong> more for <strong>FREE Delivery</strong></span>
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

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-brand-cream rounded-full mx-auto flex items-center justify-center text-3xl">
                🏺
              </div>
              <h4 className="font-serif text-xl font-bold text-brand-brown">Your cart is empty</h4>
              <p className="text-sm text-brand-brownMuted max-w-xs mx-auto">
                Explore our pure homemade achar selection and fill your basket with tradition!
              </p>
              <button
                onClick={() => { closeCart(); onNavigate('all-products'); }}
                className="px-6 py-2.5 bg-brand-green text-white rounded-full font-bold text-sm hover:bg-brand-greenHover transition-colors shadow-sm"
              >
                Browse All Achar
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl p-3 border border-brand-border flex gap-3 shadow-xs hover:border-brand-yellow/60 transition-colors"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg border border-brand-border bg-brand-cream shrink-0" 
                />

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-brand-brown line-clamp-1 leading-snug">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-brand-red p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="inline-block text-[11px] font-semibold text-brand-brownMuted bg-brand-cream px-2 py-0.5 rounded mt-1">
                      Pack: {item.size}
                    </span>
                    {item.customNote && (
                      <div className="mt-1 text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md leading-snug">
                        📝 Custom: {item.customNote}
                      </div>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-brand-border rounded-lg bg-brand-bg">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-brand-cream text-brand-brown rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-brand-brown min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-brand-cream text-brand-brown rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-extrabold text-brand-green">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.mrp && item.mrp > item.price && (
                        <span className="block text-[10px] text-gray-400 line-through">
                          ₹{item.mrp * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-brand-cream border-t border-brand-border space-y-3">
            
            {/* Coupon Code Input */}
            <div className="space-y-1">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-lg p-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.desc})</span>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-brand-red font-bold underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-brand-brownMuted absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon: DESI10 or FESTIVE15"
                      className="w-full bg-white border border-brand-border rounded-lg pl-8 pr-2 py-1.5 text-xs text-brand-brown uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#2D1810] text-white hover:bg-[#45271A] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-brand-red font-medium">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-brand-brown pt-1">
              <div className="flex justify-between">
                <span className="text-brand-brownMuted">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-green font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-brownMuted">Shipping</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <span className="text-brand-green font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="border-t border-brand-border/80 pt-2 flex justify-between text-sm font-bold text-brand-brown">
                <span>Total Amount</span>
                <span className="text-base text-brand-green">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown py-3 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { closeCart(); onNavigate('cart'); }}
                className="w-full bg-white border border-brand-border hover:bg-brand-ivory text-brand-brown py-2 rounded-full font-bold text-xs transition-colors"
              >
                View Full Cart Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
