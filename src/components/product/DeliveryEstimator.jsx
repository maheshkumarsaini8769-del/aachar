import React, { useState, useEffect } from 'react';
import { MapPin, Truck, CheckCircle2, Calendar, AlertCircle } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

export const DeliveryEstimator = () => {
  const { currentLocation, checkPincode, lookupPincodeLive, updateLocation } = useLocation();
  const [pin, setPin] = useState(currentLocation.pincode || '332001');
  const [result, setResult] = useState(() => checkPincode(currentLocation.pincode || '332001'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentLocation?.pincode) {
      setPin(currentLocation.pincode);
      setResult(checkPincode(currentLocation.pincode));
    }
  }, [currentLocation?.pincode]);

  const runCheck = async (targetPin) => {
    const clean = (targetPin || '').trim();
    const syncRes = checkPincode(clean);
    setResult(syncRes);

    if (syncRes.valid) {
      setLoading(true);
      const liveRes = await lookupPincodeLive(clean);
      setLoading(false);
      setResult(liveRes);
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

  const handleCheck = (e) => {
    e.preventDefault();
    runCheck(pin);
  };

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(val);
    if (val.length === 6) {
      runCheck(val);
    }
  };

  return (
    <div className="bg-[#FAF6EE] p-3.5 sm:p-4 rounded-2xl border-2 border-[#E5D9C5] space-y-3">
      <div className="flex items-center justify-between text-xs font-extrabold text-[#1F110B]">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
          <span>Check Delivery Location & Days (Enter Pincode):</span>
        </span>
        <span className="text-[10px] text-[#1E5631] font-black bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Free Delivery ₹499+
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="w-4 h-4 text-[#6B5744] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter 6-digit Pincode (e.g. 332001)"
            className="w-full bg-white border border-[#D5C7B8] focus:border-[#D97706] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-black font-mono text-[#1F110B] tracking-wider focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2D1810] hover:bg-[#4A2511] text-[#FBBF24] px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer shrink-0"
        >
          {loading ? 'Checking...' : 'Check Pin'}
        </button>
      </form>

      {/* Location & Delivery Days Card */}
      {result && (
        result.valid ? (
          <div className="bg-white p-3 rounded-xl border border-emerald-300 shadow-2xs space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#1F110B]">
                <CheckCircle2 className="w-4 h-4 text-[#1E5631] shrink-0" />
                <span>
                  📍 {result.area && result.area !== result.city ? `${result.area}, ` : ''}
                  {result.city}, {result.state} ({result.pincode})
                </span>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#1E5631] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
                <Truck className="w-3 h-3" /> {result.days}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-[#4A3B32] pt-1 border-t border-gray-100">
              <span className="flex items-center gap-1 text-[#1E5631] font-extrabold">
                <Calendar className="w-3.5 h-3.5" />
                Expected Delivery: <strong>By {result.expectedDate}</strong>
              </span>
              <span className="text-[#B45309] font-extrabold">
                ✓ Cash on Delivery Available
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 text-red-900 border border-red-200 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{result.message}</span>
          </div>
        )
      )}
    </div>
  );
};
