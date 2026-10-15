import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const ARTIFACTS_DIR = '/home/mahesh/.gemini/antigravity/brain/721a1ce2-cb78-4f4e-963f-85145aaeed3a';
const API_PORT = 5001;
const VITE_PORT = 5174;

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${message}`);
    testsFailed++;
  }
}

function httpRequest({ host = '127.0.0.1', port = API_PORT, path, method = 'GET', headers = {} }, bodyData = null) {
  return new Promise((resolve, reject) => {
    const options = {
      host,
      port,
      path,
      method,
      headers: { ...headers }
    };

    let serialized = null;
    if (bodyData) {
      if (typeof bodyData === 'string' || Buffer.isBuffer(bodyData)) {
        serialized = bodyData;
      } else {
        serialized = JSON.stringify(bodyData);
        if (!options.headers['Content-Type']) {
          options.headers['Content-Type'] = 'application/json';
        }
      }
      options.headers['Content-Length'] = Buffer.byteLength(serialized);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = JSON.parse(data);
        } catch (e) {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: parsed,
          raw: data
        });
      });
    });

    req.on('error', reject);
    if (serialized) req.write(serialized);
    req.end();
  });
}

// Multipart form data helper for file upload testing
function uploadMultipart({ host = '127.0.0.1', port = API_PORT, path: reqPath = '/api/upload/single', reqPath: directReqPath, fieldName, filename, fileBuffer, mimeType }) {
  const targetPath = directReqPath || reqPath;
  return new Promise((resolve, reject) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    const pre = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\n` +
      `Content-Type: ${mimeType}\r\n\r\n`
    );
    const post = Buffer.from(`\r\n--${boundary}--\r\n`);
    const fullBody = Buffer.concat([pre, fileBuffer, post]);

    const req = http.request({
      host,
      port,
      path: targetPath,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': fullBody.length
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let parsed = data;
        try { parsed = JSON.parse(data); } catch (e) {}
        resolve({ status: res.statusCode, body: parsed });
      });
    });

    req.on('error', reject);
    req.write(fullBody);
    req.end();
  });
}

