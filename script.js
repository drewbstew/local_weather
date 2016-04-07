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

// function getWeather() {

//   var weatherAPI =
//   weatherObj = JSON.parse(weatherAPI);
// }

// DOCUMENT READY

$(document).ready(function() {
  getCoords();
  $.ajax({
    url: "https://otter.topsy.com/urlinfo.js?url=https://www.nytimes.com",
    dataType: 'jsonp',
    success: function(results){
        var title = results.response.oneforty;
        var numTweets = results.response.trackback_total;
        $('#results').append(title + ' has ' + numTweets + ' tweets.');
    }
});
  // getWeather();
});
