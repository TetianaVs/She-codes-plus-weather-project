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
  // let day = days[dayIndex];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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

// display forecast days group
function displayForecast() {
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class = "card-group">`;
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="card day">
            <div class="card-body">
              <h5 class="card-title display">${day}</h5>
              <p class="card-text weather-icon">
                <i class="fa-solid fa-cloud-bolt"></i>
               
                <span id="temperature-tue">20</span>
              </p>
              <p class="card-text">
                <small class="text-muted">20/13°C</small>
              </p>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
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

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity:  ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  axios.get(apiUrl).then(displayWeatherCondition);
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

searchCity('Kyiv');
displayForecast();

// change main background when click on #change button
// function changeone() {
//   let secondbutton = document.querySelector('#changeBackground');
//   return secondbutton.addEventListener('click', function () {
//     document.querySelector('#container').style.backgroundImage =
//       'url(src/black.jpg)';
//   });
// }
// changeone();

// change body background
// let secondbutton = document.getElementById('changeBackground');

// secondbutton.addEventListener('click', function changeBackground() {
//   document.body.style.backgroundImage = 'url(src/55.jpg)';
// });

// to reload the page
// function update() {
//   return (window.parent.location = window.parent.location.href);
// }

// to implement
// change background depends on time of the day
// var t = new Date().getHours();
// if (t >= 6 && t <= 18) {
//   document.write('Have a good morning!');
//   document.body.style.backgroundImage = 'url(src/104.jpg)';
// } else {
//   document.body.style.backgroundImage = 'url(src/77.jpg)';
// }

// var t = new Date().getHours();
// if (t >= 6 && t <= 18) {
//   // document.write('Have a good morning!');
//   document.body.style.backgroundImage = 'url(src/104.jpg)';
// } else {
//   document.body.style.backgroundImage = 'url(src/102_copy.jpg)';
// }
