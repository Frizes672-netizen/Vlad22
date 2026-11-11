// ===== RU + EN Short: "The dead man's hand" — the cook who lived ~60 h in an air pocket of a capsized tug (true story, 2013) =====
// Language-independent scenes: phases are driven by shot fractions or by s.a / s.b, so RU (27 units) and EN (22 units) shot lists both work.
const LG = (en, ru) => (typeof LANG !== 'undefined' && LANG === 'en') ? en : ru;
const HARR = (o = {}) => Object.assign({ top: '#2b3340', pants: '#1f2530', hair: '#141010', skin: '#6b4428', eyes: '#2a1a10', light: 1, hairStyle: 'short' }, o);
const OK_SKIN = '#6b4428', OK_GLOVE = '#16181c';
function bigTitleFit(str, y, p, o = {}) { const size = o.size || 120; ctx.save(); ctx.font = `900 ${size}px ${F_HEAD}`; const w = ctx.measureText(str).width + size * .32; ctx.restore(); bigTitle(str, y, p, Object.assign({}, o, { size: w > 1000 ? Math.floor(size * 1000 / w) : size })); }
const ph = (t, d, a, b) => t >= d * a && t < d * b; // phase helper by fraction of the shot

// ---------- storm at sea ----------
function stormSea(t, o = {}) { const lt = (Math.sin(t * 7.3) > .97 || (o.bolt && t % 2.2 < .1)) ? 1 : 0; ctx.fillStyle = grad(0, 0, 0, 1100, [[0, lt ? '#5a6a88' : '#0a0f1a'], [1, lt ? '#8090a8' : '#1a2434']]); ctx.fillRect(0, 0, W, 1100);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = `rgba(${lt ? '90,100,120' : '25,30,42'},.8)`; ctx.beginPath(); ctx.ellipse(((i * 260 + t * 40) % 1400) - 150, 200 + (i % 3) * 120, 320, 110, 0, 0, 7); ctx.fill(); }
  if (lt) { ctx.strokeStyle = '#eaf2ff'; ctx.lineWidth = 6; ctx.beginPath(); let x = 760, y = 0; ctx.moveTo(x, y); while (y < 800) { x += (Math.sin(y * .05 + t) * 50); y += 80; ctx.lineTo(x, y); } ctx.stroke(); glow(760, 300, 600, 'rgba(200,220,255,.35)'); }
  ctx.strokeStyle = 'rgba(180,200,230,.25)'; ctx.lineWidth = 2; const R = rnd(Math.floor(t * 20)); for (let i = 0; i < 70; i++) { const x = R() * W, y = R() * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30, y + 90); ctx.stroke(); } // rain
  for (let k = 0; k < 4; k++) { const by = 1000 + k * 170, amp = 60 + k * 25; ctx.fillStyle = grad(0, by - amp, 0, H, [[0, k % 2 ? '#1c3a4a' : '#16303e'], [1, '#050c12']]); ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, by + Math.sin(x * .006 + t * (1.2 + k * .2) + k) * amp + Math.sin(x * .017 - t * 2) * amp * .3); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(220,235,245,.35)'; ctx.lineWidth = 4; ctx.beginPath(); for (let x = 0; x <= W; x += 20) { const y = by + Math.sin(x * .006 + t * (1.2 + k * .2) + k) * amp + Math.sin(x * .017 - t * 2) * amp * .3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } }
function tugboat(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = grad(0, -40, 0, 160, [[0, '#2a2e36'], [1, '#111317']]); ctx.beginPath(); ctx.moveTo(-380, -40); ctx.lineTo(380, -40); ctx.quadraticCurveTo(420, 40, 330, 150); ctx.lineTo(-320, 150); ctx.quadraticCurveTo(-400, 60, -380, -40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#a3261f'; ctx.fillRect(-380, 60, 790, 40); ctx.fillStyle = '#0c0d10'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-300 + i * 120, 10, 26, 0, 7); ctx.fill(); } // red boot-top + fender tyres
  ctx.fillStyle = grad(0, -260, 0, -40, [[0, '#f2f2ee'], [1, '#c9ccd2']]); rr(-220, -230, 340, 190, 10); ctx.fill(); rr(-150, -330, 220, 110, 10); ctx.fill(); ctx.fillStyle = '#ffd98a'; for (let i = 0; i < 4; i++) ctx.fillRect(-140 + i * 52, -310, 38, 40); for (let i = 0; i < 5; i++) ctx.fillRect(-200 + i * 62, -190, 40, 34);
  ctx.fillStyle = '#d7a21e'; rr(150, -230, 70, 190, 6); ctx.fill(); ctx.fillStyle = '#16181c'; ctx.fillRect(150, -240, 70, 20); ctx.fillStyle = '#c9ccd2'; ctx.fillRect(-40, -470, 10, 150); ctx.fillRect(-90, -440, 110, 6); // funnel + mast
  ctx.restore(); }
function underwater(t, o = {}) { const dp = o.depth ?? .5; ctx.fillStyle = grad(0, 0, 0, H, [[0, `rgb(${20 - dp * 16},${70 - dp * 55},${90 - dp * 70})`], [1, '#010407']]); ctx.fillRect(0, 0, W, H);
  if (dp < .6) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { const x = 200 + i * 180 + Math.sin(t * .5 + i) * 40; ctx.fillStyle = `rgba(120,200,220,${.05 * (1 - dp)})`; ctx.beginPath(); ctx.moveTo(x - 30, 0); ctx.lineTo(x + 30, 0); ctx.lineTo(x + 140, H); ctx.lineTo(x - 60, H); ctx.closePath(); ctx.fill(); } ctx.restore(); } // god rays
  const R = rnd(4); for (let i = 0; i < 120; i++) { const x = (R() * W + Math.sin(t + i) * 20), y = ((R() * H - t * (8 + R() * 20)) % H + H) % H; ctx.fillStyle = `rgba(200,230,230,${.15 + R() * .25})`; ctx.fillRect(x, y, 3, 3); } } // marine snow
