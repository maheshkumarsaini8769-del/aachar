import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { CartDrawer } from './components/common/CartDrawer';
import { LocationModal } from './components/common/LocationModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AuthModal } from './components/common/AuthModal';
import { AiAssistantWidget } from './components/common/AiAssistantWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { AllCategoriesPage } from './pages/AllCategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComboBuilderPage } from './pages/ComboBuilderPage';
import { FestiveCollectionPage } from './pages/FestiveCollectionPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { StoreLocationPage } from './pages/StoreLocationPage';
import { OffersPage } from './pages/OffersPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { PolicyPage } from './pages/PolicyPage';

// Scroll to top helper strictly on genuine route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [placedOrders, setPlacedOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('marusthali_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Calculate currentView for backward compatibility with Header, MobileBottomNav, etc.
  const currentView = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/products')) return 'all-products';
    if (path === '/categories') return 'all-categories';
    if (path.startsWith('/category')) return 'category';
    if (path.startsWith('/product/')) return 'product-detail';
    if (path.startsWith('/combo-builder')) return 'combo-builder';
    if (path.startsWith('/festive')) return 'festive';
    if (path.startsWith('/cart')) return 'cart';
    if (path.startsWith('/checkout')) return 'checkout';
    if (path.startsWith('/order-success')) return 'order-success';
    if (path.startsWith('/reviews')) return 'reviews';
    if (path.startsWith('/stores')) return 'stores';
    if (path.startsWith('/offers')) return 'offers';
    if (path.startsWith('/our-story')) return 'our-story';
    if (path.startsWith('/wishlist')) return 'wishlist';
    if (path.startsWith('/account')) return 'account';
    if (path.startsWith('/policy')) return 'policy';
    if (path.startsWith('/faq')) return 'faq';
    return 'home';
  }, [location.pathname]);

  // Backward compatible navigateTo function that updates the real URL in browser
  const navigateTo = (view, params = {}) => {
    switch (view) {
      case 'home':
        navigate('/');
        break;
      case 'all-products':
      case 'products':
        navigate('/products');
        break;
      case 'all-categories':
      case 'categories':
        navigate('/categories');
        break;
      case 'category':
        navigate(`/category/${params.categoryId || 'mango'}`);
        break;
      case 'product-detail':
        navigate(`/product/${params.productId || 'aam-classic'}`);
        break;
      case 'combo-builder':
        navigate('/combo-builder', { state: params });
        break;
      case 'festive':
        navigate('/festive');
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'checkout':
        navigate('/checkout');
        break;
      case 'order-success':
        navigate('/order-success', { state: params });
        break;
      case 'track-order':
        navigate('/account/orders', { state: params });
        break;
      case 'reviews':
        navigate('/reviews', { state: params });
        break;
      case 'stores':
        navigate('/stores');
        break;
      case 'offers':
        navigate('/offers');
        break;
      case 'our-story':
        navigate('/our-story');
        break;
      case 'wishlist':
        navigate('/wishlist');
        break;
      case 'account':
        if (params.tab && params.tab !== 'menu') {
          navigate(`/account/${params.tab}`, { state: params });
        } else {
          navigate('/account', { state: params });
        }
        break;
      case 'policy':
        navigate(`/policy/${params.policyType || 'shipping'}`);
        break;
      case 'faq':
        navigate('/faq');
        break;
      default:
        navigate('/');
        break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderPlaced = (orderData) => {
    setPlacedOrders(prev => {
      const updated = [orderData, ...prev];
      try {
        localStorage.setItem('marusthali_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <LocationProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-transparent text-brand-brown">
              {/* Top Announcement Strip */}
              <AnnouncementBar onNavigate={navigateTo} />

              {/* Main Sticky Header */}
              <Header currentView={currentView} onNavigate={navigateTo} />

              {/* Main Page Content Body routed with real URLs */}
              <main className="flex-1">
                <Routes>
                  {/* Home Route */}
                  <Route 
                    path="/" 
                    element={<HomePage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* All Products Route */}
                  <Route 
                    path="/products" 
                    element={<AllProductsPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* All Categories Route */}
                  <Route 
                    path="/categories" 
                    element={<AllCategoriesPage onNavigate={navigateTo} />} 
                  />

                  {/* Category Single Route */}
                  <Route 
                    path="/category/:categoryId" 
                    element={<CategoryPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* Product Detail Route */}
                  <Route 
                    path="/product/:productId" 
                    element={<ProductDetailPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* Combo Builder Route */}
                  <Route 
                    path="/combo-builder" 
                    element={<ComboBuilderPage onNavigate={navigateTo} viewParams={location.state || {}} />} 
                  />

                  {/* Festive Collection Route */}
                  <Route 
                    path="/festive" 
                    element={<FestiveCollectionPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* Cart Route */}
                  <Route 
                    path="/cart" 
                    element={<CartPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* Checkout Route */}
                  <Route 
                    path="/checkout" 
                    element={<CheckoutPage onNavigate={navigateTo} onOrderPlaced={handleOrderPlaced} />} 
                  />

                  {/* Order Success Route */}
                  <Route 
                    path="/order-success" 
                    element={
                      <OrderSuccessPage 
                        orderId={location.state?.orderId || 'ORD' + Math.floor(100000 + Math.random() * 900000)} 
                        orderSummary={location.state?.orderSummary} 
                        onNavigate={navigateTo} 
                      />
                    } 
                  />

                  {/* Account / Settings Hub Routes */}
                  <Route 
                    path="/account" 
                    element={
                      <AccountPage 
                        initialTab="menu" 
                        onNavigate={navigateTo} 
                      />
                    } 
                  />
                  <Route 
                    path="/account/:tab" 
                    element={
                      <AccountPage 
                        initialTab="menu" 
                        initialOrderId={location.state?.activeOrderId || location.state?.orderId || null} 
                        onNavigate={navigateTo} 
                      />
                    } 
                  />

                  {/* Reviews Route */}
                  <Route 
                    path="/reviews" 
                    element={<ReviewsPage onNavigate={navigateTo} viewParams={location.state || {}} />} 
                  />

                  {/* Store Locations Route */}
                  <Route 
                    path="/stores" 
                    element={<StoreLocationPage onNavigate={navigateTo} />} 
                  />

                  {/* Offers Route */}
                  <Route 
                    path="/offers" 
                    element={<OffersPage onNavigate={navigateTo} />} 
                  />

                  {/* Our Story Route */}
                  <Route 
                    path="/our-story" 
                    element={<OurStoryPage onNavigate={navigateTo} />} 
                  />

                  {/* Wishlist Route */}
                  <Route 
                    path="/wishlist" 
                    element={<WishlistPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />} 
                  />

                  {/* Policies Route */}
                  <Route 
                    path="/policy/:policyType" 
                    element={<PolicyPage onNavigate={navigateTo} />} 
                  />
                  <Route 
                    path="/policy" 
                    element={<PolicyPage policyType="shipping" onNavigate={navigateTo} />} 
                  />
                  <Route 
                    path="/faq" 
                    element={<PolicyPage policyType="shipping" onNavigate={navigateTo} />} 
                  />

                  {/* Catch-all redirect to Home */}
                  <Route 
                    path="*" 
                    element={<Navigate to="/" replace />} 
                  />
                </Routes>
              </main>

              {/* Comprehensive FarmDidi-style Footer */}
              <Footer onNavigate={navigateTo} />

              {/* Mobile Bottom Navigation Bar */}
              <MobileBottomNav currentView={currentView} onNavigate={navigateTo} />

              {/* Global Sliding Cart Drawer */}
              <CartDrawer onNavigate={navigateTo} />

              {/* Global Pincode Location Modal */}
              <LocationModal />

              {/* Global Login / Registration Modal */}
              <AuthModal />

              {/* Quick View Product Modal */}
              {quickViewProduct && (
                <QuickViewModal
                  product={quickViewProduct}
                  onClose={() => setQuickViewProduct(null)}
                  onNavigate={navigateTo}
                />
              )}

              {/* Floating Fake AI Assistant Widget (Bottom Right) */}
              <AiAssistantWidget onNavigate={navigateTo} />
            </div>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </LocationProvider>
  );
}

export default App;
