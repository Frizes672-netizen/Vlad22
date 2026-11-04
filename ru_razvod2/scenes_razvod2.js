// ===== RU Short: "РАЗВОД ИЛИ НЕТ? — Выпуск 2: голосовое от «сына»" (helpers from episode 1 are loaded before this file) =====
const NINA = (o = {}) => GAL(Object.assign({ hair: '#8a4632', brow: '#6a4636', glasses: false, top: '#2f5d62', blouse: '#f1ece2', eyes: '#6b5a48', skin: '#ebc1a8' }, o));
const DIMA = (o = {}) => Object.assign({ top: '#3b4a5c', pants: '#2a2f3a', hair: '#3a2618', light: 1, skin: '#e8bb9e', eyes: '#5b6b62', shoe: '#e8e6ea' }, o);
const NCU = [560, 3120, 2500], NMS = [540, 2330, 1600];
const WAVE = (() => { const R = rnd(12), a = []; for (let i = 0; i < 44; i++) a.push(.25 + .75 * Math.abs(Math.sin(i * .55) * .6 + (R() - .5) * .8)); return a; })();
function dawn(t, a = 1) { grade('rgba(40,60,120,1)', .5 * a); ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(900, 520, 700, `rgba(255,170,90,${.22 * a})`); ctx.restore(); } // 6 a.m.: blue window light + the warm kitchen lamp

// ---------- messenger ----------
function waveBars(x, y, w, h, p, col, rest, t, n = 44) { const bw = w / n; for (let i = 0; i < n; i++) { const on = i / n < p, a = WAVE[i % WAVE.length] * (on && i / n > p - .08 ? .85 + .15 * Math.sin(t * 20 + i) : 1);
  ctx.fillStyle = on ? col : rest; rr(x + i * bw + bw * .2, y - h * a / 2, bw * .6, h * a, bw * .3); ctx.fill(); } }
function voiceBubble(x, y, w, t, p, o = {}) { const h = 150; ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; rr(-w / 2 + 4, -h / 2 + 6, w, h, 40); ctx.fill(); ctx.fillStyle = '#ffffff'; rr(-w / 2, -h / 2, w, h, 40); ctx.fill();
  ctx.fillStyle = '#3aa76d'; ctx.beginPath(); ctx.arc(-w / 2 + 80, 0, 48, 0, 7); ctx.fill(); ctx.fillStyle = '#fff';
  if (p > 0 && p < 1) { rr(-w / 2 + 64, -20, 12, 40, 4); ctx.fill(); rr(-w / 2 + 84, -20, 12, 40, 4); ctx.fill(); } else { ctx.beginPath(); ctx.moveTo(-w / 2 + 68, -24); ctx.lineTo(-w / 2 + 100, 0); ctx.lineTo(-w / 2 + 68, 24); ctx.closePath(); ctx.fill(); }
  waveBars(-w / 2 + 150, -8, w - 260, 70, p, '#3aa76d', '#b9d8c6', t); label(o.dur || '0:12', -w / 2 + 150, 52, 26, { align: 'left', weight: 700, color: '#7a8494' }); label(o.time || '06:02', w / 2 - 30, 52, 24, { align: 'right', weight: 600, color: '#9aa3b0' }); ctx.restore(); }
function textBubble(x, y, w, lines, p, o = {}) { if (p <= 0) return; const lh = 44, h = 50 + lines.length * lh; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; rr(-w / 2 + 4, 6, w, h, 34); ctx.fill(); ctx.fillStyle = o.col || '#ffffff'; rr(-w / 2, 0, w, h, 34); ctx.fill();
  lines.forEach((s, i) => label(s, -w / 2 + 34, 58 + i * lh, 34, { align: 'left', weight: o.bold && i === lines.length - 1 ? 900 : 700, color: o.hi && i === lines.length - 1 ? '#c0392b' : '#1b1f27' })); ctx.restore(); }
function chatScreen(w, h, t, o = {}) { ctx.fillStyle = '#dfe8d6'; ctx.fillRect(-w / 2, -h / 2, w, h); const R = rnd(3); ctx.strokeStyle = 'rgba(80,110,70,.12)'; ctx.lineWidth = 4; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-w / 2 + R() * w, -h / 2 + R() * h, 10 + R() * 18, 0, 4); ctx.stroke(); } // doodle wallpaper
  ctx.fillStyle = '#f8f8f8'; ctx.fillRect(-w / 2, -h / 2, w, 200); statusBar(w, h, '#111'); ctx.strokeStyle = '#2f7de1'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-w / 2 + 52, -h / 2 + 118); ctx.lineTo(-w / 2 + 34, -h / 2 + 138); ctx.lineTo(-w / 2 + 52, -h / 2 + 158); ctx.stroke();
  ctx.fillStyle = o.avatarCol || '#9aa3b0'; ctx.beginPath(); ctx.arc(-w / 2 + 110, -h / 2 + 138, 38, 0, 7); ctx.fill(); label(o.avatar || '?', -w / 2 + 110, -h / 2 + 152, 40, { weight: 900 });
  label(o.name || '+7 9•• •••-••-48', -w / 2 + 166, -h / 2 + 132, 32, { align: 'left', weight: 800, color: '#111' }); label(o.sub || 'не в контактах', -w / 2 + 166, -h / 2 + 170, 24, { align: 'left', weight: 600, color: o.typing ? '#2f7de1' : '#8a94a4' });
  if (o.warn) { ctx.fillStyle = 'rgba(255,240,200,.95)'; rr(-w / 2 + 24, -h / 2 + 216, w - 48, 64, 18); ctx.fill(); label('Номер не из ваших контактов', 0, -h / 2 + 258, 24, { weight: 700, color: '#8a6420' }); }
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2 + 200, w, h - 200); ctx.clip(); (o.items || []).forEach(it => { if (it.type === 'voice') voiceBubble(-w / 2 + 20 + (w - 80) / 2, it.y, w - 80, t, it.p, it); else textBubble(-w / 2 + 20 + it.w / 2, it.y, it.w, it.lines, it.p ?? 1, it); }); ctx.restore();
  ctx.fillStyle = '#f8f8f8'; ctx.fillRect(-w / 2, h / 2 - 110, w, 110); ctx.fillStyle = '#ffffff'; rr(-w / 2 + 24, h / 2 - 92, w - 140, 70, 35); ctx.fill(); label('Сообщение', -w / 2 + 60, h / 2 - 47, 28, { align: 'left', weight: 600, color: '#a8b0bc' }); ctx.fillStyle = '#3aa76d'; ctx.beginPath(); ctx.arc(w / 2 - 60, h / 2 - 57, 36, 0, 7); ctx.fill(); }
