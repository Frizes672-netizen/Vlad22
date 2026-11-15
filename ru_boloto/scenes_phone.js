// ===== TikTok (1080×1920, RU): «30 дней без телефона» =====
const GUY = (o = {}) => Object.assign({ top: '#2f6f8f', pants: '#2a2f3a', hair: '#3a2618', shoe: '#eeeeee', light: 1 }, o);
const NEON2 = '#3fd0ff', HOT = '#ff3b5c', LIME = '#7dff6b', SUN = '#ffcf4a';
const NOTIFS = [['💬', 'Мама', 'Ты где???'], ['❤️', 'Лайки', '+128 к твоему видео'], ['🔥', 'Скидка 70%', 'Только сегодня!'], ['📩', 'Работа', 'Срочно перезвони'], ['🎮', 'Игра', 'Твоя энергия восстановлена'],
  ['👀', 'Бывшая', 'просмотрела твою историю'], ['📺', 'Видео', 'Новая серия уже вышла'], ['💸', 'Банк', 'Списание 299 ₽'], ['🗞', 'Новости', 'Ты не поверишь, что...'], ['👍', 'Группа', '99+ новых сообщений']];

// ---------- props ----------
function phoneFeed(x, y, w, t, o = {}) { const h = w * 2.05; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const sc = o.s || 1; ctx.scale(sc, sc);
  ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(-w / 2 + 16, -h / 2 + 24, w, h, w * .13); ctx.fill();
  ctx.fillStyle = '#0b0c10'; rr(-w / 2, -h / 2, w, h, w * .13); ctx.fill(); ctx.strokeStyle = '#3a3f4a'; ctx.lineWidth = 5; ctx.stroke();
  ctx.save(); rr(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, w * .1); ctx.clip();
  if (o.off) { ctx.fillStyle = '#05060a'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 4); ctx.lineTo(w / 2, -h / 2); ctx.fill(); }
  else { const sc0 = (t * (o.speed ?? 260)) % (h * .55); const cols = ['#ff5f6d', '#7b5cff', '#00c2ff', '#ffb02e', '#2fd27a', '#ff7ac6'];
    ctx.fillStyle = '#111318'; ctx.fillRect(-w / 2, -h / 2, w, h);
    for (let i = -1; i < 4; i++) { const py = -h / 2 + 60 + i * h * .55 - sc0 + h * .55; ctx.fillStyle = grad(-w / 2, py, w / 2, py + h * .5, [[0, cols[(i + 10) % 6]], [1, cols[(i + 13) % 6]]]); rr(-w / 2 + 24, py, w - 48, h * .5, 26); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(-w / 2 + 70, py + h * .5 - 50, 22, 0, 7); ctx.fill(); ctx.fillRect(-w / 2 + 104, py + h * .5 - 62, w * .4, 12); ctx.fillRect(-w / 2 + 104, py + h * .5 - 40, w * .25, 10);
      label('♥', w / 2 - 60, py + h * .25, w * .09, { color: '#fff', weight: 900 }); }
    glow(0, 0, w, 'rgba(120,170,255,.15)'); }
  ctx.restore();
  ctx.fillStyle = '#0b0c10'; rr(-w * .16, -h / 2 + 18, w * .32, 34, 17); ctx.fill(); // dynamic island
  ctx.restore(); }
function notifBubble(x, y, w, n, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(o.rot || 0); ctx.globalAlpha *= clamp(p * 2) * (o.a ?? 1);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; rr(-w / 2 + 8, -60 + 12, w, 120, 30); ctx.fill(); ctx.fillStyle = 'rgba(245,247,250,.96)'; rr(-w / 2, -60, w, 120, 30); ctx.fill();
  ctx.fillStyle = ['#ff5f6d', '#7b5cff', '#00c2ff', '#ffb02e', '#2fd27a'][n % 5]; rr(-w / 2 + 20, -40, 80, 80, 20); ctx.fill(); label(NOTIFS[n % NOTIFS.length][0], -w / 2 + 60, 16, 44, {});
  label(NOTIFS[n % NOTIFS.length][1], -w / 2 + 120, -6, 32, { align: 'left', color: '#111', weight: 900 }); label(NOTIFS[n % NOTIFS.length][2], -w / 2 + 120, 34, 28, { align: 'left', color: '#555', weight: 600 }); ctx.restore(); }
