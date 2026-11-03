// ===== YouTube Short (EN): "SPOT THE LIAR — Case #001: Room 1208" (original mystery) =====
const MAID = (o = {}) => Object.assign({ fem: true, uniform: 'maid', top: '#2f3542', pants: '#2f3542', hair: '#3a2618', shoe: '#111', light: 1 }, o);
const NEIGH = (o = {}) => Object.assign({ uniform: 'robe', top: '#b9a48c', pants: '#3a4250', hair: '#6b4a2c', shoe: '#e9e4dc', light: -1 }, o);
const GUARDN = (o = {}) => Object.assign({ uniform: 'guard', top: '#22304f', pants: '#1b2238', hair: '#2a1a12', cap: '#1b2540', shoe: '#111', light: 1 }, o);
const GOLDW = '#d9b45a', LIAR_RED = '#e3262f';

// ---------- props ----------
function goldWatch(x, y, s, rot = 0, glint = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const dir of [-1, 1]) for (let i = 0; i < 6; i++) { const yy = dir * (92 + i * 34); ctx.fillStyle = grad(-46, 0, 46, 0, [[0, '#8a6a22'], [.5, '#f2d488'], [1, '#8a6a22']]); rr(-44, yy - 15, 88, 30, 7); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-44, yy + 12, 88, 3); } // bracelet links
  ctx.fillStyle = grad(-95, -95, 95, 95, [[0, '#fff1c2'], [.4, GOLDW], [1, '#7a5a1c']]); ctx.beginPath(); ctx.arc(0, 0, 96, 0, 7); ctx.fill(); // case
  ctx.fillStyle = '#6e521a'; ctx.beginPath(); ctx.arc(0, 0, 80, 0, 7); ctx.fill(); ctx.fillStyle = grad(0, -76, 0, 76, [[0, '#fbf8ef'], [1, '#e7e0cf']]); ctx.beginPath(); ctx.arc(0, 0, 74, 0, 7); ctx.fill(); // dial
  ctx.fillStyle = '#3a2f1a'; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; ctx.save(); ctx.rotate(a); ctx.fillRect(-3, -68, 6, i % 3 ? 10 : 18); ctx.restore(); }
  ctx.strokeStyle = '#1c1a16'; ctx.lineCap = 'round'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(28, -30); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, -58); ctx.stroke();
  ctx.fillStyle = GOLDW; ctx.beginPath(); ctx.arc(0, 0, 7, 0, 7); ctx.fill(); ctx.fillStyle = grad(96, -14, 116, 14, [[0, '#f2d488'], [1, '#8a6a22']]); rr(94, -14, 22, 28, 6); ctx.fill(); // crown
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(-26, -34, 34, 16, -.6, 0, 7); ctx.fill(); // crystal reflection
  if (glint > 0) { ctx.save(); ctx.globalAlpha = glint; ctx.fillStyle = '#fff'; ctx.translate(-50, -60); for (const a of [0, Math.PI / 2]) { ctx.save(); ctx.rotate(a + .3); ctx.beginPath(); ctx.ellipse(0, 0, 70, 6, 0, 0, 7); ctx.fill(); ctx.restore(); } ctx.restore(); glow(-50, -60, 120, `rgba(255,240,200,${.7 * glint})`); }
  ctx.restore(); }
