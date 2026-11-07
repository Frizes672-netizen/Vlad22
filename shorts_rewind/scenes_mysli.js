// ===== RU Short: "Ты проснулся — и слышишь мысли людей" (what-if story with a twist; helpers from episode 1 are loaded before this file) =====
const HERO2 = (o = {}) => Object.assign({ top: '#3b4a5c', pants: '#2a2f3a', hair: '#3a2618', skin: '#e6b99c', eyes: '#5b6b62', light: 1, shoe: '#e8e6ea' }, o);
const NEIGHB = (o = {}) => Object.assign({ top: '#6b5a48', pants: '#2a2d33', hair: '#8a8580', skin: '#e2b08e', light: -1, heavy: .5 }, o);
const BARISTA = (o = {}) => Object.assign({ fem: true, uniform: 'maid', top: '#3a2a20', pants: '#3a2a20', hair: '#7a4a2a', skin: '#ecc2a8', light: 1 }, o);
const BOSS2 = (o = {}) => Object.assign({ uniform: 'office', top: '#f3f5f8', tie: '#7a1f2a', pants: '#23262e', hair: '#2a1a12', skin: '#e2b08e', light: 1, heavy: .3 }, o);
const THINK2 = '#5b2bd6', GOLDT = '#ffcf4a';
const HCU = [540, 3150, 2500]; // hero close-up
const ANYA2 = (o = {}) => Object.assign({ fem: true, top: '#c0506a', pants: '#2a2f3a', hair: '#8a5a32', skin: '#efc6ab', eyes: '#6b8a5a', light: -1 }, o);
const ACU2 = [560, 3100, 2400];

// ---------- bubbles ----------
function wrapLines(s, maxW, size) { ctx.font = `900 ${size}px ${F_HEAD}`; const out = []; let line = ''; for (const w of s.split(' ')) { const tr = line ? line + ' ' + w : w; if (ctx.measureText(tr).width > maxW && line) { out.push(line); line = w; } else line = tr; } if (line) out.push(line); return out; }
function bubbleText(lines, size, col) { lines.forEach((l, i) => label(l, 0, (i - (lines.length - 1) / 2) * size * 1.15 + size * .35, size, { weight: 900, color: col })); }
function speechBubble(x, y, s, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)), size = o.size || 52, lines = wrapLines(s, o.w || 560, size), w = Math.min(o.w || 560, Math.max(...lines.map(l => { ctx.font = `900 ${size}px ${F_HEAD}`; return ctx.measureText(l).width; }))) + 80, h = lines.length * size * 1.15 + 60;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; rr(-w / 2 + 8, -h / 2 + 10, w, h, 40); ctx.fill(); ctx.fillStyle = o.gold ? '#fff7dc' : '#ffffff'; rr(-w / 2, -h / 2, w, h, 40); ctx.fill();
  const tx = (o.tail || 0) * w * .3; ctx.beginPath(); ctx.moveTo(tx - 30, h / 2 - 4); ctx.lineTo(tx + 30, h / 2 - 4); ctx.lineTo(tx - 10 + (o.tail || 0) * 30, h / 2 + 50); ctx.closePath(); ctx.fill();
  if (o.gold) { ctx.strokeStyle = GOLDT; ctx.lineWidth = 8; rr(-w / 2, -h / 2, w, h, 40); ctx.stroke(); } bubbleText(lines, size, '#15171c'); ctx.restore(); }
function thoughtBubble(x, y, s, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)), size = o.size || 52, lines = wrapLines(s, o.w || 560, size), w = Math.min(o.w || 560, Math.max(...lines.map(l => { ctx.font = `900 ${size}px ${F_HEAD}`; return ctx.measureText(l).width; }))) + 100, h = lines.length * size * 1.15 + 80, col = o.gold ? '#fff7dc' : THINK2;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); if (o.gold) glow(0, 0, w, 'rgba(255,207,74,.45)');
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(10, 12, w / 2, h / 2, 0, 0, 7); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, 7); ctx.fill();
  for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; ctx.beginPath(); ctx.arc(Math.cos(a) * w * .46, Math.sin(a) * h * .44, h * .2, 0, 7); ctx.fill(); } // cloud bumps
  const dx = o.toX ?? 0, dy = o.toY ?? h; for (let i = 0; i < 3; i++) { const q = (i + 1) / 4; ctx.beginPath(); ctx.arc(dx * q, h / 2 + (dy - h / 2) * q, 22 - i * 6, 0, 7); ctx.fill(); } // trail of dots to the head
  if (o.gold) { ctx.strokeStyle = GOLDT; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(0, 0, w / 2 + 6, h / 2 + 6, 0, 0, 7); ctx.stroke(); } bubbleText(lines, size, o.gold ? '#15171c' : '#ffffff'); ctx.restore(); }

