/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

// This line prevents Webstorm warnings from google
var google = google || {};

var pointMarkers = [];
var curveMarkers = [];
var map, myBounds, model;
var curvature; // how curvy to make the arc

var coords, coords1, pos1, pos2, p1, p2;

var infowindow;

var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';


/**
 * Initialization function
 */
function init() {
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

    /**
     * Add zoom_changed event
     */
    map.addListener('zoom_changed', function (event) {

        hideMarkers();

        // Update the Point Markers array from the model is not required here

        // Update the Curve Markers array from the model
        updateCurveMarkers(model);

        // Now show the markers on the map
        showMarkers();
    });
    /**
     * Add mousemove event
     */
    map.addListener('mousemove', function (event) {
        displayCoordinates(event.latLng);
    });

    infowindow = new google.maps.InfoWindow({
        content: contentString
//        content: ''
    });
}

/**
 * Receive the data pushed from the server
 */
var socket = io();

$(document).ready(function(){

    socket.on('loadRoundOfGolfData', function(myNewCoords){

        // Model for MVC
        model = myNewCoords;

        // Calculate the map bounds to fit the data
        map.fitBounds(calculateBounds(model));

        // Update the Point Markers array from the model
        addPointMarkers(model);

        // Update the Curve Markers array from the model is not required here

        // Now show the markers on the map
        showMarkers();
    });

    /**
     * TODO
     */
    socket.on('updateRoundOfGolfData', function(updateCoords) {
    })
});

/**
 * Calculate map bounds & fit map to bounds using Points
 */
function calculateBounds(model){
    myBounds = new google.maps.LatLngBounds();

    for (var j = 0; j < model[0].features.length; j++) {
        if (model[0].features[j].geometry.type == 'LineString'){
            coords = model[0].features[j].geometry.coordinates[0];
            myBounds.extend(new google.maps.LatLng(coords[1], coords[0]));

            coords1 = model[0].features[j].geometry.coordinates[1];
            myBounds.extend(new google.maps.LatLng(coords1[1], coords1[0]));
        }
    }
    return myBounds
}

/**
 * Create markers using Points & store in markers array
 */
function addPointMarkers(model){
    pointMarkers = [];

    for (var i = 0; i < model[0].features.length; i++) {
        if (model[0].features[i].geometry.type == 'LineString'){
            coords = model[0].features[i].geometry.coordinates[0];
            coords1 = model[0].features[i].geometry.coordinates[1];

            var testNote = model[0].features[i].properties.name;

            pointMarkers.push(producePointMarkers(coords, testNote));
            pointMarkers.push(producePointMarkers(coords1, testNote));
        }
    }
}

/**
 * Function to produce point markers from coordinates
 */
function producePointMarkers(coords, testNote){

    return new google.maps.Marker({
        position: new google.maps.LatLng(coords[1], coords[0]),
        map: map,
        visible: true,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4,
            fillColor: 'red',
            fillOpacity: 0.6,
            strokeColor: 'white',
            strokeWeight: 2
        },
        note: testNote
    });
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
 * Add the curve markers to the curveMarkers array
 */
function updateCurveMarkers(model) {
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

    /**
     * Initialise curvature factor
     */
    curvature = 0.2;
    curveMarkers = [];

    for (var i = 0; i < model[0].features.length; i++) {
        if (model[0].features[i].geometry.type == 'LineString') {

            coords = model[0].features[i].geometry.coordinates[0];
            coords1 = model[0].features[i].geometry.coordinates[1];

            pos1 = new google.maps.LatLng(coords[1], coords[0]);
            pos2 = new google.maps.LatLng(coords1[1], coords1[0]);

            var projection = map.getProjection();
            p1 = projection.fromLatLngToPoint(pos1); // xy
            p2 = projection.fromLatLngToPoint(pos2);

            // Calculate the arc.
            // To simplify the math, these points are all relative to p1:
            var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
                m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
                o = new google.maps.Point(e.y, -e.x), // orthogonal
                c = new google.maps.Point(m.x + curvature * o.x, m.y + curvature * o.y); // curve control point

            var pathDef = 'M 0,0 ' + 'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;
            var zoom = map.getZoom();
            var scale = 1 / (Math.pow(2, -zoom));

            var curveMarker = new google.maps.Marker({
                position: pos1,
                map: map,
                visible: true,
                clickable: true, // set this to false to remove cursor hand when hovering over curve
                icon: {
                    path: pathDef,
                    scale: scale,
                    strokeWeight: 2,
                    strokeColor: 'red',
                    fillColor: 'none'
                },
                note: 'This is a test note'
            });
            curveMarker.addListener('click', function() {
                infowindow.content = "Hello";
                infowindow.open(map, this);
            });

            curveMarkers.push(curveMarker);
        }
    }
}

/**
 * Sets all markers on the the map
 */
function setMapOnAll(map) {
    for (var i = 0; i < pointMarkers.length; i++) {
        pointMarkers[i].setMap(map);
    }

    for (var j = 0; j < curveMarkers.length; j++) {
        curveMarkers[j].setMap(map);
    }
}

/**
 * Show all the markers
 */
function showMarkers(){
    setMapOnAll(map);
}

/**
 * Hide all the markers
 */
function hideMarkers(){
    setMapOnAll(null);
}
