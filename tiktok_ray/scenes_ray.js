// ===== TikTok (1080×1920, EN): "$1,013 a month" — quiet suburban mystery =====
const INK = '#c4232f', MONEY = '#1f9d55';
const NARR = (o = {}) => Object.assign({ top: '#2b3a55', pants: '#2a2f3a', hair: '#3a2618', shoe: '#e8e6ea', light: 1 }, o);
const MOM = (o = {}) => Object.assign({ fem: true, top: '#7d5f52', pants: '#33303a', hair: '#6e5d52', shoe: '#2a2626', light: 1 }, o);
const RAY = (o = {}) => Object.assign({ top: '#5b4a3a', pants: '#2d2a28', hair: '#a39d95', shoe: '#1c1a19', light: 1 }, o);
const DAD = (o = {}) => Object.assign({ top: '#3f6b4a', pants: '#2d3f5e', hair: '#2a1a12', light: 1 }, o);
const KID = (o = {}) => Object.assign({ top: '#b8432f', pants: '#2d3f5e', hair: '#4a2e1c', shoe: '#f0f0f0', light: 1 }, o);
const money = v => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money0 = v => '$' + Math.round(v).toLocaleString('en-US');

// ---------- environments ----------
function overcast(t, top = '#7d8794', bot = '#c9ced3') { bg(top, bot); const R = rnd(11); ctx.save(); ctx.globalAlpha = .25;
  for (let i = 0; i < 7; i++) { const x = ((R() * 1400 + t * (6 + R() * 8)) % 1500) - 200, y = 150 + R() * 500; ctx.fillStyle = '#eef1f4'; ctx.beginPath(); ctx.ellipse(x, y, 260 + R() * 200, 50 + R() * 40, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function rain(t, a = .35, n = 160, seed = 5) { const R = rnd(seed); ctx.save(); ctx.strokeStyle = `rgba(200,215,235,${a})`; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i < n; i++) { const x = (R() * W + t * 120) % W, y = (R() * H + t * (1400 + R() * 500)) % H; ctx.moveTo(x, y); ctx.lineTo(x - 10, y + 46); } ctx.stroke(); ctx.restore(); }
function snow(t, a = .9, n = 140, seed = 8, size = 1) { const R = rnd(seed); ctx.save();
  for (let i = 0; i < n; i++) { const z = .4 + R() * .9, x = (R() * W + Math.sin(t * .8 + i) * 30 * z + t * 25 * z) % W, y = (R() * H + t * 110 * z) % H;
    ctx.fillStyle = `rgba(255,255,255,${a * (.35 + .5 * z)})`; ctx.beginPath(); ctx.arc(x, y, (2 + 4 * z) * size, 0, 7); ctx.fill(); } ctx.restore(); }
function leaves(t, n = 14, seed = 4) { const R = rnd(seed); for (let i = 0; i < n; i++) { const x = (R() * W + t * 60 + Math.sin(t + i) * 50) % W, y = (R() * H + t * 90) % H;
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + i); ctx.fillStyle = ['#b5602a', '#c98a2e', '#8e3f22'][i % 3]; ctx.beginPath(); ctx.ellipse(0, 0, 14, 7, 0, 0, 7); ctx.fill(); ctx.restore(); } }
function headstone(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(10, 0, 190, 26, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(-150, 0, 150, 0, [[0, '#6c7178'], [.5, '#8c9198'], [1, '#5c6168']]);
  ctx.beginPath(); ctx.moveTo(-150, 0); ctx.lineTo(-150, -260); ctx.quadraticCurveTo(-150, -380, 0, -380); ctx.quadraticCurveTo(150, -380, 150, -260); ctx.lineTo(150, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#4e535a'; ctx.fillRect(-175, -14, 350, 24);
  if (o.text) { ctx.textAlign = 'center'; o.text.forEach(([s2, yy, sz, col]) => { ctx.font = `700 ${sz}px "Liberation Serif", serif`; ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillText(s2, 1, yy + 2); ctx.fillStyle = col || '#2c3036'; ctx.fillText(s2, 0, yy); }); }
  ctx.restore(); }
function cemetery(t, o = {}) { if (o.rainy) bg('#4a525d', '#8a9199'); else overcast(t, '#8b929b', '#d4d2cc');
  ctx.fillStyle = '#3d4a3a'; ctx.beginPath(); ctx.moveTo(0, 1120); ctx.quadraticCurveTo(540, 1060, W, 1110); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  for (const [x, s, c] of [[90, 380, '#2f3a2e'], [980, 460, '#2b352a'], [760, 300, '#36412f']]) tree(x, 1130, s, o.autumn ? ['#7a4a26', '#8e5a2a', '#6a4426'][Math.floor(x) % 3] : c);
  for (let i = 0; i < 7; i++) headstone(80 + i * 160 + (i % 2) * 30, 1180 + (i % 2) * 30, .28 + (i % 3) * .03);
  ctx.fillStyle = grad(0, 1150, 0, H, [[0, o.autumn ? '#5a6340' : '#45533f'], [1, '#232b21']]); ctx.fillRect(0, 1220, W, H - 1220); }
function kitchen(t, o = {}) { bg('#3a2c24', '#1a1310');
  ctx.fillStyle = grad(0, 300, 0, 1000, [[0, '#0f1f3a'], [1, '#1d3558']]); ctx.fillRect(620, 280, 360, 520); // night window
  ctx.fillStyle = '#ffe7a8'; ctx.globalAlpha = .7; for (let i = 0; i < 6; i++) ctx.fillRect(650 + i * 55, 700 - (i % 3) * 30, 24, 30); ctx.globalAlpha = 1;
  ctx.strokeStyle = '#2a1e18'; ctx.lineWidth = 16; ctx.strokeRect(620, 280, 360, 520); ctx.beginPath(); ctx.moveTo(800, 280); ctx.lineTo(800, 800); ctx.stroke();
  ctx.fillStyle = '#4a382d'; for (let i = 0; i < 3; i++) { rr(40 + i * 180, 200, 160, 360, 10); ctx.fill(); } ctx.fillStyle = '#5d473a'; for (let i = 0; i < 3; i++) { ctx.fillRect(100 + i * 180, 360, 40, 8); }
  ctx.fillStyle = '#16100d'; ctx.fillRect(330, 0, 6, 330); ctx.fillStyle = '#2a201b'; ctx.beginPath(); ctx.moveTo(250, 380); ctx.lineTo(416, 380); ctx.lineTo(380, 320); ctx.lineTo(286, 320); ctx.fill();
  glow(333, 420, 900, 'rgba(255,190,120,.42)'); floor(1500, '#2b211b', '#100c0a'); }
function kitchenTable(y, o = {}) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-50, y + 40, W + 100, 60);
  ctx.fillStyle = grad(0, y, 0, y + 70, [[0, '#7a5638'], [1, '#4f3624']]); ctx.fillRect(-50, y, W + 100, 70); ctx.fillStyle = '#3a281b'; ctx.fillRect(-50, y + 70, W + 100, H); glow(400, y + 10, 600, 'rgba(255,190,120,.18)'); }
function folder(x, y, w, rot, labelTxt, p = 1) { const h = w * .72; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-w / 2 + 12, -h / 2 + 16, w, h);
  ctx.fillStyle = '#c9a66b'; rr(-w / 2 + 20, -h / 2 - 34, w * .34, 50, 12); ctx.fill();
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#dcb87a'], [1, '#b8915a']]); rr(-w / 2, -h / 2, w, h, 10); ctx.fill();
  if (labelTxt && p > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w * clamp(p), h); ctx.clip(); ctx.font = `700 ${w * .17}px ${HAND}`; ctx.fillStyle = '#1b1b1b'; ctx.textAlign = 'center'; ctx.fillText(labelTxt, 0, w * .05); ctx.restore(); }
  ctx.restore(); }
