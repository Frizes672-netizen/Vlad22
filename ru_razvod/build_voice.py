# voice.mp3 = [hook phrase | placeholder] + VASKO take (x1.07) with 4.3 s of silence after "секунд"; words.json follows the same edits
import json, subprocess, sys, os, re
TEMPO, PAUSE, HOOK_PH = 1.07, 4.3, 4.6
hook = sys.argv[1] if len(sys.argv) > 1 else None
W = json.load(open('/home/user/asr/words_razvod.json'))['words']
i = next(k for k, w in enumerate(W) if w['w'] == 'секунд'); cut_raw = (W[i]['t'] + W[i + 1]['t']) / 2 + .05   # inside the pause after "секунд"
cut = cut_raw / TEMPO
def sh(*a): subprocess.run(a, check=True)
sh('ffmpeg', '-y', '-v', 'error', '-i', 'voice_raw.mp3', '-af', f'atempo={TEMPO}', '-ar', '44100', '-ac', '2', 'out/v_fast.wav')
if hook:
    sh('ffmpeg', '-y', '-v', 'error', '-i', hook, '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo=%s' % TEMPO, '-ar', '44100', '-ac', '2', 'out/hook.wav')
    hd = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'out/hook.wav'])) + .35
    sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/hook.wav', '-af', f'apad=whole_dur={hd}', 'out/hook_p.wav')
else:
    hd = HOOK_PH; sh('ffmpeg', '-y', '-v', 'error', '-f', 'lavfi', '-i', f'anullsrc=r=44100:cl=stereo', '-t', str(hd), 'out/hook_p.wav')
sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/hook_p.wav', '-i', 'out/v_fast.wav', '-f', 'lavfi', '-t', str(PAUSE), '-i', 'anullsrc=r=44100:cl=stereo', '-filter_complex',
   f'[1]atrim=0:{cut},asetpts=N/SR/TB[a];[1]atrim={cut},asetpts=N/SR/TB[b];[0][a][2][b]concat=n=4:v=0:a=1[o]', '-map', '[o]', '-ar', '44100', 'out/voice.wav')
sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/voice.wav', '-c:a', 'libmp3lame', '-b:a', '192k', 'voice.mp3')
out = []
hook_words = open('script.txt').read().split('\n\n')[0].split()
if hook:  # recognise the trimmed + sped-up hook take itself, so its word times are already final
    sh('ffmpeg', '-y', '-v', 'error', '-i', 'out/hook.wav', '-ac', '1', '-ar', '16000', '/home/user/asr/hook.wav')
    subprocess.run(['python3', 'asr_hook.py'], cwd='/home/user/asr', check=True, stdout=subprocess.DEVNULL)
    for w in json.load(open('/home/user/asr/words_hook.json'))['words']: out.append({'w': w['w'], 't': round(w['t'], 2)})
else:  # placeholder timings across the reserved slot
    n = len(hook_words); out += [{'w': re.sub(r'[^0-9a-zа-яё]', '', x.lower()), 't': round(.05 + (hd - .5) * k / n, 2)} for k, x in enumerate(hook_words)]
for w in W:
    t = w['t'] / TEMPO; t += PAUSE if t > cut else 0; out.append({'w': w['w'], 't': round(t + hd, 2)})
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'out/voice.wav']))
json.dump({'words': out, 'd1': dur, 'd2': 0}, open('words.json', 'w'), ensure_ascii=False)
print('hook', round(hd, 2), 'cut', round(cut + hd, 2), 'total', round(dur, 2))
