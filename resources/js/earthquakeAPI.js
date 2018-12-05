var map;
var thelocation;
var titleName;

var quakeFeeds = {
    "past hour": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
        "all 1.0+": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
    },
    "past day": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
        "all 1.0+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson"
    },
    "past week": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
        "all 1.0+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
    },
    "past month": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        "all 1.0+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
    }
};

/* Function to construct a set of web page buttons of class: 'feed-name' where each button has a stored URL property */
function makeChildProps(obj, currentProp) {
    var childProps = '';

    for (var prop in obj[currentProp]) {
        var el = "<div class='child-prop'><button class='feed-name' data-feedurl='" + obj[currentProp][prop] + "'>" + prop + "</button></div>";
        childProps += el;
    }

    return childProps;
}

/* construct the buttons (that include the geojson URL properties) */
for (var prop in quakeFeeds) {
    if (!quakeFeeds.hasOwnProperty(prop)) {
        continue;
    }
    $('#feedSelector').append("<div class='feed-date'>" + prop + "</div>" + makeChildProps(quakeFeeds, prop));
    console.log(makeChildProps(quakeFeeds, prop));
}
/* respond to a button press of any button of 'feed-name' class */
$('.feed-name').click(function (e) {
    // We fetch the earthquake feed associated with the actual button that has been pressed.
    // In this example we are not plotting on a map, just demonstrating how to get the data.
    $.ajax({
        url: $(e.target).data('feedurl'), // The GeoJSON URL associated with a specific button was stored in the button's properties when the button was created

        success: function (data) {  // We've received the GeoJSON data
            var places = []; // We store the names of earthquake locations in this array
            $.each(data.features, function (key, val) {  // Just get a single value ('place') and save it in an array
                places.push(val.properties.place); // Add a new earthquake location to the array.
            });
            switchMap($(e.target).data('feedurl'), places)
        }
    });
});

function switchMap(url, places) {
    console.log(places)
    // Set Google map  to its start state
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });
    // The following uses JQuery library
    $.ajax({
        // The URL of the specific data required
        url: url,

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            var markers = []; // keep an array of Google Maps markers, to be used by the Google Maps clusterer
            $.each(data.features, function (key, val) {
                // Get the lat and lng data for use in the markers
                var coords = val.geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

                // Form a string that holds desired marker infoWindow content. The infoWindow will pop up when you click on a marker on the map
                var infowindow = new google.maps.InfoWindow({
                    content: "<h3>" + val.properties.title + "</h3><p><a href='" + val.properties.url + "'>Details</a></p>"
                });
                marker.addListener('click', function (data) {
                    infowindow.open(map, marker); // Open the Google maps marker infoWindow
                });
                markers[i++] = marker; // Add the marker to array to be used by clusterer
            });
            var markerCluster = new MarkerClusterer(map, markers,
                { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        }
    });
}

$(document).ready(function () {
        switchMap("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson");
});