function sedanRear(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.beginPath(); ctx.ellipse(0, 6, 230, 26, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#0d0f14'; rr(-200, -40, 70, 50, 14); ctx.fill(); rr(130, -40, 70, 50, 14); ctx.fill();
  ctx.fillStyle = '#1b1f28'; rr(-215, -170, 430, 150, 30); ctx.fill(); ctx.beginPath(); ctx.moveTo(-160, -170); ctx.lineTo(-115, -270); ctx.lineTo(115, -270); ctx.lineTo(160, -170); ctx.fill();
  ctx.fillStyle = '#0a0c11'; ctx.beginPath(); ctx.moveTo(-135, -178); ctx.lineTo(-100, -255); ctx.lineTo(100, -255); ctx.lineTo(135, -178); ctx.fill();
  for (const k of [-1, 1]) { ctx.fillStyle = '#ff2a2a'; rr(k * 150 - 45, -140, 90, 34, 10); ctx.fill(); glow(k * 150, -123, 170, 'rgba(255,40,40,.6)'); }
  ctx.fillStyle = '#d9dbe0'; ctx.fillRect(-55, -95, 110, 40); ctx.restore(); }
function bus(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, 10, 640, 30, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(0, -420, 0, 0, [[0, '#eef2f5'], [1, '#b9c3cc']]); rr(-620, -420, 1240, 380, 40); ctx.fill();
  ctx.fillStyle = '#1f6fb2'; ctx.fillRect(-620, -150, 1240, 40);
  ctx.fillStyle = '#1a2533'; for (let i = 0; i < 6; i++) { rr(-560 + i * 190, -380, 160, 160, 14); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,230,170,.55)'; for (let i = 0; i < 6; i++) { rr(-550 + i * 190, -370, 140, 60, 10); ctx.fill(); }
  ctx.fillStyle = '#121a24'; rr(-600, -380, 70, 330, 10); ctx.fill(); // door
  ctx.fillStyle = '#ffe8a0'; ctx.fillRect(-620, -110, 30, 40); glow(-620, -90, 200, 'rgba(255,230,150,.6)');
  ctx.fillStyle = '#ff9a2a'; rr(-480, -415, 380, 26, 6); ctx.fill(); label('42  MAPLE AVE', -290, -394, 22, { color: '#1a1a1a', weight: 900 });
  for (const wx of [-380, 380]) { ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.arc(wx, -30, 70, 0, 7); ctx.fill(); ctx.fillStyle = '#5b6068'; ctx.beginPath(); ctx.arc(wx, -30, 30, 0, 7); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(-610, -432, 1220, 22, 10); ctx.fill(); // snow on the roof
  ctx.restore(); }
function busStop(x, y) { ctx.fillStyle = '#2a2f36'; ctx.fillRect(x - 6, y - 520, 12, 520); ctx.fillStyle = '#1f6fb2'; rr(x - 70, y - 600, 140, 110, 14); ctx.fill();
  label('BUS', x, y - 528, 46, { weight: 900 }); ctx.fillStyle = '#fff'; ctx.fillRect(x - 70, y - 610, 140, 14); }
function polaroid(x, y, w, rot, paint, cap, o = {}) { const h = w * 1.18; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w, h); ctx.fillStyle = '#f3efe6'; ctx.fillRect(-w / 2, -h / 2, w, h);
  const iw = w * .88; ctx.save(); ctx.beginPath(); ctx.rect(-iw / 2, -h / 2 + w * .06, iw, iw); ctx.clip(); ctx.translate(-iw / 2, -h / 2 + w * .06); ctx.scale(iw / W, iw / W); paint();
  ctx.setTransform(ctx.getTransform()); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.tint || 'rgba(255,225,180,.55)'; ctx.fillRect(-iw / 2, -h / 2 + w * .06, iw, iw); ctx.restore();
  if (cap) { ctx.font = `700 ${w * .085}px ${HAND}`; ctx.fillStyle = '#25334d'; ctx.textAlign = 'center'; ctx.fillText(cap, 0, h / 2 - w * .06); }
  ctx.restore(); }
function backyard(t) { bg('#8fc0e0', '#e9d7b0'); glow(800, 300, 600, 'rgba(255,230,170,.5)'); ctx.fillStyle = '#6a8f4a'; ctx.fillRect(0, 1250, W, H);
  house(-80, 1260, 600, 420, { body: '#c9b39a', roof: '#5a4a3e' }); picketFence(0, W, 1300, 160, '#f2efe8'); tree(900, 1270, 520, '#4c7a3a'); }
function phoneUI(x, y, w, t, o = {}) { const h = w * 2.05; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(-w / 2 + 18, -h / 2 + 26, w, h, w * .13); ctx.fill();
  ctx.fillStyle = '#0b0c10'; rr(-w / 2, -h / 2, w, h, w * .13); ctx.fill(); ctx.strokeStyle = '#30343e'; ctx.lineWidth = 5; ctx.stroke();
  ctx.save(); rr(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, w * .1); ctx.clip();
  ctx.fillStyle = '#eef1f5'; ctx.fillRect(-w / 2, -h / 2, w, h);
  const hh = h * .27; ctx.fillStyle = grad(0, -h / 2, 0, -h / 2 + hh, [[0, '#0b1a36'], [1, '#17396b']]); ctx.fillRect(-w / 2, -h / 2, w, hh);
  label('CHECKING  ••••  4471', 0, -h / 2 + 100, w * .045, { color: 'rgba(255,255,255,.7)', spacing: 3, weight: 700 });
  label(o.balLabel || 'Available balance', 0, -h / 2 + 165, w * .042, { color: 'rgba(255,255,255,.6)', weight: 600 });
  label(o.bal || '', 0, -h / 2 + 265, w * .115, { weight: 900, color: o.gold ? GOLD : '#fff', shadow: o.gold ? 'rgba(255,200,80,.9)' : null });
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2 + hh, w, h - hh); ctx.clip();
  label('RECENT ACTIVITY', -w / 2 + 50, -h / 2 + hh + 60, w * .036, { align: 'left', color: '#7a8494', spacing: 3, weight: 800 });
  const rowH = h * .095, rows = o.rows || []; const sc = o.scroll || 0;
  rows.forEach((r, i) => { const ty = -h / 2 + hh + 130 + i * rowH - sc; if (ty < -h / 2 + hh - rowH || ty > h / 2 + rowH) return;
    ctx.fillStyle = r.hi ? '#fff6d8' : '#fff'; rr(-w / 2 + 30, ty - rowH * .42, w - 60, rowH * .84, 20); ctx.fill();
    ctx.fillStyle = '#e3f5ea'; ctx.beginPath(); ctx.arc(-w / 2 + 92, ty, rowH * .25, 0, 7); ctx.fill(); label('↓', -w / 2 + 92, ty + w * .02, w * .05, { color: MONEY, weight: 900 });
    label(r.title || 'Deposit', -w / 2 + 140, ty - 4, w * .042, { align: 'left', color: '#1d2330', weight: 800 });
    label(r.sub || '', -w / 2 + 140, ty + w * .05, w * .034, { align: 'left', color: '#7a8494', weight: 600 });
    label(r.amt, w / 2 - 60, ty - 4, w * .045, { align: 'right', color: MONEY, weight: 900 }); label(r.date || '', w / 2 - 60, ty + w * .05, w * .03, { align: 'right', color: '#9aa3b0', weight: 600 }); });
  ctx.restore(); ctx.restore();
  if (o.notif > 0) { const k = eout(clamp(o.notif)); ctx.save(); ctx.translate(0, -h / 2 + 80 - (1 - k) * 200); ctx.globalAlpha = clamp(o.notif * 2);
    ctx.fillStyle = 'rgba(25,28,36,.94)'; rr(-w / 2 + 24, 0, w - 48, 150, 30); ctx.fill(); ctx.fillStyle = MONEY; rr(-w / 2 + 50, 30, 90, 90, 22); ctx.fill(); label('$', -w / 2 + 95, 95, 60, { weight: 900 });
    label(o.notifTitle || 'Deposit received', -w / 2 + 165, 66, w * .042, { align: 'left', weight: 800 }); label(o.notifBody || '', -w / 2 + 165, 116, w * .05, { align: 'left', weight: 900, color: GOLD }); ctx.restore(); }
  ctx.restore(); }
