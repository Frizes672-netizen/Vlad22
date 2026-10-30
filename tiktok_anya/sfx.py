"""Synthesise the sound-effects bed from sfx_cues.json and mix it under the narration.

Calm, soft effects everywhere; only the F1 pass-bys are aggressive. Effects duck automatically
under the voice. Output: out/mix.wav (voice + sfx + ambient pad).
"""
import json, sys, wave
import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
rng = np.random.default_rng(7)


def t_(d): return np.arange(int(d * SR)) / SR
def noise(d): return rng.standard_normal(int(d * SR))
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def env_adsr(n, a, r, curve=2.0):
    e = np.ones(n); na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na) ** curve
    if nr: e[-nr:] *= np.linspace(1, 0, nr) ** curve
    return e
def expdec(d, k): return np.exp(-t_(d) * k)
def M(*xs):
    """sum signals of different lengths (each item: array or (gain, array))"""
    xs = [(1.0, x) if not isinstance(x, tuple) else x for x in xs]; n = max(len(a) for _, a in xs); out = np.zeros(n)
    for g, a in xs: out[:len(a)] += g * a
    return out
def norm(x, peak=1.0): m = np.max(np.abs(x)) or 1; return x / m * peak
def sweep_noise(d, f0, f1, q=1.5):
    """band-passed noise whose centre sweeps f0→f1 (whoosh)."""
    x = noise(d); out = np.zeros_like(x); seg = 1024
    for i in range(0, len(x), seg):
        u = i / len(x); f = f0 * (f1 / f0) ** u
        lo, hi = max(40, f / q), min(SR / 2 - 100, f * q)
        out[i:i + seg] = bp(x[max(0, i - 2048):i + seg], lo, hi)[-len(x[i:i + seg]):]
    return out
def bell(f, d, partials=((1, 1), (2.01, .4), (3.02, .18), (4.2, .08)), k=3.5, a=.004):
    tt = t_(d); x = sum(g * np.sin(2 * np.pi * f * m * tt) * np.exp(-tt * k * (1 + m * .4)) for m, g in partials)
    return x * env_adsr(len(tt), a, .02)

# ---------------- effect library (all return mono float arrays) ----------------
def fx_trans(x=None):   return norm(sweep_noise(.7, 300, 2400, 2) * env_adsr(int(.7 * SR), .35, .35), .5)
def fx_swoosh(x=None):  return norm(sweep_noise(.6, 500, 3500, 1.8) * env_adsr(int(.6 * SR), .25, .33), .7)
def fx_swoosh_up(x=None): return norm(sweep_noise(1.1, 300, 5000, 1.6) * env_adsr(int(1.1 * SR), .7, .3), .7)
def fx_whoosh(x=None):  return norm(sweep_noise(.9, 1800, 220, 2.2) * env_adsr(int(.9 * SR), .3, .5), .8)
def fx_pop(x=None):
    tt = t_(.18); f = 900 * np.exp(-tt * 18) + 380
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 28), .6) + .15 * norm(hp(noise(.18), 3000) * np.exp(-tt * 80))
def fx_popseq(x):
    n, step = int(x.get('n', 10)), x.get('step', .12); out = np.zeros(int((n * step + .3) * SR))
    for i in range(n): s = fx_pop() * .7; p = int(i * step * SR); out[p:p + len(s)] += s
    return out
def fx_tick(x=None):    tt = t_(.05); return norm(np.sin(2 * np.pi * 2400 * tt) * np.exp(-tt * 160), .5)
def fx_ticks(x):
    d = x.get('dur', 2.0); out = np.zeros(int((d + .2) * SR)); tt = 0.0; k = 0
    while tt < d:  # decelerating ticks like a rolling counter
        s = fx_tick() * (.6 + .4 * rng.random()); p = int(tt * SR); out[p:p + len(s)] += s
        u = tt / d; tt += .03 + .16 * u ** 2.2; k += 1
    return out
