const cityInput = document.getElementById("cityInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherResult = document.getElementById("weatherResult");

function getWeatherByCity() {
    const city = cityInput.value;
    weatherResult.textContent = `You live in ${city}`;
}

if (cityInput && weatherBtn && weatherResult) {
    weatherBtn.addEventListener("click", getWeatherByCity);
}

async function getWeatherByCity() {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.TextContent = "Please enter a valid city name";
        return;
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
        weatherResult.textContent = "City could not be found :(";
        return;
    }
}