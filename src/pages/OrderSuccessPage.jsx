import React, { useEffect } from 'react';
import { CheckCircle2, Truck, ArrowRight, ShoppingBag, MapPin, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccessPage = ({ orderId = 'ORD123456789', orderSummary, onNavigate }) => {
  useEffect(() => {
    // Fire festive celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4 text-center">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-warm space-y-6">
          
          {/* Animated Big Green Checkmark matching reference */}
          <div className="w-20 h-20 bg-emerald-100 text-brand-green rounded-full mx-auto flex items-center justify-center shadow-sm animate-scale-up">
            <CheckCircle2 className="w-12 h-12 text-brand-green" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-brown">
              Order Placed Successfully!
            </h1>
            <div className="inline-block bg-brand-cream border border-brand-border px-3.5 py-1 rounded-full text-xs font-mono font-bold text-brand-brown">
              Order ID: <span className="text-brand-green">{orderId}</span>
            </div>
            <p className="text-xs text-brand-brownMuted leading-relaxed max-w-sm mx-auto pt-1">
              Thank you for trusting Marusthali Achar! Our rural artisans in Sikar have received your order and are preparing your fresh pickle jars.
            </p>
          </div>

          {/* Festive Gift Illustration Box from Showcase */}
          <div className="w-24 h-24 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center p-2 shadow-xs">
            <img
              src="/images/banners/order-success-gift.jpg"
              alt="Gift Packaging"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Delivery Details Summary */}
          {orderSummary && (
            <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border text-left text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-brand-brown border-b border-brand-border/60 pb-1.5">
                <span>Total Amount Paid:</span>
                <span className="text-brand-green text-sm">₹{orderSummary.total}</span>
              </div>
              <div className="text-brand-brownMuted leading-relaxed">
                <strong>Delivery Address:</strong> {orderSummary.address?.fullName}, {orderSummary.address?.addressLine}, {orderSummary.address?.city} ({orderSummary.address?.pincode})
              </div>
              <div className="text-brand-green font-bold flex items-center gap-1.5 pt-1">
                <Truck className="w-4 h-4" />
                <span>Estimated Arrival: 2-3 Business Days</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onNavigate('account', { tab: 'orders', activeOrderId: orderId })}
              className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown py-3.5 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>View Order in Account & Track</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-white border border-brand-border hover:bg-brand-cream text-brand-brown py-3 rounded-full font-bold text-xs transition-colors"
            >
              Continue Shopping
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
