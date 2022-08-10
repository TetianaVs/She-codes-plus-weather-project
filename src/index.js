function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[dayIndex];

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

function displayWeatherCondition(response) {
  document.querySelector('#city').innerHTML = response.data.name;
  document.querySelector('#temperature').innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector('#wind').innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    '#humidity'
  ).innerHTML = `Humidity:  ${response.data.main.humidity} %`;
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


// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// let city = prompt("Enter a city");
// city = city.toLowerCase();

// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp;
//   let humidity = weather[city].humidity;
//   let celsius = Math.round(temperature);
//   let fahrenheit = Math.round((temperature * 9) / 5 + 32);
//   alert(
//     `It is currently ${celsius}°F  ${fahrenheit}°F in ${city} with a humidity of ${humidity}`
//   );
// } else
//   alert(
//     "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
//   );
