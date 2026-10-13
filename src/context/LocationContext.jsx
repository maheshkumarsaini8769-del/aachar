import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

// Exact pincode & 3-digit prefix lookup for instant offline resolution + exact delivery days from Sikar, Rajasthan
const EXACT_PINCODE_MAP = {
  '332001': { area: 'Sikar Head Post Office', city: 'Sikar', state: 'Rajasthan', days: '1 Day (Same/Next Day)', minDays: 1, maxDays: 1 },
  '332024': { area: 'Piprali Road', city: 'Sikar', state: 'Rajasthan', days: '1 Day', minDays: 1, maxDays: 1 },
  '332027': { area: 'Fatehpur Road', city: 'Sikar', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '332301': { area: 'Fatehpur Shekhawati', city: 'Sikar', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '332311': { area: 'Laxmangarh', city: 'Sikar', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '332404': { area: 'Ringas', city: 'Sikar', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '332715': { area: 'Khatu Shyamji', city: 'Sikar', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '333001': { area: 'Jhunjhunu Bazaar', city: 'Jhunjhunu', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '333042': { area: 'Nawalgarh', city: 'Jhunjhunu', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '302001': { area: 'MI Road / Pink City', city: 'Jaipur', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '302016': { area: 'Bani Park', city: 'Jaipur', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '302020': { area: 'Mansarovar', city: 'Jaipur', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '302021': { area: 'Vaishali Nagar', city: 'Jaipur', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
  '342001': { area: 'Sardarpura', city: 'Jodhpur', state: 'Rajasthan', days: '2 Days', minDays: 2, maxDays: 2 },
  '334001': { area: 'KEM Road', city: 'Bikaner', state: 'Rajasthan', days: '2 Days', minDays: 2, maxDays: 2 },
  '313001': { area: 'City Palace Road', city: 'Udaipur', state: 'Rajasthan', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '324001': { area: 'Talwandi', city: 'Kota', state: 'Rajasthan', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '305001': { area: 'Civil Lines', city: 'Ajmer', state: 'Rajasthan', days: '2 Days', minDays: 2, maxDays: 2 },
  '110001': { area: 'Connaught Place', city: 'New Delhi', state: 'Delhi NCR', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '122001': { area: 'Sector 14 / Cyber Hub', city: 'Gurugram', state: 'Haryana', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '201301': { area: 'Sector 18', city: 'Noida', state: 'Uttar Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '380001': { area: 'Navrangpura', city: 'Ahmedabad', state: 'Gujarat', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '395001': { area: 'Athwalines', city: 'Surat', state: 'Gujarat', days: '3 Days', minDays: 3, maxDays: 3 },
  '400001': { area: 'Fort / South Mumbai', city: 'Mumbai', state: 'Maharashtra', days: '3-4 Days', minDays: 3, maxDays: 4 },
  '411001': { area: 'Camp / Koregaon Park', city: 'Pune', state: 'Maharashtra', days: '3-4 Days', minDays: 3, maxDays: 4 },
  '452001': { area: 'Vijay Nagar', city: 'Indore', state: 'Madhya Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
  '226001': { area: 'Hazratganj', city: 'Lucknow', state: 'Uttar Pradesh', days: '3 Days', minDays: 3, maxDays: 3 },
  '560001': { area: 'MG Road / Indiranagar', city: 'Bengaluru', state: 'Karnataka', days: '3-4 Days', minDays: 3, maxDays: 4 },
  '500001': { area: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', days: '3-4 Days', minDays: 3, maxDays: 4 },
  '600001': { area: 'Anna Nagar / T. Nagar', city: 'Chennai', state: 'Tamil Nadu', days: '4-5 Days', minDays: 4, maxDays: 5 },
  '700001': { area: 'Park Street', city: 'Kolkata', state: 'West Bengal', days: '3-5 Days', minDays: 3, maxDays: 5 }
};

// Prefix-based fallback for any 6-digit Indian pincode
const resolveByPrefix = (pin) => {
  const p3 = pin.slice(0, 3);
  const p2 = pin.slice(0, 2);

  // Rajasthan districts (301 - 345)
  const rajasthanMap = {
    '332': { city: 'Sikar', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '333': { city: 'Jhunjhunu', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '331': { city: 'Churu', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '302': { city: 'Jaipur', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '303': { city: 'Jaipur Rural', days: '2 Days', minDays: 2, maxDays: 2 },
    '301': { city: 'Alwar', days: '2 Days', minDays: 2, maxDays: 2 },
    '304': { city: 'Tonk / Sawai Madhopur', days: '2 Days', minDays: 2, maxDays: 2 },
    '305': { city: 'Ajmer', days: '2 Days', minDays: 2, maxDays: 2 },
    '306': { city: 'Pali', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '307': { city: 'Sirohi / Mount Abu', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '311': { city: 'Bhilwara', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '312': { city: 'Chittorgarh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '313': { city: 'Udaipur', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '321': { city: 'Bharatpur', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '324': { city: 'Kota', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '334': { city: 'Bikaner', days: '2 Days', minDays: 2, maxDays: 2 },
    '335': { city: 'Sri Ganganagar / Hanumangarh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '341': { city: 'Nagaur', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '342': { city: 'Jodhpur', days: '2 Days', minDays: 2, maxDays: 2 },
    '344': { city: 'Barmer', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '345': { city: 'Jaisalmer', days: '3 Days', minDays: 3, maxDays: 3 }
  };

  if (rajasthanMap[p3]) {
    return {
      area: `${rajasthanMap[p3].city} Area`,
      city: rajasthanMap[p3].city,
      state: 'Rajasthan',
      days: rajasthanMap[p3].days,
      minDays: rajasthanMap[p3].minDays,
      maxDays: rajasthanMap[p3].maxDays
    };
  }

  // State-level resolution by 2-digit prefix
  const stateByP2 = {
    '11': { city: 'New Delhi', state: 'Delhi NCR', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '12': { city: 'Gurugram / Rohtak', state: 'Haryana', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '13': { city: 'Karnal / Ambala', state: 'Haryana', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '14': { city: 'Ludhiana / Amritsar', state: 'Punjab', days: '3 Days', minDays: 3, maxDays: 3 },
    '15': { city: 'Bathinda', state: 'Punjab', days: '3 Days', minDays: 3, maxDays: 3 },
    '16': { city: 'Chandigarh', state: 'Chandigarh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '17': { city: 'Shimla / Solan', state: 'Himachal Pradesh', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '18': { city: 'Jammu', state: 'Jammu & Kashmir', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '19': { city: 'Srinagar', state: 'Jammu & Kashmir', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '20': { city: 'Noida / Agra', state: 'Uttar Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '21': { city: 'Prayagraj', state: 'Uttar Pradesh', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '22': { city: 'Lucknow / Varanasi', state: 'Uttar Pradesh', days: '3 Days', minDays: 3, maxDays: 3 },
    '24': { city: 'Dehradun / Bareilly', state: 'Uttarakhand / UP', days: '3 Days', minDays: 3, maxDays: 3 },
    '25': { city: 'Meerut', state: 'Uttar Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '28': { city: 'Agra / Mathura', state: 'Uttar Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '30': { city: 'Jaipur Region', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '31': { city: 'Udaipur Region', state: 'Rajasthan', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '32': { city: 'Kota Region', state: 'Rajasthan', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '33': { city: 'Shekhawati / Bikaner', state: 'Rajasthan', days: '1-2 Days', minDays: 1, maxDays: 2 },
    '34': { city: 'Marwar / Jodhpur', state: 'Rajasthan', days: '2 Days', minDays: 2, maxDays: 2 },
    '36': { city: 'Rajkot / Jamnagar', state: 'Gujarat', days: '3 Days', minDays: 3, maxDays: 3 },
    '37': { city: 'Kutch / Bhuj', state: 'Gujarat', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '38': { city: 'Ahmedabad / Gandhinagar', state: 'Gujarat', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '39': { city: 'Surat / Vadodara', state: 'Gujarat', days: '3 Days', minDays: 3, maxDays: 3 },
    '40': { city: 'Mumbai / Thane', state: 'Maharashtra', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '41': { city: 'Pune / Nashik', state: 'Maharashtra', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '42': { city: 'Nashik / Jalgaon', state: 'Maharashtra', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '44': { city: 'Nagpur', state: 'Maharashtra', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '45': { city: 'Indore / Ujjain', state: 'Madhya Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '46': { city: 'Bhopal', state: 'Madhya Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '47': { city: 'Gwalior', state: 'Madhya Pradesh', days: '2-3 Days', minDays: 2, maxDays: 3 },
    '48': { city: 'Jabalpur', state: 'Madhya Pradesh', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '49': { city: 'Raipur', state: 'Chhattisgarh', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '50': { city: 'Hyderabad', state: 'Telangana', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '51': { city: 'Tirupati / Kurnool', state: 'Andhra Pradesh', days: '4 Days', minDays: 4, maxDays: 4 },
    '52': { city: 'Vijayawada / Guntur', state: 'Andhra Pradesh', days: '4 Days', minDays: 4, maxDays: 4 },
    '53': { city: 'Visakhapatnam', state: 'Andhra Pradesh', days: '4 Days', minDays: 4, maxDays: 4 },
    '56': { city: 'Bengaluru', state: 'Karnataka', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '57': { city: 'Mysuru / Mangaluru', state: 'Karnataka', days: '4 Days', minDays: 4, maxDays: 4 },
    '60': { city: 'Chennai', state: 'Tamil Nadu', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '64': { city: 'Coimbatore', state: 'Tamil Nadu', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '67': { city: 'Kozhikode', state: 'Kerala', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '68': { city: 'Kochi', state: 'Kerala', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '69': { city: 'Thiruvananthapuram', state: 'Kerala', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '70': { city: 'Kolkata', state: 'West Bengal', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '75': { city: 'Bhubaneswar', state: 'Odisha', days: '4 Days', minDays: 4, maxDays: 4 },
    '78': { city: 'Guwahati', state: 'Assam', days: '4-5 Days', minDays: 4, maxDays: 5 },
    '80': { city: 'Patna', state: 'Bihar', days: '3-4 Days', minDays: 3, maxDays: 4 },
    '83': { city: 'Ranchi / Jamshedpur', state: 'Jharkhand', days: '3-4 Days', minDays: 3, maxDays: 4 }
  };

  if (stateByP2[p2]) {
    return {
      area: `${stateByP2[p2].city}`,
      city: stateByP2[p2].city,
      state: stateByP2[p2].state,
      days: stateByP2[p2].days,
      minDays: stateByP2[p2].minDays,
      maxDays: stateByP2[p2].maxDays
    };
  }

  return {
    area: `Pin ${pin}`,
    city: 'Pan-India Serviceable Area',
    state: 'India',
    days: '3-5 Days',
    minDays: 3,
    maxDays: 5
  };
};

// Format expected delivery date string based on min/max days from today
const getExpectedDeliveryDate = (maxDays = 2) => {
  const target = new Date();
  target.setDate(target.getDate() + maxDays);
  return target.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('marusthali_location');
      return saved ? JSON.parse(saved) : {
        name: 'Mahesh Saini',
        area: 'Sikar Head Post Office',
        addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
        city: 'Sikar',
        state: 'Rajasthan',
        pincode: '332001',
        phone: '+91 9876543210',
        estimate: '1 Day (Same/Next Day)',
        expectedDate: getExpectedDeliveryDate(1)
      };
    } catch (e) {
      return {
        name: 'Mahesh Saini',
        area: 'Sikar Head Post Office',
        addressLine: 'H. No. 125, Ward No. 5',
        city: 'Sikar',
        state: 'Rajasthan',
        pincode: '332001',
        phone: '+91 9876543210',
        estimate: '1 Day (Same/Next Day)',
        expectedDate: getExpectedDeliveryDate(1)
      };
    }
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('marusthali_location', JSON.stringify(currentLocation));
    } catch (e) {
      console.error(e);
    }
  }, [currentLocation]);

  // Synchronous instant check
  const checkPincode = (pin) => {
    const clean = (pin || '').trim();
    if (!/^\d{6}$/.test(clean)) {
      return { valid: false, message: 'Please enter a valid 6-digit Indian pincode' };
    }

    const base = EXACT_PINCODE_MAP[clean] || resolveByPrefix(clean);
    const expectedDate = getExpectedDeliveryDate(base.maxDays || 3);

    return {
      valid: true,
      pincode: clean,
      area: base.area,
      city: base.city,
      state: base.state,
      days: base.days,
      expectedDate,
      serviceable: true,
      cod: true,
      message: `📍 ${base.city}, ${base.state} • Delivery in ${base.days} (By ${expectedDate})`
    };
  };

  // Async live lookup via India Post API to get exact Post Office & District name for ANY Indian pincode
  const lookupPincodeLive = async (pin) => {
    const syncRes = checkPincode(pin);
    if (!syncRes.valid) return syncRes;

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${syncRes.pincode}`);
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const state = po.State || syncRes.state;
        const city = po.District || syncRes.city;
        const area = po.Name || syncRes.area;

        // Calculate accurate delivery days based on state/district distance from Sikar, Rajasthan
        let days = syncRes.days;
        let maxDays = 3;
        if (state === 'Rajasthan') {
          if (['Sikar', 'Jhunjhunu', 'Churu', 'Jaipur', 'Nagaur'].includes(city)) {
            days = '1-2 Days';
            maxDays = 2;
          } else {
            days = '2 Days';
            maxDays = 2;
          }
        } else if (['Delhi', 'Haryana', 'Punjab', 'Gujarat', 'Uttar Pradesh', 'Madhya Pradesh'].includes(state)) {
          days = '2-3 Days';
          maxDays = 3;
        } else if (['Maharashtra', 'Karnataka', 'Telangana', 'West Bengal', 'Bihar'].includes(state)) {
          days = '3-4 Days';
          maxDays = 4;
        } else {
          days = '4-5 Days';
          maxDays = 5;
        }

        const expectedDate = getExpectedDeliveryDate(maxDays);
        return {
          valid: true,
          pincode: syncRes.pincode,
          area,
          city,
          state,
          days,
          expectedDate,
          serviceable: true,
          cod: true,
          message: `📍 ${area}, ${city} (${state}) • Delivery in ${days} (By ${expectedDate})`
        };
      }
    } catch (err) {
      // Fallback to instant offline prefix resolution if offline or API slow
    }

    return syncRes;
  };

  const updateLocation = (newLoc) => {
    setCurrentLocation(prev => ({ ...prev, ...newLoc }));
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        isLocationModalOpen,
        openLocationModal: () => setIsLocationModalOpen(true),
        closeLocationModal: () => setIsLocationModalOpen(false),
        checkPincode,
        lookupPincodeLive,
        updateLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
