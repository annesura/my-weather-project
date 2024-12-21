function updateWeather(response) {
    let tempteratureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
   
    tempteratureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;

}

function searchCity(city) {
    let apiKey = "0cca9cddf1f4t4bb307e8bfo1fa213f2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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