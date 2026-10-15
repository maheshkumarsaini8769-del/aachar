import React, { useState } from 'react';
import { X, Lock, Phone, User, MapPin, CheckCircle, ShieldCheck, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [step, setStep] = useState('phone'); // 'phone' or 'otp' for login
  
  // Login State
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Register State
  const [regStep, setRegStep] = useState('details'); // 'details' or 'otp'
  const [regOtp, setRegOtp] = useState('');
  const [regForm, setRegForm] = useState({
    name: 'Mahesh Saini',
    phone: '9876543210',
    email: 'mahesh.saini@example.com',
    pincode: '332001',
    city: 'Sikar',
    state: 'Rajasthan',
    addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand'
  });

  if (!isAuthModalOpen) return null;

  // Login Handlers
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setStep('otp');
    setOtp('1234'); // Auto-fill demo OTP for convenience
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234' && otp.length < 4) {
      setErrorMsg('Invalid OTP. Use demo OTP: 1234');
      return;
    }
    setErrorMsg('');
    login(phone, 'Mahesh Saini');
  };

  // Register Handlers (Now with OTP Verification)
  const handleRegisterDetailsSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone || !regForm.pincode || !regForm.addressLine) {
      setErrorMsg('Please fill all required registration fields');
      return;
    }
    if (regForm.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setRegOtp('1234'); // Pre-fill demo OTP for convenience
    setRegStep('otp');
  };

  const handleRegisterOtpSubmit = (e) => {
    e.preventDefault();
    if (regOtp !== '1234' && regOtp.length < 4) {
      setErrorMsg('Invalid OTP. Use demo OTP: 1234');
      return;
    }
    setErrorMsg('');
    register(regForm);
  };

  const handleQuickDemoLogin = () => {
    login('9876543210', 'Mahesh Saini');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeAuthModal} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-brand-border z-10 animate-scale-up">
        
        {/* Header Strip with Heritage Branding */}
        <div className="bg-[#2D1810] text-white p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm">
              🌿
            </div>
            <span className="font-serif font-bold text-lg text-amber-200">Marusthali Achar Account</span>
          </div>

          <h3 className="font-serif text-2xl font-black text-white">
            {mode === 'login' 
              ? (step === 'phone' ? 'Login with Mobile OTP' : 'Verify Mobile OTP') 
              : (regStep === 'details' ? 'New Customer Registration' : 'Verify Registration OTP')}
          </h3>

          <p className="text-xs text-[#E5D7C3] mt-1">
            Sign in to track orders live and manage your saved delivery addresses.
          </p>
        </div>

        {/* Benefit Highlight Banner */}
        <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-200 flex items-center gap-2 text-xs text-amber-900 font-medium">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Sign in to access <strong>Live Order Tracking</strong> automatically without needing an Order ID!</span>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-brand-border bg-brand-bg/50">
          <button
            onClick={() => { setMode('login'); setStep('phone'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              mode === 'login'
                ? 'border-brand-yellow text-brand-brown font-extrabold bg-white'
                : 'border-transparent text-brand-brownMuted hover:text-brand-brown'
            }`}
          >
            Quick Mobile Login
          </button>
          <button
            onClick={() => { setMode('register'); setRegStep('details'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              mode === 'register'
                ? 'border-brand-yellow text-brand-brown font-extrabold bg-white'
                : 'border-transparent text-brand-brownMuted hover:text-brand-brown'
            }`}
          >
            Register (New User)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Mode 1: Login Form */}
          {mode === 'login' && (
            <div className="space-y-4">
              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-brown uppercase mb-1">
                      Mobile Number:
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-brand-brownMuted border-r border-brand-border pr-2">
                        <span>🇮🇳 +91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full bg-brand-bg border border-brand-border rounded-xl pl-20 pr-4 py-3 text-sm font-bold text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-black py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs text-brand-brownMuted">
                      OTP sent to <strong>+91 {phone}</strong>
                    </span>
                    <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
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
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="1234"
                      className="w-40 mx-auto text-center tracking-widest text-2xl font-black bg-brand-bg border-2 border-brand-green rounded-xl py-2 text-brand-brown focus:outline-none block"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-green hover:bg-brand-greenHover text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="text-xs text-brand-brownMuted hover:underline font-medium"
                    >
                      ← Change Mobile Number
                    </button>
                  </div>
                </form>
              )}

              {/* Instant Demo Login Button */}
              <div className="pt-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-brand-cream border border-brand-border text-brand-brown rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>⚡ 1-Click Demo Login (Mahesh Saini - Sikar)</span>
                </button>
              </div>
            </div>
          )}

          {/* Mode 2: Register Form (With OTP verification step) */}
          {mode === 'register' && (
            <div>
              {regStep === 'details' ? (
                <form onSubmit={handleRegisterDetailsSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-0.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      placeholder="e.g. Mahesh Saini"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs font-semibold text-brand-brown focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-brand-brown mb-0.5">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="9876543210"
                        className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs font-semibold text-brand-brown focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-brown mb-0.5">Pincode *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={regForm.pincode}
                        onChange={(e) => setRegForm({ ...regForm, pincode: e.target.value })}
                        placeholder="332001"
                        className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs font-mono font-bold text-brand-brown focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-0.5">Delivery Address (House No, Street, Ward) *</label>
                    <input
                      type="text"
                      required
                      value={regForm.addressLine}
                      onChange={(e) => setRegForm({ ...regForm, addressLine: e.target.value })}
                      placeholder="H. No. 125, Ward No. 5"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs font-semibold text-brand-brown focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-brand-brown mb-0.5">City</label>
                      <input
                        type="text"
                        value={regForm.city}
                        onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                        placeholder="Sikar"
                        className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs font-semibold text-brand-brown focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-brown mb-0.5">State</label>
                      <input
                        type="text"
                        value={regForm.state}
                        onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                        placeholder="Rajasthan"
                        className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs font-semibold text-brand-brown focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-yellow hover:bg-brand-yellowHover text-brand-brown font-extrabold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Proceed to Verify Mobile (Get OTP)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Registration OTP Step */
                <form onSubmit={handleRegisterOtpSubmit} className="space-y-4">
                  <div className="text-center space-y-1.5 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
                    <span className="text-xs text-brand-brown font-medium block">
                      Registration OTP sent to <strong>+91 {regForm.phone}</strong>
                    </span>
                    <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
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
                    className="w-full bg-brand-green hover:bg-brand-greenHover text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Verify OTP & Complete Registration</span>
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setRegStep('details')}
                      className="text-xs text-brand-brownMuted hover:underline font-medium"
                    >
                      ← Edit Details or Mobile Number
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Privacy Note */}
          <div className="mt-4 text-center text-[10px] text-brand-brownMuted">
            🔒 By continuing, you agree to Marusthali Achar's Terms of Service and Privacy Policy.
          </div>
        </div>

      </div>
    </div>
  );
};
