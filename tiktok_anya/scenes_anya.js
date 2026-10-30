// ===== TikTok (1080×1920): "The bottle" — calm night mystery =====
const HAND = '"Caveat", cursive';
const JACKET = '#6d2433', HAIR = '#4a2e1c';
const ANYA = (o = {}) => Object.assign({ fem: true, top: JACKET, pants: '#1e2433', hair: HAIR, shoe: '#e9e4ee', light: 1 }, o);

// ---------- environment ----------
function nightSky(t) { bg('#050913', '#0d1a2e'); const R = rnd(4); for (let i = 0; i < 90; i++) { ctx.fillStyle = `rgba(255,255,255,${R() * .5 * (.6 + .4 * Math.sin(t + i))})`; ctx.fillRect(R() * W, R() * 900, 2, 2); }
  ctx.fillStyle = '#f2efe2'; ctx.beginPath(); ctx.arc(860, 220, 46, 0, 7); ctx.fill(); glow(860, 220, 240, 'rgba(200,215,255,.25)'); }
function panelBuilding(x, y, w, floors, o = {}) { // Soviet five-storey block; y = ground
  const fh = 150, h = floors * fh + 40; ctx.fillStyle = o.col || '#1a2232'; ctx.fillRect(x, y - h, w, h);
  ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let f = 0; f < floors; f++) ctx.fillRect(x, y - h + 40 + f * fh, w, 3);
  const cols = Math.floor(w / 110), R = rnd(o.seed || 3);
  for (let f = 0; f < floors; f++) for (let c = 0; c < cols; c++) { const wx = x + 30 + c * (w - 60) / cols, wy = y - h + 70 + f * fh, lit = !o.dark && R() > .62;
    ctx.fillStyle = lit ? '#ffcf86' : '#0a0f1a'; ctx.fillRect(wx, wy, 62, 78); if (lit) glow(wx + 31, wy + 39, 90, 'rgba(255,190,110,.18)');
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(wx + 29, wy, 4, 78); if (f > 0 && c % 2 === 0) { ctx.fillStyle = '#121927'; ctx.fillRect(wx - 10, wy + 82, 82, 12); } }
  // roof edge + antenna
  ctx.fillStyle = '#0c111c'; ctx.fillRect(x - 6, y - h - 10, w + 12, 16); ctx.fillRect(x + w * .7, y - h - 70, 5, 60); ctx.fillRect(x + w * .7 - 30, y - h - 60, 64, 4);
  return y - h - 10;
}
function streetLamp(x, y, h, on = 1) { ctx.fillStyle = '#0b0f17'; ctx.fillRect(x - 5, y - h, 10, h); ctx.fillRect(x - 5, y - h, 80, 8); ctx.fillStyle = '#ffd9a0'; ctx.fillRect(x + 50, y - h + 6, 34, 10);
  if (on) { glow(x + 66, y - h + 14, 200, 'rgba(255,190,110,.55)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,190,110,.07)'; ctx.beginPath(); ctx.moveTo(x + 50, y - h + 14); ctx.lineTo(x + 84, y - h + 14); ctx.lineTo(x + 230, y); ctx.lineTo(x - 90, y); ctx.fill(); ctx.restore(); } }
function street(t, o = {}) { nightSky(t);
  panelBuilding(-60, 1260, 620, 5, { seed: 2, dark: o.dark }); panelBuilding(600, 1240, 560, 5, { seed: 7, dark: o.dark });
  ctx.fillStyle = grad(0, 1240, 0, H, [[0, '#141a26'], [1, '#07090e']]); ctx.fillRect(0, 1240, W, H - 1240);
  ctx.fillStyle = '#1c2230'; ctx.fillRect(0, 1240, W, 60); // sidewalk kerb
  for (const lx of [120, 760]) streetLamp(lx, 1300, 520);
  ctx.save(); ctx.globalAlpha = .18; for (let i = 0; i < 6; i++) { ctx.fillStyle = '#ffd9a0'; ctx.fillRect(160 + i * 160, 1500 + (i % 2) * 40, 90, 6); } ctx.restore(); // wet reflections
}
function bottle(x, y, s, rot, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = grad(-40, 0, 40, 0, [[0, 'rgba(20,70,40,.9)'], [.4, 'rgba(60,140,90,.85)'], [.6, 'rgba(120,200,150,.8)'], [1, 'rgba(15,50,30,.9)']]);
  ctx.beginPath(); ctx.moveTo(-14, -150); ctx.lineTo(14, -150); ctx.lineTo(14, -95); ctx.quadraticCurveTo(42, -70, 42, -30); ctx.lineTo(42, 120); ctx.quadraticCurveTo(42, 135, 28, 135); ctx.lineTo(-28, 135); ctx.quadraticCurveTo(-42, 135, -42, 120); ctx.lineTo(-42, -30); ctx.quadraticCurveTo(-42, -70, -14, -95); ctx.closePath(); ctx.fill();
  if (o.note !== false) { ctx.fillStyle = 'rgba(240,230,205,.9)'; rr(-14, -40, 28, 120, 10); ctx.fill(); ctx.strokeStyle = 'rgba(120,100,70,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -20); ctx.lineTo(14, -18); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(-30, -40, 7, 150); ctx.fillRect(-8, -146, 5, 46); ctx.restore(); }
function shards(x, y, k, seed = 3, n = 26) { const R = rnd(seed); for (let i = 0; i < n; i++) { const a = R() * Math.PI * 2, d = eout(k) * (40 + R() * 260), px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * .35, sz = 8 + R() * 22;
  ctx.save(); ctx.translate(px, py); ctx.rotate(R() * 6); ctx.fillStyle = `rgba(${90 + R() * 60},${170 + R() * 50},${120 + R() * 40},.75)`; ctx.beginPath(); ctx.moveTo(0, -sz); ctx.lineTo(sz * .6, sz * .4); ctx.lineTo(-sz * .5, sz * .5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(-1, -sz * .7, 2, sz * .6); ctx.restore(); } }
function noteSheet(x, y, w, rot, lines, p, o = {}) { // handwritten note; o.sx for flip, o.col ink
  const h = w * .7; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(o.sx ?? 1, 1);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-w / 2 + 12, -h / 2 + 16, w, h);
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#f1e8d2'], [1, '#d9cba8']]); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = 'rgba(120,100,70,.25)'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-w / 2 + 20, -h / 2 + i * h / 4); ctx.lineTo(w / 2 - 20, -h / 2 + i * h / 4); ctx.stroke(); } // fold creases
  if (Math.abs(o.sx ?? 1) > .15) { const n = lines.reduce((a, l) => a + l.length, 0); let shown = Math.floor(n * clamp(p)); ctx.font = `700 ${o.size || w * .11}px ${HAND}`; ctx.fillStyle = o.col || '#1d2a6b'; ctx.textAlign = 'center';
    lines.forEach((l, i) => { const k = Math.max(0, Math.min(l.length, shown)); shown -= l.length; ctx.fillText(l.slice(0, k), 0, -h / 2 + (i + 1) * h / (lines.length + 1) + w * .04); }); }
  ctx.restore(); }
function caption(s, y, p, o = {}) { // on-screen intrigue line (not subtitles)
  if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(540, y); ctx.scale(k, k); ctx.font = `900 ${o.size || 64}px ${F_HEAD}`; ctx.letterSpacing = '1px';
  const lines = s.split('\n'), w = Math.max(...lines.map(l => ctx.measureText(l).width)), lh = (o.size || 64) * 1.15;
  ctx.fillStyle = o.bg || 'rgba(8,10,16,.82)'; rr(-w / 2 - 36, -lh * .95, w + 72, lh * lines.length + 26, 22); ctx.fill();
  if (o.accent !== false) { ctx.fillStyle = o.accent || '#ffcc4d'; ctx.fillRect(-w / 2 - 36, -lh * .95, 10, lh * lines.length + 26); }
  ctx.fillStyle = o.color || '#fff'; ctx.textAlign = 'center'; lines.forEach((l, i) => ctx.fillText(l, 0, i * lh)); ctx.restore(); }
function timeStamp(s, x, y, size = 54, o = {}) { ctx.save(); ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = o.align || 'left'; ctx.fillStyle = o.col || '#ff4d5a'; ctx.shadowColor = o.col || '#ff4d5a'; ctx.shadowBlur = 16; ctx.fillText(s, x, y); ctx.restore(); }
function clockFace(s, x, y, size, t) { ctx.save(); ctx.fillStyle = '#05070c'; rr(x - size * 1.7, y - size * .9, size * 3.4, size * 1.25, 26); ctx.fill(); ctx.strokeStyle = '#1d2230'; ctx.lineWidth = 8; ctx.stroke();
  const parts = s.split(':'); ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.fillStyle = '#ff4d5a'; ctx.shadowColor = '#ff4d5a'; ctx.shadowBlur = 30;
  ctx.fillText(parts[0], x - size * .78, y + size * .05); ctx.fillText(parts[1], x + size * .78, y + size * .05); if (Math.floor(t * 2) % 2 === 0) ctx.fillText(':', x, y); ctx.restore(); }
function cctvFrame(t, ts, paint) { ctx.save(); paint(); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'hsl(0,0%,50%)'; ctx.globalAlpha = .85; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(150,220,170,1)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  const R = rnd(Math.floor(t * 24)); ctx.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 400; i++) ctx.fillRect(R() * W, R() * H, 2, 2); scanlines(.12);
  ctx.save(); ctx.font = `700 40px ${MONO}`; ctx.fillStyle = '#e9f5ee'; ctx.fillText('CAM 02 · МАГАЗИН', 50, 120); ctx.fillText(ts, 50, 180);
  if (Math.floor(t * 2) % 2 === 0) { ctx.fillStyle = '#ff3b3b'; ctx.beginPath(); ctx.arc(900, 105, 18, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillText('REC', 930, 120); } ctx.restore();
  hud(t, 30, 60, 1020, 1800, 'rgba(230,245,235,.6)'); }

// ================== SCENES ==================
SC.hookBottle = { // bottle flies at camera in slow motion → glass burst; "23:40"
  draw(t, d, P, E) { const ti = E('бутылку') - .35; street(t); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, H);
    const k = clamp(t / Math.max(ti, .1)); if (t < ti) { const s = lerp(.4, 3.2, Math.pow(k, 2.2)); glow(540, 900, 400 * s, 'rgba(160,230,190,.12)'); bottle(540 + Math.sin(k * 3) * 60, 900 - (1 - k) * 300, s, t * 5); }
    else { const b = t - ti; glow(540, 900, 1100 * eout(prog(b, 0, .3)), `rgba(255,255,255,${.7 * (1 - prog(b, .1, .8))})`); shards(540, 900, prog(b, 0, .9), 5, 60); }
    timeStamp('ВЧЕРА · 23:40', 540, 300, 64, { align: 'center' }); caption('ЭТА БУТЫЛКА\nСПАСЛА ЕЙ ЖИЗНЬ', 1560, prog(t, ti + .4, ti + .8), { size: 76 }); },
  sfx(d, P, E) { const ti = E('бутылку') - .35; return [[0, 'night', .35, { dur: d }], [.1, 'swoosh_up', .4], [ti, 'glass', .55], [ti + .5, 'chime', .3]]; }
};
SC.alive = {
  draw(t, d) { bg('#0a0e18', '#04060b'); glow(540, 700, 800, 'rgba(255,190,120,.18)'); ctx.save(); cam(540, 900, 1.06 + t * .02);
    person(540, 2380, 1800, ANYA({ wound: 'cut', light: -1 })); ctx.restore(); caption('…И ТОЛЬКО ПОЭТОМУ\nОНА ЖИВА', 300, prog(t, .2, .6)); iconDisc(880, 1500, 70, 'question', prog(t, 1, 1.4), '#c8202e'); },
  sfx() { return [[0, 'heartbeat', .35, { dur: 2.5 }], [1, 'pop', .35]]; }
};
SC.walkHome = {
  draw(t, d, P, E) { const th = E('наушники') - .3, tm = E('минуты') - .5; street(t); ctx.save(); cam(lerp(560, 520, prog(t, 0, d)), 1100, 1.05);
    person(lerp(300, 620, prog(t, 0, d)), 1700, 760, ANYA({ headphones: t > th, walk: t * 7 })); ctx.restore();
    if (t > th) { const R = rnd(3); for (let i = 0; i < 6; i++) { const k = ((t - th) * .5 + i / 6) % 1; label('♪', lerp(300, 620, prog(t, 0, d)) + 60 + Math.sin(k * 6 + i) * 40, 900 - k * 260, 54, { color: `rgba(255,220,160,${1 - k})` }); } }
    caption('ОДНА И ТА ЖЕ ДОРОГА', 260, prog(t, .3, .7), { size: 58 });
    if (t > tm) { const left = Math.max(0, 3 - Math.floor((t - tm) * .9)); ctx.save(); ctx.globalAlpha = prog(t, tm, tm + .4); ctx.fillStyle = 'rgba(8,10,16,.82)'; rr(300, 1780, 480, 100, 20); ctx.fill(); ctx.restore(); label(`ДО ДОМА: ${left} МИН`, 540, 1848, 50, { weight: 900, color: '#ffcc4d', alpha: prog(t, tm, tm + .4), font: MONO }); } },
  sfx(d, P, E) { return [[0, 'night', .35, { dur: d }], [0, 'steps', .3, { dur: d }], [E('наушники') - .3, 'lofi', .3, { dur: d - E('наушники') }]]; }
};
SC.noWhistle = { // slow-motion: a bottle arcs down from the roof; she hears nothing
  draw(t, d) { street(t); const roof = 1260 - 5 * 150 - 50; ctx.save(); ctx.globalAlpha = .9; person(860, roof + 10, 200, { silhouette: true, color: '#03050a', rim: 'rgba(200,215,255,.6)', fem: true }); ctx.restore();
    const k = eio(prog(t, .2, d)); bottle(lerp(840, 560, k), lerp(roof - 20, 1450, k) - Math.sin(k * Math.PI) * 120, .45, t * 6);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.setLineDash([12, 12]); ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 40 * k; i++) { const u = i / 40; ctx.lineTo(lerp(840, 560, u), lerp(roof - 20, 1450, u) - Math.sin(u * Math.PI) * 120); } ctx.stroke(); ctx.restore();
    person(560, 1700, 760, ANYA({ headphones: true, walk: t * 7 })); caption('ОНА НЕ УСЛЫШАЛА\nСВИСТА', 300, prog(t, .3, .7), { size: 60 }); },
  sfx(d) { return [[0, 'lofi', .25, { dur: d }], [.2, 'whoosh', .25]]; }
};
SC.impact = {
  draw(t, d, P, E) { const tu = E('удар') - .15, tk = E('колени') - .3, tb = E('бутылка', 2, tk + 1.6) - .4; street(t);
    const fl = prog(t, tu, tu + .08) * (1 - prog(t, tu + .08, tu + .5)); const kneel = eio(prog(t, tk, tk + .6));
    ctx.save(); ctx.translate(Math.sin(t * 60) * 10 * fl, 0); person(560, 1700 + kneel * 160, 760 - kneel * 120, ANYA({ wound: t > tu ? 'cut' : null, shrug: kneel * .3, tilt: kneel * .15 })); ctx.restore();
    if (t > tb) { bottle(700, 1720, .4, 1.4, { note: false }); shards(720, 1760, prog(t, tb, tb + .6), 8, 30); }
    if (fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl * .8})`; ctx.fillRect(0, 0, W, H); }
    timeStamp('23:40', 540, 300, 80, { align: 'center' }); },
  sfx(d, P, E) { const tu = E('удар') - .15, tk = E('колени') - .3, tb = E('бутылка', 2, tk + 1.6) - .4; return [[0, 'night', .3, { dur: d }], [tu, 'thud_soft', .55], [tu, 'heartbeat', .35, { dur: 3 }], [tb, 'glass', .45]]; }
};
SC.noteFound = { draw(t, d) { ctx.fillStyle = '#0a0d14'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = grad(0, 0, 0, H, [[0, '#1a1f2a'], [1, '#07090e']]); ctx.fillRect(0, 0, W, H); glow(540, 1000, 700, 'rgba(255,190,110,.2)');
  ctx.save(); cam(540, 1000, lerp(1, 1.3, prog(t, 0, d))); shards(540, 1050, 1, 4, 40); ctx.save(); ctx.translate(540, 1000); ctx.rotate(.3); ctx.fillStyle = '#efe4c8'; rr(-110, -34, 220, 68, 30); ctx.fill(); ctx.strokeStyle = 'rgba(120,100,70,.5)'; ctx.lineWidth = 3; for (const k of [-60, 0, 60]) { ctx.beginPath(); ctx.moveTo(k, -34); ctx.lineTo(k + 8, 34); ctx.stroke(); } ctx.restore(); glow(540, 1000, 200, 'rgba(255,240,200,.35)'); ctx.restore();
  caption('СРЕДИ ОСКОЛКОВ — ЗАПИСКА', 300, prog(t, .3, .7), { size: 56 }); }, sfx() { return [[.2, 'paper', .45], [.4, 'shimmer', .3]]; } };
SC.rooftop = {
  draw(t, d, P, E) { const tr = E('крыше') - .3, tn = E('никого') - .3; nightSky(t); const roof = panelBuilding(90, 1700, 900, 6, { dark: true, seed: 9 });
    ctx.fillStyle = '#07090e'; ctx.fillRect(0, 1700, W, 220);
    ctx.save(); cam(540, lerp(1100, 700, eio(prog(t, 0, tr + .5))), lerp(1, 1.25, eio(prog(t, tr, d)))); ctx.restore();
    const vis = prog(t, tr, tr + .3) * (1 - prog(t, tn + .2, tn + .5)); if (vis > 0) { ctx.save(); ctx.globalAlpha = vis; person(700, roof + 6, 260, { silhouette: true, color: '#02030a', rim: 'rgba(200,215,255,.7)', fem: true }); ctx.restore(); }
    caption('ВСЕ ОКНА ТЁМНЫЕ', 260, prog(t, .5, .9), { size: 56 }); if (t > tr) caption(t < tn ? 'НА КРЫШЕ КТО-ТО ЕСТЬ' : '…И НИКОГО', 400, prog(t, tr, tr + .3), { size: 56, accent: '#ff4d5a' }); scanlines(.04); },
  sfx(d, P, E) { return [[0, 'wind', .35, { dur: d }], [E('крыше') - .3, 'riser', .25, { dur: 1.6 }], [E('никого') - .2, 'swoosh', .3]]; }
};
SC.noteRead = {
  draw(t, d, P, E) { const t1 = E('домой') - .9, t2 = E('внутри') - .6; bg('#0b0d12', '#030406'); glow(540, 900, 700, 'rgba(255,200,140,.2)');
    noteSheet(540, 960, 900, -.03, ['Не иди домой.', 'Он уже внутри.'], prog(t, t1, t1 + 1) * .5 + prog(t, t2, t2 + .8) * .5, { size: 120 });
    if (t > t2 + .8) { glow(540, 1050, 500, `rgba(255,60,70,${.15 + .1 * Math.sin(t * 4)})`); caption('ОН УЖЕ ВНУТРИ', 1560, prog(t, t2 + .8, t2 + 1.1), { size: 70, accent: '#ff4d5a' }); } },
  sfx(d, P, E) { return [[E('домой') - .9, 'pen', .45], [E('внутри') - .6, 'pen', .45], [E('внутри') + .3, 'heartbeat', .35, { dur: 1.5 }]]; }
};
SC.flipNote = {
  draw(t, d, P, E) { const tf = E('перевернула') - .3; bg('#0b0d12', '#030406'); glow(540, 900, 700, 'rgba(255,200,140,.2)');
    const k = prog(t, tf, tf + .8), sx = Math.cos(k * Math.PI);
    if (k < .5) noteSheet(540, 960, 900, -.03, ['Не иди домой.', 'Он уже внутри.'], 1, { size: 120, sx });
    else noteSheet(540, 960, 900, -.03, ['', ''], 0, { sx: -sx });
    caption('ЗЛАЯ ШУТКА?', 330, prog(t, .2, .6) * (1 - prog(t, tf, tf + .3)), { size: 64 }); caption('ПОКА НЕ ПЕРЕВЕРНУЛА…', 1600, prog(t, tf, tf + .4), { size: 58 }); },
  sfx(d, P, E) { return [[E('перевернула') - .3, 'paper', .55]]; }
};
SC.shoppingList = {
  draw(t, d, P, E) { const tl = E('молоко') - .4, tk = E('кухонном') - 1.2;
    if (t < tk) { bg('#0b0d12', '#030406'); glow(540, 900, 700, 'rgba(255,200,140,.2)');
      noteSheet(540, 900, 900, .02, ['молоко,', 'хлеб,', 'батарейки'], prog(t, tl, tl + 1.8), { size: 110, col: '#2a2a2a' });
      caption('ЕЁ СОБСТВЕННЫЙ ПОЧЕРК', 300, prog(t, .4, .8), { size: 58, accent: '#ff4d5a' }); }
    else { const lt = t - tk; bg('#e9dcc4', '#c7b48f'); glow(800, 300, 800, 'rgba(255,240,200,.6)'); // morning kitchen (flashback)
      ctx.fillStyle = grad(0, 300, 0, 900, [[0, '#cfe4f5'], [1, '#fff3da']]); ctx.fillRect(560, 160, 420, 560); ctx.strokeStyle = '#8a7556'; ctx.lineWidth = 16; ctx.strokeRect(560, 160, 420, 560);
      floor(1150, '#8a6a46', '#5a4128'); ctx.fillStyle = '#b08a5a'; ctx.fillRect(0, 1100, W, 70);
      ctx.fillStyle = '#f4f4f4'; rr(180, 950, 160, 150, 20); ctx.fill(); // mug
      noteSheet(620, 1060, 380, -.08, ['молоко,', 'хлеб,', 'батарейки'], 1, { size: 50, col: '#2a2a2a' });
      timeStamp('УТРО · 08:12', 540, 1500, 60, { align: 'center', col: '#5a4128' }); caption('ОСТАЛСЯ НА КУХОННОМ СТОЛЕ', 300, prog(lt, .2, .6), { size: 54 }); } },
  sfx(d, P, E) { return [[E('молоко') - .4, 'pen', .45, {}], [E('кухонном') - 1.2, 'swoosh', .35], [E('кухонном') - 1, 'chime', .25]]; }
};
SC.police = {
  draw(t, d, P, E) { const tz = E('заперта') - .3, tp = E('пусто') - .4; bg('#06080d', '#020305');
    if (t < tz) { street(t); const ph = Math.floor(t * 3) % 2; glow(540, 1500, 700, ph ? 'rgba(255,40,50,.25)' : 'rgba(40,90,255,.25)'); caption('ОНА ВЫЗВАЛА ПОЛИЦИЮ', 300, prog(t, .2, .6), { size: 56 }); }
    else { const lt = t - tz; ctx.fillStyle = '#121620'; ctx.fillRect(0, 0, W, H); // apartment door + hallway
      ctx.fillStyle = '#4a3424'; ctx.fillRect(300, 500, 480, 1100); ctx.fillStyle = '#c9ccd2'; ctx.beginPath(); ctx.arc(720, 1060, 22, 0, 7); ctx.fill(); ctx.fillRect(700, 1100, 40, 60);
      ['ЗАПЕРТА ✓', 'ЗАМОК ЦЕЛ ✓', 'СВЕТ ВЫКЛЮЧЕН ✓'].forEach((s, i) => caption(s, 300 + i * 120, prog(lt, .3 + i * .7, .7 + i * .7), { size: 46, accent: '#39ff88' }));
      if (t > tp - 1.2) { const k = prog(t, tp - 1.2, tp - .8); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#07090e'; ctx.fillRect(0, 0, W, H); for (const [x, a] of [[260, Math.sin(t * 1.3) * .5], [800, Math.cos(t * 1.1) * .5]]) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, 1700); ctx.rotate(a); ctx.fillStyle = grad(0, 0, 0, -1300, [[0, 'rgba(255,250,220,.35)'], [1, 'rgba(255,250,220,0)']]); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-220, -1300); ctx.lineTo(220, -1300); ctx.fill(); ctx.restore(); } ctx.restore(); }
      if (t > tp) caption('ПУСТО', 1500, prog(t, tp, tp + .3), { size: 90 }); } },
  sfx(d, P, E) { const tz = E('заперта') - .3, tp = E('пусто') - .4; return [[0, 'siren', .18, { dur: tz }], [tz, 'unlock', .4], [tz + .3, 'pop', .3], [tz + 1, 'pop', .3], [tz + 1.7, 'pop', .3], [tp - 1.2, 'click', .45], [tp - 1.2, 'steps', .3, { dur: 1.5 }]]; }
};
SC.closet = {
  draw(t, d, P, E) { const to = E('шкаф') - .3, tm = E('мужчина') - .3, tk = E('ключей') - .6; ctx.fillStyle = '#07090e'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(540, 1800); ctx.rotate(Math.sin(t) * .1); ctx.fillStyle = grad(0, 0, 0, -1500, [[0, 'rgba(255,250,220,.3)'], [1, 'rgba(255,250,220,0)']]); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-420, -1500); ctx.lineTo(420, -1500); ctx.fill(); ctx.restore();
    // wardrobe: two doors, right one swings open
    const op = eio(prog(t, to, to + .9)); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(220, 340, 640, 1360); ctx.fillStyle = '#0a0705'; ctx.fillRect(540, 360, 300, 1320);
    if (op > .2) { ctx.save(); ctx.globalAlpha = prog(t, tm, tm + .5); person(690, 1660, 1150, { silhouette: true, color: '#020203', rim: 'rgba(255,250,220,.55)' }); ctx.restore(); }
    if (t > tk) { glow(780, 1100, 60, 'rgba(255,255,255,.7)', prog(t, tk, tk + .3)); ctx.save(); ctx.globalAlpha = prog(t, tk + .4, tk + .8); ctx.fillStyle = '#d4af37'; ctx.translate(600, 1180); for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(i * 40, 0, 16, 0, 7); ctx.fill(); ctx.fillRect(i * 40 - 4, 10, 8, 50); } ctx.restore(); }
    ctx.fillStyle = '#4a3424'; ctx.fillRect(240, 360, 300, 1320); ctx.save(); ctx.translate(540, 360); ctx.scale(1 - op * .85, 1); ctx.fillStyle = '#4f392a'; ctx.fillRect(0, 0, 300, 1320); ctx.restore();
    if (t > tm) caption('ТАМ СТОЯЛ МУЖЧИНА', 300, prog(t, tm, tm + .3), { size: 60, accent: '#ff4d5a' }); if (t > tk) caption('С ДУБЛИКАТОМ\nЕЁ КЛЮЧЕЙ', 1760, prog(t, tk + .3, tk + .6), { size: 54 }); },
  sfx(d, P, E) { const to = E('шкаф') - .3, tm = E('мужчина') - .3, tk = E('ключей') - .6; return [[to, 'creak', .45], [tm, 'heartbeat', .35, { dur: 2.5 }], [tk + .4, 'cuffs', .35]]; }
};
SC.stalker = {
  draw(t, d) { ctx.fillStyle = '#2a1f16'; ctx.fillRect(0, 0, W, H); glow(540, 900, 900, 'rgba(255,200,130,.2)');
    const R = rnd(6); for (let i = 0; i < 9; i++) { const k = prog(t, .1 + i * .18, .4 + i * .18); if (k <= 0) continue; const x = 220 + (i % 3) * 320, y = 420 + Math.floor(i / 3) * 420;
      ctx.save(); ctx.translate(x, y); ctx.rotate((R() - .5) * .2); ctx.scale(eback(k), eback(k)); ctx.fillStyle = '#f4f1ea'; ctx.fillRect(-130, -150, 260, 300); ctx.fillStyle = '#1a2232'; ctx.fillRect(-110, -130, 220, 200);
      ctx.save(); ctx.beginPath(); ctx.rect(-110, -130, 220, 200); ctx.clip(); person(R() * 60 - 30, 80, 200, ANYA({ silhouette: true, color: '#0a0d14', rim: 'rgba(255,200,150,.6)', walk: i })); ctx.restore();
      ctx.font = `700 34px ${HAND}`; ctx.fillStyle = '#222'; ctx.textAlign = 'center'; ctx.fillText(`${3 + i * 2} окт.`, 0, 120); ctx.fillStyle = '#c8102e'; ctx.beginPath(); ctx.arc(0, -150, 10, 0, 7); ctx.fill(); ctx.restore(); }
    caption('ОН СЛЕДИЛ\nТРИ НЕДЕЛИ', 1720, prog(t, 1.4, 1.8), { size: 64, accent: '#ff4d5a' }); },
  sfx() { return [[.1, 'popseq', .3, { n: 9, step: .18 }]]; }
};
SC.whoThrew = { draw(t, d, P, E) { const tb = E('бросил') - .5; bg('#05070c', '#020305'); glow(540, 900, 600, 'rgba(160,230,190,.18)'); bottle(540, 900, 2.2, Math.sin(t * .8) * .1, { note: false });
  caption('БУТЫЛКА СПАСЛА ЕЙ ЖИЗНЬ', 300, prog(t, .2, .6), { size: 54 }); if (t > tb) caption('НО КТО ЕЁ БРОСИЛ?', 1620, prog(t, tb, tb + .4), { size: 70, accent: '#ff4d5a' }); },
  sfx(d, P, E) { return [[0, 'pad_swell', .25, { dur: d }], [E('бросил') - .5, 'pop', .45]]; } };
SC.roofDoor = {
  draw(t, d, P, E) { const tw = E('заварена') - .4; ctx.fillStyle = '#1c1f26'; ctx.fillRect(0, 0, W, H); glow(540, 400, 700, 'rgba(220,230,255,.12)');
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#20242c' : '#252932'; ctx.fillRect(0, 1500 + i * 46, W, 46); } // stairs
    ctx.fillStyle = grad(250, 0, 830, 0, [[0, '#3a3f4a'], [.5, '#5a606c'], [1, '#33373f']]); ctx.fillRect(260, 300, 560, 1200); // metal door
    ctx.fillStyle = 'rgba(140,70,30,.35)'; const R = rnd(4); for (let i = 0; i < 60; i++) ctx.fillRect(260 + R() * 560, 300 + R() * 1200, 10 + R() * 40, 6 + R() * 20); // rust
    const wk = prog(t, tw, tw + 1); ctx.strokeStyle = '#8a8f99'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.setLineDash([10, 8]);
    for (const x of [262, 818]) { ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, 300 + 1200 * wk); ctx.stroke(); } ctx.setLineDash([]);
    caption('ДВЕРЬ НА КРЫШУ\nЗАВАРЕНА 3 ГОДА', 220, prog(t, tw, tw + .4), { size: 58 }); if (t > d - 1.8) caption('ПОДНЯТЬСЯ НЕВОЗМОЖНО', 1760, prog(t, d - 1.8, d - 1.4), { size: 56, accent: '#ff4d5a' }); },
  sfx(d, P, E) { return [[0, 'steps', .3, { dur: 1.8 }], [E('заварена') - .4, 'creak', .3], [d - 1.8, 'soft_x', .4]]; }
};
SC.cctv = { // shop camera, 23:39 — a girl in the same jacket on the roof
  draw(t, d, P, E) { const t0 = E('камеры') - .2, tj = E('куртке') - .5, tb = E('бросает') - .3, tt = E('поворачивается') - .3;
    if (t < t0) { street(t); caption('ЗАПИСЬ С КАМЕРЫ\nМАГАЗИНА НАПРОТИВ', 300, prog(t, .2, .6), { size: 56 }); return; }
    const sec = 30 + Math.floor((t - t0) * 1.6), ts = `30.10  23:39:${String(Math.min(59, sec)).padStart(2, '0')}`;
    cctvFrame(t, ts, () => { nightSky(t); const roof = panelBuilding(60, 1900, 960, 6, { dark: true, seed: 9 });
      const walk = eio(prog(t, tj, tb)), x = lerp(260, 640, walk), turn = prog(t, tt, tt + .4);
      ctx.save(); ctx.translate(0, 0); person(x, roof + 6, 520, ANYA({ walk: t < tb ? t * 6 : 0, armUp: prog(t, tb, tb + .3) * (1 - prog(t, tb + .5, tb + .8)), wound: turn > .5 ? 'bandage' : null, flip: turn < .5, light: 1 })); ctx.restore();
      if (t > tb + .4) { const k = prog(t, tb + .4, tb + 2); bottle(x + 60 + k * 200, roof - 360 + k * k * 900, .35, k * 8, { note: false }); } });
    if (t > tj && t < tt) caption('ТАКАЯ ЖЕ КУРТКА', 1700, prog(t, tj, tj + .3), { size: 56 }); },
  sfx(d, P, E) { const t0 = E('камеры') - .2; return [[t0, 'static', .35, { dur: d - t0 }], [E('бросает') - .3, 'swoosh', .3], [E('поворачивается') - .3, 'riser', .3, { dur: 1.5 }]]; }
};
SC.faceReveal = {
  draw(t, d, P, E) { const tl = E('лицо') - .3, tp = E('повязка') - .3, tr = E('рана') - .6;
    cctvFrame(t, '30.10  23:39:57', () => { bg('#0b0f18', '#05070c'); person(540, 2950, 2300, ANYA({ wound: t > tp ? 'bandage' : null, light: 1 })); });
    if (t > tp) { ctx.save(); ctx.strokeStyle = '#ff4d5a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(439, 788, 95 + 8 * Math.sin(t * 5), 0, 7); ctx.stroke(); ctx.restore(); }
    caption('У НЕЁ АНИНО ЛИЦО', 1500, prog(t, tl, tl + .3), { size: 66, accent: '#ff4d5a' });
    if (t > tr) caption('ЧЕРЕЗ МИНУТУ ТАМ\nПОЯВИТСЯ РАНА', 1730, prog(t, tr, tr + .3), { size: 54 }); },
  sfx(d, P, E) { return [[0, 'static', .3, { dur: d }], [E('лицо') - .3, 'boom', .35], [E('повязка') - .3, 'heartbeat', .4, { dur: 3 }]]; }
};
SC.weekLater = { draw(t, d) { bg('#0b0d12', '#030406'); calendarPage(540, 900, 1.3, 'НОЯ', String(Math.min(6, Math.floor(lerp(30, 37, prog(t, 0, d))) - 30) || 30), '', {}); caption('ПРОШЛА НЕДЕЛЯ', 1560, prog(t, .1, .4), { size: 64 }); }, sfx(d) { return [[0, 'pages', .35, { dur: d }]]; } };
SC.bag = {
  draw(t, d, P, E) { const tb = E('бутылку') - .4, tk = E('ключ') - .3, tn = E('записку') - .4; bg('#14110e', '#06050a'); glow(540, 900, 800, 'rgba(255,190,120,.2)');
    // open bag seen from above
    ctx.fillStyle = '#2a1d16'; ctx.beginPath(); ctx.ellipse(540, 1000, 460, 620, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#120c09'; ctx.beginPath(); ctx.ellipse(540, 1000, 400, 560, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = '#8a6a46'; ctx.lineWidth = 10; ctx.setLineDash([24, 14]); ctx.beginPath(); ctx.ellipse(540, 1000, 430, 590, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    const k1 = eout(prog(t, tb, tb + .6)); if (k1 > 0) bottle(420, 1000 + (1 - k1) * 300, 1.4, -.3, { note: false });
    const k2 = eout(prog(t, tk, tk + .5)); if (k2 > 0) { ctx.save(); ctx.translate(700, 760 + (1 - k2) * 300); ctx.rotate(.5); ctx.fillStyle = '#c9a54a'; ctx.beginPath(); ctx.arc(0, 0, 40, 0, 7); ctx.fill(); ctx.fillStyle = '#120c09'; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#c9a54a'; ctx.fillRect(-8, 36, 16, 160); ctx.fillRect(8, 150, 30, 14); ctx.fillRect(8, 180, 22, 12); ctx.restore(); label('КЛЮЧ ОТ КРЫШИ', 700, 640, 40, { weight: 900, color: '#ffcc4d', alpha: k2 }); }
    const k3 = eout(prog(t, tn, tn + .6)); if (k3 > 0) noteSheet(650, 1300 + (1 - k3) * 300, 440, .12, ['Не иди домой.', 'Он уже внутри.'], 1, { size: 50 });
    caption('ЧТО-ТО ЛЕЖАЛО В СУМКЕ', 230, prog(t, .3, .7), { size: 54 }); },
  sfx(d, P, E) { return [[0, 'zipper', .45], [E('бутылку') - .4, 'clink', .4], [E('ключ') - .3, 'cuffs', .35], [E('записку') - .4, 'paper', .45]]; }
};
SC.clock2338 = { draw(t, d) { bg('#05070c', '#020305'); glow(540, 900, 700, 'rgba(255,60,70,.18)'); clockFace('23:38', 540, 980, 210, t); caption('ДО УДАРА — 2 МИНУТЫ', 1500, prog(t, .8, 1.2), { size: 60, accent: '#ff4d5a' }); },
  sfx(d) { return [[0, 'clock', .5, { dur: d }]]; } };
SC.finalQ = {
  draw(t, d) { nightSky(t); ctx.fillStyle = '#0c111c'; ctx.fillRect(0, 1300, W, 620); // the roof seen from the stairwell door, ajar
    ctx.fillStyle = '#1c1f26'; ctx.fillRect(0, 0, 240, H); ctx.fillRect(840, 0, 240, H); const op = eio(prog(t, .2, 1.5)); ctx.fillStyle = '#3a3f4a'; ctx.fillRect(240, 0, 600 * (1 - op * .6), H);
    glow(700, 900, 500, 'rgba(200,215,255,.25)', op); ctx.save(); ctx.globalAlpha = op * .9; person(760, 1500, 360, { silhouette: true, color: '#02030a', rim: 'rgba(200,215,255,.7)', fem: true }); ctx.restore();
    caption('А ВЫ БЫ ПОДНЯЛИСЬ\nНА КРЫШУ?', 300, prog(t, .4, .8), { size: 70 }); if (t > d - 1) { ctx.fillStyle = `rgba(0,0,0,${prog(t, d - 1, d)})`; ctx.fillRect(0, 0, W, H); } },
  sfx(d) { return [[0, 'wind', .35, { dur: d }], [.2, 'creak', .4], [.4, 'pad_swell', .25, { dur: d - .4 }]]; }
};