function depositRows(n, hiEvery) { const rows = []; const mon = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  for (let i = 0; i < n; i++) { const m = (10 + i) % 12, yr = 2003 + Math.floor((10 + i) / 12); rows.push({ title: 'Deposit', sub: 'Unknown · Memo: "Sorry"', amt: '+$1,013.00', date: `${mon[m]} 13, ${yr}` }); }
  return rows.reverse(); }
const ROWS = depositRows(264), ROWS_ASC = [...ROWS].reverse();
function handWrite(s, x, y, size, p, col = INK, o = {}) { if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.font = `700 ${size}px ${HAND}`; ctx.textAlign = 'center';
  const w = ctx.measureText(s).width; ctx.beginPath(); ctx.rect(-w / 2 - 20, -size, (w + 40) * clamp(p), size * 1.5); ctx.clip();
  if (o.glow) { ctx.shadowColor = o.glow; ctx.shadowBlur = 40; } ctx.fillStyle = col; ctx.fillText(s, 0, 0); ctx.restore(); }
function letterCard(x, y, w, rot, lines, p, o = {}) { const h = w * (o.ratio || .62); ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w, h); ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#fbf7ee'], [1, '#e8dfcc']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = 'rgba(80,110,170,.2)'; ctx.lineWidth = 2; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-w / 2 + 30, -h / 2 + i * h / 6); ctx.lineTo(w / 2 - 30, -h / 2 + i * h / 6); ctx.stroke(); }
  lines.forEach((l, i) => handWrite(l, 0, -h / 2 + (i + 1) * h / (lines.length + 1) + w * .03, o.size || w * .085, clamp(p * lines.length - i), o.col || '#1d2a6b'));
  ctx.restore(); }
function legalDoc(x, y, w, rot, o = {}) { const h = w * 1.3; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w, h); ctx.fillStyle = '#f7f4ec'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.textAlign = 'center'; ctx.fillStyle = '#1b1b1b'; ctx.font = `700 ${w * .05}px "Liberation Serif", serif`; ctx.fillText('LAST WILL AND TESTAMENT', 0, -h / 2 + w * .13);
  ctx.fillRect(-w * .38, -h / 2 + w * .16, w * .76, 3); ctx.font = `700 ${w * .062}px "Liberation Serif", serif`;
  ctx.fillText('ESTATE OF', 0, -h / 2 + w * .27); const name = o.name || 'RAYMOND J. COLE'; ctx.font = `900 ${w * .075}px "Liberation Serif", serif`; ctx.fillText(name, 0, -h / 2 + w * .38);
  const nw = ctx.measureText(name).width; const red = clamp(o.redact ?? 1); if (red > 0) { ctx.fillStyle = '#0d0d0f'; ctx.fillRect(-nw / 2 - 16, -h / 2 + w * .31, (nw + 32) * red, w * .09); }
  ctx.fillStyle = 'rgba(30,30,30,.5)'; for (let i = 0; i < 7; i++) ctx.fillRect(-w * .4, -h / 2 + w * .5 + i * w * .055, w * (i === 6 ? .5 : .8), w * .014);
  ctx.font = `italic 400 ${w * .045}px "Liberation Serif", serif`; ctx.fillStyle = '#222'; ctx.fillText('…I leave my entire estate to', 0, -h / 2 + w * .98);
  if (o.mark > 0) { ctx.fillStyle = 'rgba(255,224,60,.6)'; ctx.fillRect(-w * .33, -h / 2 + w * 1.03, w * .66 * clamp(o.mark), w * .09); }
  ctx.font = `900 ${w * .065}px "Liberation Serif", serif`; ctx.fillStyle = '#111'; ctx.fillText('LINDA MORGAN', 0, -h / 2 + w * 1.1);
  ctx.strokeStyle = '#25334d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .05, h / 2 - w * .12); ctx.bezierCurveTo(w * .15, h / 2 - w * .2, w * .2, h / 2 - w * .05, w * .38, h / 2 - w * .14); ctx.stroke();
  ctx.restore(); }
