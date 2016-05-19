/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

// This line prevents Webstorm warnings from google
var google = google || {};

var pointMarkers = [];
var straightLinePath = [];
var curveMarkers = [];

var map, myBounds, markersDisplayedFlag, myNewCoords;
var curvature; // how curvy to make the arc

/**
 * Initialization function
 */
function init(){

    /**
     * Initialise flag
     */
    markersDisplayedFlag = false;
    curvature = 0.2;

    /**
     * Draw the map
     */
    drawMap();

    /**
     * Add zoom_changed event
     */
    map.addListener('zoom_changed', function(event) {
        resetMarkers();
    });

    /**
     * Add mousemove event
     */
    map.addListener('mousemove', function (event) {
        displayCoordinates(event.latLng);
    });

    /**
     * Receive the data pushed from the server
     */
    var socket = io();

    socket.on('roundOfGolfCoordinates', function(roundOfGolfGeoJsonData){

        myNewCoords = roundOfGolfGeoJsonData;

        // Delete old point markers
        pointMarkers = [];
        straightLinePath = [];

        /**
         * Calculate map bounds & fit map to bounds
         */
        myBounds = new google.maps.LatLngBounds();

        for (var i = 0; i < myNewCoords.features.length; i++) {
            /**
             * Only compute bounds using Points
             */
            if (myNewCoords.features[i].geometry.type == 'Point'){
                var coords = myNewCoords.features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);

                myBounds.extend(latLng);

                /**
                 * Save points in an array of pointMarkers
                 */
                var pointMarker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: 'Test',
                    visible: false,
                    clickable: false,
                    icon: {
                        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                        size: new google.maps.Size(7, 7),
                        anchor: new google.maps.Point(4, 4)
                    }
                    //label: "1",
                    //draggable: true,
                });

                // Add new point markers to array
                pointMarkers.push(pointMarker);

            } else {
                if (myNewCoords.features[i].geometry.type == 'LineString') {
                    var coords10 = myNewCoords.features[i].geometry.coordinates;
console.log(coords10);

// straightLinePath
                    // Store in a linestring array

                    //Here's an API v3 way of drawing a line.
                    //This simply draws a straight line between two points.

                    //var line = new google.maps.Polyline({
                    //    path: [
                    //        new google.maps.LatLng(54.625605, -5.683992),
                    //        new google.maps.LatLng(54.623937, -5.683818)
                    //    ],
                    //    strokeColor: "#FF0000",
                    //    strokeOpacity: 1.0,
                    //    strokeWeight: 2,
                    //    map: map
                    //});
                }
            }
        }

        map.fitBounds(myBounds);
    });
}

/**
 * Function to draw the map to the correct bounds
 */
function drawMap() {
    /**
     * Options for map
     */
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        minZoom: 6,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        panControl: false,
        mapTypeControl: false,
        scaleControl: false,
        overviewMapControl: false,
        rotateControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        streetViewControl: false
    };

    /**
     * Draw Map to the bounds of the points plotted
     */
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

/**
 * Add the curve markers to the curveMarkers array
 */
function addCurveMarkers() {
    // Delete old curve markers
    curveMarkers = [];

    for (var i = 0; i < myNewCoords.features.length - 1; i++) {

        var coords = myNewCoords.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);

        var coords1 = myNewCoords.features[i+1].geometry.coordinates;
        var latLng1 = new google.maps.LatLng(coords1[1],coords1[0]);

        var pos1 = latLng;
        var pos2 = latLng1;

        var projection = map.getProjection(),
            p1 = projection.fromLatLngToPoint(pos1), // xy
            p2 = projection.fromLatLngToPoint(pos2);

        // Calculate the arc.
        // To simplify the math, these points are all relative to p1:
        var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
            m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
            o = new google.maps.Point(e.y, -e.x), // orthogonal
            c = new google.maps.Point(m.x + curvature * o.x, m.y + curvature * o.y); // curve control point

        var pathDef = 'M 0,0 ' + 'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;

        var zoom = map.getZoom(),
            scale = 1 / (Math.pow(2, -zoom));

        var symbol = {
            path: pathDef,
            scale: scale,
            strokeWeight: 2,
            strokeColor: 'red',
            fillColor: 'none'
        };

        curveMarker = new google.maps.Marker({
            position: pos1,
            map: map,
            visible: false,
            clickable: false,
            icon: symbol
        });
        curveMarkers.push(curveMarker);
    }
}

/**
 * Mouse move coordinates routine
 */
function displayCoordinates(pnt) {
    var coordsLabel = document.getElementById("mouse4326");
    var lat = pnt.lat();
    lat = lat.toFixed(4);
    var lng = pnt.lng();
    lng = lng.toFixed(4);
    coordsLabel.innerHTML = "EPSG:4326: Latitude: " + lat + "  Longitude: " + lng;
}

/**
 * Show all the markers on the map that are currently in the arrays
 */
function showAllMarkers(){
    /**
     * Ignore if markers are already displayed
     */
    if (markersDisplayedFlag == false){

        if (pointMarkers.length > 0) {
            for (var i = 0; i < pointMarkers.length; i++) {
                pointMarkers[i].visible = true;
                pointMarkers[i].setMap(map);
            }
        }

        addCurveMarkers();
        if (curveMarkers.length > 0) {
            for (var j = 0; j < curveMarkers.length; j++) {
                curveMarkers[j].visible = true;
                curveMarkers[j].setMap(map);
            }
        }

        markersDisplayedFlag = true;
    }
}

/**
 * Hide all the markers
 * Display starts with point marker hidden
 */
function hideAllMarkers(){
    /**
     * Ignore user pressing hide points if nothing is displayed
     */
    if (markersDisplayedFlag == true) {
        if (pointMarkers.length > 0) {
            for (var i = 0; i < pointMarkers.length; i++) {
                pointMarkers[i].visible = false;
                pointMarkers[i].setMap(map);
            }
        }

        if (curveMarkers.length > 0) {
            for (var j = 0; j < curveMarkers.length; j++) {
                curveMarkers[j].visible = false;
                curveMarkers[j].setMap(map);
            }
        }

        markersDisplayedFlag = false;
    }
}

function resetMarkers(){

    // If markers are displayed then hide points & recalculate them
    if (markersDisplayedFlag == true){

        if (pointMarkers.length > 0){
            for (var i = 0; i < pointMarkers.length; i++) {
                pointMarkers[i].visible = false;
                pointMarkers[i].setMap(map);
            }
        }

        if (curveMarkers.length > 0) {
            for (var j = 0; j < curveMarkers.length; j++) {
                curveMarkers[j].visible = false;
                curveMarkers[j].setMap(map);
            }
        }
        showAllMarkers();
    }
}