def fx_ticks_down(x): return fx_ticks(x) * .9
def fx_chime(x=None):   return norm(M(bell(1046, 2.2), (.6, bell(1568, 2.0)), (.35, bell(2093, 1.6))), .6)
def fx_shimmer(x=None):
    out = np.zeros(int(2.2 * SR))
    for i, f in enumerate([1318, 1568, 1975, 2349, 2637, 3136]):
        s = bell(f, 1.6, k=2.6) * .3; p = int(i * .09 * SR); out[p:p + len(s)] += s
    return norm(out * env_adsr(len(out), .05, .8), .5)
def fx_wing(x=None):
    d = 1.0; tt = t_(d); am = (np.sin(2 * np.pi * 5 * tt - np.pi / 2) * .5 + .5) ** 2
    return norm(bp(noise(d), 300, 2200) * am * env_adsr(len(tt), .1, .4), .55)
def fx_cartoon_wing(x=None): return fx_wing() * .8
def fx_paper(x=None):
    d = .45; return norm(bp(noise(d), 1500, 7000) * (np.abs(np.sin(t_(d) * 30)) ** 3) * env_adsr(int(d * SR), .02, .2), .5)
def fx_page(x=None):     d = .35; return norm(bp(noise(d), 1200, 6000) * env_adsr(int(d * SR), .05, .25, 1), .55)
def fx_pages(x):
    d = x.get('dur', 3); out = np.zeros(int((d + .5) * SR)); tt = 0
    while tt < d: s = fx_page() * .6; p = int(tt * SR); out[p:p + len(s)] += s; tt += .5 + rng.random() * .6
    return out
def fx_soft_x(x=None):
    tt = t_(.5); return norm(lp(noise(.5), 900) * np.exp(-tt * 9) + .6 * np.sin(2 * np.pi * 110 * tt) * np.exp(-tt * 8), .6)
def fx_thud_soft(x=None):
    tt = t_(.8); f = 90 * np.exp(-tt * 4) + 40; return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 6) + .3 * lp(noise(.8), 400) * np.exp(-tt * 14), .8)
def fx_boom(x=None):
    tt = t_(3.0); f = 55 * np.exp(-tt * .8) + 28
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.4) * env_adsr(len(tt), .02, .5) + .25 * lp(noise(3), 300) * np.exp(-tt * 2), .8)
def fx_gavel(x=None):
    tt = t_(.9); wood = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt * k) for f, k in ((420, 28), (690, 35), (1180, 50)))
    return norm(wood + .6 * lp(noise(.9), 1600) * np.exp(-tt * 40) + .5 * np.sin(2 * np.pi * 85 * tt) * np.exp(-tt * 9), .7)
def fx_stamp(x=None):
    tt = t_(.4); return norm(lp(noise(.4), 1200) * np.exp(-tt * 30) + .7 * np.sin(2 * np.pi * 140 * tt) * np.exp(-tt * 22), .6)
def fx_coins(x=None):
    out = np.zeros(int(1.6 * SR))
    for i in range(14):
        s = bell(2600 + rng.random() * 2600, .5, partials=((1, 1), (2.7, .5), (5.1, .2)), k=9) * (.2 + .2 * rng.random())
        p = int(rng.random() * 1.0 * SR); out[p:p + len(s)] += s
    return norm(out, .45)
def fx_notif(x=None):   return norm(M(bell(1760, .5, k=7), (.7, np.concatenate([np.zeros(int(.09 * SR)), bell(2349, .41, k=7)]))), .4)
def fx_pin(x=None):     tt = t_(.12); return norm(lp(noise(.12), 3000) * np.exp(-tt * 70), .4)
def fx_tick_pen(x=None): d = .3; return norm(bp(noise(d), 2000, 6000) * env_adsr(int(d * SR), .02, .15), .4)
def fx_pen(x=None):     d = 1.0; return norm(bp(noise(d), 2500, 7000) * (np.abs(np.sin(t_(d) * 14)) ** 2) * env_adsr(int(d * SR), .05, .3), .35)
def fx_marker(x=None):  d = .7; return norm(bp(noise(d), 1500, 5000) * env_adsr(int(d * SR), .05, .2), .35)
def fx_snip(x=None):    tt = t_(.25); return norm(hp(noise(.25), 3500) * np.exp(-tt * 40) + .5 * np.sin(2 * np.pi * 3200 * tt) * np.exp(-tt * 60), .5)
def fx_creak(x=None):
    d = 1.2; tt = t_(d); f = 180 + 60 * np.sin(2 * np.pi * .8 * tt)
    return norm(bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (rng.random(len(tt)) > .3), 300, 1800) * env_adsr(len(tt), .2, .5), .3)
