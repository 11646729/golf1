/**
 * Created by briansmith on 20/05/2016.
 */

// This line prevents Webstorm warnings from google
var google = google || {};
var markers = [];
var map, myBounds;

/**
 * Initialization function
 */
function init(){
    /**
     * Options for map
     */
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: {lat: 44.540, lng: -78.546},
        zoom: 12,
        //minZoom: 6,
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
     * Add Events
     */
    map.addListener('zoom_changed', function(event) {
        resetMarkers();
    });
    map.addListener('mousemove', function (event) {
        displayCoordinates(event.latLng);
    });
}

/**
 * Receive the data pushed from the server
 */
var socket = io();

$(document).ready(function(){

    socket.on('nearbyGolfCoursesCoordinates', function(myNewCoords){

        // Delete old point markers - just in case !!
        markers = [];

        /**
         * Calculate map bounds & fit map to bounds
         */
        myBounds = new google.maps.LatLngBounds();

        for (var i = 0; i < myNewCoords[0].features.length; i++) {
            /**
             * Only compute bounds using Points
             */
            if (myNewCoords[0].features[i].geometry.type == 'Point') {

                var coords = myNewCoords[0].features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);

                myBounds.extend(latLng);

                /**
                 * Save points in an array of pointMarkers
                 */
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    visible: true,
                    clickable: false,
                    //animation: google.maps.Animation.DROP,
                    icon: {
                        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                        size: new google.maps.Size(7, 7),
                        anchor: new google.maps.Point(4, 4)
                    }
                    //label: "1",
                    //draggable: true,
                });

                // Add new point markers to array
                markers.push(marker);
            }
        }
        map.fitBounds(myBounds);

        // Now show all markers
        showMarkers();
    });
});

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

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }

    console.log('Here I am in setMapOnAll(map)');
}

/**
 * Show all the markers on the map
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

function resetMarkers(){
    /**
     * If markers are displayed then hide points & recalculate them
     */
//    if (markersDisplayedFlag == true){
//        if (markers.length > 0){
//            for (var i = 0; i < markers.length; i++) {
//                markers[i].visible = false;
//                markers[i].setMap(map);
//            }
//        }
//        showMarkers();
//    }
}

//// In the following example, markers appear when the user clicks on the map.
//// The markers are stored in an array.
//// The user can then click an option to hide, show or delete the markers.
//var map;
//var markers = [];
//
//function initMap() {
//    var haightAshbury = {lat: 37.769, lng: -122.446};
//
//    map = new google.maps.Map(document.getElementById('map'), {
//        zoom: 12,
//        center: haightAshbury,
//        mapTypeId: google.maps.MapTypeId.TERRAIN
//    });
//
//    // This event listener will call addMarker() when the map is clicked.
//    map.addListener('click', function(event) {
//        addMarker(event.latLng);
//    });
//
//    // Adds a marker at the center of the map.
//    addMarker(haightAshbury);
//}
//
//// Adds a marker to the map and push to the array.
//function addMarker(location) {
//    var marker = new google.maps.Marker({
//        position: location,
//        map: map
//    });
//    markers.push(marker);
//}
//
//// Sets the map on all markers in the array.
//function setMapOnAll(map) {
//    for (var i = 0; i < markers.length; i++) {
//        markers[i].setMap(map);
//    }
//}
//
//// Removes the markers from the map, but keeps them in the array.
//function clearMarkers() {
//    setMapOnAll(null);
//}
//
//// Shows any markers currently in the array.
//function showMarkers() {
//    setMapOnAll(map);
//}
//
//// Deletes all markers in the array by removing references to them.
//function deleteMarkers() {
//    clearMarkers();
//    markers = [];
//}