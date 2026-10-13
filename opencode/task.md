PROJECT NAME: DESIRASOI
PROJECT TYPE: Premium Indian Pickle E-commerce Website
SCOPE: FRONTEND ONLY
REFERENCE: Attached DesiRasoi UI/UX reference image

==================================================
1. MAIN OBJECTIVE
==================================================

Build a complete, premium, responsive frontend for DesiRasoi,
an Indian traditional pickle (achar) e-commerce brand.

Use the attached reference image as the PRIMARY visual reference.

Study the reference image carefully before writing code.

The final website must follow the same visual direction, including:
- Overall layout and section hierarchy.
- Header and navigation proportions.
- Typography.
- Product card structure.
- Image presentation.
- Color palette.
- Spacing and alignment.
- Button styles.
- Mobile navigation.
- Product listing layouts.
- Product details layout.
- Festive collection design.

You may improve spacing, readability, accessibility, responsiveness,
and visual polish, but do not randomly redesign the entire website.

IMPORTANT:
Do not create a generic e-commerce template.
Do not mix unrelated food products.
Do not make the UI inconsistent across pages.

==================================================
2. FIRST AUDIT THE EXISTING PROJECT
==================================================

Before making changes:

1. Inspect the existing project structure.
2. Identify the framework, routing, styling system, and dependencies.
3. Inspect existing components and available images.
4. Identify existing pages and their current functionality.
5. Preserve working code and reusable components.
6. Do not recreate the entire project from scratch.
7. Do not delete unrelated working functionality.
8. Create a page-by-page implementation checklist.

After auditing, implement the complete frontend.
Do not stop after providing a plan.

==================================================
3. BRAND AND COLOR SYSTEM
==================================================

Brand: DesiRasoi

Design direction:
Premium, warm, traditional, clean, modern, and trustworthy.

Use these colors consistently:

- Main background: white and warm ivory.
- Secondary background: light cream.
- Primary accent: mustard yellow.
- Main text: deep brown.
- Secondary text: warm charcoal.
- Borders: subtle beige.
- Secondary accent: muted olive green.
- Discount badges: restrained red.

White and cream must dominate the design.

Use brown for typography and selected buttons.
Use yellow for important CTAs and highlights.
Use green sparingly for selected actions and status indicators.

Avoid:
- Too many colors.
- Excessive gradients.
- Heavy shadows.
- Excessive decorative patterns.
- Overloaded backgrounds.
- Random component styles.
- Unnecessary glassmorphism.

Maintain consistent typography, spacing, card radii, borders,
shadows, and button dimensions throughout the website.

==================================================
4. STRICT PRODUCT SCOPE
==================================================

THIS WEBSITE SELLS ONLY ACHAR / PICKLES.

Do not create categories for:
- Chutneys.
- Papad.
- Masala.
- Ghee.
- Sweets.
- Snacks.
- Other unrelated food products.

All categories, products, filters, recommendations, and promotional
sections must remain focused on different types of achar.

Example achar categories:

1. Mango Achar.
2. Nimbu Achar.
3. Red Chilli Achar.
4. Green Chilli Achar.
5. Mixed Achar.
6. Garlic Achar.
7. Ginger Achar.
8. Methi Achar.
9. Lasun Achar.
10. Traditional Rajasthani Achar.
11. Regional Achar Varieties.
12. Festive Achar Collections.

These are examples. Keep categories configurable through data.

Do not invent unavailable products and display them as real inventory.

If actual product information is unavailable, use clearly identified
sample data until the business provides its real catalogue.

==================================================
5. HEADER AND NAVIGATION
==================================================

Create a clean, compact, responsive header.

Announcement bar is optional. If included, keep it short and
avoid excessive promotional messages.

Desktop navigation:
- DesiRasoi logo.
- Home.
- All Achar.
- Mango Achar.
- Nimbu Achar.
- Mirchi Achar.
- Mixed Achar.
- Garlic Achar.
- Festive Collections.
- Our Story.
- Offers.
- Search.
- Account.
- Wishlist.
- Cart.

Use a clean dropdown or mega-menu if appropriate.

Do not add unrelated food categories.

Mobile navigation:
- Compact logo.
- Search.
- Wishlist.
- Cart.
- Accessible menu drawer.
- Clear navigation labels.