def fx_shutter(x=None): tt = t_(.15); return norm(hp(noise(.15), 2000) * (np.exp(-tt * 90) + .6 * np.exp(-np.abs(tt - .07) * 140)), .45)
def fx_shutters(x):
    d = x.get('dur', 3); out = np.zeros(int((d + .3) * SR)); tt = .1
    while tt < d: s = fx_shutter() * (.4 + .5 * rng.random()); p = int(tt * SR); out[p:p + len(s)] += s; tt += .15 + rng.random() * .5
    return out
def fx_clasp(x=None):   tt = t_(.3); return norm(lp(noise(.3), 1500) * np.exp(-tt * 25), .5)
def fx_canopen(x=None):
    tt = t_(.6); click = hp(noise(.6), 2000) * np.exp(-tt * 120); hiss = bp(noise(.6), 2500, 9000) * np.exp(-tt * 5) * (tt > .02)
    return norm(click * 1.2 + hiss * .7, .8)
def fx_fizz(x):
    d = x.get('dur', 2); tt = t_(d); crack = (rng.random(len(tt)) > .9985).astype(float)
    return norm(hp(noise(d), 4000) * .08 + lp(crack * rng.standard_normal(len(tt)), 8000) * 1.0, .35) * env_adsr(len(tt), .05, 1.0)
def fx_sip(x=None):
    tt = t_(.6); f = 300 + 200 * np.sin(2 * np.pi * 3 * tt); g = np.sin(2 * np.pi * np.cumsum(f) / SR) * (np.sin(2 * np.pi * 3 * tt) > .4)
    return norm(lp(g, 900) * env_adsr(len(tt), .05, .2) + .2 * bp(noise(.6), 400, 1500) * env_adsr(len(tt), .1, .2), .45)
def fx_pour(x=None):    d = 1.4; return norm(bp(noise(d), 500, 2500) * env_adsr(int(d * SR), .2, .5), .3)
def fx_clink(x=None):   return norm(bell(2900, .6, partials=((1, 1), (2.4, .6), (4.4, .3)), k=10), .45)
def fx_deflate(x=None):
    tt = t_(1.0); f = 700 * np.exp(-tt * 2.5) + 120; return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * env_adsr(len(tt), .02, .4) * .5 + .2 * bp(noise(1.0), 400, 1500) * np.exp(-tt * 2), .45)
def fx_riser(x):
    d = x.get('dur', 3); tt = t_(d); f = 110 * (1 + tt / d)
    tone = sum(np.sin(2 * np.pi * np.cumsum(f * m) / SR) / m for m in (1, 2, 3))
    return norm((tone * .4 + bp(noise(d), 600, 4000) * .3 * (tt / d)) * env_adsr(len(tt), d * .8, .15), .4)
def fx_pad_swell(x):
    d = x.get('dur', 4); tt = t_(d)
    tone = sum(np.sin(2 * np.pi * f * tt + np.sin(tt * .7 + i)) for i, f in enumerate((220, 277.2, 329.6, 440)))
    return norm(lp(tone, 2000) * env_adsr(len(tt), d * .4, d * .4, 1.5), .3)
def fx_dream(x):
    d = x.get('dur', 2.5); a = fx_pad_swell({'dur': d}); s = fx_shimmer(); n = min(len(a), len(s)); a[:n] += .6 * s[:n]; return a
def fx_bubble_pop(x=None):
    tt = t_(.25); f = 500 + 1800 * tt / .25; return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 25) + .4 * hp(noise(.25), 2000) * np.exp(-tt * 60), .5)
