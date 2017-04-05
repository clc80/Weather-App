$(document).ready(function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      var apiKey = "bea1df06bbf6bd07ec0f1bdb0e9b89f3";
      var long = position.coords.longitude;
      var lat = position.coords.latitude;
      var requestURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&APPID=" + apiKey;
      var cel = true;

      $.getJSON(requestURL, null, function(info) {
        $("#location").html("The Weather at " + info.name + " is currently: ");
        var icon = info.weather[0].icon;
        var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
        $("#icon").html('<img src="' + iconSrc + '">');
        $("#desc").html(info.weather[0].description);
        var currentTemp = displayTemp(info.main.temp, cel);
        $("#temp").html(currentTemp);
        var convertedWind = convertWind(info.wind.speed);
        $("#wind").html("Wind speed is " + convertedWind.toFixed(2) + " mph");

        $('#convert').click(function() {
          cel = !cel;
          $("#temp").html(displayTemp(info.main.temp, cel));
        });
        //$("#data").html(JSON.stringify(info));
      });

    });
  }
});

function convertWind(wind) {
  return (wind * (3600 / 1609.344));
}

function displayTemp(fTemp, c) {
  if (c) {
    return Math.round((fTemp) * (9 / 5) + 32) + " &deg;F";
  }
  return Math.round(fTemp) + " &deg;C";
}
