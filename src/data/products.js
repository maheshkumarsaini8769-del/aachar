export const products = [
  // 1. Mango Achar (Classic) - Flagship Bestseller
  {
    id: 'aam-classic',
    slug: 'aam-ka-achar-classic',
    name: 'Classic Mango Pickle',
    hindiName: 'Classic Mango Pickle',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 1234,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 42,
    isBestseller: true,
    isFeatured: true,
    image: '/images/products/marusthali-mango-jar.jpg',
    gallery: [
      "/images/products/mango-jar-classic.jpg",
      "/images/products/mango-bowl-serving.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Handcrafted with fresh tart Ramkela mangoes, slow-cured with stone-ground spices and pure cold-pressed mustard oil.',
    fullDesc: 'Our signature mango pickle is prepared using hand-picked tart green Ramkela mangoes from Marwar orchards. Sun-cured in traditional ceramic jars over three weeks with pure cold-pressed cold-pressed mustard oil and stone-ground spices. Every bite delivers a robust crunch, tangy punch, and nostalgic home warmth.',
    bullets: [
      'Handpicked raw tart green mangoes',
      'Cold-pressed pure mustard oil base',
      'Traditional sun-cooked 21-day fermentation',
      'Zero artificial preservatives or acidity regulators',
      'Handcrafted by rural women artisans of Sikar'
    ],
    ingredients: [
      'Raw Green Mangoes (62%)',
      'Cold-Pressed Mustard Oil (24%)',
      'Iodised Salt & Sendha Namak',
      'Fennel Seeds (Saunf)',
      'Fenugreek Seeds (Methi Dana)',
      'Kalonji (Nigella)',
      'Turmeric Powder (Haldi)',
      'Red Chilli Powder (Lal Mirch)',
      'Compounded Asafoetida (Hing)'
    ],
    nutrition: {
      servingSize: '10g (approx 1 tsp)',
      energy: '28 kcal',
      protein: '0.4g',
      carbs: '1.2g',
      totalFat: '2.5g',
      sodium: '240mg'
    },
    shelfLife: '12 Months',
    storage: 'Store in a cool dry place. Use dry wooden or stainless steel spoon. Ensure layer of mustard oil covers the pickle.'
  },

  // 2. Nimbu Achar
  {
    id: 'nimbu-khatta-meetha',
    slug: 'nimbu-ka-achar',
    name: 'Traditional Lemon Pickle',
    hindiName: 'Sweet & Tangy Lemon Pickle',
    category: 'nimbu',
    categoryName: 'Lemon Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.7,
    reviewCount: 954,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 30,
    isBestseller: true,
    isFeatured: true,
    image: '/images/products/marusthali-lemon-jar.jpg',
    gallery: [
      "/images/products/marusthali-lemon-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Thin-skinned juicy Kagzi lemons sun-cured with rock salt, ajwain and warming digestive spices.',
    fullDesc: 'Crafted from hand-selected juicy thin-skinned Kagzi lemons slowly tenderized under the Rajasthan sun. Blended with digestive ajwain, black salt, and dry roasted spices, this achar is naturally tangy, soothing for digestion, and an indispensable companion for dal-chawal.',
    bullets: [
      'Pure sun-cured Kagzi lemons',
      'Infused with digestive Ajwain and Hing',
      'No oil, minimal calories, rich in Vitamin C',
      'Handcrafted with grandmother’s age-old recipe'
    ],
    ingredients: ['Kagzi Lemons (75%)', 'Black Salt', 'Iodised Salt', 'Carom Seeds (Ajwain)', 'Roasted Cumin', 'Red Chilli', 'Black Pepper', 'Hing'],
    nutrition: { servingSize: '10g', energy: '14 kcal', protein: '0.2g', carbs: '2.8g', totalFat: '0.1g', sodium: '280mg' },
    shelfLife: '18 Months',
    storage: 'Store in a dry place. Keep container tightly closed.'
  },

  // 3. Red Chilli Pickle
  {
    id: 'lal-mirch-bharwa',
    slug: 'red-chilli-pickle',
    name: 'Stuffed Red Chilli Pickle',
    hindiName: 'Stuffed Banarasi Red Chilli',
    category: 'red-mirch',
    categoryName: 'Red Chilli Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.9,
    reviewCount: 1420,
    badge: 'Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 25,
    isBestseller: true,
    isFeatured: true,
    image: '/images/products/marusthali-chilli-jar.jpg',
    gallery: [
      "/images/products/marusthali-chilli-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Plump sun-dried whole red chillies stuffed with authentic hand-ground amchur, rai, and saunf masala.',
    fullDesc: 'Famous Banarasi & Marwari style stuffed whole red chillies. Each long, vibrant red pepper is slit by hand and generously packed with a fragrant filling of dry mango powder (amchur), mustard seed powder (rai), saunf, and aromatic spices before being immersed in virgin mustard oil.',
    bullets: [
      'Hand-stuffed whole sun-ripened red chillies',
      'Tangy amchur and roasted mustard stuffing',
      'Rich in natural capsaicin and mustard oil aroma',
      'Pairs perfectly with hot parathas and khichdi'
    ],
    ingredients: ['Whole Red Chillies (55%)', 'Cold-Pressed Mustard Oil (26%)', 'Dry Mango Powder (Amchur)', 'Yellow Mustard Seeds', 'Fennel Seeds', 'Salt', 'Turmeric', 'Fenugreek', 'Hing'],
    nutrition: { servingSize: '10g', energy: '32 kcal', protein: '0.5g', carbs: '1.4g', totalFat: '2.8g', sodium: '260mg' },
    shelfLife: '12 Months',
    storage: 'Keep chillies soaked in mustard oil.'
  },

  // 4. Mixed Pickle (Pachranga)
  {
    id: 'mix-pachranga',
    slug: 'mixed-pickle-achar',
    name: 'Traditional Mixed Pickle',
    hindiName: 'Pachranga Mixed Pickle',
    category: 'mix',
    categoryName: 'Mixed Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 1110,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 38,
    isBestseller: true,
    isFeatured: true,
    image: '/images/products/marusthali-mixed-jar.jpg',
    gallery: [
      "/images/products/marusthali-mixed-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'A crunchy symphony of fresh raw mango, tender carrots, lotus stem, lime, and green chillies.',
    fullDesc: 'The quintessential North Indian table pickle. Made by chopping crunchy seasonal winter and summer produce including raw mangoes, carrots, cauliflower, lime, and crisp green chillies. Cured together so their distinct notes harmonize with stone-ground mustard paste.',
    bullets: [
      'Multi-vegetable crunchy texture',
      'Sun-cooked in earthen pots',
      'Balanced medium spice and appetizing aroma',
      'The ultimate all-rounder for every meal'
    ],
    ingredients: ['Raw Mangoes (25%)', 'Carrots (18%)', 'Lime (15%)', 'Green Chillies (10%)', 'Mustard Oil (22%)', 'Salt', 'Spices & Condiments'],
    nutrition: { servingSize: '10g', energy: '26 kcal', protein: '0.3g', carbs: '1.5g', totalFat: '2.1g', sodium: '235mg' },
    shelfLife: '12 Months',
    storage: 'Store in airtight jar. Keep in a dry, cool spot.'
  },

  // 5. Garlic Pickle (Lahsun Achar)
  {
    id: 'garlic-lahsun',
    slug: 'garlic-pickle-lahsun-achar',
    name: 'Traditional Garlic Pickle',
    hindiName: 'Country Garlic Pickle',
    category: 'garlic',
    categoryName: 'Garlic Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.7,
    reviewCount: 880,
    badge: 'New',
    badgeType: 'new',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 22,
    isBestseller: true,
    isFeatured: true,
    image: '/images/products/marusthali-garlic-jar.jpg',
    gallery: [
      "/images/products/marusthali-garlic-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Whole peeled desi garlic cloves pickled in sharp mustard oil, fenugreek, and Marwari spices.',
    fullDesc: 'Whole plump garlic cloves bathed in an aromatic, fiery-tangy marinade. As garlic ages in cold-pressed mustard oil, its sharp bite softens into a deep, savory, umami-rich delicacy that warms the palate and aids circulation.',
    bullets: [
      'Peeled country garlic cloves',
      'Slow matured for velvet texture',
      'Natural heart & immunity wellness benefits',
      'Handmade without chemical preservatives'
    ],
    ingredients: ['Peeled Garlic (58%)', 'Mustard Oil (25%)', 'Fenugreek Seeds', 'Mustard Seeds', 'Salt', 'Red Chilli Powder', 'Turmeric', 'Hing'],
    nutrition: { servingSize: '10g', energy: '29 kcal', protein: '0.6g', carbs: '1.8g', totalFat: '2.2g', sodium: '210mg' },
    shelfLife: '12 Months',
    storage: 'Keep in glass jar away from direct moisture.'
  },

  // 6. Kairi Ka Achar (Raw Mango Chunks)
  {
    id: 'kairi-aam',
    slug: 'kairi-ka-achar',
    name: 'Raw Green Mango Pickle',
    hindiName: 'Raw Baby Mango Pickle',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 760,
    badge: 'Popular',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 19,
    image: '/images/products/mango-raw-kairi.jpg',
    gallery: [
      "/images/products/mango-raw-kairi.jpg",
      "/images/products/mango-bowl-serving.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Small diced tart green kairi tossed in roasted methi, kalonji, and cold-pressed mustard oil.',
    fullDesc: 'Tender baby mangoes picked during early summer when the seed is still soft. Diced into bite-sized morsels and marinated with roasted panch-phoran masala, creating a deeply satisfying, crunchy texture that elevates everyday meals.',
    bullets: ['Tender baby kairi chunks', 'Roasted kalonji & methi aroma', 'Authentic Shekhawati village recipe', '100% natural sun-cured'],
    ingredients: ['Baby Raw Mango (64%)', 'Mustard Oil (22%)', 'Salt', 'Fennel', 'Fenugreek', 'Kalonji', 'Spices'],
    nutrition: { servingSize: '10g', energy: '27 kcal', protein: '0.3g', carbs: '1.3g', totalFat: '2.4g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Use dry spoon only.'
  },

  // 7. Punjabi Mango Achar
  {
    id: 'punjabi-mango',
    slug: 'punjabi-mango-achar',
    name: 'Punjabi Mango Pickle',
    hindiName: 'Punjabi Mango Pickle',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 930,
    badge: 'New',
    badgeType: 'new',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 24,
    image: '/images/products/mango-jar-spiced.jpg',
    gallery: [
      "/images/products/mango-jar-spiced.jpg",
      "/images/products/mango-bowl-serving.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Robust and spicy Punjabi dhaba style mango pickle with coarse cracked spices.',
    fullDesc: 'Thick chunky mango wedges marinated with coarse cracked black pepper, degi mirch, and heavy mustard oil. Robust, pungent, and made for stuffed parathas.',
    bullets: ['Bold dhaba flavour profile', 'Coarse stone-ground spices', 'Extra cold-pressed mustard oil richness', 'Hearty and full-bodied'],
    ingredients: ['Green Mangoes (60%)', 'Mustard Oil (25%)', 'Salt', 'Rai', 'Methi', 'Kalonji', 'Degi Mirch'],
    nutrition: { servingSize: '10g', energy: '30 kcal', protein: '0.4g', carbs: '1.2g', totalFat: '2.7g', sodium: '250mg' },
    shelfLife: '12 Months',
    storage: 'Store in airtight jar.'
  },

  // 8. Meethi Aam Achar (Chunda style sweet mango)
  {
    id: 'meethi-aam',
    slug: 'meethi-aam-achar',
    name: 'Sweet Mango Pickle (Chhundo)',
    hindiName: 'Sweet Jaggery Mango Chutney',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.9,
    reviewCount: 840,
    badge: 'Popular',
    badgeType: 'popular',
    spiceLevel: 'Mild',
    inStock: true,
    stockCount: 18,
    image: '/images/products/mango-bowl-serving.jpg',
    gallery: [
      "/images/products/mango-bowl-serving.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Grated mango slow-cooked with organic jaggery, cardamom, and warming spices.',
    fullDesc: 'Traditional Rajasthani Aam ki Launji / sweet pickle made by simmering finely shredded raw green mangoes with desi gud (unrefined jaggery), green cardamom, and toasted cumin. Sweet, tangy, and a favourite across all generations.',
    bullets: ['Naturally sweetened with Desi Gud (Jaggery)', 'No refined white sugar', 'Sun-crystallized for sticky caramel texture', 'Mild and digestive'],
    ingredients: ['Shredded Raw Mango (50%)', 'Organic Jaggery (40%)', 'Salt', 'Cardamom', 'Cumin', 'Red Chilli', 'Black Salt'],
    nutrition: { servingSize: '10g', energy: '34 kcal', protein: '0.2g', carbs: '7.8g', totalFat: '0.2g', sodium: '90mg' },
    shelfLife: '12 Months',
    storage: 'Store away from moisture.'
  },

  // 9. Rajasthani Aam Achar
  {
    id: 'rajasthani-aam',
    slug: 'rajasthani-aam-achar',
    name: 'Rajasthani Marwari Mango Pickle',
    hindiName: 'Traditional Rajasthani Mango',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 670,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 28,
    image: '/images/products/mango-ceramic-barni.jpg',
    gallery: [
      "/images/products/mango-ceramic-barni.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Marwar royal family recipe prepared with dry roasted spices and aromatic hing.',
    fullDesc: 'An authentic Shekhawati recipe prepared with sun-dried raw mangoes, roasted methi, yellow mustard seeds, and high-potency compounded hing from Hathras. Full of rustic soul and desert heritage.',
    bullets: ['Marwar royal recipe', 'Roasted methi and yellow rai', 'Heavy hing aromatics', 'Aged to rich umami perfection'],
    ingredients: ['Raw Mango (62%)', 'Mustard Oil (24%)', 'Salt', 'Fenugreek', 'Yellow Mustard', 'Hing', 'Turmeric', 'Chilli'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '0.4g', carbs: '1.2g', totalFat: '2.5g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Keep immersed in oil.'
  },

  // 10. Chatpata Aam Achar
  {
    id: 'chatpata-aam',
    slug: 'chatpata-aam-achar',
    name: 'Tangy Spiced Mango Pickle',
    hindiName: 'Zesty Spiced Mango Pickle',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.7,
    reviewCount: 520,
    badge: 'Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 15,
    image: '/images/products/mango-stone-mortar.jpg',
    gallery: [
      "/images/products/mango-stone-mortar.jpg",
      "/images/products/mango-jar-spiced.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Tangy mango pickle with a burst of roasted jeera, amchur, and fiery red chillies.',
    fullDesc: 'Extra chatpata seasoning makes this mango achar a tongue-tingling treat. Spiked with crushed black peppercorns and dry mango tang.',
    bullets: ['Extra tangy & peppery', 'Crisp raw mango bite', 'Zero chemical vinegar', 'Handcrafted in brass handi'],
    ingredients: ['Raw Mango (60%)', 'Mustard Oil (25%)', 'Salt', 'Black Pepper', 'Roasted Cumin', 'Chilli Powder'],
    nutrition: { servingSize: '10g', energy: '27 kcal', protein: '0.3g', carbs: '1.4g', totalFat: '2.3g', sodium: '245mg' },
    shelfLife: '12 Months',
    storage: 'Keep covered in oil layer.'
  },

  // 11. Masaledar Aam Achar
  {
    id: 'masaledar-aam',
    slug: 'masaledar-aam-achar',
    name: 'Robust Masala Mango Pickle',
    hindiName: 'Royal Masala Mango Pickle',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 610,
    badge: 'Popular',
    badgeType: 'popular',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 20,
    image: '/images/products/mango-brass-mixing.jpg',
    gallery: [
      "/images/products/mango-brass-mixing.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Richly spiced raw mango chunks covered in thick aromatic masala paste.',
    fullDesc: 'For those who love thick, clinging pickle masala! The mango pieces are enveloped in an abundance of hand-crushed aromatic spices.',
    bullets: ['Thick textured clinging masala', 'Stone-ground whole spices', 'Authentic traditional mustard oil', 'Great with poori and mathri'],
    ingredients: ['Raw Mango (58%)', 'Mustard Oil (24%)', 'Mustard Seeds (8%)', 'Salt', 'Fennel', 'Fenugreek', 'Chilli'],
    nutrition: { servingSize: '10g', energy: '29 kcal', protein: '0.5g', carbs: '1.3g', totalFat: '2.5g', sodium: '250mg' },
    shelfLife: '12 Months',
    storage: 'Store in cool place.'
  },

  // 12. Kachha Aam Achar
  {
    id: 'kachha-aam',
    slug: 'kachha-aam-achar',
    name: 'Crisp Green Mango Pickle',
    hindiName: 'Crisp Green Mango Pickle',
    category: 'mango',
    categoryName: 'Mango Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.6,
    reviewCount: 390,
    badge: 'Fresh Batch',
    badgeType: 'new',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 17,
    image: '/images/products/mango-fresh-harvest.jpg',
    gallery: [
      "/images/products/mango-fresh-harvest.jpg",
      "/images/products/mango-raw-kairi.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Crisp green raw mango slices preserved in spiced mustard oil with light salt.',
    fullDesc: 'Freshly diced unripe green mango slices that retain their vibrant crunch. Made with a lighter salt balance and fragrant whole fennel seeds.',
    bullets: ['Crisp fresh texture', 'Mild tangy bite', 'Ideal for daily meals', 'Prepared in ceramic jars'],
    ingredients: ['Raw Mango (65%)', 'Mustard Oil (22%)', 'Salt', 'Saunf', 'Methi', 'Haldi'],
    nutrition: { servingSize: '10g', energy: '26 kcal', protein: '0.3g', carbs: '1.2g', totalFat: '2.3g', sodium: '210mg' },
    shelfLife: '9 Months',
    storage: 'Keep in dry area.'
  },

  // 13. Green Mirch Achar (Hari Mirch)
  {
    id: 'green-mirch-classic',
    slug: 'green-mirch-achar',
    name: 'Fresh Green Chilli Pickle',
    hindiName: 'Slit Green Chilli Pickle',
    category: 'green-mirch',
    categoryName: 'Green Chilli Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.7,
    reviewCount: 810,
    badge: 'Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 22,
    image: '/images/products/marusthali-green-chilli-jar.jpg',
    gallery: [
      "/images/products/marusthali-green-chilli-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Crisp spicy green chillies slit and cured in crushed mustard seeds and pure lemon juice.',
    fullDesc: 'Crisp hand-slit fresh green chillies infused with coarse yellow mustard seeds (rai kuria), turmeric, and freshly squeezed lemon juice. Delivers an immediate fiery kick and refreshing zest.',
    bullets: ['Crisp green chillies', 'Lemon and mustard kuria marinade', 'Zero synthetic preservatives', 'Quick tabletop favorite'],
    ingredients: ['Green Chillies (65%)', 'Mustard Oil (18%)', 'Yellow Mustard Seeds', 'Lemon Juice', 'Salt', 'Turmeric', 'Hing'],
    nutrition: { servingSize: '10g', energy: '22 kcal', protein: '0.4g', carbs: '1.1g', totalFat: '1.8g', sodium: '230mg' },
    shelfLife: '6 Months',
    storage: 'Refrigerate after opening to retain crunch.'
  },

  // 14. Hari Mirch Rai Achar
  {
    id: 'hari-mirch-rai',
    slug: 'hari-mirch-rai-achar',
    name: 'Green Chilli Mustard Pickle',
    hindiName: 'Mustard Green Chilli Pickle',
    category: 'green-mirch',
    categoryName: 'Green Chilli Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 470,
    badge: 'Popular',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 16,
    image: '/images/products/marusthali-green-chilli-jar.jpg',
    gallery: [
      "/images/products/marusthali-green-chilli-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Mild spicy chillies coated in golden mustard kuria and cold-pressed oil.',
    fullDesc: 'Mellow green chillies coated in aromatic cracked yellow mustard seeds and warm cold-pressed mustard oil. Less fiery, exceptionally flavorful.',
    bullets: ['Mild pleasant heat', 'Cracked yellow rai seeds', 'Golden sun-cure', 'Traditional Marwari recipe'],
    ingredients: ['Green Chillies (62%)', 'Mustard Oil (20%)', 'Yellow Rai (10%)', 'Salt', 'Spices'],
    nutrition: { servingSize: '10g', energy: '24 kcal', protein: '0.4g', carbs: '1.0g', totalFat: '2.0g', sodium: '220mg' },
    shelfLife: '6 Months',
    storage: 'Keep in dry jar.'
  },

  // 15. Hari Mirch Lahsun Achar
  {
    id: 'hari-mirch-lahsun',
    slug: 'hari-mirch-lahsun-achar',
    name: 'Green Chilli & Garlic Pickle',
    hindiName: 'Green Chilli & Garlic Pickle',
    category: 'green-mirch',
    categoryName: 'Green Chilli Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.9,
    reviewCount: 560,
    badge: 'Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 20,
    image: '/images/products/marusthali-green-chilli-jar.jpg',
    gallery: [
      "/images/products/marusthali-green-chilli-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Fiery pairing of fresh green chillies and whole garlic cloves in pungent mustard paste.',
    fullDesc: 'A powerhouse combination! Whole garlic cloves and cut green chillies steeped together in pungent mustard oil, ginger juliennes, and roasted methi.',
    bullets: ['Garlic & green chilli duo', 'Warming digestive blend', 'High spice level', 'Authentic rural recipe'],
    ingredients: ['Green Chillies (40%)', 'Garlic (30%)', 'Mustard Oil (20%)', 'Ginger', 'Salt', 'Spices'],
    nutrition: { servingSize: '10g', energy: '27 kcal', protein: '0.5g', carbs: '1.6g', totalFat: '2.1g', sodium: '240mg' },
    shelfLife: '9 Months',
    storage: 'Keep sealed tightly.'
  },

  // 16. Banarasi Bharwa Lal Mirch
  {
    id: 'banarasi-lal-mirch',
    slug: 'banarasi-bharwa-lal-mirch',
    name: 'Banarasi Stuffed Red Chilli',
    hindiName: 'Banarasi Stuffed Red Chilli',
    category: 'red-mirch',
    categoryName: 'Red Chilli Pickles',
    price: 269,
    mrp: 320,
    discount: '16% OFF',
    rating: 4.9,
    reviewCount: 1350,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 25,
    image: '/images/products/marusthali-chilli-jar.jpg',
    gallery: [
      "/images/products/marusthali-chilli-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 169, mrp: 199 },
      { size: '500 g', price: 269, mrp: 320 },
      { size: '1 kg', price: 489, mrp: 590 }
    ],
    shortDesc: 'Jumbo Banarasi red chillies tightly packed with hand-roasted panch-phoran & amchur.',
    fullDesc: 'The king of stuffed pickles! Sun-ripened thick flesh Banarasi red peppers filled with a rich spice mixture including kalonji, saunf, fenugreek, dry mango, and stone-ground mustard.',
    bullets: ['Jumbo Banarasi chillies', 'Thick aromatic stuffing', 'Preserved in cold-pressed mustard oil', 'Heritage artisan preparation'],
    ingredients: ['Red Chillies (55%)', 'Mustard Oil (25%)', 'Amchur', 'Rai', 'Saunf', 'Salt', 'Kalonji', 'Hing'],
    nutrition: { servingSize: '10g', energy: '33 kcal', protein: '0.6g', carbs: '1.5g', totalFat: '2.9g', sodium: '260mg' },
    shelfLife: '12 Months',
    storage: 'Immerse in oil.'
  },

  // 17. Rajasthani Sukhi Lal Mirch Achar
  {
    id: 'rajasthani-sukhi-mirch',
    slug: 'rajasthani-lal-mirch-achar',
    name: 'Rajasthani Red Chilli Pickle',
    hindiName: 'Rajasthani Red Chilli Pickle',
    category: 'red-mirch',
    categoryName: 'Red Chilli Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 620,
    badge: 'Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 19,
    image: '/images/products/marusthali-chilli-jar.jpg',
    gallery: [
      "/images/products/marusthali-chilli-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Sliced dry red chillies seasoned with cumin, fenugreek, and cold-pressed mustard oil.',
    fullDesc: 'Traditional desert delicacy prepared from coarse sliced red chillies, coriander seeds, dry garlic bits, and mustard oil.',
    bullets: ['Sliced dry red chillies', 'Coarse Marwari spices', 'Fiery pungent kick', 'Sun-cured in clay pots'],
    ingredients: ['Red Chillies (60%)', 'Mustard Oil (24%)', 'Garlic', 'Salt', 'Coriander Seeds', 'Fenugreek'],
    nutrition: { servingSize: '10g', energy: '31 kcal', protein: '0.5g', carbs: '1.4g', totalFat: '2.6g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Store in dry jar.'
  },

  // 18. Nimbu Masaledar Achar
  {
    id: 'nimbu-masaledar',
    slug: 'nimbu-masaledar-achar',
    name: 'Spiced Masala Lemon Pickle',
    hindiName: 'Spiced Lemon Pickle',
    category: 'nimbu',
    categoryName: 'Lemon Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.7,
    reviewCount: 510,
    badge: 'Popular',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 21,
    image: '/images/products/marusthali-lemon-jar.jpg',
    gallery: [
      "/images/products/marusthali-lemon-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Spicy and tangy lemon wedges seasoned with red chilli, saunf, and aromatic cloves.',
    fullDesc: 'A spicy twist on traditional lemon pickle! Juicy lemon quarters infused with powdered clove, cinnamon, red chilli, and mustard oil.',
    bullets: ['Spicy lemon wedges', 'Aromatic clove and cinnamon notes', 'Aged to tender perfection', 'Zero artificial chemicals'],
    ingredients: ['Lemons (70%)', 'Mustard Oil (12%)', 'Salt', 'Red Chilli', 'Cloves', 'Fennel', 'Ajwain'],
    nutrition: { servingSize: '10g', energy: '18 kcal', protein: '0.3g', carbs: '2.2g', totalFat: '1.1g', sodium: '270mg' },
    shelfLife: '18 Months',
    storage: 'Store in cool dry place.'
  },

  // 19. Nimbu Meetha Achar (No Oil)
  {
    id: 'nimbu-meetha',
    slug: 'nimbu-meetha-achar',
    name: 'Sweet Sun-Cured Lemon Pickle',
    hindiName: 'Sweet Sun-Cured Lemon',
    category: 'nimbu',
    categoryName: 'Lemon Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.9,
    reviewCount: 790,
    badge: 'Mild',
    badgeType: 'popular',
    spiceLevel: 'Mild',
    inStock: true,
    stockCount: 26,
    image: '/images/products/marusthali-lemon-jar.jpg',
    gallery: [
      "/images/products/marusthali-lemon-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Oil-free sweet and sour lemon pickle slowly cured in pure desi jaggery and sun heat.',
    fullDesc: 'Sun-cooked over 40 days without a drop of oil. Lemons turn silky soft in a natural glaze of jaggery, black pepper, and rock salt. Exceptional for digestion.',
    bullets: ['100% Oil-Free', 'Sweetened with Natural Jaggery', 'Sun-cured over 40 days in glass jars', 'Immunity & gut health booster'],
    ingredients: ['Lemons (60%)', 'Desi Jaggery (35%)', 'Black Salt', 'Black Pepper', 'Roasted Cumin', 'Ginger Powder'],
    nutrition: { servingSize: '10g', energy: '31 kcal', protein: '0.2g', carbs: '7.4g', totalFat: '0.0g', sodium: '180mg' },
    shelfLife: '24 Months',
    storage: 'Keep in dry jar. Grows richer with age.'
  },

  // 20. Lasun Achar (Special Country Garlic)
  {
    id: 'lasun-special',
    slug: 'lasun-achar-special',
    name: 'Country Garlic Pickle (Native Cloves)',
    hindiName: 'Desi Garlic Special Pickle',
    category: 'garlic',
    categoryName: 'Garlic Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 710,
    badge: 'Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 14,
    image: '/images/products/marusthali-garlic-jar.jpg',
    gallery: [
      "/images/products/marusthali-garlic-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Tiny high-potency desi garlic cloves cured in red chilli, hing, and mustard oil.',
    fullDesc: 'Small native Rajasthani garlic known for intense flavor and medicinal value. Fermented in cold-pressed mustard oil with dry roasted fenugreek and red chilli flakes.',
    bullets: ['Native small clove desi garlic', 'Strong pungent aroma', 'Traditional sun curing', 'Boosts natural appetite'],
    ingredients: ['Desi Garlic (60%)', 'Mustard Oil (24%)', 'Red Chilli Flakes', 'Fenugreek', 'Salt', 'Hing'],
    nutrition: { servingSize: '10g', energy: '30 kcal', protein: '0.6g', carbs: '1.7g', totalFat: '2.4g', sodium: '215mg' },
    shelfLife: '12 Months',
    storage: 'Store in cool dry place.'
  },

  // 21. Methi Aam Achar
  {
    id: 'methi-aam',
    slug: 'methi-aam-achar',
    name: 'Fenugreek Mango Pickle',
    hindiName: 'Fenugreek & Mango Pickle',
    category: 'methi',
    categoryName: 'Fenugreek & Methi Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 560,
    badge: 'Healthy',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 16,
    image: '/images/products/mango-sun-drying.jpg',
    gallery: [
      "/images/products/mango-sun-drying.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Whole sprouted fenugreek seeds soaked in raw mango juice and mustard oil.',
    fullDesc: 'A prized Ayurvedic delicacy! Fenugreek seeds (methi dana) are soaked in tart raw mango extract until tender and plump, eliminating bitterness while delivering wholesome nourishment.',
    bullets: ['Whole soaked methi dana', 'Rich in natural dietary fiber', 'Excellent for joint mobility and sugar control', 'Marwari wedding classic'],
    ingredients: ['Fenugreek Seeds (Methi Dana) (38%)', 'Raw Mango Pieces (30%)', 'Mustard Oil (22%)', 'Salt', 'Spices'],
    nutrition: { servingSize: '10g', energy: '26 kcal', protein: '1.1g', carbs: '2.1g', totalFat: '1.9g', sodium: '210mg' },
    shelfLife: '12 Months',
    storage: 'Keep in dry jar.'
  },

  // 22. Punjabi Mix Achar
  {
    id: 'punjabi-mix',
    slug: 'punjabi-mix-achar',
    name: 'Punjabi Mixed Vegetable Pickle',
    hindiName: 'Punjabi Mixed Pickle',
    category: 'mix',
    categoryName: 'Mixed Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 880,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 32,
    image: '/images/products/marusthali-mixed-jar.jpg',
    gallery: [
      "/images/products/marusthali-mixed-jar.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Crisp seasonal veggies tossed with ginger juliennes, garlic, and cracked spices.',
    fullDesc: 'Cauliflower florets, red carrots, turnip, raw mango, and fresh ginger strips spiced with cracked coriander and black pepper.',
    bullets: ['Winter vegetable medley', 'Ginger and garlic infusion', 'Dhaba style bold spice', 'Great with tandoori roti and dal'],
    ingredients: ['Carrot, Lime, Mango, Green Chilli (65%)', 'Mustard Oil (22%)', 'Ginger', 'Salt', 'Spices'],
    nutrition: { servingSize: '10g', energy: '27 kcal', protein: '0.4g', carbs: '1.5g', totalFat: '2.2g', sodium: '230mg' },
    shelfLife: '12 Months',
    storage: 'Keep covered in oil.'
  },

  // 23. Gunda (Lesua) Aam Achar
  {
    id: 'gunda-lesua-achar',
    slug: 'gunda-lesua-aam-achar',
    name: 'Royal Gunda & Mango Pickle',
    hindiName: 'Wild Forest Gunda Pickle',
    category: 'heritage',
    categoryName: 'Heritage Rajasthani Pickles',
    price: 269,
    mrp: 320,
    discount: '16% OFF',
    rating: 4.9,
    reviewCount: 650,
    badge: 'Rajasthani Special',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 15,
    image: '/images/products/mango-clay-barni.jpg',
    gallery: [
      "/images/products/mango-clay-barni.jpg",
      "/images/products/mango-bowl-serving.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 169, mrp: 199 },
      { size: '500 g', price: 269, mrp: 320 },
      { size: '1 kg', price: 489, mrp: 580 }
    ],
    shortDesc: 'Rare Marwari wild glueberries (Lasoda) deseeded and hand-stuffed with raw mango masala.',
    fullDesc: 'A rare and prized seasonal Rajasthani delicacy! Tender wild green Lasoda berries are deseeded and hand-stuffed with tangy grated raw mango and crushed rai kuria.',
    bullets: ['Wild desert Gunda berries', 'Hand-stuffed with raw mango masala', 'Rare seasonal Marwari delicacy', 'Sun-cured in clay pots'],
    ingredients: ['Gunda / Lasoda (45%)', 'Raw Mango (25%)', 'Mustard Oil (22%)', 'Rai', 'Saunf', 'Salt', 'Spices'],
    nutrition: { servingSize: '10g', energy: '25 kcal', protein: '0.4g', carbs: '1.4g', totalFat: '2.0g', sodium: '225mg' },
    shelfLife: '12 Months',
    storage: 'Keep immersed in oil.'
  },

  // 24. Festive Special 3-Jar Box
  {
    id: 'festive-gift-box',
    slug: 'festive-gift-box-3-pack',
    name: 'Festive Special Gift Box (3 Jars)',
    hindiName: 'Festive Gift Box (3 Jars)',
    category: 'festive',
    categoryName: 'Festive Hampers',
    price: 699,
    mrp: 850,
    discount: '18% OFF',
    rating: 4.9,
    reviewCount: 420,
    badge: 'Festive Gift',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 50,
    isFeatured: true,
    image: '/images/products/combo-3pack-heritage.jpg',
    gallery: [
      "/images/products/combo-3pack-heritage.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '3 x 250 g', price: 499, mrp: 599 },
      { size: '3 x 500 g', price: 699, mrp: 850 }
    ],
    shortDesc: 'Royal gift box containing 3 heritage pickles: Classic Mango, Stuffed Red Chilli, and Nimbu Achar.',
    fullDesc: 'Packed in a royal golden-embossed gift box with silk ribbon and greeting card. Contains 3 bestselling handcrafted pickles in glass jars: Classic Mango, Stuffed Banarasi Red Chilli, and Sweet & Tangy Lemon.',
    bullets: [
      '3 Premium glass jars in luxury festive gift box',
      'Includes Classic Mango, Stuffed Red Chilli & Sweet Lemon Pickle',
      'Comes with handcrafted wooden serving spoon and greeting card',
      'Ideal for Diwali, Rakhi, and Wedding gifting'
    ],
    ingredients: ['Mango, Red Chilli, Lemon', 'Mustard Oil', 'Hand-ground Spices', 'Salt'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '0.4g', carbs: '1.5g', totalFat: '2.3g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Store in dry place.'
  },

  // 25. Diwali Special Heritage Pack
  {
    id: 'diwali-special-pack',
    slug: 'diwali-special-pack',
    name: 'Diwali Heritage Gift Pack',
    hindiName: 'Diwali Heritage Pack',
    category: 'festive',
    categoryName: 'Festive Hampers',
    price: 899,
    mrp: 1100,
    discount: '18% OFF',
    rating: 5.0,
    reviewCount: 310,
    badge: 'Diwali Special',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 40,
    isFeatured: true,
    image: '/images/products/combo-3pack-heritage.jpg',
    gallery: [
      "/images/products/combo-3pack-heritage.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '4 x 250 g', price: 699, mrp: 850 },
      { size: '4 x 500 g', price: 899, mrp: 1100 }
    ],
    shortDesc: 'Traditional Diwali hampers with 4 gourmet pickle jars, terracotta diya, and brass spoon.',
    fullDesc: 'Specially crafted for Diwali celebrations. Contains 4 authentic regional pickles (Aam, Lahsun, Mirch, and Pachranga) along with two handcrafted earthen diyas by local potters.',
    bullets: [
      '4 Gourmet pickle jars (250g or 500g each)',
      'Free handcrafted clay diyas and brass spoon included',
      'Customized festive greeting card with your message',
      'Safe shockproof wooden gift packaging'
    ],
    ingredients: ['Assorted Indian Pickles & Mustard Oil Spices'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '0.4g', carbs: '1.5g', totalFat: '2.4g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Store in cool place.'
  },

  // 26. Raksha Bandhan Brother-Sister Box
  {
    id: 'rakhi-gift-box',
    slug: 'rakhi-special-gift-box',
    name: 'Festive Keepsake Gift Hamper',
    hindiName: 'Rakhi Special Pickle Hamper',
    category: 'festive',
    categoryName: 'Festive Hampers',
    price: 549,
    mrp: 650,
    discount: '15% OFF',
    rating: 4.8,
    reviewCount: 220,
    badge: 'Festive Gift',
    badgeType: 'new',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 35,
    image: '/images/products/combo-3pack-heritage.jpg',
    gallery: [
      "/images/products/combo-3pack-heritage.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '2 x 350 g', price: 549, mrp: 650 }
    ],
    shortDesc: 'A touch of home comfort for your siblings with Classic Mango and Sweet Lemon Pickle.',
    fullDesc: 'Remind your brother or sister of home-cooked meals with our specially curated Rakhi hamper packed with pure nostalgic flavours.',
    bullets: ['2 Selected nostalgic pickles', 'Includes festive Rakhi and Roli-Chawal', 'Gift box packaging with personal note'],
    ingredients: ['Mango, Lemon, Spices, Mustard Oil'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '0.4g', carbs: '1.5g', totalFat: '2.2g', sodium: '235mg' },
    shelfLife: '12 Months',
    storage: 'Store in dry place.'
  },

  // 27. Shaadi Gifting Royale Hamper
  {
    id: 'shaadi-hamper',
    slug: 'shaadi-wedding-achar-hamper',
    name: 'Royal Celebration Gift Hamper',
    hindiName: 'Royal Wedding Keepsake Hamper',
    category: 'festive',
    categoryName: 'Festive Hampers',
    price: 1299,
    mrp: 1599,
    discount: '19% OFF',
    rating: 4.9,
    reviewCount: 180,
    badge: 'Luxury Gift',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 25,
    image: '/images/products/combo-3pack-heritage.jpg',
    gallery: [
      "/images/products/combo-3pack-heritage.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '6 x 200 g', price: 1299, mrp: 1599 }
    ],
    shortDesc: 'Magnificent six-jar wedding collection featuring the best of Indian regional pickle heritage.',
    fullDesc: 'Designed for wedding favors and bridal trousseau gifting. Features 6 ceramic-look jars displaying the breadth of Marusthali Achar authentic pickle craftsmanship.',
    bullets: ['6 Miniature tasting jars (200g each)', 'Velvet lined keepsake gift chest', 'Includes custom monogram tag on bulk orders', 'Zero chemical additives'],
    ingredients: ['Assorted pickles'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '0.4g', carbs: '1.5g', totalFat: '2.4g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Store in cool place.'
  },

  // 28. Holi Chatpata Achar Duo
  {
    id: 'holi-chatpata-duo',
    slug: 'holi-chatpata-achar-duo',
    name: 'Celebration Twin Pickle Duo',
    hindiName: 'Holi Chatpata Duo Pack',
    category: 'festive',
    categoryName: 'Festive Hampers',
    price: 479,
    mrp: 550,
    discount: '13% OFF',
    rating: 4.8,
    reviewCount: 290,
    badge: 'Festive Gift',
    badgeType: 'new',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 30,
    image: '/images/products/combo-3pack-heritage.jpg',
    gallery: [
      "/images/products/combo-3pack-heritage.jpg",
      "/images/products/mango-jar-classic.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '2 x 350 g', price: 479, mrp: 550 }
    ],
    shortDesc: 'A spicy-tangy duo of Green Chilli and Tangy Mango to accompany festive snacks and delights.',
    fullDesc: 'Celebrate colors and flavors with this festive twin pack! Pairs wonderfully with savory snacks and festive gatherings.',
    bullets: ['2 Chatpata pickle jars', 'Comes in colorful festive sleeve', 'Handcrafted by rural women'],
    ingredients: ['Green Chilli, Mango, Spices, Mustard Oil'],
    nutrition: { servingSize: '10g', energy: '26 kcal', protein: '0.4g', carbs: '1.4g', totalFat: '2.2g', sodium: '235mg' },
    shelfLife: '12 Months',
    storage: 'Store in dry place.'
  },

  // 29. Rajasthani Dana Methi Achar
  {
    id: 'methi-dana-rajasthani',
    slug: 'rajasthani-dana-methi-achar',
    name: 'Rajasthani Dana Methi Pickle',
    hindiName: 'Royal Dana Methi Pickle',
    category: 'methi',
    categoryName: 'Fenugreek & Methi Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 420,
    badge: 'Ayurvedic',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 22,
    image: '/images/products/jar-methi-aam.jpg',
    gallery: [
      "/images/products/jar-methi-aam.jpg",
      "/images/products/mango-sun-drying.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Sun-soaked golden fenugreek seeds simmered in mustard oil with fennel, kalonji, and amchur.',
    fullDesc: 'An authentic Marwari household specialty! Plump golden fenugreek seeds (dana methi) are boiled in salted turmeric water, thoroughly sun-dried, and steeped in cold-pressed mustard oil with toasted whole spices. Earthy, mildly bitter with a savory finish that aids digestion.',
    bullets: ['Pure golden fenugreek seeds', 'Traditional Rajasthani sun-cured recipe', 'Rich in digestive fiber & antioxidants', 'Zero artificial preservatives'],
    ingredients: ['Fenugreek Seeds (Dana Methi) (48%)', 'Cold-Pressed Mustard Oil (24%)', 'Fennel Seeds (Saunf)', 'Kalonji', 'Dry Mango Powder', 'Hing', 'Rock Salt'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '1.2g', carbs: '2.0g', totalFat: '1.8g', sodium: '210mg' },
    shelfLife: '12 Months',
    storage: 'Store in cool dry place.'
  },

  // 30. Methi Amla Digestive Achar
  {
    id: 'methi-amla-digestive',
    slug: 'methi-amla-digestive-achar',
    name: 'Digestive Methi & Fresh Amla Pickle',
    hindiName: 'Methi Amla Pachak Pickle',
    category: 'methi',
    categoryName: 'Fenugreek & Methi Pickles',
    price: 259,
    mrp: 310,
    discount: '16% OFF',
    rating: 4.9,
    reviewCount: 380,
    badge: 'Immunity',
    badgeType: 'popular',
    spiceLevel: 'Mild',
    inStock: true,
    stockCount: 19,
    image: '/images/products/mango-sun-drying.jpg',
    gallery: [
      "/images/products/mango-sun-drying.jpg",
      "/images/products/jar-methi-aam.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 159, mrp: 189 },
      { size: '500 g', price: 259, mrp: 310 },
      { size: '1 kg', price: 469, mrp: 560 }
    ],
    shortDesc: 'Nutrient-dense soaked fenugreek seeds blended with vitamin C rich Indian gooseberries (Amla).',
    fullDesc: 'A prized Ayurvedic winter delicacy! Fresh seasonal amla segments and tender soaked methi seeds are seasoned with yellow mustard, ginger, and turmeric. Tangy, crunchy, and packed with vitamin C and gut-friendly fiber.',
    bullets: ['Rich in natural Vitamin C', 'Ayurvedic gut-healing blend', 'Fresh desi amla & methi seeds', 'Sun-cured in mustard oil'],
    ingredients: ['Fresh Indian Gooseberry (Amla) (40%)', 'Fenugreek Seeds (Methi Dana) (25%)', 'Mustard Oil (22%)', 'Yellow Mustard (Rai Kuria)', 'Rock Salt', 'Turmeric', 'Spices'],
    nutrition: { servingSize: '10g', energy: '24 kcal', protein: '0.8g', carbs: '2.4g', totalFat: '1.5g', sodium: '195mg' },
    shelfLife: '12 Months',
    storage: 'Keep in dry jar.'
  },

  // 31. Royal Ker Sangri Heritage Pickle
  {
    id: 'ker-sangri-achar',
    slug: 'royal-ker-sangri-heritage-achar',
    name: 'Royal Ker Sangri Heritage Pickle',
    hindiName: 'Royal Marwari Ker Sangri Pickle',
    category: 'heritage',
    categoryName: 'Heritage Rajasthani Pickles',
    price: 349,
    mrp: 420,
    discount: '17% OFF',
    rating: 5.0,
    reviewCount: 680,
    badge: 'Royal Heritage',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 18,
    image: '/images/products/marusthali-heritage-jar.jpg',
    gallery: [
      "/images/products/marusthali-heritage-jar.jpg",
      "/images/products/mango-clay-barni.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 199, mrp: 240 },
      { size: '500 g', price: 349, mrp: 420 },
      { size: '1 kg', price: 629, mrp: 750 }
    ],
    shortDesc: 'The crown jewel of Marwari cuisine! Wild desert Ker berries and Sangri beans steeped in cold-pressed oil.',
    fullDesc: 'The quintessential royal delicacy of Rajasthan! Wild dessert berries (Ker) and sun-dried desert bean pods (Sangri) sourced from the Thar desert, soaked in buttermilk to reduce tartness, and slow-tempered in pure cold-pressed mustard oil with royal spices and whole red chillies.',
    bullets: ['Authentic Thar desert Ker & Sangri', 'Handpicked wild desert harvest', 'Traditional royal Marwari recipe', 'Aged to perfection in ceramic barnis'],
    ingredients: ['Wild Ker Berries (30%)', 'Desert Sangri Pods (32%)', 'Cold-Pressed Mustard Oil (24%)', 'Amchur', 'Red Chilli', 'Fennel', 'Kalonji', 'Sendha Namak'],
    nutrition: { servingSize: '10g', energy: '29 kcal', protein: '1.1g', carbs: '1.8g', totalFat: '2.1g', sodium: '215mg' },
    shelfLife: '12 Months',
    storage: 'Keep immersed in oil.'
  },

  // 32. Jodhpuri Heeng & Raw Mango Heritage Pickle
  {
    id: 'heeng-kachha-aam',
    slug: 'jodhpuri-heeng-mango-heritage-achar',
    name: 'Jodhpuri Heeng & Raw Mango Pickle',
    hindiName: 'Royal Jodhpuri Hing Aam Pickle',
    category: 'heritage',
    categoryName: 'Heritage Rajasthani Pickles',
    price: 289,
    mrp: 340,
    discount: '15% OFF',
    rating: 4.9,
    reviewCount: 510,
    badge: 'Pure Jain Style',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 20,
    image: '/images/products/jar-chatpata-aam.jpg',
    gallery: [
      "/images/products/jar-chatpata-aam.jpg",
      "/images/products/mango-bowl-serving.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 169, mrp: 199 },
      { size: '500 g', price: 289, mrp: 340 },
      { size: '1 kg', price: 529, mrp: 620 }
    ],
    shortDesc: 'Aged raw mango chunks infused with unadulterated high-potency Hathras Heeng and zero onion-garlic.',
    fullDesc: 'A centuries-old royal Jodhpuri household preparation made without onion or garlic. Firm green Ramkela mangoes tossed in dry-roasted spices and pure aromatic compounded asafoetida (Hing) from Hathras, delivering an intensely savory aroma and crisp tang.',
    bullets: ['Pure unadulterated Hathras Heeng', 'No onion, no garlic pure Jain-friendly recipe', 'Aged in earthen jars', 'Bold digestive aroma'],
    ingredients: ['Raw Green Mangoes (65%)', 'Cold-Pressed Mustard Oil (22%)', 'Compounded Asafoetida (Hing) (3%)', 'Sendha Namak', 'Rai Kuria', 'Methi', 'Haldi', 'Red Chilli'],
    nutrition: { servingSize: '10g', energy: '26 kcal', protein: '0.4g', carbs: '1.3g', totalFat: '2.3g', sodium: '240mg' },
    shelfLife: '12 Months',
    storage: 'Store in dry jar.'
  },

  // 33. Spicy Garlic & Crushed Chilli Pickle (Thecha Style)
  {
    id: 'lahsun-mirch-thecha',
    slug: 'spicy-garlic-chilli-thecha-achar',
    name: 'Spicy Garlic & Crushed Chilli Pickle',
    hindiName: 'Desi Lahsun Mirch Thecha Pickle',
    category: 'garlic',
    categoryName: 'Garlic Pickles',
    price: 269,
    mrp: 319,
    discount: '16% OFF',
    rating: 4.8,
    reviewCount: 460,
    badge: 'Extra Spicy',
    badgeType: 'spicy',
    spiceLevel: 'Extra Spicy',
    inStock: true,
    stockCount: 25,
    image: '/images/products/jar-lahsun-classic.jpg',
    gallery: [
      "/images/products/jar-lahsun-classic.jpg",
      "/images/products/card-redmirch.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 159, mrp: 189 },
      { size: '500 g', price: 269, mrp: 319 },
      { size: '1 kg', price: 489, mrp: 580 }
    ],
    shortDesc: 'Coarsely pounded whole garlic cloves and fiery green chillies roasted in cold-pressed mustard oil.',
    fullDesc: 'A robust rustic delicacy! Fresh juicy garlic cloves are stone-crushed with pungent chillies, roasted cumin seeds, and yellow mustard. Cooked gently in mustard oil for deep caramelization and lingering warmth.',
    bullets: ['Stone-crushed desi garlic', 'Fiery green chilli kick', 'Roasted cumin & mustard seeds', 'Ideal companion for parathas & dal-rice'],
    ingredients: ['Desi Garlic Cloves (52%)', 'Crushed Green Chilli (20%)', 'Mustard Oil (20%)', 'Roasted Jeera', 'Salt', 'Lemon Juice', 'Spices'],
    nutrition: { servingSize: '10g', energy: '32 kcal', protein: '0.7g', carbs: '1.9g', totalFat: '2.5g', sodium: '220mg' },
    shelfLife: '12 Months',
    storage: 'Keep in dry jar.'
  },

  // 34. Rajasthani Mirchi Tipore Pickle
  {
    id: 'hari-mirch-tipore',
    slug: 'rajasthani-hari-mirch-tipore',
    name: 'Rajasthani Mirchi Tipore Pickle',
    hindiName: 'Traditional Mirchi Ke Tipore',
    category: 'green-mirch',
    categoryName: 'Green Chilli Pickles',
    price: 239,
    mrp: 289,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 540,
    badge: 'Thali Favorite',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 30,
    image: '/images/products/jar-green-mirch.jpg',
    gallery: [
      "/images/products/jar-green-mirch.jpg",
      "/images/products/card-mix.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 139, mrp: 169 },
      { size: '500 g', price: 239, mrp: 289 },
      { size: '1 kg', price: 429, mrp: 520 }
    ],
    shortDesc: 'Sliced tender Bhavnagri green chillies flash-sauteed with fennel seeds, turmeric, and dry amchur.',
    fullDesc: 'The quintessential instant side on every traditional Rajasthani thali. Plump, mildly spiced green chillies cut into bite-sized rounds and tossed in hot mustard oil with fragrant saunf, coriander, and tangy amchur.',
    bullets: ['Mild Bhavnagri chillies', 'Saunf & Amchur seasoning', 'Classic companion for dal baati churma', 'Crunchy bite with instant zest'],
    ingredients: ['Green Chillies (65%)', 'Mustard Oil (20%)', 'Fennel Seeds (Saunf)', 'Amchur', 'Turmeric', 'Coriander Powder', 'Salt'],
    nutrition: { servingSize: '10g', energy: '22 kcal', protein: '0.5g', carbs: '1.6g', totalFat: '1.7g', sodium: '190mg' },
    shelfLife: '9 Months',
    storage: 'Store in cool dry place.'
  },

  // 35. Mathania Red Chilli Kutta Pickle
  {
    id: 'lal-mirch-kutta',
    slug: 'mathania-lal-mirch-kutta-achar',
    name: 'Mathania Red Chilli Kutta Pickle',
    hindiName: 'Mathania Red Chilli Kutta Pickle',
    category: 'red-mirch',
    categoryName: 'Red Chilli Pickles',
    price: 269,
    mrp: 319,
    discount: '16% OFF',
    rating: 4.9,
    reviewCount: 620,
    badge: 'Mathania Special',
    badgeType: 'bestseller',
    spiceLevel: 'Spicy',
    inStock: true,
    stockCount: 24,
    image: '/images/products/card-redmirch.jpg',
    gallery: [
      "/images/products/card-redmirch.jpg",
      "/images/products/jar-bharwa-mirch.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 159, mrp: 189 },
      { size: '500 g', price: 269, mrp: 319 },
      { size: '1 kg', price: 489, mrp: 580 }
    ],
    shortDesc: 'Coarsely crushed Mathania red chillies sun-cured with yellow mustard seeds, lemon, and mustard oil.',
    fullDesc: 'Prepared using renowned deep-red Mathania chillies from Jodhpur. Instead of whole stuffing, the chillies are crushed (kutta) into a vibrant coarse relish with yellow mustard and lemon juice, yielding a spicy, sour explosion.',
    bullets: ['Authentic Jodhpur Mathania chillies', 'Coarsely pounded rustic texture', 'Vibrant natural crimson color', 'Slow cured in mustard oil'],
    ingredients: ['Mathania Red Chillies (60%)', 'Mustard Oil (22%)', 'Yellow Mustard (Rai)', 'Lemon Juice', 'Fennel', 'Salt', 'Spices'],
    nutrition: { servingSize: '10g', energy: '28 kcal', protein: '0.7g', carbs: '1.8g', totalFat: '2.2g', sodium: '230mg' },
    shelfLife: '12 Months',
    storage: 'Keep in dry jar.'
  },

  // 36. Digestive Lemon, Ginger & Green Chilli Pickle
  {
    id: 'nimbu-adrak-mirch',
    slug: 'lemon-ginger-chilli-pachak-achar',
    name: 'Digestive Lemon, Ginger & Chilli Pickle',
    hindiName: 'Lemon Ginger Chilli Pachak Pickle',
    category: 'nimbu',
    categoryName: 'Lemon Pickles',
    price: 249,
    mrp: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 490,
    badge: 'Oil-Free Pachak',
    badgeType: 'popular',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 28,
    image: '/images/products/card-nimbu.jpg',
    gallery: [
      "/images/products/card-nimbu.jpg",
      "/images/products/jar-nimbu-sweet.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 149, mrp: 179 },
      { size: '500 g', price: 249, mrp: 299 },
      { size: '1 kg', price: 449, mrp: 549 }
    ],
    shortDesc: 'Sun-cured Kagzi lemons tossed with fresh ginger juliennes, green chillies, and digestive rock salts.',
    fullDesc: 'A staple digestive pickle found in ancestral homes. Juicy thin-skinned Kagzi lemons quartered and tossed with fresh spicy ginger matchsticks, mild green chillies, black salt, and roasted cumin. Oil-free sun-cured perfection.',
    bullets: ['Fresh Kagzi lemons & ginger juliennes', 'Zero oil digestive preparation', 'Enriched with black salt & roasted jeera', 'Refreshing zesty bite'],
    ingredients: ['Kagzi Lemons (55%)', 'Fresh Ginger (20%)', 'Green Chillies (12%)', 'Rock Salt & Black Salt (8%)', 'Roasted Cumin & Carom Seeds (Ajwain)'],
    nutrition: { servingSize: '10g', energy: '18 kcal', protein: '0.3g', carbs: '3.2g', totalFat: '0.1g', sodium: '210mg' },
    shelfLife: '18 Months',
    storage: 'Store in cool dry place.'
  },

  // 37. Royal Rajasthani Shahi Mixed Pickle
  {
    id: 'rajasthani-shahi-mix',
    slug: 'royal-rajasthani-shahi-mixed-achar',
    name: 'Royal Rajasthani Shahi Mixed Pickle',
    hindiName: 'Royal Shahi Pachranga Pickle',
    category: 'mix',
    categoryName: 'Mixed Pickles',
    price: 259,
    mrp: 309,
    discount: '16% OFF',
    rating: 4.9,
    reviewCount: 570,
    badge: 'Royal Feast',
    badgeType: 'bestseller',
    spiceLevel: 'Medium',
    inStock: true,
    stockCount: 26,
    image: '/images/products/jar-punjabi-mix.jpg',
    gallery: [
      "/images/products/jar-punjabi-mix.jpg",
      "/images/products/jar-pachranga.jpg",
      "/images/products/achar-bowl-serving.jpg"
    ],
    packSizes: [
      { size: '250 g', price: 159, mrp: 189 },
      { size: '500 g', price: 259, mrp: 309 },
      { size: '1 kg', price: 469, mrp: 560 }
    ],
    shortDesc: 'Sun-dried raw mango, baby carrots, lotus stem (Kamal Kakdi), and whole spices marinated in mustard oil.',
    fullDesc: 'A rich ceremonial medley combining tender lotus stems, tart green mango cubes, baby winter carrots, and slit chillies. Cured with cracked coriander seeds, kalonji, and mustard oil for a royal crunchy relish.',
    bullets: ['Lotus stem (Kamal Kakdi) & raw mango', 'Five seasonal farm-fresh vegetables', 'Aged with cracked whole spices', 'Authentic wedding feast recipe'],
    ingredients: ['Vegetables (Lotus Stem, Raw Mango, Carrot, Chilli, Lime) (66%)', 'Mustard Oil (22%)', 'Salt', 'Saunf', 'Kalonji', 'Spices'],
    nutrition: { servingSize: '10g', energy: '26 kcal', protein: '0.5g', carbs: '1.6g', totalFat: '2.1g', sodium: '225mg' },
    shelfLife: '12 Months',
    storage: 'Store in dry place.'
  }
];
