// ===== TikTok (1080×1920): Zeus / GameOver Zeus — cyber-thriller scenes =====
const MONO = '"JetBrains Mono", monospace';
const NEON = '#22e3ff', RED = '#ff2d3d', GREEN = '#39ff88';

// ---------- atmosphere ----------
function darkBg(t, tint = 'rgba(30,80,200,.22)') { bg('#04060c', '#010204'); glow(540, 700, 1100, tint); }
function codeRain(t, a = .35, col = '57,255,136', seed = 3) {
  const R = rnd(seed); ctx.save(); ctx.font = `600 26px ${MONO}`; ctx.textAlign = 'center';
  for (let c = 0; c < 36; c++) { const x = c * 31 + 10, sp = 120 + R() * 260, off = R() * 2400, len = 8 + Math.floor(R() * 18);
    for (let k = 0; k < len; k++) { const y = ((t * sp + off) % 2400) - k * 30 - 200; if (y < -40 || y > H + 40) continue;
      const ch = '0123456789ABCDEF'[Math.floor((R() * 16 + t * 8 + k) % 16)]; ctx.fillStyle = `rgba(${col},${a * (k === 0 ? 1 : (1 - k / len) * .6)})`; ctx.fillText(ch, x, y); } }
  ctx.restore();
}
function scanlines(a = .08) { ctx.save(); ctx.fillStyle = `rgba(0,0,0,${a})`; for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2); ctx.restore(); }
const _gc = document.createElement('canvas'); _gc.width = W; _gc.height = H;
function glitch(strength, seed) { // horizontal slice displacement + RGB split
  if (strength <= 0) return; const g = _gc.getContext('2d'); g.clearRect(0, 0, W, H); g.drawImage(cv, 0, 0);
  const R = rnd(seed); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < 14 * strength; i++) { const y = R() * H, h = 10 + R() * 90, dx = (R() - .5) * 160 * strength; ctx.drawImage(_gc, 0, y, W, h, dx, y, W, h); }
  ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .35 * strength; ctx.drawImage(_gc, 8 * strength, 0); ctx.restore();
}
function hud(t, x, y, w, h, col = NEON) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; const k = 40;
  for (const [cx, cy, sx, sy] of [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]]) { ctx.beginPath(); ctx.moveTo(cx, cy + sy * k); ctx.lineTo(cx, cy); ctx.lineTo(cx + sx * k, cy); ctx.stroke(); }
  ctx.restore(); }
function typeText(s, x, y, size, p, col = GREEN, o = {}) { const n = Math.floor(s.length * clamp(p)); const shown = s.slice(0, n) + ((Math.floor(Date.now() / 1) && (p < 1 || Math.floor(o.t * 3) % 2)) ? '▌' : '');
  ctx.save(); ctx.font = `${o.weight || 600} ${size}px ${MONO}`; ctx.fillStyle = col; ctx.textAlign = o.align || 'left'; ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.fillText(shown, x, y); ctx.restore(); }

// ---------- props ----------
function hooded(x, y, s, t, o = {}) { // anonymous hooded figure; face hidden in shadow, lit by a monitor
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = grad(-260, 0, 260, 0, [[0, '#06070b'], [.5, '#151824'], [1, '#06070b']]);
  ctx.beginPath(); ctx.moveTo(-300, 520); ctx.quadraticCurveTo(-290, 260, -150, 200); ctx.quadraticCurveTo(-170, 20, -60, -150); ctx.quadraticCurveTo(0, -210, 60, -150);
  ctx.quadraticCurveTo(170, 20, 150, 200); ctx.quadraticCurveTo(290, 260, 300, 520); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#010102'; ctx.beginPath(); ctx.moveTo(-82, 120); ctx.quadraticCurveTo(-100, -40, -40, -105); ctx.quadraticCurveTo(0, -130, 40, -105); ctx.quadraticCurveTo(100, -40, 82, 120); ctx.quadraticCurveTo(0, 170, -82, 120); ctx.fill();
  const lc = o.light || NEON;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = lc; ctx.globalAlpha = .55; ctx.lineWidth = 5; ctx.filter = 'blur(2px)';
  ctx.beginPath(); ctx.moveTo(-60, -150); ctx.quadraticCurveTo(-170, 20, -150, 200); ctx.stroke(); ctx.beginPath(); ctx.moveTo(60, -150); ctx.quadraticCurveTo(170, 20, 150, 200); ctx.stroke(); ctx.restore();
  // only the jaw catches a little light
  ctx.fillStyle = 'rgba(80,140,170,.18)'; ctx.beginPath(); ctx.ellipse(0, 105, 52, 22, 0, 0, Math.PI); ctx.fill();
  if (o.eyes) { glow(-26, 10, 30, 'rgba(255,40,60,.9)', o.eyes); glow(26, 10, 30, 'rgba(255,40,60,.9)', o.eyes); }
  ctx.restore();
}
function monitorWall(t, cx, cy, o = {}) {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const x = cx - 470 + i * 320, y = cy + j * 230, w = 300, h = 210;
    ctx.fillStyle = '#05070c'; ctx.fillRect(x - 8, y - 8, w + 16, h + 16); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.fillStyle = '#031a12'; ctx.fillRect(x, y, w, h); ctx.font = `500 15px ${MONO}`; const R = rnd(i * 7 + j);
    for (let k = 0; k < 13; k++) { ctx.fillStyle = `rgba(57,255,136,${.4 + R() * .5})`; let s = ''; const L = 8 + Math.floor(R() * 24); for (let q = 0; q < L; q++) s += '0123456789abcdef{}[]<>=;'[Math.floor((R() * 24 + t * 3 * (k + 1)) % 24)]; ctx.fillText(s, x + 10, y + 22 + k * 15); }
    if ((i + j) % 3 === 1 && o.alert) { ctx.fillStyle = `rgba(255,45,61,${.3 + .3 * Math.sin(t * 8)})`; ctx.fillRect(x, y, w, h); }
    ctx.restore(); glow(x + w / 2, y + h / 2, 260, 'rgba(57,255,136,.12)'); }
}
function bankApp(x, y, w, t, bal, o = {}) { // phone with a banking app
  const h = w * 2.05; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(-w / 2 + 18, -h / 2 + 24, w, h, w * .13); ctx.fill();
  ctx.fillStyle = '#0b0c10'; rr(-w / 2, -h / 2, w, h, w * .13); ctx.fill(); ctx.strokeStyle = '#2a2d36'; ctx.lineWidth = 4; ctx.stroke();
  ctx.save(); rr(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, w * .1); ctx.clip();
  const danger = o.danger || 0; ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, danger > .5 ? '#3a0a10' : '#0f2a5a'], [.4, '#f4f6fa'], [1, '#f4f6fa']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = danger > .5 ? '#6a0f18' : '#1554c0'; ctx.fillRect(-w / 2, -h / 2, w, h * .36);
  label('МОЙ БАНК', 0, -h / 2 + 110, w * .07, { color: 'rgba(255,255,255,.8)', spacing: 6 });
  label('Баланс', 0, -h / 2 + 200, w * .06, { color: 'rgba(255,255,255,.75)', weight: 600 });
  const s = (bal < 0 ? '-' : '') + '$' + Math.abs(bal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  label(s, 0, -h / 2 + 310, w * .15, { weight: 900, color: danger > .5 ? '#ff6b75' : '#fff', shadow: danger > .5 ? 'rgba(255,40,60,.6)' : null });
  // transactions
  (o.tx || []).forEach(([name, amt, p], i) => { if (p <= 0) return; const ty = -h / 2 + h * .42 + i * h * .085 + (1 - eout(p)) * 40;
    ctx.save(); ctx.globalAlpha = clamp(p * 2); ctx.fillStyle = '#fff'; rr(-w / 2 + 40, ty - h * .035, w - 80, h * .07, 18); ctx.fill();
    ctx.fillStyle = '#ffe3e6'; ctx.beginPath(); ctx.arc(-w / 2 + 100, ty, h * .022, 0, 7); ctx.fill(); label('↗', -w / 2 + 100, ty + 12, w * .05, { color: RED, weight: 900 });
    label(name, -w / 2 + 150, ty + 10, w * .045, { align: 'left', color: '#222', weight: 700 }); label(amt, w / 2 - 70, ty + 10, w * .05, { align: 'right', color: RED, weight: 900 }); ctx.restore(); });
  if (o.alert > 0) { const a = o.alert; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(255,45,61,.95)'; rr(-w / 2 + 30, -h / 2 + 40, w - 60, 110, 26); ctx.fill();
    label('⚠  Подозрительная операция', 0, -h / 2 + 108, w * .052, { weight: 800 }); ctx.restore(); }
  ctx.restore(); ctx.restore();
  if (danger > .2) glow(x, y, w * 1.3, `rgba(255,40,60,${.25 * danger})`);
}
function laptop(x, y, w, t, o = {}) {
  const h = w * .62; ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#16181f'; rr(-w / 2, -h, w, h, 18); ctx.fill(); const sc = o.screen || '#0d2a5a';
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 + 20, -h + 20, w - 40, h - 40); ctx.clip(); ctx.fillStyle = sc; ctx.fillRect(-w / 2, -h, w, h);
  if (o.paint) o.paint(-w / 2 + 20, -h + 20, w - 40, h - 40); ctx.restore();
  ctx.fillStyle = '#2a2d36'; ctx.beginPath(); ctx.moveTo(-w / 2 - 50, 0); ctx.lineTo(w / 2 + 50, 0); ctx.lineTo(w / 2 + 80, 34); ctx.lineTo(-w / 2 - 80, 34); ctx.fill();
  glow(0, -h / 2, w * .9, o.glow || 'rgba(60,140,255,.2)'); ctx.restore();
}
function virusBug(x, y, s, t, col = RED) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 6 + x) * .2);
  ctx.strokeStyle = col; ctx.lineWidth = 5; for (const k of [-1, 1]) for (const a of [-.6, 0, .6]) { ctx.beginPath(); ctx.moveTo(0, a * 30); ctx.lineTo(k * 42, a * 30 + a * 20); ctx.stroke(); }
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, 24, 32, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(0, -36, 14, 0, 7); ctx.fill();
  ctx.fillStyle = '#000'; ctx.fillRect(-2, -28, 4, 58); ctx.restore(); glow(x, y, 70 * s, 'rgba(255,40,60,.4)'); }
