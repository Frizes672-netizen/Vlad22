// ===== YouTube Short (1080×1920, EN): "She fell 33,000 feet" — Vesna Vulović, January 1972 =====
const VESNA = (o = {}) => Object.assign({ fem: true, top: '#24406e', pants: '#1d2a44', hair: '#2a1a12', shoe: '#141414', scarf: '#c8202e', light: 1 }, o);
const HONKE = (o = {}) => Object.assign({ top: '#4a3b2e', pants: '#2d2a28', hair: '#9a958e', shoe: '#1c1a19', cap: '#3b342c', light: 1 }, o);
const SKYB = '#0b2a5c', ALT = '#ff5a4f';

// ---------- sky / clouds ----------
function highSky(t, o = {}) { ctx.fillStyle = grad(0, 0, 0, H, [[0, o.top || '#06183a'], [.55, o.mid || '#1f5aa6'], [1, o.bot || '#9cc7ec']]); ctx.fillRect(0, 0, W, H);
  if (o.sun !== false) { glow(o.sx || 860, o.sy || 260, 520, 'rgba(255,240,210,.55)'); ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(o.sx || 860, o.sy || 260, 46, 0, 7); ctx.fill(); } }
function cloudPuff(x, y, r, a = .9, tint = '255,255,255') { ctx.save(); ctx.globalAlpha *= a; const R = rnd(Math.floor(x * 7 + y * 3));
  for (let i = 0; i < 7; i++) { const px = x + (R() - .5) * r * 1.8, py = y + (R() - .5) * r * .5, rr0 = r * (.45 + R() * .45);
    ctx.fillStyle = rgrad(px, py - rr0 * .3, rr0 * .1, rr0, [[0, `rgba(${tint},1)`], [.65, `rgba(${tint},.85)`], [1, `rgba(${tint},0)`]]); ctx.beginPath(); ctx.arc(px, py, rr0, 0, 7); ctx.fill(); }
  ctx.fillStyle = rgrad(x, y + r * .4, 0, r * 1.2, [[0, 'rgba(120,140,170,.25)'], [1, 'rgba(120,140,170,0)']]); ctx.beginPath(); ctx.arc(x, y + r * .4, r * 1.2, 0, 7); ctx.fill(); ctx.restore(); }
function cloudLayer(t, speed, seed, n, size, a, yOff = 0) { const R = rnd(seed); for (let i = 0; i < n; i++) { const x = R() * (W + 400) - 200, y0 = R() * (H + 800);
  const y = ((y0 - t * speed) % (H + 800) + H + 800) % (H + 800) - 400 + yOff; cloudPuff(x, y, size * (.7 + R() * .6), a); } }
function cloudSea(y, t, a = 1) { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) cloudPuff((i * 97 + t * 8) % (W + 300) - 150, y + Math.sin(i * 1.7) * 30, 170, .95); ctx.fillStyle = grad(0, y + 60, 0, H, [[0, '#eef4fa'], [1, '#c9d9ea']]); ctx.fillRect(0, y + 60, W, H); ctx.restore(); }
function speedLines(t, a = .35, n = 40, up = true) { const R = rnd(77); ctx.save(); ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 3; ctx.beginPath();
  for (let i = 0; i < n; i++) { const x = R() * W, len = 120 + R() * 260, y = ((R() * H - t * (1800 + R() * 900) * (up ? 1 : -1)) % H + H) % H; ctx.moveTo(x, y); ctx.lineTo(x, y + len); } ctx.stroke(); ctx.restore(); }

// ---------- 1972 jet airliner (side view, facing right, generic livery) ----------
// L = 1000 units long; parts: 'full' | 'front' | 'tail'; split at x = 640
function jetShape(part) { const p = new Path2D();
  if (part !== 'tail') { p.moveTo(640, -55); p.lineTo(80, -55); p.bezierCurveTo(10, -55, -40, -20, -60, 10); p.bezierCurveTo(-40, 45, 10, 55, 80, 55); p.lineTo(640, 55);
    if (part === 'front') { p.lineTo(655, 30); p.lineTo(630, 10); p.lineTo(660, -10); p.lineTo(635, -35); p.closePath(); } else p.lineTo(640, 55); }
  if (part !== 'front') { if (part === 'tail') { p.moveTo(640, -55); p.lineTo(625, -30); p.lineTo(650, -8); p.lineTo(622, 14); p.lineTo(648, 34); p.lineTo(640, 55); } else p.lineTo(640, 55);
    p.lineTo(900, 45); p.quadraticCurveTo(990, 30, 1000, -20); p.lineTo(990, -40); p.lineTo(640, -55); p.closePath(); }
  return p; }
