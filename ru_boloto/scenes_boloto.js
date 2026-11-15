// ===== «Болото» (ВЫЖИВИ САМ) scenes — Doc voice, 50 units =====
const U = (s, k) => T0(s, s.a + k); // local start of the k-th unit of the shot
const beat = (t, s) => { let k = 0; for (let i = 1; i <= s.b - s.a; i++) if (t >= U(s, i) - .05) k = i; return k; };
const ttl = (str, t, t0, col = '#fff', size = 116) => bigTitleFit(str, 300, prog(t, t0, t0 + .2), { size, col });
function walkPose(ph, tired = .14) { const s = Math.sin(ph), c = Math.cos(ph); return { tor: tired, hd: -.04, hipF: .4 * s, hipB: -.4 * s, knF: .12 + .55 * Math.max(0, -c), knB: .12 + .55 * Math.max(0, c), shF: -.32 * s, shB: .32 * s, elF: .3, elB: .3, ph: 47 + 1.2 * Math.abs(Math.sin(ph * 2)) }; }
function actorJoints(x, y, h, P, flip) { const u = h / 100; P = Object.assign({}, POSE0, P); const pel = [P.dx * u, -P.ph * u], L = (a, len, f) => [f[0] + Math.sin(a) * len, f[1] + Math.cos(a) * len];
  const sho = [pel[0] + Math.sin(P.tor) * 27 * u, pel[1] - Math.cos(P.tor) * 27 * u]; const hand = (a, el) => { const aU = P.tor + a, e = L(aU, 17 * u, sho), aF = aU + el, hh = L(aF, 15.5 * u, e); return [hh[0] + Math.sin(aF) * 1.6 * u, hh[1] + Math.cos(aF) * 1.6 * u]; };
  const W = p => { const dx = p[0] - pel[0], dy = p[1] - pel[1], c = Math.cos(P.rot), s = Math.sin(P.rot); let X = pel[0] + dx * c - dy * s, Y = pel[1] + dx * s + dy * c; if (flip) X = -X; return [x + X, y + Y]; };
  return { handF: W(hand(P.shF, P.elF)), handB: W(hand(P.shB, P.elB)), sho: W(sho), pel: W(pel) }; }
