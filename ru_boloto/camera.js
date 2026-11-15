// ===== camera system: keyframed moves inside a shot + whip-pan smear on every cut =====
// keys: [[time, x, y, zoom], ...] in WORLD coords; eased between keys; tiny handheld drift on top
function camAt(t, keys) { if (t <= keys[0][0]) return keys[0].slice(1); for (let i = 0; i < keys.length - 1; i++) { const [t0, x0, y0, z0] = keys[i], [t1, x1, y1, z1] = keys[i + 1]; if (t <= t1) { const q = eio(clamp((t - t0) / Math.max(.001, t1 - t0))); return [lerp(x0, x1, q), lerp(y0, y1, q), lerp(z0, z1, q)]; } } return keys[keys.length - 1].slice(1); }
function camKeys(t, keys, drift = 1) { const [x, y, z] = camAt(t, keys); cam(x + Math.sin(t * .9) * 6 * drift, y + Math.cos(t * .7) * 5 * drift, z * (1 + .006 * Math.sin(t * .5) * drift)); }
// whip smear at the start of each shot (horizontal motion blur that settles in 0.28 s)
function whipSmear(t) { const info = window.SHOTINFO; if (!info) return; let st = 0, dir = 1; for (let i = 0; i < info.length; i++) if (t >= info[i][1]) { st = info[i][1]; dir = i % 2 ? -1 : 1; } const q = (t - st) / .28; if (q < 0 || q >= 1 || st === 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const k = 1 - eout(q); for (let i = 1; i <= 6; i++) { ctx.globalAlpha = .16 * k; ctx.drawImage(cv, dir * i * 46 * k, 0); } ctx.restore(); }
