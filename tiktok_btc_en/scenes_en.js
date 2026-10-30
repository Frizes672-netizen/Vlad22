// ===== English-only scenes for the Bitfinex TikTok =====
SC.hookEn = { // hacked exchange; counter rolls to $71M, then jumps to $4.5B "six years later"
  draw(t, d, P, E) { const t1 = E('71') - .4, t2 = E('six') - .2, t3 = E('45', 1, t2 + 1.4) - .5; darkBg(t, 'rgba(255,40,60,.18)'); codeRain(t, .15, '255,45,61', 4);
    exchangeScreen(60, 160, 960, 860, t, prog(t, .4, 1.0)); if (t > .6 && t < 1) glitch(.8, Math.floor(t * 30));
    ctx.save(); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(40, 1140, 1000, 320, 30); ctx.fill(); ctx.strokeStyle = 'rgba(247,147,26,.6)'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    if (t < t2) { label('STOLEN', 540, 1215, 42, { color: BTC, spacing: 12, weight: 800 }); odometer('$71,000,000', 540, 1385, 128, prog(t, t1, t1 + 1.6), { color: '#fff', sym: BTC, shadow: 'rgba(247,147,26,.5)' }); }
    else { label('6 YEARS LATER', 540, 1215, 42, { color: GREEN, spacing: 10, weight: 800 }); odometer('$4,500,000,000', 540, 1385, 104, prog(t, t3, t3 + 1.8), { color: '#fff', sym: GREEN, shadow: 'rgba(57,255,136,.5)' }); if (t < t2 + .2) glitch(.7, 5); }
    const R = rnd(8); for (let i = 0; i < 18; i++) { const st = 1 + R() * (d - 1), k = t - st; if (k < 0 || k > 2) continue; btcCoin(R() * W, 1540 + k * 260, 30 + R() * 20, { rot: k * 3 }); }
    if (t > t3 + 1.8) moneyRain(t - t3 - 1.8, 24, 3); scanlines(.06); },
  sfx(d, P, E) { const t1 = E('71') - .4, t2 = E('six') - .2, t3 = E('45', 1, t2 + 1.4) - .5; return [[0, 'alarm', .3, { dur: 1.4 }], [.6, 'glitch', .55], [t1, 'ticks', .5, { dur: 1.6 }], [t2, 'glitch', .5], [t3, 'ticks', .5, { dur: 1.8 }], [t3 + 1.8, 'boom', .5], [t3 + 1.85, 'coins', .45]]; }
};
SC.nameCard = { draw(t, d, P, E) { SC.vanish.draw(t, d, P, E); const k = eback(prog(t, .1, .5)); ctx.save(); ctx.translate(540, 300); ctx.scale(k, k); ctx.fillStyle = 'rgba(4,6,12,.9)'; rr(-360, -90, 720, 170, 26); ctx.fill(); ctx.strokeStyle = GREEN; ctx.lineWidth = 5; ctx.stroke(); label('BITFINEX', 0, 30, 110, { weight: 900, color: '#fff', font: MONO, shadow: 'rgba(57,255,136,.6)' }); ctx.restore(); },
  sfx(d, P, E) { return [[.1, 'boom', .4], ...SC.vanish.sfx(d, P, E)]; } };