function jet(x, y, s, o = {}) { const part = o.part || 'full'; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); ctx.translate(-500, 0);
  // wing (behind) + engine
  if (part !== 'tail') { ctx.fillStyle = '#9aa6b4'; ctx.beginPath(); ctx.moveTo(380, 30); ctx.lineTo(560, 40); ctx.lineTo(640, 110); ctx.lineTo(600, 112); ctx.closePath(); ctx.fill(); }
  if (part !== 'front') { // T-tail fin + stabilizer
    ctx.fillStyle = grad(0, -330, 0, -50, [[0, '#d7dde4'], [1, '#f2f5f8']]); ctx.beginPath(); ctx.moveTo(800, -50); ctx.lineTo(905, -320); ctx.lineTo(975, -320); ctx.lineTo(990, -40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c8202e'; ctx.beginPath(); ctx.moveTo(850, -180); ctx.lineTo(930, -200); ctx.lineTo(945, -240); ctx.lineTo(866, -222); ctx.fill(); ctx.fillStyle = '#1d4d9c'; ctx.beginPath(); ctx.moveTo(835, -140); ctx.lineTo(925, -160); ctx.lineTo(935, -190); ctx.lineTo(848, -172); ctx.fill();
    ctx.fillStyle = '#c3ccd6'; ctx.beginPath(); ctx.moveTo(880, -322); ctx.lineTo(1040, -330); ctx.lineTo(1050, -312); ctx.lineTo(890, -306); ctx.fill(); }
  const fus = jetShape(part); ctx.fillStyle = grad(0, -55, 0, 55, [[0, '#ffffff'], [.55, '#e9edf1'], [1, '#b8c2cc']]); ctx.fill(fus);
  ctx.save(); ctx.clip(fus); ctx.fillStyle = '#1d4d9c'; ctx.fillRect(-80, 8, 1100, 14); ctx.fillStyle = '#c8202e'; ctx.fillRect(-80, 24, 1100, 5);
  ctx.fillStyle = '#26364c'; for (let i = 0; i < 24; i++) { const wx = 120 + i * 30; if (wx > 860) break; rr(wx, -18, 15, 20, 7); ctx.fill(); }
  ctx.fillStyle = '#1b2533'; ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(10, -30); ctx.lineTo(45, -30); ctx.lineTo(40, -10); ctx.fill(); // cockpit
  ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 2; ctx.strokeRect(70, -38, 26, 64); ctx.strokeRect(700, -38, 26, 60); ctx.restore();
  if (part !== 'front') { ctx.fillStyle = grad(0, -70, 0, 0, [[0, '#e3e8ee'], [1, '#9aa6b4']]); rr(690, -75, 210, 62, 30); ctx.fill(); ctx.fillStyle = '#2a3340'; rr(690, -70, 26, 52, 12); ctx.fill(); ctx.fillStyle = '#c3ccd6'; ctx.fillRect(760, -14, 40, 14); } // rear engine
  if (o.fire) { const R = rnd(Math.floor((o.t || 0) * 20)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 12; i++) { const fx = (part === 'tail' ? 630 : 650) + (R() - .5) * 30, fy = (R() - .5) * 90;
      ctx.fillStyle = rgrad(fx, fy, 0, 60 + R() * 50, [[0, 'rgba(255,240,180,.9)'], [.4, 'rgba(255,140,40,.6)'], [1, 'rgba(255,60,0,0)']]); ctx.beginPath(); ctx.arc(fx, fy, 110, 0, 7); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
function smokeTrail(x, y, t, ang, len, seed = 3) { const R = rnd(seed); for (let i = 0; i < 16; i++) { const k = i / 16, px = x - Math.cos(ang) * len * k + (R() - .5) * 40, py = y - Math.sin(ang) * len * k + (R() - .5) * 40;
  ctx.fillStyle = `rgba(40,40,46,${.45 * (1 - k)})`; ctx.beginPath(); ctx.arc(px, py, 30 + k * 90, 0, 7); ctx.fill(); } }
function debris(x, y, k, seed = 9, n = 30) { const R = rnd(seed); for (let i = 0; i < n; i++) { const a = R() * 6.28, d = eout(k) * (80 + R() * 520), px = x + Math.cos(a) * d, py = y + Math.sin(a) * d + k * k * 300, sz = 6 + R() * 20;
  ctx.save(); ctx.translate(px, py); ctx.rotate(R() * 6 + k * 8); ctx.fillStyle = R() > .3 ? '#c9d1da' : '#3a3f48'; ctx.fillRect(-sz, -sz * .4, sz * 2, sz * .8); ctx.restore(); } }
function altimeter(x, y, s, ft, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(-260, -95, 520, 190, 30); ctx.fill(); ctx.strokeStyle = o.col || ALT; ctx.lineWidth = 4; rr(-260, -95, 520, 190, 30); ctx.stroke();
  label('ALTITUDE', 0, -50, 30, { weight: 900, color: 'rgba(255,255,255,.7)', spacing: 8 });
  ctx.font = `700 96px ${MONO}`; ctx.textAlign = 'center'; ctx.fillStyle = o.col || ALT; ctx.shadowColor = o.col || ALT; ctx.shadowBlur = 30; ctx.fillText(Math.max(0, Math.round(ft)).toLocaleString('en-US') + ' FT', 0, 55); ctx.restore(); }
function parachuteX(x, y, s, p) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fill(); ctx.fillStyle = '#f2f2f2'; ctx.beginPath(); ctx.arc(0, -10, 80, Math.PI, 0); ctx.quadraticCurveTo(40, -30, 0, -10); ctx.quadraticCurveTo(-40, -30, -80, -10); ctx.fill();
  ctx.strokeStyle = '#f2f2f2'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-80, -10); ctx.lineTo(0, 70); ctx.lineTo(80, -10); ctx.moveTo(0, -10); ctx.lineTo(0, 70); ctx.stroke(); ctx.restore(); bigX(x, y, 220 * s * k, prog(p, .4, 1)); }
function ecg(t, y, a = 1, col = '#5dff9a') { ctx.save(); ctx.strokeStyle = col; ctx.globalAlpha *= a; ctx.lineWidth = 7; ctx.shadowColor = col; ctx.shadowBlur = 24; ctx.beginPath();
  const head = (t * 600) % (W + 200); for (let x = 0; x <= Math.min(W, head); x += 6) { const ph = ((x % 360) / 360); let v = 0;
    if (ph > .4 && ph < .44) v = -40; else if (ph >= .44 && ph < .48) v = 150; else if (ph >= .48 && ph < .52) v = -200; else if (ph >= .52 && ph < .56) v = 60; ctx.lineTo(x, y - v * .5); }
  ctx.stroke(); ctx.restore(); }
// ---------- ground / forest ----------
function pine(x, y, h, snow = .7, col = '#1f3b2e') { ctx.fillStyle = '#2a1c14'; ctx.fillRect(x - h * .03, y - h * .15, h * .06, h * .15);
  for (let i = 0; i < 4; i++) { const ty = y - h * (.12 + i * .2), w = h * (.36 - i * .07); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - w, ty); ctx.lineTo(x, ty - h * .34); ctx.lineTo(x + w, ty); ctx.closePath(); ctx.fill();
    ctx.fillStyle = `rgba(245,248,252,${snow})`; ctx.beginPath(); ctx.moveTo(x - w * .7, ty - h * .07); ctx.lineTo(x, ty - h * .34); ctx.lineTo(x + w * .5, ty - h * .1); ctx.quadraticCurveTo(x, ty - h * .16, x - w * .7, ty - h * .07); ctx.fill(); } }
