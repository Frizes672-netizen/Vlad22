// ===== RU Short: "РАЗВОД ИЛИ НЕТ? — Выпуск 3: газовщики у двери" (honest episode; helpers from episode 1 are loaded before this file) =====
const GASW = (o = {}) => Object.assign({ uniform: 'guard', top: '#24508f', pants: '#1f467e', cap: '#1f467e', hair: '#3a2a20', skin: '#e4b598', light: 1, shoe: '#111', eyes: '#5b6b62' }, o);
const GASW2 = (o = {}) => GASW(Object.assign({ hair: '#6b4a2c', skin: '#eac3a8', cap: null }, o));
const FAKEW = (o = {}) => Object.assign({ top: '#3a3f46', pants: '#2a2d33', hair: '#1f1611', cap: '#2a2d33', light: 1, skin: '#d9a98c' }, o);
const OKC = '#22b357';

// ---------- the stairwell (podъезд) ----------
function stairwellDraw() { ctx.fillStyle = '#5f8a6a'; ctx.fillRect(0, 700, W, 820); ctx.fillStyle = '#e9e4d6'; ctx.fillRect(0, 0, W, 700); ctx.fillStyle = '#3f6a4a'; ctx.fillRect(0, 690, W, 14); // green-painted lower wall, whitewash above
  const R = rnd(4); for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(0,0,0,${.03 + R() * .04})`; ctx.beginPath(); ctx.ellipse(R() * W, 720 + R() * 760, 30 + R() * 80, 10 + R() * 30, 0, 0, 7); ctx.fill(); } // scuffs
  ctx.fillStyle = grad(0, 1500, 0, H, [[0, '#b08c6a'], [1, '#6b5240']]); ctx.fillRect(0, 1500, W, 420); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 3; for (let x = -400; x < W + 400; x += 80) { ctx.beginPath(); ctx.moveTo(540 + (x - 540) * .5, 1500); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 1540; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } // tiled floor
  ctx.fillStyle = '#8a8f96'; ctx.fillRect(760, 760, 280, 300); for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { ctx.fillStyle = '#6b7079'; rr(772 + c * 68, 772 + r * 72, 58, 62, 4); ctx.fill(); ctx.fillStyle = '#d9dde3'; ctx.fillRect(790 + c * 68, 790 + r * 72, 22, 6); } // mailboxes
  ctx.fillStyle = '#d9d2c2'; ctx.fillRect(60, 160, 300, 420); ctx.fillStyle = grad(0, 170, 0, 570, [[0, '#ffcf8a'], [1, '#f2e2c4']]); ctx.fillRect(76, 176, 268, 388); ctx.fillStyle = '#d9d2c2'; ctx.fillRect(206, 176, 8, 388); ctx.fillRect(76, 360, 268, 8); glow(210, 370, 420, 'rgba(255,210,150,.5)'); // stairwell window at dawn
  ctx.fillStyle = '#c9c9c4'; for (let i = 0; i < 9; i++) ctx.fillRect(80 + i * 30, 900, 18, 200); ctx.fillStyle = '#b8b8b2'; ctx.fillRect(70, 890, 290, 16); ctx.fillRect(70, 1100, 290, 16); } // radiator
function landingDoor(t, open = 0, o = {}) { // her padded door seen from the landing; opens OUTWARD (towards us) and stops on the chain
  ctx.drawImage(layer('stair', stairwellDraw, 1.5), 0, 0); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(300, 300, 480, 1220); // frame
  ctx.save(); ctx.translate(310, 0); const k = eout(clamp(open)), sw = 1 - .3 * k; ctx.fillStyle = '#100c0a'; ctx.fillRect(0, 320, 460, 1190); // dark gap behind
  if (o.face > 0) { ctx.save(); ctx.beginPath(); ctx.rect(380 * sw + 20, 320, 120, 1190); ctx.clip(); ctx.translate(-310, 0); person(780, 2330, 1600, GAL({ fear: .3, light: -1 })); ctx.restore(); } // her face in the gap
  ctx.transform(sw, 0, 0, 1, 0, 0); ctx.fillStyle = grad(0, 0, 460, 0, [[0, '#4a2e1f'], [.5, '#6a4430'], [1, '#432a1c']]); ctx.fillRect(0, 320, 460, 1190);
  ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 3; for (let kk = -10; kk < 20; kk++) { ctx.beginPath(); ctx.moveTo(kk * 80, 320); ctx.lineTo(kk * 80 + 700, 1510); ctx.stroke(); ctx.beginPath(); ctx.moveTo(460 - kk * 80, 320); ctx.lineTo(460 - kk * 80 - 700, 1510); ctx.stroke(); }
  ctx.fillStyle = '#d4af37'; for (let r = 0; r < 18; r++) for (let c = 0; c < 7; c++) { const x = c * 80 + (r % 2) * 40, y = 320 + r * 66 + 33; if (x < 10 || x > 450) continue; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#c9a33a'; rr(170, 380, 120, 60, 8); ctx.fill(); label('34', 230, 425, 44, { weight: 900, color: '#3a2a10' }); ctx.fillStyle = '#c9a33a'; ctx.beginPath(); ctx.arc(230, 640, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(230, 640, 8, 0, 7); ctx.fill(); // number + peephole
  ctx.fillStyle = '#b8b8b8'; rr(380, 880, 50, 140, 10); ctx.fill(); ctx.restore();
  if (k > .5) { ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 9; ctx.setLineDash([16, 7]); ctx.beginPath(); ctx.moveTo(310 + 460 * sw - 10, 720); ctx.lineTo(760, 724); ctx.stroke(); ctx.setLineDash([]); } } // the chain across the gap
function workersLanding(t, s, o = {}) { ctx.drawImage(layer('stair', stairwellDraw, 1.5), 0, 0); vign(.3);
  person(330, 2050, 1500, GASW({ mouth: o.talk ? talking(t, s) : 0, smile: .3 })); person(760, 2080, 1450, GASW2({ smile: .2 })); toolCase(830, 1380, .9); }
function gasBadge(x, y, s, name, p = 1) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.rotate(-.04);
  ctx.fillStyle = 'rgba(0,0,0,.3)'; rr(-200 + 10, -130 + 14, 400, 260, 20); ctx.fill(); ctx.fillStyle = '#fff'; rr(-200, -130, 400, 260, 20); ctx.fill(); ctx.fillStyle = '#24508f'; rr(-200, -130, 400, 64, 20); ctx.fill(); ctx.fillRect(-200, -90, 400, 24);
  label('ГАЗОВАЯ СЛУЖБА', 0, -88, 30, { weight: 900, color: '#fff', spacing: 2 }); ctx.fillStyle = '#c9d3df'; rr(-180, -40, 120, 150, 10); ctx.fill(); ctx.fillStyle = '#8a95a2'; ctx.beginPath(); ctx.arc(-120, 10, 30, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(-120, 90, 45, 30, 0, Math.PI, 0); ctx.fill();
  label(name, -40, 0, 32, { align: 'left', weight: 900, color: '#12233f' }); label('слесарь ВДГО', -40, 44, 24, { align: 'left', weight: 700, color: '#7a8494' }); label('№ 0417', -40, 86, 24, { align: 'left', weight: 800, color: '#7a8494', font: MONO }); ctx.restore(); }
function toolCase(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, 130, 180, 20, 0, 0, 7); ctx.fill(); ctx.fillStyle = grad(0, -100, 0, 120, [[0, '#d9a020'], [1, '#9a6c10']]); rr(-170, -90, 340, 220, 22); ctx.fill(); ctx.fillStyle = '#2a2d33'; rr(-60, -130, 120, 50, 18); ctx.fill(); ctx.fillStyle = '#efe0b0'; rr(-170, 10, 340, 10, 4); ctx.fill(); ctx.restore(); }
function gasAnalyzer(x, y, s, val, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-110 + 10, -200 + 14, 220, 400, 34); ctx.fill(); ctx.fillStyle = grad(-110, 0, 110, 0, [[0, '#d9a020'], [.5, '#f2c84a'], [1, '#b07c12']]); rr(-110, -200, 220, 400, 34); ctx.fill();
  ctx.fillStyle = '#0f1a14'; rr(-80, -160, 160, 110, 12); ctx.fill(); label(val, 0, -85, 56, { weight: 900, color: '#7dff9e', font: MONO }); label('CH₄ ppm', 0, -60, 18, { weight: 800, color: '#7dff9e' }); ctx.fillStyle = '#2a2d33'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-50 + i * 50, 40, 22, 0, 7); ctx.fill(); }
  ctx.fillStyle = Math.floor(t * 2) % 2 ? '#22b357' : '#0f3a1e'; ctx.beginPath(); ctx.arc(0, 130, 14, 0, 7); ctx.fill(); ctx.strokeStyle = '#2a2d33'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -200); ctx.quadraticCurveTo(40, -300, 140, -330); ctx.stroke(); ctx.restore(); } // probe hose
function gasStove(x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-300, 380, 620, 40); // white enamel stove with a yellow hose to the wall valve
  ctx.fillStyle = grad(-300, 0, 300, 0, [[0, '#d8dbe0'], [.5, '#ffffff'], [1, '#cfd3d9']]); rr(-300, -60, 600, 460, 16); ctx.fill(); ctx.fillStyle = '#20232a'; rr(-300, -120, 600, 70, 10); ctx.fill();
  for (const [bx, by] of [[-150, -85], [150, -85]]) { ctx.fillStyle = '#3a3e46'; ctx.beginPath(); ctx.ellipse(bx, by, 110, 26, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(bx, by - 4, 50, 12, 0, 0, 7); ctx.fill(); if (o.flame) { ctx.fillStyle = `rgba(80,140,255,${.7 + .2 * Math.sin(t * 20)})`; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28; ctx.beginPath(); ctx.ellipse(bx + Math.cos(a) * 52, by - 10 + Math.sin(a) * 12, 7, 16, 0, 0, 7); ctx.fill(); } } }
  for (let i = 0; i < 4; i++) { ctx.fillStyle = '#2a2d33'; ctx.beginPath(); ctx.arc(-210 + i * 140, 0, 26, 0, 7); ctx.fill(); ctx.fillStyle = '#c9ced6'; ctx.fillRect(-214 + i * 140, -22, 8, 22); }
  ctx.fillStyle = 'rgba(20,24,30,.85)'; rr(-240, 70, 480, 260, 14); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(-220, 90, 160, 220, 10); ctx.fill(); ctx.fillStyle = '#c9ced6'; rr(-200, 40, 400, 18, 9); ctx.fill(); // oven door
  ctx.strokeStyle = '#e8c020'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(300, 60); ctx.bezierCurveTo(420, 80, 380, -180, 460, -260); ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 4; for (let k = 0; k < 9; k++) { const q = k / 9; ctx.beginPath(); ctx.arc(lerp(300, 460, q) + Math.sin(q * 3) * 50, lerp(60, -260, q), 11, 0, 7); ctx.stroke(); } // flexible hose
  ctx.fillStyle = '#e0c020'; ctx.fillRect(440, -560, 40, 300); ctx.fillStyle = '#d32f2f'; rr(420, -330, 80, 30, 8); ctx.fill(); ctx.restore(); } // wall pipe + valve
function receipt(x, y, s, rot, hiP = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-300 + 12, -400 + 16, 600, 800); ctx.fillStyle = '#fbf8ef'; ctx.fillRect(-300, -400, 600, 800);
  label('ЕДИНЫЙ ПЛАТЁЖНЫЙ ДОКУМЕНТ', 0, -340, 28, { weight: 900, color: '#1d2a5c' }); label('за октябрь', 0, -300, 22, { weight: 700, color: '#7a8494' }); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-260, -240 + i * 46); ctx.lineTo(260, -240 + i * 46); ctx.stroke(); }
  ['Газоснабжение', 'ТО газового оборудования', 'Электроэнергия', 'Водоснабжение'].forEach((s2, i) => { label(s2, -250, -210 + i * 46, 22, { align: 'left', weight: 700, color: '#333' }); label(['612,40', '0,00', '1 148,10', '934,55'][i], 250, -210 + i * 46, 22, { align: 'right', weight: 800, color: '#333', font: MONO }); });
  ctx.fillStyle = hiP > 0 ? `rgba(255,210,63,${.75 * clamp(hiP)})` : 'transparent'; ctx.fillRect(-270, 160, 540, 120); label('Газовая служба (диспетчер):', -250, 200, 24, { align: 'left', weight: 800, color: '#1d2a5c' }); label('8 (4012) ••-••-••', -250, 250, 40, { align: 'left', weight: 900, color: '#111', font: MONO });
  if (hiP > .5) { ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(0, 225, 300 * clamp((hiP - .5) * 2), 80, -.02, 0, 7); ctx.stroke(); } ctx.restore(); }
function entranceNotice(t, p) { ctx.drawImage(layer('stair', stairwellDraw, 1.5), 0, 0); ctx.fillStyle = '#5a3a28'; ctx.fillRect(220, 300, 640, 1300); ctx.fillStyle = '#2a3340'; ctx.fillRect(250, 330, 580, 1270); // metal entrance door
  ctx.fillStyle = '#c9ced6'; rr(300, 880, 140, 100, 14); ctx.fill(); for (let i = 0; i < 12; i++) { ctx.fillStyle = '#2a2d33'; ctx.beginPath(); ctx.arc(330 + (i % 3) * 40, 900 + Math.floor(i / 3) * 20, 7, 0, 7); ctx.fill(); } // intercom
  const k = eback(clamp(p)); ctx.save(); ctx.translate(560, 620); ctx.scale(k, k); ctx.rotate(.02); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-230 + 8, -200 + 10, 460, 400); ctx.fillStyle = '#fbf8ef'; ctx.fillRect(-230, -200, 460, 400);
  label('ОБЪЯВЛЕНИЕ', 0, -140, 44, { weight: 900, color: '#c0392b', spacing: 4 }); ['Уважаемые жители!', 'Плановая проверка', 'газового оборудования', '12–14 ноября, 9:00–18:00', 'Газовая служба'].forEach((s2, i) => label(s2, 0, -80 + i * 52, i === 3 ? 32 : 28, { weight: i === 3 ? 900 : 700, color: '#222' }));
  ctx.fillStyle = 'rgba(200,190,170,.6)'; ctx.fillRect(-60, -215, 120, 30); ctx.restore(); }
function actPaper(x, y, s, p) { const k = eback(clamp(p)); if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.rotate(-.05); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-220 + 10, -300 + 14, 440, 600); ctx.fillStyle = '#fbf8ef'; ctx.fillRect(-220, -300, 440, 600);
  label('АКТ', 0, -230, 56, { weight: 900, color: '#1d2a5c', spacing: 8 }); label('о проверке газового оборудования', 0, -180, 22, { weight: 700, color: '#555' }); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-190, -120 + i * 46); ctx.lineTo(190, -120 + i * 46); ctx.stroke(); }
  label('Утечек нет ✓', -180, -90, 28, { align: 'left', weight: 900, color: '#1f7a3a', font: HAND }); label('Шланг в норме ✓', -180, -44, 28, { align: 'left', weight: 900, color: '#1f7a3a', font: HAND }); ctx.strokeStyle = '#1d2a5c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(40, 220); ctx.bezierCurveTo(80, 180, 110, 250, 150, 200); ctx.bezierCurveTo(170, 180, 180, 230, 200, 210); ctx.stroke(); ctx.restore(); }
function fakeWorkers(t) { bg('#1a0a0c', '#060203'); ctx.drawImage(layer('stair', stairwellDraw, 1.5), 0, 0); grade('rgba(120,20,30,1)', .55); person(330, 2050, 1500, FAKEW({ smile: .6 })); person(760, 2080, 1450, FAKEW({ cap: null, hair: '#2a1a12', smile: .4 })); vign(.6);
  ctx.fillStyle = '#e8c020'; ctx.save(); ctx.translate(560, 1300); ctx.rotate(-.3); rr(-140, -20, 280, 40, 18); ctx.fill(); ctx.restore(); } // they wave a "new hose"
function dutyBubble(txt, x, y, w, p, col = '#c0392b') { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-w / 2 + 8, -60 + 10, w, 120, 40); ctx.fill(); ctx.fillStyle = '#fff'; rr(-w / 2, -60, w, 120, 40); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 6; rr(-w / 2, -60, w, 120, 40); ctx.stroke(); label(txt, 0, 16, 44, { weight: 900, color: col }); ctx.restore(); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: her door swings out at the camera and stops on the chain — then the two men in uniform
  draw(t, d, P, E, s) { const tr = E('правильно', 1, 2.6);
    if (t < tr - .1) { ctx.save(); const z = lerp(1.18, 1.05, eout(prog(t, 0, .5))); cam(560, 900, z); shake(t, t > .35 && t < .6 ? 10 : 0); landingDoor(t, prog(t, 0, .4), { face: prog(t, .2, .5) }); ctx.restore();
      bigTitle('ОТКРЫЛА ДВЕРЬ', 300, prog(t, 0, .15), { size: 110, col: '#fff', glow: 'rgba(255,200,80,.5)' }); return; }
    ctx.save(); cam(540, 900, lerp(1.0, 1.06, prog(t, tr, d))); workersLanding(t, s); ctx.restore(); bigTitle('И ПРАВИЛЬНО', 300, prog(t, tr - .1, tr + .15), { size: 110, col: '#7dff9e' }); },
  sfx(d, P, E) { return [[0, 'creak', .5], [.38, 'chain', .55], [E('правильно', 1, 2.6) - .1, 'whoosh', .3], [0, 'hum', .15, { dur: d }]]; }
};
SC.choice = { // "Развод или нет? Решай сам."
  draw(t, d, P, E, s) { const tb = E('развод', 1, .3), ts = s.U(2); ctx.save(); cam(540, 900, 1.0); workersLanding(t, s); ctx.restore(); vign(.6); grade('rgba(20,25,40,1)', .35);
    const pl = t > ts ? 1 + .07 * Math.max(0, Math.sin((t - ts) * 9)) : 1, pr = t > ts ? 1 + .07 * Math.max(0, -Math.sin((t - ts) * 9)) : 1;
    choiceBtn(290, 1180, 440, 'РАЗВОД', SRED, prog(t, tb - .1, tb + .2), { pulse: pl }); choiceBtn(790, 1180, 440, 'ВСЁ ЧИСТО', OKC, prog(t, tb + .1, tb + .4), { pulse: pr });
    bigTitle('РАЗВОД ИЛИ НЕТ?', 300, prog(t, 0, .2), { size: 100, col: YEL }); label('ВЫПУСК 3', 540, 410, 40, { weight: 900, color: '#fff', spacing: 10, alpha: prog(t, .1, .4) }); },
  sfx(d, P, E) { return [[0, 'dundun', .4], [E('развод', 1, .3) - .1, 'pop', .35], [E('развод', 1, .3) + .1, 'pop', .35]]; }
};
SC.greet = { // "— Галина Петровна? Газовая служба. Плановая проверка плиты."
  draw(t, d, P, E, s) { const tg = s.U(4), tp = s.U(5); ctx.save(); cam(380, 860, lerp(1.25, 1.32, prog(t, 0, d))); workersLanding(t, s, { talk: true }); ctx.restore();
    if (t > tg - .05) gasBadge(740, 600, .9, 'Иванов С. А.', prog(t, tg - .05, tg + .25)); if (t > tp - .05) bigTitle('ПЛАНОВАЯ ПРОВЕРКА', 300, prog(t, tp - .05, tp + .2), { size: 80, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'hum', .15, { dur: d }], [s.U(4) - .05, 'pop', .35]]; }
};
SC.details = { // "Раннее утро. На груди бейджи, в руках чемоданчик с прибором."
  draw(t, d, P, E, s) { const tb = E('бейджи', 1, 1.6), tc = E('чемоданчик', 1, 2.6);
    if (t < tb - .1) { ctx.save(); cam(210, 400, lerp(1.6, 1.75, prog(t, 0, tb))); ctx.drawImage(layer('stair', stairwellDraw, 0), 0, 0); ctx.restore(); wallClockBig(820, 1180, 170, 10 + prog(t, 0, d) * 2); bigTitle('8:10 УТРА', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); return; }
    if (t < tc - .1) { bg('#1f467e', '#12284a'); ctx.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 20; i++) ctx.fillRect(0, i * 100, W, 40); gasBadge(540, 860, 2.0, 'Иванов С. А.', prog(t, tb - .1, tb + .2)); bigTitle('БЕЙДЖИ', 300, prog(t, tb - .1, tb + .15), { size: 110, col: YEL }); return; }
    bg('#2a2018', '#100c08'); ctx.drawImage(layer('stair', stairwellDraw, 6), 0, 0); grade('rgba(0,0,0,1)', .4, 'source-over'); toolCase(540, 1150, 1.6); gasAnalyzer(540, 760, 1.2, '0.0', t); bigTitle('ПРИБОР', 300, prog(t, tc - .1, tc + .15), { size: 110, col: YEL }); },
  sfx(d, P, E) { return [[E('бейджи', 1, 1.6) - .1, 'pop', .35], [E('чемоданчик', 1, 2.6) - .1, 'clasp', .45]]; }
};
SC.stove = { // "— Проверим плиту и шланг. Минут десять."
  draw(t, d, P, E, s) { const th = E('шланг', 1, 1.2); kitchen(t); grade('rgba(255,240,220,1)', .1); ctx.save(); cam(lerp(540, 700, eio(prog(t, th - .2, th + .5))), lerp(1100, 900, eio(prog(t, th - .2, th + .5))), lerp(1.0, 1.45, eio(prog(t, th - .2, th + .5)))); gasStove(500, 1150, 1.0, t, { flame: true }); ctx.restore();
    if (t > th - .1) { ctx.strokeStyle = YEL; ctx.lineWidth = 8; ctx.setLineDash([20, 12]); ctx.beginPath(); ctx.ellipse(760, 900, 170, 320, .2, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
    bigTitle(t < th - .1 ? 'ПЛИТА' : 'И ШЛАНГ', 300, t < th - .1 ? prog(t, 0, .2) : prog(t, th - .1, th + .15), { size: 110, col: '#fff' }); label('≈ 10 МИНУТ', 540, 420, 50, { weight: 900, color: YEL, alpha: prog(t, s.U(9) - s.start + s.start - .05, s.U(9) + .2) }); },
  sfx(d) { return [[0, 'kitchen', .3, { dur: d }], [.2, 'fizz', .2, { dur: 1 }]]; }
};
SC.remember = { // "Галина Петровна вспомнила всё, что рассказывают про лжегазовщиков. И сделала одну вещь."
  draw(t, d, P, E, s) { const t11 = s.U(11), tl = E('лжегазовщиков', 1, 2.6);
    if (t < tl - .15) { ctx.save(); cam(560, 860, lerp(1.0, 1.12, prog(t, 0, tl))); ctx.drawImage(layer('hallway', hallwayDraw, 1.5), 0, 0); doorChain(1); person(560, 2330, 1600, GAL({ fear: .45, light: -1 })); ctx.restore(); vign(.4); bigTitle('ОНА ВСПОМНИЛА', 300, prog(t, 0, .2), { size: 92, col: '#fff' }); return; }
    if (t < t11 - .05) { fakeWorkers(t); bigTitle('ЛЖЕГАЗОВЩИКИ', 300, prog(t, tl - .15, tl + .1), { size: 100, col: '#ff6b74' }); return; }
    ctx.save(); const hd = headOf(GCU); cam(hd[0], 900, lerp(1.1, 1.2, prog(t, t11, d))); ctx.drawImage(layer('hallway', hallwayDraw, 3), 0, 0); person(GCU[0], GCU[1], GCU[2], GAL({ fear: .2, light: -1 })); ctx.restore(); bigTitle('ОДНА ВЕЩЬ', 300, prog(t, t11 - .05, t11 + .2), { size: 110, col: YEL }); },
  sfx(d, P, E, s) { return [[0, 'drone', .25, { dur: d }], [E('лжегазовщиков', 1, 2.6) - .15, 'dundun', .35], [s.U(11), 'whoosh', .3]]; }
};
SC.call = { // "Не снимая цепочку, она позвонила в газовую службу — по номеру из своей квитанции."
  draw(t, d, P, E, s) { const tq = E('квитанции', 1, d * .7), tz = E('позвонила', 1, d * .35);
    if (t < tz - .1) { ctx.save(); cam(640, 720, 2.0); ctx.drawImage(layer('hallway', hallwayDraw, 1.5), 0, 0); doorChain(1); ctx.restore(); bigTitle('ЦЕПОЧКА НЕ СНЯТА', 300, prog(t, 0, .2), { size: 84, col: '#fff' }); return; }
    if (t < tq - .15) { kitchen(t); grade('rgba(20,25,40,1)', .3); ctx.save(); cam(540, 980, 1.04); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { state: 'active', top: 'вызов…', name: 'Газовая служба', num: 'диспетчер', avatar: '#24508f', c1: '#163a5a', c2: '#07141e' })); ctx.restore(); bigTitle('ЗВОНОК В ГАЗОВУЮ', 300, prog(t, tz - .1, tz + .15), { size: 84, col: '#fff' }); return; }
    woodTable(0, { c1: '#5a3b24', c2: '#3a2616' }); receipt(540, 940, 1.35, -.03, prog(t, tq - .15, d - .2)); bigTitle('НОМЕР ИЗ КВИТАНЦИИ', 300, prog(t, tq - .15, tq + .1), { size: 80, col: YEL }); },
  sfx(d, P, E) { return [[0, 'chain', .4], [E('позвонила', 1, d * .35) - .1, 'beeps', .35], [E('квитанции', 1, d * .7) - .15, 'paper', .4], [E('квитанции', 1, d * .7) + .3, 'marker', .4]]; }
};
function clueFrames3(t, i, s) { if (i === 0) { ctx.save(); cam(540, 900, 1.08); workersLanding(t, s); ctx.restore(); } else if (i === 1) { bg('#1f467e', '#12284a'); gasBadge(540, 860, 2.0, 'Иванов С. А.', 1); } else { woodTable(0, { c1: '#5a3b24', c2: '#3a2616' }); receipt(540, 940, 1.35, -.03, 1); } }
SC.countdown = { // "Развод или нет? У тебя пять секунд." + 5 s
  draw(t, d, P, E, s) { const ts = E('секунд', 1, 1.6) + .35;
    if (t < ts) { ctx.save(); cam(540, 900, 1.0); workersLanding(t, s); ctx.restore(); grade('rgba(10,14,25,1)', .55, 'source-over'); choiceBtn(290, 1180, 440, 'РАЗВОД', SRED, prog(t, 0, .25)); choiceBtn(790, 1180, 440, 'ВСЁ ЧИСТО', OKC, prog(t, .1, .35)); bigTitle('А ТЫ КАК ДУМАЕШЬ?', 300, prog(t, 0, .2), { size: 80, col: YEL }); return; }
    const e = t - ts, i = Math.min(2, Math.floor(e / 1.67)); clueFrames3(t, i, s); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, 470); const left = Math.max(0, 5 - e), n = Math.max(1, Math.ceil(left));
    if (left > 0) { dayRing(540, 300, 105, left / 5, YEL); bigNum(String(n), 540, 300, 150, '#fff', { glow: 'rgba(255,210,80,.8)' }); }
    const ph = Math.sin(e * 6); choiceBtn(290, 1560, 420, 'РАЗВОД', SRED, 1, { pulse: 1 + .05 * Math.max(0, ph) }); choiceBtn(790, 1560, 420, 'ВСЁ ЧИСТО', OKC, 1, { pulse: 1 + .05 * Math.max(0, -ph) }); },
  sfx(d, P, E) { const ts = E('секунд', 1, 1.6) + .35; return [0, 1, 2, 3, 4].map(k => [ts + k, 'tick', .55]).concat([[ts, 'heartbeat', .35, { dur: 5 }], [0, 'pop', .3]]); }
};
SC.verdict = { // "Это не развод."
  draw(t) { bg('#06200f', '#020a05'); glow(540, 900, 900, 'rgba(60,255,120,.25)'); ctx.save(); shake(t, t < .3 ? 10 * (1 - t / .3) : 0);
    polaroid(540, 820, 600, -.03, () => { ctx.save(); cam(540, 900, 1.0); workersLanding(0, { words: [] }); ctx.restore(); }, 'Газовая служба', { tint: 'rgba(230,255,235,.4)' });
    stamp('ВСЁ ЧИСТО', 540, 820, prog(t, .05, .35), { color: OKC, size: 120, rot: -.16 }); ctx.restore(); },
  sfx() { return [[.05, 'stamp', .6], [.1, 'chime', .4]]; }
};
SC.confirm = { // "Диспетчер подтвердил: бригада настоящая, фамилии совпали. А на двери подъезда неделю висело объявление о проверке."
  draw(t, d, P, E, s) { const t17 = s.U(17);
    if (t < t17 - .05) { kitchen(t); ctx.save(); cam(540, 980, 1.04); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => { callScreen(w, h, t, { state: 'active', top: '', timer: '00:' + String(10 + Math.floor(t * 2)).padStart(2, '0'), name: 'Газовая служба', num: 'диспетчер', avatar: '#24508f', c1: '#163a5a', c2: '#07141e' }); }); ctx.restore();
      const tf = E('фамилии', 1, 2.2); dataCard(540, 560, 600, 'БРИГАДА № 4', 'Иванов, Сомов', prog(t, tf - .3, tf), { col: '#86efac' }); checkMark(820, 470, 60, prog(t, tf, tf + .4), OKC); bigTitle('БРИГАДА НАСТОЯЩАЯ', 300, prog(t, 0, .2), { size: 80, col: '#7dff9e' }); return; }
    ctx.save(); cam(560, 760, lerp(1.0, 1.18, prog(t, t17, d))); entranceNotice(t, prog(t, t17, t17 + .3)); ctx.restore(); bigTitle('ОБЪЯВЛЕНИЕ', 300, prog(t, t17, t17 + .2), { size: 110, col: YEL }); },
  sfx(d, P, E, s) { return [[E('фамилии', 1, 2.2), 'chime', .35], [s.U(17), 'paper', .4]]; }
};
SC.check = { // "Мастера проверили плиту, оставили акт — и не попросили ни рубля на месте."
  draw(t, d, P, E, s) { const ta = E('акт', 1, 1.8), tr = E('рубля', 1, 3.4); kitchen(t);
    if (t < ta - .1) { ctx.save(); cam(600, 1000, 1.1); gasStove(480, 1180, 1.0, t, { flame: false }); gasAnalyzer(820, 1000, .9, (Math.abs(Math.sin(t * 3)) * .2).toFixed(1), t); ctx.restore(); bigTitle('УТЕЧЕК НЕТ', 300, prog(t, 0, .2), { size: 100, col: '#7dff9e' }); return; }
    woodTable(1100, { c1: '#5a3b24', c2: '#24160d' }); actPaper(540, 900, 1.5, prog(t, ta - .1, ta + .3)); if (t > tr - .2) { ctx.save(); ctx.translate(540, 1450); ctx.scale(eback(prog(t, tr - .2, tr + .1)), eback(prog(t, tr - .2, tr + .1))); ctx.fillStyle = OKC; rr(-200, -70, 400, 140, 70); ctx.fill(); label('0 ₽', 0, 30, 90, { weight: 900 }); ctx.restore(); }
    bigTitle(t < tr - .2 ? 'АКТ ПРОВЕРКИ' : 'НИ РУБЛЯ НА МЕСТЕ', 300, t < tr - .2 ? prog(t, ta - .1, ta + .15) : prog(t, tr - .2, tr + .1), { size: t < tr - .2 ? 110 : 80, col: YEL }); },
  sfx(d, P, E) { return [[.2, 'beeps', .3], [E('акт', 1, 1.8) - .1, 'pen', .35], [E('рубля', 1, 3.4) - .2, 'pop', .4]]; }
};
SC.fake = { // "Лжегазовщики ведут себя иначе: «срочно меняйте шланг», «ставьте датчик за пятнадцать тысяч», «платите наличными прямо сейчас»."
  draw(t, d, P, E, s) { const t20 = s.U(20), q1 = E('срочно', 1, t20 + .2), q2 = E('датчик', 1, t20 + 1.6), q3 = E('наличными', 1, t20 + 3.4); fakeWorkers(t);
    bigTitle('ЛЖЕГАЗОВЩИКИ', 300, prog(t, 0, .2), { size: 100, col: '#ff6b74' });
    dutyBubble('«СРОЧНО МЕНЯЙТЕ ШЛАНГ»', 540, 560, 900, prog(t, q1 - .1, q1 + .2)); dutyBubble('«ДАТЧИК ЗА 15 000 ₽»', 540, 720, 760, prog(t, q2 - .1, q2 + .2)); dutyBubble('«НАЛИЧНЫМИ СЕЙЧАС»', 540, 880, 760, prog(t, q3 - .1, q3 + .2)); },
  sfx(d, P, E, s) { const t20 = s.U(20); return [[0, 'dundun', .35], [E('срочно', 1, t20 + .2) - .1, 'errbeep', .35], [E('датчик', 1, t20 + 1.6) - .1, 'errbeep', .35], [E('наличными', 1, t20 + 3.4) - .1, 'errbeep', .35]]; }
};
SC.compare = { // "Настоящие — проверяют и уходят. А проверить их можно одним звонком. Но только по номеру из квитанции, а не по тому, который дадут они."
  draw(t, d, P, E, s) { const t22 = s.U(22), t23 = s.U(23);
    if (t < t22 - .05) { bg('#0f1a24', '#05090d'); ctx.fillStyle = 'rgba(34,179,87,.18)'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = 'rgba(227,38,47,.18)'; ctx.fillRect(W / 2, 0, W / 2, H);
      label('НАСТОЯЩИЕ', 270, 560, 56, { weight: 900, color: '#7dff9e' }); label('ЛЖЕ', 810, 560, 56, { weight: 900, color: '#ff6b74' });
      ['Объявление заранее', 'Проверяют и уходят', 'Ничего не продают', 'Оплата по квитанции'].forEach((s2, i) => { const p = prog(t, .1 + i * .25, .4 + i * .25); label(s2, 270, 700 + i * 130, 38, { weight: 800, alpha: p }); checkMark(70, 688 + i * 130, 30, p, OKC); });
      ['Без предупреждения', '«Срочно меняйте»', 'Датчики, шланги', 'Наличные сейчас'].forEach((s2, i) => { const p = prog(t, .2 + i * .25, .5 + i * .25); label(s2, 810, 700 + i * 130, 38, { weight: 800, alpha: p }); xMark(1010, 688 + i * 130, 30, p); }); return; }
    if (t < t23 - .05) { kitchen(t); ctx.save(); cam(540, 980, 1.04); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { state: 'active', top: 'вызов…', name: 'Газовая служба', num: 'диспетчер', avatar: '#24508f', c1: '#163a5a', c2: '#07141e' })); ctx.restore(); bigTitle('ОДИН ЗВОНОК', 300, prog(t, t22 - .05, t22 + .2), { size: 110, col: YEL }); return; }
    woodTable(0, { c1: '#5a3b24', c2: '#3a2616' }); receipt(330, 960, .95, -.05, 1); checkMark(330, 520, 70, prog(t, t23, t23 + .4), OKC);
    ctx.save(); ctx.translate(800, 980); ctx.rotate(.06); ctx.fillStyle = '#fff59a'; ctx.fillRect(-180, -150, 360, 300); label('звоните:', 0, -60, 34, { weight: 800, color: '#333', font: HAND }); label('8 9•• •••-••-••', 0, 10, 36, { weight: 900, color: '#333', font: MONO }); label('(мастер Сергей)', 0, 70, 30, { weight: 700, color: '#555', font: HAND }); ctx.restore(); // their own "number" on a sticky note
    xMark(800, 980, 120, prog(t, E('дадут', 1, d - 1) - .2, E('дадут', 1, d - 1) + .2)); bigTitle('НОМЕР ИЗ КВИТАНЦИИ', 300, prog(t, t23 - .05, t23 + .2), { size: 80, col: YEL }); },
  sfx(d, P, E, s) { return [[.2, 'popseq', .3, { n: 4, step: .25 }], [s.U(22), 'beeps', .3], [s.U(23) + .2, 'chime', .3], [E('дадут', 1, d - 1) - .2, 'soft_x', .4]]; }
};
SC.final = { // "Поэтому иногда открыть дверь — правильно. Если сначала позвонить." → loops into frame 0
  draw(t, d, P, E, s) { const t25 = s.U(25);
    if (t < t25 - .05) { ctx.save(); cam(560, 900, lerp(1.0, 1.1, prog(t, 0, t25))); landingDoor(t, 1, { face: 1 }); ctx.restore(); bigTitle('ОТКРЫТЬ — МОЖНО', 300, prog(t, 0, .2), { size: 96, col: '#7dff9e' }); return; }
    kitchen(t); ctx.save(); cam(540, 980, 1.06); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { state: 'active', top: 'вызов…', name: 'Газовая служба', num: 'диспетчер', avatar: '#24508f', c1: '#163a5a', c2: '#07141e' })); ctx.restore();
    bigTitle('СНАЧАЛА ПОЗВОНИТЬ', 300, prog(t, t25 - .05, t25 + .2), { size: 88, col: YEL }); },
  sfx(d, P, E, s) { return [[0, 'creak', .3], [s.U(25), 'beeps', .35]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .3) drawSubs(t); };