function seabed(y) { ctx.fillStyle = grad(0, y, 0, H, [[0, '#2a2a22'], [1, '#0a0a08']]); ctx.beginPath(); ctx.moveTo(0, y + 30); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, y + Math.sin(x * .01) * 20); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); }
function bubbles(t, x, y, n, spread = 60, seed = 2) { const R = rnd(seed); for (let i = 0; i < n; i++) { const ph = (t * (.5 + R() * .6) + R()) % 1, bx = x + (R() - .5) * spread + Math.sin(t * 4 + i) * 8, by = y - ph * 900, r = 4 + R() * 12; ctx.strokeStyle = `rgba(220,245,255,${.7 * (1 - ph)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, by, r, 0, 7); ctx.stroke(); } }
function depthGauge(m, p = 1, col = '#7fe3ff') { ctx.save(); ctx.globalAlpha = clamp(p); ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(760, 420, 260, 130, 30); ctx.fill(); label('▼ ' + Math.round(m) + LG(' m', ' м'), 890, 505, 64, { weight: 900, color: col, font: MONO }); ctx.restore(); }

// ---------- inside the capsized hull: the air pocket ----------
function pocketDraw() { ctx.fillStyle = '#05080a'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = grad(0, 240, 0, 420, [[0, '#2b2620'], [1, '#14110d']]); ctx.fillRect(0, 240, W, 180); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 6; for (let x = 0; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 240); ctx.lineTo(x, 420); ctx.stroke(); } // the floor is now the ceiling
  ctx.fillStyle = '#1a1714'; ctx.fillRect(140, 420, 22, 160); ctx.fillRect(420, 420, 22, 160); ctx.fillStyle = '#25211c'; rr(110, 560, 360, 40, 8); ctx.fill(); // bolted table hangs upside down
  ctx.fillStyle = '#1c1f24'; ctx.fillRect(700, 420, 30, 500); ctx.fillRect(820, 420, 18, 500); ctx.fillStyle = '#2a2e35'; rr(640, 600, 260, 40, 10); ctx.fill(); // pipes + an upturned bunk
  ctx.fillStyle = '#0d1114'; ctx.fillRect(0, 0, W, 240); }
function pocket(t, o = {}) { const wl = o.water ?? 1000, dark = o.dark ?? .55; ctx.drawImage(layer('pocket', pocketDraw, 1), 0, 0); ctx.save(); if (o.shiver) shake(t, o.shiver);
  person(540, 1900, 1300, HARR({ fear: o.fear || 0, mouth: o.mouth || 0, closed: o.closed || 0, shadow: false, tilt: o.tilt || 0 })); ctx.restore();
  if (o.breath) { for (let i = 0; i < 3; i++) { const q = ((t * .8 + i / 3) % 1); ctx.fillStyle = `rgba(220,235,245,${.25 * (1 - q)})`; ctx.beginPath(); ctx.ellipse(560 + q * 40, 830 - q * 120, 30 + q * 60, 18 + q * 40, 0, 0, 7); ctx.fill(); } }
  ctx.fillStyle = 'rgba(6,30,36,.82)'; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, wl + Math.sin(x * .03 + t * 2) * 6); ctx.lineTo(W, H); ctx.closePath(); ctx.fill(); // black water up to his chest
  ctx.strokeStyle = 'rgba(140,210,220,.35)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 20) { const y = wl + Math.sin(x * .03 + t * 2) * 6; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  if (o.lightBelow) { const L = o.lightBelow; ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(820, wl + 300, 500 * L, `rgba(150,230,255,${.6 * L})`); for (let i = 0; i < 8; i++) { ctx.strokeStyle = `rgba(160,230,255,${.25 * L})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(700 + i * 40 + Math.sin(t * 3 + i) * 20, 300 + (i % 3) * 40, 60, 12, 0, 0, 7); ctx.stroke(); } ctx.restore(); } // caustics on the ceiling
  grade('rgba(0,0,0,1)', dark, 'source-over'); glow(540, 820, 360, `rgba(110,170,200,${.12 + (o.lightBelow || 0) * .25})`); vign(.6); }
