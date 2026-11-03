// ===== YouTube Short (EN): "Sucked out of the plane at 17,000 ft" — British Airways Flight 5390, 10 June 1990 =====
const CAPT = (o = {}) => Object.assign({ uniform: 'capt', top: '#f4f6f8', pants: '#1b2238', hair: '#7a6a5c', shoe: '#111', light: 1 }, o);
const FO = (o = {}) => Object.assign({ uniform: 'fo', top: '#f4f6f8', pants: '#1b2238', hair: '#2a1a12', shoe: '#111', light: -1 }, o);
const CREW = (o = {}) => Object.assign({ top: '#f4f6f8', pants: '#1b2238', hair: '#4a2e1c', light: 1, uniform: 'fo' }, o);
const BA_TOP = '#d9dde3', BA_BLUE = '#1c2b52', BA_RED = '#c8102e', SKYW = '#bfe0ff';

// ---------- sky, clouds, speed ----------
function daySky(t, sp = 1) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#1f5fae'], [.6, '#6fa9e0'], [1, '#cfe6fb']]); ctx.fillRect(0, 0, W, H); glow(880, 220, 520, 'rgba(255,248,225,.55)');
  cloudLayer(t, 0, 4, 5, 220, .5, 0); }
function rushClouds(t, speed, dir = 1, a = .7, seed = 6) { const R = rnd(seed); for (let i = 0; i < 7; i++) { const y = R() * H, x = ((R() * (W + 900) - t * speed * dir) % (W + 900) + W + 900) % (W + 900) - 450; cloudPuff(x, y, 160 + R() * 160, a); } }
function windLines(t, a = .45, n = 46, ang = 0) { const R = rnd(31); ctx.save(); ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 3; ctx.beginPath();
  for (let i = 0; i < n; i++) { const y = R() * H, len = 160 + R() * 340, x = ((R() * W - t * (2600 + R() * 1200)) % W + W) % W; ctx.moveTo(x, y); ctx.lineTo(x + len, y + len * ang); } ctx.stroke(); ctx.restore(); }
function glassShards(cx, cy, k, seed = 3, n = 46, big = 1) { const R = rnd(seed); for (let i = 0; i < n; i++) { const a = R() * 6.28, d = eout(k) * (60 + R() * 900) * big, sz = (10 + R() * 46) * (1 + k * 1.5) * big;
  ctx.save(); ctx.translate(cx + Math.cos(a) * d, cy + Math.sin(a) * d); ctx.rotate(R() * 6 + k * 6); ctx.globalAlpha = .85 * (1 - k * .4);
  ctx.fillStyle = `rgba(${200 + R() * 55},${225 + R() * 30},255,.55)`; ctx.beginPath(); ctx.moveTo(0, -sz); ctx.lineTo(sz * .6, sz * .3); ctx.lineTo(-sz * .45, sz * .55); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } }
function papers(t, cx, cy, k, seed = 8) { const R = rnd(seed); for (let i = 0; i < 9; i++) { const a = -2.4 + R() * 1.2, d = k * (200 + R() * 700); ctx.save(); ctx.translate(cx + Math.cos(a) * d, cy + Math.sin(a) * d); ctx.rotate(t * (4 + R() * 6) + i); ctx.fillStyle = '#f4f1e8'; ctx.fillRect(-50, -36, 100, 72); ctx.fillStyle = 'rgba(40,40,40,.4)'; for (let j = 0; j < 5; j++) ctx.fillRect(-40, -26 + j * 12, 70, 4); ctx.restore(); } }

// ---------- aircraft ----------
function gauge(x, y, r, val, lbl, o = {}) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#0b0c0e'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = '#4a4f57'; ctx.lineWidth = r * .08; ctx.stroke();
  ctx.strokeStyle = '#e8e8e8'; ctx.lineWidth = r * .03; for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; ctx.beginPath(); ctx.moveTo(Math.sin(a) * r * .78, -Math.cos(a) * r * .78); ctx.lineTo(Math.sin(a) * r * .92, -Math.cos(a) * r * .92); ctx.stroke(); }
  if (o.horizon !== undefined) { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * .74, 0, 7); ctx.clip(); ctx.rotate(o.horizon); ctx.fillStyle = '#3a8fd8'; ctx.fillRect(-r, -r, 2 * r, r + (o.pitch || 0) * r); ctx.fillStyle = '#7a4a24'; ctx.fillRect(-r, (o.pitch || 0) * r, 2 * r, r); ctx.restore(); ctx.strokeStyle = '#ffcc33'; ctx.lineWidth = r * .06; ctx.beginPath(); ctx.moveTo(-r * .4, 0); ctx.lineTo(-r * .1, 0); ctx.moveTo(r * .1, 0); ctx.lineTo(r * .4, 0); ctx.stroke(); }
  else { const a = (val % 1000) / 1000 * 6.283; ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .06; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a) * r * .7, -Math.cos(a) * r * .7); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, r * .08, 0, 7); ctx.fill(); }
  if (lbl) label(lbl, 0, r * .45, r * .16, { weight: 800, color: '#c9cdd3' }); ctx.restore(); }
