/**
 * studioEnvironment.js
 * Generates dynamic HDR-quality studio environment reflections using PMREMGenerator.
 * Simulates a professional commercial product photography studio with softboxes,
 * overhead strip lights, and golden rim lights for photorealistic glass and oil reflections.
 */

import * as THREE from 'three';

export function createStudioEnvironment(renderer, theme = 'warm-studio') {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base background studio gradient
  let topColor = '#EFE9DE';
  let midColor = '#E5DCCD';
  let botColor = '#D4C6B2';
  let rimColor = '#FFDE99';

  if (theme === 'marble') {
    topColor = '#F3F4F6';
    midColor = '#E5E7EB';
    botColor = '#CBD5E1';
    rimColor = '#FFFFFF';
  } else if (theme === 'rustic') {
    topColor = '#3D281C';
    midColor = '#2A1A11';
    botColor = '#170E08';
    rimColor = '#D97706';
  }

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, topColor);
  bgGrad.addColorStop(0.5, midColor);
  bgGrad.addColorStop(1, botColor);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Softbox 1: Front Key Light (Left-Center)
  drawSoftbox(ctx, width * 0.28, height * 0.35, 180, 140, 'rgba(255, 255, 255, 0.95)', 'rgba(255, 250, 240, 0.0)');

  // Softbox 2: Fill Light (Right-Center)
  drawSoftbox(ctx, width * 0.72, height * 0.40, 140, 120, 'rgba(240, 245, 255, 0.75)', 'rgba(240, 245, 255, 0.0)');

  // Softbox 3: Overhead Ceiling Strip (Long thin light for top brass lid reflection)
  drawSoftbox(ctx, width * 0.50, height * 0.12, 340, 45, 'rgba(255, 255, 255, 0.90)', 'rgba(255, 255, 255, 0.0)');

  // Softbox 4: Golden Rim Backlight (Behind subject for golden glass edge glints)
  drawSoftbox(ctx, width * 0.50, height * 0.75, 280, 100, rimColor, 'rgba(217, 119, 6, 0.0)');

  // Convert canvas to Three.js environment map
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  pmremGenerator.dispose();
  texture.dispose();

  return envMap;
}

function drawSoftbox(ctx, cx, cy, rx, ry, innerColor, outerColor) {
  ctx.save();
  ctx.translate(cx, cy);
  const grad = ctx.createRadialGradient(0, 0, rx * 0.2, 0, 0, rx);
  grad.addColorStop(0, innerColor);
  grad.addColorStop(0.5, innerColor);
  grad.addColorStop(1, outerColor);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
