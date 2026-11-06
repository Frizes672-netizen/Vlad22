// ===== EN Short: true story — the 911 "pizza order" (Oregon, Ohio, Nov 13 2019) =====
const DISP = (o = {}) => Object.assign({ top: '#2b3a55', pants: '#22283a', hair: '#5a3a22', skin: '#e6b99c', headset: true, light: 1, eyes: '#5b6b62' }, o);
const CALLER = (o = {}) => Object.assign({ fem: true, top: '#6a7a8a', pants: '#2a2f3a', hair: '#3a2618', skin: '#ecc2a8', light: -1 }, o);
const PZ_RED = '#d6402f';
function bigTitleFit(s, y, p, o = {}) { const size = o.size || 120; ctx.save(); ctx.font = `900 ${size}px ${F_HEAD}`; const w = ctx.measureText(s).width + size * .32; ctx.restore(); bigTitle(s, y, p, Object.assign({}, o, { size: w > 1000 ? Math.floor(size * 1000 / w) : size })); }

// ---------- props & places ----------
function pizzaBox(x, y, s, rot = 0, open = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-300 + 14, -300 + 20, 600, 600, 20); ctx.fill();
  ctx.fillStyle = grad(-300, -300, 300, 300, [[0, '#f2e2c4'], [1, '#d9c39a']]); rr(-300, -300, 600, 600, 18); ctx.fill(); ctx.strokeStyle = 'rgba(120,90,50,.35)'; ctx.lineWidth = 6; rr(-280, -280, 560, 560, 14); ctx.stroke();
  ctx.fillStyle = PZ_RED; ctx.beginPath(); ctx.arc(0, -40, 150, 0, 7); ctx.fill(); ctx.fillStyle = '#f2e2c4'; ctx.beginPath(); ctx.arc(0, -40, 120, 0, 7); ctx.fill(); ctx.fillStyle = PZ_RED; ctx.save(); ctx.translate(0, -40); for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); ctx.fillRect(-4, -118, 8, 118); } ctx.restore(); // pizza logo
  label('HOT & FRESH', 0, 190, 54, { weight: 900, color: PZ_RED, spacing: 6 }); for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(214,64,47,.8)'; ctx.fillRect(-260 + i * 70, 250, 40, 10); } ctx.restore(); }
function dispatchRoom(t) { bg('#0a1020', '#03050a'); ctx.drawImage(layer('dispatch', () => { bg('#0c1426', '#04070e'); for (let i = 0; i < 3; i++) { const x = 60 + i * 340; ctx.fillStyle = '#0b1c34'; rr(x, 220, 300, 200, 10); ctx.fill(); ctx.strokeStyle = 'rgba(80,170,255,.5)'; ctx.lineWidth = 3; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x + 10, 250 + k * 28); ctx.lineTo(x + 290, 240 + k * 30); ctx.stroke(); } } // wall maps
    ctx.fillStyle = '#122038'; ctx.fillRect(0, 480, W, 30); for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(80,170,255,.12)'; rr(40 + i * 175, 520, 150, 100, 8); ctx.fill(); } }, 4), 0, 0);
  for (let i = 0; i < 8; i++) { const R = rnd(i + 3); ctx.fillStyle = `rgba(${R() > .5 ? '255,80,80' : '90,200,255'},${.5 + .5 * Math.sin(t * 3 + i)})`; ctx.beginPath(); ctx.arc(100 + i * 120 + R() * 40, 300 + R() * 100, 7, 0, 7); ctx.fill(); } } // live dots
function console911(t, o = {}) { ctx.fillStyle = grad(0, 1380, 0, 1460, [[0, '#2a3040'], [1, '#141822']]); ctx.fillRect(-20, 1380, W + 40, 80); ctx.fillStyle = '#0e1118'; ctx.fillRect(-20, 1460, W + 40, 600); // desk
  for (const [mx, w2] of [[180, 300], [540, 360], [900, 300]]) { ctx.fillStyle = '#0a0c12'; rr(mx - w2 / 2, 1060, w2, 300, 12); ctx.fill(); ctx.save(); rr(mx - w2 / 2 + 10, 1070, w2 - 20, 280, 6); ctx.clip(); ctx.fillStyle = mx === 540 ? '#0b2244' : '#071628'; ctx.fillRect(mx - w2 / 2, 1060, w2, 300);
    if (mx === 540) { label('INCOMING 911', mx, 1120, 30, { weight: 900, color: '#ff6b6b' }); label(o.line || 'CALLER: UNKNOWN', mx, 1170, 24, { weight: 800, color: '#cfe0ff', font: MONO }); label('00:' + String(Math.floor(t * 2) % 60).padStart(2, '0'), mx, 1230, 46, { weight: 900, color: '#7dff9e', font: MONO }); }
    else { ctx.strokeStyle = 'rgba(120,180,255,.5)'; ctx.lineWidth = 2; for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.moveTo(mx - w2 / 2, 1080 + k * 28); ctx.lineTo(mx + w2 / 2, 1090 + k * 26); ctx.stroke(); } ctx.fillStyle = '#ff4d57'; ctx.beginPath(); ctx.arc(mx + 30, 1200, 10, 0, 7); ctx.fill(); }
    ctx.restore(); glow(mx, 1210, 260, 'rgba(80,160,255,.12)'); } }
