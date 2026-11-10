#!/bin/bash
# Insert an ad banner into a finished short: the video FREEZES at time T, the frozen frame is softly blurred and dimmed,
# the banner plays on top (centred, clearly visible) with its own sound matched to the loudness of the voice-over,
# then the video resumes exactly where it stopped. Output: 1080x1920 H.264 High 4.1, bt709, 2-pass (iPhone-friendly).
#   usage: tools/insert_banner.sh <video.mp4> <banner.(mp4|mov|png|jpg)> <T seconds> <out.mp4> [banner_audio.(mp3|wav)]
set -e
IN=$1; BAN=$2; T=$3; OUT=$4; BAUD=$5
W=$(mktemp -d); trap 'rm -rf "$W"' EXIT
dur() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
# loudness of the main video's voice → the banner is normalised to the same integrated loudness
LUFS=$(ffmpeg -hide_banner -i "$IN" -af ebur128 -f null - 2>&1 | awk '/I:/{v=$2} END{print v}'); LUFS=${LUFS:--16}
ffmpeg -y -v error -ss "$T" -i "$IN" -frames:v 1 "$W/still.png"
case "${BAN,,}" in
  *.png|*.jpg|*.jpeg|*.webp) [ -n "$BAUD" ] || { echo "image banner needs an audio file as 5th argument"; exit 1; }; BD=$(dur "$BAUD")
    ffmpeg -y -v error -loop 1 -t "$BD" -i "$W/still.png" -loop 1 -t "$BD" -i "$BAN" -i "$BAUD" -filter_complex \
      "[0]scale=1080:1920,boxblur=18:2,eq=brightness=-0.12[bg];[1]scale=960:-1[b];[bg][b]overlay=(W-w)/2:(H-h)/2,format=yuv420p[v];[2]loudnorm=I=${LUFS}:TP=-1.5:LRA=11,aresample=44100,aformat=channel_layouts=stereo[a]" \
      -map "[v]" -map "[a]" -r 30 -c:v libx264 -crf 16 -c:a pcm_s16le "$W/ad.mov" ;;
  *) BD=$(dur "$BAN"); HAS_A=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$BAN" | head -1)
    if [ -n "$BAUD" ]; then AIN="-i $BAUD"; AMAP="[2]"; elif [ -n "$HAS_A" ]; then AIN=""; AMAP="[1:a]"; else echo "banner has no sound — pass an audio file"; exit 1; fi
    KEY=${KEY:-0x00FF01}   # green-screen colour of the banner (removed); set KEY=none to keep the background
    if [ "$KEY" = none ]; then KF="format=rgba"; else KF="chromakey=${KEY}:0.16:0.05,despill=type=green,format=rgba"; fi
    F=0.3; E=$(python3 -c "print(max(0.01, $BD - $F))")
    ffmpeg -y -v error -loop 1 -t "$BD" -i "$W/still.png" -i "$BAN" $AIN -filter_complex \
      "[0]scale=1080:1920,split=3[s0][s1][s2];[s1]boxblur=22:2,eq=brightness=-0.14:saturation=0.85[bl];[s0]trim=0:$F,setpts=PTS-STARTPTS[sh];[bl]trim=0:$BD,setpts=PTS-STARTPTS[blv];[sh][blv]xfade=transition=fade:duration=$F:offset=0[bgA];[s2]trim=0:$F,setpts=PTS-STARTPTS[sh2];[bgA][sh2]xfade=transition=fade:duration=$F:offset=$E[bg];
       [1:v]${KF},scale=1000:-2,setsar=1,split[b][bs];[bs]colorchannelmixer=rr=0:gg=0:bb=0:aa=0.55,boxblur=24:2[shadow];[bg][shadow]overlay=(W-w)/2:(H-h)/2+26[bg2];[bg2][b]overlay=(W-w)/2:(H-h)/2,format=yuv420p,trim=0:$BD,setpts=PTS-STARTPTS[v];
       ${AMAP}loudnorm=I=${LUFS}:TP=-1.5:LRA=11,aresample=44100,aformat=channel_layouts=stereo,atrim=0:$BD,apad=whole_dur=$BD[a]" \
      -map "[v]" -map "[a]" -r 30 -c:v libx264 -crf 16 -c:a pcm_s16le -t "$BD" "$W/ad.mov" ;;
esac
# split the main video at T and glue: part 1 → ad (frozen + blurred background) → part 2
ffmpeg -y -v error -i "$IN" -t "$T" -r 30 -c:v libx264 -crf 16 -c:a pcm_s16le -ar 44100 -ac 2 "$W/p1.mov"
ffmpeg -y -v error -ss "$T" -i "$IN" -r 30 -c:v libx264 -crf 16 -c:a pcm_s16le -ar 44100 -ac 2 "$W/p2.mov"
ffmpeg -y -v error -i "$W/p1.mov" -i "$W/ad.mov" -i "$W/p2.mov" -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -crf 14 -c:a pcm_s16le "$W/all.mov"
for pass in 1 2; do ffmpeg -y -v error -i "$W/all.mov" -c:v libx264 -preset slow -b:v 4500k -maxrate 7000k -bufsize 10000k -profile:v high -level:v 4.1 -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -pass $pass -passlogfile "$W/pl" -c:a aac -b:a 192k -ar 44100 -movflags +faststart $( [ $pass = 1 ] && echo "-an -f mp4 /dev/null" || echo "$OUT" ); done
ffmpeg -v error -i "$OUT" -f null - && echo "OK: $(dur "$OUT") s, banner ${BD}s at ${T}s, loudness ${LUFS} LUFS"
