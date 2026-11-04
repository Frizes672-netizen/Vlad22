// ===== RU Short: "РАЗВОД ИЛИ НЕТ? — Выпуск 1: звонок из «банка»" =====
const GAL = (o = {}) => Object.assign({ fem: true, age: 1, hairStyle: 'short', hair: '#bfb7ad', brow: '#8e8279', glasses: '#8a6a45', uniform: 'cardigan', top: '#7b4e63', blouse: '#efe6d6', pants: '#3a3340', skin: '#eabfa7', shoe: '#3a2d28', eyes: '#6f8499', light: -1 }, o);
const AGENT = (o = {}) => Object.assign({ uniform: 'office', top: '#f3f5f8', tie: '#1f3b70', pants: '#23262e', hair: '#2b1d14', headset: true, skin: '#e6b99c', shoe: '#111', light: 1, eyes: '#5b6b62' }, o);
const BLU = '#1f6fe0', SRED = '#e3262f', GRN = '#22b357', YEL = '#ffd23f';
const GCU = [560, 3120, 2500], GMS = [540, 2330, 1600], ACU = [560, 2560, 1950]; // Galina close-up / medium, the "agent" close-up: [x, feet y, height]
const headOf = (P, k = 0) => [P[0], P[1] - (93.2 + k) * P[2] / 100];

// who is speaking right now (mouth flaps on the words of this shot)
function talking(t, s, from = 0, to = 1e9) { for (const [w, tt] of s.words) if (tt >= from && tt <= to && t >= tt - .04 && t <= tt + .3) return .2 + .5 * Math.abs(Math.sin(t * 17)); return 0; }
function callTime(gt) { const z = Math.max(0, gt - TL.units[3].start + 2); return String(Math.floor(z / 60)).padStart(2, '0') + ':' + String(Math.floor(z % 60)).padStart(2, '0'); }
function callHud(gt, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(10,14,22,.72)'; rr(290, 92, 500, 64, 32); ctx.fill(); ctx.fillStyle = `rgba(52,199,89,${.6 + .4 * Math.sin(gt * 6)})`; ctx.beginPath(); ctx.arc(330, 124, 11, 0, 7); ctx.fill();
  label('Служба безопасности', 352, 134, 28, { align: 'left', weight: 800 }); label(callTime(gt), 760, 134, 28, { align: 'right', weight: 800, color: '#9fe3b0', font: MONO }); ctx.restore(); }
function grade(col, a, mode = 'multiply') { ctx.save(); ctx.globalCompositeOperation = mode; ctx.fillStyle = col; ctx.globalAlpha = a; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function vign(a = .5) { ctx.fillStyle = rgrad(W / 2, H * .45, H * .25, H * .7, [[0, 'rgba(0,0,0,0)'], [1, `rgba(0,0,0,${a})`]]); ctx.fillRect(0, 0, W, H); }

// ---------- environments ----------
function kitchenBgDraw() { // a Russian flat kitchen in the morning: floral wallpaper, tiles, tulle, violets on the sill, calendar, jars
  ctx.fillStyle = grad(0, 0, 0, 1100, [[0, '#f1e3c7'], [1, '#e3d0ae']]); ctx.fillRect(0, 0, W, 1120);
  ctx.fillStyle = 'rgba(170,110,70,.2)'; for (let y = 30; y < 1100; y += 70) for (let x = (Math.round(y / 70) % 2) * 35; x < W; x += 70) { ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); for (let k = 0; k < 4; k++) { const a = k * 1.57 + .4; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 11, y + Math.sin(a) * 11, 6, 3, a, 0, 7); ctx.fill(); } }
  ctx.fillStyle = '#f2f1ec'; ctx.fillRect(0, 1110, W, 810); ctx.strokeStyle = 'rgba(140,150,155,.55)'; ctx.lineWidth = 3; for (let x = 0; x <= W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 1110); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 1110; y <= H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(50,100,165,.55)'; rr(110 + i * 180, 1200 + (i % 2) * 90, 70, 70, 6); ctx.fill(); }
  const wx = 110, wy = 170, ww = 560, wh = 820, R = rnd(31);
  ctx.fillStyle = grad(0, wy, 0, wy + wh, [[0, '#cfe6f7'], [.55, '#eef5f8'], [1, '#f6f1e2']]); ctx.fillRect(wx, wy, ww, wh);
  ctx.fillStyle = '#d6cfc2'; ctx.fillRect(wx, wy + 470, ww, 350); ctx.fillStyle = 'rgba(90,110,130,.55)'; for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) ctx.fillRect(wx + 22 + c * 78, wy + 495 + r * 66, 44, 38); // the block of flats across the yard
  ctx.fillStyle = '#6b5040'; ctx.fillRect(wx + 300, wy + 330, 26, 500);
  for (let i = 0; i < 40; i++) { const x = wx + R() * ww, y = wy + 80 + R() * 430, r = 36 + R() * 70; ctx.fillStyle = ['#e7ad3a', '#d9822b', '#cfae4c', '#bb7a2c'][i % 4]; ctx.globalAlpha = .78; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } ctx.globalAlpha = 1; // autumn birch outside
  ctx.fillStyle = '#fbfbf6'; ctx.fillRect(wx - 24, wy - 24, ww + 48, 26); ctx.fillRect(wx - 24, wy + wh, ww + 48, 40); ctx.fillRect(wx - 24, wy - 24, 26, wh + 60); ctx.fillRect(wx + ww - 2, wy - 24, 26, wh + 60); ctx.fillRect(wx + ww / 2 - 12, wy, 24, wh); ctx.fillRect(wx, wy + 290, ww, 22);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(wx - 50, wy + wh + 20, ww + 100, 40); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(wx - 50, wy + wh + 60, ww + 100, 18);
  for (const px of [wx + 70, wx + 230, wx + 450]) { ctx.fillStyle = '#b5562f'; ctx.beginPath(); ctx.moveTo(px - 46, wy + wh + 20); ctx.lineTo(px + 46, wy + wh + 20); ctx.lineTo(px + 36, wy + wh - 62); ctx.lineTo(px - 36, wy + wh - 62); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3f7a3a'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(px + (k - 3) * 16, wy + wh - 82 + Math.abs(k - 3) * 4, 26, 16, (k - 3) * .4, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#9b59c9'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(px + (k - 2.5) * 15, wy + wh - 114 + (k % 2) * 10, 10, 0, 7); ctx.fill(); } } // violets
  ctx.save(); ctx.globalAlpha = .5; for (let i = 0; i < 15; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.9)' : 'rgba(240,240,232,.6)'; ctx.fillRect(wx - 34 + i * 44, wy - 34, 30, wh + 24); } ctx.restore(); // tulle
  ctx.fillStyle = 'rgba(255,255,255,.75)'; for (let x = wx - 34; x < wx + ww + 34; x += 30) { ctx.beginPath(); ctx.arc(x + 15, wy + wh - 12, 15, 0, Math.PI); ctx.fill(); }
  for (const x0 of [wx - 100, wx + ww + 10]) { ctx.fillStyle = grad(x0, 0, x0 + 90, 0, [[0, '#8a5a2b'], [.5, '#b47e3c'], [1, '#7a4c22']]); ctx.fillRect(x0, wy - 60, 90, wh + 120); ctx.fillStyle = 'rgba(255,230,180,.28)'; for (let y = wy; y < wy + wh; y += 80) { ctx.beginPath(); ctx.arc(x0 + 45, y, 14, 0, 7); ctx.fill(); } }
  ctx.fillStyle = '#5a4030'; ctx.fillRect(wx - 120, wy - 72, ww + 240, 14);
  ctx.fillStyle = '#fff'; ctx.fillRect(770, 560, 230, 310); ctx.fillStyle = '#4c7fb0'; ctx.fillRect(785, 580, 200, 120); ctx.fillStyle = '#e6c25a'; ctx.beginPath(); ctx.arc(885, 650, 30, 0, 7); ctx.fill(); ctx.fillStyle = '#c0392b'; ctx.fillRect(770, 560, 230, 20); // wall calendar
  ctx.fillStyle = 'rgba(60,60,60,.5)'; for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) ctx.fillRect(790 + c * 28, 725 + r * 26, 14, 10);
  ctx.fillStyle = '#f7f3ea'; ctx.beginPath(); ctx.arc(880, 330, 90, 0, 7); ctx.fill(); ctx.strokeStyle = '#7a5a3c'; ctx.lineWidth = 12; ctx.stroke(); ctx.strokeStyle = '#222'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(880, 330); ctx.lineTo(880, 270); ctx.moveTo(880, 330); ctx.lineTo(920, 345); ctx.stroke(); // clock
  ctx.fillStyle = '#7a5a3c'; ctx.fillRect(700, 1010, 380, 20); for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(200,220,230,.7)'; rr(720 + i * 85, 910, 60, 100, 10); ctx.fill(); ctx.fillStyle = ['#c0392b', '#e2a33a', '#7a3a1c', '#5a8a3a'][i]; rr(726 + i * 85, 940, 48, 66, 8); ctx.fill(); ctx.fillStyle = '#d8d0c0'; rr(718 + i * 85, 900, 64, 18, 4); ctx.fill(); } // jars of jam
  glow(390, 560, 900, 'rgba(255,248,225,.55)'); }
