// ===== «Болото» library: taiga bog world (sky, far taiga, bog plain with hummocks/pools/pines),
// the "окно" patch, the floating-mat cross-section, a hiker (side rig wrapper), a top-down figure and the bog man =====
const HZ = 1000; // horizon line in world y
const HIKER = { top: '#5b6640', pants: '#454a36', skin: '#dcae8e', hair: '#3a2a1c', shoe: '#1c201c', boots: '#22261f', pack: '#6e5a3c', cap: true, capCol: '#4a5236' };
const persp = y => Math.max(.02, (y - HZ) / 700); // scale of an object standing at world y

function bogSky(t, o = {}) { const ev = o.eve || 0;
  ctx.fillStyle = grad(0, -1800, 0, HZ + 10, ev ? [[0, '#3e4a62'], [.55, '#a98a74'], [.85, '#e9b783'], [1, '#f6d6a2']] : [[0, '#7d8c96'], [.55, '#b7c1c0'], [.9, '#dde2da'], [1, '#e6e8de']]); ctx.fillRect(-3000, -2400, 7000, HZ + 2420);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(o.sunX ?? 760, HZ - (ev ? 120 : 420), ev ? 1100 : 900, ev ? 'rgba(255,190,120,.5)' : 'rgba(255,250,230,.28)'); ctx.restore();
  const R = rnd(31); for (let i = 0; i < 12; i++) { const x = -1600 + R() * 4400 + t * (8 + R() * 6), y = -900 + R() * 1500, w = 500 + R() * 900; ctx.fillStyle = ev ? `rgba(255,214,180,${.05 + R() * .08})` : `rgba(255,255,255,${.06 + R() * .09})`; ctx.beginPath(); ctx.ellipse(x, y, w, w * (.1 + R() * .08), 0, 0, 7); ctx.fill(); } }

function spruceSil(x, y, h, col) { const n = 10; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y - h);
  for (let k = 1; k <= n; k++) { const f = k / n, yy = y - h + h * f * .9, w = h * (.025 + .12 * f); ctx.lineTo(x + w, yy); if (k < n) ctx.lineTo(x + w * .3, yy - h * .012); }
  ctx.lineTo(x + h * .015, y); ctx.lineTo(x - h * .015, y);
  for (let k = n; k >= 1; k--) { const f = k / n, yy = y - h + h * f * .9, w = h * (.025 + .12 * f); if (k < n) ctx.lineTo(x - w * .3, yy - h * .012); ctx.lineTo(x - w, yy); }
  ctx.closePath(); ctx.fill(); }

function farTaiga(t, o = {}) { const ev = o.eve; const rows = [[HZ - 6, 110, ev ? '#8c8478' : '#a6b0aa', 77], [HZ + 6, 160, ev ? '#6c665c' : '#8a978e', 78], [HZ + 22, 220, ev ? '#4a4840' : '#69786a', 79]];
  for (const [y, hh, col, sd] of rows) { const R = rnd(sd); for (let x = -1700; x < 2900; x += 16 + R() * 26) spruceSil(x, y + R() * 10, hh * (.5 + R() * .7), col); ctx.fillStyle = col; ctx.fillRect(-1700, y - 2, 4600, 40);
    ctx.fillStyle = grad(0, y - hh * 1.3, 0, y + 30, [[0, 'rgba(230,232,226,0)'], [1, ev ? 'rgba(246,212,170,.42)' : 'rgba(228,232,226,.5)']]); ctx.fillRect(-1700, y - hh * 1.3, 4600, hh * 1.3 + 40); } }

