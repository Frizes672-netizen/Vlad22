// ===== YouTube Shorts (RU): «Кассир трижды пробила шоколадку» — сигнал «Мне нужна помощь» =====
const GIRL = (o = {}) => Object.assign({ fem: true, top: '#2f5d7c', pants: '#24283a', hair: '#5a3a22', shoe: '#eae6ee', light: 1 }, o);
const MAN = (o = {}) => Object.assign({ top: '#2b2b30', pants: '#1d1f24', hair: '#2a1a12', cap: '#18181c', shoe: '#141414', light: -1 }, o);
const KASS = (o = {}) => Object.assign({ fem: true, top: '#c0392b', pants: '#2a2f3a', hair: '#7a5230', light: -1 }, o);
const COP = (o = {}) => Object.assign({ top: '#2c3e66', pants: '#1f2a44', hair: '#2a1a12', cap: '#1f2d55', shoe: '#111', light: 1 }, o);
const SKIN_G = '#ebc0a5', FLUO = 'rgba(220,255,240,', RED2 = '#ff2a3d';

// ---------- environment ----------
function shopBack(t) { // back wall of a small 24h shop: shelves, fridges, fluorescent light
  bg('#cfd8d4', '#8e9a96');
  ctx.fillStyle = '#e9efec'; ctx.fillRect(0, 0, W, 140); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#ffffff'; rr(60 + i * 260, 40, 200, 26, 8); ctx.fill(); glow(160 + i * 260, 54, 260, 'rgba(230,255,245,.5)'); }
  const cols = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c', '#e67e22'];
  for (let s = 0; s < 2; s++) { const sx = s ? 560 : 40, R = rnd(5 + s); ctx.fillStyle = '#7d8a90'; ctx.fillRect(sx, 200, 480, 860);
    for (let r = 0; r < 6; r++) { const sy = 230 + r * 140; ctx.fillStyle = '#5e6a70'; ctx.fillRect(sx, sy + 110, 480, 12);
      for (let c = 0; c < 9; c++) { const bw = 34 + R() * 16, bh = 60 + R() * 46; ctx.fillStyle = cols[Math.floor(R() * cols.length)]; rr(sx + 14 + c * 51, sy + 110 - bh, bw, bh, 5); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(sx + 18 + c * 51, sy + 116 - bh, 6, bh - 14); } } }
  ctx.fillStyle = 'rgba(200,255,240,.25)'; rr(560, 200, 480, 860, 10); ctx.fill(); // fridge glass glow
  glow(800, 600, 500, 'rgba(190,255,235,.35)'); floor(1080, '#b7c0bc', '#6f7874'); }
function counterFront(y, o = {}) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-20, y - 20, W + 40, 30);
  ctx.fillStyle = grad(0, y, 0, y + 60, [[0, '#3a3f44'], [1, '#22262a']]); ctx.fillRect(-20, y, W + 40, 60); // belt
  ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 3; const off = (o.beltT || 0) * 80 % 40; for (let x = -off; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x + 20, y + 54); ctx.stroke(); }
  ctx.fillStyle = grad(0, y + 60, 0, H, [[0, '#d9d2c4'], [1, '#9c9384']]); ctx.fillRect(-20, y + 60, W + 40, H); ctx.fillStyle = '#b8af9f'; ctx.fillRect(-20, y + 60, W + 40, 16); }
function chocolate(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-150 + 10, -60 + 14, 300, 120, 10); ctx.fill();
  ctx.fillStyle = grad(-150, -60, 150, 60, [[0, '#6b2a8a'], [.5, '#8e3fb5'], [1, '#5a2276']]); rr(-150, -60, 300, 120, 10); ctx.fill();
  ctx.fillStyle = '#f4e7c4'; ctx.beginPath(); ctx.ellipse(-50, 0, 70, 38, 0, 0, 7); ctx.fill(); label('ШОКОЛАД', -50, 12, 30, { weight: 900, color: '#5a2276' });
  ctx.fillStyle = '#fff'; ctx.fillRect(60, -38, 76, 76); ctx.fillStyle = '#111'; const R = rnd(4); for (let i = 0; i < 18; i++) { const w0 = R() > .5 ? 4 : 2; ctx.fillRect(64 + i * 3.8, -32, w0, 56); }
  ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-145, -55, 290, 18); ctx.restore(); }
