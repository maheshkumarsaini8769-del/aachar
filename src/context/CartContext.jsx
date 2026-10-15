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

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('marusthali_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedSize = '500 g', qty = 1, customNote = '', selectedBox = null) => {
    // Determine price based on selected box or selected size
    let price = product.price;
    let mrp = product.mrp;
    let displaySize = selectedSize;
    let boxType = null;

    if (selectedBox) {
      price = selectedBox.price;
      mrp = selectedBox.mrp || Math.round(selectedBox.price * 1.2);
      displaySize = `${selectedBox.boxType} (${selectedBox.packCount} Jars)`;
      boxType = selectedBox.boxType;
    } else if (product.packSizes && product.packSizes.length > 0) {
      const match = product.packSizes.find(s => s.size === selectedSize);
      if (match) {
        price = match.price;
        mrp = match.mrp;
      }
    }

    const cleanedNote = (customNote || '').trim();
    const itemKey = boxType
      ? `${product.id}-box-${boxType}-${cleanedNote}`
      : cleanedNote ? `${product.id}-${displaySize}-${cleanedNote}` : `${product.id}-${displaySize}`;

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
            size: displaySize,
            boxType: boxType,
            price: price,
            mrp: mrp,
            quantity: qty,
            image: product.image,
            customNote: cleanedNote || null,
            isCombo: product.isCombo || !!boxType,
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
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const upper = (code || '').trim().toUpperCase();
    setCouponError('');
    if (!upper) return false;

    if (validCoupons[upper]) {
      const rule = validCoupons[upper];
      if (subtotal < rule.minOrder) {
        setCouponError(`Minimum order amount of ₹${rule.minOrder} required for ${upper}`);
        return false;
      }
      setAppliedCoupon({ code: upper, ...rule });
      return true;
    } else {
      setCouponError('Invalid coupon code. Try DESI10 or FESTIVE15');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.mrp || item.price) * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount) {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
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
