#!/bin/bash
# concat render segments + mix → iPhone-friendly 1080×1920 H.264 High 4.1, bt709, 2-pass (~9 Mbit/s)
set -e; cd "$(dirname "$0")"; OUT=${1:-out/RazvodIliNet_01.mp4}
: > out/list.txt; for i in 0 1 2 3; do echo "file 'seg_$i.mp4'" >> out/list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i out/list.txt -c copy out/video.mp4
../tools/master_audio.sh out/mix.wav out/mix_master.wav
for pass in 1 2; do
  ffmpeg -y -v error -i out/video.mp4 -i out/mix_master.wav -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 4500k -maxrate 7000k -bufsize 10000k -profile:v high -level:v 4.1 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -pass $pass -passlogfile out/pl -c:a aac -b:a 192k -ar 44100 -movflags +faststart -shortest $( [ $pass = 1 ] && echo "-an -f mp4 /dev/null" || echo "$OUT" )
done
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT"
