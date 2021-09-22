// &units=imperial used for farenheit

var citySearch = document.getElementById("city-search-btn");
var cityArea = document.getElementById("city-area");
var weatherCard = document.getElementsByClassName("weather-area");
var forecastArea = document.getElementById("forecast-area");
var currentCityWeather = document.getElementById("weather-title");
// make var for weather card div
// var currentDay = current day api

var apiKey = "16805840c4e605516087ba71e20daba9";

// Calls weather API
function getApi () {
    // weatherCard.innerHTML = "";
    var citySearchInput = document.getElementById("search-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&appid=" + apiKey;
    console.log(citySearchInput);
    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        console.log(response.status);
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        currentCityWeather.innerHTML = citySearchInput;
        cityArea.innerHTML = citySearchInput;




    });
}

citySearch.addEventListener("click", getApi);