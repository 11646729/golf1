/**
 * Created by briansmith on 27/02/2016.
 */
var map;

function init() {
    var startLatLng = new google.maps.LatLng(50.124462, -5.539994);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: startLatLng,
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.124462, -5.539994),
        map: map,
        icon: {
            url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
            size: new google.maps.Size(7, 7),
            anchor: new google.maps.Point(4, 4)
        }
    });

    var p1 = new google.maps.Point(0, 5);
    var p2 = new google.maps.Point(5, 5);
    var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y);
    var m = new google.maps.Point(e.x / 2, e.y / 2);
    var o = new google.maps.Point(0, 7);
    var c = new google.maps.Point(m.x + o.x, m.y + o.y);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.124462, -5.539994),
        icon: {
            path: "M 0 0 q " + c.x + " " + c.y + " " + e.x + " " + e.y,
            scale: 8,
            strokeWeight: 2,
            fillColor: '#009933',
            fillOpacity: 0,
            rotation: 180,
            anchor: new google.maps.Point(0, 0)
        }
    });
    marker.setMap(map);

    google.maps.event.addListener(map,'zoom_changed',function() {
        var zoom = map.getZoom();
        var scale = 1/(Math.pow(2,9 - zoom));
        var icon = {
            path: "M 0 0 q "+c.x+" "+c.y+" "+e.x+" "+e.y,
            scale: scale,
            strokeWeight: 2,
            fillColor: '#009933',
            fillOpacity: 0,
            rotation: 180,
            anchor: new google.maps.Point(0,0)
        };
        marker.setIcon(icon);
    });

    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(50.124461,-5.553726),
        map: map,
        draggable: true,
        icon: {url:"https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
            size: new google.maps.Size(7,7),
            anchor: new google.maps.Point(4,4)
        }
    });

    var p1 = new google.maps.LatLng(23.634501, -102.552783);
    var p2 = new google.maps.LatLng(17.987557, -92.929147);

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(p1);
    bounds.extend(p2);
    map.fitBounds(bounds);
    var markerP1 = new google.maps.Marker({
        position: p1,
        map: map
    });
    var markerP2 = new google.maps.Marker({
        position: p2,
        map: map
    });
    google.maps.event.addListener(map, 'projection_changed', function () {
        var p1 = map.getProjection().fromLatLngToPoint(markerP1.getPosition());
        var p2 = map.getProjection().fromLatLngToPoint(markerP2.getPosition());
        var e = new google.maps.Point(p1.x - p2.x, p1.y - p2.y);
        var m = new google.maps.Point(e.x / 2, e.y / 2);
        var o = new google.maps.Point(0, 7);
        var c = new google.maps.Point(m.x + o.x, m.y + o.y);
        var curveMarker2 = new google.maps.Marker({
            position: markerP1.getPosition(),
            icon: {
                path: "M 0 0 q " + c.x + " " + c.y + " " + e.x + " " + e.y,
                scale: 24,
                strokeWeight: 2,
                fillColor: '#009933',
                fillOpacity: 0,
                rotation: 180,
                anchor: new google.maps.Point(0, 0)
            }
        });
        curveMarker2.setMap(map);
        google.maps.event.addListener(map, 'zoom_changed', function () {
            var zoom = map.getZoom();
            var scale = 1 / (Math.pow(2, -zoom));
            var icon = {
                path: "M 0 0 q " + c.x + " " + c.y + " " + e.x + " " + e.y,
                scale: scale,
                strokeWeight: 2,
                fillColor: '#009933',
                fillOpacity: 0,
                rotation: 180,
                anchor: new google.maps.Point(0, 0)
            };
            curveMarker2.setIcon(icon);
        });
        3
    });
}

google.maps.event.addDomListener(window, 'load', init);