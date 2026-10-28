// usage: node render.js preview  |  node render.js video [fps]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const mode = process.argv[2] || 'preview';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  await page.goto('file://' + path.resolve('scenes/anim.html'));
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL);
  const starts = await page.evaluate(() => window.SCENE_STARTS);
  const grab = (t) => page.evaluate(t => { window.render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93).split(',')[1]; }, t);
  if (mode === 'preview') {
    const times = (process.argv[3] ? process.argv[3].split(',').map(Number) : starts.flatMap((s, i) => { const e = starts[i + 1] ?? total; return [s + (e - s) * .35, s + (e - s) * .8]; }));
    const fs = require('fs');
    for (const t of times) fs.writeFileSync(`out/prev_${t.toFixed(2).padStart(6, '0')}.jpg`, Buffer.from(await grab(t), 'base64'));
    console.log('total', total, 'starts', starts.join(' '));
  } else {
    const fps = +(process.argv[3] || 30), n = Math.round(total * fps);
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'out/redbull_part1.mp4'], { stdio: ['pipe', 'ignore', 'inherit'] });
    for (let f = 0; f < n; f++) {
      const buf = Buffer.from(await grab(f / fps), 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 150 === 0) console.log(`frame ${f}/${n}`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
