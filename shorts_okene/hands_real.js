// ===== Detailed realistic hands for close-ups (overrides helpHand / gripHand / bigFinger) =====
// tapered finger capsule with slightly convex sides and a rounded tip
function fingerPath(x0, y0, x1, y1, w0, w1) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux, mx = (x0 + x1) / 2, my = (y0 + y1) / 2, wm = (w0 + w1) / 2 * 1.08;
  const p = new Path2D();
  p.moveTo(x0 + nx * w0 / 2, y0 + ny * w0 / 2);
  p.quadraticCurveTo(mx + nx * wm / 2, my + ny * wm / 2, x1 + nx * w1 / 2, y1 + ny * w1 / 2);
  p.bezierCurveTo(x1 + nx * w1 / 2 + ux * w1 * .65, y1 + ny * w1 / 2 + uy * w1 * .65, x1 - nx * w1 / 2 + ux * w1 * .65, y1 - ny * w1 / 2 + uy * w1 * .65, x1 - nx * w1 / 2, y1 - ny * w1 / 2);
  p.quadraticCurveTo(mx - nx * wm / 2, my - ny * wm / 2, x0 - nx * w0 / 2, y0 - ny * w0 / 2);
  p.bezierCurveTo(x0 - nx * w0 / 2 - ux * w0 * .35, y0 - ny * w0 / 2 - uy * w0 * .35, x0 + nx * w0 / 2 - ux * w0 * .35, y0 + ny * w0 / 2 - uy * w0 * .35, x0 + nx * w0 / 2, y0 + ny * w0 / 2);
  p.closePath(); return p; }
function fillFinger(p, x0, y0, x1, y1, w, skin, lightSide = -1, warm = .0) { // cylinder shading across the finger + warmer, redder tip
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L * lightSide, ny = dx / L * lightSide, mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  ctx.fillStyle = grad(mx - nx * w * .6, my - ny * w * .6, mx + nx * w * .6, my + ny * w * .6, [[0, shade(skin, 1.1)], [.35, shade(skin, 1.02)], [.75, shade(skin, .9)], [1, shade(skin, .72)]]); ctx.fill(p);
  ctx.save(); ctx.clip(p); ctx.fillStyle = grad(x0, y0, x1, y1, [[0, 'rgba(180,80,60,0)'], [.7, 'rgba(200,90,70,.05)'], [1, `rgba(215,95,80,${.18 + warm})`]]); ctx.fillRect(Math.min(x0, x1) - w * 2, Math.min(y0, y1) - w * 2, Math.abs(dx) + w * 4, Math.abs(dy) + w * 4); ctx.restore(); }
function creaseAt(x0, y0, x1, y1, t, w, a = .4, n = 2) { // palm-side joint creases: short dark arcs with a light rim below
  const x = lerp(x0, x1, t), y = lerp(y0, y1, t), L = Math.hypot(x1 - x0, y1 - y0) || 1, ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux;
  for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * w * .16, cx = x + ux * o, cy = y + uy * o;
    ctx.strokeStyle = `rgba(120,55,40,${a})`; ctx.lineWidth = w * .045; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx + nx * w * .36, cy + ny * w * .36); ctx.quadraticCurveTo(cx + ux * w * .07, cy + uy * w * .07, cx - nx * w * .36, cy - ny * w * .36); ctx.stroke();
    ctx.strokeStyle = `rgba(255,225,210,${a * .6})`; ctx.lineWidth = w * .03; ctx.beginPath(); ctx.moveTo(cx + nx * w * .3 + ux * w * .05, cy + ny * w * .3 + uy * w * .05); ctx.quadraticCurveTo(cx + ux * w * .12, cy + uy * w * .12, cx - nx * w * .3 + ux * w * .05, cy - ny * w * .3 + uy * w * .05); ctx.stroke(); } }
function nailAt(x, y, ang, w, h) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, '#e9b3a6'], [.7, '#f3cfc4'], [1, '#fbeee8']]); rr(-w / 2, -h / 2, w, h, w * .42); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.75)'; rr(-w / 2 + 1, h / 2 - h * .22, w - 2, h * .22, w * .3); ctx.fill(); // free edge
  ctx.strokeStyle = 'rgba(150,80,65,.45)'; ctx.lineWidth = 2; rr(-w / 2, -h / 2, w, h, w * .42); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; rr(-w * .3, -h * .38, w * .18, h * .55, w * .09); ctx.fill(); ctx.restore(); }