def fx_zap(x=None):     tt = t_(.5); return norm(np.sign(np.sin(2 * np.pi * (120 + 40 * np.sin(tt * 90)) * tt)) * lp(np.ones(len(tt)), 50) * np.exp(-tt * 6), .25)
def fx_zap_soft(x=None): tt = t_(.8); return norm(np.sin(2 * np.pi * 60 * tt) * (1 + .5 * np.sin(2 * np.pi * 120 * tt)) * env_adsr(len(tt), .1, .5), .35)
def fx_rewind(x):
    d = x.get('dur', 5); tt = t_(d); f = 600 + 900 * (tt / d) ** 2
    return norm((sweep_noise(d, 400, 4000, 2) * .5 + .25 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * env_adsr(len(tt), .5, 1.0), .45)
def fx_flap(x=None):
    out = np.zeros(int(1.3 * SR))
    for i in range(16): s = fx_tick() * .7; p = int((i * .06 + (i / 16) ** 2 * .3) * SR); out[p:p + len(s)] += s
    return out
def fx_flapseq(x):
    d = x.get('dur', 3); out = np.zeros(int((d + .2) * SR)); tt = 0
    while tt < d: s = fx_tick() * .5; p = int(tt * SR); out[p:p + len(s)] += s; tt += .07
    return out
def fx_boing_soft(x=None): tt = t_(.6); f = 300 + 80 * np.sin(2 * np.pi * 9 * tt) * np.exp(-tt * 4); return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 5), .3)
def fx_tv_on(x=None):   tt = t_(.4); return norm(hp(noise(.4), 5000) * np.exp(-tt * 12) * .5 + np.sin(2 * np.pi * 15700 * tt) * .05, .35)
def fx_buzzer_soft(x=None): tt = t_(.7); return norm(lp(np.sign(np.sin(2 * np.pi * 220 * tt)), 1200) * env_adsr(len(tt), .02, .2), .25)
def fx_click(x=None):   tt = t_(.08); return norm(hp(noise(.08), 2500) * np.exp(-tt * 140), .55)
def fx_door_chime(x=None): return norm(M(bell(1318, 1.4), np.concatenate([np.zeros(int(.35 * SR)), bell(1046, 1.05)])), .4)
def fx_news_sting(x=None):
    tt = t_(1.6); out = np.zeros(len(tt))
    for i, f in enumerate((392, 523, 659)): s = bell(f, 1.2, partials=((1, 1), (2, .5), (3, .3), (4, .2)), k=2.5) * .5; p = int(i * .12 * SR); out[p:p + len(s)] += s
    return norm(M(out, (.3, fx_boom()[:len(tt)])), .55)
def fx_beeps(x=None):
    out = np.zeros(int(1.5 * SR))
    for i in range(4): tt = t_(.08); s = np.sin(2 * np.pi * 1600 * tt) * env_adsr(len(tt), .005, .02) * .4; p = int(i * .35 * SR); out[p:p + len(s)] += s
    return out
def fx_typing(x):
    d = x.get('dur', 2); out = np.zeros(int((d + .2) * SR)); tt = 0
    while tt < d: s = fx_pin() * (.5 + .5 * rng.random()); p = int(tt * SR); out[p:p + len(s)] += s; tt += .06 + rng.random() * .12
    return out
def fx_steps(x):
    d = x.get('dur', 2); out = np.zeros(int((d + .3) * SR)); tt = 0
    while tt < d: s = fx_thud_soft()[:int(.25 * SR)] * .35; p = int(tt * SR); out[p:p + len(s)] += s; tt += .48
    return out
def fx_sand(x):          d = x.get('dur', 3); return norm(hp(noise(d), 3000) * .4, .15) * env_adsr(int(d * SR), .5, .5)
def fx_clock(x):
    d = x.get('dur', 3); out = np.zeros(int((d + .2) * SR)); tt = 0; k = 0
    while tt < d: s = fx_tick()[:int(.04 * SR)] * (.5 if k % 2 else .35); p = int(tt * SR); out[p:p + len(s)] += s; tt += .5; k += 1
    return out
def fx_slices(x):
    d = x.get('dur', 3); out = np.zeros(int((d + .3) * SR)); tt = 0
    while tt < d: s = fx_snip() * .3; p = int(tt * SR); out[p:p + len(s)] += s; tt += max(.08, .5 * (1 - tt / d))
    return out
def fx_mail(x):
    d = x.get('dur', 3); out = np.zeros(int((d + .5) * SR)); tt = 0
    while tt < d: s = fx_paper() * .4; p = int(tt * SR); out[p:p + len(s)] += s; tt += .12 + rng.random() * .2
    return out
