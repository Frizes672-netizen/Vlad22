// ===== YouTube Short (EN): "SPOT THE LIAR — Case #002: The Blackout Gallery" (helpers from Case #001 are loaded before this file) =====
const GUARD2 = (o = {}) => GUARDN(Object.assign({ hair: '#3a2a20', skin: '#d9a98c' }, o));
const CLEAN = (o = {}) => Object.assign({ fem: true, uniform: 'maid', top: '#3f5a6b', pants: '#3f5a6b', hair: '#6b4a2c', shoe: '#222', light: 1, skin: '#e9bca3' }, o);
const STUD = (o = {}) => Object.assign({ fem: true, top: '#a8552e', pants: '#24283a', hair: '#2a1a12', shoe: '#1b1b1f', scarf: '#d9c27a', light: -1, skin: '#ecc2a8', eyes: '#5a7a5a' }, o);
const SP = [540, 2080, 1480]; // the student in her statement shot: [x, feet y, height]
const UMB_TOP = [SP[0] + 13.6 * SP[2] / 100, SP[1] - 46.6 * SP[2] / 100]; // her right hand

function talking(t, s, from = 0, to = 1e9) { for (const [w, tt] of s.words) if (tt >= from && tt <= to && t >= tt - .04 && t <= tt + .3) return .2 + .5 * Math.abs(Math.sin(t * 17)); return 0; }
function grade(col, a, mode = 'multiply') { ctx.save(); ctx.globalCompositeOperation = mode; ctx.fillStyle = col; ctx.globalAlpha = a; ctx.fillRect(0, 0, W, H); ctx.restore(); }
// ---------- props ----------
function painting(x, y, w, o = {}) { const h = w * .78; ctx.save(); ctx.translate(x, y); // an original stormy seascape in a heavy gold frame
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 20, w, h); ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#f2d488'], [.5, '#a8812e'], [1, '#e2bf6a']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = 'rgba(90,60,10,.6)'; ctx.lineWidth = w * .012; ctx.strokeRect(-w / 2 + w * .03, -h / 2 + w * .03, w - w * .06, h - w * .06);
  const iw = w * .82, ih = h * .76; if (o.empty) { ctx.fillStyle = '#1a1512'; ctx.fillRect(-iw / 2, -ih / 2, iw, ih); const R = rnd(9), m = w * .035; ctx.fillStyle = '#e9dfc8'; // cut out with a blade: only jagged strips of canvas left along the stretcher
    for (const [x0, y0, x1, y1, nx, ny] of [[-iw / 2, -ih / 2, iw / 2, -ih / 2, 0, 1], [iw / 2, -ih / 2, iw / 2, ih / 2, -1, 0], [iw / 2, ih / 2, -iw / 2, ih / 2, 0, -1], [-iw / 2, ih / 2, -iw / 2, -ih / 2, 1, 0]]) { ctx.beginPath(); ctx.moveTo(x0, y0); for (let k = 0; k <= 16; k++) { const q = k / 16, d = m * (.4 + R() * .9); ctx.lineTo(lerp(x0, x1, q) + nx * d, lerp(y0, y1, q) + ny * d); } ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = 'rgba(60,90,110,.6)'; ctx.fillRect(-iw / 2, -ih / 2, iw, m * .35); ctx.restore(); return; } // cut out: frayed canvas edges
  ctx.save(); ctx.beginPath(); ctx.rect(-iw / 2, -ih / 2, iw, ih); ctx.clip(); seascape(-iw / 2, -ih / 2, iw, ih); ctx.restore(); ctx.restore(); }
