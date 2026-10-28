const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => { console.error('ERR', e.message); process.exit(1); });
  await p.goto('file://' + path.resolve('thumb3.html')); await p.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
  await p.evaluate(() => window.drawThumb()); await p.screenshot({ path: 'out/thumbs/raw3.png' }); await b.close(); })();