function dispatcherShot(t, s, o = {}) { dispatchRoom(t); person(540, 2420, 1800, DISP({ mouth: o.talk ? talking(t, s) : 0, smile: o.smile || 0, fear: o.fear || 0 })); console911(t, o); }
function aptKitchenDraw() { bg('#141a24', '#06080c'); ctx.fillStyle = '#1c2430'; ctx.fillRect(0, 0, W, 1300); ctx.fillStyle = '#232c3a'; for (let i = 0; i < 4; i++) rr(40 + i * 260, 160, 230, 320, 10), ctx.fill(); // upper cabinets
  ctx.fillStyle = '#0d1a2e'; ctx.fillRect(620, 560, 360, 380); ctx.fillStyle = 'rgba(160,190,255,.25)'; ctx.fillRect(640, 580, 320, 340); for (let i = 0; i < 18; i++) { const R = rnd(i + 9); ctx.fillStyle = `rgba(255,220,150,${.4 + R() * .5})`; ctx.fillRect(650 + R() * 300, 700 + R() * 200, 10, 8); } // night window with lit windows across
  ctx.fillStyle = '#2b3442'; ctx.fillRect(0, 1060, W, 60); ctx.fillStyle = '#1a212c'; ctx.fillRect(0, 1120, W, 800); ctx.fillStyle = '#b8bec8'; rr(60, 520, 300, 560, 20); ctx.fill(); ctx.fillStyle = '#8a929c'; ctx.fillRect(320, 640, 14, 120); ctx.fillRect(320, 820, 14, 160); // fridge
  ctx.fillStyle = '#0a0c10'; ctx.fillRect(380, 300, 200, 760); ctx.fillStyle = 'rgba(255,200,120,.25)'; ctx.fillRect(390, 310, 180, 740); } // doorway to a lit hall
