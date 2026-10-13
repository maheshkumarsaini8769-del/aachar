/**
 * threeJarBuilder.js
 * High-End Photorealistic 3D Model Construction for Marusthali Rajasthani Mango Achar Jar.
 * - Glass Jar: Precision LatheGeometry with thick glass base, contoured shoulder, screw neck & mouth rim
 * - Flint Glass Material: Physical IOR 1.52, transmission 0.97, clearcoat 1.0, dispersion & refraction
 * - Brass Screw Lid: Detailed metallic lid with concentric top rings, knurled grip skirt & unscrewing motion
 * - Pure Cold-Pressed Mustard Oil: Amber fluid with volume absorption & top meniscus
 * - Hand-Cut Raw Mango Chunks: Organic irregular cut wedges with spicy pulp & green skin
 * - Authentic Spices: Scattered black rai, golden rai, methi dana, saunf & Mathania red chilli flakes
 * - High-Resolution Physical Label: Wrapped around the jar cylinder
 * - Contact Shadow & 3-Point Commercial Studio Lights
 */

import * as THREE from 'three';
import { createJarLabelCanvas } from './jarLabelCanvas';

export function buildMangoAcharScene() {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'MangoAcharProductRoot';

  // 1. Studio Lighting System
  const lightsGroup = new THREE.Group();
  lightsGroup.name = 'StudioLights';

  // Key Light (Large soft diffused light from upper-right)
  const keyLight = new THREE.DirectionalLight(0xfff8ed, 3.2);
  keyLight.position.set(4.5, 6.0, 4.0);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  lightsGroup.add(keyLight);

  // Fill Light (Soft cool ambient light from upper-left to balance shadows)
  const fillLight = new THREE.DirectionalLight(0xe8f2ff, 1.6);
  fillLight.position.set(-4.5, 4.0, 3.0);
  lightsGroup.add(fillLight);

  // Golden Rim / Backlight (Directly behind and above for glowing glass edges and amber oil highlights)
  const rimLight = new THREE.DirectionalLight(0xffdf88, 4.0);
  rimLight.position.set(0.0, 4.5, -4.5);
  lightsGroup.add(rimLight);

  // Bottom Ground Bounce Light
  const groundBounce = new THREE.DirectionalLight(0xffeedd, 0.8);
  groundBounce.position.set(0.0, -3.0, 2.0);
  lightsGroup.add(groundBounce);

  // Hemisphere Ambient Light
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0xcab599, 1.1);
  lightsGroup.add(ambientLight);

  // 2. Contact Ground Shadow (Photorealistic studio pedestal gradient)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 512;
  shadowCanvas.height = 512;
  const sCtx = shadowCanvas.getContext('2d');
  const sGrad = sCtx.createRadialGradient(256, 256, 30, 256, 256, 240);
  sGrad.addColorStop(0, 'rgba(30, 18, 10, 0.65)');
  sGrad.addColorStop(0.35, 'rgba(40, 25, 15, 0.38)');
  sGrad.addColorStop(0.70, 'rgba(40, 25, 15, 0.12)');
  sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sCtx.fillStyle = sGrad;
  sCtx.fillRect(0, 0, 512, 512);

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(6.8, 6.8);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -2.15;
  rootGroup.add(shadowMesh);

  // 3. Jar Assembly Group
  const jarGroup = new THREE.Group();
  jarGroup.name = 'JarAssembly';
  rootGroup.add(jarGroup);

  // Jar Dimensions
  const jarRadius = 1.62;
  const bodyHeight = 3.2;

  // 4. PRECISION CONTOURED GLASS JAR (LatheGeometry)
  // Generates cross-section of a traditional Indian glass pickle jar with thick base & neck
  const glassPoints = [
    new THREE.Vector2(0.0, -2.10),      // Base center punt
    new THREE.Vector2(1.25, -2.10),     // Flat base
    new THREE.Vector2(1.58, -1.98),     // Rounded base corner
    new THREE.Vector2(1.62, -1.75),     // Body bottom
    new THREE.Vector2(1.62, 1.05),      // Body top
    new THREE.Vector2(1.58, 1.30),      // Shoulder start
    new THREE.Vector2(1.48, 1.55),      // Shoulder curve
    new THREE.Vector2(1.36, 1.70),      // Neck base
    new THREE.Vector2(1.36, 2.15),      // Neck top
    new THREE.Vector2(1.42, 2.22),      // Outer rim bead
    new THREE.Vector2(1.35, 2.26),      // Top lip
    new THREE.Vector2(1.26, 2.22),      // Inner lip
    new THREE.Vector2(1.25, 1.70),      // Inner neck
    new THREE.Vector2(1.48, 1.40),      // Inner shoulder
    new THREE.Vector2(1.51, 1.00),      // Inner body top
    new THREE.Vector2(1.51, -1.75),     // Inner body bottom
    new THREE.Vector2(1.40, -1.88),     // Inner base corner
    new THREE.Vector2(0.0, -1.90)       // Inner base center (gives 0.2 units of solid heavy glass bottom!)
  ];

  const glassGeo = new THREE.LatheGeometry(glassPoints, 72);
  glassGeo.computeVertexNormals();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.97,
    opacity: 1,
    transparent: true,
    roughness: 0.02,
    ior: 1.52, // Flint glass refractive index
    thickness: 1.25,
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff),
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    attenuationColor: new THREE.Color(0xfcf8ee),
    attenuationDistance: 3.5,
    side: THREE.DoubleSide
  });

  const glassJarMesh = new THREE.Mesh(glassGeo, glassMat);
  glassJarMesh.name = 'GlassJarBody';
  glassJarMesh.castShadow = true;
  jarGroup.add(glassJarMesh);

  // Molded Glass Screw Thread Ribs on Neck
  for (let i = 0; i < 2; i++) {
    const threadGeo = new THREE.TorusGeometry(1.365, 0.038, 16, 64);
    const threadMesh = new THREE.Mesh(threadGeo, glassMat);
    threadMesh.rotation.x = Math.PI / 2;
    threadMesh.position.y = 1.82 + i * 0.22;
    jarGroup.add(threadMesh);
  }

  // 5. METALLIC BRASS SCREW LID (with unscrewing & open animation capability)
  const lidGroup = new THREE.Group();
  lidGroup.name = 'JarLidGroup';
  const lidBaseY = 2.24; // Default sealed position resting on jar rim
  lidGroup.position.y = lidBaseY;

  // Rich Brushed Brass Finish
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xa8772a, // Deep golden traditional Indian brass
    metalness: 0.88,
    roughness: 0.26
  });

  // Lid Top Cap Disc
  const lidTopGeo = new THREE.CylinderGeometry(1.44, 1.44, 0.05, 64);
  const lidTopMesh = new THREE.Mesh(lidTopGeo, lidMat);
  lidTopMesh.castShadow = true;
  lidGroup.add(lidTopMesh);

  // Lid Embossed Concentric Center Ring
  const lidRingGeo = new THREE.TorusGeometry(0.95, 0.035, 16, 64);
  const lidRingMesh = new THREE.Mesh(lidRingGeo, lidMat);
  lidRingMesh.rotation.x = Math.PI / 2;
  lidRingMesh.position.y = 0.028;
  lidGroup.add(lidRingMesh);

  // Lid Outer Threaded Skirt with Knurling
  const lidSkirtGeo = new THREE.CylinderGeometry(1.435, 1.435, 0.44, 64, 1, true);
  const lidSkirtMesh = new THREE.Mesh(lidSkirtGeo, lidMat);
  lidSkirtMesh.position.y = -0.22;
  lidGroup.add(lidSkirtMesh);

  // Lid Bottom Beaded Lip
  const lidBeadGeo = new THREE.TorusGeometry(1.435, 0.032, 16, 64);
  const lidBeadMesh = new THREE.Mesh(lidBeadGeo, lidMat);
  lidBeadMesh.rotation.x = Math.PI / 2;
  lidBeadMesh.position.y = -0.44;
  lidGroup.add(lidBeadMesh);

  jarGroup.add(lidGroup);

  // 6. PURE COLD-PRESSED MUSTARD OIL FILLING (Amber liquid with volumetric depth)
  const oilRadius = 1.48;
  const oilHeight = 3.1;
  const oilGeo = new THREE.CylinderGeometry(oilRadius, oilRadius * 0.96, oilHeight, 48);
  const oilMat = new THREE.MeshPhysicalMaterial({
    color: 0xdf9411, // Golden kacchi ghani mustard oil
    transmission: 0.74,
    opacity: 0.94,
    transparent: true,
    roughness: 0.07,
    ior: 1.47, // Vegetable oil refractive index
    thickness: 1.6,
    attenuationColor: new THREE.Color(0x994400),
    attenuationDistance: 1.0,
    clearcoat: 0.95,
    clearcoatRoughness: 0.04
  });
  const oilMesh = new THREE.Mesh(oilGeo, oilMat);
  oilMesh.position.y = -1.85 + oilHeight / 2;
  oilMesh.name = 'MustardOilMesh';
  jarGroup.add(oilMesh);

  // Meniscus Top Surface (Slightly curved fluid surface)
  const meniscusGeo = new THREE.CircleGeometry(oilRadius, 48);
  const meniscusMat = new THREE.MeshStandardMaterial({
    color: 0xe59f1c,
    roughness: 0.05,
    metalness: 0.08,
    transparent: true,
    opacity: 0.88
  });
  const meniscusMesh = new THREE.Mesh(meniscusGeo, meniscusMat);
  meniscusMesh.rotation.x = -Math.PI / 2;
  meniscusMesh.position.y = -1.85 + oilHeight;
  jarGroup.add(meniscusMesh);

  // 7. HAND-CUT RAW MANGO CHUNKS (Organic knife-cut pieces with masala glaze)
  const mangoChunksGroup = new THREE.Group();
  mangoChunksGroup.name = 'MangoChunksGroup';
  jarGroup.add(mangoChunksGroup);

  // Spicy masala-coated mango pulp (golden amber with red chilli glaze)
  const mangoPulpMat = new THREE.MeshStandardMaterial({
    color: 0xd89f28,
    roughness: 0.32,
    metalness: 0.06
  });

  // Tart raw green skin edge
  const mangoSkinMat = new THREE.MeshStandardMaterial({
    color: 0x4d6920,
    roughness: 0.38,
    metalness: 0.04
  });

  // Deep slow-cured spicy masala chunk
  const mangoMasalaMat = new THREE.MeshStandardMaterial({
    color: 0xb55a15,
    roughness: 0.28,
    metalness: 0.08
  });

  const mangoChunkObjects = [];
  const numChunks = 26;

  for (let i = 0; i < numChunks; i++) {
    const size = 0.34 + (i % 6) * 0.06;
    const chunkGeo = new THREE.DodecahedronGeometry(size, 0);

    // Natural vertex perturbation for hand-cut kitchen appearance
    const posAttr = chunkGeo.attributes.position;
    for (let v = 0; v < posAttr.count; v++) {
      const vx = posAttr.getX(v) * (0.84 + ((v + i) % 7) * 0.06);
      const vy = posAttr.getY(v) * (0.84 + ((v * 2 + i) % 5) * 0.07);
      const vz = posAttr.getZ(v) * (0.84 + ((v * 3 + i) % 6) * 0.06);
      posAttr.setXYZ(v, vx, vy, vz);
    }
    chunkGeo.computeVertexNormals();

    const mat = (i % 3 === 0) ? mangoSkinMat : (i % 3 === 1) ? mangoPulpMat : mangoMasalaMat;
    const chunkMesh = new THREE.Mesh(chunkGeo, mat);

    // Cylindrical radial distribution inside jar
    const angle = (i * 2.39996) % (Math.PI * 2);
    const r = 0.25 + ((i * 7) % 10) * 0.095;
    const py = -1.6 + (i / numChunks) * (oilHeight - 0.65);

    chunkMesh.position.set(
      Math.cos(angle) * r,
      py,
      Math.sin(angle) * r
    );

    chunkMesh.rotation.set(
      ((i * 1.3) % 3.14),
      ((i * 2.1) % 3.14),
      ((i * 0.9) % 3.14)
    );

    chunkMesh.userData = {
      basePos: chunkMesh.position.clone(),
      baseRot: chunkMesh.rotation.clone(),
      index: i
    };

    mangoChunksGroup.add(chunkMesh);
    mangoChunkObjects.push(chunkMesh);
  }

  // 8. AUTHENTIC SPICES (Rai, Methi Dana, Saunf & Mathania Red Chilli)
  const spicesGroup = new THREE.Group();
  spicesGroup.name = 'SpicesGroup';
  jarGroup.add(spicesGroup);

  // A. Black Rai (Glossy dark brown-black mustard seeds) - ~180 seeds
  const blackRaiGeo = new THREE.SphereGeometry(0.038, 8, 8);
  const blackRaiMat = new THREE.MeshStandardMaterial({ color: 0x1e120a, roughness: 0.45 });
  const blackRaiInst = new THREE.InstancedMesh(blackRaiGeo, blackRaiMat, 180);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < 180; i++) {
    const angle = (i * 2.61) % (Math.PI * 2);
    const r = 0.35 + (i % 11) * 0.095;
    const py = -1.75 + (i / 180) * (oilHeight - 0.35);
    dummy.position.set(Math.cos(angle) * r, py, Math.sin(angle) * r);
    dummy.rotation.set(Math.random(), Math.random(), Math.random());
    dummy.scale.setScalar(0.75 + (i % 5) * 0.12);
    dummy.updateMatrix();
    blackRaiInst.setMatrixAt(i, dummy.matrix);
  }
  spicesGroup.add(blackRaiInst);

  // B. Yellow Rai (Pounded mustard seeds) - ~110 golden seeds
  const yellowRaiGeo = new THREE.SphereGeometry(0.042, 8, 8);
  const yellowRaiMat = new THREE.MeshStandardMaterial({ color: 0xdcb028, roughness: 0.38 });
  const yellowRaiInst = new THREE.InstancedMesh(yellowRaiGeo, yellowRaiMat, 110);

  for (let i = 0; i < 110; i++) {
    const angle = (i * 3.14) % (Math.PI * 2);
    const r = 0.32 + (i % 9) * 0.11;
    const py = -1.70 + (i / 110) * (oilHeight - 0.45);
    dummy.position.set(Math.cos(angle) * r, py, Math.sin(angle) * r);
    dummy.rotation.set(Math.random(), Math.random(), Math.random());
    dummy.scale.setScalar(0.8 + (i % 4) * 0.15);
    dummy.updateMatrix();
    yellowRaiInst.setMatrixAt(i, dummy.matrix);
  }
  spicesGroup.add(yellowRaiInst);

  // C. Fenugreek Seeds (Methi Dana) - ~60 angular seeds
  const methiGeo = new THREE.BoxGeometry(0.052, 0.075, 0.052);
  const methiMat = new THREE.MeshStandardMaterial({ color: 0x9a5c18, roughness: 0.55 });
  const methiInst = new THREE.InstancedMesh(methiGeo, methiMat, 60);

  for (let i = 0; i < 60; i++) {
    const angle = (i * 4.25) % (Math.PI * 2);
    const r = 0.22 + (i % 8) * 0.13;
    const py = -1.75 + (i / 60) * (oilHeight * 0.82);
    dummy.position.set(Math.cos(angle) * r, py, Math.sin(angle) * r);
    dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    dummy.scale.setScalar(0.85 + (i % 3) * 0.18);
    dummy.updateMatrix();
    methiInst.setMatrixAt(i, dummy.matrix);
  }
  spicesGroup.add(methiInst);

  // D. Fennel Seeds (Saunf) - ~50 elongated slender seeds
  const saunfGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.12, 6);
  const saunfMat = new THREE.MeshStandardMaterial({ color: 0x768538, roughness: 0.48 });
  const saunfInst = new THREE.InstancedMesh(saunfGeo, saunfMat, 50);

  for (let i = 0; i < 50; i++) {
    const angle = (i * 1.88) % (Math.PI * 2);
    const r = 0.28 + (i % 7) * 0.14;
    const py = -1.65 + (i / 50) * (oilHeight * 0.88);
    dummy.position.set(Math.cos(angle) * r, py, Math.sin(angle) * r);
    dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    dummy.scale.setScalar(0.85 + (i % 4) * 0.14);
    dummy.updateMatrix();
    saunfInst.setMatrixAt(i, dummy.matrix);
  }
  spicesGroup.add(saunfInst);

  // E. Mathania Red Chilli Flakes - ~40 spicy red flakes
  const chilliGeo = new THREE.BoxGeometry(0.09, 0.02, 0.09);
  const chilliMat = new THREE.MeshStandardMaterial({ color: 0xba220f, roughness: 0.32 });
  const chilliInst = new THREE.InstancedMesh(chilliGeo, chilliMat, 40);

  for (let i = 0; i < 40; i++) {
    const angle = (i * 2.85) % (Math.PI * 2);
    const r = 0.35 + (i % 6) * 0.15;
    const py = -1.55 + (i / 40) * (oilHeight * 0.92);
    dummy.position.set(Math.cos(angle) * r, py, Math.sin(angle) * r);
    dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    dummy.scale.setScalar(0.75 + (i % 4) * 0.18);
    dummy.updateMatrix();
    chilliInst.setMatrixAt(i, dummy.matrix);
  }
  spicesGroup.add(chilliInst);

  // 9. HIGH-RESOLUTION PHYSICALLY WRAPPED LABEL
  const labelHeight = 2.18;
  const labelRadius = jarRadius + 0.015; // Hugs outer glass without z-fighting
  const labelGeo = new THREE.CylinderGeometry(
    labelRadius,
    labelRadius,
    labelHeight,
    72,
    1,
    true
  );

  const labelCanvas = createJarLabelCanvas();
  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.wrapS = THREE.ClampToEdgeWrapping;
  labelTexture.wrapT = THREE.ClampToEdgeWrapping;
  labelTexture.anisotropy = 16;

  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.62,
    metalness: 0.06,
    side: THREE.DoubleSide
  });

  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = -0.32;
  labelMesh.rotation.y = -Math.PI / 2; // Aligns front label to camera at 0 deg
  labelMesh.name = 'JarLabelMesh';
  jarGroup.add(labelMesh);

  // 10. Glowing Bounding Box / Hotspot Mesh for "Explore Ingredients"
  const highlightGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.0
  });
  const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
  highlightMesh.position.set(0.4, 0.1, 0.4);
  jarGroup.add(highlightMesh);

  // 11. Interactive State Controllers
  let lidOpenFactor = 0; // 0 = closed, 1 = fully open

  function setLidOpen(factor) {
    lidOpenFactor = THREE.MathUtils.clamp(factor, 0, 1);
    // Smooth unscrewing: translates upward + rotates around Y (unscrew threads)
    lidGroup.position.y = lidBaseY + lidOpenFactor * 2.75;
    lidGroup.rotation.y = lidOpenFactor * (Math.PI * 0.85);
    lidGroup.rotation.z = lidOpenFactor * 0.10;
  }

  function setHighlightVisible(visible, pos = null) {
    highlightMat.opacity = visible ? 0.75 : 0.0;
    if (pos) {
      highlightMesh.position.copy(pos);
    }
  }

  // "Animate Ingredients" Sequencer (4 stages: Mangoes -> Spices -> Mustard Oil -> Mix & Seal)
  function setAnimationProgress(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    if (p < 0.25) {
      // Stage 1: Raw Mangoes tumbling into open jar
      const sub = p / 0.25;
      setLidOpen(Math.min(1, sub * 2));
      mangoChunkObjects.forEach((chunk, idx) => {
        const delay = (idx / numChunks) * 0.45;
        const chunkP = THREE.MathUtils.clamp((sub - delay) / 0.55, 0, 1);
        const startY = 4.5 + (idx % 4) * 0.7;
        chunk.position.y = THREE.MathUtils.lerp(startY, chunk.userData.basePos.y, easeOutBounce(chunkP));
        chunk.scale.setScalar(Math.min(1, chunkP * 1.25));
      });
      oilMesh.scale.y = 0.12;
      oilMesh.position.y = -1.75;
      spicesGroup.visible = false;
    } else if (p < 0.52) {
      // Stage 2: Spices shower down
      const sub = (p - 0.25) / 0.27;
      setLidOpen(1);
      spicesGroup.visible = true;
      spicesGroup.position.y = THREE.MathUtils.lerp(2.8, 0, sub);
      spicesGroup.scale.setScalar(Math.min(1, sub * 1.2));
      mangoChunkObjects.forEach((chunk) => {
        chunk.position.copy(chunk.userData.basePos);
        chunk.scale.setScalar(1);
      });
      oilMesh.scale.y = 0.25;
      oilMesh.position.y = -1.6;
    } else if (p < 0.80) {
      // Stage 3: Cold-pressed mustard oil streams in and rises
      const sub = (p - 0.52) / 0.28;
      setLidOpen(1);
      spicesGroup.visible = true;
      spicesGroup.position.y = 0;
      spicesGroup.scale.setScalar(1);
      const curOilH = THREE.MathUtils.lerp(0.25, 1.0, sub);
      oilMesh.scale.y = curOilH;
      oilMesh.position.y = -1.85 + (oilHeight * curOilH) / 2;
      meniscusMesh.position.y = -1.85 + oilHeight * curOilH;
    } else {
      // Stage 4: Mix & Seal (Lid screws down tight)
      const sub = (p - 0.80) / 0.20;
      setLidOpen(1 - sub);
      oilMesh.scale.y = 1.0;
      oilMesh.position.y = -1.85 + oilHeight / 2;
      meniscusMesh.position.y = -1.85 + oilHeight;
      spicesGroup.visible = true;
      spicesGroup.position.y = 0;
    }
  }

  function resetToDefault() {
    setLidOpen(0);
    setHighlightVisible(false);
    mangoChunkObjects.forEach((chunk) => {
      chunk.position.copy(chunk.userData.basePos);
      chunk.rotation.copy(chunk.userData.baseRot);
      chunk.scale.setScalar(1);
    });
    oilMesh.scale.y = 1.0;
    oilMesh.position.y = -1.85 + oilHeight / 2;
    meniscusMesh.position.y = -1.85 + oilHeight;
    spicesGroup.visible = true;
    spicesGroup.position.y = 0;
    spicesGroup.scale.setScalar(1);
  }

  return {
    rootGroup,
    lightsGroup,
    jarGroup,
    lidGroup,
    oilMesh,
    labelMesh,
    highlightMesh,
    mangoChunkObjects,
    setLidOpen,
    setHighlightVisible,
    setAnimationProgress,
    resetToDefault
  };
}

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}
