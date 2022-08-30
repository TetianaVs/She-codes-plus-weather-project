function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatIcon(defaultIcon) {
  if (defaultIcon === '01d') {
    return `fa-solid fa-sun`;
  } else if (defaultIcon === '01n') {
    return `fa-solid fa-moon`;
  } else if (defaultIcon === '02d') {
    return `fa-solid fa-cloud-sun`;
  } else if (defaultIcon === '02n') {
    return `fa-solid fa-cloud-moon`;
  } else if (defaultIcon === '03d' || defaultIcon === '03n') {
    return `fa-solid fa-cloud`;
  } else if (defaultIcon === '04d' || defaultIcon === '04n') {
    return `fa-solid fa-cloud`;
  } else if (defaultIcon === '09d' || defaultIcon === '09n') {
    return `fa-solid fa-cloud-showers-heavy`;
  } else if (defaultIcon === '10d') {
    return `fa-solid fa-cloud-sun-rain`;
  } else if (defaultIcon === '10n') {
    return `fa-solid fa-cloud-moon-rain`;
  } else if (defaultIcon === '11d' || defaultIcon === '11n') {
    return `fa-solid fa-cloud-bolt`;
  } else if (defaultIcon === '13d' || defaultIcon === '13n') {
    return `fa-solid fa-snowflake`;
  } else if (defaultIcon === '50d' || defaultIcon === '50n') {
    return `fa-solid fa-cloud`;
  }
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector('#city');
  let cityInput = document.querySelector('#city-input');
  cityElement.innerHTML = cityInput.value;
}

let dateElement = document.querySelector('#date');
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[day];
}
// display forecast days group
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class = "card-group">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        ` <div class="card day">
            <div class="card-body">
              <h5 class="card-title display">${formatDay(forecastDay.dt)}</h5>
              <p class="card-text weather-icon">
                <div id="weather-icon">
                      <i class="${formatIcon(forecastDay.weather[0].icon)}"></i>
                    </div>
              </p>
              <p class="card-text"">
              <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}°C</span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>
              </p>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = 'f62188d5b4eaa57d0dfdd02e67f8c3b4';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// display weather conditions
function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let dateElement = document.querySelector('#date');
  let iconElement = document.querySelector('#icon');
  let iconElementApi = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity:  ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute('class', formatIcon(iconElementApi));

  getForecast(response.data.coord);
}

function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector('#city').innerHTML = response.data.name;
  document.querySelector('#temperature').innerHTML = Math.round(
    response.data.main.temp
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector('#city-input').value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = 'f62188d5b4eaa57d0dfdd02e67f8c3b4';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition); //call displayWeatherCondition function
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);

function searchLocation(position) {
  let apiKey = 'f62188d5b4eaa57d0dfdd02e67f8c3b4';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector('#locationSearch');
currentLocationButton.addEventListener('click', getCurrentLocation);

// display fahrenheit temperature when click on F, switch from F to C temperature
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemperature);

// change background depends on time of the day
var t = new Date().getHours();
if (t >= 6 && t <= 18) {
  document.body.style.backgroundImage = 'url(src/img/day_clouds.jpg)';
} else {
  document.body.style.backgroundImage = 'url(src/img/night_stars.jpg)';
}

searchCity('Kyiv');