Use sticky navigation only if it improves usability.

Keep the header consistent across every page.

==================================================
6. HOMEPAGE
==================================================

Build the homepage according to the attached reference.

Required sections:

1. Header.
2. Hero section.
3. Achar categories.
4. Best-selling achar.
5. Featured achar collection.
6. Festive special achar.
7. Build Your Own Achar Combo.
8. Why Choose DesiRasoi?
9. Customer reviews.
10. Our Story.
11. Store location preview, if store information is configured.
12. FAQs.
13. Footer.

HERO SECTION:

Use premium food photography showing traditional Indian achar,
glass pickle jars, mangoes, chillies, and complementary ingredients.

Keep the text area clean and readable.

Suggested headline:
"Ghar Jaisa Swad, Ab Har Ghar Tak"

Suggested CTAs:
- Shop Achar.
- Explore Combos.

A short muted background video may be used if a suitable asset exists.
Otherwise, use an optimized hero image.

If video is used:
- Muted.
- Looping.
- Inline playback on mobile.
- Poster fallback.
- Respect reduced-motion preferences.
- Avoid layout shifts.
- Maintain readable text.

Do not force video playback when browser policies prevent it.

==================================================
7. CATEGORY DESIGN AND BACKGROUND IMAGES
==================================================

Every achar category must have relevant imagery.

Create a reusable CategoryHero component.

Each category must support:
- Category title.
- Short description.
- Breadcrumbs.
- Background image.
- Responsive image positioning.
- Optional CTA.
- Product count.

Use different images for different achar categories.

Examples:
- Mango Achar: mangoes, mango pickle jars, warm natural setting.
- Nimbu Achar: lemons and lemon pickle jars.
- Mirchi Achar: red and green chillies with pickle jars.
- Mixed Achar: a coordinated selection of pickle varieties.
- Garlic Achar: garlic bulbs and garlic pickle.
- Festive Collections: premium pickle jars with elegant festive styling.

IMAGE RULES:

1. Prefer suitable existing project assets.
2. Use properly licensed or generated assets when required.
3. Use local image assets where practical.
4. Keep image references organized in data files.
5. Never stretch or distort images.
6. Use object-fit: cover and appropriate focal positioning.
7. Add a subtle overlay if text needs more contrast.
8. Ensure images work on desktop and mobile.
9. Optimize image size and loading performance.
10. Provide a fallback for missing images.

Do not reuse one image for every category.

Do not let background images make text difficult to read.

==================================================
8. ALL ACHAR PRODUCTS PAGE
==================================================

Create a complete product listing page.

Features:
- Product grid.
- Search.
- Achar-type filters.
- Price range.
- Pack-size filters.
- Spice-level filters where relevant.
- Availability filters.
- Rating filters.
- Sorting.
- Pagination or load more.
- Clear all filters.
- Active filter chips.
- Product count.
- Empty states.

Every product card should show:
- Product image.
- Product name.
- Pack size.
- Current price.
- MRP when applicable.
- Actual discount when applicable.
- Rating when available.
- Wishlist control.
- Add to Cart button.

Filters and sorting must work with the actual frontend data.

Do not create decorative controls that do nothing.

==================================================
9. CATEGORY PAGES
==================================================

Create dedicated routes for all approved achar categories.

Suggested routes:

/collections/all-achar
/collections/mango-achar
/collections/nimbu-achar
/collections/mirchi-achar
/collections/mixed-achar
/collections/garlic-achar
/collections/traditional-achar
/collections/festive-achar

Adapt paths to the existing router if necessary.

Each category page must include:
- Breadcrumbs.
- Unique background image.
- Category title.
- Category description.
- Relevant products.
- Filters.
- Sorting.
- Product count.
- Product cards.
- Pagination.
- Related achar varieties.

Each page must show products relevant to its category.

Do not show chutneys, papad, ghee, or unrelated products anywhere
in the product catalogue or category navigation.

==================================================
10. PRODUCT DETAILS PAGE
==================================================

Create a premium product details page for each achar product.

Features:
- Multiple product images.
- Thumbnail gallery.
- Main image.
- Image zoom where practical.
- Product name.
- Description.
- Price and applicable discount.
- Pack-size selector.
- Quantity selector.
- Add to Cart.
- Buy Now.
- Wishlist.
- Ingredients.
- Allergen information where applicable.
- Nutritional information when available.
- Storage instructions.
- Shelf life when available.
- Customer reviews.
- Delivery pincode interface using mock data.
- Related achar products.