# ambiences (looped noise beds)
def amb(d, lo, hi, g=.25, mod=.2):
    tt = t_(d); return norm(bp(noise(d), lo, hi), g) * (1 - mod + mod * np.sin(2 * np.pi * .3 * tt)) * env_adsr(len(tt), min(.6, d / 3), min(.8, d / 3))
def fx_hum(x):      d = x.get('dur', 3); tt = t_(d); return (norm(np.sin(2 * np.pi * 60 * tt) + .4 * np.sin(2 * np.pi * 120 * tt), .12) + amb(d, 200, 900, .05)) * env_adsr(len(tt), .5, .5)
def fx_crowd(x):    d = x.get('dur', 3); return amb(d, 250, 2500, .22, .3)
def fx_city(x):     d = x.get('dur', 3); return amb(d, 80, 1200, .25, .1)
def fx_night(x):
    d = x.get('dur', 3); tt = t_(d); cr = np.sin(2 * np.pi * 4200 * tt) * ((np.sin(2 * np.pi * 7 * tt) > .7) * (np.sin(2 * np.pi * .5 * tt) > 0))
    return M(amb(d, 100, 700, .12), norm(cr, .05) * env_adsr(len(tt), .5, .5))
def fx_crickets(x): return fx_night(x) * 1.6
def fx_wind(x):     d = x.get('dur', 3); return amb(d, 150, 1200, .28, .5)
def fx_stadium(x):  d = x.get('dur', 3); return amb(d, 300, 3000, .25, .35)
def fx_office(x):   d = x.get('dur', 3); return M(amb(d, 150, 1500, .1), (.3, fx_typing({'dur': d})))
def fx_gym(x):      d = x.get('dur', 3); return amb(d, 100, 2000, .15)
def fx_store(x):    d = x.get('dur', 3); return M(amb(d, 150, 1800, .14), (.5, fx_hum({'dur': d})))
def fx_lab(x):      d = x.get('dur', 3); return M(amb(d, 400, 4000, .08), (.4, fx_hum({'dur': d})))
def fx_chuckles(x):
    d = x.get('dur', 3); out = amb(d, 300, 2500, .12)
    for _ in range(int(d * 2)):
        n = int(.5 * SR); tt = t_(.5); s = np.sin(2 * np.pi * (180 + rng.random() * 120) * tt) * (np.sin(2 * np.pi * 7 * tt) > 0) * env_adsr(n, .05, .3) * .12
        p = int(rng.random() * (d - .5) * SR); out[p:p + n] += lp(s, 1500)
    return out
# ---------------- the one aggressive sound: F1 pass-by ----------------
def fx_f1pass(x=None):
    d = 2.6; tt = t_(d); tc = 1.05  # closest approach
    v = 85.0; dist = np.sqrt(((tt - tc) * v) ** 2 + 6 ** 2)
    vr = (tt - tc) * v * v / dist          # radial velocity
    dop = 343 / (343 + vr)                 # doppler factor
    rpm_f = 520 + 60 * np.sin(2 * np.pi * 1.3 * tt)  # V6 hybrid scream ~ 10-12k rpm fundamental
    phase = 2 * np.pi * np.cumsum(rpm_f * dop) / SR
    eng = sum(np.sin(m * phase) / (m ** .7) for m in (1, 2, 3, 4, 5, 6, 8))
    eng = np.tanh(eng * 2.2)               # grit / distortion
    eng = lp(eng, 7000) + .25 * hp(noise(d), 2500) * np.exp(-((tt - tc) / .35) ** 2)
    amp = 1 / (1 + (dist / 10) ** 2) ** .5
    pan = np.clip((tt - tc) * 1.6, -1, 1)
    m = norm(eng * amp, 1.0) * env_adsr(len(tt), .05, .4, 1)
    return np.stack([m * np.sqrt((1 - pan) / 2), m * np.sqrt((1 + pan) / 2)], 1)

FX = {k[3:]: v for k, v in globals().items() if k.startswith('fx_')}
AMBIENT = {'hum', 'crowd', 'city', 'night', 'crickets', 'wind', 'stadium', 'office', 'gym', 'store', 'lab', 'chuckles', 'sand', 'clock', 'riser', 'pad_swell'}

