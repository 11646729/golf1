/**
 * Created by briansmith on 18/02/2016.
 */

var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([0, 0]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'images/icon.png'
    }))
});

iconFeature.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
    features: [iconFeature]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

// Create the Golf Courses Layer from a GeoJSON file
/*var vectorLayer = new ol.layer.Vector({
    title: 'Golf Courses Layer',
    source: new ol.source.Vector({
        url: '/testData/geoJsonFiles/GolfCourses.json',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction
})*/

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

// change mouse cursor when over marker
map.on('pointermove', function(e) {
    if (e.dragging) {
        $(element).popover('destroy');
        return;
    }

    //var coord4326 = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    //$('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 4));

    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

// Fit to extent routine - http://gis.stackexchange.com/questions/150997/openlayers-3-zoom-to-extent-only-working-in-debug
vectorLayer.getSource().on("change", function(evt) {
    var extent = vectorSource.getSource().getExtent();
    map.getView().fit(extent, map.getSize());
});

