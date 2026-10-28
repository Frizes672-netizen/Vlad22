const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => { console.error('ERR', e.message); process.exit(1); });
  await p.goto('file://' + path.resolve('thumb.html')); await p.evaluate(() => document.fonts.ready);
  fs.mkdirSync('out/thumbs', { recursive: true });
  for (const k of ['A', 'B', 'C', 'D', 'E', 'F']) { await p.evaluate(k => window.drawThumb(k), k); await p.screenshot({ path: `out/thumbs/raw_${k}.png` }); }
  await b.close(); })();