# ---------------- cyber-thriller additions (TikTok Zeus) ----------------
def fx_error(x=None):
    out = np.zeros(int(.7 * SR))
    for i, f in enumerate((520, 390)): tt = t_(.22); s = np.sign(np.sin(2 * np.pi * f * tt)) * env_adsr(len(tt), .005, .05) * .5; p = int(i * .25 * SR); out[p:p + len(s)] += lp(s, 2500)
    return norm(out, .5)
def fx_glitch(x=None):
    d = .45; n = noise(d); tt = t_(d); crush = np.round(n * 3) / 3 * (np.sin(2 * np.pi * 37 * tt) > 0)
    return norm(hp(crush, 600) * env_adsr(len(tt), .005, .15) + .4 * np.sign(np.sin(2 * np.pi * 180 * tt)) * (rng.random(len(tt)) > .5) * np.exp(-tt * 8), .5)
def fx_heartbeat(x):
    d = x.get('dur', 2); out = np.zeros(int((d + .5) * SR)); tt = 0
    while tt < d:
        for off, g in ((0, 1), (.22, .7)):
            s = fx_thud_soft()[:int(.35 * SR)] * g * .8; p = int((tt + off) * SR); out[p:p + len(s)] += s
        tt += .9
    return out
def fx_drone(x):
    d = x.get('dur', 4); tt = t_(d)
    tone = sum(np.sin(2 * np.pi * f * tt + .3 * np.sin(tt * (.2 + i * .07))) / (i + 1) for i, f in enumerate((55, 82.4, 110, 164.8)))
    return norm(lp(tone + .3 * bp(noise(d), 60, 300), 900) * env_adsr(len(tt), min(1.5, d / 3), min(1.5, d / 3)), .35)
def fx_alarm(x):
    d = x.get('dur', 2); tt = t_(d); f = 700 + 250 * (np.sin(2 * np.pi * 2.2 * tt) > 0)
    return norm(lp(np.sin(2 * np.pi * np.cumsum(f) / SR), 3000) * env_adsr(len(tt), .05, .4), .3)
def fx_data(x):
    d = x.get('dur', 2); out = np.zeros(int((d + .2) * SR)); tt = 0
    while tt < d:
        f = 1200 + rng.random() * 2600; s = np.sin(2 * np.pi * f * t_(.04)) * env_adsr(int(.04 * SR), .003, .02) * .25; p = int(tt * SR); out[p:p + len(s)] += s; tt += .03 + rng.random() * .05
    return out
def fx_powerdown(x=None):
    tt = t_(1.4); f = 900 * np.exp(-tt * 2.2) + 40
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * env_adsr(len(tt), .01, .5) + .2 * lp(noise(1.4), 500) * np.exp(-tt * 3), .5)
def fx_sonar(x):
    d = x.get('dur', 3); out = np.zeros(int((d + 1.5) * SR)); tt = 0
    while tt < d: s = bell(1180, 1.3, partials=((1, 1), (2.01, .2)), k=3) * .35; p = int(tt * SR); out[p:p + len(s)] += s; tt += 1.2
    return out
def fx_cuffs(x=None):
    out = np.zeros(int(.6 * SR))
    for i in range(5): s = bell(3200 + rng.random() * 1500, .15, partials=((1, 1), (2.6, .5)), k=30) * .4; p = int(i * .045 * SR); out[p:p + len(s)] += s
    return out + M(np.zeros(1), (.6, fx_click()))[:1].sum() * 0
def fx_cell(x=None):
    tt = t_(1.6); clang = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt * k) for f, k in ((180, 3), (433, 4), (871, 6), (1290, 8)))
    return norm(clang + .5 * lp(noise(1.6), 2000) * np.exp(-tt * 25), .6)
def fx_rain(x):  d = x.get('dur', 3); return amb(d, 1500, 9000, .2, .1)
def fx_shatter(x=None):
    tt = t_(1.2); out = hp(noise(1.2), 2500) * np.exp(-tt * 5) * .6
    for _ in range(18): s = bell(2000 + rng.random() * 5000, .4, partials=((1, 1), (2.7, .4)), k=12) * .2; p = int(rng.random() * .6 * SR); out[p:p + len(s)] += s
    return norm(out, .55)
