# golf-1
This is my learning project to include a variety of golf routines

TO RUN
------
Start redis server
Open a Mac Terminal Window from Taskbar type:
cd redis-3.0.7
src/redis-server

Now start rethinkdb Database
Open a Mac Terminal Window from Taskbar type:
rethinkdb

Now start the golf-1 program
In Terminal window within WebStorm type:
npm start

Now Open Chrome and browse to localhost:3000


Format for GeoJSON is Longitude then Latitude : "coordinates": [ -5.683992, 54.625605 ]
Format for Google maps: is Latitude then Longitude : new google.maps.LatLng(54.625605, -5.683992)
