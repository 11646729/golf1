/**
 * Created by briansmith on 20/02/2016.
 */

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