function voiceChat(t, p, o = {}) { return (w, h) => chatScreen(w, h, t, Object.assign({ warn: true, items: [{ type: 'voice', y: -h / 2 + 400, p, dur: '0:12' }].concat(o.more || []) }, o)); }

// ---------- places & props ----------
function crashScene(t) { bg('#05070d', '#0d121c'); const ph = Math.floor(t * 5) % 2; glow(200, 900, 900, `rgba(40,110,255,${ph ? .5 : .15})`); glow(880, 900, 900, `rgba(255,40,50,${ph ? .15 : .5})`);
  ctx.fillStyle = '#1a1d24'; ctx.fillRect(0, 1150, W, H); ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let x = -100; x < W; x += 260) ctx.fillRect(x, 1300, 140, 16); // wet road + markings
  ctx.save(); ctx.translate(560, 1120); ctx.rotate(-.06); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.beginPath(); ctx.ellipse(0, 40, 460, 40, 0, 0, 7); ctx.fill(); // crashed car, side view, crumpled nose on the left
  ctx.fillStyle = grad(0, -260, 0, 30, [[0, '#9aa6b5'], [.5, '#5c6878'], [1, '#2b323c']]); ctx.beginPath(); ctx.moveTo(-430, 0); ctx.lineTo(-450, -80); ctx.lineTo(-380, -120); ctx.lineTo(-330, -95); ctx.lineTo(-300, -150); ctx.lineTo(-180, -170); ctx.lineTo(-90, -290); ctx.lineTo(180, -290); ctx.lineTo(290, -170); ctx.lineTo(430, -150); ctx.lineTo(450, -40); ctx.lineTo(440, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(150,190,230,.45)'; ctx.beginPath(); ctx.moveTo(-160, -170); ctx.lineTo(-80, -270); ctx.lineTo(40, -270); ctx.lineTo(40, -170); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(70, -170); ctx.lineTo(70, -270); ctx.lineTo(170, -270); ctx.lineTo(260, -170); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(-60, -230); ctx.lineTo(-60 + Math.cos(k) * 80, -230 + Math.sin(k) * 50); ctx.stroke(); } // shattered windscreen
  ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-430, -60); ctx.lineTo(-360, -40); ctx.lineTo(-400, -10); ctx.lineTo(-330, 0); ctx.stroke(); // crumple folds
  for (const wx of [-250, 280]) { ctx.fillStyle = '#0c0d10'; ctx.beginPath(); ctx.arc(wx, 0, 80, 0, 7); ctx.fill(); ctx.fillStyle = '#5a606a'; ctx.beginPath(); ctx.arc(wx, 0, 38, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#ffb24a'; ctx.beginPath(); ctx.arc(430, -110, 18, 0, 7); ctx.fill(); glow(430, -110, 120, `rgba(255,170,60,${Math.floor(t * 2) % 2 ? .6 : .1})`); ctx.restore(); // hazard light
  for (let i = 0; i < 6; i++) { const k = (t * .4 + i / 6) % 1; ctx.fillStyle = `rgba(220,225,235,${.22 * (1 - k)})`; ctx.beginPath(); ctx.arc(150 - k * 80 + Math.sin(i) * 30, 1020 - k * 380, 60 + k * 90, 0, 7); ctx.fill(); } } // steam from the bonnet
function brokenPhone(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(-110, -200, 240, 420, 34); ctx.fill(); ctx.fillStyle = '#16171b'; rr(-120, -210, 240, 420, 34); ctx.fill(); ctx.fillStyle = '#0b0f18'; rr(-108, -198, 216, 396, 26); ctx.fill();
  ctx.strokeStyle = 'rgba(230,240,255,.75)'; ctx.lineWidth = 3; const R = rnd(6); for (let k = 0; k < 11; k++) { ctx.beginPath(); ctx.moveTo(30, -60); let px = 30, py = -60; const a = k * .57 + R() * .3; for (let q = 0; q < 4; q++) { px += Math.cos(a + (R() - .5)) * 45; py += Math.sin(a + (R() - .5)) * 45; ctx.lineTo(px, py); } ctx.stroke(); } ctx.restore(); }
function rubNote(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-150 + 6, -70 + 8, 300, 140);
  ctx.fillStyle = grad(-150, 0, 150, 0, [[0, '#d8704a'], [.5, '#f1a37a'], [1, '#c85f3c']]); ctx.fillRect(-150, -70, 300, 140); ctx.strokeStyle = 'rgba(120,40,20,.45)'; ctx.lineWidth = 3; ctx.strokeRect(-140, -60, 280, 120);
  ctx.fillStyle = 'rgba(255,235,220,.55)'; ctx.beginPath(); ctx.ellipse(-80, 0, 40, 48, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(120,40,20,.3)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-20, -40 + i * 14); ctx.quadraticCurveTo(50, -50 + i * 14, 130, -40 + i * 14); ctx.stroke(); }
  label('5000', 100, -32, 30, { weight: 900, color: '#7a2a14' }); label('5000', -100, 54, 22, { weight: 900, color: '#7a2a14' }); ctx.restore(); }
