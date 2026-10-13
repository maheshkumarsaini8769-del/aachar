import React, { useState, useEffect } from 'react';
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
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { StoreLocationPage } from './pages/StoreLocationPage';
import { OffersPage } from './pages/OffersPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { PolicyPage } from './pages/PolicyPage';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [placedOrders, setPlacedOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('marusthali_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const navigateTo = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
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
            <div className="flex flex-col min-h-screen bg-brand-bg text-brand-brown">
            {/* Top Announcement Strip */}
            <AnnouncementBar onNavigate={navigateTo} />

            {/* Main Sticky Header */}
            <Header currentView={currentView} onNavigate={navigateTo} />

            {/* Main Page Content Body */}
            <main className="flex-1">
              {currentView === 'home' && (
                <HomePage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />
              )}

              {currentView === 'all-products' && (
                <AllProductsPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />
              )}

              {currentView === 'all-categories' && (
                <AllCategoriesPage onNavigate={navigateTo} />
              )}

              {currentView === 'category' && (
                <CategoryPage 
                  categoryId={viewParams.categoryId || 'mango'} 
                  onNavigate={navigateTo} 
                  onQuickView={setQuickViewProduct} 
                />
              )}

              {currentView === 'product-detail' && (
                <ProductDetailPage 
                  productId={viewParams.productId || 'aam-classic'} 
                  onNavigate={navigateTo} 
                  onQuickView={setQuickViewProduct} 
                />
              )}

              {currentView === 'combo-builder' && (
                <ComboBuilderPage onNavigate={navigateTo} viewParams={viewParams} />
              )}

              {currentView === 'festive' && (
                <FestiveCollectionPage 
                  onNavigate={navigateTo} 
                  onQuickView={setQuickViewProduct} 
                />
              )}

              {currentView === 'cart' && (
                <CartPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />
              )}

              {currentView === 'checkout' && (
                <CheckoutPage onNavigate={navigateTo} onOrderPlaced={handleOrderPlaced} />
              )}

              {currentView === 'order-success' && (
                <OrderSuccessPage 
                  orderId={viewParams.orderId} 
                  orderSummary={viewParams.orderSummary} 
                  onNavigate={navigateTo} 
                />
              )}

              {currentView === 'track-order' && (
                <AccountPage 
                  onNavigate={navigateTo} 
                  initialTab="orders" 
                  initialOrderId={viewParams.orderId || null} 
                />
              )}

              {currentView === 'reviews' && (
                <ReviewsPage onNavigate={navigateTo} viewParams={viewParams} />
              )}

              {currentView === 'stores' && (
                <StoreLocationPage onNavigate={navigateTo} />
              )}

              {currentView === 'offers' && (
                <OffersPage onNavigate={navigateTo} />
              )}

              {currentView === 'our-story' && (
                <OurStoryPage onNavigate={navigateTo} />
              )}

              {currentView === 'wishlist' && (
                <WishlistPage onNavigate={navigateTo} onQuickView={setQuickViewProduct} />
              )}

              {currentView === 'account' && (
                <AccountPage 
                  onNavigate={navigateTo} 
                  initialTab={viewParams.tab || 'menu'} 
                  initialOrderId={viewParams.activeOrderId || null} 
                />
              )}

              {currentView === 'policy' && (
                <PolicyPage policyType={viewParams.policyType || 'shipping'} onNavigate={navigateTo} />
              )}

              {currentView === 'faq' && (
                <PolicyPage policyType="shipping" onNavigate={navigateTo} />
              )}
            </main>

            {/* Comprehensive Footer */}
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
