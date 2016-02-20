/**
 * Created by briansmith on 15/06/2014.
 */

var styleFunction = (function () {
    var styles = {};

    styles['LineString'] = [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "lightgreen",
            width: 3
        })
    })];

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

var overlayStyle = (function () {
    var styles = {};

    styles['LineString'] = [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "white",
            width: 3
        })
    })];

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
 * Create the Round of Golf Layer from a GeoJSON file
 */
var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/testData/geoJsonFiles/roundOfGolfData.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction
    // opacity: 0.5
});

/**
 * Create the Map
 */
var map = new ol.Map({
    layers: [baseMapLayer, vectorLayer],
    target: document.getElementById('bingMap'),
    interactions: ol.interaction.defaults().extend([select]),
    view: new ol.View({
        center: [0, 0],
        maxZoom: 19,
        zoom: 2 // 17
    })
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
});

// Initialize radio button map choices
document.getElementById('bingMap').style.display = 'block';
document.getElementById('googleMap').style.display = 'none';
document.getElementById('gMap').style.display = 'none';
document.getElementById('olMap').style.display = 'none';

function toggleControl(element){
    if(element.value == "bingMapsBaseLayer"){
        document.getElementById('bingMap').style.display = 'block';
        document.getElementById('googleMap').style.display = 'none';
        document.getElementById('gMap').style.display = 'none';
        document.getElementById('olMap').style.display = 'none';
    }

    if(element.value == "googleMapsBaseLayer"){
        document.getElementById('bingMap').style.display = 'none';
        document.getElementById('googleMap').style.display = 'block';
        document.getElementById('gMap').style.display = 'block';
        document.getElementById('olMap').style.display = 'block';
    }

    if(element.value == "withRoundOfGolf"){
        roundOfGolfDataLayer.setVisible(element.checked);
    }
}