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
  var apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=7659f6cb6a239baae136586790309e08";
  var weatherAPI = $.ajax({
    url: apiURL,
    dataType: "jsonp",
    success: function(){
      console.log("We're in, Jacobs!")
  });
  weatherObj = JSON.parse(weatherAPI);
}

// DOCUMENT READY

$(document).ready(function() {
  getCoords();
  getWeather();
});
