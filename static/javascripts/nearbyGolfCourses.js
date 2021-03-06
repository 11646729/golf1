/**
 * Created by briansmith on 20/05/2016.
 */
// This line prevents Webstorm warnings from google
var google = google || {}
var markers = []
var map, myBounds, model, infoWindow

/**
 * Initialization function
 */
function init () {
  /**
   * Options for map
   */
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    center: {lat: 44.540, lng: -78.546},
    zoom: 12,
    // minZoom: 6,
    zoomControl: true,
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
    streetViewControl: false
  }

  /**
   * Draw Map to the bounds of the points plotted
   */
  map = new google.maps.Map(document.getElementById('map'), mapOptions)

  /**
   * Set up empty infoWindow
   */
  infoWindow = new google.maps.InfoWindow({content: ''})

  /**
   * Add Events
   */
  map.addListener('zoom_changed', function (event) {
    showMarkers()
  })

  map.addListener('mousemove', function (event) {
    displayCoordinates(event.latLng)
  })
}

/**
 * Receive the initial data pushed from the server
 */
var socket = io()

$(document).ready(function () {
  socket.on('loadNearbyGolfCoursesData', function (myNewCoords) {
    // Model for MVC
    model = myNewCoords

    // Calculate the map bounds to fit the data
    map.fitBounds(calculateBounds(model))

    // Update the markers array from myNewCoords
    updateMarkersArray(model)

    // Now show the markers on the map
    showMarkers()
  })

  /**
   * TODO
   */
  socket.on('updateNearbyGolfCoursesData', function (updateCoords) {

  })
})

/**
 * Calculate map bounds & fit map to bounds using Points
 */
function calculateBounds (model) {
  myBounds = new google.maps.LatLngBounds()

  for (var j = 0; j < model[0].features.length; j++) {
    if (model[0].features[j].geometry.type === 'Point') {
      var coordsj = model[0].features[j].geometry.coordinates
      myBounds.extend(new google.maps.LatLng(coordsj[1], coordsj[0]))
    }
  }

  console.log(myBounds)

  return myBounds
}

/**
 * Create markers using Points & store in markers array
 */
function updateMarkersArray (model) {
  for (var i = 0; i < model[0].features.length; i++) {
    if (model[0].features[i].geometry.type === 'Point') {
      var coords = model[0].features[i].geometry.coordinates
      var dataName = model[0].features[i].properties.name

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(coords[1], coords[0]),
        map: map,
        visible: true,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
          fillColor: 'red',
          fillOpacity: 0.6,
          strokeColor: 'white',
          strokeWeight: 2
        },
        note: dataName
      })

      /**
       * Add the infoWindow with details specific to this marker
       */
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent('<div>' + this.note + '</div>')
        infoWindow.open(map, this)
      })

      markers.push(marker)
    }
  }
}

/**
 * Display coordinates when mouse is moved
 */
function displayCoordinates (pnt) {
  var coordsLabel = document.getElementById('mouse4326')
  var lat = pnt.lat()
  lat = lat.toFixed(4)
  var lng = pnt.lng()
  lng = lng.toFixed(4)
  coordsLabel.innerHTML = 'EPSG:4326: Latitude: ' + lat + '  Longitude: ' + lng
}

/**
 * Sets all markers on the the map
 */
function setMapOnAll (map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
  }
}

/**
 * Show all the markers
 */
function showMarkers () {
  setMapOnAll(map)
}

/**
 * Hide all the markers
 */
function hideMarkers () {
  setMapOnAll(null)
}
