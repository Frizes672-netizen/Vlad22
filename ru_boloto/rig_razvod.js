// ===== "РАЗВОД ИЛИ НЕТ?" — rig additions + props shared by the episodes =====
// ---- age lines (front face, called from faceFront in the face transform) ----
function ageLines(u, a) { ctx.lineCap = 'round';
  const ln = (x0, y0, cx, cy, x1, y1, al, w) => { ctx.strokeStyle = `rgba(110,55,40,${al * a})`; ctx.lineWidth = w * u; ctx.beginPath(); ctx.moveTo(x0 * u, y0 * u); ctx.quadraticCurveTo(cx * u, cy * u, x1 * u, y1 * u); ctx.stroke(); };
  const hl = (x0, y0, cx, cy, x1, y1, al, w) => { ctx.strokeStyle = `rgba(255,234,218,${al * a})`; ctx.lineWidth = w * u; ctx.beginPath(); ctx.moveTo(x0 * u, y0 * u); ctx.quadraticCurveTo(cx * u, cy * u, x1 * u, y1 * u); ctx.stroke(); };
  for (const k of [-1, 1]) {
    softBlob(k * 1.95 * u, 3.4 * u, .55 * u, 1.25 * u, '110,55,40', .13 * a);                          // nasolabial shadow
    ln(k * 1.0, 2.4, k * 2.1, 3.2, k * 2.2, 4.7, .42, .13); hl(k * 1.25, 2.3, k * 2.45, 3.05, k * 2.55, 4.5, .35, .12); // fold + lit ridge above it
    ln(k * 2.05, 4.6, k * 2.3, 5.25, k * 2.4, 5.95, .22, .09);                                          // marionette line
    const ox = k * 3.3; for (let q = 0; q < 3; q++) ln(ox + k * .15, -.45 + (q - 1) * .28, ox + k * .45, -.42 + (q - 1) * .38, ox + k * .8, -.35 + (q - 1) * .55, .3, .065); // crow's feet
    ln(k * 1.35, .6, k * 2.2, 1.2, k * 3.05, .55, .28, .085); softBlob(k * 2.2 * u, .98 * u, .95 * u, .28 * u, '110,55,40', .1 * a); // under-eye bag
    softBlob(k * 3.7 * u, 5.7 * u, 1.2 * u, 1.5 * u, '110,55,40', .12 * a);                            // jowls
    ln(k * 3.0, 6.6, k * 2.2, 7.3, k * 1.2, 7.45, .12, .1);
  }
  ln(-2.3, -4.4, 0, -4.75, 2.3, -4.4, .16, .075); ln(-1.9, -5.2, 0, -5.45, 1.9, -5.2, .12, .07);         // forehead lines
  ln(-.45, -1.65, -.38, -1.2, -.28, -.88, .18, .065); ln(.45, -1.65, .38, -1.2, .28, -.88, .18, .065);   // frown lines
  ln(-1.0, 5.25, 0, 5.05, 1.0, 5.25, .12, .07); }                                                     // chin crease
// ---- glasses: thin metal-rimmed frames ----
function drawGlasses(u, C, L) { const fx = 2.25 * u, fy = -.32 * u, fw = 1.58 * u, fh = 1.1 * u, col = C.glasses === true ? '#8a6a45' : C.glasses;
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * fx, fy);
    ctx.fillStyle = 'rgba(205,225,245,.07)'; rr(-fw, -fh, fw * 2, fh * 2, fh * .85); ctx.fill();
    ctx.save(); rr(-fw, -fh, fw * 2, fh * 2, fh * .85); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(-fw * .9, -fh); ctx.lineTo(-fw * .25, -fh); ctx.lineTo(-fw * .95, fh * .2); ctx.closePath(); ctx.fill(); ctx.restore(); // lens glint
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .26 * u; rr(-fw, -fh + .06 * u, fw * 2, fh * 2, fh * .85); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = .17 * u; rr(-fw, -fh, fw * 2, fh * 2, fh * .85); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,240,210,.5)'; ctx.lineWidth = .06 * u; ctx.beginPath(); ctx.moveTo(-fw * .6, -fh); ctx.lineTo(fw * .5, -fh); ctx.stroke(); ctx.restore();
    ctx.strokeStyle = col; ctx.lineWidth = .16 * u; ctx.beginPath(); ctx.moveTo(k * (fx + fw), fy - fh * .45); ctx.lineTo(k * 5.35 * u, fy - .15 * u); ctx.stroke();   // temple arm
    softBlob(k * fx, fy + fh + .3 * u, fw * .8, .2 * u, '90,45,30', .1); }
  ctx.strokeStyle = col; ctx.lineWidth = .16 * u; ctx.beginPath(); ctx.moveTo(-(fx - fw), fy - fh * .3); ctx.quadraticCurveTo(0, fy - fh * .85, fx - fw, fy - fh * .3); ctx.stroke(); // bridge
  for (const k of [-1, 1]) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(k * .78 * u, fy + .2 * u, .14 * u, 0, 7); ctx.fill(); } } // nose pads
