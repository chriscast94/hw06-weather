// &units=imperial used for farenheit

var citySearchBtn = document.getElementById("city-search-btn");
var cityArea = document.getElementById("city-area");
var weatherCard = document.getElementsByClassName("weather-area");

var cityTitle = document.getElementById("weather-title");
var currentCityWeather = document.getElementById("current-city-weather");
var cityAreaBtns = [];
// var today = moment("MMM Do, YYYY");
// $("#1a").text(today.format("MMM Do, YYYY"));

// var currentDay = current day api

var apiKey = "16805840c4e605516087ba71e20daba9";

// Calls weather API
function getApi() {
    // weatherCard.innerHTML = "";
    var citySearchInput = document.getElementById("search-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&units=imperial&appid=" + apiKey;

    console.log(citySearchInput);
    console.log(requestUrl);


    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let btn = document.createElement("button");
            btn.innerHTML = citySearchInput;
            document.body.appendChild(cityArea);

            // cityArea.innerHTML = citySearchInput;
            cityTitle.innerHTML = citySearchInput + iconUrl;

            // Generates weather icon
            var icon = data.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/w" + icon + ".png";

            // var iconImg = document.createElement("img");
            // iconImg.src = "https://openweathermap.org/img/w" + icon + ".png"

            // Create temperature, wind, humidity, and UV index areas in the weather card
            var tempArea = document.getElementById("temp");
            var windArea = document.getElementById("wind");
            var humidArea = document.getElementById("humidity");
            var uviArea = document.getElementById("uvi")

            var currentTemp = data.main.temp + " \xB0f";
            tempArea.innerHTML = "<strong>Temperature:</strong> " + currentTemp;
            console.log(currentTemp);

            var currentWind = data.wind.speed + "MPH";
            windArea.innerHTML = "<strong>Wind:</strong> " + currentWind;
            console.log(currentWind);

            var currentHumidity = data.main.humidity + "%";
            humidArea.innerHTML = "<strong>Humidity:</strong> " + currentHumidity
            console.log(currentHumidity);

            //  // Fetching UV Index
            let lat = data.coord.lat;
            console.log(lat);
            let lon = data.coord.lon;
            console.log(lon);
            let uviApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;

            fetch(uviApi)
                .then(function (response) {
                    console.log(response.status);
                    return response.json();
                })
                .then((data) => {
                    var currentUvi = data.current.uvi;
                    console.log(currentUvi);
                    console.log(data);
                    uviArea.innerHTML = "<strong>UV Index:</strong> " + currentUvi;
                });


            // Function to develop 5 day forecast
            const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchInput + "&units=imperial&appid=" + apiKey;
            console.log(forecastUrl);
            fetch(forecastUrl)
                .then(function (response) {
                    console.log(response.status);
                    return response.json();
                })
                .then((data) => {
                    for (i = 0; i < 39; i += 8) {

                        var forecastArea = document.getElementById("forecast-area");


                        var forecastDiv = document.createElement("div");
                        forecastDiv.classList.add("forecastDiv");
                        forecastDiv.setAttribute("id", "forecastCard" + i);
                        forecastArea.append(forecastDiv);

                        // var forecastDate = "";

                        var forecastList = document.createElement("ul");
                        forecastList.classList.add("forecast-list");
                        forecastList.setAttribute("id", "5-list" + i);
                        forecastDiv.append(forecastList);

                        var forecastTemp = document.createElement("li");
                        forecastTemp.classList.add("forecast-temp");
                        forecastTemp.setAttribute("id", "5-temp" + i);
                        forecastList.append(forecastTemp);
                        forecastTemp.append(data.list[i].main.temp +"\xB0f");

                        var forecastWind = document.createElement("li");
                        forecastWind.classList.add("forecast-wind");
                        forecastWind.setAttribute("id", "5-wind" + i);
                        forecastList.append(forecastWind);
                        forecastWind.append(data.list[i].wind.speed + " MPH");

                        var forecastHumid = document.createElement("li");
                        forecastHumid.classList.add("forecast-humid");
                        forecastHumid.setAttribute("id", "5-humid" + i);
                        forecastList.append(forecastHumid);
                        forecastHumid.append(data.list[i].main.humidity +"%");


                    }
                    
                });



        });

}



citySearchBtn.addEventListener("click", getApi);