function velvetBox(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(10, 140, 300, 40, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(0, -260, 0, -60, [[0, '#1d2a5c'], [1, '#101a3e']]); ctx.beginPath(); ctx.moveTo(-250, -60); ctx.lineTo(-230, -280); ctx.lineTo(230, -280); ctx.lineTo(250, -60); ctx.closePath(); ctx.fill(); // open lid
  ctx.fillStyle = '#efe6d2'; ctx.beginPath(); ctx.moveTo(-210, -80); ctx.lineTo(-195, -250); ctx.lineTo(195, -250); ctx.lineTo(210, -80); ctx.closePath(); ctx.fill(); label('LUXE', 0, -150, 40, { weight: 900, color: '#b89a52', spacing: 10 });
  ctx.fillStyle = grad(0, -60, 0, 140, [[0, '#26357a'], [1, '#0f1838']]); rr(-260, -70, 520, 210, 18); ctx.fill(); ctx.fillStyle = '#1a2557'; rr(-220, -50, 440, 120, 40); ctx.fill(); // base + cushion
  ctx.fillStyle = 'rgba(255,255,255,.08)'; rr(-240, -64, 480, 24, 12); ctx.fill(); ctx.restore(); }
function gloveHand(x, y, s, rot, pinch = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const lea = '#202024';
  ctx.fillStyle = grad(-120, 0, 120, 0, [[0, '#0e0e10'], [.5, '#2b2b30'], [1, '#0e0e10']]); rr(-110, 120, 220, 600, 70); ctx.fill(); // sleeve
  const bh = new Path2D(); bh.moveTo(-95, 150); bh.bezierCurveTo(-120, 60, -110, -20, -90, -70); bh.lineTo(95, -70); bh.bezierCurveTo(115, -20, 120, 60, 95, 150); bh.closePath(); ctx.fillStyle = grad(-110, 0, 110, 0, [[0, '#121214'], [.45, '#3a3a40'], [1, '#141416']]); ctx.fill(bh);
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 45, 130); ctx.lineTo(-60 + i * 50, -50); ctx.stroke(); } // glove seams
  const F = [[-70, -70, 120, -.25], [-24, -76, 150, -.08 + .12 * pinch], [24, -76, 140, .05 + .2 * pinch], [70, -64, 110, .2 + .2 * pinch]];
  F.forEach(([fx, fy, L, a]) => { const tx = fx + Math.sin(a) * L, ty = fy - Math.cos(a) * L, p = fingerPath(fx, fy, tx, ty, 44, 36); fillFinger(p, fx, fy, tx, ty, 44, lea, -1); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.ellipse(tx - 6, ty + 8, 7, 14, a, 0, 7); ctx.fill(); });
  const tp = fingerPath(90, 40, 150, -60 + pinch * 20, 54, 44); fillFinger(tp, 90, 40, 150, -60, 52, lea, 1); ctx.restore(); }
