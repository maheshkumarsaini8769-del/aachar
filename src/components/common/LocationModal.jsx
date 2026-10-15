import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, AlertCircle, Truck, Calendar } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

export const LocationModal = () => {
  const { isLocationModalOpen, closeLocationModal, currentLocation, checkPincode, lookupPincodeLive, updateLocation } = useLocation();
  const [pinInput, setPinInput] = useState(currentLocation?.pincode || '');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isLocationModalOpen) return null;

  const runCheck = async (targetPin) => {
    const clean = (targetPin || '').trim();
    const syncRes = checkPincode(clean);
    setFeedback(syncRes);

    if (syncRes.valid) {
      setLoading(true);
      const liveRes = await lookupPincodeLive(clean);
      setLoading(false);
      setFeedback(liveRes);
      // Update global location state while keeping modal open so user sees location & days clearly
      updateLocation({
        pincode: liveRes.pincode,
        area: liveRes.area,
        city: liveRes.city,
        state: liveRes.state,
        estimate: liveRes.days,
        expectedDate: liveRes.expectedDate
      });
    }
  };

  const handleValidate = (e) => {
    e.preventDefault();
    runCheck(pinInput);
  };

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPinInput(val);
    if (val.length === 6) {
      runCheck(val);
    }
  };

  const handleQuickSelect = (pin) => {
    setPinInput(pin);
    runCheck(pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeLocationModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#D97706] z-10">
        
        {/* Header */}
        <div className="bg-[#2D1810] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FBBF24]" />
            <h3 className="font-serif text-lg font-bold">
              Check Pincode & Delivery Days
            </h3>
          </div>
          <button 
            onClick={closeLocationModal}
            className="p-1 text-amber-200 hover:bg-white/10 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {/* Enter Pincode Form */}
          <form onSubmit={handleValidate} className="space-y-2.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#2D1810]">
              Enter 6-Digit Pincode to Check Location & Days:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={handlePinChange}
                placeholder="e.g. 332001, 302001, 110001"
                className="flex-1 bg-[#FAF6EE] border-2 border-[#D5C7B8] focus:border-[#D97706] rounded-xl px-4 py-2.5 text-sm text-[#1F110B] font-mono font-black tracking-widest focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#1E5631] hover:bg-[#164225] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-colors cursor-pointer"
              >
                {loading ? 'Checking...' : 'Check'}
              </button>
            </div>
          </form>

          {/* Detected Location & Delivery Days Card */}
          <div className="p-4 bg-[#FAF6EE] rounded-2xl border-2 border-[#1E5631]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#1E5631] text-white px-2.5 py-0.5 rounded-full">
                ✓ Serviceable Location
              </span>
              <span className="inline-flex items-center gap-1 bg-[#F5A623] text-[#1F110B] text-xs font-black px-3 py-0.5 rounded-full">
                <Truck className="w-3.5 h-3.5" /> {feedback?.days || currentLocation.estimate || '1-2 Days'}
              </span>
            </div>

            <div className="pt-1">
              <p className="text-sm sm:text-base font-black text-[#1F110B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E5631] shrink-0" />
                <span>
                  📍 {feedback?.area || currentLocation.area || currentLocation.city}, {feedback?.city || currentLocation.city} ({feedback?.state || currentLocation.state})
                </span>
              </p>
              <p className="text-xs font-mono font-bold text-[#4A3B32] mt-0.5">
                Pincode: <strong>{feedback?.pincode || currentLocation.pincode}</strong>
              </p>
            </div>

            <div className="pt-2 border-t border-[#E5D9C5] flex items-center justify-between text-xs font-extrabold text-[#1E5631]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Expected Delivery: By {feedback?.expectedDate || currentLocation.expectedDate || '2 Days'}
              </span>
              <span className="text-[#B45309]">COD Available ✓</span>
            </div>

            {feedback && !feedback.valid && (
              <div className="p-2.5 rounded-lg text-xs flex items-center gap-2 bg-red-50 text-red-800 border border-red-300 mt-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{feedback.message}</span>
              </div>
            )}
          </div>

          {/* Quick Select Popular Cities */}
          <div className="pt-1">
            <span className="text-[11px] font-extrabold text-[#4A3B32] uppercase tracking-wider block mb-2">
              Quick Check Popular Pincodes:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { pin: '332001', city: 'Sikar', days: '1 Day' },
                { pin: '302001', city: 'Jaipur', days: '1-2 Days' },
                { pin: '110001', city: 'New Delhi', days: '2-3 Days' },
                { pin: '400001', city: 'Mumbai', days: '3-4 Days' }
              ].map((item) => (
                <button
                  key={item.pin}
                  type="button"
                  onClick={() => handleQuickSelect(item.pin)}
                  className="p-2.5 border border-[#D5C7B8] rounded-xl text-left hover:bg-[#FAF6EE] hover:border-[#D97706] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold text-[#1F110B]"><strong>{item.city}</strong> ({item.pin})</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-black">{item.days}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={closeLocationModal}
            className="w-full bg-[#2D1810] hover:bg-[#4A2511] text-[#FBBF24] font-black text-xs py-3 rounded-xl cursor-pointer transition-colors"
          >
            Done ✓
          </button>
        </div>
      </div>
    </div>
  );
};