function co2Meter(v, p = 1) { ctx.save(); ctx.globalAlpha = clamp(p); ctx.fillStyle = 'rgba(0,0,0,.6)'; rr(860, 520, 150, 560, 30); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; rr(905, 570, 60, 420, 20); ctx.fill();
  const h = 420 * clamp(v), col = v > .7 ? '#ff4d4d' : v > .4 ? '#ffb340' : '#5be08a'; ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 20; rr(905, 990 - h, 60, h, 20); ctx.fill(); ctx.shadowBlur = 0; label('CO₂', 935, 1050, 34, { weight: 900, color: '#fff' }); ctx.restore(); }

// ---------- the diver + the hands ----------
function diver(x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.flip) ctx.scale(-1, 1);
  const kick = Math.sin(t * 5) * .25; for (const k of [-1, 1]) { ctx.save(); ctx.translate(-330, k * 20); ctx.rotate(kick * k); ctx.fillStyle = '#0b0c0f'; rr(-160, -22, 170, 44, 20); ctx.fill(); ctx.fillStyle = '#d7a21e'; ctx.beginPath(); ctx.moveTo(-160, -10); ctx.lineTo(-290, -50); ctx.lineTo(-290, 50); ctx.lineTo(-160, 10); ctx.closePath(); ctx.fill(); ctx.restore(); } // legs + fins
  ctx.fillStyle = '#d7a21e'; rr(-260, -95, 280, 70, 34); ctx.fill(); ctx.fillStyle = '#c9ccd2'; rr(10, -90, 30, 60, 8); ctx.fill(); // tank
  ctx.fillStyle = grad(0, -60, 0, 60, [[0, '#2a2d33'], [1, '#0b0c0f']]); rr(-330, -55, 400, 110, 55); ctx.fill(); // wetsuit torso
  ctx.fillStyle = '#0d0e11'; ctx.beginPath(); ctx.arc(110, -10, 55, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(120,180,200,.7)'; rr(120, -40, 50, 44, 12); ctx.fill(); ctx.fillStyle = '#f4f4f0'; rr(85, -75, 40, 22, 6); ctx.fill(); // head, mask, lamp
  ctx.strokeStyle = '#0b0c0f'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(40, 20); ctx.lineTo(200, 40 + Math.sin(t * 2) * 10); ctx.stroke(); ctx.fillStyle = '#e9e9e2'; rr(195, 25, 60, 34, 8); ctx.fill(); // arm + torch
  ctx.restore(); if (o.beam !== false) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const bx = x + (o.flip ? -1 : 1) * 255 * s, by = y + 42 * s, dir = o.flip ? -1 : 1, g = ctx.createLinearGradient(bx, by, bx + dir * 900, by); g.addColorStop(0, 'rgba(230,250,255,.55)'); g.addColorStop(1, 'rgba(230,250,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(bx, by - 10); ctx.lineTo(bx + dir * 1000, by - 260); ctx.lineTo(bx + dir * 1000, by + 300); ctx.lineTo(bx, by + 14); ctx.closePath(); ctx.fill(); glow(bx, by, 80, 'rgba(240,255,255,.9)'); ctx.restore(); } }
// close-up: his bare forearm rises from below, the diver's glove clamps it, then his fingers close (k = squeeze 0..1)
function handsCU(t, reach, k) { underwater(t, { depth: .85 }); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(300, 500, 0, 300, 500, 1100); g.addColorStop(0, 'rgba(200,240,255,.35)'); g.addColorStop(1, 'rgba(200,240,255,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); // torch from top-left
  ctx.save(); if (k > 0) shake(t, 3 * k); const ax = 600, wy = 820; // his arm
  ctx.fillStyle = grad(ax - 110, 0, ax + 110, 0, [[0, shade(OK_SKIN, .7)], [.45, shade(OK_SKIN, 1.15)], [1, shade(OK_SKIN, .65)]]); ctx.beginPath(); ctx.moveTo(ax - 86, wy + 150); ctx.bezierCurveTo(ax - 100, wy + 500, ax - 140, wy + 800, ax - 150, H + 20); ctx.lineTo(ax + 150, H + 20); ctx.bezierCurveTo(ax + 140, wy + 800, ax + 100, wy + 500, ax + 88, wy + 150); ctx.closePath(); ctx.fill();
  helpHand(ax, wy, 1, 0, lerp(.1, .7, k), lerp(.15, .85, eio(k)), { noCuff: true, skin: OK_SKIN });
  if (reach > 0) { const r = eout(clamp(reach)); gripHand(lerp(-300, ax - 120, r), wy + 380, 1.25, '#000', { noSleeve: true, skin: OK_GLOVE, cuff: '#2a2e36', rot: -Math.PI / 2 + .1 }); } // diver's glove clamps his forearm
  ctx.restore(); bubbles(t, 520, 700, 10, 120, 7); vign(.55); }

// ---------- decompression: bubbles in the blood ----------
function bloodVessel(t, k) { ctx.fillStyle = '#12060a'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = grad(0, 760, 0, 1160, [[0, '#5a0d14'], [.5, '#a01a24'], [1, '#4a0a10']]); ctx.beginPath(); ctx.moveTo(-20, 760); ctx.bezierCurveTo(300, 700, 700, 820, W + 20, 760); ctx.lineTo(W + 20, 1160); ctx.bezierCurveTo(700, 1220, 300, 1100, -20, 1160); ctx.closePath(); ctx.fill();
  const R = rnd(3); for (let i = 0; i < 26; i++) { const x = ((R() * W + t * 200) % (W + 100)) - 50, y = 840 + R() * 260; ctx.fillStyle = '#c42a34'; ctx.beginPath(); ctx.ellipse(x, y, 26, 14, R(), 0, 7); ctx.fill(); }
  for (let i = 0; i < 24 * k; i++) { const x = ((R() * W + t * 160) % (W + 100)) - 50, y = 840 + R() * 260, r = (6 + R() * 26) * clamp(k * 1.5); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke(); } vign(.5); }
function chamber(t, hrs) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#1b2230'], [1, '#0a0d12']]); ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2a2e35'; ctx.fillRect(0, 1350, W, 570);
  ctx.fillStyle = grad(0, 620, 0, 1340, [[0, '#d6dbe2'], [.5, '#9aa1ab'], [1, '#5a616b']]); rr(40, 620, 1000, 700, 340); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 6; for (const x of [260, 820]) { ctx.beginPath(); ctx.moveTo(x, 640); ctx.lineTo(x, 1300); ctx.stroke(); } // steel chamber
  ctx.fillStyle = '#3a3f47'; ctx.beginPath(); ctx.arc(540, 960, 190, 0, 7); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(540, 960, 160, 0, 7); ctx.clip(); ctx.fillStyle = '#0c1a22'; ctx.fillRect(380, 800, 320, 320); ctx.save(); ctx.translate(540, 1010); ctx.scale(1.6, 1.6); ctx.translate(-540, -760); person(540, 1900, 1300, HARR({ closed: .3, shadow: false })); ctx.restore(); glow(540, 900, 200, 'rgba(255,220,160,.25)'); ctx.restore();
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; ctx.fillStyle = '#20242a'; ctx.beginPath(); ctx.arc(540 + Math.cos(a) * 175, 960 + Math.sin(a) * 175, 10, 0, 7); ctx.fill(); }
  vign(.45); }
function chamberTimer(hrs) { ctx.fillStyle = 'rgba(0,0,0,.7)'; rr(290, 1560, 500, 150, 34); ctx.fill(); const h = Math.floor(hrs), m = Math.floor((hrs - h) * 60); label(String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':00', 540, 1665, 86, { weight: 900, font: MONO, color: '#7fe3ff' }); }
function crew12(t, lit, p = 1, o = {}) { for (let i = 0; i < 12; i++) { const x = 160 + (i % 4) * 253, y = 980 + Math.floor(i / 4) * 300, on = typeof lit === 'number' ? i === lit : lit; ctx.save(); ctx.globalAlpha = clamp(p * 12 - i * .6) * (on ? 1 : (o.dim ?? .22));
  person(x, y, 260, { color: on ? '#f2e6c8' : '#5a6270', silhouette: true, shadow: false }); ctx.restore(); if (on && o.glowOne) glow(x, y - 130, 200, 'rgba(255,230,160,.4)'); } }

// ================== SCENES ==================
SC.hook = { // FRAME 0: the diver's glove clamps a lifeless forearm in the torch beam — and the fingers close
  draw(t, d) { const sq = prog(t, d * .45, d * .75); ctx.save(); cam(560, 1000, lerp(1.15, 1.0, eout(prog(t, 0, .8)))); handsCU(t, Math.max(.75, prog(t, 0, .35)), sq); ctx.restore();
    if (sq > .2) { ctx.save(); ctx.globalAlpha = Math.sin(Math.PI * clamp((sq - .2) * 2)); ctx.strokeStyle = '#ffcf4a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(600, 760, 230 + 20 * Math.sin(t * 12), 0, 7); ctx.stroke(); ctx.restore(); }
    bigTitleFit(sq > .25 ? LG('IT GRABBED BACK', 'РУКА ОЖИЛА') : LG("A DEAD MAN'S HAND", 'РУКА МЕРТВЕЦА'), 300, 1, { size: 104, col: sq > .25 ? '#ffcf4a' : '#fff' }); },
  sfx(d) { return [[0, 'drone', .4, { dur: d }], [0, 'boom', .3], [d * .45, 'heartbeat', .5, { dur: d * .55 }], [d * .5, 'dundun', .45]]; }
};
SC.sink = { // date + storm → capsize → sinking → seabed at 30 m
  draw(t, d) { if (ph(t, d, 0, .27)) { stormSea(t, { bolt: true }); tugboat(560, 1040 + Math.sin(t * 2) * 30, .95, Math.sin(t * 1.6) * .18); bigTitleFit(LG('MAY 2013', '2013 ГОД'), 300, prog(t, 0, .2), { size: 120, col: '#fff' }); label(LG('ATLANTIC OCEAN', 'АТЛАНТИКА · НИГЕРИЯ'), 540, 420, 50, { weight: 900, color: 'rgba(255,255,255,.8)', alpha: prog(t, .2, .5) }); return; }
    if (ph(t, d, .27, .55)) { const q = prog(t, d * .27, d * .55); stormSea(t); ctx.save(); shake(t, 8); tugboat(560, 1060 + q * 60, .95, eio(q) * Math.PI); ctx.restore(); ctx.fillStyle = 'rgba(220,235,245,.3)'; ctx.beginPath(); ctx.ellipse(560, 1080, 500 * q, 120 * q, 0, 0, 7); ctx.fill(); bigTitleFit(LG('IT FLIPS', 'ПЕРЕВОРОТ'), 300, prog(t, d * .27, d * .27 + .2), { size: 120, col: '#ff6b6b' }); return; }
    if (ph(t, d, .55, .8)) { const q = prog(t, d * .55, d * .8); underwater(t, { depth: q * .8 }); tugboat(540, lerp(500, 1150, q), .85, Math.PI + Math.sin(t) * .05); bubbles(t, 540, lerp(500, 1150, q) - 60, 26, 500, 3); depthGauge(lerp(0, 28, q)); bigTitleFit(LG('GOING DOWN', 'НА ДНО'), 300, prog(t, d * .55, d * .55 + .2), { size: 120, col: '#7fe3ff' }); return; }
    const q = prog(t, d * .8, d); underwater(t, { depth: .9 }); seabed(1400); ctx.save(); shake(t, q < .2 ? 10 : 0); tugboat(540, 1260, .85, Math.PI - .06); ctx.restore(); ctx.fillStyle = `rgba(120,110,90,${.5 * (1 - q)})`; ctx.beginPath(); ctx.ellipse(540, 1420, 600 * (.5 + q), 120, 0, 0, 7); ctx.fill(); depthGauge(30, 1, '#ff6b6b'); bigTitleFit(LG('30 METERS DOWN', '30 МЕТРОВ'), 300, 1, { size: 120, col: '#fff' }); },
  sfx(d) { return [[0, 'rain', .35, { dur: d * .55 }], [0, 'wind', .35, { dur: d * .55 }], [d * .27, 'boom', .5], [d * .27, 'creak', .45], [d * .55, 'bubble_pop', .3], [d * .55, 'drone', .4, { dur: d * .45 }], [d * .8, 'thud_soft', .6]]; }
};
SC.crew = { // "12 men on board" → "the cook was in the toilet"
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1); if (t < t1 - .05) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#0d1420'], [1, '#04070c']]); ctx.fillRect(0, 0, W, H); crew12(t, true, prog(t, 0, .8)); bigTitleFit(LG('12 MEN ON BOARD', '12 ЧЕЛОВЕК НА БОРТУ'), 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    const q = prog(t, t1, d); ctx.fillStyle = '#05070a'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(540, 1000); ctx.rotate(eio(q) * Math.PI * .9); ctx.translate(-540, -1000);
    ctx.fillStyle = '#cfd6d8'; ctx.fillRect(140, 380, 800, 1240); ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 3; for (let y = 380; y < 1620; y += 80) { ctx.beginPath(); ctx.moveTo(140, y); ctx.lineTo(940, y); ctx.stroke(); } for (let x = 140; x < 940; x += 80) { ctx.beginPath(); ctx.moveTo(x, 380); ctx.lineTo(x, 1620); ctx.stroke(); } // tiled toilet
    ctx.fillStyle = '#f2f2ee'; rr(700, 1300, 180, 260, 40); ctx.fill(); ctx.fillStyle = '#e4e6e8'; rr(180, 900, 160, 90, 20); ctx.fill(); ctx.fillStyle = 'rgba(160,190,210,.6)'; rr(190, 620, 140, 200, 10); ctx.fill(); ctx.fillStyle = '#ffeec0'; ctx.beginPath(); ctx.arc(540, 420, 30, 0, 7); ctx.fill();
    person(500, 1640, 1050, HARR({ fear: q > .2 ? .9 : 0, mouth: q > .2 ? .6 : 0 })); ctx.restore(); ctx.fillStyle = `rgba(10,40,50,${.6 * q})`; ctx.fillRect(0, H - 900 * q, W, 900 * q); if (q > .5) { ctx.fillStyle = `rgba(0,0,0,${(q - .5) * 1.6})`; ctx.fillRect(0, 0, W, H); } vign(.5);
    bigTitleFit(LG('THE COOK — IN THE TOILET', 'КОК — В ТУАЛЕТЕ'), 300, prog(t, t1 - .05, t1 + .2), { size: 96, col: '#ffcf4a' }); },
  sfx(d, P, E, s) { return [[0, 'pad_swell', .25, { dur: s.U(s.a + 1) }], [s.U(s.a + 1), 'creak', .5], [s.U(s.a + 1) + .2, 'boom', .45], [s.U(s.a + 1) + .4, 'pour', .45]]; }
};
SC.pocket = { // pitch dark, he feels his way to a pocket of air under the ceiling
  draw(t, d) { const q = prog(t, 0, d); if (q < .45) { ctx.fillStyle = '#020304'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.globalAlpha = .5; helpHand(540 + Math.sin(t * 2) * 60, 900, .9, 0, .1, .2, { noCuff: true, skin: OK_SKIN, rot: Math.sin(t * 1.5) * .2 }); ctx.restore(); glow(540, 900, 300, 'rgba(90,140,170,.12)'); vign(.7); bigTitleFit(LG('TOTAL DARKNESS', 'ПОЛНАЯ ТЬМА'), 300, prog(t, 0, .2), { size: 110, col: '#fff' }); return; }
    ctx.save(); cam(540, 900, lerp(1.0, 1.15, prog(t, d * .45, d))); pocket(t, { water: 1000, fear: .4, mouth: .5, dark: .45 }); ctx.restore(); ctx.strokeStyle = 'rgba(127,227,255,.7)'; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); rr(80, 430, 920, 560, 40); ctx.stroke(); ctx.setLineDash([]); label(LG('AIR', 'ВОЗДУХ'), 540, 480, 44, { weight: 900, color: '#7fe3ff' }); bigTitleFit(LG('A POCKET OF AIR', 'ВОЗДУШНЫЙ КАРМАН'), 300, prog(t, d * .45, d * .45 + .2), { size: 100, col: '#7fe3ff' }); },
  sfx(d) { return [[0, 'drone', .4, { dur: d }], [d * .45, 'bubble_pop', .35], [0, 'heartbeat', .35, { dur: d }]]; }
};
SC.suffer = { // 4 beats: water to the chest · cold/no food · no light · the air turns to poison
  draw(t, d, P, E, s) { const m = [1, 2, 3].map(i => s.U(s.a + i)), k = m.filter(x => t > x - .05).length;
    if (k === 0) { ctx.save(); cam(540, 1000, 1.25); pocket(t, { water: 980, fear: .3, dark: .45 }); ctx.restore(); ctx.strokeStyle = '#7fe3ff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(60, 1000); ctx.lineTo(1020, 1000); ctx.stroke(); bigTitleFit(LG('WATER TO HIS CHEST', 'ВОДА ПО ГРУДЬ'), 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    if (k === 1) { ctx.save(); cam(540, 760, 2.0); pocket(t, { water: 1000, fear: .5, shiver: 4, breath: true, dark: .4, closed: .2 }); ctx.restore(); bigTitleFit(LG('NO FOOD', 'ХОЛОД'), 300, prog(t, m[0] - .05, m[0] + .2), { size: 130, col: '#bfe9ff' }); return; }
    if (k === 2) { ctx.save(); cam(540, 900, 1.0); pocket(t, { water: 1000, fear: .3, dark: .82 }); ctx.restore(); bigTitleFit(LG('NO LIGHT', 'НИ ЕДЫ, НИ СВЕТА'), 300, prog(t, m[1] - .05, m[1] + .2), { size: 104, col: '#fff' }); return; }
    const q = prog(t, m[2] - .05, d); ctx.save(); cam(540, 800, 1.6); pocket(t, { water: 1000, fear: .6, mouth: .5, dark: .5, tilt: Math.sin(t * 1.3) * .05 }); ctx.restore(); grade('rgba(120,20,20,1)', .12 * q, 'source-over'); co2Meter(lerp(.35, .92, q)); bigTitleFit(LG('THE AIR TURNS TO POISON', 'ВОЗДУХ — ЯД'), 300, prog(t, m[2] - .05, m[2] + .2), { size: 104, col: '#ff6b6b' }); },
  sfx(d, P, E, s) { return [[0, 'drone', .35, { dur: d }], [0, 'bubble_pop', .25], [s.U(s.a + 1), 'wind', .2, { dur: 1.2 }], [s.U(s.a + 3), 'heartbeat', .45, { dur: d - s.U(s.a + 3) }], [s.U(s.a + 3), 'alarm', .12, { dur: d - s.U(s.a + 3) }]]; }
};
SC.hours = { // the hour counter runs 0 → 60 while the cuts alternate
  draw(t, d) { const hrs = lerp(2, 60, eio(prog(t, 0, d - .2))), cut = Math.floor(t / 1.5) % 3; ctx.save();
    if (cut === 0) { cam(540, 700, 2.3); pocket(t, { water: 1000, closed: .7, dark: .55 }); } else if (cut === 1) { cam(540, 900, 1.0); pocket(t, { water: 1000, closed: .4, dark: .6 }); } else { cam(560, 680, 3.0); pocket(t, { water: 1000, dark: .5, closed: .2 }); } ctx.restore();
    ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(240, 880, 600, 200, 40); ctx.fill(); label(String(Math.floor(hrs)).padStart(2, '0') + LG(' HRS', ' Ч'), 540, 1020, 120, { weight: 900, font: MONO, color: hrs > 48 ? '#ff6b6b' : '#fff' });
    const day = hrs < 24 ? 1 : hrs < 48 ? 2 : 3; bigTitleFit(day === 1 ? LG('DAY ONE', 'СУТКИ') : day === 2 ? LG('DAY TWO', 'ВТОРЫЕ') : LG('ALMOST THREE', 'ПОЧТИ ТРОЕ'), 300, 1, { size: 110, col: day === 3 ? '#ff6b6b' : '#fff' }); },
  sfx(d) { return [[0, 'clock', .3, { dur: d }], [0, 'drone', .3, { dur: d }]]; }
};
SC.light = { // "Then — a light."
  draw(t, d) { const L = eout(prog(t, d * .25, d * .8)); ctx.save(); cam(540, 820, lerp(1.6, 1.2, L)); pocket(t, { water: 1000, fear: .3 + .6 * L, dark: lerp(.85, .35, L), lightBelow: L }); ctx.restore(); bigTitleFit(LG('A LIGHT', 'СВЕТ'), 300, prog(t, d * .3, d * .3 + .2), { size: 150, col: '#bff3ff', glow: 'rgba(150,230,255,.7)' }); },
  sfx(d) { return [[0, 'heartbeat', .35, { dur: d }], [d * .25, 'shimmer', .45], [d * .3, 'swoosh_up', .3]]; }
};
SC.divers = { // divers sent for the bodies → one sees a hand → grabs it → it squeezes back
  draw(t, d, P, E, s) { const tg = s.U(s.b - 1), ts = s.U(s.b);
    if (t < tg - .05) { const q = prog(t, 0, tg); underwater(t, { depth: .85 }); seabed(1550); tugboat(560, 1480, 1.3, Math.PI - .06); diver(lerp(-200, 420, eio(q)), 900 + Math.sin(t) * 20, .9, t); bubbles(t, lerp(-200, 420, eio(q)) + 100, 860, 12, 40, 5);
      bigTitleFit(LG('DIVERS', 'ВОДОЛАЗЫ'), 300, prog(t, 0, .2), { size: 120, col: '#fff' }); label(LG('sent to recover the bodies', 'их прислали за телами'), 540, 420, 46, { weight: 800, color: 'rgba(255,255,255,.8)', alpha: prog(t, .4, .8) }); return; }
    if (t < ts - .05) { const q = prog(t, tg - .05, ts - .05); ctx.save(); cam(600, 1000, lerp(1.25, 1.05, q)); handsCU(t, q * 1.3, 0); ctx.restore(); bigTitleFit(LG('HE GRABS IT', 'ХВАТАЕТ'), 300, prog(t, tg - .05, tg + .2), { size: 120, col: '#fff' }); return; }
    const sq = prog(t, ts - .05, ts + .6); ctx.save(); cam(600, 900, lerp(1.05, 1.35, sq)); handsCU(t, 1, sq); ctx.restore(); bigTitleFit(LG('IT SQUEEZES BACK', 'СЖИМАЕТ В ОТВЕТ'), 300, prog(t, ts - .05, ts + .2), { size: 100, col: '#ffcf4a' }); },
  sfx(d, P, E, s) { return [[0, 'drone', .35, { dur: d }], [0, 'bubble_pop', .3], [s.U(s.b - 1), 'whoosh', .3], [s.U(s.b), 'dundun', .5], [s.U(s.b), 'heartbeat', .5, { dur: d - s.U(s.b) }]]; }
};
SC.danger = { // "the most dangerous part was still ahead" → going up fast would kill him
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1); if (t < t1 - .05) { underwater(t, { depth: .7 }); diver(380, 900, .9, t, { beam: true }); ctx.save(); ctx.translate(720, 960); ctx.rotate(-.3); person(0, 380, 520, HARR({ closed: .5, shadow: false })); ctx.restore(); bubbles(t, 520, 860, 16, 120, 9); depthGauge(30); bigTitleFit(LG('THE DEADLIEST PART', 'САМОЕ ОПАСНОЕ'), 300, prog(t, 0, .2), { size: 100, col: '#ff6b6b' }); return; }
    const q = prog(t, t1 - .05, d); bloodVessel(t, q); ctx.fillStyle = 'rgba(0,0,0,.6)'; rr(140, 420, 800, 150, 40); ctx.fill(); label(LG('30 m → 0 m  FAST', '30 м → 0 м  БЫСТРО'), 540, 520, 60, { weight: 900, color: '#fff', font: MONO }); bigTitleFit(LG('= DEATH', '= СМЕРТЬ'), 300, prog(t, t1 - .05, t1 + .2), { size: 130, col: '#ff4d4d' });
    label(LG('gas bubbles in the blood', 'кровь вскипает пузырями'), 540, 1300, 50, { weight: 800, color: 'rgba(255,255,255,.85)', alpha: prog(t, t1 + .4, t1 + .8) }); },
  sfx(d, P, E, s) { return [[0, 'drone', .35, { dur: d }], [s.U(s.a + 1), 'fizz', .45, { dur: 2 }], [s.U(s.a + 1), 'boom', .35]]; }
};
SC.chamber = { // sealed in a decompression chamber — 60 more hours
  draw(t, d) { const q = prog(t, 0, d); if (q < .4) { ctx.save(); cam(540, 960, lerp(1.0, 1.08, q)); chamber(t, 0); ctx.restore(); chamberTimer(0); bigTitleFit(LG('DECOMPRESSION CHAMBER', 'БАРОКАМЕРА'), 300, prog(t, 0, .2), { size: 96, col: '#fff' }); return; }
    ctx.save(); cam(540, 960, 1.6); chamber(t, 0); ctx.restore(); chamberTimer(lerp(0, 60, eio(prog(t, d * .4, d - .2)))); bigTitleFit(LG('60 MORE HOURS', 'ЕЩЁ 60 ЧАСОВ'), 300, prog(t, d * .4, d * .4 + .2), { size: 110, col: '#7fe3ff' }); },
  sfx(d) { return [[0, 'clasp', .5], [0, 'hum', .3, { dur: d }], [d * .4, 'clock', .3, { dur: d * .6 }]]; }
};
SC.final = { // "He walked out alive. The only one of twelve."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1); if (t < t1 - .05) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#ffd9a0'], [.5, '#f0a46a'], [1, '#3a2a2a']]); ctx.fillRect(0, 0, W, H); glow(540, 500, 700, 'rgba(255,240,200,.6)'); ctx.save(); cam(540, 900, lerp(1.0, 1.1, prog(t, 0, t1))); person(540, 1900, 1300, HARR({ smile: .2, closed: .2, top: '#c9a24a' })); ctx.restore(); vign(.3); bigTitleFit(LG('ALIVE', 'ЖИВ'), 300, prog(t, 0, .2), { size: 160, col: '#fff' }); return; }
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#0b1018'], [1, '#03050a']]); ctx.fillRect(0, 0, W, H); const q = prog(t, t1 - .05, t1 + 1.2); crew12(t, q > .3 ? 5 : true, 1, { dim: lerp(1, .15, q), glowOne: true }); bigTitleFit(LG('1 OF 12', '1 ИЗ 12'), 300, prog(t, t1 - .05, t1 + .2), { size: 150, col: '#ffcf4a' }); },
  sfx(d, P, E, s) { return [[0, 'pad_swell', .35, { dur: d }], [s.U(s.a + 1), 'chime', .4]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; if (t < TL.total - .3) drawSubs(t); };
