// GLOBAL VARIABLES

var LAT;
var LON;
var weatherAPI;
var APIURL;


// SELECTORS

var $currentWeatherIcon = $("#current-weather-icon");
var $forecastWeatherIcon = $("#forecast-weather-icon");
//var $body = $(body);
var $location = $('#loc-name');
var $currentTemp = $('#current-temp');
var $currentCond = $('#current-cond');

// EVENTS

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      LAT = position.coords.latitude;
      LON = position.coords.longitude;
      setAPIURL();
      getAPI();
    });
  }
}

function setAPIURL() {
  APIURL = "https://api.forecast.io/forecast/1a6a08acc3ff5154f3946d4ef3a215fa/" + LAT.toString() + "," + LON.toString();
}

function getAPI() {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: APIURL,
    success: function(info) {
      weatherAPI = info;
    }
  });
}

// WEATHER CONTROL

function setWeather() {
  if (typeof weatherAPI === "object") {
    $currentTemp.html(Math.round(weatherAPI.currently.temperature));
    $currentCond.html(weatherAPI.currently.summary);
  }
}

// DOCUMENT READY

$(function() {
  getCoords();
  setWeather();
});