// ---- right hand holding a phone to the right ear (front view; drawn over the head) ----
function phoneEarHand(u, P, C) { const hy = P.headY, sk = C.skin, wr = P.hdR;
  // phone: slim slab against the ear, the bottom angled towards the mouth
  ctx.save(); ctx.translate(4.85 * u, hy + 1.7 * u); ctx.rotate(.2);
  ctx.fillStyle = 'rgba(40,15,10,.22)'; rr(-1.7 * u, -4.6 * u, 1.6 * u, 9.6 * u, .6 * u); ctx.fill(); // its shadow on the cheek
  ctx.fillStyle = grad(-.8 * u, 0, .8 * u, 0, [[0, '#30333b'], [.35, '#575c68'], [.6, '#1c1e24'], [1, '#0d0e12']]); rr(-.8 * u, -4.9 * u, 1.6 * u, 9.7 * u, .7 * u); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(-.48 * u, -4.55 * u, .12 * u, 9 * u); ctx.restore();
  // back of the hand, seen from the outside, rising from the cuff to the column of knuckles
  const hb = new Path2D(); hb.moveTo(wr[0] - 1.5 * u, wr[1] + .8 * u); hb.bezierCurveTo(wr[0] - 2.3 * u, wr[1] - 2.2 * u, 5.4 * u, hy + 5.2 * u, 5.9 * u, hy + 3.4 * u);
  hb.lineTo(6.6 * u, hy - 1.6 * u); hb.bezierCurveTo(7.9 * u, hy - 1.9 * u, 8.5 * u, hy + 1 * u, 8.5 * u, hy + 3.4 * u); hb.bezierCurveTo(8.6 * u, hy + 5.4 * u, wr[0] + 1.6 * u, wr[1] - 2 * u, wr[0] + 1.3 * u, wr[1] + .8 * u); hb.closePath();
  ctx.fillStyle = grad(5 * u, 0, 8.6 * u, 0, [[0, shade(sk, .8)], [.45, shade(sk, 1.02)], [1, shade(sk, .72)]]); ctx.fill(hb);
  ctx.save(); ctx.clip(hb); ctx.strokeStyle = 'rgba(255,232,215,.35)'; ctx.lineWidth = .22 * u; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(wr[0] - .4 * u + i * .5 * u, wr[1] - .5 * u); ctx.quadraticCurveTo(7.2 * u, hy + 4 * u, 7.4 * u - i * .2 * u, hy + (i * 1.5 - .8) * u); ctx.stroke(); } // tendons
  softBlob(7.4 * u, hy + 5.6 * u, .3 * u, .25 * u, '150,90,60', .35 * (C.age || 0)); softBlob(6.8 * u, hy + 6.6 * u, .22 * u, .2 * u, '150,90,60', .3 * (C.age || 0)); ctx.restore(); // age spots
  // four fingers stacked along the back of the phone, curling over its edge towards the face
  const F = [[-1.2, 1.18], [.05, 1.22], [1.28, 1.16], [2.42, 1.0]];
  for (let i = F.length - 1; i >= 0; i--) { const [dy, fw] = F[i], ky = hy + dy * u, x0 = 7.85 * u - i * .12 * u, x1 = 5.55 * u + i * .1 * u, y1 = ky + .32 * u;
    const pth = fingerPath(x0, ky, x1, y1, fw * u, fw * .88 * u); fillFinger(pth, x0, ky, x1, y1, fw * u, sk, -1, .05);
    ctx.fillStyle = 'rgba(255,235,220,.4)'; ctx.beginPath(); ctx.ellipse(x0 - .1 * u, ky - .15 * u, .42 * u, .3 * u, 0, 0, 7); ctx.fill(); // knuckle
    ctx.strokeStyle = 'rgba(110,50,35,.32)'; ctx.lineWidth = .07 * u; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(lerp(x0, x1, .5) + k * .14 * u, lerp(ky, y1, .5), fw * .3 * u, -Math.PI / 2 - .9, -Math.PI / 2 + .9); ctx.stroke(); } // knuckle wrinkles
    nailAt(x1 - .05 * u, y1 + .02 * u, Math.PI / 2 + .08, fw * .52 * u, fw * .5 * u); softBlob(x1 + .3 * u, y1 + fw * .5 * u, fw * .5 * u, .18 * u, '0,0,0', .22); }
  if (C.age) { ctx.fillStyle = grad(0, hy + .1 * u, 0, hy + 1.5 * u, [[0, '#f4d98a'], [.5, '#c79a3a'], [1, '#8a6420']]); ctx.fillRect(6.75 * u, hy + 1.0 * u, .42 * u, 1.05 * u); } // wedding ring (right hand, the Russian way)
  // thumb in front, along the lower edge of the phone
  const tb = [6.1 * u, hy + 6.3 * u], tt = [4.45 * u, hy + 3.85 * u], tp = fingerPath(tb[0], tb[1], tt[0], tt[1], 1.42 * u, 1.12 * u); fillFinger(tp, tb[0], tb[1], tt[0], tt[1], 1.35 * u, sk, 1, .04);
  nailAt(lerp(tb[0], tt[0], .82), lerp(tb[1], tt[1], .82), Math.atan2(tt[1] - tb[1], tt[0] - tb[0]) + Math.PI / 2, .6 * u, .72 * u); }

