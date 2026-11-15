// ===== RU Short: "Ты можешь отмотать время на 10 секунд. Но только 10 раз." (what-if with a twist; helpers from earlier episodes are loaded before) =====
const RHERO = (o = {}) => Object.assign({ uniform: 'office', top: '#f6f7f9', tie: '#2b3a55', pants: '#2a2f3a', hair: '#3a2618', skin: '#e6b99c', eyes: '#5b6b62', light: 1 }, o);
const RHERO_EVE = (o = {}) => RHERO(Object.assign({ uniform: null, tie: null, top: '#2b2f38', pants: '#23262e', shoe: '#e8e6ea' }, o)); // evening: dark jacket over the shirt
const RBOY = (o = {}) => Object.assign({ kid: true, top: '#e0482f', pants: '#2d3f5e', hair: '#6b4a2c', skin: '#efc6ab', light: 1, shoe: '#f0f0f0' }, o);
const RMOM = (o = {}) => Object.assign({ fem: true, top: '#5a7a9a', pants: '#2a2f3a', hair: '#7a4a2a', skin: '#ecc2a8', light: -1 }, o);
const RBOSS = (o = {}) => BOSS2(Object.assign({ age: .75, glasses: true, hair: '#8f8a84', top: '#dfe6ee', tie: '#7a1f2a', heavy: .55 }, o));
const RW_CYAN = '#4fe3ff', RW_RED = '#ff4d57';
const rwCol = n => n <= 1 ? RW_RED : RW_CYAN;

// ---------- his forearm: inner side towards us, the counter glows under the skin ----------
function rewindArm(x, y, s, n, t, o = {}) { const sk = o.skin || '#e6b99c', col = rwCol(n); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.12); ctx.scale(s, s);
  softBlob(30, 520, 260, 520, '0,0,0', .28); // soft shadow of the arm on the background
  // white shirt sleeve + cuff with a button
  const sl = o.sleeve || '#f4f5f7'; ctx.fillStyle = grad(-190, 0, 190, 0, [[0, shade(sl, .76)], [.4, shade(sl, 1.04)], [.75, shade(sl, .97)], [1, shade(sl, .7)]]); ctx.beginPath(); ctx.moveTo(-150, 640); ctx.bezierCurveTo(-200, 900, -230, 1200, -260, 1500); ctx.lineTo(260, 1500); ctx.bezierCurveTo(230, 1200, 200, 900, 150, 640); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(80,90,110,.18)'; ctx.lineWidth = 6; for (const k of [-90, -20, 60, 120]) { ctx.beginPath(); ctx.moveTo(k, 760); ctx.bezierCurveTo(k + 30, 900, k - 20, 1100, k + 10, 1400); ctx.stroke(); } // sleeve folds
  ctx.fillStyle = grad(-170, 0, 170, 0, [[0, shade(sl, .8)], [.45, shade(sl, 1.05)], [1, shade(sl, .74)]]); rr(-168, 610, 336, 110, 34); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-160, 700); ctx.lineTo(160, 700); ctx.stroke();
  ctx.fillStyle = '#e9e4dc'; ctx.beginPath(); ctx.arc(110, 664, 14, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (const [a, b] of [[-4, -4], [4, -4], [-4, 4], [4, 4]]) { ctx.beginPath(); ctx.arc(110 + a, 664 + b, 2.2, 0, 7); ctx.fill(); }
  // forearm
  const fa = new Path2D(); fa.moveTo(-86, 150); fa.bezierCurveTo(-98, 300, -150, 470, -150, 630); fa.lineTo(150, 630); fa.bezierCurveTo(150, 470, 102, 300, 88, 150); fa.closePath();
  ctx.fillStyle = grad(-150, 0, 150, 0, [[0, shade(sk, .74)], [.3, shade(sk, .98)], [.55, shade(sk, 1.06)], [1, shade(sk, .76)]]); ctx.fill(fa);
  ctx.save(); ctx.clip(fa); softBlob(-20, 420, 70, 160, '255,232,215', .3); softBlob(120, 400, 40, 220, '110,50,35', .2); softBlob(-130, 420, 30, 220, '110,50,35', .22);
  ctx.strokeStyle = 'rgba(255,236,222,.45)'; ctx.lineWidth = 7; for (const k of [-24, 18]) { ctx.beginPath(); ctx.moveTo(k, 160); ctx.quadraticCurveTo(k * 1.4, 260, k * 2, 360); ctx.stroke(); } // tendons at the wrist
  ctx.strokeStyle = 'rgba(95,120,175,.28)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-40, 170); ctx.bezierCurveTo(-70, 300, 10, 420, -30, 630); ctx.moveTo(40, 190); ctx.bezierCurveTo(60, 300, 90, 400, 70, 630); ctx.stroke(); // veins
  const R = rnd(7); ctx.strokeStyle = 'rgba(70,40,25,.16)'; ctx.lineWidth = 2; for (let i = 0; i < 70; i++) { const hx = -130 + R() * 260, hy = 380 + R() * 240; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 4, hy - 14); ctx.stroke(); } // fine hair
  // the counter, glowing from under the skin
  const pulse = .75 + .25 * Math.sin(t * 6), flick = o.flicker ? (Math.sin(t * 47) > .2 ? 1 : .35) : 1;
  ctx.globalCompositeOperation = 'lighter'; softBlob(0, 400, 150, 150, col === RW_RED ? '255,60,70' : '60,210,255', .35 * pulse * flick);
  ctx.globalCompositeOperation = 'source-over'; ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 50 * pulse; ctx.globalAlpha = flick; ctx.font = `900 190px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = shade(col, 1.15); ctx.fillText(String(n), 0, 390); ctx.restore();
  for (let i = 0; i < 10; i++) { const px = -112 + i * 25, on = i < n; ctx.fillStyle = on ? col : 'rgba(60,30,20,.22)'; if (on) { ctx.shadowColor = col; ctx.shadowBlur = 14; } rr(px - 9, 520, 18, 46, 8); ctx.fill(); ctx.shadowBlur = 0; } // 10 pips
  ctx.restore();
  helpHand(0, 0, 1, 0, .12, o.curl ?? .22, { noCuff: true, skin: sk });
  ctx.restore(); }

function rewindFX(t, a = 1, o = {}) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
  const R = rnd(Math.floor(t * 30)); for (let i = 0; i < 14; i++) { const y = R() * H, h = 6 + R() * 40; ctx.drawImage(cv, 0, y, W, h, (R() - .5) * 80, y, W, h); } // tearing scanlines
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(0,180,255,.08)'; ctx.fillRect(-6, 0, W, H); ctx.fillStyle = 'rgba(255,40,80,.06)'; ctx.fillRect(6, 0, W, H); ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(255,255,255,.06)'; for (let y = (t * 900) % 8; y < H; y += 8) ctx.fillRect(0, y, W, 2); // VHS lines
  ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.font = `900 60px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText('◀◀ ' + (o.txt || '-00:10'), 60, 140); ctx.restore(); }
