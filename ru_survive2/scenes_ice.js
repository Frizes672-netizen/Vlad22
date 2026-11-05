// ===== Short (RU, EN-ready): "ВЫЖИВЕТЕ? — Выпуск 2: провалились под лёд" (helpers from episode 1 are loaded before this file) =====
const WALKER = (o = {}) => Object.assign({ top: '#2f3b4a', pants: '#2a2f3a', hair: '#3a2618', cap: '#7a1f2a', light: 1, skin: '#e6b99c', shoe: '#1a1a1a' }, o);
const ICEC = '#dfeaf2', ICE_D = '#9fb8c8', HOLE = '#06121c';
const SH = 1000; // ice surface height in the cross-section views

// ---------- winter river ----------
function riverWinterDraw() { ctx.fillStyle = grad(0, 0, 0, 760, [[0, '#9fb3c8'], [1, '#e4ebf1']]); ctx.fillRect(0, 0, W, 760); glow(760, 260, 360, 'rgba(255,250,235,.55)');
  ctx.fillStyle = '#2c3a34'; ctx.beginPath(); ctx.moveTo(0, 700); for (let x = 0; x <= W; x += 30) ctx.lineTo(x, 640 - Math.abs(Math.sin(x * .05)) * 60 - Math.abs(Math.sin(x * .013)) * 50); ctx.lineTo(W, 720); ctx.lineTo(0, 720); ctx.closePath(); ctx.fill(); // far forest
  ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 650 - Math.abs(Math.sin(x * .05)) * 60); ctx.lineTo(x + 12, 664 - Math.abs(Math.sin(x * .05)) * 50); ctx.lineTo(x - 12, 664 - Math.abs(Math.sin(x * .05)) * 50); ctx.closePath(); ctx.fill(); } // snow on the tree tops
  ctx.fillStyle = grad(0, 720, 0, H, [[0, '#cfdde8'], [.5, '#e8eff5'], [1, '#f6f9fb']]); ctx.fillRect(0, 720, W, H - 720); // ice field
  const R = rnd(6); for (let i = 0; i < 26; i++) { const y = 740 + Math.pow(R(), 1.6) * 1180, s = (y - 700) / 1200; ctx.fillStyle = `rgba(150,180,200,${.18 + R() * .15})`; ctx.beginPath(); ctx.ellipse(R() * W, y, 140 * s + 20, 10 * s + 3, 0, 0, 7); ctx.fill(); } // blue patches of bare ice
  for (let i = 0; i < 40; i++) { const y = 740 + Math.pow(R(), 1.4) * 1180, s = (y - 700) / 1200; ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.ellipse(R() * W, y, 90 * s + 10, 14 * s + 2, 0, 0, 7); ctx.fill(); } // snow drifts
  ctx.fillStyle = '#5a3a28'; rr(820, 708, 50, 34, 4); ctx.fill(); ctx.fillStyle = '#1b1e22'; ctx.fillRect(860, 724, 4, 18); } // a fisherman's box far away
function iceCracks(cx, cy, k, seed = 7, spread = 1) { if (k <= 0) return; const R = rnd(seed); for (let i = 0; i < 12; i++) { const a = -Math.PI * (.05 + R() * .9); let x = cx, y = cy; const pts = [[x, y]]; for (let q = 0; q < 7; q++) { x += Math.cos(a + (R() - .5) * .8) * 120 * k * spread; y += Math.sin(a + (R() - .5) * .8) * 60 * k; pts.push([x, y]); }
    for (const [lw, col] of [[9, 'rgba(40,80,110,.55)'], [3, 'rgba(255,255,255,.95)']]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); } } }
