// usage: node render_range.js <firstFrame> <endFrame> <out.mp4>  → renders frames [first, end) for splicing
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const path = require('path');
(async () => {
  const F0 = +process.argv[2], F1 = +process.argv[3], OUTF = process.argv[4], fps = 30, wi = 'r';
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  await p.goto('file://' + path.resolve('index.html')); await p.evaluate(() => document.fonts.ready);
  const total = await p.evaluate(() => window.TOTAL); const N = Math.round(total * fps);
  const f0 = F0, f1 = Math.min(F1, N);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-vf', 'scale=in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p', '-c:v', 'libx264', '-profile:v', 'high', '-level:v', '4.1', '-preset', 'medium', '-crf', '18', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', OUTF], { stdio: ['pipe', 'ignore', 'inherit'] });
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    const b64 = await p.evaluate(t => { window.render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, f / fps);
    const buf = Buffer.from(b64, 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 300 === 0) console.log(`w${wi} ${f - f0}/${f1 - f0} ${((f - f0) / ((Date.now() - t0) / 1000)).toFixed(1)} fps`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log(`w${wi} done ${f1 - f0} frames`);
})();
