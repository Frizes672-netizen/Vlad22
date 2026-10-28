const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => { console.error('ERR', e.message); process.exit(1); });
  await p.goto('file://' + path.resolve('thumb2.html')); await p.evaluate(async () => { await document.fonts.load('100px Anton'); await document.fonts.load('60px Marker'); await document.fonts.ready; });
  for (const v of ['honest', 'exact']) { await p.evaluate(v => window.drawThumb(v), v); await p.screenshot({ path: `out/thumbs/raw2_${v}.png` }); }
  await b.close(); })();
