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

/*
// These lines add Google Maps
var mapOptions = {
    minZoom: 6,
    zoomControl: false,
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

var gMap = new google.maps.Map(document.getElementById('gMap'), mapOptions);

var view = new ol.View({
    // make sure the view doesn't go beyond the 22 zoom levels of Google Maps
    maxZoom: 21
});

view.on('change:center', function() {
    var center = new ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
    gMap.setCenter(new google.maps.LatLng(center[1], center[0]));
});

view.on('change:resolution', function() {
    gMap.setZoom(view.getZoom());
});

//var myZoom = 17;
view.setZoom(17); //myZoom

// NOT SURE IF THIS IS NEEDED
// transform needs to be lower-case to work - even though WebStorm doesn't like it
view.setCenter(new ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857'));

var olMapDiv = document.getElementById('olMap');
olMapDiv.parentNode.removeChild(olMapDiv);

gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);

// Google Maps
var map = new ol.Map({
    layers: [roundOfGolfDataLayer],
    interactions: ol.interaction.defaults({
        altShiftDragRotate: false,
        dragPan: false,
        rotate: false
    }).extend([new ol.interaction.DragPan({kinetic: null})]),
    target: olMapDiv,
    view: view
});
*/

var roundOfGolfDataLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/testData/geoJsonFiles/roundOfGolfData.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction,
    opacity: 0.5
});

var apiKey = "AuX4igoeqL4Kp6N9dZYTRK3CV9zEsT8bJIeZMw3TZgIzSED1Ja4VxEOh0XKvd-B_";

// Using Bing Maps
var baseMapLayerBing = new ol.source.BingMaps({
    key: apiKey,
    imagerySet: "aerial"
});

var baseMapLayer = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: baseMapLayerBing
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(6),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});

var select = new ol.interaction.Select({
    style: overlayStyle
});

// transform needs to be lower-case to work - even though WebStorm doesn't like it
var view1 = new ol.View({
    center: new ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857'),
    maxZoom: 19,
    zoom: 17
});

// Bing Maps
var map = new ol.Map({
    controls: ol.control.defaults().extend([mousePositionControl]),
    layers: [baseMapLayer, roundOfGolfDataLayer],
    renderer: 'canvas',
    target: 'bingMap',
    interactions: ol.interaction.defaults().extend([select]),
    view: view1
});

// Test Routine
//var point = ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857');
//var pixel = map.getPixelFromCoordinate(point);
//console.log(point);

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