function seascape(x, y, w, h) { ctx.fillStyle = grad(0, y, 0, y + h, [[0, '#2b3a4a'], [.45, '#8a9aa0'], [.55, '#3e5a66'], [1, '#1f2e38']]); ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'rgba(255,240,200,.55)'; ctx.beginPath(); ctx.arc(x + w * .72, y + h * .3, w * .07, 0, 7); ctx.fill(); glow(x + w * .72, y + h * .3, w * .3, 'rgba(255,230,170,.35)');
  for (let i = 0; i < 6; i++) { ctx.strokeStyle = `rgba(230,240,245,${.4 + i * .08})`; ctx.lineWidth = w * .012; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x + k * w / 20, yy = y + h * (.58 + i * .07) + Math.sin(k * 1.3 + i) * h * .025; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  ctx.fillStyle = '#1b1410'; ctx.beginPath(); ctx.moveTo(x + w * .3, y + h * .62); ctx.lineTo(x + w * .46, y + h * .62); ctx.lineTo(x + w * .43, y + h * .67); ctx.lineTo(x + w * .33, y + h * .67); ctx.closePath(); ctx.fill(); ctx.fillRect(x + w * .38, y + h * .4, w * .008, h * .22); // a little ship
  ctx.fillStyle = 'rgba(240,235,220,.85)'; ctx.beginPath(); ctx.moveTo(x + w * .388, y + h * .42); ctx.lineTo(x + w * .45, y + h * .58); ctx.lineTo(x + w * .388, y + h * .58); ctx.closePath(); ctx.fill(); }
function galleryDraw() { ctx.fillStyle = grad(0, 0, 0, 1300, [[0, '#5a1f26'], [1, '#3a1218']]); ctx.fillRect(0, 0, W, 1300); ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let x = 0; x < W; x += 40) ctx.fillRect(x, 0, 14, 1300); // damask-red walls
  ctx.fillStyle = '#2a1a12'; ctx.fillRect(0, 1240, W, 60); ctx.fillStyle = grad(0, 1300, 0, H, [[0, '#6b4a2e'], [1, '#2e1e12']]); ctx.fillRect(0, 1300, W, 620); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 3; for (let x = -400; x < W + 400; x += 70) { ctx.beginPath(); ctx.moveTo(540 + (x - 540) * .4, 1300); ctx.lineTo(x, H); ctx.stroke(); } // parquet
  for (const [px, pw] of [[150, 220], [930, 220]]) { ctx.save(); ctx.translate(px, 640); ctx.fillStyle = '#c9a33a'; ctx.fillRect(-pw / 2, -pw * .65, pw, pw * 1.3); ctx.fillStyle = ['#3a5a3a', '#6a4a7a'][px > 500 ? 1 : 0]; ctx.fillRect(-pw / 2 + 16, -pw * .65 + 16, pw - 32, pw * 1.3 - 32); ctx.restore(); }
  ctx.fillStyle = '#d9d2c2'; ctx.fillRect(470, 1000, 140, 40); ctx.fillStyle = '#efe8d8'; rr(440, 900, 200, 110, 6); ctx.fill(); // museum plaque stand
  ctx.strokeStyle = '#c9a33a'; ctx.lineWidth = 6; ctx.beginPath(); for (const px of [300, 780]) { ctx.moveTo(px, 1260); ctx.lineTo(px, 1150); } ctx.stroke(); ctx.strokeStyle = '#8a1c2a'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(300, 1160); ctx.quadraticCurveTo(540, 1230, 780, 1160); ctx.stroke(); } // velvet rope
function gallery(t, o = {}) { ctx.drawImage(layer('gallery', galleryDraw, 2), 0, 0); painting(540, 560, 520, { empty: o.empty });
  if (!o.dark) { for (const x of [150, 540, 930]) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = grad(x, 120, x, 900, [[0, 'rgba(255,230,180,.25)'], [1, 'rgba(255,230,180,0)']]); ctx.beginPath(); ctx.moveTo(x - 30, 120); ctx.lineTo(x + 30, 120); ctx.lineTo(x + 260, 950); ctx.lineTo(x - 260, 950); ctx.closePath(); ctx.fill(); ctx.restore(); } } }
function blackout(t, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(4,6,14,.82)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function flashlight(x, y, tx, ty, r, a = 1) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const ang = Math.atan2(ty - y, tx - x), L = Math.hypot(tx - x, ty - y);
  ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = grad(0, 0, L, 0, [[0, `rgba(255,248,220,${.5 * a})`], [1, `rgba(255,248,220,${.12 * a})`]]); ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(L, -r); ctx.lineTo(L, r); ctx.lineTo(0, 12); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgrad(tx, ty, 0, r * 1.1, [[0, `rgba(255,250,230,${.55 * a})`], [1, 'rgba(255,250,230,0)']]); ctx.beginPath(); ctx.arc(tx, ty, r * 1.1, 0, 7); ctx.fill(); ctx.restore(); }