function moneyBox(x, y, s, t, take = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(10, 190, 380, 50, 0, 0, 7); ctx.fill(); // carved wooden box, lid open
  ctx.fillStyle = grad(0, -420, 0, -120, [[0, '#7a4a22'], [1, '#5a3418']]); ctx.beginPath(); ctx.moveTo(-330, -120); ctx.lineTo(-300, -420); ctx.lineTo(300, -420); ctx.lineTo(330, -120); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#c9a33a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, -270, 150, 80, 0, 0, 7); ctx.stroke(); // lid with a gold oval
  ctx.fillStyle = '#8a1c2a'; ctx.beginPath(); ctx.moveTo(-290, -140); ctx.lineTo(-270, -390); ctx.lineTo(270, -390); ctx.lineTo(290, -140); ctx.closePath(); ctx.fill(); // velvet lining
  ctx.fillStyle = grad(0, -120, 0, 190, [[0, '#8a5a2c'], [1, '#4a2a12']]); rr(-340, -130, 680, 320, 20); ctx.fill(); ctx.fillStyle = '#6b1422'; rr(-300, -110, 600, 90, 10); ctx.fill();
  for (let i = 0; i < 5; i++) { if (i === 2 && take > 0) continue; rubNote(-200 + i * 100, -80, .6, -.3 + i * .12); } ctx.strokeStyle = '#c9a33a'; ctx.lineWidth = 5; rr(-320, -10, 640, 180, 14); ctx.stroke();
  for (let k = 0; k < 7; k++) { ctx.fillStyle = 'rgba(255,220,150,.18)'; ctx.beginPath(); ctx.arc(-280 + k * 93, 80, 22, 0, 7); ctx.fill(); } // carved rosettes
  ctx.restore(); }
function moneyHand(x, y, s, rot, o = {}) { const sk = o.skin || '#ebc1a8'; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); // her hand holding a roll of 5000s, back of the hand to us
  sleeveCuff(0, 330, 300, o.sleeve || '#2f5d62'); for (let i = 0; i < 6; i++) rubNote(-10 + i * 4, -60 + i * 6, .9, -.1 + i * .03);
  const bh = new Path2D(); bh.moveTo(-120, 340); bh.bezierCurveTo(-150, 200, -150, 80, -120, 0); bh.lineTo(130, -10); bh.bezierCurveTo(160, 80, 150, 220, 120, 340); bh.closePath();
  ctx.fillStyle = grad(-150, 0, 150, 0, [[0, shade(sk, .78)], [.45, shade(sk, 1.03)], [1, shade(sk, .78)]]); ctx.fill(bh);
  ctx.save(); ctx.clip(bh); ctx.strokeStyle = 'rgba(255,232,215,.35)'; ctx.lineWidth = 7; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 25, 320); ctx.quadraticCurveTo(-60 + i * 40, 150, -90 + i * 60, 10); ctx.stroke(); } ctx.strokeStyle = 'rgba(110,140,190,.25)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(60, 330); ctx.bezierCurveTo(70, 220, 20, 160, 40, 60); ctx.stroke();
  for (const [ax, ay, ar] of [[-30, 180, 12], [50, 120, 9], [-70, 90, 8]]) softBlob(ax, ay, ar, ar * .8, '150,90,60', .4); ctx.restore();
  [[-95, 44], [-32, 48], [32, 47], [92, 40]].forEach(([fx, fw], i) => { const p = fingerPath(fx, 0, fx - 8, -120, fw, fw * .9); fillFinger(p, fx, 0, fx - 8, -120, fw, sk, -1, .05); ctx.fillStyle = 'rgba(255,235,220,.45)'; ctx.beginPath(); ctx.ellipse(fx, -4, fw * .32, fw * .22, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(110,50,35,.35)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(fx - 4, -64 + k * 7, fw * .28, .3, Math.PI - .3); ctx.stroke(); } nailAt(fx - 8, -104, Math.PI, fw * .56, fw * .5); if (i === 2) { ctx.fillStyle = '#c99a3a'; ctx.fillRect(fx - fw / 2, -30, fw, 14); } });
  ctx.restore(); }
function peephole(t) { bg('#000', '#000'); ctx.save(); ctx.beginPath(); ctx.arc(540, 900, 470, 0, 7); ctx.clip(); ctx.translate(540, 900); ctx.scale(1.25, 1.25); ctx.translate(-540, -900); // fisheye stairwell, a "courier" waiting
  bg('#6d6a55', '#3e3c30'); ctx.fillStyle = '#4c5a46'; ctx.fillRect(0, 300, W, 600); ctx.fillStyle = '#8a8670'; ctx.fillRect(0, 900, W, 400); ctx.fillStyle = '#2a2a24'; ctx.fillRect(0, 1300, W, 600); glow(540, 380, 500, 'rgba(255,230,160,.4)');
  person(560, 1700, 1250, { top: '#1f2a1f', pants: '#1b1e22', hair: '#111', cap: '#111', light: 1, skin: '#d8a88c' }); ctx.fillStyle = '#c9a26a'; rr(380, 1100, 160, 120, 8); ctx.fill(); ctx.restore();
  ctx.fillStyle = rgrad(540, 900, 250, 480, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.95)']]); ctx.fillRect(0, 0, W, H); }
function dimaBedroom(t, o = {}) { bg('#0c1428', '#05070f'); ctx.fillStyle = '#1a2645'; ctx.fillRect(640, 160, 360, 520); ctx.fillStyle = 'rgba(190,210,255,.2)'; ctx.fillRect(660, 180, 320, 480); glow(820, 420, 600, 'rgba(150,180,255,.18)'); // window, early light
  ctx.fillStyle = '#e5e8f0'; rr(80, 860, 520, 220, 80); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.18)'; rr(100, 1020, 480, 40, 20); ctx.fill(); // pillow
  ctx.save(); ctx.translate(1720, 1000); ctx.rotate(-Math.PI / 2 + .05); person(0, 0, 1480, DIMA({ closed: o.awake ? 0 : 1, shadow: false })); ctx.restore(); // lying on his back, seen from above
  ctx.fillStyle = grad(0, 1000, 0, 1500, [[0, '#4a6a9a'], [1, '#2a3e60']]); ctx.beginPath(); ctx.moveTo(300, 1240); ctx.bezierCurveTo(450, 1080, 800, 1060, 1100, 1090); ctx.lineTo(1100, 1700); ctx.lineTo(240, 1700); ctx.closePath(); ctx.fill(); // blanket
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(340 + i * 160, 1260 + i * 10); ctx.quadraticCurveTo(500 + i * 160, 1350, 420 + i * 180, 1650); ctx.stroke(); }
  ctx.fillStyle = '#3a2a1e'; ctx.fillRect(-20, 1500, 380, 420); ctx.fillStyle = '#4a3626'; ctx.fillRect(-20, 1490, 390, 20); grade('rgba(30,45,90,1)', .35); }
