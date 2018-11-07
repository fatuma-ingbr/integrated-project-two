//Country Code
let GBR = "GBR";
let MUS = "MUS";
let GHA = "GHA";

let GHANA = "ghana";
let MAURITIUS = "mauritius";
let UK = "united kingdom";

let programmes = {
    both_sex: "SE.TER.ENRL",
    agriculture: "UIS.FOSEP.56.F800",
    education: "UIS.FOSEP.56.F140",
    engineering_manufacturing_and_construction: "UIS.FOSEP.56.F700",
    health_and_welfare: "UIS.FOSEP.56.F300",
    humanities_and_arts: "UIS.FOSEP.56..F200",
    science: "UIS.FOSEP.56.F500",
    services: "UIS.FOSEP.56.F600",
    social_sciences_business_and_Law: "UIS.FOSEP.56.F400",
    unspecified_fields: "UIS.FOSEP.56.FUK",
};

/*
* A function to toggle the mobile menu
* ====================================
* */
function toggle() {
    let element = $(".navbar");
    element.css("display", "block");
    let nav = element[0];
    if (nav.className === "navbar") {
        nav.className += " responsive";
    } else {
        nav.className = "navbar";
        element.css("display", "none");
    }
}

/*Helper functions
* ================
* */

//Stores the session data for later use
function saveChosenCountry(country) {
    sessionStorage.setItem("country", country);
}

function saveChosenStatistics(countrycode, programme) {
    sessionStorage.setItem("countrycode", countrycode);
    sessionStorage.setItem("programme", programme);
}

//change the type of chart on the screen
function chartType(type) {
    displayQuickStatistics(statisticsFactory(
        sessionStorage.getItem("countrycode"), sessionStorage.getItem("programme")), type);
}

//Smooth scroll effect
$(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                window.location.hash = hash;
            });
        }
    });
});

//URI generator for the statiscs ajax call
function statisticsFactory(country, programme) {
    sessionStorage.setItem("programme", programme);
    return "http://api.worldbank.org/v2/countries/" + country + "/indicators/" + programme + "?date=2009:2015&format=json"
}

/*Starter functions
* Functions which need to run as soon as the document is ready
* */
$('#data').ready(function () {
        var country = sessionStorage.getItem("country");
        displayUniversities(country);
});

$('#statistics-data').ready(function () {
    console.log(window.location.pathname)
        var country = sessionStorage.getItem("countrycode");
        var programme = sessionStorage.getItem("programme");
        displayStatistics(country, programme);
});

function countryStatistics(country) {
    var programme = sessionStorage.getItem("programme");
    sessionStorage.setItem("countrycode", country);
    displayStatistics(country, programme);
}

//makes an ajax call to display programmes
function displayQuickStatistics(uri, type) {
    var ajaxrequest = $.ajax({
        url: uri,
        type: "get",
        dataType: "json"
    });

    ajaxrequest.done(function (data) {
        var yvalues = [];
        var xvalues = [];
        var programme = data[1][0].indicator.value;
        for (var i = 0; i < data[1].length; i++) {
            xvalues[6-i] = data[1][i].date;
            yvalues[6-i] = data[1][i].value;
        }
        $('#line-chart').remove();
        $('.charts').append('<canvas id="line-chart"></canvas>');
        if (type == "bar") {
            barChart(xvalues, yvalues, programme);
        } else if (type == "line") {
            lineChart(xvalues, yvalues, programme);
        }

        var source = $("#statistics-template").html();
        var template = Handlebars.compile(source);

        var data = data[1];
        var wrapper = {objects: data};

        $('#statistics-data')[0].innerHTML = template(wrapper);
    });
}

/*AJAX call functions and display function*/

// list all the universities from hipolabs
function displayUniversities(country) {
    var ajaxrequest = $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=" + country,
        type: "GET",
        dataType: "json",
        error: function fallback() {

            console.error("Error occured while making API call, using offline data now");
            console.error("===========================================================");
            var ajaxrequest = $.ajax({
                url: "vendor/js/world_universities_and_domains.json",
                type: "GET",
                dataType: "json",
                error: function () {
                    console.error("No available data");
                }
            });

            ajaxrequest.done(function (data) {
                var source = $("#list-universities-template").html();
                var template = Handlebars.compile(source);

                var data = $.grep(data, function (n) {
                    if(n.country.toUpperCase() == country.toUpperCase()) return n;
                });
                console.log(data)

                var wrapper = {objects: data};

                $('#data').append(template(wrapper));
            });
        }
    });

    ajaxrequest.done(function (data) {
        var source = $("#list-universities-template").html();
        var template = Handlebars.compile(source);

        var wrapper = {objects: data};
        if (country == UK) {
            $('#current-country')[0].innerText = "UK";
        } else {
            $('#current-country')[0].innerText = country;
        }
        $('#data')[0].innerHTML = template(wrapper);
    });
};


function displayStatistics(countrycode, programme) {
    var defaultChart = "bar";

    switch (countrycode) {
        case MUS:
            $('#current-country')[0].innerText = MAURITIUS;
            break;
        case GHA:
            $('#current-country')[0].innerText = GHANA;
            break;
        case GBR:
            $('#current-country')[0].innerText = "UK"; //To Shorten the Name
            break;

    }
    displayQuickStatistics(statisticsFactory(countrycode, programme), defaultChart);
}

function changeStatistics(programme) {
    $('#showlist')[0].className = "no-display";
    displayStatistics(sessionStorage.getItem("countrycode"), programme);
}

//displays the next programme on the list
function nextStatistics() {
    var counter = 0;
    for (var programme in programmes) {
        counter++;
        if (programmes[programme] == sessionStorage.getItem("programme")) {
            var array = Object.values(programmes);
            if (array[counter + 1] != null) {
                changeStatistics(array[counter + 1]);
            } else {
                $('.next').css("background-color", "grey");
                $('.next').css("border", "grey");
            }
            break;
        }
    }
}

//displays the previous programme on the list
function previousStatistics() {
    var counter = 0;
    for (var programme in programmes) {
        counter++;
        if (programmes[programme] == sessionStorage.getItem("programme")) {
            var array = Object.values(programmes);
            if (array[counter + 1] != null) {
                changeStatistics(array[counter - 1]);
            } else {
                $('.previous').css("background-color", "grey");
                $('.previous').css("border", "grey");
            }
            break;
        }
    }
}

//Used in mobile view to display a list of programs
function listAll() {
    var element = $('#showlist')

    if (element[0].className == "no-display") {
        element[0].className = " "
    } else {
        element[0].className = "no-display"
    }
}