function kitchen(t) { ctx.drawImage(layer('kitchen', kitchenBgDraw, 5), 0, 0); godRays(390, 250, .06); dust(t, 5, 22, .3); }
function teaCupRU(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(10, 40, 170, 36, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(-160, 0, 160, 0, [[0, '#d9d6cf'], [.5, '#ffffff'], [1, '#cfccc4']]); ctx.beginPath(); ctx.ellipse(0, 26, 160, 34, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#c9a33a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 24, 140, 28, 0, 0, 7); ctx.stroke(); // saucer
  ctx.fillStyle = grad(-95, 0, 95, 0, [[0, '#d7d3cb'], [.45, '#ffffff'], [1, '#c9c5bc']]); ctx.beginPath(); ctx.moveTo(-95, -110); ctx.bezierCurveTo(-95, -10, -70, 20, 0, 22); ctx.bezierCurveTo(70, 20, 95, -10, 95, -110); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#c0392b'; for (const [fx, fy] of [[-40, -60], [10, -40], [52, -70]]) { for (let k = 0; k < 5; k++) { const a = k * 1.256; ctx.beginPath(); ctx.ellipse(fx + Math.cos(a) * 9, fy + Math.sin(a) * 9, 8, 5, a, 0, 7); ctx.fill(); } } // red flowers
  ctx.strokeStyle = '#e9e5dd'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(108, -60, 30, -1.3, 1.3); ctx.stroke();
  ctx.fillStyle = '#7a3a12'; ctx.beginPath(); ctx.ellipse(0, -110, 92, 18, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#c9a33a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, -110, 95, 20, 0, 0, 7); ctx.stroke();
  for (let i = 0; i < 3; i++) { const k = (t * .35 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.35 * (1 - k)})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-30 + i * 30, -130 - k * 120); ctx.bezierCurveTo(-60 + i * 30, -170 - k * 120, 0 + i * 30, -200 - k * 120, -30 + i * 30, -250 - k * 120); ctx.stroke(); } ctx.restore(); }
function sushki(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(0, 30, 200, 44, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#f4f1ea'; ctx.beginPath(); ctx.ellipse(0, 20, 190, 42, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#2f5d9c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, 20, 170, 34, 0, 0, 7); ctx.stroke();
  const R = rnd(4); for (const [rx, ry] of [[-80, 0], [0, -14], [80, 2], [-40, -40], [40, -38]]) { ctx.lineWidth = 26; ctx.strokeStyle = grad(rx - 50, ry - 30, rx + 50, ry + 30, [[0, '#e0a560'], [.5, '#c47a2e'], [1, '#8a5020']]); ctx.beginPath(); ctx.ellipse(rx, ry, 44, 22, 0, 0, 7); ctx.stroke();
    ctx.fillStyle = '#2a201c'; for (let k = 0; k < 14; k++) { const a = R() * 6.28; ctx.fillRect(rx + Math.cos(a) * 44, ry + Math.sin(a) * 22, 3, 3); } } ctx.restore(); } // сушки with poppy seeds
function kitchenTable(y, t) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, y - 16, W, 20); ctx.fillStyle = '#f6f1e6'; ctx.fillRect(0, y, W, H - y);
  const vx = 540, vy = y - 1100; let yy = y, hh = 34, ri = 0; while (yy < H) { const s0 = (yy - vy) / (y - vy), s1 = (yy + hh - vy) / (y - vy);
    for (let c = -16; c < 16; c++) { if ((c + ri) % 2) continue; ctx.fillStyle = 'rgba(200,52,52,.72)'; ctx.beginPath(); ctx.moveTo(vx + c * 70 * s0, yy); ctx.lineTo(vx + (c + 1) * 70 * s0, yy); ctx.lineTo(vx + (c + 1) * 70 * s1, yy + hh); ctx.lineTo(vx + c * 70 * s1, yy + hh); ctx.closePath(); ctx.fill(); }
    yy += hh; hh *= 1.16; ri++; } // red-and-white oilcloth
  ctx.fillStyle = grad(0, y, 0, y + 80, [[0, 'rgba(255,255,255,.35)'], [1, 'rgba(255,255,255,0)']]); ctx.fillRect(0, y, W, 80);
  sushki(230, y + 160, .9); teaCupRU(830, y + 170, 1.0, t); }
function galinaKitchen(t, P, o = {}) { kitchen(t); person(P[0], P[1], P[2], GAL(o)); if (o.table) kitchenTable(o.table, t); }
function camOn(pt, z) { cam(pt[0], pt[1], z); }

// ---------- the "office" (a printed banner) and the basement behind it ----------
const BAN = [-40, -60, 1160, 1547]; // banner rectangle in world coords (aspect 1080:1440)
function officeBannerDraw() { // modern bank security office, as printed on the banner (drawn in a 1080 × 1440 area)
  ctx.fillStyle = grad(0, 0, 0, 1440, [[0, '#e9eef5'], [1, '#cfd8e3']]); ctx.fillRect(0, 0, W, 1440);
  ctx.fillStyle = '#f7f9fc'; ctx.fillRect(0, 0, W, 140); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#ffffff'; rr(60 + i * 260, 40, 200, 40, 10); ctx.fill(); glow(160 + i * 260, 60, 220, 'rgba(255,255,255,.7)'); } // ceiling LED panels
  ctx.fillStyle = grad(0, 0, W, 0, [[0, '#0f3f8f'], [1, '#1f6fe0']]); ctx.fillRect(250, 180, 580, 520); shieldIcon(540, 360, 1.7, '#ffffff', true);
  label('СЛУЖБА', 540, 560, 64, { weight: 900, color: '#fff', spacing: 8 }); label('БЕЗОПАСНОСТИ', 540, 640, 56, { weight: 900, color: '#cfe0ff', spacing: 6 }); // the logo wall
  for (const gx of [0, 860]) { ctx.fillStyle = 'rgba(180,205,230,.55)'; ctx.fillRect(gx, 160, 220, 900); ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let y = 420; y < 520; y += 26) ctx.fillRect(gx, y, 220, 12); } // frosted glass partitions
  for (const [px, py] of [[110, 820], [970, 820]]) { person(px, py + 520, 600, { top: '#3b4a63', pants: '#2a2f3a', hair: '#3a2a20', light: 1, shadow: false }); } // colleagues in the background
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 1000, W, 70); ctx.fillStyle = '#d5dde7'; ctx.fillRect(0, 1070, W, 400); for (let i = 0; i < 5; i++) { ctx.fillStyle = '#1b2333'; rr(40 + i * 220, 900, 150, 100, 8); ctx.fill(); ctx.fillStyle = 'rgba(80,150,255,.5)'; rr(48 + i * 220, 908, 134, 84, 4); ctx.fill(); } // desks + monitors
  ctx.fillStyle = '#3f7a3a'; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.ellipse(950 + (k - 4) * 20, 820 - Math.abs(k - 4) * 18, 22, 60, (k - 4) * .25, 0, 7); ctx.fill(); } ctx.fillStyle = '#e9e9e9'; rr(905, 860, 90, 140, 12); ctx.fill(); // plant
}
function bannerImg() { return layer('office', officeBannerDraw, 4); }
function drawBanner(rev = 0) { const c = bannerImg(); ctx.drawImage(c, 0, 0, 1080, 1440, BAN[0], BAN[1], BAN[2], BAN[3]);
  if (rev > 0) { ctx.save(); ctx.globalAlpha = rev; ctx.fillStyle = grad(BAN[0], 0, BAN[0] + BAN[2], 0, [[0, 'rgba(0,0,0,.25)'], [.12, 'rgba(0,0,0,0)'], [.5, 'rgba(255,255,255,.04)'], [.88, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.28)']]); ctx.fillRect(BAN[0], BAN[1], BAN[2], BAN[3]); // sag shading
    ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 6; for (const [x0, y0, x1, y1] of [[-40, -60, 200, 300], [1120, -60, 900, 340], [-40, 1487, 220, 1100], [1120, 1487, 880, 1080]]) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2 + 30, (y0 + y1) / 2, x1, y1); ctx.stroke(); } // tension wrinkles from the corners
    for (const [gx, gy] of [[-10, -30], [1090, -30], [-10, 1457], [1090, 1457], [540, -30]]) { ctx.fillStyle = '#9aa0a8'; ctx.beginPath(); ctx.arc(gx, gy, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#2a2d31'; ctx.beginPath(); ctx.arc(gx, gy, 8, 0, 7); ctx.fill(); } // grommets
    ctx.fillStyle = 'rgba(210,200,170,.85)'; for (const [tx, ty, tr] of [[-30, 600, .3], [1110, 700, -.4], [300, -55, .1]]) { ctx.save(); ctx.translate(tx, ty); ctx.rotate(tr); ctx.fillRect(-60, -18, 120, 36); ctx.restore(); } ctx.restore(); } } // packing tape
const BS = .38, BX0 = -900, BY0 = -1500; // basement layer: world (-900,-1500) drawn at scale .38
function basementDraw() { ctx.scale(BS, BS); ctx.translate(-BX0, -BY0); const R = rnd(77);
  ctx.fillStyle = '#4f544c'; ctx.fillRect(-900, -1500, 3000, 3400); for (let r = 0; r < 34; r++) for (let c = 0; c < 15; c++) { const bx = -900 + c * 200 + (r % 2) * 100, by = -1500 + r * 100; ctx.fillStyle = `rgba(${R() > .5 ? '255,255,240' : '0,0,0'},${.03 + R() * .06})`; ctx.fillRect(bx + 4, by + 4, 192, 92); }
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 6; for (let r = 0; r < 34; r++) { ctx.beginPath(); ctx.moveTo(-900, -1500 + r * 100); ctx.lineTo(2100, -1500 + r * 100); ctx.stroke(); } // cinder blocks
  for (let i = 0; i < 9; i++) { const x = -800 + R() * 2800, y = -1300 + R() * 2800; ctx.fillStyle = rgrad(x, y, 0, 200 + R() * 200, [[0, 'rgba(40,35,20,.35)'], [1, 'rgba(40,35,20,0)']]); ctx.fillRect(x - 400, y - 400, 800, 800); } // damp stains
  ctx.strokeStyle = 'rgba(20,20,20,.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1300, 1600); ctx.lineTo(1340, 1400); ctx.lineTo(1310, 1250); ctx.lineTo(1380, 1080); ctx.stroke(); // crack
  for (const [py, pr, col] of [[-1260, 46, '#6b5a48'], [-1150, 30, '#7b7f86']]) { ctx.fillStyle = grad(0, py - pr, 0, py + pr, [[0, shade(col, 1.3)], [.5, col], [1, shade(col, .6)]]); ctx.fillRect(-900, py - pr, 3000, pr * 2); for (let x = -700; x < 2100; x += 520) { ctx.fillStyle = shade(col, .7); ctx.fillRect(x, py - pr - 8, 36, pr * 2 + 16); } } // pipes
  ctx.fillStyle = '#f4f4ef'; ctx.fillRect(1250, -760, 680, 520); ctx.strokeStyle = '#8a8f96'; ctx.lineWidth = 14; ctx.strokeRect(1250, -760, 680, 520); // whiteboard with the call script
  label('СКРИПТ «СБ БАНКА»', 1590, -690, 46, { weight: 900, color: '#c0392b' });
  ['1. Назвать ФИО и карту', '2. «Операцию остановил»', '3. «Код никому — даже мне»', '4. «В банк не ходите»', '5. Передать «следователю»'].forEach((s, i) => label(s, 1280, -610 + i * 74, 40, { align: 'left', weight: 800, color: '#1d2a5c', font: HAND }));
  ctx.fillStyle = '#3a3226'; ctx.fillRect(-860, -400, 520, 26); ctx.fillRect(-860, 0, 520, 26); for (let i = 0; i < 5; i++) { ctx.fillStyle = ['#a8875a', '#8f7650', '#b89a6a'][i % 3]; ctx.fillRect(-840 + i * 100, -520, 86, 120); ctx.fillRect(-840 + i * 100, -120, 86, 120); } // shelves of boxes
  ctx.fillStyle = '#c94a3a'; ctx.fillRect(-830, -500, 60, 40); label('SIM', -800, -470, 26, { weight: 900, color: '#fff' });
  ctx.fillStyle = '#2a2d31'; ctx.fillRect(-900, 2500, 3000, 1000); ctx.fillStyle = grad(0, 2500, 0, 3300, [[0, '#3d403c'], [1, '#22241f']]); ctx.fillRect(-900, 2500, 3000, 1000); // floor
  ctx.strokeStyle = '#111'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-300, 3100); ctx.bezierCurveTo(200, 2900, 600, 3200, 1100, 2950); ctx.bezierCurveTo(1400, 2800, 1700, 3000, 2000, 2900); ctx.stroke(); } // cables on the floor
function basement(t, z) { ctx.drawImage(layer('basement', basementDraw, 0), BX0, BY0, W / BS, H / BS);
  const sw = Math.sin(t * 1.3) * 18; ctx.strokeStyle = '#111'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(540, -1500); ctx.lineTo(540 + sw, -1060); ctx.stroke(); // bare bulb
  ctx.fillStyle = '#fff3c4'; ctx.beginPath(); ctx.ellipse(540 + sw, -1020, 34, 44, 0, 0, 7); ctx.fill(); glow(540 + sw, -1020, 900, 'rgba(255,214,140,.35)');
  person(-470, 2500, 1800, { top: '#2b2f36', pants: '#1d1f24', hair: '#1f1611', headset: true, light: 1, skin: '#d9a98c' }); // the second "operator" in a hoodie
  ctx.fillStyle = '#6b6f75'; ctx.fillRect(-900, 1380, 3000, 40); for (const lx of [-820, 1900]) { ctx.fillStyle = '#5a5e64'; ctx.fillRect(lx, 1420, 26, 1080); } // long folding table
  const R = rnd(9); for (let i = 0; i < 9; i++) { const px = -860 + i * 95; if (px > -150) break; ctx.fillStyle = '#111'; rr(px, 1300, 70, 120, 10); ctx.fill(); ctx.fillStyle = (Math.floor(t * 2 + i) % 3) ? '#1b2a44' : '#3fa9ff'; rr(px + 6, 1308, 58, 100, 6); ctx.fill(); } // a row of phones
  for (let i = 0; i < 12; i++) { const px = 1150 + i * 62; ctx.fillStyle = '#111'; rr(px, 1290, 50, 92, 8); ctx.fill(); ctx.fillStyle = (Math.floor(t * 3 + i * 1.7) % 4) ? '#14203a' : '#34c759'; rr(px + 5, 1296, 40, 78, 5); ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px + 25, 1382); ctx.quadraticCurveTo(px + 30, 1450, px + 10 + R() * 40, 1500); ctx.stroke(); }
  for (let i = 0; i < 40; i++) { ctx.fillStyle = ['#f2f2f2', '#e8b14a', '#d9d9d9'][i % 3]; ctx.save(); ctx.translate(1180 + R() * 600, 1360 + R() * 20); ctx.rotate(R() * 3); ctx.fillRect(-14, -10, 28, 20); ctx.restore(); } // a pile of SIM cards
  ctx.fillStyle = '#d32f2f'; rr(1620, 1260, 60, 120, 10); ctx.fill(); ctx.fillStyle = '#ffd23f'; ctx.fillRect(1620, 1300, 60, 20); // energy drink
  laptop(-30 - 560, 1380, 440, t, { mode: 'db', scroll: t * 60 }); }