function cockpitFromFront(t, o = {}) { // camera at the windshield looking in: both pilots facing us, the panel in front of them
  ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2b3036'], [1, '#121418']]); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3a4048'; rr(-60, 140, 1200, 260, 40); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 12; i++) { rr(40 + i * 86, 190, 60, 40, 8); ctx.fill(); } // overhead panel
  ctx.fillStyle = '#1e2227'; ctx.fillRect(0, 380, W, 70); // rear bulkhead
  if (o.pilots !== false) { if (!o.noCapt) person(300, 2100, 1500, CAPT(Object.assign({ light: 1 }, o.capt || {}))); person(800, 2120, 1460, FO(Object.assign({ light: -1 }, o.fo || {}))); }
  // instrument panel + glare shield (closest to the camera)
  ctx.fillStyle = grad(0, 1240, 0, H, [[0, '#2a2e34'], [1, '#14171b']]); ctx.beginPath(); ctx.moveTo(-40, 1260); ctx.quadraticCurveTo(540, 1200, 1120, 1260); ctx.lineTo(1120, H); ctx.lineTo(-40, H); ctx.fill();
  ctx.fillStyle = '#0d0f12'; ctx.beginPath(); ctx.moveTo(-40, 1260); ctx.quadraticCurveTo(540, 1200, 1120, 1260); ctx.lineTo(1120, 1300); ctx.quadraticCurveTo(540, 1240, -40, 1300); ctx.fill();
  const alt = o.alt ?? 17300; [[150, 1500, 'ALT'], [330, 1500, ''], [750, 1500, ''], [930, 1500, 'ALT']].forEach(([gx, gy, lb], i) => gauge(gx, gy, 72, alt, lb, i === 1 || i === 2 ? { horizon: o.bank || 0, pitch: o.pitch || 0 } : {}));
  ctx.fillStyle = '#1a1d21'; rr(470, 1380, 140, 400, 16); ctx.fill(); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#c9cdd3'; rr(490 + i * 28, 1420 - (o.thr || 0) * 40, 18, 120, 6); ctx.fill(); } // throttles
  for (const yx of [300, 800]) { ctx.strokeStyle = '#1b1e22'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(yx - 110, 1330); ctx.lineTo(yx - 110, 1270); ctx.lineTo(yx + 110, 1270); ctx.lineTo(yx + 110, 1330); ctx.stroke(); ctx.fillStyle = '#1b1e22'; ctx.fillRect(yx - 16, 1270, 32, 300); }
  // windshield frame we look through (the captain's pane is on the left)
  ctx.fillStyle = '#0c0d10'; ctx.fillRect(0, 0, W, 120); ctx.fillRect(0, 0, 60, H); ctx.fillRect(W - 60, 0, 60, H); ctx.fillRect(520, 0, 40, 1260); }
function jetBA(x, y, s, o = {}) { // 1990 BA-style twin-jet (rear engines, T-tail), side view facing right; no logos
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); ctx.translate(-500, 0);
  ctx.fillStyle = '#9aa3ad'; ctx.beginPath(); ctx.moveTo(380, 30); ctx.lineTo(560, 40); ctx.lineTo(640, 110); ctx.lineTo(600, 112); ctx.closePath(); ctx.fill();
  ctx.fillStyle = grad(0, -330, 0, -50, [[0, '#243a6e'], [1, BA_BLUE]]); ctx.beginPath(); ctx.moveTo(800, -50); ctx.lineTo(905, -320); ctx.lineTo(975, -320); ctx.lineTo(990, -40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = BA_RED; ctx.beginPath(); ctx.moveTo(900, -300); ctx.lineTo(965, -300); ctx.lineTo(970, -250); ctx.lineTo(890, -270); ctx.fill(); ctx.fillStyle = '#c3ccd6'; ctx.beginPath(); ctx.moveTo(880, -322); ctx.lineTo(1040, -330); ctx.lineTo(1050, -312); ctx.lineTo(890, -306); ctx.fill();
  const fus = jetShape('full'); ctx.fillStyle = grad(0, -55, 0, 55, [[0, '#eef0f3'], [.45, BA_TOP], [.46, BA_BLUE], [1, '#141f3d']]); ctx.fill(fus);
  ctx.save(); ctx.clip(fus); ctx.fillStyle = BA_RED; ctx.beginPath(); ctx.moveTo(-80, 2); ctx.quadraticCurveTo(400, -4, 1000, 10); ctx.lineTo(1000, 16); ctx.quadraticCurveTo(400, 4, -80, 8); ctx.fill();
  ctx.fillStyle = '#26364c'; for (let i = 0; i < 24; i++) { const wx = 120 + i * 30; if (wx > 860) break; rr(wx, -24, 15, 18, 7); ctx.fill(); }
  if (o.blown) { ctx.fillStyle = '#05070a'; ctx.beginPath(); ctx.moveTo(-28, -12); ctx.lineTo(8, -32); ctx.lineTo(42, -32); ctx.lineTo(38, -12); ctx.fill(); } else { ctx.fillStyle = '#1b2533'; ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(10, -30); ctx.lineTo(45, -30); ctx.lineTo(40, -10); ctx.fill(); }
  ctx.restore(); ctx.fillStyle = grad(0, -70, 0, 0, [[0, '#e3e8ee'], [1, '#9aa6b4']]); rr(690, -75, 210, 62, 30); ctx.fill(); ctx.fillStyle = '#2a3340'; rr(690, -70, 26, 52, 12); ctx.fill();
  if (o.gear) { ctx.fillStyle = '#2a2e34'; ctx.fillRect(560, 50, 10, 60); ctx.fillRect(60, 50, 10, 50); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(565, 115, 18, 0, 7); ctx.arc(65, 104, 14, 0, 7); ctx.fill(); }
  ctx.restore(); }
