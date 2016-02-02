/**
 * Created by briansmith on 30/01/16
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

// Create a Bing Maps BaseMap Layer
var baseMapLayer = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: apiKey,
        imagerySet: "aerial"
    })
});

var projection = new ol.layer.Group({
    title: 'Projection',
    layers: [
        // Create the Golf Courses Layer from a GeoJSON file
        new ol.layer.Vector({
            title: 'Golf Courses Layer',
            source: new ol.source.Vector({
                url: '/testData/GolfCourses.json',
                format: new ol.format.GeoJSON()
            }),
            style: styleFunction
        })
    ]
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(6),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});

var attribution = new ol.control.Attribution({
    collapsible: false
});

// Create the Map
// default renderer is canvas

// The ol.control.defaults({ attribution: false }).extend([attribution]) means use default controls
// except the default attribution (attribution: false) and then add the new attribution object to list
// of controls using an array (.extend([attribution]))

var map = new ol.Map({
    layers: [ baseMapLayer, projection],
    target: 'map',
    view: new ol.View({
        center: new ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857'),
        maxZoom: 19,
        zoom: 8
    }),
    controls: ol.control.defaults({ attribution: false }).extend([mousePositionControl, attribution]),
    interactions: ol.interaction.defaults().extend([select])
});

//var extent = ol.extent.createEmpty();
//projecten.getLayers().forEach(function(layer) {
//    ol.extent.extend(extent, layer.getSource().getExtent());
//});
//map.getView().fitExtent(extent, map.getSize());