function laptop(x, y, w, t, o = {}) { const h = w * .62; ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#1b1d22'; rr(-w / 2, -h - 20, w, h, 14); ctx.fill(); ctx.save(); rr(-w / 2 + 14, -h - 6, w - 28, h - 28, 6); ctx.clip(); ctx.translate(0, -h / 2 - 20); ctx.scale((w - 28) / 900, (h - 28) / 560);
  if (o.mode === 'spoof') spoofUI(900, 560, t, o); else dbUI(900, 560, t, o); ctx.restore(); glow(0, -h / 2, w, 'rgba(90,170,255,.18)');
  ctx.fillStyle = '#2b2e35'; ctx.beginPath(); ctx.moveTo(-w / 2 - 30, 0); ctx.lineTo(w / 2 + 30, 0); ctx.lineTo(w / 2, -22); ctx.lineTo(-w / 2, -22); ctx.closePath(); ctx.fill(); ctx.restore(); }
const DB_ROWS = (() => { const F = ['Иванова Н. С.', 'Смирнов В. А.', 'Кузнецова Л. И.', 'Попов А. Н.', 'Соколова Т. В.', 'Морозов Е. П.', 'Волкова Р. М.', 'Лебедев С. Ю.', 'Новикова З. Ф.', 'Фёдоров И. К.'], S = ['Ленина', 'Мира', 'Гагарина', 'Победы', 'Лесная', 'Школьная', 'Советская', 'Молодёжная'], R = rnd(5), out = [];
  for (let i = 0; i < 60; i++) out.push([F[i % F.length], `ул. ${S[Math.floor(R() * S.length)]}, ${1 + Math.floor(R() * 90)}`, '•••• ' + String(1000 + Math.floor(R() * 8999)), String(55 + Math.floor(R() * 30)) + ' л.']);
  out[22] = ['Козлова Г. П.', 'ул. Садовая, 12', '•••• 4417', '67 л.']; return out; })();
function dbUI(w, h, t, o = {}) { ctx.fillStyle = '#0d1117'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = '#1f6f3a'; ctx.fillRect(-w / 2, -h / 2, w, 46); label('baza_klientov_2025.xlsx — 1 248 330 строк', -w / 2 + 16, -h / 2 + 31, 22, { align: 'left', weight: 800, color: '#e8ffe8', font: MONO });
  const cols = [-w / 2 + 14, -w / 2 + 290, -w / 2 + 580, -w / 2 + 780], rh = 34, sc = o.scroll || 0; ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2 + 50, w, h - 50); ctx.clip();
  DB_ROWS.forEach((r, i) => { const yy = -h / 2 + 80 + i * rh - (sc % (rh * 30)); if (yy < -h / 2 + 40 || yy > h / 2 + 20) return; const hi = i === 22 && o.hi; if (hi) { ctx.fillStyle = 'rgba(255,210,63,.9)'; ctx.fillRect(-w / 2, yy - 24, w, rh); }
    r.forEach((v, k) => label(v, cols[k], yy, 21, { align: 'left', weight: 700, color: hi ? '#111' : (k === 2 ? '#7dff9e' : '#cfd8e6'), font: MONO })); }); ctx.restore(); }
function spoofUI(w, h, t, o = {}) { ctx.fillStyle = '#10141c'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = '#2a3242'; ctx.fillRect(-w / 2, -h / 2, w, 50); label('Звонок · отображаемый номер', -w / 2 + 20, -h / 2 + 34, 24, { align: 'left', weight: 800, color: '#dfe7f5' });
  const typ = (s, p) => s.slice(0, Math.floor(s.length * clamp(p))) + (p < 1 && Math.floor(t * 4) % 2 ? '|' : '');
  label('Номер на экране:', -w / 2 + 40, -h / 2 + 140, 28, { align: 'left', weight: 700, color: '#8a96aa' }); ctx.fillStyle = '#1b2230'; rr(-w / 2 + 40, -h / 2 + 160, w - 80, 70, 10); ctx.fill(); label(typ('8 800 •••-••-••', o.p1), -w / 2 + 64, -h / 2 + 208, 38, { align: 'left', weight: 800, color: '#fff', font: MONO });
  label('Имя:', -w / 2 + 40, -h / 2 + 290, 28, { align: 'left', weight: 700, color: '#8a96aa' }); ctx.fillStyle = '#1b2230'; rr(-w / 2 + 40, -h / 2 + 310, w - 80, 70, 10); ctx.fill(); label(typ('Служба безопасности', o.p2), -w / 2 + 64, -h / 2 + 358, 36, { align: 'left', weight: 800, color: '#fff' });
  ctx.fillStyle = o.p3 > 0 ? '#34c759' : '#2f7de1'; rr(-w / 2 + 40, h / 2 - 120, w - 80, 80, 40); ctx.fill(); label(o.p3 > 0 ? 'ВЫЗОВ…' : 'ПОЗВОНИТЬ', 0, h / 2 - 68, 34, { weight: 900, spacing: 4 }); }
function officeDesk() { ctx.fillStyle = grad(0, 1380, 0, 1440, [[0, '#ffffff'], [1, '#e2e6ec']]); ctx.fillRect(-20, 1380, W + 40, 60); ctx.fillStyle = grad(0, 1440, 0, 2500, [[0, '#d9dee6'], [1, '#aeb6c2']]); ctx.fillRect(-20, 1440, W + 40, 1060);
  ctx.fillStyle = '#2a2e36'; rr(300, 1352, 380, 34, 8); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.14)'; for (let i = 0; i < 14; i++) ctx.fillRect(312 + i * 26, 1358, 20, 8); // keyboard
  ctx.fillStyle = '#ffffff'; rr(800, 1290, 80, 96, 12); ctx.fill(); shieldIcon(840, 1336, .35, BLU, false); }