def fx_vault(x=None):
    out = np.zeros(int(2 * SR))
    for i in range(6): s = fx_tick()[:int(.05 * SR)] * .5; p = int(i * .12 * SR); out[p:p + len(s)] += s
    s = fx_gavel() * .6; p = int(.9 * SR); out[p:p + len(s)] += s[:len(out) - p]
    return out
FX.update({k[3:]: v for k, v in list(globals().items()) if k.startswith('fx_')})
AMBIENT.update({'drone', 'rain', 'heartbeat', 'sonar', 'data', 'alarm'})

# ---------------- Bitfinex additions ----------------
def fx_knock(x=None):
    out = np.zeros(int(.6 * SR))
    for i in range(3): tt = t_(.12); s = (lp(noise(.12), 900) * np.exp(-tt * 45) + .8 * np.sin(2 * np.pi * 120 * tt) * np.exp(-tt * 30)); p = int(i * .17 * SR); out[p:p + len(s)] += s
    return norm(out, .8)
def fx_siren(x):
    d = x.get('dur', 3); tt = t_(d); f = 750 + 300 * np.sin(2 * np.pi * .9 * tt)
    return norm(lp(np.sin(2 * np.pi * np.cumsum(f) / SR) + .3 * np.sin(4 * np.pi * np.cumsum(f) / SR), 2500) * env_adsr(len(tt), .5, .6), .22)
def fx_washer(x):
    d = x.get('dur', 3); tt = t_(d); hum = np.sin(2 * np.pi * 70 * tt) * (.6 + .4 * np.sin(2 * np.pi * 1.5 * tt))
    out = .35 * hum + bp(noise(d), 200, 1200) * .3
    for k in np.arange(.2, d, .45): s = fx_clink() * .25; p = int(k * SR); out[p:p + len(s)] += s[:len(out) - p]
    return norm(out * env_adsr(len(tt), .3, .4), .45)
def fx_gold(x=None):
    out = np.zeros(int(1.8 * SR))
    for i in range(5): s = bell(1700 + i * 140, .9, partials=((1, 1), (2.3, .5), (4.1, .2)), k=6) * .3; p = int(i * .15 * SR); out[p:p + len(s)] += s
    return norm(out, .5)
def fx_unlock(x=None):
    out = np.zeros(int(.6 * SR)); s1 = fx_click(); out[:len(s1)] += s1; s2 = bell(1400, .4, k=10) * .4; p = int(.15 * SR); out[p:p + len(s2)] += s2
    return norm(out, .6)
FX.update({k[3:]: v for k, v in list(globals().items()) if k.startswith('fx_')})
AMBIENT.update({'siren', 'washer'})

# ---------------- "The bottle" additions (calm) ----------------
def fx_glass(x=None):
    tt = t_(1.4); out = hp(noise(1.4), 3000) * np.exp(-tt * 9) * .35
    for _ in range(14): s = bell(2500 + rng.random() * 4000, .6, partials=((1, 1), (2.6, .35)), k=9) * .16; p = int(rng.random() * .4 * SR); out[p:p + len(s)] += s
    return norm(lp(out, 9000), .45)
def fx_lofi(x):  # muffled music heard through headphones
    d = x.get('dur', 4); tt = t_(d); out = np.zeros(len(tt)); beat = .52
    chords = [(220, 261.6, 329.6), (196, 246.9, 293.7), (174.6, 220, 261.6), (196, 246.9, 311.1)]
    for i, k in enumerate(np.arange(0, d, beat)):
        p = int(k * SR); n = min(int(.18 * SR), len(out) - p)
        if n <= 0: break
        kick = np.sin(2 * np.pi * (60 + 60 * np.exp(-t_(n / SR) * 30)) * t_(n / SR)) * np.exp(-t_(n / SR) * 18); out[p:p + n] += kick[:n] * (.6 if i % 2 == 0 else .25)
    for i, k in enumerate(np.arange(0, d, beat * 4)):
        ch = chords[i % 4]; p = int(k * SR); n = min(int(beat * 4 * SR), len(out) - p); tt2 = t_(n / SR)
        out[p:p + n] += sum(np.sin(2 * np.pi * f * tt2) for f in ch)[:n] * .12 * env_adsr(n, .05, .3)
    return norm(lp(out, 900), .3) * env_adsr(len(out), .3, .4)
