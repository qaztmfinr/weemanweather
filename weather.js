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

const cycleCity = document.getElementById("cycleCity");
const cycleWeather = document.getElementById("cycleWeather");

const topCities = [
  { name: "New York", state: "NY", latitude: 40.7128, longitude: -74.0060 },
  { name: "Los Angeles", state: "CA", latitude: 34.0522, longitude: -118.2437 },
  { name: "Chicago", state: "IL", latitude: 41.8781, longitude: -87.6298 },
  { name: "Houston", state: "TX", latitude: 29.7604, longitude: -95.3698 }
];

let currentCityIndex = 0;

async function showNextCityWeather() {
  const city = topCities[currentCityIndex];

  cycleCity.textContent = `${city.name}, ${city.state}`;
  cycleWeather.textContent = "Loading...";

  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

    const response = await fetch(weatherUrl);
    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const wind = Math.round(data.current.wind_speed_10m);

    cycleWeather.textContent = `${temp}°F  Wind ${wind} mph`;
  } catch (error) {
    cycleWeather.textContent = "Weather unavailable";
    console.error(error);
  }

  currentCityIndex++;

  if (currentCityIndex >= topCities.length) {
    currentCityIndex = 0;
  }
}

showNextCityWeather();

setInterval(showNextCityWeather, 5000);