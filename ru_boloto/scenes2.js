// ===== scenes, part B: PART TWO → ENDING =====

// ---------- mini painters (used inside split screens & composites); each draws centred at (0,0) ----------
const PNT = {
  oneMan(t) { person(-120, 300, 420, { cap: true, rim: 'rgba(255,216,154,.8)', light: 1 }); moneyBag(170, 120, .55, ''); label('$13,000,000', 60, -200, 64, { color: '#ffe08a', weight: 900 }); },
  crowd(t) { const R = rnd(3); for (let i = 0; i < 60; i++) { const c = i % 12, r = Math.floor(i / 12); icon(-330 + c * 60 + (r % 2) * 30, -60 + r * 70, 46, `rgba(${190 - r * 12},${200 - r * 10},${225 - r * 6},1)`); }
    label('$13,000,000', 0, -200, 60, { color: '#ffe08a', weight: 900 }); for (let i = 0; i < 20; i++) { const R2 = rnd(i); ctx.fillStyle = '#d9b44a'; ctx.beginPath(); ctx.arc(-300 + R2() * 600, -150 + ((t * 120 + R2() * 300) % 300), 7, 0, 7); ctx.fill(); } },
  headline(t) { newspaper(0, 40, 520, -.04, 'THE MORNING LEDGER', '$13 MILLION\nSETTLEMENT', 'Energy drink giant settles', { photoCan: true }); },
  hand423(t) { ctx.save(); ctx.translate(0, 60); ctx.fillStyle = '#e0ac8a'; ctx.beginPath(); ctx.ellipse(0, 120, 170, 90, 0, 0, 7); ctx.fill();
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(-110 + k * 70, 40, 30, 80, -.1 + k * .05, 0, 7); ctx.fill(); }
    giantCheck(0, -60, 420, '$4.23', 'Claimant', -.05); ctx.restore(); },
  cartoon(t) { tvCartoon(0, 0, 640, t, (t * .3) % 1); },
  lab(t) { ctx.save(); ctx.fillStyle = '#0d1a2e'; rr(-320, -220, 640, 420, 16); ctx.fill(); ctx.strokeStyle = 'rgba(120,180,255,.25)'; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-290, -180 + i * 64); ctx.lineTo(290, -180 + i * 64); ctx.stroke(); }
    ctx.strokeStyle = '#ffcc00'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(-290 + u * 580, 120 - u * 200 + Math.sin(u * 12 + t) * 20); } ctx.stroke();
    caffeine(220, -120, .6, t, '#9cc3ff'); ctx.restore(); },
  consumer(t) { person(0, 330, 560, { cap: true, rim: 'rgba(160,190,255,.8)', light: 1, holdCan: true }); },
  hq(t) { ctx.save(); ctx.scale(.55, .55); ctx.translate(-960, -600); hqTower(t, {}); ctx.restore(); },
  scaleBal(t) { scales(0, 120, .9, Math.sin(t) * .04); },
};
SC.split = {
  draw(t, d, P, E) {
    BGP(P.bg || 'night', t);
    const tr = P.w ? E(P.w) - .2 : d * .4, a = eout(prog(t, .1, .8)), b = eout(prog(t, tr, tr + .7));
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 955, H); ctx.clip(); ctx.translate(480 - (1 - a) * 300, 560); ctx.globalAlpha = a; PNT[P.left](t); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(965, 0, 955, H); ctx.clip(); ctx.translate(1440 + (1 - b) * 300, 560); ctx.globalAlpha = b; PNT[P.right](t); ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(958, 80 + (1 - a) * 900, 4, 920 * a);
    if (P.sign) { const s = prog(t, tr + .5, tr + 1); if (s > 0) { ctx.save(); ctx.translate(960, 540); ctx.scale(eback(s), eback(s)); ctx.fillStyle = '#c8202e'; ctx.beginPath(); ctx.arc(0, 0, 80, 0, 7); ctx.fill(); label(P.sign, 0, 30, 90, { weight: 900 }); ctx.restore(); } }
    if (P.labels) { label(P.labels[0], 480, 130, 40, { spacing: 6, alpha: a, color: '#e8b931' }); label(P.labels[1], 1440, 130, 40, { spacing: 6, alpha: b, color: '#e8b931' }); }
  },
  sfx(d, P, E) { const tr = P.w ? E(P.w) - .2 : d * .4; return [[.1, 'swoosh', .4], [tr, 'swoosh', .4], ...(P.sign ? [[tr + .5, 'pop', .5]] : [])]; }
};
// document on a desk: optional calendar, signature, highlights, stamp, magnifier
SC.doc = {
  draw(t, d, P, E) {
    ctx.fillStyle = '#1b120a'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 540, 1.04 + t * .02);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#3b2a1b'], [1, '#1b120a']]); ctx.fillRect(-100, -100, W + 200, H + 200); glow(860, 380, 800, 'rgba(255,200,130,.25)');
    const k = eout(prog(t, .05, .8)); const dx = P.cal ? 760 : 960;
    paperDoc(dx, 560 + (1 - k) * 700, 620, -.03 + (1 - k) * .2, P.title || 'COMPLAINT', {
      hl: (P.hl || []).map(([row, w]) => [row, prog(t, E(w) - .2, E(w) + .6)]), sign: P.sign ? prog(t, E(P.sign) - .2, E(P.sign) + 1) : 0 });
    if (P.cal) { const ck = eout(prog(t, E(P.cal[3]) - .4, E(P.cal[3]) + .2)); calendarPage(1450, 520 + (1 - ck) * 700, 1.1, P.cal[0], P.cal[1], P.cal[2], { rot: .06 }); }
    if (P.stamp) stamp2(P.stamp[0], dx + 80, 700, prog(t, E(P.stamp[1]) - .1, E(P.stamp[1]) + .25), P.stamp[2] || '#e3262f', 80);
    if (P.mag) { const mx = lerp(600, 1200, eio(prog(t, 1, d))); ctx.save(); ctx.strokeStyle = '#ddd'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(mx, 500, 120, 0, 7); ctx.stroke(); ctx.lineWidth = 28; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx + 86, 586); ctx.lineTo(mx + 200, 700); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,.12)'; ctx.beginPath(); ctx.arc(mx, 500, 112, 0, 7); ctx.fill(); ctx.restore(); }
    if (P.over) P.over(t, d, E);
    ctx.restore();
  },
  sfx(d, P, E) { const o = [[.05, 'paper', .5]]; (P.hl || []).forEach(([, w]) => o.push([E(w) - .2, 'marker', .35])); if (P.sign) o.push([E(P.sign) - .2, 'pen', .4]); if (P.cal) o.push([E(P.cal[3]) - .4, 'page', .5]); if (P.stamp) o.push([E(P.stamp[1]) - .1, 'stamp', .55]); if (P.mag) o.push([1, 'swoosh', .25]); return o; }
};
SC.check = {
  draw(t, d, P, E) {
    BGP(P.bg || 'warm', t); ctx.save(); cam(960, 540, 1.02 + t * .015);
    const k = eout(prog(t, .1, .9)); giantCheck(960, 520 + (1 - k) * 600, 1100, P.amount || '$13,000,000', P.payee || 'One Lucky Guy', -.04 + (1 - k) * .2, { sign: true });
    if (P.person) person(380, 1000, 380, { cap: true, rim: 'rgba(255,216,154,.8)', light: 1, armUp: .3 });
    const tx = P.xw ? E(P.xw) : d * .55; bigX(960, 520, 520, prog(t, tx, tx + .6));
    if (P.stamp) stamp2(P.stamp, 1250, 760, prog(t, tx + .3, tx + .7), '#e3262f', 70);
    ctx.restore();
  },
  sfx(d, P, E) { const tx = P.xw ? E(P.xw) : d * .55; return [[.1, 'paper', .5], [tx, 'soft_x', .5]]; }
};
// crowd zoom-out: one person → thousands of dots
SC.crowdZoom = {
  draw(t, d, P) {
    BGP(P.bg || 'navy', t); const z = lerp(1, P.zoomTo || .08, eio(prog(t, .5, d)));
    ctx.save(); ctx.translate(960, 600); ctx.scale(z, z);
    const n = 60; for (let r = -n; r <= n; r++) for (let c = -n; c <= n; c++) { const x = c * 90, y = r * 110; if (Math.abs(x * z) > 1100 || Math.abs(y * z) > 700) continue;
      if (z > .25) icon(x, y + 40, 70, (r === 0 && c === 0) ? '#ffd27a' : 'rgba(170,185,215,.85)'); else { ctx.fillStyle = (r === 0 && c === 0) ? '#ffd27a' : 'rgba(170,185,215,.85)'; ctx.fillRect(x - 25, y, 50, 60); } }
    ctx.restore();
    if (P.map) { ctx.save(); ctx.globalAlpha = prog(t, d * .6, d); usMap(960, 640, 30, t, 1, d * .6, { step: .05 }); ctx.restore(); }
  },
  sfx(d) { return [[0, 'crowd', .25, { dur: d }], [.5, 'riser', .2, { dur: d - .5 }]]; }
};
SC.flow = {
  draw(t, d, P, E) {
    BGP('navy', t); ctx.save(); cam(960, 560, 1.01);
    const nodes = P.nodes; const n = nodes.length, gap = 1500 / (n - 1);
    nodes.forEach(([ic, col, lbl, w], i) => { const st = w ? E(w) - .2 : .3 + i * .7, x = 210 + i * gap, p = prog(t, st, st + .5);
      if (i > 0) { const q = eio(prog(t, st - .4, st)); ctx.strokeStyle = 'rgba(232,185,49,.8)'; ctx.lineWidth = 6; ctx.setLineDash([16, 10]); ctx.lineDashOffset = -t * 40;
        ctx.beginPath(); ctx.moveTo(x - gap + 110, 540); ctx.lineTo(x - gap + 110 + (gap - 220) * q, 540); ctx.stroke(); ctx.setLineDash([]); }
      iconDisc(x, 540, 100, ic, p, COL[col] || col); if (lbl) label(lbl, x, 700, 30, { spacing: 3, alpha: prog(t, st + .2, st + .6) }); });
    ctx.restore();
  },
  sfx(d, P, E) { return P.nodes.map(([, , , w], i) => [w ? E(w) - .2 : .3 + i * .7, 'pop', .5]); }
};
SC.pie = {
  draw(t, d, P, E) {
    BGP('navy', t); ctx.save(); cam(960, 540, 1.02);
    const p = prog(t, .3, 2.2); pieChart(P.x || 960, 560, 300, P.slices.map(([v, c, l]) => [v, COL[c] || c, l]), p);
    if (P.center) P.center(t, d, E);
    if (P.cut) { const tc = E(P.cut[0]) - .2, k = prog(t, tc, tc + .8); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(4,6,12,.85)'; rr(1150, 380, 700, 300, 26); ctx.fill();
      label('ATTORNEYS\' FEES', 1500, 450, 34, { color: '#e8b931', spacing: 6 }); odometer(P.cut[1], 1500, 590, 110, prog(t, tc, tc + 1.4), { color: '#ff6b5e', sym: '#ff6b5e' }); ctx.restore(); } }
    ctx.restore();
  },
  sfx(d, P, E) { const o = [[.3, 'swoosh', .35]]; if (P.cut) o.push([E(P.cut[0]) - .2, 'ticks', .4, { dur: 1.4 }], [E(P.cut[0]) + 1.2, 'snip', .5]); return o; }
};
SC.timeline = {
  draw(t, d, P, E) {
    BGP('flag', t); ctx.save(); cam(960, 540, 1.0 + t * .004);
    const ev = P.events, n = ev.length, x0 = 200, x1 = 1720;
    const lp = eio(prog(t, .2, 1.5)); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x0, 600, (x1 - x0) * lp, 6);
    ev.forEach(([yr, ic, col, lbl, w], i) => { const st = w ? E(w) - .2 : .5 + i * .8, x = x0 + (i + .5) * (x1 - x0) / n, p = prog(t, st, st + .5);
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, 603, 12 * eback(p), 0, 7); ctx.fill();
      iconDisc(x, 440, 80, ic, p, COL[col] || col); label(yr, x, 690, 46, { weight: 900, alpha: p, color: '#e8b931' }); if (lbl) label(lbl, x, 740, 24, { spacing: 2, alpha: prog(t, st + .2, st + .6) });
      const cur = ev.filter(e => (e[4] ? E(e[4]) - .2 : 0) <= t).length - 1; if (cur === i) glow(x, 440, 200, 'rgba(255,220,150,.25)'); });
    ctx.restore();
  },
  sfx(d, P, E) { return P.events.map(([, , , , w], i) => [w ? E(w) - .2 : .5 + i * .8, 'pop', .5]); }
};
// PART TWO
SC.magnifyAds = {
  draw(t, d) { billboards(t); const mx = lerp(500, 1400, eio(prog(t, .3, d))), my = 380 + Math.sin(t) * 40;
    ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.arc(mx, my, 200, 0, 7); ctx.clip(); ctx.translate(mx, my); ctx.scale(1.6, 1.6); ctx.translate(-mx, -my); billboards(t); ctx.restore();
    ctx.strokeStyle = '#ddd'; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(mx, my, 200, 0, 7); ctx.stroke(); ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx + 145, my + 145); ctx.lineTo(mx + 300, my + 300); ctx.stroke(); },
  sfx(d) { return [[.3, 'swoosh', .3], [0, 'city', .25, { dur: d }]]; }
};
SC.scaleClaims = {
  draw(t, d, P) { BGP('night', t); ctx.save(); cam(960, 560, 1.02 + t * .01);
    const tilt = lerp(0, P.tilt ?? .22, eio(prog(t, .8, 2.2))) + Math.sin(t * 2) * .01;
    scales(960, 760, 1.2, tilt, { left: (x, y) => { drawCan(x, y - 60, 150, { noShadow: true }); }, right: (x, y) => { ctx.fillStyle = '#d6b77c'; ctx.fillRect(x - 70, y - 30, 140, 26); ctx.fillStyle = '#f3efe6'; ctx.fillRect(x - 60, y - 36, 120, 8); } });
    if (P.labels !== false) { label('CLAIMS', 960 - 300, 900, 34, { spacing: 6, color: '#e8b931', alpha: prog(t, .5, 1) }); label('EVIDENCE', 960 + 300, 900, 34, { spacing: 6, color: '#e8b931', alpha: prog(t, .5, 1) }); }
    ctx.restore(); },
  sfx() { return [[.8, 'creak', .4]]; }
};
SC.caffeine = {
  draw(t, d, P, E) {
    const tc = E('caffeine') - .5; BGP('navy', t);
    const its = [['energy', 'bolt', '#e8a317', 'ENERGY'], ['concentration', 'brain', '#7b4bd1', 'CONCENTRATION'], ['performance', 'watch', '#2e7dd7', 'PERFORMANCE']];
    ctx.save(); cam(960, 540, 1.02);
    const up = eio(prog(t, tc - .3, tc + .3));
    its.forEach(([w, ic, c, l], i) => { const st = E(w) - .15, x = 480 + i * 480; iconDisc(x, lerp(420, 170, up), lerp(110, 60, up), ic, prog(t, st, st + .5), c); label(l, x, lerp(600, 280, up), lerp(34, 24, up), { spacing: 4, alpha: prog(t, st + .2, st + .6) }); });
    if (t > tc - .3) { ctx.save(); ctx.globalAlpha = up; coffeeCup(620, 840, 1.3, t); drawCan(1300, 760, 360, { rim: 'rgba(170,190,255,.6)' }); label('≈', 960, 780, 160, { weight: 900, color: '#e8b931' }); caffeine(960, 520, .9, t, 'rgba(255,255,255,.8)'); ctx.restore(); }
    ctx.restore();
  },
  sfx(d, P, E) { return [...['energy', 'concentration', 'performance'].map(w => [E(w) - .15, 'pop', .5]), [E('caffeine') - .5, 'swoosh', .4], [E('caffeine'), 'pour', .3]]; }
};
SC.notWings = {
  draw(t, d) { studio(t, 230); ctx.save(); cam(960, 560, 1.02 + t * .01);
    const f = prog(t, .5, 2.2); ctx.save(); ctx.globalAlpha = 1 - f; wings(960, 430, .8, 1 - f * .5, { droop: f * .5 }); ctx.restore();
    drawCan(960, 580, 500, { rim: 'rgba(170,190,255,.7)' });
    ['MORE ENERGY', 'BETTER FOCUS', 'PEAK PERFORMANCE'].forEach((c, i) => pill(c, [460, 1460, 960][i], [420, 520, 900][i], 34, prog(t, 2.4 + i * .5, 2.9 + i * .5), ['#c8202e', '#7b4bd1', '#2e6fd7'][i]));
    ctx.restore(); },
  sfx() { return [[.5, 'deflate', .3], [2.4, 'pop', .45], [2.9, 'pop', .45], [3.4, 'pop', .45]]; }
};
SC.lineFloor = {
  draw(t, d, P) { BGP('night', t); ctx.save(); cam(960, 600, 1.02 + t * .01); floor(700, '#14161e', '#040406');
    const k = eio(prog(t, .2, 1.4)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,80,70,.9)'; ctx.fillRect(960 - 4, 700, 8, 380 * k); glow(960, 880, 260, 'rgba(255,70,60,.5)', k); ctx.restore();
    if (P.labels) { pill(P.labels[0], 520, 520, 40, prog(t, .6, 1.1), '#2e6fd7'); pill(P.labels[1], 1400, 520, 40, prog(t, .9, 1.4), '#c8202e'); if (P.neq) { const s = prog(t, 1.2, 1.6); if (s > 0) { ctx.save(); ctx.translate(960, 520); ctx.scale(eback(s), eback(s)); ctx.fillStyle = '#c8202e'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.fill(); label('≠', 0, 28, 84, { weight: 900 }); ctx.restore(); } } }
    if (P.sides) { ctx.save(); ctx.globalAlpha = prog(t, 1, 1.8); ctx.translate(500, 560); ctx.scale(.7, .7); PNT.cartoon(t); ctx.restore(); ctx.save(); ctx.globalAlpha = prog(t, 1.6, 2.4); ctx.translate(1440, 500); ctx.scale(.7, .7); PNT.lab(t); ctx.restore();
      label('HUMOR & EXAGGERATION', 480, 880, 30, { spacing: 4, color: '#9fd3a8', alpha: prog(t, 1.2, 1.8) }); label('MISLEADING CLAIMS', 1440, 880, 30, { spacing: 4, color: '#ff8a80', alpha: prog(t, 1.8, 2.4) });
      const px = lerp(700, 900, eio(prog(t, P.walk || 3, d))); person(px, 1040, 260, { walk: t < d ? t * 8 : 0, cap: true, rim: 'rgba(255,200,160,.8)', light: 1 }); }
    ctx.restore(); },
  sfx(d) { return [[.2, 'zap_soft', .4]]; }
};
SC.usaAds = {
  draw(t, d) { bg('#0a1530', '#04070f'); ctx.save(); ctx.globalAlpha = .55; flag(-80, -40, 2100, t * .5); ctx.restore(); ctx.fillStyle = 'rgba(4,7,16,.55)'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(960, 560, 1.02 + t * .01); tvCartoon(560, 520, 620, t, (t * .25) % 1);
    ctx.save(); ctx.translate(1380, 520); ctx.fillStyle = '#f5f0e6'; rr(-260, -200, 520, 400, 16); ctx.fill(); wings(0, -40, .4, .9, {}); drawCan(0, 40, 220, { noShadow: true }); ctx.restore();
    ['HUMOR', 'EXAGGERATION', 'CREATIVE LANGUAGE'].forEach((c, i) => pill(c, 560 + i * 410, 920, 30, prog(t, 1.5 + i * .7, 2 + i * .7), ['#2f9e6b', '#e0702a', '#7b4bd1'][i])); ctx.restore(); },
  sfx() { return [[1.5, 'pop', .45], [2.2, 'pop', .45], [2.9, 'pop', .45]]; }
};
SC.labMeasure = {
  draw(t, d) { lab(t); const k = eio(prog(t, .4, d)); ctx.strokeStyle = '#ffcc00'; ctx.lineWidth = 5; ctx.beginPath();
    for (let i = 0; i <= 60 * k; i++) { const u = i / 60; ctx.lineTo(816 + u * 468, 580 - u * 180 + Math.sin(u * 14) * 18); } ctx.stroke();
    drawCan(1100, 600, 0.1); drawCan(660, 600, 200, {}); caffeine(1560, 320, .7, t, '#2a4a7a'); },
  sfx(d) { return [[0, 'lab', .3, { dur: d }], [.4, 'beeps', .3]]; }
};
SC.caseBoard = {
  draw(t, d, P) { ctx.fillStyle = '#3a2a1c'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(960, 540, 1.02 + t * .02, Math.sin(t * .3) * .01);
    ctx.fillStyle = '#b08a5a'; ctx.fillRect(160, 90, 1600, 900); ctx.fillStyle = 'rgba(0,0,0,.08)'; const R = rnd(2); for (let i = 0; i < 400; i++) ctx.fillRect(160 + R() * 1600, 90 + R() * 900, 3, 3);
    const items = [[420, 300, 'can'], [960, 260, 'doc'], [1480, 330, 'calendar'], [520, 700, 'person'], [1000, 720, 'scales'], [1460, 720, 'dollar']];
    const pts = items.map(([x, y]) => [x, y]);
    ctx.strokeStyle = '#c8202e'; ctx.lineWidth = 3; [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5], [3, 4]].forEach(([a, b], i) => { const k = eio(prog(t, .6 + i * .25, 1 + i * .25)); if (k <= 0) return; ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(lerp(pts[a][0], pts[b][0], k), lerp(pts[a][1], pts[b][1], k)); ctx.stroke(); });
    items.forEach(([x, y, k], i) => { ctx.save(); ctx.translate(x, y); ctx.rotate((i % 2 ? .05 : -.05)); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-120 + 8, -90 + 10, 240, 180); ctx.fillStyle = '#f4f1e8'; ctx.fillRect(-120, -90, 240, 180);
      if (k === 'can') drawCan(0, 0, 150, { noShadow: true }); else iconDisc(0, 0, 60, k, 1, ['#2e6fd7', '#2f9e6b', '#c8202e', '#d9a51a'][i % 4]);
      ctx.fillStyle = '#c8202e'; ctx.beginPath(); ctx.arc(0, -80, 10, 0, 7); ctx.fill(); ctx.restore(); });
    ctx.restore(); },
  sfx() { return [[.3, 'pin', .4], [1.2, 'pin', .35], [2, 'pin', .35]]; }
};
SC.notOnly = {
  draw(t, d) { BGP('night', t); ctx.save(); cam(960, 600, 1.0 + t * .01); floor(950, '#14161e', '#040406');
    person(960, 1000, 420, { cap: true, rim: 'rgba(160,190,255,.8)', light: 1 });
    const R = rnd(4); for (let i = 0; i < 10; i++) { const a = prog(t, 1.2 + i * .25, 1.7 + i * .25), x = 960 + (i % 2 ? 1 : -1) * (180 + Math.floor(i / 2) * 150);
      ctx.save(); ctx.globalAlpha = a; person(x, 1000 - 10, 380 - Math.floor(i / 2) * 20, { cap: R() > .5, top: ['#59606e', '#7a2a2a', '#2f5a3a', '#3a3f6e'][i % 4], rim: 'rgba(160,190,255,.6)', light: 1, flip: i % 2 }); ctx.restore(); }
    ctx.restore(); },
  sfx(d) { return [[1.2, 'steps', .3, { dur: 2.5 }]]; }
};
// PART THREE
SC.merge = {
  draw(t, d, P, E) {
    BGP('warm', t); ctx.save(); cam(960, 560, 1.02);
    const n = P.n || 6, tm = P.w ? E(P.w) - .3 : d * .45, k = eio(prog(t, tm, tm + 1.2));
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, x = lerp(960 + Math.cos(a) * 620, 960, k), y = lerp(560 + Math.sin(a) * 330, 560, k);
      ctx.save(); ctx.globalAlpha = 1 - k * .7; paperDoc(x, y, 200, Math.sin(i) * .2 * (1 - k), 'COMPLAINT'); ctx.restore(); }
    if (k > .6) { ctx.save(); ctx.globalAlpha = prog(t, tm + .7, tm + 1.3); paperDoc(960, 560, 420, -.02, 'CONSOLIDATED\nCLASS ACTION'); ctx.restore(); }
    if (P.ny) { const nk = prog(t, E('new') - .3, E('new') + .3); if (nk > 0) { ctx.save(); ctx.globalAlpha = nk; calendarPage(1600, 360, .8, 'OCT', '', '2013', { rot: .06 }); ctx.restore(); } }
    ctx.restore();
  },
  sfx(d, P, E) { const tm = P.w ? E(P.w) - .3 : d * .45; return [[.1, 'paper', .4], [tm, 'whoosh', .45], [tm + 1.1, 'thud_soft', .45]]; }
};
SC.nyMap = {
  draw(t, d, P, E) {
    bg('#071022', '#02040a'); usStripes(t, .4);
    const tz = E('federal') - .4, z = lerp(1, 4.2, eio(prog(t, tz, tz + 1.6)));
    const [nx, ny] = proj(-74, 40.7, 960, 650, 30);
    ctx.save(); ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-lerp(960, nx, eio(prog(t, tz, tz + 1.6))), -lerp(540, ny, eio(prog(t, tz, tz + 1.6)))); usMap(960, 650, 30, t, prog(t, 0, 1.2), null); ctx.restore();
    const pk = prog(t, tz + 1.2, tz + 1.8); if (pk > 0) { glow(960, 540, 160, 'rgba(255,80,70,.8)', pk); ctx.save(); ctx.globalAlpha = pk; courthouseMini(960, 520, .25 * eback(pk)); ctx.restore(); label('NEW YORK', 960, 640, 44, { weight: 900, spacing: 10, alpha: pk }); }
    const tc = E('october') - .4; const ck = eout(prog(t, tc, tc + .6)); if (ck > 0) calendarPage(1560, 380 + (1 - ck) * 700, .9, 'OCT', '', '2013', { rot: .06 });
    const tm = E('consolidated') - .4; if (t > tm) { const k = eio(prog(t, tm, tm + 1)); for (let i = 0; i < 4; i++) { const x = lerp(300 + i * 120, 960, k), y = lerp(860, 760, k); ctx.save(); ctx.globalAlpha = 1 - k * .5; paperDoc(x, y, 120, (i - 1.5) * .1 * (1 - k), 'CASE'); ctx.restore(); } }
    const tw = E('wolfe') - .3; if (t < tz) { const a = prog(t, tw, tw + .4); ctx.save(); ctx.globalAlpha = a; paperDoc(400, 560, 300, -.06, 'WOLFE et al.\nv. RED BULL'); ctx.restore(); }
  },
  sfx(d, P, E) { return [[E('wolfe') - .3, 'paper', .45], [E('federal') - .4, 'whoosh', .45], [E('federal') + 1.2, 'pop', .4], [E('october') - .4, 'page', .45], [E('consolidated') - .4, 'thud_soft', .4]]; }
};
SC.viral = {
  draw(t, d, P, E) {
    const tc = E('13') - .8; BGP('night', t);
    ctx.save(); cam(960, 540, 1.02 + t * .01);
    phone(560, 560, 820, t, [{ text: 'BREAKING: Man sues Red Bull\nbecause he didn\'t grow wings,\nwins $13 MILLION 🤯', c: '#c8202e', likes: '1.2M', laughs: '480K', img: (x, y, h) => drawCan(x, y, h * .9, { noShadow: true }) },
      { text: 'lmao imagine suing for wings 🪽', c: '#2e6fd7', likes: '88K' }, { text: 'Gives you wings… and $13M', c: '#2f9e6b', likes: '41K' }], { scroll: eio(prog(t, 2, d)) * 200, rot: -.04 });
    const k = eout(prog(t, tc, tc + .8)); if (k > 0) { giantCheck(1360, 560, 760, '$13,000,000', 'One Determined Guy', .05 + (1 - k) * .3, { sign: true }); person(1500, 1060, 260, { cap: true, armUp: .4, rim: 'rgba(255,216,154,.8)', light: 1 }); }
    ctx.restore();
  },
  sfx(d, P, E) { return [[.2, 'notif', .45], [1.0, 'notif', .3], [E('13') - .8, 'paper', .45], [E('13') - .2, 'coins', .3]]; }
};
SC.bigX = { draw(t, d, P) { SC.viral.draw(t + 6, 12, P, () => -10); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, H); bigX(1360, 560, 600, prog(t, .1, .7)); stamp2('MYTH', 1360, 820, prog(t, .6, 1), '#e3262f', 90); },
  sfx() { return [[.1, 'soft_x', .55], [.6, 'stamp', .5]]; } };
