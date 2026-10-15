import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_ORDERS = [
  {
    id: 'ORD-910452',
    orderId: 'ORD-910452',
    date: '13 Oct 2026',
    time: '08:30 AM',
    subtotal: 538,
    shipping: 0,
    discount: 40,
    total: 498,
    status: 'Out for Delivery',
    currentStep: 4,
    currentLocation: 'Sikar Local Delivery Hub (Near Kalyan Circle) — Delivery Partner Out on Route',
    statusText: 'Out for Delivery Today (Arriving by 02:00 PM)',
    trackingNumber: 'BD910452881IN',
    awb: 'BD910452881IN',
    courier: 'BlueDart Express Air',
    estimatedDelivery: 'Expected Today, 13 Oct 2026 by 02:00 PM',
    deliveryAddress: 'Mahesh Saini • H. No. 125, Ward No. 5, Near Old Bus Stand, Sikar, Rajasthan - 332001',
    trackingSteps: [
      { title: 'Order Confirmed at Sikar Kitchen', location: 'Marusthali Barni Kitchen, Sikar', desc: 'Fresh batch verified & allocated for packing', time: '11 Oct, 04:15 PM', done: true, current: false },
      { title: 'Triple-Sealed & Bubble-Packed', location: 'Sikar Packaging Unit', desc: '5-layer shockproof glass jar box sealed', time: '11 Oct, 07:30 PM', done: true, current: false },
      { title: 'In Transit via BlueDart Express', location: 'Jaipur–Sikar Highway Hub', desc: 'Parcel arrived at destination city sorting facility', time: '12 Oct, 09:20 PM', done: true, current: false },
      { title: 'Out for Delivery (Abhi Aapke Shehar Me Hai)', location: 'Near Kalyan Circle, Sikar (3.2 km away)', desc: 'Delivery partner Vikram Singh (+91 94140-88210) is on the way to your address', time: '13 Oct, 08:30 AM', done: true, current: true },
      { title: 'Delivered at Doorstep', location: 'Ward No. 5, Sikar', desc: 'Will be handed over safely with OTP verification', time: 'Expected by 2:00 PM', done: false, current: false }
    ],
    items: [
      {
        id: 'ker-sangri-achar',
        productId: 'ker-sangri-achar',
        name: 'Royal Marwari Ker Sangri Pickle',
        size: '500 g',
        weight: '500 g',
        price: 349,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-mixed-jar.jpg'
      },
      {
        id: 'aam-classic',
        productId: 'aam-classic',
        name: 'Classic Mango Pickle',
        size: '250 g',
        weight: '250 g',
        price: 149,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-mango-jar.jpg'
      }
    ],
    address: {
      fullName: 'Mahesh Saini',
      phone: '+91 9876543210',
      pincode: '332001',
      addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
      city: 'Sikar',
      state: 'Rajasthan',
      addressType: 'Home'
    },
    paymentMethod: 'UPI (PhonePe)'
  },
  {
    id: 'ORD-882914',
    orderId: 'ORD-882914',
    date: '12 Oct 2026',
    time: '11:15 AM',
    subtotal: 498,
    shipping: 0,
    discount: 0,
    total: 498,
    status: 'In Transit',
    currentStep: 3,
    currentLocation: 'Jaipur Regional Sorting Hub (NH-52) — Dispatched towards your city',
    statusText: 'Shipped via BlueDart Express (Expected Tomorrow)',
    trackingNumber: 'BD882914725IN',
    awb: 'BD882914725IN',
    courier: 'BlueDart Express Air',
    estimatedDelivery: 'Expected Delivery: 14 Oct 2026, by 04:00 PM',
    deliveryAddress: 'Mahesh Saini • H. No. 125, Ward No. 5, Near Old Bus Stand, Sikar, Rajasthan - 332001',
    trackingSteps: [
      { title: 'Order Confirmed at Sikar Kitchen', location: 'Marusthali Barni Kitchen, Sikar', desc: 'Fresh batch verified & allocated for packing', time: '12 Oct, 11:15 AM', done: true, current: false },
      { title: 'Triple-Sealed & Bubble-Packed', location: 'Sikar Packaging Unit', desc: '5-layer shockproof glass jar box sealed', time: '12 Oct, 03:40 PM', done: true, current: false },
      { title: 'In Transit (Jaipur Sorting Hub Par Pahunch Gaya Hai)', location: 'Jaipur Express Hub, Rajasthan', desc: 'Scanned at regional sorting hub & loaded for next-day delivery vehicle', time: '13 Oct, 06:20 AM', done: true, current: true },
      { title: 'Out for Delivery', location: 'Destination City Hub', desc: 'Courier partner will call before reaching gate', time: 'Expected 14 Oct Morning', done: false, current: false },
      { title: 'Delivered', location: 'Customer Doorstep', desc: 'Handed over safely at doorstep', time: 'Expected 14 Oct', done: false, current: false }
    ],
    items: [
      {
        id: 'aam-classic',
        productId: 'aam-classic',
        name: 'Classic Mango Pickle',
        size: '500 g',
        weight: '500 g',
        price: 249,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-mango-jar.jpg'
      },
      {
        id: 'nimbu-khatta-meetha',
        productId: 'nimbu-khatta-meetha',
        name: 'Sweet & Tangy Lemon Pickle',
        size: '500 g',
        weight: '500 g',
        price: 249,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-lemon-jar.jpg'
      }
    ],
    address: {
      fullName: 'Mahesh Saini',
      phone: '+91 9876543210',
      pincode: '332001',
      addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
      city: 'Sikar',
      state: 'Rajasthan',
      addressType: 'Home'
    },
    paymentMethod: 'UPI (PhonePe / GPay)'
  },
  {
    id: 'ORD-774120',
    orderId: 'ORD-774120',
    date: '28 Sep 2026',
    time: '05:30 PM',
    subtotal: 749,
    shipping: 0,
    discount: 100,
    total: 649,
    status: 'Delivered',
    currentStep: 5,
    currentLocation: 'Delivered at H. No. 125, Ward No. 5, Sikar (Received by Mahesh Saini)',
    statusText: 'Delivered on 01 Oct 2026',
    trackingNumber: 'DLV77412099IN',
    awb: 'DLV77412099IN',
    courier: 'Delhivery Surface Express',
    estimatedDelivery: 'Delivered on 01 Oct 2026 at 01:45 PM',
    deliveryAddress: 'Mahesh Saini • H. No. 125, Ward No. 5, Near Old Bus Stand, Sikar, Rajasthan - 332001',
    trackingSteps: [
      { title: 'Order Confirmed at Sikar Kitchen', location: 'Marusthali Barni Kitchen, Sikar', desc: '3-Jar Family Combo Box allocated', time: '28 Sep, 05:30 PM', done: true, current: false },
      { title: 'Packed in Heritage Box', location: 'Sikar Packaging Unit', desc: 'Checked for zero-leakage seal', time: '29 Sep, 10:00 AM', done: true, current: false },
      { title: 'Shipped via Delhivery', location: 'Rajasthan Transit Hub', desc: 'In transit across Rajasthan', time: '30 Sep, 08:15 AM', done: true, current: false },
      { title: 'Out for Delivery', location: 'Sikar Delivery Center', desc: 'Assigned to local Sikar delivery executive', time: '01 Oct, 09:30 AM', done: true, current: false },
      { title: 'Delivered Successfully', location: 'Ward No. 5, Near Old Bus Stand, Sikar', desc: 'Received by Mahesh Saini at doorstep', time: '01 Oct, 01:45 PM', done: true, current: true }
    ],
    items: [
      {
        id: 'lal-mirch-bharwa',
        productId: 'lal-mirch-bharwa',
        name: 'Stuffed Red Chilli Pickle',
        size: '500 g',
        weight: '500 g',
        price: 249,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-chilli-jar.jpg'
      },
      {
        id: 'garlic-lahsun',
        productId: 'garlic-lahsun',
        name: 'Traditional Garlic Pickle',
        size: '500 g',
        weight: '500 g',
        price: 249,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-garlic-jar.jpg'
      },
      {
        id: 'mix-pachranga',
        productId: 'mix-pachranga',
        name: 'Pachranga Mixed Pickle',
        size: '500 g',
        weight: '500 g',
        price: 251,
        quantity: 1,
        qty: 1,
        image: '/images/products/marusthali-mixed-jar.jpg'
      }
    ],
    address: {
      fullName: 'Mahesh Saini',
      phone: '+91 9876543210',
      pincode: '332001',
      addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
      city: 'Sikar',
      state: 'Rajasthan',
      addressType: 'Home'
    },
    paymentMethod: 'Cash on Delivery'
  }
];

