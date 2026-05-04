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

    const location = geoData.results[0];
    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json;

    const temp = weatherData.current.temperature_2m;
    const wind = weatherData.current.wind_speed_10;

    weatherResult.textContent = `${location.name}, ${location.amdmin1}: ${temp}°F, Wind ${wind} mph`;
}