function breath(t, x, y, rate = 1.6, a = .5) { for (let i = 0; i < 3; i++) { const q = (t * rate + i / 3) % 1; ctx.fillStyle = `rgba(240,246,255,${a * (1 - q)})`; ctx.beginPath(); ctx.arc(x + q * 80, y - q * 140, 30 + q * 90, 0, 7); ctx.fill(); } }
function mitten(x, y, s, rot, col = '#8a1f2a') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); // a knitted mitten gripping the ice edge
  ctx.fillStyle = grad(-80, 0, 80, 0, [[0, '#1f2833'], [.5, '#2f3b4a'], [1, '#1a222c']]); rr(-80, 40, 160, 600, 60); ctx.fill(); ctx.fillStyle = '#d9d2c2'; rr(-86, 20, 172, 60, 24); ctx.fill(); // sleeve + cuff
  ctx.fillStyle = grad(-90, -120, 90, 40, [[0, shade(col, 1.25)], [1, shade(col, .7)]]); ctx.beginPath(); ctx.moveTo(-80, 40); ctx.bezierCurveTo(-110, -60, -70, -150, 0, -150); ctx.bezierCurveTo(70, -150, 105, -60, 80, 40); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-92, -20, 30, 50, -.5, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-70 + i * 28, 30); ctx.lineTo(-60 + i * 24, -130); ctx.stroke(); } // knit
  ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(-70 + i * 16, -150 + (i % 3) * 6, 6, 0, 7); ctx.fill(); } ctx.restore(); } // snow on it
