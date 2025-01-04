function updateWeather(response) {
    let tempteratureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");


   
    tempteratureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-app-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "0cca9cddf1f4t4bb307e8bfo1fa213f2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateWeather);

}

function handleSearchSubmit(event) {
   event.preventDefault();
    let searchInput = document.querySelector("#search-input");

    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Houston");


function getForecast(city) {
    let apiKey = `0cca9cddf1f4t4bb307e8bfo1fa213f2`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`
    
    axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayForecast(response) {

let forecastHtml = "";

response.data.daily.forEach( function (day, index) {
    if (index < 5) {
    forecastHtml = forecastHtml + `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
            </div>
            <div class="weather-forecast-temperatures"> 
                <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                 <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                </div>
        </div>`;
    }

});

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;

}

displayForecast();

