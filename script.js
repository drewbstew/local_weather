// GLOBAL VARIABLES

var lat;
var lon;
var weatherAPI;
var apiURL;
var googleAPIURL;
var googleAPI;
var centigrade = false;
var tempDisplay;

// SELECTORS

var $currentWeatherIcon = $("#current-weather-icon");
var $location = $('#loc-name');
var $currentTemp = $('#current-temp');
var $currentCond = $('#current-cond');
var $body = $('body');
var $tempSwitch = $('#temp-switch');
var $forecastSummary = $('#forecast-summary');
var $forecastDays = $('.forecast-day-container');

// EVENTS

function changeButtonText() {
  degree = ['Celsius', 'Fahrenheit'];
  if (!centigrade) {
    $tempSwitch.html("Switch to " + degree[0]);
  } else {
    $tempSwitch.html("Switch to " + degree[1]);
  }
}

$tempSwitch.click(function(){
  if (!centigrade) {
    centigrade = true;
  } else {
    centigrade = false;
  }
  setWeather();
  changeButtonText();
});

function makeRocketGoNow() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeatherAPI();
      getGoogleAPI();
      changeButtonText();
    });
  }
}

function setWeatherAPIURL() {
  apiURL = "https://api.forecast.io/forecast/1a6a08acc3ff5154f3946d4ef3a215fa/" + lat.toString() + "," + lon.toString();
}

function setGoogleAPIURL() {
  googleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat.toString() + "," + lon.toString() + "&sensor=false";
}

function getWeatherAPI() {
  setWeatherAPIURL();
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: apiURL,
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
    url: googleAPIURL,
    success: function(info) {
      googleAPI = info;
      findCityName();
    }
  });
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
    setForecastWeather();
  }
}

function formatTemp(temp) {
  if (centigrade) {
    return Math.round((temp - 32) * (5/9));
  } else {
    return Math.round(temp);
  }
}

function setForecastWeather() {
  $forecastSummary.html(weatherAPI.daily.summary);
  setForecastDailyWeather();
}

function setForecastDailyWeather() {
  var forecastData = weatherAPI.daily.data;
  var i = 1;
  $forecastDays.each(function() {
    var conditions = formatConditions(forecastData[i].icon);
    $(this).find("h4").html(findDay(forecastData[i].time));
    $(this).find("p").html(forecastData[i].summary);
    $(this).find(".row .info-col ul .forecast-temp-max").html("High: " + formatTemp(forecastData[i].temperatureMax).toString() + "&deg;" + tempDisplay);
    $(this).find(".row .info-col ul .forecast-temp-min").html("Low: " + formatTemp(forecastData[i].temperatureMin).toString() + "&deg;" + tempDisplay);
    changeIcon($(this).find(".row .icon-col .weather-icon"), conditions);
    i++;
  });
}

function findDay(time) {
  var newDate = new Date(time * 1000);
  var today = new Date().getTime();
  if ((newDate - today) <= 86400000) {
    return "Tomorrow";
  } else {
    return getWeekday(newDate) + ", " + getMonthName(newDate) + " " + newDate.getDate();
  }
}

function getWeekday(date) {
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[date.getDay()];
}

function getMonthName(date) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()];
}

function setCurrentWeather(conditions) {
  $currentTemp.html(formatTemp(weatherAPI.currently.temperature) + "&deg;" + tempDisplay);
  $currentCond.html(weatherAPI.currently.summary);
  changeBackgroundImage(conditions);
  changeIcon($currentWeatherIcon, conditions);
}

function changeBackgroundImage(conditions) {
  switch (conditions) {
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
      $body.css('background-image','url(images/clear_night.jpg)');
      break;
    default:
      $body.css('background-image','url(images/clear_day.jpg)');
      break;
  }
}

function changeIcon(icon, conditions) {
  switch (conditions) {
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
      icon.addClass('wi-night-clear').removeClass('wi-day-sunny');
      break;
    default:
      break;
  }
}

function formatConditions(conditions) {
  switch (conditions) {
    case 'cloudy':
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      return 'cloudy';
    case 'rain':
      return 'rain';
    case 'snow':
    case 'sleet':
      return 'snow';
    case 'clear-night':
      return 'clear-night';
    default:
      return 'clear-day';
  }
}

// DOCUMENT READY

$(function() {
  makeRocketGoNow();
});
