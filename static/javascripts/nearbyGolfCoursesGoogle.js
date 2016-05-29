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
        showMarkers();
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

        console.log('Here I am in $(document).ready');

//        markers = fillMarkersArray(myNewCoords);

        /**
         * Calculate map bounds & fit map to bounds
         */
        myBounds = new google.maps.LatLngBounds();

        //function myFunction(value1,value2,value3)
        //{
        //    var returnedArray = [];
        //    returnedArray.push(value1);
        //    returnedArray.push(value2);
        //    return returnedArray;
        //}
        //
        //var returnValue = myFunction("1",value2,value3);

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
                    visible: true
//                    icon: {
//                        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
//                        size: new google.maps.Size(7, 7),
//                        anchor: new google.maps.Point(4, 4)
//                    }
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

function fillMarkersArray(myNewCoords){
    var tempMarkers = [];

    return tempMarkers
}

/**
 * Display coordinates when mouse is moved
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
 * Sets all markers on the the map
 */
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
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