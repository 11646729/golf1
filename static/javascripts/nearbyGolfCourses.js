/**
 * Created by briansmith on 30/01/16
 */

//var r = require('rethinkdb'),
//    debug = require('debug')('rdb');

/**
 * Mapped Styles
 */
var styleFunction = (function () {
    var styles = {};

    styles['Point'] = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: "red"
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 2
                })
            }),
            zIndex: 100000
        })
    ];

    return function (feature) {
        return styles[feature.getGeometry().getType()] || styles['default'];
    };
})();

/**
 * Overlay Styles
 */
var overlayStyle = (function () {
    var styles = {};

    styles['Point'] = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "white"
                }),
                stroke: new ol.style.Stroke({
                    color: "red",
                    width: 3
                })
            }),
            zIndex: 100000
        })
    ];

    return function (feature) {
        return styles[feature.getGeometry().getType()];
    };
})();

/**
 * Mouse selection interaction
 */
var select = new ol.interaction.Select({
    style: overlayStyle
});

var popupElement = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map
 */
var overlay = new ol.Overlay(({
    element: popupElement,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

/**
 * Add a click handler to hide the popup
 */
closer.onclick = function(){
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

/**
 * The Bing Maps access key
 */
var apiKey = "AuX4igoeqL4Kp6N9dZYTRK3CV9zEsT8bJIeZMw3TZgIzSED1Ja4VxEOh0XKvd-B_";

/**
 * Create the Bing Maps Base Layer for the Map
 */
var baseMapLayer = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: apiKey,
        imagerySet: "aerial"
    })
});

var connection;
var geoJsonData;

/**
 * Fetch all nearby golf courses
 */
//r.connect({host: 'localhost', port: 28015}, function(err, conn){
//    if (err) throw err;
//
//    connection = conn;
//
//    console.log('Connected to database.');
//
//    r.db('golf').table('golfCourses').run(connection, function (err, cursor) {
//
//        cursor.toArray(function (err, results) {
//            if (err) {
////                debug("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
//                console.log("[ERROR] %s:%s \n%s", err.name, err.msg, err.message);
////                res.send([]);
//            }
//            else {
//
//                geoJsonData = results;
//
////                res.render("databaseTest.jade", {
////                    docs: results
////                });
//
//                // This sends the Json file to the client
////                    res.json(results);
////                    res.send(results);
//            }
//        });
//    });
//});

/**
 * Create the Golf Courses Layer from a GeoJSON file
 */
//var vectorLayer = new ol.layer.Vector({
//    title: 'Golf Courses Layer',
//    source: new ol.source.Vector({
//        url: '/testData/geoJsonFiles/GolfCourses.json',
//        format: new ol.format.GeoJSON()
//    }),
//    style: styleFunction
//});

/**
 * Nearby Golf Courses contained in a GeoJSON variable
 */
geoJsonData =
{
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
                "coordinates": [ -5.968653, 54.565785 ]
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
                "coordinates": [ -5.654729, 54.659859 ]
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
                "coordinates": [ -5.914224, 54.561471 ]
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
                "coordinates": [ -5.726133, 54.630849 ]
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
                "coordinates": [ -5.703048, 54.666202 ]
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
                "coordinates": [ -5.831853, 54.571461 ]
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
                "coordinates": [ -6.784519, 55.165779 ]
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
                "coordinates": [ -5.684562, 54.626163 ]
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
                "coordinates": [ -5.953633, 54.625353 ]
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
                "coordinates": [ -5.549328,	54.653172 ]
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
                "coordinates": [ -5.983643,	54.545321 ]
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
                "coordinates": [ -6.233941,	54.451971 ]
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
                "coordinates": [ -6.312051,	54.855284 ]
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
                "coordinates": [ -5.738059,	54.668818 ]
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
                "coordinates": [ -5.830112,	54.631174 ]
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
                "coordinates": [ -5.472254, 54.440484 ]
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
                "coordinates": [ -5.819143,	54.595872 ]
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
                "coordinates": [ -5.643564,	54.498789 ]
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
                "coordinates": [ -5.97205, 54.538048 ]
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
                "coordinates": [ -5.913676, 54.579967 ]
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
                "coordinates": [ -6.724955, 55.171454 ]
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
                "coordinates": [ -5.882425, 54.488131 ]
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
                "coordinates": [ -6.635313, 55.199731 ]
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
                "coordinates": [ -5.719557, 54.577895 ]
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
                "coordinates": [ -5.855763, 54.583079 ]
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
                "coordinates": [ -5.906807, 54.465682 ]
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
                "coordinates": [ -5.783817, 54.661631 ]
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
                "coordinates": [ -5.883267, 54.21792 ]
            },
            "properties": {
                "name": "The Royal County Down Golf Club",
                "phoneNumber": "028 4372 3314"
            }
        }
    ]
};

/**
 * Create the featureCollection from the geoJsonData
 */
var featureCollection = new ol.format.GeoJSON().readFeatures(geoJsonData, {featureProjection:"EPSG:3857"});

/**
 * Create the vectorSource from the featureCollection
 */
var vectorSource = new ol.source.Vector({
    features: featureCollection
});

/**
 * Create the Golf Courses Layer from the vectorSource
 */
var vectorLayer = new ol.layer.Vector({
    title: 'Golf Courses Layer',
    style: styleFunction,
    source: vectorSource
});

//var attribution = new ol.control.Attribution({
//    collapsible: false
//});

// The ol.control.defaults({ attribution: false }).extend([attribution]) means use default controls
// except the default attribution (attribution: false) and then add the new attribution object to list
// of controls using an array (.extend([attribution]))

/**
 * Create the Map
 */
var map = new ol.Map({
    layers: [ baseMapLayer, vectorLayer ],
    overlays: [overlay],
    target: document.getElementById('map'),
    renderer: 'canvas',
    view: new ol.View({
        center: [0, 0],
        maxZoom: 19,
        zoom: 2
    }),
    //controls: ol.control.defaults({ attribution: false }).extend([attribution]),
    interactions: ol.interaction.defaults().extend([select])
});

/**
 * Add a click handler to the map to render the popup
 * Use singleclick as click event fires on both click & doubleclick
 */
map.on('singleclick', function(e) {
    var feature = map.forEachFeatureAtPixel(e.pixel,
        function(feature) {
            return feature;
        });

    if (feature) {
        overlay.setPosition(e.coordinate);
        var featureName = feature.get('name');
        var phoneNumber = feature.get('phoneNumber');
        content.innerHTML = '<p>You clicked here :</p><code>' + featureName + '<br />' + phoneNumber + '</code>';
    }
});

/**
 * Trap coordinates of mouse then converts them for display
 */
map.on('pointermove', function(e1) {
    var coord4326 = ol.proj.transform(e1.coordinate, 'EPSG:3857', 'EPSG:4326');
    $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 4));
});

/**
 * Change mouse cursor when over marker
 */
map.on('pointermove', function(e2) {
    //if (e.dragging) {
    //    $(element).popover('destroy');
    //    return;
    //}

    var pixel = map.getEventPixel(e2.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

/**
 * Fit to extent routine - http://gis.stackexchange.com/questions/150997/openlayers-3-zoom-to-extent-only-working-in-debug
 */
//vectorLayer.getSource().on("change", function(evt) {

    var extent = vectorLayer.getSource().getExtent();
    map.getView().fit(extent, map.getSize());

// Test routines
//    console.log("EPSG:3857 " + extent);
//    extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:3857", "EPSG:4326"));
//    console.log("EPSG:4326 " + extent);
//});