function poleDraw(x0, y0, x1, y1, w = 9) { const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0); ctx.save(); ctx.translate(x0, y0); ctx.rotate(a); ctx.fillStyle = grad(0, -w, 0, w, [[0, '#a8957a'], [.5, '#cdbb9c'], [1, '#6e5e48']]); rr(0, -w / 2, L, w, w / 2); ctx.fill(); ctx.fillStyle = '#5a4a36'; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.ellipse(L * k / 7 + (k % 2) * 13, 0, w * .5, w * .32, 0, 0, 7); ctx.fill(); } ctx.fillStyle = '#e6d8bc'; ctx.beginPath(); ctx.ellipse(L, 0, w * .25, w * .5, 0, 0, 7); ctx.fill(); ctx.restore(); }
function hatchet(x, y, a, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); ctx.fillStyle = '#7a5a36'; rr(-4, -60, 8, 80, 4); ctx.fill(); ctx.fillStyle = grad(0, -70, 0, -40, [[0, '#d0d4d8'], [1, '#5a5e64']]); ctx.beginPath(); ctx.moveTo(-4, -64); ctx.lineTo(26, -74); ctx.quadraticCurveTo(32, -58, 26, -42); ctx.lineTo(-4, -48); ctx.closePath(); ctx.fill(); ctx.restore(); }
function arrow(x0, y0, x1, y1, col = '#ffcf4a', w = 8) { const a = Math.atan2(y1 - y0, x1 - x0); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * w * 2, y1 - Math.sin(a) * w * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(a - .45) * w * 4, y1 - Math.sin(a - .45) * w * 4); ctx.lineTo(x1 - Math.cos(a + .45) * w * 4, y1 - Math.sin(a + .45) * w * 4); ctx.closePath(); ctx.fill(); }
function tag(str, x, y, p, col = '#ffcf4a', size = 52) { if (p <= 0) return; ctx.save(); ctx.globalAlpha = p; ctx.font = `900 ${size}px ${F_HEAD}`; const w = ctx.measureText(str).width + size * .6; ctx.fillStyle = 'rgba(0,0,0,.66)'; rr(x - w / 2, y - size * .85, w, size * 1.3, size * .3); ctx.fill(); label(str, x, y + size * .1, size, { weight: 900, color: col }); ctx.restore(); }
function redX(x, y, r, p) { if (p <= 0) return; ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = '#ff3b30'; ctx.lineWidth = r * .22; ctx.lineCap = 'round'; const k = eout(p); ctx.beginPath(); ctx.moveTo(x - r * k, y - r * k); ctx.lineTo(x + r * k, y + r * k); ctx.moveTo(x + r * k, y - r * k); ctx.lineTo(x - r * k, y + r * k); ctx.stroke(); ctx.restore(); }
function check(x, y, r, p, col = '#5ce065') { if (p <= 0) return; ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = col; ctx.lineWidth = r * .22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x - r * .3, y + r * .7); ctx.lineTo(x + r, y - r * .7); ctx.stroke(); ctx.restore(); }
function shake(t, t0, a = 18, d = .5) { const k = 1 - prog(t, t0, t0 + d); if (k <= 0 || t < t0) return; ctx.translate(Math.sin(t * 90) * a * k, Math.cos(t * 77) * a * k); }
function flash(t, t0, a = .7, col = '255,255,255') { const k = 1 - prog(t, t0, t0 + .25); if (k <= 0 || t < t0) return; ctx.fillStyle = `rgba(${col},${a * k})`; ctx.fillRect(0, 0, W, H); }
function warmGrade(a = .18) { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = `rgba(255,170,90,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function coldGrade(a = .25) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(150,170,190,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function forestBG(t, keys, draw, o = {}) { ctx.save(); camKeys(t, keys, .5); bogSky(t, {}); farTaiga(t); ctx.fillStyle = grad(0, HZ, 0, HZ + 900, [[0, '#5e6a3a'], [1, '#3a4222']]); ctx.fillRect(-2000, HZ + 18, 6000, 2400);
  const R = rnd(91); for (let i = 0; i < 16; i++) spruce(-900 + i * 260 + R() * 120, HZ + 140 + R() * 60, 900 + R() * 400, '#29402c', 0, R); ctx.fillStyle = 'rgba(220,226,220,.35)'; ctx.fillRect(-2000, HZ - 900, 6000, 1100);
  for (let i = 0; i < 14; i++) spruce(-900 + i * 330 + R() * 160, HZ + 420 + R() * 80, 1500 + R() * 500, '#1f3424', 0, R); ctx.fillStyle = 'rgba(210,220,212,.18)'; ctx.fillRect(-2000, HZ - 1400, 6000, 1900);
  ctx.fillStyle = grad(0, HZ + 380, 0, HZ + 1200, [[0, '#4e5a2e'], [1, '#2e3618']]); ctx.fillRect(-2000, HZ + 440, 6000, 2400); const R2 = rnd(5); for (let i = 0; i < 60; i++) { const x = -1200 + R2() * 3600, y = HZ + 470 + R2() * 600; ctx.fillStyle = R2() > .5 ? 'rgba(120,96,50,.4)' : 'rgba(40,60,26,.5)'; ctx.beginPath(); ctx.ellipse(x, y, 60 + R2() * 120, 10 + R2() * 16, 0, 0, 7); ctx.fill(); }
  if (draw) draw(); spruce(-760, HZ + 1300, 2700, '#13241a', 0, R); spruce(1880, HZ + 1300, 2700, '#13241a', 0, R); ctx.restore(); mist(t, .45); }

// 0 — HOOK: up to the chest in the slurry, then: lie down on it
SC.hook = { draw(t, d, P, E, s) { const tl = wt(s, 0, 'лечь') - .25;
    if (t < tl) { const fl = Math.sin(t * 7); bogWorld(t, [[0, 600, 1290, 2.6], [tl, 600, 1310, 3.0]], { clear: [600, 260, 1500, 90], items: [[1500, () => { hiker(600, 1500, 560, { tor: .05, hd: -.35, shF: 2.6 + .35 * fl, elF: .4 + .3 * fl, shB: 2.3 - .35 * fl, elB: .6, mouth: .7 }, { sink: 300 }); splash(600, 1490, 0, t, 1); splash(560, 1495, .6, t, .7); }]] }); warmGrade(.1); ttl('ЛЯГ НА БОЛОТО', t, 0, '#ffcf4a', 130); return; }
    ctx.save(); camKeys(t, [[tl, 540, 960, 2.4], [d, 540, 960, 1.35]], .3); bogTop(t, { free: [540, 960, 420] }); heroTop(540, 900, 2.6, t, { arms: eout(prog(t, tl, tl + .6)), sink: .55 }); ctx.restore(); vign(.4); ttl('ЛЯГ НА БОЛОТО', t, 0, '#ffcf4a', 130); },
  sfx(d, P, E, s) { return [[0, 'splash', .7], [0, 'swamp', .35, { dur: d }], [.6, 'squelch', .5], [wt(s, 0, 'лечь') - .25, 'whoosh', .35]]; } };

// 1 — third day lost in the taiga
SC.lost = { draw(t, d) { const x = 300 + t * 110; forestBG(t, [[0, 420, 1280, 1.25], [d, 560, 1270, 1.32]], () => { hiker(x, HZ + 520, 600, walkPose(t * 4.2, .22)); }); vign(.5); ttl('3-Й ДЕНЬ В ТАЙГЕ', t, 0); }, sfx(d) { return [[0, 'steps', .4, { dur: d }], [0, 'wind', .3, { dur: d }]]; } };

// 2–3 — shortcut across the bog to the river (1–2 km)
SC.route = { draw(t, d, P, E, s) { const k = beat(t, s), riv = () => { ctx.fillStyle = grad(1250, 0, 2300, 0, [[0, 'rgba(230,240,240,0)'], [.2, 'rgba(230,240,240,.9)'], [.8, 'rgba(230,240,240,.9)'], [1, 'rgba(230,240,240,0)']]); ctx.fillRect(1250, HZ + 14, 1050, 9); };
    const route = p => { ctx.save(); ctx.setLineDash([26, 22]); ctx.lineDashOffset = -t * 60; ctx.strokeStyle = '#ffcf4a'; ctx.lineWidth = 9; ctx.beginPath(); const N = 40; for (let i = 0; i <= N * p; i++) { const q = i / N, xx = lerp(330, 1700, q), yy = lerp(1500, HZ + 30, Math.pow(q, .6)) - Math.sin(q * 3.2) * 40 * (1 - q); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); };
    const keys = k === 0 ? [[0, 420, 1250, 1.05], [U(s, 1), 620, 1220, .95]] : [[U(s, 1) - .05, 900, 1130, 1.25], [d, 1250, 1100, 1.5]];
    bogWorld(t, keys, { clear: [330, 160, 1500, 60], items: [[1100, riv], [1500, () => { hiker(330, 1500, 560, Object.assign(walkPose(0, .12), { hd: -.08 })); }], [3000, () => route(k === 0 ? eout(prog(t, .5, U(s, 1))) : 1)], [3001, () => { ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 3; for (let i = 0; i < 5; i++) spruce(-700 + i * 160, HZ + 520, 1300 + i * 60, '#1f3424', 0, rnd(i + 3)); ctx.restore(); }]] });
    if (k === 0) ttl('НАПРЯМИК К РЕКЕ', t, 0); else { ttl('ЧЕРЕЗ БОЛОТО', t, U(s, 1), '#ffcf4a'); tag('1–2 КМ', 760, 820, prog(t, U(s, 1) + .2, U(s, 1) + .5), '#fff', 70); } },
  sfx(d, P, E, s) { return [[0, 'swamp', .4, { dur: d }], [.5, 'swoosh', .25], [U(s, 1), 'pop', .3]]; } };

// 4–5 — the moss springs like a mattress… but it is not ground
SC.moss = { draw(t, d, P, E, s) { const k = beat(t, s), ph = t * 3.2, st = Math.sin(ph), bob = -Math.max(0, st) * 26, x = 380 + t * 60;
    ctx.save(); camKeys(t, [[0, 470, 640, 3.0], [d, 560, 650, 3.2]], .2); bogSection(t, { SY: 700, bob, bobX: x + 40 }); hiker(x, 700 + bob * .9, 560, walkPose(ph, .12)); ctx.restore();
    if (k === 0) ttl('ПРУЖИНИТ, КАК МАТРАС', t, 0, '#fff', 100); else { ttl('НО ЭТО НЕ ЗЕМЛЯ', t, U(s, 1), '#ff5a4a'); tag('ВОДА', 540, 1250, prog(t, U(s, 1) + .2, U(s, 1) + .5), '#7fd3ff', 64); } vign(.35); },
  sfx(d) { return [[0, 'squelch', .45], [1, 'squelch', .4], [2, 'squelch', .45], [0, 'swamp', .3, { dur: d }]]; } };

// 6–7 — a carpet of roots floating on water; metres of black slurry below
SC.section = { draw(t, d, P, E, s) { const k = beat(t, s); ctx.save(); camKeys(t, k === 0 ? [[0, 560, 760, 1.6], [U(s, 1), 560, 800, 1.45]] : [[U(s, 1) - .05, 560, 1000, 1.05], [d, 560, 1060, .9]], .2); const bob = Math.sin(t * 2.4) * 6;
    bogSection(t, { SY: 700, bob, bobX: 420, depth: k ? eout(prog(t, U(s, 1), U(s, 1) + 1.2)) : 0, depthX: 930, depthText: 'ДО 5 М' }); hiker(420, 700 + bob, 560, { tor: .08, hd: -.1 });
    if (k === 0) { tag('КОВЁР ИЗ КОРНЕЙ', 560, 900, prog(t, .3, .6), '#ffcf4a', 38); arrow(500, 865, 470, 790, '#ffcf4a', 6); tag('ВОДА', 640, 1000, prog(t, 1.2, 1.5), '#7fd3ff', 40); } ctx.restore();
    ttl(k ? 'ЧЁРНАЯ ЖИЖА' : 'ПЛАВАЕТ НА ВОДЕ', t, k ? U(s, 1) : 0, k ? '#ff5a4a' : '#fff'); vign(.35); },
  sfx(d, P, E, s) { return [[0, 'whoosh', .35], [0, 'bubbles', .3, { dur: d }], [U(s, 1), 'drone', .3, { dur: d - U(s, 1) }]]; } };

// 8–9 — cut a pole twice your height
SC.pole = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { const sw = (t * 2.6) % 1, a = sw < .55 ? lerp(-2.6, .3, eio(sw / .55)) : lerp(.3, -2.6, (sw - .55) / .45), hit = sw > .5 && sw < .6;
      forestBG(t, [[0, 520, 1300, 1.7], [d, 540, 1290, 1.9]], () => { const y = HZ + 520; ctx.save(); deadBirch(700, y, 1200, rnd(3)); ctx.restore(); const P0 = { tor: .25, hd: .1, shF: 1.5 + a * .45, elF: -.2, shB: .6, elB: .9, hipF: .3, knF: .3, hipB: -.2, knB: .2 }; hiker(560, y, 600, P0); const J = actorJoints(560, y, 600, P0); hatchet(J.handF[0], J.handF[1], Math.PI / 2 + P0.tor + P0.shF + P0.elF - 1.4, 1.3); if (hit) { const R = rnd(Math.floor(t * 10)); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#e8dcc0'; ctx.fillRect(700 + R() * 60, y - 330 - R() * 90, 10, 5); } } });
      vign(.45); ttl('СРУБАЕШЬ ЖЕРДЬ', t, 0); return; }
    forestBG(t, [[U(s, 1) - .05, 520, 1100, 1.0], [d, 520, 1120, 1.08]], () => { const y = HZ + 520, P0 = { tor: .05, hd: -.15, shF: .55, elF: -1.25, shB: .1, elB: .3 }; hiker(520, y, 600, P0); const J = actorJoints(520, y, 600, P0); poleDraw(J.handF[0], y, J.handF[0] + 10, y - 1200, 14);
      const p = eout(prog(t, U(s, 1) + .2, U(s, 1) + .9)); ctx.save(); ctx.globalAlpha = p; ctx.strokeStyle = '#ffcf4a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(760, y); ctx.lineTo(760, y - 1200); ctx.moveTo(740, y); ctx.lineTo(780, y); ctx.moveTo(740, y - 600); ctx.lineTo(780, y - 600); ctx.moveTo(740, y - 1200); ctx.lineTo(780, y - 1200); ctx.stroke(); label('×2', 840, y - 580, 90, { weight: 900, color: '#ffcf4a' }); ctx.restore(); });
    vign(.45); ttl('БЕЗ НЕЁ НЕ ХОДЯТ', t, U(s, 1), '#ffcf4a'); },
  sfx(d, P, E, s) { const o = [[0, 'wind', .25, { dur: d }]]; for (let tt = .2; tt < U(s, 1); tt += 1 / 2.6) o.push([tt, 'chop', .5]); o.push([U(s, 1), 'creak', .35]); return o; } };

// 10–11 — probe every step; step only on hummocks and roots
SC.probe = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { const cyc = (t * 1.1) % 1, x = 380 + t * 70, poke = Math.sin(cyc * Math.PI); bogWorld(t, [[0, 520, 1330, 1.55], [U(s, 1), 620, 1320, 1.6]], { clear: [600, 400, 1500, 80], items: [[1500, () => { const P0 = Object.assign(walkPose(t * 2.2, .2), { shF: 1.0 + .3 * poke, elF: -.5, shB: .9 + .3 * poke, elB: -.3 }); hiker(x, 1500, 560, P0); const J = actorJoints(x, 1500, 560, P0), tip = [x + 300 + 40 * poke, 1500 + 6 - 20 * poke]; const a = Math.atan2(tip[1] - J.handF[1], tip[0] - J.handF[0]); poleDraw(J.handF[0] - Math.cos(a) * 300, J.handF[1] - Math.sin(a) * 300, tip[0], tip[1], 10); if (poke > .9) { ctx.strokeStyle = 'rgba(40,50,30,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(tip[0], tip[1], 40, 9, 0, 0, 7); ctx.stroke(); } }]] }); vign(.4); ttl('КАЖДЫЙ ШАГ — ЖЕРДЬЮ', t, 0, '#fff', 104); return; }
    const t1 = t - U(s, 1), hop = (t1 * 1.4) % 1, i = Math.floor(t1 * 1.4), hx = n => 300 + n * 260; const x = lerp(hx(i), hx(i + 1), eio(hop)), lift = Math.sin(hop * Math.PI) * 60;
    bogWorld(t, [[U(s, 1) - .05, 420 + t1 * 360, 1420, 2.1], [d, 520 + t1 * 360, 1420, 2.2]], { hum: 40, clear: [800, 900, 1500, 120], items: [[1480, () => { for (let n = 0; n < 8; n++) { hummock(hx(n), 1500, .9, rnd(n + 30), t); const p = prog(t1, n / 1.4 - .4, n / 1.4); if (p > 0) { ctx.strokeStyle = `rgba(255,207,74,${.8 * p})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(hx(n), 1500, 130, 30, 0, 0, 7); ctx.stroke(); } } }], [1500, () => hiker(x, 1458 - lift, 560, Object.assign(walkPose(hop * Math.PI * 2, .16), { shF: 1.0, elF: -.4 })) ]] }); vign(.4); ttl('ТОЛЬКО ПО КОЧКАМ', t, U(s, 1), '#ffcf4a'); },
  sfx(d, P, E, s) { return [[0, 'swamp', .3, { dur: d }], [.5, 'squelch', .4], [1.4, 'squelch', .4], [U(s, 1) + .4, 'squelch', .45], [U(s, 1) + 1.1, 'squelch', .45], [U(s, 1) + 1.8, 'squelch', .45]]; } };

