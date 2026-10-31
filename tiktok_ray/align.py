import json, re, difflib
W=json.load(open('words.json')); asr=W['words']; total=W['d1']+W['d2']
def norm(w): return re.sub(r"[^0-9a-zа-я]","",w.lower().replace("ё","е"))
paras=[p.strip() for p in open('script.txt').read().split('\n\n') if p.strip()]
# sentence units (keep paragraph id)
units=[]
for pi,p in enumerate(paras):
    for s in re.split(r'(?<=[.?!:])\s+(?=[A-ZА-ЯЁ"“])',p):
        if s.strip(): units.append({'p':pi,'text':s.strip()})
sw=[]; owner=[]
for ui,u in enumerate(units):
    for w in u['text'].split():
        n=norm(w)
        if n: sw.append(n); owner.append(ui)
aw=[norm(x['w']) for x in asr]
sm=difflib.SequenceMatcher(None,sw,aw,autojunk=False)
t=[None]*len(sw)
for a,b,n in sm.get_matching_blocks():
    for k in range(n): t[a+k]=asr[b+k]['t']
# interpolate gaps
known=[i for i,v in enumerate(t) if v is not None]
for i in range(len(t)):
    if t[i] is None:
        lo=max([k for k in known if k<i],default=None); hi=min([k for k in known if k>i],default=None)
        if lo is None: t[i]=0
        elif hi is None: t[i]=t[lo]+.3*(i-lo)
        else: t[i]=t[lo]+(t[hi]-t[lo])*(i-lo)/(hi-lo)
matched=sum(1 for a,b,n in sm.get_matching_blocks() for _ in range(n))
for ui,u in enumerate(units):
    idx=[i for i,o in enumerate(owner) if o==ui]
    u['start']=round(t[idx[0]],2); u['words']=[[sw[i],round(t[i],2)] for i in idx]
for i,u in enumerate(units): u['end']=units[i+1]['start'] if i+1<len(units) else round(total,2)
json.dump({'total':total,'units':units},open('timeline.json','w'),indent=0)
print('script words',len(sw),'matched',matched,'units',len(units),'total',total)
for u in units[:20]+units[-5:]: print(f"{u['start']:7.2f} {u['text'][:80]}")
