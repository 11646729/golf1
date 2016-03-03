/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

/**
 * This line prevents Webstorm warnings from google
 */
var google = google || {};
var markers = [];

var map, myCoords, myBounds, json_file, curveMarker;

var curvature = 0.2; // how curvy to make the arc

/**
 * Initialization function
 */
function init(){
    prepare_coords(json_file);
    calculate_bounds();
    draw_map();

    addMarkers();

    //hideMarkers();
    //setMapOnAll(map);

    /**
     * Adds event listeners
     */
    //map.addListener('projection_changed', updateCurveMarker);
    //map.addListener('zoom_changed', updateCurveMarker);
    //map.addListener('position_changed', updateCurveMarker);
    //map.addListener('position_changed', updateCurveMarker);
}

/**
 * Function to convert json file (stream?) to array of LatLng etc
 */
function prepare_coords(json_file){

    myCoords = [
        {
            shotNumber: 1,
            latlng: new google.maps.LatLng(54.625605, -5.683992)
        },
        {
            shotNumber: 2,
            latlng: new google.maps.LatLng(54.623937, -5.683818)
        },
        {
            shotNumber: 3,
            latlng: new google.maps.LatLng(54.622981, -5.682997)
        }
    ];
}

/**
 * Function to calculate the map bounds
 */
function calculate_bounds(){
    myBounds = new google.maps.LatLngBounds();
    for (var i = 0; i < myCoords.length; i++) {
        myBounds.extend(myCoords[i].latlng);
    }
}

/**
 * Function to draw the map to the correct bounds
 */
function draw_map() {
    /**
     * Options for map
     */
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: myBounds.getCenter(),
        //zoom: 18,
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
    map.fitBounds(myBounds);
}

/**
 * Function to draw markers on the map
 */
function addMarkers(){
    for (var i = 0; i < myCoords.length; i++) {
        var pointMarker = new google.maps.Marker({
            position: myCoords[i].latlng,
            map: map,
            title: myCoords[i].name,
            visible: true,
            icon: {
                url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                size: new google.maps.Size(7, 7),
                anchor: new google.maps.Point(4,4)
            }
            //label: "1",
            //draggable: true,
        });
        markers.push(pointMarker);
    }
}

/**
 * Sets the map on all markers in the array
 */
function setMapOnAll(map){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

/**
 * Hide all the markers on the map
 */
function hideMarkers(){
    setMapOnAll(null);
}

/**
 * Show all the markers on the map that are currently in the array
 */
function showMarkers(){
    setMapOnAll(map);
}

/**
 * Delete all the markers in the array by removing references to them
 */
function deleteMarkers(){
    hideMarkers();
    markers = [];
}

/**
 * Draws curves - triggered by events
 */
function updateCurveMarker() {
    /**
     * Needs a loop something like this to call coords - use -1 but do not delete first curve
     */
    for (var i = 0; i < myCoords.length - 1; i++) {

        var pos1 = myCoords[i].latlng,
            pos2 = myCoords[i+1].latlng;

        var projection = map.getProjection(),
            p1 = projection.fromLatLngToPoint(pos1), // xy
            p2 = projection.fromLatLngToPoint(pos2);

        // Calculate the arc.
        // To simplify the math, these points are all relative to p1:
        var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
            m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
            o = new google.maps.Point(e.y, -e.x), // orthogonal
            c = new google.maps.Point( // curve control point
                m.x + curvature * o.x,
                m.y + curvature * o.y);

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

        //if (!curveMarker) {
            curveMarker = new google.maps.Marker({
                position: pos1,
                clickable: false,
                icon: symbol,
                zIndex: 0, // behind the other markers
                map: map
            });
        //} else {
        //    curveMarker.setOptions({
        //        position: pos1,
        //        icon: symbol
        //    });
        //}
    }
}