// ---- offscreen layer cache: draws fn once (optionally blurred) and returns a canvas you can drawImage under any camera ----
const _layers = {};
function layer(key, fn, blur = 0) { let c = _layers[key]; if (c) return c;
  const mk = () => { const k = document.createElement('canvas'); k.width = W; k.height = H; return k; };
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; const snap = mk(); snap.getContext('2d').drawImage(cv, 0, 0); ctx.clearRect(0, 0, W, H);
  ctx.save(); fn(); ctx.restore(); c = mk(); const g = c.getContext('2d'); if (blur) g.filter = `blur(${blur}px)`; g.drawImage(cv, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); ctx.drawImage(snap, 0, 0); ctx.restore(); _layers[key] = c; return c; }

// ---- icons ----
function handsetIcon(x, y, s, rot = 0, col = '#fff') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot - .8); ctx.scale(s, s); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineCap = 'round';
  ctx.lineWidth = 15; ctx.beginPath(); ctx.arc(0, 8, 30, Math.PI * 1.12, Math.PI * 1.88); ctx.stroke();
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * 29, 4); ctx.rotate(k * .55); rr(-12, -6, 24, 30, 9); ctx.fill(); ctx.restore(); } ctx.restore(); }
function shieldIcon(x, y, s, col = '#fff', check = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(28, -44, 50, -46); ctx.quadraticCurveTo(54, 30, 0, 62); ctx.quadraticCurveTo(-54, 30, -50, -46); ctx.quadraticCurveTo(-28, -44, 0, -60); ctx.fill();
  if (check) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-4, 16); ctx.lineTo(24, -16); ctx.stroke(); } ctx.restore(); }