function underIce(t, k = 0) { bg('#0a2a3a', '#010608'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgrad(540, 260, 20, 600, [[0, 'rgba(200,235,255,.75)'], [.4, 'rgba(120,190,220,.25)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, W, 1200);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = grad(0, 260, 0, 1500, [[0, 'rgba(160,220,240,.18)'], [1, 'rgba(160,220,240,0)']]); ctx.beginPath(); ctx.moveTo(470 + i * 25, 260); ctx.lineTo(520 + i * 25, 260); ctx.lineTo(300 + i * 90 + Math.sin(t + i) * 30, 1500); ctx.lineTo(220 + i * 90, 1500); ctx.closePath(); ctx.fill(); } ctx.restore();
  ctx.fillStyle = 'rgba(200,225,240,.18)'; ctx.fillRect(0, 230, W, 50); ctx.fillStyle = HOLE; ctx.beginPath(); ctx.ellipse(540, 255, 170, 40, 0, 0, 7); ctx.fill(); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(220,245,255,.8)'; ctx.beginPath(); ctx.ellipse(540, 255, 160, 34, 0, 0, 7); ctx.fill(); ctx.restore(); // the hole above, glowing
  bubbles(t, 540, 1300, 30, 4, 500); }
function crossSection(t, o = {}) { // side cut: air + snow above, ice slab with the hole on the left, dark water below
  ctx.fillStyle = grad(0, 0, 0, SH, [[0, '#9fb3c8'], [1, '#e4ebf1']]); ctx.fillRect(0, 0, W, SH); ctx.fillStyle = '#2c3a34'; ctx.beginPath(); ctx.moveTo(0, 820); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 760 - Math.abs(Math.sin(x * .04)) * 70); ctx.lineTo(W, SH); ctx.lineTo(0, SH); ctx.closePath(); ctx.fill();
  ctx.fillStyle = grad(0, SH, 0, H, [[0, '#2f6f86'], [.4, '#123848'], [1, '#03121a']]); ctx.fillRect(0, SH, W, H - SH);
  const edge = o.edge ?? 520; ctx.fillStyle = grad(0, SH - 50, 0, SH + 30, [[0, '#ffffff'], [.4, ICEC], [1, ICE_D]]); ctx.beginPath(); ctx.moveTo(edge, SH - 50); ctx.lineTo(W + 40, SH - 50); ctx.lineTo(W + 40, SH + 30); ctx.lineTo(edge + 12, SH + 30); ctx.lineTo(edge - 6, SH - 8); ctx.closePath(); ctx.fill(); // ice slab
  ctx.fillStyle = '#ffffff'; ctx.fillRect(edge, SH - 70, W - edge + 40, 22); ctx.fillStyle = grad(0, SH - 50, 0, SH + 30, [[0, '#ffffff'], [1, ICE_D]]); ctx.fillRect(-40, SH - 50, 140, 80); // snow on top; far edge of the hole on the left
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 4; ctx.beginPath(); for (let x = 100; x < edge; x += 20) ctx.lineTo(x, SH - 6 + Math.sin(x * .05 + t * 4) * 5); ctx.stroke(); } // water line in the hole
function iceChunk(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = grad(0, -40, 0, 40, [[0, '#ffffff'], [1, ICE_D]]); ctx.beginPath(); ctx.moveTo(-70, -30); ctx.lineTo(60, -40); ctx.lineTo(80, 20); ctx.lineTo(-50, 40); ctx.closePath(); ctx.fill(); ctx.restore(); }
function topDown(t, o = {}) { // seen from above: snow-covered ice, the dark hole, your own footprints leading back to the shore
  ctx.fillStyle = grad(0, 0, W, H, [[0, '#e9f0f5'], [1, '#cfdde8']]); ctx.fillRect(0, 0, W, H); const R = rnd(9); for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(150,180,200,${.12 + R() * .12})`; ctx.beginPath(); ctx.ellipse(R() * W, R() * H, 60 + R() * 160, 20 + R() * 50, R() * 3, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#2c3a34'; ctx.beginPath(); ctx.moveTo(W, 1500); ctx.quadraticCurveTo(800, 1700, 700, H); ctx.lineTo(W, H); ctx.closePath(); ctx.fill(); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#1f2c26'; ctx.beginPath(); ctx.arc(820 + i * 50, 1720 + (i % 2) * 60, 50, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(812 + i * 50, 1710 + (i % 2) * 60, 26, 0, 7); ctx.fill(); } // the shore
  for (let i = 0; i < 14; i++) { const q = i / 13, x = lerp(500, 880, q) + Math.sin(q * 5) * 30, y = lerp(780, 1600, q), side = i % 2 ? 1 : -1; ctx.save(); ctx.translate(x + side * 18, y); ctx.rotate(-.45); ctx.fillStyle = 'rgba(120,150,170,.55)'; ctx.beginPath(); ctx.ellipse(0, 0, 14, 28, 0, 0, 7); ctx.fill(); ctx.restore(); } // footprints
  ctx.fillStyle = HOLE; ctx.beginPath(); for (let k = 0; k < 18; k++) { const a = k / 18 * 6.28, r = 150 + (k % 3) * 18; ctx.lineTo(450 + Math.cos(a) * r, 640 + Math.sin(a) * r * .8); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 6; ctx.stroke();
  if (o.arrow > 0) { ctx.save(); ctx.globalAlpha = clamp(o.arrow); ctx.strokeStyle = '#22b357'; ctx.lineWidth = 16; ctx.setLineDash([30, 18]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(500, 760); ctx.quadraticCurveTo(700, 1100, 860, 1500); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } }

function stepBadge(n, txt, p) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(540, 300); ctx.scale(k, k); ctx.font = `900 66px ${F_HEAD}`; let fs = 66; const tw0 = ctx.measureText(txt).width; if (tw0 > 520) fs = Math.floor(66 * 520 / tw0); ctx.font = `900 ${fs}px ${F_HEAD}`; const tw = ctx.measureText(txt).width, bw = tw + 190;
  ctx.fillStyle = 'rgba(8,12,18,.82)'; rr(-bw / 2, -70, bw, 140, 70); ctx.fill(); ctx.fillStyle = OKG; ctx.beginPath(); ctx.arc(-bw / 2 + 70, 0, 52, 0, 7); ctx.fill(); label(String(n), -bw / 2 + 70, 22, 64, { weight: 900 }); label(txt, -bw / 2 + 140, fs * .36, fs, { align: 'left', weight: 900 }); ctx.restore(); } // fits long Russian words
// ================== SCENES ==================
SC.hook = { // FRAME 0: first person on the river ice — a crack races towards us, and we drop through into black water
  draw(t, d, P, E, s) { const tc = .35, tf = 1.35;
    if (t < tf) { const bob = Math.sin(t * 9) * 10, k = prog(t, tc, tf); ctx.save(); shake(t, t > tc ? 6 + 18 * k : 0); ctx.translate(0, bob + k * 120); ctx.drawImage(layer('winter', riverWinterDraw, 1), 0, 0); iceCracks(540, 1700, eout(k) * 2.2, 7, 1.5); iceCracks(540, 1700, eout(k) * 1.5, 11, 1); iceCracks(540, 1700, eout(k) * 1.0, 19, .7); ctx.restore();
      mitten(160, 1880 + bob * .5, 1.0, .25); mitten(920, 1880 - bob * .5, 1.0, -.25); breath(t, 540, 1000, 1.2, .35); bigTitle(L('UNDER THE ICE', 'ПОД ЛЁД'), 300, prog(t, 0, .15), { size: 120, col: '#fff', glow: 'rgba(80,200,255,.6)' }); return; }
    const q = prog(t, tf, d); underIce(t); if (q < .2) { ctx.fillStyle = `rgba(255,255,255,${.85 * (1 - q * 5)})`; ctx.fillRect(0, 0, W, H); } ctx.save(); shake(t, 8 * (1 - q)); bubbles(t * 2, 540, 1700, 40, 12, 900); ctx.restore();
    bigTitle(L('NOT THE COLD', 'НЕ ХОЛОД'), 300, prog(t, E(L('cold', 'холод'), 1, d - 1) - .1, E(L('cold', 'холод'), 1, d - 1) + .15), { size: 120, col: YEL2 }); },
  sfx(d) { return [[0, 'wind', .35, { dur: d }], [.35, 'glass', .55], [.6, 'creak', .5], [1.3, 'shatter', .4], [1.35, 'boom', .5], [1.35, 'pour', .5], [1.4, 'drone', .35, { dur: d - 1.4 }], [1.45, 'bubble_pop', .4]]; }
};
SC.shock = { // "Ледяная вода выбивает воздух из груди. Первую минуту вы будете задыхаться."
  draw(t, d, P, E, s) { ctx.save(); shake(t, 5); ctx.drawImage(layer('winter', riverWinterDraw, 2), 0, -260); ctx.fillStyle = HOLE; ctx.fillRect(0, 1250, W, H); waterBody(1250, t, { c1: '#1c4a5a', c2: '#0a2430', c3: '#02090d' });
    ctx.fillStyle = grad(0, 1180, 0, 1270, [[0, '#ffffff'], [1, ICE_D]]); ctx.beginPath(); ctx.moveTo(-20, 1190); for (let x = 0; x <= W + 20; x += 60) ctx.lineTo(x, 1180 + (x % 120 ? 14 : -8)); ctx.lineTo(W + 20, 1270); ctx.lineTo(-20, 1270); ctx.closePath(); ctx.fill(); // the ice edge right in front of us
    mitten(260, 1330, 1.0, .1); mitten(820, 1330, 1.0, -.1); ctx.restore(); breath(t, 520, 1050, 3.2, .55); breath(t + .3, 560, 1000, 3.2, .4);
    const t2 = s.U(s.a + 1); bigTitle(t < t2 - .05 ? L('NO AIR', 'НЕТ ВОЗДУХА') : L('1 MINUTE OF GASPING', 'МИНУТА УДУШЬЯ'), 300, t < t2 - .05 ? prog(t, 0, .2) : prog(t, t2 - .05, t2 + .2), { size: t < t2 - .05 ? 120 : 84, col: '#fff' }); },
  sfx(d) { return [[0, 'heartbeat', .4, { dur: d }], [0, 'wind', .3, { dur: d }], [.2, 'whisper', .3], [1.2, 'whisper', .3]]; }
};
SC.breathe = { // "Не паникуйте. Дышите. Эта минута пройдёт."
  draw(t, d, P, E, s) { bg('#0f2a3a', '#050f16'); glow(540, 820, 800, 'rgba(120,220,255,.2)'); const br = .5 + .5 * Math.sin(t * 2.2);
    ctx.strokeStyle = 'rgba(160,230,255,.85)'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(540, 860, 180 + br * 120, 0, 7); ctx.stroke(); ctx.fillStyle = 'rgba(160,230,255,.12)'; ctx.beginPath(); ctx.arc(540, 860, 180 + br * 120, 0, 7); ctx.fill(); label(br > .5 ? L('INHALE', 'ВДОХ') : L('EXHALE', 'ВЫДОХ'), 540, 880, 70, { weight: 900, color: '#e8f8ff' });
    const left = Math.max(0, 60 - prog(t, 0, d) * 60); timer60(left, 540, 1220); bigTitle(t < s.U(s.a + 1) - .05 ? L("DON'T PANIC", 'НЕ ПАНИКОВАТЬ') : L('BREATHE', 'ДЫШИТЕ'), 300, t < s.U(s.a + 1) - .05 ? prog(t, 0, .2) : prog(t, s.U(s.a + 1) - .05, s.U(s.a + 1) + .2), { size: 100, col: YEL2 }); },
  sfx(d) { return [[0, 'pad_swell', .3, { dur: d }], [.3, 'whisper', .25], [1.7, 'whisper', .25]]; }
};
SC.choice = { // "А дальше — выбор. Карабкаться на лёд руками — или держаться за край и ждать помощи? У вас три секунды." + 3 s
  draw(t, d, P, E, s) { const tb = E(L('climb', 'карабкаться'), 1, 1.2), tr = E(L('wait', 'ждать'), 1, 2.6), ts = E(L('seconds', 'секунды'), 1, d - 3.3) + .25;
    ctx.drawImage(layer('winter', riverWinterDraw, 2), 0, -260); ctx.fillStyle = HOLE; ctx.fillRect(0, 1250, W, H); waterBody(1250, t, { c1: '#1c4a5a', c2: '#0a2430', c3: '#02090d' }); mitten(260, 1330, 1.0, .1); mitten(820, 1330, 1.0, -.1); grade('rgba(10,20,30,1)', .35, 'source-over'); breath(t, 540, 1050, 2, .35);
    const e = t - ts, ph = Math.sin(t * 7); choiceBtn(290, 1120, 460, L('CLIMB OUT', 'КАРАБКАТЬСЯ'), '#e08a1e', prog(t, tb - .1, tb + .2), { pulse: e > 0 ? 1 + .05 * Math.max(0, ph) : 1, fs: .3 }); choiceBtn(790, 1120, 460, L('WAIT FOR HELP', 'ЖДАТЬ ПОМОЩИ'), '#2f7de1', prog(t, tr - .1, tr + .2), { pulse: e > 0 ? 1 + .05 * Math.max(0, -ph) : 1, fs: .3 });
    if (e > 0) { const left = Math.max(0, 3 - e), n = Math.max(1, Math.ceil(left)); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, 470); dayRing(540, 300, 105, left / 3, YEL2); bigNum(String(n), 540, 300, 150, '#fff', { glow: 'rgba(255,210,80,.8)' }); }
    else bigTitle(L('YOUR MOVE', 'ВАШ ВЫБОР'), 300, prog(t, 0, .2), { size: 110, col: YEL2 }); },
  sfx(d, P, E) { const ts = E(L('seconds', 'секунды'), 1, d - 3.3) + .25; return [[E(L('climb', 'карабкаться'), 1, 1.2) - .1, 'pop', .35], [E(L('wait', 'ждать'), 1, 2.6) - .1, 'pop', .35], [ts, 'tick', .55], [ts + 1, 'tick', .55], [ts + 2, 'tick', .55], [ts, 'heartbeat', .35, { dur: 3 }]]; }
};
SC.neither = { // "Ни то, ни другое."
  draw(t) { ctx.drawImage(layer('winter', riverWinterDraw, 2), 0, -260); ctx.fillStyle = HOLE; ctx.fillRect(0, 1250, W, H); grade('rgba(10,20,30,1)', .5, 'source-over'); ctx.save(); shake(t, t < .3 ? 12 : 0);
    choiceBtn(290, 1120, 460, L('CLIMB OUT', 'КАРАБКАТЬСЯ'), '#e08a1e', 1, { fs: .3 }); choiceBtn(790, 1120, 460, L('WAIT FOR HELP', 'ЖДАТЬ ПОМОЩИ'), '#2f7de1', 1, { fs: .3 }); xMark(290, 1120, 110, prog(t, .05, .3)); xMark(790, 1120, 110, prog(t, .12, .37)); ctx.restore();
    bigTitle(L('NEITHER', 'НИ ТО, НИ ДРУГОЕ'), 600, prog(t, 0, .15), { size: L(150, 100), col: '#ff4d57', glow: 'rgba(255,40,50,.6)' }); },
  sfx() { return [[0, 'stamp', .55], [.05, 'boom', .35]]; }
};
SC.fail = { // the thin edge keeps breaking under your arms; ~10 minutes before the hands stop working
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { const cyc = (t % 1.1) / 1.1, edge = 520 - Math.floor(t / 1.1) * 40; crossSection(t, { edge }); ctx.save(); ctx.translate(edge - 60, SH + 720); person(0, 0, 900, WALKER({ armUp: .9 + .1 * Math.sin(cyc * 6), fear: .9, shadow: false })); ctx.restore();
      if (cyc > .55) { const q = prog(cyc, .55, 1); iceChunk(edge + 40, SH - 10 + q * 260, 1, q * 2); } ctx.fillStyle = grad(0, SH, 0, H, [[0, 'rgba(20,70,90,.55)'], [1, 'rgba(3,15,22,.92)']]); ctx.fillRect(0, SH, W, H - SH); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 4; ctx.beginPath(); for (let x = 0; x < edge; x += 20) ctx.lineTo(x, SH - 4 + Math.sin(x * .05 + t * 4) * 5); ctx.stroke(); bubbles(t, edge - 100, SH + 500, 10, 5, 200);
      bigTitle(L('IT KEEPS BREAKING', 'ЛЁД ЛОМАЕТСЯ'), 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    bg('#0f2a3a', '#050f16'); const q = prog(t, t2, d), hx = v => Math.round(v).toString(16).padStart(2, '0'); mitten(540, 1180, 1.6, 0, '#' + hx(lerp(138, 90, q)) + hx(lerp(31, 110, q)) + hx(lerp(42, 170, q))); for (let i = 0; i < 18; i++) { const R = rnd(i + 3); ctx.fillStyle = 'rgba(200,230,255,.6)'; ctx.fillRect(R() * W, R() * H, 4, 4); } // the hand freezing
    ctx.fillStyle = 'rgba(8,10,16,.75)'; rr(350, 280, 380, 160, 40); ctx.fill(); const sec = Math.max(0, 600 - q * 40); label(String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(Math.floor(sec % 60)).padStart(2, '0'), 540, 400, 120, { weight: 900, color: '#9fd3ff', font: MONO }); label(L('MINUTES LEFT', 'МИНУТ ДО ОНЕМЕНИЯ'), 540, 480, 44, { weight: 900, color: '#9fd3ff' }); bigTitle(L('≈ 10 MINUTES', '≈ 10 МИНУТ'), 620, prog(t, t2, t2 + .2), { size: 110, col: YEL2 }); },
  sfx(d, P, E, s) { return [0, 1.1, 2.2, 3.3].filter(x => x < s.U(s.a + 1)).map(x => [x + .6, 'shatter', .35]).concat([[s.U(s.a + 1), 'clock', .4, { dur: d - s.U(s.a + 1) }]]); }
};
SC.turn = { // "Развернитесь туда, откуда пришли — там лёд вас уже выдержал."
  draw(t, d) { topDown(t, { arrow: prog(t, .4, 1.2) }); ctx.save(); ctx.translate(450, 640); ctx.rotate(lerp(-2.4, -.55, eio(prog(t, .2, 1)))); ctx.fillStyle = '#2f3b4a'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 45, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#7a1f2a'; ctx.beginPath(); ctx.arc(0, -60, 34, 0, 7); ctx.fill(); ctx.restore(); // head + shoulders in the hole, turning
    stepBadge(1, L('TURN AROUND', 'РАЗВЕРНУТЬСЯ'), prog(t, 0, .2)); label(L('THE ICE HELD YOU HERE', 'ЗДЕСЬ ЛЁД ВЫДЕРЖАЛ'), 700, 1220, 46, { weight: 900, color: '#1f7a3a', alpha: prog(t, 1, 1.4) }); },
  sfx() { return [[.2, 'swoosh', .35], [1, 'chime', .3]]; }
};
SC.kick = { // "Руки — на лёд. Работайте ногами, как будто плывёте, пока тело не ляжет горизонтально."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), k = eio(prog(t, t2, d - .2)); crossSection(t, { edge: 520 }); ctx.save(); ctx.translate(lerp(470, -330, k), lerp(SH + 780, SH + 10, k)); ctx.rotate(k * Math.PI / 2); personSide(0, 0, 900, WALKER({ walk: t * 14 * (t > t2 ? 1 : .2), shadow: false, noShadow: true })); ctx.restore();
    ctx.fillStyle = grad(0, SH, 0, H, [[0, 'rgba(20,70,90,.5)'], [1, 'rgba(3,15,22,.9)']]); ctx.fillRect(0, SH, W, H - SH); if (t > t2) for (let i = 0; i < 4; i++) { ctx.strokeStyle = 'rgba(220,245,255,.5)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(lerp(380, 60, k) + i * 10, lerp(SH + 1200, SH + 60, k), 30 + ((t * 3 + i * .25) % 1) * 60, 0, 7); ctx.stroke(); } // kick swirls
    stepBadge(2, t < t2 - .05 ? L('ARMS ON THE ICE', 'РУКИ НА ЛЁД') : L('KICK — LIE FLAT', 'ЛЕЧЬ ГОРИЗОНТАЛЬНО'), prog(t, 0, .2)); },
  sfx(d, P, E, s) { return [[s.U(s.a + 1), 'pour', .35], [s.U(s.a + 1) + .8, 'pour', .3]]; }
};
SC.seal = { // "И выползайте на живот — как тюлень."
  draw(t, d) { const k = eout(prog(t, .1, d - .1)); crossSection(t, { edge: 520 }); ctx.save(); ctx.translate(lerp(-330, 140, k), SH - 30 - Math.sin(k * Math.PI) * 30); ctx.rotate(Math.PI / 2); personSide(0, 0, 900, WALKER({ walk: t * 6, shadow: false })); ctx.restore(); ctx.fillStyle = 'rgba(10,40,55,.3)'; ctx.fillRect(0, SH, W, H - SH);
    stepBadge(3, L('SLIDE OUT', 'ВЫПОЛЗТИ'), prog(t, 0, .2)); label(L('LIKE A SEAL', 'КАК ТЮЛЕНЬ'), 540, 1300, 80, { weight: 900, color: '#fff', alpha: prog(t, .5, .8) }); },
  sfx() { return [[.1, 'whoosh', .3], [.5, 'pour', .3]]; }
};
SC.roll = { // "На ноги не вставать. Откатитесь и ползите к берегу по своим следам."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { crossSection(t, { edge: 520 }); ctx.save(); ctx.translate(140, SH - 30); ctx.rotate(Math.PI / 2); personSide(0, 0, 900, WALKER({ shadow: false })); ctx.restore(); iceCracks(640, SH - 40, .5 + .1 * Math.sin(t * 10), 3, .6); ctx.fillStyle = 'rgba(10,40,55,.3)'; ctx.fillRect(0, SH, W, H - SH);
      xMark(540, 650, 110, prog(t, .1, .4)); label(L("DON'T STAND UP", 'НЕ ВСТАВАТЬ'), 540, 820, 80, { weight: 900, color: '#ff4d57' }); return; }
    const q = prog(t, t2, d); topDown(t, { arrow: 1 }); const x = lerp(560, 860, eio(q)), y = lerp(820, 1500, eio(q)); ctx.save(); ctx.translate(x, y); ctx.rotate(-.5 + (q < .3 ? q * 20 : 0)); person(0, 0, 420, WALKER({ shadow: false, armUp: .6 + .3 * Math.sin(t * 8) })); ctx.restore();
    stepBadge(4, L('ROLL AWAY', 'ОТКАТИТЬСЯ'), prog(t, t2, t2 + .2)); label(L('CRAWL ALONG YOUR TRACKS', 'ПОЛЗКОМ ПО СЛЕДАМ'), 540, 470, 50, { weight: 900, color: '#1f7a3a', alpha: prog(t, t2 + .6, t2 + 1) }); },
  sfx(d, P, E, s) { return [[.1, 'soft_x', .4], [s.U(s.a + 1), 'swoosh', .3], [s.U(s.a + 1) + .5, 'steps', .25, { dur: 1.6 }]]; }
};
const ICE_RULE = () => [[L('TURN', 'РАЗВЕРНУТЬСЯ'), (x, y, s, c) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = c || '#fff'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(0, 0, 45, -2.6, 1.6); ctx.stroke(); ctx.fillStyle = c || '#fff'; ctx.beginPath(); ctx.moveTo(10, 40); ctx.lineTo(-20, 60); ctx.lineTo(-10, 25); ctx.closePath(); ctx.fill(); ctx.restore(); }],
  [L('LIE FLAT', 'ЛЕЧЬ'), (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-50, 0, 18, 0, 7); ctx.fill(); rr(-30, -14, 90, 28, 12); ctx.fill(); ctx.restore(); }], [L('SLIDE OUT', 'ВЫПОЛЗТИ'), iconUp], [L('ROLL AWAY', 'ОТКАТИТЬСЯ'), (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#fff'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, 0, 40, 0, 5); ctx.stroke(); ctx.restore(); }]];
SC.rule = { // "Развернуться. Лечь. Выползти. Откатиться."
  draw(t, d, P, E, s) { bg('#0b2a33', '#041015'); glow(540, 900, 900, 'rgba(80,220,255,.2)');
    ICE_RULE().forEach(([txt, ic], i) => { const ti = s.U(s.a + i) - s.U(s.a), p = prog(t, ti - .05, ti + .2); if (p <= 0) return; const y = 520 + i * 250, k = eback(p); ctx.save(); ctx.translate(540, y); ctx.scale(k, k);
      ctx.fillStyle = 'rgba(255,255,255,.07)'; rr(-440, -95, 880, 190, 40); ctx.fill(); ctx.fillStyle = OKG; ctx.beginPath(); ctx.arc(-340, 0, 72, 0, 7); ctx.fill(); ic(-340, 0, .85); label(`${i + 1}. ${txt}`, -220, 30, 78, { align: 'left', weight: 900, spacing: 2 }); ctx.restore(); });
    label(L('REMEMBER THIS', 'ЗАПОМНИТЕ'), 540, 320, 70, { weight: 900, color: YEL2, alpha: prog(t, 0, .2) }); },
  sfx(d, P, E, s) { return [0, 1, 2, 3].map(i => [s.U(s.a + i) - s.U(s.a), 'pop', .45]); }
};
SC.final = { // "И помните: самое опасное — не холод. А паника." → loops into frame 0
  draw(t, d, P, E, s) { const tp = s.U(s.b); ctx.save(); shake(t, t > tp ? 8 : 2); ctx.translate(0, Math.sin(t * 9) * 8); ctx.drawImage(layer('winter', riverWinterDraw, 1), 0, 0); iceCracks(540, 1900, .4 + eout(prog(t, tp, d)) * 1.2, 7, 1.4); ctx.restore();
    mitten(160, 1880, 1.0, .25); mitten(920, 1880, 1.0, -.25); breath(t, 540, 1000, 1.2, .35);
    bigTitle(t < tp - .05 ? L('NOT THE COLD', 'НЕ ХОЛОД') : L('PANIC', 'ПАНИКА'), 300, t < tp - .05 ? prog(t, 0, .2) : prog(t, tp - .05, tp + .15), { size: 130, col: t < tp - .05 ? '#fff' : '#ff4d57', glow: t < tp - .05 ? null : 'rgba(255,40,50,.6)' }); },
  sfx(d, P, E, s) { return [[0, 'wind', .35, { dur: d }], [s.U(s.b), 'glass', .5], [s.U(s.b) + .2, 'creak', .45]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .2) drawSubs(t); };
