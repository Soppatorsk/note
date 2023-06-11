#!/bin/bash
#daily cronjob task
ndir=/var/www/note
node $ndir/dayReset.js

#Spotify song of the day
shuf -n 1 $ndir/lists/spot.txt | sed 's/track/embed\/track/' > $ndir/lists/today

#Daily Kanji
wget -q https://www.kanshudo.com/random -O /tmp/random
KA=$(grep "Your random" /tmp/random | cut -c 50- | cut -c -3)
wget -q "https://www.kanshudo.com/kanji/$KA" -O "/tmp/$KA"
RE=$(grep "$KA is a " /tmp/$KA | cut -c 72- | cut -f1 -d ".")

echo "$KA" >> $ndir/lists/today
echo "$RE" >> $ndir/lists/today

#Spotify Followers
oauth=$(cat /home/simon/oauth)
nn=$(curl -s -X "GET" "https://api.spotify.com/v1/artists/4l2DJUqoeDffml9KT1nSCN" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer $oauth" | grep "total" | cut -c15-16)
echo $nn >> /var/www/note/lists/today

#Calendar image
#cp /home/simon/calendar/$(echo $(date +"%m").jpg) /var/www/note/img/calendar.jpg