function scanner(x, y, s, flash) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#1b1e22'; rr(-320, -60, 640, 180, 24); ctx.fill(); ctx.fillStyle = grad(0, -40, 0, 60, [[0, '#2b0f12'], [1, '#14080a']]); rr(-280, -40, 560, 110, 16); ctx.fill();
  const a = .25 + .75 * flash; ctx.strokeStyle = `rgba(255,40,60,${a})`; ctx.lineWidth = 6; ctx.shadowColor = RED2; ctx.shadowBlur = 30 * a;
  for (const k of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(-260, 15 + k * 22); ctx.lineTo(260, 15 - k * 22); ctx.stroke(); } ctx.shadowBlur = 0; ctx.restore();
  if (flash > 0) glow(x, y + 15 * s, 600 * s, `rgba(255,50,60,${.5 * flash})`); }
function helpHand(x, y, s, palm, thumb, curl, o = {}) { // the "Signal for Help": open palm → thumb tucked → fingers fold over the thumb
  const skin = o.skin || SKIN_G; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  ctx.fillStyle = grad(-140, 0, 140, 0, [[0, shade(o.sleeve || '#2f5d7c', .7)], [.5, o.sleeve || '#2f5d7c'], [1, shade(o.sleeve || '#2f5d7c', .75)]]); rr(-135, 230, 270, 600, 60); ctx.fill(); // sleeve
  ctx.fillStyle = shade(o.sleeve || '#2f5d7c', .6); rr(-145, 215, 290, 60, 28); ctx.fill();
  ctx.fillStyle = grad(-120, 0, 120, 0, [[0, shade(skin, .82)], [.5, skin], [1, shade(skin, .86)]]); rr(-80, 150, 160, 110, 40); ctx.fill(); // wrist
  ctx.fillStyle = grad(-130, -60, 130, 200, [[0, shade(skin, 1.04)], [.6, skin], [1, shade(skin, .84)]]); rr(-125, -70, 250, 260, 90); ctx.fill(); // palm
  softBlob(0, 40, 110, 110, '150,70,50', .12); // palm hollow
  if (curl < .5) { ctx.strokeStyle = 'rgba(140,70,50,.35)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-105, -10); ctx.quadraticCurveTo(0, 30, 110, -40); ctx.moveTo(-100, 60); ctx.quadraticCurveTo(-10, 40, 80, 20); ctx.moveTo(40, 160); ctx.quadraticCurveTo(10, 80, 60, -10); ctx.stroke(); }
  // thumb: from the right side, folding across the palm
  const th = clamp(thumb), ta = lerp(-.55, -1.45, th), tl = lerp(170, 150, th); ctx.save(); ctx.translate(105, 110); ctx.rotate(ta);
  ctx.fillStyle = grad(-30, 0, 30, 0, [[0, shade(skin, .86)], [.5, shade(skin, .98)], [1, shade(skin, .84)]]); rr(-34, -tl, 68, tl + 20, 34); ctx.fill();
  ctx.strokeStyle = 'rgba(140,70,50,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, -tl * .5); ctx.lineTo(20, -tl * .5); ctx.stroke(); ctx.fillStyle = 'rgba(255,220,205,.6)'; rr(-22, -tl + 6, 44, 40, 20); ctx.fill(); ctx.restore();
  // four fingers: straight → folded down over the thumb (we see the folded middle phalanges)
  const fx = [-90, -30, 30, 88], fl = [170, 195, 182, 140], cu = clamp(curl);
  for (let i = 0; i < 4; i++) { const L = fl[i] * (1 - .82 * cu), fw = 26;
    ctx.fillStyle = grad(fx[i] - fw, 0, fx[i] + fw, 0, [[0, shade(skin, .82)], [.5, skin], [1, shade(skin, .86)]]); rr(fx[i] - fw, -70 - L, fw * 2, L + 30, fw); ctx.fill();
    if (cu < .6) { ctx.strokeStyle = 'rgba(140,70,50,.32)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(fx[i] - 16, -70 - L * .4); ctx.lineTo(fx[i] + 16, -70 - L * .4); ctx.moveTo(fx[i] - 14, -70 - L * .72); ctx.lineTo(fx[i] + 14, -70 - L * .72); ctx.stroke(); ctx.fillStyle = 'rgba(255,220,205,.55)'; rr(fx[i] - 16, -70 - L + 6, 32, 34, 16); ctx.fill(); }
    if (cu > 0) { const fold = 150 * cu; ctx.fillStyle = grad(0, -70, 0, -70 + fold, [[0, shade(skin, .9)], [1, shade(skin, 1.02)]]); rr(fx[i] - fw - 2, -78, fw * 2 + 4, fold, fw); ctx.fill();
      ctx.strokeStyle = `rgba(130,60,45,${.45 * cu})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(fx[i] - fw + 4, -78 + fold * .55); ctx.lineTo(fx[i] + fw - 4, -78 + fold * .55); ctx.stroke(); } }
  ctx.restore(); }
function gripHand(x, y, s, sleeve = '#2f5d7c') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); // a man's hand clamped around her forearm
  ctx.fillStyle = grad(0, -90, 0, 90, [[0, shade(sleeve, 1.1)], [.5, sleeve], [1, shade(sleeve, .65)]]); rr(-600, -80, 1200, 160, 80); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 5; for (const k of [-140, -60, 70, 150]) { ctx.beginPath(); ctx.moveTo(k, -78); ctx.quadraticCurveTo(k + 30, 0, k - 10, 78); ctx.stroke(); } // fabric folds from the grip
  ctx.fillStyle = grad(-200, 0, 200, 0, [[0, '#2b2b30'], [1, '#3a3a40']]); rr(330, -120, 400, 240, 60); ctx.fill(); // his jacket cuff
  const sk = '#d9a98b'; ctx.fillStyle = grad(-140, -140, 140, 140, [[0, shade(sk, 1.05)], [1, shade(sk, .8)]]); rr(120, -130, 240, 230, 70); ctx.fill(); // back of hand
  for (let i = 0; i < 4; i++) { ctx.fillStyle = shade(sk, .92 - i * .03); rr(-30 + i * 6, -112 + i * 56, 200, 50, 25); ctx.fill(); ctx.strokeStyle = 'rgba(110,55,35,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(70 + i * 6, -104 + i * 56); ctx.lineTo(70 + i * 6, -70 + i * 56); ctx.stroke(); }
  ctx.fillStyle = 'rgba(80,30,20,.35)'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(170, -88 + i * 56, 10, 6, 0, 0, 7); ctx.fill(); } // knuckles
  ctx.fillStyle = shade(sk, .88); ctx.save(); ctx.translate(200, 110); ctx.rotate(.4); rr(-30, -20, 60, 150, 30); ctx.fill(); ctx.restore(); ctx.restore(); }
function cashRegister(x, y, s, t, err) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#23272c'; rr(-260, -200, 520, 320, 24); ctx.fill();
  ctx.fillStyle = err ? (Math.floor(t * 4) % 2 ? '#3a0a10' : '#5a0d16') : '#0c2a3a'; rr(-230, -175, 460, 230, 14); ctx.fill();
  if (err) { label('ОШИБКА', 0, -80, 64, { weight: 900, color: '#ff5a6a' }); label('ПОВТОР СКАНИРОВАНИЯ', 0, -20, 30, { weight: 800, color: '#ffb3ba' }); }
  else { label('ШОКОЛАД  89,00', 0, -100, 34, { weight: 800, color: '#bfe8ff' }); label('ИТОГО: 89,00 ₽', 0, -40, 40, { weight: 900, color: '#fff' }); }
  ctx.fillStyle = '#3a3f46'; for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) { rr(-230 + c * 78, 70 + r * 0, 66, 34, 8); ctx.fill(); } ctx.restore(); }
function panicButton(x, y, s, press, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#1a1c20'; ctx.fillRect(-540, -400, 1080, 800);
  ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let i = 0; i < 9; i++) ctx.fillRect(-540, -380 + i * 90, 1080, 3); // under-counter shadow
  ctx.fillStyle = '#e8c21a'; rr(-170, -120, 340, 300, 30); ctx.fill(); ctx.fillStyle = '#1a1c20'; label('ТРЕВОГА', 0, 150, 44, { weight: 900, color: '#1a1c20' });
  const dz = 18 * clamp(press); ctx.fillStyle = '#8a0f18'; ctx.beginPath(); ctx.ellipse(0, 10 + dz * .4, 120, 46, 0, 0, 7); ctx.fill(); ctx.fillStyle = grad(-110, -80, 110, 40, [[0, '#ff5a64'], [1, '#c2141f']]); ctx.beginPath(); ctx.ellipse(0, -10 + dz, 110, 60 - dz * .6, 0, 0, 7); ctx.fill();
  if (press > .9) { const k = (t * 1.2) % 1; for (let i = 0; i < 3; i++) { const kk = (k + i / 3) % 1; ctx.strokeStyle = `rgba(255,60,70,${.7 * (1 - kk)})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -10, 150 + kk * 380, 0, 7); ctx.stroke(); } }
  ctx.restore(); }
function bigFinger(x, y, s, skin = '#e2b597', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#c0392b'; rr(-120, 200, 240, 600, 50); ctx.fill(); // red uniform sleeve
  ctx.fillStyle = grad(-110, 0, 110, 0, [[0, shade(skin, .82)], [.5, skin], [1, shade(skin, .86)]]); rr(-110, 0, 220, 230, 80); ctx.fill(); rr(-36, -230, 72, 260, 36); ctx.fill();
  ctx.fillStyle = 'rgba(255,225,210,.6)'; rr(-26, -224, 52, 50, 24); ctx.fill(); ctx.fillStyle = shade(skin, .9); for (let i = 0; i < 3; i++) { rr(-100 + i * 18, 30 + i * 30, 70, 120, 35); ctx.fill(); } ctx.restore(); }
function policeLights(t, a = 1) { const ph = Math.floor(t * 6) % 2; glow(200, 700, 900, `rgba(255,40,60,${(ph ? .55 : .15) * a})`); glow(880, 700, 900, `rgba(50,110,255,${(ph ? .15 : .6) * a})`); }
function shopExterior(t) { bg('#05070d', '#0b1220'); const R = rnd(3); for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,255,255,${R() * .4})`; ctx.fillRect(R() * W, R() * 500, 2, 2); }
  stoneWall(0, 380, W, 900, '#2a2f38'); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 380, W, 900);
  const fl = (Math.floor(t * 9) % 23 === 0) ? .4 : 1; ctx.fillStyle = '#0f2a1c'; rr(150, 430, 780, 150, 18); ctx.fill(); label('ПРОДУКТЫ 24', 540, 532, 92, { weight: 900, color: `rgba(140,255,190,${fl})`, shadow: 'rgba(80,255,160,.9)', blur: 40 }); glow(540, 505, 520, `rgba(80,255,160,${.25 * fl})`);
  ctx.fillStyle = 'rgba(225,255,240,.9)'; ctx.fillRect(120, 650, 520, 560); ctx.fillStyle = '#2a2f38'; ctx.fillRect(700, 650, 260, 630); ctx.fillStyle = 'rgba(225,255,240,.85)'; ctx.fillRect(720, 670, 220, 420);
  ctx.save(); ctx.beginPath(); ctx.rect(120, 650, 520, 560); ctx.clip(); ctx.globalAlpha = .6; for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) { ctx.fillStyle = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71'][(r + c) % 4]; ctx.fillRect(140 + c * 62, 700 + r * 130, 44, 90); } ctx.restore();
  glow(380, 930, 600, 'rgba(200,255,230,.35)'); ctx.fillStyle = grad(0, 1280, 0, H, [[0, '#141a24'], [1, '#05070b']]); ctx.fillRect(0, 1280, W, H);
  ctx.save(); ctx.globalAlpha = .25; ctx.translate(0, 2560); ctx.scale(1, -1); ctx.fillStyle = 'rgba(140,255,190,.6)'; ctx.fillRect(150, 1230, 780, 60); ctx.fillStyle = 'rgba(225,255,240,.5)'; ctx.fillRect(120, 1050, 520, 220); ctx.restore(); // wet reflections
  rain(t, .18, 90); }
function busStopNight(t) { bg('#060912', '#0e1524'); ctx.fillStyle = '#0b0f18'; ctx.fillRect(0, 1180, W, H);
  ctx.fillStyle = 'rgba(160,200,255,.12)'; rr(120, 520, 840, 640, 10); ctx.fill(); ctx.strokeStyle = '#3a4252'; ctx.lineWidth = 12; ctx.strokeRect(120, 520, 840, 640); ctx.fillStyle = '#2a3242'; ctx.fillRect(100, 490, 880, 40);
  ctx.fillStyle = '#1f2633'; rr(220, 960, 640, 40, 10); ctx.fill(); ctx.fillRect(250, 1000, 20, 160); ctx.fillRect(810, 1000, 20, 160); // bench
  glow(540, 530, 520, 'rgba(255,220,160,.35)'); ctx.fillStyle = '#ffe1a8'; ctx.fillRect(400, 532, 280, 10); rain(t, .2, 110); }
function flashbackGrade() { ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'hsl(0,0%,50%)'; ctx.globalAlpha = .7; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(150,180,230,1)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function tag3(s, y, p, col = '#fff') { bigTitle(s, y, p, { size: 78, col }); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: scanner flashes red three times, her hand makes the signal straight into the lens
  draw(t, d, P, E) { const ts = E('спасла', 1, 4.2);
    if (t < 2.2) { bg('#120608', '#050203'); const fl = [0, .55, 1.1].reduce((m, b) => Math.max(m, 1 - prog(t, b, b + .35)), 0);
      ctx.save(); shake(t, fl * 8); cam(540, 900, lerp(1.25, 1.05, prog(t, 0, 2.2))); scanner(540, 1020, 1.3, fl); chocolate(560 + Math.sin(t * 3) * 10, 860, 1.4, -.08); ctx.restore();
      const n = Math.min(3, 1 + Math.floor(t / .55)); bigTitle('×' + n, 470, n === 3 && t > 1.3 ? 1 : .55 + .45 * eback(prog(t % .55, 0, .18)), { size: 200, col: RED2, glow: 'rgba(255,40,60,.8)' });
      bigTitle('ЭТО СПАСЛО ЕЙ ЖИЗНЬ', 270, 1, { size: 74, col: '#fff', glow: 'rgba(255,60,70,.6)' }); return; }
    if (t < 4) { shopBack(t); ctx.save(); cam(540, 760, lerp(1.0, 1.08, prog(t, 2.2, 4))); person(540, 4300, 3700, KASS({ light: -1 })); ctx.restore(); ctx.fillStyle = 'rgba(255,40,60,.08)'; ctx.fillRect(0, 0, W, H); return; }
    bg('#0b0c10', '#030304'); glow(540, 820, 900, 'rgba(255,60,70,.25)'); const k = prog(t, 4, d);
    helpHand(540, lerp(1000, 900, k), lerp(.95, 1.3, eio(k)), 1, prog(t, 4.3, 4.9), prog(t, 5, 5.8), { sleeve: '#2f5d7c' });
    bigTitle('ЭТО СПАСЛО ЕЙ ЖИЗНЬ', 270, t > ts - .1 ? 1 : .0001 + prog(t, 4, 4.3), { size: 74, col: '#fff', glow: 'rgba(255,60,70,.6)' }); },
  sfx(d) { return [[0, 'scan', .55], [.55, 'scan', .55], [1.1, 'scan', .55], [2.2, 'whoosh', .3], [4, 'boom', .3], [4.1, 'heartbeat', .3, { dur: d - 4 }]]; }
};
SC.street = {
  draw(t, d, P, E) { const tm = E('магазин', 1, 1.2); if (t < tm - .1) { blurred(2, () => shopExterior(0), 'ext'); rain(t, .18, 90); ctx.save(); ctx.globalAlpha = .9; person(lerp(-60, 300, prog(t, 0, d + 2)), 1300, 560, GIRL({ walk: (lerp(-60, 300, prog(t, 0, d + 2)) / (.64 * 560)) * Math.PI * 2 + .01 })); ctx.restore(); label('23:47', 900, 300, 64, { weight: 900, color: '#bfffd9', shadow: 'rgba(80,255,160,.8)' }); return; }
    ctx.save(); cam(540, 700, lerp(1.0, 1.35, eio(prog(t, tm - .1, d)))); shopExterior(t); ctx.restore(); },
  sfx(d) { return [[0, 'rain', .35, { dur: d }], [0, 'city', .2, { dur: d }], [.1, 'steps', .25, { dur: 1.2 }], [d - .5, 'door_chime', .35]]; }
};
SC.belt = {
  draw(t, d) { shopBack(t); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 0, W, H); ctx.save(); cam(540, 1120, 1.6); counterFront(1100, { beltT: t }); ctx.restore();
    const k = eout(prog(t, .2, 1.2)); chocolate(lerp(700, 500, k), lerp(760, 1080, k), 1.5, -.1); helpHand(lerp(760, 560, k), lerp(560, 860, k), .9, 0, 1, .55, { rot: 2.6, sleeve: '#2f5d7c' }); },
  sfx() { return [[.2, 'swoosh', .25], [1.2, 'thud_soft', .3], [0, 'store', .3, { dur: 2.5 }]]; }
};
SC.grip = {
  draw(t, d, P, E) { const tk = E('локоть', 1, 2.2), tu = E('улыбается', 1, 3.4);
    if (t < tk - .2) { blurred(3, () => shopBack(0), 'shop'); ctx.save(); cam(540, 900, 1.0 + t * .02); person(400, 2150, 1600, GIRL({ light: 1 })); person(720, 2180, 1700, MAN({ mouth: .4 })); counterFront(1250, { beltT: t }); ctx.restore(); return; }
    if (t < tu - .15) { bg('#20262a', '#0c0f12'); glow(540, 900, 900, 'rgba(220,255,240,.2)'); gripHand(540, 950, 1.2 + (t - tk) * .05); label('КРЕПКО ДЕРЖИТ', 540, 400, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)', alpha: prog(t, tk, tk + .3) }); return; }
    blurred(3, () => shopBack(0), 'shop'); ctx.save(); cam(720, 640, lerp(1.6, 1.9, prog(t, tu - .15, d))); person(720, 2180, 1700, MAN({ mouth: .6 })); ctx.restore(); },
  sfx(d, P, E) { return [[0, 'store', .3, { dur: d }], [E('локоть', 1, 2.2) - .2, 'thud_soft', .35], [E('улыбается', 1, 3.4) - .15, 'drone', .2, { dur: 1.5 }]]; }
};
SC.notice = { // cashier scans, then notices the girl's hand rising
  draw(t, d, P, E) { const tz = E('замечает', 1, 2.4), tr = E('руку', 1, 4.8);
    if (t < 1.6) { bg('#120608', '#050203'); ctx.save(); cam(540, 950, 1.1); scanner(540, 1020, 1.2, 1 - prog(t, .3, .7)); chocolate(560, 880, 1.3, -.05); ctx.restore(); return; }
    if (t < tz + .4) { shopBack(t); ctx.save(); cam(540, 760, lerp(1.0, 1.12, prog(t, 1.6, tz + .4))); person(540, 4300, 3700, KASS({ light: -1 })); ctx.restore(); return; }
    blurred(3, () => shopBack(0), 'shop'); ctx.save(); cam(400, 900, lerp(1.1, 1.3, prog(t, tz + .4, d))); person(720, 2180, 1700, MAN({ mouth: .4 })); person(400, 2150, 1600, GIRL({ armUp: eio(prog(t, tz + .5, tr)) * .9 })); counterFront(1250, { beltT: 0 }); ctx.restore();
    label('…МЕДЛЕННО', 540, 360, 64, { weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.7)', alpha: prog(t, tz + .6, tz + .9) }); },
  sfx(d, P, E) { return [[.3, 'scan', .5], [0, 'store', .3, { dur: d }], [E('замечает', 1, 2.4), 'heartbeat', .3, { dur: d - 2 }]]; }
};
SC.gesture = { // the signal, step by step, synced to the words
  draw(t, d, P, E) { const t1 = E('ладонь', 1, .1), t2 = E('палец', 1, 1.6), t3 = E('пальцы', 1, 3.1); bg('#0c0f14', '#030406'); glow(540, 820, 900, 'rgba(255,220,180,.22)');
    const th = eio(prog(t, t2 - .2, t2 + .5)), cu = eio(prog(t, t3 - .1, t3 + .9)); ctx.save(); cam(540, 860, 1.0 + t * .02); helpHand(540, 900, 1.35, 1, th, cu, { sleeve: '#2f5d7c' }); ctx.restore();
    const step = t < t2 - .2 ? 1 : t < t3 - .1 ? 2 : 3; for (let i = 1; i <= 3; i++) { const on = i <= step; ctx.fillStyle = on ? (i === step ? '#ffd23f' : 'rgba(255,255,255,.75)') : 'rgba(255,255,255,.15)'; ctx.beginPath(); ctx.arc(390 + (i - 1) * 150, 330, i === step ? 40 : 30, 0, 7); ctx.fill(); label(String(i), 390 + (i - 1) * 150, 345, i === step ? 44 : 32, { weight: 900, color: '#111' }); } },
  sfx(d, P, E) { return [[E('ладонь', 1, .1), 'pop', .3], [E('палец', 1, 1.6), 'pop', .3], [E('пальцы', 1, 3.1), 'pop', .35], [0, 'heartbeat', .3, { dur: d }]]; }
};
SC.freeze = { // cashier freezes, scans again and again, "the till froze"
  draw(t, d, P, E) { const t1 = E('раз', 1, 1.8), t2 = E('ещё', 2, 3.4), to = E('ой', 1, 3.6), tm = E('минутку', 1, 6);
    if (t < t1 - .3) { shopBack(t); ctx.save(); cam(540, 740, lerp(1.1, 1.3, prog(t, 0, t1))); person(540, 4300, 3700, KASS({ light: -1 })); ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'hsl(0,0%,50%)'; ctx.globalAlpha = .45; ctx.fillRect(0, 0, W, H); ctx.restore(); return; }
    if (t < to - .1) { bg('#120608', '#050203'); const fl = Math.max(1 - prog(t, t1 - .05, t1 + .3), 1 - prog(t, t2 - .05, t2 + .3)); ctx.save(); shake(t, fl * 6); cam(540, 950, 1.15); scanner(540, 1020, 1.2, fl); chocolate(560, 880, 1.3, -.05); ctx.restore();
      bigTitle(t < t2 - .05 ? '×2' : '×3', 420, 1, { size: 180, col: RED2, glow: 'rgba(255,40,60,.8)' }); return; }
    blurred(3, () => shopBack(0), 'shop'); ctx.save(); cam(540, 900, 1.05); person(260, 2300, 1800, KASS({ light: 1, mouth: Math.abs(Math.sin(t * 14)) * (t < tm + .4 ? .8 : 0) })); ctx.restore(); cashRegister(720, 980, 1.0, t, true); },
  sfx(d, P, E) { return [[E('раз', 1, 1.8) - .05, 'scan', .55], [E('ещё', 2, 3.4) - .05, 'scan', .55], [E('ой', 1, 3.6), 'errbeep', .4], [0, 'store', .25, { dur: d }]]; }
};
SC.panic = {
  draw(t, d, P, E) { const tn = E('жмёт', 1, 1.6); const press = eio(prog(t, tn - .1, tn + .25)); bg('#0d0e11', '#050506'); panicButton(540, 900, 1.0, press, t);
    bigFinger(540, lerp(470, 600, press) + Math.sin(t * 2) * 4, 1.0, undefined, Math.PI); if (press > .9) { label('СИГНАЛ ОТПРАВЛЕН', 540, 1260, 54, { weight: 900, color: '#ff8a92', shadow: 'rgba(255,40,60,.8)', alpha: prog(t, tn + .3, tn + .6) }); }
    label('ПОД ПРИЛАВКОМ', 540, 300, 56, { weight: 900, color: '#fff', alpha: prog(t, .2, .5) }); },
  sfx(d, P, E) { const tn = E('жмёт', 1, 1.6); return [[tn + .1, 'click', .5], [tn + .3, 'sonar', .35, { dur: 2.5 }]]; }
};
SC.police = { // he panics and drags her to the exit; the police are already at the door
  draw(t, d, P, E) { const tt = E('тянет', 1, 1.5), tp = E('полиция', 1, 5.6);
    if (t < tt - .1) { blurred(3, () => shopBack(0), 'shop'); ctx.save(); cam(720, 640, lerp(1.7, 2.0, prog(t, 0, tt))); shake(t, 1.5); person(720, 2180, 1700, MAN({ mouth: -.3 })); ctx.restore();
      const k = (t * 1.2) % 1; ctx.fillStyle = 'rgba(200,230,255,.8)'; ctx.beginPath(); ctx.ellipse(880, 520 + k * 120, 10, 16, 0, 0, 7); ctx.fill(); return; } // sweat drop
    if (t < tp - .6) { blurred(3, () => shopBack(0), 'shop'); const x = lerp(820, 380, eio(prog(t, tt - .1, tp - .6))), h = 760, st = .64 * h;
      person(x + 160, 1500, h * .95, GIRL({ walk: (x / st) * Math.PI * 2 * .9 + 1, flip: true })); person(x, 1500, h, MAN({ walk: (x / st) * Math.PI * 2 + .01, flip: true })); return; }
    shopExterior(t); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, H); policeLights(t, prog(t, tp - .6, tp)); ctx.save(); ctx.globalAlpha = prog(t, tp - .6, tp - .1);
    person(800, 1300, 640, COP({ light: -1, rim: 'rgba(120,160,255,.8)' })); person(930, 1310, 650, COP({ light: 1, rim: 'rgba(255,90,110,.7)' })); ctx.restore();
    if (t > tp) bigTitle('ПОЛИЦИЯ', 380, prog(t, tp, tp + .25), { size: 120, col: '#9fc0ff', glow: 'rgba(80,120,255,.8)' }); },
  sfx(d, P, E) { const tp = E('полиция', 1, 5.6); return [[0, 'heartbeat', .35, { dur: tp }], [E('тянет', 1, 1.5), 'steps', .3, { dur: 2 }], [tp - .6, 'siren', .25, { dur: d - tp + .6 }], [tp, 'dundun', .35]]; }
};
SC.flashback = { // the bus stop: a stranger sits next to her and whispers
  draw(t, d, P, E) { const tv = E('впервые', 1, 2.6), ts = E('шепнул', 1, 6), tk = E('кричать', 1, 7.4), tz = E('звонить', 1, 9);
    busStopNight(t); const h = 700; person(460, 1180, h, GIRL({ light: 1 }));
    const mx = lerp(1250, 700, eio(prog(t, .2, ts - .6))); if (t < ts - .6) person(mx, 1190, h * 1.05, MAN({ walk: ((1250 - mx) / (.64 * h)) * Math.PI * 2 + .01, flip: true })); else person(640, 1190, h * 1.05, MAN({ mouth: .3 }));
    if (t > ts) { for (let i = 0; i < 3; i++) { const k = ((t - ts) * .9 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.5 * (1 - k)})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(560, 560, 30 + k * 90, Math.PI * .8, Math.PI * 1.2); ctx.stroke(); }
      label('«У меня нож»', 380, 460, 50, { font: HAND, weight: 700, color: '#ffd0d0', alpha: prog(t, ts, ts + .3) * (1 - prog(t, tk - .2, tk)) }); }
    if (t > tk - .1) { label('🔇', 330, 440, 90, { alpha: prog(t, tk - .1, tk + .2) }); } if (t > tz - .1) { label('📵', 600, 440, 90, { alpha: prog(t, tz - .1, tz + .2) }); }
    flashbackGrade(); label('20 МИНУТ НАЗАД', 540, 290, 50, { weight: 900, color: '#d8e4ff', spacing: 4, alpha: prog(t, .1, .4) }); },
  sfx(d, P, E) { return [[0, 'rain', .3, { dur: d }], [0, 'drone', .25, { dur: d }], [.2, 'steps', .25, { dur: 2.5 }], [E('шепнул', 1, 6), 'whisper', .5]]; }
};
SC.signal = { // the international "Signal for Help", three steps side by side
  draw(t, d, P, E) { const ti = E('международный', 1, 2); bg('#101218', '#040506'); glow(540, 800, 900, 'rgba(255,210,120,.25)');
    if (t < ti - .2) { ctx.save(); cam(540, 880, 1.0 + t * .05); helpHand(540, 900, 1.3, 1, 1, 1, { sleeve: '#2f5d7c' }); ctx.restore(); return; }
    const st = [[0, 0], [1, 0], [1, 1]]; st.forEach(([th, cu], i) => { const k = eback(prog(t, ti - .2 + i * .25, ti + .2 + i * .25)); if (k <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k); helpHand(220 + i * 320, 900, .55 * k, 1, th, cu, { sleeve: '#2f5d7c' }); ctx.restore(); label(String(i + 1), 220 + i * 320, 1250, 60, { weight: 900, color: '#ffd23f', alpha: clamp(k) }); });
    bigTitle('«МНЕ НУЖНА ПОМОЩЬ»', 380, prog(t, ti + .3, ti + .6), { size: 78, col: '#ffd23f' }); },
  sfx(d, P, E) { const ti = E('международный', 1, 2); return [[ti - .2, 'pop', .3], [ti + .05, 'pop', .3], [ti + .3, 'pop', .3], [ti + .5, 'chime', .4]]; }
};
SC.remember = { // ending = loop back to frame 0: the hand into the lens
  draw(t, d, P, E) { bg('#0b0c10', '#030304'); glow(540, 820, 900, 'rgba(255,60,70,.22)'); const k = prog(t, 0, d);
    const cyc = (t * .55) % 1; helpHand(540, lerp(950, 880, k), lerp(1.15, 1.45, eio(k)), 1, eio(clamp(cyc * 3)), eio(clamp(cyc * 3 - 1)), { sleeve: '#2f5d7c' });
    bigTitle('ЗАПОМНИ ЭТОТ ЖЕСТ', 300, prog(t, .1, .4), { size: 76, col: '#fff', glow: 'rgba(255,60,70,.5)' }); },
  sfx(d) { return [[0, 'pad_swell', .3, { dur: d }]]; }
};
// render: scene → subtitles (no day HUD from the phone video)
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total) drawSubs(t); };