function kitchenNight(t) { ctx.drawImage(layer('aptk', aptKitchenDraw, 3), 0, 0); glow(480, 680, 500, 'rgba(255,190,110,.18)'); }
function policeCar(x, y, s, lights = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(0, 50, 340, 26, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#121418'; ctx.beginPath(); ctx.moveTo(-330, 40); ctx.lineTo(-330, -40); ctx.quadraticCurveTo(-300, -80, -220, -84); ctx.lineTo(-120, -150); ctx.lineTo(80, -150); ctx.lineTo(170, -88); ctx.lineTo(300, -80); ctx.quadraticCurveTo(334, -60, 334, -10); ctx.lineTo(330, 40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e9ecf0'; ctx.beginPath(); ctx.moveTo(-200, -80); ctx.lineTo(160, -84); ctx.lineTo(300, -76); ctx.lineTo(316, 20); ctx.lineTo(-316, 20); ctx.lineTo(-322, -36); ctx.closePath(); ctx.fill(); label('POLICE', -20, -6, 54, { weight: 900, color: '#1d2a5c', spacing: 4 }); // white doors
  ctx.fillStyle = 'rgba(160,200,240,.45)'; ctx.beginPath(); ctx.moveTo(-110, -142); ctx.lineTo(-10, -142); ctx.lineTo(-10, -90); ctx.lineTo(-180, -88); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(10, -142); ctx.lineTo(75, -142); ctx.lineTo(150, -90); ctx.lineTo(10, -90); ctx.closePath(); ctx.fill();
  for (const wx of [-210, 210]) { ctx.fillStyle = '#0b0b0d'; ctx.beginPath(); ctx.arc(wx, 40, 56, 0, 7); ctx.fill(); ctx.fillStyle = '#7a808a'; ctx.beginPath(); ctx.arc(wx, 40, 26, 0, 7); ctx.fill(); }
  const ph = Math.floor(t * 6) % 2; ctx.fillStyle = lights ? (ph ? '#ff2a3d' : '#5a1018') : '#3a1418'; rr(-60, -172, 56, 22, 6); ctx.fill(); ctx.fillStyle = lights ? (ph ? '#1a2a60' : '#3a7dff') : '#141c3a'; rr(4, -172, 56, 22, 6); ctx.fill();
  if (lights) { glow(-30, -160, 260, `rgba(255,40,60,${ph ? .5 : .1})`); glow(30, -160, 260, `rgba(60,120,255,${ph ? .1 : .5})`); } ctx.fillStyle = '#fff3c4'; rr(312, -50, 18, 20, 4); ctx.fill(); ctx.restore(); }
function nightStreet(t) { bg('#05070d', '#0e1422'); ctx.fillStyle = '#141a26'; ctx.fillRect(80, 200, 920, 1000); for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const R = rnd(r * 7 + c); ctx.fillStyle = R() > .55 ? 'rgba(255,210,140,.85)' : 'rgba(40,50,70,.9)'; ctx.fillRect(130 + c * 145, 260 + r * 150, 90, 90); } // apartment block
  ctx.fillStyle = '#1a1d24'; ctx.fillRect(0, 1200, W, H); ctx.fillStyle = 'rgba(255,255,255,.4)'; for (let x = 0; x < W; x += 200) ctx.fillRect(x + ((t * 400) % 200) * 0, 1500, 110, 12); glow(900, 1180, 300, 'rgba(255,220,160,.25)'); }
function yesNoCard(q, ans, p, pa) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(540, 860); ctx.scale(k, k); ctx.fillStyle = 'rgba(8,12,22,.88)'; rr(-460, -260, 920, 520, 40); ctx.fill(); ctx.strokeStyle = 'rgba(120,180,255,.5)'; ctx.lineWidth = 4; rr(-460, -260, 920, 520, 40); ctx.stroke();
  label(q, 0, -130, 64, { weight: 900, color: '#fff' }); for (const [txt, x, col, on] of [['YES', -210, '#22b357', ans === 'yes'], ['NO', 210, '#e3262f', false]]) { const lit = on ? clamp(pa) : 0; ctx.fillStyle = lit ? col : 'rgba(255,255,255,.1)'; rr(x - 170, 0, 340, 160, 80); ctx.fill(); if (lit) glow(x, 80, 260, col + '88'); label(txt, x, 105, 80, { weight: 900, color: lit ? '#fff' : 'rgba(255,255,255,.5)' }); } ctx.restore(); }
