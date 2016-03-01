/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

/**
 * This line prevents Webstorm warnings from google
 */
var google = google || {};

var map, myCoords, myBounds, json_file;

var curvature = 0.3; // how curvy to make the arc

/**
 * Initialization function
 */
function init(){
    myCoords = convert_coords(json_file);
    myBounds = calculate_bounds(myCoords);
    draw_map(myBounds);
    drawMarkers(myCoords);
    draw_curves(myCoords, map);
}

/**
 * Function to convert json file (stream?) to array of LatLng etc
 */
function convert_coords(json_file){

    return [
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
function calculate_bounds(myCoords){
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < myCoords.length; i++) {
        bounds.extend(myCoords[i].latlng);
    }
    return bounds;
}

/**
 * Function to draw the map to the correct bounds
 */
function draw_map(bounds) {
    /**
     * Options for map
     */
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: bounds.getCenter(),
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
    map.fitBounds(bounds);

    return map;
}

/**
 * Function to draw markers on the map
 */
function drawMarkers(myCoords){
    for (var i = 0; i < myCoords.length; i++) {
        new google.maps.Marker({
            position: myCoords[i].latlng,
            map: map,
            title: myCoords[i].name,
            icon: {
                url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                size: new google.maps.Size(7, 7),
                anchor: new google.maps.Point(4,4)
            }
            //label: "1",
            //draggable: true,
        });
    }
}

function draw_curves(myCoords, map) {
    // This is the initial location of the points
    var pos1 = myCoords[0].latlng;
    var pos2 = myCoords[1].latlng;
//    var pos3 = myCoords[2].latlng;

    console.log(pos2.lat());
    console.log(pos2.lng());

    console.log(map.getProjection());

//    updateCurveMarker(pos1, pos2);

    google.maps.event.addListener(map, 'projection_changed', updateCurveMarker);
    google.maps.event.addListener(map, 'zoom_changed', updateCurveMarker);

    google.maps.event.addListener(map, 'position_changed', updateCurveMarker);
    //google.maps.event.addListener(markerP2, 'position_changed', updateCurveMarker);
}

var curveMarker;

/**
 * TO BE UPDATED
 */
function updateCurveMarker() {
    var pos1 = myCoords[0].latlng;
    var pos2 = myCoords[1].latlng;

    var projection = map.getProjection(),
        p1 = projection.fromLatLngToPoint(pos1), // xy
        p2 = projection.fromLatLngToPoint(pos2);

    console.log(map.getProjection());

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
        strokeColor: 'green',
        fillColor: 'none'
    };

    if (!curveMarker) {
        curveMarker = new google.maps.Marker({
            position: pos1,
            clickable: false,
            icon: symbol,
            zIndex: 0, // behind the other markers
            map: map
        });
    } else {
        curveMarker.setOptions({
            position: pos1,
            icon: symbol
        });
    }
}

//google.maps.event.addDomListener(window, 'load', init); // throws an error