// ---------- places ----------
function bedroomMorningDraw() { bg('#e9dcc8', '#c9b89c'); ctx.fillStyle = grad(0, 160, 0, 900, [[0, '#ffe4b0'], [1, '#fff3da']]); ctx.fillRect(620, 160, 380, 640); ctx.strokeStyle = '#fff'; ctx.lineWidth = 18; ctx.strokeRect(620, 160, 380, 640); ctx.beginPath(); ctx.moveTo(810, 160); ctx.lineTo(810, 800); ctx.stroke(); glow(810, 480, 700, 'rgba(255,220,150,.6)');
  ctx.fillStyle = '#7a5a8a'; ctx.fillRect(560, 140, 60, 720); ctx.fillRect(1000, 140, 60, 720); ctx.fillStyle = '#5a7a9a'; rr(40, 900, 1000, 300, 30); ctx.fill(); ctx.fillStyle = '#f3efe6'; rr(80, 860, 380, 120, 50); ctx.fill(); ctx.fillStyle = '#4a6a8a'; ctx.fillRect(0, 1180, W, 740); }
function elevatorDraw() { bg('#9aa3ad', '#5a636d'); for (let i = 0; i < 5; i++) { ctx.fillStyle = grad(i * 216, 0, i * 216 + 216, 0, [[0, '#b8c0c8'], [.5, '#dfe5ea'], [1, '#a8b0b8']]); ctx.fillRect(i * 216, 0, 214, 1500); } ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(0, 0, W, 60); glow(540, 30, 600, 'rgba(255,255,240,.6)');
  ctx.fillStyle = '#2a2f36'; rr(880, 600, 140, 360, 12); ctx.fill(); for (let i = 0; i < 9; i++) { ctx.fillStyle = i === 2 ? '#ffcf4a' : '#c9ced6'; ctx.beginPath(); ctx.arc(915 + (i % 2) * 70, 650 + Math.floor(i / 2) * 70, 22, 0, 7); ctx.fill(); } ctx.fillStyle = '#3a3f46'; ctx.fillRect(0, 1500, W, 420); label('9', 950, 560, 60, { weight: 900, color: '#ff4d57', font: MONO }); }
function cafeDraw() { bg('#3a2a20', '#1a120c'); ctx.fillStyle = '#e9e0d0'; ctx.fillRect(0, 0, W, 1000); ctx.fillStyle = '#1d1f24'; rr(120, 120, 840, 360, 20); ctx.fill(); ['Cappuccino .. $4.20', 'Latte ......... $4.50', 'Mocha ......... $4.80', 'Americano .. $3.20'].forEach((s, i) => label(s, 170, 200 + i * 75, 44, { align: 'left', weight: 800, color: '#f2efe6', font: HAND }));
  ctx.fillStyle = '#c9ced6'; rr(640, 600, 340, 360, 24); ctx.fill(); ctx.fillStyle = '#2a2d33'; rr(680, 660, 260, 120, 12); ctx.fill(); ctx.fillStyle = '#8a5a30'; ctx.fillRect(0, 1000, W, 920); glow(540, 100, 700, 'rgba(255,230,180,.5)'); }
function officeDraw() { bg('#dfe6ee', '#b8c4d0'); ctx.fillStyle = '#f6f8fb'; ctx.fillRect(0, 0, W, 160); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#fff'; rr(60 + i * 260, 50, 200, 40, 10); ctx.fill(); }
  ctx.fillStyle = 'rgba(180,205,230,.55)'; ctx.fillRect(0, 200, W, 760); ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let y = 420; y < 520; y += 26) ctx.fillRect(0, y, W, 12); for (let i = 0; i < 5; i++) { ctx.fillStyle = '#1b2333'; rr(40 + i * 220, 900, 150, 100, 8); ctx.fill(); } ctx.fillStyle = '#d5dde7'; ctx.fillRect(0, 1000, W, 920); }
function metroDraw() { bg('#3a4048', '#1a1d22'); ctx.fillStyle = '#c9ced6'; ctx.fillRect(0, 120, W, 40); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#10161e'; rr(40 + i * 350, 260, 300, 380, 30); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let k = 0; k < 6; k++) ctx.fillRect(40 + i * 350, 300 + k * 60, 300, 10); } // dark tunnel windows
  ctx.strokeStyle = '#b8bec8'; ctx.lineWidth = 14; for (let x = 120; x < W; x += 280) { ctx.beginPath(); ctx.moveTo(x, 160); ctx.lineTo(x, 1500); ctx.stroke(); } ctx.fillStyle = '#4a5260'; ctx.fillRect(0, 1500, W, 420); glow(540, 140, 800, 'rgba(255,255,230,.35)'); }