function badgeIcon(x, y, s, col = '#ffd23f') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); for (let k = 0; k < 16; k++) { const r = k % 2 ? 40 : 60, a = k * Math.PI / 8 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); for (let k = 0; k < 10; k++) { const r = k % 2 ? 9 : 22, a = k * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.restore(); }
function padlock(x, y, s, p = 1, col = '#ffd23f', open = 0) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
  ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 26; ctx.beginPath(); ctx.arc(0, -60 - open * 40, 62, Math.PI, 0); ctx.lineTo(62, -10 - open * 40); ctx.moveTo(-62, -60 - open * 40); ctx.lineTo(-62, -10); ctx.stroke();
  ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-100 + 10, -20 + 14, 200, 170, 30); ctx.fill(); ctx.fillStyle = grad(-100, 0, 100, 0, [[0, shade(col, .75)], [.5, col], [1, shade(col, .7)]]); rr(-100, -20, 200, 170, 30); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.beginPath(); ctx.arc(0, 50, 20, 0, 7); ctx.fill(); ctx.fillRect(-8, 50, 16, 46); ctx.fillStyle = 'rgba(255,255,255,.3)'; rr(-84, -6, 30, 140, 14); ctx.fill(); ctx.restore(); }
function checkMark(x, y, r, p, col = '#22b357') { if (p <= 0) return; const k = eback(clamp(p * 1.6)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const q = clamp(p * 1.6 - .3); ctx.beginPath(); ctx.moveTo(-r * .45, 0); ctx.lineTo(-r * .45 + r * .3 * clamp(q * 2), r * .3 * clamp(q * 2)); if (q > .5) ctx.lineTo(-r * .15 + r * .65 * clamp(q * 2 - 1), r * .3 - r * .65 * clamp(q * 2 - 1)); ctx.stroke(); ctx.restore(); }
function xMark(x, y, r, p, col = '#e3262f') { if (p <= 0) return; const k = eback(clamp(p * 1.6)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-r * .38, -r * .38); ctx.lineTo(r * .38, r * .38); ctx.moveTo(r * .38, -r * .38); ctx.lineTo(-r * .38, r * .38); ctx.stroke(); ctx.restore(); }
function statusBar(w, h, col = '#fff', tm = '10:24') { label(tm, -w / 2 + 62, -h / 2 + 50, 26, { weight: 800, color: col });
  for (let i = 0; i < 4; i++) { ctx.fillStyle = col; rr(w / 2 - 150 + i * 11, -h / 2 + 52 - 8 - i * 5, 7, 8 + i * 5, 2); ctx.fill(); }
  ctx.strokeStyle = col; ctx.lineWidth = 2.5; rr(w / 2 - 86, -h / 2 + 30, 44, 22, 6); ctx.stroke(); ctx.fillStyle = col; rr(w / 2 - 82, -h / 2 + 34, 30, 14, 3); ctx.fill(); ctx.fillRect(w / 2 - 40, -h / 2 + 37, 3, 8); }

// ---- phone call screen (centered at 0,0, w × h): 'in' (ringing), 'active' (timer), 'ended' ----
function callScreen(w, h, t, o = {}) { const st = o.state || 'in';
  ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, o.c1 || '#1d4a73'], [.55, o.c2 || '#10263f'], [1, '#07101c']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  glow(0, -h * .2, w * .95, o.glowCol || 'rgba(110,180,255,.28)'); statusBar(w, h);
  const ay = -h * .27, ar = w * .17;
  if (st === 'in') for (let k = 0; k < 3; k++) { const q = (t * .9 + k / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.35 * (1 - q)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, ay, ar * (1 + q * .9), 0, 7); ctx.stroke(); } // ringing pulses
  ctx.fillStyle = o.avatar || '#2f7de1'; ctx.beginPath(); ctx.arc(0, ay, ar, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.beginPath(); ctx.arc(-ar * .3, ay - ar * .3, ar * .6, 0, 7); ctx.fill();
  if (o.icon === 'badge') badgeIcon(0, ay, ar / 70); else shieldIcon(0, ay + 4, ar / 72, '#fff', true);
  label(o.top || (st === 'in' ? 'входящий вызов' : st === 'ended' ? 'вызов завершён' : (o.timer || '00:00')), 0, -h * .085, w * .05, { weight: 700, color: st === 'ended' ? '#ff7a7a' : 'rgba(255,255,255,.75)' });
  const nm = (o.name || '').split('\n'); nm.forEach((s, i) => label(s, 0, -h * .015 + i * w * .1, w * .085, { weight: 800 }));
  label(o.num || '', 0, -h * .015 + nm.length * w * .1, w * .052, { weight: 700, color: 'rgba(255,255,255,.75)' });
  if (o.sub) label(o.sub, 0, -h * .015 + nm.length * w * .1 + w * .07, w * .042, { weight: 600, color: 'rgba(255,255,255,.55)' });
  if (st === 'in') { const by = h * .36, br = w * .115, pulse = 1 + .06 * Math.sin(t * 9);
    ctx.fillStyle = '#ff3b30'; ctx.beginPath(); ctx.arc(-w * .26, by, br, 0, 7); ctx.fill(); handsetIcon(-w * .26, by, br / 44, Math.PI * .75);
    ctx.save(); ctx.translate(w * .26, by); ctx.scale(pulse, pulse); ctx.fillStyle = '#34c759'; ctx.beginPath(); ctx.arc(0, 0, br, 0, 7); ctx.fill(); handsetIcon(0, 0, br / 44, 0); ctx.restore();
    label('Отклонить', -w * .26, by + br + 40, w * .04, { weight: 700, color: 'rgba(255,255,255,.8)' }); label('Принять', w * .26, by + br + 40, w * .04, { weight: 700, color: 'rgba(255,255,255,.8)' }); }
  else if (st === 'active') { const gy = h * .12; for (let i = 0; i < 6; i++) { const cx = (i % 3 - 1) * w * .27, cy = gy + Math.floor(i / 3) * w * .3; ctx.fillStyle = i === 2 && o.speaker ? '#fff' : 'rgba(255,255,255,.16)'; ctx.beginPath(); ctx.arc(cx, cy, w * .095, 0, 7); ctx.fill();
      ctx.fillStyle = i === 2 && o.speaker ? '#10263f' : '#fff'; for (let d = 0; d < 3; d++) rr(cx - w * .03 + d * w * .022, cy - w * .015 - d * w * .008, w * .013, w * .03 + d * w * .016, 3), ctx.fill(); }
    ctx.fillStyle = '#ff3b30'; ctx.beginPath(); ctx.arc(0, h * .38, w * .115, 0, 7); ctx.fill(); handsetIcon(0, h * .38, w * .115 / 44, Math.PI * .75); }
  else { ctx.fillStyle = 'rgba(255,255,255,.12)'; rr(-w * .3, h * .3, w * .6, w * .13, w * .065); ctx.fill(); label(o.timer || '', 0, h * .3 + w * .085, w * .05, { weight: 800, color: 'rgba(255,255,255,.7)' }); } }

// ---- POV: her right hand holding the phone up, screen towards us (elderly hand: veins, spots, wedding ring) ----
function holdPhoneHand(x, y, s, rot, drawScreen, o = {}) { const sk = o.skin || '#e9bca3'; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  sleeveCuff(60, 770, 320, o.sleeve || '#7b4e63');
  const palm = new Path2D(); palm.moveTo(-90, 800); palm.bezierCurveTo(-120, 650, -230, 560, -262, 420); palm.lineTo(-150, 300); palm.lineTo(240, 300); palm.lineTo(240, -60); palm.bezierCurveTo(300, -78, 352, -66, 372, -20); palm.bezierCurveTo(392, 120, 386, 300, 352, 470); palm.bezierCurveTo(320, 620, 250, 700, 230, 800); palm.closePath(); // palm + the outer edge of the hand behind the fingers
  ctx.fillStyle = grad(-260, 0, 330, 0, [[0, shade(sk, .76)], [.35, shade(sk, 1.02)], [.75, sk], [1, shade(sk, .72)]]); ctx.fill(palm);
  ctx.save(); ctx.clip(palm); softBlob(-150, 520, 130, 110, '255,228,210', .28); softBlob(220, 560, 90, 160, '120,55,40', .22);
  ctx.strokeStyle = 'rgba(120,55,40,.3)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-200, 470); ctx.quadraticCurveTo(-70, 600, -40, 790); ctx.stroke(); // thenar crease
  ctx.strokeStyle = 'rgba(110,140,190,.22)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(40, 800); ctx.bezierCurveTo(60, 700, 20, 640, 70, 560); ctx.stroke(); // vein at the wrist
  for (const [ax, ay, ar] of [[120, 620, 12], [60, 690, 9], [170, 700, 8]]) softBlob(ax, ay, ar, ar * .8, '150,90,60', .35); ctx.restore(); // age spots
  // phone
  ctx.fillStyle = 'rgba(0,0,0,.4)'; rr(-250 + 22, -512 + 30, 500, 1025, 74); ctx.fill();
  ctx.fillStyle = grad(-250, 0, 250, 0, [[0, '#4a4e58'], [.05, '#17181c'], [.95, '#17181c'], [1, '#4a4e58']]); rr(-250, -512, 500, 1025, 74); ctx.fill();
  ctx.save(); rr(-232, -494, 464, 988, 60); ctx.clip(); drawScreen(464, 988);
  ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(-232, -494); ctx.lineTo(90, -494); ctx.lineTo(-232, 260); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#050506'; rr(-72, -478, 144, 38, 19); ctx.fill();
  // thumb on the left edge
  const tb = [-305, 430], tt = [-214, 128], tp = fingerPath(tb[0], tb[1], tt[0], tt[1], 112, 84); fillFinger(tp, tb[0], tb[1], tt[0], tt[1], 104, sk, 1, .05);
  creaseAt(tb[0], tb[1], tt[0], tt[1], .5, 100, .3, 3); nailAt(-209, 168, -.3, 46, 56); softBlob(-262, 300, 30, 60, '255,230,215', .2);
  // fingertips wrapping around the right edge (index … little), ring on the ring finger
  [[0, 90], [92, 94], [182, 88], [262, 74]].forEach(([fy, fw], i) => { const x0 = 362, x1 = 226, y0 = fy + 26;
    const pth = fingerPath(x0, y0, x1, fy, fw, fw * .84); fillFinger(pth, x0, y0, x1, fy, fw, sk, -1, .06);
    ctx.strokeStyle = 'rgba(110,50,35,.3)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(298 + k * 8, lerp(y0, fy, .45), fw * .3, -Math.PI / 2 - .9, -Math.PI / 2 + .9); ctx.stroke(); } // knuckle wrinkles
    nailAt(x1 + fw * .2, fy + 3, -Math.PI / 2 + .12, fw * .5, fw * .56); softBlob(x1 + 30, fy + fw * .5, fw * .5, 10, '0,0,0', .25);
    if (i === 2) { ctx.fillStyle = grad(0, fy, 0, fy + fw, [[0, '#f6de94'], [.5, '#c99a3a'], [1, '#8a6420']]); ctx.save(); ctx.clip(pth); ctx.fillRect(318, fy - 20, 22, fw + 60); ctx.restore(); }
    if (i) softBlob(320, fy - fw * .48, 50, 7, '90,40,30', .35); }); // shadow line between neighbouring fingers
  ctx.restore(); }
// ---- data card flying out of the phone ----
function dataCard(x, y, w, title, val, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k, k); const h = w * .34;
  ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-w / 2 + 10, -h / 2 + 14, w, h, 26); ctx.fill(); ctx.fillStyle = '#ffffff'; rr(-w / 2, -h / 2, w, h, 26); ctx.fill();
  ctx.fillStyle = o.col || '#ffd23f'; rr(-w / 2, -h / 2, 16, h, 8); ctx.fill();
  label(title, -w / 2 + 44, -h / 2 + h * .36, h * .2, { align: 'left', weight: 800, color: '#7a8494', spacing: 3 }); label(val, -w / 2 + 44, h * .3, h * .36, { align: 'left', weight: 900, color: '#141821', font: o.font }); ctx.restore(); }