function cloneUI(w, h, t, o = {}) { ctx.fillStyle = '#0f1117'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = '#5b2bd6'; ctx.fillRect(-w / 2, -h / 2, w, 50); label('Клонирование голоса', -w / 2 + 20, -h / 2 + 34, 24, { align: 'left', weight: 900, color: '#fff' });
  ctx.fillStyle = '#1b1e28'; rr(-w / 2 + 30, -h / 2 + 80, 230, 400, 14); ctx.fill(); ctx.save(); rr(-w / 2 + 40, -h / 2 + 90, 210, 330, 10); ctx.clip(); ctx.fillStyle = '#2e4a6a'; ctx.fillRect(-w / 2 + 40, -h / 2 + 90, 210, 330); ctx.translate(-w / 2 + 145, -h / 2 + 470); person(0, 0, 420, DIMA({ smile: .6, shadow: false })); ctx.restore(); // his own public video
  label('dima_video.mp4', -w / 2 + 145, -h / 2 + 452, 18, { weight: 700, color: '#aab' }); ctx.fillStyle = 'rgba(255,60,70,.9)'; rr(-w / 2 + 40, -h / 2 + 90, 90, 32, 8); ctx.fill(); label('0:0' + Math.min(7, 1 + Math.floor((o.sample || 1) * 6)), -w / 2 + 85, -h / 2 + 114, 20, { weight: 900, font: MONO });
  label('Образец голоса', -w / 2 + 300, -h / 2 + 110, 22, { align: 'left', weight: 700, color: '#8a90a6' }); waveBars(-w / 2 + 300, -h / 2 + 170, 560, 70, 1, '#9b7bff', '#333', t, 40);
  label('Обучение модели', -w / 2 + 300, -h / 2 + 250, 22, { align: 'left', weight: 700, color: '#8a90a6' }); ctx.fillStyle = '#262a36'; rr(-w / 2 + 300, -h / 2 + 270, 560, 30, 15); ctx.fill(); ctx.fillStyle = '#34c759'; rr(-w / 2 + 300, -h / 2 + 270, 560 * clamp(o.train || 0), 30, 15); ctx.fill(); label(Math.round(100 * clamp(o.train || 0)) + '%', w / 2 - 30, -h / 2 + 294, 24, { align: 'right', weight: 900, color: '#fff', font: MONO });
  ctx.fillStyle = '#1b1e28'; rr(-w / 2 + 300, -h / 2 + 330, 560, 120, 12); ctx.fill(); const s = '«Мамуль, это я, Дима…»'; label(s.slice(0, Math.floor(s.length * clamp(o.type || 0))), -w / 2 + 320, -h / 2 + 400, 30, { align: 'left', weight: 800, color: '#fff' });
  ctx.fillStyle = o.type >= 1 ? '#34c759' : '#5b2bd6'; rr(-w / 2 + 300, h / 2 - 90, 560, 66, 33); ctx.fill(); label(o.type >= 1 ? '▶ ГОТОВО' : 'ОЗВУЧИТЬ', -w / 2 + 580, h / 2 - 46, 28, { weight: 900, spacing: 3 }); }