function eveningStreetDraw() { ctx.fillStyle = grad(0, 0, 0, 1000, [[0, '#1c2a4a'], [.6, '#5a4a6a'], [1, '#e89a6a']]); ctx.fillRect(0, 0, W, 1100); ctx.fillStyle = '#2a2f3a'; ctx.fillRect(560, 300, 460, 860); for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) { const R = rnd(r * 9 + c); ctx.fillStyle = R() > .4 ? 'rgba(255,210,140,.9)' : 'rgba(40,50,70,.9)'; ctx.fillRect(600 + c * 105, 340 + r * 100, 60, 60); } // a panel block with lit windows
  ctx.fillStyle = '#3a3f46'; ctx.fillRect(0, 1160, W, 760); ctx.fillStyle = '#5a5f66'; ctx.fillRect(0, 1160, W, 30); }
function catSit(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const tail = Math.sin(t * 3) * .3; ctx.strokeStyle = '#d9822b'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(110, 40); ctx.quadraticCurveTo(260, 0 + tail * 80, 220, -160 + tail * 60); ctx.stroke(); // ginger cat sitting, tail swishing
  ctx.fillStyle = grad(-140, -200, 140, 80, [[0, '#f0a050'], [1, '#c06a1e']]); ctx.beginPath(); ctx.ellipse(0, -60, 140, 170, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#f7e6d0'; ctx.beginPath(); ctx.ellipse(0, -20, 70, 110, 0, 0, 7); ctx.fill();
  ctx.fillStyle = grad(-110, -380, 110, -180, [[0, '#f0a050'], [1, '#c87420']]); ctx.beginPath(); ctx.arc(0, -290, 110, 0, 7); ctx.fill(); for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 40, -380); ctx.lineTo(k * 100, -440); ctx.lineTo(k * 100, -330); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f7c6b0'; ctx.beginPath(); ctx.moveTo(k * 55, -375); ctx.lineTo(k * 92, -420); ctx.lineTo(k * 92, -350); ctx.closePath(); ctx.fill(); ctx.fillStyle = grad(-110, -380, 110, -180, [[0, '#f0a050'], [1, '#c87420']]); }
  ctx.strokeStyle = 'rgba(140,70,20,.6)'; ctx.lineWidth = 8; for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(k * (30 + i * 22), -390); ctx.lineTo(k * (40 + i * 22), -350); ctx.stroke(); } // stripes
  for (const k of [-1, 1]) { ctx.fillStyle = '#9ad06a'; ctx.beginPath(); ctx.ellipse(k * 42, -300, 26, 30, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(k * 42, -300, 8, 24, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(k * 42 + 8, -310, 6, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#e88a9a'; ctx.beginPath(); ctx.moveTo(-12, -262); ctx.lineTo(12, -262); ctx.lineTo(0, -248); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 3; for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(k * 30, -250 + i * 8); ctx.lineTo(k * 130, -265 + i * 18); ctx.stroke(); }
  ctx.fillStyle = '#e8963e'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 55, 100, 45, 28, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function handshake(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f3f5f8'; rr(-700, -60, 520, 120, 50); ctx.fill(); ctx.fillStyle = '#3b4a5c'; rr(180, -60, 520, 120, 50); ctx.fill(); // two sleeves
  ctx.fillStyle = grad(-200, -90, 200, 90, [[0, '#e2b08e'], [1, '#c88e6a']]); rr(-230, -90, 260, 180, 70); ctx.fill(); ctx.fillStyle = grad(-60, -80, 240, 80, [[0, '#f0c4a4'], [1, '#d8a07c']]); rr(-40, -80, 260, 170, 70); ctx.fill();
  ctx.strokeStyle = 'rgba(120,60,40,.35)'; ctx.lineWidth = 4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-20 + i * 46, -70); ctx.quadraticCurveTo(-10 + i * 46, 0, -20 + i * 46, 70); ctx.stroke(); } ctx.restore(); }
function heroCU(t, o = {}) { person(HCU[0], HCU[1], HCU[2], HERO2(Object.assign({ fear: o.fear || 0, mouth: o.mouth || 0, smile: o.smile || 0 }, o))); }
const HEAD_H = [HCU[0], HCU[1] - 93.2 * HCU[2] / 100];
const NOISE = ['Опять кредит…', 'Ненавижу понедельники', 'Она мне врёт', 'Где взять денег?', 'Скорее бы домой', 'Только бы не уволили', 'Зачем я это сказал', 'Он на меня смотрит?', 'Опоздаю…', 'Всё бесит', 'Я ей не нужен', 'Долг 300 тысяч'];

function reactionCU(t, bgKey, bgFn, txt, o = {}) { ctx.drawImage(layer(bgKey, bgFn, 7), 0, 0); grade('rgba(20,20,40,1)', .25); ctx.save(); cam(HEAD_H[0] + (o.dx || 0), HEAD_H[1] + 80, 2.1 + .1 * Math.sin(t)); heroCU(t, { fear: o.fear ?? .35, tilt: .04 }); ctx.restore(); if (txt) thoughtBubble(540, 430, txt, 1, { size: 54, w: 640, toX: 60, toY: 240 }); vign(.4); }
// ================== SCENES ==================
SC.hook = { // FRAME 0: eyes snap open — dozens of purple thought clouds burst around his head
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); ctx.drawImage(layer('bed', bedroomMorningDraw, 4), 0, 0); ctx.save(); cam(540, 900, lerp(1.2, 1.05, eout(prog(t, 0, .6)))); shake(t, t < .4 ? 8 : 0); heroCU(t, { fear: lerp(.2, .9, prog(t, 0, .4)) }); ctx.restore();
    NOISE.slice(0, 8).forEach((n, i) => { const a = i / 8 * 6.283 + .3, r = lerp(150, 420, eout(prog(t, .05 + i * .05, .5 + i * .05))); thoughtBubble(540 + Math.cos(a) * r * 1.05, 980 + Math.sin(a) * r * .75, n, prog(t, .05 + i * .05, .3 + i * .05), { size: 34, w: 300, toX: -Math.cos(a) * 80, toY: 120 }); });
    bigTitle('СЛЫШУ МЫСЛИ', 300, prog(t, 0, .15), { size: 110, col: '#fff', glow: 'rgba(120,80,255,.7)' }); if (t > t2 - .05) label('…И О БЛИЗКИХ', 540, 420, 56, { weight: 900, color: GOLDT, alpha: prog(t, t2 - .05, t2 + .2) }); },
  sfx(d) { return [[0, 'boom', .4], [.05, 'popseq', .3, { n: 8, step: .06 }], [0, 'whisper', .3], [.6, 'crowd', .2, { dur: d - .6 }]]; }
};
SC.cat = { // "Семь утра. Кот смотрит на тебя и думает: «Наконец-то. Корми»."
  draw(t, d, P, E, s) { const t1 = s.U(s.a + 1), tq = s.U(s.a + 2); ctx.drawImage(layer('bed', bedroomMorningDraw, 3), 0, 0); ctx.save(); const cz = eio(prog(t, tq - .3, tq + .5)); cam(lerp(540, 560, cz), lerp(1100, 1050, cz), lerp(1.0, 1.6, cz)); catSit(560, 1500, 1.4, t); ctx.restore();
    if (t < t1 - .05) { wallClockBig(820, 380, 150, 0); bigTitle('7:00', 300, prog(t, 0, .2), { size: 130, col: '#fff' }); return; } thoughtBubble(540, 480, 'Наконец-то. Корми.', prog(t, tq - .1, tq + .2), { size: 64, w: 640, toX: 0, toY: 260 }); },
  sfx(d, P, E, s) { return [[0, 'clock', .4, { dur: s.U(s.a + 1) }], [s.U(s.a + 2) - .1, 'pop', .4], [s.U(s.a + 2) + .3, 'boing_soft', .3]]; }
};
SC.lift = { // neighbour in the lift: "Доброе утро!" — thinks: "Опять он. Хоть бы по лестнице ходил."
  draw(t, d, P, E, s) { const ts = E('доброе', 1, 1.6), tt = s.U(s.a + 2); ctx.drawImage(layer('lift', elevatorDraw, 2), 0, 0); ctx.save(); cam(540, 900, 1.0); person(340, 2250, 1600, NEIGHB({ smile: .7, mouth: talking(t, s, ts - .1, ts + .8) })); person(820, 2450, 1700, HERO2({ shadow: false })); ctx.restore();
    speechBubble(380, 520, 'Доброе утро!', prog(t, ts - .1, ts + .15), { tail: -.4, size: 60 }); thoughtBubble(560, 1080, 'Опять он. Хоть бы по лестнице ходил.', prog(t, tt - .1, tt + .2), { size: 50, w: 600, toX: -180, toY: 260 }); if (t > tt + 1.6) reactionCU(t, 'lift', elevatorDraw, 'Ну спасибо…', { fear: .4 }); },
  sfx(d, P, E, s) { return [[0, 'door_chime', .3], [0, 'hum', .2, { dur: d }], [E('доброе', 1, 1.6) - .1, 'pop', .35], [s.U(s.a + 2) - .1, 'pop', .35]]; }
};
SC.barista = { // "Хорошего дня!" — "Только не он. Он вечно меняет заказ."
  draw(t, d, P, E, s) { const ts = E('хорошего', 1, .6), tt = s.U(s.a + 2); ctx.drawImage(layer('cafe', cafeDraw, 3), 0, 0); ctx.save(); cam(540, 950, 1.05); person(420, 2300, 1600, BARISTA({ smile: .8, mouth: talking(t, s, ts - .1, ts + .8) })); ctx.restore(); ctx.fillStyle = '#5a3a20'; ctx.fillRect(0, 1350, W, 600); ctx.fillStyle = '#f2efe6'; rr(700, 1220, 120, 150, 14); ctx.fill(); // counter + cup
    speechBubble(420, 520, 'Хорошего дня!', prog(t, ts - .1, ts + .15), { tail: 0, size: 60 }); thoughtBubble(600, 1080, 'Только не он. Он вечно меняет заказ.', prog(t, tt - .1, tt + .2), { size: 50, w: 600, toX: -160, toY: 240 }); if (t > tt + 1.6) reactionCU(t, 'cafe', cafeDraw, 'Я же всегда беру латте…', { fear: .3 }); },
  sfx(d, P, E, s) { return [[0, 'crowd', .2, { dur: d }], [.2, 'pour', .25], [E('хорошего', 1, .6) - .1, 'pop', .35], [s.U(s.a + 2) - .1, 'pop', .35]]; }
};
SC.boss = { // "Отличный отчёт!" — "В пятницу сокращу."
  draw(t, d, P, E, s) { const ts = E('отличный', 1, 2), tt = s.U(s.a + 2); ctx.drawImage(layer('office2', officeDraw, 3), 0, 0); ctx.save(); cam(540, 900, 1.0); person(320, 2280, 1700, BOSS2({ smile: .8, mouth: talking(t, s, ts - .1, ts + .8) })); ctx.restore(); handshake(560, 1280, .9);
    speechBubble(360, 480, 'Отличный отчёт!', prog(t, ts - .1, ts + .15), { tail: -.2, size: 60 }); thoughtBubble(640, 1080, 'В пятницу сокращу.', prog(t, tt - .1, tt + .2), { size: 64, w: 520, toX: -220, toY: 200 }); if (t > tt + .3) grade('rgba(120,20,30,1)', .2 * prog(t, tt + .3, tt + .8)); if (t > tt + 1.4) { reactionCU(t, 'office2', officeDraw, null, { fear: .8 }); grade('rgba(120,20,30,1)', .25); bigTitle('СОКРАЩУ?!', 300, prog(t, tt + 1.4, tt + 1.6), { size: 120, col: '#ff6b74' }); } },
  sfx(d, P, E, s) { return [[0, 'office', .2, { dur: d }], [E('отличный', 1, 2) - .1, 'pop', .35], [s.U(s.a + 2) - .1, 'dundun', .4]]; }
};
SC.worse = { // "Но самое страшное было не это."
  draw(t, d) { bg('#120608', '#050203'); ctx.save(); cam(HEAD_H[0], HEAD_H[1] + 60, lerp(2.2, 2.6, prog(t, 0, d))); heroCU(t, { fear: .8 }); ctx.restore(); grade('rgba(90,10,20,1)', .4); vign(.7); bigTitle('САМОЕ СТРАШНОЕ ВПЕРЕДИ', 300, prog(t, 0, .2), { size: 70, col: '#ff6b74' }); },
  sfx(d) { return [[0, 'drone', .35, { dur: d }]]; }
};
SC.metro = { // "Выключить это нельзя. В метро на тебя обрушиваются сотни голосов сразу. Кто-то считает долги. Кто-то злится. Кто-то врёт."
  draw(t, d, P, E, s) { const t2 = .3, tb = s.U(s.b); ctx.drawImage(layer('metro', metroDraw, 3), 0, 0); ctx.save(); cam(540, 1000, lerp(1.0, 1.1, prog(t, 0, d)));
    const C = [['#5a4a3a', '#8a8580', 0], ['#2a4a6a', '#2a1a12', 1], ['#7a2a3a', '#b08850', 1], ['#3a5a3a', '#3a2618', 0], ['#4a3a5a', '#6b4a2c', 1]]; C.forEach(([top, hair, fem], i) => person(100 + i * 220, 2050 + (i % 2) * 60, 1250 + (i % 3) * 60, { top, hair, fem: !!fem, light: 1, shadow: false })); heroCU(t, { fear: .9 }); ctx.restore();
    const n = Math.floor(lerp(1, NOISE.length * 2, clamp((t - t2 + .5) / (d - t2 + .2)))); for (let i = 0; i < n; i++) { const R = rnd(i * 13 + 7); thoughtBubble(120 + R() * 840, 300 + R() * 1000, NOISE[i % NOISE.length], 1, { size: 30, w: 280, toX: (R() - .5) * 100, toY: 90 }); } // the noise piles up
    if (t > tb - .05) bigTitle('НЕ ВЫКЛЮЧИТЬ', 300, prog(t, tb - .05, tb + .2), { size: 110, col: '#fff' }); else bigTitle('СОТНИ ГОЛОСОВ', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'bus', .3], [.2, 'crowd', .45, { dur: d }], [.3, 'riser', .35, { dur: d - .3 }]]; }
};
SC.realize = { // "К вечеру ты понимаешь: люди почти всегда говорят одно — а думают другое."
  draw(t, d, P, E, s) { bg('#1a1d2a', '#07080d'); glow(540, 900, 800, 'rgba(120,80,255,.2)'); const tg = E('говорят', 1, d * .45), tdu = E('думают', 1, d * .75);
    speechBubble(300, 760, 'ГОВОРЯТ', prog(t, tg - .1, tg + .15), { size: 80, w: 500 }); thoughtBubble(780, 1080, 'ДУМАЮТ', prog(t, tdu - .1, tdu + .15), { size: 80, w: 500, toX: -60, toY: 160 }); if (t > tdu) label('≠', 540, 980, 220, { weight: 900, color: '#ff4d57', alpha: prog(t, tdu, tdu + .2) });
    bigTitle('К ВЕЧЕРУ', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); },
  sfx(d, P, E) { return [[E('говорят', 1, d * .45) - .1, 'pop', .4], [E('думают', 1, d * .75) - .1, 'pop', .4], [E('думают', 1, d * .75) + .1, 'dundun', .3]]; }
};
SC.tomom = { // "И ты едешь к маме. Просто чтобы спрятаться."
  draw(t, d) { ctx.drawImage(layer('evening', eveningStreetDraw, 1), 0, 0); const x = lerp(-100, 520, prog(t, 0, d)); personSide(x - 220, 1500, 1000, ANYA2({ walk: t * 7 + 1.5 })); personSide(x, 1500, 1100, HERO2({ walk: t * 7 })); bigTitle('К МАМЕ', 300, prog(t, 0, .2), { size: 120, col: GOLDT, glow: 'rgba(255,200,80,.5)' }); },
  sfx(d) { return [[0, 'steps', .3, { dur: d }], [0, 'city', .2, { dur: d }]]; }
};
SC.door = { // "Она открывает дверь и ворчит: «Опять похудел. Опять не ешь»."
  draw(t, d, P, E, s) { const ts = s.U(s.a + 1); ctx.save(); cam(560, 900, lerp(1.0, 1.08, prog(t, 0, d))); ctx.drawImage(layer('hallway', hallwayDraw, 2), 0, 0); grade('rgba(255,210,150,1)', .12, 'lighter'); person(560, 2330, 1600, GAL({ light: -1, mouth: talking(t, s, ts - .1, d), fear: 0 })); ctx.restore();
    speechBubble(540, 440, 'Опять похудел. Опять не ешь.', prog(t, ts - .1, ts + .2), { size: 58, w: 700, tail: 0 }); },
  sfx(d) { return [[0, 'door_chime', .35], [0, 'clock', .2, { dur: d }]]; }
};
SC.listen = { // "Ты слушаешь её мысли. И замираешь."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); ctx.drawImage(layer('hallway', hallwayDraw, 6), 0, 0); grade('rgba(255,210,150,1)', .1, 'lighter'); ctx.save(); cam(HEAD_H[0], HEAD_H[1] + 60, lerp(1.9, t > t2 ? 2.4 : 2.0, prog(t, 0, d))); heroCU(t, { fear: t > t2 ? .6 : .3 }); ctx.restore();
    bigTitle(t < t2 - .05 ? 'ЕЁ МЫСЛИ…' : 'ТЫ ЗАМЕР', 300, t < t2 - .05 ? prog(t, 0, .2) : prog(t, t2 - .05, t2 + .2), { size: 110, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'heartbeat', .3, { dur: d }], [s.U(s.a + 1), 'shimmer', .3]]; }
};
SC.same = { // "Она думает ровно то же самое. Слово в слово."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); ctx.save(); cam(560, 900, 1.05); ctx.drawImage(layer('hallway', hallwayDraw, 2), 0, 0); grade('rgba(255,210,150,1)', .15, 'lighter'); person(560, 2330, 1600, GAL({ light: -1, smile: .5 })); ctx.restore();
    const g = t > t2 - .05 ? prog(t, t2 - .05, t2 + .3) : 0; speechBubble(330, 420, 'Опять похудел. Опять не ешь.', 1, { size: 46, w: 460, tail: .3, gold: g > .5 }); thoughtBubble(760, 760, 'Опять похудел. Опять не ешь.', prog(t, 0, .3), { size: 46, w: 460, toX: -200, toY: 240, gold: g > .5 });
    if (g > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 600, 700, `rgba(255,200,80,${.35 * g})`); ctx.restore(); } bigTitle(t < t2 - .05 ? 'ТО ЖЕ САМОЕ' : 'СЛОВО В СЛОВО', 1180, t < t2 - .05 ? prog(t, 0, .2) : prog(t, t2 - .05, t2 + .2), { size: 96, col: GOLDT }); },
  sfx(d, P, E, s) { return [[0, 'pop', .35], [s.U(s.a + 1) - .05, 'chime', .45], [0, 'pad_swell', .3, { dur: d }]]; }
};
SC.final = { // "За целый день — единственный человек, у которого мысли совпали со словами."
  draw(t, d) { ctx.save(); cam(560, 950, lerp(1.0, 1.1, prog(t, 0, d))); ctx.drawImage(layer('hallway', hallwayDraw, 2), 0, 0); grade('rgba(255,210,150,1)', .18, 'lighter'); person(380, 2330, 1600, GAL({ light: -1, smile: .7 })); person(780, 2420, 1750, HERO2({ smile: .6 })); ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 700, 800, 'rgba(255,200,80,.25)'); ctx.restore();
    bigTitle('ЕДИНСТВЕННЫЙ ЧЕЛОВЕК', 300, prog(t, d * .35, d * .35 + .25), { size: 68, col: GOLDT, glow: 'rgba(255,200,80,.5)' }); },
  sfx(d) { return [[0, 'pad_swell', .35, { dur: d }], [d * .35, 'chime', .35]]; }
};