function alarmBeacon(t, a = 1) { const ang = t * 6; glow(540 + Math.cos(ang) * 420, 300, 700, `rgba(255,30,40,${.35 * a * (.5 + .5 * Math.sin(ang))})`); glow(540, 120, 500, `rgba(255,40,50,${.25 * a})`); }
function wallpaper(x0, y0, w, h, c1, c2) { ctx.fillStyle = c1; ctx.fillRect(x0, y0, w, h); ctx.fillStyle = c2; for (let x = x0; x < x0 + w; x += 36) ctx.fillRect(x, y0, 12, h); }
function hotelRoom(t, o = {}) { // room 1210: tufted headboard, crisp made bed, pillow chocolate, lamps, window, connecting door
  wallpaper(0, 0, W, 1250, '#c9b48f', 'rgba(255,255,255,.07)'); ctx.fillStyle = '#a8916c'; ctx.fillRect(0, 980, W, 270); ctx.fillStyle = '#8f7a58'; ctx.fillRect(0, 975, W, 10); // wainscot
  ctx.fillStyle = grad(0, 120, 0, 900, [[0, '#0b1426'], [1, '#1b2a4a']]); ctx.fillRect(760, 150, 300, 640); const R = rnd(5); for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(255,${200 + R() * 55},${120 + R() * 80},${.5 + R() * .5})`; ctx.fillRect(775 + R() * 270, 420 + R() * 340, 8 + R() * 10, 6 + R() * 8); } // city at night
  for (const cx of [740, 1040]) { ctx.fillStyle = grad(cx - 40, 0, cx + 40, 0, [[0, '#5a1f2a'], [.5, '#7d2c3a'], [1, '#4a1822']]); ctx.fillRect(cx - 40, 120, 80, 900); }
  ctx.fillStyle = '#7b6a52'; ctx.fillRect(30, 300, 170, 640); ctx.fillStyle = '#8d7b61'; rr(48, 320, 134, 600, 6); ctx.fill(); ctx.fillStyle = '#d9c27a'; ctx.beginPath(); ctx.arc(160, 640, 10, 0, 7); ctx.fill(); ctx.fillStyle = '#c9b58c'; rr(150, 600, 22, 14, 3); ctx.fill(); // connecting door + deadbolt
  ctx.fillStyle = grad(0, 520, 0, 860, [[0, '#4a3a5a'], [1, '#2f2440']]); rr(230, 520, 500, 360, 40); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { ctx.beginPath(); ctx.arc(290 + c * 76, 580 + r * 90, 6, 0, 7); ctx.fill(); } // tufted headboard
  ctx.fillStyle = grad(0, 820, 0, 1100, [[0, '#ffffff'], [1, '#dfe2e6']]); ctx.beginPath(); ctx.moveTo(200, 860); ctx.lineTo(760, 860); ctx.lineTo(800, 1100); ctx.lineTo(160, 1100); ctx.closePath(); ctx.fill(); // perfectly made duvet
  ctx.strokeStyle = 'rgba(160,170,180,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(190, 920); ctx.lineTo(770, 920); ctx.stroke(); ctx.fillStyle = '#5b2633'; ctx.beginPath(); ctx.moveTo(176, 1010); ctx.lineTo(784, 1010); ctx.lineTo(796, 1070); ctx.lineTo(166, 1070); ctx.closePath(); ctx.fill(); // fold line + bed runner
  ctx.fillStyle = '#e8eaee'; ctx.fillRect(160, 1100, 640, 70); ctx.fillStyle = '#3a2d22'; ctx.fillRect(170, 1170, 620, 30);
  for (const px of [330, 590]) { ctx.fillStyle = grad(px - 120, 760, px + 120, 880, [[0, '#ffffff'], [1, '#d7dbe0']]); rr(px - 120, 780, 240, 100, 40); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.06)'; rr(px - 110, 860, 220, 14, 7); ctx.fill(); }
  ctx.fillStyle = grad(0, 836, 0, 880, [[0, '#7a3446'], [1, '#4e1f2c']]); rr(250, 836, 470, 44, 22); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; rr(270, 842, 430, 8, 4); ctx.fill(); // bolster cushion
  for (const nx of [120, 840]) { ctx.fillStyle = '#4a3828'; ctx.fillRect(nx - 70, 860, 140, 160); ctx.fillStyle = '#e8dcc4'; ctx.beginPath(); ctx.moveTo(nx - 46, 700); ctx.lineTo(nx + 46, 700); ctx.lineTo(nx + 62, 780); ctx.lineTo(nx - 62, 780); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#6b5a44'; ctx.fillRect(nx - 6, 780, 12, 80); glow(nx, 760, 280, 'rgba(255,200,120,.45)'); }
  ctx.fillStyle = '#111'; rr(805, 820, 80, 40, 8); ctx.fill(); label('11:52', 845, 850, 26, { weight: 900, color: '#ff4d4d', font: MONO }); // alarm clock
  ctx.fillStyle = grad(0, 1250, 0, H, [[0, '#5a3a30'], [1, '#2a1a15']]); ctx.fillRect(0, 1200, W, H); ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let i = 0; i < 12; i++) ctx.fillRect(i * 100, 1200, 50, H); }
function chocolatePiece(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.12); ctx.fillStyle = 'rgba(0,0,0,.25)'; rr(-30, -14, 64, 34, 6); ctx.fill();
  ctx.fillStyle = grad(-30, -18, 30, 18, [[0, '#fff0b0'], [.45, '#d9b45a'], [1, '#8a6a22']]); rr(-32, -20, 64, 34, 6); ctx.fill(); ctx.fillStyle = '#7d2c3a'; ctx.fillRect(-4, -20, 8, 34); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-26, -16, 18, 4); ctx.restore(); }
function laundryRoom(t) { bg('#cfd6da', '#9aa4aa'); ctx.fillStyle = '#e9eef0'; ctx.fillRect(0, 0, W, 150); ctx.fillStyle = '#fff'; rr(200, 50, 680, 26, 10); ctx.fill(); glow(540, 64, 600, 'rgba(230,255,250,.5)');
  for (let i = 0; i < 4; i++) { const x = 30 + i * 260; ctx.fillStyle = grad(x, 0, x + 240, 0, [[0, '#d8dde0'], [1, '#f4f6f7']]); rr(x, 520, 240, 440, 20); ctx.fill(); ctx.fillStyle = '#b9c1c6'; rr(x + 20, 540, 200, 40, 8); ctx.fill();
    ctx.fillStyle = '#5f6b72'; ctx.beginPath(); ctx.arc(x + 120, 760, 92, 0, 7); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x + 120, 760, 80, 0, 7); ctx.clip(); ctx.fillStyle = '#8fb4c9'; ctx.fillRect(x + 30, 680, 180, 170);
      ctx.translate(x + 120, 760); ctx.rotate(t * 3 + i); for (let k = 0; k < 4; k++) { ctx.fillStyle = ['#ffffff', '#e9eef2', '#f4efe6', '#dfe7ee'][k]; ctx.rotate(1.57); ctx.beginPath(); ctx.ellipse(28, 10, 46, 24, .4, 0, 7); ctx.fill(); } ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x + 90, 730, 30, 14, -.6, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#8a7f72'; ctx.fillRect(30, 200, 1020, 14); ctx.fillRect(30, 360, 1020, 14); for (let r = 0; r < 2; r++) for (let c = 0; c < 10; c++) { const x = 50 + c * 100, y = 200 + r * 160; for (let k = 0; k < 4; k++) { ctx.fillStyle = ['#ffffff', '#f1ede4', '#e8eef3'][(c + k) % 3]; rr(x, y - 26 - k * 26, 84, 24, 6); ctx.fill(); } } // folded towels
  floor(1000, '#b8c0c4', '#7c858a'); ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * 100, 1000); ctx.lineTo(i * 100 - 200, H); ctx.stroke(); } }
function cart(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 10, 260, 26, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#6b5a4a'; rr(-240, -420, 480, 410, 16); ctx.fill(); ctx.fillStyle = '#8a7660'; rr(-230, -410, 460, 120, 10); ctx.fill();
  for (let k = 0; k < 3; k++) { ctx.fillStyle = ['#ffffff', '#eef2f5', '#f5f0e6'][k]; rr(-210, -260 + k * 70, 200, 56, 10); ctx.fill(); rr(10, -260 + k * 70, 200, 56, 10); ctx.fill(); }
  ctx.fillStyle = '#2a2a2e'; rr(-200, -470, 200, 60, 10); ctx.fill(); for (let i = 0; i < 5; i++) { ctx.fillStyle = ['#e8f1f5', '#f5e9d8'][i % 2]; rr(-188 + i * 38, -500, 26, 40, 6); ctx.fill(); } // tray of toiletries
  ctx.fillStyle = '#3aa0d8'; rr(80, -520, 50, 110, 12); ctx.fill(); ctx.fillStyle = '#e9e9e9'; rr(90, -550, 30, 34, 6); ctx.fill(); // spray bottle
  ctx.fillStyle = '#111'; for (const wx of [-200, 200]) { ctx.beginPath(); ctx.arc(wx, 0, 22, 0, 7); ctx.fill(); } ctx.restore(); }
function corridorFeed(x, y, w, h, t, o = {}) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#2b2f2a'; ctx.fillRect(x, y, w, h); const vx = x + w / 2, vy = y + h * .42;
  ctx.fillStyle = '#4a4f44'; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(vx - w * .08, vy + h * .08); ctx.lineTo(vx + w * .08, vy + h * .08); ctx.lineTo(x + w, y + h); ctx.fill(); // carpet
  ctx.fillStyle = '#3a3f36'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(vx - w * .08, vy - h * .1); ctx.lineTo(vx - w * .08, vy + h * .08); ctx.lineTo(x, y + h); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(vx + w * .08, vy - h * .1); ctx.lineTo(vx + w * .08, vy + h * .08); ctx.lineTo(x + w, y + h); ctx.fill();
  for (const [dx, lb] of [[.18, '1208'], [.82, '1210']]) { const ddx = x + w * dx, dw = w * .09; ctx.fillStyle = '#20231e'; ctx.fillRect(ddx - dw / 2, y + h * .3, dw, h * .5); label(lb, ddx, y + h * .27, Math.max(14, w * .035), { weight: 900, color: '#dfe7da' }); }
  ctx.fillStyle = 'rgba(255,255,255,.05)'; const R = rnd(Math.floor(t * 20)); for (let i = 0; i < 120; i++) ctx.fillRect(x + R() * w, y + R() * h, 2, 2);
  ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'hsl(0,0%,50%)'; ctx.globalAlpha = .8; ctx.fillRect(x, y, w, h); ctx.restore();
  label(o.ts || 'CAM 12  23:41:08', x + 16, y + 34, Math.max(14, w * .04), { align: 'left', weight: 800, color: '#e8f5ea', font: MONO });
  if (Math.floor(t * 2) % 2 === 0) { ctx.fillStyle = '#ff3b3b'; ctx.beginPath(); ctx.arc(x + w - 30, y + 26, 8, 0, 7); ctx.fill(); } }
function securityOffice(t) { bg('#0d1117', '#05070a'); ctx.fillStyle = '#161b22'; ctx.fillRect(40, 180, 1000, 820); glow(540, 560, 800, 'rgba(120,200,160,.18)');
  corridorFeed(80, 220, 600, 400, t, { ts: 'CAM 12  23:' + String(40 + Math.floor(t / 6) % 20).padStart(2, '0') + ':' + String(Math.floor(t * 7) % 60).padStart(2, '0') });
  for (let i = 0; i < 4; i++) { const mx = 700 + (i % 2) * 170, my = 220 + Math.floor(i / 2) * 200; ctx.fillStyle = '#0a0d12'; ctx.fillRect(mx, my, 160, 190); if (i === 3) { const R = rnd(Math.floor(t * 24)); for (let k = 0; k < 260; k++) { ctx.fillStyle = `rgba(255,255,255,${R() * .5})`; ctx.fillRect(mx + 6 + R() * 148, my + 6 + R() * 178, 3, 2); } label('NO SIGNAL', mx + 80, my + 100, 18, { weight: 900, color: '#fff' }); label('CAM 16 · LOBBY', mx + 80, my + 128, 13, { weight: 800, color: '#9aa' }); } else corridorFeed(mx + 6, my + 6, 148, 178, t + i, { ts: 'CAM ' + (13 + i) }); }
  ctx.fillStyle = '#0a0d12'; ctx.fillRect(80, 640, 960, 340); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#10151c'; rr(100 + i * 310, 660, 290, 300, 10); ctx.fill(); corridorFeed(110 + i * 310, 670, 270, 280, t + 9 + i, { ts: 'CAM ' + (20 + i) }); }
  floor(1180, '#1a1f26', '#0a0d12'); }
function desk(y) { ctx.fillStyle = grad(0, y, 0, y + 60, [[0, '#3a3f46'], [1, '#22262b']]); ctx.fillRect(-20, y, W + 40, 60); ctx.fillStyle = '#1b1e22'; ctx.fillRect(-20, y + 60, W + 40, H); ctx.fillStyle = '#2a2e34'; rr(300, y - 30, 420, 40, 8); ctx.fill(); }
function coffee(x, y, t) { ctx.fillStyle = '#e9e4dc'; rr(x - 40, y - 80, 80, 90, 12); ctx.fill(); ctx.strokeStyle = '#e9e4dc'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(x + 46, y - 36, 22, -1.2, 1.2); ctx.stroke();
  for (let i = 0; i < 2; i++) { const k = (t * .4 + i / 2) % 1; ctx.strokeStyle = `rgba(255,255,255,${.3 * (1 - k)})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 10 + i * 20, y - 90 - k * 80); ctx.bezierCurveTo(x - 30 + i * 20, y - 120 - k * 80, x + 10 + i * 20, y - 140 - k * 80, x - 10 + i * 20, y - 170 - k * 80); ctx.stroke(); } }
