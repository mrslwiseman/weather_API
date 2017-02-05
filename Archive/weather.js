$(document).ready(function(){

//global variables
  var latitude = "";
  var longitude = "";


  var displayWeather = function(response, statusString, jqXHR){
    var cityName = response.name;
    var weatherDesc = response.weather[0].description;
    var weatherBackground = response.weather[0].main;
    // temperature related code
    var temp = response.main.temp;
    var tempMax;
    var tempMin;
    var tempC = (temp - 273.15).toFixed(1); // rounds decimal points
    var tempF = (temp * 9/5 - 459.67).toFixed(1);

    console.log(response);

    $('#city').text(cityName);
    $('#temp').text(tempC);
    $('#weather').text(weatherDesc);
  }

  // get weather for location
  var getWeather = function(weatherLocationId){ // is passed results of ip-api location getJSON request, if no arguments passed.

    if(weatherLocationId.length > 1){
      latitude = "";
      longitude = "";

    }
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
        APPID: "474fac786738181584be2c4651cdbde8",
        id: weatherLocationId,
        lat: latitude,
        lon: longitude
      },
      success: displayWeather
    });


  }

  // get users location
  $.getJSON("http://ip-api.com/json", function(response){
    latitude = response.lat;
    longitude = response.lon;
  }).done( getWeather ) // proceed once location is known.


  $('#lookupId').on("click",  function(event){
    getWeather("1851632");
  });



var convertTemp = function(){
  console.log("convertTemp");





}


  $('#convertTemp').on("click", function(event){
    convertTemp();
  });
















}) // end ready








//requestWeather();





//convert to fahrenheit from celcius
// mathematical function here
// make a whole new ajax request
// pass modified data to exisitng ajax request.
