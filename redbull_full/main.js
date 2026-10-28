// ===== framework: shots bound to narration units, word events, transitions, sfx export =====
const SC = {};            // scene library: SC[name] = { draw(t, d, P, E), sfx(d, P, E) -> [[t, name, gain]] }
const SHOTS = [];
function shot(a, b, scene, p = {}) { SHOTS.push({ a, b, scene, p }); }
const norm = w => w.toLowerCase().replace(/[^a-z0-9]/g, '');

function buildTimeline() {
  const U = TL.units;
  SHOTS.forEach((s, i) => { s.start = i === 0 ? 0 : U[s.a].start - .12; });
  SHOTS.forEach((s, i) => { s.end = i + 1 < SHOTS.length ? SHOTS[i + 1].start : TL.total; s.d = s.end - s.start;
    const words = []; for (let u = s.a; u <= s.b; u++) U[u].words.forEach(([w, tt]) => words.push([w, tt - s.start]));
    s.words = words;
    s.E = (w, k = 1, fb) => { const n = norm(w); let c = 0; for (const [ww, tt] of words) if (ww === n || ww.startsWith(n)) { if (++c === k) return tt; } if (fb === undefined) (window.MISSING = window.MISSING || new Set()).add(s.scene + '#' + s.a + ':' + w); return fb ?? s.d * .5; };
    s.U = (u) => U[u].start - s.start; // unit start (local)
  });
}
const XF = .45;
function drawShot(s, lt) { ctx.save(); try { SC[s.scene].draw(lt, s.d, s.p, s.E, s); } catch (e) { console.error(s.scene, e); throw e; } ctx.restore(); }
window.render = function (t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  let i = SHOTS.findIndex(s => t < s.end); if (i < 0) i = SHOTS.length - 1;
  const s = SHOTS[i], lt = t - s.start;
  if (i > 0 && lt < XF && !s.p.cut) { const pv = SHOTS[i - 1]; drawShot(pv, t - pv.start);
    ctx.save(); ctx.globalAlpha = eio(lt / XF); drawShot(s, lt); ctx.restore(); }
  else drawShot(s, lt);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  if (t < .6) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .6})`; ctx.fillRect(0, 0, W, H); }
  if (t > TL.total - 2.5) { ctx.fillStyle = `rgba(0,0,0,${clamp((t - (TL.total - 2.5)) / 2.5)})`; ctx.fillRect(0, 0, W, H); }
  post(t);
};
window.collectSfx = function () {
  const out = [];
  SHOTS.forEach(s => { const f = SC[s.scene].sfx; if (f) f(s.d, s.p, s.E, s).forEach(([tt, name, g, extra]) => out.push({ t: +(s.start + tt).toFixed(3), name, g: g ?? 1, x: extra || null, shot: s.scene }));
    if (!s.p.cut && !s.p.noWhoosh && s.start > 0) out.push({ t: +(s.start - .25).toFixed(3), name: 'trans', g: .35, shot: s.scene }); });
  return out.sort((a, b) => a.t - b.t);
};