MULTIPLE PRODUCT IMAGES:

Each product should support an image gallery.

For example:
- Main front view.
- Side view.
- Close-up of the achar.
- Product texture.
- Packaging view.
- Serving suggestion, if suitable.

Use actual product assets when available.

Do not reuse unrelated product images as if they represent
the same product.

Gallery functionality must work with mouse, keyboard, and touch.

Changing pack size must update the selected option and price.

Adding to cart must preserve the selected variant and quantity.

==================================================
11. FESTIVE COLLECTIONS
==================================================

Create a dedicated festive collections experience.

Include separate promotional pages or sections for:
- Diwali.
- Raksha Bandhan.
- Holi.
- Wedding gifting.
- Other configured festive occasions.

Each occasion must have its own visual theme and appropriate
pickle product arrangements.

Keep the DesiRasoi brand identity consistent.

Use festive accents through photography, banners, packaging,
and restrained decorative details.

Do not redesign the entire site differently for every festival.

Each festive page should include:
- Occasion-specific hero.
- Festive achar collection.
- Relevant product cards.
- Available gift packs.
- Applicable offers.
- Add to Cart.
- Collection FAQs where useful.

Only show real configured products and applicable offers.

==================================================
12. PRODUCT REVIEWS
==================================================

Create a dedicated customer reviews page and review section.

Features:
- Average rating based on available review data.
- Rating distribution.
- Rating filters.
- Review text.
- Reviewer display name.
- Review date.
- Verified-purchase label only when supported.
- Customer images when available.
- Helpful voting interface.
- Sort by newest and highest rating.
- Write a Review form.
- Form validation.
- Empty and loading states.

For frontend-only mode, use mock review data.

Do not claim that sample reviews are genuine customer testimonials.

Clearly identify sample data during development.

==================================================
13. STORE LOCATION
==================================================

Create a dedicated Store Location page.

Include:
- Store name.
- Address.
- City.
- Pincode.
- Opening hours.
- Contact details when provided.
- Store image when available.
- Map section.
- Get Directions action.
- Other store locations when configured.

Do not invent real store addresses or coordinates.

If real store information is unavailable, use clearly labeled
sample information.

Use an appropriate map integration only if configured.

If there is no map API key, provide a clean map placeholder or
a directions link based on configured location data.

Do not pretend a static map is interactive.

==================================================
14. LOCATION SELECTOR
==================================================

Implement a customer location selector where appropriate.

Features:
- Enter pincode.
- Validate pincode format.
- Select configured delivery location.
- Display serviceability based on mock data.
- Show delivery estimate only when mock data supports it.
- Allow changing location.
- Provide clear success and failure feedback.

Do not request browser location automatically.

If browser geolocation is offered, ask for permission first.

Provide manual pincode entry as an alternative.

Do not expose or store precise customer location unnecessarily.

==================================================
15. CART AND CHECKOUT
==================================================

Implement a functional frontend shopping workflow.

Cart:
- Product image.
- Product name.
- Selected pack size.
- Quantity controls.
- Remove product.
- Coupon field.
- Subtotal.
- Discount.
- Shipping estimate.
- Final total.
- Continue Shopping.
- Proceed to Checkout.

Checkout:
1. Contact and address.
2. Delivery option.
3. Order review.
4. Payment selection.
5. Order confirmation.

Use form validation and clear error messages.

Persist cart data in localStorage where appropriate.

Implement mock coupon validation and consistent price calculations.

PAYMENT LIMITATION:

This project is frontend-only.

Do not process real payments.

Simulate payment success, failure, pending status, and retry.

Never collect card numbers, CVVs, UPI PINs, or other sensitive
payment credentials.

Clearly identify payment as a demonstration flow.

==================================================
16. ACCOUNT AND ORDER TRACKING
==================================================

Create:
- Login.
- Register.
- My Account.
- My Orders.
- Order Details.
- Saved Addresses.
- Wishlist.
- My Reviews.
- Account Settings.
- Order Success.
- Track Order.

Use mock authentication and mock order data.

Do not imply that production-grade authentication exists.