function noseCloseup(t, o = {}) { // nose section filling the frame, the captain's body bent over the top of the fuselage
  daySky(t); rushClouds(t, 1400, 1, .75); windLines(t, .4);
  ctx.save(); ctx.translate(1014, 1130); ctx.rotate(o.rot || -.03); ctx.scale(3.6, 3.6);
  ctx.fillStyle = grad(0, -80, 0, 80, [[0, '#f2f4f6'], [.45, BA_TOP], [.47, BA_BLUE], [1, '#121c38']]); ctx.beginPath(); ctx.moveTo(400, -80); ctx.lineTo(-120, -80); ctx.bezierCurveTo(-230, -80, -300, -30, -320, 10); ctx.bezierCurveTo(-300, 60, -230, 80, -120, 80); ctx.lineTo(400, 80); ctx.closePath(); ctx.fill();
  ctx.fillStyle = BA_RED; ctx.fillRect(-200, -2, 600, 6); ctx.fillStyle = '#26364c'; for (let i = 0; i < 8; i++) { rr(40 + i * 44, -36, 22, 26, 9); ctx.fill(); }
  ctx.fillStyle = '#05070a'; ctx.beginPath(); ctx.moveTo(-250, -14); ctx.lineTo(-190, -58); ctx.lineTo(-130, -58); ctx.lineTo(-140, -14); ctx.fill(); // the empty captain's window frame
  ctx.fillStyle = '#1b2533'; ctx.beginPath(); ctx.moveTo(-125, -14); ctx.lineTo(-118, -58); ctx.lineTo(-60, -58); ctx.lineTo(-70, -14); ctx.fill();
  ctx.restore();
  // the captain: legs inside, torso bent back over the top of the cockpit, arms trailing in the wind
  ctx.save(); ctx.translate(330, 1000); ctx.rotate(1.38 + Math.sin(t * 9) * .03);
  person(0, 0, 380, CAPT({ fall: true, fallT: t * 3, shadow: false, closed: o.closed || 0, light: 1 })); ctx.restore();
  ctx.fillStyle = '#05070a'; ctx.beginPath(); ctx.moveTo(1014 - 250 * 3.6, 1130 - 14 * 3.6); ctx.lineTo(1014 - 140 * 3.6, 1130 - 14 * 3.6); ctx.lineTo(1014 - 150 * 3.6, 1130 + 4 * 3.6); ctx.lineTo(1014 - 255 * 3.6, 1130 + 4 * 3.6); ctx.fill(); // window sill over his waist
  if (o.frost) { const R = rnd(7); for (let i = 0; i < 80; i++) { ctx.fillStyle = `rgba(255,255,255,${.5 * o.frost * R()})`; ctx.beginPath(); ctx.arc(330 + R() * 420, 760 + R() * 240, 2 + R() * 4, 0, 7); ctx.fill(); } } }
