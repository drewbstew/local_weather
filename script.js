// GLOBAL VARIABLES

var LAT;
var LON;
var weatherObj;
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
  apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=7659f6cb6a239baae136586790309e08";
}

// function getWeather() {
//   weatherObj = JSON.parse(weatherAPI);
// };

// DOCUMENT READY

$(document).ready(function() {
  setAPIURL();
  $.ajax({
    type: 'GET',
    url: APIURL,
    success: function(data) {
      console.log("We're in, Jacobs!");
    }
  });
  getCoords();
  // getWeather();
});
