// ===== YouTube Short (1080×1920, EN): "382 days without food" — Angus Barbieri, 1965 =====
const ANG = (hv = 1, o = {}) => Object.assign({ heavy: hv, top: '#3d4b5e', pants: '#2b2f36', hair: '#2a1a12', shoe: '#1c1c1e', light: 1 }, o);
const DOC = (o = {}) => Object.assign({ top: '#eceef1', pants: '#3a3f4a', hair: '#8a8580', shoe: '#1c1c1e', light: -1 }, o);
const AMBER = '#ffb347', ICE = '#9fd3ff', WARN = '#ff4d4d';

// ---------- props ----------
function plateTop(x, y, r, o = {}) { ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(18, 26, r, r, 0, 0, 7); ctx.fill();
  ctx.fillStyle = rgrad(-r * .3, -r * .3, r * .1, r * 1.1, [[0, '#ffffff'], [1, '#d9dde2']]); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = r * .03; ctx.beginPath(); ctx.arc(0, 0, r * .72, 0, 7); ctx.stroke();
  if (o.cutlery !== false) { ctx.fillStyle = grad(0, -r, 0, r, [[0, '#f2f4f6'], [1, '#9aa1aa']]);
    rr(-r * 1.32, -r * .7, r * .09, r * 1.5, r * .04); ctx.fill(); for (let i = 0; i < 4; i++) ctx.fillRect(-r * 1.36 + i * r * .045, -r * .95, r * .025, r * .3); // fork
    rr(r * 1.22, -r * .95, r * .1, r * 1.75, r * .05); ctx.fill(); } // knife
  ctx.restore(); }
function dayRing(x, y, r, p, col = AMBER) { ctx.save(); ctx.translate(x, y); const n = 96;
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i / n * Math.PI * 2, on = i / n < p; ctx.strokeStyle = on ? col : 'rgba(255,255,255,.12)'; ctx.lineWidth = on ? 10 : 6;
    ctx.beginPath(); ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); ctx.lineTo(Math.cos(a) * (r + 34), Math.sin(a) * (r + 34)); ctx.stroke(); }
  if (p > 0) glow(Math.cos(-Math.PI / 2 + p * Math.PI * 2) * (r + 17), Math.sin(-Math.PI / 2 + p * Math.PI * 2) * (r + 17), 90, 'rgba(255,180,80,.6)'); ctx.restore(); }
