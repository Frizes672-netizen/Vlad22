# placeholder word timings (until the real voice-over arrives): ~2.6 words/s with punctuation pauses
import json, re
txt = open('script.txt').read().split()
t = 0.0; out = []
norm = lambda w: re.sub(r"[^0-9a-zа-я]", "", w.lower())
for w in txt:
    n = norm(w)
    if not n: continue
    out.append({'w': n, 't': round(t, 2)})
    t += min(.62, max(.22, .16 + .045 * len(n) + (.25 if n.isdigit() else 0)))
    if w.endswith((',', '—')): t += .2
    if w.endswith(('.', '?', '!')): t += .38
    if n == 'seconds': t += 5.0
    if '…' in w: t += .45
json.dump({'words': out, 'd1': t + .4, 'd2': 0}, open('words.json', 'w'))
print(len(out), round(t, 2))