function cafeEveningDraw() { bg('#2a1a14', '#0e0806'); ctx.fillStyle = '#3a2418'; ctx.fillRect(0, 0, W, 1200); for (let i = 0; i < 6; i++) { glow(120 + i * 170, 220, 160, 'rgba(255,200,120,.45)'); ctx.fillStyle = '#ffe2a8'; ctx.beginPath(); ctx.arc(120 + i * 170, 220, 14, 0, 7); ctx.fill(); } // string lights
  ctx.fillStyle = '#1a2a3a'; ctx.fillRect(620, 360, 380, 520); ctx.fillStyle = 'rgba(255,210,140,.5)'; for (let i = 0; i < 14; i++) { const R = rnd(i + 4); ctx.fillRect(640 + R() * 340, 420 + R() * 420, 10, 8); } ctx.fillStyle = '#5a3a28'; ctx.fillRect(0, 1200, W, 720); }
function candle(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f2ead8'; rr(-24, -90, 48, 100, 8); ctx.fill(); ctx.fillStyle = `rgba(255,190,80,${.85 + .15 * Math.sin(t * 20)})`; ctx.beginPath(); ctx.ellipse(Math.sin(t * 9) * 3, -112, 12, 26, 0, 0, 7); ctx.fill(); glow(0, -110, 160, 'rgba(255,190,90,.5)'); ctx.restore(); }
function pregTest(x, y, s, p) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.rotate(-.2); ctx.scale(s * k, s * k); ctx.fillStyle = 'rgba(0,0,0,.3)'; rr(-50 + 8, -260 + 10, 100, 520, 50); ctx.fill(); ctx.fillStyle = '#ffffff'; rr(-50, -260, 100, 520, 50); ctx.fill(); ctx.fillStyle = '#7ac0e8'; rr(-50, 120, 100, 140, 40); ctx.fill();
  ctx.fillStyle = '#e8eef2'; rr(-28, -150, 56, 150, 12); ctx.fill(); ctx.fillStyle = '#d6336c'; ctx.fillRect(-20, -120, 40, 8); ctx.fillRect(-20, -70, 40, 8); ctx.restore(); } // two lines
