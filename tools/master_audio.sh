#!/bin/bash
# Voice-first mastering for Shorts/TikTok: rumble cut, gentle compression, presence lift, two-pass loudness to -14 LUFS / -1 dBTP.
#   usage: tools/master_audio.sh <in.wav> <out.wav>
set -e; IN=$1; OUT=$2
PRE="highpass=f=70,lowpass=f=15500,acompressor=threshold=-22dB:ratio=2.6:attack=8:release=160:makeup=1.6,equalizer=f=220:t=q:w=1.1:g=-1.5,equalizer=f=3200:t=q:w=1.2:g=2.2,equalizer=f=9000:t=h:w=0.7:g=-1"
J=$(ffmpeg -hide_banner -i "$IN" -af "$PRE,loudnorm=I=-14:TP=-1:LRA=9:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$J" | python3 -c "import json,sys; print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -v error -i "$IN" -af "$PRE,loudnorm=I=-14:TP=-1:LRA=9:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=44100" -ar 44100 -ac 2 "$OUT"
echo "mastered: $(ffmpeg -hide_banner -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E ' I:| Peak:' | tr -s ' ' | tr '\n' ' ')"
