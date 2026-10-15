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

      {/* Drawer Panel with Royal Jaali Architectural Embossed Texture */}
      <div 
        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 border-l border-[#E5D9C5] animate-slide-left overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(253, 251, 247, 0.92), rgba(250, 246, 238, 0.96)), url('/images/wallpapers/wallpaper-2-jaali.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '320px auto',
          backgroundPosition: 'center top'
        }}
      >
        
        {/* Header with Warm Heritage Border & Logo */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-b border-[#E8DDCD] flex items-center justify-between z-10 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF5EC] border border-[#E5D9C5] flex items-center justify-center text-[#B45309] shadow-xs shrink-0">
              <ShoppingBag className="w-4 h-4 text-[#B45309]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-black text-[#1F110B] leading-tight">
                Your Achar Basket
              </h3>
              <span className="text-xs font-sans font-bold text-[#8C6542]">
                {cartItems.length} {cartItems.length === 1 ? 'handcrafted item' : 'handcrafted items'}
              </span>
            </div>
          </div>
          <button 
            onClick={closeCart}
            className="p-1.5 text-[#5C3D2E] hover:bg-[#FAF5EC] hover:text-[#1F110B] rounded-full transition-colors cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FFFDF9]/95 backdrop-blur-xs px-4 py-2.5 border-b border-[#F0E6D2] z-10 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-[#78350F] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#D97706]" />
              {isFreeShipping ? (
                <span className="text-[#15803D] font-black">🎉 You unlocked FREE Pan-India Delivery!</span>
              ) : (
                <span>Add <strong className="text-[#B45309]">₹{remainingForFreeShipping}</strong> more for <strong className="text-[#15803D]">FREE Delivery</strong></span>
              )}
            </span>
            <span className="font-extrabold text-[#B45309]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#F3EAD9] rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-[#D97706] to-[#15803D] h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 relative z-10">
          {cartItems.length === 0 ? (
            <div className="text-center py-14 space-y-4 bg-white/85 backdrop-blur-xs rounded-2xl p-6 border border-[#E8DDCD] shadow-sm my-4">
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-inner overflow-hidden border-2 border-[#D97706]/30 bg-[#FFFDF9]">
                <img 
                  src="/images/marusthali-logo.svg" 
                  alt="Marusthali Achar Logo" 
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h4 className="font-serif text-xl font-black text-[#1F110B]">Your basket is empty</h4>
              <p className="text-xs sm:text-sm text-[#785E4F] max-w-xs mx-auto font-medium leading-relaxed">
                Explore our sun-cured traditional achar and bring the authentic taste of Dadi's kitchen home!
              </p>
              <button
                onClick={() => { closeCart(); onNavigate('all-products'); }}
                className="px-6 py-2.5 bg-[#1F110B] hover:bg-[#B45309] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer"
              >
                Browse All Achar
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white/95 backdrop-blur-xs rounded-xl p-3 border border-[#E8DDCD] flex gap-3 shadow-xs hover:border-[#D97706]/60 hover:shadow-md transition-all group"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#E8DDCD] bg-[#FAF5EC] shrink-0 group-hover:scale-102 transition-transform" 
                />

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1F110B] line-clamp-1 leading-snug">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="inline-block text-[11px] font-semibold text-[#8C6542] bg-[#FAF5EC] border border-[#EBDCC8] px-2 py-0.5 rounded mt-1">
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
                    <div className="flex items-center border border-[#E0D2BF] rounded-lg bg-[#FAF5EC]">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-[#EADBCC] text-[#1F110B] rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#1F110B] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-[#EADBCC] text-[#1F110B] rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-extrabold text-[#15803D]">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.mrp && item.mrp > item.price && (
                        <span className="block text-[10px] text-stone-400 line-through">
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
          <div className="p-4 bg-white/95 backdrop-blur-md border-t border-[#E8DDCD] space-y-3 z-10 shadow-xl">
            
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
                    className="text-emerald-700 hover:text-red-600 font-bold underline text-[11px] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8C6542] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon: DESI10 or FESTIVE15"
                      className="w-full bg-[#FAF5EC] border border-[#E0D2BF] rounded-lg pl-8 pr-2 py-1.5 text-xs text-[#1F110B] uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-[#D97706]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1F110B] text-white hover:bg-[#B45309] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-[#5C3D2E] pt-1">
              <div className="flex justify-between">
                <span className="text-[#8C6542]">Subtotal</span>
                <span className="font-semibold text-[#1F110B]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#15803D] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8C6542]">Shipping</span>
                <span className="font-semibold text-[#1F110B]">
                  {shippingFee === 0 ? <span className="text-[#15803D] font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="border-t border-[#E8DDCD] pt-2 flex justify-between text-sm font-bold text-[#1F110B]">
                <span>Total Amount</span>
                <span className="text-base font-extrabold text-[#15803D]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white py-3 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { closeCart(); onNavigate('cart'); }}
                className="w-full bg-[#FAF5EC] border border-[#E0D2BF] hover:bg-[#F0E6D2] text-[#1F110B] py-2 rounded-full font-bold text-xs transition-colors cursor-pointer"
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
