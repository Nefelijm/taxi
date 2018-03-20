// Inicializando el mapa y creando
function initMap() {
 var markador, latitud, longitud;
 var map = new google.maps.Map(document.getElementById('map'),{ 
      zoom: 5,
      center:{lat: -12.1191427, lng: -77.0349046}
    });

  var myUbication = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

// Agregando marcador (la propiedad position define la posicion de marcador)
	 markador = new google.maps.Marker({		
      position: {lat:latitud, lng:longitud},
      map: map,
    });

    map.setZoom(17);// Acercamos al mapa
    map.setCenter({ lat:latitud, lng:longitud});// Asignamos un nuevo centro del mapa
  };

// Si encontramos algun problema se activa la funcion error
  var error = function(error) {
    window.alert('No se ha encontrado tu localización');
  };

  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myUbication, error);
    }
  }

// llamando a los elementos del  DOM
  let start = document.getElementById('inputStart');
  let destination = document.getElementById('inputDestiny');

// Autocompletando en el search
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(destination);
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;

//Calcular Ruta y precio
  let calculateRoute = function(directionsService, directionsDisplay) {

      var request = {
        origin: start.value,
        destination: destination.value,
        travelMode: 'DRIVING'
      };

      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
        directionsDisplay.setDirections(result);
        var distancia = result.routes[0].legs[0].distance.value/1000;
        var duracion = result.routes[0].legs[0].duration.text;
        var costo = (distancia*1.75).toFixed(2);

        document.getElementById('calcTarifa').innerHTML="";
        document.getElementById('calcTarifa').innerHTML=`Costo: S/. ${costo} <br> Duración: ${duracion}`;
        directionsDisplay.setDirections(result);
      }
        else {
      window.alert('No encontramos tu ruta');
    }	
    })



  };

  directionsDisplay.setMap(map);

  window.addEventListener('load', search);
  document.getElementById('rute').addEventListener('click', function() {
    calculateRoute(directionsService, directionsDisplay);
  });
};