// ===== RU Short: "Дальний свет" — a lorry chases her all night, and that is why she is alive (story, no real dates/places) =====
const MAR = (o = {}) => Object.assign({ fem: true, top: '#7a3346', pants: '#2a2f3a', hair: '#5a3424', skin: '#ecc2a8', eyes: '#4f6b5a', light: -1 }, o);
const TDRV = (o = {}) => Object.assign({ heavy: 1, top: '#6b3b2a', pants: '#2c3442', hair: '#3a2a1a', skin: '#d9a583', cap: false, age: .4, light: 1 }, o);
const SV_CAR = '#9aa1ab';
// flash intensity: sharp attack, ~0.45 s decay, for a list of start times
const flashAt = (t, ts, d = .45) => ts.reduce((m, f) => t >= f && t < f + d ? Math.max(m, Math.min(1, (t - f) / .04) * Math.pow(1 - (t - f) / d, 1.5)) : m, 0);

function nightSky(seed = 3) { ctx.fillStyle = grad(0, 0, 0, 1150, [[0, '#03060f'], [.7, '#0b1430'], [1, '#18234a']]); ctx.fillRect(0, 0, W, 1200); const R = rnd(seed); for (let i = 0; i < 90; i++) { ctx.fillStyle = `rgba(255,255,255,${.2 + R() * .6})`; ctx.fillRect(R() * W, R() * 800, 2, 2); }
  ctx.fillStyle = '#e9eef7'; ctx.beginPath(); ctx.arc(860, 230, 46, 0, 7); ctx.fill(); glow(860, 230, 220, 'rgba(180,200,255,.25)'); }
function pine(x, y, h, col) { ctx.fillStyle = col; ctx.fillRect(x - h * .025, y - h * .25, h * .05, h * .25); for (let i = 0; i < 4; i++) { const yy = y - h * (.18 + i * .2), w = h * (.3 - i * .06); ctx.beginPath(); ctx.moveTo(x - w, yy); ctx.lineTo(x, yy - h * .32); ctx.lineTo(x + w, yy); ctx.closePath(); ctx.fill(); } }
function forestBand(t, y, speed, seed, col, h, gap = 140) { const off = ((t * speed) % gap + gap) % gap, R = rnd(seed); const hs = []; for (let i = 0; i < 20; i++) hs.push(.7 + R() * .5);
  const n0 = Math.floor(t * speed / gap); for (let i = -1; i < W / gap + 2; i++) { const k = ((i + n0) % 20 + 20) % 20; pine(i * gap - off, y, h * hs[k], col); } }

// ---------- side view: night forest road, her car ahead, the lorry behind ----------
function roadSide(t, o = {}) { const fl = o.fl || 0, sp = o.speed ?? 1; nightSky(); forestBand(t, 1160, 60 * sp, 4, '#0b1426', 420, 120); ctx.fillStyle = '#070b14'; ctx.fillRect(0, 1100, W, 70); forestBand(t, 1170, 260 * sp, 9, '#05080f', 640, 170);
  ctx.fillStyle = grad(0, 1160, 0, 1340, [[0, '#14161c'], [1, '#202329']]); ctx.fillRect(0, 1160, W, 180); ctx.fillStyle = 'rgba(230,230,230,.55)'; const dOff = (t * 900 * sp) % 220; for (let x = -dOff; x < W; x += 220) ctx.fillRect(x, 1246, 120, 8);
  ctx.fillStyle = grad(0, 1340, 0, H, [[0, '#0b0f0c'], [1, '#040605']]); ctx.fillRect(0, 1340, W, H - 1340); ctx.strokeStyle = 'rgba(80,110,70,.18)'; ctx.lineWidth = 3; const gOff = (t * 1400 * sp) % 60; for (let x = -gOff; x < W; x += 60) for (let r = 0; r < 4; r++) { ctx.beginPath(); ctx.moveTo(x + r * 13, 1360 + r * 120); ctx.lineTo(x + r * 13 - 40, 1360 + r * 120); ctx.stroke(); } // grass streaks
  const cx = o.carX ?? 700; sedanSide(cx, 1268, .95, Math.sin(t * 9) * .003, SV_CAR, { tail: true, t }); glow(cx + 300, 1230, 260, 'rgba(255,240,200,.35)'); // her headlights ahead
  if (o.truck !== false) { const tx = o.truckX ?? 260; ctx.save(); ctx.translate(tx, 0); ctx.scale(-1, 1); truckSide(0, 1300, .82, -t, { tilt: o.brake ? -.02 : 0 }); ctx.restore(); if (fl > 0) { glow(tx + 10, 1155, 300 + 900 * fl, `rgba(255,250,225,${.9 * fl})`); ctx.fillStyle = `rgba(255,252,235,${.35 * fl})`; ctx.fillRect(0, 0, W, H); } }
  vign(.45); }