function bigNum(s, x, y, size, col = '#fff', o = {}) { ctx.save(); ctx.font = `900 ${size}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; if (o.glow) { ctx.shadowColor = o.glow; ctx.shadowBlur = 50; }
  ctx.fillStyle = col; ctx.globalAlpha *= o.alpha ?? 1; ctx.fillText(s, x, y); ctx.restore(); }
function tag(s, x, y, size, p, col = AMBER, fg = '#111') { pill(s, x, y, size, p, col, fg); }
function hospital(t) { overcast(t, '#7c8590', '#c4c9ce');
  ctx.fillStyle = '#5d6a5a'; for (const [tx, ts] of [[30, 420], [1060, 480]]) tree(tx, 1290, ts, '#4b5a49');
  stoneWall(80, 520, 920, 760); ctx.fillStyle = '#7a7164'; ctx.fillRect(60, 500, 960, 40); ctx.fillRect(420, 380, 240, 140);
  ctx.beginPath(); ctx.moveTo(400, 380); ctx.lineTo(540, 300); ctx.lineTo(680, 380); ctx.fill();
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const wx = 130 + c * 145, wy = 600 + r * 190; ctx.fillStyle = '#2d3640'; ctx.fillRect(wx, wy, 90, 130); ctx.fillStyle = 'rgba(255,230,170,.35)'; if ((r + c) % 3 === 0) ctx.fillRect(wx + 6, wy + 6, 78, 118); ctx.fillStyle = '#e8e2d6'; ctx.fillRect(wx - 6, wy + 130, 102, 10); }
  ctx.fillStyle = '#3a2e26'; rr(470, 1070, 140, 210, 70); ctx.fill(); ctx.fillStyle = '#1b2733'; ctx.fillRect(330, 980, 420, 60); label('MARYFIELD HOSPITAL', 540, 1022, 34, { weight: 900, color: '#e9eef3', spacing: 3 });
  ctx.fillStyle = '#9a9184'; for (let i = 0; i < 3; i++) ctx.fillRect(430 - i * 30, 1280 - (3 - i) * 0 + i * 0, 220 + i * 60, 0);
  ctx.fillStyle = '#5b5f63'; ctx.fillRect(0, 1280, W, H); ctx.fillStyle = '#6c7075'; ctx.fillRect(0, 1280, W, 40);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = shade('#a39a8c', 1 - i * .08); ctx.fillRect(440 - i * 24, 1280 + i * 0 - 0, 200 + i * 48, 0); }
  lampPost(300, 1290, 420); lampPost(820, 1290, 420); }
function chipShop(t) { overcast(t, '#6f7884', '#b9bec4'); ctx.fillStyle = '#4b4f55'; ctx.fillRect(0, 1260, W, H);
  brickWall(0, 380, W, 900, '#5e4a42'); brickWall(180, 480, 760, 800, '#8b2f2a'); ctx.fillStyle = '#1d2a3a'; ctx.fillRect(180, 470, 760, 150);
  label('FISH & CHIPS', 560, 575, 76, { weight: 900, color: '#ffe08a', shadow: 'rgba(255,200,90,.8)', blur: 30 });
  ctx.fillStyle = 'rgba(255,214,140,.85)'; ctx.fillRect(230, 680, 420, 380); glow(440, 870, 400, 'rgba(255,200,120,.35)');
  ctx.strokeStyle = '#2a1b18'; ctx.lineWidth = 12; ctx.strokeRect(230, 680, 420, 380); ctx.beginPath(); ctx.moveTo(440, 680); ctx.lineTo(440, 1060); ctx.stroke();
  ctx.fillStyle = '#2a1b18'; ctx.fillRect(700, 760, 180, 500); ctx.fillStyle = 'rgba(255,214,140,.6)'; ctx.fillRect(720, 790, 140, 200);
  ctx.fillStyle = '#e9e1cf'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(180 + i * 95, 620); ctx.lineTo(275 + i * 95, 620); ctx.lineTo(227 + i * 95, 670); ctx.fill(); } // awning
  for (let i = 0; i < 4; i++) { const k = (t * .25 + i / 4) % 1; ctx.fillStyle = `rgba(255,255,255,${.12 * (1 - k)})`; ctx.beginPath(); ctx.arc(980 + Math.sin(k * 6 + i) * 30, 420 - k * 300, 30 + k * 60, 0, 7); ctx.fill(); } }
function fryer(x, y, w, t) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#9ea6ae'; rr(-w / 2, -40, w, 300, 20); ctx.fill(); ctx.fillStyle = '#c7a14a'; rr(-w / 2 + 30, -20, w - 60, 90, 16); ctx.fill();
  const R = rnd(Math.floor(t * 12)); for (let i = 0; i < 26; i++) { ctx.fillStyle = 'rgba(255,240,190,.75)'; ctx.beginPath(); ctx.arc(-w / 2 + 50 + R() * (w - 100), 0 + R() * 60, 4 + R() * 9, 0, 7); ctx.fill(); }
  for (let i = 0; i < 5; i++) { const k = (t * .4 + i / 5) % 1; ctx.fillStyle = `rgba(255,255,255,${.14 * (1 - k)})`; ctx.beginPath(); ctx.arc(-w / 3 + i * w / 6 + Math.sin(k * 5 + i) * 30, -60 - k * 380, 40 + k * 70, 0, 7); ctx.fill(); }
  ctx.restore(); }
function fishChips(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f1ead8'; ctx.beginPath(); ctx.moveTo(-260, -40); ctx.lineTo(260, -80); ctx.lineTo(300, 120); ctx.lineTo(-280, 150); ctx.fill();
  ctx.fillStyle = grad(-200, -60, 200, 60, [[0, '#d99a3a'], [.5, '#f0c160'], [1, '#c4842c']]); ctx.beginPath(); ctx.ellipse(-30, 10, 210, 80, -.08, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(120,60,10,.25)'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-180 + i * 42, 10 + Math.sin(i) * 20, 10, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#f4cf6a'; for (let i = 0; i < 12; i++) { ctx.save(); ctx.translate(120 + (i % 4) * 34, 40 + Math.floor(i / 4) * 26); ctx.rotate(-.5 + (i % 3) * .3); rr(-60, -9, 120, 18, 6); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 4; i++) { const k = (t * .35 + i / 4) % 1; ctx.fillStyle = `rgba(255,255,255,${.16 * (1 - k)})`; ctx.beginPath(); ctx.arc(-120 + i * 80 + Math.sin(k * 6 + i) * 20, -100 - k * 260, 26 + k * 50, 0, 7); ctx.fill(); }
  ctx.restore(); }
function glassWater(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(160,210,255,.18)'; ctx.beginPath(); ctx.moveTo(-70, -150); ctx.lineTo(70, -150); ctx.lineTo(55, 130); ctx.lineTo(-55, 130); ctx.fill();
  ctx.fillStyle = 'rgba(120,190,255,.45)'; ctx.beginPath(); ctx.moveTo(-64, -60); ctx.lineTo(64, -60); ctx.lineTo(55, 130); ctx.lineTo(-55, 130); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-70, -150); ctx.lineTo(-55, 130); ctx.lineTo(55, 130); ctx.lineTo(70, -150); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-48, -130, 10, 240); ctx.restore(); }
function teaCup(x, y, s, t, col = '#b5651d') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f2f2f2'; ctx.beginPath(); ctx.ellipse(0, 90, 150, 30, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-100, -40); ctx.lineTo(100, -40); ctx.quadraticCurveTo(95, 80, 0, 85); ctx.quadraticCurveTo(-95, 80, -100, -40); ctx.fill(); ctx.strokeStyle = '#f2f2f2'; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(110, 10, 34, -1.2, 1.4); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, -40, 96, 18, 0, 0, 7); ctx.fill();
  for (let i = 0; i < 3; i++) { const k = (t * .4 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.35 * (1 - k)})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-30 + i * 30, -70 - k * 120); ctx.bezierCurveTo(-60 + i * 30, -110 - k * 120, 0 + i * 30, -140 - k * 120, -30 + i * 30, -180 - k * 120); ctx.stroke(); }
  ctx.restore(); }
function vitamins(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#e8a33a'; rr(-80, -110, 160, 230, 26); ctx.fill(); ctx.fillStyle = '#f5f5f5'; rr(-70, -150, 140, 50, 12); ctx.fill();
  ctx.fillStyle = '#fff'; rr(-70, -40, 140, 90, 10); ctx.fill(); label('VIT', 0, 22, 44, { weight: 900, color: '#e8a33a' });
  for (const [px, py, c] of [[-150, 110, '#ffcc4d'], [140, 100, '#ff8c42'], [110, 140, '#ffcc4d']]) { ctx.fillStyle = c; ctx.save(); ctx.translate(px, py); ctx.rotate(.6); rr(-34, -15, 68, 30, 15); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
function eggCup(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f2efe9'; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(-80, 90, -30, 110); ctx.lineTo(-50, 180); ctx.lineTo(50, 180); ctx.lineTo(30, 110); ctx.quadraticCurveTo(80, 90, 90, 0); ctx.fill();
  ctx.fillStyle = grad(-80, -160, 80, 0, [[0, '#fff6e6'], [1, '#e9d6b6']]); ctx.beginPath(); ctx.ellipse(0, -60, 78, 110, 0, Math.PI, 0); ctx.lineTo(78, 0); ctx.lineTo(-78, 0); ctx.fill();
  ctx.fillStyle = '#fbfaf6'; ctx.beginPath(); ctx.ellipse(0, -110, 66, 22, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ffb627'; ctx.beginPath(); ctx.ellipse(0, -110, 38, 13, 0, 0, 7); ctx.fill(); glow(0, -110, 80, 'rgba(255,200,80,.4)');
  for (let i = 0; i < 2; i++) { const k = (t * .4 + i / 2) % 1; ctx.strokeStyle = `rgba(255,255,255,${.3 * (1 - k)})`; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-10 + i * 20, -140 - k * 120); ctx.bezierCurveTo(-40 + i * 20, -170 - k * 120, 20 + i * 20, -200 - k * 120, -10 + i * 20, -230 - k * 120); ctx.stroke(); }
  ctx.restore(); }
function breadButter(x, y, s, butter) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.12);
  ctx.fillStyle = '#b8783a'; ctx.beginPath(); ctx.moveTo(-150, 110); ctx.lineTo(-150, -50); ctx.bezierCurveTo(-170, -170, 170, -170, 150, -50); ctx.lineTo(150, 110); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f3dfb4'; ctx.beginPath(); ctx.moveTo(-130, 92); ctx.lineTo(-130, -45); ctx.bezierCurveTo(-148, -145, 148, -145, 130, -45); ctx.lineTo(130, 92); ctx.closePath(); ctx.fill();
  if (butter > 0) { ctx.globalAlpha = clamp(butter * 2); ctx.fillStyle = '#ffe680'; rr(-70, -40, 140 * clamp(butter * 1.4), 90, 26); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; rr(-50, -30, 60, 14, 7); ctx.fill(); }
  ctx.restore(); }
function scaleDisplay(x, y, w, val, o = {}) { const h = w * .42; ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(-w / 2 + 14, -h / 2 + 18, w, h, 40); ctx.fill(); ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, '#2a2f38'], [1, '#14171c']]); rr(-w / 2, -h / 2, w, h, 40); ctx.fill();
  ctx.fillStyle = '#0a1a10'; rr(-w * .4, -h * .32, w * .8, h * .64, 18); ctx.fill();
  ctx.font = `700 ${h * .5}px ${MONO}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.col || '#6dff9e'; ctx.shadowColor = o.col || '#6dff9e'; ctx.shadowBlur = 30; ctx.fillText(String(Math.round(val)), w * .2, 4);
  ctx.font = `700 ${h * .2}px ${MONO}`; ctx.textAlign = 'left'; ctx.fillText('LBS', w * .23, h * .12); ctx.restore(); }
