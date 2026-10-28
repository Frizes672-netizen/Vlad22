// ===== v2 assets: original-style can, realistic wings, semi-realistic people, infographics =====
// Loaded after anim.html's main script: these declarations replace the v1 drawCan/wings/person.

const RB_BLUE = '#1b3d8f', RB_BLUE_D = '#0e2160', RB_RED = '#d6043f', RB_YEL = '#ffc72c';

// ---------- Red Bull bull silhouette (faces right, ~100x60 units) ----------
function bullPath() {
  ctx.beginPath();
  ctx.moveTo(10, 22);
  ctx.bezierCurveTo(22, 15, 46, 13, 60, 16);
  ctx.bezierCurveTo(68, 9, 77, 10, 83, 18);
  ctx.lineTo(95, 29); ctx.lineTo(101, 36); ctx.lineTo(96, 41);
  ctx.bezierCurveTo(90, 39, 84, 37, 79, 39);
  ctx.lineTo(83, 48); ctx.lineTo(95, 55); ctx.lineTo(92, 58); ctx.lineTo(76, 52);
  ctx.bezierCurveTo(72, 46, 66, 43, 60, 43);
  ctx.bezierCurveTo(50, 45, 40, 45, 32, 43);
  ctx.lineTo(27, 52); ctx.lineTo(13, 60); ctx.lineTo(9, 57); ctx.lineTo(20, 47);
  ctx.bezierCurveTo(13, 42, 8, 36, 7, 30);
  ctx.bezierCurveTo(2, 29, -3, 32, -9, 27);
  ctx.bezierCurveTo(-4, 26, 3, 24, 10, 22);
  ctx.closePath();
}
function bull(x, y, s, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  bullPath(); ctx.fill();
  ctx.lineCap = 'round'; ctx.lineWidth = 3.2; ctx.strokeStyle = ctx.fillStyle;
  ctx.beginPath(); ctx.moveTo(86, 22); ctx.quadraticCurveTo(96, 20, 101, 11); ctx.stroke();
  ctx.restore();
}
function rbLogo(cx, cy, w) {
  // sun
  const r = w * .2;
  ctx.fillStyle = rgrad(cx, cy - r * .1, 0, r, [[0, '#ffd75a'], [.85, RB_YEL], [1, '#e9a800']]);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  // two charging bulls meeting at the sun
  ctx.fillStyle = RB_RED; const s = w * .0042;
  bull(cx - w * .43, cy - w * .1, s, false);
  bull(cx + w * .43, cy - w * .1, s, true);
}