function mountains(t, o = {}) { ctx.fillStyle = grad(0, 0, 0, H, [[0, o.s1 || '#9aa8b8'], [1, o.s2 || '#dfe6ee']]); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c5ced8'; ctx.beginPath(); ctx.moveTo(0, 820); ctx.lineTo(200, 560); ctx.lineTo(380, 720); ctx.lineTo(620, 480); ctx.lineTo(860, 700); ctx.lineTo(1080, 560); ctx.lineTo(1080, 1100); ctx.lineTo(0, 1100); ctx.fill();
  ctx.fillStyle = '#eef2f6'; ctx.beginPath(); ctx.moveTo(560, 540); ctx.lineTo(620, 480); ctx.lineTo(690, 545); ctx.lineTo(640, 530); ctx.fill(); ctx.beginPath(); ctx.moveTo(160, 610); ctx.lineTo(200, 560); ctx.lineTo(250, 605); ctx.fill();
  const R = rnd(4); for (let i = 0; i < 26; i++) pine(R() * W, 860 + R() * 120, 110 + R() * 60, .6, '#4b6157');
  ctx.fillStyle = grad(0, 950, 0, H, [[0, '#e9eef3'], [1, '#c7d2dc']]); ctx.beginPath(); ctx.moveTo(0, 1000); ctx.quadraticCurveTo(540, 900, W, 1040); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); }
function forestFront(t, seed = 8) { const R = rnd(seed); for (let i = 0; i < 6; i++) { const x = R() * W, h = 700 + R() * 450; pine(x, 1200 + R() * 60, h, .75, '#1d3529'); } }
function cabin(t, o = {}) { // DC-9 cabin in one-point perspective
  bg('#3a3f46', '#1b1e22'); const vx = 540, vy = 760; ctx.fillStyle = '#d9d4c8'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(vx + 120, vy - 90); ctx.lineTo(vx - 120, vy - 90); ctx.fill(); // ceiling
  ctx.fillStyle = '#bfb8aa'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx - 120, vy - 90); ctx.lineTo(vx - 150, vy); ctx.lineTo(0, 520); ctx.fill(); ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(vx + 120, vy - 90); ctx.lineTo(vx + 150, vy); ctx.lineTo(W, 520); ctx.fill(); // bins
  ctx.fillStyle = '#5b4a3a'; ctx.beginPath(); ctx.moveTo(380, H); ctx.lineTo(vx - 30, vy + 40); ctx.lineTo(vx + 30, vy + 40); ctx.lineTo(700, H); ctx.fill(); // aisle carpet
  for (let i = 0; i < 9; i++) { const k = Math.pow(.78, i), sy0 = vy + 40 + (H - vy) * k * .95, w0 = 520 * k, hh = 300 * k;
    for (const sd of [-1, 1]) { const x0 = vx + sd * (60 + 300 * k); ctx.fillStyle = shade('#2f5b8a', .7 + .3 * k); rr(sd < 0 ? x0 - w0 : x0, sy0 - hh, w0, hh, 18 * k); ctx.fill(); ctx.fillStyle = shade('#e9e4d8', .8 + .2 * k); ctx.fillRect(sd < 0 ? x0 - w0 : x0, sy0 - hh, w0, hh * .18); } }
  for (let i = 0; i < 6; i++) { const k = Math.pow(.75, i); for (const sd of [-1, 1]) { ctx.fillStyle = `rgba(190,220,255,${.5 * k + .2})`; const wx = vx + sd * (180 + 360 * k); rr(wx - 22 * k, vy - 60 - 250 * k, 44 * k, 64 * k, 18 * k); ctx.fill(); } }
  glow(vx, 120, 600, 'rgba(255,240,210,.25)'); }
function foodCart(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, 6, 150, 16, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(-130, 0, 130, 0, [[0, '#8f99a4'], [.5, '#d9dfe5'], [1, '#7c8690']]); rr(-130, -420, 260, 410, 14); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 3;
  for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-120, -420 + i * 68); ctx.lineTo(120, -420 + i * 68); ctx.stroke(); } ctx.fillStyle = '#3a3f48'; rr(-40, -390, 80, 18, 8); ctx.fill();
  ctx.fillStyle = '#e8e4da'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-60 + i * 60, -430, 26, 9, 0, 0, 7); ctx.fill(); } ctx.fillStyle = '#121418'; for (const wx of [-100, 100]) { ctx.beginPath(); ctx.arc(wx, -4, 14, 0, 7); ctx.fill(); } ctx.restore(); }
function skeleton(x, y, s, t, marks) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = 'rgba(200,235,255,.85)'; ctx.fillStyle = 'rgba(200,235,255,.85)'; ctx.lineCap = 'round'; ctx.lineWidth = 16;
  ctx.beginPath(); ctx.ellipse(0, -820, 70, 85, 0, 0, 7); ctx.lineWidth = 10; ctx.stroke(); ctx.fillStyle = 'rgba(200,235,255,.2)'; ctx.fill(); ctx.fillStyle = 'rgba(200,235,255,.85)';
  for (let i = 0; i < 17; i++) { rr(-16, -720 + i * 22, 32, 16, 5); ctx.fill(); }
  ctx.lineWidth = 7; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(0, -620 + i * 34, 110 - i * 6, 22, 0, .15, Math.PI - .15); ctx.stroke(); }
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-130, -680); ctx.lineTo(130, -680); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -330, 110, 55, 0, 0, 7); ctx.stroke();
  for (const sd of [-1, 1]) { ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(sd * 140, -670); ctx.lineTo(sd * 170, -470); ctx.lineTo(sd * 180, -280); ctx.stroke(); ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(sd * 70, -300); ctx.lineTo(sd * 85, 0); ctx.lineTo(sd * 90, 300); ctx.stroke(); }
  (marks || []).forEach(([mx, my, p, lbl, side]) => { if (p <= 0) return; const r = 60 + 10 * Math.sin(t * 6); ctx.save(); ctx.globalAlpha = clamp(p * 2); ctx.strokeStyle = RED; ctx.lineWidth = 9; ctx.shadowColor = RED; ctx.shadowBlur = 30; ctx.beginPath(); ctx.arc(mx, my, r, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx + side * r, my); ctx.lineTo(mx + side * 260, my); ctx.stroke(); ctx.shadowBlur = 0; label(lbl, mx + side * 270, my + 18, 54, { weight: 900, color: '#fff', align: side > 0 ? 'left' : 'right' }); ctx.restore(); });
  ctx.restore(); }