function stomachWaves(x, y, t, a = 1) { for (let i = 0; i < 3; i++) { const k = (t * .9 + i / 3) % 1; ctx.strokeStyle = `rgba(255,180,90,${a * .7 * (1 - k)})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, 60 + k * 220, 0, 7); ctx.stroke(); } }
function toiletIcon(x, y, s, col = '#fff') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; rr(-30, -60, 50, 50, 8); ctx.fill(); ctx.beginPath(); ctx.ellipse(10, 10, 46, 20, 0, 0, 7); ctx.fill(); ctx.fillRect(-10, 10, 40, 50); ctx.restore(); }
function medCross(x, y, s, col = WARN) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; rr(-40, -120, 80, 240, 14); ctx.fill(); rr(-120, -40, 240, 80, 14); ctx.fill(); ctx.restore(); }
function stethoscope(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#2b2f36'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-60, -120); ctx.quadraticCurveTo(-70, 20, 0, 40); ctx.quadraticCurveTo(70, 20, 60, -120); ctx.moveTo(0, 40); ctx.quadraticCurveTo(10, 140, 90, 150); ctx.stroke();
  ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.arc(110, 150, 34, 0, 7); ctx.fill(); ctx.fillStyle = '#7d848e'; ctx.beginPath(); ctx.arc(110, 150, 18, 0, 7); ctx.fill(); ctx.restore(); }
function homeRoom(t, warm = 1) { bg('#2b2420', '#110d0b'); ctx.fillStyle = grad(0, 300, 0, 900, [[0, '#9fb3c8'], [1, '#d7dde3']]); ctx.fillRect(640, 260, 340, 520); ctx.strokeStyle = '#3b2f28'; ctx.lineWidth = 16; ctx.strokeRect(640, 260, 340, 520);
  ctx.beginPath(); ctx.moveTo(810, 260); ctx.lineTo(810, 780); ctx.moveTo(640, 520); ctx.lineTo(980, 520); ctx.stroke(); glow(810, 520, 700, `rgba(220,230,255,${.25 * warm})`);
  ctx.fillStyle = '#3a2c24'; ctx.fillRect(60, 300, 300, 400); ctx.fillStyle = '#5a463a'; for (let i = 0; i < 4; i++) ctx.fillRect(80, 330 + i * 92, 260, 10); floor(1250, '#2b211b', '#100c0a'); godRays(810, 300, .06, '220,230,255'); }


const _bgCache = {};
function blurred(px, fn, key) { // render the layer once, blur it once, then reuse (canvas filters per primitive are very slow)
  key = key || (fn.toString() + px); let c = _bgCache[key];
  if (!c) { const mk = () => { const k = document.createElement('canvas'); k.width = W; k.height = H; return k; };
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; const snap = mk(); snap.getContext('2d').drawImage(cv, 0, 0);
    ctx.clearRect(0, 0, W, H); fn(); const raw = mk(); raw.getContext('2d').drawImage(cv, 0, 0);
    c = mk(); const g = c.getContext('2d'); g.filter = `blur(${px}px)`; g.drawImage(raw, 0, 0); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); ctx.drawImage(snap, 0, 0); ctx.restore(); _bgCache[key] = c; }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(c, 0, 0); ctx.restore(); }
function woodTable(y, o = {}) { ctx.fillStyle = grad(0, y, 0, H, [[0, o.c1 || '#5a3b24'], [1, o.c2 || '#24160d']]); ctx.fillRect(0, y, W, H - y);
  const R = rnd(o.seed || 12); ctx.save(); ctx.globalAlpha = .22; for (let i = 0; i < 46; i++) { const yy = y + R() * (H - y), ww = 200 + R() * 700, xx = R() * W - 200;
    ctx.strokeStyle = R() > .5 ? '#2a170b' : '#8a5f3a'; ctx.lineWidth = 1 + R() * 3; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.bezierCurveTo(xx + ww * .3, yy + (R() - .5) * 14, xx + ww * .7, yy + (R() - .5) * 14, xx + ww, yy + (R() - .5) * 10); ctx.stroke(); }
  ctx.restore(); ctx.fillStyle = grad(0, y, 0, y + 30, [[0, 'rgba(255,230,190,.25)'], [1, 'rgba(255,230,190,0)']]); ctx.fillRect(0, y, W, 30); }
function stoneWall(x, y, w, h, col = '#8e8476') { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); const R = rnd(21); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let r = 0; r < h / 46; r++) for (let c = -1; c < w / 110 + 1; c++) { const bx = x + c * 110 + (r % 2) * 55, by = y + r * 46; ctx.fillStyle = `rgba(${R() > .5 ? '255,250,240' : '40,35,30'},${.03 + R() * .07})`; ctx.fillRect(bx + 2, by + 2, 106, 42); }
  ctx.strokeStyle = 'rgba(40,34,28,.35)'; ctx.lineWidth = 2; for (let r = 0; r < h / 46; r++) { ctx.beginPath(); ctx.moveTo(x, y + r * 46); ctx.lineTo(x + w, y + r * 46); ctx.stroke(); }
  ctx.restore(); }
function brickWall(x, y, w, h, col = '#8b2f2a') { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); const R = rnd(31); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let r = 0; r < h / 26; r++) for (let c = -1; c < w / 60 + 1; c++) { const bx = x + c * 60 + (r % 2) * 30, by = y + r * 26; ctx.fillStyle = `rgba(${R() > .5 ? '255,200,180' : '30,10,8'},${.04 + R() * .1})`; ctx.fillRect(bx + 2, by + 2, 56, 22); }
  ctx.restore(); }
function vintageCar(x, y, s, col = '#6d1f1f') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(0, 6, 330, 22, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(0, -230, 0, -20, [[0, shade(col, 1.25)], [1, shade(col, .7)]]);
  ctx.beginPath(); ctx.moveTo(-320, -40); ctx.quadraticCurveTo(-330, -120, -250, -130); ctx.quadraticCurveTo(-170, -140, -140, -150); ctx.quadraticCurveTo(-90, -240, 20, -240); ctx.quadraticCurveTo(120, -240, 160, -150);
  ctx.quadraticCurveTo(290, -140, 310, -100); ctx.quadraticCurveTo(330, -60, 320, -40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#26323f'; ctx.beginPath(); ctx.moveTo(-120, -152); ctx.quadraticCurveTo(-80, -225, 10, -225); ctx.lineTo(10, -152); ctx.fill(); ctx.beginPath(); ctx.moveTo(30, -152); ctx.lineTo(30, -225); ctx.quadraticCurveTo(110, -222, 140, -152); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-90, -215, 40, 50);
  ctx.fillStyle = '#d9dde2'; rr(-335, -60, 60, 18, 8); ctx.fill(); rr(275, -60, 60, 18, 8); ctx.fill(); ctx.fillRect(-250, -95, 520, 5);
  for (const wx of [-200, 200]) { ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.arc(wx, -30, 52, 0, 7); ctx.fill(); ctx.fillStyle = '#c9ced6'; ctx.beginPath(); ctx.arc(wx, -30, 24, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(305, -95, 12, 0, 7); ctx.fill(); ctx.restore(); }
function lampPost(x, y, h) { ctx.fillStyle = '#1e2226'; ctx.fillRect(x - 7, y - h, 14, h); ctx.fillRect(x - 16, y - 14, 32, 14); ctx.fillStyle = '#2a2f35'; ctx.beginPath(); ctx.moveTo(x - 30, y - h); ctx.lineTo(x + 30, y - h); ctx.lineTo(x + 18, y - h - 60); ctx.lineTo(x - 18, y - h - 60); ctx.fill(); ctx.fillStyle = 'rgba(255,230,170,.7)'; ctx.fillRect(x - 16, y - h - 52, 32, 44); }
function godRays(x, y, a = .12, col = '255,230,190') { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { ctx.fillStyle = `rgba(${col},${a * (1 - i * .15)})`; ctx.beginPath(); ctx.moveTo(x - 40 + i * 30, y); ctx.lineTo(x + 20 + i * 30, y); ctx.lineTo(x - 500 + i * 160, H); ctx.lineTo(x - 700 + i * 160, H); ctx.fill(); } ctx.restore(); }

// ================== SCENES ==================
SC.hook = { // a clean empty plate, a ring of 382 days filling, the counter rolling
  draw(t, d, P, E) { bg('#0b0d12', '#030405'); woodTable(0, { c1: '#3a2616', c2: '#140c06' }); glow(700, 300, 1000, 'rgba(255,200,140,.22)'); godRays(900, 0, .05); blurred(5, () => glassWater(900, 420, .9), 'glass');
    const p = eio(prog(t, .3, d - .4)); ctx.save(); cam(540, 770, lerp(1.08, 1, eout(prog(t, 0, 1.5)))); plateTop(540, 770, 290); dayRing(540, 770, 345, p); ctx.restore();
    bigNum(String(Math.round(p * 382)), 540, 740, 190, '#1b1f26'); label('DAYS', 540, 870, 52, { weight: 900, color: '#6b7380', spacing: 10 });
    label('NO FOOD.', 540, 1290, 60, { weight: 900, color: AMBER, shadow: 'rgba(255,170,80,.6)' });
    label('HE DIDN\'T EAT FOR', 540, 210, 62, { weight: 900, color: '#fff' }); label('382 DAYS', 540, 300, 96, { weight: 900, color: AMBER, shadow: 'rgba(255,170,80,.7)' }); },
  sfx(d) { return [[0, 'boom', .3], [.05, 'pad_swell', .25, { dur: d + 4 }], [.3, 'ticks', .2, { dur: d - .8 }]]; }
};
SC.hospitalWalk = {
  draw(t, d, P, E) { const ts = E('scotland', 1, d - 1.2); blurred(3, () => hospital(0), 'hosp'); vintageCar(880, 1400, .6, '#3b4d6b'); const h = 640, stride = .64 * h, x = lerp(-140, 430, eout(prog(t, 0, d + .5)));
    person(x, 1290, h, ANG(1, { walk: (x / stride) * Math.PI * 2 + .01, top: '#3d4b5e' })); rain(t, .12, 60);
    stamp('1965', 230, 250, prog(t, .2, .5), { color: '#fff', size: 80, rot: -.08 });
    if (t > 1.6) { counterBox('WEIGHT', '456 LBS', 760, 300, prog(t, 1.6, 1.9), { size: 64, accent: AMBER }); }
    if (t > ts) tag('SCOTLAND', 540, 470, 40, prog(t, ts, ts + .3), '#1d4fa0', '#fff'); },
  sfx(d) { return [[0, 'city', .25, { dur: d }], [.1, 'steps', .25, { dur: d - .5 }], [.2, 'stamp', .35], [1.6, 'pop', .3]]; }
};
SC.nameCard = {
  draw(t, d) { bg('#15110d', '#050403'); glow(540, 800, 900, 'rgba(255,210,150,.25)'); dust(t, 2, 50, .45);
    const k = eout(prog(t, 0, .7)); polaroid(540, lerp(1050, 680, k), 660, lerp(.1, -.03, k), () => { bg('#cfc6b6', '#8f8778'); person(540, 2500, 2000, ANG(1, { light: -1 })); }, 'Angus Barbieri · 1965', { tint: 'rgba(255,215,160,.75)' });
    label('ANGUS BARBIERI', 540, 1250, 70, { weight: 900, color: '#fff', alpha: prog(t, .4, .8) }); label('AGE 27  ·  TAYPORT, SCOTLAND', 540, 1160, 34, { weight: 800, color: AMBER, spacing: 3, alpha: prog(t, .6, 1) }); },
  sfx() { return [[0, 'shutter', .4], [.2, 'paper', .3]]; }
};
SC.doctors = {
  draw(t, d, P, E) { const ta = E('agreed', 1, 2.6), tf = E('few', 1, 4.8); bg('#dfe6ea', '#9aa7b0'); ctx.fillStyle = '#c5d0d6'; ctx.fillRect(0, 1180, W, H);
    blurred(3, () => { ctx.fillStyle = '#b7c3ca'; ctx.fillRect(0, 700, W, 20); ctx.fillStyle = '#8fa0aa'; rr(700, 300, 300, 360, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; for (let i = 0; i < 4; i++) ctx.fillRect(730, 330 + i * 80, 240, 50); });
    ctx.fillStyle = '#f4f7f9'; ctx.fillRect(60, 260, 300, 380); ctx.strokeStyle = '#8a98a2'; ctx.lineWidth = 8; ctx.strokeRect(60, 260, 300, 380); medCross(210, 450, .55, '#d7303a');
    ctx.save(); cam(540, 900, 1.0 + t * .015); person(330, 1700, 1250, ANG(1, { light: 1 })); person(780, 1700, 1180, DOC()); stethoscope(780, 860, .9); ctx.restore();
    if (t > ta - .2) { const k = eout(prog(t, ta - .2, ta + .3)); paperDoc(540, lerp(1500, 1000, k), 480, -.04, 'TREATMENT PLAN', {});
      label('SUPERVISED FAST', 540, lerp(1500, 1000, k) - 40, 34, { color: '#1d2330', weight: 900 }); label('Duration: a few days', 540, lerp(1500, 1000, k) + 20, 30, { color: '#444', weight: 700 });
      if (t > tf) { ctx.strokeStyle = WARN; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(560, lerp(1500, 1000, k) + 10, 190, 40, 0, 0, 7); ctx.stroke(); } } },
  sfx(d, P, E) { return [[0, 'hum', .2, { dur: d }], [E('agreed', 1, 2.6) - .2, 'paper', .4], [E('few', 1, 4.8), 'marker', .4]]; }
};
SC.neverStopped = {
  draw(t, d) { bg('#0a0b0f', '#020203'); glow(540, 800, 900, 'rgba(255,170,80,.2)'); const n = Math.floor(lerp(4, 382, Math.pow(prog(t, .2, d + 1.5), 1.6)));
    for (let i = 0; i < 6; i++) { const k = ((t * 2.2 + i / 6) % 1); ctx.save(); ctx.globalAlpha = (1 - k) * .7; calendarPage(540 + (i - 3) * 40, 780 - k * 420, 1.3, 'DAY', String(Math.max(1, n - i * 7)), '', { rot: (i - 3) * .06 }); ctx.restore(); }
    bigNum('DAY ' + n, 540, 1140, 120, AMBER, { glow: 'rgba(255,170,80,.7)' }); },
  sfx(d) { return [[0, 'pages', .4, { dur: d }], [0, 'riser', .2, { dur: d }]]; }
};
SC.dayOne = {
  draw(t, d, P, E) { const th = E('hunger', 1, 1.3), thd = E('headaches', 1, 2.3); homeRoom(t); ctx.save(); cam(540, 900, 1.02 + t * .02);
    person(540, 2500, 1900, ANG(1, { light: -1 })); ctx.restore();
    if (t > th) stomachWaves(540, 1250, t, prog(t, th, th + .3) * (1 - prog(t, thd, thd + .4) * .6));
    if (t > thd) { const a = .45 + .35 * Math.sin(t * 9); glow(380, 640, 160, `rgba(255,60,60,${a})`); glow(700, 640, 160, `rgba(255,60,60,${a})`); }
    counterBox('DAY', '1', 540, 260, prog(t, 0, .3), { size: 80, accent: AMBER }); },
  sfx(d, P, E) { return [[0, 'pop', .3], [E('hunger', 1, 1.3), 'drone', .25, { dur: 1 }], [E('headaches', 1, 2.3), 'heartbeat', .3, { dur: 1.5 }]]; }
};
SC.ketosis = { // an x-ray style body; fat cells shrink and turn into energy
  draw(t, d, P, E) { const tf = E('fades', 1, 1.6), tb = E('burning', 1, 3.2); bg('#04101c', '#010408'); glow(540, 900, 900, 'rgba(60,160,255,.18)');
    person(540, 1900, 1550, ANG(lerp(1, .85, prog(t, tb, d)), { silhouette: true, color: '#06192b', rim: 'rgba(120,200,255,.9)' }));
    const R = rnd(5), burn = prog(t, tb, d); for (let i = 0; i < 46; i++) { const a = R() * 6.28, rr0 = Math.sqrt(R()), cx = 540 + Math.cos(a) * rr0 * 230, cy = 1050 + Math.sin(a) * rr0 * 300, r = (14 + R() * 20) * (1 - .55 * burn * R());
      ctx.fillStyle = `rgba(255,214,90,${.55 - .25 * burn})`; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
      if (burn > 0 && R() > .5) { const k = (t * .8 + R()) % 1; ctx.fillStyle = `rgba(255,140,60,${.6 * (1 - k) * burn})`; ctx.beginPath(); ctx.arc(cx, cy - k * 160, 6 + 6 * (1 - k), 0, 7); ctx.fill(); } }
    counterBox('DAY', '3', 540, 260, prog(t, 0, .3), { size: 80, accent: AMBER });
    // hunger meter falling
    if (t > tf - .3) { const m = 1 - eio(prog(t, tf - .2, tf + 1)); ctx.fillStyle = 'rgba(255,255,255,.12)'; rr(860, 520, 60, 420, 30); ctx.fill(); ctx.fillStyle = m > .5 ? WARN : AMBER; rr(860, 520 + 420 * (1 - m), 60, 420 * m, 30); ctx.fill(); label('HUNGER', 890, 990, 30, { weight: 900, color: '#cfe8ff' }); }
    if (t > tb) tag('BURNING FAT → ENERGY', 540, 1230, 40, prog(t, tb, tb + .3), AMBER, '#111'); },
  sfx(d, P, E) { return [[0, 'pop', .3], [0, 'hum', .2, { dur: d }], [E('burning', 1, 3.2), 'shimmer', .35]]; }
};
SC.backToWork = {
  draw(t, d, P, E) { blurred(3, () => chipShop(0), 'chip'); const h = 620, stride = .64 * h, x = lerp(-120, 640, eout(prog(t, 0, d + .3)));
    person(x, 1270, h, ANG(.88, { walk: (x / stride) * Math.PI * 2 + .01, top: '#3d4b5e' })); counterBox('WEEK', '2', 540, 260, prog(t, 0, .3), { size: 80, accent: AMBER });
    tag("THE FAMILY CHIP SHOP", 540, 430, 40, prog(t, 1.4, 1.7), '#ffe08a', '#111'); },
  sfx(d) { return [[0, 'city', .25, { dur: d }], [.1, 'steps', .25, { dur: d - .4 }], [1.4, 'door_chime', .35]]; }
};
SC.frying = {
  draw(t, d) { bg('#2a1d14', '#0d0907'); blurred(4, () => { ctx.fillStyle = '#d9d4c8'; ctx.fillRect(0, 0, W, 1200); ctx.strokeStyle = 'rgba(120,110,95,.35)'; ctx.lineWidth = 3;
      for (let yy = 0; yy < 1200; yy += 70) { ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); } for (let xx = 0; xx < W; xx += 70) { ctx.beginPath(); ctx.moveTo(xx, 0); ctx.lineTo(xx, 1200); ctx.stroke(); }
      ctx.fillStyle = '#1b1f22'; rr(620, 140, 400, 430, 14); ctx.fill(); ctx.font = `700 34px ${HAND}`; ctx.fillStyle = '#f2efe6'; ctx.textAlign = 'left';
      [['FISH SUPPER', '2/6'], ['CHIPS', '6d'], ['HADDOCK', '1/9'], ['PEAS', '4d'], ['TEA', '3d']].forEach(([a, b], i) => { ctx.fillText(a, 650, 220 + i * 70); ctx.fillText(b, 940, 220 + i * 70); }); });
    glow(540, 900, 1000, 'rgba(255,170,80,.3)'); ctx.save(); cam(540, 900, 1.0 + t * .03);
    person(540, 2350, 1750, ANG(.85, { top: '#f2efe9', light: -1 })); fryer(380, 1180, 700, t); ctx.fillStyle = '#6b6f75'; ctx.fillRect(-40, 1180, 1200, 40); fishChips(820, 1120, .62, t); ctx.restore();
    label('FOOD HE COULDN\'T TOUCH', 540, 240, 52, { weight: 900, color: '#ffe08a', shadow: 'rgba(0,0,0,.8)', alpha: prog(t, .2, .6) }); },
  sfx(d) { return [[0, 'fizz', .35, { dur: d + .5 }]]; }
};
SC.diet = {
  draw(t, d, P, E) { const tw = E('water', 1, .9), tt2 = E('tea', 1, 1.6), tc = E('coffee', 1, 2.2), tv = E('vitamins', 1, 3); bg('#e9e3d8', '#b9b0a2'); ctx.fillStyle = '#c9b49a'; ctx.fillRect(0, 1150, W, H);
    label('HIS ENTIRE DIET', 540, 240, 64, { weight: 900, color: '#1d1a17' });
    const items = [[tw, 290, 620, k => glassWater(0, 0, 1.15 * k), 'WATER'], [tt2, 790, 640, k => teaCup(0, 0, 1.1 * k, t, '#b5651d'), 'TEA'], [tc, 290, 1030, k => teaCup(0, 0, 1.1 * k, t, '#3b2414'), 'COFFEE'], [tv, 790, 1040, k => vitamins(0, 0, 1.1 * k), 'VITAMINS']];
    items.forEach(([ta, x, y, f, lb]) => { const k = eback(prog(t, ta - .15, ta + .3)); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(0, 30, 200 * k, 0, 7); ctx.fill(); f(k); ctx.restore(); label(lb, x, y + 260, 40, { weight: 900, color: '#1d1a17', alpha: k }); }); },
  sfx(d, P, E) { return ['water', 'tea', 'coffee', 'vitamins'].map((w, i) => [E(w, 1, .9 + i * .7) - .15, 'pop', .35]); }
};
SC.strangest = {
  draw(t, d) { bg('#0b0a10', '#020204'); glow(540, 800, 800, 'rgba(160,120,255,.25)'); const s = 1 + .05 * Math.sin(t * 6);
    bigNum('?', 540, 820, 520 * s, '#fff', { glow: 'rgba(170,130,255,.8)' }); label('THE STRANGEST PART', 540, 1230, 56, { weight: 900, color: '#cdb8ff', alpha: prog(t, .2, .5) }); },
  sfx() { return [[0, 'riser', .25, { dur: 1.4 }]]; }
};
SC.bathroom = {
  draw(t, d, P, E) { bg('#0d1420', '#04070c'); glow(540, 800, 900, 'rgba(90,160,255,.18)'); label('ONE BATHROOM VISIT EVERY', 540, 240, 48, { weight: 900, color: '#cfe0f5' }); bigNum('40–50 DAYS', 540, 340, 100, ICE, { glow: 'rgba(120,200,255,.7)' });
    const n = 50, filled = Math.floor(eio(prog(t, .2, d - .8)) * n); for (let i = 0; i < n; i++) { const c = i % 7, r = Math.floor(i / 7), x = 200 + c * 113, y = 520 + r * 105, on = i < filled;
      ctx.fillStyle = on ? (i === 45 ? 'rgba(120,200,255,.9)' : 'rgba(255,255,255,.18)') : 'rgba(255,255,255,.06)'; rr(x - 48, y - 44, 96, 88, 14); ctx.fill();
      if (on && i === 45) { toiletIcon(x, y + 4, .6, '#0d1420'); glow(x, y, 140, 'rgba(120,200,255,.5)'); } else label(String(i + 1), x, y + 12, 32, { weight: 800, color: on ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.15)' }); } },
  sfx(d) { return [[.2, 'ticks', .2, { dur: d - 1 }], [d - .8, 'chime', .35]]; }
};
SC.day382 = {
  draw(t, d) { bg('#1a120a', '#060403'); glow(540, 820, 1000, 'rgba(255,190,90,.35)'); dayRing(540, 820, 360, 1); bokeh(t, 7, 18, 'rgba(255,200,120,.15)');
    const k = eback(prog(t, .1, .6)); ctx.save(); ctx.translate(540, 800); ctx.scale(k, k); bigNum('382', 0, 0, 260, AMBER, { glow: 'rgba(255,170,80,.9)' }); ctx.restore(); label('DAYS', 540, 960, 56, { weight: 900, color: '#ffe0b0', spacing: 10 }); },
  sfx() { return [[0, 'gold', .4], [.1, 'boom', .3]]; }
};
SC.firstMeal = {
  draw(t, d, P, E) { const te = E('egg', 1, 1.2), tb = E('bread', 1, 2), tbu = E('butter', 1, 3); bg('#3a2a1c', '#140d08'); glow(780, 300, 900, 'rgba(255,220,160,.45)');
    woodTable(900, { c1: '#7a5638', c2: '#2e1d12' }); godRays(820, 0, .08); ctx.save(); cam(540, 1000, lerp(1.0, 1.08, prog(t, 0, d)));
    plateTop(540, 1060, 330, { cutlery: false }); const k1 = eout(prog(t, te - .2, te + .4)), k2 = eout(prog(t, tb - .2, tb + .4));
    if (k2 > 0) breadButter(660, 1080 + (1 - k2) * 300, .95, prog(t, tbu - .2, tbu + .6)); if (k1 > 0) eggCup(400, 1040 + (1 - k1) * 300, .95, t); ctx.restore();
    label('HIS FIRST MEAL', 540, 240, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)' }); dust(t, 3, 40, .5); },
  sfx(d, P, E) { return [[E('egg', 1, 1.2) - .2, 'clink', .4], [E('bread', 1, 2) - .2, 'paper', .3], [0, 'pad_swell', .2, { dur: d }]]; }
};
SC.result = {
  draw(t, d, P, E) { const tk = E('kept', 1, 3.3); bg('#0d1218', '#040608'); glow(540, 800, 1000, 'rgba(110,255,170,.15)');
    const p = eio(prog(t, .2, 2.4)); ctx.save(); ctx.globalAlpha = .9; person(280, 1280, 800, ANG(1, { light: 1 })); person(800, 1280, 800, ANG(0, { light: -1, top: '#2f6b4a' })); ctx.restore();
    label('1965', 280, 1330, 40, { weight: 900, color: '#9aa3ad' }); label('1966', 800, 1330, 40, { weight: 900, color: '#9aa3ad' });
    scaleDisplay(540, 230, 520, lerp(456, 180, p)); if (t > 2.3 && t < tk) tag('−276 LBS', 540, 410, 52, prog(t, 2.3, 2.6), '#6dff9e', '#0a1a10');
    if (t > tk) tag('✓ KEPT IT OFF', 540, 410, 48, prog(t, tk, tk + .3), '#fff', '#0a1a10'); },
  sfx(d, P, E) { return [[.2, 'ticks', .22, { dur: 2.1 }], [2.3, 'chime', .4], [E('kept', 1, 3.3), 'pop', .3]]; }
};
SC.warning = {
  draw(t, d) { bg('#1a0606', '#050101'); glow(540, 800, 900, `rgba(255,60,60,${.2 + .1 * Math.sin(t * 5)})`);
    const k = eback(prog(t, 0, .5)); ctx.save(); ctx.translate(540, 760); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(-400, -330, 800, 660, 50); ctx.fill(); ctx.strokeStyle = WARN; ctx.lineWidth = 14; rr(-400, -330, 800, 660, 50); ctx.stroke();
    medCross(0, -110, .9); label('DANGEROUS', 0, 150, 76, { weight: 900, color: '#fff' }); label('ONLY UNDER MEDICAL CARE', 0, 230, 40, { weight: 900, color: '#ffb3b3', spacing: 2 }); ctx.restore(); },
  sfx() { return [[0, 'buzzer_soft', .3]]; }
};
SC.finalQ = {
  draw(t, d) { bg('#0b0d12', '#030405'); woodTable(0, { c1: '#2f2014', c2: '#100a05' }); glow(540, 820, 900, 'rgba(255,170,80,.2)'); plateTop(540, 760, 260); dayRing(540, 760, 320, prog(t, .2, d - .5), ICE);
    bigNum('24H', 540, 760, 120, '#1b1f26'); label('COULD YOU GO', 540, 230, 66, { weight: 900, color: '#fff' }); label('ONE DAY?', 540, 330, 96, { weight: 900, color: AMBER, shadow: 'rgba(255,170,80,.7)' });
    pill('YES', 330, 1210, 60, prog(t, .8, 1.1), '#2fbf71', '#fff'); pill('NO WAY', 750, 1210, 60, prog(t, 1, 1.3), WARN, '#fff'); },
  sfx(d) { return [[0, 'clock', .3, { dur: d }], [.8, 'pop', .3], [1, 'pop', .3]]; }
};

// ---------- word-by-word subtitles (Shorts style), drawn on top of everything ----------
const SUBS = (() => { const out = []; const U = TL.units;
  U.forEach((u, ui) => { let cur = [];
    u.words.forEach(([n, tt, orig], wi) => { cur.push({ t: tt, w: (orig || n).replace(/^["“]|["”]$/g, '') });
      const endP = /[.,?!:…]["”]?$/.test(orig || ''), last = wi === u.words.length - 1;
      if (cur.length >= 3 || endP || last) { out.push(cur); cur = []; } }); });
  out.forEach((c, i) => { c.start = c[0].t - .06; c.end = i + 1 < out.length ? Math.min(out[i + 1][0].t - .06, c[c.length - 1].t + 1.6) : c[c.length - 1].t + 1.6; });
  return out; })();
function drawSubs(t) { const c = SUBS.find(s => t >= s.start && t < s.end); if (!c) return;
  ctx.save(); ctx.textAlign = 'left'; ctx.letterSpacing = '0px'; let size = 86; ctx.font = `900 ${size}px ${F_HEAD}`; const words = c.map(w => w.w.toUpperCase()); const sp = size * .28;
  let tw = words.reduce((a, w) => a + ctx.measureText(w).width, 0) + words.reduce((a, w) => a + ctx.measureText(w).width * .035, 0) + size * .4 * (words.length - 1); if (tw > 960) { size = Math.floor(size * 960 / tw); ctx.font = `900 ${size}px ${F_HEAD}`; tw = words.reduce((a, w) => a + ctx.measureText(w).width, 0) + size * .4 * (words.length - 1); }
  const pop = eback(clamp((t - c.start) / .18)); let x = 540 - tw / 2; const y = 1400; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.letterSpacing = '0px'; ctx.lineJoin = 'round';
  ctx.translate(540, y); ctx.scale(.9 + .1 * pop, .9 + .1 * pop); ctx.translate(-540, -y);
  words.forEach((w, i) => { const ww = ctx.measureText(w).width, act = t >= c[i].t - .04 && (i === words.length - 1 || t < c[i + 1].t - .04), done = t >= c[i].t - .04;
    ctx.save(); const cx = x + ww / 2; ctx.translate(cx, y); const s = act ? 1.06 : 1; ctx.scale(s, s);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 18; ctx.lineWidth = size * .2; ctx.strokeStyle = '#000'; ctx.strokeText(w, -ww / 2, 0); ctx.shadowBlur = 0;
    ctx.fillStyle = act ? '#ffd23f' : (done ? '#fff' : 'rgba(255,255,255,.92)'); ctx.fillText(w, -ww / 2, 0); ctx.restore(); x += ww + size * .4 + ww * .035; });
  ctx.restore(); }
const _baseRenderAng = window.render;
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .6) drawSubs(t); };
