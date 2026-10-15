import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Truck, 
  Package, 
  MapPin, 
  Search, 
  ChevronRight,
  Clock,
  Phone,
  User,
  Sparkles,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TrackOrderPage = ({ initialOrderId, onNavigate }) => {
  const { currentUser, isLoggedIn, userOrders, openAuthModal } = useAuth();

  // Selected order state
  const [selectedOrder, setSelectedOrder] = useState(() => {
    if (initialOrderId) {
      const match = userOrders.find(o => o.orderId === initialOrderId);
      if (match) return match;
    }
    return userOrders && userOrders.length > 0 ? userOrders[0] : null;
  });

  // Manual query state (fallback if user wants to look up another ID)
  const [manualQueryId, setManualQueryId] = useState('');
  const [showManualLookup, setShowManualLookup] = useState(!isLoggedIn || userOrders.length === 0);

  // When userOrders updates or initialOrderId changes, update selectedOrder
  useEffect(() => {
    if (initialOrderId) {
      const match = userOrders.find(o => o.orderId === initialOrderId);
      if (match) {
        setSelectedOrder(match);
        return;
      }
    }
    if (userOrders && userOrders.length > 0) {
      setSelectedOrder(userOrders[0]);
    }
  }, [initialOrderId, userOrders]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualQueryId.trim()) return;
    const cleanId = manualQueryId.trim().toUpperCase();
    const existing = userOrders.find(o => o.orderId.toUpperCase() === cleanId);
    if (existing) {
      setSelectedOrder(existing);
    } else {
      // Create a virtual order view for the queried ID
      setSelectedOrder({
        orderId: cleanId,
        date: 'Recent',
        time: 'Today',
        total: 498,
        status: 'In Transit',
        currentStep: 3,
        statusText: 'In Transit via BlueDart Express Air',
        trackingNumber: `BD${cleanId.replace(/\D/g, '')}IN`,
        courier: 'BlueDart Express Air',
        estimatedDelivery: 'Expected in 1-2 Days',
        items: [
          {
            id: 'aam-classic',
            name: 'Aam Ka Achar (Classic)',
            size: '500 g',
            price: 249,
            quantity: 2,
            image: '/images/products/marusthali-mango-jar.jpg'
          }
        ],
        address: {
          fullName: currentUser?.name || 'Customer',
          phone: currentUser?.phone || '+91 9876543210',
          city: 'Sikar',
          state: 'Rajasthan',
          pincode: '332001',
          addressLine: 'Delivery Address'
        }
      });
    }
  };

  // Build 5 dynamic milestone steps for the selected order
  const getSteps = (order) => {
    const stepNum = order?.currentStep || 3;
    const isPlacedDone = stepNum >= 1;
    const isPackedDone = stepNum >= 2;
    const isShippedDone = stepNum >= 3;
    const isOutDone = stepNum >= 4;
    const isDeliveredDone = stepNum >= 5;

    return [
      {
        title: 'Order Placed & Verified',
        timestamp: `${order?.date || '12 Oct'}, ${order?.time || '10:30 AM'}`,
        detail: 'Order received and verified by Sikar artisanal pickle workshop',
        status: isPlacedDone ? (stepNum === 1 ? 'active' : 'completed') : 'upcoming'
      },
      {
        title: 'Processing & Safe Shock-Packing',
        timestamp: isPackedDone ? `${order?.date || '12 Oct'}, 02:00 PM` : 'Pending',
        detail: 'Ceramic/glass jars cushioned with 5-ply honeycomb shock insulation',
        status: isPackedDone ? (stepNum === 2 ? 'active' : 'completed') : 'upcoming'
      },
      {
        title: 'Shipped (In Transit)',
        timestamp: isShippedDone ? `${order?.date || '13 Oct'}, 11:30 AM` : 'Pending',
        detail: `Dispatched via ${order?.courier || 'BlueDart Express Air'} (AWB #${order?.trackingNumber || 'BD98274191IN'})`,
        status: isShippedDone ? (stepNum === 3 ? 'active' : 'completed') : 'upcoming'
      },
      {
        title: 'Out for Delivery',
        timestamp: isOutDone ? 'Today, 08:30 AM' : 'Expected Next Business Day',
        detail: 'Delivery executive assigned for doorstep temperature-safe handover',
        status: isOutDone ? (stepNum === 4 ? 'active' : 'completed') : 'upcoming'
      },
      {
        title: 'Delivered',
        timestamp: isDeliveredDone ? 'Delivered' : `Expected ${order?.estimatedDelivery || 'in 2-3 Days'}`,
        detail: 'Package safely handed over with tamper-evident seal intact',
        status: isDeliveredDone ? 'completed' : 'upcoming'
      }
    ];
  };

  const currentTimelineSteps = getSteps(selectedOrder);

  return (
    <div className="bg-brand-bg min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">Track Order</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green uppercase tracking-wider mb-1">
              <Truck className="w-4 h-4 text-brand-green" />
              <span>Real-Time Milestone Tracking</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
              Track Your Order
            </h1>
            <p className="text-xs sm:text-sm text-brand-brownMuted mt-1">
              Live updates on your traditional sun-cooked Marusthali Achar pickles from Sikar workshop to your home.
            </p>
          </div>

          {/* Quick Login button if guest */}
          {!isLoggedIn && (
            <button
              onClick={() => openAuthModal()}
              className="bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
            >
              <User className="w-4 h-4" />
              <span>Login for 1-Click Auto Track</span>
            </button>
          )}
        </div>

        {/* NOT LOGGED IN NOTICE BANNER */}
        {!isLoggedIn && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <span className="font-bold text-amber-900 block">
                  Want to view your order without entering a Tracking ID?
                </span>
                <span className="text-amber-800 text-[11px]">
                  Log in with your registered mobile number, and your live order will automatically appear right here!
                </span>
              </div>
            </div>
            <button
              onClick={() => openAuthModal()}
              className="bg-[#2D1810] text-white hover:bg-[#43251A] px-4 py-2 rounded-xl font-bold text-xs shrink-0 transition-colors"
            >
              Login / Sign In →
            </button>
          </div>
        )}

        {/* LOGGED-IN AUTO-TRACK BANNER (Zero Track ID needed!) */}
        {isLoggedIn && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 font-serif font-black text-lg">
                ✓
              </div>
              <div>
                <span className="font-bold text-emerald-950 block text-sm">
                  Welcome, {currentUser.name}! Your live order has loaded automatically.
                </span>
                <span className="text-emerald-800 text-xs">
                  ✨ <strong>No tracking ID required.</strong> Your live shipment status is shown directly below.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="bg-emerald-200 text-emerald-950 px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase">
                {userOrders.length} Order(s) Saved
              </span>
            </div>
          </div>
        )}

        {/* USER ORDERS SELECTOR PILLS (Switch between orders in 1 click!) */}
        {userOrders && userOrders.length > 0 && (
          <div className="mb-6 space-y-2">
            <span className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
              Your Active Orders (Click to switch):
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {userOrders.map((ord, idx) => {
                const isSelected = selectedOrder?.orderId === ord.orderId;
                return (
                  <button
                    key={ord.orderId}
                    onClick={() => { setSelectedOrder(ord); setShowManualLookup(false); }}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border-2 ${
                      isSelected
                        ? 'border-brand-green bg-white text-brand-brown shadow-sm ring-1 ring-brand-green'
                        : 'border-brand-border bg-white/70 text-brand-brownMuted hover:border-brand-yellow hover:bg-white'
                    }`}
                  >
                    <Package className={`w-4 h-4 ${isSelected ? 'text-brand-green' : 'text-gray-400'}`} />
                    <span>Order #{ord.orderId}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                      ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {ord.status || 'In Transit'}
                    </span>
                  </button>
                );
              })}

              {/* Toggle to track a different order manually */}
              <button
                onClick={() => setShowManualLookup(!showManualLookup)}
                className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-brand-brownMuted hover:text-brand-brown border border-dashed border-brand-border hover:bg-white shrink-0 transition-colors"
              >
                🔍 Track Another Order ID
              </button>
            </div>
          </div>
        )}

        {/* MANUAL LOOKUP CARD (Only if requested or user not logged in with no orders) */}
        {showManualLookup && (
          <div className="bg-white p-5 rounded-3xl border border-brand-border shadow-xs mb-8 transition-all">
            <span className="text-xs font-bold text-brand-brown block mb-2">
              Look up any Marusthali Achar Order ID manually:
            </span>
            <form onSubmit={handleManualSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-brand-brownMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={manualQueryId}
                  onChange={(e) => setManualQueryId(e.target.value)}
                  placeholder="Enter Order ID (e.g. ORD882914725)"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-3 py-2.5 text-xs font-mono font-bold text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-green uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-green hover:bg-brand-greenHover text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Track Now
              </button>
            </form>
          </div>
        )}

        {/* ACTIVE SHIPMENT TIMELINE CARD */}
        {selectedOrder ? (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-warm space-y-6">
            
            {/* Header of Active Order */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-brand-border gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-brand-green bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Auto-Loaded From Your Account
                  </span>
                  <span className="text-xs text-brand-brownMuted">
                    Placed on {selectedOrder.date}
                  </span>
                </div>
                <div className="font-mono text-lg sm:text-2xl font-black text-brand-brown mt-1">
                  Order ID: <span className="text-brand-green">{selectedOrder.orderId}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="text-xs font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full">
                  {selectedOrder.statusText || selectedOrder.status || 'In Transit'}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border">
              {currentTimelineSteps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';
                return (
                  <div key={idx} className="relative group">
                    
                    {/* Status Indicator Icon */}
                    <div className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-brand-green text-white shadow-xs'
                        : isActive
                        ? 'bg-brand-yellow text-brand-brown ring-4 ring-brand-yellow/30 font-bold'
                        : 'bg-white border-2 border-brand-border text-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      ) : isActive ? (
                        <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Circle className="w-2.5 h-2.5" />
                      )}
                    </div>

                    {/* Step Description */}
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-sm font-bold ${
                          isActive ? 'text-brand-green font-extrabold' : 'text-brand-brown'
                        }`}>
                          {step.title}
                        </h4>
                        <span className="text-xs font-semibold text-brand-brownMuted font-mono">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-brand-brownMuted leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Ordered Items Preview */}
            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div className="pt-4 border-t border-brand-border space-y-3">
                <span className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                  Items in this Shipment ({selectedOrder.items.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-brand-bg border border-brand-border">
                      <img
                        src={item.image || '/images/products/marusthali-mango-jar.jpg'}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-brand-border bg-white"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-xs text-brand-brown truncate">{item.name}</h5>
                        <div className="text-[11px] text-brand-brownMuted flex items-center justify-between mt-0.5">
                          <span>{item.size} × {item.quantity}</span>
                          <span className="font-bold text-brand-green">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Courier Details */}
            <div className="p-4 rounded-2xl bg-brand-cream border border-brand-border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-bold text-brand-brown block">
                  Logistics Partner: {selectedOrder.courier || 'BlueDart Express Air'}
                </span>
                <span className="text-[11px] text-brand-brownMuted">
                  AWB Tracking: <strong>{selectedOrder.trackingNumber || 'BD98274191IN'}</strong> • Destination: {selectedOrder.address?.city || 'Sikar'} ({selectedOrder.address?.pincode || '332001'})
                </span>
              </div>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-1.5 bg-white border border-brand-border text-brand-brown px-4 py-2 rounded-xl font-bold hover:bg-brand-bg transition-colors self-start sm:self-auto"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span>Call Delivery Concierge</span>
              </a>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-border space-y-4">
            <div className="text-4xl">📦</div>
            <h3 className="font-serif text-xl font-bold text-brand-brown">
              No Active Orders Found
            </h3>
            <p className="text-xs text-brand-brownMuted max-w-sm mx-auto">
              You haven't placed any orders yet, or you may need to log in to see your previous shipments.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => onNavigate('all-products')}
                className="bg-brand-green text-white px-6 py-2.5 rounded-full text-xs font-bold"
              >
                Browse Pickles & Products
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