// ---------- through the windshield (camera on the bonnet): Marina at the wheel, the rear window behind her ----------
function carFront(t, o = {}) { const fl = o.fl || 0, sh = clamp(o.sh || 0); ctx.fillStyle = '#04060a'; ctx.fillRect(0, 0, W, H);
  ctx.save(); rr(240, 420, 600, 330, 70); ctx.clip(); ctx.fillStyle = grad(0, 420, 0, 750, [[0, '#0a1020'], [1, '#141a2a']]); ctx.fillRect(240, 420, 600, 330); for (const k of [-1, 1]) glow(540 + k * 95, 610, 60 + 420 * fl + (o.base ?? 30), `rgba(255,248,220,${.55 + .45 * fl})`); ctx.restore(); // the lorry's lights in her rear window
  ctx.fillStyle = grad(0, 740, 0, 1150, [[0, '#191c23'], [1, '#0c0d11']]); ctx.beginPath(); ctx.moveTo(180, 1150); ctx.lineTo(210, 760); ctx.quadraticCurveTo(540, 720, 870, 760); ctx.lineTo(900, 1150); ctx.closePath(); ctx.fill(); // back seat
  for (const hx of [320, 760]) { ctx.fillStyle = '#1e2129'; rr(hx - 70, 690, 140, 110, 40); ctx.fill(); }
  if (sh > 0) { const hy = lerp(1060, 700, eout(sh)); ctx.save(); ctx.fillStyle = '#020203'; ctx.beginPath(); ctx.ellipse(330, hy, 78, 92, -.1, 0, 7); ctx.fill(); rr(220, hy + 70, 230, 400, 90); ctx.fill(); // the man rising behind her
    if (fl > .05) { ctx.strokeStyle = `rgba(255,250,230,${.5 * fl})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(330, hy, 80, 94, -.1, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); } ctx.restore(); }
  ctx.fillStyle = '#20232b'; rr(360, 800, 360, 900, 90); ctx.fill(); ctx.fillStyle = '#262a33'; rr(450, 640, 180, 150, 50); ctx.fill(); // her seat
  ctx.save(); if (o.shakeAmt) shake(t, o.shakeAmt); person(540, 2120, 1450, MAR({ fear: o.fear || 0, mouth: o.mouth || 0, shadow: false, tilt: o.tilt || 0 })); ctx.restore();
  glow(540, 1350, 600, 'rgba(70,130,255,.16)'); if (fl > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,248,225,${.22 * fl})`; ctx.fillRect(0, 0, W, H); ctx.restore(); glow(540, 600, 700 * fl, `rgba(255,250,230,${.35 * fl})`); }
  ctx.strokeStyle = '#121419'; ctx.lineWidth = 50; ctx.beginPath(); ctx.ellipse(540, 1330, 300, 115, 0, Math.PI * 1.02, Math.PI * 1.98); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(540, 1312, 300, 112, 0, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); // steering wheel
  for (const [hx, k] of [[300, 1], [780, -1]]) { ctx.fillStyle = grad(hx - 50, 0, hx + 50, 0, [[0, '#c99c82'], [.5, '#ecc2a8'], [1, '#c39278']]); rr(hx - 52, 1250, 104, 92, 40); ctx.fill(); ctx.strokeStyle = 'rgba(120,60,45,.4)'; ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(hx - 52 + i * 26, 1256); ctx.lineTo(hx - 52 + i * 26, 1300); ctx.stroke(); } ctx.fillStyle = 'rgba(255,230,215,.4)'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(hx - 39 + i * 26, 1262, 9, 6, 0, 0, 7); ctx.fill(); } } // hands on the rim (knuckles)
  ctx.fillStyle = grad(0, 1380, 0, H, [[0, '#1a1d24'], [1, '#07080b']]); ctx.beginPath(); ctx.moveTo(0, 1440); ctx.quadraticCurveTo(540, 1360, W, 1440); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); for (const gx of [400, 680]) { ctx.strokeStyle = 'rgba(80,200,255,.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(gx, 1500, 50, Math.PI * .8, Math.PI * 2.2); ctx.stroke(); glow(gx, 1500, 90, 'rgba(60,170,255,.2)'); }
  ctx.fillStyle = '#020305'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 330); ctx.quadraticCurveTo(540, 250, 0, 330); ctx.closePath(); ctx.fill(); for (const k of [0, 1]) { ctx.beginPath(); if (!k) { ctx.moveTo(0, 300); ctx.lineTo(150, 320); ctx.lineTo(70, 1440); ctx.lineTo(0, 1460); } else { ctx.moveTo(W, 300); ctx.lineTo(W - 150, 320); ctx.lineTo(W - 70, 1440); ctx.lineTo(W, 1460); } ctx.closePath(); ctx.fill(); } // roof + A-pillars
  ctx.save(); ctx.globalAlpha = .06; ctx.fillStyle = '#cfe0ff'; ctx.beginPath(); ctx.moveTo(150, 330); ctx.lineTo(330, 330); ctx.lineTo(120, 1300); ctx.lineTo(80, 1300); ctx.closePath(); ctx.fill(); ctx.restore(); vign(.5); }