Order tracking should support:
- Order Placed.
- Processing.
- Shipped.
- Out for Delivery.
- Delivered.

Only show mock orders or orders created during the frontend session.

==================================================
17. OUR STORY AND INFORMATION PAGES
==================================================

Create:
- Our Story.
- Contact Us.
- FAQs.
- Shipping Policy.
- Return & Refund Policy.
- Cancellation Policy.
- Privacy Policy.
- Terms & Conditions.
- Food Safety Information.

Keep all content consistent with the pickle-only business.

Do not invent business certifications or unsupported product claims.

Mark unapproved policy text as draft/sample content.

==================================================
18. ANIMATIONS
==================================================

Use smooth, restrained animations.

Hero:
- Gentle entrance transitions.
- Subtle image reveal.
- Smooth CTA transitions.

Category cards:
- Small hover lift.
- Subtle image zoom.
- Smooth shadow transition.

Product cards:
- Image transition.
- Wishlist animation.
- Add-to-cart feedback.
- Cart badge update.

Other:
- Smooth dropdowns.
- Modal transitions.
- Cart drawer transitions.
- Loading skeletons.
- Form feedback.

Respect prefers-reduced-motion.

Avoid excessive movement, flashing effects, and unnecessary animation
libraries.

==================================================
19. RESPONSIVE DESIGN
==================================================

Support mobile, tablet, laptop, and large desktop screens.

Test at:
- 320px.
- 375px.
- 430px.
- 768px.
- 1024px.
- 1440px and above.

Requirements:
- No horizontal overflow.
- No overlapping elements.
- No clipped text.
- Readable typography.
- Proper product image sizing.
- Usable filters on mobile.
- Accessible touch targets.
- Mobile-friendly checkout.
- Consistent navigation.

==================================================
20. FRONTEND ARCHITECTURE
==================================================

Use the existing frontend framework and architecture.

Create reusable components for:
- Header.
- Footer.
- CategoryHero.
- CategoryCard.
- ProductCard.
- ProductGrid.
- ProductFilters.
- ProductGallery.
- VariantSelector.
- QuantitySelector.
- WishlistButton.
- CartDrawer.
- CartSummary.
- CheckoutStepper.
- AddressForm.
- ReviewList.
- RatingDistribution.
- StoreLocationCard.
- LocationSelector.
- OrderTimeline.
- FAQAccordion.
- LoadingSkeleton.
- EmptyState.
- ErrorState.

Keep product data, category data, images, reviews, and mock orders
in organized data modules.

Avoid duplicated logic.

==================================================
21. TEST COMPLETE WORKFLOWS
==================================================

Test:

1. Home → Achar Category → Product Details.
2. Product Details → Select Pack Size → Add to Cart.
3. Cart → Change Quantity → Recalculate Total.
4. Cart → Apply Coupon.
5. Checkout → Mock Payment Success.
6. Checkout → Mock Payment Failure → Retry.
7. Order Success → Track Order.
8. Product → Reviews.
9. Store Location → Get Directions.
10. Location Selector → Pincode Validation.
11. Product Listing → Filter → Sort → Pagination.
12. Festive Collection → Product Details → Add to Cart.
13. Wishlist → Add and Remove Product.
14. Mobile Navigation → Category → Product.
15. Contact Form → Validation → Simulated Submission.

Verify all important buttons and navigation links.

==================================================
22. FINAL QUALITY CHECK
==================================================

After implementation:

- Run the application.
- Inspect the rendered pages.
- Check responsive layouts.
- Check category-specific imagery.
- Check all routes.
- Check cart and checkout workflows.
- Check console errors.
- Check broken image assets.
- Check reduced-motion behavior.
- Fix discovered issues.

Do not claim that a workflow has been tested unless it was actually
tested.

Do not stop after implementing only the homepage.

Do not replace working code unnecessarily.

Do not add unrelated product categories.

Do not add the removed Narvarta system.

FINAL REQUIREMENT:

Build a cohesive, premium, responsive, pickle-only e-commerce frontend
that follows the attached DesiRasoi reference image.

The frontend must have consistent design, relevant category imagery,
multiple product images, festive collection pages, customer reviews,
store location, location selection, and functioning mock shopping
workflows.

Start by auditing the existing project and then implement the complete
frontend.