// ---- CRM on the "operator's" monitor ----
function crmUI(w, h, t, o = {}) { ctx.fillStyle = '#eef2f7'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = '#12233f'; ctx.fillRect(-w / 2, -h / 2, w * .2, h);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = i === 1 ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.07)'; rr(-w / 2 + w * .02, -h / 2 + h * .16 + i * h * .1, w * .16, h * .07, 8); ctx.fill(); }
  shieldIcon(-w / 2 + w * .1, -h / 2 + h * .07, w / 1400, '#4ea1ff', false);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-w * .3, -h / 2, w * .8, h * .1); label('КАРТОЧКА КЛИЕНТА', -w * .27, -h / 2 + h * .065, h * .036, { align: 'left', weight: 900, color: '#12233f', spacing: 2 });
  const rows = [['ФИО', 'Галина Петровна К.'], ['Карта', '•••• 4417'], ['Адрес', 'ул. Садовая, 12'], ['Телефон', '+7 9•• •••-••-17']];
  rows.forEach(([a, b], i) => { const ry = -h / 2 + h * .19 + i * h * .095, vis = clamp(((o.rowsP ?? 1) * 4) - i); if (vis <= 0) return; ctx.globalAlpha = vis; ctx.fillStyle = '#ffffff'; rr(-w * .28, ry - h * .04, w * .5, h * .08, 10); ctx.fill();
    label(a, -w * .26, ry + h * .012, h * .03, { align: 'left', weight: 700, color: '#7a8494' }); label(b, -w * .12, ry + h * .014, h * .036, { align: 'left', weight: 900, color: '#12233f', font: i === 1 ? MONO : undefined }); ctx.globalAlpha = 1; });
  // transactions panel
  ctx.fillStyle = '#ffffff'; rr(w * .25, -h / 2 + h * .15, w * .23, h * .4, 14); ctx.fill(); label('БАЛАНС', w * .365, -h / 2 + h * .22, h * .028, { weight: 800, color: '#7a8494' }); label(o.bal || '612 480 ₽', w * .365, -h / 2 + h * .29, h * .045, { weight: 900, color: '#12233f' });
  const ty = h * .14, cancelled = o.cancelled || 0, blink = .6 + .4 * Math.sin(t * 10);
  ctx.fillStyle = cancelled > .5 ? '#e8f8ee' : `rgba(255,${200 - 120 * blink},${200 - 120 * blink},1)`; rr(-w * .28, ty - h * .07, w * .76, h * .14, 14); ctx.fill();
  ctx.strokeStyle = cancelled > .5 ? '#22b357' : '#e3262f'; ctx.lineWidth = 4; rr(-w * .28, ty - h * .07, w * .76, h * .14, 14); ctx.stroke();
  label('Списание с карты •••• 4417', -w * .25, ty - h * .012, h * .032, { align: 'left', weight: 800, color: '#12233f' }); label(cancelled > .5 ? 'ОТМЕНЕНО' : 'ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ', -w * .25, ty + h * .04, h * .026, { align: 'left', weight: 900, color: cancelled > .5 ? '#22b357' : '#e3262f', spacing: 2 });
  label(o.amount || '− 49 000 ₽', w * .45, ty + h * .015, h * .052, { align: 'right', weight: 900, color: cancelled > .5 ? '#9aa3b0' : '#e3262f' });
  if (cancelled > .5) { ctx.strokeStyle = '#9aa3b0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(w * .23, ty + h * .002); ctx.lineTo(w * .46, ty + h * .002); ctx.stroke(); }
  const bx = w * .1, byy = h * .33; ctx.fillStyle = cancelled > .5 ? '#22b357' : '#1f6fe0'; rr(bx - w * .13, byy - h * .045, w * .26, h * .09, h * .045); ctx.fill(); label(cancelled > .5 ? '✓ ГОТОВО' : 'ОТМЕНИТЬ', bx, byy + h * .014, h * .034, { weight: 900, color: '#fff', spacing: 2 });
  if (o.cursor) { const [cx, cy] = o.cursor; ctx.save(); ctx.translate(cx * w, cy * h); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 46); ctx.lineTo(12, 35); ctx.lineTo(22, 56); ctx.lineTo(30, 52); ctx.lineTo(20, 32); ctx.lineTo(36, 32); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } }
