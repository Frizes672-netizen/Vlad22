// ===== Short (EN + RU): "WOULD YOU SURVIVE? / ВЫЖИВЕТЕ? — Ep. 1: the car goes into a lake" =====
// LANG ('en' | 'ru') is set in the page before this file; on-screen text and cue words follow it
const L = (en, ru) => (typeof LANG !== 'undefined' && LANG === 'ru') ? ru : en;
const DRIVER = (o = {}) => Object.assign({ top: '#3a4a5c', pants: '#2a2f3a', hair: '#3a2618', light: 1, skin: '#e6b99c', eyes: '#5b6b62', shoe: '#222' }, o);
const KIDA = (o = {}) => Object.assign({ kid: true, top: '#d9473a', pants: '#2d3f5e', hair: '#6b4a2c', light: 1, skin: '#efc6ab' }, o);
const KIDB = (o = {}) => Object.assign({ kid: true, fem: true, top: '#f2b632', pants: '#3a3f6a', hair: '#8a5a2c', light: 1, skin: '#f0c8ae' }, o);
const OKG = '#22b357', BAD = '#e3262f', YEL2 = '#ffd23f', AQUA = '#4fd1ff';
function grade(col, a, mode = 'multiply') { ctx.save(); ctx.globalCompositeOperation = mode; ctx.fillStyle = col; ctx.globalAlpha = a; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function vign(a = .5) { ctx.fillStyle = rgrad(W / 2, H * .45, H * .25, H * .7, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${a})`]]); ctx.fillRect(0, 0, W, H); }
function choiceBtn(x, y, w, txt, col, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)) * (o.pulse || 1); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); const h = w * .34;
  ctx.fillStyle = 'rgba(0,0,0,.45)'; rr(-w / 2 + 8, -h / 2 + 12, w, h, h / 2); ctx.fill(); ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, shade(col, 1.2)], [1, shade(col, .8)]]); rr(-w / 2, -h / 2, w, h, h / 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 4; rr(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, h / 2); ctx.stroke(); label(txt, 0, h * .15, h * (o.fs || .36), { weight: 900, spacing: 2 }); ctx.restore(); }

// ---------- water ----------
function waterBody(y0, t, o = {}) { // surface line at y0, murky green-blue below with light shafts and particles
  ctx.fillStyle = grad(0, y0, 0, H, [[0, o.c1 || '#2f7f8f'], [.4, o.c2 || '#145060'], [1, o.c3 || '#062028']]); ctx.fillRect(-200, y0, W + 400, H - y0 + 400);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { const x = 100 + i * 180 + Math.sin(t * .6 + i) * 40; ctx.fillStyle = grad(0, y0, 0, y0 + 900, [[0, 'rgba(160,230,240,.14)'], [1, 'rgba(160,230,240,0)']]); ctx.beginPath(); ctx.moveTo(x - 30, y0); ctx.lineTo(x + 30, y0); ctx.lineTo(x + 140, y0 + 900); ctx.lineTo(x - 20, y0 + 900); ctx.closePath(); ctx.fill(); } ctx.restore();
  const R = rnd(8); for (let i = 0; i < 40; i++) { const px = R() * W, py = y0 + ((R() * 1200 + t * 30) % 1200); ctx.fillStyle = 'rgba(210,240,230,.25)'; ctx.fillRect(px, py, 3, 3); }
  ctx.strokeStyle = 'rgba(230,250,255,.85)'; ctx.lineWidth = 6; ctx.beginPath(); for (let x = -200; x <= W + 200; x += 20) { const y = y0 + Math.sin(x * .02 + t * 3) * 8; x === -200 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
function bubbles(t, x, y, n = 14, seed = 4, spread = 120) { const R = rnd(seed); for (let i = 0; i < n; i++) { const q = (t * (.6 + R() * .6) + R()) % 1, r = 4 + R() * 12; ctx.strokeStyle = `rgba(230,250,255,${.7 * (1 - q)})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x + (R() - .5) * spread + Math.sin(t * 4 + i) * 8, y - q * 600, r, 0, 7); ctx.stroke(); } }
function lakeDayDraw() { ctx.fillStyle = grad(0, 0, 0, 900, [[0, '#6fb2ea'], [1, '#d6ecf8']]); ctx.fillRect(0, 0, W, 900); glow(820, 220, 420, 'rgba(255,250,220,.7)');
  for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(255,255,255,${.5 + i * .1})`; ctx.beginPath(); ctx.ellipse(120 + i * 260, 160 + (i % 2) * 60, 120, 34, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#3c6a4a'; ctx.beginPath(); ctx.moveTo(0, 820); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, 760 - Math.abs(Math.sin(x * .013)) * 120); ctx.lineTo(W, 900); ctx.lineTo(0, 900); ctx.closePath(); ctx.fill(); // tree line across the lake
  ctx.fillStyle = grad(0, 860, 0, H, [[0, '#5aa6c4'], [1, '#1f5f7a']]); ctx.fillRect(0, 860, W, H - 860); ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 60; i++) { const x = (i * 97) % W, y = 880 + (i * 53) % 1000; ctx.fillRect(x, y, 30 + (i % 4) * 14, 4); } } // sunlit lake

// ---------- POV cockpit ----------
function wheelHand(x, y, s, rot, side) { const sk = '#e6b99c'; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(side * s, s); // fist around the rim, back of the hand to us
  ctx.fillStyle = grad(-80, 0, 80, 0, [[0, '#2a3644'], [.5, '#3a4a5c'], [1, '#232e3a']]); rr(-75, 60, 150, 520, 50); ctx.fill(); // jacket sleeve
  const bh = new Path2D(); bh.moveTo(-70, 80); bh.bezierCurveTo(-90, 20, -80, -40, -60, -70); bh.lineTo(70, -60); bh.bezierCurveTo(90, -20, 85, 40, 65, 80); bh.closePath(); ctx.fillStyle = grad(-80, 0, 80, 0, [[0, shade(sk, .78)], [.45, shade(sk, 1.04)], [1, shade(sk, .8)]]); ctx.fill(bh);
  ctx.save(); ctx.clip(bh); ctx.strokeStyle = 'rgba(255,232,215,.35)'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-20 + i * 14, 70); ctx.quadraticCurveTo(-30 + i * 22, 0, -50 + i * 34, -60); ctx.stroke(); } ctx.restore();
  [[-52, 34], [-18, 36], [16, 35], [50, 30]].forEach(([fx, fw]) => { const p = fingerPath(fx, -62, fx - 4, -102, fw, fw * .96); fillFinger(p, fx, -62, fx - 4, -102, fw, sk, -1, .04); ctx.fillStyle = 'rgba(255,235,220,.45)'; ctx.beginPath(); ctx.ellipse(fx, -66, fw * .32, fw * .2, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(110,50,35,.35)'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(fx - 3, -84 + k * 6, fw * .26, .3, Math.PI - .3); ctx.stroke(); } softBlob(fx - 4, -104, fw * .5, 8, '0,0,0', .3); });
  const tp = fingerPath(66, 10, 30, -92, 44, 36); fillFinger(tp, 66, 10, 30, -92, 42, sk, 1); nailAt(34, -80, -.3, 22, 26); ctx.restore(); }
function cockpit(t, o = {}) { // windshield view is drawn by o.view(); then A-pillars, roof, dashboard, wheel, hands
  ctx.save(); ctx.beginPath(); ctx.moveTo(60, 260); ctx.lineTo(1020, 260); ctx.lineTo(1160, 1080); ctx.lineTo(-80, 1080); ctx.closePath(); ctx.clip(); ctx.save(); o.view && o.view(); ctx.restore();
  if (o.wet > 0) { ctx.fillStyle = `rgba(30,90,100,${.35 * o.wet})`; ctx.fillRect(0, 0, W, H); const R = rnd(12); for (let i = 0; i < 26; i++) { ctx.fillStyle = `rgba(220,245,255,${.35 * o.wet})`; ctx.beginPath(); ctx.ellipse(R() * W, 280 + R() * 760 + (t * 120 * R()) % 300, 6 + R() * 10, 12 + R() * 18, 0, 0, 7); ctx.fill(); } } // streaks on the glass
  ctx.restore();
  ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 280); ctx.lineTo(1020, 260); ctx.lineTo(60, 260); ctx.lineTo(0, 280); ctx.closePath(); ctx.fill(); // roof liner
  for (const [a, b, c, d] of [[0, 280, 60, 260], [1080, 280, 1020, 260]]) { ctx.fillStyle = '#1b1e24'; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.lineTo(c === 60 ? -80 : 1160, 1080); ctx.lineTo(a, 1200); ctx.closePath(); ctx.fill(); } // A-pillars
  ctx.fillStyle = '#0f1115'; rr(440, 270, 200, 70, 16); ctx.fill(); ctx.fillStyle = 'rgba(160,190,220,.25)'; rr(452, 280, 176, 50, 10); ctx.fill(); // mirror
  ctx.fillStyle = grad(0, 1040, 0, 1500, [[0, '#2a2e36'], [1, '#121418']]); ctx.beginPath(); ctx.moveTo(-40, 1100); ctx.quadraticCurveTo(540, 980, 1120, 1100); ctx.lineTo(1120, H); ctx.lineTo(-40, H); ctx.closePath(); ctx.fill(); // dashboard
  const warn = o.warn ? (Math.floor(t * 4) % 2 ? 1 : .3) : 0; ctx.fillStyle = '#05060a'; rr(330, 1160, 420, 170, 30); ctx.fill(); if (warn) { for (const [wx, col] of [[400, '#ff3b30'], [480, '#ffcc00'], [560, '#ff3b30'], [640, '#ff9500']]) { ctx.globalAlpha = warn; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(wx, 1245, 18, 0, 7); ctx.fill(); glow(wx, 1245, 60, col + '88'); ctx.globalAlpha = 1; } }
  else label(o.speed || '42', 540, 1270, 90, { weight: 900, color: '#e8f1ff', font: MONO });
  wheelPOV(t, o.wheelRot || 0, { noHands: o.noHands }); }
function sedanSide(x, y, s, rot, col = '#3a5a8a', o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); // generic sedan, nose to the right
  ctx.fillStyle = grad(0, -170, 0, 40, [[0, shade(col, 1.35)], [.5, col], [1, shade(col, .55)]]); ctx.beginPath(); ctx.moveTo(-320, 40); ctx.lineTo(-330, -30); ctx.quadraticCurveTo(-310, -72, -230, -80); ctx.lineTo(-130, -152); ctx.quadraticCurveTo(-60, -172, 60, -166); ctx.lineTo(150, -92); ctx.lineTo(280, -82); ctx.quadraticCurveTo(320, -70, 322, -20); ctx.lineTo(316, 40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = o.inner ? 'rgba(20,40,50,.9)' : 'rgba(170,210,255,.55)'; ctx.beginPath(); ctx.moveTo(-210, -84); ctx.lineTo(-125, -144); ctx.lineTo(-35, -148); ctx.lineTo(-35, -86); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-15, -86); ctx.lineTo(-15, -148); ctx.lineTo(50, -146); ctx.lineTo(125, -90); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-25, -84); ctx.lineTo(-25, 30); ctx.moveTo(-210, -80); ctx.lineTo(-215, 30); ctx.stroke(); ctx.fillStyle = '#c9ced6'; rr(-90, -60, 40, 10, 4); ctx.fill(); // door seams + handle
  for (const wx of [-205, 200]) { ctx.fillStyle = '#0b0b0d'; ctx.beginPath(); ctx.arc(wx, 40, 58, 0, 7); ctx.fill(); ctx.fillStyle = '#7a808a'; ctx.beginPath(); ctx.arc(wx, 40, 26, 0, 7); ctx.fill(); }
  ctx.fillStyle = o.tail ? `rgba(255,40,40,${.6 + .4 * Math.sin(o.t * 8)})` : '#7a1a1a'; rr(-334, -40, 16, 30, 4); ctx.fill(); if (o.tail) glow(-330, -25, 80, 'rgba(255,40,40,.5)'); ctx.restore(); }

// ---------- icons for the rule ----------
function iconBelt(x, y, s, col = '#fff') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, -60); ctx.lineTo(40, 50); ctx.moveTo(-60, 40); ctx.lineTo(60, 40); ctx.stroke(); ctx.fillStyle = col; rr(-20, 20, 50, 40, 8); ctx.fill(); ctx.restore(); }
function iconWindow(x, y, s, col = '#fff') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 14; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-60, 50); ctx.lineTo(-60, -10); ctx.lineTo(-20, -55); ctx.lineTo(60, -55); ctx.lineTo(60, 50); ctx.closePath(); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 30); ctx.moveTo(-18, 12); ctx.lineTo(0, 32); ctx.lineTo(18, 12); ctx.stroke(); ctx.restore(); }
function iconKid(x, y, s, col = '#fff') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -40, 24, 0, 7); ctx.fill(); rr(-26, -10, 52, 60, 16); ctx.fill(); ctx.fillRect(-22, 40, 16, 30); ctx.fillRect(6, 40, 16, 30); ctx.restore(); }
function iconUp(x, y, s, col = '#fff') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(55, -10); ctx.lineTo(20, -10); ctx.lineTo(20, 60); ctx.lineTo(-20, 60); ctx.lineTo(-20, -10); ctx.lineTo(-55, -10); ctx.closePath(); ctx.fill(); ctx.restore(); }
const RULE = () => [[L('SEATBELT', 'РЕМЕНЬ'), iconBelt], [L('WINDOW', 'ОКНО'), iconWindow], [L('CHILDREN', 'ДЕТИ'), iconKid], [L('OUT', 'НАРУЖУ'), iconUp]];
function stepBadge(n, txt, p) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(540, 300); ctx.scale(k, k); ctx.fillStyle = 'rgba(8,12,18,.82)'; rr(-330, -70, 660, 140, 70); ctx.fill(); ctx.fillStyle = OKG; ctx.beginPath(); ctx.arc(-260, 0, 52, 0, 7); ctx.fill(); label(String(n), -260, 22, 64, { weight: 900 });
  label(txt, 40, 24, 66, { weight: 900, spacing: 3 }); ctx.restore(); }
function timer60(sec, x = 540, y = 300, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(8,10,16,.75)'; rr(x - 190, y - 80, 380, 160, 40); ctx.fill(); label('0:' + String(Math.max(0, Math.ceil(sec))).padStart(2, '0'), x, y + 40, 120, { weight: 900, color: sec < 30 ? '#ff4d57' : '#fff', font: MONO }); ctx.restore(); }

// ---------- exterior ----------
function sinkingCut(t, wl, o = {}) { // half above / half below the water: the car floating nose-down
  ctx.drawImage(layer('lakeday', lakeDayDraw, 2), 0, 0); grade('rgba(40,60,90,1)', .15); waterBody(wl, t);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); sedanSide(560, wl + (o.dy ?? 40), 1.35, o.rot ?? .32, '#3a5a8a', { inner: true }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(0, wl, W, H - wl); ctx.clip(); ctx.fillStyle = 'rgba(20,90,110,.35)'; ctx.fillRect(0, wl, W, H - wl); ctx.restore(); bubbles(t, 700, wl + 300, 16, 3, 300); }
function shoreNight(t) { bg('#1a2238', '#06080f'); ctx.fillStyle = grad(0, 0, 0, 900, [[0, '#0f1630'], [1, '#3a3f5a']]); ctx.fillRect(0, 0, W, 900); glow(900, 300, 300, 'rgba(255,240,220,.15)');
  ctx.fillStyle = '#0c1018'; ctx.beginPath(); ctx.moveTo(0, 860); for (let x = 0; x <= W; x += 50) ctx.lineTo(x, 820 - Math.abs(Math.sin(x * .011 + 1)) * 110); ctx.lineTo(W, 900); ctx.lineTo(0, 900); ctx.closePath(); ctx.fill();
  for (const [hx, hy] of [[870, 790]]) { ctx.fillStyle = '#ffd27a'; ctx.fillRect(hx, hy, 10, 8); glow(hx + 5, hy + 4, 40, 'rgba(255,210,120,.8)'); } // one far-away window
  ctx.fillStyle = grad(0, 880, 0, 1300, [[0, '#1c2c44'], [1, '#0a121c']]); ctx.fillRect(0, 880, W, 420); waterBody(1080, t, { c1: '#1c3440', c2: '#0c1c24', c3: '#050a0e' });
  sedanSide(260, 1110, .5, .5, '#3a5a8a', { inner: true, tail: true, t }); ctx.fillStyle = '#1c3440'; ctx.fillRect(0, 1110, W, 200);
  ctx.fillStyle = grad(0, 1250, 0, H, [[0, '#2a2a26'], [1, '#121210']]); ctx.beginPath(); ctx.moveTo(0, 1320); ctx.quadraticCurveTo(540, 1220, W, 1300); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); snow(t, .6, 80, 8, .8); }

// ================== SCENES ==================
// ---------- hook: drive → skid → fence → flight → splash → sinking ----------
function roadView(t, turn, near, o = {}) { // country road by the river, seen through the windshield; turn: camera yaw (px), near: 0..1 approach to the fence
  ctx.save(); ctx.translate(-turn, 0); const hz = 640;
  ctx.fillStyle = grad(0, 0, 0, hz, [[0, '#5aa8ec'], [1, '#d4ecfa']]); ctx.fillRect(-600, 0, W + 1200, hz); glow(300, 180, 360, 'rgba(255,250,225,.75)');
  for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.ellipse(-300 + i * 380 + t * 10, 150 + (i % 2) * 70, 140, 36, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#3d6b45'; ctx.beginPath(); ctx.moveTo(-600, hz); for (let x = -600; x <= W + 600; x += 60) ctx.lineTo(x, hz - 50 - Math.abs(Math.sin(x * .012)) * 90); ctx.lineTo(W + 600, hz); ctx.closePath(); ctx.fill(); // far trees
  ctx.fillStyle = grad(0, hz, 0, H, [[0, '#7cae5a'], [1, '#4f8a3a']]); ctx.fillRect(-600, hz, W + 1200, H); // grass
  ctx.fillStyle = grad(0, hz, 0, H, [[0, '#7fc0d8'], [1, '#2f7f9a']]); ctx.beginPath(); ctx.moveTo(760, hz); ctx.lineTo(W + 600, hz); ctx.lineTo(W + 600, H); ctx.lineTo(1500, H); ctx.closePath(); ctx.fill(); // the river on the right
  ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 18; i++) { const q = ((i * .13 + t * .4) % 1), y = hz + q * q * 1200; ctx.fillRect(820 + q * 900 + (i % 3) * 30, y, 30 + q * 120, 3 + q * 4); } // sparkles
  ctx.fillStyle = '#4a4d52'; ctx.beginPath(); ctx.moveTo(500, hz); ctx.lineTo(580, hz); ctx.lineTo(1100, H); ctx.lineTo(-100, H); ctx.closePath(); ctx.fill(); // asphalt
  ctx.fillStyle = '#e8e6de'; for (let i = 0; i < 10; i++) { const q0 = ((i / 10 + t * 1.6) % 1), q1 = q0 + .045, y0 = hz + q0 * q0 * 1300, y1 = hz + q1 * q1 * 1300; ctx.beginPath(); ctx.moveTo(540 + (q0 * q0) * 10 - 3 - q0 * 8, y0); ctx.lineTo(540 + 3 + q0 * 8, y0); ctx.lineTo(540 + 4 + q1 * 14, y1); ctx.lineTo(540 - 4 - q1 * 14, y1); ctx.closePath(); ctx.fill(); } // centre dashes rushing at us
  // wooden fence along the river bank (posts converge to the horizon); grows as we head straight at it
  const fz = 1 + near * 5.5; ctx.save(); ctx.translate(900, hz + 40); ctx.scale(fz, fz); ctx.translate(-900, -(hz + 40));
  for (let k = 0; k < 14; k++) { const q = k / 13, x = lerp(1400, 640, Math.sqrt(q)), y = lerp(1500, hz + 8, Math.sqrt(q)), h = lerp(260, 14, Math.sqrt(q)), w = lerp(40, 3, Math.sqrt(q));
    if (o.broken && k < 3) continue; ctx.fillStyle = '#8a6440'; ctx.fillRect(x - w / 2, y - h, w, h); }
  ctx.strokeStyle = '#a27a4e'; ctx.lineCap = 'round'; for (const hh of [.45, .8]) { ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(o.broken ? 1180 : 1400, 1500 - 260 * hh + (o.broken ? 60 : 0)); ctx.lineTo(640, hz + 8 - 14 * hh); ctx.stroke(); } ctx.restore();
  ctx.restore(); }
function wheelPOV(t, rot, o = {}) { // light leather steering wheel with metal spokes; both hands wrap the rim at ~10 and ~2
  const cx = 540, cy = 1730, R = 430, rw = 76, col = '#c69a64';
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
  for (const a of [Math.PI * 1.5, Math.PI * .15, Math.PI * .85]) { ctx.save(); ctx.rotate(a); ctx.fillStyle = grad(-36, 0, 36, 0, [[0, '#5f646d'], [.5, '#e1e5ea'], [1, '#5f646d']]); rr(-36, 130, 72, R - 160, 18); ctx.fill(); ctx.restore(); } // spokes
  ctx.fillStyle = grad(0, -160, 0, 160, [[0, '#30343c'], [1, '#0d0e11']]); ctx.beginPath(); ctx.arc(0, 0, 160, 0, 7); ctx.fill(); ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, -10, 56, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.ellipse(-40, -70, 90, 40, -.4, 0, 7); ctx.fill(); // hub + generic emblem ring
  ctx.lineCap = 'butt'; ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = rw + 10; ctx.beginPath(); ctx.arc(6, 10, R, 0, 7); ctx.stroke(); // shadow
  ctx.strokeStyle = col; ctx.lineWidth = rw; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke(); ctx.strokeStyle = shade(col, .62); ctx.lineWidth = rw * .35; ctx.beginPath(); ctx.arc(0, 0, R + rw * .32, 0, 7); ctx.stroke(); ctx.strokeStyle = shade(col, .75); ctx.beginPath(); ctx.arc(0, 0, R - rw * .32, 0, 7); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,240,215,.45)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, 0, R + rw * .12, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.strokeStyle = 'rgba(60,35,15,.7)'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(0, 0, R - rw * .05, 0, 7); ctx.stroke(); ctx.setLineDash([]); // leather sheen + stitching
  ctx.restore();
  if (o.noHands) return;
  for (const [a0, sd] of [[Math.PI * 1.2, 1], [Math.PI * 1.8, -1]]) { const a = a0 + rot, px = cx + Math.cos(a) * R, py = cy + Math.sin(a) * R, ia = a + Math.PI, ox = Math.cos(a), oy = Math.sin(a);
    const bx = px + ox * 150, by = py + oy * 150; limb([bx, by + 30], [sd > 0 ? -120 : 1200, 2050], 92, 120, '#3a4a5c', sd > 0 ? 1 : -1); // forearm in the jacket sleeve
    ctx.fillStyle = '#2a3644'; ctx.beginPath(); ctx.ellipse(bx + ox * 30, by + oy * 30 + 20, 96, 70, a, 0, 7); ctx.fill(); // cuff
    ctx.save(); ctx.translate(px, py); ctx.rotate(ia); ctx.scale(1, sd); gripHand(rw); ctx.restore(); } }
function gripHand(rw) { const sk = '#e6b99c'; // local frame: +x = towards the wheel centre (fingers), -x = back of the hand outside the rim, thumb on -y
  const bh = new Path2D(); bh.moveTo(-150, -66); bh.bezierCurveTo(-90, -86, -30, -84, -6, -66); bh.lineTo(-6, 70); bh.bezierCurveTo(-40, 86, -110, 84, -160, 58); bh.bezierCurveTo(-185, 20, -182, -34, -150, -66); bh.closePath();
  ctx.fillStyle = grad(0, -80, 0, 80, [[0, shade(sk, 1.05)], [.55, sk], [1, shade(sk, .74)]]); ctx.fill(bh);
  ctx.save(); ctx.clip(bh); ctx.strokeStyle = 'rgba(255,232,215,.4)'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-160, -20 + i * 18); ctx.quadraticCurveTo(-90, -40 + i * 30, -14, -54 + i * 36); ctx.stroke(); } ctx.strokeStyle = 'rgba(110,140,190,.22)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-170, 10); ctx.bezierCurveTo(-120, -10, -80, 30, -40, 10); ctx.stroke(); ctx.restore(); // tendons + vein
  [[-50, 34], [-16, 36], [18, 35], [50, 30]].forEach(([fy, fw]) => { const x0 = -26, x1 = rw * .5 + 6, p = fingerPath(x0, fy, x1, fy + 3, fw, fw * .9); fillFinger(p, x0, fy, x1, fy + 3, fw, sk, -1, .05);
    ctx.fillStyle = 'rgba(255,235,220,.55)'; ctx.beginPath(); ctx.ellipse(x0 + 2, fy - 2, fw * .3, fw * .22, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(110,50,35,.35)'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(10 + k * 6, fy + 1, fw * .26, Math.PI * .5 + .4, Math.PI * 1.5 - .4); ctx.stroke(); }
    softBlob(x1 - 2, fy + 2, 10, fw * .45, '0,0,0', .45); }); // fingertips curl behind the rim
  const tp = fingerPath(-30, -64, 30, -112, 46, 36); fillFinger(tp, -30, -64, 30, -112, 44, sk, 1); nailAt(22, -104, -.7, 24, 28); } // thumb along the rim
function cockpitShell(t, o = {}) { // roof, pillars, mirror, dashboard (no wheel)
  ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 280); ctx.lineTo(1020, 260); ctx.lineTo(60, 260); ctx.lineTo(0, 280); ctx.closePath(); ctx.fill();
  for (const [a, b, c, d] of [[0, 280, 60, 260], [1080, 280, 1020, 260]]) { ctx.fillStyle = '#1b1e24'; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.lineTo(c === 60 ? -80 : 1160, 1080); ctx.lineTo(a, 1200); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#0f1115'; rr(440, 270, 200, 70, 16); ctx.fill(); ctx.fillStyle = 'rgba(160,190,220,.25)'; rr(452, 280, 176, 50, 10); ctx.fill();
  ctx.fillStyle = grad(0, 1040, 0, 1500, [[0, '#2e333c'], [1, '#121418']]); ctx.beginPath(); ctx.moveTo(-40, 1110); ctx.quadraticCurveTo(540, 990, 1120, 1110); ctx.lineTo(1120, H); ctx.lineTo(-40, H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 1112); ctx.quadraticCurveTo(540, 992, 1120, 1112); ctx.stroke();
  ctx.fillStyle = '#05060a'; rr(380, 1150, 320, 120, 26); ctx.fill(); if (o.warn) { for (const [wx, cl] of [[430, '#ff3b30'], [500, '#ffcc00'], [570, '#ff3b30'], [640, '#ff9500']]) { ctx.globalAlpha = Math.floor(t * 4) % 2 ? 1 : .3; ctx.fillStyle = cl; ctx.beginPath(); ctx.arc(wx, 1210, 16, 0, 7); ctx.fill(); ctx.globalAlpha = 1; } } else label(o.speed || '58', 540, 1236, 76, { weight: 900, color: '#e8f1ff', font: MONO }); }
function windshieldClip(fn) { ctx.save(); ctx.beginPath(); ctx.moveTo(60, 260); ctx.lineTo(1020, 260); ctx.lineTo(1160, 1080); ctx.lineTo(-80, 1080); ctx.closePath(); ctx.clip(); fn(); ctx.restore(); }
function cracks(cx, cy, k, seed = 3) { if (k <= 0) return; const R = rnd(seed); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2.5; for (let i = 0; i < 18; i++) { const a = R() * 6.28; let x = cx, y = cy; ctx.beginPath(); ctx.moveTo(x, y); for (let q = 0; q < 5; q++) { x += Math.cos(a + (R() - .5) * .7) * 70 * k; y += Math.sin(a + (R() - .5) * .7) * 70 * k; ctx.lineTo(x, y); } ctx.stroke(); }
  ctx.lineWidth = 1.5; for (let r = 1; r < 4; r++) { ctx.beginPath(); ctx.arc(cx, cy, r * 45 * k, 0, 7); ctx.stroke(); } }
function plank(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = grad(0, -16, 0, 16, [[0, '#b88c5c'], [1, '#7a5634']]); ctx.fillRect(-120, -16, 240, 32); ctx.strokeStyle = 'rgba(60,35,15,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-110, -8 + i * 8); ctx.lineTo(110, -6 + i * 8); ctx.stroke(); }
  ctx.fillStyle = '#e9d9b9'; ctx.beginPath(); ctx.moveTo(120, -16); ctx.lineTo(132, -6); ctx.lineTo(118, 2); ctx.lineTo(134, 10); ctx.lineTo(120, 16); ctx.closePath(); ctx.fill(); ctx.restore(); } // splintered end
function riverSide(t, wl) { // side view of the bank and the river
  ctx.fillStyle = grad(0, 0, 0, wl, [[0, '#5aa8ec'], [1, '#d8eefa']]); ctx.fillRect(0, 0, W, wl); glow(820, 260, 380, 'rgba(255,250,225,.7)');
  ctx.fillStyle = '#3d6b45'; ctx.beginPath(); ctx.moveTo(0, wl - 40); for (let x = 0; x <= W; x += 50) ctx.lineTo(x, wl - 70 - Math.abs(Math.sin(x * .013 + 2)) * 80); ctx.lineTo(W, wl); ctx.lineTo(0, wl); ctx.closePath(); ctx.fill(); // far bank trees
  ctx.fillStyle = grad(0, wl - 300, 0, H, [[0, '#7cae5a'], [.3, '#5a8a3a'], [1, '#3a2a1a']]); ctx.beginPath(); ctx.moveTo(-50, wl - 260); ctx.lineTo(330, wl - 260); ctx.quadraticCurveTo(380, wl - 200, 360, wl + 20); ctx.lineTo(300, H); ctx.lineTo(-50, H); ctx.closePath(); ctx.fill(); // our bank
  ctx.fillStyle = '#4a4d52'; ctx.fillRect(-50, wl - 290, 330, 34); ctx.fillStyle = '#8a6440'; for (const [px, br] of [[40, 0], [150, 0], [270, 1]]) { ctx.save(); ctx.translate(px, wl - 262); ctx.rotate(br ? .9 : 0); ctx.fillRect(-10, -120, 20, 120); ctx.restore(); } // road edge + broken fence
  waterBody(wl, t, { c1: '#3f97b0', c2: '#1a5a70', c3: '#08242e' }); }
function splashCrown(x, y, k, seed = 5) { if (k <= 0) return; const R = rnd(seed); ctx.save(); // white crown + flying drops + foam
  for (let i = 0; i < 70; i++) { const a = -Math.PI * (.08 + R() * .84), v = 500 + R() * 900, tt = k * (.6 + R() * .6), dx = Math.cos(a) * v * tt, dy = Math.sin(a) * v * tt + 1400 * tt * tt;
    ctx.fillStyle = `rgba(235,250,255,${.9 * (1 - k * .7)})`; ctx.beginPath(); ctx.ellipse(x + dx, y + dy, 6 + R() * 14, 10 + R() * 18, a, 0, 7); ctx.fill(); }
  const h = Math.sin(Math.PI * clamp(k * 1.3)) * 420; ctx.fillStyle = `rgba(230,248,255,${.85 * (1 - k * .5)})`; ctx.beginPath(); ctx.moveTo(x - 380, y); for (let i = 0; i <= 16; i++) { const q = i / 16, xx = x - 380 + q * 760, yy = y - h * Math.sin(Math.PI * q) * (.7 + .3 * Math.sin(i * 2.3)); ctx.lineTo(xx, yy); } ctx.lineTo(x + 380, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = `rgba(255,255,255,${.6 * (1 - k * .4)})`; ctx.beginPath(); ctx.ellipse(x, y + 10, 460 * (.6 + k), 50, 0, 0, 7); ctx.fill(); ctx.restore(); }
function sinkDepth(t, k) { // under the surface: the car goes down nose-first towards the river bed, headlights on, bubbles streaming
  bg('#0f4a5a', '#03121a'); waterBody(120 - k * 260, t, { c1: '#2f8aa0', c2: '#0f4252', c3: '#03121a' }); ctx.fillStyle = grad(0, 1500, 0, H, [[0, 'rgba(40,35,20,0)'], [1, '#2a2416']]); ctx.fillRect(0, 1500, W, 420);
  for (let i = 0; i < 9; i++) { ctx.strokeStyle = 'rgba(60,110,60,.7)'; ctx.lineWidth = 8; const bx = 60 + i * 120; ctx.beginPath(); ctx.moveTo(bx, H); ctx.quadraticCurveTo(bx + Math.sin(t * 2 + i) * 30, 1700, bx + Math.sin(t * 1.5 + i) * 40, 1560 + (i % 3) * 40); ctx.stroke(); } // weeds
  const cx = 560, cy = lerp(520, 1080, eio(k)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = grad(cx + 300, cy + 200, cx + 520, cy + 760, [[0, 'rgba(255,245,200,.35)'], [1, 'rgba(255,245,200,0)']]); ctx.beginPath(); ctx.moveTo(cx + 280, cy + 140); ctx.lineTo(cx + 760, cy + 700); ctx.lineTo(cx + 420, cy + 820); ctx.closePath(); ctx.fill(); ctx.restore(); // headlight beam
  sedanSide(cx, cy, 1.3, .55 + .1 * k, '#3a5a8a', { inner: true }); bubbles(t, cx - 60, cy - 80, 26, 7, 260); bubbles(t * 1.3, cx + 200, cy - 20, 14, 9, 120); grade('rgba(10,60,80,1)', .25); }
SC.hook = { // FRAME 0: from behind the wheel — the car skids, smashes the fence, flies off the bank, splashes down and sinks
  draw(t, d, P, E, s) { const tF = 1.05, tAir = 1.35, tHit = 2.25, tDown = 3.05, t1 = s.U(s.a + 1);
    if (t < tAir) { const near = eio(prog(t, .35, tF)), turn = eio(prog(t, .3, tF)) * 380, rot = t < .3 ? Math.sin(t * 9) * .03 : -lerp(0, .75, eio(prog(t, .3, .7))) + (t > .7 ? Math.sin(t * 30) * .06 : 0);
      ctx.save(); shake(t, t > tF ? 22 * (1 - prog(t, tF, tAir)) : (t > .3 ? 5 : 2)); ctx.translate(0, t > .3 ? Math.sin(t * 50) * 4 : 0);
      windshieldClip(() => { ctx.save(); ctx.translate(540, 640); ctx.rotate(-rot * .12); ctx.translate(-540, -640); roadView(t, turn, near, { broken: t > tF }); ctx.restore(); cracks(700, 560, eout(prog(t, tF, tF + .2))); });
      cockpitShell(t, { speed: String(Math.round(58 - prog(t, .3, tF) * 12)) }); wheelPOV(t, rot); ctx.restore();
      if (t > tF) { const q = prog(t, tF, tAir), R = rnd(14); for (let i = 0; i < 9; i++) plank(540 + (R() - .3) * 900 * (.3 + q * 1.4), 640 + (R() - .6) * 500 * (.3 + q * 1.2), .6 + q * 3 + R(), R() * 6 + q * (R() - .5) * 8); }
      bigTitle(L('INTO THE LAKE', 'В РЕКУ'), 300, prog(t, 0, .15), { size: 110, col: '#fff', glow: 'rgba(80,200,255,.6)' }); return; }
    if (t < tHit) { const q = prog(t, tAir, tHit), wl = 1180; ctx.save(); cam(lerp(420, 620, q), lerp(880, 1060, q), lerp(1.05, 1.15, q)); riverSide(t, wl);
      const x = lerp(250, 720, q), y = lerp(wl - 330, wl - 40, q * q) - Math.sin(Math.PI * q) * 160; ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 360 - i * 30, y - 60 + i * 26); ctx.lineTo(x - 560 - i * 40, y - 90 + i * 26); ctx.stroke(); } // speed streaks
      sedanSide(x, y, 1.0, lerp(.05, .75, q), '#3a5a8a'); const R = rnd(21); for (let i = 0; i < 7; i++) plank(x - 120 + (R() - .5) * 500 * (q + .3), y - 200 + (R() - .5) * 300 + q * 200, .5, R() * 6 + t * (R() - .5) * 6); ctx.restore();
      bigTitle(L('INTO THE LAKE', 'В РЕКУ'), 300, 1, { size: 110, col: '#fff', glow: 'rgba(80,200,255,.6)' }); return; }
    if (t < tDown) { const q = prog(t, tHit, tDown), wl = 1180; ctx.save(); cam(700, lerp(1060, 1000, q), 1.15); shake(t, 12 * (1 - q)); riverSide(t, wl); ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, W + 800, wl + 400); ctx.clip(); sedanSide(720 + q * 40, wl - 40 + q * 200, 1.0, .78 + q * .1, '#3a5a8a'); ctx.restore();
      splashCrown(720, wl, q); for (let r = 0; r < 3; r++) { ctx.strokeStyle = `rgba(255,255,255,${.5 * (1 - q)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(720, wl + 20, 200 + q * 600 + r * 120, 30 + q * 50, 0, 0, 7); ctx.stroke(); } ctx.restore();
      if (q < .25) { ctx.fillStyle = `rgba(255,255,255,${.5 * (1 - q * 4)})`; ctx.fillRect(0, 0, W, H); } bigTitle(L('INTO THE LAKE', 'В РЕКУ'), 300, 1, { size: 110, col: '#fff', glow: 'rgba(80,200,255,.6)' }); return; }
    sinkDepth(t, prog(t, tDown, d)); bigTitle(L('MOST PEOPLE GET THIS WRONG', 'ПОЧТИ ВСЕ ОШИБАЮТСЯ'), 300, prog(t, Math.max(t1, tDown), Math.max(t1, tDown) + .2), { size: L(70, 74), col: YEL2 }); },
  sfx(d) { return [[0, 'city', .25, { dur: 1.1 }], [.3, 'scratch', .45], [1.05, 'boom', .5], [1.05, 'creak', .45], [1.1, 'shatter', .35], [1.35, 'whoosh', .45], [2.25, 'boom', .45], [2.25, 'pour', .55], [2.3, 'rain', .3, { dur: .8 }], [3.05, 'drone', .35, { dur: d - 3.05 }], [3.05, 'bubble_pop', .3]]; }
};
function doorInside(t, wl, o = {}) { // the driver's door from inside: window with murky water outside rising, water jetting in at the seal, floor flooding
  bg('#20262e', '#0c0f13'); ctx.fillStyle = grad(0, 0, W, 0, [[0, '#2a323d'], [1, '#1c222a']]); ctx.fillRect(0, 0, W, H); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(255,255,255,.015)'; ctx.fillRect(0, i * 48, W, 2); } // door card texture
  ctx.save(); ctx.beginPath(); ctx.moveTo(90, 200); ctx.lineTo(990, 220); ctx.lineTo(990, 860); ctx.lineTo(90, 860); ctx.closePath(); ctx.clip(); ctx.drawImage(layer('lakeday', lakeDayDraw, 4), 0, -320); waterBody(wl, t, { c1: '#3f97b0', c2: '#1a5a70', c3: '#08242e' }); bubbles(t, 540, 860, 12, 3, 700);
  ctx.fillStyle = 'rgba(170,215,240,.18)'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(120, 220); ctx.lineTo(360, 220); ctx.lineTo(120, 600); ctx.closePath(); ctx.fill(); ctx.restore(); // glass reflection
  ctx.strokeStyle = '#11161c'; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(90, 200); ctx.lineTo(990, 220); ctx.lineTo(990, 860); ctx.lineTo(90, 860); ctx.closePath(); ctx.stroke();
  ctx.fillStyle = grad(0, 880, 0, 1500, [[0, '#333c48'], [1, '#1c222a']]); rr(60, 900, 960, 560, 40); ctx.fill(); ctx.fillStyle = '#c9ced6'; rr(640, 980, 200, 44, 18); ctx.fill(); ctx.fillStyle = '#11161c'; rr(300, 1080, 420, 150, 24); ctx.fill(); // armrest, handle, switches
  for (let k = 0; k < 5; k++) { const x = 160 + k * 180, q = (t * 3 + k * .3) % 1; ctx.fillStyle = `rgba(150,210,230,${.7 - q * .5})`; ctx.beginPath(); ctx.ellipse(x + q * 20, 1500 + q * 160, 8 + q * 10, 30 + q * 50, 0, 0, 7); ctx.fill(); } // jets through the door seal
  const fl = o.floor ?? .5; waterBody(1880 - fl * 420, t, { c1: '#4f8ea0', c2: '#2a5a68', c3: '#102a32' }); }
