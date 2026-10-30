const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + path.resolve('index.html')); await p.evaluate(() => document.fonts.ready);
  if (errs.length) { console.log('LOAD ERRORS', errs); process.exit(1); }
  const info = await p.evaluate(() => window.SHOTINFO);
  // continuity
  let prevB = -1; info.forEach(([sc, st, d, a, bb]) => { if (a !== prevB + 1) console.log('GAP/OVERLAP at', a, sc); if (d < 1) console.log('SHORT', sc, a, d); prevB = bb; }); if (prevB !== 43) console.log('END', prevB);
  // draw sample frames for every shot (catches runtime errors + missing words)
  const mode = process.argv[2] || 'check'; fs.mkdirSync('out/prev', { recursive: true });
  for (let i = 0; i < info.length; i++) { const [sc, st, d] = info[i];
    for (const f of (mode === 'prev' ? [.55] : [.15, .5, .85])) { const t = st + d * f;
      try { await p.evaluate(t => window.render(t), t); } catch (e) { console.log('RENDER ERR', i, sc, t.toFixed(2), e.message.slice(0, 200)); }
      if (mode === 'prev') await p.screenshot({ path: `out/prev/${String(i).padStart(3, '0')}_${sc}.jpg`, quality: 70 }); } }
  if (errs.length) console.log('ERRORS', [...new Set(errs)].slice(0, 20));
  console.log('MISSING', await p.evaluate(() => window.MISSING ? [...window.MISSING] : []));
  const sfx = await p.evaluate(() => window.collectSfx()); fs.writeFileSync('sfx_cues.json', JSON.stringify(sfx)); console.log('shots', info.length, 'sfx cues', sfx.length);
  await b.close(); })();
