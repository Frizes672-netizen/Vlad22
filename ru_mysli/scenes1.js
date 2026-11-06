// ===== scenes, part A: generic building blocks + intro + PART ONE =====

// ---------- icon glyphs (white on a glossy disc) ----------
function glyph(kind, r) {
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .09; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = (pts, close) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0] * r, p[1] * r) : ctx.moveTo(p[0] * r, p[1] * r)); if (close) ctx.closePath(); };
  switch (kind) {
    case 'bolt': L([[.12, -.6], [-.32, .08], [0, .08], [-.12, .6], [.32, -.08], [0, -.08]], 1); ctx.fill(); break;
    case 'watch': ctx.beginPath(); ctx.arc(0, r * .08, r * .45, 0, 7); ctx.stroke(); ctx.fillRect(-r * .1, -r * .62, r * .2, r * .14); L([[0, .08], [.22, -.14]]); ctx.stroke(); break;
    case 'shield': L([[0, -.55], [.45, -.38], [.45, .05], [0, .58], [-.45, .05], [-.45, -.38]], 1); ctx.stroke(); L([[-.18, 0], [-.03, .16], [.22, -.14]]); ctx.stroke(); break;
    case 'scales': L([[0, -.55], [0, .45]]); ctx.stroke(); L([[-.3, .5], [.3, .5]]); ctx.stroke(); L([[-.5, -.35], [.5, -.35]]); ctx.stroke();
      for (const k of [-1, 1]) { L([[k * .5, -.35], [k * .5 - .2, .1], [k * .5 + .2, .1]], 1); ctx.stroke(); } break;
    case 'question': ctx.font = `900 ${r * 1.1}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillText('?', 0, r * .38); break;
    case 'dollar': ctx.font = `900 ${r * 1.05}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillText('$', 0, r * .36); break;
    case 'handshake': L([[-.6, -.05], [-.25, -.25], [.05, -.1], [.3, -.25], [.6, -.05]]); ctx.stroke(); L([[-.3, -.2], [0, .2], [.2, .05]]); ctx.stroke(); L([[-.1, .25], [.15, .02]]); ctx.stroke(); break;
    case 'magnifier': ctx.beginPath(); ctx.arc(-r * .1, -r * .1, r * .32, 0, 7); ctx.stroke(); L([[.14, .14], [.48, .48]]); ctx.stroke(); break;
    case 'doc': L([[-.32, -.5], [.15, -.5], [.32, -.33], [.32, .5], [-.32, .5]], 1); ctx.stroke(); for (let i = 0; i < 3; i++) { L([[-.18, -.15 + i * .2], [.18, -.15 + i * .2]]); ctx.stroke(); } break;
    case 'folder': L([[-.5, -.3], [-.15, -.3], [-.05, -.18], [.5, -.18], [.5, .4], [-.5, .4]], 1); ctx.stroke(); break;
    case 'megaphone': L([[-.45, -.12], [-.15, -.12], [.35, -.42], [.35, .42], [-.15, .12], [-.45, .12]], 1); ctx.stroke(); L([[-.3, .12], [-.2, .42]]); ctx.stroke(); break;
    case 'person': ctx.beginPath(); ctx.arc(0, -r * .25, r * .2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-r * .4, r * .45); ctx.quadraticCurveTo(-r * .4, 0, 0, 0); ctx.quadraticCurveTo(r * .4, 0, r * .4, r * .45); ctx.fill(); break;
    case 'people': for (const [dx, s] of [[-.32, .75], [.32, .75], [0, 1]]) { ctx.beginPath(); ctx.arc(dx * r, -r * .22 * s, r * .16 * s, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(dx * r - r * .3 * s, r * .45); ctx.quadraticCurveTo(dx * r - r * .3 * s, 0, dx * r, 0); ctx.quadraticCurveTo(dx * r + r * .3 * s, 0, dx * r + r * .3 * s, r * .45); ctx.fill(); } break;
    case 'mountain': L([[-.55, .4], [-.15, -.35], [.05, -.05], [.2, -.25], [.55, .4]], 1); ctx.fill(); break;
    case 'firework': for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; L([[Math.cos(a) * .15, Math.sin(a) * .15], [Math.cos(a) * .5, Math.sin(a) * .5]]); ctx.stroke(); } break;
    case 'maze': ctx.strokeRect(-r * .45, -r * .45, r * .9, r * .9); L([[-.25, -.45], [-.25, .2], [.2, .2]]); ctx.stroke(); L([[.05, -.25], [.45, -.25]]); ctx.stroke(); break;
    case 'dice': rr(-r * .42, -r * .42, r * .84, r * .84, r * .12); ctx.stroke(); for (const [a, b] of [[-.2, -.2], [.2, .2], [0, 0], [.2, -.2], [-.2, .2]]) { ctx.beginPath(); ctx.arc(a * r, b * r, r * .07, 0, 7); ctx.fill(); } break;
    case 'check': L([[-.35, 0], [-.08, .28], [.38, -.25]]); ctx.lineWidth = r * .14; ctx.stroke(); break;
    case 'x': L([[-.3, -.3], [.3, .3]]); ctx.stroke(); L([[.3, -.3], [-.3, .3]]); ctx.stroke(); break;
    case 'calendar': rr(-r * .45, -r * .38, r * .9, r * .8, r * .1); ctx.stroke(); L([[-.45, -.15], [.45, -.15]]); ctx.stroke(); break;
    case 'camera': rr(-r * .5, -r * .25, r * 1, r * .62, r * .1); ctx.stroke(); ctx.beginPath(); ctx.arc(0, r * .06, r * .18, 0, 7); ctx.stroke(); break;
    case 'star': star5(0, 0, r * .5, '#fff'); break;
    case 'tv': rr(-r * .5, -r * .32, r, r * .6, r * .08); ctx.stroke(); L([[-.15, .45], [.15, .45]]); ctx.stroke(); break;
    case 'flask': L([[-.12, -.5], [-.12, -.15], [-.4, .42], [.4, .42], [.12, -.15], [.12, -.5]]); ctx.stroke(); break;
    case 'brain': ctx.beginPath(); ctx.arc(-r * .15, -r * .05, r * .28, Math.PI * .6, Math.PI * 1.9); ctx.arc(r * .15, -r * .05, r * .28, Math.PI * 1.1, Math.PI * .4); ctx.closePath(); ctx.stroke(); L([[0, -.33], [0, .2]]); ctx.stroke(); break;
    case 'globe': ctx.beginPath(); ctx.arc(0, 0, r * .45, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, r * .2, r * .45, 0, 0, 7); ctx.stroke(); L([[-.45, 0], [.45, 0]]); ctx.stroke(); break;
    case 'clock': ctx.beginPath(); ctx.arc(0, 0, r * .45, 0, 7); ctx.stroke(); L([[0, 0], [0, -.28]]); ctx.stroke(); L([[0, 0], [.2, .1]]); ctx.stroke(); break;
    case 'heart': ctx.beginPath(); ctx.moveTo(0, r * .4); ctx.bezierCurveTo(-r * .7, -r * .1, -r * .3, -r * .6, 0, -r * .22); ctx.bezierCurveTo(r * .3, -r * .6, r * .7, -r * .1, 0, r * .4); ctx.fill(); break;
    case 'can': ctx.save(); drawCan(0, 0, r * 1.1, { noShadow: true }); ctx.restore(); break;
    case 'gavel': ctx.save(); ctx.rotate(-.6); rr(-r * .32, -r * .2, r * .3, r * .4, r * .05); ctx.fill(); ctx.fillRect(-r * .05, -r * .05, r * .55, r * .1); ctx.restore(); break;
  }
}
function iconDisc(x, y, r, kind, p, col) {
  if (p <= 0) return; const s = eback(clamp(p));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.arc(5, 10, r, 0, 7); ctx.fill();
  ctx.fillStyle = rgrad(-r * .3, -r * .4, r * .1, r * 1.1, [[0, shade(col, 1.35)], [.7, col], [1, shade(col, .55)]]); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = r * .05; ctx.beginPath(); ctx.arc(0, 0, r * .88, 0, 7); ctx.stroke();
  glyph(kind, r); ctx.restore();
}
const COL = { red: '#c8202e', blue: '#2e6fd7', gold: '#d9a51a', green: '#2f9e6b', purple: '#7b4bd1', teal: '#1c9aa8', gray: '#5b6578', orange: '#e0702a' };

// ---------- background presets ----------
function BGP(name, t) {
  switch (name) {
    case 'navy': bg('#0a1020', '#03050b'); glow(960, 480, 900, 'rgba(60,110,230,.25)'); bokeh(t, 21, 18, 'rgba(255,215,120,A)', { min: 20, max: 70 }); break;
    case 'night': bg('#070a14', '#020306'); glow(960, 420, 800, 'rgba(90,120,200,.18)'); break;
    case 'warm': bg('#1e140c', '#080504'); glow(900, 420, 800, 'rgba(255,180,100,.22)'); break;
    case 'red': bg('#16060a', '#050103'); glow(960, 500, 800, 'rgba(220,40,60,.25)'); break;
    case 'flag': bg('#08101f', '#03060c'); usStripes(t, .5); break;
    case 'studio': studio(t); break;
    case 'paper': bg('#efe7d6', '#d8cdb5'); break;
  }
}
function usStripes(t, a = 1) {
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 7; i++) { const yy = 90 + i * 26, off = (t * 140 + i * 40) % 400;
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.05)' : 'rgba(200,30,50,.16)';
    for (const [base, dir] of [[yy, 1], [H - 280 + i * 26, -1]]) { ctx.beginPath(); for (let x = -100; x <= W + 100; x += 40) { const y = base + Math.sin((x + off * dir) / 220 + t * dir) * 28; x === -100 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      for (let x = W + 100; x >= -100; x -= 40) ctx.lineTo(x, base + 18 + Math.sin((x + off * dir) / 220 + t * dir) * 28); ctx.closePath(); ctx.fill(); } }
  const R = rnd(91); for (let i = 0; i < 50; i++) star5(R() * W, R() * H, 4 + R() * 9, `rgba(255,255,255,${(.05 + R() * .18) * (.5 + .5 * Math.sin(t * 2 + i))})`);
  ctx.restore();
}