// 12–14 — a smooth bright-green lawn: looks the safest, is the most dangerous
SC.lawn = { draw(t, d, P, E, s) { const k = beat(t, s), win = () => bogWindow(760, 1300, 300, .6, t);
    const keys = k === 0 ? [[0, 500, 1250, 1.0], [U(s, 1), 620, 1260, 1.15]] : k === 1 ? [[U(s, 1) - .05, 760, 1300, 2.0], [U(s, 2), 760, 1300, 2.2]] : [[U(s, 2) - .05, 760, 1300, 2.6], [d, 760, 1300, 2.9]];
    bogWorld(t, keys, { clear: [760, 420, 1300, 110], under: win, items: [[1520, () => { if (k === 0) hiker(280, 1520, 560, { tor: .06, hd: -.05, shF: .3, elF: -.6 }), poleDraw(330, 1520, 360, 900, 9); }]], sunX: 900 });
    if (k === 2) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(255,120,110,${.35 * prog(t, U(s, 2), U(s, 2) + .3)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    vign(.4);
    if (k === 0) ttl('ЯРКО-ЗЕЛЁНАЯ ПОЛЯНКА', t, 0, '#b6ff6a', 100); else if (k === 1) { ttl('С ВИДУ — НАДЁЖНО', t, U(s, 1)); check(540, 760, 90, prog(t, U(s, 1) + .2, U(s, 1) + .5)); } else { ttl('САМОЕ ОПАСНОЕ', t, U(s, 2), '#ff3b30', 124); redX(540, 760, 110, prog(t, U(s, 2) + .1, U(s, 2) + .4)); } },
  sfx(d, P, E, s) { return [[0, 'swamp', .4, { dur: d }], [U(s, 1), 'chime', .3], [U(s, 2), 'dundun', .55], [U(s, 2), 'heartbeat', .4, { dur: d - U(s, 2) }]]; } };

// 15–16 — the window: a hole in the carpet under a film of grass; one step and you go under
SC.window = { draw(t, d, P, E, s) { const k = beat(t, s); ctx.save(); camKeys(t, k === 0 ? [[0, 640, 820, 1.5], [U(s, 1), 640, 860, 1.4]] : [[U(s, 1) - .05, 680, 1000, 1.05], [d, 680, 1040, .95]], .2);
    bogSection(t, { SY: 700, gap: [760, 170] }); hiker(330, 700, 560, { tor: .2, hd: .2, shF: 1.2, elF: -.4, shB: 1.1, elB: -.2 });
    const pk = eout(prog(t, .4, 1.6)); poleDraw(380, 400 - 120 * pk, 700 + 40 * pk, 700 + 520 * pk, 10); // the pole goes down with no resistance
    if (k === 0) tag('ОКНО', 760, 620, prog(t, .3, .6), '#ffcf4a', 64);
    if (k === 1) { const q = prog(t, U(s, 1), d - .2); actor(800, 700 + 1300 * eio(q), 560, { tor: .05, shF: 2.8, elF: .2, shB: 2.6, elB: .2, hd: -.3 }, { sil: `rgba(255,80,70,${.55 * (1 - q * .6)})` }); }
    ctx.restore(); ttl(k ? 'УЙДЁШЬ С ГОЛОВОЙ' : 'ДЫРА В КОВРЕ', t, k ? U(s, 1) : 0, k ? '#ff3b30' : '#fff'); vign(.35); },
  sfx(d, P, E, s) { return [[0, 'whoosh', .35], [.4, 'bubbles', .35, { dur: 1.6 }], [U(s, 1), 'splash', .35], [U(s, 1), 'drone', .35, { dur: d - U(s, 1) }]]; } };

// 17–18 — you go around it… but the worst happens next
SC.around = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { const q = eio(prog(t, 0, U(s, 1))), a = lerp(Math.PI * .95, Math.PI * .05, q), hx = 540 + Math.cos(a) * 330, hy = 1000 + Math.sin(a) * 210;
      ctx.save(); camKeys(t, [[0, 540, 1000, 1.2], [U(s, 1), 540, 1000, 1.3]], .2); bogTop(t, { free: [540, 1000, 500] }); ctx.save(); ctx.translate(540, 1000); ctx.scale(1, .75); ctx.translate(-540, -1000); bogWindow(540, 1000, 260, 1, t); ctx.restore(); // window seen from above (round)
      ctx.save(); ctx.setLineDash([22, 18]); ctx.strokeStyle = '#ffcf4a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(540, 1000, 330, 210, 0, Math.PI * .95, a, true); ctx.stroke(); ctx.restore(); heroTop(hx, hy, 1.6, t, { up: 0, crawl: null, rot: a - Math.PI / 2 + Math.PI, arms: .1 }); ctx.restore(); vign(.35); ttl('ОБХОДИШЬ', t, 0); return; }
    const t1 = t - U(s, 1); bogWorld(t, [[U(s, 1) - .05, 520, 1300, 1.4], [d, 600, 1330, 1.75]], { clear: [600, 300, 1500, 80], mist: .8, items: [[1500, () => hiker(420 + t1 * 90, 1500, 560, Object.assign(walkPose(t1 * 3, .2), { shF: 1.0, elF: -.4 }))]] }); coldGrade(.3 * prog(t1, 0, 1.5)); vign(.55); ttl('НО ДАЛЬШЕ…', t, U(s, 1), '#ffcf4a'); },
  sfx(d, P, E, s) { return [[0, 'squelch', .35], [.8, 'squelch', .35], [U(s, 1), 'drone', .4, { dur: d - U(s, 1) }], [U(s, 1), 'heartbeat', .35, { dur: d - U(s, 1) }]]; } };

// 19 — crack: waist-deep in icy slurry
SC.crack = { draw(t, d, P, E, s) { const tc = Math.max(.05, wt(s, 19, 'хруст') - .05), q = eout(prog(t, tc, tc + .3)), sink = 280 * q + 10 * Math.sin(t * 3) * q;
    ctx.save(); shake(t, tc, 26, .6); bogWorld(t, [[0, 560, 1360, 1.9], [tc, 560, 1360, 1.9], [d, 560, 1330, 2.4]], { clear: [560, 300, 1500, 80], items: [[1500, () => { const P0 = q < .1 ? walkPose(t * 3, .2) : { tor: .1, hd: -.3, shF: 2.4, elF: .5, shB: 2.0, elB: .7, mouth: .8 }; hiker(560, 1500, 560, P0, q > 0 ? { sink } : {}); splash(560, 1480, tc, t, 1.2); if (q > 0 && t < tc + .4) { ctx.strokeStyle = 'rgba(30,24,12,.8)'; ctx.lineWidth = 6; const R = rnd(4); for (let i = 0; i < 8; i++) { const a = R() * 6.28; ctx.beginPath(); ctx.moveTo(560, 1500); ctx.lineTo(560 + Math.cos(a) * 240, 1500 + Math.sin(a) * 60); ctx.stroke(); } } }]] }); ctx.restore();
    flash(t, tc, .55); coldGrade(.3); vign(.5); ttl(t < tc + .5 ? 'ХРУСТ' : 'ПО ПОЯС', t, t < tc + .5 ? tc : tc + .5, t < tc + .5 ? '#fff' : '#7fd3ff', 140); },
  sfx(d, P, E, s) { const tc = Math.max(.05, wt(s, 19, 'хруст') - .05); return [[tc - .05, 'crackwood', .8], [tc + .1, 'splash', .8], [tc + .5, 'drone', .35, { dur: d - tc - .5 }]]; } };

// 20–22 — jerking upwards: that's how people drown
SC.jerk = { draw(t, d, P, E, s) { const k = beat(t, s), j = Math.max(0, Math.sin(t * 5.2)), n = Math.floor(t * 5.2 / Math.PI / 2 + .25), deep = k === 0 ? 280 : 300 + Math.min(4, Math.floor((t - U(s, 1)) * 1.6)) * 32;
    bogWorld(t, k === 0 ? [[0, 560, 1300, 2.6], [U(s, 1), 560, 1300, 2.8]] : [[U(s, 1) - .05, 560, 1330, 2.1], [d, 560, 1360, 2.5]], { clear: [560, 300, 1500, 80], items: [[1500, () => hiker(560, 1500, 560, { tor: .25 - .2 * j, hd: -.4, shF: 1.6 + .6 * j, elF: -.6, shB: 1.4 + .6 * j, elB: -.4, mouth: .5 + .4 * j }, { sink: deep - 25 * j, st: { mudTop: .2 } })]] }); coldGrade(.25);
    if (k >= 1) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,130,120,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    vign(.5); if (k === 0) ttl('РВАНУТЬСЯ ВВЕРХ?', t, 0); else if (k === 1) { ttl('ТАК И ТОНУТ', t, U(s, 1), '#ff3b30', 130); redX(540, 760, 100, prog(t, U(s, 1), U(s, 1) + .3)); } else { ttl('КАЖДЫЙ РЫВОК — ГЛУБЖЕ', t, U(s, 2), '#ff3b30', 96); arrow(880, 760, 880, 1000, '#ff3b30', 12); } },
  sfx(d, P, E, s) { const o = [[0, 'heartbeat', .45, { dur: d }]]; for (let tt = .25; tt < d; tt += 2 * Math.PI / 5.2) o.push([tt, 'squelch', .55]); o.push([U(s, 1), 'dundun', .5]); return o; } };

// 23 — the bog holds your legs like a suction cup
SC.suction = { draw(t, d) { ctx.save(); camKeys(t, [[0, 540, 900, 1.25], [d, 540, 960, 1.4]], .2);
    bogSection(t, { SY: 700, hole: [540, 120], legs: SY => { const w = Math.sin(t * 6) * .08; actor(540, SY + 300, 560, { tor: .1, hd: -.3, shF: 2.0, elF: .3, shB: 1.8, elB: .4, hipF: .1 + w, knF: .2, hipB: -.1 - w, knB: .2, mouth: .6 }, Object.assign({}, HIKER, { mudTo: .8, mudTop: .4 })); } });
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + t, r = 150 + 20 * Math.sin(t * 4 + i); arrow(540 + Math.cos(a) * r, 1000 + Math.sin(a) * r * .5, 540 + Math.cos(a) * r * .55, 1000 + Math.sin(a) * r * .28, '#ff5a4a', 7); }
    ctx.restore(); tag('ПРИСОСКА', 540, 1250, prog(t, .3, .6), '#ff5a4a', 70); ttl('ДЕРЖИТ НОГИ', t, 0); vign(.4); },
  sfx(d) { return [[0, 'deflate', .4], [0, 'bubbles', .3, { dur: d }]]; } };