function sleeveCuff(x, y, w, col) { ctx.fillStyle = grad(x - w / 2, 0, x + w / 2, 0, [[0, shade(col, .65)], [.45, col], [1, shade(col, .7)]]); rr(x - w / 2, y, w, 700, w * .22); ctx.fill();
  ctx.fillStyle = grad(x - w / 2, 0, x + w / 2, 0, [[0, shade(col, .55)], [.45, shade(col, .9)], [1, shade(col, .6)]]); rr(x - w / 2 - 8, y - 10, w + 16, 70, 30); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 3; for (let i = 1; i < 14; i++) { const xx = x - w / 2 + i * w / 14; ctx.beginPath(); ctx.moveTo(xx, y - 6); ctx.lineTo(xx, y + 56); ctx.stroke(); } // rib knit
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x - w / 2, y + 60, w, 14); }

// ---- the Signal for Help hand, palm towards the viewer (right hand: thumb on the viewer's right) ----
function helpHand(x, y, s, palm, thumb, curl, o = {}) {
  const skin = o.skin || '#ecbfa6', th = clamp(thumb), cu = clamp(curl); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (!o.noCuff) sleeveCuff(0, 245, 300, o.sleeve || '#2f5d7c');
  // wrist
  ctx.fillStyle = grad(-90, 0, 90, 0, [[0, shade(skin, .8)], [.5, shade(skin, 1.0)], [1, shade(skin, .84)]]); ctx.beginPath(); ctx.moveTo(-82, 150); ctx.quadraticCurveTo(-92, 210, -86, 262); ctx.lineTo(86, 262); ctx.quadraticCurveTo(94, 210, 88, 150); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(130,60,45,.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60, 196); ctx.quadraticCurveTo(0, 206, 62, 194); ctx.moveTo(-54, 214); ctx.quadraticCurveTo(0, 222, 56, 212); ctx.stroke();
  // palm
  const pp = new Path2D(); pp.moveTo(-84, 160); pp.bezierCurveTo(-128, 110, -126, 20, -114, -46); pp.quadraticCurveTo(-60, -98, 20, -96); pp.quadraticCurveTo(100, -92, 116, -54);
  pp.bezierCurveTo(122, -10, 150, 40, 146, 96); pp.bezierCurveTo(140, 150, 110, 168, 86, 168); pp.closePath();
  ctx.fillStyle = rgrad(-30, 10, 10, 190, [[0, shade(skin, 1.08)], [.55, skin], [1, shade(skin, .8)]]); ctx.fill(pp);
  ctx.save(); ctx.clip(pp);
  softBlob(95, 105, 62, 70, '255,225,210', .35); softBlob(-82, 95, 42, 70, '255,225,210', .22); softBlob(10, 30, 70, 62, '160,80,60', .14); // thenar, hypothenar, hollow
  softBlob(-120, 40, 30, 120, '120,55,40', .18); softBlob(150, 80, 26, 90, '120,55,40', .18); // turning edges
  if (cu < .7) { ctx.lineCap = 'round'; const la = .32 * (1 - cu);
    for (const [pth, a] of [[[-108, -20, -10, 10, 118, -36], 1], [[-100, 42, -20, 30, 70, 6], .8], [[44, 160, 10, 80, 76, -26], 1], [[-40, 120, -60, 60, -30, 0], .4]]) { ctx.strokeStyle = `rgba(125,55,40,${la * a})`; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(pth[0], pth[1]); ctx.quadraticCurveTo(pth[2], pth[3], pth[4], pth[5]); ctx.stroke();
      ctx.strokeStyle = `rgba(255,230,215,${la * a * .7})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(pth[0], pth[1] + 5); ctx.quadraticCurveTo(pth[2], pth[3] + 5, pth[4], pth[5] + 5); ctx.stroke(); } }
  ctx.restore();
  // fingers: [base x, base y, length, base width, tip width, splay]
  const F = [[-88, -46, 128, 40, 31, -.13], [-33, -80, 168, 44, 34, -.04], [26, -88, 184, 46, 35, .02], [82, -70, 160, 44, 34, .1]];
  // thumb (proximal + distal phalanx); when tucked it lies across the palm and shows its nail
  const ta = lerp(.6, -1.5, eio(th)), tb = lerp(.75, -1.62, eio(th)), bx = 112, by = 92, j1 = [bx + Math.sin(ta) * 88, by - Math.cos(ta) * 88], j2 = [j1[0] + Math.sin(tb) * 74, j1[1] - Math.cos(tb) * 74];
  if (th > .3) softBlob((bx + j2[0]) / 2, (by + j2[1]) / 2 + 26, 90, 30, '110,50,35', .25 * th);
  const tp1 = fingerPath(bx, by, j1[0], j1[1], 62, 54), tp2 = fingerPath(j1[0], j1[1], j2[0], j2[1], 54, 44);
  fillFinger(tp1, bx, by, j1[0], j1[1], 60, skin, -1); fillFinger(tp2, j1[0], j1[1], j2[0], j2[1], 50, skin, -1, .05);
  if (th < .55) { creaseAt(bx, by, j1[0], j1[1], .98, 54, .35); softBlob(j2[0], j2[1], 18, 18, '255,215,200', .45); }
  else { const na = Math.atan2(j2[1] - j1[1], j2[0] - j1[0]) - Math.PI / 2; nailAt(lerp(j1[0], j2[0], .72), lerp(j1[1], j2[1], .72), na, 30, 36); softBlob(j1[0], j1[1], 26, 20, '120,55,40', .18); }
  // finger gaps (soft shadow where fingers meet the palm)
  for (const gx of [-62, -4, 54]) softBlob(gx, -70, 14, 24, '110,50,35', .35 * (1 - cu * .5));
  F.forEach(([fbx, fby, L, w0, w1, sp], i) => {
    const a = sp * (1 - cu), Ls = L * Math.pow(1 - cu, 1.3), tx = fbx + Math.sin(a) * Ls, ty = fby - Math.cos(a) * Ls;
    if (Ls > 8) { const p = fingerPath(fbx, fby, tx, ty, w0, lerp(w0, w1, 1 - cu)); fillFinger(p, fbx, fby, tx, ty, w0, skin, -1, .04);
      if (cu < .55) { creaseAt(fbx, fby, tx, ty, .06, w0, .28, 1); creaseAt(fbx, fby, tx, ty, .46, w0, .38); creaseAt(fbx, fby, tx, ty, .73, w0, .32); softBlob(lerp(fbx, tx, .9), lerp(fby, ty, .9), w1 * .32, w1 * .36, '255,220,205', .45); } }
    if (cu > .02) { // folded part: back of the middle phalanx coming down over the palm, nail at the bottom
      const fold = 132 * cu - (i === 0 ? 20 : 0), ex = fbx * (1 - .06 * cu), ey = fby + fold, p = fingerPath(fbx, fby - 4, ex, ey, w0 * 1.05, w0 * .92);
      ctx.fillStyle = grad(fbx - w0, 0, fbx + w0, 0, [[0, shade(skin, .78)], [.4, shade(skin, .98)], [1, shade(skin, .75)]]); ctx.fill(p);
      ctx.save(); ctx.clip(p); ctx.fillStyle = grad(0, fby, 0, ey, [[0, 'rgba(200,100,80,.22)'], [.5, 'rgba(200,100,80,0)']]); ctx.fillRect(fbx - w0, fby - 10, w0 * 2, fold + 30); ctx.restore();
      if (cu > .45) { ctx.strokeStyle = 'rgba(120,55,40,.35)'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(fbx, fby + 18 + k * 7, w0 * .28, .2, Math.PI - .2); ctx.stroke(); } }
      if (cu > .6) nailAt(ex, ey - w0 * .32, 0, w0 * .6, w0 * .55);
      softBlob(ex, ey + 8, w0 * .55, 10, '90,40,30', .3 * cu); } });
  ctx.restore(); }

// ---- a man's hand clamped on her forearm: back of the hand towards the viewer, fingers wrapping down with nails visible ----
function gripHand(x, y, s, sleeve = '#2f5d7c', o = {}) { const sk = o.skin || '#d6a487'; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  if (!o.noSleeve) { ctx.fillStyle = grad(0, -95, 0, 95, [[0, shade(sleeve, 1.12)], [.45, sleeve], [1, shade(sleeve, .6)]]); rr(-640, -90, 1280, 180, 90); ctx.fill(); // her sleeve
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 5; for (const k of [-180, -110, -40, 250, 320]) { ctx.beginPath(); ctx.moveTo(k, -86); ctx.quadraticCurveTo(k + (k < 0 ? 40 : -40), 0, k + (k < 0 ? 10 : -10), 86); ctx.stroke(); } // fabric pulled by the grip
  softBlob(60, 40, 260, 70, '0,0,0', .35); } // pressure shadow
  ctx.fillStyle = grad(240, -300, 520, -120, [[0, o.cuff || '#26262b'], [1, shade(o.cuff || '#26262b', 1.4)]]); ctx.beginPath(); ctx.moveTo(230, -260); ctx.lineTo(640, -420); ctx.lineTo(700, -160); ctx.lineTo(300, -80); ctx.closePath(); ctx.fill(); // his jacket cuff
  // back of the hand
  const bh = new Path2D(); bh.moveTo(250, -230); bh.bezierCurveTo(150, -210, 40, -150, 10, -60); bh.lineTo(236, -40); bh.bezierCurveTo(270, -90, 310, -150, 320, -110); bh.closePath();
  ctx.fillStyle = grad(30, -200, 280, -40, [[0, shade(sk, 1.06)], [.6, sk], [1, shade(sk, .8)]]); ctx.fill(bh);
  ctx.save(); ctx.clip(bh); ctx.strokeStyle = 'rgba(255,230,210,.35)'; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(250 - i * 6, -200 + i * 6); ctx.quadraticCurveTo(160 - i * 20, -130, 40 + i * 58, -60); ctx.stroke(); } // tendons
  ctx.strokeStyle = 'rgba(90,110,160,.22)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(280, -190); ctx.bezierCurveTo(200, -150, 170, -110, 120, -80); ctx.stroke(); ctx.restore(); // vein
  // four fingers bending over the forearm: proximal goes down-left, middle+distal straight down to the nail
  const K = [[40, -66], [96, -62], [150, -58], [204, -52]], Ls = [150, 162, 154, 128], ws = [50, 52, 50, 44];
  K.forEach(([kx, ky], i) => { const mx0 = kx - 18, my0 = ky + 60, tx = mx0 - 6, ty = my0 + Ls[i] * .62;
    const p1 = fingerPath(kx, ky, mx0, my0, ws[i], ws[i] * .94), p2 = fingerPath(mx0, my0, tx, ty, ws[i] * .92, ws[i] * .78);
    fillFinger(p1, kx, ky, mx0, my0, ws[i], sk, -1); fillFinger(p2, mx0, my0, tx, ty, ws[i] * .9, sk, -1, .06);
    ctx.fillStyle = 'rgba(255,230,215,.45)'; ctx.beginPath(); ctx.ellipse(kx - 2, ky - 4, ws[i] * .3, ws[i] * .2, -.4, 0, 7); ctx.fill(); // knuckle highlight
    ctx.strokeStyle = 'rgba(110,50,35,.4)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(mx0, my0 + 4 + k * 6, ws[i] * .26, .3, Math.PI - .3); ctx.stroke(); } // knuckle wrinkles
    nailAt(tx, ty - ws[i] * .22, 0, ws[i] * .58, ws[i] * .62); softBlob(tx, ty + 14, ws[i] * .5, 10, '0,0,0', .3); });
  // thumb over the top of the forearm
  const tp = fingerPath(20, -110, -110, -100, 58, 46); fillFinger(tp, 20, -110, -110, -100, 54, sk, 1); nailAt(-86, -104, Math.PI / 2, 30, 38);
  ctx.restore(); }

// ---- index finger pressing down from above (back of the hand towards the viewer), other fingers curled ----
function bigFinger(x, y, s, skin = '#e2b597') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = grad(-150, 0, 150, 0, [[0, '#232e3a'], [.45, '#3a4a5c'], [1, '#232e3a']]); rr(-150, -800, 300, 640, 60); ctx.fill(); // red uniform sleeve from the top
  ctx.fillStyle = '#2a3644'; rr(-158, -200, 316, 60, 26); ctx.fill();
  const bh = new Path2D(); bh.moveTo(-112, -170); bh.bezierCurveTo(-130, -80, -120, 0, -96, 40); bh.lineTo(104, 44); bh.bezierCurveTo(124, 0, 132, -90, 112, -170); bh.closePath();
  ctx.fillStyle = grad(-120, 0, 120, 0, [[0, shade(skin, .8)], [.45, shade(skin, 1.04)], [1, shade(skin, .82)]]); ctx.fill(bh);
  ctx.save(); ctx.clip(bh); ctx.strokeStyle = 'rgba(255,230,210,.3)'; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 34, -160); ctx.lineTo(-74 + i * 52, 30); ctx.stroke(); } ctx.restore();
  // curled middle / ring / little fingers: knuckles and folded phalanges under the hand
  [[-70, 40, 44], [-22, 46, 46], [26, 44, 44]].forEach(([kx, ky, w]) => { const p = fingerPath(kx, ky - 10, kx - 4, ky + 52, w, w * .9); fillFinger(p, kx, ky - 10, kx - 4, ky + 52, w, skin, -1, .05);
    ctx.fillStyle = 'rgba(255,230,215,.45)'; ctx.beginPath(); ctx.ellipse(kx, ky - 6, w * .3, w * .2, 0, 0, 7); ctx.fill(); softBlob(kx, ky + 60, w * .5, 10, '0,0,0', .3); });
  // index finger, extended straight down, nail at the tip
  const ix = 76, iy = 30, itx = 80, ity = 232, p = fingerPath(ix, iy, itx, ity, 52, 40); fillFinger(p, ix, iy, itx, ity, 50, skin, -1, .08);
  ctx.strokeStyle = 'rgba(110,50,35,.38)'; ctx.lineWidth = 3; for (const tt of [.36, .66]) for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(lerp(ix, itx, tt), lerp(iy, ity, tt) + k * 6 - 6, 14, .3, Math.PI - .3); ctx.stroke(); }
  nailAt(itx, ity - 26, 0, 30, 40);
  const tp = fingerPath(118, -60, 128, 60, 56, 46); fillFinger(tp, 118, -60, 128, 60, 52, skin, 1); // thumb along the side
  ctx.restore(); }
