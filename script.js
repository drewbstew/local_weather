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
      setAPIURL();
    });
  }
}

function setAPIURL() {
  APIURL = "https://api.forecast.io/forecast/1a6a08acc3ff5154f3946d4ef3a215fa/" + LAT.toString() + "," + LON.toString();
}

// DOCUMENT READY

$(function() {
  getCoords();
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: APIURL,
    success: function(info) {
      weatherAPI = info;
    }
  });
});
