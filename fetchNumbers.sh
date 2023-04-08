#!/bin/bash
oauth=$(cat /home/simon/oauth)

nn=$(curl -X "GET" "https://api.spotify.com/v1/artists/4l2DJUqoeDffml9KT1nSCN" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer $oauth" | grep "total" | cut -c15-16)

#echo $oauth
#echo $nn
echo $nn >> lists/today
