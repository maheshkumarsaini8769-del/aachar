import React, { useState, useEffect } from 'react';
import { 
  Check, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  QrCode,
  Smartphone,
  Lock,
  User,
  Sparkles,
  CheckCircle,
  Phone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

export const CheckoutPage = ({ onNavigate, onOrderPlaced }) => {
  const { cartItems, subtotal, discountAmount, finalTotal, shippingFee } = useCart();
  const { currentLocation, checkPincode, lookupPincodeLive, updateLocation } = useLocation();
  const { currentUser, isLoggedIn, login, register, addOrder } = useAuth();

  // If not logged in, start at step 0 (Auth: Login/Register). If logged in, start at step 1 (Address).
  const [step, setStep] = useState(() => (isLoggedIn ? 1 : 0));

  // Auth form state within Checkout
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [otpStep, setOtpStep] = useState(false);
  const [loginOtp, setLoginOtp] = useState('1234');
  const [regOtpStep, setRegOtpStep] = useState(false);
  const [regOtp, setRegOtp] = useState('1234');
  const [authError, setAuthError] = useState('');

  const [registerForm, setRegisterForm] = useState({
    name: 'Mahesh Saini',
    phone: '9876543210',
    email: 'mahesh.saini@example.com',
    pincode: '332001',
    addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
    city: 'Sikar',
    state: 'Rajasthan'
  });

  // Step 1: Address state (initialized from currentUser or currentLocation)
  const [addressForm, setAddressForm] = useState({
    fullName: currentUser?.name || currentLocation.name || 'Mahesh Saini',
    phone: currentUser?.phone || currentLocation.phone || '+91 9876543210',
    pincode: currentUser?.pincode || currentLocation.pincode || '332001',
    addressLine: currentUser?.addressLine || currentLocation.addressLine || 'H. No. 125, Ward No. 5, Near Old Bus Stand',
    city: currentUser?.city || currentLocation.city || 'Sikar',
    state: currentUser?.state || currentLocation.state || 'Rajasthan',
    addressType: 'Home'
  });

  const [pinCheckInfo, setPinCheckInfo] = useState(() =>
    checkPincode ? checkPincode(currentUser?.pincode || currentLocation.pincode || '332001') : null
  );

  const handleCheckoutPincodeChange = async (rawVal) => {
    const clean = rawVal.replace(/\D/g, '').slice(0, 6);
    setAddressForm(prev => ({ ...prev, pincode: clean }));
    if (clean.length === 6 && checkPincode) {
      const syncRes = checkPincode(clean);
      setPinCheckInfo(syncRes);
      if (syncRes.valid) {
        setAddressForm(prev => ({ ...prev, pincode: clean, city: syncRes.city, state: syncRes.state }));
        if (lookupPincodeLive) {
          const liveRes = await lookupPincodeLive(clean);
          setPinCheckInfo(liveRes);
          setAddressForm(prev => ({ ...prev, pincode: clean, city: liveRes.city, state: liveRes.state }));
          updateLocation?.({
            pincode: liveRes.pincode,
            area: liveRes.area,
            city: liveRes.city,
            state: liveRes.state,
            estimate: liveRes.days,
            expectedDate: liveRes.expectedDate
          });
        }
      }
    } else {
      setPinCheckInfo(null);
    }
  };

  // When user logs in during checkout, update addressForm and advance to step 1
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      setAddressForm(prev => ({
        ...prev,
        fullName: currentUser.name || prev.fullName,
        phone: currentUser.phone || prev.phone,
        pincode: currentUser.pincode || prev.pincode,
        addressLine: currentUser.addressLine || prev.addressLine,
        city: currentUser.city || prev.city,
        state: currentUser.state || prev.state
      }));
      if (step === 0) {
        setStep(1);
      }
    }
  }, [isLoggedIn, currentUser]);

  // Step 2: Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' or 'express'

  // Step 3: Payment method
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('mahesh@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculatedShipping = deliveryMethod === 'express' ? 50 : (subtotal >= 499 ? 0 : 50);
  const orderTotal = Math.max(0, subtotal - discountAmount + calculatedShipping);

  // Auth Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!otpStep) {
      if (!loginPhone || loginPhone.length < 10) {
        setAuthError('Please enter a valid 10-digit mobile number');
        return;
      }
      setAuthError('');
      setOtpStep(true);
      setLoginOtp('1234');
    } else {
      setAuthError('');
      const user = login(loginPhone, 'Mahesh Saini');
      setStep(1);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regOtpStep) {
      if (!registerForm.name || !registerForm.phone || !registerForm.pincode || !registerForm.addressLine) {
        setAuthError('Please fill all required registration fields');
        return;
      }
      if (registerForm.phone.replace(/\D/g, '').length < 10) {
        setAuthError('Please enter a valid 10-digit mobile number');
        return;
      }
      setAuthError('');
      setRegOtp('1234');
      setRegOtpStep(true);
    } else {
      if (regOtp !== '1234' && regOtp.length < 4) {
        setAuthError('Invalid OTP. Use demo OTP: 1234');
        return;
      }
      setAuthError('');
      const user = register(registerForm);
      setStep(1);
    }
  };

  const handleQuickDemoAuth = () => {
    login('9876543210', 'Mahesh Saini');
    setStep(1);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.phone || !addressForm.pincode || !addressForm.addressLine) {
      alert('Please fill all required address fields.');
      return;
    }
    setStep(2);
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `ORD${Math.floor(100000000 + Math.random() * 900000000)}`;
      const orderSummary = {
        orderId: generatedOrderId,
        items: cartItems,
        total: orderTotal,
        address: addressForm,
        deliveryMethod: deliveryMethod === 'express' ? 'Express Air Dispatch' : 'Standard Delivery',
        paymentMethod: paymentMethod.toUpperCase(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      // Add to AuthContext userOrders (so it appears automatically in Track Order without typing track ID!)
      addOrder(orderSummary);

      if (onOrderPlaced) {
        onOrderPlaced(orderSummary);
      }

      onNavigate('order-success', { orderId: generatedOrderId, orderSummary });
    }, 1200);
  };

  // Steps definition based on whether user is logged in
  const stepperItems = isLoggedIn ? [
    { num: 1, label: 'Delivery Address' },
    { num: 2, label: 'Shipping Method' },
    { num: 3, label: 'Payment' }
  ] : [
    { num: 0, label: 'Login / Register' },
    { num: 1, label: 'Address' },
    { num: 2, label: 'Shipping' },
    { num: 3, label: 'Payment' }
  ];

  return (
    <div className="bg-transparent min-h-screen py-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stepper Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-lg mx-auto relative">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-brand-border z-0" />
            
            {stepperItems.map(s => {
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isDone
                        ? 'bg-brand-green text-white shadow-xs'
                        : isCurrent
                        ? 'bg-brand-yellow text-brand-brown ring-4 ring-brand-yellow/30 font-extrabold shadow-sm'
                        : 'bg-white border-2 border-brand-border text-brand-brownMuted'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : (s.num === 0 ? '🔒' : s.num)}
                  </div>
                  <span className={`text-[11px] sm:text-xs mt-1 font-semibold ${isCurrent ? 'text-brand-brown font-bold' : 'text-brand-brownMuted'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Logged-In Status Banner */}
        {isLoggedIn && (
          <div className="max-w-4xl mx-auto mb-6 bg-emerald-50 border border-emerald-300 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-900">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span>Logged in as <strong>{currentUser.name}</strong> ({currentUser.phone})</span>
                <span className="block text-[11px] text-emerald-700">
                  ✨ This order will link directly to your account with automatic Live Tracking on your orders page!
                </span>
              </div>
            </div>
            <span className="bg-emerald-200 text-emerald-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase shrink-0">
              Auto-Track Enabled
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Main Step Forms (Col 8) */}
          <div className="lg:col-span-8">
            
            {/* STEP 0: Mandate Login / Registration if not logged in */}
            {step === 0 && !isLoggedIn && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-warm space-y-6">
                
                <div className="border-b border-brand-border pb-4">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-0.5 rounded-full text-xs font-bold uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Step 1: Customer Verification</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-brown">
                    Please Log In or Register to Continue
                  </h3>
                  <p className="text-xs text-brand-brownMuted mt-1">
                    Signing in links this order directly to your account so you can track delivery progress live without entering a tracking ID.
                  </p>
                </div>

                {authError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                    ⚠️ {authError}
                  </div>
                )}

                {/* Tabs */}
                <div className="flex border-b border-brand-border bg-brand-bg/50 rounded-xl p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setOtpStep(false); }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      authMode === 'login'
                        ? 'bg-white text-brand-brown shadow-xs font-extrabold'
                        : 'text-brand-brownMuted hover:text-brand-brown'
                    }`}
                  >
                    Quick Mobile Login (OTP)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      authMode === 'register'
                        ? 'bg-white text-brand-brown shadow-xs font-extrabold'
                        : 'text-brand-brownMuted hover:text-brand-brown'
                    }`}
                  >
                    New Customer Registration
                  </button>
                </div>

                {/* Login Mode */}
                {authMode === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {!otpStep ? (
                      <div>
                        <label className="block text-xs font-bold text-brand-brown mb-1.5 uppercase">
                          Enter Mobile Number:
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-brand-brownMuted border-r border-brand-border pr-2">
                            <span>🇮🇳 +91</span>
                          </div>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="9876543210"
                            className="w-full bg-brand-bg border border-brand-border rounded-xl pl-20 pr-4 py-3 text-sm font-bold text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center space-y-1">
                          <span className="text-xs text-brand-brownMuted">
                            OTP sent to <strong>+91 {loginPhone}</strong>
                          </span>
                          <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-md">
                            Demo OTP: <strong>1234</strong>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-brown uppercase text-center mb-1">
                            Enter 4-Digit OTP:
                          </label>
                          <input
                            type="text"
                            maxLength={4}
                            required
                            value={loginOtp}
                            onChange={(e) => setLoginOtp(e.target.value)}
                            placeholder="1234"
                            className="w-36 mx-auto text-center tracking-widest text-2xl font-black bg-brand-bg border-2 border-brand-green rounded-xl py-2 text-brand-brown focus:outline-none block"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>{otpStep ? 'Verify OTP & Continue to Address' : 'Send Verification OTP'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Instant Demo Login Button */}
                    <button
                      type="button"
                      onClick={handleQuickDemoAuth}
                      className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-brand-cream border border-brand-border text-brand-brown rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>⚡ 1-Click Instant Login (Mahesh Saini - Sikar)</span>
                    </button>
                  </form>
                )}

                {/* Registration Mode */}
                {authMode === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    {!regOtpStep ? (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-brand-brown mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                            placeholder="e.g. Mahesh Saini"
                            className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs font-semibold text-brand-brown focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-brand-brown mb-1">Mobile Number *</label>
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              value={registerForm.phone}
                              onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value.replace(/\D/g, '') })}
                              placeholder="9876543210"
                              className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs font-semibold text-brand-brown focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-brown mb-1">Pincode *</label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              value={registerForm.pincode}
                              onChange={(e) => setRegisterForm({ ...registerForm, pincode: e.target.value })}
                              placeholder="332001"
                              className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs font-mono font-bold text-brand-brown focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-brown mb-1">Flat, House no., Building, Street *</label>
                          <input
                            type="text"
                            required
                            value={registerForm.addressLine}
                            onChange={(e) => setRegisterForm({ ...registerForm, addressLine: e.target.value })}
                            placeholder="H. No. 125, Ward No. 5, Near Old Bus Stand"
                            className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs font-semibold text-brand-brown focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-brand-brown mb-1">City</label>
                            <input
                              type="text"
                              value={registerForm.city}
                              onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                              placeholder="Sikar"
                              className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs font-semibold text-brand-brown focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-brown mb-1">State</label>
                            <input
                              type="text"
                              value={registerForm.state}
                              onChange={(e) => setRegisterForm({ ...registerForm, state: e.target.value })}
                              placeholder="Rajasthan"
                              className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs font-semibold text-brand-brown focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold py-3.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
                        >
                          <span>Proceed to Verify Mobile (Get OTP)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      /* Registration OTP Verification Step */
                      <div className="space-y-4 py-2">
                        <div className="text-center space-y-1.5 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                          <span className="text-xs text-brand-brown font-medium block">
                            Registration OTP sent to <strong>+91 {registerForm.phone}</strong>
                          </span>
                          <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-0.5 rounded-md">
                            Demo Registration OTP: <strong>1234</strong>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-brown uppercase text-center mb-1">
                            Enter 4-Digit Registration OTP:
                          </label>
                          <input
                            type="text"
                            maxLength={4}
                            required
                            value={regOtp}
                            onChange={(e) => setRegOtp(e.target.value)}
                            placeholder="1234"
                            className="w-40 mx-auto text-center tracking-widest text-2xl font-black bg-brand-bg border-2 border-brand-green rounded-xl py-2 text-brand-brown focus:outline-none block"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-brand-green hover:bg-brand-greenHover text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Verify OTP & Complete Registration</span>
                        </button>

                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setRegOtpStep(false)}
                            className="text-xs text-brand-brownMuted hover:underline font-medium"
                          >
                            ← Edit Details or Mobile Number
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}

              </div>
            )}

            {/* STEP 1: Delivery Address */}
            {step === 1 && (
              <form onSubmit={handleAddressSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-warm space-y-4">
                <div className="flex items-center justify-between border-b border-brand-border pb-3">
                  <h3 className="font-serif text-lg font-bold text-brand-brown flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-green" />
                    <span>Delivery Address</span>
                  </h3>
                  <span className="text-xs text-brand-green font-bold">Step {isLoggedIn ? '1 of 3' : '2 of 4'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-brand-brown mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      placeholder="e.g. Mahesh Saini"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-green text-xs font-semibold text-brand-brown"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-brown mb-1">Mobile Phone (for delivery SMS) *</label>
                    <input
                      type="tel"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-green text-xs font-semibold text-brand-brown"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-brand-brown mb-1">6-Digit Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={addressForm.pincode}
                      onChange={(e) => handleCheckoutPincodeChange(e.target.value)}
                      placeholder="332001"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-green text-xs font-mono font-bold text-brand-brown"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-brown mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      placeholder="Sikar"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-green text-xs font-semibold text-brand-brown"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-brown mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      placeholder="Rajasthan"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-green text-xs font-semibold text-brand-brown"
                    />
                  </div>
                </div>

                {/* Live Pincode Location & Delivery Days Banner */}
                {pinCheckInfo && pinCheckInfo.valid && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-extrabold text-[#1F110B]">
                      📍 Location: <span className="text-[#1E5631]">{pinCheckInfo.area ? `${pinCheckInfo.area}, ` : ''}{pinCheckInfo.city}, {pinCheckInfo.state}</span>
                    </span>
                    <span className="font-black bg-[#1E5631] text-white px-2.5 py-0.5 rounded-full text-[11px]">
                      🚚 Delivery in {pinCheckInfo.days} (By {pinCheckInfo.expectedDate})
                    </span>
                  </div>
                )}

                <div className="text-xs">
                  <label className="block font-bold text-brand-brown mb-1">Flat, House no., Building, Street *</label>
                  <textarea
                    rows={2}
                    required
                    value={addressForm.addressLine}
                    onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
                    placeholder="H. No. 125, Ward No. 5, Near Old Bus Stand"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-green text-xs font-semibold text-brand-brown"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => onNavigate('cart')}
                    className="text-xs font-bold text-brand-brownMuted hover:text-brand-brown"
                  >
                    ← Back to Cart
                  </button>

                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-greenHover text-white px-8 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <span>Proceed to Delivery Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Delivery Method */}
            {step === 2 && (
              <form onSubmit={handleDeliverySubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-warm space-y-5">
                <div className="flex items-center justify-between border-b border-brand-border pb-3">
                  <h3 className="font-serif text-lg font-bold text-brand-brown flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brand-yellow" />
                    <span>Select Delivery Method</span>
                  </h3>
                  <span className="text-xs text-brand-green font-bold">Step {isLoggedIn ? '2 of 3' : '3 of 4'}</span>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      deliveryMethod === 'standard'
                        ? 'border-brand-green bg-emerald-50/50 shadow-xs ring-1 ring-brand-green'
                        : 'border-brand-border bg-white hover:border-brand-yellow'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-brand-green">
                        {deliveryMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-brand-brown">
                          Standard Safe Delivery (Pan-India)
                        </div>
                        <div className="text-[11px] text-brand-brownMuted mt-0.5">
                          Estimated delivery in <strong>2-3 business days</strong> with shock-insulation
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-green">
                      {subtotal >= 499 ? 'FREE' : '₹50'}
                    </span>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      deliveryMethod === 'express'
                        ? 'border-brand-green bg-emerald-50/50 shadow-xs ring-1 ring-brand-green'
                        : 'border-brand-border bg-white hover:border-brand-yellow'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-brand-green">
                        {deliveryMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-brand-brown flex items-center gap-2">
                          <span>Express Priority Dispatch (Next Flight)</span>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.2 rounded-full">Fast</span>
                        </div>
                        <div className="text-[11px] text-brand-brownMuted mt-0.5">
                          Dispatched same day via BlueDart Air (1-2 business days)
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-brown">
                      ₹50
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-brand-brownMuted hover:text-brand-brown"
                  >
                    ← Edit Address
                  </button>

                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-greenHover text-white px-8 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-warm space-y-6">
                <div className="flex items-center justify-between border-b border-brand-border pb-3">
                  <h3 className="font-serif text-lg font-bold text-brand-brown flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-green" />
                    <span>Choose Payment Option</span>
                  </h3>
                  <span className="text-xs text-brand-green font-bold">Step {isLoggedIn ? '3 of 3' : '4 of 4'}</span>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-brand-green bg-emerald-50/40 shadow-xs ring-1 ring-brand-green'
                        : 'border-brand-border bg-white hover:border-brand-yellow'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-brand-green">
                          {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-brand-brown flex items-center gap-2">
                            <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded-full">Instant 0 Fee</span>
                          </div>
                          <span className="text-[11px] text-brand-brownMuted">Instant verification & faster dispatch</span>
                        </div>
                      </div>
                      <Smartphone className="w-5 h-5 text-brand-green" />
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pt-3 border-t border-brand-border/60 pl-8 space-y-2">
                        <label className="block text-[11px] font-bold text-brand-brown">Enter Your UPI ID:</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@okhdfcbank"
                          className="w-full bg-white border border-brand-border rounded-xl p-2.5 text-xs font-mono font-bold text-brand-brown focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-brand-green bg-emerald-50/40 shadow-xs ring-1 ring-brand-green'
                        : 'border-brand-border bg-white hover:border-brand-yellow'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-brand-green">
                        {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-brand-brown">
                          Cash on Delivery (COD)
                        </div>
                        <span className="text-[11px] text-brand-brownMuted">Pay cash or UPI at your doorstep</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-brown">Pay on Handover</span>
                  </div>

                  {/* Cards / Net Banking */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-brand-green bg-emerald-50/40 shadow-xs ring-1 ring-brand-green'
                        : 'border-brand-border bg-white hover:border-brand-yellow'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-brand-green">
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-brand-brown">
                          Credit / Debit Card / Net Banking
                        </div>
                        <span className="text-[11px] text-brand-brownMuted">All Indian Banks & RuPay / Visa / Mastercard</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-brand-brownMuted hover:text-brand-brown"
                  >
                    ← Back to Shipping
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleCompletePayment}
                    className="bg-[#2D1810] hover:bg-[#43251A] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying & Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Place Order (Pay ₹{orderTotal})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Column (Col 4) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-warm space-y-4 sticky top-28">
              
              <h4 className="font-serif font-bold text-base text-brand-brown border-b border-brand-border pb-2.5">
                Order Summary ({cartItems.length} items)
              </h4>

              {/* Items mini list */}
              <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-brand-border/40 text-xs">
                {cartItems.map(item => (
                  <div key={item.id} className="pt-2 flex items-center justify-between gap-2">
                    <div className="truncate flex-1">
                      <span className="font-bold text-brand-brown block truncate">{item.name}</span>
                      <span className="text-[10px] text-brand-brownMuted">{item.size} × {item.quantity}</span>
                    </div>
                    <span className="font-bold text-brand-brown">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs border-t border-brand-border pt-3">
                <div className="flex justify-between">
                  <span className="text-brand-brownMuted">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-green font-bold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-brownMuted">Delivery</span>
                  <span className="font-semibold">
                    {calculatedShipping === 0 ? <span className="text-brand-green font-bold">FREE</span> : `₹${calculatedShipping}`}
                  </span>
                </div>
                <div className="border-t border-brand-border pt-2 flex justify-between text-base font-extrabold text-brand-brown">
                  <span>Total Payable</span>
                  <span className="text-brand-green font-black">₹{orderTotal}</span>
                </div>
              </div>

              <div className="p-3 bg-brand-cream/60 rounded-xl text-[11px] text-brand-brownMuted leading-relaxed border border-brand-border">
                📍 <strong>Shipping To:</strong> {addressForm.fullName}, {addressForm.city} ({addressForm.pincode})
              </div>

              {/* Auto-Track reassurance notice */}
              <div className="p-2.5 bg-amber-50/80 rounded-xl text-[10px] text-amber-900 border border-amber-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Your order will be available for instant live tracking immediately after placing!</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
