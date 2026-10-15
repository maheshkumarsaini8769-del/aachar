/**
 * jarLabelCanvas.js
 * Generates an ultra-crisp 2048x1024 physically wrapped label texture for the Marusthali Achar jar.
 * Left half: Back panel with Nutritional Facts, Ingredients, FSSAI, Barcode, QR Code, Batch info.
 * Right half: Front panel with Marusthali Achar logo, Rajasthani floral motifs, typography, veg mark.
 */

export function createJarLabelCanvas() {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Rich Vintage Ivory/Cream Paper Texture Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFDF8');
  bgGrad.addColorStop(0.5, '#F9F4E8');
  bgGrad.addColorStop(1, '#F3ECE0');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle organic paper noise
  const noiseSize = 120;
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(180, 150, 110, 0.05)' : 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Gold foil borders on top and bottom
  const borderHeight = 24;
  const goldGrad = ctx.createLinearGradient(0, 0, width, 0);
  goldGrad.addColorStop(0, '#B4882C');
  goldGrad.addColorStop(0.25, '#F7E396');
  goldGrad.addColorStop(0.5, '#C69A39');
  goldGrad.addColorStop(0.75, '#F9E7A2');
  goldGrad.addColorStop(1, '#9C721D');

  // Top gold foil strip with embossed micro-dots
  ctx.fillStyle = goldGrad;
  ctx.fillRect(0, 0, width, borderHeight);
  ctx.fillRect(0, height - borderHeight, width, borderHeight);

  // Deep brown secondary rules
  ctx.strokeStyle = '#3D2314';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, borderHeight + 12, width - 32, height - (borderHeight * 2 + 24));

  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2;
  ctx.strokeRect(26, borderHeight + 22, width - 52, height - (borderHeight * 2 + 44));

  // Center divider line (back vs front label boundary)
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(120, 80, 40, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2, 40);
  ctx.lineTo(width / 2, height - 40);
  ctx.stroke();
  ctx.setLineDash([]);

  // ==========================================
  // PANEL 1: FRONT LABEL (Right half: x = 1024 to 2048, Center = 1536)
  // ==========================================
  const frontX = width * 0.75; // 1536

  // Rajasthani Floral Arch / Mandala Header Accent
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(frontX, 160, 60, Math.PI, 0, false);
  ctx.stroke();

  // Leaf Emblem Logo
  ctx.fillStyle = '#1E5631'; // Deep royal green
  // Left leaf
  ctx.beginPath();
  ctx.moveTo(frontX, 155);
  ctx.bezierCurveTo(frontX - 25, 140, frontX - 35, 115, frontX, 95);
  ctx.bezierCurveTo(frontX - 10, 115, frontX - 5, 135, frontX, 155);
  ctx.fill();
  // Right leaf
  ctx.beginPath();
  ctx.moveTo(frontX, 155);
  ctx.bezierCurveTo(frontX + 25, 140, frontX + 35, 115, frontX, 95);
  ctx.bezierCurveTo(frontX + 10, 115, frontX + 5, 135, frontX, 155);
  ctx.fill();
  // Center leaf stem
  ctx.beginPath();
  ctx.moveTo(frontX, 155);
  ctx.bezierCurveTo(frontX - 5, 120, frontX + 5, 90, frontX, 80);
  ctx.bezierCurveTo(frontX + 10, 100, frontX + 5, 130, frontX, 155);
  ctx.fill();

  // Brand Name: Marusthali Achar
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2D1810';
  ctx.font = 'bold 76px "Playfair Display", "Georgia", "Times New Roman", serif';
  ctx.fillText('Marusthali Achar', frontX, 255);

  // Subtitle / Heritage Tag
  ctx.font = 'bold 24px "Montserrat", sans-serif';
  ctx.fillStyle = '#B45309';
  ctx.letterSpacing = '6px';
  ctx.fillText('TRADITIONAL RAJASTHANI PICKLES', frontX, 300);

  // Decorative Horizontal Divider with Diamond
  ctx.strokeStyle = '#B4882C';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(frontX - 280, 335);
  ctx.lineTo(frontX - 30, 335);
  ctx.moveTo(frontX + 30, 335);
  ctx.lineTo(frontX + 280, 335);
  ctx.stroke();

  ctx.fillStyle = '#B4882C';
  ctx.beginPath();
  ctx.arc(frontX, 335, 8, 0, Math.PI * 2);
  ctx.fill();

  // Product Name: RAJASTHANI MANGO ACHAR
  ctx.fillStyle = '#1E5631';
  ctx.font = '900 88px "Playfair Display", "Georgia", serif';
  ctx.fillText('MANGO PICKLE', frontX, 440);

  // Hindi Name
  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 40px "Rozha One", "Noto Serif Devanagari", "Georgia", serif';
  ctx.fillText('राजस्थानी पारंपरिक आम का अचार', frontX, 500);

  // Highlight Box: Traditional Recipe • Sun Dried
  const badgeWidth = 620;
  const badgeHeight = 64;
  const badgeX = frontX - badgeWidth / 2;
  const badgeY = 535;

  ctx.fillStyle = '#FEF3C7';
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 32);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 26px "Montserrat", sans-serif';
  ctx.fillText('TRADITIONAL RECIPE  •  SUN DRIED  •  NO PRESERVATIVES', frontX, badgeY + 41);

  // Heritage Farm Sourcing & Cold-Pressed Callout
  ctx.font = 'italic 28px "Georgia", serif';
  ctx.fillStyle = '#4B3621';
  ctx.fillText('Handcrafted with raw Ramkela mangoes & pure cold-pressed mustard oil', frontX, 660);
  ctx.fillText('Sun-cured for 21 days in traditional ceramic barnis of Marwar', frontX, 705);

  // Bottom Product Meta Strip
  const metaY = 820;

  // 100% Vegetarian Icon (Left of Front Panel)
  const vegBoxX = frontX - 360;
  const vegBoxY = metaY - 30;
  ctx.strokeStyle = '#15803D';
  ctx.lineWidth = 4;
  ctx.strokeRect(vegBoxX, vegBoxY, 50, 50);
  ctx.fillStyle = '#15803D';
  ctx.beginPath();
  ctx.arc(vegBoxX + 25, vegBoxY + 25, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#15803D';
  ctx.fillText('100% VEG', vegBoxX + 62, vegBoxY + 34);

  // Net Weight (Center-Right)
  ctx.textAlign = 'center';
  ctx.font = 'bold 32px "Playfair Display", serif';
  ctx.fillStyle = '#2D1810';
  ctx.fillText('NET WT. 500g', frontX, metaY);
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#78350F';
  ctx.fillText('(When Packed)', frontX, metaY + 28);

  // Authentic Origin Seal (Right of Front Panel)
  const sealX = frontX + 320;
  ctx.strokeStyle = '#B4882C';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sealX, metaY - 5, 42, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#78350F';
  ctx.fillText('SIKAR', sealX, metaY - 14);
  ctx.fillText('RAJASTHAN', sealX, metaY + 4);
  ctx.fillText('★ 100% PURE ★', sealX, metaY + 20);

  // ==========================================
  // PANEL 2: BACK LABEL (Left half: x = 0 to 1024, Center = 512)
  // ==========================================
  const backX = width * 0.25; // 512

  // Back Header: Nutrition Facts
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px "Playfair Display", serif';
  ctx.fillStyle = '#2D1810';
  ctx.fillText('NUTRITIONAL INFORMATION', backX, 100);

  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#5C4033';
  ctx.fillText('Approx. values per 100g serving', backX, 128);

  // Nutrition Table Box
  const tableX = backX - 380;
  const tableY = 145;
  const tableW = 760;
  const tableH = 210;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(tableX, tableY, tableW, tableH);
  ctx.strokeStyle = '#2D1810';
  ctx.lineWidth = 3;
  ctx.strokeRect(tableX, tableY, tableW, tableH);

  // Table rows
  const nutrients = [
    { name: 'Energy', val: '280 kcal' },
    { name: 'Protein', val: '4.2 g' },
    { name: 'Carbohydrate', val: '12.6 g' },
    { name: 'Total Fat (Mustard Oil base)', val: '25.0 g' },
    { name: 'Sodium', val: '2,400 mg' }
  ];

  ctx.font = 'bold 20px sans-serif';
  nutrients.forEach((item, idx) => {
    const rowY = tableY + 36 + idx * 36;
    if (idx > 0) {
      ctx.strokeStyle = 'rgba(45, 24, 16, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tableX + 16, rowY - 16);
      ctx.lineTo(tableX + tableW - 16, rowY - 16);
      ctx.stroke();
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#2D1810';
    ctx.fillText(item.name, tableX + 24, rowY);
    ctx.textAlign = 'right';
    ctx.fillText(item.val, tableX + tableW - 24, rowY);
  });

  // Ingredients Section
  ctx.textAlign = 'left';
  ctx.font = 'bold 24px "Playfair Display", serif';
  ctx.fillStyle = '#2D1810';
  ctx.fillText('INGREDIENTS:', tableX, 400);

  ctx.font = '19px sans-serif';
  ctx.fillStyle = '#4A3525';
  const ingText = 'Raw Green Mango Chunks (62%), Cold-Pressed Mustard Oil (24%), Iodised Salt, Sendha Namak, Fennel Seeds (Saunf), Fenugreek Seeds (Methi Dana), Nigella Seeds (Kalonji), Turmeric Powder, Mathania Red Chilli Powder, Asafoetida (Hing).';
  
  // Wrap text
  wrapText(ctx, ingText, tableX, 432, tableW, 26);

  // Storage & Caution
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#92400E';
  ctx.fillText('STORAGE: Store in a cool, dry place. Always use a clean dry spoon.', tableX, 520);
  ctx.font = 'italic 18px sans-serif';
  ctx.fillStyle = '#5C4033';
  ctx.fillText('Keep mustard oil submerged over pickle pieces for maximum shelf life.', tableX, 548);

  // FSSAI Logo & License
  const fssaiY = 605;
  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'italic 900 38px "Arial", sans-serif';
  ctx.fillText('fssai', tableX, fssaiY);
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#2D1810';
  ctx.fillText('Lic. No. 12220026000412', tableX + 120, fssaiY - 6);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('ISO 22000:2018 Certified Facility', tableX + 120, fssaiY + 16);

  // Manufacturer Details
  const mfgY = 675;
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#2D1810';
  ctx.fillText('Manufactured & Marketed by:', tableX, mfgY);
  ctx.font = '17px sans-serif';
  ctx.fillStyle = '#4A3525';
  ctx.fillText('Marusthali Foods Pvt. Ltd., Village Palsana, Sikar, Rajasthan - 332402', tableX, mfgY + 24);
  ctx.fillText('Customer Care: +91 98765 43210 | care@marusthaliachar.com', tableX, mfgY + 48);

  // Bottom Box: MRP, Batch, Barcode, QR Code
  const bottomBoxY = 760;
  const boxW = tableW;
  const boxH = 150;

  ctx.fillStyle = '#FAF5EB';
  ctx.strokeStyle = '#D1B892';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(tableX, bottomBoxY, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  // MRP & Batch details
  ctx.font = 'bold 28px "Playfair Display", serif';
  ctx.fillStyle = '#1E5631';
  ctx.fillText('MRP: ₹ 249.00', tableX + 24, bottomBoxY + 42);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('(Inclusive of all taxes)', tableX + 24, bottomBoxY + 68);

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#2D1810';
  ctx.fillText('Batch No: MA-2026-08', tableX + 24, bottomBoxY + 98);
  ctx.fillText('Mfd Date: AUG 2026  •  Best Before: 12 MONTHS', tableX + 24, bottomBoxY + 122);

  // Barcode Graphic (Right side of bottom box)
  const barcodeX = tableX + boxW - 250;
  const barcodeY = bottomBoxY + 20;
  drawBarcode(ctx, barcodeX, barcodeY, 220, 80, '8901234567890');

  return canvas;
}

/**
 * Text wrapper helper for canvas
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

/**
 * Procedural barcode drawer for authentic packaging label
 */
function drawBarcode(ctx, x, y, width, height, code) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x - 8, y - 6, width + 16, height + 30);
  ctx.fillStyle = '#000000';

  const barPattern = [3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 3, 2, 1, 1, 3, 2, 1, 3, 1, 2, 1, 3];
  let curX = x;
  const scale = width / 64;

  for (let i = 0; i < barPattern.length; i++) {
    const w = barPattern[i] * scale * 0.7;
    if (i % 2 === 0) {
      ctx.fillRect(curX, y, w, height);
    }
    curX += w;
  }

  ctx.font = 'bold 15px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(code, x + width / 2, y + height + 20);
}