SC.notChase = { // not a car chase, not an informant
  draw(t, d, P, E) { const t1 = E('chase') - .3, t2 = E('informant') - .4; darkBg(t);
    const k1 = prog(t, t1, t1 + .4); if (k1 > 0) { ctx.save(); ctx.globalAlpha = k1; policeLights(t, .5); ctx.fillStyle = '#e9eef6'; rr(220, 520, 640, 170, 50); ctx.fill(); ctx.fillStyle = '#111'; rr(320, 440, 400, 110, 30); ctx.fill(); ctx.fillStyle = '#1a1d26'; for (const x of [340, 740]) { ctx.beginPath(); ctx.arc(x, 700, 60, 0, 7); ctx.fill(); } ctx.fillStyle = RED; ctx.fillRect(470, 420, 50, 22); ctx.fillStyle = '#2e6fd7'; ctx.fillRect(520, 420, 50, 22); ctx.restore(); label('CAR CHASE', 540, 830, 54, { weight: 900, alpha: k1 }); bigX(540, 600, 420, prog(t, t1 + .5, t1 + .9)); }
    const k2 = prog(t, t2, t2 + .4); if (k2 > 0) { ctx.save(); ctx.globalAlpha = k2; person(540, 1640, 560, { silhouette: true, color: '#06070b', rim: 'rgba(255,240,210,.7)', cap: true }); bubble(760, 1140, 300, 120, 'rgba(255,255,255,.9)', -1); label('psst…', 760, 1158, 50, { color: '#111', weight: 800 }); ctx.restore(); label('SECRET INFORMANT', 540, 1760, 54, { weight: 900, alpha: k2 }); bigX(540, 1340, 420, prog(t, t2 + .5, t2 + .9)); }
    scanlines(.05); },
  sfx(d, P, E) { const t1 = E('chase') - .3, t2 = E('informant') - .4; return [[t1, 'siren', .3, { dur: 1.2 }], [t1 + .5, 'soft_x', .5], [t2, 'swoosh', .4], [t2 + .5, 'soft_x', .5]]; }
};
SC.cloudToVault = { // recovered cloud file unlocks the funds
  draw(t, d) { bg('#05080f', '#020306'); codeRain(t, .15, '34,227,255', 7); cloudFile(500, 620, 1.3, t, prog(t, .6, 1.2));
    label("LICHTENSTEIN'S CLOUD STORAGE", 540, 300, 44, { weight: 900, color: NEON, spacing: 2, alpha: prog(t, .1, .5) });
    const k = prog(t, 1.2, d); for (let i = 0; i < 24; i++) { const u = ((t - 1.2) * .5 + i / 24) % 1; if (t < 1.2) break; btcCoin(540 + Math.sin(i * 1.7) * 200 * (1 - u), lerp(900, 1500, u), 26); }
    ctx.save(); ctx.translate(540, 1600); ctx.fillStyle = '#20242e'; rr(-300, -120, 600, 240, 26); ctx.fill(); ctx.strokeStyle = GREEN; ctx.lineWidth = 5; ctx.stroke(); label('FUNDS ACCESSED', 0, 22, 56, { weight: 900, color: GREEN, font: MONO, alpha: prog(t, 1.4, 1.8) }); ctx.restore(); scanlines(.05); },
  sfx(d) { return [[.6, 'unlock', .6], [1.2, 'data', .4, { dur: d - 1.5 }], [1.4, 'chime', .45]]; }
};
SC.admitted = {
  draw(t, d) { ctx.fillStyle = '#16100a'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = grad(0, 0, 0, H, [[0, '#2a1e14'], [1, '#0e0905']]); ctx.fillRect(0, 0, W, H); glow(540, 900, 900, 'rgba(255,200,130,.22)');
    exchangeScreen(140, 1260, 800, 520, t, 1); suspectCard(540, 640, 640, t, 'ILYA LICHTENSTEIN', 'admitted the 2016 hack', prog(t, .1, .7), { rot: -.03, stamp: 'ADMITTED', stampP: prog(t, d * .55, d * .55 + .35) }); },
  sfx(d) { return [[.1, 'paper', .5], [d * .55, 'stamp', .6]]; }
};
SC.fast = {
  draw(t, d) { darkBg(t, 'rgba(247,147,26,.12)'); globe(540, 960, 420, t, { speed: .9, net: true }); const R = rnd(5);
    for (let i = 0; i < 40; i++) { const sp = 1200 + R() * 1400, y = R() * H, x = ((R() * W * 2 + t * sp) % (W + 600)) - 300; ctx.strokeStyle = 'rgba(247,147,26,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 220, y); ctx.lineTo(x, y); ctx.stroke(); btcCoin(x, y, 18); }
    label('FAST', 540, 300, 140, { weight: 900, color: '#fff', alpha: prog(t, .3, .7), shadow: 'rgba(247,147,26,.7)' }); scanlines(.05); },
  sfx(d) { return [[0, 'whoosh', .5], [.4, 'swoosh', .45], [.9, 'whoosh', .4], [0, 'data', .35, { dur: d }]]; }
};