def fx_static(x):
    d = x.get('dur', 3); tt = t_(d); return norm(bp(noise(d), 1500, 7000) * (.6 + .4 * np.sin(2 * np.pi * 50 * tt)), .12) * env_adsr(len(tt), .2, .3)
def fx_zipper(x=None):
    d = .7; tt = t_(d); return norm(bp(noise(d), 2000, 6000) * (np.abs(np.sin(2 * np.pi * 40 * tt)) ** 4) * env_adsr(len(tt), .05, .15), .35)
FX.update({k[3:]: v for k, v in list(globals().items()) if k.startswith('fx_')})
AMBIENT.update({'lofi', 'static'})


def read_wav(path):
    w = wave.open(path); n = w.getnframes(); ch = w.getnchannels(); sr = w.getframerate()
    a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768
    a = a.reshape(-1, ch); assert sr == SR, sr
    return a if ch == 2 else np.repeat(a, 2, 1)


def main():
    voice = read_wav('out/voice.wav'); N = len(voice)
    cues = json.load(open('sfx_cues.json'))
    bus = np.zeros((N + SR * 4, 2)); f1 = np.zeros_like(bus)
    for c in cues:
        name = c['name']; fn = FX.get(name)
        if fn is None: print('missing fx', name); continue
        x = c.get('x') or {}
        s = fn(x) if name in ('ticks', 'ticks_down', 'fizz', 'riser', 'pad_swell', 'dream', 'rewind', 'flapseq', 'typing', 'steps', 'sand', 'clock', 'slices', 'mail', 'pages', 'shutters', 'popseq') or name in AMBIENT else fn(x)
        s = np.asarray(s, dtype=np.float64)
        if s.ndim == 1:
            pan = (rng.random() - .5) * .5; s = np.stack([s * np.sqrt((1 - pan) / 2), s * np.sqrt((1 + pan) / 2)], 1) * 1.41
        g = c['g'] * (0.8 if name in AMBIENT else 1.0)
        p = int(c['t'] * SR); p = max(0, p); e = min(len(bus), p + len(s))
        (f1 if name == 'f1pass' else bus)[p:e] += s[:e - p] * g
    # ducking: lower effects while the narrator speaks
    vm = np.abs(voice).mean(1); win = int(.05 * SR)
    envv = np.convolve(vm, np.ones(win) / win, 'same'); envv = lp(envv, 4)
    duck = 1 - .6 * np.clip(envv / .05, 0, 1)
    duck = np.concatenate([duck, np.ones(len(bus) - N)])
    bus *= duck[:, None]; f1 *= (1 - .35 * (1 - duck))[:, None]
    # ambient pad bed: soft evolving chord, very quiet
    tt = np.arange(len(bus)) / SR; chords = [(110, 164.8, 220, 277.2), (98, 146.8, 196, 246.9), (87.3, 130.8, 174.6, 220), (103.8, 155.6, 207.7, 261.6)]
    pad = np.zeros(len(bus)); seg = 16.0
    for i, ch in enumerate(chords):
        sel = ((tt // seg) % len(chords)) == i
        w = np.clip(1 - np.abs(((tt % seg) / seg) - .5) * 2.2 + .6, 0, 1)
        pad += sel * w * sum(np.sin(2 * np.pi * f * tt + np.sin(tt * .2 + k)) for k, f in enumerate(ch))
    pad = lp(pad, 900) / 4 * .045
    mix = voice[:N] * 1.0 + bus[:N] * .9 + f1[:N] * .62 + np.stack([pad[:N], pad[:N]], 1) * duck[:N, None] ** .5
    mix = np.tanh(mix * 1.1) / 1.1
    out = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
    w = wave.open('out/mix.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes()); w.close()
    print('mixed', len(cues), 'cues,', N / SR, 's')


if __name__ == '__main__':
    main()