function pool(x, y, w, h, ev) { ctx.fillStyle = 'rgba(60,54,26,.6)'; ctx.beginPath(); ctx.ellipse(x, y, w * 1.08, h * 1.25, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(0, y - h, 0, y + h, ev ? [[0, '#c8a888'], [.35, '#5a5650'], [1, '#1e2224']] : [[0, '#b6c0c0'], [.35, '#4a5658'], [1, '#1a2124']]); ctx.beginPath(); ctx.ellipse(x, y, w, h, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = Math.max(1, h * .08); ctx.beginPath(); ctx.ellipse(x - w * .1, y - h * .2, w * .6, h * .35, 0, Math.PI * 1.1, Math.PI * 1.7); ctx.stroke(); }

function hummock(x, y, s, R, t) { const w = 120 * s, h = 52 * s;
  ctx.fillStyle = 'rgba(24,26,10,.35)'; ctx.beginPath(); ctx.ellipse(x + 8 * s, y + 3 * s, w * 1.12, h * .32, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(x, y - h, x, y, [[0, '#a6a454'], [.55, '#7c7f36'], [1, '#4a4e20']]); ctx.beginPath(); ctx.moveTo(x - w, y); ctx.bezierCurveTo(x - w * .95, y - h * 1.15, x + w * .95, y - h * 1.15, x + w, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(150,72,40,.28)'; ctx.beginPath(); ctx.ellipse(x - w * .3, y - h * .35, w * .35, h * .25, 0, 0, 7); ctx.fill();
  ctx.lineCap = 'round'; const n = s > .5 ? 26 : 14;
  for (let i = 0; i < n; i++) { const bx = x + (R() - .5) * w * 1.5, edge = 1 - Math.min(1, Math.abs(bx - x) / w), by = y - h * .9 * edge, L = (55 + R() * 95) * s * (.5 + edge * .7), a = (R() - .5) * 1.3 + Math.sin(t * 1.2 + bx * .013) * .06;
    const c = R(); ctx.strokeStyle = c > .62 ? '#c4b46c' : c > .3 ? '#93993f' : '#6f7a2e'; ctx.lineWidth = (1.6 + R() * 2.2) * s; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.sin(a) * L * .4, by - L * .65, bx + Math.sin(a) * L, by - Math.cos(a) * L * .8); ctx.stroke(); }
  if (R() > .55) for (let i = 0; i < 4; i++) { const cx = x + (R() - .5) * w * 1.1, cy = y - h - (40 + R() * 70) * s; ctx.strokeStyle = '#7d7a42'; ctx.lineWidth = 1.4 * s; ctx.beginPath(); ctx.moveTo(cx, y - h * .5); ctx.quadraticCurveTo(cx + 4 * s, (cy + y) / 2, cx, cy); ctx.stroke(); ctx.fillStyle = '#f5f3ec'; ctx.beginPath(); ctx.arc(cx, cy, 8 * s, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.arc(cx + 3 * s, cy - 3 * s, 5 * s, 0, 7); ctx.fill(); } // cotton grass
  if (R() > .6) for (let i = 0; i < 6; i++) { const cx = x + (R() - .5) * w * 1.5, cy = y - R() * h * .5; ctx.fillStyle = '#a3141e'; ctx.beginPath(); ctx.arc(cx, cy, 4.2 * s, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(cx - 1.2 * s, cy - 1.4 * s, 1.3 * s, 0, 7); ctx.fill(); } } // cranberries

function bogPine(x, y, h, R) { ctx.lineCap = 'round'; let px = x, py = y; const pts = [[x, y]]; for (let i = 1; i <= 8; i++) { px += (R() - .5) * h * .05; py -= h / 8; pts.push([px, py]); }
  ctx.strokeStyle = '#3a2f24'; for (let i = 0; i < pts.length - 1; i++) { ctx.lineWidth = h * (.034 - i * .0035); ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); ctx.stroke(); }
  const fol = [];
  for (let i = 2; i < pts.length; i++) { const [bx, by] = pts[i]; for (const sd of [-1, 1]) { if (R() < .25) continue; const L = h * (.08 + R() * .12) * (1 - i / pts.length * .55); ctx.strokeStyle = '#3a2f24'; ctx.lineWidth = h * .009; const ex = bx + sd * L, ey = by - L * (.1 + R() * .3); ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + sd * L * .5, by + L * .05, ex, ey); ctx.stroke(); fol.push([ex - sd * L * .25, ey, L * (.5 + R() * .3), sd]); } }
  fol.push([px, py - h * .02, h * .07, 0]);
  for (const [fx, fy, r, sd] of fol) { for (let k = 0; k < 4; k++) { const ox = (R() - .5) * r * .9, oy = (R() - .6) * r * .35; ctx.fillStyle = k === 3 ? 'rgba(170,180,120,.22)' : (R() > .5 ? '#2a3b24' : '#34462a'); ctx.beginPath(); ctx.ellipse(fx + ox, fy + oy - (k === 3 ? r * .12 : 0), r * (.45 + R() * .25), r * (.17 + R() * .08), sd * .12, 0, 7); ctx.fill(); } } }

function deadBirch(x, y, h, R) { ctx.lineCap = 'round'; ctx.strokeStyle = '#d8d4c8'; ctx.lineWidth = h * .028; const top = [x + (R() - .5) * h * .08, y - h]; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (R() - .5) * h * .1, y - h * .5, top[0], top[1]); ctx.stroke();
  ctx.fillStyle = '#2a2622'; for (let i = 0; i < 9; i++) { const k = R() * .95, bx = lerp(x, top[0], k), by = lerp(y, top[1], k); ctx.fillRect(bx - h * .014, by, h * .02, h * .006); }
  ctx.strokeStyle = '#8a8478'; ctx.lineWidth = h * .008; for (let i = 0; i < 6; i++) { const k = .35 + R() * .6, bx = lerp(x, top[0], k), by = lerp(y, top[1], k), sd = R() > .5 ? 1 : -1; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + sd * h * (.05 + R() * .1), by - h * .06); ctx.stroke(); } }

// the bog plain, everything depth-sorted; o.items = [[y, fn], ...] are drawn at their depth (hero, props); o.clear = [x, dx, y, dy] keeps a zone free of hummocks
function bogPlain(t, o = {}) { const ev = o.eve, R = rnd(o.seed || 11);
  ctx.fillStyle = grad(0, HZ, 0, HZ + 1500, ev ? [[0, '#8a7a56'], [.12, '#78723e'], [.5, '#5e6228'], [1, '#3e4218']] : [[0, '#8e9468'], [.12, '#7a8240'], [.5, '#667030'], [1, '#48521e']]); ctx.fillRect(-3000, HZ + 18, 7000, 3500);
  for (let i = 0; i < 80; i++) { const z = R(), y = HZ + 30 + 1600 * z * z, s = persp(y), x = -1700 + R() * 4600; const c = R(); ctx.fillStyle = c > .6 ? `rgba(150,66,36,${.14 + R() * .14})` : c > .3 ? `rgba(176,170,82,${.14 + R() * .14})` : `rgba(40,52,20,${.12 + R() * .12})`; ctx.beginPath(); ctx.ellipse(x, y, (180 + R() * 420) * s, (26 + R() * 46) * s, 0, 0, 7); ctx.fill(); }
  for (let i = 0; i < 18; i++) { const z = R(), y = HZ + 45 + 1300 * z * z, s = persp(y), x = -1500 + R() * 4200; if (o.clear && Math.abs(x - o.clear[0]) < o.clear[1] && Math.abs(y - o.clear[2]) < o.clear[3]) continue; pool(x, y, (110 + R() * 260) * s, (12 + R() * 24) * s, ev); }
  if (o.under) o.under();
  const items = [];
  for (let i = 0; i < 46; i++) { const z = .02 + R() * .4, y = HZ + 25 + 1500 * z * z; items.push([y, 'pine', -1700 + R() * 4600, R()]); }
  for (let i = 0; i < 9; i++) { const z = .06 + R() * .45, y = HZ + 25 + 1500 * z * z; items.push([y, 'birch', -1700 + R() * 4600, R()]); }
  for (let i = 0; i < (o.hum ?? 120); i++) { const z = .06 + R() * .98, y = HZ + 30 + 1500 * z * z; items.push([y, 'hum', -1800 + R() * 4800, R()]); }
  if (o.items) items.push(...o.items);
  items.sort((a, b) => a[0] - b[0]);
  for (const it of items) { const y = it[0], k = it[1]; if (typeof k === 'function') { k(); continue; } const x = it[2], r = it[3], s = persp(y), RR = rnd(Math.floor(r * 1e6));
    if (o.clear && Math.abs(x - o.clear[0]) < o.clear[1] && Math.abs(y - o.clear[2]) < o.clear[3]) continue;
    if (k === 'pine') bogPine(x, y, 760 * s * (.55 + r * .9), RR); else if (k === 'birch') deadBirch(x, y, 640 * s * (.7 + r * .6), RR); else hummock(x, y, s * (.55 + r * .75), RR, t); } }

function mist(t, a = .5, ev) { ctx.save(); for (let i = 0; i < 6; i++) { const y = 820 + i * 150, x = ((t * (14 + i * 5) + i * 400) % 2400) - 600; ctx.fillStyle = rgrad(x, y, 0, 700, [[0, ev ? `rgba(255,224,190,${a * .35})` : `rgba(236,240,236,${a * .35})`], [1, 'rgba(236,240,236,0)']]); ctx.save(); ctx.translate(x, y); ctx.scale(1, .18); ctx.translate(-x, -y); ctx.beginPath(); ctx.arc(x, y, 700, 0, 7); ctx.fill(); ctx.restore(); } ctx.restore(); }

function bogWorld(t, keys, o = {}) { ctx.save(); camKeys(t, keys, o.drift ?? .6); bogSky(t, o); farTaiga(t, o); bogPlain(t, o); ctx.restore(); mist(t, o.mist ?? .5, o.eve); }

// the "окно": a smooth, bright, velvety lawn hiding open water
function bogWindow(x, y, w, s, t, o = {}) { const h = w * .22; ctx.fillStyle = 'rgba(40,46,16,.5)'; ctx.beginPath(); ctx.ellipse(x, y, w * 1.06, h * 1.2, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(0, y - h, 0, y + h, [[0, '#b6e05a'], [.5, '#8fcc3c'], [1, '#6aa82a']]); ctx.beginPath(); ctx.ellipse(x, y, w, h, 0, 0, 7); ctx.fill();
  const R = rnd(4); ctx.lineCap = 'round'; for (let i = 0; i < 160; i++) { const a = R() * 7, rr2 = Math.sqrt(R()), bx = x + Math.cos(a) * w * rr2 * .95, by = y + Math.sin(a) * h * rr2 * .9, L = (10 + R() * 16) * s; ctx.strokeStyle = R() > .5 ? 'rgba(210,240,140,.55)' : 'rgba(80,140,30,.5)'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.sin(t * 2 + bx) * 2 * s, by - L); ctx.stroke(); }
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgrad(x - w * .2, y - h * .3, 0, w * .7, [[0, 'rgba(255,255,200,.22)'], [1, 'rgba(255,255,200,0)']]); ctx.beginPath(); ctx.ellipse(x, y, w, h, 0, 0, 7); ctx.fill(); ctx.restore();
  if (o.ripple) { const q = o.ripple; ctx.strokeStyle = `rgba(30,50,40,${.5 * (1 - q)})`; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.ellipse(o.rx ?? x, o.ry ?? y, w * .2 * (.3 + q), h * .2 * (.3 + q), 0, 0, 7); ctx.stroke(); } }

// floating mat cross-section, world coords; surface at y = SY. o.gap = [x, w] (open water hole hidden by a grass film), o.hole = [x, w] (broken mat), o.legs(fn) draws legs inside the slurry
function bogSection(t, o = {}) { const SY = o.SY ?? 700, M = 70, X0 = -1200, X1 = 2300;
  ctx.save(); ctx.translate(0, SY - HZ - 40); bogSky(t, { sunX: 300 }); farTaiga(t); ctx.fillStyle = grad(0, HZ, 0, HZ + 60, [[0, '#8e9468'], [1, '#7a8240']]); ctx.fillRect(-3000, HZ + 18, 7000, 200); ctx.restore();
  // water + peat slurry
  ctx.fillStyle = grad(0, SY, 0, SY + 1700, [[0, '#2a3a36'], [.18, '#1f2a24'], [.45, '#2a2216'], [.75, '#1c150c'], [1, '#0e0a06']]); ctx.fillRect(X0, SY + 2, X1 - X0, 2400);
  const R = rnd(8); for (let i = 0; i < 160; i++) { const x = X0 + R() * (X1 - X0), y = SY + 120 + R() * 1500, r = 2 + R() * 6; ctx.fillStyle = `rgba(${90 + R() * 50},${70 + R() * 30},${40 + R() * 20},${.25 + R() * .3})`; ctx.beginPath(); ctx.ellipse(x + Math.sin(t * .4 + i) * 6, y, r * 2, r, R() * 3, 0, 7); ctx.fill(); } // drifting peat flakes
  for (let i = 0; i < 26; i++) { const x = X0 + R() * (X1 - X0), y0 = SY + 300 + R() * 1200, sp = 30 + R() * 50, y = y0 - ((t * sp + R() * 900) % 900); if (y < SY + 80) continue; ctx.strokeStyle = 'rgba(200,220,210,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + Math.sin(t * 3 + i) * 4, y, 3 + R() * 5, 0, 7); ctx.stroke(); } // gas bubbles
  if (o.legs) o.legs(SY);
  // the mat (moss on a felt of roots)
  const inGap = x => (o.gap && Math.abs(x - o.gap[0]) < o.gap[1]) || (o.hole && Math.abs(x - o.hole[0]) < o.hole[1]);
  const segs = []; let cur = null; for (let x = X0; x <= X1; x += 10) { const g = inGap(x); if (!g && !cur) cur = [x, x]; if (!g && cur) cur[1] = x; if (g && cur) { segs.push(cur); cur = null; } } if (cur) segs.push(cur);
  const bob = o.bob || 0;
  for (const [a, b] of segs) { const yy = x => SY + Math.sin(x * .01 + t * 1.3) * 2 + bob * Math.exp(-Math.pow((x - (o.bobX ?? 540)) / 160, 2));
    ctx.fillStyle = '#5a4428'; ctx.beginPath(); ctx.moveTo(a, yy(a)); for (let x = a; x <= b; x += 10) ctx.lineTo(x, yy(x)); for (let x = b; x >= a; x -= 10) ctx.lineTo(x, yy(x) + M + Math.sin(x * .05) * 8); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(160,120,70,.55)'; ctx.lineWidth = 2.5; for (let x = a + 8; x < b; x += 14) { const r = rnd(Math.floor(x)); ctx.beginPath(); ctx.moveTo(x, yy(x) + 18); ctx.bezierCurveTo(x + (r() - .5) * 30, yy(x) + 40, x + (r() - .5) * 40, yy(x) + 60, x + (r() - .5) * 30, yy(x) + M + 14 + r() * 50); ctx.stroke(); } // root fibres hanging into the water
    ctx.fillStyle = grad(0, SY - 26, 0, SY + 22, [[0, '#a8ac52'], [.5, '#7f8a36'], [1, '#5a5a2a']]); ctx.beginPath(); ctx.moveTo(a, yy(a) + 20); for (let x = a; x <= b; x += 10) ctx.lineTo(x, yy(x) - 6 - Math.abs(Math.sin(x * .07)) * 10); ctx.lineTo(b, yy(b) + 20); ctx.closePath(); ctx.fill();
    ctx.lineCap = 'round'; for (let x = a + 6; x < b; x += 9) { const r = rnd(Math.floor(x * 3)); ctx.strokeStyle = r() > .5 ? '#b2a85c' : '#8a9640'; ctx.lineWidth = 3; const L = 16 + r() * 34; ctx.beginPath(); ctx.moveTo(x, yy(x) - 6); ctx.lineTo(x + (r() - .5) * 18, yy(x) - 6 - L); ctx.stroke(); } }
  if (o.gap) { const [gx, gw] = o.gap; ctx.fillStyle = 'rgba(150,210,80,.9)'; ctx.fillRect(gx - gw, SY - 8, gw * 2, 9); ctx.lineCap = 'round'; for (let x = gx - gw; x < gx + gw; x += 7) { ctx.strokeStyle = '#a8d85a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x, SY - 6); ctx.lineTo(x + Math.sin(x + t * 2) * 3, SY - 18 - (x % 13)); ctx.stroke(); } } // only a film of grass over open water
  if (o.depth) { const p = o.depth; ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = '#ffcf4a'; ctx.lineWidth = 5; const X = o.depthX ?? 900; ctx.beginPath(); ctx.moveTo(X, SY + M + 10); ctx.lineTo(X, SY + M + 10 + 900 * p); ctx.stroke(); for (let k = 0; k <= 5; k++) { const y = SY + M + 10 + k * 180 * p; ctx.beginPath(); ctx.moveTo(X - 18, y); ctx.lineTo(X + 18, y); ctx.stroke(); } label(o.depthText || '3–5 м', X - 30, SY + M + 520 * p, 64, { weight: 900, color: '#ffcf4a', align: 'right' }); ctx.restore(); } }

// top-down hiker: lying on the back (o.up = 1) or on the belly crawling (o.up = 0). arms 0..1 spread, crawl = phase, sink 0..1 = legs under slurry
function heroTop(x, y, s, t, o = {}) { const u = s, J = '#5b6640', Pn = '#454a36', SK = '#dcae8e', up = o.up ?? 1, ar = o.arms ?? 0, cr = o.crawl, sink = o.sink || 0, mud = o.mud || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.fillStyle = 'rgba(10,10,4,.35)'; ctx.beginPath(); ctx.ellipse(6 * u, 12 * u, 46 * u, 110 * u, 0, 0, 7); ctx.fill();
  const legs = () => { for (const sx of [-1, 1]) { const k = cr == null ? 0 : Math.max(0, Math.sin(cr + (sx > 0 ? Math.PI : 0))); const hip = [sx * 9 * u, 24 * u], knee = [sx * (13 + 10 * k) * u, (60 - 12 * k) * u], foot = [sx * (14 + 6 * k) * u, (96 - 26 * k) * u];
      limb(hip, knee, 8.5 * u, 7.5 * u, Pn, 1); limb(knee, foot, 7.5 * u, 6.5 * u, Pn, 1); const lost = sx > 0 && o.bootLost; ctx.fillStyle = lost ? '#5a5048' : '#22261f'; ctx.beginPath(); ctx.ellipse(foot[0], foot[1] + 6 * u, 6.5 * u, (lost ? 9 : 11) * u, 0, 0, 7); ctx.fill(); if (!lost) { limb([foot[0], foot[1] - 14 * u], foot, 7.6 * u, 7 * u, '#22261f', 1); } } };
  legs();
  if (sink > 0) { const cy = (60 + 30 * (1 - sink)) * u, ry = (55 * sink + 10) * u; ctx.fillStyle = '#7a6a3a'; ctx.beginPath(); ctx.ellipse(0, cy, 42 * u, ry + 8 * u, 0, 0, 7); ctx.fill(); ctx.fillStyle = grad(0, cy - ry, 0, cy + ry, [[0, '#3a2e1a'], [1, '#1c140a']]); ctx.beginPath(); ctx.ellipse(0, cy, 36 * u, ry, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(120,100,60,.35)'; for (let i = 0; i < 6; i++) { const a = i + t * .5; ctx.beginPath(); ctx.ellipse(Math.cos(a) * 22 * u, (62 + Math.sin(a) * 30) * u, 4 * u, 2 * u, a, 0, 7); ctx.fill(); } }
  const arm = sx => { let aU, aF; if (cr != null) { const k = Math.sin(cr + (sx > 0 ? 0 : Math.PI)); aU = Math.PI - .35 - .45 * k; aF = aU + sx * 0 - .4 * (1 - k); } else { aU = lerp(.22, 1.75, ar); aF = aU + lerp(.15, .25, ar); } const sh = [sx * 19 * u, -36 * u], el = [sh[0] + sx * Math.sin(aU) * 28 * u, sh[1] + Math.cos(aU) * 28 * u], ha = [el[0] + sx * Math.sin(aF) * 25 * u, el[1] + Math.cos(aF) * 25 * u];
    limb(sh, el, 7.5 * u, 6.5 * u, J, 1); limb(el, ha, 6.5 * u, 5.5 * u, J, 1); ctx.fillStyle = SK; ctx.beginPath(); ctx.ellipse(ha[0] + sx * Math.sin(aF) * 5 * u, ha[1] + Math.cos(aF) * 5 * u, 5.5 * u, 7 * u, -sx * aF, 0, 7); ctx.fill(); if (mud) { ctx.fillStyle = `rgba(40,30,18,${.7 * mud})`; ctx.beginPath(); ctx.ellipse(ha[0], ha[1], 6 * u, 7 * u, 0, 0, 7); ctx.fill(); } };
  arm(-1); arm(1);
  ctx.fillStyle = grad(-22 * u, 0, 22 * u, 0, [[0, shade(J, .75)], [.5, shade(J, 1.08)], [1, shade(J, .8)]]); rr(-22 * u, -44 * u, 44 * u, 72 * u, 16 * u); ctx.fill(); // torso
  if (up) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(0, -40 * u); ctx.lineTo(0, 24 * u); ctx.stroke(); ctx.fillStyle = shade(J, .7); rr(-14 * u, -8 * u, 10 * u, 8 * u, 2 * u); ctx.fill(); rr(4 * u, -8 * u, 10 * u, 8 * u, 2 * u); ctx.fill(); }
  else { ctx.fillStyle = grad(-17 * u, 0, 17 * u, 0, [[0, '#4e3f2a'], [.5, '#7a6444'], [1, '#4e3f2a']]); rr(-17 * u, -36 * u, 34 * u, 44 * u, 8 * u); ctx.fill(); ctx.fillStyle = '#5e4c32'; rr(-13 * u, -6 * u, 26 * u, 12 * u, 4 * u); ctx.fill(); } // backpack
  if (mud) { const R = rnd(3); ctx.fillStyle = `rgba(42,32,20,${.75 * mud})`; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse((R() - .5) * 40 * u, (R() * 70 - 40) * u, (3 + R() * 6) * u, (2 + R() * 5) * u, R() * 3, 0, 7); ctx.fill(); } ctx.fillRect(-22 * u, 14 * u, 44 * u, 14 * u); }
  ctx.fillStyle = shade(SK, .85); rr(-6 * u, -50 * u, 12 * u, 10 * u, 3 * u); ctx.fill(); // neck
  if (up) { ctx.fillStyle = SK; ctx.beginPath(); ctx.ellipse(0, -62 * u, 12 * u, 14 * u, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#3a2a1c'; ctx.beginPath(); ctx.ellipse(0, -70 * u, 13 * u, 9 * u, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#4a5236'; ctx.beginPath(); ctx.ellipse(0, -73 * u, 13.5 * u, 7 * u, 0, Math.PI, 0); ctx.fill(); // cap pushed back
    const bl = o.blink ? .2 : 1; ctx.fillStyle = '#2a1c14'; ctx.beginPath(); ctx.ellipse(-4.5 * u, -62 * u, 1.8 * u, 1.4 * u * bl, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(4.5 * u, -62 * u, 1.8 * u, 1.4 * u * bl, 0, 0, 7); ctx.fill();
    ctx.fillStyle = shade(SK, .85); ctx.beginPath(); ctx.ellipse(0, -57 * u, 2 * u, 3 * u, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#8a4a3a'; ctx.lineWidth = 1.3 * u; ctx.beginPath(); ctx.moveTo(-4 * u, -52 * u); ctx.quadraticCurveTo(0, -51 * u + (o.gasp || 0) * 3 * u, 4 * u, -52 * u); ctx.stroke();
    if (mud) { ctx.fillStyle = `rgba(40,30,18,${.55 * mud})`; ctx.beginPath(); ctx.ellipse(-7 * u, -58 * u, 4 * u, 3 * u, .4, 0, 7); ctx.fill(); } }
  else { ctx.fillStyle = '#3a2a1c'; ctx.beginPath(); ctx.ellipse(0, -60 * u, 12 * u, 13 * u, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#4a5236'; ctx.beginPath(); ctx.ellipse(0, -64 * u, 12.5 * u, 10 * u, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#3e4530'; ctx.beginPath(); ctx.ellipse(0, -76 * u, 9 * u, 4 * u, 0, 0, 7); ctx.fill(); }
  ctx.restore(); }

// top-down bog surface (for overhead shots), with own trail of dents (o.trail = [[x,y],...]) and slurry hole at (o.hole)
function bogTop(t, o = {}) { const R = rnd(o.seed || 21); ctx.fillStyle = '#66702e'; ctx.fillRect(-1500, -1500, 4100, 5000);
  for (let i = 0; i < 120; i++) { const x = -1400 + R() * 3900, y = -1400 + R() * 4800, r = 120 + R() * 320, c = R(); const col = c > .66 ? '150,74,40' : c > .33 ? '176,172,84' : '46,58,22'; ctx.fillStyle = rgrad(x, y, 0, r, [[0, `rgba(${col},${.35 + R() * .2})`], [1, `rgba(${col},0)`]]); ctx.fillRect(x - r, y - r, r * 2, r * 2); } // soft colour fields
  for (let i = 0; i < 3200; i++) { const x = -1400 + R() * 3900, y = -1400 + R() * 4800, r = 4 + R() * 7, c = R(); ctx.fillStyle = c > .7 ? '#a8a452' : c > .4 ? '#7e8a36' : c > .15 ? '#5a6426' : '#8a4a2a'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); if (c > .7) { ctx.fillStyle = 'rgba(230,230,150,.45)'; ctx.beginPath(); ctx.arc(x - r * .3, y - r * .3, r * .4, 0, 7); ctx.fill(); } } // sphagnum heads
  for (let i = 0; i < 160; i++) { const x = -1400 + R() * 3900, y = -1400 + R() * 4800; ctx.fillStyle = '#a3141e'; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(x - 2, y - 2, 2, 0, 7); ctx.fill(); } // cranberries
  if (o.trail) for (const [x, y] of o.trail) { ctx.fillStyle = 'rgba(30,40,22,.55)'; ctx.beginPath(); ctx.ellipse(x, y, 34, 50, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(70,90,80,.5)'; ctx.beginPath(); ctx.ellipse(x, y + 4, 22, 34, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(200,220,220,.25)'; ctx.beginPath(); ctx.ellipse(x - 6, y - 6, 8, 12, 0, 0, 7); ctx.fill(); } // dents filled with water
  if (o.hole) { const [hx, hy, hr] = o.hole; ctx.fillStyle = '#7a6a3a'; ctx.beginPath(); ctx.ellipse(hx, hy, hr * 1.45, hr * 1.12, 0, 0, 7); ctx.fill(); ctx.fillStyle = grad(0, hy - hr, 0, hy + hr, [[0, '#3a2e1a'], [1, '#1e160c']]); ctx.beginPath(); ctx.ellipse(hx, hy, hr * 1.3, hr, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(150,130,90,.35)'; for (let i = 0; i < 8; i++) { const a = i * .8 + t * .3; ctx.beginPath(); ctx.ellipse(hx + Math.cos(a) * hr * .7, hy + Math.sin(a) * hr * .5, 10, 5, a, 0, 7); ctx.fill(); } }
  for (let i = 0; i < 60; i++) { const x = -1400 + R() * 3900, y = -1400 + R() * 4800; if (o.free && Math.hypot(x - o.free[0], y - o.free[1]) < o.free[2]) continue; ctx.fillStyle = 'rgba(30,36,12,.35)'; ctx.beginPath(); ctx.ellipse(x + 14, y + 16, 70, 60, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#7a8236'; ctx.beginPath(); ctx.arc(x, y, 44, 0, 7); ctx.fill(); ctx.lineCap = 'round'; for (let k = 0; k < 34; k++) { const a = R() * 7, L = 30 + R() * 70; ctx.strokeStyle = R() > .5 ? '#c2b46a' : '#8e9a42'; ctx.lineWidth = 3 + R() * 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 10, y + Math.sin(a) * 10); ctx.quadraticCurveTo(x + Math.cos(a + .2) * L * .6, y + Math.sin(a + .2) * L * .6, x + Math.cos(a + .3) * L, y + Math.sin(a + .3) * L); ctx.stroke(); } } } // tussocks from above

// the bog body, found in peat: side profile with a pointed skin cap, closed eyes, stubble, forehead wrinkles
function bogMan(x, y, s, t) { const u = s; ctx.save(); ctx.translate(x, y); ctx.rotate(-.08);
  const P = [[-30, -112], [30, -108], [74, -88], [96, -58], [102, -42], [94, -28], [104, -10], [126, 10], [128, 16], [116, 20], [106, 22], [108, 30], [114, 36], [104, 42], [110, 48], [104, 54], [98, 58], [106, 72], [100, 86], [70, 96], [30, 96], [0, 88], [-20, 120], [-90, 130], [-110, 60], [-112, -10], [-98, -70], [-70, -100]];
  const path = () => { ctx.beginPath(); ctx.moveTo(P[0][0] * u, P[0][1] * u); for (let i = 1; i <= P.length; i++) { const a = P[i % P.length], b = P[(i + 1) % P.length]; ctx.quadraticCurveTo(a[0] * u, a[1] * u, (a[0] + b[0]) / 2 * u, (a[1] + b[1]) / 2 * u); } ctx.closePath(); };
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.save(); ctx.translate(10 * u, 14 * u); path(); ctx.fill(); ctx.restore();
  ctx.fillStyle = grad(-110 * u, -100 * u, 130 * u, 100 * u, [[0, '#3a2210'], [.45, '#6a4524'], [.7, '#7a5230'], [1, '#4a2c14']]); path(); ctx.fill();
  ctx.save(); path(); ctx.clip();
  ctx.fillStyle = 'rgba(255,214,160,.16)'; ctx.beginPath(); ctx.ellipse(70 * u, -60 * u, 40 * u, 22 * u, .5, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(112 * u, 4 * u, 14 * u, 8 * u, .8, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(88 * u, 70 * u, 14 * u, 8 * u, 0, 0, 7); ctx.fill(); // leathery highlights
  ctx.fillStyle = 'rgba(30,14,4,.35)'; ctx.beginPath(); ctx.ellipse(70 * u, -30 * u, 22 * u, 12 * u, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(70 * u, 30 * u, 24 * u, 30 * u, 0, 0, 7); ctx.fill(); // eye socket + cheek hollow
  const R = rnd(14); ctx.fillStyle = 'rgba(14,6,0,.8)'; for (let i = 0; i < 520; i++) { const px = (40 + R() * 72) * u, py = (24 + R() * 74) * u; if (py < 34 * u && px < 96 * u) continue; ctx.beginPath(); ctx.arc(px, py, (.9 + R() * .7) * u, 0, 7); ctx.fill(); } // stubble on lip, chin and jaw
  ctx.restore();
  ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(20,8,2,.7)';
  ctx.lineWidth = 2.6 * u; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo((44 + i * 4) * u, (-84 + i * 8) * u); ctx.quadraticCurveTo((66 + i * 4) * u, (-90 + i * 8) * u, (84 + i * 3) * u, (-74 + i * 8) * u); ctx.stroke(); } // forehead wrinkles
  ctx.lineWidth = 3.4 * u; ctx.beginPath(); ctx.moveTo(56 * u, -32 * u); ctx.quadraticCurveTo(72 * u, -24 * u, 88 * u, -32 * u); ctx.stroke(); ctx.lineWidth = 1.8 * u; ctx.beginPath(); ctx.moveTo(60 * u, -26 * u); ctx.quadraticCurveTo(73 * u, -19 * u, 86 * u, -26 * u); ctx.stroke(); // closed eye
  ctx.lineWidth = 2.4 * u; ctx.beginPath(); ctx.moveTo(98 * u, 16 * u); ctx.quadraticCurveTo(86 * u, 14 * u, 80 * u, 30 * u); ctx.stroke(); // nasolabial fold
  ctx.beginPath(); ctx.moveTo(108 * u, 40 * u); ctx.quadraticCurveTo(100 * u, 42 * u, 94 * u, 40 * u); ctx.stroke(); // mouth line
  ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(112 * u, 18 * u); ctx.quadraticCurveTo(118 * u, 14 * u, 120 * u, 18 * u); ctx.stroke(); // nostril
  ctx.fillStyle = 'rgba(40,20,8,.55)'; ctx.beginPath(); ctx.ellipse(-6 * u, -6 * u, 16 * u, 24 * u, .15, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(20,8,2,.6)'; ctx.lineWidth = 2.4 * u; ctx.beginPath(); ctx.ellipse(-6 * u, -6 * u, 11 * u, 18 * u, .15, -1.6, 1.4); ctx.stroke(); // ear
  ctx.fillStyle = grad(-120 * u, -140 * u, 80 * u, -40 * u, [[0, '#2a1a0c'], [.6, '#4a3018'], [1, '#3a240e']]); ctx.beginPath(); ctx.moveTo(84 * u, -64 * u); ctx.quadraticCurveTo(60 * u, -118 * u, -10 * u, -122 * u); ctx.quadraticCurveTo(-90 * u, -124 * u, -150 * u, -150 * u); ctx.quadraticCurveTo(-130 * u, -90 * u, -116 * u, -30 * u); ctx.quadraticCurveTo(-60 * u, -40 * u, -30 * u, -30 * u); ctx.quadraticCurveTo(30 * u, -66 * u, 84 * u, -64 * u); ctx.closePath(); ctx.fill(); // pointed skin cap
  ctx.strokeStyle = 'rgba(10,4,0,.55)'; ctx.lineWidth = 2 * u; for (const [ax, ay, bx, by] of [[40, -100, -20, -50], [-20, -118, -60, -40], [-80, -126, -95, -36]]) { ctx.beginPath(); ctx.moveTo(ax * u, ay * u); ctx.lineTo(bx * u, by * u); ctx.stroke(); } // seams between skin pieces
  ctx.strokeStyle = '#3a240e'; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.moveTo(-16 * u, -32 * u); ctx.quadraticCurveTo(20 * u, 50 * u, 60 * u, 96 * u); ctx.stroke(); // chin strap
  ctx.restore(); }

// peat block background for the find
function peatBed(t) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1c10'], [.5, '#3a2814'], [1, '#1a1008']]); ctx.fillRect(-500, -500, W + 1000, H + 1000); const R = rnd(55); for (let i = 0; i < 700; i++) { const x = R() * W * 1.4 - 200, y = R() * H * 1.4 - 200; ctx.fillStyle = `rgba(${80 + R() * 60},${50 + R() * 40},${20 + R() * 20},${.2 + R() * .3})`; ctx.beginPath(); ctx.ellipse(x, y, 4 + R() * 26, 2 + R() * 6, R() * 3, 0, 7); ctx.fill(); } ctx.strokeStyle = 'rgba(160,120,70,.25)'; ctx.lineWidth = 3; for (let i = 0; i < 60; i++) { const x = R() * W * 1.4 - 200, y = R() * H * 1.4 - 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 40, y + (R() - .5) * 40, x + 90 + R() * 80, y + (R() - .5) * 30); ctx.stroke(); } }

// hiker in the world: actor + optional slurry hole when sunk by `sink` px
function hiker(x, y, h, P, o = {}) { const st = Object.assign({}, HIKER, o.st || {}); const sink = o.sink || 0, s = h / 560;
  if (!sink) { ctx.fillStyle = 'rgba(16,18,6,.35)'; ctx.beginPath(); ctx.ellipse(x, y + 4, h * .17, h * .03, 0, 0, 7); ctx.fill(); actor(x, y, h, P, st); return; }
  const hw = h * .22, hh = h * .05; ctx.fillStyle = '#20180e'; ctx.beginPath(); ctx.ellipse(x, y, hw, hh, 0, 0, 7); ctx.fill(); // hole
  ctx.save(); ctx.beginPath(); ctx.rect(x - h, y - h * 2, h * 2, h * 2 + hh * .2); ctx.clip(); actor(x, y + sink, h, P, st); ctx.restore();
  ctx.fillStyle = grad(0, y - hh, 0, y + hh, [[0, '#4a3a22'], [1, '#1a120a']]); ctx.beginPath(); ctx.ellipse(x, y, hw, hh, 0, 0, Math.PI); ctx.lineTo(x - hw, y); ctx.fill(); // front lip of slurry over the body
  ctx.strokeStyle = 'rgba(160,140,90,.35)'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.ellipse(x, y - 2, hw * .8, hh * .55, 0, 0, Math.PI); ctx.stroke();
  ctx.fillStyle = '#7a7f36'; ctx.beginPath(); ctx.ellipse(x - hw * .2, y + hh * .9, hw * 1.25, hh * .7, 0, 0, Math.PI, true); ctx.fill(); } // torn moss rim in front

function splash(x, y, t0, t, s = 1, col = '58,44,26') { const p = (t - t0) / .8; if (p <= 0 || p >= 1) return; const R = rnd(Math.round(x + y)); for (let i = 0; i < 26; i++) { const a = -Math.PI * (.1 + R() * .8), v = (120 + R() * 320) * s; ctx.fillStyle = `rgba(${col},${.95 * (1 - p)})`; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * v * p, y + Math.sin(a) * v * p + 600 * p * p * s, (5 + R() * 9) * s, (4 + R() * 6) * s, a, 0, 7); ctx.fill(); } }