function lineupWall(t) { bg('#3a3f47', '#1d2026'); ctx.fillStyle = '#4a5059'; ctx.fillRect(0, 300, W, 1000); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 9; i++) { const y = 380 + i * 100; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); label(`${7 - Math.floor(i / 2)}'${i % 2 ? '0' : '6'}"`, 40, y - 8, 22, { align: 'left', weight: 800, color: 'rgba(255,255,255,.5)' }); }
  for (const lx of [200, 540, 880]) glow(lx, 300, 500, 'rgba(255,250,235,.25)'); floor(1300, '#2a2e34', '#121418'); }
function caseStamp(x, y, s, p, txt = 'CASE #001') { stamp(txt, x, y, p, { color: '#ffd23f', size: 64 * s, rot: -.06 }); }
function suspectCard(x, y, w, n, name, paint, o = {}) { polaroid(x, y, w, o.rot || 0, paint, name, { tint: 'rgba(255,240,220,.35)' }); if (o.liar > 0) stamp('LIAR', x, y - w * .05, o.liar, { color: LIAR_RED, size: w * .22, rot: -.2 });
  label(String(n), x - w * .38, y - w * .5, w * .12, { weight: 900, color: '#111' }); }
function floorPlan(t, pathK, o = {}) { // top-down: rooms 1208 & 1210, hallway with the camera cone, connecting door
  bg('#0d1b2a', '#07101a'); ctx.strokeStyle = 'rgba(120,170,220,.12)'; ctx.lineWidth = 1; for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  const L = { x: 120, y: 420, w: 400, h: 560 }, Rm = { x: 560, y: 420, w: 400, h: 560 }; ctx.lineWidth = 12; ctx.strokeStyle = '#e8f1ff';
  for (const r of [L, Rm]) { ctx.strokeRect(r.x, r.y, r.w, r.h); } ctx.fillStyle = 'rgba(120,170,220,.08)'; ctx.fillRect(L.x, L.y, L.w, L.h); ctx.fillRect(Rm.x, Rm.y, Rm.w, Rm.h);
  label('1208', L.x + L.w / 2, L.y + 70, 56, { weight: 900, color: '#e8f1ff' }); label('1210', Rm.x + Rm.w / 2, Rm.y + 70, 56, { weight: 900, color: '#e8f1ff' });
  ctx.fillStyle = '#0d1b2a'; ctx.fillRect(510, 640, 60, 120); ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(520, 640, 110, 0, Math.PI / 2); ctx.stroke(); label('CONNECTING DOOR', 540, 800, 26, { weight: 900, color: '#ffd23f', alpha: o.door ?? 1 }); // connecting door
  ctx.fillStyle = '#0d1b2a'; ctx.fillRect(250, 970, 140, 24); ctx.fillRect(690, 970, 140, 24); // room doors
  ctx.fillStyle = 'rgba(232,241,255,.05)'; ctx.fillRect(60, 1000, 960, 200); label('HALLWAY', 540, 1120, 40, { weight: 900, color: 'rgba(232,241,255,.6)', spacing: 8 });
  ctx.fillStyle = 'rgba(255,80,80,.16)'; ctx.beginPath(); ctx.moveTo(990, 1100); ctx.lineTo(70, 1010); ctx.lineTo(70, 1190); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff5a5a'; rr(975, 1080, 50, 40, 8); ctx.fill(); label('CAM', 1000, 1150, 24, { weight: 900, color: '#ff8a8a' }); // camera cone
  ctx.fillStyle = '#e8f1ff'; rr(Rm.x + 220, Rm.y + 160, 150, 220, 16); ctx.fill(); label('BED', Rm.x + 295, Rm.y + 280, 26, { weight: 900, color: '#0d1b2a' }); // bed (not slept in)
  ctx.fillStyle = '#1d2a5c'; rr(L.x + 60, L.y + 160, 110, 70, 10); ctx.fill(); label('SAFE', L.x + 115, L.y + 205, 24, { weight: 900, color: '#ffd23f' });
  if (pathK > 0) { const pts = [[Rm.x + 200, Rm.y + 470], [Rm.x + 60, Rm.y + 280], [520, 700], [L.x + 300, L.y + 260], [L.x + 115, L.y + 250]]; ctx.strokeStyle = '#ff4d5a'; ctx.lineWidth = 10; ctx.setLineDash([24, 16]); ctx.lineDashOffset = -t * 60; ctx.beginPath();
    let total = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; } let rem = total * clamp(pathK); ctx.moveTo(pts[0][0], pts[0][1]); let end = pts[0];
    for (let i = 1; i < pts.length && rem > 0; i++) { const k = Math.min(1, rem / seg[i - 1]); end = [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; ctx.lineTo(end[0], end[1]); rem -= seg[i - 1]; } ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#ff4d5a'; ctx.beginPath(); ctx.arc(end[0], end[1], 22, 0, 7); ctx.fill(); glow(end[0], end[1], 90, 'rgba(255,60,80,.7)'); } }

// ================== SCENES ==================
SC.hook = { // FRAME 0: a gloved hand lifts the gold watch out of its box; alarm light; "ONE OF THEM IS LYING"
  draw(t, d, P, E) { const t1 = E('one', 1, 3.6), t2 = E('spot', 1, 6.2);
    if (t < t1 - .2) { bg('#1a0d10', '#07040a'); woodTable(1120, { c1: '#4a2e1c', c2: '#1a100a' }); alarmBeacon(t); ctx.save(); cam(540, 960, lerp(1.12, 1.0, eout(prog(t, 0, t1))));
      velvetBox(540, 1180, 1.1); const k = eio(prog(t, 0, t1 - .2)), wx = 540 + k * 30, wy = lerp(1000, 780, k), th = Math.PI + .55;
      gloveHand(wx + 118 * .95, wy - 193 * .95, .95, th, 1); goldWatch(wx, wy, 1.0, -.15 + k * .2, .6 + .4 * Math.sin(t * 6)); ctx.restore();
      bigTitle('ONE OF THEM IS LYING', 270, 1, { size: 76, col: '#fff', glow: 'rgba(255,60,70,.6)' }); label('ROOM 1208 · $2,000,000', 540, 380, 40, { weight: 900, color: '#ffd23f' }); return; }
    lineupWall(t); const z = t < t2 - .1 ? 1 : lerp(1, 1.06, prog(t, t2 - .1, d)); ctx.save(); cam(540, 900, z);
    person(200, 1900, 1250, MAID()); person(540, 1910, 1300, NEIGH()); person(880, 1900, 1290, GUARDN()); ctx.restore();
    ['1', '2', '3'].forEach((n, i) => { ctx.fillStyle = '#111'; rr(140 + i * 340, 1200, 120, 80, 10); ctx.fill(); label(n, 200 + i * 340, 1262, 56, { weight: 900, color: '#fff' }); });
    bigTitle('ONE OF THEM IS LYING', 270, 1, { size: 76, col: '#fff', glow: 'rgba(255,60,70,.6)' }); if (t > t2 - .1) caseStamp(540, 400, 1, prog(t, t2 - .1, t2 + .25)); },
  sfx(d, P, E) { return [[0, 'alarm', .3, { dur: E('one', 1, 3.6) }], [0, 'boom', .35], [E('one', 1, 3.6) - .2, 'shutter', .45], [E('spot', 1, 6.2) - .1, 'stamp', .45]]; }
};
SC.maid = {
  draw(t, d, P, E) { const tl = E('laundry', 1, 3.6); laundryRoom(t); cart(270, 1250, 1.0); ctx.save(); cam(540, 900, 1.0 + t * .015); person(760, 2050, 1500, MAID({ keycard: true, mouth: Math.abs(Math.sin(t * 12)) * .5 })); ctx.restore();
    counterBox('SUSPECT #1', 'THE MAID', 540, 300, prog(t, 0, .25), { size: 58, accent: '#ffd23f' }); if (t > tl - .2) label('“LAUNDRY ROOM · ALL NIGHT”', 540, 470, 38, { weight: 900, color: '#1b1f24', alpha: prog(t, tl - .2, tl + .1) }); },
  sfx(d) { return [[0, 'washer', .35, { dur: d }], [0, 'pop', .3]]; }
};
SC.neighbor = { // the clue is in plain sight: crisp bed, chocolate still on the pillow
  draw(t, d, P, E) { hotelRoom(t); ctx.save(); cam(540, 900, 1.0 + t * .012); person(860, 2080, 1480, NEIGH({ pocketGold: true, mouth: Math.abs(Math.sin(t * 11)) * .5 })); ctx.restore();
    counterBox('SUSPECT #2', 'THE MAN NEXT DOOR', 540, 300, prog(t, 0, .25), { size: 50, accent: '#ffd23f' }); label('“ASLEEP SINCE 9 PM”', 540, 470, 40, { weight: 900, color: '#2a1f14', alpha: prog(t, 1, 1.3) }); },
  sfx(d) { return [[0, 'hum', .25, { dur: d }], [0, 'pop', .3]]; }
};
SC.guard = {
  draw(t, d, P, E) { const tn = E('nobody', 1, 3); securityOffice(t); ctx.save(); cam(540, 900, 1.0); person(300, 2150, 1500, GUARDN({ light: 1, mouth: Math.abs(Math.sin(t * 12)) * .5 })); desk(1300); coffee(820, 1300, t); ctx.restore();
    counterBox('SUSPECT #3', 'THE NIGHT GUARD', 540, 300, prog(t, 0, .25), { size: 52, accent: '#ffd23f' }); if (t > tn - .2) label('“NOBODY IN THE HALLWAY”', 540, 470, 38, { weight: 900, color: '#e8f5ea', alpha: prog(t, tn - .2, tn + .1) }); },
  sfx(d) { return [[0, 'hum', .3, { dur: d }], [0, 'pop', .3]]; }
};
SC.countdown = { // 3 seconds to decide
  draw(t, d, P, E) { const ts = E('seconds', 1, 1.2) + .25; bg('#101318', '#050608'); glow(540, 900, 900, 'rgba(255,210,80,.18)');
    suspectCard(190, 760, 300, 1, 'The maid', () => { laundryRoom(0); person(540, 2100, 1650, MAID()); }, { rot: -.05 });
    suspectCard(540, 730, 300, 2, 'Next door', () => { hotelRoom(0); person(560, 2100, 1650, NEIGH()); }, { rot: .02 });
    suspectCard(890, 760, 300, 3, 'The guard', () => { securityOffice(0); person(540, 2100, 1650, GUARDN()); }, { rot: .05 });
    bigTitle("WHO'S LYING?", 300, prog(t, 0, .25), { size: 96, col: '#ffd23f' });
    if (t > ts) { const left = 3 - (t - ts), n = Math.max(1, Math.ceil(left)); const frac = left - Math.floor(left); if (left > 0) { dayRing(540, 1150, 120, 1 - (t - ts) / 3, '#ffd23f'); bigNum(String(n), 540, 1150, 170, '#fff', { glow: 'rgba(255,210,80,.8)' }); } } },
  sfx(d, P, E) { const ts = E('seconds', 1, 1.2) + .25; return [[ts, 'tick', .5], [ts + 1, 'tick', .5], [ts + 2, 'tick', .5]]; }
};
const POCKET_CAM = [860 - 7.4 * 14.8, 2080 - 67.6 * 14.8]; // the robe pocket of the neighbor in the room shot (h = 1480)
function pocketZoom(t, z) { bg('#101318', '#050608'); ctx.save(); cam(lerp(540, POCKET_CAM[0], eio(clamp(z))), lerp(960, POCKET_CAM[1], eio(clamp(z))), lerp(1.0, 2.8, eio(clamp(z)))); hotelRoom(t); person(860, 2080, 1480, NEIGH({ pocketGold: true })); ctx.restore(); }
SC.liar = { // "It's the man next door."
  draw(t, d) { bg('#101318', '#050608'); glow(540, 900, 900, 'rgba(255,60,70,.2)'); suspectCard(540, 820, 520, 2, 'Next door', () => { hotelRoom(0); person(560, 2100, 1650, NEIGH({ pocketGold: true })); }, { liar: prog(t, .1, .4) }); },
  sfx() { return [[.1, 'stamp', .5]]; }
};
SC.pocket = { // look at his robe pocket — that gold "button" is the watch's bracelet
  draw(t, d, P, E) { const tb = E('button', 1, 2.2), tr = E('bracelet', 1, 4.6);
    if (t < tr - .2) { pocketZoom(t, prog(t, 0, 1.2)); if (t > .9) { const k = eback(prog(t, .9, 1.25)); ctx.strokeStyle = LIAR_RED; ctx.lineWidth = 10; ctx.shadowColor = LIAR_RED; ctx.shadowBlur = 26; ctx.beginPath(); ctx.arc(540, 960, 110 * k, 0, 7); ctx.stroke(); ctx.shadowBlur = 0; }
      bigTitle(t < tb - .1 ? 'LOOK AT HIS POCKET' : 'NOT A BUTTON…', 300, prog(t, 0, .2), { size: 80, col: '#fff' }); return; }
    const R = rnd(3); ctx.fillStyle = '#b9a48c'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 3; for (let x = 0; x < W; x += 18) { ctx.beginPath(); ctx.moveTo(x + R() * 4, 0); ctx.lineTo(x + R() * 4, H); ctx.stroke(); } // terry cloth
    const k = eout(prog(t, tr - .2, tr + .8)); goldWatch(540, lerp(1150, 760, k), 1.3, -.1, .6 + .4 * Math.sin(t * 6));
    ctx.fillStyle = grad(0, 900, 0, 1400, [[0, '#a8937a'], [1, '#8f7b63']]); rr(200, 920, 680, 520, 40); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 5; rr(200, 920, 680, 520, 40); ctx.stroke(); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(220, 920, 640, 18); // pocket in front of the watch
    bigTitle("IT'S THE WATCH", 300, prog(t, tr - .1, tr + .2), { size: 90, col: '#ffd23f' }); },
  sfx(d, P, E) { return [[.9, 'pop', .35], [E('bracelet', 1, 4.6) - .2, 'gold', .5]]; }
};
SC.bed = { // and his bed? still perfectly made — he never went to bed
  draw(t, d, P, E) { const tm = E('perfectly', 1, 1.4); const z = eio(prog(t, 0, 1.2)); bg('#101318', '#050608'); ctx.save(); cam(lerp(540, 480, z), lerp(960, 900, z), lerp(1.0, 1.6, z)); hotelRoom(t); ctx.restore();
    if (t > tm - .1) { ctx.strokeStyle = 'rgba(255,210,63,.95)'; ctx.lineWidth = 7; ctx.setLineDash([20, 12]); ctx.globalAlpha = prog(t, tm - .1, tm + .2); rr(60, 640, 900, 620, 30); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
    bigTitle(t > tm - .1 ? 'NOT SLEPT IN' : 'AND HIS BED?', 300, prog(t, 0, .2), { size: 84, col: t > tm - .1 ? '#ffd23f' : '#fff' }); },
  sfx(d, P, E) { return [[0, 'whoosh', .3], [E('perfectly', 1, 1.4) - .1, 'chime', .4]]; }
};
SC.plan = { // the route: through the connecting door, never in the hallway camera
  draw(t, d, P, E) { const tc = E('connecting', 1, .6), tcam = E('camera', 1, 3); floorPlan(t, prog(t, tc - .3, tcam), { door: prog(t, tc - .2, tc + .2) }); label(t > tcam - .2 ? 'THE CAMERA NEVER SAW HIM' : 'THROUGH THE CONNECTING DOOR', 540, 300, 50, { weight: 900, color: '#fff', alpha: prog(t, .1, .4) }); },
  sfx(d, P, E) { return [[0, 'hum', .25, { dur: d }], [E('connecting', 1, 2.6) - .3, 'creak', .4], [E('connecting', 1, 2.6), 'steps', .3, { dur: 1.6 }]]; }
};
SC.again = { // "Did you catch it?" — the pocket again, then loop back into frame 0
  draw(t, d, P, E) { if (t < d * .55) { pocketZoom(t, 1); const R = 110 + 8 * Math.sin(t * 8); ctx.strokeStyle = LIAR_RED; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(540, 960, R, 0, 7); ctx.stroke(); bigTitle('DID YOU CATCH IT?', 300, prog(t, 0, .2), { size: 84, col: '#fff' }); return; }
    bg('#1a0d10', '#07040a'); woodTable(1120, { c1: '#4a2e1c', c2: '#1a100a' }); alarmBeacon(t); velvetBox(540, 1180, 1.1); goldWatch(540, 1000, 1.0, -.15, .8); bigTitle('WATCH AGAIN', 300, prog(t, d * .55, d * .55 + .2), { size: 96, col: '#ffd23f' }); },
  sfx(d) { return [[0, 'pop', .3], [d * .55, 'rewind', .3, { dur: .8 }]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total) drawSubs(t); };
