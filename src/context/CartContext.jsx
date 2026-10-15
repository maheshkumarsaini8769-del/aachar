import React, { createContext, useContext, useState, useEffect } from 'react';
import { validCoupons } from '../data/offers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('marusthali_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'aam-classic-500g',
          productId: 'aam-classic',
          name: 'Classic Mango Pickle',
          size: '500 g',
          price: 249,
          mrp: 299,
          quantity: 1,
          image: '/images/products/jar-mango-classic.jpg'
        },
        {
          id: 'nimbu-khatta-meetha-500g',
          productId: 'nimbu-khatta-meetha',
          name: 'Traditional Lemon Pickle',
          size: '500 g',
          price: 249,
          mrp: 299,
          quantity: 1,
          image: '/images/products/card-nimbu.jpg'
        },
        {
          id: 'garlic-lahsun-500g',
          productId: 'garlic-lahsun',
          name: 'Traditional Garlic Pickle',
          size: '500 g',
          price: 249,
          mrp: 299,
          quantity: 1,
          image: '/images/products/jar-lahsun-classic.jpg'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('marusthali_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedSize = '500 g', qty = 1, customNote = '') => {
    // Determine price based on selected size
    let price = product.price;
    let mrp = product.mrp;
    if (product.packSizes && product.packSizes.length > 0) {
      const match = product.packSizes.find(s => s.size === selectedSize);
      if (match) {
        price = match.price;
        mrp = match.mrp;
      }
    }

    const cleanedNote = (customNote || '').trim();
    const itemKey = cleanedNote ? `${product.id}-${selectedSize}-${cleanedNote}` : `${product.id}-${selectedSize}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + qty, customNote: cleanedNote || item.customNote }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: product.id,
            name: product.name,
            size: selectedSize,
            price: price,
            mrp: mrp,
            quantity: qty,
            image: product.image,
            customNote: cleanedNote || null,
            isCombo: product.isCombo || false,
            comboItems: product.comboItems || null
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const addCustomComboToCart = (comboData) => {
    const itemKey = `combo-${Date.now()}`;
    setCartItems(prev => [
      ...prev,
      {
        id: itemKey,
        productId: 'custom-combo',
        name: `Custom ${comboData.packSize} Combo Box`,
        size: `${comboData.flavours.length} x 400g Jars (${comboData.packagingTheme || 'Royal Box'})`,
        price: comboData.price,
        mrp: comboData.mrp,
        quantity: 1,
        image: '/images/products/combo-3pack-heritage.jpg',
        isCombo: true,
        comboFlavours: comboData.flavours,
        packagingTheme: comboData.packagingTheme || 'Royal Maroon',
        giftNote: comboData.giftNote || null
      }
    ]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedCoupon(null);
    setCouponError('');
  };

  const applyCoupon = (code) => {
    const upper = (code || '').trim().toUpperCase();
    setCouponError('');
    if (!upper) return false;

    if (validCoupons[upper]) {
      const rule = validCoupons[upper];
      setSelectedCoupon({ code: upper, ...rule });
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try DESI10, FESTIVE15, or FREESHIP');
      return false;
    }
  };

  const removeCoupon = () => {
    setSelectedCoupon(null);
    setCouponError('');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.mrp || item.price) * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic Auto-Validation: Coupon is only applied if subtotal meets minOrder!
  // If subtotal drops below minOrder (e.g. user deletes an item), it turns into pendingCoupon and discount is revoked.
  // If user adds items to reach minOrder, it auto-applies without any re-clicks needed!
  let appliedCoupon = null;
  let pendingCoupon = null;

  if (selectedCoupon && cartItems.length > 0) {
    if (subtotal >= (selectedCoupon.minOrder || 0)) {
      appliedCoupon = selectedCoupon;
    } else {
      pendingCoupon = selectedCoupon;
    }
  }

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon && appliedCoupon.discount) {
    discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
  }

  // Shipping logic: Free if subtotal >= 499 or FREESHIP coupon applied
  const isFreeShipping = subtotal >= 499 || appliedCoupon?.freeShipping;
  const shippingFee = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : 50);

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        totalMrp,
        discountAmount,
        shippingFee,
        isFreeShipping,
        finalTotal,
        appliedCoupon,
        pendingCoupon,
        couponError,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        addCustomComboToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
