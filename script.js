// RING RING! WAKE UP, API

var weatherAPI = $.getJSON("api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}");

// GLOBAL VARIABLES

var lat;
var long;

// EVENTS

function getWeather(la,lo){
  la = lat;
  lo = long;
}

function getCoords(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      long = position.coords.longitude;
    });
  }
}

// DOCUMENT READY

$(document).ready(function(){
  getCoords();
  getWeather();
});