function umbrella(x, y, r, col = '#121418') { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, 0); ctx.quadraticCurveTo(x + r * .66, y - r * .12, x + r * .33, y); ctx.quadraticCurveTo(x, y - r * .12, x - r * .33, y); ctx.quadraticCurveTo(x - r * .66, y - r * .12, x - r, y); ctx.fill();
  ctx.strokeStyle = '#2a2d33'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r * .9); ctx.stroke(); }
function counterBox(lbl, val, x, y, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(8,10,16,.8)'; rr(-230, -86, 460, 150, 26); ctx.fill(); ctx.fillStyle = o.accent || GOLD; ctx.fillRect(-230, -86, 10, 150);
  label(lbl, 0, -38, 30, { color: 'rgba(255,255,255,.7)', spacing: 4, weight: 800 }); label(val, 0, 40, o.size || 66, { weight: 900, color: o.col || '#fff' }); ctx.restore(); }
function cake(x, y, s, t, n = 9) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#f4e9e1'; rr(-200, -150, 400, 150, 20); ctx.fill(); ctx.fillStyle = '#e88aa0'; rr(-200, -160, 400, 50, 24); ctx.fill();
  for (let i = 0; i < n; i++) { const cx = -160 + i * 320 / (n - 1); ctx.fillStyle = ['#7ec8e3', '#f7d070', '#a8e6a1'][i % 3]; ctx.fillRect(cx - 6, -230, 12, 70);
    const fl = 1 + .15 * Math.sin(t * 13 + i); ctx.fillStyle = '#ffcc4d'; ctx.beginPath(); ctx.ellipse(cx, -248, 8 * fl, 16 * fl, 0, 0, 7); ctx.fill(); glow(cx, -248, 70, 'rgba(255,190,90,.5)'); }
  ctx.restore(); }
function carKeyX(x, y, p) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(8,10,16,.85)'; ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fill(); ctx.fillStyle = '#d9dde3'; rr(-70, -40, 70, 80, 22); ctx.fill(); ctx.fillRect(-5, -10, 90, 20); ctx.fillRect(55, 10, 12, 22); ctx.fillRect(75, 10, 10, 16);
  ctx.fillStyle = '#1f6fb2'; ctx.beginPath(); ctx.arc(-35, 0, 14, 0, 7); ctx.fill(); ctx.restore(); bigX(x, y, 200 * k, prog(p, .4, 1)); }
function vignetteWarm(a = .25) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(255,214,170,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }

// ================== SCENES ==================
SC.hookPayments = { // first frame: phone full of "$1,013 — Sorry" deposits + a huge hand-written "Sorry."
  draw(t, d, P, E) { bg('#070b16', '#02040a'); glow(540, 900, 1000, 'rgba(60,120,255,.22)'); bokeh(t, 3, 14, 'rgba(120,170,255,.12)');
    const sp = eio(prog(t, .9, d)), scroll = sp * 210 * 70; ctx.save(); cam(540, 1000, lerp(1.12, 1.0, eout(prog(t, 0, 1.2))));
    phoneUI(540, 1040, 600, t, { bal: money(1013 * (1 + Math.floor(sp * 263))), rows: ROWS_ASC, scroll: scroll % (264 * 117) }); ctx.restore();
    const yr = 2003 + Math.floor(sp * 22), n = 1 + Math.floor(sp * 263);
    counterBox('YEAR', String(yr), 300, 1780, prog(t, .8, 1.1), { size: 70 }); counterBox('PAYMENT', '#' + n, 780, 1780, prog(t, 1, 1.3), { size: 70, accent: MONEY });
    const s0 = 1 - prog(t, 1.4, 1.9); if (s0 > 0) { ctx.save(); ctx.globalAlpha = s0; handWrite('Sorry.', 540, 1060, 300, 1, INK, { rot: -.12, glow: 'rgba(255,40,60,.5)' }); ctx.restore(); }
    caption('SOMEONE PAID MY MOM\n$1,013 EVERY MONTH', 230, t < .05 ? 1 : 1, { size: 64 }); },
  sfx(d) { return [[0, 'notif', .5], [.05, 'pad_swell', .25, { dur: d + 6 }], [.9, 'ticks', .22, { dur: d - 1.1 }]]; }
};
SC.transferCard = {
  draw(t, d, P, E) { bg('#0a0f1c', '#03050a'); glow(540, 800, 900, 'rgba(80,140,255,.18)');
    const te = E('every', 1, .1), tn = E('name', 1, 1.1), tw = E('word', 1, 2.4); const mons = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'];
    for (let i = 0; i < 5; i++) { const k = prog(t, te + i * .18, te + i * .18 + .5); if (k <= 0 || k >= 1) continue; ctx.save(); ctx.globalAlpha = (1 - k) * .6; calendarPage(540 + (i - 2) * 30, 520 - k * 200, 1.1, mons[i], '13', '', { rot: (i - 2) * .05 }); ctx.restore(); }
    ctx.save(); cam(540, 1050, 1 + t * .02); const cw = 860, cx = 540, cy = 1080;
    ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(cx - cw / 2 + 16, cy - 420 + 22, cw, 840, 40); ctx.fill(); ctx.fillStyle = '#f6f7fa'; rr(cx - cw / 2, cy - 420, cw, 840, 40); ctx.fill();
    label('TRANSFER DETAILS', cx, cy - 320, 40, { color: '#7a8494', spacing: 6, weight: 900 });
    const rowsT = [['FROM', t > tn ? '— no name —' : '', '#b0b6c0', tn], ['AMOUNT', '$1,013.00', MONEY, 0], ['REPEATS', 'EVERY MONTH', '#1d2330', te]];
    rowsT.forEach(([k, v, c, ta], i) => { const yy = cy - 190 + i * 150; ctx.fillStyle = '#e6e9ef'; ctx.fillRect(cx - cw / 2 + 60, yy + 48, cw - 120, 3);
      label(k, cx - cw / 2 + 70, yy, 34, { align: 'left', color: '#8a93a2', weight: 800, spacing: 3 }); if (t > ta) label(v, cx + cw / 2 - 70, yy, 50, { align: 'right', color: c, weight: 900, alpha: prog(t, ta, ta + .25) }); });
    label('MEMO', cx - cw / 2 + 70, cy + 270, 34, { align: 'left', color: '#8a93a2', weight: 800, spacing: 3 });
    handWrite('"Sorry."', cx + 130, cy + 300, 120, prog(t, tw + .2, tw + .9), INK);
    ctx.restore(); if (t > tn && t < tw) caption('NO NAME. EVER.', 1700, prog(t, tn, tn + .3), { size: 56 }); },
  sfx(d, P, E) { return [[E('every', 1, .1), 'pages', .35, { dur: 1 }], [E('name', 1, 1.1), 'click', .4], [E('word', 1, 2.4) + .2, 'pen', .45]]; }
};
SC.million = {
  draw(t, d, P, E) { const tm = E('million', 1, 2.6), tl = E('last', 1, 1.4); bg('#0b0a08', '#030303');
    if (t < tl) { glow(540, 900, 800, 'rgba(255,60,70,.16)'); handWrite('Sorry.', 540, 980, 340, prog(t, 0, .7), INK, { rot: -.08, glow: 'rgba(255,40,60,.45)' }); caption('×264 TIMES', 1560, prog(t, .3, .6), { size: 60, accent: INK }); return; }
    const g = prog(t, tm - .2, tm + 1); glow(540, 1000, 1200, `rgba(255,200,90,${.12 + .3 * g})`); bokeh(t, 9, 20, 'rgba(255,210,120,.2)');
    ctx.save(); cam(540, 1000, lerp(1.0, 1.06, prog(t, tl, d)));
    phoneUI(540, 1060, 600, t, { bal: t > tm + .9 ? '$1,267,432.00' : money(267432), gold: t > tm + .9, rows: [{ title: 'Estate transfer', sub: 'Memo: "The last one"', amt: '+$1,000,000', date: 'SEP 13, 2025', hi: true }].concat(ROWS.slice(0, 8)), notif: prog(t, tm - .3, tm + .2), notifTitle: 'Deposit received', notifBody: '+$1,000,000.00' }); ctx.restore();
    if (t > tm) odometer('$1,000,000', 540, 470, 150, prog(t, tm, tm + 1.4), { color: GOLD, shadow: 'rgba(255,200,80,.8)' });
    caption('LAST MONTH:', 240, prog(t, tl, tl + .3), { size: 60, accent: GOLD }); },
  sfx(d, P, E) { const tm = E('million', 1, 2.6); return [[0, 'pen', .35], [tm - .3, 'notif', .5], [tm, 'ticks', .25, { dur: 1.3 }], [tm + 1.3, 'gold', .45], [tm + .1, 'riser', .2, { dur: 1.2 }]]; }
};
SC.evidence = {
  draw(t, d, P, E) { const tv = E('evidence', 1, d - 1.2), ta = E('account', 1, 2.5); kitchen(t);
    ctx.save(); cam(lerp(540, 560, prog(t, 0, d)), lerp(1000, 1180, eio(prog(t, tv - .8, d))), lerp(1.0, 1.28, eio(prog(t, tv - .8, d))));
    person(540, 2700, 1750, MOM({ light: -1, rim: 'rgba(255,200,140,.6)' })); kitchenTable(1450);
    paperDoc(300, 1640, 300, -.12, 'STATEMENT', {}); label('WITHDRAWALS', 300, 1560, 24, { color: '#333', weight: 900 }); label('$0.00', 300, 1610, 54, { color: MONEY, weight: 900 });
    folder(700, 1640, 420, .06, 'EVIDENCE', prog(t, tv - .1, tv + .6)); ctx.restore();
    caption('SHE NEVER SPENT\nA SINGLE CENT', 230, prog(t, .2, .6), { size: 60 }); if (t > ta && t < tv) counterBox('ACCOUNT', 'UNTOUCHED', 540, 560, prog(t, ta, ta + .3), { size: 54, accent: MONEY }); },
  sfx(d, P, E) { return [[0, 'clock', .3, { dur: d }], [E('account', 1, 2.5), 'pop', .3], [E('evidence', 1, d - 1.2) - .1, 'marker', .5]]; }
};
SC.funeral = {
  draw(t, d, P, E) { const tf = E('funeral', 1, 2.4); cemetery(t, { rainy: true }); ctx.save(); cam(540, 1150, 1.02 + t * .015);
    person(470, 1560, 700, MOM({ top: '#15161a', pants: '#15161a', light: -1 })); person(640, 1560, 420, KID({ top: '#15161a', pants: '#15161a' }));
    umbrella(540, 820, 270); headstone(820, 1500, .55, { text: [['', -200, 40]] }); ctx.fillStyle = 'rgba(60,40,30,.9)'; ctx.fillRect(700, 1500, 240, 20);
    ctx.restore(); rain(t, .3); ctx.fillStyle = 'rgba(40,50,70,.18)'; ctx.fillRect(0, 0, W, H);
    pill('FIRST PAYMENT: NOV 13, 2003', 540, 260, 40, prog(t, .1, .5), 'rgba(8,10,16,.85)', '#fff');
    if (t > tf - .2) timeStamp('ONE MONTH AFTER THE FUNERAL', 540, 1800, 40, { align: 'center', col: '#ffd66b' }); },
  sfx(d) { return [[0, 'rain', .45, { dur: d + .5 }], [.1, 'notif', .3]]; }
};
SC.hitAndRun = {
  draw(t, d, P, E) { const th = E('hit', 1, .8), tdv = E('drove', 1, 2.2), tf = E('found', 1, d - 1.2);
    if (t < tf - .25) { bg('#05070c', '#0b1018'); ctx.fillStyle = '#0d1118'; ctx.beginPath(); ctx.moveTo(380, 980); ctx.lineTo(700, 980); ctx.lineTo(1400, H); ctx.lineTo(-320, H); ctx.fill();
      ctx.fillStyle = 'rgba(255,220,150,.5)'; for (let i = 0; i < 8; i++) { const k = ((i / 8) + t * .6) % 1, yy = 980 + Math.pow(k, 2) * 940; ctx.fillRect(540 - 4 - k * 8, yy, 8 + k * 16, 20 + k * 60); }
      glow(540, 980, 300, 'rgba(255,190,120,.25)'); const k = eio(prog(t, tdv - .6, tf)); sedanRear(540 + k * 40, lerp(1700, 1010, k), lerp(1.3, .12, k));
      const fl = prog(t, th - .1, th + .1) * (1 - prog(t, th + .1, th + .6)); if (fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl * .6})`; ctx.fillRect(0, 0, W, H); }
      rain(t, .25, 120); timeStamp('OCT 13, 2003 · 11:42 PM', 540, 300, 48, { align: 'center', col: '#ff6b75' }); return; }
    bg('#1a1712', '#0a0806'); glow(540, 900, 900, 'rgba(255,220,160,.2)');
    newspaper(540, 960, 760, -.04, 'THE DAILY HERALD', 'HIT-AND-RUN\nDRIVER STILL\nNOT FOUND', 'Police have no suspects', { date: 'OCTOBER 2003', s: lerp(1.25, 1, eout(prog(t, tf - .25, tf + .3))) });
    stamp('UNSOLVED', 560, 1150, prog(t, tf + .3, tf + .6), { color: INK }); },
  sfx(d, P, E) { const tf = E('found', 1, d - 1.2); return [[0, 'rain', .35, { dur: tf }], [E('hit', 1, .8) - .2, 'whoosh', .45], [E('drove', 1, 2.2), 'swoosh', .25], [tf - .25, 'paper', .5], [tf + .3, 'stamp', .4]]; }
};
SC.headstoneWalk = { // the narrator walks across the cemetery (profile, real gait) to the headstone
  draw(t, d, P, E) { const th = E('headstone', 1, d - .8); cemetery(t, { autumn: true }); const h = 760, stride = .64 * h;
    const x = lerp(-80, 560, eout(prog(t, 0, d + .6))); headstone(820, 1560, .9, { text: [['IN LOVING MEMORY', -270, 28]] });
    person(x, 1560, h, NARR({ walk: (x / stride) * Math.PI * 2 + .01, top: '#2b3340' })); leaves(t);
    const R = rnd(2); for (let i = 0; i < 4; i++) { const k = prog(t, .3 + i * .25, 2.2 + i * .25); if (k <= 0 || k >= 1) continue; label('1013', 160 + R() * 760, 700 - k * 300, 70 + R() * 40, { weight: 900, color: `rgba(255,255,255,${.25 * Math.sin(k * Math.PI)})` }); }
    caption('I NEVER THOUGHT\nABOUT THE NUMBER', 260, prog(t, .2, .6), { size: 58 }); },
  sfx(d) { return [[0, 'wind', .3, { dur: d }], [.1, 'steps', .3, { dur: d - .5 }]]; }
};
SC.dateMatch = {
  draw(t, d, P, E) { const tt = E('ten', 1, 1.9); overcast(t, '#6d747d', '#a6aab0'); ctx.fillStyle = '#3d4a3a'; ctx.fillRect(0, 1500, W, H);
    ctx.save(); cam(540, 1000, lerp(1.0, 1.08, prog(t, 0, d)));
    headstone(540, 1620, 2.2, { text: [['BELOVED HUSBAND & FATHER', -300, 22], ['MICHAEL MORGAN', -250, 30], ['1974 – 2003', -200, 24], ['OCTOBER 13', -125, 40, '#1d2025']] }); ctx.restore();
    const k = eio(prog(t, tt - .6, tt + .2)); if (k > 0) { const ya = lerp(320, 780, k); ctx.save(); ctx.globalAlpha = clamp(k * 3);
      label('$', lerp(400, 300, k), ya, 120, { weight: 900, color: MONEY, alpha: 1 - k }); label('10', lerp(470, 380, k), ya, 150, { weight: 900, color: GOLD, shadow: 'rgba(255,200,80,.8)' });
      label('13', lerp(640, 700, k), ya, 150, { weight: 900, color: GOLD, shadow: 'rgba(255,200,80,.8)' }); label('.00', lerp(800, 900, k), ya, 80, { weight: 900, color: MONEY, alpha: 1 - k }); ctx.restore();
      if (k >= 1) { label('/', 540, 780, 150, { weight: 900, color: GOLD, alpha: prog(t, tt + .2, tt + .5) }); } }
    else label('$1,013', 540, 320, 120, { weight: 900, color: MONEY, alpha: prog(t, .3, .8) });
    if (t > tt + .3) caption('THE AMOUNT WAS\nTHE DATE HE DIED', 1720, prog(t, tt + .3, tt + .6), { size: 56, accent: GOLD }); },
  sfx(d, P, E) { const tt = E('ten', 1, 1.9); return [[0, 'heartbeat', .35, { dur: d }], [tt - .6, 'riser', .25, { dur: .8 }], [tt + .2, 'chime', .45]]; }
};
SC.theyKnew = {
  draw(t, d) { bg('#04060b', '#0b1018'); streetLamp(700, 1500, 640); ctx.fillStyle = '#0a0d14'; ctx.fillRect(0, 1500, W, H);
    ctx.save(); ctx.globalAlpha = eio(prog(t, .2, 1.4)); person(760, 1500, 480, { silhouette: true, color: '#020308', rim: 'rgba(255,200,140,.7)' }); ctx.restore(); rain(t, .2, 90);
    handWrite('"Sorry."', 300, 600, 130, 1, 'rgba(196,35,47,.6)', { rot: -.1 }); caption('IT WAS NEVER\nA RANDOM NUMBER', 1680, prog(t, .4, .8), { size: 60, accent: INK }); },
  sfx(d) { return [[0, 'drone', .3, { dur: d }], [.2, 'heartbeat', .3, { dur: d - .2 }]]; }
};
SC.lastNote = {
  draw(t, d, P, E) { const t1 = E('this', 1, 1.6), t2 = E('hate', 1, 3), te = E('estate', 1, d - 1); bg('#17120d', '#070504'); glow(540, 900, 900, 'rgba(255,210,150,.25)'); dust(t, 3, 60, .5);
    ctx.save(); cam(540, 950, lerp(1.0, 1.08, prog(t, 0, te)));
    ctx.fillStyle = '#d9cdb4'; ctx.save(); ctx.translate(540, 1250); ctx.rotate(-.05); rr(-380, -120, 760, 400, 10); ctx.fill(); ctx.fillStyle = '#cbbd9f'; ctx.beginPath(); ctx.moveTo(-380, -120); ctx.lineTo(0, 120); ctx.lineTo(380, -120); ctx.fill(); ctx.restore();
    letterCard(540, lerp(1250, 860, eout(prog(t, .1, .9))), 820, .03, ['This is the last one.', "Please don't hate me."], prog(t, t1 - .1, t2 + .4), { size: 74 });
    ctx.restore(); if (t > te - .3) { const k = eout(prog(t, te - .3, te + .4)); legalDoc(540, lerp(2600, 1100, k), 760, -.03, { redact: 1 }); }
    caption('THE LAST TRANSFER\nCAME WITH A NOTE', 240, prog(t, .1, .5), { size: 58 }); },
  sfx(d, P, E) { return [[0, 'paper', .45], [E('this', 1, 1.6), 'pen', .35], [E('estate', 1, d - 1) - .3, 'swoosh', .35]]; }
};
SC.estate = {
  draw(t, d, P, E) { const tl = E('everything', 1, 1.6); bg('#16130f', '#060504'); glow(540, 1000, 900, 'rgba(255,220,170,.22)');
    ctx.save(); cam(540, lerp(1000, 1450, eio(prog(t, tl - .6, d))), lerp(1.0, 1.35, eio(prog(t, tl - .6, d)))); legalDoc(540, 1100, 760, -.03, { redact: 1, mark: prog(t, tl, tl + .8) }); ctx.restore();
    caption('SOMEONE DIED…', 230, prog(t, .1, .5), { size: 62 }); if (t > tl + .4) caption('…AND LEFT HER\nEVERYTHING', 1740, prog(t, tl + .4, tl + .7), { size: 58, accent: GOLD }); },
  sfx(d, P, E) { return [[0, 'page', .4], [E('everything', 1, 1.6), 'marker', .45]]; }
};
SC.nameReveal = {
  draw(t, d, P, E) { const tr = E('raymond', 1, 1.8), tu = E('uncle', 1, 3.1), tb = E('best', 1, 4.2); bg('#14110d', '#050403');
    if (t < tu - .15) { glow(540, 800, 900, 'rgba(255,220,170,.2)'); ctx.save(); cam(540, 700, lerp(1.25, 1.45, prog(t, 0, tu))); legalDoc(540, 1100, 760, -.03, { redact: 1 - eio(prog(t, tr - .3, tr + .3)) }); ctx.restore();
      if (t > tr) caption('RAYMOND COLE', 1650, prog(t, tr, tr + .3), { size: 72, accent: INK }); return; }
    glow(540, 900, 900, 'rgba(255,220,170,.25)'); dust(t, 6, 50, .4);
    const k = eout(prog(t, tu - .15, tu + .5)); polaroid(540, lerp(1500, 960, k), 860, lerp(.12, -.04, k), () => { backyard(t); person(380, 1900, 1500, DAD({ mouth: .5 })); person(720, 1900, 1520, RAY({ hair: '#3a2a20', top: '#6a5240', light: -1 })); }, 'Mike & Ray · 2001');
    if (t > tb - .2) { label('DAD', 340, 520, 46, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.8)', alpha: prog(t, tb - .2, tb + .1) }); label('UNCLE RAY', 760, 520, 46, { weight: 900, color: GOLD, shadow: 'rgba(0,0,0,.8)', alpha: prog(t, tb - .2, tb + .1) }); caption("DAD'S BEST FRIEND", 1700, prog(t, tb, tb + .3), { size: 60, accent: GOLD }); } },
  sfx(d, P, E) { const tr = E('raymond', 1, 1.8); return [[tr - .3, 'swoosh', .3], [tr, 'boom', .35], [E('uncle', 1, 3.1) - .15, 'shutter', .4]]; }
};
SC.birthdayCollege = {
  draw(t, d, P, E) { const tc = E('college', 1, 1.9);
    if (t < tc - .25) { bg('#2a1d18', '#0c0807'); glow(540, 1200, 900, 'rgba(255,180,100,.35)'); ctx.save(); cam(540, 1050, 1 + t * .03);
      person(720, 2300, 1700, RAY({ light: -1, rim: 'rgba(255,190,120,.6)' })); person(330, 2200, 1150, KID()); kitchenTable(1500); cake(560, 1520, 1.1, t, 9); ctx.restore();
      const yr = 2004 + Math.floor(prog(t, .2, tc - .3) * 17); counterBox('BIRTHDAYS MISSED', '0', 540, 300, prog(t, .2, .5), { size: 70, accent: GOLD }); label(String(yr), 540, 470, 40, { color: 'rgba(255,255,255,.6)', weight: 800 }); return; }
    bg('#1d2433', '#0a0d14'); glow(540, 900, 900, 'rgba(140,180,255,.2)'); const k = eout(prog(t, tc - .25, tc + .3));
    paperDoc(540, lerp(1500, 980, k), 680, -.03, 'TUITION', {}); label('STATE UNIVERSITY', 540, lerp(1500, 980, k) - 210, 34, { color: '#333', weight: 900 });
    label('PAYER: R. COLE', 540, lerp(1500, 980, k) + 60, 40, { color: '#1d2330', weight: 900 }); stamp('PAID IN FULL', 560, 1150, prog(t, tc + .3, tc + .6), { color: MONEY }); },
  sfx(d, P, E) { const tc = E('college', 1, 1.9); return [[0, 'pad_swell', .2, { dur: d }], [.2, 'pop', .3], [tc - .25, 'paper', .4], [tc + .3, 'stamp', .4]]; }
};
SC.noCar = { // Uncle Ray walks through the snow to the bus stop (profile walk), the bus pulls in
  draw(t, d, P, E) { const tcar = E('car', 1, 1.3), to = E('once', 1, 2.4), ts = E('snow', 1, 4.2), tb = E('bus', 1, d - .8);
    bg('#9aa6b4', '#e6eaee'); ctx.fillStyle = '#b9c3cc'; for (let i = 0; i < 5; i++) house(-100 + i * 260, 1180, 240, 260, { body: '#8d98a4', roof: '#e9eef2' });
    ctx.fillStyle = '#f4f6f8'; ctx.fillRect(0, 1180, W, H); ctx.fillStyle = '#d6dce2'; ctx.fillRect(0, 1380, W, 120);
    busStop(860, 1400); const h = 720, stride = .64 * h, x = lerp(-60, 640, eout(prog(t, 0, tb + .3)));
    person(x, 1400, h, RAY({ walk: (x / stride) * Math.PI * 2 + .01, top: '#4a3b2e' })); snow(t, .9, 160);
    if (t > tb - 1.2) { const k = eout(prog(t, tb - 1.2, tb + .3)); bus(lerp(1900, 1000, k), 1480, .62); }
    if (t > tcar - .1 && t < to) { carKeyX(540, 380, prog(t, tcar - .1, tcar + .3)); label('NEVER DROVE AGAIN', 540, 600, 50, { weight: 900, color: '#1a1d22', alpha: prog(t, tcar, tcar + .3) }); }
    if (t > to) counterBox('DAYS WITHOUT DRIVING', Math.floor(lerp(0, 8045, eout(prog(t, to, to + 1.6)))).toLocaleString('en-US'), 540, 330, prog(t, to, to + .3), { size: 66, accent: '#1f6fb2' }); },
  sfx(d, P, E) { const tb = E('bus', 1, d - .8); return [[0, 'wind', .35, { dur: d }], [.1, 'steps', .25, { dur: tb }], [E('car', 1, 1.3), 'pop', .3], [E('once', 1, 2.4), 'ticks', .2, { dur: 1.5 }], [tb - 1.2, 'swoosh', .25], [tb + .3, 'bus', .4]]; }
};
SC.momKnew = {
  draw(t, d, P, E) { const tsd = E('said', 1, 1.5), tk = E('know', 1, 2.3), tw = E('twenty', 1, 3.8); kitchen(t);
    if (t < tsd - .1) { ctx.save(); cam(540, 1100, 1.0); person(720, 1700, 900, MOM({ light: -1 })); const h = 900, x = lerp(-120, 330, eout(prog(t, 0, tsd))); person(x, 1720, 920, NARR({ walk: (x / (.64 * h)) * Math.PI * 2 + .01 })); kitchenTable(1560);
      letterCard(560, 1640, 240, .1, [''], 0, {}); ctx.restore(); return; }
    ctx.save(); cam(540, lerp(760, 720, prog(t, tsd, d)), lerp(1.0, 1.1, prog(t, tsd, d))); person(540, 4100, 3600, MOM({ light: -1, rim: 'rgba(255,200,140,.5)' })); ctx.restore(); vignetteWarm(.15);
    caption('SHE KNEW.', 1560, prog(t, tk, tk + .3), { size: 76, accent: INK }); if (t > tw) caption('FOR 20 YEARS', 1740, prog(t, tw, tw + .3), { size: 58 }); },
  sfx(d, P, E) { return [[0, 'clock', .3, { dur: d }], [.1, 'steps', .25, { dur: 1.3 }], [E('know', 1, 2.3), 'boom', .3], [E('twenty', 1, 3.8), 'heartbeat', .3, { dur: 2 }]]; }
};
SC.whyNot = {
  draw(t, d) { bg('#120d0b', '#050403'); glow(300, 700, 900, 'rgba(255,190,120,.3)'); ctx.save(); cam(540, 760, 1.0 + t * .03); person(540, 4100, 3600, NARR({ light: 1, rim: 'rgba(255,200,140,.4)' })); ctx.restore();
    caption('WHY PROTECT HIM?', 1640, prog(t, .3, .6), { size: 66 }); },
  sfx(d) { return [[0, 'drone', .2, { dur: d }]]; }
};
SC.dadPhoto = {
  draw(t, d, P, E) { const tn = E('needed', 1, 2.2), to = E('only', 1, 3.6), tsh = E('showed', 1, 4.4); bg('#1d1510', '#070504'); glow(540, 900, 1000, 'rgba(255,190,120,.3)'); dust(t, 8, 50, .45);
    if (t < tn - .3) { ctx.save(); cam(540, 900, 1 + t * .03); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(0, 1350, W, 60);
      ctx.fillStyle = '#2a1f17'; rr(250, 520, 580, 760, 16); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(290, 560, 500, 680); ctx.clip(); ctx.translate(290, 560); ctx.scale(500 / W, 500 / W); backyard(0); person(540, 3000, 2600, DAD({ mouth: .5 })); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,220,170,.6)'; ctx.fillRect(290, 560, 500, 680); ctx.restore(); ctx.restore(); return; }
    const pics = [[tn - .3, 300, .14, () => { bg('#2a1d18', '#0c0807'); glow(540, 1200, 900, 'rgba(255,180,100,.4)'); person(720, 2300, 1700, RAY()); person(330, 2200, 1150, KID()); cake(560, 1600, 1.2, t, 7); }, 'Birthday · 2009'],
      [to - .2, 760, -.1, () => { backyard(t); person(400, 1900, 1500, RAY()); person(700, 1900, 1150, KID({ top: '#2e6db0' })); }, 'First bike · 2010'],
      [tsh - .2, 540, .03, () => { bg('#7fa7d6', '#e3edf6'); person(360, 2000, 1500, RAY()); person(700, 2000, 1550, NARR({ top: '#1a1d26' })); ctx.fillStyle = '#111'; ctx.fillRect(570, 620, 260, 30); ctx.fillRect(640, 590, 120, 40); }, 'Graduation · 2021']];
    pics.forEach(([ta, x, r, paint, cap], i) => { const k = eout(prog(t, ta, ta + .6)); if (k <= 0) return; polaroid(x, lerp(2400, 800 + i * 330, k), 520, r, paint, cap); });
    if (t > tsh) caption('THE ONLY ONE\nWHO SHOWED UP', 1720, prog(t, tsh, tsh + .4), { size: 60, accent: GOLD }); },
  sfx(d, P, E) { return [[0, 'pad_swell', .3, { dur: d }], [E('needed', 1, 2.2) - .3, 'shutter', .3], [E('only', 1, 3.6) - .2, 'shutter', .3], [E('showed', 1, 4.4) - .2, 'shutter', .3]]; }
};
SC.untouched = {
  draw(t, d) { kitchen(t); ctx.save(); cam(540, 1500, 1.25); kitchenTable(1450); folder(420, 1640, 460, -.05, 'EVIDENCE', 1);
    phoneUI(780, 1560, 300, t, { bal: '$1,267,432.00', rows: ROWS.slice(0, 4), rot: .08 }); ctx.restore(); stamp('NEVER TOUCHED', 540, 760, prog(t, .3, .6), { color: INK }); },
  sfx(d) { return [[.3, 'stamp', .35]]; }
};
SC.finalQ = {
  draw(t, d) { bg('#0b0a10', '#020204'); glow(540, 900, 900, 'rgba(255,200,120,.2)'); ctx.save(); ctx.globalAlpha = .35; person(540, 2600, 2000, RAY({ silhouette: true, color: '#020306', rim: 'rgba(255,200,140,.6)' })); ctx.restore();
    caption('WOULD YOU HAVE\nFORGIVEN HIM?', 520, prog(t, .1, .5), { size: 72, accent: GOLD });
    pill('YES', 330, 1300, 64, prog(t, .7, 1.0), MONEY, '#fff'); pill('NEVER', 750, 1300, 64, prog(t, .9, 1.2), INK, '#fff');
    label('TELL ME IN THE COMMENTS ↓', 540, 1560, 44, { weight: 900, color: 'rgba(255,255,255,.85)', alpha: prog(t, 1.4, 1.8) }); },
  sfx(d) { return [[0, 'pad_swell', .3, { dur: d }], [.7, 'pop', .3], [.9, 'pop', .3]]; }
};
// glitch-free soft transitions for this calm story (flash only on the key reveals)
const _baseRenderRay = window.render;
window.render = function (t) { _baseRenderRay(t); let i = SHOTS.findIndex(s => t < s.end); if (i < 0) i = SHOTS.length - 1; const s = SHOTS[i], lt = t - s.start;
  if (s.p.glitchIn && lt < .22) glitch(1 - lt / .22, Math.floor(t * 30)); };