function childSeat(t, o = {}) { // back seat: a girl in her booster seat, crying, clutching a teddy bear; water climbing the rear windows
  bg('#1f252d', '#0a0c10'); const wl = o.wl ?? 700;
  for (const [x0, x1] of [[40, 300], [780, 1040]]) { ctx.save(); ctx.beginPath(); rr(x0, 240, x1 - x0, 520, 40); ctx.clip(); ctx.fillStyle = '#7fc0d8'; ctx.fillRect(x0, 240, x1 - x0, 520); waterBody(wl, t, { c1: '#3f97b0', c2: '#1a5a70', c3: '#08242e' }); ctx.restore(); ctx.strokeStyle = '#11161c'; ctx.lineWidth = 24; rr(x0, 240, x1 - x0, 520, 40); ctx.stroke(); } // rear side windows
  ctx.fillStyle = grad(0, 300, 0, 1500, [[0, '#3e4756'], [1, '#262c36']]); rr(120, 420, 840, 1200, 80); ctx.fill(); // bench back
  ctx.fillStyle = grad(0, 520, 0, 1500, [[0, '#2b2f37'], [1, '#15171b']]); ctx.beginPath(); ctx.moveTo(300, 1500); ctx.lineTo(260, 640); ctx.quadraticCurveTo(540, 470, 820, 640); ctx.lineTo(780, 1500); ctx.closePath(); ctx.fill(); // booster seat shell
  const P = [540, 1640, 900], u = P[2] / 100, hy = P[1] - 93.2 * u - 2.6 * u; person(P[0], P[1], P[2], KIDB({ fear: 1, mouth: .45 + .25 * Math.abs(Math.sin(t * 7)), shadow: false, tilt: .04 * Math.sin(t * 9) }));
  const ey = hy - .4 * u * 1.45; ctx.strokeStyle = 'rgba(200,230,255,.75)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const k of [-1, 1]) { const ex = P[0] + k * 2.3 * u * 1.45 * .9; ctx.beginPath(); ctx.moveTo(ex, ey + 18); ctx.quadraticCurveTo(ex + k * 6, ey + 70, ex + k * 2, ey + 110 + (t * 40) % 30); ctx.stroke(); } // tears
  const sy = P[1] - 81.5 * u; ctx.strokeStyle = '#b3262e'; ctx.lineWidth = 30; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(P[0] + k * 8 * u, sy); ctx.lineTo(P[0] + k * 4 * u, P[1] - 52 * u); ctx.stroke(); } ctx.fillStyle = '#9aa0a8'; rr(P[0] - 50, P[1] - 60 * u, 100, 60, 14); ctx.fill(); // harness + buckle
  ctx.fillStyle = grad(0, P[1] - 46 * u, 0, H, [[0, '#2b2f37'], [1, '#111317']]); rr(250, P[1] - 47 * u, 580, 700, 60); ctx.fill(); ctx.fillStyle = '#3a3f6a'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(P[0] + k * 80, P[1] - 40 * u, 78, 60, 0, 0, 7); ctx.fill(); } // seat cushion + her knees (she is sitting)
  ctx.save(); ctx.translate(P[0] + 20, P[1] - 50 * u); ctx.fillStyle = '#8a5a32'; for (const [bx, by, r] of [[0, 0, 110], [0, -150, 80], [-70, -210, 30], [70, -210, 30]]) { ctx.beginPath(); ctx.arc(bx, by, r, 0, 7); ctx.fill(); } ctx.fillStyle = '#c99a6a'; ctx.beginPath(); ctx.ellipse(0, -130, 34, 24, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(k * 28, -170, 8, 0, 7); ctx.fill(); } ctx.restore(); // teddy bear
  const sk = '#f0c8ae'; for (const k of [-1, 1]) { ctx.fillStyle = sk; ctx.beginPath(); ctx.ellipse(P[0] + 20 + k * 100, P[1] - 50 * u - 30, 34, 46, k * .4, 0, 7); ctx.fill(); } // little hands on the bear
  waterBody(1840 - (o.floor ?? .3) * 300, t, { c1: '#4f8ea0', c2: '#2a5a68', c3: '#102a32' }); grade('rgba(20,70,90,1)', .25); vign(.5); }
