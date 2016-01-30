/**
 * Created by briansmith on 20/10/15.
 */
/**
 * Created by briansmith on 15/06/2014.
 */

var styleFunction = (function () {
    var styles = {};

    styles['Point'] = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
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

var select = new ol.interaction.Select({
    style: overlayStyle
});

// Bing Maps API access key
var apiKey = "AuX4igoeqL4Kp6N9dZYTRK3CV9zEsT8bJIeZMw3TZgIzSED1Ja4VxEOh0XKvd-B_";

// Using Bing Maps data for the BaseMap Layer
var baseMapLayerBing = new ol.source.BingMaps({
    key: apiKey,
    imagerySet: "aerial"
});

// Create the BaseMap Layer
var baseMapLayer = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: baseMapLayerBing
});

// Using a GeoJSON file containing the data for the Golf Courses Layer
var golfCoursesSource = new ol.source.Vector({
    url: '/testData/GolfCourses.json',
    format: new ol.format.GeoJSON()
});

// Create the Golf Courses Layer
var golfCoursesDataLayer = new ol.layer.Vector({
    title: 'Golf Courses Layer',
    source: golfCoursesSource,
    style: styleFunction
});
/*
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(6),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});
*/
// Create the View
var view1 = new ol.View({
    center: new ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857'),
    maxZoom: 19,
    zoom: 8
});

// Create the Map
var map = new ol.Map({
//    controls: ol.control.defaults().extend([mousePositionControl]),
    renderer: 'canvas',
    target: 'map',
    interactions: ol.interaction.defaults().extend([select]),
    view: view1
});

// Add Layers
map.addLayer(baseMapLayer);
map.addLayer(golfCoursesDataLayer);


// Experimental
//var extent = ol.extent.createEmpty();
//map.getLayers().forEach(function(layer) {
//    ol.extent.extend(extent, layer.getSource().getExtent());
//});
//map.getView().fitExtent(extent, map.getSize());


// Test Routine
//var point = ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857');
//var pixel = map.getPixelFromCoordinate(point);
//console.log(point);
