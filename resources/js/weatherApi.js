var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
}
var thelocation;
var titleName;
$(document).ready(function () {
    $('#weather-map').click(function () {
        console.log("button is working");
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: new google.maps.LatLng(2.8, -187.3),
            mapTypeId: 'terrain'
        });
        $.ajax({
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", //Unused example: https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-01-01&endtime=2018-01-02",
            error: function () {
                $('#info').html('<p>An error has occurred</p>');
            },
            success: function (data) {
                $.each(data.features, function (key, val) {
                    var coords = val.geometry.coordinates;
                    lat = coords[1]; // geojson uses (lng, lat) ordering so lat stored at coords[1]
                    lng = coords[0]; // lng stored at coords[0]
                    var latLng = new google.maps.LatLng(lat, lng);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        label: val.properties.mag.toString()
                    });
                    the_href = val.properties.url + "\'" + ' target=\'_blank\'';
                    var infowindow = new google.maps.InfoWindow({
                        content: "We access some external data (in this case it is weather) when we click on a marker. We update the page with the weather information. This method is useful for any data API that can be searched using a lat,lon coordinate."
                    });
                    marker.addListener('click', function () {
                        // We use the lat and lon as the parameters in the API call to weather service
                        var lat = marker.position.lat();
                        var lng = marker.position.lng();
                        // You need to use the FREE signup at https://www.apixu.com/ to get a key for the Weather URL below
                        theURL = 'http://api.apixu.com/v1/current.json?key=YOUR-APIXU-KEY&q=' + lat.toFixed(4) + ',' + lng.toFixed(4);
                        $.ajax({
                            url: theURL,
                            success: function (data) {
                                image = new Image();
                                if (data.error) {
                                    image.src = "http://via.placeholder.com/64x64?text=%20"; // Error, so we use blank image for weather. See 'error:' below for another way to include a small blank image
                                }
                                else {
                                    image.src = "http:" + data.current.condition.icon; // icon is specified within the data
                                    $('#weatherInfo').html('<p>' + data.current.condition.text + '</p>'); // current weather in text format
                                }
                                image.onload = function () {
                                    $('#weatherImage').empty().append(image);
                                };
                            },
                            error: function () { // Weather service could not provide weather for requested lat,lon world location
                                image = new Image();
                                // A local 64*64 transparent image. Generated from the useful site: http://png-pixel.com/
                                image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAPElEQVR42u3OMQEAAAgDIJfc6BpjDyQgt1MVAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBgXbgARTAX8ECcrkoAAAAAElFTkSuQmCC";
                                image.onload = function () {
                                    //set the image into the web page
                                    $('#weatherImage').empty().append(image);
                                };
                            }
                        });
                        infowindow.open(map, marker);
                    });
                });
            }
        });
    });
});

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