function agentMonitor(t, o = {}) { ctx.save(); ctx.translate(960, 1150); ctx.transform(.78, -.1, 0, 1, 0, 0); ctx.fillStyle = '#15171c'; rr(-230, -180, 460, 300, 14); ctx.fill(); ctx.save(); rr(-218, -168, 436, 276, 6); ctx.clip(); ctx.translate(0, -30); crmUI(436, 276, t, o); ctx.restore();
  ctx.fillStyle = '#15171c'; ctx.fillRect(-20, 120, 40, 90); ctx.restore(); }
function agentSet(t, s, o = {}) { // the "bank security officer" at his desk; everything behind him is the banner
  bg('#cfd8e3', '#aeb8c6'); drawBanner(0); person(ACU[0], ACU[1], ACU[2], AGENT({ mouth: o.mouth ?? talking(t, s), smile: o.smile ?? .35, tilt: o.tilt || 0, light: 1 })); officeDesk(); agentMonitor(t, o.crm || {}); }

// ---------- other places ----------
function bankFrontDraw() { ctx.fillStyle = grad(0, 0, 0, 700, [[0, '#9cc7ec'], [1, '#e6f1f8']]); ctx.fillRect(0, 0, W, 700); ctx.fillStyle = '#e8e1d4'; ctx.fillRect(0, 180, W, 1150);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { ctx.fillStyle = 'rgba(0,0,0,.05)'; ctx.fillRect(c * 180 + 4, 180 + r * 160 + 4, 172, 152); } // stone panels
  ctx.fillStyle = BLU; rr(200, 250, 680, 170, 20); ctx.fill(); shieldIcon(300, 335, .9, '#fff', true); label('БАНК', 600, 368, 96, { weight: 900, color: '#fff', spacing: 14 }); label('ОТДЕЛЕНИЕ', 600, 405, 26, { weight: 800, color: '#cfe0ff', spacing: 8 });
  for (const wx of [40, 820]) { ctx.fillStyle = grad(wx, 520, wx + 220, 1000, [[0, '#9fb8cf'], [.5, '#d9e6f0'], [1, '#7f97ad']]); ctx.fillRect(wx, 520, 220, 520); ctx.strokeStyle = '#59616b'; ctx.lineWidth = 10; ctx.strokeRect(wx, 520, 220, 520); }
  ctx.fillStyle = '#4a5058'; ctx.fillRect(300, 500, 480, 830); ctx.fillStyle = '#c9d6e2'; ctx.fillRect(310, 510, 460, 820); // door frame (the panels are drawn live)
  ctx.fillStyle = '#9aa3ab'; ctx.fillRect(0, 1330, W, 30); ctx.fillStyle = '#b9b2a6'; ctx.fillRect(0, 1360, W, 560); ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 3; for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 1360); ctx.lineTo(x - 120, H); ctx.stroke(); } for (let y = 1400; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } // sidewalk tiles
  ctx.fillStyle = '#3d4248'; rr(860, 1100, 160, 230, 10); ctx.fill(); ctx.fillStyle = '#5ab0ff'; rr(880, 1120, 120, 80, 6); ctx.fill(); // ATM
  for (const [tx, ty] of [[-40, 700], [1120, 650]]) for (let i = 0; i < 12; i++) { ctx.fillStyle = ['#e2a33a', '#d07a2a', '#c9a646'][i % 3]; ctx.globalAlpha = .85; ctx.beginPath(); ctx.arc(tx + Math.sin(i * 2.1) * 120, ty + Math.cos(i * 1.3) * 160, 80, 0, 7); ctx.fill(); } ctx.globalAlpha = 1; }
function bankFront(t, door = 0) { ctx.drawImage(layer('bankfront', bankFrontDraw, 2), 0, 0); const k = eio(clamp(door));
  ctx.save(); ctx.beginPath(); ctx.rect(310, 510, 460, 820); ctx.clip(); ctx.fillStyle = grad(0, 510, 0, 1330, [[0, '#fff6e0'], [1, '#f1dfba']]); ctx.fillRect(310, 510, 460, 820); glow(540, 900, 500, `rgba(255,236,190,${.6 * k})`); // warm lit hall behind the doors
  for (const sd of [-1, 1]) { const px = 540 + sd * (115 + 230 * k) - 115; ctx.fillStyle = 'rgba(160,190,215,.55)'; ctx.fillRect(px, 510, 230, 820); ctx.strokeStyle = '#59616b'; ctx.lineWidth = 8; ctx.strokeRect(px, 510, 230, 820); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(px + 20, 520); ctx.lineTo(px + 80, 520); ctx.lineTo(px + 20, 760); ctx.closePath(); ctx.fill(); } ctx.restore();
  label('ПН–ПТ 9:00–19:00', 540, 488, 26, { weight: 800, color: '#2a3340' }); }
function bankAfterHours(t) { bg('#1a0d12', '#07040a'); ctx.drawImage(layer('bankin', () => { bg('#2a1820', '#0d0709'); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#3a2a30'; ctx.fillRect(40 + i * 270, 980, 220, 30); ctx.fillStyle = '#1a1216'; rr(70 + i * 270, 860, 160, 110, 8); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,80,90,.25)'; ctx.fillRect(0, 300, W, 40); label('КАССА', 540, 250, 60, { weight: 900, color: 'rgba(255,200,200,.35)', spacing: 12 }); }, 6), 0, 0);
  ctx.fillStyle = '#16181d'; rr(560, 820, 380, 250, 12); ctx.fill(); ctx.fillStyle = '#ff3b4a'; rr(574, 834, 352, 222, 6); ctx.fill(); for (let i = 0; i < 7; i++) { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(590, 856 + i * 28, 140 + (i * 53) % 160, 10); } glow(750, 940, 520, 'rgba(255,50,60,.45)'); // monitor with a client list
  person(400, 2350, 1700, { color: '#0b0507', silhouette: true, rim: '#ff3b4a', light: 1 }); ctx.fillStyle = '#0b0507'; ctx.fillRect(0, 1180, W, H); ctx.fillStyle = 'rgba(255,60,70,.15)'; ctx.fillRect(0, 1180, W, 8);
  ctx.fillStyle = '#f2efe6'; ctx.save(); ctx.translate(640, 1150); ctx.rotate(-.12); rr(-110, -70, 220, 140, 6); ctx.fill(); label('ДАННЫЕ КЛИЕНТОВ', 0, 8, 22, { weight: 900, color: '#8a1c2a' }); ctx.restore(); } // a folder of data
function hallwayDraw() { ctx.fillStyle = grad(0, 0, W, 0, [[0, '#c9bf9a'], [1, '#b8ad86']]); ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(90,110,70,.25)'; for (let x = 0; x < W; x += 60) ctx.fillRect(x, 0, 22, 1500); // striped wallpaper
  ctx.fillStyle = '#6b4a32'; ctx.fillRect(0, 1500, W, 420); ctx.fillStyle = '#8a5a3a'; ctx.fillRect(0, 1490, W, 20); // floor + skirting
  ctx.fillStyle = '#3a2a1e'; ctx.fillRect(270, 160, 540, 1350); // door frame
  ctx.fillStyle = grad(300, 0, 780, 0, [[0, '#4a2e1f'], [.5, '#6a4430'], [1, '#432a1c']]); ctx.fillRect(300, 190, 480, 1320); // padded leatherette door
  ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 3; for (let k = -10; k < 20; k++) { ctx.beginPath(); ctx.moveTo(300 + k * 80, 190); ctx.lineTo(300 + k * 80 + 1320 * .6, 1510); ctx.stroke(); ctx.beginPath(); ctx.moveTo(780 - k * 80, 190); ctx.lineTo(780 - k * 80 - 1320 * .6, 1510); ctx.stroke(); }
  ctx.fillStyle = '#d4af37'; for (let r = 0; r < 18; r++) for (let c = 0; c < 8; c++) { const x = 300 + c * 80 + (r % 2) * 40, y = 190 + r * 66 + 33; if (x < 310 || x > 770) continue; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); } // brass studs
  ctx.fillStyle = '#c9a33a'; ctx.beginPath(); ctx.arc(540, 560, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(540, 560, 8, 0, 7); ctx.fill(); // peephole
  ctx.fillStyle = '#b8b8b8'; rr(700, 820, 50, 140, 10); ctx.fill(); ctx.fillStyle = '#d9d9d9'; rr(660, 880, 90, 22, 10); ctx.fill(); // handle
  ctx.fillStyle = '#5a3a28'; ctx.fillRect(40, 420, 200, 24); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#c9a33a'; ctx.beginPath(); ctx.arc(80 + i * 60, 450, 9, 0, 7); ctx.fill(); }
  ctx.fillStyle = grad(40, 450, 200, 450, [[0, '#3a2430'], [.5, '#5a3646'], [1, '#2e1c26']]); ctx.beginPath(); ctx.moveTo(70, 455); ctx.quadraticCurveTo(20, 800, 40, 1150); ctx.lineTo(210, 1150); ctx.quadraticCurveTo(230, 800, 150, 455); ctx.closePath(); ctx.fill(); // her coat
  ctx.fillStyle = '#8a3a3a'; ctx.beginPath(); ctx.ellipse(200, 430, 60, 34, 0, 0, 7); ctx.fill(); // knitted beret
  ctx.fillStyle = '#6b3f22'; rr(880, 1120, 170, 130, 18); ctx.fill(); ctx.strokeStyle = '#4a2a14'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(965, 1120, 55, Math.PI, 0); ctx.stroke(); ctx.fillStyle = '#c9a33a'; ctx.fillRect(950, 1150, 30, 14); // handbag on the shoe cabinet
  ctx.fillStyle = '#7a5a3c'; ctx.fillRect(850, 1250, 230, 260); }
function doorChain(p) { const x0 = 690, y0 = 700, k = eio(clamp(p)); ctx.fillStyle = '#c9c9c9'; rr(x0 - 20, y0 - 22, 60, 44, 8); ctx.fill(); ctx.fillStyle = '#9a9a9a'; rr(x0 - 160, y0 - 14, 120, 28, 6); ctx.fill(); // slot plate on the frame
  const ex = lerp(x0 - 20, x0 - 150, k), ey = y0 + lerp(80, 0, k); ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 9; ctx.setLineDash([16, 7]); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + ex) / 2, y0 + lerp(130, 20, k), ex, ey); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = '#eee'; ctx.beginPath(); ctx.arc(ex, ey, 14, 0, 7); ctx.fill(); }
function contactsScreen(w, h, t, lockP) { ctx.fillStyle = '#f4f5f8'; ctx.fillRect(-w / 2, -h / 2, w, h); statusBar(w, h, '#111'); label('Контакты', -w / 2 + 40, -h / 2 + 140, 46, { align: 'left', weight: 900, color: '#111' });
  const C = [['А', 'Андрей — сын', '#2f7de1'], ['Л', 'Лена — дочь', '#e86a92'], ['Н', 'Нина, соседка', '#22b357'], ['П', 'Поликлиника', '#8a5bd6'], ['Б', 'Банк (горячая линия)', '#1f6fe0']];
  C.forEach(([a, n, c], i) => { const y = -h / 2 + 230 + i * 120, lk = clamp(lockP * 5 - i); ctx.fillStyle = '#fff'; rr(-w / 2 + 20, y - 50, w - 40, 104, 20); ctx.fill(); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-w / 2 + 80, y, 36, 0, 7); ctx.fill(); label(a, -w / 2 + 80, y + 13, 36, { weight: 900 });
    label(n, -w / 2 + 136, y + 12, 30, { align: 'left', weight: 800, color: '#111' }); if (lk > 0) { ctx.fillStyle = `rgba(230,232,238,${.8 * lk})`; rr(-w / 2 + 20, y - 50, w - 40, 104, 20); ctx.fill(); padlock(w / 2 - 70, y + 6, .2, lk, '#e3262f'); } }); }
