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

/*
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
*/

var readSource = new ol.source.Vector({
    url: '/testData/GolfCourses.json',
    format: new ol.format.GeoJSON()
});

// This shows 'ready'
//console.log(readSource.getState());

// Create the Golf Courses Layer from a GeoJSON file
var vectorSource = new ol.layer.Vector({
    title: 'Golf Courses Layer',
    source: readSource,
    style: styleFunction
})

var attribution = new ol.control.Attribution({
    collapsible: false
});

// Create the Map
// default renderer is canvas

// The ol.control.defaults({ attribution: false }).extend([attribution]) means use default controls
// except the default attribution (attribution: false) and then add the new attribution object to list
// of controls using an array (.extend([attribution]))

var map = new ol.Map({
    layers: [ baseMapLayer, vectorSource], /* projection */
    target: 'map',
    renderer: 'canvas',
    view: new ol.View({
        center: new ol.proj.transform([-5.683818, 54.623937], 'EPSG:4326', 'EPSG:3857'),
        maxZoom: 19,
        zoom: 8
    }),
    //controls: ol.control.defaults({ attribution: false }).extend([attribution]),
    interactions: ol.interaction.defaults().extend([select])
});

// This routine traps coordinates of mouse then converts them
map.on('pointermove', function(event) {
    var coord4326 = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 4));
});

// Fit to extent routine - doesn't work getState throws an error
/*
vectorSource.once('change',function(e){
    if(readSource.getState() === 'ready') {
        if(vectorSource.getSource().getFeatures().length>0) {
            map.getView().fit(vectorSource.getExtent(), map.getSize());
        }
    }
});
*/

// This may work ?? http://gis.stackexchange.com/questions/150997/openlayers-3-zoom-to-extent-only-working-in-debug
// It seems to correctly find the extents - according to Chrome
// But not to fit to these extents properly

// EPSG:3857 -755249.2003572898,7211536.239261792,-608825.6647398112,7400726.720027477
// EPSG:4326 -6.784519000000001,54.217919999999964,-5.469174,55.199730999999986
vectorSource.getSource().on("change", function(evt) {
    extent = vectorSource.getSource().getExtent();
    map.getView().fit(extent, map.getSize());

    console.log("EPSG:3857 " + extent);
    extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:3857", "EPSG:4326"));
    console.log("EPSG:4326 " + extent);
});
