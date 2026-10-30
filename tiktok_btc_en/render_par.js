// usage: node render_par.js <worker> <workers> [fps]  → out/seg_<worker>.mp4 (contiguous frame range)
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const path = require('path');
(async () => {
  const wi = +process.argv[2], wn = +process.argv[3], fps = +(process.argv[4] || 30);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  await p.goto('file://' + path.resolve('index.html')); await p.evaluate(() => document.fonts.ready);
  const total = await p.evaluate(() => window.TOTAL); const N = Math.round(total * fps);
  const f0 = Math.floor(N * wi / wn), f1 = Math.floor(N * (wi + 1) / wn);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', `out/seg_${wi}.mp4`], { stdio: ['pipe', 'ignore', 'inherit'] });
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    const b64 = await p.evaluate(t => { window.render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, f / fps);
    const buf = Buffer.from(b64, 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 300 === 0) console.log(`w${wi} ${f - f0}/${f1 - f0} ${((f - f0) / ((Date.now() - t0) / 1000)).toFixed(1)} fps`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log(`w${wi} done ${f1 - f0} frames`);
})();