function smsScreen(w, h, t, p) { ctx.fillStyle = '#0d0f14'; ctx.fillRect(-w / 2, -h / 2, w, h); statusBar(w, h); ctx.fillStyle = '#1a1d24'; ctx.fillRect(-w / 2, -h / 2 + 70, w, 130); ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(0, -h / 2 + 120, 34, 0, 7); ctx.fill(); label('911', 0, -h / 2 + 132, 30, { weight: 900 }); label('Text message', 0, -h / 2 + 185, 22, { weight: 700, color: '#8a94a4' });
  const msgs = [['I can’t talk. Someone is here.', 1], ['12 Maple St, apt 3', 1], ['Police are on the way. Stay quiet if you can.', 0]];
  msgs.forEach(([m, mine], i) => { const pp = clamp(p * 3 - i); if (pp <= 0) return; ctx.save(); ctx.globalAlpha = pp; const y = -h / 2 + 300 + i * 150, bw = 360; ctx.fillStyle = mine ? '#2f7de1' : '#2a2d35'; rr(mine ? w / 2 - 30 - bw : -w / 2 + 30, y - 50, bw, 110, 30); ctx.fill();
    ctx.font = `700 24px ${F_HEAD}`; const words = m.split(' '); let line = '', ly = y - 12; const lx = mine ? w / 2 - 30 - bw + 24 : -w / 2 + 54; for (const wd of words) { if (ctx.measureText(line + wd).width > bw - 50) { label(line, lx, ly, 24, { align: 'left', weight: 700 }); line = ''; ly += 32; } line += wd + ' '; } label(line, lx, ly, 24, { align: 'left', weight: 700 }); ctx.restore(); }); }