// 24–25 — the pole across the hole, chest on it: it rests on the carpet like a railing
SC.pole2 = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { const q = eout(prog(t, .1, 1.2)); bogWorld(t, [[0, 560, 1360, 1.9], [U(s, 1), 560, 1380, 2.1]], { clear: [560, 360, 1500, 90], items: [[1500, () => { const py = 1440 + (1 - q) * -260; hiker(560, 1500, 560, { tor: lerp(.1, .75, q), hd: lerp(-.3, .1, q), shF: lerp(2.2, 1.1, q), elF: lerp(.4, 1.2, q), shB: lerp(2.0, 1.0, q), elB: lerp(.6, 1.3, q) }, { sink: 310, st: { mudTop: .3 } }); poleDraw(560 - 520, py + (1 - q) * 40, 560 + 520, py - (1 - q) * 120, 13); }]] }); vign(.4); ttl('ЖЕРДЬ ПОПЕРЁК', t, 0); return; }
    ctx.save(); camKeys(t, [[U(s, 1) - .05, 540, 960, 1.6], [d, 540, 960, 1.3]], .2); bogTop(t, { free: [540, 960, 600] }); poleDraw(60, 900, 1020, 900, 24); heroTop(540, 980, 2.3, t, { up: 0, arms: .55, sink: .9 });
    const p = prog(t, U(s, 1) + .3, U(s, 1) + .7); arrow(180, 780, 180, 900, '#ffcf4a', 9); arrow(900, 780, 900, 900, '#ffcf4a', 9); tag('ЛЕЖИТ НА КОВРЕ', 540, 700, p, '#ffcf4a', 52); ctx.restore(); vign(.35); ttl('КАК ПЕРИЛА', t, U(s, 1), '#ffcf4a'); },
  sfx(d, P, E, s) { return [[.2, 'thud_soft', .5], [.4, 'squelch', .4], [U(s, 1), 'whoosh', .3]]; } };