function wallClockBig(x, y, r, mins) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.arc(x + 14, y + 20, r, 0, 7); ctx.fill(); ctx.fillStyle = grad(x - r, y - r, x + r, y + r, [[0, '#a07a52'], [1, '#5a3c22']]); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.fillStyle = '#f8f4ea'; ctx.beginPath(); ctx.arc(x, y, r * .86, 0, 7); ctx.fill(); ctx.fillStyle = '#2a2420'; for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillRect(-(i % 5 ? 2 : 5), -r * .8, i % 5 ? 4 : 10, i % 5 ? 14 : 34); ctx.restore(); }
  for (let i = 1; i <= 12; i++) { const a = i / 12 * 6.283 - Math.PI / 2; label(String(i), x + Math.cos(a) * r * .6, y + Math.sin(a) * r * .6 + r * .07, r * .17, { weight: 800, color: '#2a2420', font: F_SERIF }); }
  const hand = (a, L, wdt, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col; rr(-wdt / 2, -L, wdt, L + 20, wdt / 2); ctx.fill(); ctx.restore(); };
  hand((10 + mins / 60) / 12 * 6.283, r * .45, 16, '#1d1a17'); hand(mins / 60 * 6.283, r * .7, 10, '#1d1a17'); hand(mins * 60 % 60 / 60 * 6.283, r * .75, 4, '#c0392b'); ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.ellipse(x - r * .3, y - r * .4, r * .45, r * .2, -.6, 0, 7); ctx.fill(); }
function choiceBtn(x, y, w, txt, col, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)) * (o.pulse || 1); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); const h = w * .34;
  if (o.glow) glow(0, 0, w * .9, o.glow); ctx.fillStyle = 'rgba(0,0,0,.4)'; rr(-w / 2 + 8, -h / 2 + 12, w, h, h / 2); ctx.fill(); ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, shade(col, 1.2)], [1, shade(col, .8)]]); rr(-w / 2, -h / 2, w, h, h / 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 4; rr(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, h / 2); ctx.stroke(); label(txt, 0, h * .17, h * .46, { weight: 900, spacing: 4 }); ctx.restore(); }
function phonePlain(x, y, w, rot, drawScreen) { const h = w * 2.05; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(0,0,0,.45)'; rr(-w / 2 + 16, -h / 2 + 22, w, h, w * .14); ctx.fill(); ctx.fillStyle = '#17181c'; rr(-w / 2, -h / 2, w, h, w * .14); ctx.fill();
  ctx.save(); rr(-w / 2 + w * .035, -h / 2 + w * .035, w * .93, h - w * .07, w * .11); ctx.clip(); ctx.scale(w / 500, w / 500); drawScreen(464, 988); ctx.restore(); ctx.restore(); }
function transferScreen(w, h, t, amtP) { ctx.fillStyle = '#f4f5f8'; ctx.fillRect(-w / 2, -h / 2, w, h); statusBar(w, h, '#111'); ctx.fillStyle = '#1f6fe0'; ctx.fillRect(-w / 2, -h / 2 + 70, w, 120); label('Перевод', 0, -h / 2 + 148, 42, { weight: 900 });
  label('Получатель', -w / 2 + 40, -h / 2 + 260, 26, { align: 'left', weight: 700, color: '#7a8494' }); ctx.fillStyle = '#fff'; rr(-w / 2 + 30, -h / 2 + 280, w - 60, 110, 18); ctx.fill(); label('«Безопасный счёт»', -w / 2 + 56, -h / 2 + 330, 30, { align: 'left', weight: 900, color: '#111' }); label('№ 40817 810 •••• 0021', -w / 2 + 56, -h / 2 + 370, 24, { align: 'left', weight: 700, color: '#7a8494', font: MONO });
  label('Сумма', -w / 2 + 40, -h / 2 + 450, 26, { align: 'left', weight: 700, color: '#7a8494' }); ctx.fillStyle = '#fff'; rr(-w / 2 + 30, -h / 2 + 470, w - 60, 120, 18); ctx.fill();
  const v = Math.round(1240000 * clamp(amtP) / 1000) * 1000; label(v.toLocaleString('ru-RU') + ' ₽', -w / 2 + 56, -h / 2 + 548, 50, { align: 'left', weight: 900, color: '#111' }); label('ВСЕ ДЕНЬГИ', w / 2 - 50, -h / 2 + 440, 22, { align: 'right', weight: 900, color: SRED, spacing: 2 });
  ctx.fillStyle = '#22b357'; rr(-w / 2 + 30, h / 2 - 200, w - 60, 100, 50); ctx.fill(); label('ПЕРЕВЕСТИ', 0, h / 2 - 136, 34, { weight: 900, spacing: 4 }); }
function vaultIcon(x, y, s, glowA = 1, crack = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, 0, 420, `rgba(255,210,90,${.45 * glowA})`);
  ctx.fillStyle = grad(-200, -200, 200, 200, [[0, '#d7dce3'], [1, '#7c8590']]); rr(-200, -200, 400, 400, 40); ctx.fill(); ctx.fillStyle = grad(-150, -150, 150, 150, [[0, '#eef1f5'], [1, '#9aa3ad']]); ctx.beginPath(); ctx.arc(0, 0, 140, 0, 7); ctx.fill();
  ctx.strokeStyle = '#5b636d'; ctx.lineWidth = 16; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); ctx.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); ctx.stroke(); } ctx.fillStyle = '#5b636d'; ctx.beginPath(); ctx.arc(0, 0, 36, 0, 7); ctx.fill();
  if (crack > 0) { ctx.strokeStyle = '#111'; ctx.lineWidth = 8; const R = rnd(3); for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(0, 0); let px = 0, py = 0; const a = k * 1.05 + R() * .5; for (let q = 0; q < 4; q++) { px += Math.cos(a + (R() - .5) * .8) * 70 * crack; py += Math.sin(a + (R() - .5) * .8) * 70 * crack; ctx.lineTo(px, py); } ctx.stroke(); } }
  ctx.restore(); }