// ---------- generic: chapter card ----------
SC.chapter = {
  draw(t, d, P) {
    bg('#04060c', '#0a0f1e'); usStripes(t, .9);
    ctx.save(); cam(960, 540, 1.04 - t * .01);
    glow(960, 520, 700, 'rgba(200,30,50,.18)');
    const a = eout(prog(t, .15, .9));
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#c8202e'; ctx.fillRect(960 - 260 * a, 452, 520 * a, 6); ctx.restore();
    label(P.num, 960, 420, 54, { color: '#e8b931', spacing: 18, alpha: prog(t, .1, .6) });
    const lines = P.title.split('\n');
    lines.forEach((l, i) => revealText(l, 960, 560 + i * 100, prog(t, .4 + i * .2, 1.2 + i * .2), { size: 86, weight: 900, align: 'center', spacing: 2, shadow: 'rgba(0,0,0,.6)' }));
    ctx.restore(); dust(t, 3, 50, .5);
  },
  sfx(d) { return [[0, 'boom', .7], [.35, 'swoosh', .5]]; }
};

// ---------- generic: icon cards appearing on cue ----------
// P.items: [{w:'word', k:1, icon:'bolt', col:'gold', label:'ENERGY'}], P.bg, P.center (optional painter)
SC.cards = {
  draw(t, d, P, E) {
    BGP(P.bg || 'navy', t);
    ctx.save(); cam(960, 540, 1.02 + t * .006);
    if (P.under) P.under(t, d, E);
    const n = P.items.length, gap = Math.min(380, 1600 / n), x0 = 960 - gap * (n - 1) / 2, y = P.y ?? 540;
    P.items.forEach((it, i) => { const st = it.w ? E(it.w, it.k || 1) - .15 : (it.at ?? i * .6);
      const p = prog(t, st, st + .5), x = x0 + i * gap;
      iconDisc(x, y + Math.sin(t * 1.4 + i) * 6, P.r || 95, it.icon, p, COL[it.col] || it.col || COL.blue);
      if (it.label) { ctx.save(); ctx.font = `800 32px ${F_HEAD}`; ctx.letterSpacing = '4px'; const tw = ctx.measureText(it.label).width; ctx.restore(); label(it.label, x, y + (P.r || 95) + 70, Math.min(32, 32 * (gap - 30) / tw), { spacing: 4, alpha: prog(t, st + .2, st + .6), weight: 800 }); }
      if (P.focus && t > st && i === P.items.filter(q => (q.w ? E(q.w, q.k || 1) : 0) <= t).length - 1) glow(x, y, 220, 'rgba(255,230,160,.25)');
    });
    if (P.over) P.over(t, d, E);
    ctx.restore(); dust(t, 7, 40, .4);
  },
  sfx(d, P, E) { return P.items.map(it => [it.w ? E(it.w, it.k || 1) - .1 : (it.at ?? 0), 'pop', .55]); }
};

// ---------- generic: odometer number reveal ----------
SC.counter = {
  draw(t, d, P, E) {
    BGP(P.bg || 'navy', t);
    const st = P.w ? E(P.w) - .2 : .3, dur = P.dur ?? 2.2;
    ctx.save(); cam(960, 560, lerp(1.06, .98, eio(prog(t, 0, d))));
    if (P.pyramid) { const bricks = []; for (let row = 0; row < 4; row++) for (let c = 0; c < 13 - row; c++) bricks.push([960 + (c - (12 - row) / 2) * 120, 880 - row * 44]);
      bricks.forEach(([bx, by], i) => { const s0 = st + i * .03, k = eout(prog(t, s0, s0 + .4)); if (k <= 0) return; cashBrick(bx, lerp(by - 400, by, k), clamp(k * 2)); }); }
    ctx.restore();
    const a = prog(t, st - .3, st);
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(4,6,12,.85)'; rr(960 - 760, 330, 1520, 360, 30); ctx.fill(); ctx.strokeStyle = 'rgba(232,185,49,.5)'; ctx.lineWidth = 2; ctx.stroke();
    if (P.top) label(P.top, 960, 400, 40, { color: '#e8b931', spacing: 16 });
    odometer(P.value, 960, 590, P.size || 190, prog(t, st, st + dur), { color: '#fff', sym: '#e8b931', shadow: 'rgba(255,210,90,.5)' });
    if (P.bottom) label(P.bottom, 960, 668, 36, { color: '#c9d3ea', spacing: 22, alpha: prog(t, st + dur - .2, st + dur + .3) });
    ctx.restore();
    const fl = prog(t, st + dur, st + dur + .1) * (1 - prog(t, st + dur + .1, st + dur + .5)); if (fl > 0) glow(960, 500, 900, 'rgba(255,230,160,.5)', fl);
    if (P.rain && t > st + dur) moneyRain(t - (st + dur), 40);
    dust(t, 17, 50, .6);
  },
  sfx(d, P, E) { const st = P.w ? E(P.w) - .2 : .3, dur = P.dur ?? 2.2; return [[st, 'ticks', .45, { dur }], [st + dur, 'chime', .55], ...(P.rain ? [[st + dur + .1, 'coins', .35]] : [])]; }
};
function cashBrick(bx, y, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = grad(bx, y - 21, bx, y + 21, [[0, '#a8c39c'], [.5, '#6f9468'], [1, '#3e5a3c']]); ctx.fillRect(bx - 58, y - 21, 116, 42);
  ctx.fillStyle = '#e9dfb8'; ctx.fillRect(bx - 12, y - 21, 24, 42); ctx.strokeStyle = 'rgba(20,40,20,.5)'; ctx.lineWidth = 1;
  for (let l = -15; l <= 15; l += 6) { ctx.beginPath(); ctx.moveTo(bx - 58, y + l); ctx.lineTo(bx + 58, y + l); ctx.stroke(); } ctx.restore();
}
function moneyRain(k0, n, seed = 77) { const R = rnd(seed); for (let i = 0; i < n; i++) { const st = R() * 2.5; const k = k0 - st; if (k < 0) continue;
  const x = R() * W + Math.sin(k * 2 + i) * 60, y = -80 + k * (300 + R() * 220); if (y > H + 100) continue; bill(x, y, .7 + R() * .5, R() * 6 + k * (R() - .5) * 3); } }

// ---------- generic: calendar flip ----------
SC.calendar = {
  draw(t, d, P, E) {
    BGP(P.bg || 'warm', t);
    ctx.save(); cam(960, 540, 1.03 + t * .01);
    const st = P.w ? E(P.w) - .3 : .2;
    const pages = P.pages || [[P.month, P.num, P.year]];
    pages.forEach(([m, n, y], i) => { const s0 = st + i * (P.gap || 1.4), k = eout(prog(t, s0, s0 + .6)); if (k <= 0) return;
      const px = pages.length > 1 ? 960 + (i - (pages.length - 1) / 2) * 460 : 760;
      calendarPage(px, 540 + (1 - k) * 600, 1.25, m, n, y, { rot: (1 - k) * .4 + (i % 2 ? .04 : -.04) });
      if (P.stamps && P.stamps[i]) stamp2(P.stamps[i], px, 760, prog(t, s0 + .7, s0 + 1.05), P.stampCol || '#2f9e6b'); });
    if (P.side) P.side(t, d, E, st);
    ctx.restore(); dust(t, 13, 40, .5);
  },
  sfx(d, P, E) { const st = P.w ? E(P.w) - .3 : .2; const pages = P.pages || [1]; const o = [];
    pages.forEach((_, i) => { o.push([st + i * (P.gap || 1.4), 'page', .6]); if (P.stamps && P.stamps[i]) o.push([st + i * (P.gap || 1.4) + .8, 'stamp', .5]); }); return o; }
};
function stamp2(s, x, y, p, col = '#e3262f', size = 70, rot = -.12) {
  if (p <= 0) return; const k = eback(clamp(p)); const sc = lerp(2.4, 1, k);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(p * 3);
  ctx.font = `900 ${size}px ${F_HEAD}`; ctx.letterSpacing = '5px'; const w = ctx.measureText(s).width;
  ctx.strokeStyle = col; ctx.lineWidth = size * .09; rr(-w / 2 - size * .4, -size * .8, w + size * .8, size * 1.15, size * .15); ctx.stroke();
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.fillText(s, 0, size * .2); ctx.restore();
}

// ---------- generic: newspapers flying in ----------
SC.headlines = {
  draw(t, d, P, E) {
    BGP(P.bg || 'warm', t);
    ctx.save(); cam(960, 540, 1.0 + t * .015);
    const papers = P.papers; papers.forEach(([m, hl, sb], i) => { const st = (P.w ? E(P.w) : .2) + i * (P.gap || .7); const k = eout(prog(t, st, st + .7)); if (k <= 0) return;
      const tx = [520, 1400, 960, 700, 1250][i], ty = [520, 500, 600, 470, 640][i], tr = [-.1, .08, -.02, .12, -.06][i];
      newspaper(lerp(tx < 960 ? -500 : 2400, tx, k), ty, P.size || 460, tr + (1 - k) * (i % 2 ? .8 : -.8), m, hl, sb, { photoCan: true, date: P.date }); });
    ctx.restore(); dust(t, 19, 40, .5);
  },
  sfx(d, P, E) { return P.papers.map((_, i) => [(P.w ? E(P.w) : .2) + i * (P.gap || .7), 'paper', .55]); }
};