// 26–28 — what looks like madness: you don't get up. You lie down.
SC.liedown = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k < 2) { bogWorld(t, k === 0 ? [[0, 580, 1400, 2.5], [U(s, 1), 580, 1400, 2.8]] : [[U(s, 1) - .05, 560, 1380, 2.0], [U(s, 2), 560, 1380, 2.2]], { clear: [560, 360, 1500, 90], items: [[1500, () => { hiker(560, 1500, 560, { tor: .7, hd: -.25, shF: 1.1, elF: 1.2, shB: 1.0, elB: 1.3, mouth: .2 }, { sink: 310, st: { mudTop: .3 } }); poleDraw(40, 1440, 1080, 1440, 13); }]] }); coldGrade(.2); vign(.5);
      if (k === 0) ttl('КАЖЕТСЯ БЕЗУМИЕМ', t, 0, '#fff', 108); else { ttl('ТЫ НЕ ВСТАЁШЬ', t, U(s, 1), '#ff3b30'); redX(540, 760, 90, prog(t, U(s, 1) + .1, U(s, 1) + .4)); } return; }
    const q = eout(prog(t, U(s, 2), U(s, 2) + .7)); ctx.save(); camKeys(t, [[U(s, 2) - .05, 540, 960, 2.2], [d, 540, 960, 1.5]], .2); bogTop(t, { free: [540, 960, 600] }); poleDraw(40, 1000, 1040, 1000, 24); heroTop(540, 900, 2.4, t, { up: 1, arms: q * .5, sink: .6 }); ctx.restore(); warmGrade(.12); vign(.35); ttl('ТЫ ЛОЖИШЬСЯ', t, U(s, 2), '#5ce065', 124); },
  sfx(d, P, E, s) { return [[0, 'drone', .35, { dur: U(s, 2) }], [U(s, 1), 'dundun', .45], [U(s, 2), 'whoosh', .4], [U(s, 2) + .3, 'squelch', .4]]; } };