function gripOver(sk, cuff, tight) { // one hand clamped over a horizontal leg: back of the hand on top, fingers wrapped down over the front
  ctx.fillStyle = grad(330, -420, 520, -110, [[0, shade(cuff, .72)], [.5, cuff], [1, shade(cuff, .8)]]); ctx.beginPath(); ctx.moveTo(230, -260); ctx.quadraticCurveTo(420, -380, 640, -460); ctx.lineTo(720, -200); ctx.quadraticCurveTo(500, -130, 300, -80); ctx.closePath(); ctx.fill(); // shirt sleeve
  ctx.strokeStyle = 'rgba(0,0,0,.14)'; ctx.lineWidth = 6; for (const k of [0, 1, 2]) { ctx.beginPath(); ctx.moveTo(360 + k * 90, -330 - k * 30); ctx.quadraticCurveTo(400 + k * 90, -250 - k * 20, 380 + k * 90, -150 - k * 10); ctx.stroke(); }
  ctx.fillStyle = shade(cuff, .85); ctx.beginPath(); ctx.moveTo(230, -260); ctx.lineTo(300, -80); ctx.lineTo(330, -92); ctx.lineTo(262, -272); ctx.closePath(); ctx.fill();
  const bh = new Path2D(); bh.moveTo(250, -230); bh.bezierCurveTo(150, -210, 40, -150, 10, -60); bh.lineTo(236, -40); bh.bezierCurveTo(270, -90, 310, -150, 320, -110); bh.closePath();
  ctx.fillStyle = grad(30, -200, 280, -40, [[0, shade(sk, 1.06)], [.6, sk], [1, shade(sk, .8)]]); ctx.fill(bh);
  ctx.save(); ctx.clip(bh); ctx.strokeStyle = 'rgba(255,230,210,.35)'; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(250 - i * 6, -200 + i * 6); ctx.quadraticCurveTo(160 - i * 20, -130, 40 + i * 58, -60); ctx.stroke(); } ctx.restore();
  const K = [[40, -66], [96, -62], [150, -58], [204, -52]], Ls = [150, 162, 154, 128], ws = [50, 52, 50, 44];
  K.forEach(([kx, ky], i) => { const mx0 = kx - 18, my0 = ky + 60, tx = mx0 - 6, ty = my0 + Ls[i] * .62;
    const p1 = fingerPath(kx, ky, mx0, my0, ws[i], ws[i] * .94), p2 = fingerPath(mx0, my0, tx, ty, ws[i] * .92, ws[i] * .78);
    fillFinger(p1, kx, ky, mx0, my0, ws[i], sk, -1); fillFinger(p2, mx0, my0, tx, ty, ws[i] * .9, sk, -1, .06);
    ctx.fillStyle = `rgba(255,236,222,${.4 + .35 * tight})`; ctx.beginPath(); ctx.ellipse(kx - 2, ky - 4, ws[i] * .3, ws[i] * .2, -.4, 0, 7); ctx.fill(); // knuckles whiten as the grip tightens
    ctx.strokeStyle = 'rgba(110,50,35,.4)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(mx0, my0 + 4 + k * 6, ws[i] * .26, .3, Math.PI - .3); ctx.stroke(); }
    nailAt(tx, ty - ws[i] * .22, 0, ws[i] * .58, ws[i] * .62); softBlob(tx, ty + 14, ws[i] * .5, 10, '0,0,0', .3); });
  const tp = fingerPath(20, -110, -110, -100, 58, 46); fillFinger(tp, 20, -110, -110, -100, 54, sk, 1); nailAt(-86, -104, Math.PI / 2, 30, 38); }
function legGrip(t, x, y, s, tight = 0) { // two hands clamped around the captain's trouser leg, the shoe at the end
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(Math.sin(t * 22) * 4, 0);
  ctx.fillStyle = grad(0, -95, 0, 95, [[0, '#33457a'], [.45, '#1b2238'], [1, '#0d1220']]); rr(-760, -90, 1200, 180, 90); ctx.fill(); // navy trouser leg
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 6; for (const k of [-470, -330, -60, 60]) { ctx.beginPath(); ctx.moveTo(k, -86); ctx.quadraticCurveTo(k + 30, 0, k - 10, 86); ctx.stroke(); } softBlob(-260, 30, 260, 70, '0,0,0', .3); softBlob(80, 30, 200, 70, '0,0,0', .3);
  ctx.fillStyle = '#0b0b0d'; rr(400, -120, 280, 240, 110); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(430, -100, 160, 34, 17); ctx.fill(); // shoe
  ctx.save(); ctx.translate(-400, 0); gripOver('#e2b597', '#f4f6f8', tight); ctx.restore();
  ctx.save(); ctx.translate(-30, 6); gripOver('#e2b597', '#f4f6f8', tight); ctx.restore();
  ctx.restore(); }
function oxygenMask(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(230,240,245,.75)'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 60, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#c9a63a'; ctx.lineWidth = 10; ctx.stroke();
  ctx.strokeStyle = '#3a3f46'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(0, 50); ctx.bezierCurveTo(20, 160, -60, 220, -40, 360); ctx.stroke(); ctx.restore(); }