SC.anya = { // "В обед прибегает Аня. Целует: «Скучаю!» А в мыслях: «Надо сказать ему правду. Сегодня. Он не готов»."
  draw(t, d, P, E, s) { const tk = E('скучаю', 1, 2.2), tt = s.U(s.a + 3); ctx.drawImage(layer('cafe', cafeDraw, 5), 0, 0); ctx.save(); cam(540, 900, 1.0); person(380, 2250, 1550, ANYA2({ smile: .7, mouth: talking(t, s, tk - .1, tk + .6) })); person(760, 2350, 1700, HERO2({ smile: .5, shadow: false })); ctx.restore();
    if (t < s.U(s.a + 1) - .05) bigTitle('ОБЕД. АНЯ', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); speechBubble(360, 480, 'Скучаю!', prog(t, tk - .1, tk + .15), { tail: -.2, size: 64 });
    thoughtBubble(560, 1080, 'Надо сказать ему правду. Сегодня. Он не готов.', prog(t, tt - .1, tt + .2), { size: 46, w: 640, toX: -180, toY: 240 }); if (t > tt + .4) grade('rgba(40,30,90,1)', .25 * prog(t, tt + .4, tt + 1)); if (t > tt + 1.8) { reactionCU(t, 'cafe', cafeDraw, null, { fear: .9 }); bigTitle('КАКУЮ ПРАВДУ?', 300, prog(t, tt + 1.8, tt + 2), { size: 100, col: '#ff6b74' }); } },
  sfx(d, P, E, s) { return [[0, 'crowd', .2, { dur: d }], [E('скучаю', 1, 2.2) - .1, 'pop', .35], [s.U(s.a + 3) - .1, 'dundun', .4]]; }
};
SC.worry = { // "Весь день ты не находишь себе места. Какую правду? Кто-то другой?"
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), t3 = s.U(s.a + 2); ctx.drawImage(layer('office2', officeDraw, 5), 0, 0); grade('rgba(30,30,70,1)', .45); ctx.save(); cam(HEAD_H[0], HEAD_H[1] + 160, 1.6); heroCU(t, { fear: .7 }); ctx.restore();
    if (t > t3 - .1) { ctx.save(); ctx.globalAlpha = .55 * prog(t, t3 - .1, t3 + .3); person(840, 1500, 900, { color: '#0b0d12', silhouette: true, shadow: false }); ctx.restore(); }
    bigTitle(t < t2 - .05 ? 'ВЕСЬ ДЕНЬ' : t < t3 - .05 ? 'КАКУЮ ПРАВДУ?' : 'КТО-ТО ДРУГОЙ?', 300, t < t2 - .05 ? prog(t, 0, .2) : t < t3 - .05 ? prog(t, t2 - .05, t2 + .2) : prog(t, t3 - .05, t3 + .2), { size: 100, col: t < t2 - .05 ? '#fff' : '#ff6b74' }); },
  sfx(d, P, E, s) { return [[0, 'clock', .4, { dur: d }], [s.U(s.a + 2), 'heartbeat', .35, { dur: d - s.U(s.a + 2) }]]; }
};
SC.date = { // "Вечером Аня садится напротив. Берёт тебя за руку: «Нам надо поговорить». Ты готовишься услышать самое страшное. И слушаешь её мысли."
  draw(t, d, P, E, s) { const tp = s.U(s.a + 2), tb = s.U(s.a + 3); ctx.drawImage(layer('cafeEve', cafeEveningDraw, 4), 0, 0);
    if (t < tb - .05) { ctx.save(); cam(560, 950, lerp(1.0, 1.1, prog(t, 0, tb))); person(ACU2[0], 2350, 1650, ANYA2({ smile: .2, mouth: talking(t, s, tp - .1, tb), light: -1 })); ctx.restore(); ctx.fillStyle = '#5a3a28'; ctx.fillRect(0, 1350, W, 600); candle(300, 1340, 1.0, t); candle(800, 1340, .8, t);
      speechBubble(540, 460, 'Нам надо поговорить.', prog(t, tp - .1, tp + .15), { size: 62, w: 640 }); if (t < tp - .1) bigTitle('ВЕЧЕР', 300, prog(t, 0, .2), { size: 120, col: GOLDT }); return; }
    ctx.save(); cam(HEAD_H[0], HEAD_H[1] + 60, lerp(2.0, 2.4, prog(t, tb, d))); heroCU(t, { fear: .85 }); ctx.restore(); grade('rgba(30,10,20,1)', .3); vign(.6); bigTitle('САМОЕ СТРАШНОЕ?', 300, prog(t, tb - .05, tb + .2), { size: 100, col: '#ff6b74' }); },
  sfx(d, P, E, s) { return [[0, 'pad_swell', .2, { dur: d }], [s.U(s.a + 2) - .1, 'pop', .3], [s.U(s.a + 3), 'heartbeat', .4, { dur: d - s.U(s.a + 3) }]]; }
};
SC.reveal = { // "«Только бы он обрадовался. Только бы не испугался. У нас будет ребёнок»."
  draw(t, d, P, E, s) { const t3 = s.U(s.a + 2); ctx.drawImage(layer('cafeEve', cafeEveningDraw, 6), 0, 0); ctx.save(); cam(ACU2[0], 900, 1.15); person(ACU2[0], 2350, 1650, ANYA2({ smile: .4, light: -1 })); ctx.restore(); ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 700, 800, `rgba(255,200,80,${.15 + .2 * prog(t, t3, d)})`); ctx.restore();
    thoughtBubble(540, 420, t < s.U(s.a + 1) - .05 ? 'Только бы он обрадовался…' : 'Только бы не испугался…', prog(t, 0, .25), { size: 54, w: 640, gold: true, toX: 0, toY: 280 });
    if (t > t3 - .1) { pregTest(800, 1300, 1.0, prog(t, t3 - .1, t3 + .3)); bigTitle('У НАС БУДЕТ РЕБЁНОК', 1060, prog(t, t3 - .1, t3 + .2), { size: 78, col: GOLDT, glow: 'rgba(255,200,80,.5)' }); } },
  sfx(d, P, E, s) { return [[0, 'shimmer', .35], [s.U(s.a + 2) - .1, 'chime', .5], [0, 'pad_swell', .3, { dur: d }]]; }
};
SC.lesson = { // "Ты весь день боялся чужих мыслей. А самые важные оказались самыми добрыми."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); ctx.drawImage(layer('cafeEve', cafeEveningDraw, 4), 0, 0); ctx.save(); cam(560, 1000, lerp(1.0, 1.08, prog(t, 0, d))); person(380, 2300, 1550, ANYA2({ smile: .8, light: -1 })); person(760, 2380, 1700, HERO2({ smile: .9 })); ctx.restore(); candle(560, 1500, 1.0, t);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 800, 900, 'rgba(255,190,90,.22)'); ctx.restore(); bigTitle(t < t2 - .05 ? 'ВЕСЬ ДЕНЬ БОЯЛСЯ' : 'САМЫЕ ДОБРЫЕ', 300, t < t2 - .05 ? prog(t, 0, .2) : prog(t, t2 - .05, t2 + .2), { size: 96, col: t < t2 - .05 ? '#fff' : GOLDT }); },
  sfx(d) { return [[0, 'pad_swell', .3, { dur: d }]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .3) drawSubs(t); };