function bigTitle(s, y, p, o = {}) { if (p <= 0) return; const k = eback(clamp(p)); ctx.save(); ctx.translate(540, y); ctx.scale(k, k); ctx.rotate(o.rot || 0);
  ctx.font = `900 ${o.size || 120}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = (o.size || 120) * .16; ctx.strokeStyle = '#000'; ctx.strokeText(s, 0, 0);
  ctx.fillStyle = o.col || '#fff'; if (o.glow) { ctx.shadowColor = o.glow; ctx.shadowBlur = 40; } ctx.fillText(s, 0, 0); ctx.restore(); }
function shake(t, amt) { if (amt > 0) ctx.translate(Math.sin(t * 91) * amt, Math.cos(t * 77) * amt); }
function room(t, o = {}) { bg(o.c1 || '#3b3340', o.c2 || '#1a161d'); blurred(3, () => { ctx.fillStyle = grad(0, 260, 0, 900, [[0, '#ffd9a0'], [1, '#ff9e6b']]); ctx.fillRect(640, 260, 360, 560); ctx.strokeStyle = '#3b2f3a'; ctx.lineWidth = 18; ctx.strokeRect(640, 260, 360, 560);
    ctx.beginPath(); ctx.moveTo(820, 260); ctx.lineTo(820, 820); ctx.moveTo(640, 540); ctx.lineTo(1000, 540); ctx.stroke(); ctx.fillStyle = '#4a3c35'; ctx.fillRect(60, 360, 360, 360); ctx.fillStyle = '#6b5547'; for (let i = 0; i < 3; i++) ctx.fillRect(80, 470 + i * 110, 320, 12);
    const bc = ['#c0392b', '#2e86de', '#f1c40f', '#27ae60', '#8e44ad']; for (let i = 0; i < 9; i++) { ctx.fillStyle = bc[i % 5]; ctx.fillRect(90 + i * 34, 400, 26, 70); } }, 'room');
  glow(820, 540, 800, 'rgba(255,190,130,.3)'); floor(1300, '#3a2d26', '#151010'); }
function jeansPocket(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = grad(-500, 0, 500, 0, [[0, '#24375e'], [.5, '#33507f'], [1, '#22345a']]); ctx.fillRect(-600, -500, 1200, 1200);
  const R = rnd(5); ctx.globalAlpha = .12; for (let i = 0; i < 220; i++) { ctx.fillStyle = R() > .5 ? '#fff' : '#000'; ctx.fillRect(-600 + R() * 1200, -500 + R() * 1200, 2, 14); } ctx.globalAlpha = 1;
  ctx.strokeStyle = '#d9a441'; ctx.lineWidth = 6; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(-320, -300); ctx.quadraticCurveTo(-60, 40, 320, -40); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.moveTo(-320, -300); ctx.quadraticCurveTo(-60, 40, 320, -40); ctx.lineTo(320, -80); ctx.quadraticCurveTo(-60, 0, -320, -340); ctx.fill();
  ctx.fillStyle = '#9a7a3a'; ctx.beginPath(); ctx.arc(-260, -320, 14, 0, 7); ctx.arc(300, -60, 14, 0, 7); ctx.fill(); ctx.restore(); }
function bigHand(x, y, s, rot, skin = '#e7b89c', o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = shade(GUY().top, .9); rr(-120, 160, 240, 600, 60); ctx.fill(); ctx.fillStyle = shade(GUY().top, .7); rr(-130, 150, 260, 60, 30); ctx.fill(); // sleeve
  ctx.fillStyle = grad(-110, 0, 110, 0, [[0, shade(skin, .8)], [.5, skin], [1, shade(skin, .85)]]); rr(-105, -40, 210, 220, 70); ctx.fill();
  const curl = o.curl || 0; for (let i = 0; i < 4; i++) { const fx = -78 + i * 52, fl = (150 - Math.abs(i - 1.5) * 22) * (1 - curl * .55); ctx.fillStyle = shade(skin, .96 - i * .02); rr(fx - 22, -40 - fl, 44, fl + 30, 22); ctx.fill();
    ctx.strokeStyle = 'rgba(120,60,40,.3)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(fx - 14, -40 - fl * .45); ctx.lineTo(fx + 14, -40 - fl * .45); ctx.stroke(); ctx.fillStyle = 'rgba(255,230,220,.6)'; rr(fx - 13, -40 - fl + 4, 26, 26, 12); ctx.fill(); }
  ctx.fillStyle = shade(skin, .9); ctx.save(); ctx.translate(110, 60); ctx.rotate(-.7); rr(-24, -100, 48, 130, 24); ctx.fill(); ctx.restore(); ctx.restore(); }
function brain(x, y, s, t, fill) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = grad(-200, -150, 200, 150, [[0, '#ff9ec4'], [1, '#e86a9a']]);
  ctx.beginPath(); for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI, r = 170 + (i % 2) * 22; ctx.lineTo(Math.cos(a) * r * 1.2, Math.sin(a) * r * .9); } ctx.lineTo(220, 60); ctx.quadraticCurveTo(0, 170, -220, 60); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(150,40,80,.5)'; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (const [a, b, c, d] of [[-150, -60, -60, -120], [-40, -140, 40, -40], [60, -110, 160, -50], [-160, 30, -40, 60], [20, 20, 150, 40]]) { ctx.beginPath(); ctx.moveTo(a, b); ctx.quadraticCurveTo((a + c) / 2, b - 40, c, d); ctx.stroke(); }
  ctx.fillStyle = 'rgba(0,0,0,.4)'; rr(-150, 210, 300, 46, 23); ctx.fill(); ctx.fillStyle = fill > .3 ? LIME : HOT; rr(-146, 214, 292 * clamp(fill), 38, 19); ctx.fill(); label('ДОФАМИН', 0, 300, 40, { weight: 900, color: '#fff' }); ctx.restore(); }
function meter(lbl, x, y, w, p, col) { ctx.fillStyle = 'rgba(0,0,0,.45)'; rr(x - w / 2, y, w, 56, 28); ctx.fill(); ctx.fillStyle = col; rr(x - w / 2 + 6, y + 6, (w - 12) * clamp(p), 44, 22); ctx.fill(); label(lbl, x - w / 2 + 30, y + 40, 32, { align: 'left', weight: 900, color: '#fff', shadow: 'rgba(0,0,0,.6)' }); }
function stormCloud(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#3d4250'; for (const [a, b, r] of [[-90, 0, 70], [-20, -30, 90], [70, -5, 75], [130, 20, 55], [-150, 25, 50]]) { ctx.beginPath(); ctx.arc(a, b, r, 0, 7); ctx.fill(); }
  if (Math.floor(t * 3) % 3 === 0) { ctx.fillStyle = SUN; ctx.beginPath(); ctx.moveTo(10, 40); ctx.lineTo(-30, 130); ctx.lineTo(5, 125); ctx.lineTo(-20, 210); ctx.lineTo(50, 100); ctx.lineTo(15, 105); ctx.lineTo(40, 40); ctx.fill(); }
  ctx.strokeStyle = 'rgba(160,190,255,.7)'; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const k = (t * 1.6 + i / 8) % 1; ctx.beginPath(); ctx.moveTo(-120 + i * 34, 60 + k * 120); ctx.lineTo(-126 + i * 34, 80 + k * 120); ctx.stroke(); } ctx.restore(); }
function shopQueue(t) { bg('#d9dee3', '#9aa3ab'); blurred(3, () => { ctx.fillStyle = '#eef1f4'; ctx.fillRect(0, 300, W, 800); ctx.fillStyle = '#c94a3a'; ctx.fillRect(0, 300, W, 90); label('СУПЕРМАРКЕТ', 540, 366, 54, { weight: 900, color: '#fff' });
    for (let i = 0; i < 4; i++) { ctx.fillStyle = '#b7bfc7'; ctx.fillRect(40 + i * 260, 470, 220, 560); for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) { ctx.fillStyle = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'][(r + c + i) % 5]; ctx.fillRect(56 + i * 260 + c * 50, 490 + r * 105, 40, 70); } } }, 'shop');
  ctx.fillStyle = grad(0, 1100, 0, H, [[0, '#cfd5da'], [1, '#9aa3ab']]); ctx.fillRect(0, 1100, W, H); }
function bedroomNight(t) { bg('#0b1022', '#05070f'); ctx.fillStyle = '#1a2340'; ctx.fillRect(620, 220, 380, 480); ctx.fillStyle = '#e8ecff'; ctx.beginPath(); ctx.arc(840, 380, 60, 0, 7); ctx.fill(); ctx.fillStyle = '#1a2340'; ctx.beginPath(); ctx.arc(866, 360, 56, 0, 7); ctx.fill();
  glow(840, 380, 300, 'rgba(180,200,255,.3)'); const R = rnd(3); for (let i = 0; i < 18; i++) { ctx.fillStyle = `rgba(255,255,255,${.4 + .4 * Math.sin(t * 2 + i)})`; ctx.fillRect(640 + R() * 340, 240 + R() * 440, 3, 3); }
  ctx.strokeStyle = '#2b3350'; ctx.lineWidth = 14; ctx.strokeRect(620, 220, 380, 480); floor(1350, '#151a2c', '#07080f'); }
function book(x, y, s, p) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#7a2e2e'; rr(-230, -160, 460, 320, 16); ctx.fill(); ctx.fillStyle = '#f6f1e4'; rr(-215, -150, 210, 300, 10); ctx.fill(); rr(5, -150, 210, 300, 10); ctx.fill();
  ctx.fillStyle = 'rgba(40,40,40,.35)'; for (let i = 0; i < 9; i++) { ctx.fillRect(-195, -120 + i * 30, 170, 7); ctx.fillRect(25, -120 + i * 30, i === 8 ? 90 : 170, 7); } ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(-6, -150, 12, 300); ctx.restore(); }
function tvScreen(x, y, w, t, p) { const h = w * .58; ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#0b0c10'; rr(-w / 2 - 20, -h / 2 - 20, w + 40, h + 40, 20); ctx.fill();
  ctx.fillStyle = grad(-w / 2, -h / 2, w / 2, h / 2, [[0, '#1d2b55'], [.5, '#a0476b'], [1, '#f39c4a']]); ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.moveTo(-w / 2, h / 4); for (let i = 0; i <= 10; i++) ctx.lineTo(-w / 2 + i * w / 10, h / 4 - Math.sin(i + t) * 30 - 40); ctx.lineTo(w / 2, h / 2); ctx.lineTo(-w / 2, h / 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-w / 2 + 30, h / 2 - 40, w - 60, 8); ctx.fillStyle = HOT; ctx.fillRect(-w / 2 + 30, h / 2 - 40, (w - 60) * clamp(p), 8); ctx.beginPath(); ctx.arc(-w / 2 + 30 + (w - 60) * clamp(p), h / 2 - 36, 14, 0, 7); ctx.fill(); ctx.restore(); }
function park(t) { ctx.fillStyle = grad(0, 0, 0, H, [[0, '#ff9a5a'], [.45, '#ffd49a'], [1, '#f6e6c8']]); ctx.fillRect(0, 0, W, H); glow(760, 760, 600, 'rgba(255,220,150,.8)'); ctx.fillStyle = '#fff3d6'; ctx.beginPath(); ctx.arc(760, 760, 90, 0, 7); ctx.fill();
  blurred(3, () => { ctx.fillStyle = '#8fa86a'; ctx.beginPath(); ctx.moveTo(0, 1000); ctx.quadraticCurveTo(540, 900, W, 1000); ctx.lineTo(W, 1300); ctx.lineTo(0, 1300); ctx.fill(); for (const [tx, ts] of [[90, 520], [300, 380], [880, 560], [1040, 420]]) tree(tx, 1180, ts, '#5d7a45'); }, 'park');
  ctx.fillStyle = grad(0, 1240, 0, H, [[0, '#d9c49a'], [1, '#b39a6e']]); ctx.fillRect(0, 1250, W, H); const R = rnd(9); for (let i = 0; i < 5; i++) { const bx = (R() * W + t * 60) % W, by = 300 + R() * 300; ctx.strokeStyle = '#3a2a22'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx - 16, by); ctx.quadraticCurveTo(bx - 8, by - 10 * Math.abs(Math.sin(t * 6 + i)), bx, by); ctx.quadraticCurveTo(bx + 8, by - 10 * Math.abs(Math.sin(t * 6 + i)), bx + 16, by); ctx.stroke(); } }
function dayHud(t) { const marks = [[TL.units[6].start, 1], [TL.units[10].start, 2], [TL.units[15].start, 3], [TL.units[20].start, 5], [TL.units[24].start, 7], [TL.units[27].start, 14], [TL.units[30].start, 30]];
  if (t < marks[0][0] - .1 || t > TL.units[34].start - .2) return; let dnum = 1, tch = 0; marks.forEach(([tt, n]) => { if (t >= tt - .1) { dnum = n; tch = tt; } });
  const pop = eback(clamp((t - tch + .1) / .3)); ctx.save(); ctx.translate(540, 250); ctx.scale(.85 + .15 * pop, .85 + .15 * pop); ctx.fillStyle = 'rgba(8,10,16,.82)'; rr(-230, -50, 460, 100, 50); ctx.fill();
  label(`ДЕНЬ ${dnum}`, -110, 18, 48, { weight: 900, color: SUN }); ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(10, -10, 190, 20, 10); ctx.fill(); ctx.fillStyle = LIME; rr(10, -10, 190 * dnum / 30, 20, 10); ctx.fill(); label('/30', 200, 18, 30, { weight: 900, color: 'rgba(255,255,255,.6)', align: 'right' }); ctx.restore(); }

// ================== SCENES ==================
SC.hook = { // SMASH IN: a phone exploding with notifications, then "30 ДНЕЙ" slam
  draw(t, d, P, E) { const t30 = E('тридцать', 1, 3.4); bg('#0a0b12', '#020205'); glow(540, 900, 1100, `rgba(${t > t30 ? '255,60,90' : '80,140,255'},.28)`);
    const k = eback(prog(t, 0, .35)); ctx.save(); shake(t, t < .25 ? 22 * (1 - t / .25) : (t > t30 && t < t30 + .3 ? 18 : 2)); ctx.translate(540, 950); ctx.scale(lerp(2.6, 1, k), lerp(2.6, 1, k)); ctx.rotate(lerp(-.4, -.06, k) + Math.sin(t * 9) * .01); phoneFeed(0, 0, 560, t, { speed: 900 }); ctx.restore();
    for (let i = 0; i < 10; i++) { const ta = .15 + i * .28, a = i * 2.4, rx = 540 + Math.cos(a) * (280 + (i % 3) * 50), ry = 820 + Math.sin(a) * (380 + (i % 2) * 40); notifBubble(rx, ry, 520, i, prog(t, ta, ta + .25), { rot: Math.sin(a) * .08, a: 1 - prog(t, t30, t30 + .3) * .7 }); }
    if (t > t30 - .1) { ctx.fillStyle = `rgba(255,40,70,${.45 * (1 - prog(t, t30, t30 + .25))})`; ctx.fillRect(0, 0, W, H); bigTitle('30 ДНЕЙ', 840, prog(t, t30 - .1, t30 + .2), { size: 210, col: '#fff', glow: 'rgba(255,60,90,.9)', rot: -.06 }); bigTitle('БЕЗ ТЕЛЕФОНА', 1050, prog(t, t30 + .1, t30 + .4), { size: 104, col: HOT, rot: -.06 }); }
    else bigTitle('ЧТО БУДЕТ?', 300, prog(t, 0, .25), { size: 120, col: SUN }); },
  sfx(d, P, E) { const t30 = E('тридцать', 1, 3.4); const out = [[0, 'boom', .45], [0, 'whoosh', .4]]; for (let i = 0; i < 10; i++) out.push([.15 + i * .28, i % 3 === 0 ? 'notif' : 'pop', .3]); out.push([t30 - .1, 'dundun', .5]); return out; }
};
SC.pickups = {
  draw(t, d, P, E) { const ts = E('ста', 1, 1.6); room(t); ctx.save(); cam(540, 900, 1.0 + t * .03); person(540, 2450, 1800, GUY({ holdPhone: true, armUp: .85 + .05 * Math.sin(t * 6), phoneGlow: 'rgba(100,170,255,.45)' })); ctx.restore();
    const n = Math.floor(lerp(0, 117, eio(prog(t, .2, ts + .6)))); counterBox('БЕРЁШЬ В РУКИ', `${n} раз/день`, 540, 430, prog(t, .1, .4), { size: 64, accent: HOT });
    for (let i = 0; i < 6; i++) { const k = ((t * 1.4 + i / 6) % 1); label('👆', 200 + i * 140, 1250 - k * 260, 60, { alpha: 1 - k }); } },
  sfx(d) { return [[.1, 'ticks', .3, { dur: 1.8 }], [2, 'pop', .3]]; }
};
SC.youToo = { // "даже сейчас держишь" — he points straight at the viewer
  draw(t, d) { bg('#14080c', '#050203'); glow(540, 800, 900, 'rgba(255,60,90,.3)'); ctx.save(); shake(t, t < .2 ? 10 : 0); cam(540, 800, lerp(1.25, 1.0, eout(prog(t, 0, .4)))); person(540, 2450, 1800, GUY({ point: true, light: -1, rim: 'rgba(255,90,120,.6)' })); ctx.restore();
    bigTitle('ДА, ТЫ 👉', 1180, prog(t, .3, .55), { size: 110, col: HOT, rot: -.05 }); },
  sfx() { return [[0, 'scratch', .45], [.3, 'honk', .3]]; }
};
SC.lockAway = { // the phone flies into a drawer, the drawer slams, padlock, 30-day counter
  draw(t, d, P, E) { const tu = E('убираем', 1, .9), tt = E('тридцать', 1, 2.7); room(t); woodTable(1150, { c1: '#6b4a30', c2: '#2a1a10' });
    ctx.fillStyle = '#5b3d27'; rr(240, 1180, 600, 420, 16); ctx.fill(); const open = 1 - eio(prog(t, tu + .7, tu + 1)); ctx.fillStyle = '#7a5235'; rr(260, 1200 + 0, 560, 160, 12); ctx.fill(); ctx.fillStyle = '#3a2618'; rr(280, 1210 - 80 * open, 520, 80 * open, 8); ctx.fill(); ctx.fillStyle = '#d9b26a'; rr(500, 1260, 80, 26, 13); ctx.fill();
    const k = prog(t, tu, tu + .7); if (k < 1) { const px = lerp(540, 540, k), py = lerp(700, 1200, k * k), r = k * 10; ctx.save(); ctx.translate(px, py); ctx.rotate(r); phoneFeed(0, 0, 240 * (1 - k * .4), t); ctx.restore(); }
    if (t > tu + 1) { const pk = eback(prog(t, tu + 1, tu + 1.3)); ctx.save(); ctx.translate(540, 1330); ctx.scale(pk, pk); ctx.strokeStyle = '#c9ced6'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(0, -60, 50, Math.PI, 0); ctx.stroke(); ctx.fillStyle = '#e0b63a'; rr(-80, -60, 160, 130, 20); ctx.fill(); ctx.fillStyle = '#5b4510'; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); ctx.restore(); }
    if (t > tt - .1) bigTitle('30 ДНЕЙ', 560, prog(t, tt - .1, tt + .2), { size: 170, col: SUN, rot: -.05 }); else bigTitle('ОКЕЙ.', 560, prog(t, 0, .3), { size: 150, col: '#fff' }); },
  sfx(d, P, E) { const tu = E('убираем', 1, .9); return [[tu, 'slide_down', .4], [tu + .7, 'thud_soft', .6], [tu + 1, 'unlock', .4], [E('тридцать', 1, 2.7) - .1, 'boom', .35]]; }
};
SC.day1 = { // the hand keeps reaching for the pocket; fingers swipe an invisible screen
  draw(t, d, P, E) { const ts = E('пальцы', 1, 6); bg('#24375e', '#1a2846'); jeansPocket(540, 1150, 1.65, t);
    const cyc = (t * .9) % 1, dip = Math.sin(Math.min(1, cyc * 2) * Math.PI); if (t < ts - .3) { bigHand(lerp(700, 560, dip), lerp(260, 880, dip), 1.15, Math.PI + .3 - dip * .15, undefined, { curl: dip * .3 }); }
    else { const sw = Math.sin(t * 7) * 120; bigHand(560 + sw * .3, 1180, 1.2, -.1, undefined, { curl: .2 }); ctx.save(); ctx.setLineDash([20, 14]); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 6; rr(360, 360, 360, 720, 50); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      label('📵', 540, 760, 120, { alpha: .5 + .3 * Math.sin(t * 5) }); }
    const n = Math.floor(t * .9) + 1; counterBox('ТЯНЕТСЯ К КАРМАНУ', `${n * 7} раз`, 540, 470, prog(t, .3, .6), { size: 60, accent: SUN }); },
  sfx(d, P, E) { const out = []; for (let k = .3; k < E('пальцы', 1, 6) - .3; k += 1.11) out.push([k, 'swoosh', .2]); out.push([E('экран', 1, d - .6), 'buzzer_soft', .3]); return out; }
};
SC.day2 = { // phantom vibration
  draw(t, d, P, E) { const tn = E('нет', 1, 4.3), tf = E('фантомная', 1, 6.4); bg('#24375e', '#1a2846'); jeansPocket(540, 950, 1.65, t); const vib = (Math.floor(t * 1.4) % 2 === 0 && t < tn) ? Math.sin(t * 120) * 10 : 0;
    ctx.save(); ctx.translate(vib, 0); ctx.globalAlpha = t < tn ? .9 : .35; ctx.setLineDash([18, 12]); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; rr(420, 820, 220, 400, 36); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    if (vib) for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(255,255,255,${.6 - i * .18})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(530, 1020, 170 + i * 50, -.6, .6); ctx.stroke(); ctx.beginPath(); ctx.arc(530, 1020, 170 + i * 50, Math.PI - .6, Math.PI + .6); ctx.stroke(); }
    if (vib) bigTitle('БЗЗЗ', 700, 1, { size: 120, col: SUN, rot: Math.sin(t * 40) * .05 });
    if (t > tn) bigTitle('ТАМ ПУСТО', 600, prog(t, tn, tn + .25), { size: 120, col: HOT, rot: -.05 });
    if (t > tf - .3) { const k = eback(prog(t, tf - .3, tf + .1)); ctx.save(); ctx.translate(540, 980); ctx.scale(k, k); ctx.fillStyle = 'rgba(250,248,240,.97)'; rr(-420, -170, 840, 340, 30); ctx.fill();
      label('ФАНТОМНАЯ ВИБРАЦИЯ', 0, -70, 54, { weight: 900, color: '#111' }); label('— ощущение вибрации телефона,', 0, 10, 34, { weight: 600, color: '#444' }); label('которого нет', 0, 60, 34, { weight: 600, color: '#444' }); ctx.restore(); } },
  sfx(d, P, E) { const tn = E('нет', 1, 4.3); const out = []; for (let k = .1; k < tn; k += 1.43) out.push([k, 'vibrate', .5]); out.push([tn, 'wahwah', .4], [E('фантомная', 1, 6.4) - .3, 'page', .4]); return out; }
};
SC.day3 = { // withdrawal: storm cloud, meters, dopamine draining
  draw(t, d, P, E) { const tm = E('мозгу', 1, 6.5), tl = E('ломка', 1, 9.5); room(t, { c1: '#2a2530', c2: '#0d0b10' }); ctx.fillStyle = 'rgba(20,10,30,.35)'; ctx.fillRect(0, 0, W, H);
    if (t < tm - .2) { ctx.save(); shake(t, 3); cam(540, 900, 1.05); person(540, 2450, 1800, GUY({ light: -1, mouth: -.6 })); ctx.restore(); stormCloud(540, 380, 1.3, t);
      meter('СКУКА', 540, 1080, 700, prog(t, 2.2, 3.2), '#8e9aaf'); meter('ТРЕВОГА', 540, 1160, 700, prog(t, 2.6, 3.6), '#ffb02e'); meter('ВСЁ БЕСИТ', 540, 1240, 700, prog(t, 3, 4), HOT); bigTitle('САМЫЙ ТЯЖЁЛЫЙ', 620, prog(t, 1.4, 1.7), { size: 90, col: '#fff' }); return; }
    ctx.save(); if (t > tl) shake(t, 12); brain(540, 820, 1.4, t, 1 - eio(prog(t, tm, tl))); ctx.restore(); if (t > tl) { bigTitle('ЛОМКА', 1200, prog(t, tl, tl + .25), { size: 150, col: HOT, glow: 'rgba(255,60,90,.8)' }); if (Math.floor(t * 12) % 4 === 0) glitch(.6, Math.floor(t * 30)); } },
  sfx(d, P, E) { return [[0, 'drone', .3, { dur: d }], [2.2, 'tick', .3], [2.6, 'tick', .3], [3, 'buzzer_soft', .35], [E('мозгу', 1, 6.5), 'powerdown', .35], [E('ломка', 1, 9.5), 'glitch', .4]]; }
};
SC.day5 = { // in the queue everyone is glued to a screen
  draw(t, d, P, E) { const to = E('охреневаешь', 1, 7); shopQueue(t); const z = eio(prog(t, to - .3, to + .6));
    ctx.save(); cam(540, lerp(1000, 900, z), lerp(1.0, 1.25, z));
    const ppl = [[150, 1500, 640, { fem: true, top: '#8e44ad', hair: '#6b4a2c' }], [360, 1520, 660, { top: '#d35400', hair: '#2a1a12' }], [800, 1500, 650, { fem: true, top: '#16a085', hair: '#c9a46a' }], [960, 1520, 680, { top: '#7f8c8d', hair: '#4a3020', heavy: .5 }]];
    ppl.forEach(([x, y, h, o]) => { person(x, y, h, Object.assign({ holdPhone: true, armUp: .9, phoneGlow: 'rgba(80,170,255,.55)' }, o)); });
    person(580, 1560, 700, GUY({ light: 1 })); ctx.restore();
    for (const [x, y] of [[150, 1500], [360, 1520], [800, 1500], [960, 1520]]) { const sx = lerp(x, 540 + (x - 540) * 1.25, z), sy = lerp(y - 520, 900 + (y - 520 - 1000) * 1.25, z); glow(sx, sy, 120, 'rgba(90,170,255,.4)'); }
    if (t > to) bigTitle('ВСЕ В ЭКРАНАХ', 480, prog(t, to, to + .3), { size: 104, col: NEON2, rot: -.04 }); else bigTitle('ПРОСТО СТОИШЬ', 480, prog(t, 1.4, 1.7), { size: 96, col: '#1b1b1b' }); },
  sfx(d, P, E) { return [[0, 'store', .3, { dur: d }], [E('охреневаешь', 1, 7), 'scratch', .45]]; }
};
SC.day7 = { // asleep fast, no screen
  draw(t, d, P, E) { bedroomNight(t); ctx.fillStyle = '#2b3a66'; rr(80, 1180, 920, 260, 40); ctx.fill(); ctx.fillStyle = '#e8ecf6'; rr(110, 1140, 280, 120, 50); ctx.fill();
    ctx.save(); ctx.translate(960, 1200); ctx.rotate(-Math.PI / 2); person(0, 0, 700, GUY({ closed: prog(t, .6, 1.4), shadow: false, light: 1 })); ctx.restore(); ctx.fillStyle = '#3d4f86'; rr(330, 1150, 680, 260, 40); ctx.fill();
    for (let i = 0; i < 3; i++) { const k = ((t * .5 + i / 3) % 1); label('Z', 360 + k * 160 + i * 30, 1060 - k * 300, 60 + i * 24, { weight: 900, color: `rgba(200,215,255,${1 - k})` }); }
    counterBox('ЗАСЫПАЕШЬ ЗА', `${Math.round(lerp(45, 12, eio(prog(t, .6, 2.6))))} мин`, 540, 470, prog(t, .3, .6), { size: 66, accent: NEON2 }); },
  sfx(d) { return [[0, 'crickets', .25, { dur: d }], [1.2, 'snore', .35, { dur: d - 1.4 }]]; }
};
SC.day14 = { // a finished book, a whole movie without reaching for the phone
  draw(t, d, P, E) { const tf = E('фильм', 1, 1.7);
    if (t < tf - .25) { room(t); woodTable(1150, { c1: '#6b4a30', c2: '#2a1a10' }); book(540, 1000, 1.5, 1); counterBox('КНИГА', `${Math.round(lerp(62, 100, eio(prog(t, .2, tf - .4))))}%`, 540, 470, prog(t, .1, .4), { size: 70, accent: LIME }); return; }
    bg('#120d14', '#050306'); glow(540, 820, 900, 'rgba(255,140,120,.25)'); tvScreen(540, 820, 900, t, prog(t, tf - .25, d)); ctx.save(); ctx.globalAlpha = .9; person(300, 2200, 1300, GUY({ light: 1, silhouette: true, color: '#06050a', rim: 'rgba(255,170,140,.6)' })); person(780, 2200, 1250, { fem: true, silhouette: true, color: '#06050a', rim: 'rgba(255,170,140,.6)' }); ctx.restore();
    label('📵  0 раз за фильм', 540, 1240, 54, { weight: 900, color: LIME, alpha: prog(t, tf + .8, tf + 1.1) }); },
  sfx(d, P, E) { return [[.1, 'page', .35], [.9, 'page', .3], [E('фильм', 1, 1.7) - .25, 'tv_on', .35], [E('фильм', 1, 1.7) + .8, 'chime', .35]]; }
};
SC.day30 = { // calm: a slow walk in a golden park; the moments he used to miss
  draw(t, d, P, E) { const tz = E('замечаешь', 1, 5); park(t); const h = 640, stride = .64 * h, x = lerp(-80, 760, prog(t, 0, d + 2));
    if (t < tz - .2) { person(x, 1300, h, GUY({ walk: (x / stride) * Math.PI * 2 + .01 })); bigTitle('ТИШИНА', 500, prog(t, .8, 1.1), { size: 120, col: '#fff', glow: 'rgba(255,200,120,.6)' }); return; }
    person(x, 1300, h, GUY({ walk: (x / stride) * Math.PI * 2 + .01 }));
    const pics = [[tz - .2, 280, -.12, () => { park(0); person(540, 1700, 1300, { fem: true, top: '#c0392b', hair: '#6b4a2c' }); }, 'закат с ней'], [tz + .5, 800, .1, () => { bg('#7fb3d5', '#d6eaf8'); ctx.fillStyle = '#7a5a3a'; ctx.beginPath(); ctx.ellipse(540, 760, 260, 160, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(760, 640, 110, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(790, 620, 14, 0, 7); ctx.fill(); }, 'пёс друга'], [tz + 1.2, 540, .02, () => { bg('#2c3e50', '#1a252f'); for (let i = 0; i < 3; i++) person(300 + i * 240, 1900, 1200, { top: ['#e67e22', '#27ae60', '#2980b9'][i], hair: '#3a2618', mouth: .4 }); }, 'друзья']];
    pics.forEach(([ta, px, r, paint, cap], i) => { const k = eout(prog(t, ta, ta + .5)); if (k <= 0) return; polaroid(px, lerp(2200, 650 + i * 120, k), 440, r, paint, cap); }); },
  sfx(d, P, E) { const tz = E('замечаешь', 1, 5); return [[0, 'pad_swell', .35, { dur: d }], [.1, 'steps', .2, { dur: 3 }], [tz - .2, 'shutter', .35], [tz + .5, 'shutter', .35], [tz + 1.2, 'shutter', .35]]; }
};
SC.howMany = {
  draw(t, d) { bg('#0d0b14', '#030205'); glow(540, 800, 900, 'rgba(255,200,80,.25)'); bigTitle('А ТЫ СКОЛЬКО', 420, prog(t, 0, .3), { size: 100, col: '#fff' }); bigTitle('ПРОДЕРЖИШЬСЯ?', 560, prog(t, .2, .5), { size: 100, col: SUN });
    [['1 ДЕНЬ', '#ff6b6b'], ['7 ДНЕЙ', '#ffb02e'], ['30 ДНЕЙ', '#2fd27a']].forEach(([s, c], i) => pill(s, 540, 800 + i * 150, 60, prog(t, .6 + i * .2, .9 + i * .2), c, '#111')); label('ПИШИ В КОММЕНТЫ 👇', 540, 1290, 50, { weight: 900, color: '#fff', alpha: prog(t, 1.4, 1.8) }); },
  sfx() { return [[.6, 'pop', .3], [.8, 'pop', .3], [1, 'pop', .3]]; }
};
SC.share = {
  draw(t, d) { bg('#06121c', '#020508'); glow(540, 800, 900, 'rgba(60,200,255,.25)'); const k = eback(prog(t, 0, .4)), s = 1 + .06 * Math.sin(t * 6);
    ctx.save(); ctx.translate(540, 780); ctx.scale(k * s, k * s); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-160, 40); ctx.lineTo(180, -120); ctx.lineTo(60, 160); ctx.lineTo(20, 60); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#cfd8e0'; ctx.beginPath(); ctx.moveTo(20, 60); ctx.lineTo(180, -120); ctx.lineTo(40, 100); ctx.fill(); ctx.restore();
    for (let i = 0; i < 6; i++) { const kk = ((t * .7 + i / 6) % 1); ctx.fillStyle = `rgba(255,255,255,${.5 * (1 - kk)})`; ctx.beginPath(); ctx.arc(540 - kk * 300, 800 + kk * 180, 8, 0, 7); ctx.fill(); }
    bigTitle('ОТПРАВЬ ТОМУ,', 300, prog(t, .1, .4), { size: 92, col: '#fff' }); bigTitle('КТО ЗАЛИП 📱', 430, prog(t, .3, .6), { size: 92, col: NEON2 }); },
  sfx(d) { return [[0, 'swoosh_up', .4], [.6, 'chime', .35]]; }
};
// day HUD between scene and subtitles; profanity masked in subtitles (TikTok-safe)
const _subsBase = drawSubs;
const MASK = [[/бля/gi, 'бл*'], [/сука/gi, 'с*ка'], [/нахрен/gi, 'нах*ен'], [/охрен/gi, 'охр*н']];
SUBS.forEach(c => c.forEach(w => { MASK.forEach(([re, r]) => { w.w = w.w.replace(re, r); }); }));
const _baseRenderPhone = window.render;
window.render = function (t) { _baseRenderAng(t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; dayHud(t); if (t < TL.total - .6) drawSubs(t); };
