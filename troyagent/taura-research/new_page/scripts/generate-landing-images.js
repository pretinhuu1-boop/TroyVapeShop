const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'images', 'landing');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Seeded random
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

// Colors
const VINHO = '#8b2035';
const VINHO2 = '#6B0F1A';
const PRATA = '#C4C4C4';
const BLACK = '#0A0A0A';
const MID = '#111111';

function drawGrid(ctx, w, h, rng, opacity = 0.03) {
  ctx.strokeStyle = VINHO;
  ctx.globalAlpha = opacity;
  ctx.lineWidth = 0.5;
  const spacing = 80;
  for (let x = 0; x < w; x += spacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += spacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawParticles(ctx, w, h, rng, count = 60, color = VINHO) {
  for (let i = 0; i < count; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const r = rng() * 2.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = rng() * 0.15 + 0.03;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawConnections(ctx, points, maxDist = 150) {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = VINHO;
        ctx.globalAlpha = (1 - d / maxDist) * 0.12;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

// ===== IMAGE GENERATORS =====

const images = [
  {
    name: 'hero-molecules',
    width: 1920,
    height: 1080,
    generate: (ctx, w, h) => {
      const rng = seededRandom(42);
      // Dark gradient background
      const grad = ctx.createRadialGradient(w * 0.6, h * 0.3, 0, w * 0.5, h * 0.5, w * 0.8);
      grad.addColorStop(0, '#1a0508');
      grad.addColorStop(0.5, '#0d0d0d');
      grad.addColorStop(1, BLACK);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid(ctx, w, h, rng, 0.02);

      // Molecular network
      const nodes = [];
      for (let i = 0; i < 35; i++) {
        nodes.push({ x: rng() * w, y: rng() * h, r: rng() * 6 + 2 });
      }

      drawConnections(ctx, nodes, 200);

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = VINHO;
        ctx.globalAlpha = rng() * 0.3 + 0.1;
        ctx.fill();
        // Glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        glow.addColorStop(0, 'rgba(139,32,53,0.15)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(n.x - n.r * 4, n.y - n.r * 4, n.r * 8, n.r * 8);
      });
      ctx.globalAlpha = 1;

      // Hexagonal structures
      for (let i = 0; i < 5; i++) {
        const cx = w * 0.2 + rng() * w * 0.6;
        const cy = h * 0.2 + rng() * h * 0.6;
        const size = 30 + rng() * 50;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j - Math.PI / 6;
          const px = cx + Math.cos(angle) * size;
          const py = cy + Math.sin(angle) * size;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = VINHO;
        ctx.globalAlpha = 0.08 + rng() * 0.08;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      drawParticles(ctx, w, h, rng, 100, VINHO);
    }
  },
  {
    name: 'social-proof-bg',
    width: 1920,
    height: 800,
    generate: (ctx, w, h) => {
      const rng = seededRandom(101);
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, BLACK);
      grad.addColorStop(0.5, '#0d0508');
      grad.addColorStop(1, BLACK);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid(ctx, w, h, rng, 0.015);

      // DNA helix pattern across width
      ctx.lineWidth = 1.2;
      for (let x = 0; x < w; x += 3) {
        const y1 = h * 0.4 + Math.sin(x * 0.015) * 80;
        const y2 = h * 0.4 + Math.sin(x * 0.015 + Math.PI) * 80;

        ctx.beginPath();
        ctx.arc(x, y1, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = VINHO;
        ctx.globalAlpha = 0.08;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y2, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = PRATA;
        ctx.globalAlpha = 0.04;
        ctx.fill();
      }

      // Rungs
      for (let x = 0; x < w; x += 30) {
        const y1 = h * 0.4 + Math.sin(x * 0.015) * 80;
        const y2 = h * 0.4 + Math.sin(x * 0.015 + Math.PI) * 80;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = PRATA;
        ctx.globalAlpha = 0.03;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      drawParticles(ctx, w, h, rng, 40, VINHO);
    }
  },
  {
    name: 'pillars-pureza',
    width: 800,
    height: 600,
    generate: (ctx, w, h) => {
      const rng = seededRandom(201);
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.7);
      grad.addColorStop(0, '#120408');
      grad.addColorStop(1, BLACK);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid(ctx, w, h, rng, 0.02);

      // HPLC chromatogram
      ctx.beginPath();
      ctx.moveTo(80, h * 0.75);
      for (let x = 80; x < w - 80; x++) {
        const t = (x - 80) / (w - 160);
        let y = h * 0.75;
        // Main peak at 60%
        const peak1 = Math.exp(-Math.pow((t - 0.6) / 0.04, 2)) * h * 0.5;
        // Small impurity peaks
        const peak2 = Math.exp(-Math.pow((t - 0.35) / 0.03, 2)) * h * 0.06;
        const peak3 = Math.exp(-Math.pow((t - 0.8) / 0.025, 2)) * h * 0.04;
        y -= peak1 + peak2 + peak3;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = VINHO;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Fill under main peak
      ctx.beginPath();
      ctx.moveTo(80 + (w - 160) * 0.5, h * 0.75);
      for (let x = 80 + (w - 160) * 0.5; x < 80 + (w - 160) * 0.72; x++) {
        const t = (x - 80) / (w - 160);
        const peak1 = Math.exp(-Math.pow((t - 0.6) / 0.04, 2)) * h * 0.5;
        ctx.lineTo(x, h * 0.75 - peak1);
      }
      ctx.lineTo(80 + (w - 160) * 0.72, h * 0.75);
      ctx.closePath();
      ctx.fillStyle = VINHO;
      ctx.globalAlpha = 0.06;
      ctx.fill();

      // "98.7%" label
      ctx.font = 'bold 28px monospace';
      ctx.fillStyle = PRATA;
      ctx.globalAlpha = 0.15;
      ctx.textAlign = 'center';
      ctx.fillText('≥98%', w * 0.6, h * 0.35);

      // Axis
      ctx.beginPath();
      ctx.moveTo(80, h * 0.75);
      ctx.lineTo(w - 80, h * 0.75);
      ctx.strokeStyle = PRATA;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.globalAlpha = 1;
      drawParticles(ctx, w, h, rng, 25, VINHO);
    }
  },
  {
    name: 'pillars-dados',
    width: 800,
    height: 600,
    generate: (ctx, w, h) => {
      const rng = seededRandom(202);
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.7);
      grad.addColorStop(0, '#0d0810');
      grad.addColorStop(1, BLACK);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid(ctx, w, h, rng, 0.02);

      // Publication/paper stack visualization
      for (let i = 0; i < 8; i++) {
        const y = h * 0.2 + i * 45;
        const xOffset = (i % 2) * 20;
        ctx.fillStyle = MID;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(w * 0.15 + xOffset, y, w * 0.5, 35);
        ctx.strokeStyle = VINHO;
        ctx.globalAlpha = 0.1;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(w * 0.15 + xOffset, y, w * 0.5, 35);

        // Text lines
        ctx.fillStyle = PRATA;
        ctx.globalAlpha = 0.06;
        const lineW = (rng() * 0.3 + 0.3) * w * 0.4;
        ctx.fillRect(w * 0.18 + xOffset, y + 10, lineW, 3);
        ctx.fillRect(w * 0.18 + xOffset, y + 20, lineW * 0.6, 2);
      }

      // DOI/reference links
      ctx.font = '10px monospace';
      ctx.fillStyle = VINHO;
      ctx.globalAlpha = 0.15;
      ctx.textAlign = 'left';
      const refs = ['DOI: 10.1056/NEJMoa2301972', 'DOI: 10.1016/j.cmet.2022.07.013', 'DOI: 10.1038/s41467-020-20790-0', 'PMID: 15792140'];
      refs.forEach((ref, i) => {
        ctx.fillText(ref, w * 0.6, h * 0.3 + i * 22);
      });

      // Network nodes (knowledge graph)
      const nodes = [];
      for (let i = 0; i < 12; i++) {
        nodes.push({ x: w * 0.55 + rng() * w * 0.35, y: h * 0.5 + rng() * h * 0.4 });
      }
      drawConnections(ctx, nodes, 120);
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = VINHO;
        ctx.globalAlpha = 0.2;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      drawParticles(ctx, w, h, rng, 20, VINHO);
    }
  },
  {
    name: 'pillars-acesso',
    width: 800,
    height: 600,
    generate: (ctx, w, h) => {
      const rng = seededRandom(203);
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.7);
      grad.addColorStop(0, '#0d0d08');
      grad.addColorStop(1, BLACK);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid(ctx, w, h, rng, 0.02);

      // Shield/lock shape
      const cx = w * 0.5;
      const cy = h * 0.4;
      const shieldW = 120;
      const shieldH = 150;
      ctx.beginPath();
      ctx.moveTo(cx, cy - shieldH * 0.5);
      ctx.quadraticCurveTo(cx + shieldW * 0.6, cy - shieldH * 0.35, cx + shieldW * 0.5, cy + shieldH * 0.1);
      ctx.quadraticCurveTo(cx + shieldW * 0.35, cy + shieldH * 0.45, cx, cy + shieldH * 0.5);
      ctx.quadraticCurveTo(cx - shieldW * 0.35, cy + shieldH * 0.45, cx - shieldW * 0.5, cy + shieldH * 0.1);
      ctx.quadraticCurveTo(cx - shieldW * 0.6, cy - shieldH * 0.35, cx, cy - shieldH * 0.5);
      ctx.closePath();
      ctx.strokeStyle = VINHO;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = VINHO;
      ctx.globalAlpha = 0.03;
      ctx.fill();

      // Inner shield glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      glow.addColorStop(0, 'rgba(139,32,53,0.08)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.globalAlpha = 1;
      ctx.fillRect(cx - 100, cy - 100, 200, 200);

      // Encrypted data streams
      ctx.font = '9px monospace';
      ctx.fillStyle = VINHO;
      for (let i = 0; i < 15; i++) {
        const x = rng() * w;
        const startY = rng() * h;
        ctx.globalAlpha = 0.06 + rng() * 0.06;
        for (let j = 0; j < 8; j++) {
          const char = String.fromCharCode(48 + Math.floor(rng() * 74));
          ctx.fillText(char, x, startY + j * 14);
        }
      }

      // Concentric rings
      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * 55, 0, Math.PI * 2);
        ctx.strokeStyle = VINHO;
        ctx.globalAlpha = 0.04;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      drawParticles(ctx, w, h, rng, 25, VINHO);
    }
  },
  {
    name: 'final-cta-bg',
    width: 1920,
    height: 800,
    generate: (ctx, w, h) => {
      const rng = seededRandom(301);
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.6);
      grad.addColorStop(0, '#1a0508');
      grad.addColorStop(0.4, '#0d0508');
      grad.addColorStop(1, BLACK);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      drawGrid(ctx, w, h, rng, 0.015);

      // Large molecular ring structure
      const cx = w * 0.5;
      const cy = h * 0.5;

      // Multiple concentric hexagons
      for (let ring = 0; ring < 6; ring++) {
        const size = 80 + ring * 60;
        const rotation = ring * 0.1;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j + rotation;
          const px = cx + Math.cos(angle) * size;
          const py = cy + Math.sin(angle) * size;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = VINHO;
        ctx.globalAlpha = 0.06 - ring * 0.008;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
      centerGlow.addColorStop(0, 'rgba(139,32,53,0.12)');
      centerGlow.addColorStop(0.5, 'rgba(139,32,53,0.04)');
      centerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGlow;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, w, h);

      // Orbital dots
      for (let i = 0; i < 20; i++) {
        const angle = rng() * Math.PI * 2;
        const dist = 100 + rng() * 280;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, rng() * 3 + 1, 0, Math.PI * 2);
        ctx.fillStyle = VINHO;
        ctx.globalAlpha = rng() * 0.2 + 0.05;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      drawParticles(ctx, w, h, rng, 60, VINHO);
    }
  }
];

console.log(`Generating ${images.length} landing page images...`);

images.forEach(img => {
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  img.generate(ctx, img.width, img.height);

  const outPath = path.join(OUT, `${img.name}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`  ✓ ${img.name}.png (${img.width}x${img.height})`);
});

console.log(`\nDone! All images saved to ${OUT}`);
