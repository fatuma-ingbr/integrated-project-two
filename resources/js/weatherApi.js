/**
 * 
 */
//$(document).ready(function(){
//    $("button").click(function(){
//        $.getJSON("http://api.apixu.com/v1/current.json?key=8c56c6af6d8a458fa49222421182311&q=48.8567,2.3508",
//        		function(result){
////            alert("Data: " + data + "\nStatus: " + status);
//            console.log(result)
//        });
//    });
//});
//
var lat = 0;
var lon = 0;
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

openWeatherURL = "http://api.apixu.com/v1/forecast.json?key=8c56c6af6d8a458fa49222421182311&q=";

$(document).ready(function() {
//Weather through geo-location
if (navigator && navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(succesGetPos, errorGetPos);
}
//Weather through city search 
$("#search").submit(getCityWeather); 	

//Weather through longitude and latitude search 
$("#submit").submit(getCoordWeather); 	
});

function succesGetPos(pos) {
	//var openWeatherURL = "",
	corsAwURL = "https://cors-anywhere.herokuapp.com/";
	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
// The "https://cors-anywhere.herokuapp.com/" url is used to fix the "same-origin policy" (crossorigin) problem with the ajax call.
//If you want to work with navigator.geolocation, JSONP can't solve the issue for every browser due to the different connection type: https on codepen (for making navigator.geolocation works on chrome), http on api.openweathermap (it doesn't seem to work on firefox anyway).
// The "https://cors-anywhere.herokuapp.com/" url actually behaves like a proxy.
	url= lat + "," + lon + "&days=4";
	$.getJSON(corsAwURL + openWeatherURL+url, openWeatherCall);
return 0;
}

function errorGetPos() {
alert("Failed to get current position.");

return -1
}

function openWeatherCall(json) {
	$("#city").val(json.location.name + ", " + json.location.country);
	$("#temp").html(json.current.temp_c.toFixed(1));
	$("#hum").html(json.current.humidity);
	$("#icon").html("<img src='http:"+json.current.condition.icon+"'>");
	$("#weather").html(json.current.condition.text);
	$("#forecast").empty();
	for (var i = 0; i < json.forecast.forecastday.length; i++) {
		d = new Date(json.forecast.forecastday[i].date);
		day = "<span class ='row'>"+weekday[d.getDay()]+"</span>";
		pic = "<img class ='row' src='http:"+json.forecast.forecastday[i].day.condition.icon+"'>";
		p = "<div class ='row'>"+json.forecast.forecastday[i].day.avgtemp_c+"</div>";
		$('#forecast').append("<div class='col' id = 'day"+i+"'>"+ day + pic + p +"</div>")
	}
	console.log(json);
	//console.log(json.forecast.forecastday[0]);
	//console.log(json.forecast.forecastday[1].date);

return 0;
}

function getCityWeather() {
var openWeatherQuery = openWeatherURL,
  cityName = $("#city").val(),
  corsAwURL = "https://cors-anywhere.herokuapp.com/";
$.getJSON(corsAwURL + openWeatherQuery + cityName + "&days=4", openWeatherCall);

return 0;
}

function getCoordWeather() {
	console.log($("#lat").val());
	var openWeatherQuery = openWeatherURL,
		lat = $("#lat").val();
		lon = $("#lon").val();
		corsAwURL = "https://cors-anywhere.herokuapp.com/";
		url= lat + "," + lon + "&days=4";
		$.getJSON(corsAwURL + openWeatherQuery + url, openWeatherCall);

	return 0;
}