SC.representative = {
  draw(t, d, P) { BGP('navy', t); ctx.save(); cam(960, 600, 1.02 + t * .01); floor(960, '#141a2a', '#04060b');
    const R = rnd(7), crowd = []; for (let i = 0; i < 40; i++) crowd.push([180 + (i % 10) * 175 + (Math.floor(i / 10) % 2) * 80, 820 - Math.floor(i / 10) * 70, 200 - Math.floor(i / 10) * 20]);
    crowd.reverse().forEach(([x, y, h], i) => { const a = prog(t, .8 + R() * 1.2, 1.3 + R() * 1.2); ctx.save(); ctx.globalAlpha = a * .9; person(x, y, h, { silhouette: true, color: '#0b0f1c', rim: 'rgba(160,190,255,.6)', cap: R() > .5, flip: R() > .5 }); ctx.restore();
      if (a > .5) { ctx.strokeStyle = `rgba(232,185,49,${.25 * a})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 640); ctx.lineTo(x, y - h * .9); ctx.stroke(); } });
    glow(960, 700, 300, 'rgba(255,220,150,.35)'); person(960, 1040, 440, { cap: true, rim: 'rgba(255,216,154,.9)', light: 1, top: '#7a2a2a' }); ctx.restore(); },
  sfx(d) { return [[.8, 'crowd', .25, { dur: d - .8 }], [.8, 'shimmer', .25]]; }
};
SC.filesMerge = { draw(t, d, P, E) { SC.merge.draw(t, d, { n: 12, w: P.w }, E); }, sfx(d, P, E) { return SC.merge.sfx(d, { w: P.w }, E); } };
SC.usaBuyers = { draw(t, d) { bg('#071022', '#02040a'); usStripes(t, .5); ctx.save(); cam(960, 560, 1.02 + t * .01); usMap(960, 640, 30, t, prog(t, 0, 1.2), .6, { step: .12, cans: true, dot: 'rgba(80,140,255,.6)' }); ctx.restore(); },
  sfx() { return [[.6, 'shimmer', .35], [.6, 'popseq', .3, { n: 12, step: .12 }]]; } };
SC.gasBuy = {
  draw(t, d) { ctx.save(); cam(lerp(900, 1000, prog(t, 0, d)), 560, 1.05); gasStation(t);
    person(lerp(1200, 980, eio(prog(t, 0, d * .6))), 960, 380, { walk: t < d * .6 ? t * 8 : 0, holdCan: true, armUp: t > d * .7 ? prog(t, d * .7, d) * .6 : 0, cap: true, rim: 'rgba(255,250,220,.8)', light: 1, top: '#3a5a8a' });
    ctx.restore(); },
  sfx(d) { return [[0, 'night', .3, { dur: d }], [.2, 'door_chime', .35], [.4, 'steps', .3, { dur: d * .5 }]]; }
};
SC.weekly = {
  draw(t, d) { BGP('warm', t); ctx.save(); cam(960, 540, 1.02);
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    for (let w = 0; w < 3; w++) days.forEach((dd, i) => { const x = 300 + i * 220, y = 300 + w * 230; ctx.fillStyle = 'rgba(255,255,255,.07)'; rr(x - 95, y - 95, 190, 190, 16); ctx.fill(); if (w === 0) label(dd, x, 180, 28, { spacing: 4, color: '#e8b931' });
      if (i === 4) { const a = prog(t, .3 + w * .5, .7 + w * .5); ctx.save(); ctx.globalAlpha = a; drawCan(x, y + 10, 150 * eback(a) + 1, { noShadow: true }); ctx.restore(); } });
    ctx.restore(); },
  sfx() { return [[.3, 'pop', .45], [.8, 'pop', .45], [1.3, 'pop', .45]]; }
};
SC.montage3 = {
  draw(t, d, P, E) { const tw = E('workout') - .3, ts = E('late') - .3;
    if (t < tw) { office(t, true); person(760, 1080, 520, { cap: false, top: '#e9eef6', pants: '#2b2f3a', holdCan: true, armUp: prog(t, .5, 1.2) * .8, rim: 'rgba(255,240,220,.7)', light: 1, hair: '#5a3a22' }); }
    else if (t < ts) { gym(t); person(800, 1040, 520, { top: '#c8202e', pants: '#111', holdCan: true, armUp: .6 + Math.sin(t * 2) * .2, rim: 'rgba(220,235,255,.8)', light: 1, skinIdx: 2 }); }
    else { dorm(t); person(1000, 1060, 520, { silhouette: true, color: '#06070c', rim: 'rgba(255,190,110,.7)', light: -1 }); drawCan(1120, 690, 110, { rim: 'rgba(255,190,110,.6)' }); } },
  sfx(d, P, E) { const tw = E('workout') - .3, ts = E('late') - .3; return [[0, 'office', .25, { dur: tw }], [tw, 'swoosh', .35], [tw, 'gym', .25, { dur: ts - tw }], [ts, 'swoosh', .35], [ts, 'night', .3, { dur: d - ts }]]; }
};
SC.justWanted = {
  draw(t, d) { ctx.save(); cam(980, 600, 1.12); gasStation(t); ctx.restore();
    person(960, 1040, 520, { holdCan: true, armUp: .8 * (.5 + .5 * Math.sin(t * .8)), cap: true, rim: 'rgba(255,250,220,.8)', light: 1, top: '#3a5a8a' });
    const k = eout(prog(t, 1.2, 1.8)); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#fff'; for (const [x, y, r] of [[1080, 480, 14], [1120, 420, 22]]) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
      rr(1110, 160, 420, 240, 120); ctx.fill(); drawCan(1250, 280, 170, { noShadow: true }); iconDisc(1420, 280, 50, 'bolt', 1, COL.gold); ctx.restore(); }
    const lk = prog(t, d * .55, d * .55 + .6); if (lk > 0) { ctx.save(); ctx.globalAlpha = lk * .9; ctx.translate(560, 330); ctx.rotate(-.06); paperDoc(0, 0, 260, 0, 'TERMS &\nCONDITIONS'); ctx.restore(); bigX(560, 330, 260, prog(t, d * .55 + .5, d * .55 + 1)); } },
  sfx(d) { return [[0, 'night', .3, { dur: d }], [1.2, 'pop', .45], [d * .55, 'paper', .35], [d * .55 + .5, 'soft_x', .35]]; }
};
SC.news = {
  draw(t, d, P) { newsStudio(t); const k = eout(prog(t, .4, 1));
    ctx.save(); ctx.translate(0, (1 - k) * 200); ctx.fillStyle = '#c8202e'; ctx.fillRect(180, 900, 520, 70); label('BREAKING NEWS', 440, 948, 40, { weight: 900, spacing: 4 });
    ctx.fillStyle = 'rgba(8,14,34,.95)'; ctx.fillRect(700, 900, 1040, 70); label(P.ticker || 'ENERGY DRINK GIANT FACES CLASS ACTION OVER AD CLAIMS', 1220, 946, 30, { weight: 700 }); ctx.restore(); },
  sfx(d) { return [[0, 'news_sting', .45], [.4, 'swoosh', .35]]; }
};
SC.notProof = {
  draw(t, d) { BGP('night', t); ctx.save(); cam(960, 560, 1.02 + t * .01);
    scales(960, 780, 1.1, Math.sin(t * 1.3) * .05, { left: (x, y) => { ctx.fillStyle = '#f3efe6'; ctx.fillRect(x - 60, y - 40, 120, 30); label('CLAIMS', x, y - 60, 26, { color: '#e8b931', spacing: 4 }); }, right: (x, y) => { label('PROOF ?', x, y - 50, 26, { color: '#e8b931', spacing: 4 }); } });
    gavel(1380, 260 + Math.sin(t * 2) * 14, 1.1, Math.PI * .5 + .4); ctx.restore(); },
  sfx() { return [[.3, 'creak', .3]]; }
};
SC.twoSides = { draw(t, d, P, E) { SC.split.draw(t, d, { left: 'consumer', right: 'hq', w: P.w, labels: ['CONSUMERS', 'RED BULL'] }, E); }, sfx(d, P, E) { return SC.split.sfx(d, { w: P.w }, E); } };
// PART FOUR
SC.podium = {
  draw(t, d, P, E) { hqTower(t, { x: 1500 }); ctx.fillStyle = 'rgba(3,5,12,.55)'; ctx.fillRect(0, 0, W, H);
    ctx.save(); cam(800, 600, 1.04 + t * .01);
    ctx.fillStyle = grad(560, 0, 1040, 0, [[0, '#1a1d26'], [.5, '#363b48'], [1, '#14161c']]); ctx.beginPath(); ctx.moveTo(600, 640); ctx.lineTo(1000, 640); ctx.lineTo(960, 1080); ctx.lineTo(640, 1080); ctx.fill();
    ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.arc(800, 800, 40, 0, 7); ctx.fill(); ctx.fillStyle = '#d7102a'; bull(670, 760, 1.05, false); bull(930, 760, 1.05, true);
    for (let i = 0; i < 5; i++) { const a = -.6 + i * .3; ctx.strokeStyle = '#222'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(800 + Math.sin(a) * 30, 640); ctx.lineTo(800 + Math.sin(a) * 120, 520); ctx.stroke(); ctx.fillStyle = ['#c8202e', '#1f36a8', '#111', '#2f9e6b', '#e8b931'][i]; rr(800 + Math.sin(a) * 120 - 18, 480, 36, 56, 14); ctx.fill(); }
    const R = rnd(Math.floor(t * 4)); if (R() > .55) glow(200 + R() * 1500, 300 + R() * 500, 300, 'rgba(255,255,255,.6)');
    ctx.restore();
    if (P.stamp) { const k = eout(prog(t, 1, 1.6)); paperDoc(1400, 560 + (1 - k) * 600, 420, .05, 'OFFICIAL STATEMENT'); stamp2(P.stamp, 1400, 640, prog(t, E(P.sw || 'denied') - .1, E(P.sw || 'denied') + .3), '#c8202e', 60); } },
  sfx(d, P, E) { const o = [[0, 'shutters', .35, { dur: d }]]; if (P.stamp) o.push([1, 'paper', .4], [E(P.sw || 'denied') - .1, 'stamp', .5]); return o; }
};
SC.label = {
  draw(t, d) { studio(t, 220); ctx.save(); const z = lerp(1.0, 1.9, eio(prog(t, 0, d))); cam(960, lerp(560, 520, eio(prog(t, 0, d))), z); drawCan(960, 560, 640, { rim: 'rgba(170,190,255,.6)' }); ctx.restore();
    ['TRUTHFUL', 'ACCURATE'].forEach((c, i) => { const p = prog(t, 1.4 + i * .8, 1.9 + i * .8); if (p > 0) { iconDisc(1520, 380 + i * 200, 60, 'check', p, COL.green); label(c, 1520, 480 + i * 200, 30, { spacing: 4, alpha: p }); } }); },
  sfx() { return [[1.4, 'pop', .45], [2.2, 'pop', .45]]; }
};
SC.handshake = {
  draw(t, d, P, E) { ctx.fillStyle = '#0d0f16'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(960, 560, 1.03 + t * .01);
    ctx.fillStyle = grad(0, 640, 0, H, [[0, '#3b2a1b'], [1, '#120b05']]); ctx.fillRect(-100, 640, W + 200, 600); glow(960, 300, 800, 'rgba(255,220,170,.2)');
    paperDoc(960, 820, 520, -.02, P.doc || 'SETTLEMENT AGREEMENT', { hl: P.hlw ? [[4, prog(t, E(P.hlw) - .2, E(P.hlw) + .8)], [5, prog(t, E(P.hlw) + .3, E(P.hlw) + 1.2)]] : [], sign: prog(t, d * .5, d * .5 + 1) });
    handshake(960, 420, 1, prog(t, .2, 1.2));
    if (P.badge) iconDisc(1560, 300, 80, P.badge, prog(t, P.bw ? E(P.bw) - .2 : 1.5, (P.bw ? E(P.bw) - .2 : 1.5) + .5), COL[P.bcol || 'green']);
    ctx.restore(); },
  sfx(d, P, E) { const o = [[.2, 'swoosh', .35], [1.1, 'clasp', .45], [d * .5, 'pen', .35]]; if (P.hlw) o.push([E(P.hlw) - .2, 'marker', .35]); if (P.badge) o.push([P.bw ? E(P.bw) - .2 : 1.5, 'pop', .45]); return o; }
};
SC.yearsWork = {
  draw(t, d, P, E) { ctx.fillStyle = '#16100a'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(960, 560, 1.02 + t * .01);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1f16'], [1, '#0e0905']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 6; j++) { ctx.fillStyle = ['#5a2a1a', '#2a3a5a', '#3a4a2a', '#5a4a2a'][(i + j) % 4]; ctx.fillRect(100 + j * 50 + i * 0, 200 + i * 120, 40, 100); } // bookshelf
    floor(760, '#4a3420', '#1a1008');
    const g = eio(prog(t, .2, d)); [[700, 22], [960, 30], [1220, 18]].forEach(([x, n]) => docStack(x, 760, Math.round(n * g), 1.2));
    hourglass(1600, 520, .8, prog(t, 0, d), t);
    for (let i = 0; i < 10; i++) { const st = .5 + i * .4, k = t - st; if (k < 0 || k > 2) continue; calendarPage(400 + k * 600, 300 - k * 200 + k * k * 120, .35, ['JAN', 'MAR', 'JUN', 'SEP', 'DEC'][i % 5], String(1 + i * 3), String(2013 + Math.floor(i / 4)), { rot: k * 2 }); }
    ctx.restore(); },
  sfx(d) { return [[0, 'clock', .3, { dur: d }], [.5, 'pages', .3, { dur: 4 }]]; }
};
SC.publicLaugh = {
  draw(t, d) { BGP('night', t); ctx.save(); cam(960, 600, 1.02 + t * .01); floor(940, '#14161e', '#040406');
    tvCartoon(960, 380, 700, t, (t * .3) % 1);
    const R = rnd(3); for (let i = 0; i < 14; i++) { const x = 140 + i * 125, h = 260 + R() * 80; person(x, 1100, h, { silhouette: true, color: '#06070c', rim: 'rgba(160,190,255,.6)', cap: R() > .5, flip: R() > .5 });
      const st = R() * d, k = t - st; if (k > 0 && k < 2) { ctx.save(); ctx.globalAlpha = 1 - k / 2; ctx.font = '48px "Noto Color Emoji"'; ctx.fillText(['😂', '🪽', '🤣'][i % 3], x - 20, 1100 - h - 30 - k * 80); ctx.restore(); } }
    ctx.restore(); },
  sfx(d) { return [[0, 'chuckles', .3, { dur: d }]]; }
};
SC.costFight = {
  draw(t, d, P, E) { BGP('red', t); ctx.save(); cam(960, 560, 1.02 + t * .01);
    { const k = prog(t, .1, .8), tf0 = E('fight') - .2; ctx.save(); ctx.globalAlpha = k * (t < tf0 ? 1 : 1 - prog(t, tf0, tf0 + .4)); floor(900, '#2a0e12', '#080204'); chessKing(780, 900, 1.6, '#e9e3d6'); chessKing(1140, 900, 2.2, '#1b1d26'); ctx.restore(); }
    const items = [['time', 'clock', '#2e6fd7', 'TIME'], ['money', 'dollar', '#2f9e6b', 'MONEY'], ['attention', 'person', '#d9a51a', 'ATTENTION']];
    items.forEach(([w, ic, c, l], i) => { const st = E(w) - .15, x = 480 + i * 480; iconDisc(x, 420, 110, ic, prog(t, st, st + .5), c); label(l, x, 600, 34, { spacing: 6, alpha: prog(t, st + .2, st + .6) }); });
    const tf = E('fight') - .2; if (t > tf) { const k = prog(t, tf, tf + .6); ctx.save(); ctx.globalAlpha = k; chessKing(860, 960, 1.1, '#e9e3d6'); chessKing(1060, 960, 1.1, '#1b1d26'); ctx.strokeStyle = '#e9e3d6'; ctx.lineWidth = 2; ctx.strokeRect(1000, 700, 0, 0); ctx.restore(); }
    ctx.restore(); },
  sfx(d, P, E) { return [...['time', 'money', 'attention'].map(w => [E(w) - .15, 'pop', .5]), [E('fight') - .2, 'thud_soft', .45]]; }
};
SC.bubbleDream = {
  draw(t, d, P, E) { BGP('night', t); ctx.save(); cam(960, 600, 1.02);
    person(560, 1040, 520, { cap: true, rim: 'rgba(255,216,154,.8)', light: 1, holdCan: true });
    const k = eout(prog(t, .6, 1.4)), pop = P.popw ? prog(t, E(P.popw) - .2, E(P.popw) + .1) : 0;
    if (k > 0 && pop < 1) { ctx.save(); ctx.globalAlpha = k * (1 - pop); ctx.translate(1160, 380); ctx.scale(1 + pop * .3, 1 + pop * .3);
      ctx.fillStyle = 'rgba(255,255,255,.95)'; for (const [x, y, r] of [[-430, 330, 18], [-380, 260, 30]]) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
      rr(-420, -260, 840, 500, 200); ctx.fill(); ctx.save(); rr(-400, -240, 800, 460, 180); ctx.clip();
      ctx.fillStyle = grad(0, -240, 0, 220, [[0, '#7fc1ff'], [1, '#e6f2ff']]); ctx.fillRect(-400, -240, 800, 460);
      ctx.fillStyle = '#f6f2ea'; ctx.fillRect(-260, -40, 360, 180); ctx.fillStyle = '#b8b0a0'; ctx.beginPath(); ctx.moveTo(-290, -40); ctx.lineTo(-80, -160); ctx.lineTo(130, -40); ctx.fill(); // mansion
      for (let i = 0; i < 5; i++) { ctx.fillStyle = '#5a8fd0'; ctx.fillRect(-230 + i * 66, 10, 36, 40); }
      ctx.fillStyle = '#2a7ab8'; ctx.fillRect(-400, 140, 800, 80); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(150, 150); ctx.lineTo(360, 150); ctx.lineTo(320, 190); ctx.lineTo(180, 190); ctx.fill(); // yacht
      moneyRain(t, 14, 3); ctx.restore(); ctx.restore(); }
    if (pop > 0 && pop < 1) { const R = rnd(5); for (let i = 0; i < 30; i++) { const a = R() * 6.28, r = 200 + pop * 500; ctx.fillStyle = `rgba(255,255,255,${1 - pop})`; ctx.beginPath(); ctx.arc(1160 + Math.cos(a) * r, 380 + Math.sin(a) * r * .6, 6, 0, 7); ctx.fill(); } }
    ctx.restore(); },
  sfx(d, P, E) { return [[.6, 'dream', .35, { dur: 2.5 }], ...(P.popw ? [[E(P.popw) - .2, 'bubble_pop', .55]] : [])]; }
};
// $10 → $4.23
SC.payout = {
  draw(t, d, P, E) { BGP('navy', t); const tf = P.question ? 1e9 : E('423') - .5;
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.85)'; rr(460, 320, 1000, 420, 30); ctx.fill(); ctx.strokeStyle = 'rgba(232,185,49,.5)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    label('PER CLAIM', 960, 400, 40, { color: '#e8b931', spacing: 16 });
    const v = t < tf ? 10 : lerp(10, 4.23, eio(prog(t, tf, tf + 1.6))); const s = '$' + v.toFixed(2);
    label(s, 960, 640, 230, { weight: 900, color: t > tf + 1.6 ? '#ff8a6e' : '#fff', shadow: 'rgba(255,210,90,.4)' });
    if (t > tf + 1.6) { label('ORIGINAL: $10.00', 960, 830, 40, { color: 'rgba(255,255,255,.6)', spacing: 6 }); ctx.fillStyle = '#c8202e'; ctx.fillRect(780, 815, 360 * eio(prog(t, tf + 1.8, tf + 2.3)), 5); }
    // a single bill shrinking
    const bs = lerp(1.6, .7, eio(prog(t, tf, tf + 1.6))); bill(1640, 860, bs, -.1);
    if (P.question) { const q = prog(t, E('ten') - .3, E('ten') + .2); if (q > 0) { ctx.save(); ctx.translate(1420, 470); ctx.scale(eback(q), eback(q)); label('?', 0, 0, 220, { weight: 900, color: '#e8b931', shadow: 'rgba(232,185,49,.5)' }); ctx.restore(); } } },
  sfx(d, P, E) { if (P.question) return [[E('ten') - .3, 'pop', .5]]; const tf = E('423') - .5; return [[tf, 'ticks_down', .45, { dur: 1.6 }], [tf + 1.6, 'thud_soft', .45]]; }
};
SC.jarLimit = {
  draw(t, d, P, E) { BGP('navy', t); ctx.save(); cam(960, 560, 1.02);
    moneyJar(960, 760, 1.3, P.fill ?? .85, t); if (P.limit) { ctx.strokeStyle = '#e3262f'; ctx.lineWidth = 5; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(700, 430); ctx.lineTo(1220, 430); ctx.stroke(); ctx.setLineDash([]); label('LIMIT', 1300, 444, 34, { color: '#ff6b5e', spacing: 6 }); }
    if (P.people) { const R = rnd(6); for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI + Math.PI, x = 960 + Math.cos(a) * 760, y = 820 + Math.sin(a) * 420 + 300, k = prog(t, .5 + i * .1, 1 + i * .1); icon(x, y, 60, `rgba(190,200,225,${k})`);
      if (k > .5) { ctx.strokeStyle = `rgba(232,185,49,${.4 * k})`; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(960, 540); ctx.lineTo(x, y - 60); ctx.stroke(); ctx.setLineDash([]); label('?', x, y - 80, 36, { color: '#e8b931', alpha: k }); } } }
    if (P.flood) { const n = Math.floor(lerp(0, 3200000, eio(prog(t, .5, d)))); for (let i = 0; i < 26; i++) { const R = rnd(i * 7 + 1), st = R() * d, k = t - st; if (k < 0 || k > 1.4) continue; ctx.save(); ctx.translate(lerp(200 + R() * 1500, 960, k / 1.4), lerp(-60, 420, k / 1.4)); ctx.rotate(R() * 2); ctx.fillStyle = '#f3efe6'; ctx.fillRect(-40, -26, 80, 52); ctx.strokeStyle = '#c4b9a0'; ctx.beginPath(); ctx.moveTo(-40, -26); ctx.lineTo(0, 4); ctx.lineTo(40, -26); ctx.stroke(); ctx.restore(); }
      label('CLAIMS: ' + n.toLocaleString('en-US') + '+', 960, 150, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)' }); }
    ctx.restore(); },
  sfx(d, P) { const o = [[.2, 'coins', .3]]; if (P.flood) o.push([.5, 'mail', .35, { dur: d - .5 }]); if (P.people) o.push([.5, 'popseq', .3, { n: 16, step: .1 }]); return o; }
};
SC.pizza = {
  draw(t, d) { BGP('navy', t); ctx.save(); cam(960, 560, 1.02); const n = Math.round(lerp(2, 48, eio(prog(t, .5, d - .5))));
    ctx.fillStyle = '#2f9e6b'; ctx.beginPath(); ctx.arc(960, 560, 320, 0, 7); ctx.fill(); label('$', 960, 620, 200, { weight: 900, color: 'rgba(255,255,255,.25)' });
    ctx.strokeStyle = '#0a1020'; ctx.lineWidth = 4; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; ctx.beginPath(); ctx.moveTo(960, 560); ctx.lineTo(960 + Math.cos(a) * 320, 560 + Math.sin(a) * 320); ctx.stroke(); }
    const R = rnd(2); for (let i = 0; i < n && i < 40; i++) { const a = (i + .5) / n * Math.PI * 2; icon(960 + Math.cos(a) * 440, 560 + Math.sin(a) * 440 + 20, 40, 'rgba(190,200,225,.9)'); }
    ctx.restore(); },
  sfx(d) { return [[.5, 'slices', .35, { dur: d - 1 }]]; }
};
SC.bars = {
  draw(t, d, P) { BGP('navy', t); ctx.save(); cam(960, 560, 1.01);
    const k = eio(prog(t, .4, 2)); ctx.fillStyle = '#e8b931'; rr(560, 900 - 640 * k, 260, 640 * k, 12); ctx.fill(); label('HEADLINE', 690, 960, 32, { spacing: 4 }); label('$13M', 690, 880 - 640 * k, 56, { weight: 900, alpha: k });
    const k2 = eio(prog(t, 1.6, 2.6)); ctx.fillStyle = '#ff8a6e'; rr(1100, 900 - 12 * k2, 260, Math.max(4, 12 * k2), 6); ctx.fill(); label('PER PERSON', 1230, 960, 32, { spacing: 4 }); label('~$4–$10', 1230, 860, 56, { weight: 900, alpha: k2 });
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(480, 900, 960, 4); ctx.restore(); },
  sfx() { return [[.4, 'riser', .3, { dur: 1.6 }], [1.6, 'thud_soft', .4]]; }
};
SC.checklist = {
  draw(t, d, P, E) { ctx.fillStyle = '#1b120a'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(960, 540, 1.03 + t * .01);
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#3b2a1b'], [1, '#1b120a']]); ctx.fillRect(-100, -100, W + 200, H + 200);
    ctx.fillStyle = '#f6f3ea'; ctx.fillRect(560, 120, 800, 860); label(P.title || 'SETTLEMENT TERMS', 960, 210, 40, { color: '#1a1a1a', font: F_SERIF, weight: 700 });
    P.items.forEach(([txt, w], i) => { const st = w ? E(w) - .2 : .5 + i * .8, y = 320 + i * 120; ctx.strokeStyle = '#555'; ctx.lineWidth = 3; ctx.strokeRect(620, y - 34, 48, 48);
      const p = prog(t, st, st + .4); if (p > 0) { ctx.strokeStyle = '#2f9e6b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(628, y - 10); ctx.lineTo(628 + 14 * clamp(p * 2), y - 10 + 14 * clamp(p * 2)); if (p > .5) ctx.lineTo(642 + 26 * clamp(p * 2 - 1), y + 4 - 34 * clamp(p * 2 - 1)); ctx.stroke(); }
      label(txt, 700, y + 4, 34, { align: 'left', color: '#222', weight: 700 }); });
    ctx.restore(); },
  sfx(d, P, E) { return P.items.map(([, w], i) => [w ? E(w) - .2 : .5 + i * .8, 'tick_pen', .45]); }
};
SC.judge = {
  draw(t, d, P, E) { ctx.fillStyle = '#1b130b'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(960, 520, 1.04 + t * .012); courtroom(t);
    // judge silhouette behind the bench
    ctx.fillStyle = '#0b0b0e'; ctx.beginPath(); ctx.arc(960, 330, 46, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(860, 430); ctx.quadraticCurveTo(960, 360, 1060, 430); ctx.lineTo(1060, 470); ctx.lineTo(860, 470); ctx.fill();
    ctx.fillStyle = 'rgba(255,220,170,.18)'; ctx.beginPath(); ctx.arc(974, 322, 46, -1.2, .8); ctx.fill();
    ctx.fillStyle = '#f6f3ea'; ctx.save(); ctx.translate(960, 410); ctx.rotate(-.05); ctx.fillRect(-90, -16, 180, 30); ctx.restore();
    if (P.stamp) { const hv = Math.sin(t * 2.5) * 20, tst = P.sw ? E(P.sw) : d * .5; ctx.save(); ctx.translate(1240, lerp(240, 300, prog(t, 0, tst)) + hv); ctx.fillStyle = '#6b4826'; rr(-30, -100, 60, 90, 10); ctx.fill(); ctx.fillStyle = '#2a2a30'; rr(-70, -12, 140, 40, 8); ctx.fill(); ctx.restore(); bigX(1240, 300, 240, prog(t, tst + .2, tst + .7)); }
    if (P.shield) { const k = prog(t, 1, 2); ctx.save(); ctx.globalAlpha = k; const R = rnd(4); for (let i = 0; i < 18; i++) icon(300 + i * 75, 1000, 50, 'rgba(200,210,235,.9)'); ctx.restore(); iconDisc(960, 820, 90, 'shield', k, COL.green); }
    ctx.restore(); },
  sfx(d, P, E) { const o = [[.2, 'pages', .3, { dur: 2 }]]; if (P.stamp) o.push([(P.sw ? E(P.sw) : d * .5) + .2, 'soft_x', .45]); if (P.shield) o.push([1, 'shimmer', .4]); return o; }
};
SC.punchline = {
  draw(t, d, P, E) { studio(t, 250); ctx.save(); cam(960, 560, 1.02 + t * .01); const tl = E('legal') - .3, f = prog(t, tl, tl + 1.4);
    ctx.save(); ctx.globalAlpha = 1 - f; wings(960, 430, .8, 1, { flap: Math.sin(t * 2) * .03 }); drawCan(960, 580, 500, { rim: 'rgba(170,190,255,.7)' }); ctx.restore();
    if (f > 0) { ctx.save(); ctx.globalAlpha = f; scales(960, 820, 1.1, Math.sin(t) * .04); gavel(1350, 420, 1, Math.PI * .5 + .3); ctx.restore(); }
    ctx.restore(); },
  sfx(d, P, E) { return [[.2, 'shimmer', .3], [E('legal') - .3, 'whoosh', .45], [E('legal') + .3, 'gavel', .45]]; }
};
SC.scoreboard = {
  draw(t, d) { bg('#05070e', '#0b0f1e'); for (let i = 0; i < 5; i++) glow(200 + i * 380, 60, 220, 'rgba(255,250,230,.4)');
    ctx.save(); cam(960, 540, 1.02); ctx.fillStyle = '#0d0f14'; rr(360, 220, 1200, 560, 30); ctx.fill(); ctx.strokeStyle = '#333'; ctx.lineWidth = 10; ctx.stroke();
    label('CONSUMERS', 660, 330, 44, { color: '#e8b931', spacing: 6 }); label('RED BULL', 1260, 330, 44, { color: '#e8b931', spacing: 6 });
    const fl = Math.floor(t * 8) % 2 && t < 1.5; label(fl ? '' : '?', 660, 600, 220, { weight: 900, color: '#ff5a4a', font: '"JetBrains Mono", monospace' }); label(fl ? '' : '?', 1260, 600, 220, { weight: 900, color: '#ff5a4a', font: '"JetBrains Mono", monospace' });
    ctx.restore(); },
  sfx() { return [[0, 'stadium', .25, { dur: 2 }], [.2, 'buzzer_soft', .35]]; }
};
SC.adTools = {
  draw(t, d, P, E) { const tc = E('celebrity') - .3, te = E('emotional') - .3, tcr = E('carefully') - .3;
    if (t < tc) billboards(t);
    else if (t < te) { bg('#05050a', '#0d0d14'); for (let i = 0; i < 4; i++) glow(400 + i * 380, 100, 300, 'rgba(255,255,255,.3)'); floor(800, '#1a1a22', '#050507');
      person(960, 1000, 560, { top: '#c8202e', pants: '#111', holdCan: true, armUp: .7, rim: 'rgba(255,255,255,.8)', light: 1, skinIdx: 1 });
      const R = rnd(Math.floor(t * 6)); for (let i = 0; i < 3; i++) if (R() > .5) glow(200 + R() * 1500, 500 + R() * 400, 260, 'rgba(255,255,255,.7)'); }
    else if (t < tcr) { BGP('warm', t); tvCartoon(960, 480, 900, t, ((t - te) * .35) % 1); }
    else SC.studioHero.draw(t - tcr, 6, { flash: true }); },
  sfx(d, P, E) { const tc = E('celebrity') - .3, te = E('emotional') - .3, tcr = E('carefully') - .3; return [[0, 'city', .25, { dur: tc }], [tc, 'shutters', .35, { dur: te - tc }], [te, 'swoosh', .3], [tcr, 'shutters', .3, { dur: d - tcr }]]; }
};
SC.adSpend = {
  draw(t, d) { billboards(t); const R = rnd(1); for (let i = 0; i < 26; i++) { const st = R() * d, k = t - st; if (k < 0 || k > 2) continue; bill(lerp(960 + (R() - .5) * 400, 300 + R() * 1300, k / 2), lerp(1100, 200 + R() * 300, k / 2), .8, k * 3); } },
  sfx(d) { return [[0, 'city', .25, { dur: d }], [.4, 'coins', .3]]; }
};
SC.shopper = {
  draw(t, d, P, E) { bg('#e9edf2', '#c9d1dc'); ctx.save(); cam(960, 560, 1.03 + t * .01);
    for (let r = 0; r < 4; r++) { ctx.fillStyle = '#bfc6d1'; ctx.fillRect(100, 260 + r * 180, 1720, 14); for (let i = 0; i < 16; i++) { const c = ['#c8202e', '#e8b931', '#2f9e6b', '#1f36a8'][(i + r) % 4]; if ((i + r) % 5 === 0) drawCan(150 + i * 108, 200 + r * 180, 110, { noShadow: true }); else drawGenericCan(150 + i * 108, 200 + r * 180, 110, c); } }
    floor(900, '#d9dde4', '#aab2bf');
    person(760, 1060, 600, { cap: true, rim: 'rgba(255,255,255,.6)', light: 1, holdCan: true, armUp: .55, tilt: -.05, top: '#2f5a3a' });
    if (P.scales) { const k = prog(t, d * .45, d * .45 + .8); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(10,14,26,.6)'; ctx.fillRect(1100, 160, 700, 620); scales(1450, 680, .7, Math.sin(t * 1.2) * .12, { left: (x, y) => label('PROMISE', x, y - 40, 28, { color: '#e8b931', spacing: 3 }), right: (x, y) => label('PROOF', x, y - 40, 28, { color: '#e8b931', spacing: 3 }) }); ctx.restore(); }
    ctx.restore(); },
  sfx(d, P) { return [[0, 'store', .3, { dur: d }], ...(P.scales ? [[d * .45, 'creak', .35]] : [])]; }
};
SC.comments = {
  draw(t, d) { BGP('night', t); ctx.save(); cam(960, 540, 1.02);
    phone(960, 560, 880, t, [{ text: 'Totally fair — ads should\nbe able to back it up.', c: '#2f9e6b', likes: '2.1K', laughs: '12' }, { text: 'Overblown. Nobody thought\nthey\'d grow wings 😂', c: '#c8202e', likes: '1.8K', laughs: '640' }, { text: '$4.23 lol. The lawyers won.', c: '#2e6fd7', likes: '3.4K', laughs: '900' }], { scroll: eio(prog(t, 1.5, d)) * 300 });
    const R = rnd(3); for (let i = 0; i < 6; i++) { const st = .5 + i * 1.3, k = prog(t, st, st + .5); if (k <= 0) continue; const x = i % 2 ? 1500 : 420, y = 260 + (i >> 1) * 240; ctx.save(); ctx.globalAlpha = k; ctx.translate(x, y); ctx.scale(eback(k), eback(k)); bubble(0, 0, 300, 110, 'rgba(255,255,255,.12)', i % 2 ? -1 : 1); glyph(['heart', 'question', 'check', 'x', 'star', 'people'][i], 40); ctx.restore(); }
    ctx.restore(); },
  sfx(d) { const o = []; for (let i = 0; i < 6; i++) o.push([.5 + i * 1.3, 'notif', .3]); return o; }
};
SC.subscribe = {
  draw(t, d, P, E) { const ts = E('subscribe') - .3; studio(t, 255); ctx.save(); cam(960, 560, 1.0 + t * .008);
    ctx.save(); ctx.globalAlpha = .9; wings(960, 380, .7, .9 + Math.sin(t * 1.5) * .05, {}); ctx.restore(); drawCan(960, 520, 420, { rim: 'rgba(190,150,255,.7)', drops: true });
    const k = eback(prog(t, ts, ts + .5)); if (k > 0) { ctx.save(); ctx.translate(960, 900); const press = prog(t, ts + 1, ts + 1.15) * (1 - prog(t, ts + 1.15, ts + 1.4)); ctx.scale(k * (1 - press * .08), k * (1 - press * .08));
      const done = t > ts + 1.15; ctx.fillStyle = done ? '#3a3d46' : '#e3262f'; rr(-230, -50, 460, 100, 50); ctx.fill(); label(done ? 'SUBSCRIBED' : 'SUBSCRIBE', 0, 16, 44, { weight: 900, spacing: 2 });
      ctx.restore(); const bk = prog(t, ts + 1.5, ts + 1.9); if (bk > 0) iconDisc(1290, 900, 46, 'heart', bk, '#e3262f');
      const cx = lerp(1400, 1000, eio(prog(t, ts + .4, ts + 1))), cy = lerp(1100, 920, eio(prog(t, ts + .4, ts + 1))); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 18, cy + 50); ctx.lineTo(cx + 28, cy + 32); ctx.lineTo(cx + 48, cy + 52); ctx.lineTo(cx + 56, cy + 44); ctx.lineTo(cx + 36, cy + 24); ctx.lineTo(cx + 54, cy + 16); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.restore(); dust(t, 9, 60); },
  sfx(d, P, E) { const ts = E('subscribe') - .3; return [[0, 'pad_swell', .35, { dur: d }], [ts, 'pop', .45], [ts + 1.1, 'click', .55], [ts + 1.5, 'chime', .45], [d - 4, 'wing', .35]]; }
};
SC.process = { draw(t, d, P, E) { SC.flow.draw(t, d, { nodes: [['people', 'blue', 'CONSUMERS'], ['doc', 'gold', 'CLAIM FORM'], ['dollar', 'green', 'SETTLEMENT FUND'], ['check', 'teal', 'COMPENSATION']] }, E); }, sfx(d, P, E) { return SC.flow.sfx(d, { nodes: [[], [], [], []] }, E); } };
SC.eligibility = {
  draw(t, d, P, E) { bg('#071022', '#02040a'); usStripes(t, .4); ctx.save(); cam(960, 560, 1.02);
    const t0 = E('january') - .3, t1 = E('october') - .3; const x0 = 260, x1 = 1660, k = eio(prog(t, t0, t1 + .5));
    ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(x0, 520, x1 - x0, 30, 15); ctx.fill(); ctx.fillStyle = '#e8b931'; rr(x0, 520, (x1 - x0) * k, 30, 15); ctx.fill();
    label('JAN 1, 2002', x0, 620, 40, { weight: 900, alpha: prog(t, t0, t0 + .4) }); label('OCT 3, 2014', x1, 620, 40, { weight: 900, alpha: prog(t, t1, t1 + .4) });
    for (let y = 2002; y <= 2014; y++) { const x = lerp(x0, x1, (y - 2002) / 12); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x - 1, 500, 2, 70); if (k > (y - 2002) / 12) drawCan(x, 430 - Math.sin(t * 2 + y) * 6, 90, { noShadow: true }); }
    const tu = E('united') - .3; ctx.save(); ctx.globalAlpha = prog(t, tu, tu + .5); usMap(960, 900, 12, t, 1, null); ctx.restore();
    ctx.restore(); },
  sfx(d, P, E) { return [[E('january') - .3, 'riser', .3, { dur: E('october') - E('january') }], [E('october'), 'chime', .4], [E('january') - .3, 'popseq', .25, { n: 13, step: (E('october') - E('january')) / 13 }]]; }
};
SC.options = {
  draw(t, d, P, E) { BGP('navy', t); ctx.save(); cam(960, 560, 1.02);
    const c1 = P.w1 ? E(P.w1) - .3 : .3, c2 = P.w2 ? E(P.w2) - .3 : .8, hi = P.hi || 0;
    [[c1, 'cash'], [c2, 'product']].forEach(([st, k], i) => { const p = prog(t, st, st + .6); if (p <= 0) return; const x = 560 + i * 800, sel = hi === i + 1;
      ctx.save(); ctx.translate(x, 560 + (1 - eout(p)) * 100); ctx.globalAlpha = clamp(p * 2) * (hi && !sel ? .45 : 1); ctx.scale(sel ? 1.06 : 1, sel ? 1.06 : 1);
      ctx.fillStyle = sel ? 'rgba(47,158,107,.25)' : 'rgba(255,255,255,.07)'; rr(-300, -320, 600, 640, 30); ctx.fill(); ctx.strokeStyle = sel ? '#2f9e6b' : 'rgba(255,255,255,.25)'; ctx.lineWidth = 4; ctx.stroke();
      if (k === 'cash') { bill(0, -40, 2.2, -.05); bill(30, 0, 2.2, .06); label('$10', 0, 230, 110, { weight: 900 }); label('CASH', 0, 285, 32, { spacing: 8, color: '#e8b931' }); }
      else { for (let j = 0; j < 3; j++) drawCan(-110 + j * 110, -10, 240, { noShadow: true }); label('$15', 0, 230, 110, { weight: 900 }); label('IN PRODUCTS', 0, 285, 32, { spacing: 8, color: '#e8b931' }); }
      ctx.restore(); });
    if (!P.w1 && !P.w2) label('OR', 960, 590, 60, { weight: 900, color: '#e8b931', alpha: prog(t, 1, 1.5) });
    ctx.restore(); },
  sfx(d, P, E) { return [[P.w1 ? E(P.w1) - .3 : .3, 'swoosh', .4], [P.w2 ? E(P.w2) - .3 : .8, 'swoosh', .4], ...(P.hi ? [[.3, 'chime', .35]] : [])]; }
};
SC.noReceipt = {
  draw(t, d) { BGP('warm', t); ctx.save(); cam(960, 560, 1.02);
    receipt(520, 520, 1.3, -.08); bigX(520, 520, 380, prog(t, 1, 1.6)); laptopForm(1320, 560, .8, prog(t, 1.8, d - .5), { choice: t > d - 1.2 ? 1 : 0 });
    if (t > d - .8) iconDisc(1640, 300, 60, 'check', prog(t, d - .8, d - .4), COL.green);
    ctx.restore(); },
  sfx(d) { return [[.2, 'paper', .4], [1, 'soft_x', .45], [1.8, 'typing', .35, { dur: d - 2.5 }], [d - .8, 'chime', .4]]; }
};
