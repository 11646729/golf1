/**
 * Created by briansmith on 29/02/2016
 * Refer to code at http://jsfiddle.net/medmunds/sd10up9t/ for the basic algorithm
 */

// This line prevents Webstorm warnings from google
var google = google || {};

var pointMarkers = [];
var curveMarkers = [];

var map, myBounds, markersDisplayedFlag, myNewCoords;
var curvature; // how curvy to make the arc

/**
 * Initialization function
 */
function init(){

    /**
     * Initialise flag
     */
    markersDisplayedFlag = false;
    curvature = 0.2;

    /**
     * Draw the map
     */
    drawMap();

    /**
     * Get the data
     */
    fetchData();

    /**
     * Calculate map bounds & fit to bounds
     */
    myBounds = new google.maps.LatLngBounds();

    for (var i = 0; i < myNewCoords.features.length; i++) {
        // Only compute bounds using Points
        if (myNewCoords.features[i].geometry.type == 'Point'){
            var coords = myNewCoords.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            myBounds.extend(latLng);
        }
    }

    map.fitBounds(myBounds);

    /**
     * Add an event listener
     */
    map.addListener('zoom_changed', resetMarkers);
}

/**
 * Obtain the data - either pull it or receive a pushed data set
 */
function fetchData(){
    /**
     * Variable myNewCoords contains data
     */
    myNewCoords = {
        "type": "FeatureCollection",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -5.683992, 54.625605 ]
                },
                "properties": {
                    "id": 1,
                    "name": "Shot 1"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -5.683818, 54.623937 ]
                },
                "properties": {
                    "id": 2,
                    "name": "Shot 2"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -5.682997, 54.622981 ]
                },
                "properties": {
                    "id": 3,
                    "name": "Shot 3"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[ -5.683992, 54.625605 ],[ -5.683818, 54.623937 ]]
                },
                "properties": {
                    "name": "Driver",
                    "distance": 207
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[ -5.683818, 54.623937 ],[ -5.682997, 54.622981 ]]
                },
                "properties": {
                    "name": "8 Iron",
                    "distance": 135
                }
            }
        ]
    };
}

function fetchData1() {

    myNewCoords = {
        "type": "FeatureCollection",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -5.604549,
                        54.258716
                    ]
                },
                "properties": {
                    "name": "Ardglass Golf Club",
                    "phoneNumber": "028 44 841 219"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -5.469174,
                        54.414666
                    ]
                },
                "properties": {
                    "name": "Ardminnan Golf Club",
                    "phoneNumber": "028 4277 1321"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.968653, 54.565785]
                },
                "properties": {
                    "name": "Balmoral Golf Club",
                    "phoneNumber": "028 9038 1514"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.654729, 54.659859]
                },
                "properties": {
                    "name": "Bangor Golf Club",
                    "phoneNumber": "028 9127 0922"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.914224, 54.561471]
                },
                "properties": {
                    "name": "Belvoir Park Golf Club",
                    "phoneNumber": "028 9049 1693"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.726133, 54.630849]
                },
                "properties": {
                    "name": "Blackwood Golf Centre",
                    "phoneNumber": "028 9185 2706"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.703048, 54.666202]
                },
                "properties": {
                    "name": "Carnlea Golf Club",
                    "phoneNumber": "028 9127 0368"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.831853, 54.571461]
                },
                "properties": {
                    "name": "Castlereagh Hills Golf Club",
                    "phoneNumber": "028 9044 8477"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-6.784519, 55.165779]
                },
                "properties": {
                    "name": "Castlerock Golf Club",
                    "phoneNumber": "028 7084 8314"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.684562, 54.626163]
                },
                "properties": {
                    "name": "Clandeboye Golf Club",
                    "phoneNumber": "028 9127 1767"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.953633, 54.625353]
                },
                "properties": {
                    "name": "Cliftonville Golf Club",
                    "phoneNumber": "028 9074 4158"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.549328, 54.653172]
                },
                "properties": {
                    "name": "Donaghadee Golf Club",
                    "phoneNumber": "028 9188 3624"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.983643, 54.545321]
                },
                "properties": {
                    "name": "Dunmurry Golf Club",
                    "phoneNumber": "028 9062 1314"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-6.233941, 54.451971]
                },
                "properties": {
                    "name": "Edenmore Country Club",
                    "phoneNumber": "028 9261 9241"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-6.312051, 54.855284]
                },
                "properties": {
                    "name": "Galgorm Castle Golf Club",
                    "phoneNumber": "028 2564 6161"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.738059, 54.668818]
                },
                "properties": {
                    "name": "Helen's Bay Golf Course",
                    "phoneNumber": "028 9185 2815"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.830112, 54.631174]
                },
                "properties": {
                    "name": "Holywood Golf Club",
                    "phoneNumber": "028 9042 3135"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.472254, 54.440484]
                },
                "properties": {
                    "name": "Kirkistown Castle Golf Club",
                    "phoneNumber": "028 4277 1233"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.819143, 54.595872]
                },
                "properties": {
                    "name": "Knock Golf Club",
                    "phoneNumber": "028 9048 3251"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.643564, 54.498789]
                },
                "properties": {
                    "name": "Mahee Island Golf Club",
                    "phoneNumber": "028 9754 1234"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.97205, 54.538048]
                },
                "properties": {
                    "name": "Malone Golf Club",
                    "phoneNumber": "028 9061 2758"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.913676, 54.579967]
                },
                "properties": {
                    "name": "Ormeau Golf Club",
                    "phoneNumber": "028 9064 0700"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-6.724955, 55.171454]
                },
                "properties": {
                    "name": "Portstewart Golf Club",
                    "phoneNumber": "028 7083 2015"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.882425, 54.488131]
                },
                "properties": {
                    "name": "Rockmount Golf Club",
                    "phoneNumber": "028 9081 2279"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-6.635313, 55.199731]
                },
                "properties": {
                    "name": "Royal Portrush Golf Club",
                    "phoneNumber": "028 7082 2311"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.719557, 54.577895]
                },
                "properties": {
                    "name": "Scrabo Golf Club",
                    "phoneNumber": "028 9181 2355"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.855763, 54.583079]
                },
                "properties": {
                    "name": "Shandon Park Golf Club",
                    "phoneNumber": "028 9080 5030"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.906807, 54.465682]
                },
                "properties": {
                    "name": "Temple Golf & Country Club",
                    "phoneNumber": "028 9263 9213"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.783817, 54.661631]
                },
                "properties": {
                    "name": "The Royal Belfast Golf Club",
                    "phoneNumber": "028 9042 8165"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-5.883267, 54.21792]
                },
                "properties": {
                    "name": "The Royal County Down Golf Club",
                    "phoneNumber": "028 4372 3314"
                }
            }
        ]
    };
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
}

