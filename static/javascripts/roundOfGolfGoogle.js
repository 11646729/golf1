var map;

var curvature = 0.3; // how curvy to make the arc

function init() {
    var Map = google.maps.Map,
        LatLng = google.maps.LatLng,
        LatLngBounds = google.maps.LatLngBounds,
        Marker = google.maps.Marker,
        Point = google.maps.Point;

    // This is the initial location of the points
    var pos1 = new LatLng(54.625605, -5.683992);
    var pos2 = new LatLng(54.623937, -5.683818);

    var bounds = new LatLngBounds();
    bounds.extend(pos1);
    bounds.extend(pos2);

    var mapOptions = {
        center: bounds.getCenter(),
        zoom: 12,
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

    map = new Map(document.getElementById('map'), mapOptions);

    map.fitBounds(bounds);

    var markerP1 = new Marker({
        position: pos1,
        map: map,
        icon: {
            url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
            size: new google.maps.Size(7, 7),
            anchor: new google.maps.Point(4,4)
        }
        //label: "1",
        //draggable: true,
    });

    var markerP2 = new Marker({
        position: pos2,
        map: map,
        icon: {
            url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
            size: new google.maps.Size(7, 7),
            anchor: new google.maps.Point(4,4)
        }
        //label: "2",
        //draggable: true,
    });

    var curveMarker;

    function updateCurveMarker() {
        var pos1 = markerP1.getPosition(), // latlng
            pos2 = markerP2.getPosition(),
            projection = map.getProjection(),
            p1 = projection.fromLatLngToPoint(pos1), // xy
            p2 = projection.fromLatLngToPoint(pos2);

        // Calculate the arc.
        // To simplify the math, these points
        // are all relative to p1:
        var e = new Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
            m = new Point(e.x / 2, e.y / 2), // midpoint
            o = new Point(e.y, -e.x), // orthogonal
            c = new Point( // curve control point
                m.x + curvature * o.x,
                m.y + curvature * o.y);

        var pathDef = 'M 0,0 ' +
            'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;

        var zoom = map.getZoom(),
            scale = 1 / (Math.pow(2, -zoom));

        var symbol = {
            path: pathDef,
            scale: scale,
            strokeWeight: 2,
            fillColor: 'none'
        };

        if (!curveMarker) {
            curveMarker = new Marker({
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

    google.maps.event.addListener(map, 'projection_changed', updateCurveMarker);
    google.maps.event.addListener(map, 'zoom_changed', updateCurveMarker);

    google.maps.event.addListener(markerP1, 'position_changed', updateCurveMarker);
    google.maps.event.addListener(markerP2, 'position_changed', updateCurveMarker);
}

google.maps.event.addDomListener(window, 'load', init);