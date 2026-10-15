const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Tenant = require('../src/models/Tenant');
const Category = require('../src/models/Category');
const Product = require('../src/models/Product');
const ServicePackage = require('../src/models/ServicePackage');
const Lead = require('../src/models/Lead');
const Order = require('../src/models/Order');

const richCategories = [
  {
    name: 'Mango Delights (Aam)',
    slug: 'mango-delights',
    description: 'Traditional sun-dried raw mango pickles infused with aromatic spices',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80',
    orderIndex: 1,
  },
  {
    name: 'Stuffed Red Chilli (Lal Mirch)',
    slug: 'stuffed-red-chilli',
    description: 'Authentic Banarasi thick red chillies stuffed with heirloom masala',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500&auto=format&fit=crop&q=80',
    orderIndex: 2,
  },
  {
    name: 'Citrus & Lemon (Nimbu)',
    slug: 'citrus-lemon',
    description: 'Zero-oil sun-matured lemon pickles with digestive rock salt and hing',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    orderIndex: 3,
  },
  {
    name: 'Garlic & Spicy Blends',
    slug: 'garlic-spicy',
    description: 'Bold Rajasthani garlic pods and sharp green chillies in cold-pressed oil',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    orderIndex: 4,
  },
  {
    name: 'Heritage Mixed & Sweet',
    slug: 'heritage-mixed',
    description: 'Pachranga mixed winter veggies and Gujarati sweet mango chunda',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80',
    orderIndex: 5,
  },
];

const richProducts = [
  {
    name: 'Desi Kacchi Kairi Mango Achar',
    slug: 'desi-kacchi-kairi-mango-achar',
    categorySlug: 'mango-delights',
    description: 'Handcrafted with unblemished Ramkela mangoes, roasted fenugreek, nigella seeds, and pure cold-pressed mustard oil. Sun-cured for 21 days for maximum crunch and tangy kick.',
    price: 299,
    compareAtPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { name: '500g Traditional Glass Jar', sku: 'DKM-500G', price: 299, compareAtPrice: 399, stockQuantity: 85 },
      { name: '1 Kg Family Value Pack', sku: 'DKM-1KG', price: 549, compareAtPrice: 749, stockQuantity: 50 },
    ],
  },
  {
    name: 'Banarasi Bharwa Lal Mirch Achar',
    slug: 'banarasi-bharwa-lal-mirch-achar',
    categorySlug: 'stuffed-red-chilli',
    description: 'Famed thick Banarasi winter red chillies hand-stuffed with a fragrant blend of roasted amchur, fennel, coriander, mustard seeds, and mountain rock salt. Deep, smoky, and mildly spicy.',
    price: 349,
    compareAtPrice: 449,
    images: [
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { name: '400g Signature Jar', sku: 'BLM-400G', price: 349, compareAtPrice: 449, stockQuantity: 60 },
      { name: '800g Jumbo Pack', sku: 'BLM-800G', price: 649, compareAtPrice: 849, stockQuantity: 35 },
    ],
  },
  {
    name: 'Khatta Meetha Sun-Dried Nimbu Pickle (Zero Oil)',
    slug: 'khatta-meetha-nimbu-pickle',
    categorySlug: 'citrus-lemon',
    description: '100% oil-free Ayurvedic recipe. Thin-skinned Kagzi lemons naturally cured in rock salt, black salt, and organic sugarcane jaggery under the sun for 60 days. Wonderful for digestion.',
    price: 280,
    compareAtPrice: 360,
    images: [
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { name: '500g Jar', sku: 'KMN-500G', price: 280, compareAtPrice: 360, stockQuantity: 70 },
      { name: '1 Kg Bulk Jar', sku: 'KMN-1KG', price: 499, compareAtPrice: 650, stockQuantity: 40 },
    ],
  },
  {
    name: 'Rajasthani Desi Lahsun & Hari Mirch Achar',
    slug: 'rajasthani-desi-lahsun-hari-mirch',
    categorySlug: 'garlic-spicy',
    description: 'Peeled whole garlic cloves and slit spicy green chillies tempered with crushed yellow mustard, asafoetida, and hot mustard oil. Perfect companion for dal-chawal and stuffed parathas.',
    price: 320,
    compareAtPrice: 420,
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { name: '350g Jar', sku: 'RDL-350G', price: 320, compareAtPrice: 420, stockQuantity: 65 },
      { name: '700g Double Pack', sku: 'RDL-700G', price: 580, compareAtPrice: 780, stockQuantity: 30 },
    ],
  },
  {
    name: 'Royal Winter Pachranga Mix Veg Achar',
    slug: 'royal-winter-pachranga-mix-veg',
    categorySlug: 'heritage-mixed',
    description: 'Heirloom village recipe combining crispy cauliflower florets, red carrots, knol-khol, turnip, and raw mango slivers. Seasoned with rai, haldi, and cold-pressed mustard oil.',
    price: 270,
    compareAtPrice: 350,
    images: [
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { name: '500g Jar', sku: 'RWP-500G', price: 270, compareAtPrice: 350, stockQuantity: 90 },
      { name: '1 Kg Jar', sku: 'RWP-1KG', price: 480, compareAtPrice: 650, stockQuantity: 55 },
    ],
  },
  {
    name: 'Gujarati Sweet Mango Chunda (Methia Masala)',
    slug: 'gujarati-sweet-mango-chunda',
    categorySlug: 'heritage-mixed',
    description: 'Finely grated Rajapuri mangoes cooked gently with roasted cumin, cinnamon, Kashmiri chili powder, and natural sugar. The iconic sweet-tangy preserve cherished by kids and families.',
    price: 310,
    compareAtPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { name: '450g Glass Jar', sku: 'GMC-450G', price: 310, compareAtPrice: 399, stockQuantity: 75 },
      { name: '900g Family Pack', sku: 'GMC-900G', price: 560, compareAtPrice: 720, stockQuantity: 40 },
    ],
  },
];

