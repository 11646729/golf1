/**
 * Created by briansmith on 20/05/2016.
 */

// This line prevents Webstorm warnings from google
var google = google || {};
var pointMarkers = [];
var map, myBounds, markersDisplayedFlag, myNewCoords;

/**
 * Initialization function
 */
function init(){

    /**
     * Initialise flag
     */
    markersDisplayedFlag = true;

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

    socket.on('nearbyGolfCoursesCoordinates', function(nearbyGolfCoursesGeoJsonData){

        myNewCoords = nearbyGolfCoursesGeoJsonData;

//        console.log(myNewCoords);

        // Delete old point markers
//        pointMarkers = [];

        /**
         * Calculate map bounds & fit map to bounds
         */
        myBounds = new google.maps.LatLngBounds();

        for (var i = 0; i < myNewCoords.length; i++) {
            /**
             * Only compute bounds using Points
             */
            if (myNewCoords[i].geometry.type == 'Point') {

                var coords = myNewCoords[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);

                myBounds.extend(latLng);

                /**
                 * Save points in an array of pointMarkers
                 */
                var pointMarker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    visible: markersDisplayedFlag,
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
        //zoom: 12,
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

    showAllMarkers();
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

        showAllMarkers();
    }
}
