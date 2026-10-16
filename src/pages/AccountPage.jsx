import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  User, 
  Award, 
  LogOut, 
  CheckCircle2, 
  Truck, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Plus, 
  Edit2, 
  Trash2, 
  Home, 
  Briefcase,
  Copy,
  Check,
  Gift,
  ShieldCheck,
  Phone,
  MessageCircle,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Settings,
  Bell,
  Lock,
  Smartphone,
  CreditCard,
  Globe,
  Headphones,
  Send,
  Rotate3d
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { MangoAchar3DAdminPanel } from '../components/admin/MangoAchar3DAdminPanel';

export const AccountPage = ({ initialTab = 'menu', initialOrderId = null, onNavigate }) => {
  const { tab: paramTab } = useParams();
  const effectiveTab = paramTab || initialTab;

  const {
    user: rawUser,
    currentUser,
    isLoggedIn,
    openAuthModal,
    orders: rawOrders,
    userOrders,
    addresses: rawAddresses,
    loyaltyCoins = 240,
    logout = () => {},
    updateProfile = () => {},
    addAddress = () => {},
    deleteAddress = () => {},
    setDefaultAddress = () => {}
  } = useAuth() || {};

  const user = rawUser || currentUser;
  const orders = Array.isArray(rawOrders) ? rawOrders : Array.isArray(userOrders) ? userOrders : [];
  const addresses = Array.isArray(rawAddresses) ? rawAddresses : [];
  const { addToCart, openCart } = useCart();

  // 'menu' shows ONLY the clean list of pages first; clicking a card opens that specific page's details
  const [activePage, setActivePage] = useState(() => {
    if (initialOrderId) return 'orders';
    if (effectiveTab && effectiveTab !== 'settings' && effectiveTab !== 'menu') return effectiveTab;
    return 'menu';
  });

  useEffect(() => {
    if (paramTab && paramTab !== activePage) {
      setActivePage(paramTab);
    }
  }, [paramTab]);

  const handleSelectSubpage = (pageId) => {
    if (pageId === 'orders') setSelectedOrder(null);
    setActivePage(pageId);
    if (onNavigate) {
      onNavigate('account', { tab: pageId });
    }
  };

  const handleBackToSettingsMenu = () => {
    setActivePage('menu');
    setSelectedOrder(null);
    if (onNavigate) {
      onNavigate('account', { tab: 'menu' });
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Mahesh Saini',
    email: user?.email || 'mahesh.saini@example.com',
    phone: user?.phone || '9876543210',
    altPhone: user?.altPhone || '9414012345',
    city: user?.city || 'Sikar, Rajasthan',
    dob: user?.dob || '1998-08-15'
  });
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Address Modal State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    name: user?.name || 'Mahesh Saini',
    phone: user?.phone || '9876543210',
    street: '',
    landmark: '',
    city: '',
    state: 'Rajasthan',
    pincode: '',
    isDefault: false
  });

  // Clean Delivery, Payment & App Settings State
  const [settingsState, setSettingsState] = useState({
    deliverySlot: 'Morning (9 AM – 12 PM)',
    preferredCourier: 'BlueDart Air Express',
    deliveryInstruction: 'Call on mobile before reaching gate',
    defaultPaymentMethod: 'UPI Instant Pay',
    refundUpiId: 'maheshsaini@ybl',
    autoApplyCoins: true,
    language: 'Hinglish (Hindi + English)',
    whatsappOrderUpdates: true,
    orderSmsAlerts: true,
    promoOffersAlerts: true,
    twoFactorOtp: true,
    otherDevicesLoggedOut: false
  });
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Support System State
  const [supportTickets, setSupportTickets] = useState([
    {
      id: 'TCK-8492',
      subject: 'Delivery Timing Request for Order #ORD-98234',
      category: 'Order & Delivery Tracking',
      orderId: 'ORD-98234',
      status: 'Resolved',
      date: '10 Oct 2026',
      message: 'Please ask the courier partner to deliver between 10 AM and 2 PM.',
      reply: 'Namaste Mahesh ji! Humne BlueDart delivery partner ko update kar diya hai. Aapka parcel subah 10–2 baje ke beech hi deliver hoga. 🙏'
    }
  ]);
  const [ticketForm, setTicketForm] = useState({
    category: 'Order & Delivery Tracking',
    orderId: orders?.[0]?.id || 'ORD-98234',
    subject: '',
    message: ''
  });
  const [ticketSubmittedMsg, setTicketSubmittedMsg] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState(user?.phone || '9876543210');
  const [callbackRequested, setCallbackRequested] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      setActivePage('orders');
      const found = orders.find(o => o.id === initialOrderId || o.orderId === initialOrderId);
      setSelectedOrder(found || orders[0] || null);
    } else if (initialTab === 'menu' || initialTab === 'settings') {
      setActivePage('menu');
      setSelectedOrder(null);
    } else if (initialTab) {
      setActivePage(initialTab);
      setSelectedOrder(null);
    }
  }, [initialTab, initialOrderId]);

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.pincode) return;
    addAddress(addressForm);
    setShowAddressForm(false);
    setAddressForm({
      type: 'Home',
      name: user?.name || 'Mahesh Saini',
      phone: user?.phone || '9876543210',
      street: '',
      landmark: '',
      city: '',
      state: 'Rajasthan',
      pincode: '',
      isDefault: false
    });
  };

  const handleReorder = (order) => {
    (order.items || []).forEach(item => {
      const product = products.find(p => p.id === item.productId) || products[0];
      if (product) {
        addToCart(product, item.weight || '500g', item.qty || 1);
      }
    });
    openCart();
  };

  const handleSaveSettings = () => {
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  const handleCreateSupportTicket = (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.message.trim()) return;
    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketForm.subject,
      category: ticketForm.category,
      orderId: ticketForm.orderId,
      status: 'In Progress',
      date: 'Just Now',
      message: ticketForm.message,
      reply: 'Namaste! Aapka support ticket register ho gaya hai. Hamari Sikar Support Team 15 minute me WhatsApp/Call par sampark karegi.'
    };
    setSupportTickets([newTicket, ...supportTickets]);
    setTicketForm({ ...ticketForm, subject: '', message: '' });
    setTicketSubmittedMsg(true);
    setTimeout(() => setTicketSubmittedMsg(false), 3500);
  };

  const handleRequestCallback = (e) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackRequested(true);
    setTimeout(() => setCallbackRequested(false), 4500);
  };

  const activeUser = user || {
    name: 'Mahesh Saini',
    phone: '9876543210',
    email: 'mahesh.saini@example.com',
    memberSince: 'Oct 2024',
    tier: 'Royal Patron',
    city: 'Sikar, Rajasthan'
  };

  // The 6 Clean Pages shown in the main Settings Hub
  const settingsPages = [
    {
      id: 'orders',
      title: 'My Orders & Live Tracking',
      desc: 'Track your active Achar parcels, AWB number & reorder past boxes',
      badge: `${orders.length} Orders`,
      icon: Package,
      iconBg: 'bg-amber-100 text-[#B45309]'
    },
    {
      id: 'profile',
      title: 'Personal Profile Details',
      desc: 'Edit your name, phone number, email address & birthday',
      badge: 'Verified',
      icon: User,
      iconBg: 'bg-emerald-100 text-[#1E5631]'
    },
    {
      id: 'addresses',
      title: 'Saved Delivery Addresses',
      desc: 'Manage your Home & Office addresses for 1-click checkout',
      badge: `${addresses.length} Saved`,
      icon: MapPin,
      iconBg: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'preferences',
      title: 'Delivery, Payment & App Settings',
      desc: 'Delivery time slot, UPI refund ID, language & notification alerts',
      badge: 'Preferences',
      icon: Settings,
      iconBg: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'support',
      title: '24×7 Support & Help System',
      desc: 'Raise a support ticket, request a 5-min callback or chat on WhatsApp',
      badge: '24×7 Live',
      icon: Headphones,
      iconBg: 'bg-emerald-100 text-[#1E5631]'
    },
    {
      id: 'loyalty',
      title: 'Pickle Coins & Rewards',
      desc: 'View your Pickle Coins balance & unlock member discount coupons',
      badge: `${loyaltyCoins} Coins`,
      icon: Award,
      iconBg: 'bg-amber-100 text-[#B45309]'
    },
    {
      id: '3d-admin',
      title: 'Mango Achar 3D Experience Manager',
      desc: 'Configure 3D viewer, upload GLB/GLTF models, angles, markers and preview live',
      badge: 'Admin 3D',
      icon: Rotate3d,
      iconBg: 'bg-orange-100 text-orange-800'
    }
  ];

  const currentPageObj = settingsPages.find(p => p.id === activePage);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-[#FAF7F2]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DDCD] shadow-lg text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF5EC] border border-[#E5D9C5] flex items-center justify-center text-[#B45309] mx-auto shadow-xs">
            <User className="w-8 h-8 stroke-[1.8]" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block">
              Marusthali Member Access
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1F110B]">
              Sign In to Your Account
            </h2>
            <p className="text-xs sm:text-sm text-[#6D5344] font-medium leading-relaxed max-w-sm mx-auto">
              Please log in or register with your mobile number to view your placed orders, live courier tracking, saved addresses, and Pickle Coins.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal?.(() => setActivePage('menu'))}
              className="w-full bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Log In / Register with OTP</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-[#FAF5EC] hover:bg-[#F3E8D3] border border-[#E0D2BF] text-[#2D1810] py-3 rounded-full font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 text-[#8C6542]" />
              <span>← Return to Home Page</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-20">
      
      {/* Clean Top Header Bar with Prominent Back to Home Button */}
      <div className="bg-gradient-to-r from-[#2D1810] via-[#4A2511] to-[#2D1810] text-white py-5 sm:py-7 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5A623]">
        <div className="max-w-5xl mx-auto">
          
          {/* Top Navigation Row: Back to Home + Back to Settings Menu */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/15">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Home Back Button (Super prominent) */}
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09210] text-[#1F110B] font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95 border-2 border-amber-300"
                aria-label="Back to Home Page"
              >
                <Home className="w-4 h-4 stroke-[2.5]" />
                <span>Home</span>
              </button>

              {/* Back to All Settings (when inside a subpage) */}
              {activePage !== 'menu' && (
                <button
                  onClick={handleBackToSettingsMenu}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/30 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>Settings Hub</span>
                </button>
              )}
            </div>

            <button
              onClick={() => onNavigate('all-products')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl border border-white/20"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
              <span>Shop All Pickles →</span>
            </button>
          </div>

          {/* Compact User Summary Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#D97706] flex items-center justify-center text-[#2D1810] font-serif font-extrabold text-2xl shadow-md border-2 border-amber-200 shrink-0">
                {activeUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-[#F5A623] text-[#1F110B] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> {activeUser.tier || 'Royal Patron'}
                  </span>
                  <span className="text-xs text-amber-200 font-bold">
                    • {loyaltyCoins} Pickle Coins
                  </span>
                </div>
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  {activePage === 'menu' ? `Profile & Account (${activeUser.name})` : currentPageObj?.title}
                </h1>
                <p className="text-xs text-amber-100/90 font-medium mt-0.5">
                  +91 {activeUser.phone} • {activeUser.city || 'Sikar, Rajasthan'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Container (Single Clean Column — No Duplicate Menus!) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ================================================================= */}
        {/* STEP 1: CLEAN SETTINGS HUB MENU (ONLY PAGES SHOWN FIRST)          */}
        {/* ================================================================= */}
        {activePage === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDCD] shadow-2xs">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F110B]">
                  Select a Page to Open Details
                </h2>
                <p className="text-xs sm:text-sm text-[#4A3B32] font-medium mt-0.5">
                  Tap on any section below to view or update your details
                </p>
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2 bg-[#1E5631] hover:bg-[#164225] text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>← Back to Home Page</span>
              </button>
            </div>

            {/* 6 Clean Page Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settingsPages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => handleSelectSubpage(page.id)}
                    className="group bg-white hover:bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#E8DDCD] hover:border-[#D97706] shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${page.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-serif text-base sm:text-lg font-bold text-[#1F110B] group-hover:text-[#B45309] transition-colors">
                            {page.title}
                          </h3>
                          {page.badge && (
                            <span className="text-[10px] font-black uppercase bg-[#FAF6EE] border border-[#D5C7B8] text-[#2D1810] px-2 py-0.5 rounded-full">
                              {page.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#4A3B32] font-medium mt-1 leading-relaxed">
                          {page.desc}
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#FAF6EE] group-hover:bg-[#F5A623] text-[#2D1810] flex items-center justify-center shrink-0 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clean Bottom Bar: Quick Home + Sign Out */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DDCD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF6EE] hover:bg-[#F5EFE6] text-[#1F110B] border border-[#D5C7B8] text-xs font-extrabold px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#B45309]" />
                <span>← Return to Home Page</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  onNavigate('home');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-extrabold px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 1: MY ORDERS & LIVE TRACKING (STEP A: ALL ORDERS LIST,       */}
        {/*         STEP B: CLICKED ORDER OPENS WITH LIVE TRACKING)           */}
        {/* ================================================================= */}
        {activePage === 'orders' && (
          <div className="space-y-6">
            {/* Back Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                {selectedOrder ? (
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="inline-flex items-center gap-1.5 bg-[#2D1810] hover:bg-[#3D2218] text-white px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer shadow-xs"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#F5A623]" />
                    <span>← Back to All Orders ({orders.length})</span>
                  </button>
                ) : null}
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    setActivePage('menu');
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Home Page</span>
                </button>
              </div>
              <button
                onClick={() => onNavigate('all-products')}
                className="inline-flex items-center gap-1.5 bg-[#1E5631] text-white text-xs font-extrabold px-3.5 py-2 rounded-xl cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Order Fresh Achar
              </button>
            </div>

            {/* ============================================================= */}
            {/* STEP A: ALL ORDERS LIST (SHOWN FIRST WHEN NO ORDER IS OPEN)   */}
            {/* ============================================================= */}
            {!selectedOrder && (
              <div className="space-y-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDCD] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F110B]">
                      All Your Placed Orders ({orders.length})
                    </h2>
                    <p className="text-xs text-[#4A3B32] font-medium mt-0.5">
                      Kisi bhi order par click/tap karein — woh order open ho jayega aur dikhayega ki aapka parcel kahan tak aa gaya hai
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => {
                    const isDelivered = ord.status === 'Delivered';
                    const isOutForDelivery = ord.status === 'Out for Delivery';
                    return (
                      <div
                        key={ord.id}
                        onClick={() => setSelectedOrder(ord)}
                        className="group bg-white hover:bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#E8DDCD] hover:border-[#D97706] shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F2E9DC]">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="font-mono text-xs sm:text-sm font-black text-[#1F110B] bg-[#F5EFE6] border border-[#D5C7B8] px-3 py-1 rounded-lg">
                              Order #{ord.id}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full ${
                              isDelivered
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : isOutForDelivery
                                ? 'bg-amber-200 text-[#2D1810] border border-[#D97706]'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}>
                              {isDelivered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                              <span>{ord.status}</span>
                            </span>
                            <span className="text-xs text-[#4A3B32] font-bold">
                              • Placed on {ord.date} {ord.time ? `at ${ord.time}` : ''}
                            </span>
                          </div>

                          <div className="text-left sm:text-right">
                            <span className="text-xs text-[#4A3B32] font-bold mr-1.5">Total:</span>
                            <span className="text-base sm:text-lg font-black text-[#1E5631]">₹{ord.total}</span>
                          </div>
                        </div>

                        {/* Items Preview Inside Order Card */}
                        <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-3">
                            {(ord.items || []).map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 bg-[#FAF6EE] px-3 py-2 rounded-xl border border-[#E8DDCD]">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-amber-200 shrink-0"
                                />
                                <div>
                                  <p className="text-xs font-extrabold text-[#1F110B] line-clamp-1">{item.name}</p>
                                  <p className="text-[11px] font-bold text-[#4A3B32]">
                                    {item.weight} × {item.qty}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="shrink-0 flex items-center justify-end">
                            <span className="inline-flex items-center gap-1.5 bg-[#2D1810] group-hover:bg-[#1E5631] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors shadow-xs">
                              <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                              <span>Open & Track Where It Reached →</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP B: SELECTED ORDER DETAILS + LIVE TRACKING TIMELINE       */}
            {/* ============================================================= */}
            {selectedOrder && (
              <div className="bg-white rounded-2xl shadow-md border-2 border-[#D97706] overflow-hidden">
                {/* Order Top Header */}
                <div className="bg-gradient-to-r from-[#2D1810] via-[#4A2511] to-[#2D1810] text-white p-5 sm:p-6 border-b border-[#E8DDCD] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-md text-amber-200">
                        Selected Order Details
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                        Order #{selectedOrder.id || selectedOrder.orderId}
                      </h3>
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-[#F5A623] text-[#1F110B]">
                        {selectedOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-amber-100 font-bold mt-2">
                      Placed on {selectedOrder.date} • Delivering to: <span className="text-white">{selectedOrder.deliveryAddress || selectedOrder.address}</span>
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 flex items-center gap-3 shrink-0">
                    <Truck className="w-5 h-5 text-[#F5A623]" />
                    <div className="text-xs">
                      <p className="text-amber-200 font-bold">{selectedOrder.courier}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono font-extrabold text-white">AWB: {selectedOrder.awb || selectedOrder.trackingId}</span>
                        <button 
                          onClick={() => handleCopy(selectedOrder.awb || selectedOrder.trackingId, 'awb')}
                          className="text-[#F5A623] cursor-pointer"
                          title="Copy Tracking Number"
                        >
                          {copiedId === 'awb' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlighted Live "Kahan Tak Aa Gaya Hai" Current Location Banner */}
                <div className="bg-[#FFFBEB] border-b border-[#FDE68A] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] block">
                        📍 Aapka Order Abhi Kahan Tak Aa Gaya Hai (Current Live Status)
                      </span>
                      <p className="text-sm sm:text-base font-black text-[#1F110B] mt-0.5">
                        {selectedOrder.currentLocation || 'Jaipur Regional Sorting Hub — Dispatched towards your city'}
                      </p>
                      <p className="text-xs font-bold text-[#1E5631] mt-0.5">
                        ⏱️ {selectedOrder.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Tracking Stepper (Step-by-Step Checkpoints) */}
                <div className="p-5 sm:p-6 border-b border-[#E8DDCD]">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1F110B] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D97706]" /> Step-by-Step Parcel Journey (Sikar Se Aapke Ghar Tak)
                    </h4>
                    <span className="text-xs font-extrabold text-[#1E5631] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      {selectedOrder.status}
                    </span>
                  </div>

                  <div className="relative space-y-5 before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DDCD]">
                    {(selectedOrder.trackingSteps || []).map((step, index) => (
                      <div key={index} className={`relative flex items-start gap-3.5 pl-0.5 ${step.current ? 'bg-amber-50/80 -mx-2 p-2.5 rounded-xl border border-amber-200' : ''}`}>
                        <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${
                          step.current 
                            ? 'bg-[#F5A623] border-[#2D1810] text-[#1F110B] ring-4 ring-amber-200' 
                            : step.done 
                              ? 'bg-[#1E5631] border-[#1E5631] text-white' 
                              : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                          {step.done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="w-2 h-2 rounded-full bg-gray-300" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-xs sm:text-sm font-extrabold text-[#1F110B]">{step.title}</p>
                              {step.current && (
                                <span className="text-[10px] font-black uppercase bg-[#2D1810] text-[#F5A623] px-2 py-0.5 rounded-full">
                                  📍 Parcel Yahan Hai
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-bold text-[#4A3B32]">{step.time}</span>
                          </div>
                          {step.location && (
                            <p className="text-[11px] font-extrabold text-[#B45309] mt-0.5">
                              📍 Location: {step.location}
                            </p>
                          )}
                          <p className="text-xs text-[#4A3B32] mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ordered Jars List */}
                <div className="p-5 sm:p-6 bg-[#FAF6EE]/50">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2D1810] mb-3">
                    Items in this Order ({(selectedOrder.items || []).length})
                  </h4>
                  <div className="space-y-2.5">
                    {(selectedOrder.items || []).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#E8DDCD]">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-amber-100" />
                          <div>
                            <h5 className="text-xs sm:text-sm font-extrabold text-[#1F110B]">{item.name}</h5>
                            <p className="text-xs text-[#4A3B32] font-bold">
                              Size: {item.weight} • Qty: {item.qty}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-black text-[#1E5631]">₹{item.price * item.qty}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8DDCD] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-black text-[#1F110B]">
                        Total Paid: <span className="text-[#1E5631]">₹{selectedOrder.total}</span>
                      </p>
                      <p className="text-[11px] font-bold text-[#4A3B32]">
                        Payment Mode: {selectedOrder.paymentMethod || 'UPI'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="inline-flex items-center gap-1.5 bg-white text-[#1F110B] border border-[#D5C7B8] text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Orders
                      </button>
                      <button
                        onClick={() => handleReorder(selectedOrder)}
                        className="inline-flex items-center gap-1.5 bg-[#2D1810] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reorder
                      </button>
                      <button
                        onClick={() => setActivePage('support')}
                        className="inline-flex items-center gap-1.5 bg-white text-[#1F110B] border border-[#D5C7B8] text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        <Headphones className="w-3.5 h-3.5 text-[#B45309]" /> Need Help?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 2: PERSONAL PROFILE DETAILS                                  */}
        {/* ================================================================= */}
        {activePage === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Home Page</span>
                </button>
              </div>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="inline-flex items-center gap-1.5 bg-[#2D1810] text-white text-xs font-extrabold px-4 py-2 rounded-xl cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DDCD]">
              <h2 className="font-serif text-xl font-bold text-[#1F110B] mb-1">Personal Profile Details</h2>
              <p className="text-xs text-[#4A3B32] font-medium mb-5">
                Update your contact information for order tracking and invoices
              </p>

              {profileSavedMsg && (
                <div className="mb-5 bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Profile details saved successfully!
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-sm font-bold text-[#1F110B] disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">Mobile Number (WhatsApp)</label>
                    <input
                      type="tel"
                      disabled={!isEditingProfile}
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-sm font-bold text-[#1F110B] disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      disabled={!isEditingProfile}
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-sm font-bold text-[#1F110B] disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">City / District</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-sm font-bold text-[#1F110B] disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-[#1E5631] text-white text-xs font-extrabold px-6 py-2.5 rounded-xl cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gray-100 text-gray-700 text-xs font-extrabold px-5 py-2.5 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 3: SAVED DELIVERY ADDRESSES                                  */}
        {/* ================================================================= */}
        {activePage === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Home Page</span>
                </button>
              </div>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="inline-flex items-center gap-1.5 bg-[#2D1810] text-white text-xs font-extrabold px-4 py-2 rounded-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#D97706] space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1F110B]">Add New Delivery Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Address Type</label>
                    <select
                      value={addressForm.type}
                      onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office / Shop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Receiver Name</label>
                    <input
                      type="text"
                      required
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">House / Street / Landmark</label>
                    <input
                      type="text"
                      required
                      placeholder="Plot no, street, landmark"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">City & Pincode</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-1/2 px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Pincode"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-1/2 px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 text-xs font-bold text-gray-600">
                    Cancel
                  </button>
                  <button type="submit" className="bg-[#1E5631] text-white px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">
                    Save Address
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white rounded-2xl p-5 border-2 border-[#E8DDCD] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-[#F5EFE6] text-[#1F110B] px-3 py-1 rounded-lg">
                        {addr.type === 'Home' ? <Home className="w-3.5 h-3.5 text-[#B45309]" /> : <Briefcase className="w-3.5 h-3.5 text-[#B45309]" />}
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-extrabold text-[#1F110B]">{addr.name}</h4>
                    <p className="text-xs text-[#4A3B32] mt-1">
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-xs font-bold text-[#1F110B] mt-1">Phone: +91 {addr.phone}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    {!addr.isDefault ? (
                      <button onClick={() => setDefaultAddress(addr.id)} className="text-xs font-extrabold text-[#1E5631] cursor-pointer">
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-800">✓ Primary Address</span>
                    )}
                    <button onClick={() => deleteAddress(addr.id)} className="text-xs font-bold text-red-600 flex items-center gap-1 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 4: CLEAN DELIVERY, PAYMENT & APP SETTINGS                    */}
        {/* ================================================================= */}
        {activePage === 'preferences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Home Page</span>
                </button>
              </div>
              <button
                onClick={handleSaveSettings}
                className="bg-[#1E5631] hover:bg-[#164225] text-white text-xs font-extrabold px-5 py-2 rounded-xl cursor-pointer"
              >
                Save Settings ✓
              </button>
            </div>

            {settingsSavedMsg && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Your preferences have been saved!
              </div>
            )}

            {/* Simple Section 1: Delivery & Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DDCD] space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8DDCD]">
                <Truck className="w-5 h-5 text-[#B45309]" />
                <h3 className="font-serif text-lg font-bold text-[#1F110B]">Delivery & Payment Preferences</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">Preferred Delivery Time</label>
                  <select
                    value={settingsState.deliverySlot}
                    onChange={(e) => setSettingsState({ ...settingsState, deliverySlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B] bg-[#FAF6EE]"
                  >
                    <option value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</option>
                    <option value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</option>
                    <option value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">Default Payment Mode</label>
                  <select
                    value={settingsState.defaultPaymentMethod}
                    onChange={(e) => setSettingsState({ ...settingsState, defaultPaymentMethod: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B] bg-[#FAF6EE]"
                  >
                    <option value="UPI Instant Pay">UPI Instant Pay (GPay / PhonePe)</option>
                    <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                    <option value="Card / NetBanking">Debit / Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">Instant Refund UPI ID</label>
                  <input
                    type="text"
                    value={settingsState.refundUpiId}
                    onChange={(e) => setSettingsState({ ...settingsState, refundUpiId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B] bg-[#FAF6EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D1810] mb-1.5">App Language</label>
                  <select
                    value={settingsState.language}
                    onChange={(e) => setSettingsState({ ...settingsState, language: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B] bg-[#FAF6EE]"
                  >
                    <option value="Hinglish (Hindi + English)">Hinglish (Hindi + English)</option>
                    <option value="English">English</option>
                    <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simple Section 2: Notifications & Security */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DDCD] space-y-3">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8DDCD]">
                <Bell className="w-5 h-5 text-[#B45309]" />
                <h3 className="font-serif text-lg font-bold text-[#1F110B]">Notifications & Security</h3>
              </div>

              {[
                { key: 'whatsappOrderUpdates', title: 'WhatsApp Live Order Tracking', desc: 'Get dispatch photo & live tracking link on WhatsApp' },
                { key: 'orderSmsAlerts', title: 'SMS Delivery Alerts', desc: 'Receive OTP and out-for-delivery SMS alerts' },
                { key: 'autoApplyCoins', title: 'Auto-Apply Pickle Coins at Checkout', desc: 'Automatically use available Pickle Coins for extra discount' },
                { key: 'twoFactorOtp', title: '2-Step OTP Login Protection', desc: 'Require mobile OTP verification when signing in' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DDCD]">
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#1F110B]">{item.title}</p>
                    <p className="text-[11px] text-[#4A3B32]">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettingsState(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                      settingsState[item.key] ? 'bg-[#1E5631]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      settingsState[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 5: 24×7 SUPPORT & TICKET SYSTEM                              */}
        {/* ================================================================= */}
        {activePage === 'support' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Home Page</span>
                </button>
              </div>
              <span className="text-xs font-extrabold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
                ● Sikar Support Online
              </span>
            </div>

            {/* Direct WhatsApp & Call Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/919876543210?text=Khamma%20Ghani!%20I%20need%20help%20with%20my%20Marusthali%20Achar%20order."
                target="_blank"
                rel="noreferrer"
                className="bg-white p-5 rounded-2xl border-2 border-emerald-200 hover:border-[#1E5631] flex items-center gap-4 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1E5631] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1F110B]">Chat on WhatsApp (2-Min Reply)</h3>
                  <p className="text-xs text-[#4A3B32] mt-0.5">Instant help with order tracking or damaged jar replacement</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="bg-white p-5 rounded-2xl border-2 border-amber-200 hover:border-[#D97706] flex items-center gap-4 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1F110B]">Call Support: +91 98765 43210</h3>
                  <p className="text-xs text-[#4A3B32] mt-0.5">Speak directly with our Sikar dispatch team (9 AM – 9 PM)</p>
                </div>
              </a>
            </div>

            {/* Raise Support Ticket + 5-Min Callback */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form onSubmit={handleCreateSupportTicket} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E8DDCD] space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1F110B]">Raise a Support Ticket</h3>

                {ticketSubmittedMsg && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs font-extrabold">
                    ✓ Support ticket submitted! Our team will update you within 15 minutes.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Issue Type</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                    >
                      <option>Order & Delivery Tracking</option>
                      <option>Damaged Jar Replacement</option>
                      <option>Payment / Refund Help</option>
                      <option>Bulk / Gift Order Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Related Order</label>
                    <select
                      value={ticketForm.orderId}
                      onChange={(e) => setTicketForm({ ...ticketForm, orderId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                    >
                      {orders.map(o => (
                        <option key={o.id} value={o.id}>Order #{o.id} (₹{o.total})</option>
                      ))}
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    placeholder="Short summary of your issue..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D1810] mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5C7B8] text-xs font-bold text-[#1F110B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E5631] hover:bg-[#164225] text-white text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit Support Ticket
                </button>
              </form>

              <div className="lg:col-span-5 space-y-4">
                <form onSubmit={handleRequestCallback} className="bg-[#2D1810] text-white p-5 rounded-2xl space-y-3">
                  <span className="text-[10px] font-black uppercase bg-[#F5A623] text-[#1F110B] px-2.5 py-0.5 rounded-full">
                    Instant Phone Support
                  </span>
                  <h4 className="font-serif text-lg font-bold">Request a 5-Minute Callback</h4>
                  <p className="text-xs text-amber-100">
                    Enter your mobile number and our Sikar support team will call you within 5 minutes.
                  </p>
                  <input
                    type="tel"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2 rounded-xl bg-white text-[#1F110B] text-xs font-extrabold"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#F5A623] text-[#1F110B] font-black text-xs py-2.5 rounded-xl cursor-pointer"
                  >
                    Call Me in 5 Minutes 📞
                  </button>
                  {callbackRequested && (
                    <p className="text-xs font-extrabold text-emerald-300">
                      ✓ Callback scheduled for +91 {callbackPhone}!
                    </p>
                  )}
                </form>

                {/* Recent Tickets */}
                <div className="bg-white p-4 rounded-2xl border border-[#E8DDCD] space-y-2.5">
                  <h5 className="text-xs font-extrabold uppercase text-[#1F110B]">
                    Your Support Tickets ({supportTickets.length})
                  </h5>
                  {supportTickets.slice(0, 2).map(t => (
                    <div key={t.id} className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DDCD] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-[#B45309]">#{t.id}</span>
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                          {t.status}
                        </span>
                      </div>
                      <p className="font-extrabold text-[#1F110B] mt-1">{t.subject}</p>
                      <p className="text-[11px] text-[#1E5631] font-bold mt-1">💬 {t.reply}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 6: PICKLE COINS & REWARDS                                    */}
        {/* ================================================================= */}
        {activePage === 'loyalty' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Home Page</span>
                </button>
              </div>
              <button
                onClick={() => onNavigate('all-products')}
                className="bg-[#F5A623] text-[#1F110B] text-xs font-black px-4 py-2 rounded-xl cursor-pointer"
              >
                Redeem Coins on Pickles →
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#2D1810] via-[#4A2511] to-[#2D1810] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 bg-[#F5A623] text-[#1F110B] text-xs font-black uppercase px-3 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5" /> Marusthali Achar Rewards
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2">
                  {loyaltyCoins} Pickle Coins Available (Worth ₹{loyaltyCoins})
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 mt-1">
                  1 Pickle Coin = ₹1 Instant Discount at Checkout.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DDCD]">
              <h3 className="font-serif text-lg font-bold text-[#1F110B] mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#B45309]" /> Member Discount Coupons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { code: 'RAJWADI15', title: 'Flat 15% OFF on Heritage Combos', desc: 'Valid on orders above ₹799' },
                  { code: 'DESIGHAR100', title: 'Flat ₹100 OFF on 1Kg Glass Barnis', desc: 'Applicable on all 1Kg Pickle Jars' }
                ].map((cpn) => (
                  <div key={cpn.code} className="border-2 border-dashed border-[#D97706] bg-[#FAF6EE] rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs font-black bg-[#2D1810] text-[#F5A623] px-2.5 py-1 rounded">
                        {cpn.code}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#1F110B] mt-2">{cpn.title}</h4>
                      <p className="text-xs text-[#4A3B32] mt-0.5">{cpn.desc}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(cpn.code, cpn.code)}
                      className="shrink-0 bg-white text-[#1F110B] border border-[#D5C7B8] px-3 py-2 rounded-lg text-xs font-extrabold cursor-pointer"
                    >
                      {copiedId === cpn.code ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PAGE 7: MANGO ACHAR 3D EXPERIENCE MANAGER (ADMIN PANEL)           */}
        {/* ================================================================= */}
        {activePage === '3d-admin' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DDCD]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] border border-[#D5C7B8] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Settings</span>
                </button>
                <button
                  onClick={() => onNavigate('product-detail', { productId: 'aam-classic' })}
                  className="inline-flex items-center gap-1.5 bg-[#F5A623]/20 hover:bg-[#F5A623]/35 border border-[#D97706] px-3.5 py-2 rounded-xl text-xs font-extrabold text-[#1F110B] cursor-pointer"
                >
                  <Rotate3d className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>View Live Mango Achar Page →</span>
                </button>
              </div>
            </div>

            <MangoAchar3DAdminPanel />
          </div>
        )}

      </div>
    </div>
  );
};

export default AccountPage;
