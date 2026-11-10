// ===== props: hero can (matches the reference photo), F1 car, American environments =====

const CAN_BLUE = ['#0d1b6e', '#1f36a8', '#3550c8'], CAN_SILVER = ['#7d828c', '#d9dde4', '#f6f7fa'];

// standard 250 ml can — blue/silver split by a slanted divider, halves swapped above/below the bulls
function drawCan(x, y, h, o = {}) {
  const w = h * 0.43, r = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.scaleX) ctx.scale(o.scaleX, 1);
  if (!o.noShadow) { ctx.save(); ctx.scale(1, .15); ctx.fillStyle = rgrad(0, h / 2 / .15, 0, w * 1.0, [[0, 'rgba(0,0,0,.6)'], [1, 'rgba(0,0,0,0)']]);
    ctx.beginPath(); ctx.arc(0, h / 2 / .15, w * 1.0, 0, 7); ctx.fill(); ctx.restore(); }
  const neck = h * .055, base = h * .04;
  // silhouette
  ctx.beginPath(); ctx.moveTo(-r * .86, -h / 2); ctx.lineTo(r * .86, -h / 2);
  ctx.quadraticCurveTo(r, -h / 2 + neck * .25, r, -h / 2 + neck); ctx.lineTo(r, h / 2 - base);
  ctx.quadraticCurveTo(r, h / 2 - base * .2, r * .88, h / 2); ctx.lineTo(-r * .88, h / 2);
  ctx.quadraticCurveTo(-r, h / 2 - base * .2, -r, h / 2 - base); ctx.lineTo(-r, -h / 2 + neck);
  ctx.quadraticCurveTo(-r, -h / 2 + neck * .25, -r * .86, -h / 2); ctx.closePath();
  ctx.save(); ctx.clip();
  const top = -h / 2 + neck, bot = h / 2 - base, mid = -h * .005; // split line runs through the bulls
  const blueG = grad(-r, 0, r, 0, [[0, CAN_BLUE[0]], [.3, CAN_BLUE[1]], [.5, CAN_BLUE[2]], [.75, CAN_BLUE[1]], [1, CAN_BLUE[0]]]);
  const silvG = grad(-r, 0, r, 0, [[0, CAN_SILVER[0]], [.35, CAN_SILVER[1]], [.5, CAN_SILVER[2]], [.75, CAN_SILVER[1]], [1, CAN_SILVER[0]]]);
  // slanted divider: x at y (top → bottom), from right-of-centre at the top to left at the bottom
  const dx = (yy) => lerp(r * .28, -r * .55, (yy - top) / (bot - top));
  ctx.fillStyle = silvG; ctx.fillRect(-r, top, w, bot - top);
  ctx.fillStyle = blueG;
  ctx.beginPath(); ctx.moveTo(-r, top); ctx.lineTo(dx(top), top); ctx.lineTo(dx(mid), mid); ctx.lineTo(-r, mid); ctx.closePath(); ctx.fill(); // upper-left blue
  ctx.beginPath(); ctx.moveTo(dx(mid), mid); ctx.lineTo(r, mid); ctx.lineTo(r, bot); ctx.lineTo(dx(bot), bot); ctx.closePath(); ctx.fill(); // lower-right blue
  // brushed metal
  ctx.globalAlpha = .07; ctx.fillStyle = '#fff'; for (let i = 0; i < 60; i++) ctx.fillRect(-r, top + i * (bot - top) / 60, w, .8); ctx.globalAlpha = 1;
  // bottom band
  const by = bot - h * .085; ctx.fillStyle = blueG; ctx.fillRect(-r, by, w, h * .045);
  ctx.font = `600 ${h * .024}px ${F_HEAD}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(225,230,240,.9)'; ctx.fillText('Serve chilled. Carbonated.', 0, by + h * .031);
  // wordmark
  ctx.save(); ctx.font = `900 ${h * .112}px ${F_HEAD}`; ctx.letterSpacing = `${-h * .005}px`; ctx.textAlign = 'center';
  ctx.fillStyle = '#d7102a'; ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = h * .004; ctx.shadowOffsetY = h * .002;
  ctx.fillText('Red Bull', 0, -h * .075); ctx.restore();
  ctx.font = `700 ${h * .022}px ${F_HEAD}`; ctx.fillStyle = '#d7102a'; ctx.textAlign = 'left'; ctx.fillText('™', r * .86, -h * .15);
  // bulls + sun
  const lw = w * .66, cy = h * .012, sr = lw * .2;
  ctx.fillStyle = rgrad(0, cy - sr * .2, 0, sr, [[0, '#ffd84a'], [.8, '#f6b800'], [1, '#e3a100']]);
  ctx.beginPath(); ctx.arc(0, cy - sr * .05, sr, 0, 7); ctx.fill();
  ctx.fillStyle = '#d7102a'; const bs = lw * .0042;
  bull(-lw * .47, cy - lw * .16, bs, false); bull(lw * .47, cy - lw * .16, bs, true);
  // ENERGY DRINK
  ctx.save(); ctx.font = `600 ${h * .045}px ${F_HEAD}`; ctx.letterSpacing = `${h * .006}px`; ctx.textAlign = 'center'; ctx.fillStyle = '#d7102a';
  ctx.fillText('ENERGY DRINK', 0, h * .115); ctx.restore();
  // cylinder shading + speculars
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, 'rgba(0,0,15,.7)'], [.1, 'rgba(0,0,15,.3)'], [.28, 'rgba(0,0,0,0)'], [.72, 'rgba(0,0,0,.04)'], [.9, 'rgba(0,0,15,.35)'], [1, 'rgba(0,0,15,.75)']]);
  ctx.fillRect(-r, -h / 2, w, h);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, 'rgba(255,255,255,0)'], [.26, 'rgba(255,255,255,0)'], [.33, 'rgba(255,255,255,.42)'], [.38, 'rgba(255,255,255,.1)'], [.44, 'rgba(255,255,255,0)'], [.8, 'rgba(255,255,255,0)'], [.87, 'rgba(200,215,255,.2)'], [.93, 'rgba(255,255,255,0)']]);
  ctx.fillRect(-r, -h / 2, w, h);
  if (o.rim) { ctx.fillStyle = grad(-r, 0, r, 0, [[0, o.rim], [.08, 'rgba(0,0,0,0)'], [.92, 'rgba(0,0,0,0)'], [1, o.rim]]); ctx.fillRect(-r, -h / 2, w, h); }
  ctx.globalCompositeOperation = 'source-over';
  if (o.drops) { const R = rnd(7); for (let i = 0; i < 110; i++) { const ddx = (R() - .5) * w * .92, ddy = (R() - .5) * h * .86, ds = R() * h * .006 + 1;
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(ddx + ds * .3, ddy + ds * .4, ds, ds * 1.35, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.26)'; ctx.beginPath(); ctx.ellipse(ddx, ddy, ds, ds * 1.35, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(ddx - ds * .35, ddy - ds * .45, ds * .3, 0, 7); ctx.fill(); } }
  // aluminium neck + base
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, '#4d5058'], [.36, '#f3f4f7'], [.5, '#c6c9cf'], [.7, '#8c9098'], [1, '#3b3e44']]); ctx.fillRect(-r, -h / 2, w, neck);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-r, -h / 2 + neck - 1.5, w, 1.5);
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, '#4d5058'], [.4, '#e8e9ec'], [1, '#3b3e44']]); ctx.fillRect(-r, bot, w, base);
  ctx.restore();
  // lid + tab
  ctx.fillStyle = grad(-r, 0, r, 0, [[0, '#62666d'], [.42, '#f6f6f8'], [.6, '#b8bbc1'], [1, '#4d5056']]);
  ctx.beginPath(); ctx.ellipse(0, -h / 2, r * .86, h * .024, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -h / 2 + 1, r * .72, h * .017, 0, 0, 7); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.stroke();
  const tab = o.tab || 0;
  if (tab > .5) { ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(w * .16, -h / 2, w * .09, h * .008, 0, 0, 7); ctx.fill(); }
  ctx.save(); ctx.translate(-w * .02, -h / 2); ctx.rotate(-tab * .7);
  ctx.fillStyle = grad(-w * .12, 0, w * .12, 0, [[0, '#8f939a'], [.5, '#eceef1'], [1, '#7c8087']]); rr(-w * .12, -h * .011 - tab * h * .028, w * .26, h * .024, 5); ctx.fill();
  ctx.fillStyle = '#5c5f66'; ctx.beginPath(); ctx.ellipse(-w * .03, -tab * h * .028, w * .045, h * .006, 0, 0, 7); ctx.fill();
  ctx.restore();
  ctx.restore();
}

// ---------- F1 car, Red Bull racing livery, side profile facing right; length ≈ 5.6*s units ----------
function f1Car(x, y, s, o = {}) {
  const spin = o.wheel || 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * 1.18, s * .9); if (o.flip) ctx.scale(-1, 1);
  // ground shadow
  ctx.fillStyle = rgrad(0, 58, 0, 330, [[0, 'rgba(0,0,0,.65)'], [1, 'rgba(0,0,0,0)']]); ctx.save(); ctx.scale(1, .12); ctx.beginPath(); ctx.arc(0, 58 / .12, 320, 0, 7); ctx.fill(); ctx.restore();
  const navy = grad(0, -60, 0, 40, [[0, '#2b3260'], [.5, '#1a1f45'], [1, '#0c0f26']]);
  // floor / plank
  ctx.fillStyle = '#0a0a0e'; ctx.beginPath(); ctx.moveTo(-230, 30); ctx.lineTo(200, 30); ctx.lineTo(210, 38); ctx.lineTo(-220, 38); ctx.fill();
  // rear wing
  ctx.fillStyle = '#14183a'; ctx.fillRect(-268, -78, 14, 92); ctx.fillStyle = navy; rr(-292, -96, 70, 26, 4); ctx.fill(); rr(-288, -66, 58, 12, 3); ctx.fill();
  ctx.fillStyle = '#d7102a'; ctx.fillRect(-292, -96, 70, 6);
  // body: sidepod + engine cover + nose
  ctx.fillStyle = navy; ctx.beginPath();
  ctx.moveTo(-250, 26); ctx.lineTo(-250, -18); ctx.quadraticCurveTo(-200, -30, -150, -62); ctx.quadraticCurveTo(-100, -86, -60, -84);
  ctx.lineTo(-40, -60); ctx.quadraticCurveTo(10, -46, 60, -40); ctx.quadraticCurveTo(160, -30, 268, -6); ctx.lineTo(280, 4); ctx.lineTo(268, 14);
  ctx.lineTo(120, 20); ctx.quadraticCurveTo(40, 24, -20, 28); ctx.closePath(); ctx.fill();
  // airbox intake
  ctx.fillStyle = '#0b0d1f'; ctx.beginPath(); ctx.ellipse(-66, -78, 12, 9, 0, 0, 7); ctx.fill();
  // red/yellow flame + bull on engine cover
  ctx.save(); ctx.beginPath(); ctx.moveTo(-250, -14); ctx.quadraticCurveTo(-200, -28, -150, -58); ctx.quadraticCurveTo(-100, -80, -60, -80); ctx.lineTo(-48, -60); ctx.quadraticCurveTo(-120, -40, -250, 6); ctx.closePath(); ctx.clip();
  ctx.fillStyle = grad(-250, 0, -50, 0, [[0, '#e3172e'], [.6, '#ff3b1f'], [1, '#ffcc00']]); ctx.fillRect(-260, -90, 220, 110); ctx.restore();
  ctx.fillStyle = '#d7102a'; bull(-170, -64, .62, false);
  ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.arc(-118, -52, 9, 0, 7); ctx.fill();
  // sidepod logo panel
  ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.moveTo(-60, -40); ctx.quadraticCurveTo(40, -36, 120, -24); ctx.lineTo(110, 10); ctx.lineTo(-70, 16); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.font = `900 30px ${F_HEAD}`; ctx.fillStyle = '#d7102a'; ctx.fillText('Red Bull', -40, -6); ctx.restore();
  // yellow nose tip
  ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.moveTo(232, -10); ctx.lineTo(280, 4); ctx.lineTo(268, 14); ctx.lineTo(236, 16); ctx.closePath(); ctx.fill();
  // cockpit + halo + helmet
  ctx.fillStyle = '#05060c'; ctx.beginPath(); ctx.moveTo(-40, -58); ctx.quadraticCurveTo(0, -66, 50, -46); ctx.lineTo(-40, -46); ctx.fill();
  ctx.fillStyle = grad(-10, -78, 20, -50, [[0, '#ffd23a'], [.5, '#e3172e'], [1, '#1a1f45']]); ctx.beginPath(); ctx.arc(4, -60, 14, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#111'; ctx.fillRect(4, -64, 12, 5);
  ctx.strokeStyle = '#0c0d14'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -56); ctx.quadraticCurveTo(0, -84, 52, -46); ctx.stroke();
  // front wing
  ctx.fillStyle = '#14183a'; rr(205, 16, 105, 10, 3); ctx.fill(); ctx.fillStyle = '#ffcc00'; rr(212, 26, 98, 7, 3); ctx.fill();
  ctx.fillStyle = '#d7102a'; ctx.fillRect(296, 4, 14, 30);
  // suspension arms
  ctx.strokeStyle = '#0c0d14'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(120, -14); ctx.lineTo(178, 2); ctx.moveTo(120, 10); ctx.lineTo(178, 8); ctx.moveTo(-150, -20); ctx.lineTo(-190, 0); ctx.moveTo(-150, 10); ctx.lineTo(-190, 8); ctx.stroke();
  // wheels (Pirelli-style red sidewall stripe)
  for (const [wx, wr] of [[180, 44], [-196, 47]]) {
    ctx.save(); ctx.translate(wx, 14);
    ctx.fillStyle = '#0d0d0f'; ctx.beginPath(); ctx.arc(0, 0, wr, 0, 7); ctx.fill();
    ctx.strokeStyle = '#d7102a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, wr * .74, 0, 7); ctx.stroke();
    ctx.rotate(spin); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 3;
    for (let k = 0; k < 5; k++) { ctx.rotate(Math.PI * 2 / 5); ctx.beginPath(); ctx.moveTo(wr * .2, 0); ctx.lineTo(wr * .5, 0); ctx.stroke(); }
    ctx.fillStyle = '#2a2a30'; ctx.beginPath(); ctx.arc(0, 0, wr * .45, 0, 7); ctx.fill();
    ctx.fillStyle = '#ffcc00'; ctx.beginPath(); ctx.arc(0, 0, wr * .12, 0, 7); ctx.fill();
    if (o.blurWheels) { ctx.fillStyle = 'rgba(40,40,46,.6)'; ctx.beginPath(); ctx.arc(0, 0, wr * .7, 0, 7); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.arc(wx - wr * .3, 14 - wr * .3, wr * .5, 0, 7); ctx.fill();
  }
  // gloss highlight
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = grad(0, -80, 0, 0, [[0, 'rgba(160,180,255,.18)'], [1, 'rgba(0,0,0,0)']]);
  ctx.beginPath(); ctx.moveTo(-150, -62); ctx.quadraticCurveTo(-100, -86, -60, -84); ctx.lineTo(-40, -60); ctx.quadraticCurveTo(100, -42, 268, -6); ctx.lineTo(268, -2); ctx.quadraticCurveTo(100, -34, -40, -50); ctx.closePath(); ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
}
// blurred racetrack: grandstands, barriers, kerbs; scroll = horizontal offset in px
function raceTrack(scroll, o = {}) {
  const night = o.night ?? true;
  ctx.fillStyle = night ? grad(0, 0, 0, 560, [[0, '#05060c'], [1, '#141a2c']]) : grad(0, 0, 0, 560, [[0, '#7fb2e6'], [1, '#cfe2f2']]);
  ctx.fillRect(0, 0, W, 600);
  // grandstand crowd bokeh band (motion streaked)
  const R = rnd(12);
  for (let i = 0; i < 160; i++) { const x = ((R() * W * 2 - scroll * .5) % (W * 2) + W * 2) % (W * 2) - W * .3, y = 200 + R() * 300, l = 30 + R() * 160;
    ctx.fillStyle = `hsla(${R() * 360},40%,${night ? 35 + R() * 25 : 50 + R() * 20}%,${.3 + R() * .3})`; ctx.fillRect(x, y, l, 3 + R() * 6); }
  // floodlights
  if (night) for (let i = 0; i < 6; i++) { const x = ((i * 420 - scroll * .5) % (W + 400) + W + 400) % (W + 400) - 200; glow(x, 120, 160, 'rgba(255,250,230,.55)'); ctx.fillStyle = '#fff'; ctx.fillRect(x - 30, 115, 60, 8); }
  // barrier with sponsor-free yellow boards
  ctx.fillStyle = '#d9b400'; ctx.fillRect(0, 540, W, 60);
  for (let i = -1; i < 14; i++) { const x = ((i * 180 - scroll) % 180 + 180) % 180 + i * 0; }
  ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 30; i++) { const x = (((i * 140 - scroll) % (W + 140)) + W + 140) % (W + 140) - 140; ctx.fillRect(x, 548, 90, 44); }
  // track
  ctx.fillStyle = grad(0, 600, 0, H, [[0, '#3a3c42'], [1, '#202126']]); ctx.fillRect(0, 600, W, H - 600);
  // kerb red/white
  for (let i = 0; i < 40; i++) { const x = (((i * 90 - scroll * 1.4) % (W + 180)) + W + 180) % (W + 180) - 180; ctx.fillStyle = i % 2 ? '#e8e8e8' : '#c8102e'; ctx.beginPath(); ctx.moveTo(x, 900); ctx.lineTo(x + 90, 900); ctx.lineTo(x + 70, 950); ctx.lineTo(x - 20, 950); ctx.fill(); }
  ctx.fillStyle = '#5fb7c8'; ctx.fillRect(0, 950, W, 130);
  // speed streaks
  ctx.globalAlpha = .25; ctx.fillStyle = '#fff';
  for (let i = 0; i < 26; i++) { const y = 610 + R() * 280, l = 120 + R() * 400, x = (((R() * W - scroll * 2) % (W + l)) + W + l) % (W + l) - l; ctx.fillRect(x, y, l, 2); }
  ctx.globalAlpha = 1;
}