function quoteLine(s, x, y, size, p, ul, col = '#fff') { if (p <= 0) return; ctx.save(); ctx.globalAlpha = clamp(p * 3); ctx.font = `900 ${size}px ${F_HEAD}`; const w = ctx.measureText(s).width; ctx.restore();
  if (ul > 0) { ctx.save(); ctx.strokeStyle = 'rgba(227,38,47,.9)'; ctx.lineWidth = size * .22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w / 2 - 10, y + size * .58); ctx.lineTo(x - w / 2 - 10 + (w + 20) * clamp(ul), y + size * .52); ctx.stroke(); ctx.restore(); }
  bigTitle(s, y, p, { size, col }); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: POV — her phone rings in her hand; everything the caller knows flies out of the screen
  draw(t, d, P, E) { const tn = E('имя', 1, .9), to = E('отчество', 1, 1.6), tc = E('цифры', 1, 2.5), ta = E('адрес', 1, 3.6);
    kitchen(t); ctx.save(); const z = lerp(1.0, 1.16, eout(prog(t, 0, d))); cam(540, 980, z); shake(t, t < .25 ? 10 * (1 - t / .25) : 2.2 * (Math.sin(t * 40) > .6 ? 1 : 0));
    holdPhoneHand(540, 1020, 1.02, -.05 + Math.sin(t * 2) * .01, (w, h) => callScreen(w, h, t, { name: 'Служба\nбезопасности', num: '8 800 •••-••-••', sub: 'Банк' })); ctx.restore();
    dataCard(300, 560, 420, 'ИМЯ', 'Галина', prog(t, tn - .1, tn + .25), { rot: -.08 }); dataCard(790, 720, 420, 'ОТЧЕСТВО', 'Петровна', prog(t, to - .1, to + .25), { rot: .07, col: '#7dd3fc' });
    dataCard(290, 1180, 420, 'КАРТА', '•••• 4417', prog(t, tc - .1, tc + .25), { rot: .06, col: '#86efac', font: MONO }); dataCard(780, 1060, 440, 'АДРЕС', 'Садовая, 12', prog(t, ta - .1, ta + .25), { rot: -.06, col: '#fca5a5' });
    bigTitle('ЗНАЛ О НЕЙ ВСЁ', 300, prog(t, 0, .2), { size: 92, col: '#fff', glow: 'rgba(255,60,70,.55)' }); },
  sfx(d, P, E) { const out = [[0, 'vibrate', .5], [1.05, 'vibrate', .45], [2.1, 'vibrate', .45], [3.15, 'vibrate', .4], [0, 'kitchen', .3, { dur: d }]];
    ['имя', 'отчество', 'цифры', 'адрес'].forEach((w, i) => out.push([E(w, 1, [.9, 1.6, 2.5, 3.6][i]) - .08, 'pop', .35])); return out; }
};
SC.choice = { // "Это банк — или развод? Решай сам." — the series question, two buttons
  draw(t, d, P, E, s) { const tb = E('банк', 1, .3), tr = E('развод', 1, 1.2), ts = s.U(2);
    galinaKitchen(t, GMS, { phoneEar: true, fear: .35, table: 1450 }); vign(.6); grade('rgba(20,25,40,1)', .35);
    const pl = t > ts ? 1 + .07 * Math.max(0, Math.sin((t - ts) * 9)) : 1, pr = t > ts ? 1 + .07 * Math.max(0, -Math.sin((t - ts) * 9)) : 1;
    choiceBtn(290, 1180, 440, 'БАНК', BLU, prog(t, tb - .1, tb + .2), { pulse: pl, glow: t > ts ? 'rgba(60,140,255,.35)' : null });
    choiceBtn(790, 1180, 440, 'РАЗВОД', SRED, prog(t, tr - .1, tr + .2), { pulse: pr, glow: t > ts ? 'rgba(255,60,70,.35)' : null });
    bigTitle('РАЗВОД ИЛИ НЕТ?', 300, prog(t, 0, .2), { size: 100, col: YEL }); label('ВЫПУСК 1', 540, 410, 40, { weight: 900, color: '#fff', spacing: 10, alpha: prog(t, .1, .4) }); },
  sfx(d, P, E) { return [[0, 'dundun', .4], [E('банк', 1, .3) - .1, 'pop', .35], [E('развод', 1, 1.2) - .1, 'pop', .35], [0, 'kitchen', .3, { dur: d }]]; }
};
SC.answer = { // she picks up: "— Галина Петровна?"
  draw(t, d, P, E, s) { kitchen(t); ctx.save(); const hd = headOf(GCU); cam(lerp(560, hd[0], .1), lerp(960, 960, 0), lerp(1.0, 1.05, prog(t, 0, d))); person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: .15 })); ctx.restore(); callHud(s.start + t); },
  sfx(d) { return [[0, 'click', .45], [0, 'kitchen', .3, { dur: d }]]; }
};
SC.caller = { // "Служба безопасности банка." — a neat officer with a headset and an ID badge
  draw(t, d, P, E, s) { ctx.save(); cam(540, 960, lerp(1.04, 1.0, eout(prog(t, 0, d)))); agentSet(t, s, { crm: { rowsP: 1 } }); ctx.restore(); callHud(s.start + t); },
  sfx(d) { return [[0, 'office', .25, { dur: d }]]; }
};
SC.charge = { // his monitor: her card, a 49 000 ₽ charge "waiting" — then her face: "Это вы?"
  draw(t, d, P, E, s) { const tsp = E('списать', 1, 1.6), tam = E('сорок', 1, 2.2), tu = s.U(6);
    if (t < tu - .05) { bg('#0d1420', '#05080d'); ctx.drawImage(bannerImg(), 0, 0); grade('rgba(5,10,20,1)', .6, 'source-over');
      const z = t < tsp - .1 ? lerp(1.0, 1.08, prog(t, 0, tsp)) : 1.18, cy = t < tsp - .1 ? 900 : 1080; ctx.save(); cam(540, cy, z);
      ctx.fillStyle = '#15171c'; rr(40, 520, 1000, 700, 26); ctx.fill(); ctx.save(); rr(64, 544, 952, 652, 10); ctx.clip(); ctx.translate(540, 870); crmUI(952, 652, t, { rowsP: prog(t, 0, .9), amount: '− ' + (Math.round(49 * clamp(prog(t, tam - .1, tam + .6))) || 0) + ' 000 ₽' }); ctx.restore(); glow(540, 870, 700, 'rgba(90,160,255,.12)'); ctx.restore();
      if (t > tsp - .1) bigTitle('− 49 000 ₽', 300, prog(t, tsp - .1, tsp + .15), { size: 110, col: '#ff4d57', glow: 'rgba(255,40,50,.6)' }); callHud(s.start + t); return; }
    kitchen(t); ctx.save(); const hd = headOf(GCU); cam(hd[0], 900, lerp(1.08, 1.16, prog(t, tu, d))); person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: lerp(.3, .75, prog(t, tu, tu + .4)) })); ctx.restore(); callHud(s.start + t); },
  sfx(d, P, E, s) { return [[0, 'office', .25, { dur: s.U(6) }], [E('списать', 1, 1.6) - .1, 'errbeep', .4], [s.U(6) - .05, 'dundun', .35]]; }
};
SC.no = { // "— Нет! Это не я!"
  draw(t, d, P, E, s) { kitchen(t); ctx.save(); const hd = headOf(GCU); cam(hd[0], 880, 1.12); shake(t, t < .2 ? 6 : 0); person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: 1, mouth: talking(t, s) * 1.3, tilt: .05 * Math.sin(t * 13) * Math.exp(-t * 1.5) })); ctx.restore(); callHud(s.start + t); },
  sfx(d) { return [[0, 'heartbeat', .3, { dur: d }]]; }
};
SC.stopped = { // "— Я так и думал. Операцию я остановил." — calm smile, the charge is cancelled with one click
  draw(t, d, P, E, s) { const tb = s.U(10), tc = E('остановил', 1, 1.8);
    if (t < tb - .05) { ctx.save(); cam(540, 900, lerp(1.08, 1.12, prog(t, 0, tb))); agentSet(t, s, { smile: .7, crm: { rowsP: 1 } }); ctx.restore(); callHud(s.start + t); return; }
    bg('#0d1420', '#05080d'); ctx.save(); cam(600, 1040, 1.3); ctx.fillStyle = '#15171c'; rr(40, 520, 1000, 700, 26); ctx.fill(); ctx.save(); rr(64, 544, 952, 652, 10); ctx.clip(); ctx.translate(540, 870);
    const k = eio(prog(t, tb, tc - .1)); crmUI(952, 652, t, { cancelled: t > tc ? 1 : 0, cursor: [lerp(.42, .12, k), lerp(.1, .34, k)] }); ctx.restore(); ctx.restore();
    if (t > tc) { checkMark(540, 420, 90, prog(t, tc, tc + .3), GRN); bigTitle('ОТМЕНЕНО', 600, prog(t, tc, tc + .2), { size: 90, col: '#7dff9e' }); } callHud(s.start + t); },
  sfx(d, P, E) { return [[E('остановил', 1, 1.8), 'click', .5], [E('остановил', 1, 1.8) + .05, 'chime', .35]]; }
};
SC.code = { // "И запомните: код из СМС никому не говорите. Даже мне." — the classic trust trick
  draw(t, d, P, E, s) { const tk = E('код', 1, .9), tm = s.U(12);
    if (t < tk - .1) { ctx.save(); cam(540, 900, 1.1); agentSet(t, s, { smile: .45, crm: { rowsP: 1, cancelled: 1 } }); ctx.restore(); helpHand(820, 1500, .95, 1, 0, 0, { sleeve: '#f3f5f8', skin: '#e6b99c', rot: -.12 }); callHud(s.start + t); return; }
    if (t < tm - .05) { bg('#0f2a4a', '#06111f'); glow(540, 820, 800, 'rgba(255,210,63,.25)'); ctx.fillStyle = '#ffffff'; rr(170, 660, 740, 330, 50); ctx.fill(); ctx.beginPath(); ctx.moveTo(240, 980); ctx.lineTo(210, 1060); ctx.lineTo(320, 985); ctx.fill();
      label('Код из СМС: ', 230, 760, 44, { align: 'left', weight: 800, color: '#7a8494' }); label('• • • •', 540, 880, 110, { weight: 900, color: '#111', font: MONO });
      padlock(540, 1180, 1.2, prog(t, tk, tk + .35)); bigTitle('НИКОМУ', 400, prog(t, E('никому', 1, 2) - .1, E('никому', 1, 2) + .15), { size: 120, col: YEL }); return; }
    kitchen(t); ctx.save(); const hd = headOf(GCU); cam(hd[0], 900, 1.08); person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: 0, smile: .8 })); ctx.restore();
    const tr = prog(t, tm, d); ctx.fillStyle = 'rgba(10,14,22,.75)'; rr(240, 230, 600, 110, 30); ctx.fill(); label('ДОВЕРИЕ', 280, 300, 34, { align: 'left', weight: 900, color: '#fff', spacing: 3 });
    ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(500, 266, 300, 40, 20); ctx.fill(); ctx.fillStyle = GRN; rr(500, 266, 300 * lerp(.35, .95, eout(tr)), 40, 20); ctx.fill(); callHud(s.start + t); },
  sfx(d, P, E, s) { return [[E('код', 1, .9) - .1, 'clasp', .45], [E('никому', 1, 2) - .1, 'pop', .35], [s.U(12), 'shimmer', .3]]; }
};
SC.scary = { // "А потом он сказал то, от чего ей стало страшно." — slow push-in, the warm kitchen goes cold
  draw(t, d, P, E, s) { const k = prog(t, 0, d), half = d * .55; kitchen(t); const hd = headOf(GCU);
    ctx.save(); if (t < half) cam(hd[0], 900, lerp(1.08, 1.3, eio(t / half))); else cam(hd[0] - 40, headOf(GCU, .4)[1] + 40, 1.9);
    person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: lerp(.1, .9, k), smile: 0 })); ctx.restore();
    grade('rgba(40,60,110,1)', .45 * k); vign(.4 + .4 * k); if (t < half) bigTitle('А ПОТОМ…', 320, prog(t, 0, .2), { size: 110, col: '#fff' }); callHud(s.start + t, 1 - k * .5); },
  sfx(d) { return [[0, 'drone', .35, { dur: d }], [d * .5, 'heartbeat', .35, { dur: d * .5 + .3 }]]; }
};
SC.insider = { // "— Ваши данные слил сотрудник вашего же отделения."
  draw(t, d, P, E, s) { const te = E('сотрудник', 1, 1.2);
    if (t < te - .1) { ctx.save(); cam(540, 860, lerp(1.15, 1.32, prog(t, 0, te))); agentSet(t, s, { smile: 0, crm: { rowsP: 1, cancelled: 1 } }); ctx.restore(); grade('rgba(60,10,20,1)', .3); vign(.6); callHud(s.start + t); return; }
    bankAfterHours(t); ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 900, 800, `rgba(255,40,60,${.1 + .08 * Math.sin(t * 5)})`); ctx.restore(); vign(.6);
    bigTitle('«СЛИЛ СОТРУДНИК»', 320, prog(t, te - .1, te + .2), { size: 84, col: '#ff6b74' }); },
  sfx(d, P, E) { return [[0, 'drone', .3, { dur: d }], [E('сотрудник', 1, 1.2) - .1, 'whoosh', .35]]; }
};
SC.secret = { // "Поэтому в банк не ходите и никому не рассказывайте." — the door chain goes on, her family gets locked out
  draw(t, d, P, E, s) { const tx = E('ходите', 1, 1.2), tn = E('никому', 1, 1.8);
    if (t < tn - .1) { ctx.save(); cam(560, 900, lerp(1.0, 1.12, prog(t, 0, tn))); ctx.drawImage(layer('hallway', hallwayDraw, 1.5), 0, 0); doorChain(prog(t, tx - .3, tx + .15)); ctx.restore(); vign(.55);
      bigTitle('НЕ ХОДИТЕ В БАНК', 320, prog(t, tx - .3, tx), { size: 88, col: '#fff', glow: 'rgba(255,60,70,.5)' }); callHud(s.start + t); return; }
    kitchen(t); grade('rgba(20,25,40,1)', .4); ctx.save(); cam(540, 960, lerp(1.0, 1.06, prog(t, tn, d))); holdPhoneHand(540, 1010, 1.0, -.04, (w, h) => contactsScreen(w, h, t, prog(t, tn, d - .1))); ctx.restore();
    bigTitle('НИКОМУ', 300, prog(t, tn - .1, tn + .15), { size: 120, col: YEL }); },
  sfx(d, P, E) { return [[E('ходите', 1, 1.2) - .3, 'chain', .5], [E('никому', 1, 1.8), 'popseq', .3, { n: 5, step: .14 }]]; }
};
SC.tenmin = { // "Я перезвоню через десять минут." — the kitchen clock, then the short beeps
  draw(t, d, P, E, s) { kitchen(t); grade('rgba(20,25,40,1)', .3); ctx.save(); cam(540, 900, lerp(1.0, 1.08, prog(t, 0, d))); wallClockBig(540, 860, 330, 24 + prog(t, 0, d) * 10); ctx.restore();
    dayRing(540, 860, 360, prog(t, 0, d), YEL); bigTitle('10 МИНУТ', 300, prog(t, 0, .2), { size: 110, col: YEL }); },
  sfx(d) { return [[0, 'clock', .5, { dur: d }], [d - .45, 'busy', .5]]; }
};
SC.recap = { // "Номер — как у банка. Данные — точные. Код он не просил."
  draw(t, d, P, E, s) { const t1 = s.U(18), t2 = s.U(19); bg('#0f2340', '#060d18'); glow(540, 820, 900, 'rgba(90,160,255,.2)');
    if (t < t1 - .05) { phonePlain(540, 820, 360, -.04, (w, h) => callScreen(w, h, t, { name: 'Служба\nбезопасности', num: '8 800 •••-••-••' })); checkMark(760, 520, 80, prog(t, .3, .7)); bigTitle('НОМЕР КАК У БАНКА', 300, prog(t, 0, .2), { size: 76 }); }
    else if (t < t2 - .05) { const q = t - t1; dataCard(540, 640, 640, 'ИМЯ', 'Галина Петровна', prog(q, 0, .2), { rot: -.03 }); dataCard(540, 870, 640, 'КАРТА', '•••• 4417', prog(q, .1, .3), { rot: .02, col: '#86efac', font: MONO }); dataCard(540, 1100, 640, 'АДРЕС', 'Садовая, 12', prog(q, .2, .4), { rot: -.02, col: '#fca5a5' });
      checkMark(840, 470, 80, prog(q, .4, .8)); bigTitle('ДАННЫЕ ТОЧНЫЕ', 300, prog(q, 0, .2), { size: 84 }); }
    else { const q = t - t2; padlock(540, 860, 1.6, prog(q, 0, .3)); checkMark(780, 640, 80, prog(q, .3, .7)); bigTitle('КОД НЕ ПРОСИЛ', 300, prog(q, 0, .2), { size: 84 }); } },
  sfx(d, P, E, s) { return [[.4, 'pop', .35], [s.U(18) + .5, 'pop', .35], [s.U(19) + .4, 'pop', .35], [0, 'pad_swell', .25, { dur: d }]]; }
};
function clueFrames(t, i, s) { // what the viewer re-checks during the 5 seconds
  if (i === 0) { ctx.save(); cam(540, 880, 1.15); agentSet(t, s, { smile: .3, mouth: .3 * Math.abs(Math.sin(t * 9)), crm: { rowsP: 1, cancelled: 1 } }); ctx.restore(); }
  else if (i === 1) { kitchen(t); ctx.save(); const hd = headOf(GCU); cam(hd[0], 900, 1.1); person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: .6 })); ctx.restore(); }
  else { ctx.save(); cam(560, 900, 1.08); ctx.drawImage(layer('hallway', hallwayDraw, 1.5), 0, 0); doorChain(1); ctx.restore(); } }