// 29–31 — arms out, lean back: bigger area, less pressure — like skis on snow
SC.area = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k < 2) { const ar = k === 0 ? eout(prog(t, .1, 1.4)) : 1; ctx.save(); camKeys(t, k === 0 ? [[0, 540, 960, 1.5], [U(s, 1), 540, 960, 1.35]] : [[U(s, 1) - .05, 540, 960, 1.25], [U(s, 2), 540, 960, 1.15]], .2); bogTop(t, { free: [540, 960, 600] }); heroTop(540, 900, 2.4, t, { up: 1, arms: ar, sink: .6 });
      if (k === 1) { const p = prog(t, U(s, 1), U(s, 1) + .5); ctx.save(); ctx.globalAlpha = .35 * p; ctx.fillStyle = '#ffcf4a'; ctx.beginPath(); ctx.ellipse(540, 900, 300 * p, 230 * p, 0, 0, 7); ctx.fill(); ctx.restore(); for (let i = 0; i < 9; i++) { const xx = 330 + i * 52; arrow(xx, 640, xx, 700, `rgba(255,207,74,${p})`, 5); } }
      ctx.restore(); vign(.35); if (k === 0) ttl('РУКИ В СТОРОНЫ', t, 0); else ttl('БОЛЬШЕ ПЛОЩАДЬ', t, U(s, 1), '#ffcf4a'); if (k === 1) tag('МЕНЬШЕ ДАВИШЬ', 540, 1240, prog(t, U(s, 1) + .4, U(s, 1) + .7), '#5ce065', 60); return; }
    ctx.fillStyle = grad(0, 0, 0, H, [[0, '#b8c6d4'], [1, '#e8eef4']]); ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#f6f8fb'; ctx.fillRect(0, 1100, W, 820); ctx.fillStyle = 'rgba(120,140,170,.25)'; ctx.fillRect(0, 1100, W, 8);
    const q = eout(prog(t, U(s, 2), U(s, 2) + .8)); ctx.fillStyle = '#d6dde8'; rr(170, 1100, 140, 260 * q + 10, 20); ctx.fill(); actor(240, 1100 + 260 * q, 560, { tor: .05, shF: .3, shB: -.2 }, HIKER); redX(240, 1550, 70, prog(t, U(s, 2) + .6, U(s, 2) + .9));
    actor(780, 1100, 560, { tor: .2, shF: .5, shB: -.3, hipF: .2, hipB: -.15 }, HIKER); ctx.fillStyle = '#c03a2a'; rr(560, 1092, 460, 16, 8); ctx.fill(); check(780, 1550, 70, prog(t, U(s, 2) + .6, U(s, 2) + .9)); ttl('КАК ЛЫЖИ НА СНЕГУ', t, U(s, 2), '#fff', 104); },
  sfx(d, P, E, s) { return [[0, 'swoosh_up', .3], [U(s, 1), 'chime', .3], [U(s, 2), 'whoosh', .35], [U(s, 2) + .7, 'pop', .3]]; } };

// 32–33 — pull the legs out slowly, wiggling the feet: water seeps under them, the suction lets go
SC.legs = { draw(t, d, P, E, s) { const k = beat(t, s), up = k === 0 ? .15 * prog(t, 0, U(s, 1)) : .15 + .55 * eio(prog(t, U(s, 1), d - .2)), wg = Math.sin(t * 9) * .18;
    ctx.save(); camKeys(t, [[0, 600, 900, 1.25], [d, 600, 880, 1.3]], .2);
    bogSection(t, { SY: 700, hole: [640, 120], legs: SY => { const P0 = { rot: -1.5, tor: 0, hd: .1, ph: 6, hipF: lerp(-1.25, -.35, up) + wg * .3, knF: lerp(.2, .9, up), hipB: lerp(-1.15, -.3, up) - wg * .3, knB: lerp(.25, 1.0, up), shF: 2.6, elF: .2, shB: 2.4, elB: .3 }; actor(560, SY - 6, 560, P0, Object.assign({}, HIKER, { mudTo: 1, mudTop: .2 })); } });
    if (k === 1) for (let i = 0; i < 5; i++) { const xx = 600 + i * 30, yy = 1060 - ((t * 120 + i * 40) % 180); arrow(xx, yy, xx + 14, yy - 50, 'rgba(127,211,255,.9)', 6); }
    ctx.restore(); if (k === 0) { ttl('ПО САНТИМЕТРУ', t, 0); tag(Math.round(up / .7 * 40) + ' СМ', 860, 1200, prog(t, .3, .6), '#fff', 60); } else { ttl('ПРИСОСКА ОТПУСКАЕТ', t, U(s, 1), '#7fd3ff', 100); } vign(.35); },
  sfx(d, P, E, s) { return [[0, 'bubbles', .35, { dur: d }], [.6, 'squelch', .3], [2.0, 'squelch', .3], [U(s, 1), 'pour', .35], [U(s, 1) + .5, 'deflate', .4]]; } };