function hospitalRoom(t) { bg('#c9d3d6', '#8c999e'); ctx.fillStyle = '#b4c0c4'; ctx.fillRect(0, 1100, W, H); ctx.fillStyle = grad(0, 200, 0, 800, [[0, '#dde8f0'], [1, '#f2f5f7']]); ctx.fillRect(660, 220, 340, 520);
  ctx.strokeStyle = '#7f8b90'; ctx.lineWidth = 14; ctx.strokeRect(660, 220, 340, 520); glow(830, 480, 600, 'rgba(255,255,255,.35)'); godRays(830, 220, .05, '230,240,255'); }
function bed(x, y, w) { ctx.fillStyle = '#e9edf0'; rr(x - w / 2, y - 60, w, 140, 20); ctx.fill(); ctx.fillStyle = '#9aa6ad'; ctx.fillRect(x - w / 2, y + 80, w, 24); ctx.fillStyle = '#6d7880'; ctx.fillRect(x - w / 2 + 20, y + 100, 16, 160); ctx.fillRect(x + w / 2 - 36, y + 100, 16, 160); }
function monitor(x, y, t, flat) { ctx.fillStyle = '#20262c'; rr(x - 170, y - 120, 340, 240, 20); ctx.fill(); ctx.fillStyle = '#05140c'; rr(x - 150, y - 100, 300, 170, 12); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.rect(x - 150, y - 100, 300, 170); ctx.clip(); ctx.translate(x - 150, y - 20); ctx.scale(300 / W, .5); ecg(t, 0, 1); ctx.restore(); label(flat ? '' : '62', x + 120, y + 100, 34, { weight: 900, color: '#5dff9a', align: 'right' }); }
function certificate(x, y, w, p) { const h = w * .72; ctx.save(); ctx.translate(x, y); const k = eback(clamp(p)); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(-w / 2 + 16, -h / 2 + 20, w, h); ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#fbf6e8'], [1, '#e9dcb8']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = '#b8902e'; ctx.lineWidth = 10; ctx.strokeRect(-w / 2 + 24, -h / 2 + 24, w - 48, h - 48); ctx.lineWidth = 2; ctx.strokeRect(-w / 2 + 40, -h / 2 + 40, w - 80, h - 80);
  ctx.textAlign = 'center'; ctx.fillStyle = '#1b1b1b'; ctx.font = `700 ${w * .07}px "Liberation Serif", serif`; ctx.fillText('WORLD RECORD', 0, -h / 2 + w * .16);
  ctx.font = `italic 400 ${w * .038}px "Liberation Serif", serif`; ctx.fillText('Highest fall survived without a parachute', 0, -h / 2 + w * .25);
  ctx.font = `900 ${w * .1}px "Liberation Serif", serif`; ctx.fillStyle = '#8a1c1c'; ctx.fillText('10,160 m', 0, -h / 2 + w * .39); ctx.font = `700 ${w * .045}px "Liberation Serif", serif`; ctx.fillStyle = '#1b1b1b'; ctx.fillText('(33,330 ft) · 26 January 1972', 0, -h / 2 + w * .46);
  ctx.fillStyle = '#d4a62a'; ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? 62 : 74; ctx.lineTo(w * .3 + Math.cos(a) * r, h * .26 + Math.sin(a) * r); } ctx.fill(); ctx.fillStyle = '#b8902e'; ctx.beginPath(); ctx.arc(w * .3, h * .26, 46, 0, 7); ctx.fill();
  ctx.strokeStyle = '#25334d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-w * .32, h * .3); ctx.bezierCurveTo(-w * .22, h * .2, -w * .18, h * .36, -w * .05, h * .26); ctx.stroke(); ctx.restore(); }
function planeWindow(t, x, y, w) { const h = w * 1.35; ctx.save(); ctx.fillStyle = '#d9d4c8'; ctx.fillRect(0, 0, W, H); glow(x, y, w * 1.2, 'rgba(255,255,255,.4)');
  ctx.fillStyle = '#c4beb1'; rr(x - w * .7, y - h * .7, w * 1.4, h * 1.4, w * .5); ctx.fill(); const p = new Path2D(); p.ellipse(x, y, w / 2, h / 2, 0, 0, 7); ctx.clip(p);
  highSky(t, { sx: x + 140, sy: y - 200 }); cloudSea(y + 160, t); ctx.restore(); ctx.strokeStyle = '#a69f91'; ctx.lineWidth = 26; ctx.beginPath(); ctx.ellipse(x, y, w / 2 + 10, h / 2 + 10, 0, 0, 7); ctx.stroke(); }