function exitSign(x, y) { ctx.fillStyle = '#0f6a2a'; rr(x - 90, y - 34, 180, 68, 8); ctx.fill(); label('EXIT', x, y + 16, 44, { weight: 900, color: '#bfffcf' }); glow(x, y, 200, 'rgba(60,255,120,.3)'); }
function stormWindow(x, y, w, h, t, light = 1) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); const fl = light * (Math.sin(t * 2.3) > .97 || (t % 3.1) < .08 ? 1 : 0);
  ctx.fillStyle = fl ? '#c9d6ff' : '#0b1020'; ctx.fillRect(x, y, w, h); if (light) rain(t, .45, 90, 7); ctx.restore(); ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 18; ctx.strokeRect(x, y, w, h); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke(); return fl; }
function guardDesk(t) { bg('#0a0c12', '#04050a'); stormWindow(700, 160, 320, 460, t); ctx.fillStyle = '#161a22'; ctx.fillRect(40, 300, 620, 420);
  for (let i = 0; i < 4; i++) { const mx = 70 + (i % 2) * 300, my = 330 + Math.floor(i / 2) * 190; ctx.fillStyle = '#05060a'; rr(mx, my, 270, 170, 8); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + 120, my); ctx.lineTo(mx, my + 100); ctx.closePath(); ctx.fill(); label('NO POWER', mx + 135, my + 95, 26, { weight: 900, color: 'rgba(255,80,80,.6)', font: MONO }); }
  exitSign(880, 760); }
