// GLOBAL VARIABLES

var LAT;
var LON;
var weatherObj;


// EVENTS

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      LAT = position.coords.latitude;
      LON = position.coords.longitude;
    });
  }
}

function getWeather() {
  var apiURL = "api.openweathermap.org/data/2.5/weather?lat=35&lon=139";
  var weatherAPI = $.getJSON(apiURL, function() {
    console.log("We're in, Jacobs!")
  });
  weatherObj = JSON.parse(weatherAPI);
}

// DOCUMENT READY

$(document).ready(function() {
  getCoords();
  getWeather();
});