function runway(t, k) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#7fb2e6'], [.45, '#cfe3f6'], [.46, '#6c8a5a'], [1, '#3d5233']]); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3a3d42'; ctx.beginPath(); ctx.moveTo(500, 880); ctx.lineTo(580, 880); ctx.lineTo(1300, H); ctx.lineTo(-220, H); ctx.fill();
  ctx.fillStyle = '#e9e9e9'; for (let i = 0; i < 9; i++) { const kk = ((i / 9) + k * 2) % 1, yy = 880 + Math.pow(kk, 2) * 1040; ctx.fillRect(540 - 3 - kk * 14, yy, 6 + kk * 28, 14 + kk * 70); }
  for (let i = 0; i < 12; i++) { const kk = i / 12, yy = 880 + Math.pow(kk, 2) * 1040, dx = 40 + kk * 760; ctx.fillStyle = '#ffd36b'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(540 + sd * dx, yy, 3 + kk * 8, 0, 7); ctx.fill(); } } }
function fireTruck(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#c8202e'; rr(-260, -180, 520, 160, 18); ctx.fill(); ctx.fillStyle = '#9e1824'; rr(120, -240, 140, 80, 12); ctx.fill(); ctx.fillStyle = '#1b2533'; rr(140, -228, 100, 50, 8); ctx.fill();
  ctx.fillStyle = '#e8e8e8'; ctx.fillRect(-250, -120, 360, 10); ctx.fillStyle = '#111'; for (const wx of [-170, 170]) { ctx.beginPath(); ctx.arc(wx, -10, 42, 0, 7); ctx.fill(); }
  const ph = Math.floor(t * 6) % 2; ctx.fillStyle = ph ? '#5aa0ff' : '#1a3a7a'; rr(150, -262, 40, 20, 6); ctx.fill(); ctx.fillStyle = ph ? '#1a3a7a' : '#5aa0ff'; rr(200, -262, 40, 20, 6); ctx.fill(); glow(195, -252, 200, `rgba(80,140,255,${.5})`); ctx.restore(); }
function xrayArm(x, y, s, t, marks) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = 'rgba(200,235,255,.85)'; ctx.lineCap = 'round';
  ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(-380, -60); ctx.lineTo(0, 0); ctx.stroke(); ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(300, -60); ctx.moveTo(0, 16); ctx.lineTo(300, 0); ctx.stroke();
  ctx.lineWidth = 14; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(320, -50 + i * 18); ctx.lineTo(470, -110 + i * 40); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(320, 8); ctx.lineTo(400, 80); ctx.stroke(); // hand bones + thumb
  (marks || []).forEach(([mx, my, p, lbl]) => { if (p <= 0) return; ctx.save(); ctx.globalAlpha = clamp(p * 2); ctx.strokeStyle = '#ff3b3b'; ctx.lineWidth = 7; ctx.shadowColor = '#ff3b3b'; ctx.shadowBlur = 24; ctx.beginPath(); ctx.arc(mx, my, 46 + 6 * Math.sin(t * 6), 0, 7); ctx.stroke(); ctx.shadowBlur = 0; label(lbl, mx, my - 70, 38, { weight: 900, color: '#fff' }); ctx.restore(); });
  ctx.restore(); }

