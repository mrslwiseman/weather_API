$(document).ready(function(){

/*global*/
  var latitude = "";
  var longitude = "";
  var metricDisplayed = true;
  var tempUnit = "\u00B0C";
  var windSpeedUnit = "km/h";


  var calculateWindDirection = function(windDeg){

    if (windDeg>11.25 && windDeg<33.75){
      return "NNE";
    }else if (windDeg>33.75 && windDeg<56.25){
      return "ENE";
    }else if (windDeg>56.25 && windDeg<78.75){
      return "E";
    }else if (windDeg>78.75 && windDeg<101.25){
      return "ESE";
    }else if (windDeg>101.25 && windDeg<123.75){
      return "ESE";
    }else if (windDeg>123.75 && windDeg<146.25){
      return "SE";
    }else if (windDeg>146.25 && windDeg<168.75){
      return "SSE";
    }else if (windDeg>168.75 && windDeg<191.25){
      return "S";
    }else if (windDeg>191.25 && windDeg<213.75){
      return "SSW";
    }else if (windDeg>213.75 && windDeg<236.25){
      return "SW";
    }else if (windDeg>236.25 && windDeg<258.75){
      return "WSW";
    }else if (windDeg>258.75 && windDeg<281.25){
      return "W";
    }else if (windDeg>281.25 && windDeg<303.75){
      return "WNW";
    }else if (windDeg>303.75 && windDeg<326.25){
      return "NW";
    }else if (windDeg>326.25 && windDeg<348.75){
      return "NNW";
    }else{
      return "N";
    }
  };

function calculateWindSpeed(windSpeed){
  if (metricDisplayed){
    // m/s to km/h
    return (windSpeed * 18) / 5;
  } else {
    // ft/s to mph
    return windSpeed * .681818;
  }
}


function checkRain(rain){
  if(rain){
    return rain + "mm";
  } else {
    return "0mm";
  }
}









  var displayWeather = function(response, statusString, jqXHR){

    // current weather ******************************************************************************************

    var currentWeather = {
      cityName : response.city.name,
      weatherCategory : response.list[0].weather.main,
      weatherDesc : response.list[0].weather[0].description,
      weatherBackground : response.list[0].weather[0].main.toLowerCase(),
      rain : checkRain(response.list[0].rain),
      icon : response.list[0].weather[0].icon,
      id : response.list[0].weather[0].id, // returns ID number
      temp : response.list[0].temp.day.toFixed(0),
      highTemp : response.list[0].temp.max.toFixed(0),
      lowTemp : response.list[0].temp.min.toFixed(0),
      windSpeed : calculateWindSpeed(response.list[0].speed).toFixed(0),
      windDir :  calculateWindDirection(response.list[0].deg),
    };

    $("#city").text(currentWeather.cityName);
    $("#mainTemp").text(currentWeather.temp + tempUnit);
    $("#weather").text(currentWeather.weatherDesc);
    $("#icon").attr("src", "http://openweathermap.org/img/w/" + currentWeather.icon + ".png");

    $("#lowTemp").text(currentWeather.lowTemp + tempUnit);
    $("#highTemp").text(currentWeather.highTemp + tempUnit);
    $("#windSpeed").text(currentWeather.windSpeed + windSpeedUnit);
    $("#windDirection").text(currentWeather.windDir + " ");
    $("#rain").text(currentWeather.rain);

    // set background
    //$("body").css("background-image","url(./img/backgrounds/" + currentWeather.weatherBackground + ".jpg)");


//    $("#body").css("background-image","url(../img/backgrounds/" + currentWeather.weatherBackground + ".jpg");

    console.log(response)
    // ************************************************************************************************************


    // forecast

//clear all results on refresh / change of units. otherwise append just adds new days on
$("#forecastWeek").html("");


    for(var i = 1; i <6; i++){

    //  var weatherDesc = response.list[i].weather[0].description;

      var icon = response.list[i].weather[0].icon;
      var highTemp = response.list[i].temp.max.toFixed(0);
      var lowTemp = response.list[i].temp.min.toFixed(0);



      var dt = new Date(response.list[i].dt*1000).getDay();
      var day = function(){
        switch(dt){
          case 0:
          return "S";
          case 1:
          return "M";
          case 2:
          return "T";
          case 3:
          return "W";
          case 4:
          return "T";
          case 5:
          return "F";
          case 6:
          return "S";
        }
      }


      $("#forecastWeek").append("<div class='forecastDays forecast" + i + "'>");


      $(".forecast" + i).append(day);
      $(".forecast" + i).append('<div><img src="http://openweathermap.org/img/w/' + icon + '.png" /></div>');

      $(".forecast" + i).append("<div>" + highTemp + tempUnit + "</div>");

      $("#forecastWeek").append("</div>");

    } // end FOR loop






  }












  // get weather for location
  var getWeather = function(unitsSelected){ // is passed results of ip-api location getJSON request, if no arguments passed.


    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/forecast/daily",
      data: {
        APPID: "474fac786738181584be2c4651cdbde8",
        units: function(){
          if(unitsSelected === "imperial"){
            return "imperial"
          } else {
            return "metric"
          }
        },
        lat: latitude,
        lon: longitude,

      },
      success: displayWeather
    });


  };




  var nIntervId;

  function checkWeather(){
    nIntervId = setInterval(getWeather, 120000);
    // get users location
    $.getJSON("http://ip-api.com/json", function(response){

      console.log(response)
      latitude = response.lat;
      longitude = response.lon;
    }).done( getWeather ) // proceed once location is known.
  }



  $("#lookupId").on("click",  function(event){
    getWeather("1851632");
  });



  var changeUnits = function(){
console.log("change units run");
    if (metricDisplayed){
      console.log("metricdisplayed if");
      console.log("metricDisplayed, changing to imperial now")
      tempUnit = "\u00B0F";
      windSpeedUnit = "mph"
      metricDisplayed = false;
      $("#celcius").removeClass("selectedUnit");
      $("#fahrenheit").addClass("selectedUnit");
      getWeather("imperial");
    } else {
      console.log("metricdisplayed else");

      getWeather("metric")
      tempUnit = "\u00B0C";
      windSpeedUnit = "km/h";
      metricDisplayed = true;
      $("#fahrenheit").removeClass("selectedUnit");
      $("#celcius").addClass("selectedUnit");
    }
  }


  $("#unit").on("click", function(event){
    changeUnits();
  });


  // Object: selected unit
  // temp
  // windspeed

  // put metric into an object
  // put imperial into an object

  // cache results of each ajax call when changing units, so not so many
  // requests are made?

  checkWeather();

}) // end ready

//requestWeather();