const richStudioPackages = [
  {
    name: 'Pre-Wedding Cinematic Film & Photoshoot',
    slug: 'pre-wedding-cinematic-film',
    category: 'PHOTOGRAPHY',
    duration: '1 Full Day (10 Hours)',
    price: 25000,
    advanceTokenPercent: 25,
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80'],
    description: 'Full-day cinematic shoot at scenic heritage or outdoor locations. Includes 4K cinematic video teaser, 50 master-edited portraits, and aerial drone coverage.',
    deliverables: [
      '3-4 Minute 4K Cinematic Teaser Film',
      '50 Retouched High-Resolution Photographs',
      'Full RAW Footage Archive on SSD',
      'DJI 4K Drone Aerial Shots Included',
      '2 Custom Outfit & Location Changes',
    ],
  },
  {
    name: 'Royal Destination Wedding 3-Day Coverage',
    slug: 'royal-destination-wedding',
    category: 'WEDDING',
    duration: '3 Days (Mehendi, Sangeet & Reception)',
    price: 85000,
    advanceTokenPercent: 30,
    images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80'],
    description: 'Complete luxury wedding documentation by a 5-member master crew. Includes traditional photography, candid portraiture, live streaming setup, and luxury coffee table albums.',
    deliverables: [
      'Full 45-60 Min Feature Wedding Film',
      '150 Premium Hand-Edited Album Portraits',
      '2 Deluxe Hardcover Flush-Mount Albums (30 Sheets)',
      'Instagram Reels & Same-Day Edit Highlights',
      'Complete Candid & Traditional Crew (5 Photographers)',
    ],
  },
  {
    name: 'Baby & Maternity Fine-Art Studio Portfolio',
    slug: 'baby-maternity-portfolio',
    category: 'STUDIO',
    duration: '3 Hours Studio Session',
    price: 8500,
    advanceTokenPercent: 20,
    images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop&q=80'],
    description: 'Gentle, temperature-controlled studio environment with curated designer props, floral backgrounds, and maternity gowns. Stress-free pacing for mother and baby.',
    deliverables: [
      '20 Fine-Art Retouched Digital Portraits',
      '4 Themed Studio Setup Backgrounds',
      'Complimentary Maternity Gown & Baby Wraps',
      'Framed 12×18 Canvas Wall Print',
    ],
  },
  {
    name: 'Manali & Kasol 4D/3N Adventure Group Tour',
    slug: 'manali-kasol-adventure-tour',
    category: 'TRAVEL',
    duration: '4 Days / 3 Nights',
    price: 12999,
    advanceTokenPercent: 25,
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'],
    description: 'Guided mountain tour covering Solang Valley, Rohtang Pass, Kasol Manikaran Sahib, and riverside luxury camps. Includes transfers, meals, and certified trek guides.',
    deliverables: [
      'Volvo Bus Transfers from Delhi / Chandigarh',
      '3 Nights Hotel & Riverside Swiss Tents',
      'Daily Buffet Breakfast and Dinner Included',
      'Campfire & Live Music Evening',
      'Solang Valley & Manikaran Sightseeing',
    ],
  },
  {
    name: 'Kerala Backwaters & Munnar Tea Hills Tour',
    slug: 'kerala-backwaters-munnar-tour',
    category: 'TRAVEL',
    duration: '5 Days / 4 Nights',
    price: 24500,
    advanceTokenPercent: 30,
    images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80'],
    description: 'Romantic Kerala escapade featuring a private luxury houseboat cruise in Alleppey backwaters and scenic hillside resort stay among Munnar rolling tea plantations.',
    deliverables: [
      'Private AC Cab for Complete 5 Days',
      '1 Night AC Deluxe Houseboat Cruise (All Meals)',
      '3 Nights Luxury Tea Estate View Resort',
      'Eravikulam National Park & Tea Museum Visits',
      'Complimentary Ayurvedic Herbal Massage Session',
    ],
  },
];

