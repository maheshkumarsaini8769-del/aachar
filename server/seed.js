import Product from './models/Product.js';
import { products as initialProducts } from '../src/data/products.js';

export async function seedInitialProducts(force = false) {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0 && !force) {
      console.log(`[Seed] Database already contains ${existingCount} products. Skipping initial seed.`);
      return { seeded: false, count: existingCount };
    }

    if (force && existingCount > 0) {
      console.log('[Seed] Force seeding requested. Removing existing products...');
      await Product.deleteMany({});
    }

    console.log(`[Seed] Seeding ${initialProducts.length} initial products into MongoDB...`);

    const enriched = initialProducts.map((p, idx) => {
      const catCode = (p.category || 'achar').toUpperCase().slice(0, 3);
      const skuNumber = String(idx + 1).padStart(3, '0');
      const baseSku = p.sku || `DR-${catCode}-${skuNumber}`;

      // Build standard box pricing if not already defined
      const defaultBoxPricing = [
        {
          boxType: 'Single Jar Box',
          packCount: 1,
          price: p.price,
          mrp: p.mrp || Math.round(p.price * 1.2),
          description: 'Single Handcrafted Pickle Jar in Sturdy Kraft Carton Box',
          stock: p.stockCount || 50
        },
        {
          boxType: 'Duo Gift Box (2 Jars)',
          packCount: 2,
          price: Math.round(p.price * 2 * 0.94),
          mrp: Math.round((p.mrp || p.price * 1.2) * 2),
          description: 'Twin Jar Heritage Gift Box with Traditional Ribbon Tie',
          stock: Math.floor((p.stockCount || 50) / 2)
        },
        {
          boxType: 'Family Treat Box (3 Jars)',
          packCount: 3,
          price: Math.round(p.price * 3 * 0.90),
          mrp: Math.round((p.mrp || p.price * 1.2) * 3),
          description: '3-Jar Value Box in Gold Foil Keepsake Box with Wooden Spoons',
          stock: Math.floor((p.stockCount || 50) / 3)
        },
        {
          boxType: 'Royal Tasting Box (4 Jars)',
          packCount: 4,
          price: Math.round(p.price * 4 * 0.88),
          mrp: Math.round((p.mrp || p.price * 1.2) * 4),
          description: '4-Jar Royal Hamper Box with Greeting Card and Brass Dipper',
          stock: Math.floor((p.stockCount || 50) / 4)
        }
      ];

      // Enrich packSizes with SKUs and stock if missing
      const enrichedPackSizes = Array.isArray(p.packSizes) && p.packSizes.length > 0
        ? p.packSizes.map(ps => ({
            size: ps.size,
            price: ps.price,
            mrp: ps.mrp || Math.round(ps.price * 1.2),
            stock: ps.stock !== undefined ? ps.stock : 50,
            sku: ps.sku || `${baseSku}-${ps.size.replace(/\s+/g, '')}`
          }))
        : [
            { size: '250 g', price: Math.round(p.price * 0.6), mrp: Math.round((p.mrp || p.price * 1.2) * 0.6), stock: 50, sku: `${baseSku}-250G` },
            { size: '500 g', price: p.price, mrp: p.mrp || Math.round(p.price * 1.2), stock: 50, sku: `${baseSku}-500G` },
            { size: '1 kg', price: Math.round(p.price * 1.8), mrp: Math.round((p.mrp || p.price * 1.2) * 1.8), stock: 30, sku: `${baseSku}-1KG` }
          ];

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        hindiName: p.hindiName || p.name,
        category: p.category,
        categoryName: p.categoryName || `${p.category} Pickles`,
        price: p.price,
        mrp: p.mrp || Math.round(p.price * 1.2),
        salePrice: p.price,
        discount: p.discount || '',
        sku: baseSku,
        rating: p.rating || 4.8,
        reviewCount: p.reviewCount || 100,
        badge: p.badge || '',
        badgeType: p.badgeType || '',
        spiceLevel: p.spiceLevel || 'Medium',
        inStock: p.inStock !== undefined ? p.inStock : true,
        stockCount: p.stockCount || 50,
        isBestseller: !!p.isBestseller,
        isFeatured: !!p.isFeatured,
        status: 'published',
        image: p.image,
        gallery: p.gallery || [p.image],
        packSizes: enrichedPackSizes,
        boxPricing: defaultBoxPricing,
        shortDesc: p.shortDesc || '',
        fullDesc: p.fullDesc || '',
        bullets: p.bullets || [],
        ingredients: p.ingredients || [],
        nutrition: p.nutrition || {
          servingSize: '10g (approx 1 tsp)',
          energy: '28 kcal',
          protein: '0.4g',
          carbs: '1.2g',
          totalFat: '2.5g',
          sodium: '240mg'
        },
        shelfLife: p.shelfLife || '12 Months',
        storage: p.storage || 'Store in a cool dry place. Use dry wooden or stainless steel spoon.'
      };
    });

    const inserted = await Product.insertMany(enriched);
    console.log(`[Seed] Successfully seeded ${inserted.length} products into MongoDB.`);
    return { seeded: true, count: inserted.length };
  } catch (error) {
    console.error('[Seed] Error seeding initial products:', error);
    throw error;
  }
}
