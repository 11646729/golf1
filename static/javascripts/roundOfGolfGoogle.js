/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

var map, allCoords, json_file;

var curvature = 0.3; // how curvy to make the arc

/**
 * Initialization function
 */
function init(){
    var myCoords = convert_coords(json_file);
    var myBounds = calculate_bounds(myCoords);
    var myMap = draw_map(myCoords, myBounds);
    drawMarkers(myCoords, map);

}

/**
 * Function to convert json file (stream?) to array of LatLng etc
 */
function convert_coords(json_file){
    var allCoords = [
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

    return allCoords;
}

/**
 * Function to calculate the map bounds
 */
function calculate_bounds(myCoords){

    /**
     * Calculate bounds of the map to display
     */
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < myCoords.length; i++) {
        bounds.extend(myCoords[i].latlng);
    }

    return bounds;
}

/**
 * Function to draw the map to the correct bounds
 */
function draw_map(myCoords, bounds) {
    /**
     * Setup variables
     */
        //LatLng = google.maps.LatLng,
        //LatLngBounds = google.maps.LatLngBounds,
        //Marker = google.maps.Marker,
        //Point = google.maps.Point;

    /**
     * MapOptions for map
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
function drawMarkers(myCoords, map){
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

function draw_curves(){
    // This is the initial location of the points
    var pos1 = allCoords[0].latlng;
    var pos2 = allCoords[1].latlng;
    var pos3 = allCoords[2].latlng;

    var lat = allCoords[0].latlng.lat();
    var lng = allCoords[0].latlng.lng();
    //console.log(lat);

    //var lat = homeMarker.getPosition().lat();
    //var lng = homeMarker.getPosition().lng();


    var curveMarker;

    /**
     * Imported conversion code
     */
    //function fromLatLngToPoint(latLng, map) {
    //    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    //    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    //    var scale = Math.pow(2, map.getZoom());
    //    var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    //    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    //}

    /**
     * TO BE UPDATED
     */
    function updateCurveMarker() {
    //    var pos1 = markerP1.getPosition(), // latlng
    //        pos2 = markerP2.getPosition(),
    //        projection = map.getProjection(),
    //        p1 = projection.fromLatLngToPoint(pos1), // xy
    //        p2 = projection.fromLatLngToPoint(pos2);
    //
    //    // Calculate the arc.
    //    // To simplify the math, these points are all relative to p1:
    //    var e = new Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
    //        m = new Point(e.x / 2, e.y / 2), // midpoint
    //        o = new Point(e.y, -e.x), // orthogonal
    //        c = new Point( // curve control point
    //            m.x + curvature * o.x,
    //            m.y + curvature * o.y);
    //
    //    var pathDef = 'M 0,0 ' + 'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;
    //
    //    var zoom = map.getZoom(),
    //        scale = 1 / (Math.pow(2, -zoom));
    //
    //    var symbol = {
    //        path: pathDef,
    //        scale: scale,
    //        strokeWeight: 2,
    //        strokeColor: 'green',
    //        fillColor: 'none'
    //    };
    //
    //    if (!curveMarker) {
    //        curveMarker = new Marker({
    //            position: pos1,
    //            clickable: false,
    //            icon: symbol,
    //            zIndex: 0, // behind the other markers
    //            map: map
    //        });
    //    } else {
    //        curveMarker.setOptions({
    //            position: pos1,
    //            icon: symbol
    //        });
    //    }
    }

    google.maps.event.addListener(map, 'projection_changed', updateCurveMarker);
    google.maps.event.addListener(map, 'zoom_changed', updateCurveMarker);

    google.maps.event.addListener(map, 'position_changed', updateCurveMarker);
    //google.maps.event.addListener(markerP2, 'position_changed', updateCurveMarker);
}

//google.maps.event.addDomListener(window, 'load', init); // throws an error