// ================== SCENES ==================
SC.hookFall = { // FIRST FRAME: the jet tears apart in the sky and Vesna falls out of it, towards the camera
  draw(t, d, P, E) { const tp = E('parachute', 1, 3), ts = E('survived', 1, 5.2);
    highSky(t, { top: '#041230', mid: '#1b4f95', bot: '#7fb0e0', sx: 880, sy: 170 }); cloudLayer(t, 260, 3, 6, 240, .45);
    // the broken airliner above, drifting apart, fire and smoke
    const k = .35 + t * .06, px = 560, py = 360 - t * 40; smokeTrail(px - 120 - k * 120, py + k * 60, t, -Math.PI / 2 + .9, 420, 2); smokeTrail(px + 120 + k * 150, py + k * 120, t, -Math.PI / 2 - .5, 460, 5);
    jet(px - 110 - k * 140, py + k * 40, .42, { part: 'front', rot: -.25 - k * .5, fire: true, t }); jet(px + 110 + k * 160, py + k * 110, .42, { part: 'tail', rot: .35 + k * .9, fire: true, t }); debris(px, py + 40, .45 + t * .08, 8, 46);
    glow(px, py + 30, 360, `rgba(255,170,80,${.35 + .15 * Math.sin(t * 17)})`);
    // Vesna, falling towards us, tumbling slowly
    const zoom = lerp(.72, 1.0, eio(prog(t, 0, d))), rot = -.3 + Math.sin(t * .9) * .3 + t * .1, hh = 950 * zoom, cx = 540 + Math.sin(t * 1.3) * 40, cy = 1000 + Math.sin(t * 2) * 20;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); person(0, hh * .5, hh, VESNA({ fall: true, fallT: t, shadow: false, light: 1, rim: 'rgba(255,200,140,.6)' })); ctx.restore();
    cloudLayer(t, 1500, 11, 4, 240, .38); speedLines(t, .32);
    altimeter(540, 1560, .95, lerp(33330, 0, Math.pow(prog(t, 0, d + 6), 1.2)));
    parachuteX(860, 1250, .7, prog(t, tp - .2, tp + .3));
    if (t > ts - .15) { const kk = prog(t, ts - .15, ts + .1); ctx.fillStyle = `rgba(255,255,255,${(1 - prog(t, ts + .1, ts + .7)) * kk})`; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, 140, W, 260); ecg(t - ts, 330, 1); label('SHE SURVIVED', 540, 240, 76, { weight: 900, color: '#5dff9a', shadow: 'rgba(80,255,150,.8)' }); }
    else label('33,000 FT. NO PARACHUTE.', 540, 230, 54, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)' }); },
  sfx(d, P, E) { return [[0, 'wind', .55, { dur: d }], [0, 'boom', .3], [0, 'whoosh', .4], [E('parachute', 1, 3) - .2, 'pop', .35], [E('survived', 1, 5.2) - .15, 'boom', .35], [E('survived', 1, 5.2), 'beeps', .4]]; }
};
SC.airport1972 = {
  draw(t, d, P, E) { const tv = E('vesna', 1, 2.6); ctx.fillStyle = grad(0, 0, 0, H, [[0, '#1b2a4a'], [.6, '#c46a4a'], [1, '#e8a070']]); ctx.fillRect(0, 0, W, H); glow(800, 900, 700, 'rgba(255,170,100,.5)');
    blurred(4, () => { ctx.fillStyle = '#2a2f38'; ctx.fillRect(0, 980, W, 30); ctx.fillStyle = '#1d222a'; ctx.fillRect(40, 820, 360, 160); ctx.fillRect(160, 700, 60, 120); ctx.fillStyle = '#ffd99a'; for (let i = 0; i < 8; i++) ctx.fillRect(60 + i * 42, 860, 28, 40); }, 'apt');
    ctx.fillStyle = grad(0, 1000, 0, H, [[0, '#4a4f58'], [1, '#22252b']]); ctx.fillRect(0, 1000, W, H); ctx.fillStyle = 'rgba(255,220,120,.6)'; for (let i = 0; i < 6; i++) ctx.fillRect(i * 200 - (t * 40) % 200, 1180, 100, 8);
    jet(620 - t * 25, 1040, .78, {}); calendarPage(230, 330, .9, 'JAN', '26', '1972', { rot: -.06 });
    if (t > tv - .2) { const k = eout(prog(t, tv - .2, tv + .4)); ctx.save(); ctx.translate(720, lerp(1600, 400, k)); ctx.rotate(.05);
      ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(-230 + 12, -150 + 14, 460, 300, 20); ctx.fill(); ctx.fillStyle = '#f4f1e8'; rr(-230, -150, 460, 300, 20); ctx.fill(); ctx.fillStyle = '#1d4d9c'; rr(-230, -150, 460, 60, 20); ctx.fill(); ctx.fillRect(-230, -110, 460, 20);
      label('CABIN CREW', 0, -108, 30, { weight: 900, color: '#fff', spacing: 6 }); ctx.save(); ctx.beginPath(); ctx.rect(-200, -70, 150, 190); ctx.clip(); ctx.fillStyle = '#c9c4b6'; ctx.fillRect(-200, -70, 150, 190); person(-125, 470, 560, VESNA({ shadow: false })); ctx.restore();
      label('VESNA VULOVIĆ', 70, -10, 34, { weight: 900, color: '#111' }); label('AGE 22', 70, 40, 30, { weight: 800, color: '#555' }); label('FLIGHT ATTENDANT', 70, 90, 24, { weight: 800, color: '#1d4d9c', spacing: 2 }); ctx.restore(); } },
  sfx(d, P, E) { return [[0, 'city', .25, { dur: d }], [.3, 'whoosh', .2], [E('vesna', 1, 2.6) - .2, 'paper', .4]]; }
};
SC.mixUp = {
  draw(t, d, P, E) { const tm = E('mixed', 1, 3.4); bg('#1a1712', '#070605'); glow(540, 800, 900, 'rgba(255,220,160,.25)'); dust(t, 4, 40, .4);
    paperDoc(540, 900, 760, -.02, 'CREW ROSTER', {}); const rows = [['Capt. R. Jovanović', 0], ['F/O M. Dragović', 0], ['Vesna V.', 1], ['Vesna N.', 2], ['S. Lukić', 0]];
    rows.forEach(([n, f], i) => { const yy = 760 + i * 90; ctx.fillStyle = f === 1 ? 'rgba(255,220,60,.55)' : 'transparent'; if (f === 1 && t > tm) ctx.fillRect(250, yy - 40, 560, 56);
      label(n, 300, yy, 38, { align: 'left', weight: 700, color: f === 2 && t > tm ? '#999' : '#1b1b1b' }); if (f === 2 && t > tm) { ctx.strokeStyle = '#c8202e'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(290, yy - 12); ctx.lineTo(300 + 230 * prog(t, tm, tm + .4), yy - 12); ctx.stroke(); } });
    if (t > tm + .3) { ctx.strokeStyle = '#c8202e'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(760, 950); ctx.quadraticCurveTo(880, 900, 780, 850); ctx.stroke(); label('WRONG VESNA', 540, 1260, 56, { weight: 900, color: '#ff6b6b', alpha: prog(t, tm + .3, tm + .6) }); }
    label('SHE WASN\'T SUPPOSED TO BE ON BOARD', 540, 260, 42, { weight: 900, color: '#fff', alpha: prog(t, .2, .5) }); },
  sfx(d, P, E) { return [[0, 'paper', .35], [E('mixed', 1, 3.4), 'marker', .45]]; }
};
SC.bomb = {
  draw(t, d, P, E) { const tb = E('bomb', 1, 2.2), tx = E('explodes', 1, 2.8);
    if (t < tb - .3) { bg('#071226', '#02060e'); glow(540, 900, 900, 'rgba(60,120,220,.2)'); // route map
      ctx.strokeStyle = 'rgba(120,170,255,.4)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(220, 600); ctx.lineTo(520, 560); ctx.lineTo(760, 700); ctx.lineTo(880, 900); ctx.lineTo(600, 1050); ctx.lineTo(300, 980); ctx.closePath(); ctx.stroke(); ctx.fillStyle = 'rgba(80,130,220,.12)'; ctx.fill();
      label('CZECHOSLOVAKIA', 540, 820, 46, { weight: 900, color: 'rgba(200,220,255,.8)', spacing: 4 }); const k = eio(prog(t, 0, tb)); ctx.setLineDash([16, 14]); ctx.strokeStyle = '#ffd66b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(120, 420); ctx.lineTo(lerp(120, 560, k), lerp(420, 700, k)); ctx.stroke(); ctx.setLineDash([]);
      ctx.save(); ctx.translate(lerp(120, 560, k), lerp(420, 700, k)); ctx.rotate(.57); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(-20, -12); ctx.lineTo(-20, 12); ctx.fill(); ctx.restore(); timeStamp('16:01 · 33,330 FT', 540, 300, 46, { align: 'center', col: '#ffd66b' }); return; }
    highSky(t, { top: '#04122c', mid: '#1b4a8a', bot: '#7aa6d6' }); cloudLayer(t, 40, 5, 6, 260, .6, 300); ctx.save(); cam(560, 900, lerp(1.6, 1.3, prog(t, tb - .3, d)));
    jet(560, 900, 1, {}); const hx = 560 - 500 * 1 + 660; // luggage hold, just ahead of the split line
    if (t < tx) { ctx.fillStyle = 'rgba(255,90,60,.8)'; ctx.beginPath(); ctx.arc(hx, 935, 12 + 6 * Math.sin(t * 20), 0, 7); ctx.fill(); glow(hx, 935, 80, 'rgba(255,80,40,.7)'); }
    else { const k = prog(t, tx, tx + .8); glow(hx, 920, 900 * eout(k), `rgba(255,220,150,${1 - k * .6})`); debris(hx, 920, k, 4, 26); }
    ctx.restore(); if (t > tx && t < tx + .15) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(0, 0, W, H); }
    label('BOMB IN THE LUGGAGE HOLD', 540, 260, 46, { weight: 900, color: '#ffb3a8', alpha: prog(t, tb - .2, tb + .2) }); },
  sfx(d, P, E) { return [[0, 'hum', .25, { dur: d }], [E('explodes', 1, 2.8), 'boom', .55], [E('explodes', 1, 2.8) + .05, 'shatter', .3]]; }
};
SC.breakApart = {
  draw(t, d) { highSky(t, { top: '#04122c', mid: '#1b4a8a', bot: '#7aa6d6' }); cloudLayer(t, 120, 6, 6, 260, .6, 300); const k = eio(prog(t, 0, d));
    smokeTrail(480 - k * 120, 900 + k * 400, t, -Math.PI / 2 + .6, 500, 2); smokeTrail(660 + k * 160, 900 + k * 500, t, -Math.PI / 2 - .4, 600, 5);
    jet(460 - k * 140, 880 + k * 420, .62, { part: 'front', rot: -k * .9, fire: true, t }); jet(640 + k * 180, 880 + k * 560, .62, { part: 'tail', rot: k * 1.6, fire: true, t }); debris(560, 880, prog(t, 0, d) * .8, 8, 40);
    label('THE PLANE BREAKS APART', 540, 260, 50, { weight: 900, color: '#fff', alpha: prog(t, .2, .5) }); },
  sfx(d) { return [[0, 'wind', .45, { dur: d }], [.1, 'shatter', .3], [.4, 'whoosh', .35]]; }
};
SC.noSurvive = { // 28 on board: 27 dim, one stays lit; altitude vs Everest
  draw(t, d, P, E) { const tm = E('miles', 1, 2.2), tn = E('survive', 1, 4); bg('#060a14', '#010205'); glow(540, 800, 900, 'rgba(255,90,80,.12)');
    const dim = prog(t, .1, 1.6); for (let i = 0; i < 28; i++) { const c = i % 7, r = Math.floor(i / 7), x = 230 + c * 105, y = 330 + r * 130, last = i === 17, off = !last && i / 28 < dim;
      ctx.fillStyle = last ? '#ffd66b' : (off ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.75)'); ctx.beginPath(); ctx.arc(x, y - 30, 20, 0, 7); ctx.fill(); rr(x - 28, y - 4, 56, 54, 20); ctx.fill(); if (last && t > tn) glow(x, y, 140, 'rgba(255,210,100,.6)'); }
    label(String(Math.round(dim * 27)), 540, 920, 120, { weight: 900, color: '#ff8b8b' }); label('OF 28 ON BOARD', 540, 980, 34, { weight: 900, color: 'rgba(255,255,255,.6)', spacing: 4 });
    if (t > tm - .2) { const k = eout(prog(t, tm - .2, tm + .5)); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#4b5563'; ctx.beginPath(); ctx.moveTo(120, 1290); ctx.lineTo(330, 1080); ctx.lineTo(400, 1130); ctx.lineTo(520, 1040); ctx.lineTo(760, 1290); ctx.fill();
      ctx.fillStyle = '#eef2f6'; ctx.beginPath(); ctx.moveTo(480, 1080); ctx.lineTo(520, 1040); ctx.lineTo(565, 1085); ctx.fill(); label('EVEREST 29,032 FT', 520, 1020, 26, { weight: 800, color: '#c9d2dc' });
      ctx.strokeStyle = '#ff5a4f'; ctx.setLineDash([12, 10]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(100, 1010 - 90 * k); ctx.lineTo(980, 1010 - 90 * k); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); label('33,330 FT · 6 MILES', 860, 900, 30, { weight: 900, color: '#ff8b8b', alpha: k }); } },
  sfx(d) { return [[.1, 'ticks', .2, { dur: 1.5 }], [d - 1.6, 'heartbeat', .3, { dur: 1.6 }]]; }
};
SC.pinned = { // cut-away of the tail section: Vesna pinned by the food cart
  draw(t, d, P, E) { const tc = E('cart', 1, 2.6); highSky(t, { top: '#0a1a38', mid: '#2a5a9a', bot: '#a0c0e0' }); cloudLayer(t, 600, 9, 6, 240, .5); speedLines(t, .2, 24);
    ctx.save(); cam(540, 900, 1.0 + t * .02); ctx.translate(540, 920); ctx.rotate(.28 + Math.sin(t * 1.4) * .05); ctx.scale(1.25, 1.25);
    ctx.fillStyle = grad(0, -260, 0, 260, [[0, '#f2f5f8'], [1, '#aeb8c2']]); rr(-420, -250, 840, 500, 230); ctx.fill(); ctx.fillStyle = '#c8202e'; ctx.fillRect(-420, 120, 840, 20);
    ctx.fillStyle = '#d8d2c4'; rr(-370, -200, 740, 400, 190); ctx.fill(); ctx.fillStyle = '#5b4a3a'; ctx.fillRect(-370, 120, 740, 80); // inside
    ctx.save(); ctx.translate(-60, 110); ctx.rotate(-1.35); person(0, 0, 360, VESNA({ shadow: false, closed: 1, light: -1 })); ctx.restore();
    foodCart(120, 190, .55 + .0 * t); ctx.restore();
    if (t > tc) label('PINNED BY A FOOD CART', 540, 1270, 50, { weight: 900, color: '#ffd66b', shadow: 'rgba(0,0,0,.8)', alpha: prog(t, tc, tc + .3) });
    label('INSIDE THE TAIL', 540, 260, 50, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)', alpha: prog(t, .2, .5) }); },
  sfx(d, P, E) { return [[0, 'wind', .45, { dur: d }], [E('cart', 1, 2.6), 'clink', .35]]; }
};
SC.tailCrash = { // the tail cuts through snowy pines onto the mountainside
  draw(t, d, P, E) { const th = E('hits', 1, 1.8); mountains(t); const k = eio(prog(t, 0, th + .1)), land = t > th;
    forestFront(t); const tx = lerp(1150, 250, k), ty = lerp(-520, 1160, k); if (!land) { smokeTrail(tx, ty, t, -Math.PI / 2 + .5, 600, 4); jet(tx, ty, 1.1, { part: 'tail', rot: lerp(2.4, .5, k), t }); }
    else { const b = t - th; jet(250, 1160, 1.1, { part: 'tail', rot: .5 }); const R = rnd(3); for (let i = 0; i < 40; i++) { const a = -Math.PI * (R()), dd = eout(prog(b, 0, 1.2)) * (60 + R() * 420);
        ctx.fillStyle = `rgba(255,255,255,${.85 * (1 - prog(b, .4, 2))})`; ctx.beginPath(); ctx.arc(560 + Math.cos(a) * dd, 1330 + Math.sin(a) * dd * .6 + prog(b, 0, 2) * 80, 14 + R() * 30, 0, 7); ctx.fill(); } }
    snow(t, .7, 90, 3, .8); if (land && t - th < .2) { ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(0, 0, W, H); }
    label('A SNOWY, WOODED MOUNTAINSIDE', 540, 260, 44, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)', alpha: prog(t, th, th + .4) }); },
  sfx(d, P, E) { const th = E('hits', 1, 1.8); return [[0, 'whoosh', .45], [0, 'wind', .35, { dur: d }], [th, 'thud_soft', .6], [th + .02, 'boom', .3]]; }
};
SC.honke = { // a walker hears screaming, a former wartime medic, finds her alive
  draw(t, d, P, E) { const tsc = E('screaming', 1, 1.6), tm = E('medic', 1, 3.6), ta = E('alive', 1, 5.6); blurred(3, () => mountains(0), 'mtn');
    blurred(2, () => { for (const [px, ph] of [[40, 1050], [250, 860], [700, 980], [960, 1120], [520, 760]]) pine(px, 1250, ph, .6, '#3a5646'); }, 'midpines'); // tall pines behind him (20–30 m trees)
    ctx.fillStyle = grad(0, 1240, 0, H, [[0, '#eef2f6'], [1, '#c9d3dc']]); ctx.fillRect(0, 1250, W, H);
    jet(620, 1160, .85, { part: 'tail', rot: .5 }); const h = 430, stride = .64 * h, x = lerp(-80, 470, eout(prog(t, 0, ta)));
    person(x, 1330, h, HONKE({ walk: (x / stride) * Math.PI * 2 + .01 }));
    pine(-200, 1760, 1500, .75, '#18301f'); pine(1290, 1800, 1600, .75, '#152b1c'); snow(t, .8, 120, 6, .9);
    if (t > tsc && t < tm) for (let i = 0; i < 3; i++) { const k = ((t - tsc) * .8 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.7 * (1 - k)})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(860, 1200, 40 + k * 260, Math.PI * .9, Math.PI * 1.5); ctx.stroke(); }
    if (t > tm) { ctx.save(); ctx.translate(540, 300); const k = eback(prog(t, tm, tm + .35)); ctx.scale(k, k); ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(-280, -70, 560, 140, 30); ctx.fill(); medCrossV(-200, 0, .38); label('FORMER WWII MEDIC', 50, 14, 38, { weight: 900, color: '#1b1b1b' }); ctx.restore(); }
    if (t > ta) { label('ALIVE', 540, 520, 120, { weight: 900, color: '#5dff9a', shadow: 'rgba(0,0,0,.6)', alpha: prog(t, ta, ta + .3) }); } },
  sfx(d, P, E) { return [[0, 'wind', .4, { dur: d }], [.1, 'steps', .3, { dur: d - 1 }], [E('screaming', 1, 1.6), 'drone', .2, { dur: 1.5 }], [E('medic', 1, 3.6), 'pop', .3], [E('alive', 1, 5.6), 'chime', .4]]; }
};
function medCrossV(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#d7303a'; rr(-40, -120, 80, 240, 14); ctx.fill(); rr(-120, -40, 240, 80, 14); ctx.fill(); ctx.restore(); }
SC.injuries = {
  draw(t, d, P, E) { const ts = E('skull', 1, .5), tl = E('legs', 1, 1.6), tv = E('vertebrae', 1, 3.2); bg('#030c16', '#000306'); glow(540, 900, 900, 'rgba(80,170,255,.2)'); scanlines(.08);
    ctx.save(); cam(540, lerp(700, 900, prog(t, 0, d)), 1.0); skeleton(540, 1450, .95, t, [[0, -820, prog(t, ts, ts + .3), 'SKULL', 1], [-88, 120, prog(t, tl, tl + .3), 'LEGS', -1], [88, 140, prog(t, tl, tl + .3), '', 1], [0, -440, prog(t, tv, tv + .3), '3 VERTEBRAE', 1]]); ctx.restore();
    label('X-RAY · 1972', 540, 200, 34, { weight: 900, color: 'rgba(160,210,255,.7)', spacing: 8 }); },
  sfx(d, P, E) { return [[0, 'hum', .2, { dur: d }], [E('skull', 1, .5), 'thud_soft', .4], [E('legs', 1, 1.6), 'thud_soft', .4], [E('vertebrae', 1, 3.2), 'thud_soft', .4]]; }
};
SC.coma = {
  draw(t, d, P, E) { const tw = E('wakes', 1, 2.3), tn = E('nothing', 1, d - 1); hospitalRoom(t); const awake = prog(t, tw, tw + 1);
    ctx.save(); cam(540, lerp(900, 720, eio(prog(t, tw - .5, tw + 1))), lerp(1, 1.5, eio(prog(t, tw - .5, tw + 1)))); bed(540, 1250, 900);
    person(540, 2500, 1700, VESNA({ top: '#cfe0ea', scarf: null, closed: 1 - awake, light: -1, shadow: false, wound: 'bandage' })); ctx.fillStyle = '#eef2f4'; rr(60, 1200, 960, 500, 40); ctx.fill(); ctx.restore();
    monitor(860, 360, t, false); if (t < tw) counterBox('COMA', 'DAY ' + (1 + Math.floor(prog(t, 0, tw) * 26)), 330, 330, prog(t, .1, .4), { size: 54, accent: '#5dff9a' });
    if (t > tn - .2) { const R = rnd(2); for (let i = 0; i < 5; i++) { const k = prog(t, tn - .2 + i * .1, tn + .8 + i * .1); label('?', 200 + R() * 680, 1300 - k * 300 + R() * 80, 90 + R() * 60, { weight: 900, color: `rgba(255,255,255,${.7 * Math.sin(Math.PI * k)})` }); } label('SHE REMEMBERS NOTHING', 540, 1180, 48, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)', alpha: prog(t, tn, tn + .3) }); } },
  sfx(d) { return [[0, 'beeps', .3], [1.2, 'beeps', .3], [2.4, 'beeps', .3], [0, 'pad_swell', .25, { dur: d }]]; }
};
SC.recovery = {
  draw(t, d, P, E) { const tf = E('flying', 1, 3.4), tk = E('keep', 1, 3);
    if (t < tk - .4) { bg('#dfe5e8', '#aab5ba'); ctx.fillStyle = '#c3ccd0'; ctx.fillRect(0, 1250, W, H); ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 5; i++) ctx.fillRect(i * 260 - 40, 300, 160, 500);
      const h = 760, stride = .64 * h, x = lerp(160, 560, prog(t, 0, tk)); ctx.fillStyle = '#8f9aa1'; ctx.fillRect(60, 1000, 960, 14); ctx.fillRect(60, 1090, 960, 14); for (const px of [80, 520, 1000]) ctx.fillRect(px, 1000, 14, 260);
      person(x, 1260, h, VESNA({ top: '#cfe0ea', scarf: null, walk: (x / stride) * Math.PI * 2 + .01 })); ctx.fillStyle = '#8f9aa1'; ctx.fillRect(60, 1040, 960, 12);
      label('LEARNING TO WALK AGAIN', 540, 260, 48, { weight: 900, color: '#1d2a3a', alpha: prog(t, .2, .5) }); return; }
    highSky(t, { top: '#1f5aa6', mid: '#6aa4dc', bot: '#d9ecfa', sx: 300, sy: 300 }); cloudSea(1230, t); const k = eout(prog(t, tk - .4, d + 1)); jet(lerp(-200, 900, k), lerp(1100, 500, k), .7, { rot: -.12 });
    ctx.save(); ctx.globalAlpha = prog(t, tk - .2, tk + .3); person(300, 2300, 1500, VESNA({ light: 1 })); ctx.restore(); label('SHE WANTED TO KEEP FLYING', 540, 240, 48, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.4)', alpha: prog(t, tk, tk + .3) }); },
  sfx(d, P, E) { return [[.1, 'steps', .25, { dur: 1.4 }], [E('keep', 1, 3) - .4, 'swoosh_up', .35], [0, 'pad_swell', .2, { dur: d }]]; }
};
SC.record = {
  draw(t, d) { bg('#14100a', '#050403'); glow(540, 800, 1000, 'rgba(255,200,110,.3)'); bokeh(t, 6, 18, 'rgba(255,210,120,.15)'); dust(t, 7, 50, .45);
    ctx.save(); cam(540, 820, lerp(1.0, 1.06, prog(t, 0, d))); certificate(540, 820, 900, prog(t, .1, .6)); ctx.restore(); label('NO ONE WANTS TO BREAK IT', 540, 1260, 50, { weight: 900, color: '#ffe0a0', alpha: prog(t, 1.4, 1.8) }); },
  sfx() { return [[.1, 'gold', .4], [.3, 'paper', .3]]; }
};
SC.finalQ = {
  draw(t, d) { planeWindow(t, 540, 760, 560); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, H);
    label('WOULD YOU EVER', 540, 220, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)' }); label('FLY AGAIN?', 540, 320, 96, { weight: 900, color: '#ffd66b', shadow: 'rgba(0,0,0,.6)' });
    pill('YES', 330, 1240, 60, prog(t, .8, 1.1), '#2fbf71', '#fff'); pill('NEVER', 750, 1240, 60, prog(t, 1, 1.3), '#e3262f', '#fff'); },
  sfx(d) { return [[0, 'hum', .3, { dur: d }], [.8, 'pop', .3], [1, 'pop', .3]]; }
};