function counterHud(n, t, p = 1) { ctx.save(); ctx.globalAlpha = clamp(p); ctx.fillStyle = 'rgba(8,10,16,.75)'; rr(810, 80, 210, 130, 34); ctx.fill(); ctx.strokeStyle = rwCol(n); ctx.globalAlpha *= .5; ctx.lineWidth = 3; rr(810, 80, 210, 130, 34); ctx.stroke(); ctx.globalAlpha = clamp(p);
  ctx.shadowColor = rwCol(n); ctx.shadowBlur = 20; label('◀◀', 860, 162, 34, { weight: 900, color: rwCol(n), font: MONO }); label(String(n), 955, 175, 80, { weight: 900, color: rwCol(n), font: MONO }); ctx.restore(); }
function numFlip(n0, n1, x, y, size, q) { ctx.save(); ctx.translate(x, y); const k = eio(clamp(q)); ctx.fillStyle = `rgba(0,0,0,${.45 * Math.sin(Math.PI * clamp(q * 1.4))})`; ctx.fillRect(-x, -y, W, H);
  ctx.save(); ctx.globalAlpha = 1 - k; ctx.translate(0, -k * size * .6); bigNum(String(n0), 0, 0, size, rwCol(n0), { glow: 'rgba(80,220,255,.8)' }); ctx.restore(); ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * size * .6); bigNum(String(n1), 0, 0, size, rwCol(n1), { glow: 'rgba(80,220,255,.8)' }); ctx.restore(); ctx.restore(); }
// a small mishap: plays forward, rewinds back to "pre" (the moment before it), then the counter flips; after that the clean moment holds
function mishap(t, d, s, draw, n0, pre) { const tr = s.U(s.a + (s.b - s.a >= 2 ? s.b - s.a - 1 : 1)), tn = s.U(s.b), r0 = tr - .1;
  let lt = t; if (t > r0) lt = t < tn ? lerp(r0, pre, eio(prog(t, r0, tn))) : pre;
  draw(lt, t); if (t > r0 && t < tn + .15) rewindFX(t, t < tn ? 1 : 1 - (t - tn) / .15, { txt: '-00:' + String(Math.max(1, Math.round(10 * (1 - prog(t, r0, tn))))).padStart(2, '0') }); counterHud(t > tn - .1 ? n0 - 1 : n0, t);
  if (t > tn - .1) numFlip(n0, n0 - 1, 540, 980, 280, prog(t, tn - .1, tn + .3)); }