function mopBucket(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(0, 10, 230, 30, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(-200, 0, 200, 0, [[0, '#b98a10'], [.5, '#f2c230'], [1, '#a87a08']]); ctx.beginPath(); ctx.moveTo(-200, -330); ctx.lineTo(200, -330); ctx.lineTo(170, 0); ctx.lineTo(-170, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#c99a18'; rr(-215, -350, 430, 36, 12); ctx.fill();
  ctx.fillStyle = '#3a3f46'; rr(120, -470, 120, 140, 10); ctx.fill(); label('WET', 0, -150, 60, { weight: 900, color: '#3a2a08' }); ctx.fillStyle = '#111'; for (const wx of [-150, 150]) { ctx.beginPath(); ctx.arc(wx, 4, 20, 0, 7); ctx.fill(); }
  if (o.canvas > 0) { ctx.save(); ctx.globalAlpha = o.canvas; ctx.setLineDash([16, 10]); ctx.strokeStyle = '#ff4d5a'; ctx.lineWidth = 7; rr(-60, -560, 120, 520, 60); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); }
function mop(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#9a7a52'; rr(-8, -900, 16, 900, 8); ctx.fill(); ctx.fillStyle = '#e8e2d2'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(-60 + i * 15, 30, 10, 50, (i - 4) * .1, 0, 7); ctx.fill(); } ctx.restore(); }
function secondFloor(t) { bg('#1b1f2a', '#0b0d12'); ctx.drawImage(layer('gallery', galleryDraw, 2), 0, 0); painting(540, 560, 420); grade('rgba(30,40,70,1)', .45); exitSign(880, 200); label('2ND FLOOR', 180, 220, 40, { weight: 900, color: 'rgba(255,255,255,.5)', spacing: 6 });
  ctx.fillStyle = 'rgba(200,220,255,.12)'; ctx.beginPath(); ctx.ellipse(540, 1560, 420, 60, 0, 0, 7); ctx.fill(); } // shiny wet floor
function umbrella(x0, y0, s, t, drip = 1) { ctx.save(); ctx.translate(x0, y0); ctx.scale(s, s); // a closed black umbrella hanging from her hand, dripping
  ctx.strokeStyle = '#6b4a2c'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(-14, -2, 16, Math.PI * .1, Math.PI * 1.1); ctx.stroke(); // hook handle
  ctx.fillStyle = grad(-30, 0, 30, 0, [[0, '#0c0d10'], [.5, '#2c2f38'], [1, '#0c0d10']]); ctx.beginPath(); ctx.moveTo(0, 14); ctx.bezierCurveTo(-34, 120, -40, 420, -8, 640); ctx.lineTo(8, 640); ctx.bezierCurveTo(40, 420, 34, 120, 0, 14); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-4 + k * 6, 40); ctx.quadraticCurveTo(-22 + k * 14, 330, -4 + k * 4, 620); ctx.stroke(); } // wet sheen
  for (let k = 0; k < 7; k++) { ctx.fillStyle = 'rgba(200,225,255,.8)'; ctx.beginPath(); ctx.ellipse(-18 + (k * 37) % 36, 120 + k * 70, 4, 7, 0, 0, 7); ctx.fill(); } // beads of water
  ctx.fillStyle = '#9aa0a8'; ctx.fillRect(-3, 640, 6, 40);
  if (drip > 0) { for (let k = 0; k < 3; k++) { const q = (t * 1.6 + k / 3) % 1; ctx.fillStyle = `rgba(200,225,255,${.9 * drip})`; ctx.beginPath(); ctx.ellipse(0, 690 + q * 260, 6, 11, 0, 0, 7); ctx.fill(); } } ctx.restore(); }
function puddle(x, y, w, t, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(160,190,230,.35)'; ctx.beginPath(); ctx.ellipse(x, y, w, w * .22, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(220,235,255,.5)'; ctx.lineWidth = 3;
  for (let k = 0; k < 2; k++) { const q = (t * .8 + k / 2) % 1; ctx.globalAlpha = a * (1 - q); ctx.beginPath(); ctx.ellipse(x, y, w * .2 + q * w * .7, (w * .2 + q * w * .7) * .22, 0, 0, 7); ctx.stroke(); } ctx.restore(); }
function tube(x, y, s, rot, open = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = grad(-36, 0, 36, 0, [[0, '#0e0f12'], [.5, '#33363e'], [1, '#0e0f12']]); rr(-36, -340, 72, 680, 30); ctx.fill(); ctx.fillStyle = '#5a5e66'; rr(-40, -350, 80, 50, 14); ctx.fill(); rr(-40, 300, 80, 50, 14); ctx.fill(); // drawing tube
  if (open > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-300, -900, 600, 560); ctx.clip(); const k = eout(clamp(open)); ctx.translate(0, -340 - 300 * k); ctx.fillStyle = '#efe6d2'; rr(-32, -240, 64, 300, 28); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(-30, -240, 60, 300); ctx.clip(); seascape(-30, -240, 160, 300); ctx.restore(); ctx.restore(); }
  ctx.restore(); }
