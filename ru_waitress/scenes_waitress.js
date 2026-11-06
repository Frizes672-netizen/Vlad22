// ===== RU Short: true story — the waitress, the note and the boy who wasn't allowed to eat (Orlando, 1 Jan 2021) =====
const WAITR = (o = {}) => Object.assign({ fem: true, uniform: 'maid', top: '#2a6f7f', pants: '#2a6f7f', hair: '#2a1a12', skin: '#d9a17e', eyes: '#5a4232', shoe: '#111', light: 1 }, o);
const MOMW = (o = {}) => Object.assign({ fem: true, top: '#8a5a7a', pants: '#2a2f3a', hair: '#b08850', skin: '#ecc0a6', light: -1 }, o);
const STEPF = (o = {}) => Object.assign({ top: '#5a4a3a', pants: '#2a2f3a', hair: '#2a1a12', skin: '#e2b08e', heavy: .4, light: 1 }, o);
const BOYK = (o = {}) => Object.assign({ kid: true, top: '#4a7ab0', pants: '#2d3f5e', hair: '#6b4a2c', skin: '#efc6ab', light: 1 }, o);
const NEONP = '#ff4d8d';

// ---------- the diner ----------
function dinerDraw() { ctx.fillStyle = grad(0, 0, 0, 1100, [[0, '#f3e6c9'], [1, '#e2cfa8']]); ctx.fillRect(0, 0, W, 1100); ctx.fillStyle = '#c0392b'; ctx.fillRect(0, 1060, W, 40); ctx.fillStyle = '#e9e4da'; ctx.fillRect(0, 1100, W, 820);
  { const y0 = 1100, vy = 520; let yy = y0, hh = 40, ri = 0; while (yy < H) { const s0 = (yy - vy) / (y0 - vy), s1 = (yy + hh - vy) / (y0 - vy); for (let c = -14; c < 14; c++) { if ((c + ri) % 2 === 0) continue; ctx.fillStyle = '#1d1f24'; ctx.beginPath(); ctx.moveTo(540 + c * 80 * s0, yy); ctx.lineTo(540 + (c + 1) * 80 * s0, yy); ctx.lineTo(540 + (c + 1) * 80 * s1, yy + hh); ctx.lineTo(540 + c * 80 * s1, yy + hh); ctx.closePath(); ctx.fill(); } yy += hh; hh *= 1.15; ri++; } } // checkered floor
  for (const wx of [60, 600]) { ctx.fillStyle = grad(0, 200, 0, 760, [[0, '#7fc4ef'], [1, '#d9f0fb']]); ctx.fillRect(wx, 200, 420, 560); ctx.fillStyle = '#3c7a4a'; ctx.fillRect(wx, 640, 420, 120); // window: blue sky + greenery
    for (let k = 0; k < 2; k++) { const px = wx + 90 + k * 230; ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(px, 760); ctx.quadraticCurveTo(px + 20, 520, px + 10, 360); ctx.stroke(); ctx.strokeStyle = '#2f7a3a'; ctx.lineWidth = 16; for (let l = 0; l < 6; l++) { const a = -Math.PI / 2 + (l - 2.5) * .55; ctx.beginPath(); ctx.moveTo(px + 10, 360); ctx.quadraticCurveTo(px + 10 + Math.cos(a) * 60, 360 + Math.sin(a) * 60 - 10, px + 10 + Math.cos(a) * 130, 360 + Math.sin(a) * 90 + 30); ctx.stroke(); } } // palm trees
    ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 16; ctx.strokeRect(wx, 200, 420, 560); }
  ctx.save(); ctx.font = `900 64px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.shadowColor = NEONP; ctx.shadowBlur = 30; ctx.fillStyle = '#ffd1e6'; ctx.fillText('DINER', 540, 140); ctx.restore(); // neon sign
  for (const lx of [270, 810]) { ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, 120); ctx.stroke(); ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.moveTo(lx - 50, 170); ctx.lineTo(lx + 50, 170); ctx.lineTo(lx + 24, 120); ctx.lineTo(lx - 24, 120); ctx.closePath(); ctx.fill(); glow(lx, 190, 240, 'rgba(255,230,180,.5)'); } }
function diner(t, blur = 3) { ctx.drawImage(layer('diner' + blur, dinerDraw, blur), 0, 0); }
function booth(y, w = W) { ctx.fillStyle = grad(0, y - 380, 0, y, [[0, '#d8433a'], [1, '#9a2a24']]); rr(-20, y - 380, w + 40, 400, 40); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.15)'; ctx.lineWidth = 4; for (let x = 60; x < w; x += 120) { ctx.beginPath(); ctx.moveTo(x, y - 360); ctx.lineTo(x, y - 20); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(0, y - 370, w, 30, 15); ctx.fill(); }
function tableTop(y) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-20, y - 12, W + 40, 20); ctx.fillStyle = grad(0, y, 0, y + 900, [[0, '#f1f1ee'], [1, '#cfd0cc']]); ctx.fillRect(-400, y, W + 800, 2400); ctx.fillStyle = '#c0392b'; ctx.fillRect(-20, y, W + 40, 14); for (let i = 0; i < 30; i++) { const R = rnd(i + 2); ctx.fillStyle = 'rgba(120,120,120,.12)'; ctx.fillRect(R() * W, y + 30 + R() * 500, 30, 3); } }
function plate(x, y, s, food) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(8, 14, 200, 70, 0, 0, 7); ctx.fill(); ctx.fillStyle = grad(-200, 0, 200, 0, [[0, '#d8d8d4'], [.5, '#ffffff'], [1, '#d0d0cc']]); ctx.beginPath(); ctx.ellipse(0, 0, 200, 70, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 150, 50, 0, 0, 7); ctx.stroke();
  if (food === 'pancakes') { for (let i = 0; i < 4; i++) { ctx.fillStyle = grad(0, -30 - i * 18, 0, -i * 18, [[0, '#e8b15a'], [1, '#b8741e']]); ctx.beginPath(); ctx.ellipse(0, -20 - i * 18, 110, 34, 0, 0, 7); ctx.fill(); } ctx.fillStyle = 'rgba(140,60,10,.85)'; ctx.beginPath(); ctx.ellipse(0, -84, 80, 22, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff3c4'; rr(-24, -104, 48, 22, 6); ctx.fill(); }
  else if (food === 'burger') { ctx.fillStyle = '#d9a040'; ctx.beginPath(); ctx.ellipse(-30, -40, 90, 50, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#5a3018'; ctx.fillRect(-120, -42, 180, 22); ctx.fillStyle = '#4caf50'; ctx.fillRect(-124, -46, 188, 8); ctx.fillStyle = '#d9a040'; ctx.fillRect(-120, -20, 180, 16); ctx.fillStyle = '#f2c230'; for (let i = 0; i < 9; i++) { ctx.save(); ctx.translate(90 + (i % 3) * 18, -30 + Math.floor(i / 3) * 10); ctx.rotate(i); ctx.fillRect(-4, -26, 8, 52); ctx.restore(); } } // fries
  ctx.restore(); }
function glassWater2(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(190,225,245,.35)'; ctx.beginPath(); ctx.moveTo(-50, -170); ctx.lineTo(50, -170); ctx.lineTo(40, 0); ctx.lineTo(-40, 0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = 'rgba(150,200,235,.3)'; ctx.fillRect(-44, -110, 88, 108); ctx.restore(); }
function familyBooth(t, o = {}) { diner(t, 3); booth(1450); person(250, 2250, 1250, STEPF({ mouth: o.eat ? Math.abs(Math.sin(t * 6)) * .3 : 0, smile: .1 })); person(540, 2180, 980, BOYK({ fear: o.fear ?? .35, tilt: o.nod ? .1 * Math.max(0, Math.sin(o.nod)) : -.03 })); person(830, 2250, 1180, MOMW({ mouth: o.momTalk || 0 }));
  tableTop(1450); plate(250, 1560, .9, 'burger'); plate(830, 1560, .9, 'pancakes'); glassWater2(560, 1600, .9); }
function bruiseArm(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = grad(-500, 0, 500, 0, [[0, '#e8bfa6'], [.5, '#f2cdb6'], [1, '#e0b59b']]); rr(-600, -110, 1200, 220, 110); ctx.fill(); ctx.fillStyle = grad(0, -110, 0, 110, [[0, '#4a7ab0'], [1, '#365c88']]); ctx.fillRect(-600, -120, 300, 240); // sleeve pushed up
  for (const [bx, by, r] of [[40, -10, 70], [190, 30, 50]]) { ctx.fillStyle = rgrad(bx, by, 0, r, [[0, 'rgba(110,70,120,.55)'], [.6, 'rgba(120,90,110,.3)'], [1, 'rgba(150,120,90,0)']]); ctx.beginPath(); ctx.ellipse(bx, by, r * 1.3, r, .2, 0, 7); ctx.fill(); } ctx.restore(); } // soft, non-graphic bruises
function noteCard(x, y, s, p, rot = -.04, o = {}) { if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-260 + 10, -170 + 14, 520, 340); ctx.fillStyle = '#fffbea'; ctx.fillRect(-260, -170, 520, 340);
  ctx.strokeStyle = 'rgba(80,120,200,.3)'; ctx.lineWidth = 2; for (let y2 = -110; y2 < 170; y2 += 52) { ctx.beginPath(); ctx.moveTo(-260, y2); ctx.lineTo(260, y2); ctx.stroke(); } for (let i = 0; i < 6; i++) { ctx.fillStyle = '#e8e2cc'; ctx.beginPath(); ctx.arc(-220 + i * 88, -170, 10, 0, 7); ctx.fill(); }
  handWrite('Do you need help?', 0, -10, 70, p, '#1d2a5c'); if (o.ok) handWrite('OK', 0, 90, 70, clamp(p * 2 - 1), '#1d2a5c'); ctx.restore(); }
function policeOutside(t) { diner(t, 4); const ph = Math.floor(t * 6) % 2; glow(200, 500, 800, `rgba(255,40,60,${ph ? .55 : .15})`); glow(880, 500, 800, `rgba(50,110,255,${ph ? .15 : .6})`); }
function proclamation(x, y, s, p) { const k = eback(clamp(p)); if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-300 + 12, -400 + 16, 600, 800); ctx.fillStyle = '#fbf6e6'; ctx.fillRect(-300, -400, 600, 800); ctx.strokeStyle = '#c9a33a'; ctx.lineWidth = 10; ctx.strokeRect(-280, -380, 560, 760);
  label('PROCLAMATION', 0, -300, 46, { weight: 900, color: '#1d2a5c', font: F_SERIF, spacing: 4 }); label('State of Florida', 0, -250, 30, { weight: 700, color: '#555', font: F_SERIF });
  ['January 28, 2021', 'is proclaimed', 'FLAVIANE CARVALHO', 'CHILD ADVOCACY DAY'].forEach((s2, i) => label(s2, 0, -140 + i * 64, i >= 2 ? 40 : 32, { weight: i >= 2 ? 900 : 700, color: i >= 2 ? '#8a1c2a' : '#333', font: F_SERIF }));
  ctx.fillStyle = '#c9a33a'; ctx.beginPath(); for (let i = 0; i < 24; i++) { const r = i % 2 ? 60 : 76, a = i * Math.PI / 12; ctx.lineTo(Math.cos(a) * r, 250 + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e8c860'; ctx.beginPath(); ctx.arc(0, 250, 50, 0, 7); ctx.fill(); ctx.restore(); } // seal

// ================== SCENES ==================
SC.hook = { // FRAME 0: an empty place mat between two loaded plates — "they didn't let him eat"
  draw(t, d, P, E) { const z = lerp(1.25, 1.0, eout(prog(t, 0, d))); ctx.save(); cam(540, 1150, z); diner(t, 6); tableTop(700); plate(200, 1000, 1.2, 'burger'); plate(880, 1000, 1.2, 'pancakes'); ctx.fillStyle = '#f6f4ee'; rr(360, 1100, 360, 240, 20); ctx.fill(); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 6; rr(360, 1100, 360, 240, 20); ctx.stroke(); glassWater2(540, 1080, 1.1); // the boy's empty place
    ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(320, 1150); ctx.lineTo(330, 1330); ctx.moveTo(760, 1150); ctx.lineTo(750, 1330); ctx.stroke(); ctx.restore();
    bigTitle('ЕМУ НЕ ДАЛИ ЕСТЬ', 300, prog(t, 0, .15), { size: 96, col: '#fff', glow: 'rgba(255,60,70,.5)' }); if (t > E('жив', 1, 3.6) - .2) label('…И ПОЭТОМУ ОН ЖИВ', 540, 420, 56, { weight: 900, color: '#ffd23f', alpha: prog(t, E('жив', 1, 3.6) - .2, E('жив', 1, 3.6)) }); },
  sfx(d) { return [[0, 'dundun', .4], [0, 'crowd', .2, { dur: d }], [.1, 'clink', .3]]; }
};
SC.arrive = { // "Флорида, первое января. Семья садится за столик."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { ctx.save(); cam(540, 700, lerp(1.0, 1.1, prog(t, 0, t2))); ctx.drawImage(layer('diner0', dinerDraw, 0), 0, 0); ctx.restore(); bigTitle('ФЛОРИДА', 300, prog(t, 0, .2), { size: 120, col: '#fff' }); label('1 ЯНВАРЯ 2021', 540, 420, 52, { weight: 900, color: '#ffd23f', alpha: prog(t, .2, .5) }); return; }
    ctx.save(); cam(540, 1300, lerp(1.0, 1.05, prog(t, t2, d))); familyBooth(t, { fear: .3 }); ctx.restore(); },
  sfx(d) { return [[0, 'crowd', .25, { dur: d }], [0, 'door_chime', .35]]; }
};
SC.food = { // "Взрослым приносят еду. Одиннадцатилетнему мальчику — ничего."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    ctx.save(); if (t < t2 - .05) cam(540, 1400, 1.05); else cam(560, lerp(1250, 1180, prog(t, t2, d)), lerp(1.4, 1.6, prog(t, t2, d))); familyBooth(t, { eat: true, fear: .5 }); ctx.restore();
    bigTitle(t < t2 - .05 ? 'ВЗРОСЛЫЕ ЕДЯТ' : 'ЕМУ — НИЧЕГО', 300, t < t2 - .05 ? prog(t, 0, .2) : prog(t, t2 - .05, t2 + .2), { size: 100, col: t < t2 - .05 ? '#fff' : '#ff6b74' }); },
  sfx(d) { return [[0, 'crowd', .25, { dur: d }], [.2, 'clink', .3], [1.0, 'clink', .25]]; }
};
SC.ask = { // "Официантка спрашивает: «А ему?» — «Он поест дома»."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), td = E('дома', 1, d - .6);
    if (t < td - .7) { diner(t, 4); ctx.save(); cam(540, 900, 1.15); person(540, 2300, 1550, WAITR({ mouth: t > t2 ? Math.abs(Math.sin(t * 15)) * .5 : 0, smile: .2 })); ctx.restore(); ctx.fillStyle = '#fff'; ctx.save(); ctx.translate(820, 1180); ctx.rotate(-.1); rr(-90, -120, 180, 240, 10); ctx.fill(); ctx.restore(); // order pad
      bigTitle('«А ЕМУ?»', 300, prog(t, t2 - .05, t2 + .2), { size: 120, col: '#fff' }); return; }
    ctx.save(); cam(800, 1250, 1.55); familyBooth(t, { momTalk: Math.abs(Math.sin(t * 14)) * .5, fear: .5 }); ctx.restore(); bigTitle('«ОН ПОЕСТ ДОМА»', 300, prog(t, td - .7, td - .5), { size: 96, col: '#ff6b74' }); },
  sfx(d) { return [[0, 'crowd', .2, { dur: d }]]; }
};
SC.bruises = { // "И тут она замечает синяки. На руках. На лице."
  draw(t, d, P, E, s) { const ta = s.U(s.a + 1), tf = s.U(s.a + 2);
    if (t < ta - .05) { diner(t, 6); ctx.save(); cam(540, headOf([540, 2300, 1550])[1] + 10, 3.0); person(540, 2300, 1550, WAITR({ fear: .4 })); ctx.restore(); bigTitle('ОНА ЗАМЕТИЛА', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    if (t < tf - .05) { bg('#2a2018', '#100c08'); diner(t, 8); grade('rgba(0,0,0,1)', .35, 'source-over'); bruiseArm(560, 960, 1.0); bigTitle('НА РУКАХ', 300, prog(t, ta - .05, ta + .2), { size: 110, col: '#fff' }); return; }
    ctx.save(); const hb = [540, 2180 - 93.2 * 9.8 - 26]; cam(hb[0], hb[1], 3.2); familyBooth(t, { fear: .7 }); ctx.restore(); ctx.fillStyle = rgrad(640, 980, 0, 70, [[0, 'rgba(110,70,120,.35)'], [1, 'rgba(110,70,120,0)']]); ctx.beginPath(); ctx.arc(640, 980, 70, 0, 7); ctx.fill(); // soft bruise on the cheek
    bigTitle('НА ЛИЦЕ', 300, prog(t, tf - .05, tf + .2), { size: 110, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'heartbeat', .3, { dur: d }], [s.U(s.a + 1), 'dundun', .3]]; }
};
SC.cantask = { // "Спросить напрямую нельзя — родители сидят рядом. И она делает то, до чего додумался бы не каждый."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { ctx.save(); cam(540, 1250, 1.2); familyBooth(t, { fear: .6 }); ctx.restore(); for (const x of [250, 830]) { ctx.strokeStyle = 'rgba(255,77,87,.9)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(x, 800, 200, 260, 0, 0, 7); ctx.stroke(); } bigTitle('РОДИТЕЛИ РЯДОМ', 300, prog(t, 0, .2), { size: 96, col: '#fff' }); return; }
    diner(t, 5); ctx.save(); cam(540, 900, lerp(1.15, 1.3, prog(t, t2, d))); person(540, 2300, 1550, WAITR({ smile: .1 })); ctx.restore(); grade('rgba(255,230,180,1)', .1, 'lighter'); bigTitle('И ТОГДА ОНА…', 300, prog(t, t2, t2 + .2), { size: 110, col: '#ffd23f' }); },
  sfx(d, P, E, s) { return [[0, 'crowd', .2, { dur: d }], [s.U(s.a + 1), 'riser', .3, { dur: d - s.U(s.a + 1) }]]; }
};
SC.note = { // "Пишет на листке: «Тебе нужна помощь?» — и встаёт за спинами родителей, чтобы записку видел только он."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), tb = E('спинами', 1, t2 + 1.8);
    if (t < tb - .2) { bg('#2a2018', '#100c08'); diner(t, 8); grade('rgba(0,0,0,1)', .3, 'source-over'); noteCard(540, 900, 1.6, prog(t, .2, Math.max(t2, .9))); if (t > t2 - .05) label('«Тебе нужна помощь?»', 540, 1250, 64, { weight: 900, color: '#ffd23f', alpha: prog(t, t2 - .05, t2 + .2) });
      ctx.save(); ctx.translate(lerp(300, 820, prog(t, .2, Math.max(t2, .9))), 960); ctx.rotate(-.6); ctx.fillStyle = '#1f3b70'; rr(-16, -240, 32, 260, 10); ctx.fill(); ctx.restore(); return; } // pen
    ctx.save(); cam(540, 1150, 1.25); diner(t, 3); booth(1450); person(250, 2250, 1250, STEPF({ mouth: Math.abs(Math.sin(t * 6)) * .2 })); person(830, 2250, 1180, MOMW()); person(540, 2180, 980, BOYK({ fear: .5 })); tableTop(1450); plate(250, 1560, .9, 'burger'); plate(830, 1560, .9, 'pancakes'); ctx.restore(); // the family, seen past the waitress
    ctx.save(); ctx.translate(lerp(1300, 860, eout(prog(t, tb - .2, tb + .4))), 0); person(0, 2700, 2300, WAITR({ shadow: false })); noteCard(-60, 760, .7, 1, .05); ctx.restore(); // she stands behind the stepfather, note towards the boy
    bigTitle('ТОЛЬКО ДЛЯ НЕГО', 300, prog(t, tb - .2, tb + .1), { size: 96, col: '#ffd23f' }); },
  sfx(d, P, E, s) { return [[.2, 'pen', .4], [E('спинами', 1, s.U(s.a + 1) + 1.8) - .2, 'whoosh', .25]]; }
};
SC.nod = { // "Мальчик смотрит на листок. И едва заметно кивает."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), hb = [540, 2180 - 93.2 * 9.8 - 26]; ctx.save(); cam(hb[0], hb[1] + 40, lerp(2.6, 3.0, prog(t, 0, d))); diner(t, 6); booth(1450); person(540, 2180, 980, BOYK({ fear: .6, nod: t > t2 ? (t - t2) * 9 : 0 })); ctx.restore();
    if (t < t2 - .05) bigTitle('ОН УВИДЕЛ', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); else { bigTitle('КИВОК', 300, prog(t, t2, t2 + .2), { size: 130, col: '#7dff9e' }); } },
  sfx(d, P, E, s) { return [[0, 'heartbeat', .35, { dur: d }], [s.U(s.a + 1) + .1, 'pop', .35]]; }
};
SC.call = { // "Она звонит в полицию."
  draw(t, d) { diner(t, 6); grade('rgba(20,25,40,1)', .3); ctx.save(); cam(540, 980, 1.04); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { state: 'active', top: 'вызов…', name: '911', num: 'экстренная служба', avatar: '#c0392b', c1: '#4a1620', c2: '#1d0a0e', glowCol: 'rgba(255,90,100,.25)' }), { sleeve: '#2a6f7f', skin: '#d9a17e' }); ctx.restore(); bigTitle('911', 300, prog(t, 0, .2), { size: 150, col: '#ff4d57' }); },
  sfx() { return [[0, 'beeps', .4]]; }
};
SC.truth = { // "Выяснилось: отчим бил мальчика, а в наказание не давал ему есть." (no violence on screen)
  draw(t, d) { bg('#120a0c', '#040203'); glow(540, 900, 800, 'rgba(255,60,70,.15)'); person(540, 2300, 1700, STEPF({ color: '#0b0507', silhouette: true, rim: '#ff3b4a' })); ctx.save(); ctx.translate(540, 1500); plate(0, 0, 1.2, null); ctx.restore(); xMark(540, 1440, 90, prog(t, .6, .9));
    bigTitle('ОТЧИМ', 300, prog(t, 0, .2), { size: 120, col: '#ff6b74' }); },
  sfx(d) { return [[0, 'drone', .35, { dur: d }], [.6, 'soft_x', .35]]; }
};
SC.arrest = { // "Отчима арестовали, позже суд признал его виновным."
  draw(t, d, P, E, s) { const tc = E('суд', 1, d * .5);
    if (t < tc - .1) { policeOutside(t); bigTitle('АРЕСТ', 300, prog(t, 0, .2), { size: 130, col: '#fff' }); return; }
    bg('#2a1a10', '#0e0806'); woodTable(1100, { c1: '#5a3b24', c2: '#24160d' }); gavel(540, 1000, 1.4, lerp(-.9, .1, eio(prog(t, tc, tc + .35)))); stamp('ВИНОВЕН', 540, 600, prog(t, tc + .3, tc + .6), { color: '#e3262f', size: 110, rot: -.08 }); },
  sfx(d, P, E) { return [[0, 'siren', .3, { dur: E('суд', 1, d * .5) }], [E('суд', 1, d * .5) + .35, 'gavel', .55]]; }
};
SC.chief = { // "Начальник полиции сказал: если бы не она, мы бы, скорее всего, расследовали убийство."
  draw(t, d, P, E, s) { bg('#1a2238', '#0a0e18'); ctx.fillStyle = '#24508f'; ctx.fillRect(0, 300, W, 900); for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(i * 200, 300, 100, 900); }
    person(540, 2300, 1600, { top: '#1b2540', pants: '#1b2540', hair: '#8a8580', light: 1, uniform: 'guard', cap: null, mouth: Math.abs(Math.sin(t * 13)) * .45 }); ctx.fillStyle = '#3a2a1e'; rr(300, 1250, 480, 700, 20); ctx.fill(); ctx.fillStyle = '#c9a33a'; ctx.beginPath(); ctx.arc(540, 1420, 70, 0, 7); ctx.fill(); // podium + seal
    for (const mx of [480, 600]) { ctx.strokeStyle = '#111'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(mx, 1250); ctx.lineTo(mx + (mx < 540 ? 20 : -20), 1130); ctx.stroke(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.ellipse(mx + (mx < 540 ? 20 : -20), 1115, 20, 30, 0, 0, 7); ctx.fill(); }
    const tq = E('убийство', 1, d - .8); bigTitle('НАЧАЛЬНИК ПОЛИЦИИ', 300, prog(t, 0, .2), { size: 80, col: '#fff' }); if (t > tq - .3) { ctx.fillStyle = 'rgba(0,0,0,.75)'; rr(80, 420, 920, 200, 30); ctx.fill(); label('«…мы бы расследовали', 540, 500, 54, { weight: 900, color: '#fff', alpha: prog(t, tq - .3, tq) }); label('убийство»', 540, 575, 62, { weight: 900, color: '#ff6b74', alpha: prog(t, tq - .3, tq) }); } },
  sfx(d) { return [[0, 'shutters', .3, { n: 6 }], [0, 'crowd', .15, { dur: d }]]; }
};
SC.hero = { // "Её зовут Флавиани Карвальо. Во Флориде объявили день её имени."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { bg('#2a2018', '#100c08'); glow(540, 800, 800, 'rgba(255,210,120,.3)'); polaroid(540, 860, 640, -.03, () => { diner(0, 3); person(540, 2150, 1650, WAITR({ smile: .7, shadow: false })); }, 'Flaviane Carvalho', { tint: 'rgba(255,240,220,.35)' }); bigTitle('ФЛАВИАНИ КАРВАЛЬО', 300, prog(t, 0, .2), { size: 76, col: '#ffd23f' }); return; }
    bg('#1a1610', '#080604'); glow(540, 800, 800, 'rgba(255,210,120,.25)'); proclamation(540, 900, 1.25, prog(t, t2 - .05, t2 + .3)); bigTitle('ДЕНЬ ЕЁ ИМЕНИ', 300, prog(t, t2 - .05, t2 + .2), { size: 100, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'pad_swell', .3, { dur: d }], [s.U(s.a + 1), 'chime', .4]]; }
};
SC.echo = { // "Одна записка. Один кивок."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); bg('#2a2018', '#100c08'); diner(t, 10); grade('rgba(0,0,0,1)', .4, 'source-over');
    if (t < t2 - .05) { noteCard(540, 900, 1.5, 1); bigTitle('ОДНА ЗАПИСКА', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    const hb = [540, 2180 - 93.2 * 9.8 - 26]; ctx.save(); cam(hb[0], hb[1] + 40, 2.8); diner(t, 6); booth(1450); person(540, 2180, 980, BOYK({ fear: .3, nod: (t - t2) * 9 })); ctx.restore(); bigTitle('ОДИН КИВОК', 300, prog(t, t2 - .05, t2 + .2), { size: 100, col: '#7dff9e' }); },
  sfx(d, P, E, s) { return [[0, 'pop', .3], [s.U(s.a + 1), 'pop', .3]]; }
};
SC.final = { // "Иногда, чтобы спасти жизнь, достаточно спросить так, чтобы ответить мог только он." → back to the empty place
  draw(t, d) { ctx.save(); cam(540, 1150, lerp(1.0, 1.15, prog(t, 0, d))); diner(t, 6); tableTop(700); plate(200, 1000, 1.2, 'burger'); plate(880, 1000, 1.2, 'pancakes'); ctx.fillStyle = '#f6f4ee'; rr(360, 1100, 360, 240, 20); ctx.fill(); glassWater2(540, 1080, 1.1); noteCard(560, 1260, .55, 1, .08, { ok: true }); ctx.restore();
    bigTitle('СПРОСИТЕ', 300, prog(t, d * .45, d * .45 + .2), { size: 120, col: '#ffd23f' }); },
  sfx(d) { return [[0, 'pad_swell', .25, { dur: d }], [d * .45, 'chime', .3]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .3) drawSubs(t); };