// 34–35 — the boot stays in the bog. So be it.
SC.boot = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { const q = eio(prog(t, .2, U(s, 1) - .2)); ctx.save(); camKeys(t, [[0, 600, 980, 2.0], [U(s, 1), 600, 960, 2.2]], .2); bogSection(t, { SY: 700, hole: [640, 120] });
      ctx.fillStyle = '#22261f'; ctx.save(); ctx.translate(640, 1180); ctx.rotate(.15); rr(-34, -120, 68, 150, 18); ctx.fill(); rr(-34, 10, 110, 40, 18); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(-26, -110, 8, 130); ctx.restore(); // the stuck boot
      ctx.save(); ctx.translate(640, 1150 - 380 * q); ctx.rotate(.15); ctx.fillStyle = '#454a36'; rr(-30, -420, 60, 330, 20); ctx.fill(); ctx.fillStyle = '#6a6058'; rr(-28, -100, 56, 120, 22); ctx.fill(); rr(-28, -10, 100, 40, 18); ctx.fill(); ctx.fillStyle = 'rgba(40,30,18,.6)'; rr(-28, -100, 56, 150, 22); ctx.fill(); ctx.restore(); // leg in a muddy sock sliding out
      ctx.restore(); vign(.4); ttl('САПОГ ОСТАЁТСЯ', t, 0); return; }
    ctx.save(); camKeys(t, [[U(s, 1) - .05, 540, 960, 1.9], [d, 540, 960, 1.7]], .2); bogTop(t, { hole: [540, 960, 110], free: [540, 960, 400] }); ctx.fillStyle = '#22261f'; ctx.beginPath(); ctx.ellipse(540, 950, 40, 30, .3, 0, 7); ctx.fill(); ctx.fillStyle = '#0e100c'; ctx.beginPath(); ctx.ellipse(540, 948, 28, 19, .3, 0, 7); ctx.fill(); ctx.restore(); vign(.4); ttl('ПУСТЬ', t, U(s, 1), '#fff', 150); },
  sfx(d, P, E, s) { return [[.3, 'squelch', .5], [1.2, 'squelch', .5], [U(s, 1) - .2, 'pop', .3]]; } };

// 36–38 — don't stand up: crawl back on your belly along your own tracks
SC.crawl = { draw(t, d, P, E, s) { const k = beat(t, s), trail = []; for (let i = 0; i < 12; i++) trail.push([540 + (i % 2 ? 40 : -40), 1200 + i * 150]);
    if (k < 2) { const t1 = k === 0 ? 0 : t - U(s, 1), roll = k === 0 ? eio(prog(t, .2, U(s, 1) - .1)) : 1, y = 900 + t1 * 90; ctx.save(); camKeys(t, [[0, 540, 960, 1.5], [d, 540, 960 + (d - U(s, 1)) * 90, 1.25]], .2); bogTop(t, { hole: [540, 760, 110], trail: k ? trail : null, free: [540, 1100, 700] });
      if (k === 1) { ctx.save(); ctx.globalAlpha = .5 + .3 * Math.sin(t * 5); ctx.strokeStyle = '#ffcf4a'; ctx.lineWidth = 6; for (const [tx, ty] of trail) { ctx.beginPath(); ctx.ellipse(tx, ty, 40, 54, 0, 0, 7); ctx.stroke(); } ctx.restore(); }
      heroTop(540, y, 1.7, t, { up: roll < .5 ? 1 : 0, rot: Math.PI, arms: k === 0 ? 1 - roll : 0, crawl: k ? t * 4 : null, mud: .8, bootLost: true }); ctx.restore(); vign(.35); ttl(k === 0 ? 'НЕ ВСТАЁШЬ' : 'НАЗАД ПО СВОИМ СЛЕДАМ', t, k ? U(s, 1) : 0, k ? '#ffcf4a' : '#fff', k ? 96 : 116); return; }
    const t2 = t - U(s, 2), x = 700 - t2 * 110; bogWorld(t, [[U(s, 2) - .05, 640, 1400, 1.5], [d, 560, 1400, 1.6]], { clear: [600, 400, 1500, 80], items: [[1500, () => { const c = Math.sin(t2 * 6); hiker(x, 1500, 560, { rot: 1.5, ph: 9, tor: 0, hd: -.9, hipF: .25 + .3 * c, knF: .7 + .5 * c, hipB: .25 - .3 * c, knB: .7 - .5 * c, shF: 2.75 + .35 * c, elF: .35, shB: 2.75 - .35 * c, elB: .35 }, { st: { flip: true, mudTo: 1, mudTop: .5, bootLostF: true } }); }]] }); vign(.4); ttl('ТАМ ТЕБЯ УЖЕ ДЕРЖАЛО', t, U(s, 2), '#fff', 100); },
  sfx(d, P, E, s) { const o = [[0, 'squelch', .4]]; for (let tt = U(s, 1); tt < d; tt += .55) o.push([tt, 'squelch', .3]); return o; } };

// 39–41 — ten metres, twenty — then a firm hummock and birch roots under the hand
SC.roots = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k < 2) { const y = 1000 + t * 80; ctx.save(); camKeys(t, [[0, 540, 1000, 1.3], [U(s, 2), 540, 1000 + U(s, 2) * 80, 1.3]], .2); bogTop(t, { seed: 33 }); heroTop(540, y, 1.6, t, { up: 0, rot: Math.PI, crawl: t * 4, mud: .9, bootLost: true }); ctx.restore(); vign(.35); label(k ? '20 М' : '10 М', 540, 820, 220, { weight: 900, color: '#ffcf4a' }); return; }
    const q = eout(prog(t, U(s, 2), U(s, 2) + .9)); ctx.save(); camKeys(t, [[U(s, 2) - .05, 540, 1000, 1.0], [d, 540, 1000, 1.12]], .2); ctx.fillStyle = '#5e6a30'; ctx.fillRect(-200, -200, W + 400, H + 400); hummock(540, 1300, 3.4, rnd(77), t);
    ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 120; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(760, 1250); ctx.lineTo(820, -200); ctx.stroke(); ctx.fillStyle = '#2a2622'; for (let i = 0; i < 8; i++) ctx.fillRect(722 + i * 4, 1100 - i * 170, 70, 16); // birch trunk
    ctx.strokeStyle = '#5a4630'; ctx.lineWidth = 26; for (const [a, b, c2, e] of [[740, 1240, 520, 1320], [780, 1260, 980, 1380], [700, 1220, 400, 1200]]) { ctx.beginPath(); ctx.moveTo(a, b); ctx.quadraticCurveTo((a + c2) / 2, b + 70, c2, e); ctx.stroke(); } // roots over the hummock
    helpHand(lerp(300, 520, q), lerp(1700, 1330, q), .9, 1, lerp(.2, .6, q), lerp(.2, .85, prog(t, U(s, 2) + .6, U(s, 2) + 1.1)), { sleeve: '#4a4e34', skin: '#c99c7c', rot: -.5 }); ctx.fillStyle = 'rgba(40,30,18,.45)'; ctx.beginPath(); ctx.ellipse(lerp(300, 520, q) - 40, lerp(1700, 1330, q) + 80, 90, 60, -.5, 0, 7); ctx.fill();
    ctx.restore(); warmGrade(.12); vign(.35); ttl('КОРНИ БЕРЁЗЫ', t, U(s, 2), '#5ce065'); },
  sfx(d, P, E, s) { return [[0, 'squelch', .35], [.6, 'squelch', .3], [U(s, 1), 'pop', .3], [U(s, 2) + .8, 'thud_soft', .45], [U(s, 2) + .9, 'creak', .25]]; } };

