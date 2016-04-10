// GLOBAL VARIABLES

var LAT;
var LON;
var weatherAPI;
var APIURL;
var GOOGLEAPIURL;
var googleAPI;


// SELECTORS

var $currentWeatherIcon = $("#current-weather-icon");
var $forecastWeatherIcon = $("#forecast-weather-icon");
//var $body = $(body);
var $location = $('#loc-name');
var $currentTemp = $('#current-temp');
var $currentCond = $('#current-cond');

// EVENTS

function makeRocketGoNow() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      LAT = position.coords.latitude;
      LON = position.coords.longitude;
      setWeatherAPIURL();
      getWeatherAPI();
      setGoogleAPIURL();
      getGoogleAPI();
      findCityName();
    });
  }
}

function setWeatherAPIURL() {
  APIURL = "https://api.forecast.io/forecast/1a6a08acc3ff5154f3946d4ef3a215fa/" + LAT.toString() + "," + LON.toString();
}

function setGoogleAPIURL() {
  GOOGLEAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + LAT.toString() + "," + LON.toString() + "&sensor=false";
}

function getWeatherAPI() {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: APIURL,
    success: function(info) {
      weatherAPI = info;
    }
  });
}

function getGoogleAPI() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: GOOGLEAPIURL,
    success: function(info) {
      googleAPI = info;
    }
  })
}

function findCityName() {
  var addressComponents = googleAPI.results[0].address_components;
  for (i = 0; i < addressComponents.length; i++) {
    if (addressComponents[i].types[0] == "locality" && addressComponents[i].types[1] == "political") {
      $location.html(addressComponents[i].short_name);
    } else {
      i++;
    }
  }
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
  makeRocketGoNow();
});