function studentShot(t, o = {}) { gallery(t, { empty: true, dark: true }); blackout(t, .45); flashlight(200, 120, SP[0] - 60, SP[1] - 1150, 200, .7); stormWindow(40, 180, 0, 0, t, 0);
  ctx.save(); cam(o.cx || 540, o.cy || 960, o.z || 1); puddle(UMB_TOP[0] + 4, SP[1] + 10, 120, t); person(SP[0], SP[1], SP[2], STUD({ mouth: o.mouth || 0 }));
  ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(SP[0] - 150, SP[1] - 1200); ctx.lineTo(SP[0] + 110, SP[1] - 800); ctx.stroke(); tube(SP[0] - 175, SP[1] - 1060, .55, -.35, o.open || 0); // her drawing tube on the shoulder strap
  umbrella(UMB_TOP[0], UMB_TOP[1], 1.0, t, 1); ctx.restore(); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: a flashlight hits an EMPTY gold frame — the canvas is cut out; the alarm light is green
  draw(t, d, P, E, s) { const t1 = s.U(1), ts = E('spot', 1, 7.4);
    if (t < t1 - .15) { gallery(t, { empty: true, dark: true }); blackout(t, .35); const k = eout(prog(t, 0, .9)); flashlight(lerp(1100, 860, k), lerp(1900, 1700, k), lerp(980, 560, k), lerp(1200, 600, k), lerp(160, 300, k));
      ctx.fillStyle = '#16181d'; rr(860, 980, 120, 70, 10); ctx.fill(); ctx.fillStyle = '#34c759'; ctx.beginPath(); ctx.arc(920, 1015, 14, 0, 7); ctx.fill(); glow(920, 1015, 80, 'rgba(60,255,120,.5)'); label('ARMED', 920, 1080, 26, { weight: 900, color: '#7dff9e' }); // alarm panel: still green
      bigTitle('THE ALARM NEVER WENT OFF', 270, prog(t, 0, .2), { size: 70, col: '#fff', glow: 'rgba(255,60,70,.6)' }); label('$300,000 · STOLEN', 540, 380, 44, { weight: 900, color: '#ffd23f', alpha: prog(t, .5, .9) }); return; }
    lineupWall(t); const z = t < ts - .1 ? 1 : lerp(1, 1.06, prog(t, ts - .1, d)); ctx.save(); cam(540, 900, z);
    person(200, 1900, 1290, GUARD2()); person(540, 1900, 1230, CLEAN()); person(880, 1910, 1240, STUD()); ctx.restore();
    ['1', '2', '3'].forEach((n, i) => { ctx.fillStyle = '#111'; rr(140 + i * 340, 1200, 120, 80, 10); ctx.fill(); label(n, 200 + i * 340, 1262, 56, { weight: 900, color: '#fff' }); });
    bigTitle('ONE OF THEM IS LYING', 270, 1, { size: 76, col: '#fff', glow: 'rgba(255,60,70,.6)' }); if (t > ts - .1) caseStamp(540, 400, 1, prog(t, ts - .1, ts + .25), 'CASE #002'); },
  sfx(d, P, E, s) { return [[0, 'boom', .35], [0, 'rain', .3, { dur: s.U(1) }], [.1, 'click', .4], [s.U(1) - .15, 'shutter', .45], [E('spot', 1, 7.4) - .1, 'stamp', .45]]; }
};
SC.guard = { // "The power died at ten. The cameras died. I never left my desk."
  draw(t, d, P, E, s) { const tt = E('ten', 1, 1.6); guardDesk(t); ctx.save(); cam(540, 900, 1.0 + t * .012); person(330, 2150, 1500, GUARD2({ mouth: talking(t, s, s.U(4)) })); desk(1300); coffee(820, 1300, t); ctx.restore(); flashlight(200, 1300, 600, 300, 120, .5);
    counterBox('SUSPECT #1', 'THE NIGHT GUARD', 540, 300, prog(t, 0, .25), { size: 52, accent: '#ffd23f' }); if (t > tt - .2) label('“POWER DIED AT 10 PM”', 540, 470, 40, { weight: 900, color: '#e8f5ea', alpha: prog(t, tt - .2, tt + .1) }); },
  sfx(d) { return [[0, 'rain', .25, { dur: d }], [0, 'pop', .3], [1.4, 'powerdown', .3]]; }
};
SC.cleaner = { // "I was mopping the second floor. I didn't hear a thing."
  draw(t, d, P, E, s) { secondFloor(t); ctx.save(); cam(540, 900, 1.0 + t * .012); mopBucket(260, 1620, 1.0); person(700, 2050, 1500, CLEAN({ mouth: talking(t, s, s.U(8)) })); mop(870, 1980, 1.1, .18 + Math.sin(t * 3) * .05); ctx.restore();
    counterBox('SUSPECT #2', 'THE CLEANER', 540, 300, prog(t, 0, .25), { size: 58, accent: '#ffd23f' }); label('“MOPPING THE 2ND FLOOR”', 540, 470, 40, { weight: 900, color: '#e8f5ea', alpha: prog(t, 1, 1.3) }); },
  sfx(d) { return [[0, 'rain', .2, { dur: d }], [0, 'pop', .3], [.5, 'pour', .2]]; }
};
SC.student = { // "I left at six. Way before the storm even started." — the clue is in plain sight
  draw(t, d, P, E, s) { const tl = E('six', 1, 1.2); studentShot(t, { z: 1.0 + t * .012, mouth: talking(t, s, s.U(11)) });
    counterBox('SUSPECT #3', 'THE ART STUDENT', 540, 300, prog(t, 0, .25), { size: 54, accent: '#ffd23f' }); if (t > tl - .2) label('“LEFT AT 6 PM · BEFORE THE STORM”', 540, 470, 36, { weight: 900, color: '#fff', alpha: prog(t, tl - .2, tl + .1) }); },
  sfx(d) { return [[0, 'rain', .2, { dur: d }], [0, 'pop', .3]]; }
};
SC.doubt = { // "But wait. The guard has a key to every door. And the cleaner's bucket is big enough to hide a rolled-up canvas."
  draw(t, d, P, E, s) { const tk = s.U(14), tb = s.U(15);
    if (t < tk - .05) { bg('#120608', '#050203'); glow(540, 900, 900, 'rgba(255,60,70,.25)'); bigTitle('BUT WAIT…', 860, eback(prog(t, 0, .25)), { size: 150, col: '#fff', glow: 'rgba(255,60,70,.7)' }); return; }
    if (t < tb - .05) { bg('#0d1117', '#05070a'); glow(540, 900, 700, 'rgba(255,210,80,.2)'); ctx.save(); ctx.translate(540, 920); ctx.rotate(Math.sin(t * 4) * .12); ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(0, -160, 120, 0, 7); ctx.stroke();
      for (let k = 0; k < 7; k++) { ctx.save(); ctx.rotate(-.9 + k * .3); ctx.fillStyle = k % 2 ? '#d4af37' : '#b8bcc4'; rr(-14, -40, 28, 240, 8); ctx.fill(); ctx.fillRect(-14, 170, 46, 16); ctx.fillRect(-14, 130, 36, 14); ctx.restore(); } ctx.restore();
      label('A KEY TO EVERY DOOR', 540, 300, 64, { weight: 900, color: '#fff', alpha: prog(t, tk - .05, tk + .2) }); return; }
    secondFloor(t); ctx.save(); cam(380, 1250, 1.7); mopBucket(380, 1620, 1.0, { canvas: prog(t, E('canvas', 1, d - .6) - .3, E('canvas', 1, d - .6)) }); ctx.restore(); label('BIG ENOUGH?', 540, 300, 80, { weight: 900, color: '#fff', alpha: prog(t, tb, tb + .2) }); },
  sfx(d, P, E, s) { return [[0, 'dundun', .4], [s.U(14) - .05, 'cuffs', .4], [s.U(15), 'pour', .3], [E('canvas', 1, d - .6) - .3, 'whoosh', .3]]; }
};
SC.countdown = { // "So who is it? You have five seconds." — the three statements again, full screen
  draw(t, d, P, E) { const ts = E('seconds', 1, 1.6) + .1;
    if (t < ts) { bg('#101318', '#050608'); glow(540, 900, 900, 'rgba(255,210,80,.18)');
      suspectCard(190, 820, 300, 1, 'The guard', () => { guardDesk(0); person(540, 2100, 1650, GUARD2()); }, { rot: -.05 });
      suspectCard(540, 790, 300, 2, 'The cleaner', () => { secondFloor(0); person(540, 2100, 1650, CLEAN()); }, { rot: .02 });
      suspectCard(890, 820, 300, 3, 'The student', () => { gallery(0, { empty: true, dark: true }); person(540, 2100, 1650, STUD()); }, { rot: .05 });
      bigTitle("WHO'S LYING?", 330, prog(t, 0, .25), { size: 96, col: '#ffd23f' }); return; }
    const e = t - ts, i = Math.min(2, Math.floor(e / 1.67));
    if (i === 0) { guardDesk(t); person(330, 2150, 1500, GUARD2()); desk(1300); coffee(820, 1300, t); }
    else if (i === 1) { secondFloor(t); mopBucket(260, 1620, 1.0); person(700, 2050, 1500, CLEAN()); mop(870, 1980, 1.1, .18); }
    else studentShot(t);
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 0, W, 470); const left = Math.max(0, 5 - e), n = Math.max(1, Math.ceil(left));
    if (left > 0) { dayRing(540, 330, 105, left / 5, '#ffd23f'); bigNum(String(n), 540, 330, 150, '#fff', { glow: 'rgba(255,210,80,.8)' }); } },
  sfx(d, P, E) { const ts = E('seconds', 1, 1.6) + .1; return [0, 1, 2, 3, 4].map(k => [ts + k, 'tick', .55]).concat([[ts, 'heartbeat', .35, { dur: 5 }]]); }
};
SC.liar = { // "It's the art student."
  draw(t) { bg('#101318', '#050608'); glow(540, 900, 900, 'rgba(255,60,70,.2)'); suspectCard(540, 820, 520, 3, 'The student', () => { gallery(0, { empty: true, dark: true }); person(540, 2100, 1650, STUD()); }, { liar: prog(t, .1, .4) }); },
  sfx() { return [[.1, 'stamp', .5]]; }
};
SC.umbrella = { // "Look at her umbrella. It's soaking wet."
  draw(t, d, P, E, s) { const tw = s.U(20), z = eio(prog(t, 0, .8)); bg('#05060a', '#020203');
    ctx.save(); cam(lerp(540, UMB_TOP[0], z), lerp(960, UMB_TOP[1] + 360, z), lerp(1.0, 2.3, z)); studentShot(t); ctx.restore();
    if (t > .7) { const k = eback(prog(t, .7, 1.0)); ctx.strokeStyle = LIAR_RED; ctx.lineWidth = 10; ctx.shadowColor = LIAR_RED; ctx.shadowBlur = 26; ctx.beginPath(); ctx.ellipse(540, 980, 150 * k, 420 * k, 0, 0, 7); ctx.stroke(); ctx.shadowBlur = 0; }
    bigTitle(t < tw - .05 ? 'LOOK AT HER UMBRELLA' : 'SOAKING WET', 300, t < tw - .05 ? prog(t, 0, .2) : prog(t, tw - .05, tw + .2), { size: t < tw - .05 ? 76 : 100, col: t < tw - .05 ? '#fff' : '#9fd3ff' }); },
  sfx(d, P, E, s) { return [[0, 'whoosh', .3], [.7, 'pop', .35], [s.U(20), 'rain', .35, { dur: d - s.U(20) }]]; }
};
SC.storm = { // "The storm only hit at nine-forty. She never left." — then the painting slides out of her drawing tube
  draw(t, d, P, E, s) { const tn = s.U(22);
    if (t < tn - .05) { bg('#05070d', '#020306'); const fl = stormWindow(140, 260, 800, 900, t * 1.7 + 1); if (fl) grade('rgba(200,215,255,1)', .25, 'lighter');
      ctx.fillStyle = 'rgba(8,10,16,.85)'; rr(300, 1250, 480, 150, 30); ctx.fill(); label('STORM · 9:40 PM', 540, 1345, 54, { weight: 900, color: '#9fd3ff', font: MONO }); bigTitle('9:40 PM', 300, prog(t, 0, .2), { size: 120, col: '#fff' }); return; }
    ctx.save(); cam(SP[0] - 150, SP[1] - 1150, 1.7); studentShot(t, { open: prog(t, tn + .1, d - .1) }); ctx.restore(); bigTitle('SHE NEVER LEFT', 300, prog(t, tn - .05, tn + .2), { size: 92, col: '#ffd23f' }); },
  sfx(d, P, E, s) { return [[0, 'rain', .4, { dur: s.U(22) }], [.2, 'boom', .45], [s.U(22) + .1, 'zipper', .4], [s.U(22) + .4, 'gold', .35]]; }
};
SC.again = { // "Watch again." — the umbrella one last time, then straight back into frame 0
  draw(t, d) { if (t < d * .5) { ctx.save(); cam(UMB_TOP[0], UMB_TOP[1] + 360, 2.3); studentShot(t); ctx.restore(); ctx.strokeStyle = LIAR_RED; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(540, 980, 150 + 8 * Math.sin(t * 8), 420, 0, 0, 7); ctx.stroke(); }
    else { gallery(t, { empty: true, dark: true }); blackout(t, .55); flashlight(860, 1700, 560, 600, 300); }
    bigTitle('WATCH AGAIN', 300, prog(t, 0, .15), { size: 96, col: '#ffd23f' }); },
  sfx(d) { return [[0, 'pop', .3], [d * .5, 'swoosh_up', .3]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total) drawSubs(t); };