SC.countdown = { // "Банк или развод? У тебя пять секунд." + 5 s of silence
  draw(t, d, P, E, s) { const ts = E('секунд', 1, 1.6) + .35;
    if (t < ts) { kitchen(t); grade('rgba(10,14,25,1)', .6, 'source-over'); phonePlain(540, 820, 330, -.03, (w, h) => callScreen(w, h, t, { name: 'Служба\nбезопасности', num: '8 800 •••-••-••' }));
      choiceBtn(290, 1180, 440, 'БАНК', BLU, prog(t, 0, .25)); choiceBtn(790, 1180, 440, 'РАЗВОД', SRED, prog(t, .1, .35)); bigTitle('А ТЫ КАК ДУМАЕШЬ?', 300, prog(t, 0, .2), { size: 80, col: YEL }); return; }
    const e = t - ts, i = Math.min(2, Math.floor(e / 1.67)); clueFrames(t, i, s);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, 470); const left = Math.max(0, 5 - e), n = Math.max(1, Math.ceil(left));
    if (left > 0) { dayRing(540, 300, 105, left / 5, YEL); bigNum(String(n), 540, 300, 150, '#fff', { glow: 'rgba(255,210,80,.8)' }); }
    const ph = Math.sin(e * 6); choiceBtn(290, 1560, 420, 'БАНК', BLU, 1, { pulse: 1 + .05 * Math.max(0, ph) }); choiceBtn(790, 1560, 420, 'РАЗВОД', SRED, 1, { pulse: 1 + .05 * Math.max(0, -ph) }); },
  sfx(d, P, E) { const ts = E('секунд', 1, 1.6) + .35; return [0, 1, 2, 3, 4].map(k => [ts + k, 'tick', .55]).concat([[ts, 'heartbeat', .35, { dur: 5 }], [0, 'pop', .3]]); }
};
SC.verdict = { // "Это развод."
  draw(t, d) { bg('#1a0608', '#050102'); glow(540, 900, 900, 'rgba(255,40,50,.3)'); ctx.save(); shake(t, t < .3 ? 14 * (1 - t / .3) : 0);
    polaroid(540, 820, 600, -.03, () => { ctx.save(); cam(540, 880, 1.15); agentSet(0, { words: [] }, { smile: .3, crm: { rowsP: 1, cancelled: 1 } }); ctx.restore(); }, 'Служба безопасности?', { tint: 'rgba(255,230,220,.4)' });
    stamp('РАЗВОД', 540, 820, prog(t, .05, .35), { color: SRED, size: 150, rot: -.18 }); ctx.restore(); },
  sfx() { return [[.05, 'stamp', .6], [.05, 'boom', .4]]; }
};
SC.clue = { // "Он прокололся на одной фразе: в банк не ходите и никому не рассказывайте."
  draw(t, d, P, E, s) { const tq = E('банк', 1, 1.8), tn = E('никому', 1, 3);
    if (t < tq - .15) { ctx.save(); cam(540, 860, 1.25); agentSet(t, s, { smile: 0, mouth: .35 * Math.abs(Math.sin(t * 11)), crm: { rowsP: 1, cancelled: 1 } }); ctx.restore(); grade('hsl(0,0%,50%)', .85, 'saturation');
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; for (let y = (t * 300) % 40; y < H; y += 40) { ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(0, y, W, 3); } label('◀◀ ПОВТОР', 60, 120, 44, { align: 'left', weight: 900, color: '#fff', font: MONO });
      bigTitle('ОДНА ФРАЗА', 330, prog(t, 0, .2), { size: 110, col: YEL }); return; }
    bg('#120608', '#050203'); glow(540, 820, 900, 'rgba(255,60,70,.25)'); label('“', 160, 640, 260, { weight: 900, color: 'rgba(255,255,255,.18)' });
    quoteLine('В БАНК НЕ ХОДИТЕ', 540, 760, 92, prog(t, tq - .15, tq + .1), prog(t, tq + .3, tq + .9)); quoteLine('И НИКОМУ', 540, 920, 92, prog(t, tn - .4, tn - .1), prog(t, tn, tn + .4)); quoteLine('НЕ РАССКАЗЫВАЙТЕ', 540, 1060, 92, prog(t, tn - .1, tn + .2), prog(t, tn + .3, tn + .9));
    bigTitle('ГЛАВНЫЙ ПРИЗНАК', 330, prog(t, tq - .1, tq + .2), { size: 90, col: '#ff6b74' }); },
  sfx(d, P, E) { return [[0, 'scratch', .35], [E('банк', 1, 1.8) - .15, 'whoosh', .3], [E('банк', 1, 1.8) + .3, 'marker', .4], [E('никому', 1, 3) + .3, 'marker', .4]]; }
};
SC.realbank = { // "Настоящий банк никогда не запретит вам прийти в отделение." — she walks in, the doors open
  draw(t, d, P, E, s) { const tz = E('запретит', 1, 1.6), to = E('отделение', 1, 2.8);
    if (t < tz - .1) { ctx.save(); cam(540, 960, 1.0); bankFront(t, 0); const walkX = lerp(80, 360, prog(t, 0, tz)); person(walkX, 1700, 1050, GAL({ walk: t * 7.2, light: -1 })); ctx.restore(); bigTitle('НАСТОЯЩИЙ БАНК', 300, prog(t, 0, .2), { size: 84, col: '#fff' }); return; }
    ctx.save(); cam(540, 1010, lerp(1.25, 1.33, prog(t, tz, d))); bankFront(t, prog(t, to - .6, to + .3)); person(540, 1760, 1150, GAL({ walk: t * 6, view: 'front', light: -1 })); ctx.restore();
    bigTitle('ВСЕГДА МОЖНО ПРИЙТИ', 300, prog(t, tz - .1, tz + .2), { size: 76, col: '#7dff9e' }); },
  sfx(d, P, E) { return [[0, 'steps', .3, { dur: d - .6 }], [0, 'city', .25, { dur: d }], [E('отделение', 1, 2.8) - .5, 'door_chime', .4]]; }
};
SC.nextcall = { // "Через десять минут ей позвонил бы «следователь» — и попросил перевести все деньги на «безопасный счёт»."
  draw(t, d, P, E, s) { const tp = E('попросил', 1, 2.4), tb = E('безопасный', 1, 4.6);
    if (t < tp - .1) { kitchen(t); grade('rgba(20,25,40,1)', .35); ctx.save(); cam(540, 980, lerp(1.0, 1.1, prog(t, 0, tp))); shake(t, 2 * (Math.sin(t * 40) > .6 ? 1 : 0)); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { name: 'Следователь', num: '+7 9•• •••-••-••', icon: 'badge', avatar: '#8a1c2a', c1: '#4a1620', c2: '#1d0a0e', glowCol: 'rgba(255,90,100,.25)' })); ctx.restore();
      bigTitle('+10 МИНУТ', 300, prog(t, 0, .2), { size: 100, col: YEL }); return; }
    if (t < tb - .15) { kitchen(t); grade('rgba(20,25,40,1)', .35); ctx.save(); cam(540, 900, 1.08); holdPhoneHand(540, 1020, 1.02, -.04, (w, h) => transferScreen(w, h, t, prog(t, tp, tb - .3))); ctx.restore(); bigTitle('ВСЕ ДЕНЬГИ', 300, prog(t, tp, tp + .2), { size: 100, col: '#ff6b74' }); return; }
    bg('#231a08', '#0a0702'); vaultIcon(540, 860, 1.4, .8 + .2 * Math.sin(t * 5)); bigTitle('«БЕЗОПАСНЫЙ СЧЁТ»', 320, prog(t, tb - .15, tb + .1), { size: 80, col: YEL }); },
  sfx(d, P, E) { return [[0, 'vibrate', .45], [1.05, 'vibrate', .4], [E('попросил', 1, 2.4), 'typing', .35, { dur: 1.2 }], [E('безопасный', 1, 4.6) - .15, 'shimmer', .35]]; }
};
SC.nosafe = { // "Таких счетов не существует."
  draw(t, d) { bg('#120608', '#050203'); const k = prog(t, .2, .6); ctx.save(); shake(t, t > .2 && t < .45 ? 10 : 0); vaultIcon(540, 860, 1.4, .3 * (1 - k), k); ctx.restore();
    if (k > 0) { const R = rnd(8); for (let i = 0; i < 18; i++) { const a = R() * 6.28, dd = eout(k) * (300 + R() * 500); bill(540 + Math.cos(a) * dd, 860 + Math.sin(a) * dd + k * 200, .5 + R() * .3, a + t); } }
    xMark(540, 860, 220, prog(t, .45, .8)); bigTitle('ИХ НЕ СУЩЕСТВУЕТ', 320, prog(t, 0, .2), { size: 82, col: '#fff' }); },
  sfx() { return [[.2, 'shatter', .5], [.45, 'stamp', .4]]; }
};
SC.backstage = { // TWIST: the "office" was a banner in a basement — and her data came from a leaked database
  draw(t, d, P, E, s) { const tl = E('слитых', 1, 2.8), tk = E('копейки', 1, 4.2);
    if (t < tl - .1) { const k = eio(prog(t, .1, tl - .2)); bg('#2a2d28', '#121410'); ctx.save(); cam(lerp(540, 520, k), lerp(960, 900, k), lerp(1.0, .42, k));
      basement(t, k); drawBanner(clamp(k * 2)); person(ACU[0], ACU[1], ACU[2], AGENT({ smile: lerp(.3, 0, k), mouth: 0 })); officeDesk(); agentMonitor(t, { rowsP: 1, cancelled: 1 }); ctx.restore();
      grade('rgba(90,100,60,1)', .25 * k); vign(.3 + .4 * k); if (k > .5) bigTitle('ВОТ ВАМ И «БАНК»', 300, prog(t, tl * .55, tl * .55 + .25), { size: 84, col: YEL }); return; }
    bg('#0a0c10', '#030405'); ctx.save(); cam(540, 900, 1.0); laptop(540, 1250, 980, t, { mode: 'db', scroll: 600 + (t - tl) * 180, hi: t > tk - .3 }); ctx.restore(); vign(.5);
    bigTitle('ЗА КОПЕЙКИ', 300, prog(t, tk - .2, tk + .1), { size: 110, col: YEL }); if (t > tk - .3) label('1 248 330 человек', 540, 420, 48, { weight: 900, color: '#fff', alpha: prog(t, tk - .3, tk) }); },
  sfx(d, P, E) { return [[.1, 'whoosh', .45], [.3, 'drone', .35, { dur: d }], [E('слитых', 1, 2.8) - .1, 'data', .3, { dur: d - E('слитых', 1, 2.8) }], [E('копейки', 1, 4.2) - .2, 'coins', .4]]; }
};
SC.spoof = { // "А номер банка на экране подделывают за минуту."
  draw(t, d, P, E, s) { const tm = E('минуту', 1, 2.2);
    if (t < tm - .3) { bg('#0a0c10', '#030405'); ctx.save(); cam(540, 960, 1.08); laptop(540, 1250, 980, t, { mode: 'spoof', p1: prog(t, .1, .9), p2: prog(t, .9, tm - .5), p3: 0 }); ctx.restore(); vign(.5); bigTitle('ПОДМЕНА НОМЕРА', 300, prog(t, 0, .2), { size: 86, col: '#fff' }); return; }
    kitchen(t); ctx.save(); cam(540, 980, lerp(1.0, 1.08, prog(t, tm, d))); shake(t, 2.2 * (Math.sin(t * 40) > .6 ? 1 : 0)); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { name: 'Служба\nбезопасности', num: '8 800 •••-••-••', sub: 'Банк' })); ctx.restore();
    bigTitle('ЗА МИНУТУ', 300, prog(t, tm - .3, tm), { size: 110, col: YEL }); },
  sfx(d, P, E) { return [[0, 'typing', .4, { dur: E('минуту', 1, 2.2) - .4 }], [E('минуту', 1, 2.2) - .3, 'vibrate', .5]]; }
};
SC.final = { // "Так что если звонящий знает о вас всё — это ещё не значит, что он из банка." → loops into frame 0
  draw(t, d, P, E, s) { const te = E('это', 1, 2.4);
    if (t < te - .1) { kitchen(t); ctx.save(); const hd = headOf(GCU); cam(hd[0], 900, lerp(1.04, 1.12, prog(t, 0, te))); person(GCU[0], GCU[1], GCU[2], GAL({ phoneEar: true, fear: .5 })); ctx.restore(); bigTitle('ЗНАЕТ О ВАС ВСЁ?', 300, prog(t, 0, .2), { size: 90, col: '#fff' }); return; }
    kitchen(t); ctx.save(); cam(540, 980, lerp(1.06, 1.14, prog(t, te, d))); shake(t, 2.2 * (Math.sin(t * 40) > .6 ? 1 : 0)); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { name: 'Служба\nбезопасности', num: '8 800 •••-••-••', sub: 'Банк' })); ctx.restore();
    dataCard(300, 560, 420, 'ИМЯ', 'Галина', 1, { rot: -.08 }); dataCard(790, 720, 420, 'ОТЧЕСТВО', 'Петровна', 1, { rot: .07, col: '#7dd3fc' }); dataCard(290, 1180, 420, 'КАРТА', '•••• 4417', 1, { rot: .06, col: '#86efac', font: MONO }); dataCard(780, 1060, 440, 'АДРЕС', 'Садовая, 12', 1, { rot: -.06, col: '#fca5a5' });
    bigTitle('ЭТО НЕ БАНК', 300, prog(t, te - .1, te + .15), { size: 110, col: '#ff4d57', glow: 'rgba(255,40,50,.5)' }); },
  sfx(d, P, E) { return [[0, 'kitchen', .3, { dur: d }], [E('это', 1, 2.4) - .1, 'vibrate', .5], [E('это', 1, 2.4) + .95, 'vibrate', .45], [E('это', 1, 2.4) + 2, 'vibrate', .4]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .3) drawSubs(t); };