function personAtHead(hx, hy, h, rot, o) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(rot); person(0, .932 * h, h, o); ctx.restore(); }
function windowFromInside(t, k) { // the empty captain's window seen from inside: sky rushing past, jagged glass remnants
  ctx.fillStyle = grad(0, 0, 0, H, [[0, '#23272c'], [1, '#0e1013']]); ctx.fillRect(0, 0, W, H);
  const win = new Path2D(); win.moveTo(140, 420); win.lineTo(940, 300); win.lineTo(980, 1240); win.lineTo(120, 1300); win.closePath();
  ctx.save(); ctx.clip(win); daySky(t); rushClouds(t, 2200, 1, .8, 5); windLines(t, .5); ctx.restore();
  ctx.strokeStyle = '#0a0b0d'; ctx.lineWidth = 46; ctx.stroke(win); ctx.strokeStyle = '#3a3f46'; ctx.lineWidth = 8; ctx.stroke(win);
  const R = rnd(5); ctx.fillStyle = 'rgba(210,235,255,.55)'; for (let i = 0; i < 26; i++) { const e = i % 4, f = R(); let x, y; if (e === 0) { x = lerp(140, 940, f); y = lerp(420, 300, f); } else if (e === 1) { x = lerp(940, 980, f); y = lerp(300, 1240, f); } else if (e === 2) { x = lerp(980, 120, f); y = lerp(1240, 1300, f); } else { x = lerp(120, 140, f); y = lerp(1300, 420, f); }
    const sz = 20 + R() * 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (540 - x) * .08 * (R() + .3) + sz * .3, y + (800 - y) * .08 * (R() + .3)); ctx.lineTo(x + sz * .5, y + sz * .2); ctx.closePath(); ctx.fill(); }
  glassShards(540, 800, k, 9, 60, 1.4); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: the windshield bursts towards the lens and the captain is yanked straight at the camera
  draw(t, d, P, E) { const tw = E('windshield', 1, 1.6), ts = E('sucked', 1, 3.2);
    if (t < ts - .2) { cockpitFromFront(t, { noCapt: true, fo: { mouth: .6 }, alt: 17300 }); const k = prog(t, 0, ts - .2);
      ctx.fillStyle = 'rgba(235,245,255,.22)'; ctx.fillRect(0, 0, W, H); papers(t, 300, 900, .3 + k);
      const z = lerp(1.25, 2.1, eio(k)); personAtHead(lerp(330, 430, eio(k)), lerp(820, 700, eio(k)), 1500 * z, lerp(-.08, -.35, k) + Math.sin(t * 11) * .03, CAPT({ fall: true, fallT: t * 3, shadow: false, mouth: .8 }));
      glassShards(420, 640, .2 + k * .9, 3, 54, 1.3); windLines(t, .35);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(230,245,255,${.38 * (1 - prog(t, 0, .3))})`; ctx.fillRect(0, 0, W, H); ctx.restore(); // explosion flash (subject stays visible on frame 0)
      bigTitle('SUCKED OUT AT 17,000 FT', 270, 1, { size: 70, col: '#fff', glow: 'rgba(255,80,60,.6)' }); return; }
    noseCloseup(t); bigTitle('SUCKED OUT AT 17,000 FT', 270, 1, { size: 70, col: '#fff', glow: 'rgba(255,80,60,.6)' }); },
  sfx(d, P, E) { return [[0, 'shatter', .55], [0, 'boom', .45], [0, 'wind', .6, { dur: d }], [E('sucked', 1, 3.2) - .2, 'whoosh', .45]]; }
};
SC.flight = { // the calm before: morning climb out of Birmingham, 81 passengers
  draw(t, d, P, E) { const tb = E('british', 1, 1.3), tp = E('passengers', 1, 4.2);
    if (t < tp - .3) { daySky(t); rushClouds(t, 120, 1, .6, 2); ctx.save(); cam(540, 900, lerp(1.0, 1.1, prog(t, 0, d))); jetBA(560, 950 - t * 12, .95, { rot: -.12 }); ctx.restore();
      calendarPage(220, 320, .85, 'JUN', '10', '1990', { rot: -.06 }); if (t > tb - .1) { const k = eback(prog(t, tb - .1, tb + .3)); ctx.save(); ctx.translate(700, 1240); ctx.scale(k, k); ctx.fillStyle = 'rgba(10,14,22,.85)'; rr(-300, -70, 600, 140, 24); ctx.fill();
        label('FLIGHT 5390', 0, -6, 52, { weight: 900, color: '#ffd23f', font: MONO }); label('BIRMINGHAM → MÁLAGA', 0, 46, 30, { weight: 800, color: '#c9d2dc' }); ctx.restore(); } return; }
    cabin(t); const R = rnd(4); for (let i = 0; i < 9; i++) { const k = Math.pow(.78, i), sy0 = 800 + (H - 760) * k * .95; for (const sd of [-1, 1]) { const x0 = 540 + sd * (60 + 300 * k); for (let j = 0; j < 2; j++) { ctx.fillStyle = ['#3a2618', '#c9a46a', '#6b4a2c', '#2a1a12'][Math.floor(R() * 4)]; ctx.beginPath(); ctx.arc(x0 + sd * (80 + j * 150) * k, sy0 - 320 * k, 46 * k, 0, 7); ctx.fill(); } } }
    counterBox('ON BOARD', '81 PASSENGERS', 540, 330, prog(t, tp - .3, tp), { size: 60, accent: '#ffd23f' }); },
  sfx(d) { return [[0, 'hum', .3, { dur: d }], [1, 'pop', .3]]; }
};
SC.blowout = { // "Bang." — the window explodes, the captain is ripped out of his seat
  draw(t, d, P, E) { const tw = E('window', 1, 1.2), tr = E('ripped', 1, 3.4);
    if (t < tw - .1) { cockpitFromFront(t, { alt: 17300 }); const fl = 1 - prog(t, 0, .5); ctx.fillStyle = `rgba(255,255,255,${fl})`; ctx.fillRect(0, 0, W, H); bigTitle('BANG.', 760, eback(prog(t, 0, .2)), { size: 200, col: '#fff', glow: 'rgba(255,90,60,.8)' }); return; }
    if (t < tr - .2) { windowFromInside(t, prog(t, tw - .1, tw + 1)); papers(t, 540, 1500, prog(t, tw, tr)); label('THE WINDOW BLOWS OUT', 540, 220, 58, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)' }); return; }
    cockpitFromFront(t, { noCapt: true, fo: { mouth: .7 }, alt: 17300 }); const k = eio(prog(t, tr - .2, d));
    ctx.fillStyle = 'rgba(230,240,255,.2)'; ctx.fillRect(0, 0, W, H); papers(t, 300, 800, prog(t, tr - .2, d)); windLines(t, .4, 40, -.3);
    personAtHead(lerp(300, 120, k), lerp(620, 260, k), 1500 * lerp(1, .8, k), -k * 1.3, CAPT({ fall: true, fallT: t * 3, shadow: false, mouth: .8 }));
    label('RIPPED OUT OF HIS SEAT', 540, 220, 58, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)', alpha: prog(t, tr - .1, tr + .2) }); },
  sfx(d, P, E) { return [[0, 'boom', .55], [E('window', 1, 1.2) - .1, 'shatter', .5], [0, 'wind', .55, { dur: d }], [E('ripped', 1, 3.4) - .2, 'whoosh', .5]]; }
};
SC.outside = { // half his body outside the plane, freezing wind
  draw(t, d, P, E) { const tf = E('freezing', 1, 2.6); noseCloseup(t, { frost: prog(t, tf, d) }); if (t > tf - .2) counterBox('OUTSIDE', 'FREEZING WIND', 540, 340, prog(t, tf - .2, tf + .1), { size: 56, accent: '#9fd3ff' }); else label('HALF HIS BODY OUTSIDE', 540, 300, 56, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)', alpha: prog(t, .2, .5) }); },
  sfx(d) { return [[0, 'wind', .65, { dur: d }]]; }
};
SC.grab = { // a flight attendant grabs his legs — and doesn't let go
  draw(t, d, P, E) { const tg = E('grabs', 1, 1.3), tn = E('doesn', 1, 2.6); bg('#1e2227', '#0c0d10'); glow(700, 500, 900, 'rgba(220,240,255,.35)'); windLines(t, .25, 30);
    const k = eout(prog(t, tg - .3, tg + .2)); legGrip(t, 540, 960, 1.0, prog(t, tn, tn + .5)); if (k < 1) { ctx.fillStyle = `rgba(30,34,39,${1 - k})`; ctx.fillRect(0, 1060, W, H); }
    label(t > tn ? "DOESN'T LET GO" : 'GRABS HIS LEGS', 540, 340, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)' }); },
  sfx(d, P, E) { return [[0, 'wind', .45, { dur: d }], [E('grabs', 1, 1.3) - .2, 'thud_soft', .5], [E('doesn', 1, 2.6), 'heartbeat', .35, { dur: d - 2 }]]; }
};
SC.copilot = { // the co-pilot takes control, oxygen mask on, dives for the nearest airport
  draw(t, d, P, E) { const tdv = E('dives', 1, 2.4);
    if (t < tdv - .2) { bg('#2b3036', '#121418'); ctx.save(); cam(540, 760, 1.0); person(540, 4300, 3700, FO({ light: -1 })); oxygenMask(540, 820, 2.2); ctx.restore(); label('MAYDAY', 820, 300, 64, { weight: 900, color: '#ff6b6b', alpha: .6 + .4 * Math.sin(t * 8) }); return; }
    daySky(t); rushClouds(t, 600, 1, .5, 3); const k = prog(t, tdv - .2, d); jetBA(540, 900 + k * 200, .9, { rot: .32, blown: true }); gauge(840, 1250, 120, lerp(17000, 11000, k), 'ALT'); label(Math.round(lerp(17000, 11000, k)).toLocaleString('en-US') + ' FT', 840, 1430, 40, { weight: 900, color: '#ffd23f' }); },
  sfx(d, P, E) { return [[0, 'alarm', .25, { dur: 1.6 }], [E('dives', 1, 2.4) - .2, 'whoosh', .45], [0, 'wind', .4, { dur: d }]]; }
};
SC.hold = { // 20 minutes; sure he's dead; they refuse to let him go
  draw(t, d, P, E) { const td = E('dead', 1, 3.4), tr = E('refuse', 1, 5.2); const mins = Math.min(20, Math.floor(eio(prog(t, .1, d)) * 20));
    if (t < td - .4) { legGrip(t, 540, 1000, 1.0, .5); ctx.fillStyle = 'rgba(10,12,16,.55)'; ctx.fillRect(0, 0, W, H); dayRing(540, 720, 260, mins / 20, '#ffd23f'); bigNum(String(mins).padStart(2, '0') + ':00', 540, 720, 130, '#fff', { glow: 'rgba(255,210,80,.6)' }); label('MINUTES HOLDING ON', 540, 1080, 44, { weight: 900, color: '#ffd23f' }); return; }
    if (t < tr - .2) { noseCloseup(t, { closed: 1, frost: 1 }); ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'hsl(0,0%,50%)'; ctx.globalAlpha = .55; ctx.fillRect(0, 0, W, H); ctx.restore(); label("THEY THINK HE'S DEAD", 540, 320, 58, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)' }); return; }
    bg('#1e2227', '#0c0d10'); glow(700, 500, 900, 'rgba(220,240,255,.3)'); legGrip(t, 540, 960, 1.05, 1); label('THEY HOLD ON', 540, 340, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)' }); },
  sfx(d, P, E) { return [[0, 'wind', .45, { dur: d }], [0, 'clock', .25, { dur: E('dead', 1, 3.4) }], [E('dead', 1, 3.4) - .4, 'drone', .3, { dur: 2 }], [E('refuse', 1, 5.2) - .2, 'heartbeat', .35, { dur: 2.2 }]]; }
};
SC.landing = {
  draw(t, d) { const k = eio(prog(t, 0, d)); runway(t, k); jetBA(lerp(560, 560, k), lerp(620, 1060, k), lerp(.5, 1.0, k), { rot: lerp(.06, 0, k), blown: true, gear: true });
    if (k > .75) { const R = rnd(2); for (let i = 0; i < 10; i++) { ctx.fillStyle = `rgba(230,230,230,${.5 * (1 - prog(t, d * .8, d))})`; ctx.beginPath(); ctx.arc(620 + R() * 160, 1120 + R() * 40, 20 + R() * 40, 0, 7); ctx.fill(); } }
    fireTruck(170, 1360, .5, t); fireTruck(930, 1380, .45, t); label('SOUTHAMPTON', 540, 300, 72, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.5)', alpha: prog(t, .2, .5) }); },
  sfx(d) { return [[0, 'whoosh', .35], [d * .78, 'thud_soft', .5], [d * .6, 'siren', .2, { dur: d * .4 }]]; }
};
SC.alive = {
  draw(t, d, P, E) { const tf = E('frostbite', 1, 2.4), tb = E('broken', 1, 3.4);
    if (t < tf - .15) { hospitalRoom(t); ctx.save(); cam(540, 760, 1.0 + t * .02); person(540, 4300, 3700, CAPT({ top: '#cfe0ea', uniform: null, light: -1, closed: 1 - prog(t, .5, 1.4) })); ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 1050, W, 280); ecg(t, 1190, 1); label('ALIVE', 540, 1110, 90, { weight: 900, color: '#5dff9a', shadow: 'rgba(80,255,150,.8)' }); return; }
    bg('#030c16', '#000306'); glow(540, 900, 900, 'rgba(80,170,255,.2)'); scanlines(.08); xrayArm(480, 880, 1.2, t, [[0, 0, prog(t, tb, tb + .3), 'ELBOW'], [310, -30, prog(t, tb + .15, tb + .45), 'WRIST'], [395, 75, prog(t, tb + .3, tb + .6), 'THUMB']]);
    if (t < tb - .1) { ctx.save(); ctx.globalAlpha = .9; const R = rnd(3); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(200,235,255,.6)'; ctx.beginPath(); ctx.arc(R() * W, R() * H * .7 + 300, 3 + R() * 6, 0, 7); ctx.fill(); } ctx.restore(); label('FROSTBITE', 540, 320, 76, { weight: 900, color: '#bfe6ff', shadow: 'rgba(120,200,255,.9)' }); }
    else label('BROKEN BONES', 540, 320, 76, { weight: 900, color: '#ff9b9b', shadow: 'rgba(255,60,60,.8)' }); },
  sfx(d, P, E) { return [[0, 'beeps', .35], [E('frostbite', 1, 2.4) - .15, 'shimmer', .3], [E('broken', 1, 3.4), 'thud_soft', .4]]; }
};
SC.back = { // five months later — back in the cockpit; the shot loops back into frame 0
  draw(t, d) { cockpitFromFront(t, { alt: 3200 }); ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 300, 900, 'rgba(255,200,130,.35)'); ctx.restore();
    label('5 MONTHS LATER', 540, 300, 64, { weight: 900, color: '#ffd23f', shadow: 'rgba(0,0,0,.6)', alpha: prog(t, .1, .4) }); },
  sfx(d) { return [[0, 'hum', .3, { dur: d }], [0, 'pad_swell', .3, { dur: d }]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total) drawSubs(t); };