/**
 * Add the point markers to the pointMarkers array
 */
function addPointMarkers(){
    // Delete old point markers
    pointMarkers = [];

    // Add new point markers to array
    for (var i = 0; i < myNewCoords.features.length; i++) {

        var coords = myNewCoords.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);

        var pointMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Test',
            visible: false,
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

/**
 * Add the curve markers to the curveMarkers array
 */
function addCurveMarkers() {
    // Delete old curve markers
    curveMarkers = [];

    for (var i = 0; i < myNewCoords.features.length - 1; i++) {

        var coords = myNewCoords.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);

        var coords1 = myNewCoords.features[i+1].geometry.coordinates;
        var latLng1 = new google.maps.LatLng(coords[1],coords[0]);

        var pos1 = latLng,
            pos2 = latLng1;

        var projection = map.getProjection(),
            p1 = projection.fromLatLngToPoint(pos1), // xy
            p2 = projection.fromLatLngToPoint(pos2);

        // Calculate the arc.
        // To simplify the math, these points are all relative to p1:
        var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
            m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
            o = new google.maps.Point(e.y, -e.x), // orthogonal
            c = new google.maps.Point(m.x + curvature * o.x, m.y + curvature * o.y); // curve control point

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

        curveMarker = new google.maps.Marker({
            position: pos1,
            map: map,
            visible: false,
            clickable: false,
            icon: symbol
        });
        curveMarkers.push(curveMarker);
    }
}

/**
 * Show all the markers on the map that are currently in the arrays
 */
function showAllMarkers(){

    console.log(markersDisplayedFlag);

    /**
     * Ignore if markers are already displayed
     */
    if (markersDisplayedFlag == false){

        addPointMarkers();
        if (pointMarkers.length > 0) {
            for (var i = 0; i < pointMarkers.length; i++) {
                pointMarkers[i].visible = true;
                pointMarkers[i].setMap(map);
            }
        }

        //addCurveMarkers();
//        if (curveMarkers.length > 0) {
            //for (var j = 0; j < curveMarkers.length; j++) {
            //    curveMarkers[j].visible = true;
            //    curveMarkers[j].setMap(map);
            //}
//        }

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

        if (curveMarkers.length > 0) {
            for (var j = 0; j < curveMarkers.length; j++) {
                curveMarkers[j].visible = false;
                curveMarkers[j].setMap(map);
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

        if (curveMarkers.length > 0) {
            for (var j = 0; j < curveMarkers.length; j++) {
                curveMarkers[j].visible = false;
                curveMarkers[j].setMap(map);
            }
        }
        showAllMarkers();
    }
}