SC.doors = { // "The water is at your doors. You have about sixty seconds." — inside: the door, then the camera turns to the child in the back
  draw(t, d, P, E, s) { const t3 = s.U(s.b), kk = prog(t, 0, d);
    if (t < t3 - .05) { doorInside(t, lerp(820, 420, eio(prog(t, 0, t3))), { floor: lerp(.1, .4, kk) }); bigTitle(L('WATER AT THE DOORS', 'ВОДА У ДВЕРЕЙ'), 1180, prog(t, 0, .2), { size: 80, col: '#fff' }); return; }
    const w = prog(t, t3 - .05, t3 + .25); ctx.save(); ctx.translate((1 - eout(w)) * W * .9, 0); childSeat(t, { wl: lerp(620, 420, kk), floor: lerp(.3, .55, kk) }); ctx.restore();
    if (w < 1) { ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 40; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(0, 150 + i * 150); ctx.lineTo(W, 150 + i * 150); ctx.stroke(); } } // whip pan
    timer60(60 - (t - t3) * 2.5, 540, 300); },
  sfx(d, P, E, s) { return [[0, 'pour', .45], [0, 'drone', .3, { dur: d }], [s.U(s.b) - .05, 'whoosh', .4], [s.U(s.b), 'clock', .5, { dur: d - s.U(s.b) }], [s.U(s.b) + .2, 'heartbeat', .3, { dur: d - s.U(s.b) }]]; }
};
SC.choice = { // "Do you call 911 — or open the door? You have three seconds." + 3 s
  draw(t, d, P, E, s) { const tb = E(L('call', 'звонить'), 1, .3), tr = E(L('door', 'дверь'), 1, 1.4), ts = E(L('seconds', 'секунды'), 1, 1.0) + .25;
    const lvl = lerp(1040, 520, eio(prog(t, 0, d))); cockpit(t, { warn: true, noHands: true, view: () => { ctx.fillStyle = '#1d4a56'; ctx.fillRect(0, 0, W, H); waterBody(lvl, t); }, wet: .6 }); grade('rgba(10,20,30,1)', .3, 'source-over');
    const p1 = prog(t, tb - .1, tb + .2), p2 = prog(t, tr - .1, tr + .2), e = t - ts, ph = Math.sin(t * 7);
    choiceBtn(290, 1120, 460, L('CALL 911', 'ЗВОНИТЬ 112'), '#2f7de1', p1, { pulse: e > 0 ? 1 + .05 * Math.max(0, ph) : 1, fs: .3 }); choiceBtn(790, 1120, 460, L('OPEN THE DOOR', 'ОТКРЫТЬ ДВЕРЬ'), '#e08a1e', p2, { pulse: e > 0 ? 1 + .05 * Math.max(0, -ph) : 1, fs: .3 });
    if (e > 0) { const left = Math.max(0, 3 - e), n = Math.max(1, Math.ceil(left)); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, 470); dayRing(540, 300, 105, left / 3, YEL2); bigNum(String(n), 540, 300, 150, '#fff', { glow: 'rgba(255,210,80,.8)' }); }
    else bigTitle(L('YOUR MOVE', 'ВАШ ВЫБОР'), 300, prog(t, 0, .2), { size: 110, col: YEL2 }); },
  sfx(d, P, E) { const ts = E(L('seconds', 'секунды'), 1, 1.0) + .25; return [[E(L('call', 'звонить'), 1, .3) - .1, 'pop', .35], [E(L('door', 'дверь'), 1, 1.4) - .1, 'pop', .35], [ts, 'tick', .55], [ts + 1, 'tick', .55], [ts + 2, 'tick', .55], [ts, 'heartbeat', .35, { dur: 3 }], [0, 'pour', .25]]; }
};
SC.neither = { // "Neither."
  draw(t) { cockpit(t, { warn: true, noHands: true, view: () => { ctx.fillStyle = '#1d4a56'; ctx.fillRect(0, 0, W, H); waterBody(520, t); }, wet: .6 }); grade('rgba(10,20,30,1)', .45, 'source-over'); ctx.save(); shake(t, t < .3 ? 12 : 0);
    choiceBtn(290, 1120, 460, L('CALL 911', 'ЗВОНИТЬ 112'), '#2f7de1', 1, { fs: .3 }); choiceBtn(790, 1120, 460, L('OPEN THE DOOR', 'ОТКРЫТЬ ДВЕРЬ'), '#e08a1e', 1, { fs: .3 }); xMark(290, 1120, 110, prog(t, .05, .3)); xMark(790, 1120, 110, prog(t, .12, .37)); ctx.restore();
    bigTitle(L('NEITHER', 'НИ ТО, НИ ДРУГОЕ'), 600, prog(t, 0, .15), { size: L(150, 100), col: '#ff4d57', glow: 'rgba(255,40,50,.6)' }); },
  sfx() { return [[0, 'stamp', .55], [.05, 'boom', .35]]; }
};
SC.pressure = { // the door won't open against the water; the phone call burns the minute
  draw(t, d, P, E, s) { const tc = E(L('call', 'звонок'), 1, d * .6) - .1;
    if (t < tc) { bg('#0d2a33', '#05141a'); waterBody(260, t); ctx.save(); ctx.translate(540, 980); ctx.fillStyle = '#2c3e5a'; rr(-380, -420, 760, 840, 40); ctx.fill(); ctx.fillStyle = 'rgba(160,220,240,.25)'; rr(-330, -380, 660, 330, 24); ctx.fill(); ctx.fillStyle = '#c9ced6'; rr(150, 40, 140, 36, 14); ctx.fill(); ctx.restore(); // the door from outside, underwater
      for (let i = 0; i < 7; i++) { const y = 640 + i * 110, q = (t * 1.6 + i * .15) % 1; ctx.save(); ctx.translate(lerp(1060, 940, q), y); ctx.fillStyle = 'rgba(120,230,255,.85)'; ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(-90, 0); ctx.lineTo(0, 24); ctx.closePath(); ctx.fill(); ctx.fillRect(0, -10, 80, 20); ctx.restore(); } // pressure arrows
      ctx.save(); ctx.translate(Math.sin(t * 40) * 6, 0); wheelHand(700, 1050, .9, -1.4, 1); ctx.restore(); label(L('≈ 1 TON ON THE DOOR', '≈ 1 ТОННА НА ДВЕРЬ'), 540, 1340, 56, { weight: 900, color: AQUA });
      bigTitle(L("IT WON'T OPEN", 'НЕ ОТКРЫТЬ'), 300, prog(t, 0, .2), { size: 110, col: '#fff' }); return; }
    bg('#071a20', '#030a0d'); waterBody(200, t); const sk = prog(t, tc, d); ctx.save(); ctx.translate(540, lerp(760, 1180, sk)); ctx.rotate(sk * .8); ctx.fillStyle = '#111'; rr(-150, -300, 300, 600, 40); ctx.fill(); ctx.fillStyle = sk < .6 ? '#1d3a2a' : '#05070a'; rr(-134, -284, 268, 568, 30); ctx.fill();
    if (sk < .6) { label(L('calling 911…', 'вызов 112…'), 0, -120, 34, { weight: 800, color: '#bfffcf' }); label('00:0' + Math.floor(t * 3 % 10), 0, -60, 40, { weight: 900, color: '#fff', font: MONO }); } ctx.restore(); bubbles(t, 540, 1100, 18, 9, 200);
    timer60(60 - (t - tc) * 14 - 20, 540, 330); bigTitle(L('NO TIME FOR A CALL', 'НЕ ДО ЗВОНКА'), 470, prog(t, tc, tc + .2), { size: 70, col: '#ff4d57' }); },
  sfx(d, P, E) { const tc = E(L('call', 'звонок'), 1, d * .6) - .1; return [[0, 'drone', .3, { dur: d }], [.3, 'knock', .4], [.9, 'knock', .4], [tc, 'beeps', .3], [tc + .2, 'bubble_pop', .35]]; }
};
SC.belt = { // "Seatbelt off."
  draw(t, d) { bg('#4a5260', '#232830'); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 4; for (let x = 0; x < W; x += 26) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 300, H); ctx.stroke(); } grade('rgba(20,80,90,1)', .2); const k = eio(prog(t, .15, .55)); ctx.save(); ctx.translate(540, 900); ctx.scale(1.6, 1.6);
    ctx.strokeStyle = '#2a2d33'; ctx.lineWidth = 120; ctx.beginPath(); ctx.moveTo(-700, -900); ctx.lineTo(lerp(0, -500, k), lerp(0, -700, k)); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.lineWidth = 6; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(-700 + i * 18, -900); ctx.lineTo(lerp(0, -500, k) + i * 18, lerp(0, -700, k)); ctx.stroke(); } // the belt retracts
    ctx.fillStyle = grad(-130, 0, 130, 0, [[0, '#0c0d10'], [.5, '#2a2e35'], [1, '#0c0d10']]); rr(-130, 0, 260, 380, 40); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; rr(-110, 10, 60, 340, 30); ctx.fill(); ctx.fillStyle = '#d32f2f'; rr(-80, 40, 160, 70, 14); ctx.fill(); label(L('PRESS', 'НАЖАТЬ'), 0, 88, 32, { weight: 900 }); // buckle
    ctx.save(); ctx.translate(lerp(0, -260, k), lerp(-40, -360, k)); ctx.rotate(-k * .6); ctx.fillStyle = grad(-70, 0, 70, 0, [[0, '#8a9099'], [.5, '#eef1f5'], [1, '#8a9099']]); rr(-70, -100, 140, 120, 14); ctx.fill(); ctx.fillStyle = '#2a2d33'; rr(-40, -70, 80, 30, 8); ctx.fill(); ctx.restore(); ctx.restore();
    const pr = prog(t, 0, .2) - prog(t, .25, .4); bigFinger(560, lerp(700, 800, clamp(pr)), 1.2, '#e6b99c'); stepBadge(1, RULE()[0][0], prog(t, 0, .2)); },
  sfx() { return [[.15, 'click', .6], [.2, 'zipper', .35]]; }
};
SC.window = { // "Side window down — now, while the electrics still work."
  draw(t, d) { bg('#0d2a33', '#05141a'); const k = eio(prog(t, .3, d - .2)); ctx.fillStyle = '#26303c'; ctx.fillRect(0, 0, W, H); // door panel from inside
    ctx.save(); ctx.beginPath(); ctx.moveTo(80, 240); ctx.lineTo(1000, 240); ctx.lineTo(1000, 900); ctx.lineTo(80, 900); ctx.closePath(); ctx.clip(); ctx.drawImage(layer('lakeday', lakeDayDraw, 3), 0, -300); waterBody(780, t);
    ctx.fillStyle = 'rgba(160,210,240,.35)'; ctx.fillRect(80, lerp(240, 880, k), 920, 900); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(80, lerp(240, 880, k)); ctx.lineTo(1000, lerp(240, 880, k)); ctx.stroke(); ctx.restore(); // the glass slides down
    ctx.strokeStyle = '#11161c'; ctx.lineWidth = 40; ctx.strokeRect(80, 240, 920, 660); ctx.fillStyle = '#1a2129'; rr(300, 1150, 480, 200, 30); ctx.fill(); ctx.fillStyle = '#0d1116'; rr(360, 1190, 160, 120, 20); ctx.fill(); rr(560, 1190, 160, 120, 20); ctx.fill(); // window switches
    bigFinger(440, 1120 + (t > .25 ? 40 : 0), .85, '#e6b99c'); stepBadge(2, RULE()[1][0], prog(t, 0, .2)); label(L('WHILE POWER WORKS', 'ПОКА ЕСТЬ ПИТАНИЕ'), 540, 1010, 54, { weight: 900, color: YEL2, alpha: prog(t, .6, .9) }); },
  sfx(d) { return [[.25, 'click', .5], [.3, 'slide_down', .35], [.3, 'hum', .25, { dur: d - .5 }]]; }
};
SC.breakglass = { // "If it won't go down, break it near the corner. Not the windshield."
  draw(t, d, P, E, s) { const tw = s.U(s.b), hitT = .6;
    if (t < tw - .05) { bg('#0d2a33', '#05141a'); ctx.fillStyle = '#26303c'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.beginPath(); ctx.rect(80, 240, 920, 660); ctx.clip(); ctx.fillStyle = '#1d4a56'; ctx.fillRect(0, 0, W, H); waterBody(560, t); ctx.fillStyle = 'rgba(160,210,240,.3)'; ctx.fillRect(80, 240, 920, 660);
      if (t > hitT) { const R = rnd(4), q = eout(prog(t, hitT, hitT + .3)); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; for (let k = 0; k < 26; k++) { ctx.beginPath(); ctx.moveTo(900, 340); let px = 900, py = 340; const a = Math.PI * (.5 + R() * .6); for (let i = 0; i < 6; i++) { px += Math.cos(a + (R() - .5) * .6) * 120 * q; py += Math.sin(a + (R() - .5) * .6) * 120 * q; ctx.lineTo(px, py); } ctx.stroke(); } } ctx.restore();
      ctx.strokeStyle = '#11161c'; ctx.lineWidth = 40; ctx.strokeRect(80, 240, 920, 660); ctx.strokeStyle = YEL2; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(900, 340, 70 + 6 * Math.sin(t * 9), 0, 7); ctx.stroke(); // target the corner
      const sw = eio(prog(t, .1, hitT)); ctx.save(); ctx.translate(lerp(600, 900, sw), lerp(800, 360, sw)); ctx.rotate(-.7); ctx.fillStyle = '#d32f2f'; rr(-30, 0, 60, 220, 16); ctx.fill(); ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.lineTo(0, -50); ctx.closePath(); ctx.fill(); ctx.restore(); // window breaker
      bigTitle(L('HIT THE CORNER', 'БЕЙТЕ В УГОЛ'), 1150, prog(t, 0, .2), { size: 92, col: '#fff' }); return; }
    cockpit(t, { warn: true, noHands: true, view: () => { ctx.fillStyle = '#1d4a56'; ctx.fillRect(0, 0, W, H); waterBody(420, t); }, wet: .6 }); xMark(540, 650, 160, prog(t, tw, tw + .3)); bigTitle(L('NOT THE WINDSHIELD', 'НЕ ЛОБОВОЕ'), 300, prog(t, tw, tw + .2), { size: L(80, 100), col: '#ff4d57' }); },
  sfx(d, P, E, s) { return [[.55, 'glass', .55], [.6, 'shatter', .35], [s.U(s.b), 'soft_x', .4]]; }
};
SC.kids = { // "Kids out first, oldest first. Then you. Then swim up."
  draw(t, d, P, E, s) { const tyou = s.U(s.b - 1), tup = s.U(s.b);
    if (t < tyou - .05) { bg('#1d4a56', '#0b2228'); ctx.fillStyle = '#26303c'; ctx.fillRect(0, 0, W, 300); ctx.fillRect(0, 1300, W, H); ctx.fillStyle = '#2f3a48'; rr(60, 320, 960, 960, 40); ctx.fill(); // back seat through the open window
      const k = eio(prog(t, .3, tyou - .2)); ctx.save(); rr(60, 340, 230, 330, 30); ctx.clip(); ctx.fillStyle = '#1d4a56'; ctx.fillRect(0, 0, W, H); waterBody(520, t); ctx.restore(); ctx.strokeStyle = '#11161c'; ctx.lineWidth = 24; rr(60, 340, 230, 330, 30); ctx.stroke(); // the open side window
      ctx.fillStyle = '#3a4352'; for (const hx of [300, 760]) { rr(hx - 90, 560, 180, 120, 30); ctx.fill(); } rr(80, 680, 920, 420, 50); ctx.fill(); // rear bench + headrests
      person(lerp(470, 240, k), lerp(1330, 1020, k), 560, KIDA({ fear: .5, shadow: false, armUp: k })); person(740, 1360, 470, KIDB({ fear: .8, shadow: false })); ctx.fillStyle = '#2e3644'; rr(60, 1000, 960, 120, 40); ctx.fill(); ctx.fillStyle = '#26303c'; ctx.fillRect(0, 1100, W, 400);
      label(L('OLDEST FIRST', 'СТАРШИЙ ПЕРВЫМ'), 540, 1180, 64, { weight: 900, color: YEL2 }); stepBadge(3, RULE()[2][0], prog(t, 0, .2)); return; }
    bg('#0e3a46', '#041218'); waterBody(160, t, { c1: '#3a9aaa', c2: '#14505f', c3: '#04181e' }); sedanSide(560, 1680, 1.4, .3, '#3a5a8a', { inner: true }); bubbles(t, 540, 1450, 20, 5, 400);
    const q = eout(prog(t, tyou, d)); const sw = Math.sin(t * 6) * .25; ctx.save(); ctx.translate(540, lerp(1250, 760, q)); ctx.rotate(sw * .15); person(0, 0, 700, DRIVER({ shadow: false, armUp: .9 })); ctx.restore(); // swimming up towards the light
    for (const [x, y, h, C] of [[330, lerp(560, 160, q), 420, KIDA], [760, lerp(660, 220, q), 360, KIDB]]) { ctx.save(); ctx.translate(x, y + h); ctx.rotate(-sw * .15); person(0, 0, h, C({ shadow: false, armUp: .9 })); ctx.restore(); }
    if (t > tup - .05) stepBadge(4, RULE()[3][0], prog(t, tup - .05, tup + .2)); else label(L('THEN YOU', 'ПОТОМ ВЫ'), 540, 300, 80, { weight: 900, color: '#fff', alpha: prog(t, tyou, tyou + .2) }); },
  sfx(d, P, E, s) { return [[.3, 'whoosh', .3], [s.U(s.b - 1), 'bubble_pop', .3], [s.U(s.b), 'swoosh_up', .35]]; }
};
SC.rule = { // "Seatbelt. Window. Children. Out."
  draw(t, d, P, E, s) { bg('#0b2a33', '#041015'); glow(540, 900, 900, 'rgba(80,220,255,.2)'); const R = RULE();
    R.forEach(([txt, ic], i) => { const ti = s.U(s.a + i) - s.U(s.a), p = prog(t, ti - .05, ti + .2); if (p <= 0) return; const y = 520 + i * 250, k = eback(p); ctx.save(); ctx.translate(540, y); ctx.scale(k, k);
      ctx.fillStyle = 'rgba(255,255,255,.07)'; rr(-420, -95, 840, 190, 40); ctx.fill(); ctx.fillStyle = OKG; ctx.beginPath(); ctx.arc(-320, 0, 72, 0, 7); ctx.fill(); ic(-320, 0, .85); label(`${i + 1}. ${txt}`, -200, 30, 84, { align: 'left', weight: 900, spacing: 2 }); ctx.restore(); });
    label(L('REMEMBER THIS', 'ЗАПОМНИТЕ'), 540, 320, 70, { weight: 900, color: YEL2, alpha: prog(t, 0, .2) }); },
  sfx(d, P, E, s) { return [0, 1, 2, 3].map(i => [s.U(s.a + i) - s.U(s.a), 'pop', .45]); }
};
SC.cliff = { // "You made it out. But it's November, the water was ice cold, and the nearest house is a mile away." → hard cut
  draw(t, d, P, E, s) { const tb = s.U(s.b); shoreNight(t); ctx.save(); cam(540, 1100, lerp(1.0, 1.12, prog(t, 0, d))); person(560 + Math.sin(t * 60) * 2.5, 1780, 1150, DRIVER({ fear: .8, shrug: .25, tilt: .03 * Math.sin(t * 50) })); ctx.restore(); // shivering, soaked
    for (let i = 0; i < 2; i++) { const q = (t * .7 + i / 2) % 1; ctx.fillStyle = `rgba(230,240,255,${.25 * (1 - q)})`; ctx.beginPath(); ctx.arc(600 + q * 60, 780 - q * 80, 30 + q * 60, 0, 7); ctx.fill(); } // breath fog
    if (t < tb - .05) { bigTitle(L('YOU MADE IT OUT', 'ВЫ ВЫБРАЛИСЬ'), 300, prog(t, 0, .2), { size: 92, col: '#7dff9e' }); return; }
    const w1 = E(L('november', 'ноябрь'), 1, .6), w2 = E(L('cold', 'ледяная'), 1, 1.6), w3 = E(L('mile', 'километр'), 1, 2.8);
    label(L('NOVEMBER', 'НОЯБРЬ'), 540, 250, 70, { weight: 900, color: '#fff', alpha: prog(t, w1 - .1, w1 + .1) }); label(L('WATER: 4°C', 'ВОДА: +4°C'), 540, 350, 70, { weight: 900, color: AQUA, alpha: prog(t, w2 - .1, w2 + .1) });
    if (t > w3 - .1) { ctx.strokeStyle = YEL2; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(620, 700); ctx.quadraticCurveTo(780, 600, 870, 795); ctx.stroke(); ctx.setLineDash([]); label(L('1 MILE', '1 КМ'), 800, 620, 56, { weight: 900, color: YEL2, alpha: prog(t, w3 - .1, w3 + .1) }); } },
  sfx(d) { return [[0, 'wind', .45, { dur: d }], [0, 'heartbeat', .25, { dur: d }]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .2) drawSubs(t); };