const DEFAULT_ADDRESSES = [
  {
    id: 'addr_1',
    type: 'Home',
    label: 'Home (Primary)',
    isDefault: true,
    name: 'Mahesh Saini',
    fullName: 'Mahesh Saini',
    phone: '9876543210',
    street: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
    addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
    landmark: 'Near Old Bus Stand',
    city: 'Sikar',
    state: 'Rajasthan',
    pincode: '332001'
  },
  {
    id: 'addr_2',
    type: 'Office',
    label: 'Shop / Workshop',
    isDefault: false,
    name: 'Mahesh Saini',
    fullName: 'Mahesh Saini',
    phone: '9876543210',
    street: 'Shop No. 12, Bajaj Road, Near Kalyan Circle',
    addressLine: 'Shop No. 12, Bajaj Road, Near Kalyan Circle',
    landmark: 'Near Kalyan Circle',
    city: 'Sikar',
    state: 'Rajasthan',
    pincode: '332001'
  }
];

function normalizeOrderShape(ord) {
  if (!ord) return DEFAULT_ORDERS[0];
  const id = ord.id || ord.orderId || 'ORD-882914';
  const items = Array.isArray(ord.items) ? ord.items.map(it => ({
    ...it,
    productId: it.productId || it.id || 'aam-classic',
    weight: it.weight || it.size || '500 g',
    qty: it.qty || it.quantity || 1,
    price: Number(it.price) || 249,
    image: it.image || '/images/products/marusthali-mango-jar.jpg'
  })) : DEFAULT_ORDERS[0].items;

  const status = ord.status || 'In Transit';
  const defaultCurrentLocation =
    status === 'Delivered'
      ? 'Delivered safely at your doorstep'
      : status === 'Out for Delivery'
      ? 'Local City Delivery Hub — Delivery Partner Out on Route'
      : status === 'Order Placed'
      ? 'Marusthali Barni Kitchen, Sikar — Fresh Jars Being Packed'
      : 'Jaipur Regional Sorting Hub (NH-52) — In Transit to Your City';

  return {
    ...ord,
    id,
    orderId: id,
    date: ord.date || '12 Oct 2026',
    time: ord.time || '11:15 AM',
    status,
    currentLocation: ord.currentLocation || defaultCurrentLocation,
    paymentMethod: ord.paymentMethod || 'UPI',
    courier: ord.courier || 'BlueDart Express Air',
    awb: ord.awb || ord.trackingNumber || 'BD882914725IN',
    trackingNumber: ord.trackingNumber || ord.awb || 'BD882914725IN',
    estimatedDelivery: ord.estimatedDelivery || 'Expected within 2–3 days',
    deliveryAddress: ord.deliveryAddress || (ord.address ? `${ord.address.fullName || 'Mahesh Saini'} • ${ord.address.addressLine || ''}, ${ord.address.city || 'Sikar'}, ${ord.address.state || 'Rajasthan'} - ${ord.address.pincode || '332001'}` : 'H. No. 125, Ward No. 5, Near Old Bus Stand, Sikar, Rajasthan - 332001'),
    subtotal: ord.subtotal || ord.total || 498,
    shipping: ord.shipping ?? 0,
    discount: ord.discount ?? 0,
    total: ord.total || 498,
    trackingSteps: Array.isArray(ord.trackingSteps) && ord.trackingSteps.length > 0
      ? ord.trackingSteps
      : DEFAULT_ORDERS[1].trackingSteps,
    items
  };
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('marusthali_auth_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const [userOrders, setUserOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('marusthali_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map(o => o.id || o.orderId));
          const merged = [
            ...parsed.map(normalizeOrderShape),
            ...DEFAULT_ORDERS.filter(d => !existingIds.has(d.id))
          ];
          return merged;
        }
      }
      return DEFAULT_ORDERS;
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  });

  const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
  const [loyaltyCoins, setLoyaltyCoins] = useState(240);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('marusthali_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('marusthali_auth_user');
      }
    } catch (e) {
      console.error('Failed to sync auth user to localStorage', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('marusthali_orders', JSON.stringify(userOrders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage', e);
    }
  }, [userOrders]);

  const login = (phoneOrEmail, name = 'Mahesh Saini') => {
    const isPhone = /^[0-9+ ]+$/.test(phoneOrEmail);
    const user = {
      id: `usr_${Date.now()}`,
      name: name || 'Mahesh Saini',
      phone: isPhone ? phoneOrEmail.replace(/^\+91\s*/, '') : '9876543210',
      email: !isPhone ? phoneOrEmail : 'mahesh.saini@example.com',
      pincode: '332001',
      addressLine: 'H. No. 125, Ward No. 5, Near Old Bus Stand',
      city: 'Sikar, Rajasthan',
      state: 'Rajasthan',
      isLoggedIn: true,
      memberSince: 'Oct 2024',
      tier: 'Royal Patron',
      pickleCoins: 240
    };

    setCurrentUser(user);
    setIsAuthModalOpen(false);

    if (authSuccessCallback && typeof authSuccessCallback === 'function') {
      authSuccessCallback(user);
      setAuthSuccessCallback(null);
    }
    return user;
  };

  const register = (registrationData) => {
    const user = {
      id: `usr_${Date.now()}`,
      name: registrationData.name || 'Mahesh Saini',
      phone: registrationData.phone || '9876543210',
      email: registrationData.email || 'customer@marusthaliachar.com',
      pincode: registrationData.pincode || '332001',
      addressLine: registrationData.addressLine || 'Ward No. 5, Near Old Bus Stand',
      city: registrationData.city || 'Sikar, Rajasthan',
      state: registrationData.state || 'Rajasthan',
      isLoggedIn: true,
      memberSince: 'Oct 2026',
      tier: 'Royal Patron',
      pickleCoins: 240
    };

    setCurrentUser(user);
    setIsAuthModalOpen(false);

    if (authSuccessCallback && typeof authSuccessCallback === 'function') {
      authSuccessCallback(user);
      setAuthSuccessCallback(null);
    }
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => prev ? { ...prev, ...updatedFields } : {
      name: 'Mahesh Saini',
      phone: '9876543210',
      email: 'mahesh.saini@example.com',
      ...updatedFields
    });
  };

  const addAddress = (newAddr) => {
    const created = {
      ...newAddr,
      id: `addr_${Date.now()}`,
      fullName: newAddr.name || 'Mahesh Saini',
      addressLine: newAddr.street || ''
    };
    setAddresses(prev => created.isDefault ? [created, ...prev.map(a => ({ ...a, isDefault: false }))] : [...prev, created]);
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const addOrder = (orderData) => {
    const id = orderData.orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullOrder = normalizeOrderShape({
      ...orderData,
      id,
      orderId: id,
      date: orderData.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Order Placed',
      currentStep: 1
    });

    setUserOrders(prev => [fullOrder, ...prev]);
    return fullOrder;
  };

  const openAuthModal = (callback = null) => {
    if (callback) setAuthSuccessCallback(() => callback);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthSuccessCallback(null);
  };

  const normalizedOrders = (userOrders && userOrders.length > 0 ? userOrders : DEFAULT_ORDERS).map(normalizeOrderShape);
  const activeOrder = normalizedOrders[0];

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser,
        isLoggedIn: !!currentUser?.isLoggedIn,
        login,
        register,
        logout,
        updateProfile,
        userOrders: normalizedOrders,
        orders: normalizedOrders,
        addresses,
        loyaltyCoins,
        setLoyaltyCoins,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        activeOrder,
        addOrder,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
