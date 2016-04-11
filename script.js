// GLOBAL VARIABLES

var LAT;
var LON;
var weatherAPI;
var APIURL;
var GOOGLEAPIURL;
var googleAPI;
var centigrade = false;
var tempDisplay;
var tempFormatted;


// SELECTORS

var $currentWeatherIcon = $("#current-weather-icon");
//var $forecastWeatherIcon = $("#forecast-weather-icon");
var $location = $('#loc-name');
var $currentTemp = $('#current-temp');
var $currentCond = $('#current-cond');
var $body = $('body');
var $tempSwitch = $('#temp-switch');

// EVENTS

function clickTempSwitch() {
  $tempSwitch.on('click', function(){
    if (centigrade == false) {
      centigrade = true;
    } else {
      centigrade = false;
    }
  });
  setWeather();
}

function makeRocketGoNow() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      LAT = position.coords.latitude;
      LON = position.coords.longitude;
      getWeatherAPI();
      getGoogleAPI();
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
  setWeatherAPIURL();
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: APIURL,
    success: function(info) {
      weatherAPI = info;
      setWeather();
    }
  });
}

function getGoogleAPI() {
  setGoogleAPIURL();
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: GOOGLEAPIURL,
    success: function(info) {
      googleAPI = info;
      findCityName();
    }
  })
}

function findCityName() {
  var addressComponents = googleAPI.results[0].address_components;
  for (i = 0; i < addressComponents.length; i++) {
    if (addressComponents[i].types[0] == "locality" && addressComponents[i].types[1] == "political") {
      $location.html(addressComponents[i].long_name);
      break;
    }
  }
}

// faere... faren... farin... FUCK I hate that word
function fOrC() {
  if (!centigrade) {
    tempDisplay = "F";
  } else {
    tempDisplay = "C";
  }
}

// WEATHER CONTROL

function setWeather() {
  fOrC();
  if (typeof weatherAPI === "object") {
    setCurrentWeather(formatConditions(weatherAPI.currently.icon));
  }
}

function formatTemp(temp) {
  if (centigrade) {
    return (temp - 32) * (5/9)
  }
}

function setCurrentWeather(conditions) {
  $currentTemp.html(formatTemp(Math.round(weatherAPI.currently.temperature)) + "&deg;" + tempDisplay);
  $currentCond.html(weatherAPI.currently.summary);
  case 'cloudy':
    $body.css('background-image','url(images/cloudy.jpg');
    break;
  case 'snow':
    $body.css('background-image','url(images/snow.jpg)');
    break;
  case 'rain':
    $body.css('background-image','url(images/rain.jpg)');
    break;
  case 'clear-night':
    $body.css('background-image','url(images/clear-night.jpg)');
    break;
  case default:
    $body.css('background-image','url(images/clear-day.jpg)');
    break;
}

function changeIcon(icon, conditions) {
  case 'cloudy':
    icon.addClass('wi-cloudy').removeClass('wi-day-sunny');
    break;
  case 'snow':
    icon.addClass('wi-snow').removeClass('wi-day-sunny');
    break;
  case 'rain':
    icon.addClass('wi-rain').removeClass('wi-day-sunny');
    break;
  case 'clear-night':
    $body.css('background-image','url(images/clear-night.jpg)');
    icon.addClass('wi-night-clear').removeClass('wi-day-sunny');
    break;
  case default:
    break;
}

function formatConditions() {
  case 'cloudy':
  case 'partly-cloudy-day':
  case 'partly-cloudy-night':
    return 'cloudy';
    break;
  case 'rain':
    return 'rain';
    break;
  case 'snow':
  case 'sleet':
    return 'snow';
    break;
  case 'clear-night':
    return 'clear-night';
    break;
  default:
    return 'clear-day';
    break;
}


// DOCUMENT READY

$(function() {
  makeRocketGoNow();
});