// ---------- the can (slim 250 ml, blue/silver checker like the original) ----------
function drawCan(x, y, h, o = {}) {
  const w = h * 0.4, r = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  if (!o.noShadow) { ctx.save(); ctx.scale(1, .16); ctx.fillStyle = rgrad(0, h / 2 / .16, 0, w * .95, [[0, 'rgba(0,0,0,.6)'], [1, 'rgba(0,0,0,0)']]);
    ctx.beginPath(); ctx.arc(0, h / 2 / .16, w * .95, 0, 7); ctx.fill(); ctx.restore(); }
  const neck = h * .06;
  ctx.beginPath(); ctx.moveTo(-r * .84, -h / 2); ctx.lineTo(r * .84, -h / 2);
  ctx.quadraticCurveTo(r, -h / 2 + neck * .3, r, -h / 2 + neck); ctx.lineTo(r, h / 2 - h * .03);
  ctx.quadraticCurveTo(r, h / 2, r * .86, h / 2); ctx.lineTo(-r * .86, h / 2);
  ctx.quadraticCurveTo(-r, h / 2, -r, h / 2 - h * .03); ctx.lineTo(-r, -h / 2 + neck);
  ctx.quadraticCurveTo(-r, -h / 2 + neck * .3, -r * .84, -h / 2); ctx.closePath();
  ctx.save(); ctx.clip();
  // checker: columns wrap around the cylinder (x = sin(theta)), phase allows rotation
  const ph = o.spin || 0, top = -h / 2 + neck, bot = h / 2 - h * .025, rows = 3, rh = (bot - top) / rows;
  const cols = 8;
  for (let c = 0; c < cols; c++) {
    const a0 = (c / cols) * Math.PI * 2 + ph, a1 = ((c + 1) / cols) * Math.PI * 2 + ph;
    const x0 = Math.sin(clamp(((a0 + Math.PI) % (Math.PI * 2)) - Math.PI, -Math.PI / 2, Math.PI / 2)) * r;
    const x1 = Math.sin(clamp(((a1 + Math.PI) % (Math.PI * 2)) - Math.PI, -Math.PI / 2, Math.PI / 2)) * r;
    if (x1 <= x0) continue;
    for (let k = 0; k < rows; k++) {
      ctx.fillStyle = (c + k) % 2 ? '#c9ced8' : RB_BLUE;
      ctx.fillRect(x0, top + k * rh, x1 - x0 + .6, rh + .6);
    }
  }
  // brushed-silver texture on silver panels
  ctx.globalAlpha = .08; ctx.fillStyle = '#fff'; for (let i = 0; i < 40; i++) ctx.fillRect(-r, top + i * (bot - top) / 40, w, 1); ctx.globalAlpha = 1;
  // logo + wordmark on the front
  rbLogo(0, -h * .04, w * 1.25);
  ctx.font = `900 ${h * .1}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.letterSpacing = '-1px';
  ctx.fillStyle = RB_RED; ctx.fillText('Red Bull', 0, h * .175);
  ctx.font = `800 ${h * .03}px ${F_HEAD}`; ctx.letterSpacing = '2px'; ctx.fillStyle = RB_BLUE_D;
  ctx.fillText('ENERGY DRINK', 0, h * .225);
  ctx.letterSpacing = '0px';
  // cylinder shading
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, 'rgba(0,0,10,.75)'], [.12, 'rgba(0,0,10,.35)'], [.3, 'rgba(0,0,0,0)'], [.7, 'rgba(0,0,0,.05)'], [.88, 'rgba(0,0,10,.4)'], [1, 'rgba(0,0,10,.8)']]);
  ctx.fillRect(-r, -h / 2, w, h);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, 'rgba(255,255,255,0)'], [.3, 'rgba(255,255,255,0)'], [.37, 'rgba(255,255,255,.55)'], [.42, 'rgba(255,255,255,.12)'], [.48, 'rgba(255,255,255,0)'], [.8, 'rgba(255,255,255,0)'], [.86, 'rgba(170,200,255,.22)'], [.92, 'rgba(255,255,255,0)']]);
  ctx.fillRect(-r, -h / 2, w, h);
  if (o.rim) { ctx.fillStyle = grad(-r, 0, r, 0, [[0, o.rim], [.07, 'rgba(0,0,0,0)'], [.93, 'rgba(0,0,0,0)'], [1, o.rim]]); ctx.fillRect(-r, -h / 2, w, h); }
  ctx.globalCompositeOperation = 'source-over';
  if (o.drops) { const R = rnd(7); for (let i = 0; i < 90; i++) { const dx = (R() - .5) * w * .92, dy = (R() - .5) * h * .86, ds = R() * h * .007 + 1.1;
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(dx + ds * .3, dy + ds * .4, ds, ds * 1.35, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.ellipse(dx, dy, ds, ds * 1.35, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(dx - ds * .35, dy - ds * .45, ds * .32, 0, 7); ctx.fill(); }
    // a few running drips
    for (let i = 0; i < 6; i++) { const dx = (R() - .5) * w * .8, dy = (R() - .5) * h * .5, L = h * (.05 + R() * .12);
      ctx.fillStyle = grad(0, dy, 0, dy + L, [[0, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,.35)']]); ctx.fillRect(dx, dy, 2.2, L); } }
  // aluminium neck
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, '#4d5058'], [.38, '#f2f3f6'], [.5, '#c3c6cc'], [.7, '#8a8e96'], [1, '#3b3e44']]);
  ctx.fillRect(-r, -h / 2, w, neck);
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, '#4d5058'], [.4, '#e8e9ec'], [1, '#3b3e44']]); ctx.fillRect(-r, h / 2 - h * .025, w, h * .03);
  ctx.restore();
  // lid
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, '#62666d'], [.42, '#f4f4f6'], [.6, '#b5b8be'], [1, '#4d5056']]);
  ctx.beginPath(); ctx.ellipse(0, -h / 2, r * .84, h * .022, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -h / 2 + 1, r * .7, h * .016, 0, 0, 7); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.stroke();
  const tab = o.tab || 0;
  if (tab > .5) { ctx.fillStyle = '#121212'; ctx.beginPath(); ctx.ellipse(w * .15, -h / 2, w * .085, h * .008, 0, 0, 7); ctx.fill(); }
  ctx.save(); ctx.translate(-w * .02, -h / 2); ctx.rotate(-tab * .7);
  ctx.fillStyle = grad(-w * .12, 0, w * .12, 0, [[0, '#8f939a'], [.5, '#e9eaee'], [1, '#7c8087']]); rr(-w * .12, -h * .011 - tab * h * .028, w * .26, h * .024, 5); ctx.fill();
  ctx.fillStyle = '#5c5f66'; ctx.beginPath(); ctx.ellipse(-w * .03, -tab * h * .028, w * .045, h * .006, 0, 0, 7); ctx.fill();
  ctx.restore();
  ctx.restore();
}

// ---------- realistic feathered wings ----------
function featherShape(len, wid, tipRound) {
  ctx.beginPath(); ctx.moveTo(0, -wid * .18);
  ctx.bezierCurveTo(len * .35, -wid * .62, len * .8, -wid * .55, len, -wid * (tipRound ? .1 : 0));
  ctx.quadraticCurveTo(len * 1.02, wid * .2, len * .9, wid * .35);
  ctx.bezierCurveTo(len * .6, wid * .55, len * .25, wid * .5, 0, wid * .18); ctx.closePath();
}
function drawFeather(len, wid, light, a = 1, tint) {
  featherShape(len, wid, true);
  const c = tint || [255, 255, 255];
  ctx.fillStyle = grad(0, 0, len, 0, [[0, `rgba(${c[0] * .72 | 0},${c[1] * .72 | 0},${c[2] * .76 | 0},${a})`], [.35, `rgba(${c[0] * light | 0},${c[1] * light | 0},${c[2] * light | 0},${a})`], [1, `rgba(${c[0] * .9 | 0},${c[1] * .9 | 0},${c[2] * .92 | 0},${a})`]]);
  ctx.fill();
  ctx.strokeStyle = `rgba(120,115,110,${.35 * a})`; ctx.lineWidth = .9; ctx.stroke();
  // rachis + barbs
  ctx.strokeStyle = `rgba(150,140,130,${.55 * a})`; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * .5, -wid * .08, len * .96, -wid * .02); ctx.stroke();
  ctx.strokeStyle = `rgba(170,160,150,${.18 * a})`; ctx.lineWidth = .7;
  for (let k = .15; k < .9; k += .07) { ctx.beginPath(); ctx.moveTo(len * k, -wid * .04); ctx.lineTo(len * (k + .08), -wid * .38); ctx.moveTo(len * k, 0); ctx.lineTo(len * (k + .07), wid * .32); ctx.stroke(); }
}
// one wing (extends to +x); spread 0 folded .. 1 fully open
function wing1(spread, flap, o) {
  const sp = spread, f = flap || 0, tint = o.tint;
  const a0 = lerp(1.25, -0.35, sp) + f, a1 = lerp(-2.2, 0.1, sp) + f * .6, a2 = lerp(2.1, -0.05, sp) + f * .4;
  const S = [0, 0];
  const E = [S[0] + Math.cos(a0) * 120, S[1] + Math.sin(a0) * 120];
  const Wr = [E[0] + Math.cos(a0 + a1 * .5 + .8 * (1 - sp)) * 150, E[1] + Math.sin(a0 + a1 * .5 + .8 * (1 - sp)) * 150];
  const T = [Wr[0] + Math.cos(a0 + a2 * .3) * 110, Wr[1] + Math.sin(a0 + a2 * .3) * 110];
  const down = Math.PI / 2;
  // primaries: from wrist→tip, fanning outward/back
  for (let i = 13; i >= 0; i--) { const u = i / 13; const px = lerp(Wr[0], T[0], u), py = lerp(Wr[1], T[1], u);
    const ang = lerp(down + .05, a0 + .22, Math.pow(u, 1.1)) - .1 * (1 - sp) + (o.droop || 0) * (1 - u);
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang); drawFeather(lerp(250, 300, u) * (.75 + .25 * sp), 62, .98, 1, tint); ctx.restore(); }
  // secondaries: elbow→wrist pointing down/back
  for (let i = 18; i >= 0; i--) { const u = i / 18; const px = lerp(S[0] + 10, Wr[0], u), py = lerp(S[1] + 6, Wr[1], u);
    ctx.save(); ctx.translate(px, py); ctx.rotate(down + .3 - u * .25 + (o.droop || 0)); drawFeather(lerp(160, 235, u), 60, 1, 1, tint); ctx.restore(); }
  // shadow under coverts
  ctx.save(); ctx.globalAlpha = .25; ctx.strokeStyle = '#3a3330'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.filter = 'blur(10px)';
  ctx.beginPath(); ctx.moveTo(S[0] + 10, S[1] + 60); ctx.quadraticCurveTo(E[0], E[1] + 70, Wr[0], Wr[1] + 50); ctx.stroke(); ctx.restore();
  // greater coverts
  for (let i = 20; i >= 0; i--) { const u = i / 20; const px = lerp(S[0] + 10, T[0] * .3 + Wr[0] * .7, u), py = lerp(S[1], T[1] * .3 + Wr[1] * .7, u);
    ctx.save(); ctx.translate(px, py); ctx.rotate(down + .55 - u * .5); drawFeather(lerp(95, 130, u), 46, 1.02, 1, tint); ctx.restore(); }
  // lesser coverts / marginals — small rounded rows near the leading edge
  for (let row = 0; row < 2; row++) for (let i = 22; i >= 0; i--) { const u = i / 22;
    const px = lerp(S[0], Wr[0], u) + Math.cos(a0 + down) * row * -10, py = lerp(S[1], Wr[1], u) - row * 10;
    ctx.save(); ctx.translate(px, py); ctx.rotate(down + .7 - u * .6); drawFeather(row ? 42 : 66, row ? 26 : 34, 1.05, 1, tint); ctx.restore(); }
  // leading edge (bone)
  ctx.strokeStyle = 'rgba(250,248,244,1)'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(S[0], S[1]); ctx.quadraticCurveTo(E[0], E[1] - 6, Wr[0], Wr[1]); ctx.lineTo(T[0] * .2 + Wr[0] * .8, T[1] * .2 + Wr[1] * .8); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(S[0], S[1] - 5); ctx.quadraticCurveTo(E[0], E[1] - 12, Wr[0], Wr[1] - 6); ctx.stroke();
}
function wings(x, y, s, spread, o = {}) {
  if (o.outline) { // dashed "imagined" outline
    ctx.save(); ctx.globalAlpha *= .9;
    for (const side of [-1, 1]) { ctx.save(); ctx.translate(x, y); ctx.scale(side * s, s);
      ctx.strokeStyle = o.outline; ctx.lineWidth = 3 / s; ctx.setLineDash((o.dash || [10, 8]).map(v => v / s));
      const sp = spread; ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(120, lerp(40, -160, sp), 300, lerp(60, -200, sp), lerp(200, 420, sp), lerp(120, -120, sp));
      ctx.bezierCurveTo(lerp(220, 380, sp), lerp(240, 60, sp), lerp(150, 260, sp), lerp(300, 200, sp), 40, 160);
      ctx.closePath(); ctx.stroke();
      for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(40 + k * 20, 40 + k * 10); ctx.lineTo(lerp(140, 300, sp) + k * 18, lerp(260, 120, sp) - k * 25); ctx.stroke(); }
      ctx.restore(); }
    ctx.restore(); return;
  }
  ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1);
  if (o.glow) glow(x, y + 40 * s, 420 * s, o.glow, .8);
  for (const side of [-1, 1]) { ctx.save(); ctx.translate(x + side * 6 * s, y); ctx.scale(side * s, s); wing1(spread, (o.flap || 0), o); ctx.restore(); }
  ctx.restore();
}

// ---------- semi-realistic person (front view, feet at x,y) ----------
const SKIN = ['#e0ac8a', '#c98d6b', '#8d5a3c'];
function limb(p0, p1, w0, w1, col, lightSide) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  ctx.beginPath();
  ctx.moveTo(p0[0] + nx * w0, p0[1] + ny * w0); ctx.lineTo(p1[0] + nx * w1, p1[1] + ny * w1);
  ctx.arc(p1[0], p1[1], w1, Math.atan2(ny, nx), Math.atan2(ny, nx) + Math.PI);
  ctx.lineTo(p0[0] - nx * w0, p0[1] - ny * w0);
  ctx.arc(p0[0], p0[1], w0, Math.atan2(-ny, -nx), Math.atan2(-ny, -nx) + Math.PI);
  ctx.closePath();
  if (typeof col === 'string' && col.startsWith('#') && lightSide !== undefined) {
    const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, ww = Math.max(w0, w1);
    ctx.fillStyle = grad(mx - nx * ww * lightSide, my - ny * ww * lightSide, mx + nx * ww * lightSide, my + ny * ww * lightSide, [[0, shade(col, .55)], [.45, col], [.7, shade(col, 1.18)], [1, shade(col, .7)]]);
  } else ctx.fillStyle = col;
  ctx.fill();
}
function limb3(a, b, c, w0, w1, w2, col, L, sil) {
  const pts = [a, b, c], ws = [w0, w1, w2], left = [], right = [];
  for (let i = 0; i < 3; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[Math.min(2, i + 1)];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
    left.push([pts[i][0] + nx * ws[i], pts[i][1] + ny * ws[i]]); right.push([pts[i][0] - nx * ws[i], pts[i][1] - ny * ws[i]]);
  }
  ctx.beginPath(); ctx.moveTo(left[0][0], left[0][1]);
  ctx.quadraticCurveTo(left[1][0], left[1][1], (left[1][0] + left[2][0]) / 2, (left[1][1] + left[2][1]) / 2); ctx.lineTo(left[2][0], left[2][1]);
  const ea = Math.atan2(left[2][1] - c[1], left[2][0] - c[0]); ctx.arc(c[0], c[1], w2, ea, ea + Math.PI);
  ctx.quadraticCurveTo(right[1][0], right[1][1], (right[1][0] + right[0][0]) / 2, (right[1][1] + right[0][1]) / 2); ctx.lineTo(right[0][0], right[0][1]);
  const sa = Math.atan2(right[0][1] - a[1], right[0][0] - a[0]); ctx.arc(a[0], a[1], w0, sa, sa + Math.PI);
  ctx.closePath();
  if (sil) { ctx.fillStyle = sil; ctx.fill(); return; }
  const mx = (a[0] + c[0]) / 2, ww = Math.max(w0, w1) * 1.1;
  ctx.fillStyle = grad(mx - ww * L, 0, mx + ww * L, 0, [[0, shade(col, .55)], [.45, col], [.72, shade(col, 1.18)], [1, shade(col, .72)]]); ctx.fill();
}
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16); const r = clamp(((n >> 16) & 255) * k, 0, 255) | 0, g = clamp(((n >> 8) & 255) * k, 0, 255) | 0, b = clamp((n & 255) * k, 0, 255) | 0;
  return `rgb(${r},${g},${b})`;
}
function personBody(u, P, C, sil) {
  const L = C.light; // +1 light from right, -1 from left
  const fill = (c) => sil ? sil : c;
  const lsd = sil ? undefined : L;
  const { hipL, hipR, kneeL, kneeR, ankL, ankR, shL, shR, elL, elR, hdL, hdR, sy, headY } = P;
  // legs (jeans)
  limb3(hipL, kneeL, ankL, 5.4 * u, 4.2 * u, 3.4 * u, C.pants, L, sil); limb3(hipR, kneeR, ankR, 5.4 * u, 4.2 * u, 3.4 * u, C.pants, L, sil);
  if (!sil) { ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = .6 * u; ctx.beginPath(); ctx.moveTo(-.4 * u, -48 * u); ctx.lineTo(-.2 * u, -40 * u); ctx.stroke(); }
  // sneakers
  for (const [a, d] of [[ankL, -1], [ankR, 1]]) {
    ctx.fillStyle = fill(C.shoe); ctx.beginPath(); ctx.ellipse(a[0] + d * 1.6 * u, a[1] + 2 * u, 5.4 * u, 3 * u, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = fill('#f1f1f1'); ctx.fillRect(a[0] + d * 1.6 * u - 5.6 * u, a[1] + 1.8 * u, 11.2 * u, 1.8 * u);
  }
  // hood behind neck
  ctx.fillStyle = fill(shade(C.top, .7)); ctx.beginPath(); ctx.ellipse(0, sy - 1 * u, 8.5 * u, 4.5 * u, 0, 0, 7); ctx.fill();
  // torso (hoodie)
  ctx.beginPath();
  ctx.moveTo(shL[0] + 1 * u, sy); ctx.quadraticCurveTo(0, sy - 2.2 * u, shR[0] - 1 * u, sy);
  ctx.quadraticCurveTo(shR[0] + 3.4 * u, sy + .5 * u, shR[0] + 3 * u, sy + 6 * u);
  ctx.quadraticCurveTo(10.6 * u, -60 * u, 10.2 * u, -46 * u);
  ctx.quadraticCurveTo(0, -44.6 * u, -10.2 * u, -46 * u);
  ctx.quadraticCurveTo(-10.6 * u, -60 * u, shL[0] - 3 * u, sy + 6 * u);
  ctx.quadraticCurveTo(shL[0] - 3.4 * u, sy + .5 * u, shL[0] + 1 * u, sy); ctx.closePath();
  ctx.fillStyle = sil ? sil : grad(-12 * u * L, 0, 12 * u * L, 0, [[0, shade(C.top, .5)], [.35, shade(C.top, .85)], [.7, shade(C.top, 1.12)], [1, shade(C.top, .75)]]);
  ctx.fill();
  if (!sil) {
    // fabric folds, pocket, waistband, drawstrings
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1.2 * u;
    ctx.beginPath(); ctx.moveTo(-6.5 * u, -57 * u); ctx.quadraticCurveTo(0, -59 * u, 6.5 * u, -57 * u); ctx.lineTo(7.5 * u, -50.5 * u); ctx.lineTo(-7.5 * u, -50.5 * u); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(-10.2 * u, -48.6 * u, 20.4 * u, 2.6 * u);
    ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = .8 * u;
    for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 7 * u, sy + 8 * u); ctx.quadraticCurveTo(k * 5 * u, -66 * u, k * 8 * u, -60 * u); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(240,240,240,.85)'; ctx.lineWidth = .7 * u;
    ctx.beginPath(); ctx.moveTo(-1.6 * u, sy + 1 * u); ctx.lineTo(-1.9 * u, sy + 9 * u); ctx.moveTo(1.6 * u, sy + 1 * u); ctx.lineTo(1.9 * u, sy + 8 * u); ctx.stroke();
  }
  // arms (sleeves + hands)
  const armL = [[shL, elL, hdL], [shR, elR, hdR]];
  for (const [s, e, hd] of armL) {
    limb3(s, e, hd, 3.9 * u, 3.3 * u, 2.7 * u, C.top, L, sil);
    if (!sil) { ctx.fillStyle = shade(C.top, .7); const dx0 = hd[0] - e[0], dy0 = hd[1] - e[1], l0 = Math.hypot(dx0, dy0) || 1; ctx.beginPath(); ctx.ellipse(hd[0] - dx0 / l0 * .6 * u, hd[1] - dy0 / l0 * .6 * u, 2.9 * u, 1.2 * u, Math.atan2(dy0, dx0) + Math.PI / 2, 0, 7); ctx.fill(); }
    ctx.fillStyle = sil ? sil : grad(hd[0] - 2 * u, 0, hd[0] + 2 * u, 0, [[0, shade(C.skin, .75)], [1, C.skin]]);
    const dx = hd[0] - e[0], dy = hd[1] - e[1], dl = Math.hypot(dx, dy) || 1;
    ctx.beginPath(); ctx.ellipse(hd[0] + dx / dl * 2.6 * u, hd[1] + dy / dl * 2.6 * u, 2.2 * u, 3 * u, Math.atan2(dy, dx) - Math.PI / 2, 0, 7); ctx.fill();
  }
  // neck
  ctx.fillStyle = sil ? sil : grad(-2.6 * u, 0, 2.6 * u, 0, [[0, shade(C.skin, .62)], [1, shade(C.skin, .85)]]);
  ctx.fillRect(-2.5 * u, headY + 5 * u, 5 * u, sy - headY - 4 * u);
  // head
  ctx.save(); ctx.translate(0, headY); ctx.rotate(P.tilt || 0);
  ctx.fillStyle = sil ? sil : rgrad(1.5 * u * L, -1.5 * u, .5 * u, 8 * u, [[0, shade(C.skin, 1.08)], [.6, C.skin], [1, shade(C.skin, .62)]]);
  ctx.beginPath(); ctx.moveTo(0, -7.4 * u);
  ctx.bezierCurveTo(4.6 * u, -7.4 * u, 5.6 * u, -3 * u, 5.4 * u, 0); ctx.bezierCurveTo(5.2 * u, 4 * u, 3 * u, 7.2 * u, 0, 7.6 * u);
  ctx.bezierCurveTo(-3 * u, 7.2 * u, -5.2 * u, 4 * u, -5.4 * u, 0); ctx.bezierCurveTo(-5.6 * u, -3 * u, -4.6 * u, -7.4 * u, 0, -7.4 * u); ctx.fill();
  // ears
  ctx.beginPath(); ctx.ellipse(-5.5 * u, .3 * u, 1.1 * u, 2 * u, 0, 0, 7); ctx.ellipse(5.5 * u, .3 * u, 1.1 * u, 2 * u, 0, 0, 7); ctx.fill();
  if (!sil) {
    // face details (kept soft to avoid an uncanny look)
    ctx.fillStyle = 'rgba(40,20,10,.85)';
    ctx.beginPath(); ctx.ellipse(-2.1 * u, -.4 * u, .62 * u, .42 * u, 0, 0, 7); ctx.ellipse(2.1 * u, -.4 * u, .62 * u, .42 * u, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = shade(C.hair, .9); ctx.lineWidth = .55 * u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-3.1 * u, -1.9 * u); ctx.lineTo(-1.1 * u, -2.1 * u); ctx.moveTo(1.1 * u, -2.1 * u); ctx.lineTo(3.1 * u, -1.9 * u); ctx.stroke();
    ctx.fillStyle = 'rgba(90,45,25,.25)'; ctx.beginPath(); ctx.moveTo(0, -.3 * u); ctx.lineTo(.9 * u * L, 2.2 * u); ctx.lineTo(-.3 * u * L, 2.4 * u); ctx.fill();
    ctx.strokeStyle = 'rgba(110,50,40,.55)'; ctx.lineWidth = .45 * u; ctx.beginPath(); ctx.moveTo(-1.3 * u, 4.1 * u); ctx.quadraticCurveTo(0, 4.4 * u + (P.mouth || 0) * u, 1.3 * u, 4.1 * u); ctx.stroke();
    // stubble / jaw shadow
    ctx.fillStyle = 'rgba(40,25,20,.12)'; ctx.beginPath(); ctx.ellipse(0, 4.8 * u, 4 * u, 2.6 * u, 0, 0, 7); ctx.fill();
  }
  // hair
  ctx.fillStyle = sil ? sil : grad(0, -8 * u, 0, -2 * u, [[0, shade(C.hair, 1.25)], [1, C.hair]]);
  ctx.beginPath(); ctx.moveTo(-5.6 * u, -1 * u); ctx.bezierCurveTo(-6.2 * u, -8 * u, -2 * u, -9.4 * u, .6 * u, -8.6 * u);
  ctx.bezierCurveTo(4 * u, -9 * u, 6.4 * u, -6.5 * u, 5.6 * u, -1 * u); ctx.bezierCurveTo(4.8 * u, -4.4 * u, 2 * u, -5.8 * u, -.6 * u, -5.2 * u);
  ctx.bezierCurveTo(-3 * u, -5.6 * u, -4.8 * u, -4.2 * u, -5.6 * u, -1 * u); ctx.fill();
  if (C.cap) {
    ctx.fillStyle = sil ? sil : grad(-6 * u, 0, 6 * u, 0, [[0, shade(C.cap, .6)], [.6, shade(C.cap, 1.1)], [1, shade(C.cap, .7)]]);
    ctx.beginPath(); ctx.moveTo(-5.9 * u, -2.6 * u); ctx.bezierCurveTo(-6.2 * u, -10 * u, 6.2 * u, -10 * u, 5.9 * u, -2.6 * u); ctx.closePath(); ctx.fill();
    ctx.fillStyle = sil ? sil : shade(C.cap, .8); ctx.beginPath(); ctx.ellipse(0, -2.4 * u, 6.8 * u, 1.6 * u, 0, 0, Math.PI); ctx.fill();
    if (!sil) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-5 * u, -1.2 * u, 10 * u, 1 * u); }
  }
  ctx.restore();
}
function person(x, y, h, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
  const u = h / 100;
  const shrug = o.shrug || 0, armUp = o.armUp || 0, walk = o.walk || 0;
  const sy = -81.5 * u - shrug * 2.2 * u, headY = -92 * u - shrug * 1.2 * u;
  const hipL = [-4.8 * u, -48 * u], hipR = [4.8 * u, -48 * u];
  const legA = Math.sin(walk) * .32;
  const knee = (hp, a) => [hp[0] + Math.sin(a) * 22 * u, hp[1] + Math.cos(a) * 22 * u];
  const kneeL = knee(hipL, -.03 + legA * .5), kneeR = knee(hipR, .03 - legA * .5);
  const ankL = [kneeL[0] - .4 * u, kneeL[1] + 23 * u - Math.max(0, legA) * 2 * u], ankR = [kneeR[0] + .4 * u, kneeR[1] + 23 * u - Math.max(0, -legA) * 2 * u];
  const shL = [-12 * u, sy + 1.5 * u], shR = [12 * u, sy + 1.5 * u];
  const arm = (s, side, ua, fa) => { const e = [s[0] + side * Math.sin(ua) * 16 * u, s[1] + Math.cos(ua) * 16 * u]; return [e, [e[0] + side * Math.sin(fa) * 14.5 * u, e[1] + Math.cos(fa) * 14.5 * u]]; };
  const sw = Math.sin(walk) * .25;
  let [elL, hdL] = arm(shL, -1, lerp(.1 + sw, .3, shrug), lerp(.05 + sw, 1.75, shrug));
  let [elR, hdR] = arm(shR, 1, lerp(lerp(.1 - sw, .3, shrug), .35, armUp), lerp(lerp(.05 - sw, 1.75, shrug), 2.75, armUp));
  if (o.point) [elR, hdR] = arm(shR, 1, 1.2, 1.5);
  const P = { hipL, hipR, kneeL, kneeR, ankL, ankR, shL, shR, elL, elR, hdL, hdR, sy, headY, tilt: o.tilt || (shrug * .06), mouth: o.mouth };
  const C = { skin: o.skin || SKIN[o.skinIdx || 0], top: o.top || '#59606e', pants: o.pants || '#2d3f5e', shoe: o.shoe || '#262626', hair: o.hair || '#3a2618',
    cap: o.cap === true ? (o.capColor || '#1f2d55') : (o.cap || null), light: o.light ?? 1 };
  if (o.backWings) wings(0, sy + 10 * u, o.backWings.s, o.backWings.spread, o.backWings);
  if (o.rim) { ctx.save(); ctx.globalAlpha *= .55; ctx.translate(o.light === -1 ? -.7 * u : .7 * u, -.3 * u); personBody(u, P, C, o.rim); ctx.restore(); }
  const sil = (o.silhouette || (o.color && o.color !== 'none' && !o.lit)) ? (o.color || '#0b0d12') : null;
  if (o.color === 'rgba(255,255,255,.0)') { ctx.restore(); return; }
  personBody(u, P, C, sil);
  if (o.holdCan) { const hd = hdR; drawCan(hd[0] + 1.5 * u, hd[1] + 1 * u - 4 * u, 13 * u, { noShadow: true, tab: 1, rot: armUp * -.5 }); }
  ctx.restore();
}

// ---------- infographic helpers ----------
// odometer-style rolling digits
function odometer(str, x, y, size, rollP, o = {}) {
  ctx.save(); ctx.font = `900 ${size}px ${F_HEAD}`; ctx.textBaseline = 'alphabetic';
  const cw = ctx.measureText('0').width * 1.02, sw = ctx.measureText(',').width, dw = ctx.measureText('$').width;
  let total = 0; for (const ch of str) total += /\d/.test(ch) ? cw : (ch === '$' ? dw : sw);
  let cx = x - total / 2; const digits = [...str].filter(c => /\d/.test(c)).length; let di = 0;
  for (const ch of str) {
    if (/\d/.test(ch)) {
      const target = +ch; const lag = (digits - di - 1) / digits; const p = eout(clamp((rollP - lag * .35) / (1 - lag * .35)));
      const spins = 2 + (digits - di); const pos = p * (spins * 10 + target);
      ctx.save(); ctx.beginPath(); ctx.rect(cx - 4, y - size * .8, cw + 8, size * .86); ctx.clip();
      const base = Math.floor(pos), frac = pos - base;
      for (const k of [0, 1]) { const d = (base + k) % 10; const yy = y - (frac - k) * size * 1.05 * -1;
        ctx.fillStyle = o.color || '#fff'; if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = 30; }
        ctx.textAlign = 'center'; ctx.fillText(String(d), cx + cw / 2, y + (k - frac) * size * 1.05); }
      ctx.shadowBlur = 0; ctx.fillStyle = grad(0, y - size * .8, 0, y + size * .06, [[0, 'rgba(4,6,12,.85)'], [.18, 'rgba(4,6,12,0)'], [.82, 'rgba(4,6,12,0)'], [1, 'rgba(4,6,12,.85)']]); ctx.fillRect(cx - 4, y - size * .8, cw + 8, size * .86);
      ctx.restore(); cx += cw; di++;
    } else { ctx.fillStyle = o.sym || o.color || '#fff'; ctx.fillText(ch, cx, y); cx += ch === '$' ? dw : sw; }
  }
  ctx.restore();
}
function newspaper(x, y, w, rot, masthead, headline, sub, o = {}) {
  const h = w * 1.25;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(o.s ?? 1, o.s ?? 1);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w, h);
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#f1ead8'], [1, '#d9cfb6']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = '#1b1b1b'; ctx.textAlign = 'center';
  ctx.font = `700 ${w * .085}px "Liberation Serif", serif`; ctx.fillText(masthead, 0, -h / 2 + w * .12);
  ctx.fillRect(-w / 2 + w * .05, -h / 2 + w * .15, w * .9, 2); ctx.fillRect(-w / 2 + w * .05, -h / 2 + w * .165, w * .9, 1);
  ctx.font = `700 ${w * .028}px "Liberation Serif", serif`; ctx.fillText(o.date || 'NEW YORK · 2014', 0, -h / 2 + w * .2);
  ctx.font = `900 ${w * .075}px "Liberation Serif", serif`;
  const lines = headline.split('\n'); lines.forEach((l, i) => ctx.fillText(l, 0, -h / 2 + w * .31 + i * w * .085));
  ctx.font = `italic 400 ${w * .036}px "Liberation Serif", serif`; ctx.fillStyle = '#333';
  ctx.fillText(sub, 0, -h / 2 + w * .33 + lines.length * w * .085);
  // photo block + columns
  const py = -h / 2 + w * .4 + lines.length * w * .085;
  ctx.fillStyle = '#8c8676'; ctx.fillRect(-w / 2 + w * .06, py, w * .5, w * .34);
  if (o.photoCan) { ctx.save(); ctx.globalAlpha = .9; ctx.filter = 'grayscale(1) contrast(1.1)'; drawCan(-w / 2 + w * .31, py + w * .17, w * .3, { noShadow: true }); ctx.restore(); }
  ctx.fillStyle = 'rgba(30,30,30,.55)';
  for (let i = 0; i < 9; i++) ctx.fillRect(-w / 2 + w * .6, py + i * w * .038, w * .34, w * .012);
  for (let c = 0; c < 3; c++) for (let i = 0; i < 12; i++) ctx.fillRect(-w / 2 + w * .06 + c * w * .3, py + w * .39 + i * w * .038, w * .26 - (i === 11 ? w * .1 : 0), w * .012);
  ctx.restore();
}
function badge(x, y, r, kind, p, col) {
  if (p <= 0) return; const s = eback(clamp(p));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.arc(4, 8, r, 0, 7); ctx.fill();
  ctx.fillStyle = rgrad(-r * .3, -r * .4, r * .1, r * 1.1, [[0, shade(col, 1.35)], [.7, col], [1, shade(col, .55)]]); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = r * .06; ctx.beginPath(); ctx.arc(0, 0, r * .88, 0, 7); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .09; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 'bolt') { ctx.beginPath(); ctx.moveTo(r * .12, -r * .6); ctx.lineTo(-r * .32, r * .08); ctx.lineTo(0, r * .08); ctx.lineTo(-r * .12, r * .6); ctx.lineTo(r * .32, -r * .08); ctx.lineTo(0, -r * .08); ctx.closePath(); ctx.fill(); }
  if (kind === 'watch') { ctx.beginPath(); ctx.arc(0, r * .08, r * .45, 0, 7); ctx.stroke(); ctx.fillRect(-r * .1, -r * .62, r * .2, r * .14);
    ctx.beginPath(); ctx.moveTo(0, r * .08); ctx.lineTo(r * .22, -r * .14); ctx.stroke(); }
  if (kind === 'shield') { ctx.beginPath(); ctx.moveTo(0, -r * .55); ctx.lineTo(r * .45, -r * .38); ctx.quadraticCurveTo(r * .45, r * .3, 0, r * .58); ctx.quadraticCurveTo(-r * .45, r * .3, -r * .45, -r * .38); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-r * .18, 0); ctx.lineTo(-r * .03, r * .16); ctx.lineTo(r * .22, -r * .14); ctx.stroke(); }
  if (kind === 'scales') { ctx.beginPath(); ctx.moveTo(0, -r * .55); ctx.lineTo(0, r * .45); ctx.moveTo(-r * .3, r * .5); ctx.lineTo(r * .3, r * .5); ctx.moveTo(-r * .5, -r * .35); ctx.lineTo(r * .5, -r * .35); ctx.stroke();
    for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * r * .5, -r * .35); ctx.lineTo(k * r * .5 - r * .2, r * .1); ctx.lineTo(k * r * .5 + r * .2, r * .1); ctx.closePath(); ctx.stroke(); } }
  ctx.restore();
}
function label(s, x, y, size, o = {}) {
  ctx.save(); ctx.font = `${o.weight || 800} ${size}px ${o.font || F_HEAD}`; ctx.textAlign = o.align || 'center'; ctx.letterSpacing = (o.spacing || 0) + 'px';
  ctx.globalAlpha *= (o.alpha ?? 1); if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = o.blur ?? 30; }
  ctx.fillStyle = o.color || '#fff'; ctx.fillText(s, x, y); ctx.restore();
}
function pill(s, x, y, size, p, bg, fg) {
  if (p <= 0) return; const k = eback(clamp(p));
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = `900 ${size}px ${F_HEAD}`; ctx.letterSpacing = '3px';
  const w = ctx.measureText(s).width; ctx.fillStyle = bg; rr(-w / 2 - size * .7, -size * .95, w + size * 1.4, size * 1.45, size * .72); ctx.fill();
  ctx.fillStyle = fg || '#fff'; ctx.textAlign = 'center'; ctx.fillText(s, 0, size * .1); ctx.restore();
}
// split-flap year display
function splitFlap(str, x, y, size, p) {
  ctx.save(); const cw = size * .72, gap = size * .08, total = str.length * (cw + gap) - gap;
  [...str].forEach((ch, i) => {
    const cx = x - total / 2 + i * (cw + gap);
    ctx.fillStyle = '#16181d'; rr(cx, y - size, cw, size * 1.2, size * .08); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.04)'; rr(cx, y - size, cw, size * .6, size * .08); ctx.fill();
    const flips = 6 + i * 3, q = clamp(p * 1.25 - i * .06); const n = Math.floor(q * flips);
    const shown = q >= .999 ? ch : String((+ch + 10 - (flips - n) % 10) % 10);
    ctx.font = `800 ${size * .95}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillStyle = '#f3f3f3'; ctx.fillText(shown, cx + cw / 2, y + size * .02);
    ctx.fillStyle = '#000'; ctx.fillRect(cx, y - size * .4, cw, size * .025);
  });
  ctx.restore();
}
