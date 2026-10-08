// ── PIXEL PARTICLE CANVAS ──
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['#39ff14', '#bf00ff', '#7fff00', '#9400d3'];
const PIXEL_SIZE = 6;

const pixels = Array.from({ length: 60 }, () => ({
  x: Math.random() * 1200,
  y: Math.random() * 800,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6,
  size: PIXEL_SIZE * (Math.floor(Math.random() * 3) + 1),
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  alpha: Math.random() * 0.4 + 0.1,
  pulse: Math.random() * Math.PI * 2,
  pulseSpeed: (Math.random() * 0.02) + 0.005,
}));

const mouse = { x: null, y: null };
canvas.addEventListener('mousemove', e => {
  const r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
});
canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

function draw() {
  ctx.clearRect(0, 0, W, H);
  pixels.forEach(p => {
    p.pulse += p.pulseSpeed;
    const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

    if (mouse.x !== null) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        const f = (120 - d) / 120;
        p.vx += (dx / d) * f * 0.5;
        p.vy += (dy / d) * f * 0.5;
      }
    }

    p.vx *= 0.97; p.vy *= 0.97;
    p.x += p.vx; p.y += p.vy;
    if (p.x < -p.size) p.x = W + p.size;
    if (p.x > W + p.size) p.x = -p.size;
    if (p.y < -p.size) p.y = H + p.size;
    if (p.y > H + p.size) p.y = -p.size;

    const sx = Math.round(p.x / PIXEL_SIZE) * PIXEL_SIZE;
    const sy = Math.round(p.y / PIXEL_SIZE) * PIXEL_SIZE;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.fillRect(sx, sy, p.size, p.size);
    ctx.globalAlpha = a * 0.3;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 12;
    ctx.fillRect(sx, sy, p.size, p.size);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(draw);
}
draw();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));
