// ===== environments & extra props for the full episode =====

function bg(c1, c2) { ctx.fillStyle = grad(0, 0, 0, H, [[0, c1], [1, c2]]); ctx.fillRect(0, 0, W, H); }
function floor(y, c1, c2) { ctx.fillStyle = grad(0, y, 0, H, [[0, c1], [1, c2]]); ctx.fillRect(-300, y, W + 600, H - y + 300); }
function star5(x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); for (let k = 0; k < 10; k++) { const rr2 = k % 2 ? r * .45 : r, a = k * Math.PI / 5 - Math.PI / 2; ctx.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); } ctx.fill(); }

// studio product shot (like the reference photo): purple backlight + haze
function studio(t, hue = 275, o = {}) {
  bg('#06030c', '#0a0612');
  glow(960, 520, 820, `hsla(${hue},90%,45%,.55)`); glow(960, 560, 380, `hsla(${hue},95%,60%,.35)`);
  floor(760, `hsla(${hue},40%,10%,1)`, '#030205');
  ctx.save(); ctx.globalAlpha = .25; bokeh(t, 44, 14, `hsla(${hue},90%,70%,A)`, { min: 30, max: 90, drift: 6 }); ctx.restore();
}
// American gas station at night
function gasStation(t, o = {}) {
  bg('#05070f', '#141a2a');
  const R = rnd(8); for (let i = 0; i < 80; i++) { ctx.fillStyle = `rgba(255,255,255,${R() * .6})`; ctx.fillRect(R() * W, R() * 380, 1.5, 1.5); }
  // convenience store
  ctx.fillStyle = '#1b1f2b'; ctx.fillRect(1100, 380, 760, 420);
  ctx.fillStyle = grad(0, 470, 0, 760, [[0, '#f4f0dc'], [1, '#c8c2a6']]); ctx.fillRect(1140, 470, 680, 290);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = '#2a2f3c'; ctx.fillRect(1140 + i * 136, 470, 8, 290); }
  for (let i = 0; i < 4; i++) for (let j = 0; j < 12; j++) { ctx.fillStyle = ['#c8102e', '#1f36a8', '#e8b931', '#2f9e6b'][(i + j) % 4]; ctx.fillRect(1160 + j * 54, 520 + i * 56, 34, 26); }
  glow(1480, 600, 500, 'rgba(255,250,220,.35)');
  ctx.fillStyle = '#c8102e'; ctx.fillRect(1100, 380, 760, 60);
  ctx.fillStyle = '#fff'; ctx.font = `900 40px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillText('24/7  FOOD MART', 1480, 425);
  // canopy
  ctx.fillStyle = '#e9ecef'; ctx.fillRect(80, 300, 980, 70); ctx.fillStyle = '#1f36a8'; ctx.fillRect(80, 355, 980, 15);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#fffbe8'; ctx.fillRect(130 + i * 160, 370, 80, 8); glow(170 + i * 160, 390, 220, 'rgba(255,250,230,.35)'); }
  ctx.fillStyle = '#c9ccd2'; ctx.fillRect(260, 370, 26, 480); ctx.fillRect(820, 370, 26, 480);
  // pumps
  for (const px of [400, 700]) { ctx.fillStyle = '#d7dbe0'; rr(px - 50, 640, 100, 190, 8); ctx.fill(); ctx.fillStyle = '#1f2533'; ctx.fillRect(px - 36, 660, 72, 50);
    ctx.fillStyle = '#7fe08a'; ctx.font = `700 22px ${F_HEAD}`; ctx.fillText('$3.49', px, 694); ctx.fillStyle = '#c8102e'; ctx.fillRect(px - 50, 760, 100, 14); }
  // price sign
  ctx.fillStyle = '#222'; ctx.fillRect(40, 140, 14, 260); ctx.fillStyle = '#f5f5f5'; rr(-20, 120, 200, 150, 8); ctx.fill();
  ctx.fillStyle = '#c8102e'; ctx.font = `900 30px ${F_HEAD}`; ctx.fillText('GAS', 80, 160); ctx.fillStyle = '#111'; ctx.font = `800 44px ${F_HEAD}`; ctx.fillText('3.49', 80, 215);
  floor(840, '#23262e', '#0c0d11');
  ctx.globalAlpha = .25; ctx.fillStyle = '#fff'; for (let i = 0; i < 8; i++) ctx.fillRect(100 + i * 240, 930, 120, 6); ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}
function gym(t) {
  bg('#121418', '#07080a');
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#1e2229'; ctx.fillRect(i * 340, 0, 300, 640); glow(i * 340 + 150, 60, 260, 'rgba(220,235,255,.3)'); }
  ctx.fillStyle = '#c8102e'; ctx.fillRect(0, 600, W, 14);
  floor(640, '#2a2d33', '#0c0d10');
  // rack + barbell
  ctx.fillStyle = '#3a3e46'; ctx.fillRect(1300, 360, 16, 300); ctx.fillRect(1600, 360, 16, 300);
  ctx.fillStyle = '#9aa0aa'; ctx.fillRect(1240, 470, 440, 10);
  for (const x of [1250, 1270, 1650, 1670]) { ctx.fillStyle = '#111'; rr(x - 9, 420, 18, 110, 4); ctx.fill(); }
  // dumbbells
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#25282e'; ctx.fillRect(200 + i * 110, 760, 60, 12); ctx.fillStyle = '#111'; ctx.fillRect(196 + i * 110, 750, 14, 32); ctx.fillRect(250 + i * 110, 750, 14, 32); }
  // mirror sheen
  ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.fillRect(0, 100, W, 480);
}
function office(t, morning = true) {
  bg(morning ? '#cfd9e6' : '#0c1222', morning ? '#e9edf2' : '#05070d');
  // window skyline
  ctx.fillStyle = morning ? grad(0, 120, 0, 620, [[0, '#9cc3ea'], [1, '#f2d7b0']]) : grad(0, 120, 0, 620, [[0, '#0b1430'], [1, '#2a2f55']]);
  ctx.fillRect(160, 120, 1600, 500);
  const R = rnd(31); for (let i = 0; i < 22; i++) { const bw = 50 + R() * 90, bh = 120 + R() * 320, bx = 160 + i * 74; ctx.fillStyle = morning ? `rgba(80,100,130,${.5 + R() * .3})` : '#0a0f22'; ctx.fillRect(bx, 620 - bh, bw, bh);
    if (!morning) for (let k = 0; k < 20; k++) if (R() > .5) { ctx.fillStyle = 'rgba(255,220,140,.7)'; ctx.fillRect(bx + 6 + (k % 4) * 12, 630 - bh + Math.floor(k / 4) * 18, 6, 8); } }
  ctx.strokeStyle = '#3c4250'; ctx.lineWidth = 14; ctx.strokeRect(160, 120, 1600, 500); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(160 + i * 400, 120); ctx.lineTo(160 + i * 400, 620); ctx.stroke(); }
  if (morning) glow(1500, 250, 600, 'rgba(255,230,180,.4)');
  // desk
  floor(760, morning ? '#7a5a3c' : '#2b1e12', morning ? '#4a3420' : '#120b05');
  ctx.fillStyle = '#1b1d22'; rr(700, 520, 520, 300, 12); ctx.fill(); ctx.fillStyle = morning ? '#9fc3f0' : '#3a5a9a'; rr(716, 536, 488, 268, 6); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 6; i++) ctx.fillRect(750, 580 + i * 34, 200 + (i * 53 % 180), 10);
  ctx.fillStyle = '#26282d'; ctx.fillRect(940, 820, 40, 60);
  // coffee cup
  ctx.fillStyle = '#f2f2f2'; rr(1320, 700, 70, 90, 10); ctx.fill(); ctx.strokeStyle = '#f2f2f2'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(1395, 740, 18, -1.2, 1.2); ctx.stroke();
}
function dorm(t) {
  bg('#0a0c18', '#04050a');
  // window with moon
  ctx.fillStyle = grad(0, 160, 0, 560, [[0, '#0a1230'], [1, '#1d2450']]); ctx.fillRect(1180, 160, 520, 400);
  ctx.fillStyle = '#f5f2e0'; ctx.beginPath(); ctx.arc(1560, 260, 34, 0, 7); ctx.fill(); glow(1560, 260, 160, 'rgba(200,210,255,.35)');
  ctx.strokeStyle = '#1e1a16'; ctx.lineWidth = 18; ctx.strokeRect(1180, 160, 520, 400);
  // pennant + poster
  ctx.fillStyle = '#c8102e'; ctx.beginPath(); ctx.moveTo(260, 200); ctx.lineTo(560, 240); ctx.lineTo(260, 280); ctx.fill();
  ctx.fillStyle = '#1f36a8'; ctx.fillRect(680, 160, 220, 300); ctx.fillStyle = '#e8b931'; ctx.beginPath(); ctx.arc(790, 280, 50, 0, 7); ctx.fill();
  // desk lamp pool
  floor(720, '#3b2a1b', '#120b06');
  glow(640, 700, 520, 'rgba(255,190,110,.55)');
  ctx.fillStyle = '#222'; ctx.fillRect(420, 500, 14, 220); ctx.beginPath(); ctx.moveTo(380, 500); ctx.lineTo(520, 470); ctx.lineTo(500, 430); ctx.lineTo(370, 470); ctx.fill();
  // books + laptop
  ['#7a2a2a', '#2a4a7a', '#3a6a3a', '#7a6a2a'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(160, 690 - i * 28, 220, 26); });
  ctx.fillStyle = '#2b2d33'; ctx.beginPath(); ctx.moveTo(620, 720); ctx.lineTo(1000, 720); ctx.lineTo(1040, 740); ctx.lineTo(580, 740); ctx.fill();
  ctx.fillStyle = '#1b1d22'; ctx.fillRect(640, 480, 340, 240); ctx.fillStyle = '#4a7ad0'; ctx.fillRect(652, 492, 316, 216);
  ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let i = 0; i < 7; i++) ctx.fillRect(672, 512 + i * 26, 160 + (i * 41 % 120), 8);
  glow(810, 600, 300, 'rgba(120,170,255,.25)');
}
// corporate tower at night with a glowing logo — "global giant"
function hqTower(t, o = {}) {
  bg('#03050c', '#0c1430');
  const R = rnd(5); for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(255,255,255,${R() * .5})`; ctx.fillRect(R() * W, R() * 500, 1.4, 1.4); }
  // other skyline
  for (let i = 0; i < 18; i++) { const bw = 70 + R() * 110, bh = 180 + R() * 360, bx = i * 110 - 40; ctx.fillStyle = '#070b18'; ctx.fillRect(bx, 900 - bh, bw, bh);
    for (let k = 0; k < 40; k++) if (R() > .6) { ctx.fillStyle = 'rgba(255,215,140,.55)'; ctx.fillRect(bx + 8 + (k % 5) * 14, 910 - bh + Math.floor(k / 5) * 22, 6, 9); } }
  // the tower
  const tx = o.x ?? 960, tw = 380, top = o.top ?? 90;
  ctx.fillStyle = grad(tx - tw / 2, 0, tx + tw / 2, 0, [[0, '#0b1636'], [.45, '#1c3170'], [.55, '#2a4590'], [1, '#081028']]);
  ctx.beginPath(); ctx.moveTo(tx - tw / 2, 1080); ctx.lineTo(tx - tw / 2 + 30, top + 60); ctx.lineTo(tx, top); ctx.lineTo(tx + tw / 2 - 30, top + 60); ctx.lineTo(tx + tw / 2, 1080); ctx.fill();
  ctx.strokeStyle = 'rgba(140,180,255,.18)'; ctx.lineWidth = 1;
  for (let y = top + 80; y < 1080; y += 26) { ctx.beginPath(); ctx.moveTo(tx - tw / 2 + 30, y); ctx.lineTo(tx + tw / 2 - 30, y); ctx.stroke(); }
  for (let x = -5; x <= 5; x++) { ctx.beginPath(); ctx.moveTo(tx + x * 30, top + 60); ctx.lineTo(tx + x * 33, 1080); ctx.stroke(); }
  for (let i = 0; i < 160; i++) { if (R() > .55) { const wx = tx - tw / 2 + 40 + R() * (tw - 80), wy = top + 100 + R() * 800; ctx.fillStyle = 'rgba(200,220,255,.5)'; ctx.fillRect(wx, wy, 14, 8); } }
  // logo on the crown
  ctx.save(); ctx.translate(tx, top + 150); const pulse = .8 + .2 * Math.sin(t * 2);
  glow(0, 0, 220, `rgba(255,60,60,${.35 * pulse})`);
  ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.fill(); ctx.fillStyle = '#e3172e'; bull(-118, -40, .95, false); bull(118, -40, .95, true);
  ctx.restore();
  // searchlights
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const [sx, ph] of [[300, 0], [1620, 2]]) { const a = -Math.PI / 2 + Math.sin(t * .5 + ph) * .35; ctx.fillStyle = 'rgba(160,190,255,.06)'; ctx.beginPath(); ctx.moveTo(sx, 1080); ctx.lineTo(sx + Math.cos(a - .05) * 1400, 1080 + Math.sin(a - .05) * 1400); ctx.lineTo(sx + Math.cos(a + .05) * 1400, 1080 + Math.sin(a + .05) * 1400); ctx.fill(); }
  ctx.restore();
}
// rotating globe with glowing network
function globe(cx, cy, r, t, o = {}) {
  ctx.save();
  ctx.fillStyle = rgrad(cx - r * .3, cy - r * .35, r * .1, r * 1.05, [[0, '#2a5bd7'], [.7, '#0e2a72'], [1, '#050c26']]); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
  const rot = t * (o.speed ?? .25);
  // pseudo-continents: blobs on the sphere
  const R = rnd(3); const blobs = []; for (let i = 0; i < 26; i++) blobs.push([R() * Math.PI * 2, (R() - .5) * 2.2, .15 + R() * .35]);
  blobs.forEach(([lon, lat, s]) => { const L = lon + rot; const z = Math.cos(L) * Math.cos(lat * .7); if (z < 0) return;
    const x = cx + Math.sin(L) * Math.cos(lat * .7) * r, y = cy - Math.sin(lat * .7) * r; ctx.fillStyle = `rgba(90,200,140,${.25 + z * .45})`;
    ctx.beginPath(); ctx.ellipse(x, y, s * r * .45 * (.3 + .7 * z), s * r * .3, 0, 0, 7); ctx.fill(); });
  ctx.strokeStyle = 'rgba(160,200,255,.18)'; ctx.lineWidth = 1.2;
  for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(cx, cy - k * r / 4, r * Math.sqrt(1 - (k / 4) ** 2), r * .08, 0, 0, 7); ctx.stroke(); }
  for (let k = 0; k < 6; k++) { const L = rot + k * Math.PI / 6; ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.sin(L)) * r, r, 0, 0, 7); ctx.stroke(); }
  // network arcs
  if (o.net) { const pts = []; const R2 = rnd(11); for (let i = 0; i < 14; i++) { const L = R2() * 6.28 + rot, la = (R2() - .5) * 1.6; const z = Math.cos(L) * Math.cos(la); if (z > 0) pts.push([cx + Math.sin(L) * Math.cos(la) * r, cy - Math.sin(la) * r]); }
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    pts.forEach((p, i) => { glow(p[0], p[1], 30, 'rgba(255,90,80,.8)'); if (i) { const q = pts[i - 1]; ctx.strokeStyle = 'rgba(255,200,120,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.quadraticCurveTo((p[0] + q[0]) / 2, Math.min(p[1], q[1]) - 80, p[0], p[1]); ctx.stroke(); } });
    ctx.restore(); }
  ctx.restore();
  ctx.fillStyle = rgrad(cx, cy, r * .9, r * 1.25, [[0, 'rgba(90,150,255,.35)'], [1, 'rgba(90,150,255,0)']]); ctx.beginPath(); ctx.arc(cx, cy, r * 1.25, 0, 7); ctx.fill();
}
// Austrian Alps at dawn
function alps(t) {
  bg('#ffb27a', '#f6d7b8'); ctx.fillStyle = grad(0, 0, 0, 600, [[0, '#4b6fb0'], [.6, '#e6a27a'], [1, '#ffd2a0']]); ctx.fillRect(0, 0, W, 700);
  glow(1400, 520, 500, 'rgba(255,230,170,.7)');
  const ridge = (y0, amp, col, seed, snow) => { const R = rnd(seed); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); let x = 0; const pts = [];
    while (x <= W + 100) { const y = y0 - R() * amp; pts.push([x, y]); x += 80 + R() * 160; } pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(W, H); ctx.fill();
    if (snow) { ctx.fillStyle = 'rgba(255,255,255,.9)'; pts.forEach((p, i) => { if (p[1] < y0 - amp * .55) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] - 40, p[1] + 50); ctx.lineTo(p[0] + 40, p[1] + 50); ctx.fill(); } }); } };
  ridge(560, 330, '#6b6f9a', 2, true); ridge(700, 240, '#454a73', 5, true); ridge(860, 160, '#2a3050', 9, false);
  floor(900, '#2f4a2a', '#13200f');
  // chalet
  ctx.fillStyle = '#5a3a22'; ctx.fillRect(300, 820, 200, 120); ctx.fillStyle = '#3a2414'; ctx.beginPath(); ctx.moveTo(280, 830); ctx.lineTo(400, 750); ctx.lineTo(520, 830); ctx.fill();
  ctx.fillStyle = '#ffd27a'; ctx.fillRect(330, 860, 40, 34); ctx.fillRect(430, 860, 40, 34);
}
// Times-Square style billboard wall
function billboards(t, o = {}) {
  bg('#05050a', '#0c0c14');
  const boards = [[40, 60, 560, 340, 'can'], [640, 30, 640, 380, 'wings'], [1320, 80, 560, 320, 'f1'], [80, 440, 420, 300, 'bolt'], [540, 450, 840, 280, 'sky'], [1420, 440, 460, 300, 'can2']];
  boards.forEach(([x, y, w, h, k], i) => {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    const fl = .9 + .1 * Math.sin(t * 7 + i * 3);
    if (k === 'can' || k === 'can2') { ctx.fillStyle = k === 'can' ? '#0c1b5c' : '#3a0c4a'; ctx.fillRect(x, y, w, h); glow(x + w / 2, y + h / 2, w * .6, 'rgba(120,150,255,.5)'); drawCan(x + w / 2, y + h * .55, h * .78, { noShadow: true }); }
    if (k === 'wings') { ctx.fillStyle = '#e9eef6'; ctx.fillRect(x, y, w, h); wings(x + w / 2, y + h * .45, .55, .9 + Math.sin(t * 2) * .05, {}); drawCan(x + w / 2, y + h * .58, h * .55, { noShadow: true }); }
    if (k === 'f1') { raceTrackMini(x, y, w, h, t); }
    if (k === 'bolt') { ctx.fillStyle = '#c8102e'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#ffcc00'; ctx.beginPath(); const cx = x + w / 2, cy = y + h / 2; ctx.moveTo(cx + 20, cy - 110); ctx.lineTo(cx - 60, cy + 10); ctx.lineTo(cx, cy + 10); ctx.lineTo(cx - 20, cy + 110); ctx.lineTo(cx + 60, cy - 10); ctx.lineTo(cx, cy - 10); ctx.closePath(); ctx.fill(); }
    if (k === 'sky') { ctx.fillStyle = grad(0, y, 0, y + h, [[0, '#3a7bd5'], [1, '#a6d1ff']]); ctx.fillRect(x, y, w, h); skydiver(x + w * .5 + Math.sin(t) * 40, y + h * .45, .8, t); }
    ctx.restore();
    ctx.globalAlpha = 1 - fl; ctx.fillStyle = '#000'; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1;
    ctx.strokeStyle = '#222'; ctx.lineWidth = 8; ctx.strokeRect(x, y, w, h);
    glow(x + w / 2, y + h / 2, w * .7, 'rgba(255,255,255,.06)');
  });
  floor(780, '#15151c', '#050507');
  // yellow cab
  const cx = ((t * 260) % (W + 600)) - 300; ctx.fillStyle = '#f2c200'; rr(cx, 860, 300, 80, 18); ctx.fill(); ctx.fillRect(cx + 60, 820, 170, 50);
  ctx.fillStyle = '#9fc3e8'; ctx.fillRect(cx + 72, 828, 66, 36); ctx.fillRect(cx + 150, 828, 66, 36); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(cx + 70, 940, 26, 0, 7); ctx.arc(cx + 230, 940, 26, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; ctx.fillRect(cx + 120, 806, 60, 16); ctx.fillStyle = '#c00'; ctx.fillRect(cx + 290, 880, 10, 14);
}
function raceTrackMini(x, y, w, h, t) {
  ctx.fillStyle = '#1a1d26'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#3a3c42'; ctx.fillRect(x, y + h * .55, w, h * .45);
  ctx.save(); ctx.translate(x + w / 2 + Math.sin(t * 3) * 30, y + h * .72); f1Car(0, 0, w / 900, { wheel: t * 20, blurWheels: true }); ctx.restore();
  ctx.globalAlpha = .3; ctx.fillStyle = '#fff'; for (let i = 0; i < 8; i++) ctx.fillRect(x + ((i * 97 - t * 900) % w + w) % w, y + h * .6 + i * 12, 80, 2); ctx.globalAlpha = 1;
}
function skydiver(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 1.3) * .1);
  ctx.strokeStyle = '#111'; ctx.lineCap = 'round';
  ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-40, -10); ctx.lineTo(40, -10); ctx.stroke();
  ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(-36, -10); ctx.lineTo(-70, -40); ctx.lineTo(-90, -20); ctx.moveTo(36, -10); ctx.lineTo(70, -40); ctx.lineTo(90, -20);
  ctx.moveTo(-30, -6); ctx.lineTo(-60, 30); ctx.lineTo(-70, 60); ctx.moveTo(30, -6); ctx.lineTo(60, 30); ctx.lineTo(70, 60); ctx.stroke();
  ctx.fillStyle = '#1f36a8'; rr(-44, -26, 88, 32, 12); ctx.fill(); ctx.fillStyle = '#c8102e'; ctx.beginPath(); ctx.arc(0, -36, 16, 0, 7); ctx.fill();
  ctx.restore();
}
// TV set showing a hand-drawn style cartoon commercial (guy drinks → wings)
function tvCartoon(x, y, w, t, prog0) {
  const h = w * .62;
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#111'; rr(-w / 2 - 30, -h / 2 - 30, w + 60, h + 60, 24); ctx.fill();
  ctx.fillStyle = '#2b2b2b'; ctx.fillRect(-60, h / 2 + 30, 120, 50); ctx.fillRect(-160, h / 2 + 76, 320, 12);
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
  ctx.fillStyle = '#f7f3ea'; ctx.fillRect(-w / 2, -h / 2, w, h);
  // sketchy line drawing
  const p = prog0; ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const wob = (k) => Math.sin(t * 9 + k) * 1.5;
  const lift = eio(clamp((p - .55) / .45)) * h * .22, gx = -w * .05;
  ctx.save(); ctx.translate(gx, -lift);
  ctx.beginPath(); ctx.ellipse(0 + wob(1), -h * .18, w * .045, w * .055, 0, 0, 7); ctx.stroke(); // head
  ctx.beginPath(); ctx.moveTo(0, -h * .1); ctx.lineTo(wob(2), h * .12); ctx.moveTo(0, h * .12); ctx.lineTo(-w * .04, h * .3); ctx.moveTo(0, h * .12); ctx.lineTo(w * .04 + wob(3), h * .3);
  const armUp = clamp(p / .3); ctx.moveTo(0, -h * .04); ctx.lineTo(w * .05, -h * .04 - armUp * h * .08); ctx.moveTo(0, -h * .04); ctx.lineTo(-w * .05, h * .04); ctx.stroke();
  // little can in hand
  ctx.fillStyle = '#2a44b8'; ctx.fillRect(w * .045, -h * .1 - armUp * h * .08, w * .02, h * .07);
  ctx.beginPath(); ctx.arc(-w * .015, -h * .19, 2.5, 0, 7); ctx.arc(w * .015, -h * .19, 2.5, 0, 7); ctx.fill(); // eyes
  ctx.beginPath(); ctx.arc(0, -h * .16, w * .015, .2, Math.PI - .2); ctx.stroke(); // smile
  // sketch wings appear
  const wg = clamp((p - .35) / .25);
  if (wg > 0) for (const sd of [-1, 1]) { ctx.save(); ctx.scale(sd, 1); ctx.globalAlpha = wg; ctx.beginPath(); ctx.moveTo(w * .02, -h * .06);
    ctx.quadraticCurveTo(w * .14, -h * .3 - Math.sin(t * 12) * h * .04 * (p > .55 ? 1 : 0), w * .22, -h * .2); ctx.quadraticCurveTo(w * .16, -h * .12, w * .2, -h * .06);
    ctx.quadraticCurveTo(w * .12, -h * .06, w * .14, 0); ctx.quadraticCurveTo(w * .07, -h * .02, w * .02, -h * .02); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.beginPath(); ctx.moveTo(-w / 2, h * .32); ctx.lineTo(w / 2, h * .32 + wob(5)); ctx.stroke(); // ground line
  // scanlines + glass
  ctx.globalAlpha = .06; ctx.fillStyle = '#000'; for (let i = 0; i < h; i += 4) ctx.fillRect(-w / 2, -h / 2 + i, w, 2); ctx.globalAlpha = 1;
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, 'rgba(255,255,255,.12)'], [.4, 'rgba(255,255,255,0)']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.restore(); ctx.restore();
}
// smartphone with a social feed
function phone(x, y, h, t, posts, o = {}) {
  const w = h * .49;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(-w / 2 + 16, -h / 2 + 20, w, h, w * .14); ctx.fill();
  ctx.fillStyle = '#0d0e12'; rr(-w / 2, -h / 2, w, h, w * .14); ctx.fill();
  ctx.save(); rr(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, w * .11); ctx.clip();
  ctx.fillStyle = '#f2f3f5'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = '#fff'; ctx.fillRect(-w / 2, -h / 2, w, h * .08); ctx.fillStyle = '#e3262f'; ctx.beginPath(); ctx.arc(-w * .35, -h / 2 + h * .045, h * .018, 0, 7); ctx.fill();
  const scroll = o.scroll || 0;
  posts.forEach((pp, i) => { const py = -h / 2 + h * .1 + i * h * .3 - scroll; if (py > h / 2) return;
    ctx.fillStyle = '#fff'; rr(-w / 2 + 20, py, w - 40, h * .27, 16); ctx.fill();
    ctx.fillStyle = pp.c || '#8aa'; ctx.beginPath(); ctx.arc(-w / 2 + 50, py + 30, 16, 0, 7); ctx.fill();
    ctx.fillStyle = '#bbb'; ctx.fillRect(-w / 2 + 76, py + 22, 110, 10);
    ctx.fillStyle = '#222'; ctx.font = `700 ${h * .026}px ${F_HEAD}`; ctx.textAlign = 'left'; (pp.text || '').split('\n').forEach((l, k) => ctx.fillText(l, -w / 2 + 34, py + 76 + k * h * .032));
    if (pp.img) { ctx.save(); ctx.beginPath(); rr(-w / 2 + 34, py + h * .12, w - 68, h * .1, 10); ctx.clip(); ctx.fillStyle = '#dde3ee'; ctx.fillRect(-w / 2, py + h * .12, w, h * .1); pp.img(0, py + h * .17, h * .1); ctx.restore(); }
    ctx.fillStyle = '#e3262f'; ctx.font = `600 ${h * .022}px ${F_HEAD}`; ctx.fillText('♥ ' + (pp.likes || '12K') + '   😂 ' + (pp.laughs || '4.1K'), -w / 2 + 34, py + h * .255);
  });
  ctx.restore();
  ctx.fillStyle = '#0d0e12'; rr(-w * .16, -h / 2 + 18, w * .32, h * .03, 12); ctx.fill();
  ctx.restore();
}
// TV news studio desk with breaking-news graphics (no anchor face — a monitor wall)
function newsStudio(t, o = {}) {
  bg('#06102a', '#020611');
  for (let i = 0; i < 7; i++) { ctx.fillStyle = `rgba(40,90,200,${.08 + .04 * Math.sin(t + i)})`; ctx.fillRect(i * 290, 0, 270, 700); }
  glow(960, 300, 900, 'rgba(60,120,255,.25)');
  // monitor wall
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const x = 360 + i * 410, y = 110 + j * 250; ctx.fillStyle = '#0b1230'; ctx.fillRect(x, y, 390, 230);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, 390, 230); ctx.clip();
    if ((i + j) % 3 === 0) drawCan(x + 195, y + 125, 180, { noShadow: true }); else if ((i + j) % 3 === 1) { courthouseMini(x + 195, y + 200, .32); } else { globe(x + 195, y + 115, 80, t, { net: true }); }
    ctx.restore(); ctx.strokeStyle = '#223'; ctx.lineWidth = 6; ctx.strokeRect(x, y, 390, 230); }
  // desk
  ctx.fillStyle = grad(0, 700, 0, 900, [[0, '#1d2c5c'], [1, '#0a1230']]); ctx.beginPath(); ctx.moveTo(300, 720); ctx.lineTo(1620, 720); ctx.lineTo(1700, 900); ctx.lineTo(220, 900); ctx.fill();
  ctx.fillStyle = '#c8102e'; ctx.fillRect(300, 720, 1320, 10);
  floor(900, '#0a0f20', '#020409');
}
function courthouseMini(cx, base, s) {
  ctx.save(); ctx.translate(cx, base); ctx.scale(s, s);
  ctx.fillStyle = '#e9e3d6'; ctx.fillRect(-600, -480, 1200, 400); ctx.beginPath(); ctx.moveTo(-660, -500); ctx.lineTo(0, -680); ctx.lineTo(660, -500); ctx.fill();
  for (let i = 0; i < 8; i++) { const x = -540 + i * 154; ctx.fillStyle = grad(x - 32, 0, x + 32, 0, [[0, '#a9a192'], [.4, '#f6f1e6'], [1, '#8e8678']]); ctx.fillRect(x - 32, -480, 64, 400); }
  ctx.fillStyle = '#d8d2c6'; ctx.fillRect(-680, -80, 1360, 80);
  ctx.restore();
}
// lab bench (testing claims)
function lab(t) {
  bg('#e7eef3', '#c8d3dc');
  for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(i * 260, 0, 120, 620); }
  floor(700, '#f4f6f8', '#b8c2cc');
  ctx.fillStyle = '#2b3442'; ctx.fillRect(0, 690, W, 18);
  // glassware
  const flask = (x, col, lv) => { ctx.save(); ctx.translate(x, 690); ctx.strokeStyle = 'rgba(60,80,100,.6)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-18, -200); ctx.lineTo(-18, -120); ctx.lineTo(-70, 0); ctx.lineTo(70, 0); ctx.lineTo(18, -120); ctx.lineTo(18, -200); ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-70 + 52 * (1 - lv), -120 * lv); ctx.lineTo(70 - 52 * (1 - lv), -120 * lv); ctx.lineTo(70, 0); ctx.lineTo(-70, 0); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-50, -60, 10, 50); ctx.restore(); };
  flask(300, 'rgba(255,200,40,.6)', .6); flask(520, 'rgba(60,120,255,.5)', .45);
  for (let i = 0; i < 6; i++) { ctx.strokeStyle = 'rgba(60,80,100,.6)'; ctx.lineWidth = 3; rr(1400 + i * 60, 520, 34, 170, 14); ctx.stroke(); ctx.fillStyle = ['#e8b931', '#c8102e', '#2f9e6b', '#1f36a8', '#e8b931', '#c8102e'][i]; ctx.fillRect(1404 + i * 60, 600 - i * 6, 26, 86 + i * 6); }
  // monitor with chart
  ctx.fillStyle = '#1b1d22'; rr(780, 300, 540, 340, 10); ctx.fill(); ctx.fillStyle = '#0d1a2e'; ctx.fillRect(796, 316, 508, 308);
  ctx.strokeStyle = 'rgba(120,180,255,.25)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(816, 340 + i * 50); ctx.lineTo(1284, 340 + i * 50); ctx.stroke(); }
}
function caffeine(x, y, s, t, col = '#fff') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * .5) * .1); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round';
  const hex = (cx, cy, r) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + Math.PI / 6; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } ctx.closePath(); ctx.stroke(); };
  hex(0, 0, 60); ctx.beginPath(); ctx.moveTo(52, -30); ctx.lineTo(110, -50); ctx.lineTo(140, 0); ctx.lineTo(110, 50); ctx.lineTo(52, 30); ctx.stroke();
  const atoms = [[-52, -30, 'O'], [0, -60, 'N'], [52, 30, 'N'], [-52, 30, 'N'], [110, -50, 'N'], [0, 60, 'O']];
  atoms.forEach(([ax, ay, l]) => { ctx.fillStyle = l === 'O' ? '#e3262f' : '#3a7bd5'; ctx.beginPath(); ctx.arc(ax, ay, 14, 0, 7); ctx.fill(); });
  ctx.restore();
}
function coffeeCup(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#f2ede4'; ctx.beginPath(); ctx.moveTo(-70, -120); ctx.lineTo(70, -120); ctx.lineTo(56, 60); ctx.lineTo(-56, 60); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#5a3a22'; ctx.fillRect(-64, -60, 128, 50); ctx.fillStyle = '#2a1a0e'; rr(-78, -146, 156, 30, 8); ctx.fill();
  for (let k = 0; k < 3; k++) { ctx.strokeStyle = `rgba(255,255,255,${.3})`; ctx.lineWidth = 6; ctx.beginPath(); const sx = -30 + k * 30; ctx.moveTo(sx, -160);
    ctx.bezierCurveTo(sx + Math.sin(t * 2 + k) * 20, -200, sx - Math.sin(t * 2 + k) * 20, -230, sx, -270); ctx.stroke(); }
  ctx.restore();
}
// big justice scales
function scales(x, y, s, tilt, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const gold = grad(-200, 0, 200, 0, [[0, '#8a6a20'], [.5, '#f0d27a'], [1, '#8a6a20']]);
  ctx.fillStyle = gold; ctx.fillRect(-10, -300, 20, 380); rr(-110, 70, 220, 26, 8); ctx.fill(); ctx.beginPath(); ctx.arc(0, -310, 18, 0, 7); ctx.fill();
  ctx.save(); ctx.translate(0, -280); ctx.rotate(tilt); ctx.fillRect(-260, -6, 520, 12);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 250, 0); ctx.rotate(-tilt); ctx.strokeStyle = '#c9a54a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, 170); ctx.moveTo(0, 0); ctx.lineTo(80, 170); ctx.stroke();
    ctx.fillStyle = gold; ctx.beginPath(); ctx.ellipse(0, 175, 100, 22, 0, 0, Math.PI); ctx.fill();
    if (o[sd < 0 ? 'left' : 'right']) o[sd < 0 ? 'left' : 'right'](0, 150);
    ctx.restore(); }
  ctx.restore(); ctx.restore();
}
function handshake(x, y, s, p) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const k = eout(p);
  for (const sd of [-1, 1]) { ctx.save(); ctx.scale(sd, 1); ctx.translate(-lerp(380, 0, k), 0);
    ctx.fillStyle = sd < 0 ? '#1c2234' : '#3a3f4c'; ctx.beginPath(); ctx.moveTo(-600, -70); ctx.lineTo(-140, -60); ctx.lineTo(-120, 60); ctx.lineTo(-600, 80); ctx.fill();
    ctx.fillStyle = '#f2f2f2'; ctx.fillRect(-150, -64, 34, 128);
    ctx.fillStyle = sd < 0 ? '#e0ac8a' : '#c98d6b'; ctx.beginPath(); ctx.moveTo(-120, -54); ctx.quadraticCurveTo(-30, -80, 30, -40); ctx.quadraticCurveTo(60, -10, 20, 20); ctx.quadraticCurveTo(-40, 60, -120, 54); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.15)'; ctx.lineWidth = 3; for (let f = 0; f < 3; f++) { ctx.beginPath(); ctx.moveTo(-10 + f * 12, -40 + f * 6); ctx.lineTo(20 + f * 4, 10 + f * 4); ctx.stroke(); }
    ctx.restore(); }
  ctx.restore();
}
function docStack(x, y, n, s, col = '#f3efe6') {
  for (let i = 0; i < n; i++) { ctx.save(); ctx.translate(x + Math.sin(i * 7) * 6 * s, y - i * 9 * s); ctx.rotate(Math.sin(i * 3.1) * .03);
    ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(-160 * s + 4, -10 * s + 4, 320 * s, 14 * s);
    ctx.fillStyle = i % 5 === 4 ? '#d6b77c' : col; ctx.fillRect(-160 * s, -10 * s, 320 * s, 12 * s); ctx.restore(); }
}
function paperDoc(x, y, w, rot, title, o = {}) {
  const h = w * 1.3; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 14, w, h);
  ctx.fillStyle = '#f6f3ea'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = '#1a1a1a'; ctx.textAlign = 'center'; ctx.font = `700 ${w * .05}px ${F_SERIF}`; (title || '').split('\n').forEach((l, i) => ctx.fillText(l, 0, -h / 2 + w * .14 + i * w * .065));
  ctx.fillStyle = '#9a9a9a'; for (let i = 0; i < 14; i++) ctx.fillRect(-w / 2 + w * .1, -h / 2 + w * .3 + i * w * .055, w * (.8 - (i % 4 === 3 ? .3 : 0)), w * .014);
  if (o.hl) { ctx.fillStyle = 'rgba(255,230,40,.5)'; o.hl.forEach(([row, p]) => ctx.fillRect(-w / 2 + w * .09, -h / 2 + w * .29 + row * w * .055, w * .82 * clamp(p), w * .03)); }
  if (o.sign) { ctx.strokeStyle = '#1b2c8a'; ctx.lineWidth = 3; ctx.beginPath(); const sp = clamp(o.sign); for (let i = 0; i <= 40 * sp; i++) { const u = i / 40; ctx.lineTo(-w * .3 + u * w * .5, h / 2 - w * .15 + Math.sin(u * 18) * w * .03 * Math.sin(u * 3)); } ctx.stroke(); }
  ctx.restore();
}
function calendarPage(x, y, s, month, num, year, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; rr(-150 + 10, -170 + 14, 300, 340, 18); ctx.fill();
  ctx.fillStyle = '#fbfaf6'; rr(-150, -170, 300, 340, 18); ctx.fill();
  ctx.fillStyle = '#c8102e'; rr(-150, -170, 300, 90, 18); ctx.fill(); ctx.fillRect(-150, -110, 300, 30);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = `800 40px ${F_HEAD}`; ctx.fillText(month, 0, -112);
  if (num) { ctx.fillStyle = '#1a1a1a'; ctx.font = `900 130px ${F_HEAD}`; ctx.fillText(num, 0, 60); ctx.fillStyle = '#666'; ctx.font = `700 34px ${F_HEAD}`; ctx.fillText(year, 0, 130); }
  else { ctx.fillStyle = '#1a1a1a'; ctx.font = `900 100px ${F_HEAD}`; ctx.fillText(year, 0, 70); }
  for (const k of [-90, 90]) { ctx.fillStyle = '#444'; rr(k - 10, -190, 20, 50, 8); ctx.fill(); }
  ctx.restore();
}
function giantCheck(x, y, w, amount, payee, rot, o = {}) {
  const h = w * .45; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w, h);
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#e9f3e4'], [1, '#cfe3c8']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = '#7da36f'; ctx.lineWidth = 4; ctx.strokeRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28);
  ctx.fillStyle = '#2f4a30'; ctx.textAlign = 'left'; ctx.font = `700 ${w * .028}px ${F_SERIF}`; ctx.fillText('PAY TO THE ORDER OF', -w / 2 + w * .05, -h / 2 + h * .32);
  ctx.font = `italic 700 ${w * .045}px ${F_SERIF}`; ctx.fillStyle = '#1b2c8a'; ctx.fillText(payee, -w / 2 + w * .32, -h / 2 + h * .33);
  ctx.fillStyle = '#2f4a30'; ctx.fillRect(-w / 2 + w * .3, -h / 2 + h * .36, w * .45, 2);
  ctx.fillStyle = '#fff'; rr(w * .2, -h / 2 + h * .2, w * .26, h * .2, 6); ctx.fill(); ctx.strokeStyle = '#2f4a30'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#1a1a1a'; ctx.font = `900 ${w * .05}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillText(amount, w * .33, -h / 2 + h * .345);
  ctx.fillStyle = '#9ab38e'; for (let i = 0; i < 3; i++) ctx.fillRect(-w / 2 + w * .05, h * .05 + i * h * .12, w * .55, 2);
  if (o.sign) { ctx.strokeStyle = '#1b2c8a'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; ctx.lineTo(w * .1 + u * w * .3, h * .3 + Math.sin(u * 14) * h * .04); } ctx.stroke(); }
  ctx.restore();
}
function moneyJar(x, y, s, fill, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(200,230,255,.12)'; rr(-150, -260, 300, 330, 40); ctx.fill(); ctx.strokeStyle = 'rgba(220,240,255,.6)'; ctx.lineWidth = 5; ctx.stroke();
  ctx.save(); rr(-146, -256, 292, 322, 38); ctx.clip();
  const lv = lerp(66, -230, fill); const R = rnd(4);
  for (let i = 0; i < 160; i++) { const cx = -130 + R() * 260, cy = 60 - R() * (60 - lv); if (cy < lv) continue; ctx.fillStyle = R() > .5 ? '#d9b44a' : '#a8c39c'; ctx.beginPath(); ctx.ellipse(cx, cy, 16, 9, R() * 3, 0, 7); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = '#6b6f78'; rr(-120, -300, 240, 46, 10); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-120, -230, 18, 260);
  ctx.restore();
}
function pieChart(x, y, r, slices, p) {
  let a0 = -Math.PI / 2; const tot = slices.reduce((s, q) => s + q[0], 0);
  slices.forEach(([v, col, lbl], i) => { const a1 = a0 + (v / tot) * Math.PI * 2 * eio(clamp(p)); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#0a0d16'; ctx.lineWidth = 6; ctx.stroke();
    if (lbl && p > .95) { const am = (a0 + a1) / 2; label(lbl, x + Math.cos(am) * r * 1.35, y + Math.sin(am) * r * 1.35 + 10, 30, { weight: 700, color: col }); }
    a0 = a1; });
  ctx.fillStyle = '#0a0d16'; ctx.beginPath(); ctx.arc(x, y, r * .5, 0, 7); ctx.fill();
}
function hourglass(x, y, s, p, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t) * .02);
  ctx.fillStyle = '#5a3a22'; rr(-120, -220, 240, 24, 6); ctx.fill(); rr(-120, 196, 240, 24, 6); ctx.fill();
  ctx.strokeStyle = 'rgba(220,235,255,.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-90, -196); ctx.quadraticCurveTo(-90, -40, -8, 0); ctx.quadraticCurveTo(-90, 40, -90, 196);
  ctx.moveTo(90, -196); ctx.quadraticCurveTo(90, -40, 8, 0); ctx.quadraticCurveTo(90, 40, 90, 196); ctx.stroke();
  ctx.fillStyle = '#e8c27a'; const top = lerp(-150, -10, p); ctx.beginPath(); ctx.moveTo(-80 * (1 - (top + 196) / 200), top); ctx.lineTo(80 * (1 - (top + 196) / 200), top); ctx.lineTo(0, -6); ctx.fill();
  const bh = lerp(10, 150, p); ctx.beginPath(); ctx.moveTo(-86, 194); ctx.lineTo(86, 194); ctx.lineTo(0, 194 - bh); ctx.fill();
  ctx.fillRect(-2, -6, 4, 196 - bh);
  ctx.restore();
}
function laptopForm(x, y, s, p, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#1b1d22'; rr(-420, -300, 840, 520, 18); ctx.fill(); ctx.fillStyle = '#f4f6fa'; ctx.fillRect(-396, -276, 792, 472);
  ctx.fillStyle = '#c4ccd8'; ctx.beginPath(); ctx.moveTo(-480, 220); ctx.lineTo(480, 220); ctx.lineTo(520, 260); ctx.lineTo(-520, 260); ctx.fill();
  ctx.fillStyle = '#1f36a8'; ctx.fillRect(-396, -276, 792, 70); ctx.fillStyle = '#fff'; ctx.font = `800 30px ${F_HEAD}`; ctx.textAlign = 'left'; ctx.fillText(o.title || 'SETTLEMENT CLAIM FORM', -370, -230);
  const fields = o.fields || ['Full name', 'Address', 'State', 'Email'];
  fields.forEach((f, i) => { ctx.fillStyle = '#556'; ctx.font = `600 22px ${F_HEAD}`; ctx.fillText(f, -360, -160 + i * 76); ctx.strokeStyle = '#c4ccd8'; ctx.lineWidth = 2; ctx.strokeRect(-360, -148 + i * 76, 460, 40);
    const fp = clamp(p * fields.length - i); ctx.fillStyle = '#223'; ctx.fillRect(-350, -134 + i * 76, 300 * fp, 12); });
  if (o.choice) { ['$10 CASH', '$15 PRODUCT'].forEach((c, i) => { const sel = o.choice === i + 1; ctx.fillStyle = sel ? '#2f9e6b' : '#eef1f5'; rr(150, -150 + i * 110, 210, 80, 14); ctx.fill(); ctx.fillStyle = sel ? '#fff' : '#334'; ctx.font = `800 28px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillText(c, 255, -100 + i * 110); }); }
  ctx.restore();
}
function receipt(x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(rot);
  ctx.fillStyle = '#fbfbf7'; ctx.beginPath(); ctx.moveTo(-110, -220); ctx.lineTo(110, -220); for (let i = 0; i <= 11; i++) ctx.lineTo(110 - i * 20, 220 + (i % 2 ? -10 : 0)); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#333'; ctx.font = `700 22px "JetBrains Mono", monospace`; ctx.textAlign = 'center'; ctx.fillText('FOOD MART', 0, -180);
  ctx.font = `500 18px "JetBrains Mono", monospace`; ['ENERGY DRINK  2.99', 'ENERGY DRINK  2.99', 'TAX           0.42', '------------------', 'TOTAL         6.40'].forEach((l, i) => ctx.fillText(l, 0, -120 + i * 34));
  ctx.restore();
}
function chessKing(x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, 0); ctx.lineTo(40, -30); ctx.lineTo(28, -140); ctx.quadraticCurveTo(50, -170, 20, -190); ctx.lineTo(-20, -190); ctx.quadraticCurveTo(-50, -170, -28, -140); ctx.lineTo(-40, -30); ctx.fill();
  ctx.fillRect(-5, -240, 10, 50); ctx.fillRect(-20, -225, 40, 10); ctx.restore(); }
function bubble(x, y, w, h, col, tail = 1) { ctx.fillStyle = col; rr(x - w / 2, y - h / 2, w, h, h * .35); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - w * .25 * tail, y + h / 2 - 2); ctx.lineTo(x - w * .32 * tail, y + h / 2 + 26); ctx.lineTo(x - w * .1 * tail, y + h / 2 - 2); ctx.fill(); }
function motocross(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.25 + Math.sin(t * 2) * .05);
  ctx.strokeStyle = '#111'; ctx.lineWidth = 12; for (const wx of [-90, 90]) { ctx.beginPath(); ctx.arc(wx, 40, 48, 0, 7); ctx.stroke(); }
  ctx.fillStyle = '#1f36a8'; ctx.beginPath(); ctx.moveTo(-90, 40); ctx.lineTo(-20, -20); ctx.lineTo(60, -24); ctx.lineTo(90, 40); ctx.lineTo(20, 10); ctx.fill();
  ctx.fillStyle = '#c8102e'; ctx.fillRect(-30, -40, 80, 18);
  ctx.strokeStyle = '#222'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(10, -100); ctx.moveTo(10, -90); ctx.lineTo(60, -60); ctx.moveTo(0, -30); ctx.lineTo(30, 0); ctx.stroke();
  ctx.fillStyle = '#e8b931'; ctx.beginPath(); ctx.arc(14, -122, 22, 0, 7); ctx.fill();
  ctx.restore();
}
