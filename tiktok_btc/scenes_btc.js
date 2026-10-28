// ===== TikTok (1080×1920): Bitfinex hack — "they stole $4.5B and got caught because of bitcoin" =====
const BTC = '#f7931a', GOLD = '#ffd54a';

// ---------- props ----------
function btcCoin(x, y, r, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.sx ?? 1, 1);
  ctx.fillStyle = rgrad(-r * .3, -r * .35, r * .1, r * 1.1, [[0, '#ffd27a'], [.6, BTC], [1, '#a85a00']]); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,240,200,.8)'; ctx.lineWidth = r * .07; ctx.beginPath(); ctx.arc(0, 0, r * .86, 0, 7); ctx.stroke();
  // ₿ glyph drawn by hand (font-independent)
  ctx.fillStyle = '#fff'; ctx.font = `900 ${r * 1.15}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.rotate(.22); ctx.fillText('B', r * .02, r * .04);
  ctx.fillRect(-r * .2, -r * .62, r * .1, r * .2); ctx.fillRect(r * .02, -r * .62, r * .1, r * .2); ctx.fillRect(-r * .2, r * .44, r * .1, r * .2); ctx.fillRect(r * .02, r * .44, r * .1, r * .2);
  ctx.restore(); if (o.glow) glow(x, y, r * 2.2, 'rgba(247,147,26,.45)', o.glow);
}
function altCoin(x, y, r, kind) { // generic other cryptos (no real logos)
  ctx.save(); ctx.translate(x, y);
  const c = kind === 0 ? ['#8fa4ff', '#3a4cc7'] : kind === 1 ? ['#6ef0c8', '#139a72'] : ['#d9d9e6', '#6b6b80'];
  ctx.fillStyle = rgrad(-r * .3, -r * .3, r * .1, r * 1.1, [[0, c[0]], [1, c[1]]]); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; if (kind === 0) { ctx.beginPath(); ctx.moveTo(0, -r * .6); ctx.lineTo(r * .38, 0); ctx.lineTo(0, r * .6); ctx.lineTo(-r * .38, 0); ctx.fill(); }
  else if (kind === 1) { ctx.beginPath(); ctx.arc(0, 0, r * .45, 0, 7); ctx.lineWidth = r * .14; ctx.strokeStyle = '#fff'; ctx.stroke(); } else { label('Ł', 0, r * .35, r, { weight: 900 }); }
  ctx.restore();
}
function goldBar(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = grad(-120, 0, 120, 0, [[0, '#a8780c'], [.4, '#ffe28a'], [.6, '#f2c230'], [1, '#8a6008']]); ctx.beginPath(); ctx.moveTo(-90, -40); ctx.lineTo(90, -40); ctx.lineTo(120, 40); ctx.lineTo(-120, 40); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(-90, -40); ctx.lineTo(90, -40); ctx.lineTo(80, -28); ctx.lineTo(-80, -28); ctx.fill(); label('999.9', 0, 14, 30, { color: '#7a5300', weight: 800 }); ctx.restore(); }
// trading terminal; breach 0..1 turns it red & glitchy
function exchangeScreen(x, y, w, h, t, breach = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
  ctx.fillStyle = '#0b0f17'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#111827'; ctx.fillRect(0, 0, w, 80);
  label('CRYPTO EXCHANGE', 30, 52, 30, { align: 'left', color: '#cfd8e6', weight: 800, spacing: 3 }); label('BTC/USD', w - 30, 52, 30, { align: 'right', color: BTC, weight: 800, font: MONO });
  // candles
  const R = rnd(5); let p = .5; const n = 34, cw = (w - 60) / n;
  for (let i = 0; i < n; i++) { const o0 = p; p = clamp(p + (R() - .48) * .12, .1, .9); const up = p > o0, hi = Math.max(o0, p) + R() * .05, lo = Math.min(o0, p) - R() * .05;
    const Y = v => 140 + (1 - v) * (h * .5); const col = breach > .5 ? (up ? '#7a2a2a' : RED) : (up ? '#22c55e' : '#ef4444');
    ctx.fillStyle = col; ctx.fillRect(30 + i * cw + cw / 2 - 1.5, Y(hi), 3, Y(lo) - Y(hi)); ctx.fillRect(30 + i * cw + 3, Y(Math.max(o0, p)), cw - 6, Math.max(3, Math.abs(Y(o0) - Y(p)))); }
  // order book
  const by = 140 + h * .55; for (let i = 0; i < 9; i++) { const R2 = rnd(i + Math.floor(t * 4)); ctx.fillStyle = i < 4 ? 'rgba(239,68,68,.22)' : 'rgba(34,197,94,.22)'; ctx.fillRect(w * .5 - R2() * w * .45, by + i * 34, R2() * w * .45, 28);
    label((60000 + R2() * 900).toFixed(1), 40, by + 22 + i * 34, 22, { align: 'left', color: i < 4 ? '#ef4444' : '#22c55e', font: MONO }); label((R2() * 9).toFixed(4), w - 40, by + 22 + i * 34, 22, { align: 'right', color: '#9aa4b2', font: MONO }); }
  if (breach > 0) { ctx.fillStyle = `rgba(255,30,50,${.25 * breach})`; ctx.fillRect(0, 0, w, h);
    ctx.save(); ctx.globalAlpha = breach; ctx.fillStyle = 'rgba(20,0,4,.85)'; rr(w * .08, h * .36, w * .84, 170, 22); ctx.fill(); ctx.strokeStyle = RED; ctx.lineWidth = 5; ctx.stroke();
    label('⚠ BREACH DETECTED', w / 2, h * .36 + 75, 54, { weight: 900, color: '#ff5a66', font: MONO }); label('WITHDRAWALS: UNAUTHORIZED', w / 2, h * .36 + 130, 28, { color: '#ffb3b8', font: MONO, weight: 700 }); ctx.restore(); }
  ctx.restore();
  ctx.strokeStyle = breach > .5 ? RED : '#2a3140'; ctx.lineWidth = 6; ctx.strokeRect(x, y, w, h);
}
function priceChart(x, y, w, h, p, o = {}) { // rising BTC value curve
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 2; for (let i = 0; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(x, y + h * i / 5); ctx.lineTo(x + w, y + h * i / 5); ctx.stroke(); }
  const pts = []; const R = rnd(3); for (let i = 0; i <= 80; i++) { const u = i / 80; let v = Math.pow(u, 2.2) * .9 + Math.sin(u * 20) * .03 * u + (R() - .5) * .02; if (u > .55 && u < .7) v -= .15 * Math.sin((u - .55) / .15 * Math.PI); pts.push([x + u * w, y + h - clamp(v, 0, 1) * h]); }
  const n = Math.floor(80 * clamp(p)); ctx.fillStyle = grad(0, y, 0, y + h, [[0, 'rgba(247,147,26,.35)'], [1, 'rgba(247,147,26,0)']]); ctx.beginPath(); ctx.moveTo(pts[0][0], y + h); for (let i = 0; i <= n; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[n][0], y + h); ctx.fill();
  ctx.strokeStyle = BTC; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke();
  glow(pts[n][0], pts[n][1], 70, 'rgba(247,147,26,.8)'); if (o.coin) btcCoin(pts[n][0], pts[n][1] - 60, 34);
  ctx.restore(); return pts[n];
}
// transaction graph: a tree that keeps splitting; coins hop along edges
function txTree(t, x0, y0, w, h, t0, o = {}) {
  const levels = o.levels || 6, R = rnd(o.seed || 4), nodes = [[[x0, y0]]];
  for (let L = 1; L <= levels; L++) { const prev = nodes[L - 1], cur = []; prev.forEach(([px, py]) => { const k = L < 3 ? 2 : (R() > .4 ? 2 : 3); for (let j = 0; j < k; j++) cur.push([px + (j - (k - 1) / 2) * w / Math.pow(2.1, L) + (R() - .5) * 40, py + h / levels]); }); nodes.push(cur); }
  for (let L = 1; L <= levels; L++) { const st = t0 + (L - 1) * (o.step || .45), a = prog(t, st, st + .4); if (a <= 0) break;
    nodes[L].forEach(([nx, ny], i) => { const [px, py] = nodes[L - 1][Math.floor(i / (nodes[L].length / nodes[L - 1].length))] || nodes[L - 1][0];
      const hl = o.path && o.path(L, i); ctx.strokeStyle = hl ? `rgba(34,227,255,${a})` : `rgba(247,147,26,${.45 * a})`; ctx.lineWidth = hl ? 6 : 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lerp(px, nx, a), lerp(py, ny, a)); ctx.stroke();
      if (a >= 1) { const u = ((t - st) * 1.3 + i * .37) % 1; btcCoin(lerp(px, nx, u), lerp(py, ny, u), 9); }
      ctx.fillStyle = hl ? NEON : '#2b3140'; ctx.beginPath(); ctx.arc(nx, ny, 10 * a, 0, 7); ctx.fill(); }); }
  btcCoin(x0, y0, 40, { glow: 1 }); return nodes;
}
function suspectCard(x, y, w, t, name, role, p, o = {}) {
  if (p <= 0) return; const h = w * 1.45, k = eback(clamp(p));
  ctx.save(); ctx.translate(x, y + (1 - eout(clamp(p))) * 300); ctx.rotate(o.rot || 0); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(-w / 2 + 14, -h / 2 + 20, w, h, 18); ctx.fill();
  ctx.fillStyle = '#e9edf2'; rr(-w / 2, -h / 2, w, h, 18); ctx.fill(); ctx.fillStyle = '#1a2233'; rr(-w / 2, -h / 2, w, 90, 18); ctx.fill(); ctx.fillRect(-w / 2, -h / 2 + 50, w, 40);
  label('ДОСЬЕ  •  SUSPECT', 0, -h / 2 + 58, w * .065, { color: '#cfd8e6', spacing: 4, weight: 800 });
  // mugshot area with height chart, silhouette only
  const px = -w * .4, py = -h / 2 + 115, pw = w * .8, ph = w * .78; ctx.fillStyle = '#c9d0da'; ctx.fillRect(px, py, pw, ph);
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 2; for (let i = 1; i < 7; i++) { ctx.beginPath(); ctx.moveTo(px, py + i * ph / 7); ctx.lineTo(px + pw, py + i * ph / 7); ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip(); ctx.fillStyle = '#2a3140';
  ctx.beginPath(); ctx.ellipse(0, py + ph * .42, pw * .2, ph * .25, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, py + ph * 1.05, pw * .46, ph * .4, 0, 0, 7); ctx.fill();
  if (o.longHair) { ctx.beginPath(); ctx.ellipse(0, py + ph * .45, pw * .26, ph * .32, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-pw * .26, py + ph * .45, pw * .52, ph * .3); }
  label('?', 0, py + ph * .52, ph * .32, { color: 'rgba(255,255,255,.35)', weight: 900 }); ctx.restore();
  label(name, 0, py + ph + 70, w * .085, { color: '#111', weight: 900 }); label(role, 0, py + ph + 120, w * .055, { color: '#5b6578', weight: 700 });
  if (o.stamp) stamp2(o.stamp, 0, py + ph * .55, o.stampP ?? 1, '#c8102e', w * .07, -.18);
  ctx.restore();
}
function policeLights(t, a = 1) { const ph = Math.floor(t * 6) % 2; glow(ph ? 150 : 930, 300, 900, ph ? `rgba(255,30,40,${.45 * a})` : `rgba(40,90,255,${.45 * a})`); glow(ph ? 930 : 150, 1500, 700, ph ? `rgba(40,90,255,${.3 * a})` : `rgba(255,30,40,${.3 * a})`); }
function agent(x, y, h, o = {}) { person(x, y, h, { silhouette: true, color: '#070910', rim: o.rim || 'rgba(140,170,255,.8)', cap: o.cap ?? true, flip: o.flip, armUp: o.armUp || 0 });
  const u = h / 100; label('FBI', x, y - 66 * u, 9 * u, { weight: 900, color: '#e8c547' }); }
function washer(x, y, s, t, spin) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = grad(-260, 0, 260, 0, [[0, '#b9c2cf'], [.5, '#f4f6fa'], [1, '#a7b0be']]); rr(-260, -330, 520, 660, 40); ctx.fill(); ctx.fillStyle = '#d9dee6'; rr(-260, -330, 520, 120, 40); ctx.fill();
  ctx.fillStyle = '#2a3140'; ctx.beginPath(); ctx.arc(160, -270, 26, 0, 7); ctx.fill();
  ctx.fillStyle = '#5b6578'; ctx.beginPath(); ctx.arc(0, 60, 210, 0, 7); ctx.fill(); ctx.fillStyle = '#0d1b2e'; ctx.beginPath(); ctx.arc(0, 60, 180, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0, 60, 180, 0, 7); ctx.clip(); for (let i = 0; i < 14; i++) { const a = spin + i * .45, r = 40 + (i % 4) * 32; const kind = i % 4; if (kind === 3) goldBar(Math.cos(a) * r, 60 + Math.sin(a) * r, .35); else if (kind === 2) altCoin(Math.cos(a) * r, 60 + Math.sin(a) * r, 26, i % 3); else btcCoin(Math.cos(a) * r, 60 + Math.sin(a) * r, 28, { rot: a }); }
  ctx.fillStyle = 'rgba(160,200,255,.18)'; ctx.fillRect(-200, -140, 400, 400); ctx.restore(); ctx.strokeStyle = '#c9d0da'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(0, 60, 196, 0, 7); ctx.stroke(); ctx.restore(); }
function cloudFile(x, y, s, t, unlock) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(160,200,255,.25)'; ctx.beginPath(); ctx.arc(-120, 0, 120, 0, 7); ctx.arc(60, -50, 160, 0, 7); ctx.arc(200, 20, 110, 0, 7); ctx.fill(); ctx.fillRect(-120, 0, 320, 130);
  // folder
  ctx.fillStyle = '#d6a94a'; rr(-150, -40, 340, 250, 18); ctx.fill(); ctx.fillStyle = '#c4973a'; rr(-150, -80, 140, 60, 14); ctx.fill(); ctx.fillStyle = '#e8bd5c'; rr(-150, 0, 340, 210, 18); ctx.fill();
  // padlock
  ctx.save(); ctx.translate(20, 100); ctx.fillStyle = unlock > .5 ? '#2f9e6b' : '#c8202e'; rr(-60, -20, 120, 100, 14); ctx.fill(); ctx.strokeStyle = '#2a3140'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(0, -20 - unlock * 40, 40, Math.PI, 0); ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(0, 25, 12, 0, 7); ctx.fill(); ctx.restore();
  ctx.restore(); }
function blockchain(t, y, n, hl, o = {}) { // horizontal chain of blocks, scrolling
  const off = (o.scroll ?? t * 80) % 260; for (let i = -1; i < n; i++) { const x = 80 + i * 260 - off, H2 = rnd(i + 100 + Math.floor((o.scroll ?? t * 80) / 260));
    if (i >= 0 || true) { ctx.strokeStyle = 'rgba(247,147,26,.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 200, y + 70); ctx.lineTo(x + 260, y + 70); ctx.stroke(); }
    ctx.fillStyle = hl === i ? 'rgba(34,227,255,.2)' : 'rgba(255,255,255,.06)'; rr(x, y, 200, 140, 16); ctx.fill(); ctx.strokeStyle = hl === i ? NEON : 'rgba(247,147,26,.7)'; ctx.lineWidth = 3; ctx.stroke();
    let hs = ''; for (let k = 0; k < 8; k++) hs += '0123456789abcdef'[Math.floor(H2() * 16)];
    label('#' + (421337 + i + Math.floor((o.scroll ?? t * 80) / 260)), x + 100, y + 48, 26, { color: '#cfd8e6', font: MONO, weight: 700 }); label(hs, x + 100, y + 92, 22, { color: '#9aa4b2', font: MONO }); btcCoin(x + 100, y + 124, 0); }
}
function footsteps(t, a) { const R = rnd(2); for (let i = 0; i < 12; i++) { const k = prog(t, i * .25, i * .25 + .3) * a; if (k <= 0) continue; const x = 300 + (i % 2) * 120 + Math.sin(i) * 40, y = 1700 - i * 120;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.1 + (i % 2) * .2); ctx.globalAlpha = k; ctx.fillStyle = NEON; ctx.shadowColor = NEON; ctx.shadowBlur = 20; ctx.beginPath(); ctx.ellipse(0, 0, 24, 44, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -70, 20, 22, 0, 0, 7); ctx.fill(); ctx.restore(); } }

// ================== SCENES ==================
SC.hook = { // hacked exchange + counter growing to $4.5B
  draw(t, d) { darkBg(t, 'rgba(255,40,60,.18)'); codeRain(t, .15, '255,45,61', 4);
    const br = prog(t, .5, 1.2); exchangeScreen(60, 180, 960, 900, t, br);
    if (t > .7 && t < 1.1) glitch(.8, Math.floor(t * 30));
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(40, 1200, 1000, 300, 30); ctx.fill(); ctx.strokeStyle = 'rgba(247,147,26,.6)'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    label('УКРАДЕНО', 540, 1275, 42, { color: BTC, spacing: 12, weight: 800 });
    odometer('$4,500,000,000', 540, 1440, 112, prog(t, .8, d - .6), { color: '#fff', sym: BTC, shadow: 'rgba(247,147,26,.5)' });
    const R = rnd(8); for (let i = 0; i < 18; i++) { const st = 1 + R() * (d - 1), k = t - st; if (k < 0 || k > 2) continue; btcCoin(R() * W, 1600 + k * 260, 30 + R() * 20, { rot: k * 3 }); }
    scanlines(.06); },
  sfx(d) { return [[0, 'alarm', .35, { dur: 1.6 }], [.7, 'glitch', .55], [.8, 'ticks', .5, { dur: d - 1.4 }], [d - .6, 'boom', .5], [d - .55, 'coins', .4]]; }
};
SC.stealCoins = {
  draw(t, d) { darkBg(t, 'rgba(247,147,26,.15)'); ctx.save(); cam(540, 1000, 1.02 + t * .02);
    hooded(540, 1500, 1, t, { light: BTC }); laptop(540, 1300, 640, t, { screen: '#1a1206', glow: 'rgba(247,147,26,.35)', paint: (x, y, w, h) => { label('WALLET', x + w / 2, y + 60, 34, { color: BTC, weight: 900, font: MONO }); label(Math.floor(lerp(0, 119754, eio(prog(t, .2, d)))).toLocaleString('ru-RU') + ' BTC', x + w / 2, y + 140, 54, { color: '#fff', weight: 900, font: MONO }); } });
    const R = rnd(3); for (let i = 0; i < 30; i++) { const st = R() * d, k = (t - st) / 1.2; if (k < 0 || k > 1) continue; btcCoin(lerp(R() * W, 540, k), lerp(-80, 1050, k), 26 * (1 - k * .5), { rot: k * 4 }); }
    ctx.restore(); scanlines(.05); },
  sfx(d) { return [[0, 'coins', .45], [.6, 'coins', .3], [0, 'drone', .3, { dur: d }]]; }
};
SC.sixYears = {
  draw(t, d, P, E) { bg('#1a1420', '#0a080d'); glow(540, 700, 900, 'rgba(255,200,140,.18)');
    ctx.save(); ctx.translate(540, 300); splitFlap(String(Math.round(lerp(2016, 2022, eio(prog(t, .3, d - 1))))), 0, 0, 160, 1); ctx.restore();
    // normal life: guy on a couch with coffee and phone; value chart grows behind
    const pt = priceChart(90, 520, 900, 560, prog(t, .3, d - .5));
    ctx.fillStyle = '#3a2f4a'; rr(100, 1520, 880, 260, 60); ctx.fill(); rr(60, 1400, 960, 180, 60); ctx.fill();
    person(540, 1700, 760, { holdPhone: true, armUp: .55, light: 1, top: '#5a7a4a', hair: '#2a1a12', rim: 'rgba(255,210,150,.6)' });
    label('$' + Math.floor(lerp(71, 4500, Math.pow(prog(t, .3, d - .5), 2.2))).toLocaleString('en-US') + 'M', pt[0] > 700 ? pt[0] - 120 : pt[0] + 110, pt[1] - 40, 46, { weight: 900, color: '#fff', shadow: 'rgba(247,147,26,.6)' });
    scanlines(.04); },
  sfx(d) { return [[.3, 'flapseq', .3, { dur: d - 1.3 }], [.3, 'riser', .3, { dur: d - .5 }]]; }
};
SC.fbiDoor = {
  draw(t, d) { bg('#120d0a', '#050302'); ctx.save(); cam(540, 960, 1.02 + t * .03);
    ctx.fillStyle = '#3a2618'; ctx.fillRect(240, 260, 600, 1300); ctx.fillStyle = '#4a321f'; ctx.fillRect(280, 300, 520, 1240); for (const [x, y] of [[320, 360], [560, 360], [320, 900], [560, 900]]) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 6; ctx.strokeRect(x, y, 200, 480); }
    ctx.fillStyle = '#d4af37'; ctx.beginPath(); ctx.arc(760, 950, 22, 0, 7); ctx.fill(); floor(1560, '#2a1f16', '#0a0705');
    // light under the door + agents' shadows
    ctx.fillStyle = 'rgba(255,240,200,.7)'; ctx.fillRect(280, 1540, 520, 14); for (const sx of [380, 600]) { ctx.fillStyle = 'rgba(0,0,0,.85)'; ctx.fillRect(sx, 1540, 70, 14); }
    const shake = [.4, .9, 1.4].reduce((a, k) => a + (t > k && t < k + .15 ? 8 : 0), 0); ctx.restore();
    if (shake) { ctx.save(); ctx.translate(Math.sin(t * 90) * shake, 0); ctx.restore(); glitch(.25, Math.floor(t * 40)); }
    policeLights(t, .6 * prog(t, 1.6, 2.2)); label('FBI', 540, 1760, 110, { weight: 900, color: '#e8c547', alpha: prog(t, 1.8, 2.3), shadow: 'rgba(0,0,0,.8)' }); scanlines(.05); },
  sfx() { return [[.4, 'knock', .6], [.9, 'knock', .6], [1.4, 'knock', .7], [1.6, 'siren', .35, { dur: 2 }]]; }
};
SC.incredible = {
  draw(t, d) { darkBg(t); blockchain(t, 760, 6, -9); iconDisc(540, 520, 130, 'question', eback(prog(t, .3, .8)), '#c8202e'); footsteps(t - .5, .6); scanlines(.05); },
  sfx(d) { return [[.3, 'pop', .5], [0, 'drone', .35, { dur: d }]]; }
};
SC.breach2016 = {
  draw(t, d, P, E) { const tb = E('bitfinex', 1, d - 1.5) - .5; darkBg(t, 'rgba(255,40,60,.15)');
    ctx.save(); ctx.translate(540, 260); splitFlap('2016', 0, 0, 150, prog(t, 0, 1)); ctx.restore(); label('АВГУСТ', 540, 340, 46, { color: '#9fb4d8', spacing: 10, alpha: prog(t, .8, 1.2) });
    exchangeScreen(80, 460, 920, 760, t, prog(t, tb, tb + .6)); hooded(540, 1800, .75, t, { light: RED, eyes: prog(t, tb, tb + .5) });
    if (t > tb && t < tb + .3) glitch(.9, Math.floor(t * 30)); scanlines(.05); },
  sfx(d, P, E) { const tb = E('bitfinex', 1, d - 1.5) - .5; return [[0, 'flap', .45], [.8, 'typing', .4, { dur: tb - .8 }], [tb, 'glitch', .55], [tb, 'alarm', .3, { dur: 1.6 }]]; }
};
SC.vanish = { // 119,754 BTC leave the exchange
  draw(t, d) { darkBg(t, 'rgba(247,147,26,.18)'); serverRack(260, 900, .9, t, 1); serverRack(820, 900, .9, t, 1);
    const R = rnd(9); for (let i = 0; i < 70; i++) { const st = .2 + R() * (d - .6), k = (t - st) / 1.4; if (k < 0 || k > 1) continue; btcCoin(lerp(540 + (R() - .5) * 300, 540 + (R() - .5) * 1400, k), lerp(900, -100, eio(k)), 22 + R() * 16, { rot: k * 6 }); }
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(60, 1450, 960, 300, 30); ctx.fill(); ctx.strokeStyle = 'rgba(247,147,26,.6)'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    label('ИСЧЕЗЛО', 540, 1525, 40, { color: BTC, spacing: 12, weight: 800 }); odometer('119,754', 470, 1690, 130, prog(t, .3, d - .5), { color: '#fff', sym: '#fff' }); btcCoin(870, 1640, 56, { glow: 1 }); scanlines(.05); },
  sfx(d) { return [[.3, 'ticks', .5, { dur: d - .8 }], [.2, 'coins', .4], [d * .5, 'coins', .3]]; }
};
SC.money71 = {
  draw(t, d) { bg('#060a08', '#010201'); glow(540, 900, 900, 'rgba(57,255,136,.15)'); label('НА ТОТ МОМЕНТ', 540, 760, 44, { color: '#9fb4a8', spacing: 8, alpha: prog(t, .1, .4) });
    ctx.save(); ctx.fillStyle = 'rgba(2,8,4,.85)'; rr(80, 820, 920, 240, 30); ctx.fill(); ctx.restore(); odometer('$71,000,000', 540, 1000, 128, prog(t, .2, 2), { color: '#fff', sym: GREEN, shadow: 'rgba(57,255,136,.5)' });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7 - r; c++) { const k = eout(prog(t, .4 + (r * 7 + c) * .04, .8 + (r * 7 + c) * .04)); if (k > 0) cashBrick(540 + (c - (6 - r) / 2) * 125, lerp(1200, 1600 - r * 46, k), 1); } },
  sfx() { return [[.2, 'ticks', .5, { dur: 1.8 }], [2, 'chime', .45]]; }
};
SC.valueRises = {
  draw(t, d) { darkBg(t, 'rgba(247,147,26,.15)'); hooded(540, 1850, .6, t, { light: BTC }); const pt = priceChart(80, 360, 920, 900, prog(t, .2, d), { coin: true });
    label('СТОИМОСТЬ РАСТЁТ', 540, 280, 54, { weight: 900, color: BTC, alpha: prog(t, .2, .6), spacing: 3 }); scanlines(.05); },
  sfx(d) { return [[.2, 'riser', .4, { dur: d - .2 }]]; }
};
SC.feb2022 = {
  draw(t, d, P, E) { const tf = E('февралю') - .3, tm = E('45', 1, d * .5) - .6; bg('#0b0904', '#020100'); glow(540, 900, 1000, 'rgba(247,147,26,.25)');
    const ck = eout(prog(t, tf, tf + .6)); if (ck > 0) calendarPage(540, 420 + (1 - ck) * 900, 1.1, 'ФЕВ', '', '2022', {});
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(30, 900, 1020, 300, 30); ctx.fill(); ctx.strokeStyle = 'rgba(247,147,26,.7)'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    label('ОЦЕНКА УКРАДЕННОГО', 540, 975, 40, { color: BTC, spacing: 8, weight: 800 }); odometer('$4,500,000,000', 540, 1135, 110, prog(t, tm, tm + 2), { color: '#fff', sym: BTC, shadow: 'rgba(247,147,26,.6)' });
    if (t > tm + 2) { moneyRain(t - tm - 2, 30, 3); const R = rnd(2); for (let i = 0; i < 16; i++) { const k = t - tm - 2 - R() * 1.5; if (k > 0) btcCoin(R() * W, -60 + k * 500, 30, { rot: k * 4 }); } } },
  sfx(d, P, E) { const tf = E('февралю') - .3, tm = E('45', 1, d * .5) - .6; return [[tf, 'page', .5], [tm, 'ticks', .55, { dur: 2 }], [tm + 2, 'boom', .5], [tm + 2.05, 'coins', .5]]; }
};
SC.oneTheft = {
  draw(t, d, P, E) { darkBg(t); const t1 = E('кража') - .2, t2 = E('ожидания') - .4, t3 = E('сумма') - .3;
    iconDisc(540, 420, 120, 'bolt', prog(t, t1, t1 + .4), '#c8202e'); label('1 КРАЖА', 540, 600, 46, { weight: 900, alpha: prog(t, t1 + .2, t1 + .6) });
    if (t > t2) { ctx.save(); ctx.globalAlpha = prog(t, t2, t2 + .4); hourglass(540, 980, .9, prog(t, t2, t3 + 1), t); ctx.restore(); }
    if (t > t3) { const k = prog(t, t3, t3 + .5); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(80, 1380, 920, 220, 30); ctx.fill(); ctx.restore(); label('$4 500 000 000', 540, 1520, 100, { weight: 900, color: BTC, alpha: k, shadow: 'rgba(247,147,26,.6)' });
      stamp2('ОДНО ИЗ КРУПНЕЙШИХ ДЕЛ', 540, 1760, prog(t, t3 + 2, t3 + 2.4), '#c8102e', 46, -.06); } scanlines(.05); },
  sfx(d, P, E) { const t1 = E('кража') - .2, t2 = E('ожидания') - .4, t3 = E('сумма') - .3; return [[t1, 'pop', .5], [t2, 'sand', .35, { dur: 3 }], [t3, 'boom', .4], [t3 + 2, 'stamp', .55]]; }
};
SC.whoBehind = {
  draw(t, d) { bg('#030304', '#000'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const x of [360, 720]) { ctx.fillStyle = grad(0, 0, 0, 1500, [[0, 'rgba(255,240,210,.22)'], [1, 'rgba(255,240,210,.03)']]); ctx.beginPath(); ctx.moveTo(x - 60, -50); ctx.lineTo(x + 60, -50); ctx.lineTo(x + 240, 1500); ctx.lineTo(x - 240, 1500); ctx.fill(); } ctx.restore();
    person(360, 1500, 820, { silhouette: true, color: '#06070b', rim: 'rgba(255,240,210,.7)' }); person(720, 1500, 760, { silhouette: true, color: '#06070b', rim: 'rgba(255,240,210,.7)', hair: '#000', flip: true });
    iconDisc(540, 420, 110, 'question', eback(prog(t, .3, .7)), '#c8202e'); scanlines(.06); },
  sfx() { return [[0, 'riser', .35, { dur: 2.5 }], [.3, 'pop', .45]]; }
};
SC.suspects = { // dossier cards (silhouettes, no likeness)
  draw(t, d, P, E) { const t1 = E('илью') - .3, t2 = E('хизер') - .3; ctx.fillStyle = '#16100a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1e14'], [1, '#0e0905']]); ctx.fillRect(0, 0, W, H); glow(540, 900, 900, 'rgba(255,200,130,.22)');
    suspectCard(540, 560, 600, t, 'ИЛЬЯ ЛИХТЕНШТЕЙН', 'хакер (по материалам дела)', prog(t, t1, t1 + .6), { rot: -.04 });
    suspectCard(540, 1360, 600, t, 'ХИЗЕР МОРГАН', 'жена, соучастница', prog(t, t2, t2 + .6), { rot: .04, longHair: true });
    // red string between the two
    if (t > t2 + .5) { ctx.strokeStyle = '#c8102e'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(760, 700); ctx.quadraticCurveTo(940, 960, 760, 1230); ctx.stroke(); }
    scanlines(.04); },
  sfx(d, P, E) { return [[E('илью') - .3, 'paper', .55], [E('хизер') - .3, 'paper', .55], [E('хизер') + .3, 'pin', .5]]; }
};
SC.toWallet = {
  draw(t, d, P, E) { darkBg(t); exchangeScreen(90, 240, 900, 600, t, prog(t, .3, .8));
    const k = eio(prog(t, 1.2, d - 1)); for (let i = 0; i < 16; i++) { const u = clamp(k * 1.4 - i * .03); if (u <= 0) continue; btcCoin(lerp(540, 540, u) + Math.sin(u * 6 + i) * 120 * (1 - u), lerp(820, 1480, u), 26); }
    ctx.save(); ctx.translate(540, 1580); ctx.fillStyle = '#2a1a06'; rr(-260, -120, 520, 240, 30); ctx.fill(); ctx.strokeStyle = BTC; ctx.lineWidth = 6; ctx.stroke(); label('КОШЕЛЁК', 0, -40, 44, { color: BTC, weight: 900, spacing: 4 }); label('bc1q…x9f2', 0, 40, 40, { color: '#fff', font: MONO, weight: 700 }); ctx.restore();
    hooded(900, 1850, .4, t, { light: BTC }); scanlines(.05); },
  sfx(d) { return [[.3, 'glitch', .45], [1.2, 'data', .4, { dur: d - 2 }], [d - 1, 'coins', .45]]; }
};
SC.launder = {
  draw(t, d) { bg('#0b0e14', '#03050a'); glow(540, 900, 800, 'rgba(120,180,255,.15)'); washer(540, 1000, 1.25, t, t * 6 * prog(t, 0, .8)); label('ОТМЫВАНИЕ', 540, 300, 80, { weight: 900, color: '#fff', alpha: prog(t, .3, .7), shadow: 'rgba(120,180,255,.6)' }); scanlines(.04); },
  sfx(d) { return [[0, 'washer', .5, { dur: d }]]; }
};
SC.btcFlow = { // visualization of bitcoin movement → other cryptos → gold
  draw(t, d, P, E) { const tg = E('золото') - .5, ta = E('другие') - .4; darkBg(t, 'rgba(247,147,26,.12)');
    txTree(t, 540, 220, 1000, 1150, .2, { levels: 6, step: .55, seed: 6 });
    if (t > ta) { const R = rnd(4); for (let i = 0; i < 14; i++) { const k = prog(t, ta + i * .12, ta + i * .12 + .5); if (k > 0) altCoin(100 + i * 68, 1500 - eback(k) * 40, 30, i % 3); } }
    if (t > tg) { for (let i = 0; i < 5; i++) { const k = eout(prog(t, tg + i * .15, tg + i * .15 + .5)); if (k > 0) goldBar(220 + i * 160, lerp(2100, 1720 - (i % 2) * 40, k), .9); } glow(540, 1720, 500, 'rgba(255,210,80,.35)', prog(t, tg, tg + .5)); }
    scanlines(.05); },
  sfx(d, P, E) { const tg = E('золото') - .5, ta = E('другие') - .4; return [[.2, 'data', .4, { dur: d - .5 }], [ta, 'popseq', .3, { n: 14, step: .12 }], [tg, 'gold', .55]]; }
};
SC.chaos = {
  draw(t, d) { darkBg(t); const R = rnd(3); ctx.lineWidth = 2; for (let i = 0; i < 160; i++) { ctx.strokeStyle = `rgba(${R() > .5 ? '247,147,26' : '120,140,180'},${.25 + R() * .3})`; ctx.beginPath(); let x = R() * W, y = R() * H; ctx.moveTo(x, y); for (let k = 0; k < 4; k++) { x += (R() - .5) * 500 + Math.sin(t + i) * 20; y += (R() - .5) * 500; ctx.lineTo(x, y); } ctx.stroke(); }
    for (let i = 0; i < 30; i++) btcCoin(R() * W + Math.sin(t * 2 + i) * 30, R() * H, 14); if (Math.floor(t * 5) % 3 === 0) glitch(.4, Math.floor(t * 20)); scanlines(.07); },
  sfx(d) { return [[0, 'glitch', .4], [d * .5, 'glitch', .35], [0, 'drone', .4, { dur: d }]]; }
};
SC.ledger = { // blockchain keeps records for years
  draw(t, d, P, E) { const tr = E('записи') - .3; darkBg(t, 'rgba(247,147,26,.12)');
    label('БЛОКЧЕЙН', 540, 330, 90, { weight: 900, color: BTC, alpha: prog(t, .2, .6), shadow: 'rgba(247,147,26,.5)' });
    blockchain(t, 560, 6, Math.floor(t) % 4); blockchain(t * .7, 800, 6, -9, { scroll: 130 + t * 60 }); blockchain(t * .9, 1040, 6, -9, { scroll: 60 + t * 100 });
    if (t > tr) { const k = prog(t, tr, tr + .6); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(90, 1340, 900, 360, 30); ctx.fill(); ctx.restore();
      ['2016  →  tx 3f9a…  119 754 BTC', '2017  →  tx 7c21…  2 040 BTC', '2019  →  tx a8e0…  518 BTC', '2021  →  tx 1b6d…  77 BTC'].forEach((l, i) => typeText(l, 130, 1420 + i * 76, 32, prog(t, tr + .3 + i * .5, tr + .8 + i * .5), i ? '#cfd8e6' : NEON, { t })); }
    scanlines(.05); },
  sfx(d, P, E) { return [[.2, 'pop', .4], [E('записи') - .3, 'typing', .4, { dur: 2.2 }]]; }
};
SC.trace = { // investigators highlight the path from the theft to a wallet
  draw(t, d) { darkBg(t); const path = (L, i) => i === [0, 1, 2, 3, 5, 9, 14][L] || (L === 1 && i === 1) || (L === 2 && i === 2) || (L === 3 && i === 4) || (L === 4 && i === 9) || (L === 5 && i === 19) || (L === 6 && i === 40);
    txTree(t + 10, 540, 220, 1000, 1150, -10, { levels: 6, seed: 6, path: (L, i) => t > .8 + L * .4 && path(L, i) });
    const mx = lerp(300, 760, (Math.sin(t * .8) + 1) / 2), my = lerp(500, 1200, prog(t, 0, d)); ctx.save(); ctx.strokeStyle = '#e9eef6'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(mx, my, 110, 0, 7); ctx.stroke(); ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx + 80, my + 80); ctx.lineTo(mx + 190, my + 190); ctx.stroke(); ctx.fillStyle = 'rgba(34,227,255,.08)'; ctx.beginPath(); ctx.arc(mx, my, 104, 0, 7); ctx.fill(); ctx.restore();
    for (let i = 0; i < 2; i++) agent(240 + i * 600, 1880, 520, { flip: i === 1 }); scanlines(.05); },
  sfx(d) { return [[0, 'sonar', .4, { dur: d }], [.8, 'popseq', .3, { n: 6, step: .4 }]]; }
};
SC.cloudFolder = { // sharp cut: the folder with data
  draw(t, d, P, E) { const tu = E('данные') - .5; bg('#05080f', '#020306'); codeRain(t, .18, '34,227,255', 7); if (t < .25) glitch(1, Math.floor(t * 30));
    ctx.save(); ctx.translate(540, 300); splitFlap('2022', 0, 0, 120, prog(t, 0, .8)); ctx.restore(); label('ЯНВАРЬ', 540, 370, 44, { color: '#9fb4d8', spacing: 10 });
    cloudFile(500, 900, 1.6, t, prog(t, tu, tu + .5));
    if (t > tu) { const R = rnd(5); for (let i = 0; i < 36; i++) { const k = ((t - tu) * .7 + R()) % 1; label(['KEY', 'wallet.dat', '0x7f…', 'PRIVKEY', 'bc1q…', 'seed'][i % 6], 540 + Math.sin(i * 2.3) * 380 * k, 1100 + k * 700, 34, { color: i % 2 ? NEON : '#ffd27a', font: MONO, weight: 800, alpha: 1 - k }); } stamp2('ДОСТУП ПОЛУЧЕН', 540, 1500, prog(t, tu + .4, tu + .8), '#2f9e6b', 60, -.08); }
    scanlines(.06); },
  sfx(d, P, E) { const tu = E('данные') - .5; return [[0, 'glitch', .6], [0, 'boom', .45], [.2, 'flap', .35], [tu, 'unlock', .6], [tu + .4, 'stamp', .55], [tu + .2, 'data', .45, { dur: 2 }]]; }
};
SC.decisive = { draw(t, d) { bg('#020304', '#000'); glow(540, 960, 900 * eout(prog(t, 0, .5)), 'rgba(255,255,255,.45)'); cloudFile(500, 960, 1.4, t, 1); if (t < .2) glitch(1, 3); scanlines(.06); }, sfx() { return [[0, 'boom', .55], [0, 'chime', .4]]; } };
SC.arrest = {
  draw(t, d, P, E) { const tf = E('феврале') - .3; bg('#05060b', '#010103'); if (t < .25) glitch(1, Math.floor(t * 30));
    policeLights(t, 1); floor(1500, '#141720', '#05060a');
    ctx.fillStyle = '#1a1d26'; ctx.fillRect(140, 500, 800, 1000); ctx.fillStyle = '#0b0d12'; ctx.fillRect(380, 900, 320, 600); // house front + doorway
    for (let i = 0; i < 3; i++) agent(200 + i * 340, 1720, 900, { flip: i === 2, armUp: i === 1 ? .6 : 0 });
    ctx.save(); ctx.globalAlpha = prog(t, 1, 1.6); person(380, 1560, 560, { silhouette: true, color: '#05060a', rim: 'rgba(255,90,90,.8)' }); person(700, 1560, 520, { silhouette: true, color: '#05060a', rim: 'rgba(90,140,255,.8)', flip: true }); ctx.restore();
    handcuffs(540, 1180, 1, '#d9dde4'); const ck = eout(prog(t, tf, tf + .5)); if (ck > 0) calendarPage(860, 260 + (1 - ck) * 400, .75, 'ФЕВ', '', '2022', { rot: .06 });
    label('АРЕСТ', 300, 330, 120, { weight: 900, color: '#fff', shadow: 'rgba(255,40,60,.8)', alpha: prog(t, .4, .8) }); scanlines(.06); },
  sfx(d) { return [[0, 'siren', .5, { dur: d }], [0, 'glitch', .5], [.6, 'steps', .45, { dur: 1.5 }], [1.4, 'cuffs', .6], [2.2, 'cuffs', .5]]; }
};
SC.seized = {
  draw(t, d, P, E) { const tb = E('94', 1, 1) - .5, tm = E('36', 1, d * .55) - .6; bg('#06080f', '#010204'); glow(540, 900, 900, 'rgba(34,227,255,.15)');
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(60, 360, 960, 280, 30); ctx.fill(); ctx.strokeStyle = 'rgba(247,147,26,.6)'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    label('ИЗЪЯТО', 540, 440, 44, { color: BTC, spacing: 12, weight: 800 }); odometer('94,000', 470, 590, 130, prog(t, tb, tb + 1.6), { color: '#fff', sym: '#fff' }); btcCoin(860, 545, 54, { glow: 1 });
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(60, 760, 960, 260, 30); ctx.fill(); ctx.strokeStyle = 'rgba(57,255,136,.6)'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    label('≈ СТОИМОСТЬ', 540, 835, 40, { color: GREEN, spacing: 10, weight: 800 }); odometer('$3,600,000,000', 540, 975, 100, prog(t, tm, tm + 2), { color: '#fff', sym: GREEN });
    // vault door closing on coins
    const k = eio(prog(t, tm + 1.6, tm + 2.6)); ctx.save(); ctx.translate(540, 1500); ctx.fillStyle = '#20242e'; rr(-380, -300, 760, 600, 30); ctx.fill(); for (let i = 0; i < 12; i++) btcCoin(-280 + (i % 6) * 112, -120 + Math.floor(i / 6) * 150, 46);
    ctx.fillStyle = grad(-380, 0, 380, 0, [[0, '#3a3f4c'], [.5, '#9aa3b2'], [1, '#3a3f4c']]); ctx.fillRect(-380, -300, 760 * k, 600); ctx.restore();
    stamp2('КОНФИСКОВАНО', 540, 1500, prog(t, tm + 2.6, tm + 3), '#c8102e', 70, -.1); scanlines(.04); },
  sfx(d, P, E) { const tb = E('94', 1, 1) - .5, tm = E('36', 1, d * .55) - .6; return [[tb, 'ticks', .5, { dur: 1.6 }], [tm, 'ticks', .5, { dur: 2 }], [tm + 1.6, 'vault', .5], [tm + 2.6, 'stamp', .6]]; }
};
SC.record = {
  draw(t, d) { bg('#0a1020', '#03050b'); usStripes(t, .5); courthouseMini(540, 1300, .75); flag(150, 300, 260, t); ctx.fillStyle = '#9d9d9d'; ctx.fillRect(142, 300, 8, 1000);
    const bars = [.3, .45, .6, 1]; bars.forEach((b, i) => { const k = eout(prog(t, .4 + i * .3, 1 + i * .3)), h = 500 * b * k; ctx.fillStyle = i === 3 ? BTC : '#2e4fa8'; rr(250 + i * 170, 1800 - h, 120, h, 10); ctx.fill(); });
    label('РЕКОРД', 540, 360, 110, { weight: 900, color: BTC, alpha: prog(t, 1.4, 1.8), shadow: 'rgba(247,147,26,.6)' }); scanlines(.04); },
  sfx() { return [[.4, 'popseq', .35, { n: 4, step: .3 }], [1.4, 'chime', .5]]; }
};
SC.notOver = { draw(t, d) { darkBg(t); hourglass(540, 960, 1.2, prog(t, 0, d), t); scanlines(.05); }, sfx(d) { return [[0, 'clock', .4, { dur: d }]]; } };
SC.guilty = {
  draw(t, d, P, E) { const ta = E('августе') - .3, tg = E('виновными') - .4; ctx.fillStyle = '#1b130b'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(-420, 300); ctx.scale(1, 1.2); courtroom(t); ctx.restore(); ctx.fillStyle = 'rgba(10,6,3,.45)'; ctx.fillRect(0, 0, W, H);
    const ck = eout(prog(t, ta, ta + .5)); if (ck > 0) calendarPage(820, 300 + (1 - ck) * 500, .8, 'АВГ', '', '2023', { rot: .06 });
    paperDoc(540, 1150, 700, -.03, 'ПРИЗНАНИЕ ВИНЫ\nPLEA AGREEMENT', { hl: [[3, prog(t, tg, tg + .8)]], sign: prog(t, tg + .5, tg + 1.5) });
    const hit = tg + 1.6, up = t < hit ? lerp(-1.1, .15, eio(prog(t, hit - .8, hit))) : .15; gavel(900, 700, 1.1, Math.PI * .5 + .6 + up);
    stamp2('ВИНОВНЫ', 540, 1560, prog(t, hit, hit + .35), '#c8102e', 100, -.12); },
  sfx(d, P, E) { const ta = E('августе') - .3, tg = E('виновными') - .4; return [[ta, 'page', .5], [tg, 'marker', .35], [tg + .5, 'pen', .45], [tg + 1.6, 'gavel', .65], [tg + 1.65, 'stamp', .5]]; }
};
SC.paradox = { draw(t, d) { darkBg(t); scales(540, 1250, 1.2, Math.sin(t * 1.5) * .1, { left: (x, y) => btcCoin(x, y - 50, 60), right: (x, y) => iconDisc(x, y - 50, 55, 'magnifier', 1, '#2e6fd7') }); label('ПАРАДОКС', 540, 380, 110, { weight: 900, color: '#fff', alpha: prog(t, .2, .6) }); scanlines(.05); }, sfx() { return [[.2, 'creak', .4], [.3, 'boom', .35]]; } };
SC.anonymous = {
  draw(t, d) { darkBg(t, 'rgba(247,147,26,.12)'); const k = prog(t, .3, 1.2);
    hooded(540, 1350, 1.3, t, { light: BTC }); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#e9eef6'; ctx.beginPath(); ctx.ellipse(540, 1220, 120, 150, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(495, 1200, 32, 18, .2, 0, 7); ctx.ellipse(585, 1200, 32, 18, -.2, 0, 7); ctx.fill(); ctx.restore(); // anonymous mask
    btcCoin(540, 520, 150, { glow: 1, rot: Math.sin(t) * .2 }); label('АНОНИМНО?', 540, 800, 80, { weight: 900, color: '#fff', alpha: prog(t, .6, 1) }); scanlines(.05); },
  sfx() { return [[.3, 'shimmer', .4], [.6, 'pop', .4]]; }
};
SC.publicPath = { draw(t, d) { darkBg(t); blockchain(t, 260, 6, 2); const path = (L, i) => [0, 1, 2, 4, 9, 19, 40][L] === i; txTree(t + 10, 540, 560, 1000, 1150, -10, { levels: 6, seed: 6, path: (L, i) => t > .3 + L * .35 && path(L, i) }); label('ВСЁ ВИДНО', 540, 1840, 80, { weight: 900, color: NEON, alpha: prog(t, d * .6, d * .6 + .4), shadow: 'rgba(34,227,255,.6)' }); scanlines(.05); }, sfx(d) { return [[.3, 'popseq', .35, { n: 6, step: .35 }], [d * .6, 'chime', .45]]; } };
SC.tangle = {
  draw(t, d, P, E) { darkBg(t); const ts = E('схемы') - .3; txTree(t + 10, 540, 220, 1000, 1500, -10, { levels: 7, seed: 9 }); if (t > ts) { const k = prog(t, ts, ts + .6); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(4,6,12,.6)'; ctx.fillRect(0, 0, W, H); ctx.restore(); iconDisc(540, 960, 140, 'maze', k, '#7b4bd1'); } scanlines(.05); },
  sfx(d) { return [[0, 'data', .4, { dur: d }]]; }
};
SC.dataFound = { draw(t, d) { bg('#05080f', '#020306'); if (t < .2) glitch(1, 9); cloudFile(500, 820, 1.4, t, 1); iconDisc(540, 1500, 110, 'magnifier', prog(t, .4, .9), '#2e6fd7'); stamp2('УЛИКИ', 540, 1250, prog(t, 1, 1.4), '#c8102e', 80, -.1); scanlines(.05); }, sfx() { return [[0, 'glitch', .45], [.4, 'pop', .45], [1, 'stamp', .55]]; } };
SC.recap = {
  draw(t, d, P, E) { darkBg(t, 'rgba(247,147,26,.15)'); const t1 = E('71') - .4, t2 = E('45') - .5;
    priceChart(80, 700, 920, 700, prog(t, t1, t2 + 1), { coin: true });
    label('2016', 140, 1460, 44, { weight: 900, color: '#9fb4d8' }); label('2022', 940, 1460, 44, { weight: 900, color: '#9fb4d8' });
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(60, 220, 460, 200, 26); ctx.fill(); rr(560, 220, 460, 200, 26); ctx.fill(); ctx.restore();
    label('БЫЛО', 290, 285, 34, { color: '#9fb4a8', spacing: 8 }); label('$71 млн', 290, 380, 74, { weight: 900, color: '#fff', alpha: prog(t, t1, t1 + .4) });
    label('СТАЛО', 790, 285, 34, { color: BTC, spacing: 8 }); label('$4,5 млрд', 790, 380, 74, { weight: 900, color: BTC, alpha: prog(t, t2, t2 + .4), shadow: 'rgba(247,147,26,.6)' });
    if (t > t2 + .5) moneyRain(t - t2 - .5, 20, 5); scanlines(.04); },
  sfx(d, P, E) { return [[E('71') - .4, 'riser', .35, { dur: E('45') - E('71') + .5 }], [E('45') - .5, 'boom', .5], [E('45'), 'coins', .4]]; }
};
SC.notJustCaught = { draw(t, d) { bg('#020304', '#000'); ctx.save(); ctx.strokeStyle = 'rgba(34,227,255,.12)'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore(); footsteps(t, 1); label('ЦИФРОВЫЕ СЛЕДЫ', 540, 260, 70, { weight: 900, color: NEON, alpha: prog(t, 1, 1.5), shadow: 'rgba(34,227,255,.6)' }); scanlines(.05); }, sfx(d) { return [[0, 'steps', .4, { dur: 3 }], [1, 'shimmer', .4]]; } };
SC.lesson = { draw(t, d) { bg('#040406', '#000'); ctx.save(); cam(540, 1100, lerp(1, 1.2, prog(t, 0, d))); glow(lerp(-200, 1300, prog(t, .2, d)), 900, 700, 'rgba(247,147,26,.4)'); hooded(540, 1250, 1.1, t, { light: BTC }); ctx.restore(); dust(t, 3, 60, .5); scanlines(.06); }, sfx(d) { return [[0, 'heartbeat', .45, { dur: d }]]; } };
SC.finale = { // thousands of addresses… a spotlight still finds you
  draw(t, d, P, E) { const tn = E('значит') - .5; darkBg(t);
    const R = rnd(4); for (let i = 0; i < 260; i++) { const x = R() * W, y = R() * H, k = prog(t, R() * 2, R() * 2 + .4); ctx.fillStyle = `rgba(247,147,26,${.5 * k})`; ctx.fillRect(x, y, 4, 4); if (i % 8 === 0) label('bc1q' + Math.floor(R() * 1e6).toString(16), x, y, 18, { color: `rgba(200,210,230,${.4 * k})`, font: MONO }); }
    if (t > tn) { const k = eio(prog(t, tn, tn + 1)); ctx.save(); ctx.fillStyle = `rgba(0,0,0,${.85 * k})`; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = rgrad(540, 1150, 80, 420, [[0, 'rgba(0,0,0,1)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, W, H); ctx.restore(); hooded(540, 1350, .8, t, { light: 'rgba(255,240,210,1)' }); }
    if (t > d - 1) { ctx.fillStyle = `rgba(0,0,0,${prog(t, d - 1, d)})`; ctx.fillRect(0, 0, W, H); } scanlines(.06); },
  sfx(d, P, E) { const tn = E('значит') - .5; return [[0, 'data', .35, { dur: tn }], [tn, 'boom', .55], [tn, 'riser', .3, { dur: d - tn }]]; }
};