// 42–43 — muddy, one boot missing — but alive
SC.alive = { draw(t, d, P, E, s) { const k = beat(t, s), br = Math.sin(t * 3.4);
    bogWorld(t, k === 0 ? [[0, 560, 1330, 2.0], [U(s, 1), 560, 1330, 2.2]] : [[U(s, 1) - .05, 600, 1260, 1.5], [d, 640, 1200, 1.0]], { eve: 1, sunX: 760, clear: [560, 340, 1500, 90], items: [[1500, () => { hummock(560, 1500, 1.3, rnd(5), t); deadBirch(720, 1500, 900, rnd(9)); actor(540, 1478, 560, { tor: .35 + .03 * br, hd: .15, hipF: 1.7, knF: 1.9, hipB: 1.5, knB: 1.2, shF: .5, elF: -.4, shB: .3, elB: .9, ph: 18, mouth: .3 + .2 * Math.abs(br) }, Object.assign({}, HIKER, { mudTo: 1, mudTop: .6, bootLostF: true })); }]] }); warmGrade(.22); vign(.45);
    if (k === 0) ttl('ВЕСЬ В ГРЯЗИ', t, 0); else ttl('НО ЖИВОЙ', t, U(s, 1), '#5ce065', 140); },
  sfx(d, P, E, s) { return [[0, 'swamp', .4, { dur: d }], [U(s, 1), 'pad_swell', .35, { dur: d - U(s, 1) }]]; } };

// 44–46 — Denmark: a man pulled out of a bog, face, stubble, wrinkles intact — 2400 years
SC.denmark = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { ctx.save(); camKeys(t, [[0, 540, 960, 1.0], [U(s, 1), 540, 1000, 1.12]], .2); peatBed(t); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, 700); ctx.fillStyle = '#6a7a50'; ctx.fillRect(-200, 560, W + 400, 60); for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(20,12,4,.4)'; ctx.fillRect(-200, 700 + i * 200, W + 400, 6); }
      const p = prog(t, .6, 1.8); ctx.save(); ctx.globalAlpha = p; bogMan(600, 1250, 1.3, t); ctx.restore(); ctx.save(); ctx.globalAlpha = 1 - p * .7; ctx.fillStyle = '#3a2814'; ctx.fillRect(380, 1050, 480, 400); ctx.restore(); // peat brushed away
      poleDraw(160, 300, 330, 980, 14); ctx.fillStyle = '#9aa0a4'; ctx.beginPath(); ctx.moveTo(300, 960); ctx.lineTo(370, 990); ctx.lineTo(350, 1080); ctx.lineTo(280, 1050); ctx.closePath(); ctx.fill(); ctx.restore(); // spade
      vign(.45); ttl('ДАНИЯ, 1950', t, 0); return; }
    if (k === 1) { const t1 = t - U(s, 1), fx = [[620, 1000, 1.9], [830, 1000, 2.6], [820, 870, 2.6], [740, 760, 2.6]]; const j = Math.min(3, Math.floor(t1 / ((U(s, 2) - U(s, 1)) / 4))); ctx.save(); camKeys(t, [[U(s, 1) - .05, fx[0][0], fx[0][1], fx[0][2]], [U(s, 1) + .9, fx[1][0], fx[1][1], fx[1][2]], [U(s, 1) + 1.9, fx[2][0], fx[2][1], fx[2][2]], [U(s, 2), fx[3][0], fx[3][1], fx[3][2]]], .1); peatBed(t); bogMan(600, 1000, 2.4, t); ctx.restore(); vign(.5);
      ttl(['ЛИЦО', 'ЩЕТИНА', 'ЩЕТИНА', 'МОРЩИНЫ НА ЛБУ'][j], t, U(s, 1) + j * ((U(s, 2) - U(s, 1)) / 4), '#ffcf4a'); return; }
    ctx.save(); camKeys(t, [[U(s, 2) - .05, 600, 1000, 1.3], [d, 600, 1000, 1.1]], .1); peatBed(t); bogMan(600, 1000, 2.2, t); ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, W, H); const n = Math.round(2400 * eout(prog(t, U(s, 2) + .2, U(s, 2) + 1.6)));
    label(String(n), 540, 1000, 260, { weight: 900, color: '#ffcf4a' }); label('ЛЕТ', 540, 1180, 120, { weight: 900, color: '#fff' }); vign(.4); },
  sfx(d, P, E, s) { return [[0, 'faraway', .25, { dur: d }], [.3, 'sand', .35, { dur: 1.4 }], [U(s, 1), 'shimmer', .3], [U(s, 2) + .2, 'ticks', .4, { dur: 1.4 }], [U(s, 2) + 1.6, 'boom', .4]]; } };

// 47–49 — the bog keeps everything; so you don't stand up — you lie down (loops to the hook)
SC.final = { draw(t, d, P, E, s) { const k = beat(t, s);
    if (k === 0) { bogWorld(t, [[0, 700, 1300, 1.6], [U(s, 1), 720, 1300, 1.9]], { eve: 1, sunX: 300, mist: .8, clear: [760, 420, 1300, 110], under: () => { bogWindow(760, 1300, 300, .6, t); for (let i = 0; i < 7; i++) { const p = ((t * .7 + i * .37) % 1), bx = 700 + ((i * 53) % 140); ctx.strokeStyle = `rgba(230,250,220,${.8 * (1 - p)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, 1300, 6 + 30 * p, 0, 7); ctx.stroke(); } } }); warmGrade(.2); vign(.5); ttl('БОЛОТО ХРАНИТ ВСЁ', t, 0); return; }
    if (k === 1) { bogWorld(t, [[U(s, 1) - .05, 560, 1250, 1.4], [U(s, 2), 560, 1260, 1.6]], { eve: 1, sunX: 820, clear: [560, 300, 1500, 80], items: [[1500, () => hiker(560, 1500, 560, { tor: .05, hd: -.1 }, { st: { mudTo: 1, mudTop: .6, bootLostF: true } })]] }); warmGrade(.25); vign(.5); ttl('ТЫ НЕ ВСТАЁШЬ', t, U(s, 1)); return; }
    ctx.save(); camKeys(t, [[U(s, 2) - .05, 540, 960, 1.5], [d, 540, 960, 2.3]], .2); bogTop(t, { free: [540, 960, 420] }); heroTop(540, 900, 2.6, t, { arms: 1, sink: .55 }); ctx.restore(); warmGrade(.15); vign(.4); ttl('ТЫ ЛОЖИШЬСЯ', t, U(s, 2), '#ffcf4a', 130); },
  sfx(d, P, E, s) { return [[0, 'bubbles', .4, { dur: U(s, 1) }], [0, 'swamp', .3, { dur: d }], [U(s, 2), 'dundun', .5]]; } };

window.render = function (t) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#050403'; ctx.fillRect(0, 0, W, H); _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; drawTransition(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; filmGrain(t); drawSubs(t); };