const seedRichData = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/omniva_saas';
  console.log('[Seed Engine] Connecting to:', mongoUri);
  await mongoose.connect(mongoUri);

  // 1. Desi Rasoi Achar (Product Business)
  const productTenant = await Tenant.findOne({ slug: 'desi-rasoi-achar-1' });
  if (!productTenant) {
    console.error('Tenant desi-rasoi-achar-1 not found!');
    process.exit(1);
  }
  console.log('Seeding rich catalog for:', productTenant.businessName);

  // Clear previous sample categories and products
  await Category.deleteMany({ businessId: productTenant._id });
  await Product.deleteMany({ businessId: productTenant._id });

  // Insert rich categories
  const categoryMap = {};
  for (const catData of richCategories) {
    const createdCat = await Category.create({
      businessId: productTenant._id,
      name: catData.name,
      slug: catData.slug,
      description: catData.description,
      image: catData.image,
      orderIndex: catData.orderIndex,
      isActive: true,
    });
    categoryMap[catData.slug] = createdCat._id;
  }
  console.log(`✓ Inserted ${Object.keys(categoryMap).length} categories with high-res photos`);

  // Insert rich products
  for (const prodData of richProducts) {
    const catId = categoryMap[prodData.categorySlug] || null;
    await Product.create({
      businessId: productTenant._id,
      categoryId: catId,
      name: prodData.name,
      slug: prodData.slug,
      description: prodData.description,
      price: prodData.price,
      compareAtPrice: prodData.compareAtPrice,
      images: prodData.images,
      variants: prodData.variants,
      isAvailable: true,
      trackQuantity: true,
      stockQuantity: prodData.variants.reduce((sum, v) => sum + v.stockQuantity, 0),
    });
  }
  console.log(`✓ Inserted ${richProducts.length} premium pickle products with variants & photos`);

  // 2. Royal Films Studio (Service & Travel Business)
  const serviceTenant = await Tenant.findOne({ slug: 'royal-films-studio-1' });
  if (serviceTenant) {
    console.log('Seeding rich service packages for:', serviceTenant.businessName);
    await ServicePackage.deleteMany({ businessId: serviceTenant._id });

    for (const pkgData of richStudioPackages) {
      await ServicePackage.create({
        businessId: serviceTenant._id,
        name: pkgData.name,
        slug: pkgData.slug,
        category: pkgData.category,
        duration: pkgData.duration,
        price: pkgData.price,
        advanceTokenPercent: pkgData.advanceTokenPercent,
        description: pkgData.description,
        deliverables: pkgData.deliverables,
        images: pkgData.images,
        isActive: true,
      });
    }
    console.log(`✓ Inserted ${richStudioPackages.length} rich shoot and travel packages`);
  }

  // 3. Ensure Realistic Orders exist for Desi Rasoi Achar
  const existingOrders = await Order.countDocuments({ businessId: productTenant._id });
  if (existingOrders === 0) {
    console.log('Generating realistic sample orders with live status...');
    const createdProds = await Product.find({ businessId: productTenant._id });
    const sampleOrders = [
      {
        businessId: productTenant._id,
        orderNumber: 'ORD-894120-101',
        customerName: 'Aarav Sharma',
        customerPhone: '+919811223344',
        customerEmail: 'aarav.sharma@gmail.com',
        shippingAddress: { street: 'B-14, Model Town', city: 'Delhi', state: 'Delhi', pincode: '110009' },
        items: [
          {
            productId: createdProds[0]._id,
            variantId: createdProds[0].variants[0]._id,
            name: createdProds[0].name,
            variantName: createdProds[0].variants[0].name,
            price: createdProds[0].variants[0].price,
            quantity: 2,
            subtotal: createdProds[0].variants[0].price * 2,
            image: createdProds[0].images[0],
          },
        ],
        subtotal: 598,
        shippingFee: 0,
        totalAmount: 598,
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        orderStatus: 'CONFIRMED',
        attribution: { utmSource: 'Instagram Ad', utmCampaign: 'Diwali Homemade Achar Promo' },
        timeline: [
          { status: 'NEW', note: 'Order placed via Instagram Reel Ad', updatedBy: 'Customer', timestamp: new Date(Date.now() - 3600000) },
          { status: 'CONFIRMED', note: 'Order confirmed with customer over WhatsApp', updatedBy: 'Rahul Sharma', timestamp: new Date(Date.now() - 1800000) },
        ],
      },
      {
        businessId: productTenant._id,
        orderNumber: 'ORD-894120-102',
        customerName: 'Priya Mehra',
        customerPhone: '+919876501234',
        customerEmail: 'priya.mehra@yahoo.com',
        shippingAddress: { street: '74, Indiranagar 100ft Rd', city: 'Bengaluru', state: 'Karnataka', pincode: '560038' },
        items: [
          {
            productId: createdProds[1]._id,
            variantId: createdProds[1].variants[0]._id,
            name: createdProds[1].name,
            variantName: createdProds[1].variants[0].name,
            price: createdProds[1].variants[0].price,
            quantity: 1,
            subtotal: createdProds[1].variants[0].price,
            image: createdProds[1].images[0],
          },
          {
            productId: createdProds[2]._id,
            variantId: createdProds[2].variants[0]._id,
            name: createdProds[2].name,
            variantName: createdProds[2].variants[0].name,
            price: createdProds[2].variants[0].price,
            quantity: 1,
            subtotal: createdProds[2].variants[0].price,
            image: createdProds[2].images[0],
          },
        ],
        subtotal: 629,
        shippingFee: 0,
        totalAmount: 629,
        paymentMethod: 'ONLINE',
        paymentStatus: 'PAID',
        orderStatus: 'SHIPPED',
        courierDetails: {
          courierPartner: 'BlueDart Air',
          trackingNumber: 'BLUEDART-88992211',
          shippedAt: new Date(),
        },
        attribution: { utmSource: 'Facebook Ad', utmCampaign: 'Banarasi Mirch Foodies Special' },
        timeline: [
          { status: 'NEW', note: 'Online payment received via Razorpay (pay_291028)', updatedBy: 'Razorpay Webhook', timestamp: new Date(Date.now() - 7200000) },
          { status: 'CONFIRMED', note: 'Payment verified', updatedBy: 'System', timestamp: new Date(Date.now() - 7000000) },
          { status: 'SHIPPED', note: 'Dispatched via BlueDart Air. Tracking: BLUEDART-88992211', updatedBy: 'Rahul Sharma', timestamp: new Date(Date.now() - 1000000) },
        ],
      },
    ];

    await Order.insertMany(sampleOrders);
    console.log(`✓ Inserted ${sampleOrders.length} realistic orders with courier tracking`);
  }

  console.log('\n[Seed Engine] Rich Data Seeding Completed Successfully!\n');
  await mongoose.disconnect();
};

seedRichData().catch((err) => {
  console.error('[Seed Engine Fatal Error]:', err);
  process.exit(1);
});