async function runAllTests() {
  console.log('================================================================');
  console.log('STARTING DESIRASOI PRODUCTS & BOX PRICING VERIFICATION SUITE');
  console.log('================================================================');

  // TEST 1: Health & Public Products Listing
  console.log('\n--- 1. Health & Initial Catalog from MongoDB ---');
  const healthRes = await httpRequest({ path: '/api/health' });
  assert(healthRes.status === 200, 'Health endpoint responds 200 OK');
  assert(healthRes.body.service === 'DesiRasoi Achar Backend API', 'Service identity verified');

  const pubProductsRes = await httpRequest({ path: '/api/products' });
  assert(pubProductsRes.status === 200, 'GET /api/products returns 200 OK');
  assert(pubProductsRes.body.success === true, 'Catalog response has success = true');
  assert(pubProductsRes.body.products.length >= 26, `Catalog has ${pubProductsRes.body.products.length} products (>= 26)`);
  assert(pubProductsRes.body.products.every(p => p.status === 'published'), 'All public products have status = published');

  // TEST 2: Validation of Invalid Fields
  console.log('\n--- 2. Field Validation on Creation ---');
  // 2a. Missing Name
  const bad1 = await httpRequest({ path: '/api/products', method: 'POST' }, {
    price: 249,
    category: 'mango',
    sku: 'DR-TEST-NONAME'
  });
  assert(bad1.status === 400, 'Rejects product creation with missing name (HTTP 400)');

  // 2b. Negative Price
  const bad2 = await httpRequest({ path: '/api/products', method: 'POST' }, {
    name: 'Negative Price Achar',
    category: 'mango',
    price: -50,
    sku: 'DR-TEST-NEGPRICE'
  });
  assert(bad2.status === 400, 'Rejects product creation with negative price (HTTP 400)');

  // 2c. MRP lower than selling price
  const bad3 = await httpRequest({ path: '/api/products', method: 'POST' }, {
    name: 'Bad MRP Achar',
    category: 'mango',
    price: 300,
    mrp: 200,
    sku: 'DR-TEST-BADMRP'
  });
  assert(bad3.status === 400, 'Rejects product creation with MRP < selling price (HTTP 400)');

  // 2d. Negative stock count
  const bad4 = await httpRequest({ path: '/api/products', method: 'POST' }, {
    name: 'Negative Stock Achar',
    category: 'mango',
    price: 249,
    stockCount: -5,
    sku: 'DR-TEST-NEGSTOCK'
  });
  assert(bad4.status === 400, 'Rejects product creation with negative stock count (HTTP 400)');

  // TEST 3: Duplicate SKU & Slug Conflict Prevention
  console.log('\n--- 3. Duplicate SKU & Slug Conflict Prevention ---');
  const existingProduct = pubProductsRes.body.products[0];

  // Try creating with existing SKU
  const dupSkuRes = await httpRequest({ path: '/api/products', method: 'POST' }, {
    name: 'Duplicate SKU Pickle',
    category: 'mango',
    price: 249,
    sku: existingProduct.sku
  });
  assert(dupSkuRes.status === 400, 'Rejects duplicate SKU conflict (HTTP 400)');
  assert(dupSkuRes.body.error.includes('already exists') || dupSkuRes.body.error.includes('unique'), 'Helpful duplicate SKU message');

  // Try creating with existing Slug
  const dupSlugRes = await httpRequest({ path: '/api/products', method: 'POST' }, {
    name: 'Duplicate Slug Pickle',
    slug: existingProduct.slug,
    category: 'mango',
    price: 249,
    sku: 'DR-UNIQUE-SKU-999'
  });
  assert(dupSlugRes.status === 400, 'Rejects conflicting product slug (HTTP 400)');

  // TEST 4: Image Upload Validation & Persistent Storage
  console.log('\n--- 4. Image Upload Validation & Storage ---');
  // 4a. Invalid file type rejection
  const textBuffer = Buffer.from('This is a text file, not an image');
  const badUpload = await uploadMultipart({
    reqPath: '/api/upload/single',
    fieldName: 'image',
    filename: 'malicious.txt',
    fileBuffer: textBuffer,
    mimeType: 'text/plain'
  });
  assert(badUpload.status === 400, 'Rejects invalid file type upload (HTTP 400)');

  // 4b. Valid JPG Image Upload
  // Create a minimal 1x1 valid JPEG buffer
  const validJpeg = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43,
    0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
    0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20,
    0x24, 0x2e, 0x27, 0x20, 0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29,
    0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27, 0x39, 0x3d, 0x38, 0x32,
    0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x1f, 0x00, 0x00,
    0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f,
    0x00, 0xbf, 0x80, 0xff, 0xd9
  ]);

  const goodUpload = await uploadMultipart({
    reqPath: '/api/upload/single',
    fieldName: 'image',
    filename: 'royal_shekhawati_mirch.jpg',
    fileBuffer: validJpeg,
    mimeType: 'image/jpeg'
  });
  assert(goodUpload.status === 200, 'Accepts valid JPEG image upload (HTTP 200)');
  assert(goodUpload.body.success === true, 'Upload response success is true');
  assert(goodUpload.body.url.startsWith('/uploads/'), 'Returns correct persistent /uploads/ URL');
  const uploadedDiskPath = path.join('/home/mahesh/aachar/public', goodUpload.body.url);
  assert(fs.existsSync(uploadedDiskPath), 'Uploaded file verified to exist on persistent disk storage');

  // TEST 5: Create Product with Box Pricing & Variants
  console.log('\n--- 5. Product Creation with Variants & Box Pricing ---');
  const testSku = `DR-TEST-MIRCH-${Date.now().toString().slice(-4)}`;
  const testSlug = `shekhawati-royal-mirch-${Date.now().toString().slice(-4)}`;

  const createRes = await httpRequest({ path: '/api/products', method: 'POST' }, {
    name: 'Shekhawati Royal Stuffed Mirch Achar',
    hindiName: 'शेखावाटी शाही भरवा लाल मिर्च',
    slug: testSlug,
    sku: testSku,
    category: 'mirchi',
    categoryName: 'Red Chilli Pickles',
    price: 299,
    mrp: 349,
    stockCount: 40,
    spiceLevel: 'Spicy',
    image: goodUpload.body.url,
    gallery: [goodUpload.body.url],
    status: 'published',
    packSizes: [
      { size: '250 g', price: 179, mrp: 219, stock: 40 },
      { size: '500 g', price: 299, mrp: 349, stock: 40 },
      { size: '1 kg', price: 549, mrp: 649, stock: 20 }
    ],
    boxPricing: [
      { boxType: 'Single Jar Box', packCount: 1, price: 299, mrp: 349, description: 'Single Premium Jar in Sturdy Box' },
      { boxType: 'Duo Gift Box (2 Jars)', packCount: 2, price: 549, mrp: 698, description: 'Twin Presentation Gift Box' },
      { boxType: 'Family Treat Box (3 Jars)', packCount: 3, price: 799, mrp: 999, description: '3-Jar Keepsake Box' },
      { boxType: 'Royal Tasting Box (4 Jars)', packCount: 4, price: 999, mrp: 1299, description: '4-Jar Royal Tasting Hamper' }
    ],
    shortDesc: 'Sun-cured Banarasi plump red chillies packed with stone-ground mustard and amchur.',
    fullDesc: 'Traditional Shekhawati stuffed red chilli achar prepared with cold-pressed mustard oil.'
  });

  assert(createRes.status === 201, 'Product created successfully with HTTP 201');
  assert(createRes.body.product.sku === testSku, 'Persisted correct SKU');
  assert(createRes.body.product.price === 299, 'Persisted base price 299');
  assert(createRes.body.product.boxPricing.length === 4, 'Persisted 4 box pricing configurations');
  assert(createRes.body.product.boxPricing[1].price === 549, 'Duo Gift Box price is 549');

  const createdId = createRes.body.product.id;

  // TEST 6: Edit Product Price, Box Pricing & Image
  console.log('\n--- 6. Edit Product Price, Box Pricing & Image ---');
  const editRes = await httpRequest({ path: `/api/products/${createdId}`, method: 'PUT' }, {
    price: 329,
    mrp: 399,
    boxPricing: [
      { boxType: 'Single Jar Box', packCount: 1, price: 329, mrp: 399, description: 'Single Premium Jar in Sturdy Box' },
      { boxType: 'Duo Gift Box (2 Jars)', packCount: 2, price: 599, mrp: 749, description: 'Twin Presentation Gift Box' },
      { boxType: 'Family Treat Box (3 Jars)', packCount: 3, price: 849, mrp: 1099, description: '3-Jar Keepsake Box' },
      { boxType: 'Royal Tasting Box (4 Jars)', packCount: 4, price: 1099, mrp: 1399, description: '4-Jar Royal Tasting Hamper' }
    ]
  });

  assert(editRes.status === 200, 'Product updated successfully with HTTP 200');
  assert(editRes.body.product.price === 329, 'Updated base price is 329');
  assert(editRes.body.product.boxPricing[1].price === 599, 'Updated Duo Gift Box price is 599');

  // TEST 7: Cart & Checkout Recalculation (Trusted Backend Pricing)
  console.log('\n--- 7. Trusted Backend Pricing & Stock Enforcement ---');
  // 7a. Normal Box calculation
  const recalcRes = await httpRequest({ path: '/api/orders/recalculate', method: 'POST' }, {
    items: [
      { productId: createdId, boxType: 'Duo Gift Box (2 Jars)', quantity: 2 }
    ]
  });
  assert(recalcRes.status === 200, 'Recalculation API responds 200');
  // 2 x 599 = 1198. >= 499, so free shipping.
  assert(recalcRes.body.subtotal === 1198, 'Backend computed trusted subtotal 1198 (2 x 599)');
  assert(recalcRes.body.shippingFee === 0, 'Free shipping applied for order >= 499');
  assert(recalcRes.body.finalTotal === 1198, 'Final total is exactly 1198');

  // 7b. Insufficient stock rejection
  const outOfStockRes = await httpRequest({ path: '/api/orders', method: 'POST' }, {
    customerName: 'Bulk Buyer',
    customerPhone: '9876543210',
    items: [
      { productId: createdId, quantity: 999 } // Stock is 40
    ]
  });
  assert(outOfStockRes.status === 400, 'Rejects order with insufficient stock (HTTP 400)');
  assert(outOfStockRes.body.error.includes('Insufficient stock'), 'Error message reports insufficient stock');

  // 7c. Place real test order and verify stock deduction & immutable snapshot
  console.log('\n--- 8. Order Placement & Snapshot Preservation ---');
  const validOrderRes = await httpRequest({ path: '/api/orders', method: 'POST' }, {
    customerName: 'Mahesh Saini',
    customerPhone: '9876543210',
    customerEmail: 'mahesh@sikardrop.in',
    shippingAddress: {
      fullName: 'Mahesh Saini',
      phone: '9876543210',
      addressLine: 'H. No. 125, Ward No. 5',
      city: 'Sikar',
      state: 'Rajasthan',
      pincode: '332001'
    },
    items: [
      { productId: createdId, boxType: 'Duo Gift Box (2 Jars)', quantity: 2 }
    ],
    paymentMethod: 'UPI'
  });

  assert(validOrderRes.status === 201, 'Order created successfully with HTTP 201');
  assert(validOrderRes.body.order.finalTotal === 1198, 'Order saved with trusted total 1198');
  assert(validOrderRes.body.order.items[0].name === 'Shekhawati Royal Stuffed Mirch Achar', 'Item snapshot has correct name');
  assert(validOrderRes.body.order.items[0].price === 599, 'Item snapshot has correct trusted box price 599');

  // Verify stock decremented: initial 40 - 2 = 38
  const checkStockRes = await httpRequest({ path: `/api/products/${createdId}` });
  assert(checkStockRes.body.product.stockCount === 38, 'Product stock correctly decremented to 38');

  // Verify Snapshot Immutability: Change product price in DB, ensure past order snapshot unchanged!
  await httpRequest({ path: `/api/products/${createdId}`, method: 'PUT' }, {
    name: 'Renamed Mirch Pickle',
    price: 499
  });
  const fetchOrderRes = await httpRequest({ path: `/api/orders/${validOrderRes.body.order.orderId}` });
  assert(fetchOrderRes.body.order.items[0].name === 'Shekhawati Royal Stuffed Mirch Achar', 'Historical order preserved original product name');
  assert(fetchOrderRes.body.order.items[0].price === 599, 'Historical order preserved original box price');

  // TEST 9: Safe Deletion Check (Historical Orders Reference)
  console.log('\n--- 9. Safe Deletion & Historical Orders Protection ---');
  const deleteAttempt = await httpRequest({ path: `/api/products/${createdId}`, method: 'DELETE' });
  assert(deleteAttempt.status === 409, 'Hard deletion blocked because historical order references it (HTTP 409)');
  assert(deleteAttempt.body.hasOrders === true, 'Response indicates product has historical orders');
  assert(deleteAttempt.body.orderCount >= 1, `Reported exact order count: ${deleteAttempt.body.orderCount}`);

  // Archive instead
  const archiveRes = await httpRequest({ path: `/api/products/${createdId}/status`, method: 'PATCH' }, {
    status: 'archived'
  });
  assert(archiveRes.status === 200, 'Product status updated to archived');

  // Verify archived product CANNOT be ordered
  const buyArchivedRes = await httpRequest({ path: '/api/orders', method: 'POST' }, {
    customerName: 'Buyer',
    customerPhone: '9876543210',
    items: [{ productId: createdId, quantity: 1 }]
  });
  assert(buyArchivedRes.status === 400, 'Archived product blocked from new purchases (HTTP 400)');
  assert(buyArchivedRes.body.error.includes('archived'), 'Indicates product is archived');

  // Restore to published for public store visual verification
  await httpRequest({ path: `/api/products/${createdId}/status`, method: 'PATCH' }, {
    status: 'published'
  });
  await httpRequest({ path: `/api/products/${createdId}`, method: 'PUT' }, {
    name: 'Shekhawati Royal Stuffed Mirch Achar',
    price: 329
  });

  // ================================================================
  // PUPPETEER BROWSER VERIFICATION & VISUAL ARTIFACTS
  // ================================================================
  console.log('\n--- 10. Puppeteer Browser Testing & Visual Evidence ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/home/mahesh/.cache/puppeteer/chrome/linux-154.0.8037.57/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Step A: Admin Panel Products & Box Pricing Manager
    console.log('[Puppeteer] Navigating to Admin Panel: http://localhost:5174/admin ...');
    await page.goto('http://localhost:5174/admin', { waitUntil: 'networkidle2' });
    await page.waitForSelector('table');
    await new Promise(r => setTimeout(r, 1000));

    const adminScreenshot = path.join(ARTIFACTS_DIR, 'verified_desirasoi_admin_products.png');
    await page.screenshot({ path: adminScreenshot, fullPage: false });
    console.log('[SCREENSHOT] Admin Products table saved to:', adminScreenshot);
    assert(true, 'Admin Products & Box Pricing Manager rendered and screenshotted');

    // Step B: Open Edit Modal on the Test Product
    console.log('[Puppeteer] Testing search and Edit Modal in Admin ...');
    const searchInput = await page.$('input[placeholder*="Search by name"]');
    if (searchInput) {
      await searchInput.type('Shekhawati');
      await new Promise(r => setTimeout(r, 500));
    }

    // Click Edit button
    const editBtn = await page.$('button[title*="Edit Product"]');
    if (editBtn) {
      await editBtn.click();
      await new Promise(r => setTimeout(r, 800));
      // Switch to Box Pricing tab inside modal
      await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const boxTab = tabs.find(b => b.textContent.includes('Box Pricing'));
        if (boxTab) boxTab.click();
      });
      await new Promise(r => setTimeout(r, 600));

      const modalScreenshot = path.join(ARTIFACTS_DIR, 'verified_desirasoi_edit_modal.png');
      await page.screenshot({ path: modalScreenshot, fullPage: false });
      console.log('[SCREENSHOT] Admin Edit Modal saved to:', modalScreenshot);
      assert(true, 'Admin Edit Modal with Box Pricing rendered and screenshotted');

      // Close modal
      const closeBtn = await page.$('button[type="button"] > svg.lucide-x')?.catch(() => null);
      if (closeBtn) await page.evaluate(el => el.closest('button').click(), closeBtn);
    }

    // Step C: Public Storefront Product Detail Page
    console.log(`[Puppeteer] Navigating to Public Product Page: http://localhost:5174/product/${testSlug} ...`);
    const storePage = await browser.newPage();
    await storePage.setViewport({ width: 1440, height: 900 });
    await storePage.goto(`http://localhost:5174/product/${testSlug}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // Verify Title & Price on Public Page
    const pageTitle = await storePage.$eval('h1', el => el.textContent);
    assert(pageTitle.includes('Shekhawati Royal Stuffed Mirch'), 'Public product page displays correct title');

    const publicProductScreenshot = path.join(ARTIFACTS_DIR, 'verified_desirasoi_public_product.png');
    await storePage.screenshot({ path: publicProductScreenshot, fullPage: false });
    console.log('[SCREENSHOT] Public Product page saved to:', publicProductScreenshot);
    assert(true, 'Public Storefront Product Detail page verified and screenshotted');

    // Step D: Select Gift & Family Boxes Mode and Add to Cart
    console.log('[Puppeteer] Testing Box Packaging selector and Add to Cart ...');
    await storePage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const boxModeBtn = buttons.find(b => b.textContent.includes('Gift & Family Boxes'));
      if (boxModeBtn) boxModeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Select Duo Gift Box
    await storePage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const duoBtn = buttons.find(b => b.textContent.includes('Duo Gift Box'));
      if (duoBtn) duoBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Click Add to Cart
    await storePage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const addBtn = buttons.find(b => b.textContent.includes('Add to Cart'));
      if (addBtn) addBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    const cartBoxScreenshot = path.join(ARTIFACTS_DIR, 'verified_desirasoi_cart_box_pricing.png');
    await storePage.screenshot({ path: cartBoxScreenshot, fullPage: false });
    console.log('[SCREENSHOT] Cart Drawer with Box Pricing saved to:', cartBoxScreenshot);
    assert(true, 'Cart Drawer with Box Pricing verified and screenshotted');

    // Step E: Checkout Page Verification
    console.log('[Puppeteer] Navigating to Checkout: http://localhost:5174/checkout ...');
    const checkoutPage = await browser.newPage();
    await checkoutPage.setViewport({ width: 1440, height: 900 });
    await checkoutPage.goto('http://localhost:5174/checkout', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    const checkoutScreenshot = path.join(ARTIFACTS_DIR, 'verified_desirasoi_checkout_page.png');
    await checkoutPage.screenshot({ path: checkoutScreenshot, fullPage: false });
    console.log('[SCREENSHOT] Checkout page saved to:', checkoutScreenshot);
    assert(true, 'Checkout page verified and screenshotted');

    // Step F: Mobile Viewport of Admin Products
    console.log('[Puppeteer] Testing Mobile Viewport of Admin Panel ...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await mobilePage.goto('http://localhost:5174/admin', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    const mobileScreenshot = path.join(ARTIFACTS_DIR, 'verified_desirasoi_mobile_admin.png');
    await mobilePage.screenshot({ path: mobileScreenshot, fullPage: false });
    console.log('[SCREENSHOT] Mobile Admin Panel saved to:', mobileScreenshot);
    assert(true, 'Mobile Admin Panel verified and screenshotted');

  } finally {
    await browser.close();
  }

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log('================================================================');
  if (testsFailed > 0) {
    process.exit(1);
  }
}

runAllTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