function serverRack(x, y, s, t, on = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = grad(-130, 0, 130, 0, [[0, '#0b0d12'], [.5, '#1d212b'], [1, '#0b0d12']]); rr(-130, -420, 260, 840, 14); ctx.fill();
  const R = rnd(Math.floor(x));
  for (let i = 0; i < 12; i++) { const yy = -390 + i * 66; ctx.fillStyle = '#10131a'; ctx.fillRect(-110, yy, 220, 54); ctx.strokeStyle = '#2a2f3a'; ctx.strokeRect(-110, yy, 220, 54);
    for (let k = 0; k < 6; k++) { const lit = on > R() && Math.sin(t * (8 + R() * 10) + i * 3 + k) > -.3; ctx.fillStyle = lit ? (R() > .8 ? '#ffb020' : GREEN) : '#1d2a22'; ctx.beginPath(); ctx.arc(-90 + k * 16, yy + 27, 5, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#05060a'; for (let k = 0; k < 8; k++) ctx.fillRect(10 + k * 11, yy + 12, 6, 30); }
  ctx.restore(); if (on > .3) glow(x, y, 260 * s, `rgba(57,255,136,${.12 * on})`); }
// botnet graph: nodes spread over a rect; infection reaches node i at time inf[i]; off: nodes go dark
function botnet(t, cx, cy, w, h, infT, o = {}) {
  const R = rnd(o.seed || 9), N = o.n || 70, P = []; for (let i = 0; i < N; i++) P.push([cx - w / 2 + R() * w, cy - h / 2 + R() * h, R()]);
  const E = []; P.forEach((p, i) => { let best = []; P.forEach((q, j) => { if (i !== j) best.push([Math.hypot(p[0] - q[0], p[1] - q[1]), j]); }); best.sort((a, b) => a[0] - b[0]); best.slice(0, 3).forEach(([, j]) => { if (i < j) E.push([i, j]); }); });
  const inf = i => infT + P[i][2] * (o.spread ?? 2.5), off = i => o.offT !== undefined ? o.offT + P[i][2] * (o.offSpread ?? 1.6) : 1e9;
  E.forEach(([i, j]) => { const a = Math.min(prog(t, inf(i), inf(i) + .3), prog(t, inf(j), inf(j) + .3)); const dead = t > Math.max(off(i), off(j));
    ctx.strokeStyle = dead ? 'rgba(90,90,100,.15)' : `rgba(255,45,61,${.15 + .5 * a})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke();
    if (a > .9 && !dead && o.packets) { const u = (t * .8 + P[i][2]) % 1; ctx.fillStyle = '#ffd0d4'; ctx.beginPath(); ctx.arc(lerp(P[i][0], P[j][0], u), lerp(P[i][1], P[j][1], u), 3, 0, 7); ctx.fill(); } });
  P.forEach((p, i) => { const a = prog(t, inf(i), inf(i) + .3), dead = t > off(i);
    if (dead) { ctx.fillStyle = 'rgba(120,120,130,.5)'; ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, 7); ctx.fill(); return; }
    ctx.fillStyle = a > 0 ? `rgba(255,${80 - 40 * a},${90 - 40 * a},1)` : 'rgba(80,160,255,.6)'; ctx.beginPath(); ctx.arc(p[0], p[1], 7 + a * 4, 0, 7); ctx.fill(); if (a > 0) glow(p[0], p[1], 40, 'rgba(255,40,60,.5)', a); });
}
function laptopIcon(x, y, s, col) { ctx.fillStyle = col; rr(x - 22 * s, y - 16 * s, 44 * s, 28 * s, 4 * s); ctx.fill(); ctx.fillRect(x - 28 * s, y + 13 * s, 56 * s, 6 * s); }
function wantedPoster(x, y, w, t, o = {}) {
  const h = w * 1.35; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(-w / 2 + 16, -h / 2 + 22, w, h);
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#efe3c6'], [1, '#d4c39c']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = '#7a1b1b'; ctx.font = `900 ${w * .2}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillText('WANTED', 0, -h / 2 + w * .22);
  ctx.fillStyle = '#2a1f14'; ctx.font = `700 ${w * .055}px ${F_HEAD}`; ctx.fillText('РАЗЫСКИВАЕТСЯ', 0, -h / 2 + w * .3);
  // silhouette portrait (no likeness)
  ctx.fillStyle = '#bfae86'; ctx.fillRect(-w * .32, -h / 2 + w * .36, w * .64, w * .62);
  ctx.save(); ctx.beginPath(); ctx.rect(-w * .32, -h / 2 + w * .36, w * .64, w * .62); ctx.clip(); hooded(0, -h / 2 + w * .78, w * .0018 * 400 / 400 * 1.1, t, {}); ctx.restore();
  label('?', 0, -h / 2 + w * .78, w * .28, { weight: 900, color: 'rgba(255,255,255,.18)' });
  ctx.fillStyle = '#2a1f14'; ctx.font = `800 ${w * .06}px ${F_HEAD}`; ctx.fillText(o.line || 'КИБЕРПРЕСТУПЛЕНИЯ', 0, -h / 2 + w * 1.08);
  ctx.fillStyle = '#7a1b1b'; ctx.font = `900 ${w * .075}px ${F_HEAD}`; ctx.fillText(o.reward || 'НАГРАДА ДО $3 000 000', 0, -h / 2 + w * 1.2);
  if (o.stamp) stamp2(o.stamp, 0, -h / 2 + w * .7, o.stampP ?? 1, '#c8102e', w * .09, -.2);
  ctx.restore();
}
function handcuffs(x, y, s, col = '#c9ccd2') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 16;
  ctx.beginPath(); ctx.arc(-90, 0, 60, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(90, 0, 60, 0, 7); ctx.stroke(); ctx.lineWidth = 8; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.ellipse(k * 12, -60, 7, 4, 0, 0, 7); ctx.stroke(); } ctx.restore(); }
function plugIcon(x, y, s, unplug) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#c9ccd2';
  ctx.save(); ctx.translate(-unplug * 60, 0); rr(-140, -40, 110, 80, 14); ctx.fill(); ctx.fillRect(-30, -24, 40, 12); ctx.fillRect(-30, 12, 40, 12); ctx.strokeStyle = '#c9ccd2'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-140, 0); ctx.lineTo(-260, 0); ctx.stroke(); ctx.restore();
  rr(40, -60, 120, 120, 18); ctx.fill(); ctx.fillStyle = '#111'; ctx.fillRect(56, -26, 16, 12); ctx.fillRect(56, 14, 16, 12); ctx.restore(); }
function bedroom(t) {
  bg('#2a2433', '#0f0d14'); ctx.fillStyle = grad(0, 200, 0, 900, [[0, '#ffd9a0'], [1, '#ff9e6b']]); ctx.fillRect(620, 260, 380, 560); // window
  ctx.strokeStyle = '#3b2f3a'; ctx.lineWidth = 18; ctx.strokeRect(620, 260, 380, 560); ctx.beginPath(); ctx.moveTo(810, 260); ctx.lineTo(810, 820); ctx.moveTo(620, 540); ctx.lineTo(1000, 540); ctx.stroke();
  glow(810, 540, 700, 'rgba(255,200,140,.35)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,210,150,.08)'; ctx.beginPath(); ctx.moveTo(620, 820); ctx.lineTo(1000, 820); ctx.lineTo(700, 1600); ctx.lineTo(-100, 1600); ctx.fill(); ctx.restore();
  floor(1450, '#2b2027', '#0e0a0d');
  ctx.fillStyle = '#e9e4ee'; rr(-60, 1240, 820, 260, 40); ctx.fill(); ctx.fillStyle = '#c7c0d4'; rr(-60, 1240, 820, 60, 30); ctx.fill(); ctx.fillStyle = '#f5f3f8'; rr(20, 1180, 260, 110, 50); ctx.fill(); // bed + pillow
  ctx.fillStyle = '#3a2a22'; ctx.fillRect(-60, 1480, 820, 60);
}
// ---------- framework hooks: glitch transitions ----------
const _baseRender = window.render;
window.render = function (t) {
  _baseRender(t);
  let i = SHOTS.findIndex(s => t < s.end); if (i < 0) i = SHOTS.length - 1; const s = SHOTS[i], lt = t - s.start;
  if (i > 0 && lt < .22 && !s.p.noGlitch) glitch(1 - lt / .22, Math.floor(t * 30));
  if (s.p.glitchAt) s.p.glitchAt.forEach(w => { const g = lt - s.E(w); if (g > 0 && g < .25) glitch(1 - g / .25, Math.floor(t * 30) + 7); });
};

// ================== SCENES ==================
SC.wakeUp = { // hook: you wake up, open the bank app, money is gone
  draw(t, d, P, E) {
    const to = E('открываешь') - .2, tv = E('исчезли') - .6;
    if (t < to) { bedroom(t); ctx.save(); cam(540, 1100, 1.05 + t * .02); person(430, 1500, 820, { cap: false, holdPhone: true, armUp: prog(t, .3, to) * .9, light: 1, top: '#c9d2e0', pants: '#3a4a6a', hair: '#3a2618', rim: 'rgba(255,210,150,.8)', shrug: 0 }); ctx.restore(); }
    else { darkBg(t, 'rgba(40,90,220,.25)'); ctx.save(); cam(540, 960, lerp(1.0, 1.08, prog(t, to, d)));
      const drain = eio(prog(t, tv, tv + 1.4)), bal = lerp(12480, 0, drain);
      bankApp(540, 960, 620, t, bal, { danger: prog(t, tv + .9, tv + 1.4), tx: [['Перевод', '-$4,900.00', prog(t, tv, tv + .4)], ['Перевод', '-$3,750.00', prog(t, tv + .3, tv + .7)], ['Снятие', '-$2,980.00', prog(t, tv + .6, tv + 1)], ['Перевод', '-$850.00', prog(t, tv + .9, tv + 1.3)]], alert: prog(t, tv + 1.1, tv + 1.4) });
      ctx.restore(); if (t > tv + 1.3 && t < tv + 1.55) glitch(.8, Math.floor(t * 30)); }
    scanlines(.05);
  },
  sfx(d, P, E) { const to = E('открываешь') - .2, tv = E('исчезли') - .6; return [[.1, 'chime', .25], [to, 'notif', .45], [tv, 'ticks_down', .55, { dur: 1.4 }], [tv + 1.3, 'error', .6], [tv + 1.3, 'glitch', .45]]; }
};
SC.emptied = {
  draw(t, d, P, E) { darkBg(t, 'rgba(255,40,60,.2)'); const tz = E('опустошен') - .3;
    ctx.save(); cam(540, 900, 1.02 + t * .01);
    person(540, 1820, 1400, { shock: true, holdPhone: true, armUp: .55, light: 1, top: '#c9d2e0', hair: '#3a2618', phoneCol: '#ff4050', phoneGlow: 'rgba(255,40,60,.5)', rim: 'rgba(255,90,100,.8)' });
    ctx.restore();
    // floating "not me" crosses
    [['ничего не покупал', 'покупал'], ['не переводил', 'переводил']].forEach(([, w], i) => { const p = prog(t, E(w) - .2, E(w) + .2); if (p > 0) { iconDisc(i ? 860 : 220, 520, 90, 'x', p, '#c8202e'); } });
    if (t > tz) { const k = prog(t, tz, tz + .4); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(10,0,0,.75)'; rr(140, 1300, 800, 220, 30); ctx.fill(); ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.stroke();
      label('$0.00', 540, 1460, 150, { weight: 900, color: '#ff4d5a', shadow: 'rgba(255,40,60,.7)' }); ctx.restore(); }
    scanlines(.05);
  },
  sfx(d, P, E) { return [[E('покупал') - .2, 'soft_x', .45], [E('переводил') - .2, 'soft_x', .45], [E('опустошен') - .3, 'thud_soft', .6], [E('опустошен') - .25, 'heartbeat', .5, { dur: 2 }]]; }
};
SC.worldOps = {
  draw(t, d, P, E) { darkBg(t); codeRain(t, .18);
    ctx.save(); cam(540, 900, 1.0 + t * .02);
    globe(540, 1080, 470, t, { speed: .3 }); const R = rnd(4); for (let i = 0; i < 30; i++) { const st = 1.2 + R() * (d - 1.5); const a = prog(t, st, st + .4); if (a <= 0) continue; const ang = R() * 6.28, rr2 = R() * 410; glow(540 + Math.cos(ang) * rr2, 1080 + Math.sin(ang) * rr2 * .9, 60, 'rgba(255,40,60,.75)', a); }
    ctx.restore();
    ctx.save(); ctx.translate(540, 420); ctx.globalAlpha = prog(t, .2, .5); splitFlap(String(Math.round(lerp(2006, 2009, eio(prog(t, .3, 1.6))))), 0, 0, 150, 1); ctx.restore();
    label('2000-е', 540, 520, 46, { color: '#9fb4d8', spacing: 8, alpha: prog(t, 1.6, 2) });
    scanlines(.05); },
  sfx(d) { return [[0, 'drone', .4, { dur: d }], [.3, 'flapseq', .3, { dur: 1.3 }], [1.2, 'popseq', .2, { n: 10, step: (d - 1.5) / 10 }]]; }
};
SC.slavik = {
  draw(t, d, P, E) { const ts = E('slavik', 1, d - 1.6) - .4;
    darkBg(t, 'rgba(57,255,136,.12)'); ctx.save(); cam(540, 960, 1.04 + t * .012);
    monitorWall(t, 540, 360, { alert: t > ts }); hooded(540, 1250, 1.25, t, { light: GREEN, eyes: 0 });
    ctx.fillStyle = '#05070c'; ctx.fillRect(0, 1640, W, 300); ctx.restore();
    // terminal
    ctx.save(); ctx.fillStyle = 'rgba(2,10,6,.88)'; rr(90, 1430, 900, 300, 20); ctx.fill(); ctx.strokeStyle = 'rgba(57,255,136,.6)'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    typeText('> whoami', 130, 1510, 40, prog(t, .4, 1.2), GREEN, { t });
    typeText('> alias: "Slavik"', 130, 1580, 40, prog(t, ts, ts + 1), GREEN, { t });
    typeText('> status: unknown', 130, 1650, 40, prog(t, ts + 1, ts + 1.6), '#ffb020', { t });
    scanlines(.06); },
  sfx(d, P, E) { const ts = E('slavik', 1, d - 1.6) - .4; return [[0, 'drone', .35, { dur: d }], [.4, 'typing', .45, { dur: .8 }], [ts, 'typing', .45, { dur: 1.5 }], [ts + .9, 'beeps', .3]]; }
};
SC.zeusFile = {
  draw(t, d, P, E) { const tz = E('zeus', 1, d - 1.5) - .4;
    ctx.fillStyle = '#16100a'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(540, 960, 1.03 + t * .012);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1e14'], [1, '#0e0905']]); ctx.fillRect(-100, -100, W + 200, H + 200); glow(540, 700, 800, 'rgba(255,200,130,.22)');
    paperDoc(540, 860, 760, -.03, 'МАТЕРИАЛЫ ДЕЛА\nCASE FILE', { hl: [[2, prog(t, 1, 1.6)], [3, prog(t, 1.4, 2)]] });
    const k = eback(prog(t, tz, tz + .5)); if (k > 0) { ctx.save(); ctx.translate(540, 1420); ctx.scale(k, k); ctx.fillStyle = '#0a0a0e'; rr(-300, -110, 600, 220, 30); ctx.fill(); ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.stroke();
      glyph('bolt', 0); ctx.fillStyle = '#ffcc00'; ctx.beginPath(); const r = 80; ctx.moveTo(-200 + 12, -60); ctx.lineTo(-200 - 32, 8); ctx.lineTo(-200, 8); ctx.lineTo(-200 - 12, 60); ctx.lineTo(-200 + 32, -8); ctx.lineTo(-200, -8); ctx.closePath(); ctx.fill();
      label('ZEUS', 60, 40, 130, { weight: 900, color: '#fff', shadow: 'rgba(255,40,60,.7)' }); ctx.restore(); }
    ctx.restore(); },
  sfx(d, P, E) { return [[.05, 'paper', .5], [1, 'marker', .3], [E('zeus', 1, d - 1.5) - .4, 'zap', .45], [E('zeus', 1, d - 1.5) - .4, 'boom', .45]]; }
};
SC.warning = {
  draw(t, d) { bg('#120206', '#030001'); const pulse = .5 + .5 * Math.sin(t * 7); glow(540, 900, 700, `rgba(255,30,50,${.25 + .2 * pulse})`);
    ctx.save(); ctx.translate(540, 900); const s = eback(prog(t, .05, .45)) * (1 + .03 * pulse); ctx.scale(s, s);
    ctx.fillStyle = '#ff2d3d'; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(260, 190); ctx.lineTo(-260, 190); ctx.closePath(); ctx.fill(); ctx.lineJoin = 'round'; ctx.strokeStyle = '#ff2d3d'; ctx.lineWidth = 40; ctx.stroke();
    ctx.fillStyle = '#120206'; rr(-22, -140, 44, 200, 20); ctx.fill(); ctx.beginPath(); ctx.arc(0, 120, 26, 0, 7); ctx.fill(); ctx.restore(); scanlines(.07); },
  sfx() { return [[0, 'alarm', .35, { dur: 2 }]]; }
};
SC.infect = {
  draw(t, d, P, E) { const tb = E('похищать') - .3; darkBg(t);
    ctx.save(); cam(540, 900, 1.03 + t * .01);
    laptop(540, 760, 820, t, { screen: '#0d2a5a', glow: t > 2 ? 'rgba(255,40,60,.25)' : 'rgba(60,140,255,.2)', paint: (x, y, w, h) => {
      ctx.fillStyle = '#e9eef6'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#1554c0'; ctx.fillRect(x, y, w, 60); label('online-bank.com', x + w / 2, y + 42, 28, { color: '#fff', weight: 700 });
      ctx.fillStyle = '#bfc8d6'; for (let i = 0; i < 3; i++) rr(x + 60, y + 110 + i * 80, w - 120, 50, 10), ctx.fill();
      const R = rnd(2); for (let i = 0; i < 16; i++) { const st = .8 + R() * 2.4; if (t > st) virusBug(x + 40 + R() * (w - 80), y + 80 + R() * (h - 120), .5 + R() * .4, t); } } });
    // stolen data stream to the hooded figure
    if (t > tb) { const R = rnd(7); for (let i = 0; i < 40; i++) { const u = ((t - tb) * .6 + R()) % 1; const x = lerp(540, 540, u), y = lerp(760, 1500, u);
        ctx.save(); ctx.globalAlpha = 1 - u * .5; label(['****', '4111…', 'PIN', 'login', '$$$', 'IBAN'][i % 6], x + Math.sin(u * 8 + i) * 160, y, 30, { color: i % 2 ? GREEN : '#ffd0d4', font: MONO, weight: 700 }); ctx.restore(); }
      ctx.save(); ctx.globalAlpha = prog(t, tb, tb + .6); hooded(540, 1620, .9, t, { light: RED }); ctx.restore(); }
    ctx.restore(); scanlines(.05); },
  sfx(d, P, E) { return [[.8, 'glitch', .3], [1.5, 'popseq', .25, { n: 12, step: .2 }], [E('похищать') - .3, 'data', .45, { dur: d - E('похищать') }]]; }
};
SC.dataToMoney = {
  draw(t, d, P, E) { darkBg(t, 'rgba(57,255,136,.12)'); codeRain(t, .12);
    const items = [['пароли', 'magnifier', '#2e6fd7', 'ПАРОЛИ'], ['счетах', 'doc', '#d9a51a', 'СЧЕТА'], ['конфиденциальные', 'shield', '#7b4bd1', 'ЛИЧНЫЕ ДАННЫЕ']];
    items.forEach(([w, ic, c, l], i) => { const st = E(w) - .2, y = 380 + i * 330; iconDisc(300, y, 110, ic, prog(t, st, st + .5), c); label(l, 300, y + 170, 36, { spacing: 4, alpha: prog(t, st + .2, st + .6) });
      const k = prog(t, E('кражи') - .6 + i * .15, E('кражи') + i * .15); if (k > 0) { ctx.strokeStyle = 'rgba(57,255,136,.8)'; ctx.lineWidth = 6; ctx.setLineDash([16, 10]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(430, y); ctx.lineTo(lerp(430, 760, k), lerp(y, 710, k)); ctx.stroke(); ctx.setLineDash([]); } });
    const km = prog(t, E('кражи') - .1, E('кражи') + .4); if (km > 0) { ctx.save(); ctx.translate(800, 720); ctx.scale(eback(km), eback(km)); moneyBag(0, 0, .8, ''); ctx.restore(); moneyRain(t - E('кражи'), 18, 4); }
    scanlines(.05); },
  sfx(d, P, E) { return [...['пароли', 'счетах', 'конфиденциальные'].map(w => [E(w) - .2, 'pop', .5]), [E('кражи') - .6, 'data', .35, { dur: .8 }], [E('кражи') - .1, 'coins', .45]]; }
};
SC.onlyBeginning = {
  draw(t, d) { darkBg(t, 'rgba(255,40,60,.15)'); codeRain(t, .3, '255,45,61', 8); ctx.save(); cam(540, 960, lerp(1.25, 1, eout(prog(t, 0, d)))); hooded(540, 1200, 1.4, t, { light: RED, eyes: prog(t, .8, 1.4) }); ctx.restore(); scanlines(.07); },
  sfx(d) { return [[0, 'boom', .5], [.8, 'riser', .3, { dur: d - .8 }]]; }
};
SC.gameover = {
  draw(t, d, P, E) { const tg = E('gameover', 1, .8) - .3; darkBg(t);
    ctx.save(); cam(540, 1000, 1.0 + t * .015); globe(540, 1080, 470, t, { speed: .2 }); botnet(t, 540, 1080, 860, 820, tg + .6, { n: 80, packets: true, spread: 3 }); ctx.restore();
    const k = prog(t, tg, tg + .5); ctx.save(); ctx.globalAlpha = k; ctx.translate(540, 300); ctx.scale(eback(k), eback(k));
    label('GAMEOVER', 0, 0, 120, { weight: 900, color: '#fff', shadow: 'rgba(255,40,60,.8)', font: MONO }); label('ZEUS', 0, 110, 110, { weight: 900, color: RED, shadow: 'rgba(255,40,60,.8)', font: MONO }); ctx.restore();
    scanlines(.05); },
  sfx(d, P, E) { const tg = E('gameover', 1, .8) - .3; return [[tg, 'glitch', .5], [tg, 'boom', .4], [tg + .6, 'popseq', .25, { n: 16, step: .18 }], [0, 'drone', .35, { dur: d }]]; }
};
SC.losses = { // $100,000,000+
  draw(t, d, P, E) { const tm = E('сто') - .5; bg('#060a08', '#010201'); glow(540, 900, 900, 'rgba(57,255,136,.18)');
    ctx.save(); cam(540, 960, lerp(1.05, .98, prog(t, 0, d))); const R = rnd(4);
    for (let i = 0; i < 60; i++) { const st = tm + .2 + R() * 2, k = t - st; if (k > 0) { const x = R() * W, y = -80 + k * (400 + R() * 300); if (y < H + 100) bill(x, y, 1 + R() * .5, R() * 6 + k * 2); } }
    ctx.restore();
    label('ПОТЕРИ ПО ОЦЕНКАМ ФБР', 540, 700, 44, { color: '#9fb4a8', spacing: 6, alpha: prog(t, .3, .7) });
    ctx.save(); ctx.fillStyle = 'rgba(2,8,4,.85)'; rr(40, 760, 1000, 260, 30); ctx.fill(); ctx.strokeStyle = 'rgba(57,255,136,.5)'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    odometer('$100,000,000', 540, 960, 132, prog(t, tm, tm + 2.2), { color: '#fff', sym: GREEN, shadow: 'rgba(57,255,136,.5)' });
    label('+', 1000, 900, 110, { weight: 900, color: GREEN, alpha: prog(t, tm + 2.2, tm + 2.5) });
    scanlines(.04); },
  sfx(d, P, E) { const tm = E('сто') - .5; return [[tm, 'ticks', .5, { dur: 2.2 }], [tm + 2.2, 'chime', .5], [tm + 2.3, 'coins', .45]]; }
};
SC.millionPCs = {
  draw(t, d) { darkBg(t); const cols = 12, rows = 18;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = 90 + c * 82, y = 330 + r * 80, st = .3 + ((r * 7 + c * 13) % 23) / 23 * (d - .8); laptopIcon(x, y, 1.1, t > st ? '#ff2d3d' : '#2b3a5a'); if (t > st && t < st + .2) glow(x, y, 60, 'rgba(255,40,60,.6)'); }
    ctx.save(); ctx.fillStyle = 'rgba(4,2,6,.85)'; rr(90, 1720, 900, 150, 26); ctx.fill(); ctx.restore();
    const n = Math.floor(lerp(0, 1000000, eio(prog(t, .2, d - .3)))); label(n.toLocaleString('ru-RU') + '+', 540, 1825, 84, { weight: 900, color: '#ff5a66', font: MONO });
    label('ЗАРАЖЁННЫХ КОМПЬЮТЕРОВ', 540, 250, 48, { weight: 900, spacing: 3 }); scanlines(.05); },
  sfx(d) { return [[.2, 'ticks', .4, { dur: d - .4 }]]; }
};
SC.victims = {
  draw(t, d) { darkBg(t); ctx.save(); cam(540, 960, 1.02); globe(540, 960, 440, t, { speed: .35, net: true });
    const R = rnd(12); for (let i = 0; i < 26; i++) { const st = .1 + R() * (d - .4), a = prog(t, st, st + .3); if (a <= 0) continue; const ang = R() * 6.28, rr2 = R() * 400, x = 540 + Math.cos(ang) * rr2, y = 960 + Math.sin(ang) * rr2;
      icon(x, y, 46 * eback(a), '#ffd0d4'); glow(x, y - 20, 60, 'rgba(255,40,60,.5)', a); } ctx.restore(); scanlines(.05); },
  sfx(d) { return [[.1, 'popseq', .3, { n: 14, step: (d - .4) / 14 }]]; }
};
SC.unstoppable = {
  draw(t, d) { darkBg(t, 'rgba(255,40,60,.15)'); // nodes get cut and regrow
    const cut = (t * .9) % 1; botnet(t, 540, 960, 900, 1300, -10, { n: 60, packets: true, seed: 5 });
    ctx.save(); ctx.strokeStyle = `rgba(34,227,255,${1 - cut})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(lerp(80, 1000, cut), 300); ctx.lineTo(lerp(200, 1100, cut), 1700); ctx.stroke(); ctx.restore();
    iconDisc(540, 960, 110, 'shield', prog(t, .2, .6), '#5b6578'); bigX(540, 960, 260, prog(t, d * .5, d * .5 + .5)); scanlines(.05); },
  sfx(d) { return [[.2, 'pop', .4], [d * .5, 'soft_x', .45], [0, 'drone', .35, { dur: d }]]; }
};
SC.investigators = {
  draw(t, d) { bg('#05080f', '#020306'); ctx.save(); cam(540, 960, 1.0 + t * .012);
    monitorWall(t, 540, 300, {}); for (let i = 0; i < 3; i++) person(240 + i * 300, 1500, 820, { silhouette: true, color: '#05070c', rim: 'rgba(34,227,255,.8)', cap: i === 1, flip: i === 2 });
    ctx.restore();
    // radar closing in
    const k = eio(prog(t, .2, d)); ctx.save(); ctx.translate(540, 1500); ctx.strokeStyle = NEON; ctx.lineWidth = 4; ctx.globalAlpha = .9;
    for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(0, 0, r * 120 * (1.4 - k * .6), 0, 7); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-420, 0); ctx.lineTo(420, 0); ctx.moveTo(0, -420); ctx.lineTo(0, 420); ctx.stroke(); ctx.rotate(t * 2); ctx.fillStyle = 'rgba(34,227,255,.18)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 420, 0, .5); ctx.fill(); ctx.restore();
    glow(540 + Math.cos(t) * 40 * (1 - k), 1500 + Math.sin(t) * 40 * (1 - k), 60, 'rgba(255,40,60,.9)'); scanlines(.05); },
  sfx(d) { return [[0, 'sonar', .45, { dur: d }]]; }
};
SC.takedown = {
  draw(t, d, P, E) { const ty = E('2014') - .2, tn = E('нарушить') - .3; darkBg(t);
    ctx.save(); cam(540, 1000, 1.0 + t * .01); botnet(t, 540, 1150, 900, 1100, -10, { n: 80, packets: true, offT: tn, offSpread: 1.8 }); ctx.restore();
    ctx.save(); ctx.translate(540, 330); ctx.globalAlpha = prog(t, ty - .2, ty); splitFlap('2014', 0, 0, 170, prog(t, ty, ty + 1)); ctx.restore();
    const k = prog(t, tn + 1.8, tn + 2.2); if (k > 0) { ctx.save(); ctx.translate(540, 1150); ctx.scale(eback(k), eback(k)); ctx.fillStyle = 'rgba(0,0,0,.8)'; rr(-330, -90, 660, 180, 26); ctx.fill(); ctx.strokeStyle = NEON; ctx.lineWidth = 5; ctx.stroke(); label('OFFLINE', 0, 40, 120, { weight: 900, color: NEON, font: MONO, shadow: 'rgba(34,227,255,.7)' }); ctx.restore(); }
    scanlines(.05); },
  sfx(d, P, E) { const ty = E('2014') - .2, tn = E('нарушить') - .3; return [[ty, 'flap', .45], [tn, 'powerdown', .55], [tn + 1.8, 'thud_soft', .5]]; }
};
SC.collapse = {
  draw(t, d) { darkBg(t); ctx.save(); cam(540, 960, 1.02);
    for (let i = 0; i < 4; i++) { const fall = eio(prog(t, .3 + i * .3, 1.4 + i * .3)); ctx.save(); ctx.translate(180 + i * 240, 1300 + fall * 200); ctx.rotate(fall * (i % 2 ? .5 : -.5)); ctx.globalAlpha = 1 - fall * .4; serverRack(0, 0, .8, t, 1 - fall); ctx.restore(); }
    ctx.restore(); const R = rnd(6); for (let i = 0; i < 40; i++) { const st = .5 + R() * 1.5, k = t - st; if (k < 0) continue; ctx.fillStyle = `rgba(255,${150 + R() * 100},80,${Math.max(0, 1 - k)})`; ctx.beginPath(); ctx.arc(200 + R() * 700, 1100 + k * 300, 3 + R() * 4, 0, 7); ctx.fill(); }
    scanlines(.05); },
  sfx() { return [[.3, 'powerdown', .45], [.9, 'thud_soft', .45], [1.4, 'thud_soft', .4]]; }
};
SC.problem = {
  draw(t, d) { bg('#120206', '#030001'); glitch(0, 0); codeRain(t, .25, '255,45,61', 11); glow(540, 960, 700, 'rgba(255,30,50,.3)');
    iconDisc(540, 960, 200, 'question', eback(prog(t, .05, .5)), '#c8202e'); scanlines(.08); },
  sfx() { return [[0, 'glitch', .5], [.05, 'boom', .45]]; }
};
SC.twoTasks = {
  draw(t, d, P, E) { const ta = E('арестовать') - .2; darkBg(t);
    ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(0, 955, W, 10); ctx.restore();
    // top: unplug the network ✓
    ctx.save(); ctx.translate(0, -60); serverRack(300, 520, .6, t, 1 - prog(t, .8, 1.4)); plugIcon(720, 520, 1, eio(prog(t, .5, 1.2))); ctx.restore();
    iconDisc(900, 260, 70, 'check', prog(t, 1.2, 1.6), '#2f9e6b');
    // bottom: arrest a person ✗
    const k = prog(t, ta, ta + .5); ctx.save(); ctx.globalAlpha = k; hooded(380, 1450, .7, t, { light: RED }); handcuffs(780, 1350, 1, '#c9ccd2'); ctx.restore();
    iconDisc(900, 1100, 70, 'x', prog(t, ta + 1.4, ta + 1.8), '#c8202e');
    scanlines(.05); },
  sfx(d, P, E) { const ta = E('арестовать') - .2; return [[.5, 'click', .5], [.8, 'powerdown', .4], [1.2, 'chime', .4], [ta, 'swoosh', .4], [ta + .4, 'cuffs', .5], [ta + 1.4, 'soft_x', .5]]; }
};
SC.outOfReach = {
  draw(t, d) { bg('#03060f', '#010205'); const R = rnd(3); for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(255,255,255,${R() * .6})`; ctx.fillRect(R() * W, R() * H, 2, 2); }
    ctx.save(); cam(540, 960, 1.0); globe(540, 980, 430, t, { speed: .1 });
    const A = [330, 820], B = [760, 760]; const k = eio(prog(t, .3, 1.8));
    glow(A[0], A[1], 60, 'rgba(34,227,255,.9)'); glow(B[0], B[1], 60, 'rgba(255,40,60,.9)');
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 5; ctx.setLineDash([18, 12]); ctx.beginPath(); for (let i = 0; i <= 40 * k; i++) { const u = i / 40; ctx.lineTo(lerp(A[0], B[0], u), lerp(A[1], B[1], u) - Math.sin(u * Math.PI) * 220); } ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    label('ФБР', 330, 640, 50, { weight: 900, color: NEON, alpha: prog(t, .3, .7) });
    ctx.save(); ctx.globalAlpha = prog(t, 1, 1.5); hooded(760, 1600, .55, t, { light: RED }); ctx.restore();
    const xk = prog(t, 2.2, 2.8); if (xk > 0) { ctx.save(); ctx.globalAlpha = xk; ctx.strokeStyle = RED; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(760, 1400, 260, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(576, 1216); ctx.lineTo(944, 1584); ctx.stroke(); ctx.restore(); }
    scanlines(.05); },
  sfx(d) { return [[.3, 'swoosh', .4], [0, 'drone', .35, { dur: d }], [2.2, 'error', .45]]; }
};
SC.reward = {
  draw(t, d, P, E) { const tf = E('феврале') - .3, tr = E('награду') - .3; ctx.fillStyle = '#16100a'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(540, 960, 1.02 + t * .01); ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1e14'], [1, '#0e0905']]); ctx.fillRect(-100, -100, W + 200, H + 200); glow(540, 800, 900, 'rgba(255,200,130,.25)');
    const ck = eout(prog(t, tf, tf + .6)); if (ck > 0) calendarPage(820, 360 + (1 - ck) * 900, 1, 'ФЕВ', '', '2015', { rot: .08 });
    const wk = eout(prog(t, tr - .6, tr)); if (wk > 0) wantedPoster(480, 1000 + (1 - wk) * 900, 720, t, { rot: -.04 });
    ctx.restore();
    const ok = prog(t, tr + .2, tr + .5); if (ok > 0) { ctx.save(); ctx.globalAlpha = ok; ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(60, 1540, 960, 230, 30); ctx.fill(); ctx.strokeStyle = 'rgba(232,185,49,.6)'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      label('НАГРАДА ДО', 540, 1600, 38, { color: '#e8b931', spacing: 10, alpha: ok }); odometer('$3,000,000', 540, 1735, 120, prog(t, tr + .3, tr + 2.2), { color: '#fff', sym: '#e8b931', shadow: 'rgba(255,210,90,.5)' }); }
    if (t > tr + 2.2) moneyRain(t - tr - 2.2, 26, 9);
  },
  sfx(d, P, E) { const tf = E('феврале') - .3, tr = E('награду') - .3; return [[tf, 'page', .5], [tr - .6, 'paper', .5], [tr + .3, 'ticks', .5, { dur: 1.9 }], [tr + 2.2, 'chime', .5], [tr + 2.3, 'coins', .4]]; }
};
SC.threeMillion = {
  draw(t, d) { bg('#0b0904', '#020100'); glow(540, 900, 900, 'rgba(255,200,80,.3)'); const R = rnd(6);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 8 - r; c++) { const x = 540 + (c - (7 - r) / 2) * 130, y = 1500 - r * 48, k = eout(prog(t, .1 + (r * 8 + c) * .03, .5 + (r * 8 + c) * .03)); if (k > 0) cashBrick(x, lerp(y - 500, y, k), 1); }
    label('$3 000 000', 540, 900, 170, { weight: 900, color: '#ffe08a', shadow: 'rgba(255,200,80,.6)', alpha: prog(t, .05, .3) });
    moneyRain(t, 30, 2); },
  sfx() { return [[.05, 'coins', .5], [.1, 'boom', .35]]; }
};
SC.onePerson = {
  draw(t, d) { bg('#030304', '#000'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = grad(0, 0, 0, 1500, [[0, 'rgba(255,240,210,.25)'], [1, 'rgba(255,240,210,.04)']]);
    ctx.beginPath(); ctx.moveTo(460, -50); ctx.lineTo(620, -50); ctx.lineTo(860, 1500); ctx.lineTo(220, 1500); ctx.fill(); ctx.restore();
    ctx.save(); cam(540, 1100, lerp(1.0, 1.15, prog(t, 0, d))); hooded(540, 1250, .9, t, { light: 'rgba(255,240,210,1)' }); ctx.restore();
    label('1', 900, 500, 220, { weight: 900, color: '#e8b931', alpha: prog(t, .3, .7), shadow: 'rgba(232,185,49,.6)' }); scanlines(.05); },
  sfx() { return [[0, 'riser', .3, { dur: 2.5 }]]; }
};
SC.worldHunt = {
  draw(t, d, P, E) { const tw = E('мир') - .5; darkBg(t); ctx.save(); cam(540, 960, 1.0 + t * .01);
    if (t < tw) { const R = rnd(3); for (let i = 0; i < 6; i++) { const x = 160 + i * 150, h = 300 + R() * 100; person(x, 1500, h * 2.4, { silhouette: true, color: '#06080e', rim: 'rgba(34,227,255,.7)', cap: R() > .5, flip: R() > .5 }); }
      hooded(540, 900, .8, t, { light: RED }); }
    else { globe(540, 960, 460, t, { speed: .3, net: true }); const R = rnd(8); for (let i = 0; i < 40; i++) { const st = tw + R() * 2.5, a = prog(t, st, st + .3); if (a <= 0) continue; const ang = R() * 6.28, rr2 = R() * 430; iconDisc(540 + Math.cos(ang) * rr2, 960 + Math.sin(ang) * rr2, 22, 'magnifier', a, '#2e6fd7'); } }
    ctx.restore(); scanlines(.05); },
  sfx(d, P, E) { return [[E('мир') - .5, 'swoosh', .45], [E('мир'), 'popseq', .3, { n: 14, step: .17 }]]; }
};
SC.twist = {
  draw(t, d) { darkBg(t, 'rgba(255,40,60,.18)'); ctx.save(); ctx.translate(540, 960); ctx.rotate(eio(prog(t, 0, d)) * Math.PI * .25); ctx.scale(1 + .1 * Math.sin(t * 3), 1 + .1 * Math.sin(t * 3)); ctx.translate(-540, -960);
    for (let i = 0; i < 8; i++) { ctx.strokeStyle = `rgba(255,45,61,${.12 + i * .04})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(540, 960, 120 + i * 90, t * (i % 2 ? 1 : -1), t * (i % 2 ? 1 : -1) + 4); ctx.stroke(); }
    ctx.restore(); iconDisc(540, 960, 150, 'question', eback(prog(t, .2, .6)), '#c8202e'); scanlines(.06); },
  sfx() { return [[0, 'rewind', .35, { dur: 2.5 }]]; }
};
SC.emptyCell = {
  draw(t, d) { bg('#14161c', '#06070a'); glow(540, 400, 700, 'rgba(220,230,255,.18)'); ctx.save(); cam(540, 960, 1.02 + t * .012);
    ctx.fillStyle = '#2a2d36'; ctx.fillRect(140, 300, 800, 1300); floor(1500, '#1d2028', '#08090c'); ctx.fillStyle = '#3a3f4c'; rr(200, 1300, 360, 90, 12); ctx.fill(); // bunk
    ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(600, 420, 220, 160); // window light
    for (let i = 0; i < 9; i++) { ctx.fillStyle = grad(100 + i * 110, 0, 130 + i * 110, 0, [[0, '#4a4f5a'], [.5, '#c9ccd2'], [1, '#4a4f5a']]); ctx.fillRect(100 + i * 110, 200, 26, 1500); }
    ctx.fillStyle = '#5a5f6a'; ctx.fillRect(80, 200, 920, 30); ctx.fillRect(80, 1000, 920, 24); ctx.restore();
    label('ПУСТО', 540, 1760, 90, { weight: 900, color: '#ff5a66', spacing: 12, alpha: prog(t, 1.5, 2) }); scanlines(.05); },
  sfx() { return [[0, 'cell', .45], [1.5, 'thud_soft', .4]]; }
};
SC.atLarge = {
  draw(t, d) { bg('#0a0c12', '#030406'); ctx.save(); cam(540, 960, 1.02 + t * .012);
    ctx.fillStyle = '#2a2d36'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 20; i++) { ctx.fillStyle = i % 2 ? '#25282f' : '#2c2f37'; ctx.fillRect(0, i * 100, W, 100); } // brick wall
    wantedPoster(540, 900, 760, t, { rot: -.03, stamp: 'НЕ ПОЙМАН', stampP: prog(t, d * .6, d * .6 + .4) });
    ctx.restore(); const R = rnd(Math.floor(t * 30)); ctx.strokeStyle = 'rgba(200,210,230,.25)'; ctx.lineWidth = 2; for (let i = 0; i < 70; i++) { const x = R() * W, y = R() * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 10, y + 40); ctx.stroke(); } // rain
    scanlines(.05); },
  sfx(d) { return [[0, 'rain', .4, { dur: d }], [d * .6, 'stamp', .55]]; }
};
SC.scariest = {
  draw(t, d) { bg('#040406', '#000'); ctx.save(); cam(540, 1100, lerp(1.0, 1.3, eio(prog(t, 0, d))));
    glow(lerp(-200, 1300, eio(prog(t, .3, d))), 900, 700, 'rgba(227,38,47,.5)'); hooded(540, 1250, 1.1, t, { light: RED, eyes: .4 + .4 * Math.sin(t * 3) }); ctx.restore(); dust(t, 31, 70, .5); scanlines(.07); },
  sfx(d) { return [[0, 'heartbeat', .5, { dur: d }], [0, 'drone', .4, { dur: d }]]; }
};
SC.canStop = {
  draw(t, d, P, E) { const b2 = E('отключить') - .3, b3 = E('разрушить') - .3; darkBg(t);
    if (t < b2) { serverRack(540, 1000, 1.3, t, 1 - prog(t, .6, 1.3)); iconDisc(540, 260, 80, 'check', prog(t, 1.2, 1.6), '#2f9e6b'); }
    else if (t < b3) { const lt = t - b2; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const st = .2 + (r * 3 + c) * .1; laptopIcon(250 + c * 290, 600 + r * 260, 3, lt > st ? '#2b3a5a' : '#ff2d3d'); } iconDisc(540, 260, 80, 'check', prog(lt, 1.4, 1.8), '#2f9e6b'); }
    else { const lt = t - b3; botnet(lt, 540, 1000, 900, 1200, -10, { n: 60, seed: 12 }); const sh = eio(prog(lt, .3, 1.2)); if (sh > 0) { ctx.save(); ctx.fillStyle = `rgba(4,6,12,${sh})`; ctx.fillRect(0, 0, W, H); ctx.restore(); const R = rnd(4); for (let i = 0; i < 50; i++) { const a = R() * 6.28, r = sh * 900 * R(); ctx.fillStyle = `rgba(255,45,61,${1 - sh})`; ctx.fillRect(540 + Math.cos(a) * r, 1000 + Math.sin(a) * r, 14, 14); } }
      iconDisc(540, 260, 80, 'check', prog(lt, 1.2, 1.6), '#2f9e6b'); }
    scanlines(.05); },
  sfx(d, P, E) { const b2 = E('отключить') - .3, b3 = E('разрушить') - .3; return [[.6, 'powerdown', .45], [1.2, 'chime', .35], [b2 + .2, 'popseq', .3, { n: 12, step: .1 }], [b2 + 1.4, 'chime', .35], [b3 + .3, 'shatter', .5], [b3 + 1.2, 'chime', .35]]; }
};
SC.caseOpen = {
  draw(t, d) { ctx.fillStyle = '#16100a'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(540, 960, 1.03 + t * .01);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1e14'], [1, '#0e0905']]); ctx.fillRect(-100, -100, W + 200, H + 200); glow(540, 800, 900, 'rgba(255,200,130,.22)');
    ctx.fillStyle = '#d6b77c'; rr(120, 500, 860, 1000, 20); ctx.fill(); ctx.fillStyle = '#c9a868'; rr(120, 440, 360, 100, 20); ctx.fill();
    paperDoc(560, 1000, 700, -.03, 'ДЕЛО: ZEUS / GAMEOVER ZEUS'); stamp2('ДЕЛО ОТКРЫТО', 560, 1300, prog(t, d * .45, d * .45 + .4), '#c8102e', 80, -.15);
    ctx.restore(); },
  sfx(d) { return [[.1, 'paper', .5], [d * .45, 'stamp', .6]]; }
};
SC.howMany = {
  draw(t, d, P, E) { darkBg(t); const ts = E('сколько') - .4; ctx.save(); cam(540, 960, lerp(1.3, .85, eio(prog(t, 0, d))));
    globe(540, 960, 460, t, { speed: .25 });
    if (t < ts) botnet(t, 540, 960, 600, 600, .2, { n: 40, packets: true });
    else { const R = rnd(21); for (let k = 0; k < 9; k++) { const cx = 540 + (R() - .5) * 900, cy = 960 + (R() - .5) * 1000; ctx.save(); ctx.globalAlpha = prog(t, ts + k * .25, ts + k * .25 + .5); botnet(t, cx, cy, 300, 300, ts + k * .25, { n: 14, seed: 30 + k, spread: .8 }); ctx.restore(); } }
    ctx.restore();
    const tm = E('ста') - .3; if (t < ts) { ctx.save(); ctx.globalAlpha = prog(t, tm, tm + .3) * (1 - prog(t, ts - .3, ts)); label('$100 000 000+', 540, 300, 100, { weight: 900, color: GREEN, shadow: 'rgba(57,255,136,.6)' }); ctx.restore(); }
    else { const n = prog(t, ts + .3, ts + .8); iconDisc(540, 260, 100, 'question', n, '#c8202e'); }
    scanlines(.05); },
  sfx(d, P, E) { return [[0, 'drone', .4, { dur: d }], [E('ста') - .3, 'coins', .35], [E('сколько') - .4, 'popseq', .35, { n: 9, step: .25 }], [E('сколько') + .3, 'pop', .5]]; }
};
SC.noGun = {
  draw(t, d) { bg('#0c0d12', '#030305'); glow(540, 900, 800, 'rgba(255,220,150,.15)'); ctx.save(); cam(540, 960, 1.02);
    // vault door
    ctx.save(); ctx.translate(540, 760); ctx.fillStyle = grad(-360, 0, 360, 0, [[0, '#3a3f4c'], [.5, '#9aa3b2'], [1, '#3a3f4c']]); ctx.beginPath(); ctx.arc(0, 0, 360, 0, 7); ctx.fill();
    ctx.strokeStyle = '#2a2d36'; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(0, 0, 300, 0, 7); ctx.stroke(); ctx.rotate(t * .8); for (let k = 0; k < 6; k++) { ctx.rotate(Math.PI / 3); ctx.fillStyle = '#2a2d36'; rr(-14, -230, 28, 200, 10); ctx.fill(); }
    ctx.fillStyle = '#c9ccd2'; ctx.beginPath(); ctx.arc(0, 0, 80, 0, 7); ctx.fill(); ctx.restore();
    // pistol silhouette, crossed out
    ctx.save(); ctx.translate(540, 1500); ctx.fillStyle = '#c9ccd2'; rr(-220, -60, 380, 90, 16); ctx.fill(); ctx.beginPath(); ctx.moveTo(60, 20); ctx.lineTo(150, 20); ctx.lineTo(120, 200); ctx.lineTo(30, 200); ctx.fill(); ctx.fillRect(-250, -40, 40, 30); ctx.restore();
    ctx.restore(); bigX(540, 1520, 420, prog(t, d * .55, d * .55 + .5)); scanlines(.05); },
  sfx(d) { return [[0, 'vault', .45], [d * .55, 'soft_x', .5]]; }
};
SC.laptopOnly = {
  draw(t, d) { bg('#03050b', '#000'); ctx.save(); cam(540, 960, lerp(1.0, 1.2, eio(prog(t, 0, d))));
    laptop(540, 1150, 900, t, { screen: '#031a12', glow: 'rgba(57,255,136,.35)', paint: (x, y, w, h) => { ctx.save(); ctx.translate(x, y); codeRain(t * 1.5, .7, '57,255,136', 4); ctx.restore(); } });
    ctx.restore(); scanlines(.06); },
  sfx(d) { return [[0, 'typing', .45, { dur: d }]]; }
};
SC.oneMistake = {
  draw(t, d, P, E) { const tc = d * .35; bg('#03050b', '#000');
    ctx.save(); cam(540, 960, 1.0 + t * .01);
    // victim at a laptop, clicking a phishing link
    laptop(540, 1150, 860, t, { screen: '#e9eef6', glow: t > tc + .3 ? 'rgba(255,40,60,.35)' : 'rgba(60,140,255,.25)', paint: (x, y, w, h) => {
      ctx.fillStyle = '#fff'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#e3262f'; rr(x + w / 2 - 230, y + h / 2 - 60, 460, 120, 20); ctx.fill(); label('ВЫ ВЫИГРАЛИ! НАЖМИТЕ', x + w / 2, y + h / 2 + 14, 34, { weight: 900 });
      if (t > tc + .3) { ctx.fillStyle = `rgba(255,30,50,${.6 * prog(t, tc + .3, tc + .8)})`; ctx.fillRect(x, y, w, h); label('⚠ ДОСТУП ПОЛУЧЕН', x + w / 2, y + 80, 44, { weight: 900, alpha: prog(t, tc + .5, tc + .9), font: MONO }); } } });
    // cursor
    const cx = lerp(900, 560, eio(prog(t, .3, tc))), cy = lerp(1200, 860, eio(prog(t, .3, tc))); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 20, cy + 56); ctx.lineTo(cx + 32, cy + 36); ctx.lineTo(cx + 54, cy + 58); ctx.lineTo(cx + 62, cy + 50); ctx.lineTo(cx + 40, cy + 28); ctx.lineTo(cx + 60, cy + 18); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    // the other side of the screen
    const hk = prog(t, tc + 1, tc + 1.8); if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; hooded(540, 1880, .7, t, { light: RED, eyes: hk }); ctx.restore(); }
    if (t > d - 1.2) { ctx.fillStyle = `rgba(0,0,0,${prog(t, d - 1.2, d)})`; ctx.fillRect(0, 0, W, H); }
    scanlines(.06); },
  sfx(d) { const tc = d * .35; return [[tc, 'click', .6], [tc + .3, 'error', .5], [tc + .3, 'glitch', .45], [tc + 1, 'boom', .5], [tc + 1, 'heartbeat', .45, { dur: d - tc - 1 }]]; }
};