// ---------- rear-view mirror close-up: her eyes + the lights behind ----------
function mirrorCU(t, fl, o = {}) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#04060c'], [1, '#0a0e18']]); ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 6; i++) ctx.fillRect(530, 1250 + i * 120 - (t * 400) % 120, 20, 60); // road ahead, dim
  ctx.fillStyle = '#0c0d10'; ctx.fillRect(515, 0, 50, 760); ctx.fillStyle = '#141519'; rr(90, 700, 900, 380, 70); ctx.fill();
  ctx.save(); rr(115, 725, 850, 330, 54); ctx.clip(); ctx.fillStyle = '#0b0e16'; ctx.fillRect(115, 725, 850, 330);
  ctx.save(); ctx.translate(360, 910); ctx.scale(1.9, 1.9); ctx.translate(-540, -800); person(540, 2120, 1450, MAR({ fear: o.fear ?? .5, shadow: false })); ctx.restore(); // her eyes in the mirror
  ctx.fillStyle = 'rgba(8,10,16,.35)'; ctx.fillRect(115, 725, 850, 330); for (const k of [-1, 1]) glow(800 + k * 70, 880, 70 + 700 * fl, `rgba(255,248,220,${.6 + .4 * fl})`);
  if (o.sh) { ctx.fillStyle = '#020203'; const hy = lerp(1120, 900, eout(o.sh)); ctx.beginPath(); ctx.ellipse(650, hy, 70, 84, 0, 0, 7); ctx.fill(); rr(560, hy + 60, 190, 200, 60); ctx.fill(); }
  if (fl > 0) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,250,230,${.55 * fl})`; ctx.fillRect(115, 725, 850, 330); ctx.globalCompositeOperation = 'source-over'; }
  ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(200, 725); ctx.lineTo(330, 725); ctx.lineTo(220, 1055); ctx.lineTo(90, 1055); ctx.closePath(); ctx.fill(); ctx.restore();
  if (fl > 0) { glow(800, 880, 300 + 900 * fl, `rgba(255,250,230,${.5 * fl})`); ctx.fillStyle = `rgba(255,252,240,${.25 * fl})`; ctx.fillRect(0, 0, W, H); } vign(.45); }

// ---------- petrol station at night ----------
function gasDraw() { nightSky(7); forestBand(0, 1150, 0, 12, '#060a12', 560, 150);
  ctx.fillStyle = '#d9dde3'; rr(-40, 520, 820, 110, 10); ctx.fill(); ctx.fillStyle = '#c8302c'; ctx.fillRect(-40, 600, 820, 30); ctx.fillStyle = '#fffbe6'; for (let i = 0; i < 6; i++) rr(20 + i * 130, 632, 90, 14, 6), ctx.fill(); // canopy
  for (const px of [120, 640]) { ctx.fillStyle = '#b9bec7'; ctx.fillRect(px - 18, 640, 36, 620); }
  ctx.fillStyle = grad(0, 640, 0, 1260, [[0, 'rgba(255,250,225,.35)'], [1, 'rgba(255,250,225,.05)']]); ctx.beginPath(); ctx.moveTo(-40, 646); ctx.lineTo(780, 646); ctx.lineTo(900, 1260); ctx.lineTo(-100, 1260); ctx.closePath(); ctx.fill(); // light falling from the canopy
  ctx.fillStyle = '#2a2f38'; ctx.fillRect(760, 700, 330, 560); ctx.fillStyle = grad(0, 760, 0, 1100, [[0, '#ffe7b0'], [1, '#f2c77a']]); ctx.fillRect(790, 780, 260, 300); ctx.strokeStyle = '#1a1d22'; ctx.lineWidth = 8; ctx.strokeRect(790, 780, 260, 300); ctx.beginPath(); ctx.moveTo(920, 780); ctx.lineTo(920, 1080); ctx.stroke(); // shop + window
  ctx.fillStyle = '#c8302c'; rr(790, 640, 260, 90, 14); ctx.fill(); label('АЗС 24', 920, 702, 54, { weight: 900 }); glow(920, 690, 240, 'rgba(255,60,50,.25)');
  ctx.fillStyle = '#e8eaee'; rr(240, 900, 110, 330, 16); ctx.fill(); ctx.fillStyle = '#1b2a3a'; rr(258, 930, 74, 60, 8); ctx.fill(); ctx.fillStyle = '#7cf0a0'; ctx.fillRect(268, 945, 54, 10); ctx.fillStyle = '#c8302c'; ctx.fillRect(240, 1010, 110, 30); // pump
  ctx.fillStyle = grad(0, 1260, 0, H, [[0, '#2b2e35'], [1, '#0d0f12']]); ctx.fillRect(0, 1260, W, H - 1260); glow(380, 1300, 520, 'rgba(255,245,210,.18)'); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(0, 1262, W, 6); }
function gasStation(t, o = {}) { ctx.drawImage(layer('gas', gasDraw, 1), 0, 0); const cx = o.carX ?? 560; sedanSide(cx, 1330, .95, 0, SV_CAR, {});
  if (o.cashier !== false) { person(985, 1230, 300, { top: '#3a5a7a', hair: '#2a1a12', skin: '#e2b08e', shadow: false }); }
  if (o.marina === 'pump') { ctx.strokeStyle = '#111'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(300, 1050); ctx.quadraticCurveTo(250, 1250, 290, 1200); ctx.stroke(); personSide(250, 1345, 720, MAR({ walk: 0 })); }
  if (o.marina === 'inside') person(870, 1230, 330, MAR({ shadow: false }));
  if (o.figure != null) { const f = o.figure; ctx.save(); ctx.globalAlpha = o.figA ?? 1; personSide(lerp(-120, cx - 230, clamp(f * 1.3)), 1345, 720, { silhouette: true, color: '#020203', walk: f < .75 ? t * 9 : 0 }); ctx.restore(); } }

// ---------- the road ahead in her headlights ----------
function roadAhead(t, o = {}) { const sp = o.speed ?? 1; nightSky(5); ctx.fillStyle = '#04070d'; ctx.fillRect(0, 760, W, H - 760);
  for (const side of [-1, 1]) for (let i = 0; i < 9; i++) { const z = ((i / 9 + t * .35 * sp) % 1), s = .12 + z * z * 2.6, x = 540 + side * (90 + z * z * 900), y = 790 + z * z * 900; pine(x, y, 300 * s, `rgba(6,10,16,${.6 + z * .4})`); }
  ctx.fillStyle = grad(0, 780, 0, H, [[0, '#121419'], [1, '#2a2c31']]); ctx.beginPath(); ctx.moveTo(515, 780); ctx.lineTo(565, 780); ctx.lineTo(1500, H); ctx.lineTo(-420, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,240,200,.18)'; ctx.beginPath(); ctx.moveTo(500, 900); ctx.lineTo(580, 900); ctx.lineTo(1200, H); ctx.lineTo(-120, H); ctx.closePath(); ctx.fill(); // headlight wash
  for (let i = 0; i < 8; i++) { const z = ((i / 8 + t * 1.1 * sp) % 1), y = 780 + z * z * 1140, w = 4 + z * z * 34, h = 10 + z * z * 120; ctx.fillStyle = 'rgba(240,240,240,.8)'; ctx.fillRect(540 - w / 2, y, w, h); }
  if (o.sign) { const z = clamp(o.sign), s = .2 + z * z * 2.2, x = 560 + z * z * 520, y = 800 + z * z * 520; ctx.fillStyle = '#6b6f76'; ctx.fillRect(x - 6 * s, y - 40 * s, 12 * s, 260 * s); ctx.fillStyle = '#0d6b3a'; rr(x - 150 * s, y - 160 * s, 300 * s, 130 * s, 10 * s); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 4 * s; rr(x - 140 * s, y - 150 * s, 280 * s, 110 * s, 8 * s); ctx.stroke();
    label('Сосновка', x, y - 108 * s, 34 * s, { weight: 800 }); label('40 км', x, y - 62 * s, 40 * s, { weight: 900 }); }
  if (o.car) { const cx = 540, cy = 1520; ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.beginPath(); ctx.ellipse(cx, cy + 120, 340, 40, 0, 0, 7); ctx.fill(); ctx.fillStyle = grad(0, cy - 230, 0, cy + 110, [[0, shade(SV_CAR, 1.1)], [1, shade(SV_CAR, .45)]]); rr(cx - 320, cy - 120, 640, 230, 60); ctx.fill(); ctx.fillStyle = shade(SV_CAR, .8); ctx.beginPath(); ctx.moveTo(cx - 240, cy - 110); ctx.lineTo(cx - 180, cy - 250); ctx.lineTo(cx + 180, cy - 250); ctx.lineTo(cx + 240, cy - 110); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#0b0e14'; ctx.beginPath(); ctx.moveTo(cx - 205, cy - 118); ctx.lineTo(cx - 160, cy - 230); ctx.lineTo(cx + 160, cy - 230); ctx.lineTo(cx + 205, cy - 118); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e9e9e9'; rr(cx - 80, cy, 160, 44, 6); ctx.fill(); label('М 410 ТК', cx, cy + 34, 30, { weight: 900, color: '#111' });
    for (const k of [-1, 1]) { ctx.fillStyle = '#ff2a2a'; rr(cx + k * 250 - 50, cy - 70, 100, 40, 10); ctx.fill(); glow(cx + k * 250, cy - 50, 140, 'rgba(255,40,40,.55)'); } }
  vign(.5); }

// ---------- from the back seat: the lorry's grille fills her rear window ----------
function rearWindow(t, fl) { ctx.fillStyle = '#030406'; ctx.fillRect(0, 0, W, H); ctx.save(); rr(120, 460, 840, 560, 90); ctx.clip(); ctx.fillStyle = '#0d0f14'; ctx.fillRect(120, 460, 840, 560); ctx.save(); shake(t, 3);
  ctx.fillStyle = grad(0, 460, 0, 1020, [[0, '#3a4048'], [1, '#1a1d22']]); ctx.fillRect(100, 430, 880, 620); ctx.fillStyle = '#0a0b0e'; for (let i = 0; i < 9; i++) ctx.fillRect(170 + i * 85, 560, 46, 300); ctx.fillStyle = '#c9ced6'; ctx.fillRect(150, 540, 780, 18); ctx.fillRect(150, 860, 780, 18); // chrome grille
  for (const k of [-1, 1]) { ctx.fillStyle = '#fff8dc'; rr(540 + k * 330 - 70, 900, 140, 80, 20); ctx.fill(); glow(540 + k * 330, 940, 200 + 700 * fl, `rgba(255,250,225,${.7 + .3 * fl})`); } ctx.restore(); ctx.restore();
  ctx.fillStyle = '#14161b'; for (const hx of [300, 780]) { rr(hx - 130, 1080, 260, 210, 70); ctx.fill(); } ctx.fillRect(0, 1030, W, 60); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(120, 1030, 840, 6);
  if (fl > 0) { ctx.fillStyle = `rgba(255,252,240,${.5 * fl})`; ctx.fillRect(0, 0, W, H); } vign(.4); }

// ---------- her hands on the wheel, the speedometer climbing ----------
function wheelShot(t, speed, fl) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); windshieldClip(() => roadAhead(t, { speed: 1.6 })); cockpitShell(t); glow(540, 305, 60 + 300 * fl, `rgba(255,250,225,${.6 + .4 * fl})`); // lights in her mirror
  ctx.save(); ctx.fillStyle = '#05070a'; ctx.beginPath(); ctx.arc(540, 1205, 120, 0, 7); ctx.fill(); ctx.strokeStyle = '#2a2f38'; ctx.lineWidth = 8; ctx.stroke(); for (let i = 0; i <= 10; i++) { const a = Math.PI * .75 + i / 10 * Math.PI * 1.5; ctx.strokeStyle = i > 7 ? '#ff4d4d' : '#9fdcff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(540 + Math.cos(a) * 96, 1205 + Math.sin(a) * 96); ctx.lineTo(540 + Math.cos(a) * 112, 1205 + Math.sin(a) * 112); ctx.stroke(); }
  const a = Math.PI * .75 + clamp(speed / 200) * Math.PI * 1.5; ctx.strokeStyle = '#ff5a3a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(540, 1205); ctx.lineTo(540 + Math.cos(a) * 95, 1205 + Math.sin(a) * 95); ctx.stroke(); label(String(Math.round(speed)), 540, 1255, 40, { weight: 900, color: '#fff', font: MONO }); ctx.restore();
  wheelPOV(t, Math.sin(t * 3) * .04); if (fl > 0) { ctx.fillStyle = `rgba(255,252,240,${.3 * fl})`; ctx.fillRect(0, 0, W, H); } }

// ---------- inside the lorry: the driver, staring forward ----------
function truckCab(t) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#06080e'], [1, '#0e1118']]); ctx.fillRect(0, 0, W, H); for (const k of [-1, 1]) glow(540 + k * 380, 470, 90, 'rgba(255,40,40,.35)'); // her tail-lights far ahead (seen past him)
  ctx.save(); cam(540, 830, 1.85); person(540, 2200, 1600, TDRV({ shadow: false, brow: -.7 })); ctx.restore(); glow(540, 1500, 700, 'rgba(255,150,60,.18)');
  ctx.strokeStyle = '#0b0c0f'; ctx.lineWidth = 70; ctx.beginPath(); ctx.ellipse(540, 1700, 520, 220, 0, Math.PI, 0); ctx.stroke(); ctx.fillStyle = '#050608'; ctx.fillRect(0, 0, W, 180); ctx.fillRect(0, 0, 90, H); ctx.fillRect(W - 90, 0, 90, H); vign(.5); }

// ---------- her house at night ----------
function homeDraw() { nightSky(9); forestBand(0, 1120, 0, 15, '#060a12', 520, 160); ctx.fillStyle = '#3a3b42'; ctx.fillRect(140, 620, 800, 520); ctx.fillStyle = '#24252b'; ctx.beginPath(); ctx.moveTo(100, 630); ctx.lineTo(540, 380); ctx.lineTo(980, 630); ctx.closePath(); ctx.fill();
  for (const [wx, wy] of [[230, 700], [700, 700], [230, 900], [700, 900]]) { ctx.fillStyle = grad(0, wy, 0, wy + 150, [[0, '#ffd890'], [1, '#e8a85a']]); ctx.fillRect(wx, wy, 150, 150); ctx.strokeStyle = '#1a1b20'; ctx.lineWidth = 8; ctx.strokeRect(wx, wy, 150, 150); ctx.beginPath(); ctx.moveTo(wx + 75, wy); ctx.lineTo(wx + 75, wy + 150); ctx.moveTo(wx, wy + 75); ctx.lineTo(wx + 150, wy + 75); ctx.stroke(); glow(wx + 75, wy + 75, 200, 'rgba(255,200,120,.2)'); }
  ctx.fillStyle = '#5a3a24'; ctx.fillRect(480, 900, 120, 240); glow(540, 880, 160, 'rgba(255,220,150,.45)');
  ctx.fillStyle = grad(0, 1140, 0, H, [[0, '#1d2026'], [1, '#08090c']]); ctx.fillRect(0, 1140, W, H - 1140); ctx.fillStyle = '#2b2d33'; for (let x = 0; x < W; x += 54) { if (x > 380 && x < 700) continue; ctx.fillRect(x, 1120, 30, 150); } ctx.fillRect(0, 1150, 380, 14); ctx.fillRect(700, 1150, W - 700, 14); // fence, gate open
  ctx.fillStyle = '#0b0e14'; ctx.fillRect(60, 560, 12, 760); ctx.fillRect(60, 560, 90, 10); glow(140, 580, 260, 'rgba(255,210,150,.35)'); }
function home(t) { ctx.drawImage(layer('home', homeDraw, 1), 0, 0); }

// ---------- close side view of her car: the hand passes her door and opens the back one ----------
function doorCU(t, k, o = {}) { ctx.drawImage(layer('home', homeDraw, 1), 0, 0); ctx.save(); cam(560, 1250, 2.1); sedanSide(560, 1330, .95, 0, SV_CAR, {});
  if (k > 0) { const dx = 560 - 205 * .95, dw = 180 * .95, top = 1330 - 140 * .95; ctx.fillStyle = '#1a1208'; ctx.fillRect(dx, top, dw, 160 * .95); glow(dx + dw / 2, top + 40, 200, `rgba(255,220,150,${.6 * k})`);
    ctx.save(); ctx.translate(dx, 0); ctx.scale(1 - .75 * eout(k), 1); ctx.fillStyle = grad(0, top, 0, 1360, [[0, shade(SV_CAR, 1.3)], [1, shade(SV_CAR, .55)]]); ctx.fillRect(-dw * .9 * eout(k), top, dw, 160 * .95); ctx.restore(); } // rear door swings open
  for (const hx of [470, 640]) { ctx.fillStyle = '#c9ced6'; rr(hx - 22, 1268, 44, 10, 4); ctx.fill(); } ctx.restore();
  if (o.hand != null) { const p = o.hand; gripHand(lerp(1250, o.grab ? 360 : 520, eout(p)), 1180, 1.25, '#000', { noSleeve: true, skin: '#d9a583', cuff: '#6b3b2a', rot: -.1 }); }
  vign(.45); }

// ---------- the back seat with the door open: someone in black on the floor ----------
function backSeat(t, o = {}) { ctx.fillStyle = '#050403'; ctx.fillRect(0, 0, W, H); glow(540, 380, 700, 'rgba(255,215,150,.35)'); // dome light
  ctx.fillStyle = grad(0, 300, 0, 900, [[0, '#4a4640'], [1, '#2a2724']]); rr(80, 320, 920, 560, 60); ctx.fill(); ctx.fillStyle = grad(0, 860, 0, 1100, [[0, '#3c3832'], [1, '#221f1c']]); rr(60, 840, 960, 250, 50); ctx.fill(); // seat back + cushion
  ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 5; for (const x of [380, 700]) { ctx.beginPath(); ctx.moveTo(x, 340); ctx.lineTo(x, 1080); ctx.stroke(); }
  ctx.fillStyle = '#0d0c0b'; ctx.fillRect(0, 1100, W, 600); // floor well
  glow(560, 1300, 520, 'rgba(255,210,150,.22)'); const r = eout(clamp(o.reveal ?? 1)); ctx.save(); ctx.translate(560, 1300 + (1 - r) * 120); ctx.scale(1.35, 1.35); ctx.translate(-600, -1320); ctx.fillStyle = '#030303'; ctx.beginPath(); ctx.ellipse(300, 1250, 110, 95, -.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(360, 1200); ctx.bezierCurveTo(560, 1160, 820, 1190, 1000, 1260); ctx.lineTo(1000, 1500); ctx.bezierCurveTo(760, 1480, 520, 1460, 330, 1380); ctx.closePath(); ctx.fill(); // curled body in black
  ctx.strokeStyle = 'rgba(255,215,160,.25)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(300, 1250, 112, 97, -.2, Math.PI * 1.1, Math.PI * 1.8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(380, 1195); ctx.bezierCurveTo(560, 1158, 820, 1188, 1000, 1258); ctx.stroke(); // rim light from the dome lamp
  if (o.eye) { ctx.fillStyle = `rgba(230,230,220,${o.eye})`; ctx.beginPath(); ctx.ellipse(250, 1262, 12, 6, -.2, 0, 7); ctx.fill(); }
  if (o.knife) { const g = o.knife; ctx.fillStyle = '#9aa0a8'; ctx.beginPath(); ctx.moveTo(560, 1330); ctx.lineTo(760, 1300); ctx.lineTo(560, 1350); ctx.closePath(); ctx.fill(); glow(700 + 40 * Math.sin(t * 3), 1310, 60 + 60 * g, `rgba(255,255,255,${.8 * g})`); }
  ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 0, 60, H); ctx.fillRect(W - 60, 0, 60, H); vign(.55); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: blinding high beams in the mirror, her eyes — "the chase saved her"
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), fl = flashAt(t, [-.05, 1.3, t1 + .2]);
    if (t < 1.25) { ctx.save(); cam(540, 890, lerp(1.25, 1.12, eout(prog(t, 0, 1.2)))); shake(t, 6 * fl); mirrorCU(t, clamp(Math.max(fl * .6, .35)), { fear: .7 }); ctx.restore(); }
    else if (t < t1 - .05) carFront(t, { fl, sh: .25 * fl, fear: .6, base: 60 });
    else roadSide(t, { fl, carX: 720, truckX: lerp(260, 330, prog(t, t1, d)), speed: 1.3 });
    bigTitle('ЕЁ СПАСЛА ПОГОНЯ', 300, 1, { size: 92, col: '#fff', glow: 'rgba(255,240,200,.6)' }); },
  sfx(d, P, E, s) { return [[0, 'highbeam', .6], [0, 'road', .35, { dur: d }], [0, 'boom', .3], [1.3, 'highbeam', .5], [s.U(s.a + 1) + .2, 'highbeam', .5], [s.U(s.a + 1), 'truckhorn', .3]]; }
};
SC.gas = { // "Поздний вечер. Марина заправляется на пустой трассе и едет домой. Впереди сорок километров леса."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), t2 = s.U(s.a + 2);
    if (t < t1 - .05) { ctx.save(); cam(540, 1000, lerp(1.0, 1.06, prog(t, 0, t1))); gasStation(t, { marina: 'inside' }); ctx.restore(); vign(.4); bigTitle('ПОЗДНИЙ ВЕЧЕР', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    if (t < t2 - .05) { ctx.save(); cam(lerp(360, 420, prog(t, t1, t2)), 1080, 1.3); gasStation(t, { marina: 'pump', figure: null }); ctx.restore(); vign(.45); bigTitle('ПУСТАЯ ТРАССА', 300, prog(t, t1 - .05, t1 + .2), { size: 100, col: '#fff' });
      if (t > (t1 + t2) / 2) { ctx.save(); ctx.globalAlpha = .55; ctx.translate(-80, 0); ctx.restore(); } return; }
    roadAhead(t, { car: true, sign: prog(t, t2 - .05, d + .3) }); bigTitle('40 КМ ЛЕСА', 300, prog(t, t2 - .05, t2 + .2), { size: 110, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'night', .3, { dur: s.U(s.a + 2) }], [s.U(s.a + 1), 'pour', .35], [s.U(s.a + 2), 'road', .35, { dur: d - s.U(s.a + 2) }], [s.U(s.a + 2), 'whoosh', .3]]; }
};
SC.truck = { // "Через минуту сзади появляется грузовик. Едет вплотную. И вдруг — дальний свет. Прямо ей в зеркало."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), t2 = s.U(s.a + 2), t3 = s.U(s.a + 3), fl = flashAt(t, [t2 + .15, t3 + .05]);
    if (t < t1 - .05) { roadSide(t, { carX: 720, truckX: lerp(-700, 250, eout(prog(t, 0, t1))) }); bigTitle('СЗАДИ — ГРУЗОВИК', 300, prog(t, .2, .4), { size: 92, col: '#fff' }); return; }
    if (t < t2 - .05) { rearWindow(t, 0); bigTitle('ВПЛОТНУЮ', 300, prog(t, t1 - .05, t1 + .2), { size: 110, col: '#ffcf4a' }); return; }
    if (t < t3 - .05) { carFront(t, { fl, fear: lerp(0, .9, fl * 2), base: 40, shakeAmt: 4 * fl }); bigTitle('ДАЛЬНИЙ СВЕТ', 300, prog(t, t2 + .1, t2 + .3), { size: 104, col: '#fff', glow: 'rgba(255,240,200,.7)' }); return; }
    ctx.save(); shake(t, 8 * fl); mirrorCU(t, fl, { fear: .9 }); ctx.restore(); bigTitle('В ЗЕРКАЛО', 300, prog(t, t3 - .05, t3 + .2), { size: 110, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'road', .35, { dur: d }], [.2, 'truckhorn', .25], [s.U(s.a + 1), 'drone', .3, { dur: d - s.U(s.a + 1) }], [s.U(s.a + 2) + .15, 'highbeam', .65], [s.U(s.a + 3) + .05, 'highbeam', .55]]; }
};
SC.chase = { // "Она жмёт на газ. Грузовик не отстаёт. Снова вспышка. Потом ещё одна."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), t2 = s.U(s.a + 2), t3 = s.U(s.a + 3), fl = flashAt(t, [t2 + .1, t3 + .1]);
    if (t < t1 - .05) { wheelShot(t, lerp(90, 150, eio(prog(t, 0, t1))), flashAt(t, [.5])); bigTitle('ГАЗ В ПОЛ', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); return; }
    if (t < t2 - .05) { roadSide(t, { carX: 720, truckX: 300 + 20 * Math.sin(t * 3), speed: 2 }); bigTitle('НЕ ОТСТАЁТ', 300, prog(t, t1 - .05, t1 + .2), { size: 110, col: '#ff6b6b' }); return; }
    if (t < t3 - .05) { carFront(t, { fl, sh: .55 * fl, fear: .8, base: 40, shakeAmt: 5 * fl }); bigTitle('СНОВА', 300, prog(t, t2 - .05, t2 + .2), { size: 120, col: '#fff' }); return; }
    roadSide(t, { carX: 720, truckX: 320, fl, speed: 2 }); bigTitle('И ЕЩЁ', 300, prog(t, t3 - .05, t3 + .2), { size: 120, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'road', .45, { dur: d }], [0, 'riser', .3, { dur: s.U(s.a + 1) }], [.5, 'highbeam', .4], [s.U(s.a + 2) + .1, 'highbeam', .65], [s.U(s.a + 3) + .1, 'highbeam', .6], [s.U(s.a + 1), 'heartbeat', .35, { dur: d - s.U(s.a + 1) }]]; }
};
SC.call = { // "Марина звонит мужу: «За мной кто-то едет». Связь обрывается."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), lost = t > t1 - .05, fl = flashAt(t, [.9, t1 + .5]); ctx.fillStyle = '#05070c'; ctx.fillRect(0, 0, W, H); glow(540, 300, 600 + 500 * fl, `rgba(255,248,225,${.25 + .5 * fl})`);
    ctx.save(); cam(540, 1000, lost ? 1.18 : 1.04); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => { ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, '#1b2a3e'], [1, '#0a1220']]); ctx.fillRect(-w / 2, -h / 2, w, h); statusBar(w, h, '#fff', '23:47');
      ctx.fillStyle = '#4a6a8a'; ctx.beginPath(); ctx.arc(0, -h / 2 + 330, 90, 0, 7); ctx.fill(); label('С', 0, -h / 2 + 360, 90, { weight: 900 }); label('Серёжа ❤️', 0, -h / 2 + 510, 54, { weight: 900 }); label(lost ? 'Нет сети' : 'Вызов…', 0, -h / 2 + 580, 38, { weight: 800, color: lost ? '#ff5a5a' : 'rgba(255,255,255,.7)' });
      if (lost) { ctx.fillStyle = '#ff5a5a'; rr(-170, 40, 340, 100, 30); ctx.fill(); label('✕  СВЯЗЬ ПРЕРВАНА', 0, 104, 30, { weight: 900 }); } else { ctx.fillStyle = '#ff3b30'; ctx.beginPath(); ctx.arc(0, h / 2 - 240, 70, 0, 7); ctx.fill(); label('☎', 0, h / 2 - 216, 64, { weight: 900 }); } }, { sleeve: '#7a3346', skin: '#ecc2a8' }); ctx.restore();
    if (!lost) speechBubble(560, 470, '«За мной кто-то едет»', prog(t, .3, .5), { size: 50, w: 600, tail: .3 }); else bigTitle('НЕТ СЕТИ', 300, prog(t, t1 - .05, t1 + .2), { size: 120, col: '#ff5a5a' });
    if (fl > 0) { ctx.fillStyle = `rgba(255,252,240,${.25 * fl})`; ctx.fillRect(0, 0, W, H); } vign(.4); },
  sfx(d, P, E, s) { return [[0, 'road', .3, { dur: d }], [.1, 'ring', .35], [.9, 'highbeam', .4], [s.U(s.a + 1) - .05, 'busy', .4], [s.U(s.a + 1) + .5, 'highbeam', .4]]; }
};
SC.strange = { // "Но самое странное — он мигает не всё время. Только иногда. Будто чего-то ждёт."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), t2 = s.U(s.a + 2);
    if (t < t1 - .05) { const fl = flashAt(t, [.4, 2.1]); carFront(t, { fl, sh: .45 * fl, fear: .4, base: 40 }); bigTitle('САМОЕ СТРАННОЕ', 300, prog(t, 0, .2), { size: 100, col: '#ffcf4a' }); return; }
    if (t < t2 - .05) { ctx.fillStyle = '#05070c'; ctx.fillRect(0, 0, W, H); const q = prog(t, t1 - .05, t2 - .05), spikes = [.08, .17, .41, .47, .79, .9]; ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(80, 1100); ctx.lineTo(1000, 1100); ctx.stroke();
      spikes.forEach(x => { const on = q > x; ctx.save(); ctx.fillStyle = on ? '#fff6d8' : 'rgba(255,255,255,.12)'; if (on) { ctx.shadowColor = '#ffe9a8'; ctx.shadowBlur = 40; } rr(80 + x * 920 - 18, 760, 36, 340, 18); ctx.fill(); ctx.restore(); });
      ctx.fillStyle = '#ff6b6b'; ctx.fillRect(80 + q * 920 - 3, 700, 6, 440); label('ВСПЫШКИ', 540, 1200, 44, { weight: 900, color: 'rgba(255,255,255,.6)' }); bigTitle('ТОЛЬКО ИНОГДА', 300, prog(t, t1 - .05, t1 + .2), { size: 104, col: '#fff' }); return; }
    truckCab(t); bigTitle('БУДТО ЖДЁТ', 300, prog(t, t2 - .05, t2 + .2), { size: 110, col: '#ff6b6b' }); },
  sfx(d, P, E, s) { return [[0, 'drone', .35, { dur: d }], [.4, 'highbeam', .45], [2.1, 'highbeam', .4], [s.U(s.a + 1), 'ticks', .25, { dur: 1 }], [s.U(s.a + 2), 'heartbeat', .4, { dur: d - s.U(s.a + 2) }]]; }
};
SC.home = { // "Она сворачивает к дому. Грузовик — за ней. Тормозит рядом. Из кабины выпрыгивает огромный мужчина и бежит к её машине."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), t2 = s.U(s.a + 2), t3 = s.U(s.a + 3); home(t);
    const cx = t < t1 ? lerp(-300, 720, eout(prog(t, 0, t1))) : 720; let tx = null; if (t > t1 - .05) tx = t < t2 ? lerp(-900, 300, eout(prog(t, t1 - .05, t2))) : 300;
    ctx.save(); if (t > t2 - .05 && t < t2 + .5) shake(t, 10); sedanSide(cx, 1400, .9, 0, SV_CAR, { tail: true, t }); if (tx != null) { ctx.save(); ctx.translate(tx, 0); ctx.scale(-1, 1); truckSide(0, 1440, .8, t < t2 ? -t : 0, { tilt: t > t2 - .05 && t < t2 + .4 ? -.02 : 0 }); ctx.restore(); }
    if (t > t3 - .05) { const q = prog(t, t3 - .05, d); personSide(lerp(250, 560, q), 1500, 1000, TDRV({ walk: t * 12 })); } ctx.restore(); vign(.45);
    bigTitle(t < t1 - .05 ? 'ДОМ' : t < t2 - .05 ? 'ОН — ЗА НЕЙ' : t < t3 - .05 ? 'ТОРМОЗИТ' : 'БЕЖИТ К НЕЙ', 300, t < t1 - .05 ? prog(t, 0, .2) : t < t2 - .05 ? prog(t, t1 - .05, t1 + .2) : t < t3 - .05 ? prog(t, t2 - .05, t2 + .2) : prog(t, t3 - .05, t3 + .2), { size: 110, col: t < t3 - .05 ? '#fff' : '#ff6b6b' }); },
  sfx(d, P, E, s) { return [[0, 'road', .3, { dur: s.U(s.a + 2) }], [s.U(s.a + 1), 'truckhorn', .35], [s.U(s.a + 2) - .1, 'scratch', .55], [s.U(s.a + 3), 'door_open', .45], [s.U(s.a + 3) + .2, 'steps', .5, { dur: d - s.U(s.a + 3) }]]; }
};
SC.door = { // "Марина кричит. Но он открывает не её дверь. А заднюю."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), t2 = s.U(s.a + 2);
    if (t < t1 - .05) { ctx.save(); cam(540, 800, 1.9); carFront(t, { fear: 1, mouth: .9, shakeAmt: 6, base: 30 }); ctx.restore(); bigTitle('КРИЧИТ', 300, prog(t, 0, .15), { size: 130, col: '#ff5a5a' }); return; }
    if (t < t2 - .05) { doorCU(t, 0, { hand: prog(t, t1 - .05, t2 - .05) }); bigTitle('НЕ ЕЁ ДВЕРЬ', 300, prog(t, t1 - .05, t1 + .2), { size: 104, col: '#fff' }); return; }
    doorCU(t, prog(t, t2, t2 + .5), { hand: 1, grab: true }); bigTitle('А ЗАДНЮЮ', 300, prog(t, t2 - .05, t2 + .15), { size: 120, col: '#ffcf4a' }); },
  sfx(d, P, E, s) { return [[0, 'scream_sting', .45], [0, 'heartbeat', .4, { dur: d }], [s.U(s.a + 1), 'whoosh', .3], [s.U(s.a + 2), 'door_open', .6], [s.U(s.a + 2), 'boom', .35]]; }
};
SC.reveal = { // "На полу, за её креслом, лежит человек в чёрном. В руке у него нож."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1);
    if (t < t1 - .05) { ctx.save(); cam(540, 1100, lerp(1.0, 1.12, prog(t, 0, t1))); backSeat(t, { reveal: prog(t, .1, .8), eye: prog(t, 1.2, 1.5) }); ctx.restore(); bigTitle('ОН БЫЛ ЗА СПИНОЙ', 300, prog(t, 0, .2), { size: 92, col: '#ff5a5a' }); return; }
    ctx.save(); cam(660, 1320, 2.2); backSeat(t, { knife: prog(t, t1, t1 + .4), eye: 1 }); ctx.restore(); bigTitle('НОЖ', 300, prog(t, t1 - .05, t1 + .2), { size: 140, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'dundun', .5], [0, 'drone', .4, { dur: d }], [s.U(s.a + 1), 'shimmer', .3]]; }
};
SC.flashback = { // "Он залез в машину на заправке, пока она платила за бензин."
  draw(t, d) { const q = prog(t, 0, d - .3); ctx.save(); cam(lerp(560, 470, q), 1080, lerp(1.2, 1.35, q)); gasStation(t, { marina: 'inside', figure: q, figA: q > .82 ? 1 - (q - .82) / .18 : 1 }); ctx.restore();
    grade('rgba(60,90,140,1)', .35, 'multiply'); grade('rgba(40,60,90,1)', .25, 'source-over'); ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let y = (t * 300) % 6; y < H; y += 6) ctx.fillRect(0, y, W, 2); vign(.6);
    label('40 КМ НАЗАД', 540, 420, 50, { weight: 900, color: 'rgba(255,255,255,.75)' }); bigTitle('НА ЗАПРАВКЕ', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); },
  sfx(d) { return [[0, 'rewind', .35, { dur: .6 }], [0, 'night', .3, { dur: d }], [d * .6, 'creak', .35]]; }
};
SC.explain = { // "Каждый раз, когда он поднимался у неё за спиной, водитель грузовика бил дальним светом. И тот снова прятался."
  draw(t, d) { const cyc = 1.7, n = Math.floor(t / cyc), ph = (t % cyc) / cyc, rise = ph < .45 ? eio(ph / .45) : ph < .55 ? 1 : 1 - eio(clamp((ph - .55) / .2)), fl = flashAt(t, Array.from({ length: 6 }, (_, i) => i * cyc + .52 * cyc));
    carFront(t, { fl, sh: rise, fear: .3, base: 40 }); const step = ph < .5 ? 0 : ph < .62 ? 1 : 2;
    ['ПОДНЯЛСЯ', 'ВСПЫШКА', 'СПРЯТАЛСЯ'].forEach((w, i) => { ctx.save(); ctx.globalAlpha = i === step ? 1 : .35; ctx.fillStyle = i === step ? (i === 1 ? '#fff6d8' : '#ff5a5a') : 'rgba(255,255,255,.15)'; rr(70 + i * 320, 440, 300, 90, 30); ctx.fill(); label(w, 220 + i * 320, 500, 40, { weight: 900, color: i === step ? '#111' : '#fff' }); ctx.restore(); });
    bigTitle('СВЕТ = ПРЯЧЬСЯ', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); },
  sfx(d) { const c = 1.7; return [[0, 'road', .3, { dur: d }], ...Array.from({ length: Math.ceil(d / c) }, (_, i) => [i * c + .52 * c, 'highbeam', .5])]; }
};
SC.km = { // "Сорок километров. Десятки вспышек."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1);
    if (t < t1 - .05) { roadAhead(t, { car: true, speed: 2.2 }); const km = Math.round(lerp(40, 0, prog(t, 0, t1))); ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(340, 820, 400, 170, 40); ctx.fill(); label(km + ' км', 540, 940, 100, { weight: 900, font: MONO }); bigTitle('40 КИЛОМЕТРОВ', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    const fls = Array.from({ length: 8 }, (_, i) => t1 + i * .18), fl = flashAt(t, fls, .16), k = Math.floor((t - t1) / .18); if (k % 2) carFront(t, { fl, sh: .5 * fl, fear: .6, base: 40 }); else roadSide(t, { fl, carX: 720, truckX: 320, speed: 2.4 });
    ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(380, 820, 320, 160, 40); ctx.fill(); label('× ' + (12 + Math.max(0, k) * 4), 540, 930, 90, { weight: 900, font: MONO, color: '#fff6d8' }); bigTitle('ДЕСЯТКИ ВСПЫШЕК', 300, prog(t, t1 - .05, t1 + .2), { size: 96, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'road', .4, { dur: d }], ...Array.from({ length: 6 }, (_, i) => [s.U(s.a + 1) + i * .18, 'highbeam', .35])]; }
};
SC.final = { // "Она бежала от того, кто её спасал. А того, кого надо было бояться, сама везла домой."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1);
    if (t < t1 - .05) { home(t); ctx.save(); ctx.translate(300, 0); ctx.scale(-1, 1); truckSide(0, 1440, .8, 0, {}); ctx.restore(); glow(290, 1300, 700, 'rgba(255,250,225,.35)'); ctx.save(); cam(540, 1150, 1.35); person(560, 1700, 1050, TDRV({ fear: .2, brow: -.3 })); ctx.restore(); vign(.5); bigTitle('ОН СПАСАЛ', 300, prog(t, 0, .2), { size: 120, col: '#5be08a' }); return; }
    const fl = flashAt(t, [d - 1.0]); mirrorCU(t, Math.max(.3, fl), { fear: .4, sh: lerp(.3, 1, prog(t, t1, d - .8)) }); bigTitle('А ВРАГ — СЗАДИ', 300, prog(t, t1 - .05, t1 + .2), { size: 104, col: '#ff5a5a' }); },
  sfx(d, P, E, s) { return [[0, 'pad_swell', .3, { dur: s.U(s.a + 1) }], [s.U(s.a + 1), 'drone', .4, { dur: d - s.U(s.a + 1) }], [d - 1.0, 'highbeam', .55]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; if (t < TL.total - .3) drawSubs(t); };
