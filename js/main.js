//Inicializando map, documentación google maps, places searches 
var map, infoWindow;
function initMap() {

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //options for every map: center and zoom, from google documentation
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: pos.lat,
          lng: pos.lng,
        },
        zoom: 15,
      });
      infoWindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);
      //Se pasa un método de devolución de llamada a 
      //nearbySearch (devuelve una lista de lugares cercanos en función de la ubicación del usuario)
      service.nearbySearch({
        //request
        location: pos,
        radius: 500,
        type: ['restaurant']
      }, callback);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      /*  var place = results[i]; */
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  /*  var placeLoc = place.geometry.location; */
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, marker);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// mostrando foto de los restaurantes mas cerca

