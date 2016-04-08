// GLOBAL VARIABLES

var LAT;
var LON;
var weatherAPI = {};
var APIURL;

// EVENTS

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      LAT = position.coords.latitude;
      LON = position.coords.longitude;
    });
  }
}

function setAPIURL() {
  APIURL = "https://api.forecast.io/forecast/1a6a08acc3ff5154f3946d4ef3a215fa/37.8267,-122.423";
}

// function getWeather() {
//   weatherObj = JSON.parse(weatherAPI);
// };

// DOCUMENT READY

$(function() {
  setAPIURL();
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "example.json",
    success: function(info) {
      weatherAPI = info;
    }
  });
  getCoords();
  // getWeather();
});