function coffeeCup(x, y, s, tip) { ctx.save(); ctx.translate(x, y); ctx.rotate(tip); ctx.scale(s, s); ctx.fillStyle = grad(-60, 0, 60, 0, [[0, '#d6d9de'], [.4, '#ffffff'], [1, '#c3c8cf']]); ctx.beginPath(); ctx.moveTo(-60, -80); ctx.lineTo(60, -80); ctx.lineTo(48, 60); ctx.lineTo(-48, 60); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#e8eaee'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(70, -10, 28, -1.3, 1.3); ctx.stroke(); ctx.fillStyle = '#c8452f'; ctx.fillRect(-58, -40, 116, 18); if (tip < 1.2) { ctx.fillStyle = '#5a2e12'; ctx.beginPath(); ctx.ellipse(0, -78, 56, 11, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function coffeeStain(x, y, k, seed = 3) { if (k <= 0) return; const R = rnd(seed); ctx.save(); ctx.translate(x, y); ctx.fillStyle = 'rgba(110,58,22,.88)'; ctx.beginPath(); const N = 22;
  for (let i = 0; i <= N; i++) { const a = i / N * 6.283, rr0 = (60 + 40 * R()) * k * (1 + .4 * Math.sin(a * 3 + seed)), px = Math.cos(a) * rr0 * .9, py = Math.sin(a) * rr0 * 1.25 + (a > .5 && a < 2.6 ? 60 * k : 0); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(80,40,14,.6)'; ctx.beginPath(); ctx.ellipse(-10, 10, 50 * k, 60 * k, .2, 0, 7); ctx.fill();
  for (let i = 0; i < 10; i++) { ctx.fillStyle = 'rgba(110,58,22,.85)'; ctx.beginPath(); ctx.arc((R() - .5) * 320 * k, (R() - .5) * 360 * k, (5 + R() * 14) * k, 0, 7); ctx.fill(); }
  for (let i = 0; i < 4; i++) { const dx = -60 + i * 40 + R() * 20, len = (60 + R() * 140) * k; ctx.fillStyle = 'rgba(100,52,20,.8)'; rr(dx - 6, 60 * k, 12, len, 6); ctx.fill(); ctx.beginPath(); ctx.arc(dx, 60 * k + len, 10, 0, 7); ctx.fill(); } ctx.restore(); }

// ---------- evening crossroads: blurred city behind, a two-lane road across the frame, zebra, near pavement ----------
function cityFarDraw() { ctx.fillStyle = grad(0, 0, 0, 1000, [[0, '#18234a'], [.45, '#5a3f72'], [.8, '#e0806a'], [1, '#ffc58a']]); ctx.fillRect(0, 0, W, 1020);
  glow(760, 900, 520, 'rgba(255,190,120,.55)'); const R = rnd(5);
  for (let layerI = 0; layerI < 2; layerI++) for (let i = 0; i < 9; i++) { const bw = 120 + R() * 140, bx = i * 130 - 60 + R() * 40, bh = (layerI ? 320 : 520) + R() * 300, top = 1000 - bh; ctx.fillStyle = layerI ? '#2a2540' : '#3b3557'; ctx.fillRect(bx, top, bw, bh);
    for (let r = 0; r < bh / 60 - 1; r++) for (let c = 0; c < bw / 40 - 1; c++) if (R() > .45) { ctx.fillStyle = R() > .3 ? 'rgba(255,210,140,.85)' : 'rgba(170,210,255,.7)'; ctx.fillRect(bx + 14 + c * 40, top + 20 + r * 60, 18, 28); } }
  for (let i = 0; i < 7; i++) tree(80 + i * 170 + R() * 40, 1010, 300 + R() * 120, '#1d2b2a'); }
function crossingDraw() { blurred(6, cityFarDraw, 'cityFar'); ctx.fillStyle = 'rgba(20,10,40,.15)'; ctx.fillRect(0, 0, W, 1020);
  ctx.fillStyle = grad(0, 990, 0, 1040, [[0, '#7c7a86'], [1, '#55535e']]); ctx.fillRect(0, 990, W, 50); ctx.fillStyle = '#9a98a2'; ctx.fillRect(0, 1036, W, 10); // far pavement + curb
  ctx.fillStyle = grad(0, 1046, 0, 1360, [[0, '#2d2f37'], [1, '#3a3c44']]); ctx.fillRect(0, 1046, W, 314); // asphalt
  const R = rnd(11); for (let i = 0; i < 900; i++) { ctx.fillStyle = `rgba(${R() > .5 ? '255,255,255' : '0,0,0'},${.03 + R() * .05})`; ctx.fillRect(R() * W, 1046 + R() * 314, 2 + R() * 4, 2); } // asphalt grain
  for (let i = 0; i < 6; i++) { const yA = 1056 + i * 50, h = 30, wA = 260 + i * 22; ctx.beginPath(); ctx.moveTo(540 - wA / 2, yA); ctx.lineTo(540 + wA / 2, yA); ctx.lineTo(540 + wA / 2 + 10, yA + h); ctx.lineTo(540 - wA / 2 - 10, yA + h); ctx.closePath(); ctx.fillStyle = 'rgba(235,235,235,.82)'; ctx.fill(); } // zebra in perspective
  ctx.fillStyle = 'rgba(255,214,90,.8)'; for (let i = 0; i < 6; i++) ctx.fillRect(i * 200 - 40, 1198, 110, 8); // centre line
  ctx.fillStyle = grad(0, 1356, 0, 1390, [[0, '#a9a7b1'], [1, '#6a6872']]); ctx.fillRect(0, 1356, W, 34); ctx.fillStyle = grad(0, 1390, 0, H, [[0, '#6e6c78'], [1, '#3a3842']]); ctx.fillRect(0, 1390, W, H - 1390); // near curb + pavement
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 3; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * 110, 1390); ctx.lineTo(i * 130 - 100, H); ctx.stroke(); } for (const y of [1480, 1620, 1800]) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } // tiles
  streetLamp(140, 1000, 560, 1); glow(210, 450, 260, 'rgba(255,210,150,.45)'); streetLamp(980, 1000, 520, 1); glow(1050, 490, 240, 'rgba(255,210,150,.4)');
  ctx.fillStyle = '#15181f'; ctx.fillRect(880, 640, 18, 360); ctx.fillStyle = '#0c0e12'; rr(850, 560, 78, 190, 14); ctx.fill(); ctx.fillStyle = '#ff3b30'; ctx.beginPath(); ctx.arc(889, 600, 24, 0, 7); ctx.fill(); ctx.fillStyle = '#2a2a2a'; ctx.beginPath(); ctx.arc(889, 655, 22, 0, 7); ctx.arc(889, 708, 22, 0, 7); ctx.fill(); glow(889, 600, 110, 'rgba(255,60,40,.55)'); // traffic light: red
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 1040, W, 18); }
function crossing() { ctx.drawImage(layer('cross2', crossingDraw, 1), 0, 0); }
function ball(x, y, r, rot) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(x + 6, y + r * .95, r * 1.05, r * .25, 0, 0, 7); ctx.fill(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = rgrad(-r * .3, -r * .3, 0, r, [[0, '#ffffff'], [1, '#c9c9c9']]); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.fillStyle = '#e0302f'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, i * 2.09, i * 2.09 + 1); ctx.closePath(); ctx.fill(); } ctx.restore(); }
// a lorry in side view, facing left; x = front bumper, y = road line
function truckSide(x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.tilt) ctx.rotate(o.tilt);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(560, 6, 640, 30, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(0, -620, 0, -90, [[0, '#e9ecef'], [1, '#b4bac3']]); rr(300, -640, 880, 540, 14); ctx.fill(); ctx.fillStyle = '#c8452f'; ctx.fillRect(300, -300, 880, 40); ctx.fillStyle = 'rgba(0,0,0,.12)'; for (let i = 1; i < 8; i++) ctx.fillRect(300 + i * 110, -640, 4, 540); // box trailer
  ctx.fillStyle = grad(0, -500, 0, -90, [[0, '#2f6fb0'], [1, '#1d4a7a']]); ctx.beginPath(); ctx.moveTo(20, -100); ctx.lineTo(10, -330); ctx.quadraticCurveTo(20, -480, 120, -500); ctx.lineTo(290, -500); ctx.lineTo(290, -100); ctx.closePath(); ctx.fill(); // cab
  ctx.fillStyle = 'rgba(170,215,245,.8)'; ctx.beginPath(); ctx.moveTo(40, -330); ctx.quadraticCurveTo(46, -450, 130, -465); ctx.lineTo(240, -465); ctx.lineTo(240, -330); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.moveTo(70, -340); ctx.lineTo(140, -455); ctx.lineTo(170, -455); ctx.lineTo(100, -340); ctx.fill();
  ctx.fillStyle = '#16212e'; ctx.fillRect(0, -150, 300, 60); ctx.fillStyle = '#fff6d0'; rr(0, -200, 40, 46, 8); ctx.fill(); ctx.fillStyle = '#ff9a2a'; ctx.fillRect(0, -240, 26, 26);
  for (const wx of [150, 760, 1000]) { ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.arc(wx, -50, 70, 0, 7); ctx.fill(); ctx.fillStyle = '#7a7f88'; ctx.beginPath(); ctx.arc(wx, -50, 32, 0, 7); ctx.fill(); ctx.strokeStyle = '#2a2d33'; ctx.lineWidth = 6; const a = -(t * 14 * (o.spin ?? 1)); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(wx, -50); ctx.lineTo(wx + Math.cos(a + k * 1.256) * 30, -50 + Math.sin(a + k * 1.256) * 30); ctx.stroke(); } }
  ctx.restore(); if (o.beam !== false) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(x, 0, x - 700 * s, 0); g.addColorStop(0, 'rgba(255,245,200,.55)'); g.addColorStop(1, 'rgba(255,245,200,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y - 180 * s); ctx.lineTo(x - 900 * s, y - 330 * s); ctx.lineTo(x - 900 * s, y + 60 * s); ctx.closePath(); ctx.fill(); glow(x + 10 * s, y - 177 * s, 140 * s, 'rgba(255,250,220,.9)'); ctx.restore(); } }
// k: 0..1 how far the ball / boy / truck have got (the truck reaches the boy at k = 1)
function crossScene(t, k, o = {}) { ctx.save(); if (o.shake) shake(t, o.shake); crossing();
  const kb = eout(clamp(k * 1.5)), by = lerp(1012, 1205, kb); ball(lerp(470, 560, kb), by, lerp(22, 30, kb), kb * 9);
  const kk = eout(clamp(k * 1.25 - .12)), feet = lerp(1030, 1215, kk); const run = k > .05 && k < .97, bob = run ? Math.abs(Math.sin(t * 11)) * 14 : 0; ctx.save(); ctx.translate(lerp(500, 540, kk), feet - bob); ctx.rotate(run ? Math.sin(t * 11) * .05 : 0); person(0, 0, lerp(330, 400, kk), RBOY({ fear: k > .8 ? .9 : .1, mouth: k > .8 ? .6 : 0, armUp: k > .8 ? .5 : 0 })); ctx.restore();
  truckSide(lerp(1500, 640, eio(clamp((k - .25) / .75))), 1240, .95, t, { tilt: o.brake ? -.02 : 0 });
  if (o.hero) personSide(o.heroX, 1640, 1020, RHERO_EVE({ walk: t * 13 })); ctx.restore(); vign(.35); }

// ---------- the hood grab, close: the boy's back in a red hoodie, the hero's hand clamps the hood ----------
function hoodGrab(t, q) { ctx.save(); ctx.translate(540, 1000); ctx.scale(2.6, 2.6); ctx.translate(-560, -1150); crossing(); ctx.restore(); ctx.save(); ctx.filter = 'blur(6px)'; ctx.drawImage(cv, 0, 0); ctx.restore(); grade('rgba(10,10,30,1)', .2, 'source-over');
  glow(1000, 850, lerp(300, 800, q), 'rgba(255,245,210,.65)'); // the lorry's headlights flooding in from the right
  const pull = eout(clamp(q * 2)); ctx.save(); ctx.translate(-pull * 70, pull * 50); ctx.rotate(-pull * .05);
  const sh = new Path2D(); sh.moveTo(80, H); sh.bezierCurveTo(90, 1350, 200, 1100, 360, 1040); sh.quadraticCurveTo(540, 990, 720, 1040); sh.bezierCurveTo(880, 1100, 990, 1350, 1000, H); sh.closePath(); // shoulders + back
  ctx.fillStyle = grad(80, 0, 1000, 0, [[0, '#8a2416'], [.45, '#e0482f'], [1, '#9a2c1a']]); ctx.fill(sh); ctx.save(); ctx.clip(sh); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 10; for (const k of [380, 540, 700]) { ctx.beginPath(); ctx.moveTo(k, 1100); ctx.quadraticCurveTo(k + 20, 1500, k - 10, H); ctx.stroke(); } ctx.restore();
  for (const k of [-1, 1]) { ctx.fillStyle = '#e4b598'; ctx.beginPath(); ctx.ellipse(540 + k * 225, 760, 34, 60, 0, 0, 7); ctx.fill(); } ctx.fillStyle = rgrad(500, 640, 40, 280, [[0, '#8a6440'], [1, '#4e3520']]); ctx.beginPath(); ctx.ellipse(540, 720, 235, 270, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 5; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(380 + i * 30, 500); ctx.quadraticCurveTo(390 + i * 32, 700, 380 + i * 30 + (i - 6) * 6, 960); ctx.stroke(); } ctx.fillStyle = 'rgba(255,230,190,.12)'; ctx.beginPath(); ctx.ellipse(470, 600, 80, 120, -.3, 0, 7); ctx.fill(); // back of his head
  ctx.fillStyle = '#efc6ab'; rr(470, 1000, 140, 70, 30); ctx.fill(); // nape
  const hd = new Path2D(); hd.moveTo(300, 1090); hd.bezierCurveTo(320, 960, 420, 1000, 540, 1010); hd.bezierCurveTo(660, 1000, 760, 960, 780, 1090); hd.bezierCurveTo(700, 1200 + pull * 30, 380, 1200 + pull * 30, 300, 1090); hd.closePath(); // the bunched hood
  ctx.fillStyle = grad(300, 0, 780, 0, [[0, '#9a2c1a'], [.5, '#f05a3e'], [1, '#a32f1c']]); ctx.fill(hd); ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 6; for (const k of [380, 470, 610, 700]) { ctx.beginPath(); ctx.moveTo(k, 1030); ctx.quadraticCurveTo(k + 20, 1100, k, 1170); ctx.stroke(); }
  ctx.restore();
  // his hand comes from the top-left and clamps the hood (back of the hand towards us, nails at the bottom)
  const g = eout(clamp(q * 4)), hx = lerp(200, 430 - pull * 70, g), hy = lerp(900, 1080 + pull * 50, g);
  gripHand(hx, hy, 1.25, '#e0482f', { noSleeve: true, skin: '#e2b08e', cuff: '#2b2f38', rot: -.15 });
}

// ================== SCENES ==================
SC.hook = { // FRAME 0: he wakes, his arm shoots up at the camera — "10" glows under the skin
  draw(t, d, P, E, s) { const tB = Math.min(1.7, s.U(s.a + 1) * .45), t1 = s.U(s.a + 1), t2 = s.U(s.a + 2);
    if (t < tB) { ctx.drawImage(layer('bed', bedroomMorningDraw, 4), 0, 0); ctx.save(); cam(540, 900, lerp(1.25, 1.1, eout(prog(t, 0, .6)))); shake(t, t < .35 ? 10 : 0); heroCU(t, { fear: lerp(.4, .9, prog(t, 0, .3)), mouth: .3 }); ctx.restore();
      const k = eout(prog(t, 0, .9)); rewindArm(lerp(860, 760, k), lerp(1250, 900, k), lerp(.85, 1.05, k), 10, t, { rot: lerp(.5, .2, k), sleeve: '#34404f' }); rewindFX(t, t < .45 ? 1 - t / .45 : 0);
      bigTitle('ОТМОТАТЬ 10 СЕКУНД', 300, 1, { size: 84, col: '#fff', glow: 'rgba(80,220,255,.5)' }); return; }
    if (t < t1 - .05) { blurred(8, kitchenBgDraw, 'kitBlur'); grade('rgba(10,14,30,1)', .35, 'source-over'); const mins = 420 - (t - tB) * 900; wallClockBig(230, 640, 130, mins); ctx.strokeStyle = 'rgba(80,220,255,.7)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(230, 640, 160, -.3, -2.2, true); ctx.stroke();
      ctx.save(); const g = (Math.sin(t * 9) > .6) ? 14 : 0; ctx.globalAlpha = .35; rewindArm(620 + g, 640, 1.3, 10, t); ctx.restore(); rewindArm(620, 640, 1.3, 10, t); rewindFX(t, Math.sin(t * 9) > .6 ? .8 : 0, { txt: '-00:10' });
      bigTitle('ОТМОТАТЬ 10 СЕКУНД', 300, 1, { size: 84, col: '#fff', glow: 'rgba(80,220,255,.5)' }); return; }
    if (t < t2 - .05) { bg('#04121c', '#010406'); glow(540, 900, 800, 'rgba(60,200,255,.18)'); const q = prog(t, t1 - .05, t2 - .2);
      for (let i = 0; i < 10; i++) { const on = q * 10 > i, x = 135 + (i % 5) * 202, y = i < 5 ? 760 : 1080; ctx.save(); ctx.globalAlpha = on ? 1 : .15; ctx.fillStyle = RW_CYAN; ctx.shadowColor = RW_CYAN; ctx.shadowBlur = on ? 40 : 0; rr(x - 60, y - 120, 120, 240, 34); ctx.fill(); ctx.restore(); if (on) label('◀◀', x, y + 18, 44, { weight: 900, color: '#04121c', font: MONO }); }
      bigTitle('ТОЛЬКО 10 РАЗ', 300, prog(t, t1 - .05, t1 + .2), { size: 110, col: '#fff', glow: 'rgba(80,220,255,.5)' }); return; }
    bg('#0b0d14', '#020306'); const q = prog(t, t2 - .05, d); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(60, 1220); ctx.lineTo(1020, 1220); ctx.stroke();
    [[200, 560, { kid: true, age: 0 }], [540, 880, {}], [880, 830, { age: .95, hair: '#d8d6d2' }]].forEach(([x, h, o], i) => { ctx.save(); ctx.globalAlpha = prog(t, t2 - .05 + i * .25, t2 + .2 + i * .25); person(x, 1220, h, RHERO(Object.assign({ uniform: null, tie: null, top: '#3b4a5c' }, o))); ctx.restore(); });
    ctx.fillStyle = RW_RED; ctx.shadowColor = RW_RED; ctx.shadowBlur = 20; ctx.fillRect(60, 1212, 960 * q, 16); ctx.shadowBlur = 0; bigTitle('ЗА ВСЮ ЖИЗНЬ', 300, prog(t, t2 - .05, t2 + .2), { size: 110, col: '#ff6b74' }); },
  sfx(d, P, E, s) { return [[0, 'rewind', .5, { dur: .7 }], [0, 'boom', .35], [Math.min(1.7, s.U(s.a + 1) * .45), 'swoosh', .35], [s.U(s.a + 1), 'ticks', .4, { n: 10, dur: 1.4 }], [s.U(s.a + 2), 'dundun', .4]]; }
};
SC.coffee = { // "Семь утра. Кофе — прямо на белую рубашку. Отмотал. Осталось девять."
  draw(t, d, P, E, s) { const ts = s.U(s.a + 1); mishap(t, d, s, (lt, rt) => { ctx.drawImage(layer('kitchen', kitchenBgDraw, 4), 0, 0); const k = prog(lt, ts + .1, ts + .8), close = lt > ts + .05;
      ctx.save(); if (close) cam(560, 1160, 1.9 + .1 * k); else cam(540, 960, 1.15); person(540, 2400, 1700, RHERO({ fear: k > .4 ? .9 : 0, mouth: k > .4 ? .6 : 0, smile: k < .1 && !close ? .3 : 0 }));
      coffeeStain(560, 1200, eout(clamp(k * 1.3)), 4); const tip = lerp(.2, 2.0, eio(k)); coffeeCup(lerp(700, 650, k), lerp(1120, 1080, k), .9, tip);
      if (k > .05 && k < .9) { ctx.strokeStyle = 'rgba(100,52,20,.9)'; ctx.lineWidth = 26 * (1 - k); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lerp(660, 610, k), 1060); ctx.quadraticCurveTo(600, 1120, 570, 1190); ctx.stroke(); } ctx.restore();
      if (!close) { wallClockBig(880, 380, 120, 0); bigTitle('7:00', 300, prog(rt, 0, .2), { size: 120, col: '#fff' }); } else if (k > .3) bigTitle('БЕЛАЯ РУБАШКА', 300, prog(lt, ts + .3, ts + .5), { size: 100, col: '#ff6b74' }); }, 10, ts - .25); },
  sfx(d, P, E, s) { return [[0, 'clock', .25, { dur: 1 }], [s.U(s.a + 1) + .1, 'pour', .45], [s.U(s.a + 2) - .1, 'rewind', .5, { dur: .9 }], [s.U(s.a + 3) - .1, 'tick', .55]]; }
};
SC.lift = { // "Двери лифта закрываются перед носом. Отмотал. Восемь."
  draw(t, d, P, E, s) { mishap(t, d, s, (lt) => { ctx.drawImage(layer('lift', elevatorDraw, 3), 0, 0); const k = eio(prog(lt, .25, 1.6)); person(540, 2300, 1500, NEIGHB({ smile: .2 }));
      ctx.fillStyle = grad(0, 0, 540, 0, [[0, '#8a929c'], [.9, '#d3d8de'], [1, '#6a7078']]); ctx.fillRect(-540 + k * 540, 0, 540, 1500); ctx.fillStyle = grad(540, 0, W, 0, [[0, '#6a7078'], [.1, '#d3d8de'], [1, '#8a929c']]); ctx.fillRect(W - k * 540, 0, 540, 1500);
      ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(-540 + k * 540 + 400, 0, 30, 1500); ctx.fillRect(W - k * 540 + 110, 0, 30, 1500); ctx.fillStyle = grad(0, 1500, 0, H, [[0, '#4a4f57'], [1, '#2a2d33']]); ctx.fillRect(0, 1500, W, 420);
      personSide(lerp(-260, 300, eout(prog(lt, 0, 1.5))), 1950, 1300, RHERO({ walk: lt * 12, fear: k > .8 ? .5 : 0 }));
      if (k > .9) bigTitle('ПЕРЕД НОСОМ', 300, prog(lt, 1.5, 1.7), { size: 100, col: '#fff' }); }, 9, .15); },
  sfx(d, P, E, s) { return [[0, 'steps', .4, { dur: 1.3 }], [.3, 'slide_down', .3], [s.U(s.a + 1) - .1, 'rewind', .5, { dur: .8 }], [s.U(s.a + 2) - .1, 'tick', .55]]; }
};
SC.joke = { // "Ты неудачно пошутил при начальнике. Отмотал. Семь."
  draw(t, d, P, E, s) { mishap(t, d, s, (lt) => { ctx.drawImage(layer('office2', officeDraw, 3), 0, 0); const bad = lt > 1.1; ctx.save(); cam(bad ? 360 : 540, bad ? 760 : 900, bad ? 1.7 : 1.05);
      person(320, 2280, 1700, RBOSS({ smile: lt < .9 ? .3 : 0, fear: bad ? .15 : 0, brow: bad ? -.8 : 0 })); person(780, 2350, 1700, RHERO({ smile: .9, mouth: lt < 1 ? Math.abs(Math.sin(lt * 15)) * .4 : 0 })); ctx.restore();
      if (!bad) speechBubble(760, 520, 'А вы знали, что лысые… хе-хе', prog(lt, .1, .3), { size: 48, w: 560, tail: .3 }); else { thoughtBubble(560, 470, 'Уволю.', prog(lt, 1.1, 1.3), { size: 80, w: 340, toX: -140, toY: 200 }); bigTitle('НЕЛОВКО', 300, prog(lt, 1.1, 1.3), { size: 110, col: '#ff6b74' }); } }, 8, .05); },
  sfx(d, P, E, s) { return [[.2, 'chuckles', .3, { dur: .8 }], [1.1, 'wahwah', .3], [s.U(s.a + 1) - .1, 'rewind', .5, { dur: .8 }], [s.U(s.a + 2) - .1, 'tick', .55]]; }
};
SC.text = { // "Ночью отправил бывшей: «Скучаю». Отмотал. Шесть."
  draw(t, d, P, E, s) { const tm = s.U(s.a + 1); mishap(t, d, s, (lt) => { bg('#0b1022', '#05070f'); glow(540, 900, 700, 'rgba(120,160,255,.15)'); ctx.save(); cam(540, 980, lt > tm + .4 ? 1.25 : 1.04);
      holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => { ctx.fillStyle = '#dfe8d6'; ctx.fillRect(-w / 2, -h / 2, w, h); statusBar(w, h, '#111', '02:14'); ctx.fillStyle = '#f8f8f8'; ctx.fillRect(-w / 2, -h / 2, w, 200); label('Бывшая 💔', -w / 2 + 60, -h / 2 + 150, 34, { align: 'left', weight: 900, color: '#111' });
        if (lt > tm - .1) { ctx.fillStyle = '#dcf8c6'; rr(w / 2 - 340, -80, 310, 130, 34); ctx.fill(); label('Скучаю', w / 2 - 185, 0, 48, { weight: 800, color: '#111' }); label(lt > tm + .4 ? '✓✓ прочитано' : '✓', w / 2 - 50, 80, 26, { align: 'right', weight: 800, color: lt > tm + .4 ? '#2f7de1' : '#7a8494' }); } }, { sleeve: '#3b4a5c', skin: '#e6b99c' }); ctx.restore();
      if (lt > tm + .4) bigTitle('ПРОЧИТАНО', 300, prog(lt, tm + .4, tm + .6), { size: 110, col: '#ff6b74' }); else bigTitle('2:14 НОЧИ', 300, prog(lt, 0, .2), { size: 100, col: '#fff' }); }, 7, tm - .3); },
  sfx(d, P, E, s) { return [[s.U(s.a + 1) - .1, 'swoosh', .3], [s.U(s.a + 1) + .4, 'notif', .35], [s.U(s.a + 2) - .1, 'rewind', .5, { dur: .8 }], [s.U(s.a + 3) - .1, 'tick', .55]]; }
};
SC.montage = { // "Ты тратишь их, как мелочь. Пять. Четыре. Три. Два."
  draw(t, d, P, E, s) { const marks = [1, 2, 3, 4].map(i => s.U(s.a + i)); const idx = marks.filter(m => t > m - .1).length, n = 6 - idx;
    const bgs = [['cafe', cafeDraw], ['bed', bedroomMorningDraw], ['metro', metroDraw], ['office2', officeDraw], ['lift', elevatorDraw]]; const [k, f] = bgs[idx % bgs.length]; blurred(7, f, k + 'B'); grade('rgba(5,10,20,1)', .5, 'source-over');
    const sw = idx ? eout(prog(t, marks[idx - 1] - .1, marks[idx - 1] + .2)) : 1; rewindArm(560 + (1 - sw) * 300 * (idx % 2 ? 1 : -1), 560, 1.15, n, t, { rot: -.2 + idx * .1 }); if (idx > 0) rewindFX(t, Math.max(0, 1 - (t - marks[idx - 1]) * 3));
    if (idx === 0) bigTitle('КАК МЕЛОЧЬ', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'coins', .3], ...[1, 2, 3, 4].flatMap(i => [[s.U(s.a + i) - .15, 'rewind', .35, { dur: .4 }], [s.U(s.a + i) - .05, 'tick', .5]])]; }
};
SC.evening = { // "Но самое важное случилось вечером."
  draw(t, d) { ctx.save(); cam(540, 1000, lerp(1.0, 1.12, prog(t, 0, d))); crossing(); ctx.restore(); vign(.5); bigTitle('САМОЕ ВАЖНОЕ', 300, prog(t, 0, .2), { size: 104, col: '#ffcf4a' }); label('— ВЕЧЕРОМ —', 540, 420, 52, { weight: 900, color: '#fff', alpha: prog(t, .3, .6) }); counterHud(1, t); },
  sfx(d) { return [[0, 'city', .3, { dur: d }], [0, 'dundun', .35]]; }
};
SC.cross = { // "Перекрёсток. Мальчик бежит за мячом — прямо под грузовик."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1); if (t < t1 - .05) { ctx.save(); cam(540, 1060, lerp(1.0, 1.08, prog(t, 0, t1))); crossScene(t, lerp(0, .15, prog(t, 0, t1))); ctx.restore(); bigTitle('ПЕРЕКРЁСТОК', 300, prog(t, 0, .2), { size: 104, col: '#fff' }); counterHud(1, t); return; }
    const k = lerp(.15, .82, prog(t, t1 - .05, d)); ctx.save(); const z = t < (t1 + d) / 2 ? 1.0 : 1.25; cam(z > 1 ? 600 : 540, 1060, z); crossScene(t, k); ctx.restore(); bigTitle('ПОД ГРУЗОВИК', 300, prog(t, t1 - .05, t1 + .2), { size: 104, col: '#ff6b74' }); counterHud(1, t); },
  sfx(d, P, E, s) { return [[0, 'city', .3, { dur: d }], [s.U(s.a + 1), 'boing_soft', .3], [d * .6, 'honk', .5]]; }
};
SC.brakes = { // "Ты не успеваешь. Визг тормозов." — no impact on screen: white flash, then black
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); if (t < t2 - .05) { crossScene(t, lerp(.82, .97, prog(t, 0, t2)), { hero: true, heroX: lerp(-200, 220, prog(t, 0, t2)), shake: 6 }); bigTitle('НЕ УСПЕВАЕШЬ', 300, prog(t, 0, .2), { size: 104, col: '#ff6b74' }); return; }
    const q = prog(t, t2 - .05, d); if (q < .12) { crossScene(t, .985, { brake: true, shake: 16 }); ctx.fillStyle = `rgba(255,255,255,${q / .12})`; ctx.fillRect(0, 0, W, H); return; }
    const v = Math.round(255 * Math.max(0, 1 - (q - .12) / .4)); ctx.fillStyle = `rgb(${v},${v},${v})`; ctx.fillRect(0, 0, W, H); },
  sfx(d, P, E, s) { return [[0, 'steps', .45, { dur: s.U(s.a + 1) }], [s.U(s.a + 1) - .15, 'scratch', .65], [s.U(s.a + 1), 'honk', .45]]; }
};
SC.one = { // "У тебя осталась одна попытка."
  draw(t, d) { bg('#0a0204', '#000'); glow(540, 980, 700, 'rgba(255,40,60,.22)'); ctx.save(); cam(540, 960, lerp(1, 1.12, prog(t, 0, d))); rewindArm(560, 560, 1.2, 1, t); ctx.restore(); bigTitle('ОДНА ПОПЫТКА', 300, prog(t, 0, .2), { size: 110, col: RW_RED, glow: 'rgba(255,40,50,.6)' }); },
  sfx(d) { return [[0, 'heartbeat', .5, { dur: d }]]; }
};
SC.rewindbig = { // "Ты отматываешь. Десять секунд. Мяч снова катится на дорогу."
  draw(t, d, P, E, s) { const t3 = s.U(s.a + 2); if (t < t3 - .05) { const q = prog(t, 0, t3 - .05), k = lerp(.97, 0, eio(q)); crossScene(t, k); rewindFX(t, 1, { txt: '-00:' + String(Math.max(0, 10 - Math.floor(q * 10))).padStart(2, '0') }); counterHud(1, t);
      bigTitle('ПОСЛЕДНЯЯ', 300, prog(t, 0, .2), { size: 110, col: RW_RED }); return; }
    ctx.save(); cam(540, 1040, 1.15); crossScene(t, lerp(0, .3, prog(t, t3, d))); ctx.restore(); counterHud(0, t); bigTitle('ЕЩЁ РАЗ', 300, prog(t, t3 - .05, t3 + .2), { size: 120, col: RW_CYAN }); },
  sfx(d, P, E, s) { return [[0, 'rewind', .6, { dur: 1.6 }], [s.U(s.a + 2), 'boing_soft', .3], [s.U(s.a + 2), 'city', .3, { dur: d - s.U(s.a + 2) }]]; }
};
SC.save = { // "Ты бежишь. Хватаешь мальчика за капюшон. Грузовик проносится в метре."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), t3 = s.U(s.a + 2);
    if (t < t2 - .05) { const q = prog(t, 0, t2); crossScene(t, lerp(.3, .62, q), { hero: true, heroX: lerp(-250, 380, eio(q)) }); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 6; for (let i = 0; i < 7; i++) { const x0 = lerp(-250, 380, eio(q)) - 260 - i * 30; ctx.beginPath(); ctx.moveTo(x0, 900 + i * 90); ctx.lineTo(x0 - 220, 900 + i * 90); ctx.stroke(); } bigTitle('БЕГИ', 300, prog(t, 0, .2), { size: 140, col: '#fff' }); return; }
    if (t < t3 - .05) { hoodGrab(t, prog(t, t2 - .05, t3 - .05)); bigTitle('ЗА КАПЮШОН', 300, prog(t, t2 - .05, t2 + .2), { size: 110, col: '#ffcf4a' }); return; }
    const q = prog(t, t3 - .05, d); ctx.save(); shake(t, q < .5 ? 10 : 0); crossing(); const tx = lerp(1500, -1500, q); for (let g = 3; g >= 0; g--) { ctx.save(); ctx.globalAlpha = g ? .18 : 1; truckSide(tx + g * 70, 1240, .95, t, { beam: !g }); ctx.restore(); }
    person(380, 1640, 1180, RHERO_EVE({ fear: .6, mouth: .4 })); person(230, 1580, 600, RBOY({ fear: .7, mouth: .3 })); ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 7; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(tx + 1250 + i * 50, 700 + i * 60); ctx.lineTo(tx + 1700 + i * 50, 700 + i * 60); ctx.stroke(); } vign(.35); bigTitle('В МЕТРЕ', 300, prog(t, t3 - .05, t3 + .2), { size: 120, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'steps', .45, { dur: s.U(s.a + 1) }], [s.U(s.a + 1), 'whoosh', .4], [s.U(s.a + 1) + .1, 'thud_soft', .4], [s.U(s.a + 2), 'f1pass', .55], [s.U(s.a + 2), 'honk', .4]]; }
};
SC.mother = { // "Мама мальчика плачет и не может сказать ни слова."
  draw(t, d) { ctx.save(); if (t < d * .5) cam(560, 950, lerp(1.05, 1.12, prog(t, 0, d))); else cam(520, 820, lerp(2.0, 2.15, prog(t, d * .5, d))); crossing(); ball(820, 1520, 34, .4); person(500, 2050, 1450, RMOM({ fear: .6, closed: .35, mouth: .2 })); person(520, 2080, 880, RBOY({ fear: .2 })); personSide(1000, 2020, 1500, RHERO_EVE({ flip: true })); ctx.restore(); grade('rgba(255,200,140,1)', .1, 'lighter');
    ctx.strokeStyle = 'rgba(200,230,255,.8)'; ctx.lineWidth = 5; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(500 + k * 36, 760); ctx.quadraticCurveTo(500 + k * 42, 800, 500 + k * 38, 830 + (t * 30) % 40); ctx.stroke(); } vign(.4); bigTitle('НИ СЛОВА', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); },
  sfx(d) { return [[0, 'pad_swell', .3, { dur: d }], [0, 'city', .15, { dur: d }]]; }
};
SC.zero = { // "А на твоей руке загорается ноль."
  draw(t, d) { bg('#05060a', '#000'); const on = t > .35; glow(540, 980, 600, on ? 'rgba(255,40,60,.2)' : 'rgba(60,200,255,.12)'); ctx.save(); cam(540, 900, lerp(1.0, 1.15, prog(t, 0, d))); rewindArm(560, 560, 1.2, on ? 0 : 1, t, { flicker: t > .2 && t < .6 }); ctx.restore(); if (on) bigTitle('НОЛЬ', 300, prog(t, .35, .55), { size: 140, col: RW_RED, glow: 'rgba(255,40,50,.6)' }); },
  sfx() { return [[.35, 'powerdown', .45]]; }
};
function lessonIcon(i, x, y) { ctx.save(); ctx.translate(x, y); if (i === 0) { ctx.fillStyle = '#f6f7f9'; ctx.beginPath(); ctx.moveTo(-40, -36); ctx.lineTo(-14, -44); ctx.lineTo(14, -44); ctx.lineTo(40, -36); ctx.lineTo(48, -10); ctx.lineTo(30, -4); ctx.lineTo(30, 44); ctx.lineTo(-30, 44); ctx.lineTo(-30, -4); ctx.lineTo(-48, -10); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#6e3a16'; ctx.beginPath(); ctx.ellipse(6, 12, 16, 20, .3, 0, 7); ctx.fill(); }
  else if (i === 1) { ctx.fillStyle = '#c9ced6'; ctx.fillRect(-40, -46, 38, 92); ctx.fillRect(2, -46, 38, 92); ctx.fillStyle = '#2a2d33'; ctx.fillRect(-2, -46, 4, 92); }
  else { ctx.fillStyle = '#dcf8c6'; rr(-48, -32, 96, 56, 18); ctx.fill(); ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(40, 42); ctx.lineTo(4, 22); ctx.fill(); ctx.fillStyle = '#ff6b74'; ctx.beginPath(); ctx.arc(-8, -4, 9, 0, 7); ctx.arc(8, -4, 9, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-17, 0); ctx.lineTo(0, 16); ctx.lineTo(17, 0); ctx.fill(); } ctx.restore(); }
SC.lesson = { // "Девять раз ты спасал рубашку, лифт и гордость. Один раз — жизнь."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); bg('#0b0f18', '#04060a'); glow(540, 900, 700, 'rgba(80,200,255,.1)');
    const wt = [E('рубашку', 1, .6), E('лифт', 1, 1.2), E('гордость', 1, 1.8)];
    ['РУБАШКА', 'ЛИФТ', 'ГОРДОСТЬ'].forEach((txt, i) => { const p = eback(prog(t, wt[i] - .1, wt[i] + .2)); ctx.save(); ctx.globalAlpha = .25 + .75 * clamp(p); ctx.translate(540, 640 + i * 175); ctx.scale(.9 + .1 * p, .9 + .1 * p); ctx.fillStyle = 'rgba(255,255,255,.07)'; rr(-400, -70, 800, 140, 34); ctx.fill(); lessonIcon(i, -300, 0); label(txt, 40, 22, 64, { weight: 900, color: 'rgba(255,255,255,.85)' }); ctx.restore();
      if (t > t2 - .3) xMark(860, 640 + i * 175, 44, prog(t, t2 - .3 + i * .08, t2 + i * .08)); });
    if (t > t2 - .05) { const k = eback(prog(t, t2 - .05, t2 + .3)); ctx.save(); ctx.translate(540, 1200); ctx.scale(k, k); ctx.shadowColor = '#22b357'; ctx.shadowBlur = 40; ctx.fillStyle = '#22b357'; rr(-400, -100, 800, 200, 56); ctx.fill(); ctx.shadowBlur = 0; label('ЖИЗНЬ', 0, 34, 110, { weight: 900 }); ctx.restore(); }
    bigTitle(t < t2 - .05 ? '9 РАЗ — МЕЛОЧИ' : '1 РАЗ', 300, t < t2 - .05 ? prog(t, 0, .2) : prog(t, t2 - .05, t2 + .2), { size: 100, col: t < t2 - .05 ? RW_CYAN : '#5be08a' }); },
  sfx(d, P, E, s) { return [[0, 'pad_swell', .25, { dur: d }], [s.U(s.a + 1) - .05, 'chime', .45]]; }
};
SC.final = { // "А на что ты потратил бы последнюю?" — loops into "Ты проснулся…"
  draw(t, d) { blurred(8, bedroomMorningDraw, 'bedBlur'); grade('rgba(10,14,30,1)', .35, 'source-over'); const k = eout(prog(t, 0, d)); rewindArm(lerp(600, 560, k), lerp(640, 560, k), lerp(1.1, 1.3, k), 1, t, { rot: lerp(-.25, -.1, k) }); bigTitle('А ТЫ?', 300, prog(t, 0, .2), { size: 150, col: '#fff', glow: 'rgba(80,220,255,.5)' }); },
  sfx(d) { return [[0, 'pad_swell', .3, { dur: d }], [0, 'heartbeat', .3, { dur: d }]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; if (t < TL.total - .3) drawSubs(t); };