const _dbUI0 = dbUI; dbUI = function (w, h, t, o = {}) { if (o.mode === 'clone') return cloneUI(w, h, t, o); return _dbUI0(w, h, t, o); };
function notepad(t, p1, p2) { bg('#6b4a32', '#3a2616'); ctx.drawImage(layer('kitchen', kitchenBgDraw, 5), 0, 0); grade('rgba(0,0,0,1)', .35, 'source-over');
  ctx.save(); ctx.translate(540, 940); ctx.rotate(-.04); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-330, -400, 680, 860); ctx.fillStyle = '#fbf8ee'; ctx.fillRect(-340, -420, 680, 860); ctx.strokeStyle = 'rgba(80,120,200,.3)'; ctx.lineWidth = 3; for (let y = -320; y < 420; y += 70) { ctx.beginPath(); ctx.moveTo(-340, y); ctx.lineTo(340, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(200,60,60,.4)'; ctx.beginPath(); ctx.moveTo(-250, -420); ctx.lineTo(-250, 440); ctx.stroke(); for (let i = 0; i < 9; i++) { ctx.fillStyle = '#9aa0a8'; ctx.beginPath(); ctx.arc(-300 + i * 75, -420, 14, 0, 7); ctx.fill(); }
  handWrite('Секретное слово', 30, -230, 76, p1, '#1d2a5c'); handWrite('для семьи:', -20, -130, 70, p1 * 1.3 - .3, '#1d2a5c'); handWrite('«СИРЕНЬ»', 20, 60, 130, p2, '#c0392b', { rot: -.04 });
  if (p2 > .9) { ctx.strokeStyle = 'rgba(192,57,43,.85)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(20, 20, 290 * clamp((p2 - .9) * 10), 110, -.04, 0, 7); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.translate(lerp(560, 760, clamp(p1 + p2)), 1180 - 200 * clamp(p2)); ctx.rotate(-.7); ctx.fillStyle = '#1f3b70'; rr(-20, -260, 40, 300, 12); ctx.fill(); ctx.fillStyle = '#c9a33a'; ctx.fillRect(-20, -260, 40, 30); ctx.fillStyle = '#ddd'; ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(14, 40); ctx.lineTo(0, 80); ctx.closePath(); ctx.fill(); ctx.restore(); } // pen

// ================== SCENES ==================
SC.hook = { // FRAME 0: POV — a voice message from an unknown number plays: it's HIS voice; then the money flies
  draw(t, d, P, E) { const tm = E('деньги', 1, 3.8), tz = E('голос', 1, .9);
    kitchen(t); ctx.save(); cam(540, 980, lerp(1.0, 1.16, eout(prog(t, 0, d)))); shake(t, t < .25 ? 10 * (1 - t / .25) : 0);
    holdPhoneHand(540, 1020, 1.02, -.05 + Math.sin(t * 2) * .01, voiceChat(t, prog(t, 0, d * 1.2)), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore();
    polaroid(800, 640, 300, .08, () => { bg('#7fb3e6', '#e9d7b0'); person(540, 2150, 1700, DIMA({ smile: .7, shadow: false })); }, 'Дима', { tint: 'rgba(255,240,220,.3)' });
    checkMark(920, 520, 56, prog(t, tz, tz + .4));
    if (t > tm - .25) { const R = rnd(4); for (let i = 0; i < 14; i++) { const k = eout(prog(t, tm - .25 + i * .03, tm + .9)); if (k <= 0) continue; rubNote(540 + (R() - .5) * 900 * k, 1300 - k * (300 + R() * 700), .6 + k * 1.2, R() * 6 + t * (R() - .5) * 3); } }
    bigTitle('ГОЛОС СЫНА', 300, prog(t, 0, .2), { size: 110, col: '#fff', glow: 'rgba(255,60,70,.55)' }); },
  sfx(d, P, E) { return [[0, 'notif', .5], [0, 'kitchen', .3, { dur: d }], [E('деньги', 1, 3.8) - .3, 'coins', .45], [E('деньги', 1, 3.8) - .3, 'whoosh', .35]]; }
};
SC.choice = {
  draw(t, d, P, E, s) { const tb = E('сын', 1, .3), tr = E('развод', 1, 1.2), ts = s.U(2);
    galinaKitchen(t, NMS, { phoneEar: true, fear: .35, table: 1450, ...NINA() }); vign(.6); grade('rgba(20,25,40,1)', .35);
    const pl = t > ts ? 1 + .07 * Math.max(0, Math.sin((t - ts) * 9)) : 1, pr = t > ts ? 1 + .07 * Math.max(0, -Math.sin((t - ts) * 9)) : 1;
    choiceBtn(290, 1180, 440, 'СЫН', GRN, prog(t, tb - .1, tb + .2), { pulse: pl }); choiceBtn(790, 1180, 440, 'РАЗВОД', SRED, prog(t, tr - .1, tr + .2), { pulse: pr });
    bigTitle('РАЗВОД ИЛИ НЕТ?', 300, prog(t, 0, .2), { size: 100, col: YEL }); label('ВЫПУСК 2', 540, 410, 40, { weight: 900, color: '#fff', spacing: 10, alpha: prog(t, .1, .4) }); },
  sfx(d, P, E) { return [[0, 'dundun', .4], [E('сын', 1, .3) - .1, 'pop', .35], [E('развод', 1, 1.2) - .1, 'pop', .35], [0, 'kitchen', .3, { dur: d }]]; }
};
SC.dawn = { // "В шесть утра Нине Сергеевне пришло голосовое. С незнакомого номера."
  draw(t, d, P, E, s) { const tn = s.U(4);
    if (t < tn - .05) { kitchen(t); dawn(t); ctx.save(); cam(540, 900, lerp(1.0, 1.1, prog(t, 0, tn))); wallClockBig(540, 860, 330, 0 + prog(t, 0, tn) * 2); ctx.restore(); bigTitle('6:00 УТРА', 300, prog(t, 0, .2), { size: 110, col: '#fff' }); return; }
    kitchen(t); dawn(t, .7); ctx.save(); cam(540, 980, lerp(1.0, 1.08, prog(t, tn, d))); shake(t, t - tn < .3 ? 6 : 0); holdPhoneHand(540, 1020, 1.02, -.05, voiceChat(t, 0), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore();
    bigTitle('НЕЗНАКОМЫЙ НОМЕР', 300, prog(t, tn - .05, tn + .2), { size: 84, col: YEL }); },
  sfx(d, P, E, s) { return [[0, 'clock', .45, { dur: s.U(4) }], [s.U(4) - .05, 'notif', .55], [0, 'drone', .2, { dur: d }]]; }
};
SC.voice1 = { // "— Мамуль, это я, Дима. Я попал в аварию, телефон разбился. Человек в больнице."
  draw(t, d, P, E, s) { const t6 = s.U(6), t7 = s.U(7), ta = E('аварию', 1, 2.6);
    if (t < t6 - .05) { kitchen(t); dawn(t, .6); ctx.save(); cam(540, 940, lerp(1.04, 1.12, prog(t, 0, t6))); holdPhoneHand(540, 1020, 1.02, -.05, voiceChat(t, prog(t, 0, d * 1.15)), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore();
      bigTitle('«МАМУЛЬ, ЭТО Я»', 300, prog(t, 0, .2), { size: 88, col: '#fff' }); return; }
    if (t < t7 - .05) { crashScene(t); brokenPhone(760, 1520, 1.1, .5); bigTitle('АВАРИЯ', 300, prog(t, ta - .1, ta + .15), { size: 120, col: '#ff4d57' }); return; }
    hospitalRoom(t); grade('rgba(30,40,70,1)', .3); ecg(t, 820, 1, '#ff4d57'); bigTitle('ЧЕЛОВЕК В БОЛЬНИЦЕ', 300, prog(t, t7, t7 + .2), { size: 76, col: '#fff' }); },
  sfx(d, P, E, s) { return [[s.U(6) - .1, 'shatter', .4], [s.U(6), 'siren', .22, { dur: s.U(7) - s.U(6) + .4 }], [s.U(7), 'heartbeat', .3, { dur: d - s.U(7) }]]; }
};
SC.voice2 = { // "— Мамуль, только не звони на мой номер и не говори папе. Сейчас тебе напишет мой адвокат."
  draw(t, d, P, E, s) { const t9 = s.U(9), tz = E('звони', 1, 1.4);
    if (t < t9 - .05) { kitchen(t); dawn(t, .6); ctx.save(); const hd = headOf(NCU); cam(hd[0], 900, lerp(1.08, 1.18, prog(t, 0, t9))); person(NCU[0], NCU[1], NCU[2], NINA({ phoneEar: true, fear: .7 })); ctx.restore();
      bigTitle('НЕ ЗВОНИ МНЕ', 300, prog(t, tz - .1, tz + .15), { size: 100, col: '#fff' }); if (t > E('папе', 1, 3) - .1) label('и не говори папе', 540, 420, 52, { weight: 900, color: YEL, alpha: prog(t, E('папе', 1, 3) - .1, E('папе', 1, 3) + .1) }); return; }
    kitchen(t); dawn(t, .6); ctx.save(); cam(540, 940, 1.08); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => chatScreen(w, h, t, { name: 'Адвокат Сергей В.', sub: 'печатает…', typing: true, avatar: 'А', avatarCol: '#1f3b70',
      items: [{ type: 'text', y: -h / 2 + 260, w: 300, lines: ['• • •'], p: prog(t, t9, t9 + .3) }] }), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore(); bigTitle('«АДВОКАТ»', 300, prog(t, t9, t9 + .2), { size: 110, col: YEL }); },
  sfx(d, P, E, s) { return [[0, 'heartbeat', .25, { dur: s.U(9) }], [s.U(9), 'typing', .3, { dur: d - s.U(9) }]]; }
};
SC.proof = { // "Голос — его. Интонация — его. Даже «мамуль» — так её зовёт только Дима."
  draw(t, d, P, E, s) { const t1 = s.U(11), t2 = s.U(12); bg('#10261e', '#06100c'); glow(540, 820, 900, 'rgba(80,220,140,.18)');
    if (t < t1 - .05) { ctx.fillStyle = 'rgba(255,255,255,.06)'; rr(90, 560, 900, 520, 30); ctx.fill(); label('ГОЛОСОВОЕ', 140, 640, 30, { align: 'left', weight: 900, color: '#9fe3b0', spacing: 3 }); waveBars(140, 720, 800, 120, 1, '#3aa76d', '#333', t);
      label('ДИМА · ВИДЕО С ДНЯ РОЖДЕНИЯ', 140, 860, 30, { align: 'left', weight: 900, color: '#9fe3b0', spacing: 3 }); waveBars(140, 950, 800, 120, prog(t, 0, t1 * .8), '#ffd23f', '#333', t); checkMark(540, 1220, 90, prog(t, .4, .8)); bigTitle('ГОЛОС ЕГО', 300, prog(t, 0, .2), { size: 110 }); return; }
    if (t < t2 - .05) { const q = t - t1; ctx.lineWidth = 10; ctx.lineCap = 'round'; for (const [col, off] of [['#3aa76d', 0], ['#ffd23f', 8]]) { ctx.strokeStyle = col; ctx.beginPath(); for (let x = 0; x <= 860 * clamp(q / .8); x += 10) { const y = 860 - 160 * Math.sin(x / 140) * Math.cos(x / 310) + off; x ? ctx.lineTo(120 + x, y) : ctx.moveTo(120 + x, y); } ctx.stroke(); }
      checkMark(540, 1220, 90, prog(q, .4, .8)); bigTitle('ИНТОНАЦИЯ ЕГО', 300, prog(q, 0, .2), { size: 96 }); return; }
    const q = t - t2; polaroid(540, 900, 520, -.04, () => { bg('#7fb3e6', '#e9d7b0'); person(380, 2250, 1650, NINA({ smile: .7, shadow: false })); person(720, 2300, 1900, DIMA({ smile: .8, shadow: false })); }, 'Мы с Димой ❤', { tint: 'rgba(255,240,220,.3)' });
    textBubble(300, 380, 420, ['Мамуль ❤'], prog(q, .1, .35), { col: '#dcf8c6' }); bigTitle('«МАМУЛЬ»', 300, prog(q, 0, .2), { size: 100, col: YEL }); },
  sfx(d, P, E, s) { return [[.4, 'pop', .35], [s.U(11) + .4, 'pop', .35], [s.U(12) + .1, 'shimmer', .35], [0, 'pad_swell', .25, { dur: d }]]; }
};
SC.lawyer = { // "Через минуту написал адвокат: двести тысяч — и дело закроют. Курьер приедет через час."
  draw(t, d, P, E, s) { const t14 = s.U(14), tm = E('двести', 1, 1.6);
    if (t < t14 - .05) { kitchen(t); dawn(t, .6); ctx.save(); cam(540, 900, lerp(1.06, 1.14, prog(t, 0, t14))); holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => chatScreen(w, h, t, { name: 'Адвокат Сергей В.', sub: 'в сети', avatar: 'А', avatarCol: '#1f3b70',
      items: [{ type: 'text', y: -h / 2 + 240, w: 420, lines: ['Нина Сергеевна, я', 'адвокат Дмитрия.'], p: prog(t, 0, .3) }, { type: 'text', y: -h / 2 + 420, w: 420, lines: ['200 000 ₽ —', 'и дело закроют.'], p: prog(t, tm - .1, tm + .2), bold: true, hi: true }] }), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore();
      if (t > tm - .1) bigTitle('200 000 ₽', 300, prog(t, tm - .1, tm + .15), { size: 130, col: '#ff4d57', glow: 'rgba(255,40,50,.5)' }); return; }
    peephole(t); bigTitle('КУРЬЕР ЧЕРЕЗ ЧАС', 300, prog(t, t14, t14 + .2), { size: 86, col: YEL }); },
  sfx(d, P, E, s) { return [[0, 'notif', .45], [E('двести', 1, 1.6) - .1, 'notif', .45], [s.U(14), 'steps', .3, { dur: 1.4 }], [s.U(14) + 1.2, 'door_chime', .35]]; }
};
SC.box = { // "И она уже доставала деньги из шкатулки."
  draw(t, d) { bg('#3a2616', '#1a1008'); ctx.drawImage(layer('kitchen', kitchenBgDraw, 5), 0, 0); dawn(t, .6); woodTable(1150, { c1: '#5a3b24', c2: '#24160d' });
    ctx.save(); cam(540, 1100, lerp(1.0, 1.12, prog(t, 0, d))); moneyBox(540, 1320, 1.0, t, prog(t, .5, .8)); const k = eio(prog(t, .5, d)); moneyHand(560 + k * 60, lerp(1280, 820, k), 1.05, .08, {}); ctx.restore();
    bigTitle('ВСЕ СБЕРЕЖЕНИЯ', 300, prog(t, 0, .2), { size: 92, col: '#fff' }); },
  sfx(d) { return [[0, 'creak', .35], [.6, 'paper', .4], [1.2, 'page', .3], [0, 'heartbeat', .3, { dur: d }]]; }
};
function clueFrames2(t, i) { if (i === 0) { kitchen(t); dawn(t, .6); ctx.save(); cam(540, 940, 1.08); holdPhoneHand(540, 1020, 1.02, -.05, voiceChat(t, (t * .2) % 1), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore(); }
  else if (i === 1) { kitchen(t); dawn(t, .6); ctx.save(); const hd = headOf(NCU); cam(hd[0], 900, 1.12); person(NCU[0], NCU[1], NCU[2], NINA({ phoneEar: true, fear: .6 })); ctx.restore(); }
  else { bg('#3a2616', '#1a1008'); woodTable(1150, { c1: '#5a3b24', c2: '#24160d' }); moneyBox(540, 1320, 1.0, t, 1); moneyHand(620, 820, 1.05, .08, {}); } }
SC.countdown = { // "Сын или развод? У тебя пять секунд." + 5 s of silence
  draw(t, d, P, E) { const ts = E('секунд', 1, 1.6) + .35;
    if (t < ts) { kitchen(t); grade('rgba(10,14,25,1)', .6, 'source-over'); phonePlain(540, 820, 330, -.03, voiceChat(t, .5)); choiceBtn(290, 1180, 440, 'СЫН', GRN, prog(t, 0, .25)); choiceBtn(790, 1180, 440, 'РАЗВОД', SRED, prog(t, .1, .35)); bigTitle('А ТЫ КАК ДУМАЕШЬ?', 300, prog(t, 0, .2), { size: 80, col: YEL }); return; }
    const e = t - ts, i = Math.min(2, Math.floor(e / 1.67)); clueFrames2(t, i); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, 0, W, 470); const left = Math.max(0, 5 - e), n = Math.max(1, Math.ceil(left));
    if (left > 0) { dayRing(540, 300, 105, left / 5, YEL); bigNum(String(n), 540, 300, 150, '#fff', { glow: 'rgba(255,210,80,.8)' }); }
    const ph = Math.sin(e * 6); choiceBtn(290, 1560, 420, 'СЫН', GRN, 1, { pulse: 1 + .05 * Math.max(0, ph) }); choiceBtn(790, 1560, 420, 'РАЗВОД', SRED, 1, { pulse: 1 + .05 * Math.max(0, -ph) }); },
  sfx(d, P, E) { const ts = E('секунд', 1, 1.6) + .35; return [0, 1, 2, 3, 4].map(k => [ts + k, 'tick', .55]).concat([[ts, 'heartbeat', .35, { dur: 5 }], [0, 'pop', .3]]); }
};
SC.verdict = {
  draw(t) { bg('#1a0608', '#050102'); glow(540, 900, 900, 'rgba(255,40,50,.3)'); ctx.save(); shake(t, t < .3 ? 14 * (1 - t / .3) : 0);
    polaroid(540, 820, 600, -.03, () => { ctx.save(); cam(540, 960, 1.6); phonePlain(540, 960, 520, 0, voiceChat(0, .6)); ctx.restore(); }, 'это не Дима', { tint: 'rgba(255,230,220,.4)' });
    stamp('РАЗВОД', 540, 820, prog(t, .05, .35), { color: SRED, size: 150, rot: -.18 }); ctx.restore(); },
  sfx() { return [[.05, 'stamp', .6], [.05, 'boom', .4]]; }
};
SC.asleep = { // "Дима спал дома. Его телефон был цел."
  draw(t, d, P, E, s) { const t20 = s.U(20);
    if (t < t20 - .05) { ctx.save(); cam(560, 1060, lerp(1.0, 1.08, prog(t, 0, t20))); dimaBedroom(t); ctx.restore(); bigTitle('ДИМА СПАЛ ДОМА', 300, prog(t, 0, .2), { size: 96, col: '#fff' }); label('Z z z', 520 + Math.sin(t * 2) * 10, 760 - (t * 40) % 80, 60, { weight: 900, color: 'rgba(220,230,255,.6)', font: HAND }); return; }
    bg('#120c08', '#050302'); woodTable(1200, { c1: '#4a3626', c2: '#1e140c' }); glow(540, 900, 600, 'rgba(120,160,255,.18)');
    phonePlain(540, 960, 380, .06, (w, h) => { ctx.fillStyle = grad(0, -h / 2, 0, h / 2, [[0, '#1d2b4a'], [1, '#0a1020']]); ctx.fillRect(-w / 2, -h / 2, w, h); label('06:04', 0, -h * .22, 130, { weight: 300, color: '#fff' }); label('вторник, 4 ноября', 0, -h * .14, 30, { weight: 700, color: 'rgba(255,255,255,.75)' });
      ctx.fillStyle = 'rgba(255,255,255,.14)'; rr(-w * .4, h * .25, w * .8, 70, 35); ctx.fill(); label('☾  Не беспокоить', 0, h * .25 + 46, 28, { weight: 800, color: '#cfd8ff' }); });
    checkMark(800, 560, 70, prog(t, t20 + .2, t20 + .6)); bigTitle('ТЕЛЕФОН ЦЕЛ', 300, prog(t, t20, t20 + .2), { size: 110, col: '#7dff9e' }); },
  sfx(d, P, E, s) { return [[0, 'snore', .25, { dur: s.U(20) }], [s.U(20), 'whoosh', .3], [s.U(20) + .2, 'chime', .35]]; }
};
SC.ai = { // "Голос сделали нейросетью — из его же видео в соцсетях. Хватает нескольких секунд записи."
  draw(t, d, P, E, s) { const t22 = s.U(22), tv = E('видео', 1, 2.4); bg('#0a0c10', '#030405'); ctx.save(); cam(540, 980, .98);
    laptop(540, 1250, 980, t, { mode: 'clone', sample: prog(t, 0, tv), train: prog(t, .4, t22), type: prog(t, t22, d - .3) }); ctx.restore(); vign(.5);
    bigTitle(t < t22 - .05 ? 'НЕЙРОСЕТЬ' : 'НЕСКОЛЬКО СЕКУНД', 300, t < t22 - .05 ? prog(t, 0, .2) : prog(t, t22 - .05, t22 + .2), { size: t < t22 - .05 ? 120 : 92, col: YEL }); },
  sfx(d, P, E, s) { return [[0, 'data', .3, { dur: d }], [s.U(22), 'typing', .35, { dur: d - s.U(22) - .3 }], [d - .35, 'chime', .3]]; }
};
SC.clue = { // "Он прокололся на одной фразе: не звони на мой номер."
  draw(t, d, P, E) { const tq = E('звони', 1, 1.8) - .25;
    if (t < tq - .1) { kitchen(t); dawn(t, .6); ctx.save(); cam(540, 940, 1.1); holdPhoneHand(540, 1020, 1.02, -.05, voiceChat(t, .55), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore(); grade('hsl(0,0%,50%)', .85, 'saturation');
      label('◀◀ ПОВТОР', 60, 120, 44, { align: 'left', weight: 900, color: '#fff', font: MONO }); bigTitle('ОДНА ФРАЗА', 330, prog(t, 0, .2), { size: 110, col: YEL }); return; }
    bg('#120608', '#050203'); glow(540, 820, 900, 'rgba(255,60,70,.25)'); label('“', 160, 640, 260, { weight: 900, color: 'rgba(255,255,255,.18)' });
    quoteLine('НЕ ЗВОНИ', 540, 820, 120, prog(t, tq - .1, tq + .15), prog(t, tq + .3, tq + .8)); quoteLine('НА МОЙ НОМЕР', 540, 990, 110, prog(t, tq + .2, tq + .45), prog(t, tq + .6, tq + 1.1));
    bigTitle('ГЛАВНЫЙ ПРИЗНАК', 330, prog(t, tq - .1, tq + .2), { size: 90, col: '#ff6b74' }); },
  sfx(d, P, E) { const tq = E('звони', 1, 1.8) - .25; return [[0, 'scratch', .35], [tq - .1, 'whoosh', .3], [tq + .3, 'marker', .4], [tq + .6, 'marker', .4]]; }
};
SC.realson = { // "Настоящий сын никогда не запретит вам перезвонить." — his phone rings, "Мама"
  draw(t, d, P, E) { ctx.save(); cam(560, 1100, lerp(1.0, 1.06, prog(t, 0, d))); dimaBedroom(t, { awake: t > d * .6 }); ctx.restore();
    phonePlain(170, 1380, 250, -.1 + Math.sin(t * 40) * (Math.sin(t * 6) > 0 ? .02 : 0), (w, h) => callScreen(w, h, t, { name: 'Мама ❤', num: 'мобильный', avatar: '#e86a92', c1: '#3a2050', c2: '#150a20' }));
    bigTitle('ПЕРЕЗВОНИТЕ', 300, prog(t, 0, .2), { size: 110, col: '#7dff9e' }); },
  sfx(d) { return [[0, 'ring', .4], [1.3, 'ring', .4], [2.6, 'ring', .35]]; }
};
SC.hangup = { // "Положите трубку и наберите его сами."
  draw(t, d, P, E) { const tn = E('наберите', 1, 1.2);
    kitchen(t); ctx.save(); cam(540, 960, 1.06);
    if (t < tn - .05) holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { state: 'ended', name: '+7 9•• •••-••-48', num: 'не в контактах', avatar: '#9aa3b0', timer: 'заблокирован', c1: '#3a1a1e', c2: '#140a0c' }), { sleeve: '#2f5d62', skin: '#ebc1a8' });
    else holdPhoneHand(540, 1020, 1.02, -.05, (w, h) => callScreen(w, h, t, { state: 'active', top: 'вызов…', name: 'Дима — сын', num: 'мобильный', avatar: '#2f7de1', c1: '#163a2a', c2: '#07140e' }), { sleeve: '#2f5d62', skin: '#ebc1a8' });
    ctx.restore(); bigTitle(t < tn - .05 ? 'ПОЛОЖИТЕ ТРУБКУ' : 'НАБЕРИТЕ САМИ', 300, t < tn - .05 ? prog(t, 0, .2) : prog(t, tn - .05, tn + .2), { size: 92, col: t < tn - .05 ? '#ff6b74' : '#7dff9e' }); },
  sfx(d, P, E) { return [[0, 'busy', .45], [E('наберите', 1, 1.2), 'beeps', .35]]; }
};
SC.codeword = { // "А лучше — придумайте с семьёй секретное слово. Прямо сегодня."
  draw(t, d, P, E, s) { const tw = E('секретное', 1, 1.6), t27 = s.U(27); notepad(t, prog(t, .1, tw), prog(t, tw, Math.min(d - .2, t27 + .2)));
    bigTitle(t < t27 - .05 ? 'СЕКРЕТНОЕ СЛОВО' : 'ПРЯМО СЕГОДНЯ', 300, t < t27 - .05 ? prog(t, 0, .2) : prog(t, t27 - .05, t27 + .2), { size: 90, col: YEL }); },
  sfx(d, P, E) { return [[.1, 'pen', .35], [E('секретное', 1, 1.6), 'pen', .4], [d - .6, 'marker', .35]]; }
};
SC.final = { // "Потому что если голос похож на сына — это ещё не значит, что это он." → loops into frame 0
  draw(t, d, P, E) { const te = E('это', 1, 2.4);
    if (t < te - .1) { kitchen(t); dawn(t, .6); ctx.save(); const hd = headOf(NCU); cam(hd[0], 900, lerp(1.04, 1.12, prog(t, 0, te))); person(NCU[0], NCU[1], NCU[2], NINA({ phoneEar: true, fear: .5 })); ctx.restore(); bigTitle('ГОЛОС ПОХОЖ?', 300, prog(t, 0, .2), { size: 100, col: '#fff' }); return; }
    kitchen(t); ctx.save(); cam(540, 980, lerp(1.06, 1.14, prog(t, te, d))); holdPhoneHand(540, 1020, 1.02, -.05, voiceChat(t, prog(t, te, d)), { sleeve: '#2f5d62', skin: '#ebc1a8' }); ctx.restore();
    polaroid(800, 640, 300, .08, () => { bg('#7fb3e6', '#e9d7b0'); person(540, 2150, 1700, DIMA({ smile: .7, shadow: false })); }, 'Дима', { tint: 'rgba(255,240,220,.3)' }); xMark(920, 520, 56, prog(t, te + .2, te + .6));
    bigTitle('ЭТО НЕ ОН', 300, prog(t, te - .1, te + .15), { size: 120, col: '#ff4d57', glow: 'rgba(255,40,50,.5)' }); },
  sfx(d, P, E) { return [[0, 'kitchen', .3, { dur: d }], [E('это', 1, 2.4) - .1, 'notif', .5], [E('это', 1, 2.4) + .2, 'soft_x', .35]]; }
};
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; if (t < TL.total - .3) drawSubs(t); };
