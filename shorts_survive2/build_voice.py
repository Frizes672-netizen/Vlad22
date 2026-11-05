# voice.mp3 = [hook phrase | placeholder] + VASKO take (x1.07) with 4.3 s of silence after "секунд"; words.json follows the same edits
import json, subprocess, sys, os, re
TEMPO, PAUSE, HOOK_PH = 1.1, 2.4, 4.6
hook = sys.argv[1] if len(sys.argv) > 1 else None
NOHOOK = hook == 'none'
if NOHOOK: hook = None
W = json.load(open('/home/user/asr/words_ice_en.json'))['words']
PW, PREV, ENDW = os.environ.get('PAUSE_WORD', 'seconds'), os.environ.get('PAUSE_PREV', 'three'), os.environ.get('END_WORD', '')
i = next(k for k, w in enumerate(W) if w['w'] == PW and k and W[k - 1]['w'] == PREV); cut_raw = (W[i]['t'] + W[i + 1]['t']) / 2 + .05   # inside the pause after "three seconds"
END_RAW = None
if ENDW:  # drop anything recorded after the last scripted word (e.g. a read-out pinned-comment poll)
    e = max(k for k, w in enumerate(W) if w['w'] == ENDW); END_RAW = (W[e]['t'] + W[e + 1]['t']) / 2 if e + 1 < len(W) else None
    W = W[:e + 1]
cut = cut_raw / TEMPO
def sh(*a): subprocess.run(a, check=True)
sh('ffmpeg', '-y', '-v', 'error', '-i', 'voice_raw.mp3', *(['-t', str(END_RAW)] if END_RAW else []), '-af', f'atempo={TEMPO}' + (',afade=t=out:st=%f:d=0.25' % (END_RAW / TEMPO - .25) if END_RAW else ''), '-ar', '44100', '-ac', '2', 'out/v_fast.wav')
if hook:
    sh('ffmpeg', '-y', '-v', 'error', '-i', hook, '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo=%s' % TEMPO, '-ar', '44100', '-ac', '2', 'out/hook.wav')
    hd = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'out/hook.wav'])) + .35
    sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/hook.wav', '-af', f'apad=whole_dur={hd}', 'out/hook_p.wav')
else:
    hd = 0 if NOHOOK else HOOK_PH; sh('ffmpeg', '-y', '-v', 'error', '-f', 'lavfi', '-i', f'anullsrc=r=44100:cl=stereo', '-t', str(max(hd, .01)), 'out/hook_p.wav')
sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/hook_p.wav', '-i', 'out/v_fast.wav', '-f', 'lavfi', '-t', str(PAUSE), '-i', 'anullsrc=r=44100:cl=stereo', '-filter_complex',
   f'[1]atrim=0:{cut},asetpts=N/SR/TB[a];[1]atrim={cut},asetpts=N/SR/TB[b];[0][a][2][b]concat=n=4:v=0:a=1[o]', '-map', '[o]', '-ar', '44100', 'out/voice.wav')
sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/voice.wav', '-c:a', 'libmp3lame', '-b:a', '192k', 'voice.mp3')
out = []
hook_words = open('script.txt').read().split('\n\n')[0].split()
if hook:  # recognise the trimmed + sped-up hook take itself, so its word times are already final
    sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/hook.wav', '-ac', '1', '-ar', '16000', '/home/user/asr/hook.wav')
    subprocess.run(['python3', 'asr_hook.py'], cwd='/home/user/asr', check=True, stdout=subprocess.DEVNULL)
    for w in json.load(open('/home/user/asr/words_hook.json'))['words']: out.append({'w': w['w'], 't': round(w['t'], 2)})
elif not NOHOOK:  # placeholder timings across the reserved slot
    n = len(hook_words); out += [{'w': re.sub(r'[^0-9a-zа-яё]', '', x.lower()), 't': round(.05 + (hd - .5) * k / n, 2)} for k, x in enumerate(hook_words)]
for w in W:
    t = w['t'] / TEMPO; t += PAUSE if t > cut else 0; out.append({'w': w['w'], 't': round(t + hd, 2)})
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'out/voice.wav']))
json.dump({'words': out, 'd1': dur, 'd2': 0}, open('words.json', 'w'), ensure_ascii=False)
print('hook', round(hd, 2), 'cut', round(cut + hd, 2), 'total', round(dur, 2))
