/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

var map;

var curvature = 0.3; // how curvy to make the arc

function init(){

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

    call_me(allCoords);
}

function call_me(allCoords) {
    /**
     * Setup variables
     */
    var Map = google.maps.Map,
        LatLng = google.maps.LatLng,
        LatLngBounds = google.maps.LatLngBounds,
        Marker = google.maps.Marker,
        Point = google.maps.Point;

    /**
     * Calculate bounds of the map to display
     */
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < allCoords.length; i++) {
        bounds.extend(allCoords[i].latlng);
    }

    /**
     * MapOptions for map
     */
    var mapOptions = {
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
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    /**
     * Draw Map then fit to the bounds of the points plotted
     */
    map = new Map(document.getElementById('map'), mapOptions);
    map.fitBounds(bounds);

    /**
     * Draw markers
     */
    for (var i = 0; i < allCoords.length; i++) {
        new google.maps.Marker({
            position: allCoords[i].latlng,
            map: map,
            title: allCoords[i].name,
            icon: {
                url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                size: new google.maps.Size(7, 7),
                anchor: new google.maps.Point(4,4)
            }
            //label: "1",
            //draggable: true,
        });
    }




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