// ---------- generic: phone feed ----------
SC.feed = {
  draw(t, d, P, E) {
    BGP(P.bg || 'night', t);
    ctx.save(); cam(960, 540, 1.02 + t * .01);
    phone(960, 560, 860, t, P.posts, { scroll: P.scroll ? eio(prog(t, .5, d)) * P.scroll : 0 });
    // floating reactions
    const R = rnd(2); for (let i = 0; i < 24; i++) { const st = R() * d, k = t - st; if (k < 0 || k > 2.5) continue;
      const x = 1300 + R() * 360, y = 900 - k * 260; ctx.save(); ctx.globalAlpha = clamp(1 - k / 2.5); ctx.font = `${40 + R() * 30}px "Noto Color Emoji"`; ctx.fillText(['😂', '🤣', '🪽', '👀', '🔥'][i % 5], x, y); ctx.restore(); }
    if (P.over) P.over(t, d, E);
    ctx.restore();
  },
  sfx(d, P) { const o = [[.3, 'notif', .4]]; for (let k = 1.2; k < d - .5; k += 1.6) o.push([k, 'notif', .25]); return o; }
};

// ---------- INTRO ----------
SC.title = {
  draw(t, d) {
    studio(t, 262);
    ctx.save(); cam(960, 540, 1.02 + t * .01);
    const wa = prog(t, .6, 1.8);
    ctx.save(); ctx.globalAlpha = wa * .95; wings(960, 420, .8, eio(prog(t, .6, 2.4)), { flap: Math.sin(t * 2) * .03, glow: 'rgba(170,140,255,.3)' }); ctx.restore();
    drawCan(960, 560, 520, { rim: 'rgba(190,150,255,.7)', drops: true, rot: Math.sin(t * .6) * .012 });
    ctx.save(); ctx.globalAlpha = .16; ctx.translate(0, 1640); ctx.scale(1, -1); drawCan(960, 560, 520, { noShadow: true }); ctx.restore();
    const sw = prog(t, 2.2, 3.8); if (sw > 0 && sw < 1) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.sin(sw * Math.PI) * .35; const sx = lerp(820, 1100, sw); ctx.fillStyle = grad(sx - 50, 0, sx + 50, 0, [[0, 'rgba(255,255,255,0)'], [.5, '#fff'], [1, 'rgba(255,255,255,0)']]); ctx.fillRect(840, 290, 240, 540); ctx.restore(); }
    ctx.restore(); dust(t, 9, 60);
  },
  sfx() { return [[.4, 'shimmer', .5], [.8, 'wing', .45], [2.3, 'swoosh', .3]]; }
};
SC.cooler = {
  draw(t, d) {
    ctx.fillStyle = '#07090f'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960 + t * 10, 540, 1.05 + t * .035);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#10141f'], [.75, '#1a1f2c'], [1, '#0a0c12']]); ctx.fillRect(-200, -200, W + 400, H + 400);
    const cx0 = 300, cw = 1300, cy0 = 120, ch = 820;
    ctx.fillStyle = '#20242e'; ctx.fillRect(cx0 - 30, cy0 - 50, cw + 60, ch + 90);
    ctx.fillStyle = '#c8202e'; ctx.fillRect(cx0 - 30, cy0 - 50, cw + 60, 46);
    label('COLD DRINKS', cx0 + cw / 2, cy0 - 15, 30, { weight: 900, spacing: 10 });
    ctx.fillStyle = grad(0, cy0, 0, cy0 + ch, [[0, '#dfeaf7'], [1, '#8ea3be']]); ctx.fillRect(cx0, cy0, cw, ch);
    for (let s = 0; s < 4; s++) { const sy = cy0 + 190 + s * 200; ctx.fillStyle = '#6d7787'; ctx.fillRect(cx0, sy + 2, cw, 10);
      for (let i = 0; i < 13; i++) { const hero = s === 1 && i === 6, pop = hero ? eio(prog(t, 1.2, 2.6)) : 0;
        drawCan(cx0 + 60 + i * 98, sy - 80 - pop * 20, 160 + pop * 30, { noShadow: true, drops: hero });
        if (hero) glow(cx0 + 60 + i * 98, sy - 90, 220, 'rgba(255,230,160,.5)', pop); } }
    for (let dd = 0; dd < 3; dd++) { const dx = cx0 + dd * cw / 3; ctx.strokeStyle = '#3a404d'; ctx.lineWidth = 16; ctx.strokeRect(dx, cy0, cw / 3, ch);
      ctx.fillStyle = grad(dx, cy0, dx + cw / 3, cy0 + ch, [[0, 'rgba(255,255,255,.12)'], [.3, 'rgba(255,255,255,0)'], [.55, 'rgba(255,255,255,.08)'], [.6, 'rgba(255,255,255,0)']]); ctx.fillRect(dx, cy0, cw / 3, ch);
      ctx.fillStyle = '#9aa3b2'; ctx.fillRect(dx + cw / 3 - 40, cy0 + ch / 2 - 90, 10, 180); }
    ctx.restore();
    const pa = eout(prog(t, .4, 1.3));
    ctx.save(); ctx.translate(1660 + (1 - pa) * 300, 420); ctx.rotate(.04);
    ctx.fillStyle = '#0d1b45'; rr(-190, -260, 380, 520, 8); ctx.fill();
    ctx.fillStyle = grad(0, -260, 0, 260, [[0, 'rgba(255,210,60,.35)'], [1, 'rgba(255,210,60,0)']]); rr(-190, -260, 380, 520, 8); ctx.fill();
    wings(0, -80, .3, 1, {}); drawCan(0, 60, 230, { noShadow: true });
    ctx.restore();
  },
  sfx() { return [[.2, 'hum', .3, { dur: 3.5 }], [1.2, 'shimmer', .3]]; }
};
SC.crack = {
  draw(t, d, P, E) {
    const tc = E('crack') + .25, ts = E('sip'), tw = E('wait');
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#120b08'], [1, '#050302']]); ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(900, 560, 1.12 + t * .025);
    glow(700, 380, 700, 'rgba(255,170,90,.28)');
    ctx.fillStyle = grad(0, 760, 0, H + 100, [[0, '#5a3a22'], [1, '#2a180c']]); ctx.fillRect(-100, 760, W + 200, 500);
    ctx.globalAlpha = .12; ctx.strokeStyle = '#000'; for (let i = 0; i < 14; i++) { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-100, 790 + i * 28 + Math.sin(i) * 6); ctx.bezierCurveTo(600, 780 + i * 30, 1200, 800 + i * 27, W + 100, 790 + i * 29); ctx.stroke(); } ctx.globalAlpha = 1;
    const tab = eout(prog(t, tc, tc + .2)), lift = eio(prog(t, ts - .1, ts + .4)) - eio(prog(t, ts + 1, ts + 1.5));
    drawCan(820, 540 - lift * 120, 470, { tab, drops: true, rim: 'rgba(255,190,120,.5)', rot: lift * -.38, noShadow: lift > .1 });
    if (t > tc) { const R = rnd(42), k = t - tc;
      for (let i = 0; i < 110; i++) { const a = -Math.PI / 2 + (R() - .5) * 1.5, sp = 220 + R() * 520, life = .5 + R() * .6; if (k > life) continue;
        const dd = sp * k, x = 850 + Math.cos(a) * dd, y = 310 + Math.sin(a) * dd + 650 * k * k; ctx.fillStyle = `rgba(255,245,220,${(1 - k / life) * .85})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + R() * 4, 0, 7); ctx.fill(); }
      if (lift < .05) for (let i = 0; i < 30; i++) { const ph = (R() + k * (.6 + R())) % 1; ctx.fillStyle = `rgba(255,255,255,${(1 - ph) * .5})`; ctx.beginPath(); ctx.arc(860 + (R() - .5) * 30, 305 - ph * 120, 1.5 + R() * 2, 0, 7); ctx.fill(); } }
    ctx.restore();
    const ma = prog(t, tw - .2, tw + .2);
    ctx.save(); ctx.globalAlpha = ma; const mx = 1160, my = 470;
    label('ENERGY BOOST', mx, my - 30, 34, { align: 'left', color: '#ffd23a', spacing: 6 });
    ctx.fillStyle = 'rgba(255,255,255,.08)'; rr(mx, my, 580, 46, 23); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 2; ctx.stroke();
    const fill = eio(prog(t, tw, d + .3)) * .97;
    ctx.fillStyle = grad(mx, 0, mx + 580, 0, [[0, '#ffb02e'], [1, '#ff4d3a']]); rr(mx + 4, my + 4, Math.max(40, 572 * fill), 38, 19); ctx.fill();
    glow(mx + 572 * fill, my + 23, 90, 'rgba(255,160,60,.7)');
    label(`${Math.round(fill * 100)}%`, mx + 580, my + 105, 52, { align: 'right' });
    ctx.restore(); dust(t, 11, 50, .6);
  },
  sfx(d, P, E) { const tc = E('crack') + .25, ts = E('sip'), tw = E('wait'); return [[tc, 'canopen', .8], [tc + .1, 'fizz', .45, { dur: 2 }], [ts, 'sip', .55], [tw, 'riser', .25, { dur: d - tw }]]; }
};
SC.nothing = {
  draw(t, d) {
    ctx.fillStyle = '#120c08'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 600, 1.08 - t * .02);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1d14'], [1, '#170f09']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    ctx.fillStyle = grad(0, 160, 0, 620, [[0, '#0d1430'], [1, '#2a2f55']]); ctx.fillRect(560, 160, 800, 460);
    for (let i = 0; i < 5; i++) house(600 + i * 170, 620, 120, 80, { body: '#0b0f22', roof: '#080b18', dark: i % 2 });
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(1230, 250, 26, 0, 7); ctx.fill(); glow(1230, 250, 120, 'rgba(200,210,255,.4)');
    ctx.strokeStyle = '#3d2a1c'; ctx.lineWidth = 22; ctx.strokeRect(560, 160, 800, 460); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(960, 160); ctx.lineTo(960, 620); ctx.stroke();
    glow(960, 140, 700, 'rgba(255,180,100,.4)');
    person(960, 1000, 520, { shrug: eout(prog(t, .5, 1.0)), cap: true, rim: 'rgba(255,200,140,.9)', light: -1, mouth: -.6 });
    ctx.fillStyle = grad(0, 820, 0, H, [[0, '#6a4628'], [.06, '#3d2715'], [1, '#1b0f07']]); ctx.fillRect(-100, 820, W + 200, 400);
    const tip = eio(prog(t, .9, 1.4)); drawCan(1300 + tip * 40, 740 + tip * 50, 160, { tab: 1, rot: tip * Math.PI / 2, noShadow: tip > .3, rim: 'rgba(255,200,140,.5)' });
    ctx.restore(); dust(t, 41, 40, .5);
  },
  sfx() { return [[1.25, 'clink', .45], [.2, 'crickets', .25, { dur: 1.8 }]]; }
};
SC.suburb = {
  draw(t, d, P, E) {
    const b1 = E('wings') - .9, b2 = E('flying') - 1.4;
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#1d2550'], [.45, '#7a4a6e'], [.7, '#f08a4b'], [.82, '#ffc27a'], [1, '#2a1a20']]); ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 560, 1.04 + t * .008);
    glow(1350, 720, 600, 'rgba(255,170,90,.55)');
    for (let i = 0; i < 9; i++) house(-120 + i * 260, 790, 180, 120, { body: '#2b2338', roof: '#211b2c', dark: i % 2 });
    for (let i = 0; i < 6; i++) tree(-60 + i * 400, 800, 260, '#1b1626');
    house(80, 900, 430, 280, { body: '#1a1520', roof: '#120e17' }); house(1420, 900, 440, 290, { body: '#1a1520', roof: '#120e17' });
    ctx.fillStyle = '#c8c8c8'; ctx.fillRect(1395, 520, 6, 380); flag(1401, 525, 170, t);
    ctx.fillStyle = '#0e0b12'; ctx.fillRect(1180, 520, 10, 420); ctx.fillRect(1150, 515, 70, 10); glow(1160, 535, 160, 'rgba(255,210,140,.75)');
    ctx.fillStyle = grad(0, 880, 0, H, [[0, '#1f2a1a'], [1, '#0a0e08']]); ctx.fillRect(-100, 880, W + 200, 300);
    picketFence(-50, 640, 960, 90, '#d9cfc6'); picketFence(1260, 2000, 960, 90, '#d9cfc6');
    ctx.fillStyle = '#222'; ctx.fillRect(560, 900, 10, 70); ctx.fillStyle = '#2d3a6b'; rr(530, 860, 70, 45, 18); ctx.fill(); ctx.fillStyle = '#c8202e'; ctx.fillRect(590, 840, 6, 30);
    ctx.restore();
    const px = 960, py = 1010, ph = 430, beat = t < b1 ? 0 : (t < b2 ? 1 : 2);
    if (beat === 0) { const a = prog(t, .2, .8);
      ctx.save(); ctx.globalAlpha = a * .8; ctx.strokeStyle = '#ffd23a'; ctx.setLineDash([14, 12]); ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(px - 30, py - ph * .85); ctx.quadraticCurveTo(px - 230, py - ph * .3, px - 180, py - 10); ctx.lineTo(px + 180, py - 10); ctx.quadraticCurveTo(px + 230, py - ph * .3, px + 30, py - ph * .85); ctx.stroke(); ctx.restore();
      person(px, py, ph, { holdCan: true, cap: true, rim: 'rgba(255,190,120,.9)', light: 1 }); bigX(px, py - ph * .5, 300, prog(t, 1.2, 1.7)); }
    if (beat === 1) { const lt = t - b1;
      ctx.save(); ctx.globalAlpha = prog(lt, .05, .5) * (1 - prog(lt, 1.4, 1.8) * .6); wings(px, py - ph * .74, .62, lerp(.4, 1, eio(prog(lt, .05, .9))), { flap: Math.sin(lt * 5) * .05, glow: 'rgba(255,230,190,.35)' }); ctx.restore();
      person(px, py, ph, { holdCan: true, cap: true, rim: 'rgba(255,190,120,.9)', light: 1 }); bigX(px, py - ph * .6, 360, prog(lt, 1.0, 1.5)); }
    if (beat === 2) { const lt = t - b2, pp = eio(prog(lt, .1, 1.8));
      ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.setLineDash([16, 14]); ctx.lineWidth = 5;
      ctx.beginPath(); for (let i = 0; i <= 60 * pp; i++) { const u = i / 60; const x = lerp(px, 1800, u), y = py - ph * .5 - Math.sin(u * Math.PI) * 420 - u * 200; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      if (pp > 0) { ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.arc(lerp(px, 1800, pp), py - ph * .5 - Math.sin(pp * Math.PI) * 420 - pp * 200, 18, 0, 7); ctx.fill(); }
      ctx.restore(); person(px, py, ph, { holdCan: true, cap: true, rim: 'rgba(255,190,120,.9)', light: 1, shrug: eout(prog(lt, 2.0, 2.5)) * .7 });
      bigX(1500, 520, 200, prog(lt, 2.0, 2.5)); }
    dust(t, 5, 40, .4);
  },
  sfx(d, P, E) { const b1 = E('wings') - .9, b2 = E('flying') - 1.4; return [[.2, 'swoosh', .35], [1.2, 'soft_x', .35], [b1 + .05, 'wing', .45], [b1 + .1, 'shimmer', .35], [b1 + 1.0, 'soft_x', .35], [b2 + .1, 'swoosh_up', .4], [b2 + 2.0, 'soft_x', .35]]; }
};
SC.giantVs = {
  draw(t, d, P, E) {
    const tc = E('court') - .4;
    if (t < tc) { hqTower(t); ctx.save(); // tiny buyer at the foot of the tower
      person(560, 1040, 150, { cap: true, rim: 'rgba(170,190,255,.8)', light: 1, holdCan: true }); ctx.restore(); }
    else { const lt = t - tc;
      ctx.fillStyle = grad(0, 0, 0, H, [[0, '#b9c7d8'], [.6, '#e8e1d3'], [1, '#8d877c']]); ctx.fillRect(0, 0, W, H);
      ctx.save(); cam(960, 520, 1.0 + lt * .02); glow(1600, 120, 700, 'rgba(255,240,210,.6)'); courthouseMini(960, 900, 1); ctx.fillStyle = '#9d9d9d'; ctx.fillRect(250, 150, 8, 750); flag(258, 160, 260, lt); ctx.restore();
      const v = eout(prog(lt, 1.2, 2.0));
      if (v > 0) { ctx.save(); ctx.fillStyle = `rgba(6,8,14,${.8 * v})`; ctx.fillRect(0, 0, W, H); ctx.restore();
        ctx.save(); ctx.translate(-(1 - v) * 400, 0); person(520, 900, 300, { cap: true, rim: 'rgba(160,190,255,.8)', light: 1 }); ctx.restore();
        ctx.save(); ctx.translate((1 - v) * 400, 0); drawCan(1360, 560, 700, { rim: 'rgba(255,120,120,.6)' }); ctx.restore();
        const b = prog(lt, 1.8, 2.2); if (b > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = b * (.75 + .25 * Math.sin(t * 50)); ctx.strokeStyle = '#ff5a4a'; ctx.lineWidth = 10; ctx.shadowColor = '#ff3b30'; ctx.shadowBlur = 40;
          ctx.beginPath(); ctx.moveTo(900, 420); ctx.lineTo(860, 560); ctx.lineTo(930, 570); ctx.lineTo(885, 720); ctx.stroke(); ctx.restore(); glow(900, 570, 260, 'rgba(255,70,60,.5)', b); } } }
  },
  sfx(d, P, E) { const tc = E('court') - .4; return [[.3, 'city', .3, { dur: tc }], [tc, 'swoosh', .4], [tc + 1.2, 'whoosh', .4], [tc + 1.85, 'zap', .3]]; }
};
SC.ridiculous = {
  draw(t, d) {
    ctx.fillStyle = '#060608'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(860, -50); ctx.lineTo(1060, -50); ctx.lineTo(1300, 900); ctx.lineTo(620, 900); ctx.closePath();
    ctx.fillStyle = grad(0, 0, 0, 900, [[0, 'rgba(255,240,210,.28)'], [1, 'rgba(255,240,210,.06)']]); ctx.fill(); ctx.restore();
    ctx.save(); cam(960, 600, 1.05 + t * .04);
    ctx.fillStyle = grad(820, 0, 1100, 0, [[0, '#15161b'], [.5, '#3a3c45'], [1, '#121318']]); ctx.fillRect(830, 780, 260, 140); ctx.fillStyle = '#4a4c56'; ctx.fillRect(810, 770, 300, 18);
    const grow = eback(prog(t, .05, .4)), wilt = eio(prog(t, .9, 1.5)), flap = Math.sin(t * 20) * .3 * (1 - wilt);
    ctx.save(); ctx.globalAlpha = 1; wings(960, 560, .42 * grow, .9 - wilt * .7, { flap, droop: wilt * .6 }); ctx.restore();
    drawCan(960, 640, 260, { rim: 'rgba(255,230,190,.6)', rot: Math.sin(t * 20) * .03 * (1 - wilt) });
    const R = rnd(13); for (let i = 0; i < 9; i++) { const st = 1.1 + R() * .5, k = t - st; if (k < 0) continue; const x = 960 + (R() - .5) * 260 + Math.sin(k * 4 + i) * 40, y = 560 + k * 220;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(k * 3 + i) * .8); drawFeather(70, 18, 1); ctx.restore(); }
    ctx.restore();
  },
  sfx() { return [[.05, 'wing', .4], [.9, 'deflate', .35]]; }
};
SC.complaint = {
  draw(t, d) {
    const shk = t > 1.3 ? Math.exp(-(t - 1.3) * 7) * 12 : 0;
    ctx.fillStyle = '#1b120a'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(Math.sin(t * 80) * shk, Math.cos(t * 70) * shk); cam(960, 540, 1.05 + t * .03);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#3b2a1b'], [1, '#1b120a']]); ctx.fillRect(-100, -100, W + 200, H + 200); glow(900, 400, 800, 'rgba(255,200,130,.25)');
    const k = eout(prog(t, .05, .8));
    paperDoc(900, 560 + (1 - k) * 700, 640, -.04 + (1 - k) * .2, 'UNITED STATES DISTRICT COURT\nCLASS ACTION COMPLAINT', { hl: [[2, prog(t, 1.8, 2.5)], [3, prog(t, 2.2, 2.9)]] });
    const hit = 1.3, up = t < hit ? lerp(-1.1, .15, eio(prog(t, .5, hit))) : .15; gavel(1430, 280, 1.3, Math.PI * .5 + .62 + up);
    if (t > hit) { const kk = t - hit; ctx.strokeStyle = `rgba(255,230,180,${Math.max(0, .5 - kk)})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(1130, 620, 60 + kk * 600, 12 + kk * 120, 0, 0, 7); ctx.stroke(); }
    ctx.restore();
  },
  sfx() { return [[.1, 'paper', .5], [1.3, 'gavel', .55]]; }
};
SC.settle2014 = {
  draw(t, d, P, E) {
    const ty = E('2014') - .2, tm = E('13') - .4, tcl = E('class') - .2;
    BGP('navy', t);
    ctx.save(); cam(960, 600, lerp(1.06, .98, eio(prog(t, 0, d))));
    floor(860, '#141a2a', '#04060b');
    const bricks = []; for (let row = 0; row < 4; row++) for (let c = 0; c < 13 - row; c++) bricks.push([960 + (c - (12 - row) / 2) * 120, 880 - row * 44]);
    bricks.forEach(([bx, by], i) => { const st = tm + i * .03, k = eout(prog(t, st, st + .4)); if (k > 0) cashBrick(bx, lerp(by - 400, by, k), clamp(k * 2)); });
    ctx.restore();
    const dock = eio(prog(t, ty + 1.4, ty + 2));
    ctx.save(); ctx.translate(960, lerp(600, 170, dock)); ctx.scale(lerp(1, .42, dock), lerp(1, .42, dock)); ctx.globalAlpha = prog(t, ty - .2, ty); splitFlap('2014', 0, 0, 240, prog(t, ty, ty + 1.1)); ctx.restore();
    if (t > tm - .3) { const a = prog(t, tm - .3, tm);
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(4,6,12,.85)'; rr(200, 330, 1520, 360, 30); ctx.fill(); ctx.strokeStyle = 'rgba(232,185,49,.5)'; ctx.lineWidth = 2; ctx.stroke();
      label('UP TO', 960, 400, 40, { color: '#e8b931', spacing: 16 }); odometer('$13,000,000', 960, 590, 190, prog(t, tm, tm + 2.0), { color: '#fff', sym: '#e8b931', shadow: 'rgba(255,210,90,.5)' }); ctx.restore();
      label('SETTLEMENT', 960, 668, 36, { color: '#c9d3ea', spacing: 22, alpha: prog(t, tm + 1.8, tm + 2.2) }); }
    if (t > tm + 2) moneyRain(t - tm - 2, 36);
    const cr = prog(t, tcl, tcl + 1.4);
    if (cr > 0) { const R = rnd(55); for (let i = 0; i < 24; i++) { const x = 60 + i * 78 + (R() - .5) * 20, h = 230 + R() * 90, dd = R() * .5, a = eout(clamp((cr - dd * .6) / .5));
      ctx.save(); ctx.globalAlpha = a; person(x, H + 60 + (1 - a) * 120, h, { silhouette: true, color: '#05070c', rim: 'rgba(255,210,120,.9)', cap: R() > .6, flip: R() > .5 }); ctx.restore(); }
      pill('CLASS-ACTION LAWSUIT', 960, 285, 34, prog(t, tcl + .2, tcl + .7), '#e3262f'); }
    dust(t, 17, 50, .6);
  },
  sfx(d, P, E) { const ty = E('2014') - .2, tm = E('13') - .4, tcl = E('class') - .2; return [[ty, 'flap', .45], [tm, 'ticks', .45, { dur: 2 }], [tm + 2, 'chime', .55], [tm + 2.1, 'coins', .3], [tcl + .2, 'pop', .5], [tcl, 'crowd', .2, { dur: 3 }]]; }
};
SC.wingsGuy = {
  draw(t, d, P, E) {
    const tsplit = d * .55;
    ctx.fillStyle = '#1b130b'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 560, 1.03 + t * .01); courtroom(t); ctx.restore();
    if (t < tsplit) { const wx = lerp(-200, 760, eout(prog(t, 0, tsplit * .7)));
      person(wx, 1010, 400, { walk: t < tsplit * .7 ? t * 9 : 0, cap: true, rim: 'rgba(255,207,138,.8)', light: 1, top: '#7a2a2a', backWings: { s: .34, spread: .55, flap: Math.sin(t * 9) * .04 } });
      bigX(760, 700, 380, prog(t, tsplit - 1.0, tsplit - .5)); }
    else { const lt = t - tsplit; ctx.save(); ctx.fillStyle = 'rgba(6,5,4,.45)'; ctx.fillRect(0, 0, W, H); ctx.restore();
      const R = rnd(5); for (let i = 0; i < 84; i++) { const c = i % 14, r = Math.floor(i / 14), dd = R() * 1.4, a = prog(lt, dd * .6, dd * .6 + .4);
        ctx.save(); ctx.globalAlpha = a; person(220 + c * 115 + (r % 2) * 55, 600 + r * 90 + (1 - eout(a)) * 40, 150, { silhouette: true, color: `rgb(${30 + r * 8},${30 + r * 8},${40 + r * 8})`, rim: 'rgba(255,210,150,.7)', cap: R() > .6, flip: R() > .5 }); ctx.restore(); } }
  },
  sfx(d) { return [[.2, 'steps', .35, { dur: d * .4 }], [d * .55 - 1, 'soft_x', .4], [d * .55, 'crowd', .25, { dur: d * .45 }]]; }
};
function courtroom(t) {
  for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#3b2716' : '#432c19'; ctx.fillRect(i * 170 - 60, 0, 170, 640); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 4; ctx.strokeRect(i * 170 - 40, 80, 130, 480); }
  glow(960, 120, 700, 'rgba(255,210,150,.35)');
  ctx.fillStyle = '#d9c9a8'; ctx.beginPath(); ctx.arc(960, 210, 90, 0, 7); ctx.fill(); ctx.fillStyle = '#7a5a2a'; ctx.beginPath(); ctx.arc(960, 210, 72, 0, 7); ctx.fill(); star5(960, 210, 40, '#d9c9a8');
  ctx.fillStyle = grad(0, 420, 0, 760, [[0, '#5a3b20'], [1, '#2a190c']]); ctx.fillRect(560, 420, 800, 340); ctx.fillStyle = '#6b4826'; ctx.fillRect(540, 400, 840, 34);
  flag(1420, 160, 200, t); ctx.fillStyle = '#b8a060'; ctx.fillRect(1414, 150, 6, 600);
  ctx.fillStyle = grad(0, 760, 0, H, [[0, '#4a2f19'], [1, '#1a0f06']]); ctx.fillRect(-100, 760, W + 200, 400);
}
SC.keywords = {
  draw(t, d, P, E) {
    const ws = [['energy', 'bolt', '#e8a317', 'ENERGY'], ['performance', 'watch', '#2e7dd7', 'PERFORMANCE'], ['consumer', 'shield', '#2f9e6b', 'CONSUMER PROTECTION'], ['legal', 'scales', '#c8202e', 'A LEGAL FIGHT']];
    const ta = E('attention') - .3;
    bg('#071022', '#02040a'); usStripes(t, .7);
    ctx.save(); cam(960, 560, 1.02 + t * .012);
    usMap(960, 650, 30, t, prog(t, .2, 1.8), ta);
    ctx.restore();
    ws.forEach(([w, k, c, l], i) => { const st = E(w) - .1, bx = 420 + i * 360; iconDisc(bx, 150, 62, k, prog(t, st, st + .45), c); label(l, bx, 255, 26, { spacing: 3, alpha: prog(t, st + .2, st + .6) }); });
    [[380, 760, -.12, 'THE MORNING LEDGER', 'RED BULL SETTLES\n"WINGS" LAWSUIT', 'Energy drink maker agrees to $13M deal'], [1540, 740, .1, 'NATIONAL DISPATCH', 'DOES IT REALLY\nGIVE YOU WINGS?', 'Class action targets ad claims'], [960, 860, -.03, 'CONSUMER WEEKLY', '$13 MILLION\nCLASS-ACTION DEAL', 'What buyers can claim']].forEach(([nx, ny, nr, m, hl, sb], i) => {
      const k = eout(prog(t, ta + 1 + i * .4, ta + 1.6 + i * .4)); if (k > 0) newspaper(lerp(nx > 960 ? 2400 : -500, nx, k), ny, 420, nr + (1 - k) * .6, m, hl, sb, { photoCan: true }); });
  },
  sfx(d, P, E) { const o = ['energy', 'performance', 'consumer', 'legal'].map(w => [E(w) - .1, 'pop', .5]); const ta = E('attention') - .3; for (let i = 0; i < 3; i++) o.push([ta + 1 + i * .4, 'paper', .45]); o.push([ta, 'shimmer', .3]); return o; }
};
function usMap(cx, cy, s, t, drawP, cityStart = 1.2, o = {}) {
  ctx.beginPath(); US.forEach(([lo, la], i) => { const [x, y] = proj(lo, la, cx, cy, s); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath();
  ctx.fillStyle = o.fill || 'rgba(30,55,110,.55)'; ctx.fill(); ctx.strokeStyle = 'rgba(140,180,255,.8)'; ctx.lineWidth = 3;
  ctx.setLineDash([2400]); ctx.lineDashOffset = 2400 * (1 - eio(drawP)); ctx.stroke(); ctx.setLineDash([]);
  const cities = [[-74, 40.7], [-87.6, 41.9], [-118.2, 34], [-122.4, 37.8], [-95.4, 29.8], [-80.2, 25.8], [-104.9, 39.7], [-122.3, 47.6], [-84.4, 33.7], [-71.1, 42.4], [-90.1, 29.9], [-112, 33.4], [-93.3, 44.9], [-86.8, 36.2], [-77, 38.9], [-97.7, 30.3], [-83, 42.3], [-115.1, 36.2], [-81.7, 41.5], [-90.2, 38.6], [-111.9, 40.8], [-80.8, 35.2], [-122.7, 45.5], [-96.8, 32.8]];
  if (cityStart === null) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  cities.forEach(([lo, la], i) => { const [x, y] = proj(lo, la, cx, cy, s), st = cityStart + i * (o.step ?? .1), a = prog(t, st, st + .3); if (a <= 0) return; const pulse = ((t - st) * .8) % 1;
    glow(x, y, 50, o.dot || 'rgba(255,90,80,.7)', a); ctx.fillStyle = `rgba(255,220,200,${a})`; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill();
    ctx.strokeStyle = `rgba(255,120,100,${(1 - pulse) * .6 * a})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 8 + pulse * 50, 0, 7); ctx.stroke(); if (o.cans) drawCan(x, y - 30, 40 * a, { noShadow: true }); });
  ctx.restore();
}
SC.redSweep = {
  draw(t, d) {
    ctx.fillStyle = '#040406'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 640, lerp(1.0, 1.25, eio(prog(t, 0, d))));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(900, -50); ctx.lineTo(1020, -50); ctx.lineTo(1180, 990); ctx.lineTo(740, 990); ctx.closePath();
    ctx.fillStyle = grad(0, 0, 0, 990, [[0, 'rgba(230,235,255,.22)'], [1, 'rgba(230,235,255,.05)']]); ctx.fill();
    glow(lerp(-200, 2100, eio(prog(t, .4, d))), 600, 700, 'rgba(227,38,47,.45)'); glow(960, 640, 500, 'rgba(227,38,47,.18)', .5 + .5 * Math.sin(t * 5)); ctx.restore();
    floor(990, '#101015', '#040406'); person(960, 995, 420, { cap: true, rim: 'rgba(255,90,80,.9)', light: 1, top: '#3b3f48' });
    ctx.restore(); dust(t, 31, 70, .5);
  },
  sfx(d) { return [[0, 'riser', .35, { dur: d }]]; }
};
SC.oneMan = {
  draw(t, d, P, E) {
    const tx = P.xw ? E(P.xw) : d * .35, split = eio(prog(t, tx + .8, tx + 2.2));
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#0b0d14'], [1, '#030305']]); ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgrad(960, 200, 0, 900, [[0, 'rgba(255,230,180,.25)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, W, H); ctx.restore();
    floor(820, '#14161e', '#050507');
    if (split < 1) { ctx.save(); ctx.globalAlpha = 1 - split;
      person(720, 960, 420, { cap: true, rim: 'rgba(255,216,154,.8)', light: 1, point: t > .5 && t < tx });
      moneyBag(1150, 650, .9, ''); const g = t > tx - .3 ? Math.sin(t * 90) * 10 * prog(t, tx - .3, tx) : 0;
      ctx.save(); ctx.translate(g, 0); odometer('$13,000,000', 960, 300, 120, prog(t, .1, 1.3), { color: '#ffe08a', sym: '#ffe08a', shadow: 'rgba(255,200,80,.5)' }); ctx.restore();
      ctx.restore(); bigX(1150, 620, 420, prog(t, tx, tx + .6)); }
    if (t > tx + .8) { const R = rnd(9); for (let i = 0; i < 220; i++) { const c = i % 22, r = Math.floor(i / 22), tx2 = 130 + c * 79 + (r % 2) * 38, ty2 = 560 + r * 48;
      const k = eout(clamp((t - tx - .8 - R() * .8) / 1.2)), x = lerp(1150, tx2, k), y = lerp(620, ty2 - 70, k) - Math.sin(k * Math.PI) * 200;
      ctx.fillStyle = `rgba(255,214,90,${k > 0 ? 1 : 0})`; ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill();
      if (k > .95) icon(tx2, ty2, 40, `rgba(190,200,225,${prog(t, tx + 1.8 + R() * .5, tx + 2.4 + R() * .5)})`); } }
  },
  sfx(d, P, E) { const tx = P.xw ? E(P.xw) : d * .35; return [[.1, 'ticks', .35, { dur: 1.2 }], [tx, 'soft_x', .45], [tx + .8, 'coins', .45], [tx + 1.0, 'shimmer', .3]]; }
};
SC.rewind = {
  draw(t, d, P) {
    bg('#02030a', '#060a18');
    ctx.save(); ctx.translate(960, 540);
    const sp = eio(prog(t, .5, d - .5));
    for (let i = 0; i < 70; i++) { const R = rnd(i + 3); const a = R() * Math.PI * 2, z = ((R() + t * (.4 + sp * 1.6)) % 1), r = 60 + z * z * 1300;
      ctx.strokeStyle = `rgba(${150 + R() * 100},${170 + R() * 60},255,${z * .6})`; ctx.lineWidth = 1 + z * 4; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); ctx.lineTo(Math.cos(a) * (r + 40 + z * 160), Math.sin(a) * (r + 40 + z * 160)); ctx.stroke(); }
    ctx.restore(); glow(960, 540, 400, 'rgba(120,160,255,.35)');
    const yr = Math.round(lerp(2014, 1987, eio(prog(t, .8, d - .8))));
    ctx.save(); ctx.translate(960, 560); splitFlap(String(yr), 0, 0, 200, 1); ctx.restore();
    // clock hands spinning backwards
    ctx.save(); ctx.translate(960, 540); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 380, 0, 7); ctx.stroke();
    ctx.rotate(-t * 6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -330); ctx.stroke(); ctx.rotate(t * 5.2); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -220); ctx.stroke(); ctx.restore();
  },
  sfx(d) { return [[0, 'rewind', .45, { dur: d }], [.8, 'flapseq', .3, { dur: d - 1.6 }]]; }
};
// three questions
SC.questions = {
  draw(t, d, P, E) {
    BGP('night', t); usStripes(t, .4);
    const items = [['what', 'question', '#c8202e'], ['why', 'handshake', '#2e6fd7'], ['how', 'dollar', '#2f9e6b']];
    ctx.save(); cam(960, 540, 1.02 + t * .01);
    items.forEach(([w, ic, c], i) => { const st = E(w) - .1, x = 480 + i * 480, p = prog(t, st, st + .5); if (p <= 0) return;
      ctx.save(); ctx.translate(x, 540 + (1 - eout(p)) * 80); ctx.globalAlpha = clamp(p * 2);
      ctx.fillStyle = 'rgba(255,255,255,.06)'; rr(-200, -260, 400, 520, 30); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 2; ctx.stroke();
      iconDisc(0, -60, 110, ic, 1, c);
      if (i === 0) drawCan(0, 150, 160, { noShadow: true }); if (i === 1) { ctx.save(); handshake(0, 160, .28, 1); ctx.restore(); } if (i === 2) { for (let k = 0; k < 5; k++) { ctx.fillStyle = '#d9b44a'; ctx.beginPath(); ctx.ellipse(0, 200 - k * 16, 60, 16, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#8a6a20'; ctx.lineWidth = 2; ctx.stroke(); } }
      ctx.restore(); });
    ctx.restore();
  },
  sfx(d, P, E) { return ['what', 'why', 'how'].map(w => [E(w) - .1, 'pop', .55]); }
};
// ---------- PART ONE ----------
SC.studioHero = {
  draw(t, d, P) {
    studio(t, P.hue ?? 268);
    ctx.save(); cam(960, 560, lerp(1.0, 1.12, eio(prog(t, 0, d))), Math.sin(t * .3) * .01);
    drawCan(960, 560, 640, { rim: 'rgba(200,160,255,.7)', drops: P.drops ?? true });
    ctx.save(); ctx.globalAlpha = .15; ctx.translate(0, 1760); ctx.scale(1, -1); drawCan(960, 560, 640, { noShadow: true }); ctx.restore();
    if (P.flash) { const R = rnd(4); for (let i = 0; i < 6; i++) { const st = .3 + i * (d - .6) / 6, k = t - st; if (k > 0 && k < .25) glow(300 + R() * 1300, 300 + R() * 400, 500, 'rgba(255,255,255,.8)', 1 - k / .25); } }
    ctx.restore(); dust(t, 9, 60);
  },
  sfx(d, P) { const o = [[.2, 'shimmer', .35]]; if (P.flash) for (let i = 0; i < 6; i++) o.push([.3 + i * (d - .6) / 6, 'shutter', .35]); return o; }
};
// montage: F1 → extreme sports → athletes → ads
SC.brandWorld = {
  draw(t, d, P, E) {
    const tf = E('formula') - .3, tx = E('extreme') - .2, ta = E('athletes') - .4, tad = E('advertising') - .3;
    if (t < tx) { f1Pass(t - tf, t, 'side'); }
    else if (t < ta) { extremeSports(t - tx, t); }
    else if (t < tad) { athleteStadium(t - ta, t); }
    else billboards(t - tad, {});
  },
  sfx(d, P, E) { const tf = E('formula') - .3, tx = E('extreme') - .2, ta = E('athletes') - .4, tad = E('advertising') - .3;
    return [[Math.max(0, tf - .4), 'f1pass', 1.0], [tx, 'wind', .35, { dur: ta - tx }], [tx + .3, 'whoosh', .35], [ta, 'stadium', .3, { dur: tad - ta }], [tad, 'city', .3, { dur: d - tad }], [tad, 'swoosh', .35]]; }
};
function f1Pass(lt, t, mode) {
  const sc = lt * 1400; raceTrack(sc);
  const x = mode === 'side' ? lerp(-500, 2400, eio(clamp(lt / 2.2))) : 960 + Math.sin(t * 3) * 20;
  // motion ghosts
  for (let g = 4; g >= 1; g--) { ctx.save(); ctx.globalAlpha = .1; f1Car(x - g * 40, 790, 1.5, { wheel: t * 30, blurWheels: true }); ctx.restore(); }
  f1Car(x, 790, 1.5, { wheel: t * 30, blurWheels: true });
  const R = rnd(Math.floor(t * 30)); for (let i = 0; i < 10; i++) { ctx.fillStyle = `rgba(255,${180 + R() * 60},80,${R()})`; ctx.fillRect(x - 330 - R() * 200, 830 + R() * 20, 6 + R() * 20, 2); }
  ctx.fillStyle = `rgba(0,0,0,${.0})`;
}
function extremeSports(lt, t) {
  ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a64c8'], [.7, '#9ccbff'], [1, '#e6f2ff']]); ctx.fillRect(0, 0, W, H);
  const R = rnd(6); for (let i = 0; i < 14; i++) { const y = (R() * H * 1.4 - lt * 500 * (0.5 + R())) % (H * 1.4); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.ellipse(R() * W, y < -200 ? y + H * 1.4 : y, 160 + R() * 200, 50 + R() * 40, 0, 0, 7); ctx.fill(); }
  skydiver(760 + Math.sin(t) * 60, 420, 1.6, t); motocross(1450, 760 - Math.sin(clamp(lt / 2) * Math.PI) * 200, 1.1, t);
  ctx.fillStyle = '#a08060'; ctx.beginPath(); ctx.moveTo(1100, H); ctx.quadraticCurveTo(1300, 860, 1500, 900); ctx.lineTo(1920, 1000); ctx.lineTo(1920, H); ctx.fill();
}
function athleteStadium(lt, t) {
  bg('#05070e', '#0d1220'); for (let i = 0; i < 5; i++) glow(200 + i * 380, 80, 260, 'rgba(255,250,230,.45)');
  const R = rnd(14); for (let i = 0; i < 400; i++) { ctx.fillStyle = `hsla(${R() * 360},30%,${30 + R() * 30}%,.6)`; ctx.fillRect(R() * W, 180 + R() * 300, 4, 6); }
  ctx.fillStyle = '#b5482d'; ctx.fillRect(0, 640, W, 440); for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(0, 680 + i * 70, W, 4); }
  const x = lerp(300, 1600, clamp(lt / 3)); person(x, 960, 420, { walk: t * 14, cap: false, top: '#1f36a8', pants: '#111', light: 1, rim: 'rgba(255,240,220,.7)' });
}
SC.hourglass = {
  draw(t, d) { BGP('warm', t); ctx.save(); cam(960, 540, 1.02 + t * .01); hourglass(760, 560, 1.3, prog(t, 0, d), t);
    const k = eio(prog(t, .3, d)); for (let i = 0; i < 6; i++) { const s = lerp(60, 60 + i * 50, k); drawCan(1200 + i * 90, 820 - s / 2, s, { noShadow: true }); } ctx.restore(); },
  sfx(d) { return [[0, 'sand', .35, { dur: d }]]; }
};
SC.austria = {
  draw(t, d, P, E) {
    const ty = E('1987') - .2, tas = E('asia') - .6;
    if (t < tas) { alps(t); ctx.save(); ctx.translate(960, 330); ctx.globalAlpha = prog(t, ty - .2, ty); splitFlap('1987', 0, 0, 170, prog(t, ty, ty + 1)); ctx.restore();
      ctx.save(); ctx.globalAlpha = prog(t, ty + 1.2, ty + 1.6); person(1500, 980, 260, { silhouette: true, color: '#141016', rim: 'rgba(255,210,150,.8)', light: -1 }); ctx.restore(); }
    else worldRoute(t - tas, 'asia');
  },
  sfx(d, P, E) { const ty = E('1987') - .2, tas = E('asia') - .6; return [[0, 'wind', .3, { dur: tas }], [ty, 'flap', .4], [tas, 'swoosh', .35], [tas + .5, 'shimmer', .3]]; }
};
// stylised world map (Eurasia + Americas blobs) with a dotted route
function worldRoute(lt, mode) {
  bg('#06101f', '#02060c'); ctx.save();
  const blobs = [[300, 380, 200, 150], [380, 600, 110, 160], [1000, 330, 150, 90], [1250, 380, 330, 160], [1050, 560, 140, 170], [1500, 700, 120, 70]];
  blobs.forEach(([x, y, rx, ry]) => { ctx.fillStyle = 'rgba(40,80,150,.5)'; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fill(); });
  ctx.strokeStyle = 'rgba(100,150,230,.12)'; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.moveTo(0, i * 56); ctx.lineTo(W, i * 56); ctx.stroke(); }
  const A = [1380, 470], AU = [1010, 330], US2 = [330, 400];
  const path = mode === 'asia' ? [A, AU] : [AU, US2];
  const p = eio(clamp(lt / 2));
  ctx.strokeStyle = '#ffcc00'; ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.beginPath();
  for (let i = 0; i <= 50 * p; i++) { const u = i / 50, x = lerp(path[0][0], path[1][0], u), y = lerp(path[0][1], path[1][1], u) - Math.sin(u * Math.PI) * 160; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]);
  [path[0], path[1]].forEach((q, i) => { glow(q[0], q[1], 70, 'rgba(255,90,80,.8)', i ? p : 1); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(q[0], q[1], 8, 0, 7); ctx.fill(); });
  if (mode === 'asia') { for (let k = 0; k < 4; k++) { const R = rnd(k + 9); ctx.save(); ctx.globalAlpha = .9; drawGenericCan(A[0] + 80 + k * 50, A[1] + 120, 90, ['#e8b931', '#c8202e', '#2f9e6b', '#e0702a'][k]); ctx.restore(); } }
  else { const R = rnd(4); for (let i = 0; i < 30; i++) { const a = prog(lt, 1 + i * .03, 1.4 + i * .03); icon(US2[0] - 160 + (i % 10) * 34, US2[1] + 140 + Math.floor(i / 10) * 44, 34, `rgba(200,210,235,${a})`); } }
  ctx.restore();
}
function drawGenericCan(x, y, h, col) { const w = h * .42; ctx.fillStyle = grad(x - w / 2, 0, x + w / 2, 0, [[0, shade(col, .5)], [.4, shade(col, 1.2)], [1, shade(col, .5)]]); rr(x - w / 2, y - h / 2, w, h, w * .12); ctx.fill(); ctx.fillStyle = '#ccc'; ctx.fillRect(x - w / 2, y - h / 2, w, h * .06); }
SC.west = { draw(t) { worldRoute(t, 'west'); }, sfx() { return [[0, 'swoosh', .4], [1.0, 'crowd', .2, { dur: 2.5 }]]; } };
// identity: a shelf of anonymous grey cans; one lights up with the brand
SC.identity = {
  draw(t, d, P, E) {
    const ti = E('identity') - .3; BGP('night', t);
    ctx.save(); cam(960, 560, 1.0 + t * .015); floor(780, '#1a1d26', '#06070a');
    for (let r = 0; r < 2; r++) for (let i = 0; i < 11; i++) { const x = 260 + i * 140, y = 460 + r * 300, hero = r === 1 && i === 5;
      if (hero && t > ti) { const k = eout(prog(t, ti, ti + .6)); glow(x, y, 300, 'rgba(255,220,150,.5)', k); drawCan(x, y - k * 30, 220 + k * 40, { noShadow: true }); ctx.save(); ctx.globalAlpha = 1 - k; drawGenericCan(x, y, 220, '#6a6f7a'); ctx.restore(); }
      else drawGenericCan(x, y, 220, ['#6a6f7a', '#5f646e', '#737884'][(i + r) % 3]); }
    ctx.restore();
  },
  sfx(d, P, E) { return [[E('identity') - .3, 'shimmer', .5], [E('identity') - .25, 'chime', .3]]; }
};
SC.moodboard = {
  draw(t, d, P, E) {
    bg('#0b0d14', '#040508');
    const tiles = [['energy', 'bolt', '#e8a317'], ['excitement', 'firework', '#c8202e'], ['performance', 'watch', '#2e6fd7'], ['limits', 'mountain', '#2f9e6b']];
    ctx.save(); cam(960, 540, 1.02 + t * .01);
    tiles.forEach(([w, ic, c], i) => { const st = E(w) - .15, p = prog(t, st, st + .5), x = 300 + i * 440; if (p <= 0) return;
      ctx.save(); ctx.translate(x, 540); ctx.rotate((i % 2 ? .04 : -.04) * (1 - eout(p))); ctx.scale(eback(p), eback(p));
      ctx.fillStyle = grad(0, -260, 0, 260, [[0, shade(c, .6)], [1, shade(c, .25)]]); rr(-190, -250, 380, 500, 22); ctx.fill();
      iconDisc(0, -40, 120, ic, 1, c);
      if (i === 3) { person(0, 220, 120, { silhouette: true, color: '#05060a', rim: 'rgba(255,255,255,.6)', shrug: 0, armUp: 1 }); }
      ctx.restore(); });
    const tc = d - 1.4; if (t > tc) { const k = eout(prog(t, tc, tc + .8)); ctx.save(); ctx.globalAlpha = k; glow(960, 540, 500, 'rgba(255,220,150,.4)'); drawCan(960, 560, 420 * k + 1, { rim: 'rgba(255,210,160,.6)' }); ctx.restore(); }
    ctx.restore();
  },
  sfx(d, P, E) { return [...['energy', 'excitement', 'performance', 'limits'].map(w => [E(w) - .15, 'pop', .5]), [d - 1.4, 'swoosh', .4]]; }
};
SC.slogan = {
  draw(t, d, P, E) {
    const tg = E('gives') - .3; studio(t, 230);
    ctx.save(); cam(960, 540, lerp(1.08, 1.0, eio(prog(t, 0, d))));
    if (t > tg) { const k = prog(t, tg, tg + 1.6); glow(960, 420, 700 * k, 'rgba(255,240,210,.25)');
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .05; ctx.fillStyle = `rgba(255,240,210,${.04 * k})`; ctx.beginPath(); ctx.moveTo(960, 470); ctx.lineTo(960 + Math.cos(a) * 1500, 470 + Math.sin(a) * 1500); ctx.lineTo(960 + Math.cos(a + .08) * 1500, 470 + Math.sin(a + .08) * 1500); ctx.fill(); } ctx.restore();
      wings(960, 430, .82, eio(k), { flap: Math.sin(t * 1.6) * .04 * k }); }
    drawCan(960, 580, 520, { rim: 'rgba(170,190,255,.7)', drops: true });
    ctx.restore(); dust(t, 23, 70, .6);
  },
  sfx(d, P, E) { const tg = E('gives') - .3; return [[.2, 'pad_swell', .3, { dur: d }], [tg, 'wing', .5], [tg + .1, 'shimmer', .5], [tg + .9, 'wing', .35]]; }
};
SC.tvAd = {
  draw(t, d) {
    bg('#1a120c', '#070504'); glow(960, 480, 800, 'rgba(120,160,255,.18)');
    // living room: couch silhouette, lamp
    ctx.fillStyle = '#2b1e15'; ctx.fillRect(0, 760, W, 320); ctx.fillStyle = '#5a3b26'; ctx.fillRect(0, 760, W, 10);
    ctx.save(); cam(960, 520, lerp(1.0, 1.1, eio(prog(t, 0, d)))); tvCartoon(960, 470, 980, t, clamp(t / (d * .85))); ctx.restore();
    ctx.fillStyle = '#120c08'; rr(260, 860, 1400, 260, 80); ctx.fill(); rr(200, 800, 220, 300, 60); ctx.fill(); rr(1500, 800, 220, 300, 60); ctx.fill();
    glow(1750, 600, 260, 'rgba(255,190,110,.35)');
  },
  sfx(d) { return [[.1, 'tv_on', .35], [d * .85 * .35, 'cartoon_wing', .45], [d * .85 * .55, 'boing_soft', .35]]; }
};
SC.nobody = {
  draw(t, d, P, E) {
    const tp = E('point') - .2; BGP('warm', t);
    ctx.save(); cam(960, 600, 1.04 + t * .01); floor(900, '#2a1d14', '#0d0805');
    const a = prog(t, .8, 2.2) * (1 - prog(t, tp, tp + .6));
    ctx.save(); ctx.globalAlpha = a; wings(960, 560, .7, eio(prog(t, .8, 2.6)), { outline: 'rgba(255,255,255,.85)', dash: [12, 10] }); ctx.restore();
    person(960, 1000, 520, { holdCan: true, armUp: prog(t, .2, .8) * (1 - prog(t, 1.4, 1.8)), cap: true, rim: 'rgba(255,200,150,.8)', light: 1, shrug: t > tp ? eout(prog(t, tp, tp + .5)) * .8 : 0 });
    ctx.restore(); dust(t, 3, 40, .5);
  },
  sfx(d, P, E) { return [[.3, 'sip', .4], [.8, 'shimmer', .3], [E('point') - .2, 'soft_x', .3]]; }
};
SC.metaphor = {
  draw(t, d, P, E) {
    const tw = E('worked') - .2; BGP('night', t);
    ctx.save(); cam(960, 600, 1.04 + t * .012);
    const k = eio(prog(t, .5, 3));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2 + t * .4, r0 = 260 + Math.sin(t * 2 + i) * 30; ctx.strokeStyle = `rgba(255,200,100,${.25 * k})`; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(960 + Math.cos(a) * r0 * .5, 640 + Math.sin(a) * r0 * .8); ctx.lineTo(960 + Math.cos(a) * r0, 640 + Math.sin(a) * r0 * 1.4); ctx.stroke(); } ctx.restore();
    glow(960, 640, 500, 'rgba(255,190,90,.35)', k);
    ctx.save(); ctx.globalAlpha = .55 * k; wings(960, 520, .55, .8 + .1 * Math.sin(t * 2), { glow: 'rgba(255,220,160,.4)' }); ctx.restore();
    person(960, 1000, 480, { cap: true, armUp: k * .3, holdCan: true, rim: 'rgba(255,210,150,.9)', light: 1 });
    ctx.restore();
    if (t > tw) iconDisc(1500, 300, 90, 'check', prog(t, tw, tw + .5), COL.green);
  },
  sfx(d, P, E) { return [[.5, 'pad_swell', .3, { dur: 3 }], [E('worked') - .2, 'chime', .5]]; }
};
SC.everywhere = {
  draw(t, d, P, E) {
    const tm = E('major') - .3, ts = E('studying') - .3, tp = E('professional') - .3;
    if (t < ts) { BGP('navy', t); ctx.save(); cam(960, 560, 1.02); // market growth bars
      const bars = [.25, .35, .5, .62, .78, .95]; bars.forEach((b, i) => { const k = eout(prog(t, tm + i * .2, tm + i * .2 + .6)); const h = 560 * b * k;
        ctx.fillStyle = i === 5 ? '#c8202e' : '#2e4fa8'; rr(420 + i * 190, 900 - h, 130, h, 10); ctx.fill(); if (i === 5 && k > .9) drawCan(485 + i * 190, 900 - h - 110, 200, { noShadow: true }); });
      ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(380, 900); ctx.lineTo(1600, 900); ctx.stroke(); ctx.restore(); }
    else if (t < tp) { dorm(t); person(1000, 1060, 520, { silhouette: true, color: '#06070c', rim: 'rgba(255,190,110,.7)', light: -1 }); drawCan(1120, 690, 110, { rim: 'rgba(255,190,110,.6)' }); }
    else f1Pass(t - tp, t, 'side');
  },
  sfx(d, P, E) { const tm = E('major') - .3, ts = E('studying') - .3, tp = E('professional') - .3; const o = []; for (let i = 0; i < 6; i++) o.push([tm + i * .2, 'tick', .35]); o.push([ts, 'swoosh', .35], [ts, 'night', .3, { dur: tp - ts }], [Math.max(tp - .4, 0), 'f1pass', .95]); return o; }
};
SC.claimsOrbit = {
  draw(t, d, P) {
    BGP('navy', t); ctx.save(); cam(960, 560, 1.0 + t * .01);
    const k = eio(prog(t, 0, d)); drawCan(960, 580, lerp(300, 560, k), { rim: 'rgba(170,190,255,.6)' });
    (P.claims || ['MORE ENERGY', 'BETTER FOCUS', 'HIGHER PERFORMANCE']).forEach((c, i) => { const a = t * .7 + i * Math.PI * 2 / 3, x = 960 + Math.cos(a) * 520, y = 560 + Math.sin(a) * 200, p = prog(t, .4 + i * .5, .9 + i * .5);
      pill(c, x, y, 32, p, i === 1 ? '#2e6fd7' : (i === 2 ? '#2f9e6b' : '#c8202e')); });
    ctx.restore();
  },
  sfx() { return [[.4, 'pop', .4], [.9, 'pop', .4], [1.4, 'pop', .4]]; }
};
SC.questioning = {
  draw(t, d) {
    BGP('night', t); ctx.save(); cam(960, 560, 1.02 + t * .012);
    drawCan(960, 520, 420, { rim: 'rgba(170,190,255,.5)' });
    const R = rnd(8); for (let i = 0; i < 18; i++) { const x = 160 + i * 95, h = 200 + R() * 80, a = prog(t, R() * 1.5, R() * 1.5 + .5);
      ctx.save(); ctx.globalAlpha = a; person(x, 1110, h, { silhouette: true, color: '#05070c', rim: 'rgba(160,190,255,.7)', cap: R() > .5, flip: R() > .5 }); ctx.restore();
      if (i % 3 === 0) { const q = prog(t, 1.5 + i * .1, 2 + i * .1); ctx.save(); ctx.globalAlpha = q; label('?', x, 1110 - h - 30 + Math.sin(t * 2 + i) * 8, 60, { color: '#e8b931', weight: 900 }); ctx.restore(); } }
    const mg = prog(t, 2.5, 3.3); if (mg > 0) { const mx = lerp(700, 1050, eio(prog(t, 2.5, d))); ctx.save(); ctx.globalAlpha = mg; ctx.strokeStyle = '#ddd'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(mx, 470, 110, 0, 7); ctx.stroke();
      ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx + 80, 550); ctx.lineTo(mx + 190, 660); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,.12)'; ctx.beginPath(); ctx.arc(mx, 470, 104, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.restore();
  },
  sfx() { return [[.3, 'crowd', .2, { dur: 3 }], [2.5, 'swoosh', .3]]; }
};
SC.courthouse = {
  draw(t, d, P) {
    const dusk = P.dusk ?? true;
    ctx.fillStyle = dusk ? grad(0, 0, 0, H, [[0, '#1d2550'], [.6, '#c47a5a'], [1, '#3a2a28']]) : grad(0, 0, 0, H, [[0, '#b9c7d8'], [.6, '#e8e1d3'], [1, '#8d877c']]); ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 520, 1.0 + t * .02); glow(1600, 200, 700, dusk ? 'rgba(255,170,110,.4)' : 'rgba(255,240,210,.6)');
    courthouseMini(960, 900, 1); ctx.fillStyle = '#9d9d9d'; ctx.fillRect(250, 150, 8, 750); flag(258, 160, 260, t);
    floor(900, dusk ? '#3a302a' : '#a49d90', dusk ? '#120e0c' : '#6b655c');
    if (P.calendar) calendarPage(1560, 640, .9, P.calendar[0], P.calendar[1], P.calendar[2], { rot: .06 });
    ctx.restore();
  },
  sfx(d) { return [[0, 'wind', .25, { dur: d }]]; }
};
