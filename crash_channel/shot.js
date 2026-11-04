const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2560, height: 2300 } }); await p.goto('file://' + path.resolve('brand.html')); await p.waitForTimeout(300);
  for (const [id, f] of [['a', 'avatar_800.png'], ['b', 'banner_2560x1440.png']]) { const d = await p.evaluate(id => document.getElementById(id).toDataURL('image/png'), id); require('fs').writeFileSync(f, Buffer.from(d.split(',')[1], 'base64')); }
  await b.close(); })();