// ================== SCENES ==================
SC.hook = { // FRAME 0: a pizza box flies at the camera; the call on screen is to 911
  draw(t, d, P, E) { const k = eout(prog(t, 0, .6)); kitchenNight(t); grade('rgba(10,14,25,1)', .3); ctx.save(); shake(t, t < .6 ? 6 : 0); pizzaBox(540, 820, lerp(.4, 1.25, k), lerp(-.6, -.08, k)); ctx.restore();
    phonePlain(780, 1180, 300, .1, (w, h) => callScreen(w, h, t, { state: 'active', top: 'calling…', name: '911', num: 'Emergency', avatar: '#c0392b', c1: '#4a1620', c2: '#1d0a0e' }));
    bigTitleFit('SHE ORDERED A PIZZA', 270, prog(t, 0, .15), { size: 96, col: '#fff', glow: 'rgba(255,90,60,.5)' }); const tm = E('mother', 1, 3.8); if (t > tm - .3) label('…FROM 911', 540, 390, 60, { weight: 900, color: '#ff6b6b', alpha: prog(t, tm - .3, tm) }); },
  sfx(d) { return [[0, 'whoosh', .45], [.55, 'thud_soft', .5], [0, 'ring', .3]]; }
};
SC.dispatch = { // "Ohio, November. A 911 dispatcher picks up."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { nightStreet(t); bigTitleFit('OHIO · NOVEMBER', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    ctx.save(); cam(540, 1100, lerp(1.0, 1.08, prog(t, t2, d))); dispatcherShot(t, s, { line: 'LINE 3 · RINGING' }); ctx.restore(); bigTitleFit('911 DISPATCH', 300, prog(t, t2, t2 + .2), { size: 100, col: '#7fc8ff' }); },
  sfx(d, P, E, s) { return [[0, 'wind', .25, { dur: s.U(s.a + 1) }], [s.U(s.a + 1), 'ring', .4], [s.U(s.a + 1), 'office', .2, { dur: d - s.U(s.a + 1) }]]; }
};
SC.order = { // "A woman says: «I'd like to order a pizza.»"
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1); kitchenNight(t); ctx.save(); cam(560, 860, lerp(1.1, 1.22, prog(t, 0, d))); person(560, 3120, 2500, CALLER({ phoneEar: true, fear: .7, mouth: t > t2 ? Math.abs(Math.sin(t * 16)) * .3 : 0 })); ctx.restore(); grade('rgba(10,14,30,1)', .3);
    if (t > t2 - .05) bigTitleFit('"I\'D LIKE TO ORDER A PIZZA"', 300, prog(t, t2 - .05, t2 + .2), { size: 76, col: '#ffd23f' }); },
  sfx(d) { return [[0, 'hum', .2, { dur: d }], [.2, 'whisper', .3]]; }
};
SC.hangup = { // "Most dispatchers would hang up."
  draw(t, d) { dispatchRoom(t); ctx.save(); cam(540, 1250, 1.8); console911(t, { line: '"ORDER A PIZZA"' }); ctx.restore(); ctx.save(); ctx.translate(540, 1500); const pulse = 1 + .05 * Math.sin(t * 8); ctx.scale(pulse, pulse); ctx.fillStyle = '#e3262f'; rr(-260, -80, 520, 160, 80); ctx.fill(); label('END CALL', 0, 26, 70, { weight: 900 }); ctx.restore();
    bigTitleFit('MOST WOULD HANG UP', 300, prog(t, 0, .2), { size: 96, col: '#fff' }); },
  sfx() { return [[0, 'dundun', .4]]; }
};
SC.didnt = { // "Tim Teneyck didn't. «Ma'am, you know you've called 911?» «Yes.»"
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), ty = E('yes', 1, d - .6); ctx.save(); cam(540, 900, lerp(1.25, 1.35, prog(t, 0, d))); dispatcherShot(t, s, { talk: true, line: 'LINE 3 · OPEN' }); ctx.restore();
    if (t < t2 - .05) bigTitleFit("HE DIDN'T", 300, prog(t, 0, .2), { size: 120, col: '#7dff9e' }); else bigTitleFit('"YOU KNOW YOU CALLED 911?"', 300, prog(t, t2 - .05, t2 + .2), { size: 76, col: '#fff' });
    if (t > ty - .1) { ctx.fillStyle = 'rgba(8,12,22,.85)'; rr(340, 420, 400, 130, 40); ctx.fill(); label('"YES."', 540, 510, 70, { weight: 900, color: '#ffd23f', alpha: prog(t, ty - .1, ty + .1) }); } },
  sfx(d) { return [[0, 'office', .2, { dur: d }]]; }
};
SC.understood = { // "And then he understood. She couldn't talk. Someone was right there with her."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), t3 = s.U(s.a + 2);
    if (t < t2 - .05) { ctx.save(); cam(540, headOf([540, 2420, 1800])[1], 3.0); dispatcherShot(t, s, { fear: .3 }); ctx.restore(); bigTitleFit('HE UNDERSTOOD', 300, prog(t, 0, .2), { size: 100, col: '#ffd23f' }); return; }
    kitchenNight(t); ctx.save(); cam(560, 900, 1.1); if (t > t3 - .05) { person(480, 2100, 1500, { color: '#05070a', silhouette: true, shadow: false }); } person(700, 3120, 2500, CALLER({ phoneEar: true, fear: 1 })); ctx.restore(); grade('rgba(10,14,30,1)', .35); vign(.6); // a man's silhouette appears in the doorway behind her
    bigTitleFit(t < t3 - .05 ? "SHE COULDN'T TALK" : 'SOMEONE WAS THERE', 300, t < t3 - .05 ? prog(t, t2 - .05, t2 + .2) : prog(t, t3 - .05, t3 + .2), { size: 96, col: '#fff' }); },
  sfx(d, P, E, s) { return [[0, 'heartbeat', .3, { dur: d }], [s.U(s.a + 2) - .05, 'creak', .4], [s.U(s.a + 2), 'drone', .3, { dur: d - s.U(s.a + 2) }]]; }
};
SC.yesno = { // "So he asked only yes-or-no questions. «Are you in danger?» «Yes.»"
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1), ty = E('yes', 2, d - .5); dispatchRoom(t); grade('rgba(0,0,0,1)', .4, 'source-over');
    if (t < t2 - .05) { yesNoCard('YES OR NO ONLY', '', prog(t, 0, .25), 0); return; }
    yesNoCard('ARE YOU IN DANGER?', 'yes', 1, prog(t, ty - .1, ty + .1)); },
  sfx(d, P, E) { return [[.1, 'pop', .35], [E('yes', 2, d - .5) - .1, 'beeps', .4]]; }
};
SC.sirens = { // "He sent police — and told them to turn off their sirens before they got there."
  draw(t, d, P, E, s) { const to = E('sirens', 1, d * .6); nightStreet(t); const k = prog(t, 0, d); policeCar(lerp(-300, 560, eout(k)), 1150, 1.3, t < to - .2 ? 1 : 0, t);
    if (t > to - .2) { xMark(560, 860, 70, prog(t, to - .2, to + .1)); bigTitleFit('SIRENS OFF', 300, prog(t, to - .2, to), { size: 120, col: '#fff' }); } else bigTitleFit('POLICE SENT', 300, prog(t, 0, .2), { size: 110, col: '#7fc8ff' }); },
  sfx(d, P, E) { return [[0, 'siren', .25, { dur: E('sirens', 1, d * .6) - .2 }], [E('sirens', 1, d * .6) - .2, 'click', .4], [.3, 'city', .2, { dur: d }]]; }
};
SC.arrest = { // "Officers arrested a man for domestic violence."
  draw(t, d) { nightStreet(t); policeCar(560, 1150, 1.3, 1, t); for (let i = 0; i < 2; i++) person(240 + i * 600, 1300, 720, { top: '#1b2540', pants: '#1b2540', cap: '#1b2540', uniform: 'guard', light: 1, shadow: true }); grade('rgba(20,10,30,1)', .2); bigTitleFit('ARRESTED', 300, prog(t, 0, .2), { size: 130, col: '#fff' }); },
  sfx(d) { return [[0, 'cuffs', .45], [0, 'city', .2, { dur: d }]]; }
};
SC.nocode = { // "«Pizza» isn't an official 911 code. He just listened."
  draw(t, d, P, E, s) { const t2 = s.U(s.a + 1);
    if (t < t2 - .05) { bg('#1a1612', '#080604'); pizzaBox(540, 860, .9, -.05); ctx.fillStyle = 'rgba(0,0,0,.78)'; rr(160, 1180, 760, 150, 40); ctx.fill(); label('NOT A 911 CODE', 540, 1280, 64, { weight: 900, color: '#ff6b6b' }); xMark(820, 620, 80, prog(t, .3, .6)); bigTitleFit('"PIZZA"', 300, prog(t, 0, .2), { size: 130, col: '#ffd23f' }); return; }
    ctx.save(); cam(540, headOf([540, 2420, 1800])[1] + 60, 2.4); dispatcherShot(t, s, { smile: .4 }); ctx.restore(); bigTitleFit('HE JUST LISTENED', 300, prog(t, t2 - .05, t2 + .2), { size: 100, col: '#7dff9e' }); },
  sfx(d, P, E, s) { return [[.3, 'soft_x', .4], [s.U(s.a + 1), 'pad_swell', .3, { dur: d - s.U(s.a + 1) }]]; }
};
SC.text = { // "And if you ever can't talk, in many places you can text 911 instead."
  draw(t, d) { kitchenNight(t); grade('rgba(10,14,30,1)', .4); ctx.save(); cam(540, 980, 1.04); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => smsScreen(w, h, t, prog(t, .3, d - .3)), { sleeve: '#6a7a8a', skin: '#ecc2a8' }); ctx.restore(); bigTitleFit('TEXT 911', 300, prog(t, 0, .2), { size: 130, col: '#7fc8ff' }); label('where available', 540, 420, 44, { weight: 800, color: '#fff', alpha: prog(t, .3, .6) }); },
  sfx(d) { return [[.4, 'notif', .4], [1.2, 'notif', .35], [2.1, 'notif', .35]]; }
};
SC.final = { // "Because sometimes «I'd like a pizza» means «Help me.»" → back to frame 0
  draw(t, d, P, E) { const th = E('help', 1, d - .8); kitchenNight(t); grade('rgba(10,14,25,1)', .3); ctx.save(); const k = eout(prog(t, 0, .5)); pizzaBox(540, 820, lerp(1.1, 1.25, k), -.08); ctx.restore();
    bigTitleFit(t < th - .1 ? '"I\'D LIKE A PIZZA"' : '"HELP ME"', 300, t < th - .1 ? prog(t, 0, .2) : prog(t, th - .1, th + .1), { size: 110, col: t < th - .1 ? '#fff' : '#ff4d57', glow: t < th - .1 ? null : 'rgba(255,40,50,.6)' }); },
  sfx(d, P, E) { return [[0, 'pad_swell', .25, { dur: d }], [E('help', 1, d - .8) - .1, 'boom', .4]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .3) drawSubs(t); };
