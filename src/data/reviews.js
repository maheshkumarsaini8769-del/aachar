export const initialReviews = [
  {
    id: 'rev-1',
    productId: 'aam-classic',
    userName: 'Priya Sharma',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    comment: 'Authentic homemade taste just like home. The mango pickle is extraordinarily delicious. The packaging was top-notch with a completely leak-proof glass jar.',
    helpfulCount: 42,
    images: ['/images/products/achar-bowl-serving.jpg', '/images/products/jar-mango-classic.jpg']
  },
  {
    id: 'rev-2',
    productId: 'lal-mirch-bharwa',
    userName: 'Rohit Meena',
    location: 'Delhi NCR',
    rating: 5,
    date: '1 month ago',
    verified: true,
    comment: 'Outstanding flavor! The stuffed red chilli pickle is delightfully spicy and aromatic. The masala filling is perfectly balanced and the mustard oil aroma is delightful.',
    helpfulCount: 38,
    images: ['/images/products/jar-bharwa-mirch.jpg']
  },
  {
    id: 'rev-3',
    productId: 'aam-classic',
    userName: 'Sunita Devi',
    location: 'Sikar, Rajasthan',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    comment: 'Tastes just like our grandmothers handcrafted in the village. Pure traditional cold-pressed mustard oil and sun-cured crunch!',
    helpfulCount: 29,
    images: []
  },
  {
    id: 'rev-4',
    productId: 'garlic-lahsun',
    userName: 'Vikram Shekhawat',
    location: 'Jodhpur, Rajasthan',
    rating: 5,
    date: '1 month ago',
    verified: true,
    comment: 'Lahsun achar is amazing! Garlic cloves are soft, deeply infused with spices. I order 1kg jar every month for my parents.',
    helpfulCount: 21,
    images: ['/images/products/jar-lahsun-classic.jpg']
  },
  {
    id: 'rev-5',
    productId: 'nimbu-khatta-meetha',
    userName: 'Meenakshi Iyer',
    location: 'Bengaluru, Karnataka',
    rating: 4,
    date: '2 months ago',
    verified: true,
    comment: 'Nimbu achar is naturally tangy and digestive. Truly homemade feel without chemical vinegar. Will definitely reorder.',
    helpfulCount: 17,
    images: []
  },
  {
    id: 'rev-6',
    productId: 'mix-pachranga',
    userName: 'Harpreet Singh',
    location: 'Chandigarh',
    rating: 5,
    date: '2 months ago',
    verified: true,
    comment: 'Pachranga achar reminds me of home. Perfect crunch in vegetables and not overly salty. 5 stars!',
    helpfulCount: 15,
    images: ['/images/products/card-mix.jpg']
  }
];

export const reviewStats = {
  averageRating: 4.8,
  totalReviews: 1234,
  breakdown: [
    { stars: 5, count: 1012, percentage: 82 },
    { stars: 4, count: 148, percentage: 12 },
    { stars: 3, count: 49, percentage: 4 },
    { stars: 2, count: 15, percentage: 1 },
    { stars: 1, count: 10, percentage: 1 },
  ]
};
