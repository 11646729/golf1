/**
 * Created by briansmith on 30/01/16
 */

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
 * @return {boolean} Don't follow the href
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

/**
 * Create the Golf Courses Layer from a GeoJSON file
 */
var vectorLayer = new ol.layer.Vector({
    title: 'Golf Courses Layer',
    source: new ol.source.Vector({
        url: '/testData/geoJsonFiles/GolfCourses.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction
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
map.on('singleclick', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
            return feature;
        });

    if (feature) {
        overlay.setPosition(evt.coordinate);
        var featureName = feature.get('name');
        var phoneNumber = feature.get('phoneNumber');
        content.innerHTML = '<p>You clicked here :</p><code>' + featureName + '<br />' + phoneNumber + '</code>';
    }
});

/**
 * Trap coordinates of mouse then converts them for display
 */
map.on('pointermove', function(event) {
    var coord4326 = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 4));
});

/**
 * Change mouse cursor when over marker
 */
map.on('pointermove', function(e) {
    //if (e.dragging) {
    //    $(element).popover('destroy');
    //    return;
    //}

    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

/**
 * Fit to extent routine - http://gis.stackexchange.com/questions/150997/openlayers-3-zoom-to-extent-only-working-in-debug
 */
vectorLayer.getSource().on("change", function(evt) {
    var extent = vectorLayer.getSource().getExtent();
    map.getView().fit(extent, map.getSize());

// Test routines
//    console.log("EPSG:3857 " + extent);
//    extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:3857", "EPSG:4326"));
//    console.log("EPSG:4326 " + extent);
});