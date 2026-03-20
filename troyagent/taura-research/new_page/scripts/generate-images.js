const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1600, H = 800;
const OUT = path.join(__dirname, '..', 'public', 'images', 'articles');

// Color palette
const BLACK = '#0A0A0A';
const VINHO = [139, 32, 53];    // #8b2035
const PRATA = [196, 196, 196];  // #C4C4C4
const DIM = [68, 68, 68];

function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function drawBase(ctx, seed) {
  const rng = seededRandom(seed);
  // Background gradient
  const grad = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.7);
  grad.addColorStop(0, '#1a0508');
  grad.addColorStop(1, BLACK);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = rgba(VINHO, 0.04);
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 160) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Scatter faint particles
  for (let i = 0; i < 60; i++) {
    const x = rng() * W, y = rng() * H, r = rng() * 1.5 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(VINHO, rng() * 0.06 + 0.01);
    ctx.fill();
  }
  return rng;
}

function drawGlow(ctx, x, y, rx, ry, opacity = 0.08) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
  g.addColorStop(0, rgba(VINHO, opacity));
  g.addColorStop(1, rgba(VINHO, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLabel(ctx, text) {
  ctx.font = '16px monospace';
  ctx.fillStyle = rgba(VINHO, 0.25);
  ctx.letterSpacing = '6px';
  ctx.textAlign = 'center';
  ctx.fillText(text.toUpperCase(), W / 2, H - 30);
}

function drawNode(ctx, x, y, r, color = VINHO, opacity = 0.4) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = rgba(color, opacity);
  ctx.fill();
}

function drawLine(ctx, x1, y1, x2, y2, color = VINHO, opacity = 0.2, width = 1) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = rgba(color, opacity);
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawDashedLine(ctx, x1, y1, x2, y2, color = VINHO, opacity = 0.15) {
  ctx.setLineDash([6, 6]);
  drawLine(ctx, x1, y1, x2, y2, color, opacity, 0.8);
  ctx.setLineDash([]);
}

function drawText(ctx, text, x, y, size = 12, color = PRATA, opacity = 0.3, align = 'center') {
  ctx.font = `${size}px monospace`;
  ctx.fillStyle = rgba(color, opacity);
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawHexagon(ctx, cx, cy, r, color = VINHO, opacity = 0.2) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = rgba(color, opacity);
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawWave(ctx, x0, y0, w, amplitude, freq, color = VINHO, opacity = 0.25) {
  ctx.beginPath();
  for (let x = 0; x <= w; x += 2) {
    const y = y0 + Math.sin((x / w) * Math.PI * freq) * amplitude;
    x === 0 ? ctx.moveTo(x0 + x, y) : ctx.lineTo(x0 + x, y);
  }
  ctx.strokeStyle = rgba(color, opacity);
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// ──── IMAGE GENERATORS ────

const generators = {
  'retatrutida': (ctx, rng) => {
    // Triple agonism - 3 overlapping circles
    const cx = W / 2, cy = H / 2 - 20;
    const r = 140, d = 100;
    [[cx - d * 0.7, cy - d * 0.4], [cx + d * 0.7, cy - d * 0.4], [cx, cy + d * 0.6]].forEach(([x, y], i) => {
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(VINHO, 0.18 + i * 0.03); ctx.lineWidth = 2; ctx.stroke();
      drawGlow(ctx, x, y, r * 0.6, r * 0.6, 0.04);
    });
    // Center glow
    drawGlow(ctx, cx, cy, 60, 60, 0.12);
    drawNode(ctx, cx, cy, 6, VINHO, 0.6);
    // Labels
    drawText(ctx, 'GLP-1', cx - d * 0.7, cy - d * 0.4 - r - 20, 14, VINHO, 0.45);
    drawText(ctx, 'GIP', cx + d * 0.7, cy - d * 0.4 - r - 20, 14, VINHO, 0.45);
    drawText(ctx, 'GLUCAGON', cx, cy + d * 0.6 + r + 30, 14, VINHO, 0.45);
    // Connecting bonds
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 / 12) * i;
      drawNode(ctx, cx + 30 * Math.cos(a), cy + 30 * Math.sin(a), 2, PRATA, 0.2);
    }
    drawLabel(ctx, 'AGONISMO TRIPLO');
  },

  'tirzepatida': (ctx, rng) => {
    // Dual agonist - two hexagons connected
    drawHexagon(ctx, W * 0.38, H * 0.45, 110, VINHO, 0.25);
    drawHexagon(ctx, W * 0.62, H * 0.45, 110, VINHO, 0.25);
    drawGlow(ctx, W * 0.38, H * 0.45, 80, 80, 0.06);
    drawGlow(ctx, W * 0.62, H * 0.45, 80, 80, 0.06);
    // Connection bridge
    for (let i = 0; i < 5; i++) {
      const y = H * 0.35 + i * 20;
      drawLine(ctx, W * 0.44, y, W * 0.56, y, PRATA, 0.08 + i * 0.02, 0.8);
    }
    drawNode(ctx, W * 0.5, H * 0.45, 8, VINHO, 0.5);
    drawText(ctx, 'GLP-1R', W * 0.38, H * 0.45, 16, PRATA, 0.3);
    drawText(ctx, 'GIPR', W * 0.62, H * 0.45, 16, PRATA, 0.3);
    // Signal arrows down
    drawDashedLine(ctx, W * 0.38, H * 0.65, W * 0.38, H * 0.82, VINHO, 0.15);
    drawDashedLine(ctx, W * 0.62, H * 0.65, W * 0.62, H * 0.82, VINHO, 0.15);
    drawText(ctx, 'cAMP ↑', W * 0.38, H * 0.88, 11, PRATA, 0.2);
    drawText(ctx, 'cAMP ↑', W * 0.62, H * 0.88, 11, PRATA, 0.2);
    drawLabel(ctx, 'DUAL AGONISTA');
  },

  'semax': (ctx, rng) => {
    // Neuron with BDNF
    const cx = W * 0.45, cy = H * 0.45;
    // Cell body
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fillStyle = rgba(VINHO, 0.08); ctx.fill();
    ctx.strokeStyle = rgba(VINHO, 0.25); ctx.lineWidth = 2; ctx.stroke();
    drawGlow(ctx, cx, cy, 60, 60, 0.08);
    drawText(ctx, 'SOMA', cx, cy + 4, 10, PRATA, 0.3);
    // Dendrites
    const branches = [[cx - 140, cy - 120], [cx - 160, cy + 80], [cx + 180, cy - 60], [cx + 160, cy + 100], [cx - 50, cy - 160], [cx + 80, cy + 150]];
    branches.forEach(([bx, by]) => {
      ctx.beginPath(); ctx.moveTo(cx + (bx - cx) * 0.2, cy + (by - cy) * 0.2);
      ctx.quadraticCurveTo(cx + (bx - cx) * 0.5 + rng() * 40 - 20, cy + (by - cy) * 0.5 + rng() * 40 - 20, bx, by);
      ctx.strokeStyle = rgba(VINHO, 0.15); ctx.lineWidth = 1.5; ctx.stroke();
      drawNode(ctx, bx, by, 3, VINHO, 0.3);
      // Sub-branches
      for (let j = 0; j < 2; j++) {
        const sx = bx + (rng() - 0.5) * 60, sy = by + (rng() - 0.5) * 60;
        drawLine(ctx, bx, by, sx, sy, VINHO, 0.1, 0.8);
        drawNode(ctx, sx, sy, 1.5, PRATA, 0.2);
      }
    });
    // BDNF molecules floating
    for (let i = 0; i < 8; i++) {
      const bx = W * 0.55 + rng() * 400, by = H * 0.15 + rng() * H * 0.7;
      drawNode(ctx, bx, by, 5 + rng() * 3, VINHO, 0.15 + rng() * 0.1);
      drawText(ctx, 'BDNF', bx, by - 12, 8, VINHO, 0.2);
    }
    drawLabel(ctx, 'NOOTRÓPICO · BDNF');
  },

  'bpc-157': (ctx, rng) => {
    // Tissue repair - broken and reconnecting strands
    const cy = H / 2;
    // Broken tissue strands
    for (let i = 0; i < 7; i++) {
      const y = cy - 120 + i * 40;
      const breakX = W * 0.48 + rng() * 40;
      // Left part
      ctx.beginPath(); ctx.moveTo(W * 0.15, y + rng() * 10);
      ctx.quadraticCurveTo(W * 0.3, y + rng() * 15 - 7, breakX - 20, y);
      ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
      // Right part
      ctx.beginPath(); ctx.moveTo(breakX + 20, y + 5);
      ctx.quadraticCurveTo(W * 0.65, y + rng() * 15 - 7, W * 0.85, y + rng() * 10);
      ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
      // Reconnection glow
      drawGlow(ctx, breakX, y, 25, 15, 0.06);
      drawNode(ctx, breakX - 18, y, 2, VINHO, 0.4);
      drawNode(ctx, breakX + 18, y + 5, 2, VINHO, 0.4);
    }
    // Central healing glow
    drawGlow(ctx, W * 0.5, cy, 100, 150, 0.06);
    // BPC molecule
    drawHexagon(ctx, W * 0.5, cy, 30, VINHO, 0.3);
    drawText(ctx, 'BPC-157', W * 0.5, cy + 4, 10, PRATA, 0.35);
    // Stomach outline
    ctx.beginPath();
    ctx.moveTo(W * 0.78, H * 0.2);
    ctx.quadraticCurveTo(W * 0.92, H * 0.35, W * 0.88, H * 0.55);
    ctx.quadraticCurveTo(W * 0.82, H * 0.7, W * 0.72, H * 0.65);
    ctx.quadraticCurveTo(W * 0.68, H * 0.5, W * 0.72, H * 0.3);
    ctx.strokeStyle = rgba(PRATA, 0.06); ctx.lineWidth = 1; ctx.stroke();
    drawLabel(ctx, 'REPARO TECIDUAL');
  },

  'pp-332': (ctx, rng) => {
    // Exercise mimetic - muscle fibers + mitochondria
    // Muscle fibers
    for (let i = 0; i < 12; i++) {
      const y = 80 + i * 55;
      ctx.beginPath(); ctx.moveTo(100, y);
      for (let x = 100; x < W - 100; x += 4) {
        ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * 3);
      }
      ctx.strokeStyle = rgba(VINHO, 0.08 + (i % 3) * 0.03); ctx.lineWidth = 20; ctx.stroke();
      // Sarcomere bands
      for (let x = 200; x < W - 200; x += 80) {
        drawLine(ctx, x, y - 10, x, y + 10, PRATA, 0.04, 0.5);
      }
    }
    // ERRα receptor hexagon
    drawHexagon(ctx, W * 0.5, H * 0.45, 70, VINHO, 0.3);
    drawGlow(ctx, W * 0.5, H * 0.45, 90, 90, 0.08);
    drawText(ctx, 'ERRα', W * 0.5, H * 0.45, 18, PRATA, 0.35);
    // Mitochondria shapes
    [[W * 0.2, H * 0.3], [W * 0.8, H * 0.6], [W * 0.75, H * 0.25]].forEach(([mx, my]) => {
      ctx.beginPath(); ctx.ellipse(mx, my, 40, 22, 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(VINHO, 0.15); ctx.lineWidth = 1.2; ctx.stroke();
      // Cristae
      for (let j = 0; j < 3; j++) {
        const cx2 = mx - 20 + j * 15;
        ctx.beginPath(); ctx.moveTo(cx2, my - 12); ctx.quadraticCurveTo(cx2 + 8, my, cx2, my + 12);
        ctx.strokeStyle = rgba(PRATA, 0.08); ctx.lineWidth = 0.6; ctx.stroke();
      }
    });
    drawLabel(ctx, 'SARMs · EXERCISE MIMETIC');
  },

  'pt-141': (ctx, rng) => {
    // Brain cross-section with melanocortin pathway
    const cx = W * 0.45, cy = H * 0.45;
    // Brain outline
    ctx.beginPath();
    ctx.ellipse(cx, cy, 180, 150, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(PRATA, 0.1); ctx.lineWidth = 1.5; ctx.stroke();
    // Hypothalamus
    ctx.beginPath(); ctx.arc(cx, cy + 30, 35, 0, Math.PI * 2);
    ctx.fillStyle = rgba(VINHO, 0.1); ctx.fill();
    ctx.strokeStyle = rgba(VINHO, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
    drawGlow(ctx, cx, cy + 30, 50, 50, 0.1);
    drawText(ctx, 'MC4R', cx, cy + 34, 12, PRATA, 0.4);
    // Cortex regions
    ctx.beginPath(); ctx.arc(cx - 80, cy - 60, 45, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(PRATA, 0.06); ctx.lineWidth = 0.8; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + 70, cy - 40, 50, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(PRATA, 0.06); ctx.lineWidth = 0.8; ctx.stroke();
    // Signal path
    const path = [[W * 0.75, H * 0.2], [W * 0.65, H * 0.35], [cx + 35, cy + 30]];
    ctx.beginPath(); ctx.moveTo(path[0][0], path[0][1]);
    path.forEach(([px, py]) => ctx.lineTo(px, py));
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.setLineDash([8, 5]); ctx.stroke(); ctx.setLineDash([]);
    path.forEach(([px, py]) => drawNode(ctx, px, py, 4, VINHO, 0.35));
    drawText(ctx, 'PT-141', W * 0.75, H * 0.15, 14, VINHO, 0.4);
    drawText(ctx, 'CENTRAL ACTION', W * 0.75, H * 0.82, 11, PRATA, 0.15);
    drawLabel(ctx, 'PEPTÍDEO · SNC');
  },

  'cjc-ipamorelin': (ctx, rng) => {
    // GH pulsatile release curve
    const baseY = H * 0.7, topY = H * 0.15;
    // Axis
    drawLine(ctx, 150, baseY, W - 150, baseY, PRATA, 0.15, 1);
    drawLine(ctx, 150, topY, 150, baseY, PRATA, 0.1, 0.5);
    // GH pulse peaks
    ctx.beginPath(); ctx.moveTo(150, baseY);
    const peaks = [250, 500, 750, 1000, 1250];
    peaks.forEach((px, i) => {
      const peakH = 180 + rng() * 80;
      ctx.quadraticCurveTo(px - 40, baseY, px - 20, baseY - peakH * 0.3);
      ctx.quadraticCurveTo(px, baseY - peakH, px + 10, baseY - peakH * 0.8);
      ctx.quadraticCurveTo(px + 40, baseY - peakH * 0.1, px + 80, baseY);
    });
    ctx.lineTo(W - 150, baseY);
    ctx.strokeStyle = rgba(VINHO, 0.35); ctx.lineWidth = 2; ctx.stroke();
    // Fill under curve
    ctx.lineTo(W - 150, baseY); ctx.lineTo(150, baseY); ctx.closePath();
    ctx.fillStyle = rgba(VINHO, 0.03); ctx.fill();
    // Peak markers
    peaks.forEach((px) => {
      drawNode(ctx, px, baseY - 200, 4, VINHO, 0.4);
      drawDashedLine(ctx, px, baseY - 200, px, baseY, PRATA, 0.05);
    });
    // Injection markers
    [200, 450, 700, 950, 1200].forEach((x, i) => {
      drawLine(ctx, x, baseY, x, baseY + 15, VINHO, 0.25, 1.5);
      drawText(ctx, '▼', x, baseY + 28, 10, VINHO, 0.3);
    });
    drawText(ctx, 'GH (ng/mL)', 90, H * 0.45, 10, PRATA, 0.2, 'center');
    drawText(ctx, 'TEMPO (h)', W * 0.5, baseY + 50, 12, PRATA, 0.2);
    drawLabel(ctx, 'GH PULSÁTIL');
  },

  'epithalon': (ctx, rng) => {
    // DNA helix with telomere caps
    const cx = W * 0.35, startY = 60, endY = H - 60;
    // Double helix
    for (let y = startY; y < endY; y += 2) {
      const t = (y - startY) / (endY - startY);
      const x1 = cx + Math.sin(t * Math.PI * 6) * 50;
      const x2 = cx - Math.sin(t * Math.PI * 6) * 50;
      drawNode(ctx, x1, y, 1.5, VINHO, 0.2);
      drawNode(ctx, x2, y, 1.5, VINHO, 0.15);
      if (y % 20 < 3) drawLine(ctx, x1, y, x2, y, PRATA, 0.06, 0.5);
    }
    // Telomere caps
    ctx.fillStyle = rgba(VINHO, 0.12);
    ctx.fillRect(cx - 60, startY - 10, 120, 25);
    ctx.strokeStyle = rgba(VINHO, 0.35); ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 60, startY - 10, 120, 25);
    drawGlow(ctx, cx, startY, 80, 20, 0.1);
    drawText(ctx, 'TTAGGG', cx, startY + 6, 11, PRATA, 0.4);
    ctx.fillStyle = rgba(VINHO, 0.12);
    ctx.fillRect(cx - 60, endY - 15, 120, 25);
    ctx.strokeStyle = rgba(VINHO, 0.35); ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 60, endY - 15, 120, 25);
    drawGlow(ctx, cx, endY, 80, 20, 0.1);
    drawText(ctx, 'TTAGGG', cx, endY + 1, 11, PRATA, 0.4);
    // Telomerase enzyme
    ctx.beginPath(); ctx.ellipse(W * 0.7, H * 0.45, 90, 55, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
    drawGlow(ctx, W * 0.7, H * 0.45, 90, 55, 0.05);
    drawText(ctx, 'TELOMERASE', W * 0.7, H * 0.43, 14, PRATA, 0.3);
    drawText(ctx, 'hTERT', W * 0.7, H * 0.5, 11, PRATA, 0.2);
    // Arrow
    drawDashedLine(ctx, W * 0.6, H * 0.45, cx + 70, H * 0.45, VINHO, 0.2);
    drawLabel(ctx, 'LONGEVIDADE · TELOMERASE');
  },

  'mots-c': (ctx, rng) => {
    // Mitochondria cross-section
    const cx = W * 0.45, cy = H * 0.45;
    // Outer membrane
    ctx.beginPath(); ctx.ellipse(cx, cy, 200, 120, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 2; ctx.stroke();
    // Inner membrane with cristae
    ctx.beginPath(); ctx.ellipse(cx, cy, 170, 100, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.12); ctx.lineWidth = 1; ctx.stroke();
    // Cristae folds
    for (let i = 0; i < 6; i++) {
      const sx = cx - 120 + i * 50;
      ctx.beginPath();
      ctx.moveTo(sx, cy - 80); ctx.quadraticCurveTo(sx + 15, cy - 20, sx, cy + 10);
      ctx.quadraticCurveTo(sx - 15, cy + 40, sx, cy + 80);
      ctx.strokeStyle = rgba(VINHO, 0.1); ctx.lineWidth = 1; ctx.stroke();
    }
    // mtDNA circle
    ctx.beginPath(); ctx.arc(cx + 50, cy + 20, 25, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(PRATA, 0.15); ctx.lineWidth = 1.5; ctx.stroke();
    drawText(ctx, 'mtDNA', cx + 50, cy + 24, 8, PRATA, 0.25);
    drawGlow(ctx, cx, cy, 200, 120, 0.04);
    // MOTS-c particles emerging
    for (let i = 0; i < 8; i++) {
      const a = rng() * Math.PI * 2;
      const dist = 230 + rng() * 100;
      const px = cx + Math.cos(a) * dist, py = cy + Math.sin(a) * dist * 0.6;
      drawNode(ctx, px, py, 4, VINHO, 0.25);
      drawDashedLine(ctx, cx + Math.cos(a) * 200, cy + Math.sin(a) * 120, px, py, VINHO, 0.08);
    }
    drawText(ctx, 'MOTS-c', W * 0.8, H * 0.2, 16, VINHO, 0.35);
    drawLabel(ctx, 'LONGEVIDADE · MITOCONDRIAL');
  },

  'peptideos-sinteticos-vs-naturais': (ctx, rng) => {
    // Split: synthetic (geometric) vs natural (organic)
    drawLine(ctx, W * 0.5, 60, W * 0.5, H - 60, PRATA, 0.08, 1);
    drawText(ctx, 'SINTÉTICO', W * 0.25, 80, 14, VINHO, 0.35);
    drawText(ctx, 'NATURAL', W * 0.75, 80, 14, VINHO, 0.35);
    // Synthetic: clean geometric chain
    const sy = H * 0.45;
    for (let i = 0; i < 8; i++) {
      const x = 120 + i * 80;
      drawHexagon(ctx, x, sy + (i % 2) * 20, 20, VINHO, 0.2);
      if (i > 0) drawLine(ctx, x - 60, sy + ((i - 1) % 2) * 20, x - 20, sy + (i % 2) * 20, PRATA, 0.1);
    }
    drawText(ctx, 'SPPS · HPLC ≥98%', W * 0.25, H * 0.75, 11, PRATA, 0.2);
    // Natural: organic wavy chain
    ctx.beginPath();
    for (let x = W * 0.55; x < W - 100; x += 3) {
      const y = sy + Math.sin((x - W * 0.55) * 0.03) * 30 + Math.sin((x - W * 0.55) * 0.07) * 15;
      x === W * 0.55 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 2; ctx.stroke();
    // Organic nodes with variation
    for (let i = 0; i < 8; i++) {
      const x = W * 0.58 + i * 65;
      const y = sy + Math.sin(i * 0.8) * 30;
      drawNode(ctx, x, y, 6 + rng() * 4, VINHO, 0.12 + rng() * 0.08);
    }
    drawText(ctx, 'ENDÓGENO · VARIÁVEL', W * 0.75, H * 0.75, 11, PRATA, 0.2);
    drawLabel(ctx, 'PEPTÍDEOS · COMPARATIVO');
  },

  'hplc-pureza-peptideos': (ctx, rng) => {
    // HPLC chromatogram
    const baseY = H * 0.78, topY = H * 0.1;
    drawLine(ctx, 150, baseY, W - 150, baseY, PRATA, 0.15, 1);
    drawLine(ctx, 150, topY, 150, baseY, PRATA, 0.1, 0.5);
    // Main peak
    ctx.beginPath(); ctx.moveTo(150, baseY);
    ctx.lineTo(500, baseY); ctx.quadraticCurveTo(600, baseY, 650, baseY - 50);
    ctx.quadraticCurveTo(720, baseY - 400, 740, baseY - 450);
    ctx.quadraticCurveTo(755, baseY - 470, 770, baseY - 450);
    ctx.quadraticCurveTo(790, baseY - 400, 860, baseY - 50);
    ctx.quadraticCurveTo(900, baseY, 1000, baseY);
    ctx.lineTo(W - 150, baseY);
    ctx.strokeStyle = rgba(VINHO, 0.4); ctx.lineWidth = 2.5; ctx.stroke();
    // Fill under main peak
    ctx.lineTo(W - 150, baseY); ctx.lineTo(150, baseY); ctx.closePath();
    ctx.fillStyle = rgba(VINHO, 0.04); ctx.fill();
    drawGlow(ctx, 760, baseY - 300, 60, 150, 0.06);
    drawNode(ctx, 760, baseY - 470, 5, VINHO, 0.5);
    drawText(ctx, 'tR = 14.2 min', 760, baseY - 490, 12, VINHO, 0.4);
    drawText(ctx, '98.7%', 760, baseY - 250, 20, PRATA, 0.3);
    // Small impurity peaks
    ctx.beginPath(); ctx.moveTo(350, baseY);
    ctx.quadraticCurveTo(370, baseY - 40, 390, baseY);
    ctx.strokeStyle = rgba(VINHO, 0.15); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1050, baseY);
    ctx.quadraticCurveTo(1070, baseY - 30, 1090, baseY);
    ctx.strokeStyle = rgba(VINHO, 0.12); ctx.lineWidth = 1; ctx.stroke();
    drawText(ctx, 'λ = 220nm', W - 200, 80, 11, PRATA, 0.15);
    drawText(ctx, 'ABSORBANCE (mAU)', 80, H * 0.45, 10, PRATA, 0.15);
    drawText(ctx, 'RETENTION TIME (min)', W * 0.5, baseY + 45, 12, PRATA, 0.2);
    drawLabel(ctx, 'HPLC · ANÁLISE');
  },

  'via-subcutanea-farmacocinetica': (ctx, rng) => {
    // PK curve + skin layers
    // Skin layers
    ctx.fillStyle = rgba(PRATA, 0.03);
    ctx.fillRect(100, 50, 350, 70);
    ctx.fillStyle = rgba(VINHO, 0.04);
    ctx.fillRect(100, 120, 350, 80);
    ctx.fillStyle = rgba(PRATA, 0.02);
    ctx.fillRect(100, 200, 350, 120);
    drawText(ctx, 'EPIDERME', 275, 90, 10, PRATA, 0.2);
    drawText(ctx, 'DERME', 275, 165, 10, PRATA, 0.2);
    drawText(ctx, 'SUBCUTÂNEO', 275, 265, 10, VINHO, 0.25);
    // Needle
    drawLine(ctx, 200, 30, 250, 230, PRATA, 0.2, 2);
    drawNode(ctx, 250, 230, 5, VINHO, 0.4);
    drawGlow(ctx, 250, 230, 30, 30, 0.1);
    // PK curve
    const bx = 550, by = H * 0.8, pw = 800, ph = 400;
    drawLine(ctx, bx, by, bx + pw, by, PRATA, 0.12, 1);
    drawLine(ctx, bx, by - ph, bx, by, PRATA, 0.08, 0.5);
    ctx.beginPath(); ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(bx + 100, by, bx + 150, by - ph * 0.5);
    ctx.quadraticCurveTo(bx + 200, by - ph * 0.9, bx + 250, by - ph * 0.85);
    ctx.quadraticCurveTo(bx + 400, by - ph * 0.4, bx + 600, by - ph * 0.15);
    ctx.quadraticCurveTo(bx + 700, by - ph * 0.05, bx + pw, by);
    ctx.strokeStyle = rgba(VINHO, 0.35); ctx.lineWidth = 2; ctx.stroke();
    // Tmax, Cmax annotations
    drawDashedLine(ctx, bx + 230, by, bx + 230, by - ph * 0.85, PRATA, 0.08);
    drawDashedLine(ctx, bx, by - ph * 0.85, bx + 230, by - ph * 0.85, PRATA, 0.08);
    drawText(ctx, 'Tmax', bx + 230, by + 25, 11, VINHO, 0.35);
    drawText(ctx, 'Cmax', bx - 40, by - ph * 0.85, 11, VINHO, 0.35, 'right');
    drawLabel(ctx, 'FARMACOCINÉTICA');
  },

  'sarms-receptores-androgenicos': (ctx, rng) => {
    // Androgen receptor with SARM key
    const cx = W * 0.45, cy = H * 0.45;
    // Receptor large shape
    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.15); ctx.lineWidth = 2; ctx.stroke();
    // LBD pocket
    ctx.beginPath(); ctx.arc(cx + 40, cy, 50, 0, Math.PI * 2);
    ctx.fillStyle = rgba(VINHO, 0.06); ctx.fill();
    ctx.strokeStyle = rgba(VINHO, 0.25); ctx.lineWidth = 1.5; ctx.stroke();
    drawText(ctx, 'LBD', cx + 40, cy + 4, 12, PRATA, 0.3);
    drawText(ctx, 'AR', cx - 40, cy + 4, 16, PRATA, 0.2);
    // SARM molecule approaching
    drawHexagon(ctx, W * 0.75, cy, 30, VINHO, 0.35);
    drawNode(ctx, W * 0.75, cy, 8, VINHO, 0.3);
    drawText(ctx, 'SARM', W * 0.75, cy - 45, 12, VINHO, 0.4);
    drawDashedLine(ctx, W * 0.72, cy, cx + 90, cy, VINHO, 0.2);
    // Tissue selectivity arrows
    drawLine(ctx, cx, cy + 140, cx - 100, cy + 260, VINHO, 0.15, 1.5);
    drawLine(ctx, cx, cy + 140, cx + 100, cy + 260, VINHO, 0.15, 1.5);
    drawText(ctx, 'MÚSCULO ✓', cx - 100, cy + 285, 11, VINHO, 0.35);
    drawText(ctx, 'PRÓSTATA ✗', cx + 100, cy + 285, 11, PRATA, 0.15);
    drawGlow(ctx, cx - 100, cy + 260, 50, 20, 0.06);
    drawLabel(ctx, 'SARMs · SELETIVIDADE');
  },

  'sarms-vs-esteroides': (ctx, rng) => {
    // Side by side comparison
    drawLine(ctx, W * 0.5, 60, W * 0.5, H - 60, PRATA, 0.06, 1);
    drawText(ctx, 'ESTEROIDE', W * 0.25, 80, 14, PRATA, 0.25);
    drawText(ctx, 'SARM', W * 0.75, 80, 14, VINHO, 0.4);
    // Steroid: 4-ring structure
    const sx = W * 0.25, sy = H * 0.4;
    [[0, 0], [55, 0], [82, 35], [27, 35]].forEach(([ox, oy], i) => {
      drawHexagon(ctx, sx + ox - 40, sy + oy, 30, PRATA, 0.15);
    });
    // All tissue activation (full)
    ['Músculo', 'Próstata', 'Fígado', 'Pele', 'SNC'].forEach((t, i) => {
      const y = sy + 120 + i * 30;
      ctx.fillStyle = rgba(PRATA, 0.06);
      ctx.fillRect(sx - 80, y - 8, 160, 16);
      ctx.fillStyle = rgba(PRATA, 0.12);
      ctx.fillRect(sx - 80, y - 8, 160, 16);
      drawText(ctx, t, sx, y + 4, 9, PRATA, 0.25);
    });
    drawText(ctx, 'AGONISMO TOTAL', sx, sy + 290, 10, PRATA, 0.2);
    // SARM: selective
    const rx = W * 0.75, ry = H * 0.4;
    drawHexagon(ctx, rx, ry, 40, VINHO, 0.3);
    drawGlow(ctx, rx, ry, 50, 50, 0.06);
    ['Músculo', 'Osso'].forEach((t, i) => {
      const y = ry + 120 + i * 30;
      ctx.fillStyle = rgba(VINHO, 0.1);
      ctx.fillRect(rx - 80, y - 8, 160, 16);
      drawText(ctx, t + ' ✓', rx, y + 4, 9, VINHO, 0.35);
    });
    ['Próstata', 'Fígado', 'Pele'].forEach((t, i) => {
      const y = ry + 180 + i * 30;
      drawText(ctx, t + ' —', rx, y + 4, 9, PRATA, 0.12);
    });
    drawText(ctx, 'SELETIVO', rx, ry + 290, 10, VINHO, 0.3);
    drawLabel(ctx, 'SARMs vs ESTEROIDES');
  },

  'ostarine-mk2866-literatura': (ctx, rng) => {
    // Clinical data chart
    const bx = 200, by = H * 0.78, pw = W - 400, ph = H * 0.55;
    drawLine(ctx, bx, by, bx + pw, by, PRATA, 0.12, 1);
    drawLine(ctx, bx, by - ph, bx, by, PRATA, 0.08, 0.5);
    // Bar groups
    const groups = ['0.1mg', '0.3mg', '1mg', '3mg', 'Placebo'];
    const values = [0.3, 0.5, 0.72, 0.85, 0.1];
    groups.forEach((g, i) => {
      const x = bx + 80 + i * (pw / 5.5);
      const h = values[i] * ph;
      ctx.fillStyle = rgba(i < 4 ? VINHO : PRATA, i < 4 ? 0.15 + values[i] * 0.15 : 0.06);
      ctx.fillRect(x - 25, by - h, 50, h);
      ctx.strokeStyle = rgba(i < 4 ? VINHO : PRATA, 0.25);
      ctx.lineWidth = 1; ctx.strokeRect(x - 25, by - h, 50, h);
      drawText(ctx, g, x, by + 25, 10, PRATA, 0.25);
      drawText(ctx, (values[i] * 100).toFixed(0) + '%', x, by - h - 12, 10, VINHO, 0.35);
    });
    // Scatter overlay
    for (let i = 0; i < 30; i++) {
      const x = bx + 50 + rng() * (pw - 100);
      const y = by - rng() * ph * 0.8;
      drawNode(ctx, x, y, 2, PRATA, 0.08);
    }
    drawText(ctx, 'LEAN BODY MASS (Δ%)', bx - 50, by - ph * 0.5, 10, PRATA, 0.15);
    drawText(ctx, 'PHASE II · n=120', W * 0.75, 80, 12, VINHO, 0.3);
    drawText(ctx, 'p < 0.001', W * 0.75, 100, 10, PRATA, 0.2);
    drawLabel(ctx, 'SARMs · LITERATURA CLÍNICA');
  },

  'nootropicos-mecanismos-cognicao': (ctx, rng) => {
    // Three parallel signal cascades
    const paths = [
      { name: 'COLINÉRGICA', x: W * 0.22, nodes: ['ACh', 'mAChR', 'nAChR', 'Ca²⁺', 'Memória'] },
      { name: 'GLUTAMATÉRGICA', x: W * 0.5, nodes: ['Glu', 'NMDA', 'AMPA', 'LTP', 'Cognição'] },
      { name: 'NEUROTRÓFICA', x: W * 0.78, nodes: ['BDNF', 'TrkB', 'PI3K', 'CREB', 'Plasticidade'] },
    ];
    paths.forEach(({ name, x, nodes }) => {
      drawText(ctx, name, x, 80, 12, VINHO, 0.4);
      nodes.forEach((n, i) => {
        const y = 130 + i * 110;
        ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
        drawGlow(ctx, x, y, 30, 30, 0.04);
        drawText(ctx, n, x, y + 4, 9, PRATA, 0.3);
        if (i < nodes.length - 1) {
          drawLine(ctx, x, y + 25, x, y + 85, VINHO, 0.12, 1);
          drawNode(ctx, x, y + 55, 2, VINHO, 0.2);
        }
      });
    });
    // Convergence arrows at bottom
    drawDashedLine(ctx, W * 0.22, H * 0.82, W * 0.5, H * 0.92, PRATA, 0.08);
    drawDashedLine(ctx, W * 0.78, H * 0.82, W * 0.5, H * 0.92, PRATA, 0.08);
    drawGlow(ctx, W * 0.5, H * 0.92, 50, 20, 0.06);
    drawLabel(ctx, 'NOOTRÓPICOS · MECANISMOS');
  },

  'bdnf-plasticidade-sinaptica': (ctx, rng) => {
    // Two neurons with synaptic cleft
    const preX = W * 0.3, postX = W * 0.7, cy = H * 0.45;
    // Presynaptic neuron body
    ctx.beginPath(); ctx.arc(preX - 80, cy, 50, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 2; ctx.stroke();
    drawGlow(ctx, preX - 80, cy, 60, 60, 0.05);
    drawText(ctx, 'PRÉ', preX - 80, cy + 4, 10, PRATA, 0.25);
    // Axon terminal (bouton)
    ctx.beginPath(); ctx.ellipse(preX + 60, cy, 40, 50, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.25); ctx.lineWidth = 1.5; ctx.stroke();
    drawLine(ctx, preX - 30, cy, preX + 20, cy, VINHO, 0.15, 2);
    // Vesicles
    for (let i = 0; i < 5; i++) {
      const vx = preX + 40 + rng() * 30, vy = cy - 25 + rng() * 50;
      drawNode(ctx, vx, vy, 5, VINHO, 0.2);
    }
    // Synaptic cleft
    ctx.fillStyle = rgba(PRATA, 0.02);
    ctx.fillRect(preX + 100, cy - 80, 80, 160);
    drawText(ctx, 'FENDA', preX + 140, cy - 60, 8, PRATA, 0.15);
    // BDNF molecules crossing
    for (let i = 0; i < 4; i++) {
      const bx = preX + 110 + rng() * 60, by = cy - 30 + rng() * 60;
      drawNode(ctx, bx, by, 6, VINHO, 0.3);
      drawText(ctx, 'BDNF', bx, by - 10, 7, VINHO, 0.25);
    }
    // Postsynaptic neuron
    ctx.beginPath(); ctx.arc(postX + 80, cy, 50, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 2; ctx.stroke();
    drawText(ctx, 'PÓS', postX + 80, cy + 4, 10, PRATA, 0.25);
    // Dendritic spines
    ctx.beginPath(); ctx.ellipse(postX - 40, cy, 35, 55, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
    drawLine(ctx, postX + 30, cy, postX - 5, cy, VINHO, 0.15, 2);
    // Spines growing
    for (let i = 0; i < 6; i++) {
      const sx = postX - 55 + i * 8, sy = cy - 40 + rng() * 80;
      drawLine(ctx, sx, sy, sx - 10 - rng() * 10, sy + (rng() - 0.5) * 15, VINHO, 0.15, 1);
      drawNode(ctx, sx - 15, sy, 3, VINHO, 0.2);
    }
    // TrkB receptors on post
    drawText(ctx, 'TrkB', postX - 40, cy + 65, 9, VINHO, 0.3);
    drawLabel(ctx, 'NEUROCIÊNCIA · BDNF');
  },

  'nootropicos-peptidicos-vs-sinteticos': (ctx, rng) => {
    // Peptide vs small molecule with BBB
    drawLine(ctx, W * 0.5, 60, W * 0.5, H - 60, PRATA, 0.06, 1);
    drawText(ctx, 'PEPTÍDICO', W * 0.25, 80, 14, VINHO, 0.4);
    drawText(ctx, 'SINTÉTICO', W * 0.75, 80, 14, VINHO, 0.4);
    // Peptide chain (left)
    const py = H * 0.4;
    for (let i = 0; i < 7; i++) {
      const x = 100 + i * 80, y = py + Math.sin(i * 0.8) * 20;
      drawNode(ctx, x, y, 10, VINHO, 0.15);
      if (i > 0) drawLine(ctx, x - 70, py + Math.sin((i - 1) * 0.8) * 20, x - 10, y, VINHO, 0.12, 1.5);
      drawText(ctx, ['Ala', 'Ser', 'Met', 'Glu', 'His', 'Phe', 'Pro'][i], x, y - 16, 7, PRATA, 0.2);
    }
    drawText(ctx, 'Semax · Selank', W * 0.25, py + 60, 11, PRATA, 0.2);
    drawText(ctx, 'MW > 500 Da', W * 0.25, py + 80, 10, PRATA, 0.15);
    // Small molecule (right)
    const mx = W * 0.75, my = H * 0.4;
    drawHexagon(ctx, mx, my, 35, VINHO, 0.3);
    drawHexagon(ctx, mx + 50, my + 20, 25, VINHO, 0.2);
    drawNode(ctx, mx - 20, my - 30, 5, PRATA, 0.15);
    drawNode(ctx, mx + 30, my + 45, 5, PRATA, 0.15);
    drawText(ctx, 'Racetam family', mx, my + 75, 11, PRATA, 0.2);
    drawText(ctx, 'MW < 300 Da', mx, my + 95, 10, PRATA, 0.15);
    // BBB barrier at bottom
    const bbY = H * 0.72;
    ctx.fillStyle = rgba(PRATA, 0.04);
    ctx.fillRect(80, bbY - 5, W - 160, 10);
    drawText(ctx, 'BARREIRA HEMATOENCEFÁLICA (BBB)', W * 0.5, bbY - 15, 11, PRATA, 0.2);
    // Arrows showing permeability
    drawDashedLine(ctx, W * 0.25, bbY - 30, W * 0.25, bbY + 40, PRATA, 0.08);
    drawText(ctx, 'INTRANASAL', W * 0.25, bbY + 55, 9, VINHO, 0.25);
    drawLine(ctx, W * 0.75, bbY - 30, W * 0.75, bbY + 40, VINHO, 0.2, 2);
    drawText(ctx, 'ORAL ✓', W * 0.75, bbY + 55, 9, VINHO, 0.3);
    drawLabel(ctx, 'NOOTRÓPICOS · COMPARATIVO');
  },

  'telomeros-envelhecimento': (ctx, rng) => {
    // Chromosome with telomere shortening + clock
    const cx = W * 0.35, cy = H * 0.45;
    // X-shaped chromosome
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy - 150); ctx.quadraticCurveTo(cx - 10, cy - 30, cx - 60, cy + 150);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 8; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 60, cy - 150); ctx.quadraticCurveTo(cx + 10, cy - 30, cx + 60, cy + 150);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 8; ctx.stroke();
    // Centromere
    drawGlow(ctx, cx, cy - 20, 20, 15, 0.1);
    // Telomere caps (highlighted, shortening)
    [[-60, -150], [60, -150], [-60, 150], [60, 150]].forEach(([ox, oy], i) => {
      const len = i < 2 ? 30 : 15; // shorter at bottom = aging
      const cap = rgba(VINHO, i < 2 ? 0.4 : 0.15);
      ctx.beginPath(); ctx.arc(cx + ox, cy + oy, len / 2 + 5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(VINHO, i < 2 ? 0.12 : 0.04); ctx.fill();
      ctx.strokeStyle = cap; ctx.lineWidth = 1.5; ctx.stroke();
    });
    drawText(ctx, 'JOVEM', cx - 60, cy - 175, 9, VINHO, 0.35);
    drawText(ctx, 'AGING', cx - 60, cy + 175, 9, PRATA, 0.15);
    // Clock motif
    const clockX = W * 0.72, clockY = H * 0.45;
    ctx.beginPath(); ctx.arc(clockX, clockY, 100, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(PRATA, 0.1); ctx.lineWidth = 2; ctx.stroke();
    // Clock marks
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 / 12) * i - Math.PI / 2;
      const inner = 85, outer = 95;
      drawLine(ctx, clockX + Math.cos(a) * inner, clockY + Math.sin(a) * inner,
        clockX + Math.cos(a) * outer, clockY + Math.sin(a) * outer, PRATA, 0.15, 1);
    }
    // Clock hands
    drawLine(ctx, clockX, clockY, clockX + 50, clockY - 30, VINHO, 0.3, 2);
    drawLine(ctx, clockX, clockY, clockX - 20, clockY + 60, PRATA, 0.15, 1.5);
    drawNode(ctx, clockX, clockY, 4, VINHO, 0.4);
    drawText(ctx, 'BIOLOGICAL AGE', clockX, clockY + 130, 11, PRATA, 0.2);
    drawLabel(ctx, 'LONGEVIDADE · TELÔMEROS');
  },

  'senescencia-celular-senolytics': (ctx, rng) => {
    // Normal cell vs senescent cell
    const nx = W * 0.28, ny = H * 0.45;
    // Normal cell
    ctx.beginPath(); ctx.arc(nx, ny, 60, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(nx, ny, 18, 0, Math.PI * 2);
    ctx.fillStyle = rgba(VINHO, 0.1); ctx.fill();
    drawText(ctx, 'NORMAL', nx, ny + 85, 11, PRATA, 0.25);
    // Senescent cell (larger, irregular)
    const sx = W * 0.55, sy = H * 0.45;
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 2; a += 0.1) {
      const r = 90 + Math.sin(a * 5) * 15 + Math.cos(a * 3) * 10;
      const x = sx + Math.cos(a) * r, y = sy + Math.sin(a) * r;
      a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = rgba(VINHO, 0.05); ctx.fill();
    ctx.strokeStyle = rgba(VINHO, 0.2); ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 25, 0, Math.PI * 2);
    ctx.fillStyle = rgba(VINHO, 0.08); ctx.fill();
    drawText(ctx, 'SENESCENTE', sx, sy + 120, 11, VINHO, 0.3);
    // SASP factors
    for (let i = 0; i < 8; i++) {
      const a = rng() * Math.PI * 2;
      const d = 100 + rng() * 40;
      const px = sx + Math.cos(a) * d, py = sy + Math.sin(a) * d;
      drawNode(ctx, px, py, 3, VINHO, 0.2);
      drawDashedLine(ctx, sx + Math.cos(a) * 90, sy + Math.sin(a) * 90, px, py, VINHO, 0.08);
    }
    drawText(ctx, 'SASP', sx + 110, sy - 80, 9, VINHO, 0.25);
    drawText(ctx, 'p16/p21', sx, sy + 4, 9, PRATA, 0.25);
    // Senolytic agent
    const ax = W * 0.82, ay = H * 0.45;
    drawHexagon(ctx, ax, ay, 30, VINHO, 0.35);
    drawGlow(ctx, ax, ay, 40, 40, 0.08);
    drawText(ctx, 'D+Q', ax, ay + 4, 11, PRATA, 0.35);
    drawDashedLine(ctx, ax - 30, ay, sx + 100, sy, VINHO, 0.15);
    drawText(ctx, 'SENOLÍTICO', ax, ay - 45, 10, VINHO, 0.35);
    drawLabel(ctx, 'LONGEVIDADE · SENESCÊNCIA');
  },

  'mitocondrias-aging': (ctx, rng) => {
    // Healthy vs damaged mitochondria
    // Healthy
    const hx = W * 0.28, hy = H * 0.4;
    ctx.beginPath(); ctx.ellipse(hx, hy, 110, 65, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.25); ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(hx, hy, 90, 50, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(VINHO, 0.12); ctx.lineWidth = 1; ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const cx2 = hx - 60 + i * 30;
      ctx.beginPath(); ctx.moveTo(cx2, hy - 35);
      ctx.quadraticCurveTo(cx2 + 10, hy, cx2, hy + 35);
      ctx.strokeStyle = rgba(VINHO, 0.1); ctx.lineWidth = 0.8; ctx.stroke();
    }
    drawGlow(ctx, hx, hy, 80, 50, 0.05);
    drawText(ctx, 'SAUDÁVEL', hx, hy + 90, 11, VINHO, 0.3);
    // ATP particles
    for (let i = 0; i < 5; i++) {
      const a = rng() * Math.PI * 2, d = 80 + rng() * 40;
      drawNode(ctx, hx + Math.cos(a) * d, hy + Math.sin(a) * d * 0.6, 4, VINHO, 0.2);
    }
    drawText(ctx, 'ATP ↑', hx, hy + 4, 12, PRATA, 0.25);
    // Damaged
    const dx = W * 0.72, dy = H * 0.4;
    ctx.beginPath(); ctx.ellipse(dx, dy, 110, 65, 0.1, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(PRATA, 0.1); ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]);
    // Broken cristae
    for (let i = 0; i < 5; i++) {
      const cx2 = dx - 60 + i * 30;
      ctx.beginPath(); ctx.moveTo(cx2, dy - 30);
      ctx.lineTo(cx2 + rng() * 15, dy + rng() * 20 - 10);
      ctx.strokeStyle = rgba(PRATA, 0.06); ctx.lineWidth = 0.8; ctx.stroke();
    }
    drawText(ctx, 'DANIFICADA', dx, dy + 90, 11, PRATA, 0.15);
    drawText(ctx, 'ATP ↓', dx, dy + 4, 12, PRATA, 0.15);
    // ROS particles
    for (let i = 0; i < 10; i++) {
      const rx = dx - 80 + rng() * 160, ry = dy - 50 + rng() * 100;
      drawNode(ctx, rx, ry, 2 + rng() * 2, PRATA, 0.08);
    }
    drawText(ctx, 'ROS ↑', dx + 80, dy - 50, 10, PRATA, 0.15);
    // Arrow and biogenesis
    drawText(ctx, '→ PGC-1α', W * 0.5, H * 0.78, 12, VINHO, 0.25);
    drawText(ctx, 'BIOGÊNESE', W * 0.5, H * 0.83, 10, PRATA, 0.15);
    drawDashedLine(ctx, dx - 110, dy + 100, hx + 110, hy + 100, VINHO, 0.08);
    drawLabel(ctx, 'LONGEVIDADE · MITOCONDRIAL');
  },
};

// ──── GENERATE ALL ────
console.log('Generating 21 article images...');
Object.entries(generators).forEach(([slug, gen]) => {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const rng = drawBase(ctx, slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0));
  gen(ctx, rng);
  const filePath = path.join(OUT, `${slug}.png`);
  fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
  console.log(`  ✓ ${slug}.png`);
});
console.log('Done! All images saved to', OUT);
