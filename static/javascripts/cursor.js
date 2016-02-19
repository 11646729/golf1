/**
 * Created by briansmith on 18/02/2016.
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

/*
var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([0, 0]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'images/icon.png'
    })
});

iconFeature.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
    features: [iconFeature]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});
*/

// Create the Golf Courses Layer from a GeoJSON file
var vectorLayer = new ol.layer.Vector({
    title: 'Golf Courses Layer',
    source: new ol.source.Vector({
        url: '/testData/geoJsonFiles/GolfCourses.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction
})

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

var element = document.getElementById('popup');

var popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false
});

var map = new ol.Map({
    layers: [baseMapLayer, vectorLayer],
    overlays: [popup],
    target: document.getElementById('map'),
    view: new ol.View({
        center: [0, 0],
        zoom: 3
    })
});

// display popup on click
map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
            return feature;
        });
    if (feature) {
        popup.setPosition(evt.coordinate);
        $(element).popover({
            'placement': 'top',
            'html': true,
            'content': feature.get('name')
        });
        $(element).popover('show');
    } else {
        $(element).popover('destroy');
    }
});

// This routine traps coordinates of mouse then converts them for display
map.on('pointermove', function(event) {
    var coord4326 = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 4));
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
    if (e.dragging) {
        $(element).popover('destroy');
        return;
    }

    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

// Fit to extent routine - http://gis.stackexchange.com/questions/150997/openlayers-3-zoom-to-extent-only-working-in-debug
vectorLayer.getSource().on("change", function(evt) {
    var extent = vectorLayer.getSource().getExtent();
    map.getView().fit(extent, map.getSize());
});

