export const offers = [
  {
    id: 'b3g1',
    title: 'Buy 3 Get 1 Free',
    hindiTitle: 'Buy 3 Get 1 Complimentary',
    tag: 'Limited Time Deal',
    code: 'BUY3GET1',
    description: 'Add any 4 achar jars to your cart, and the 4th jar is completely on us!',
    minItems: 4,
    discountPercent: 25,
    bannerImage: '/images/banners/special-offers-hero.jpg',
    bgColor: 'from-amber-50 to-orange-100',
    borderColor: 'border-amber-300'
  },
  {
    id: 'combo15',
    title: 'Combo Packs Save 15%',
    hindiTitle: '15% Off On Combo Boxes',
    tag: 'Bestseller Offer',
    code: 'COMBO15',
    description: 'Save an extra 15% when you build your own pickle combo or purchase festive gift boxes.',
    minItems: 1,
    discountPercent: 15,
    bannerImage: '/images/banners/combo-signature-box-hero.jpg',
    bgColor: 'from-emerald-50 to-teal-100',
    borderColor: 'border-emerald-300'
  },
  {
    id: 'prepaid10',
    title: '10% Extra on Prepaid Orders',
    hindiTitle: 'Instant 10% Off On Prepaid',
    tag: 'Instant Savings',
    code: 'PREPAID10',
    description: 'Pay via UPI, Cards, or Net Banking and receive instant 10% cashback off your total order.',
    discountPercent: 10,
    bannerImage: '/images/banners/festive-banner.jpg',
    bgColor: 'from-amber-100 to-yellow-200',
    borderColor: 'border-yellow-400'
  },
  {
    id: 'festive20',
    title: 'Festive Celebration: Flat 20% Off',
    hindiTitle: 'Festive Season - Flat 20% Off',
    tag: 'Festive Season',
    code: 'FESTIVE20',
    description: 'Flat 20% discount on orders above ₹999 on all Festive Achar Gift Hampers.',
    minAmount: 999,
    discountPercent: 20,
    bannerImage: '/images/banners/festive-collection-hero.jpg',
    bgColor: 'from-rose-50 to-amber-100',
    borderColor: 'border-rose-300'
  }
];

export const validCoupons = {
  'DESI10': { discount: 10, minOrder: 300, desc: '10% Off on your order' },
  'FESTIVE15': { discount: 15, minOrder: 500, desc: '15% Off Festive special' },
  'PREPAID10': { discount: 10, minOrder: 0, desc: '10% Prepaid special savings' },
  'BUY3GET1': { discount: 25, minOrder: 600, desc: '25% Equivalent Buy 3 Get 1' },
  'FREESHIP': { discount: 0, freeShipping: true, minOrder: 299, desc: 'Free Express Shipping' }
};
