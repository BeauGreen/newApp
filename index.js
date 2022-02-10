let currentDay = document.querySelector("#date");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];
currentDay.innerHTML = `${day} ${hours}:${minutes}`;

function currentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#Temp").innerHTML = `${temperature}`;
  document.querySelector("#humd").innerHTML =
    `Humidity: ` + response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#windy").innerHTML = `Wind: ${wind} mph`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "9fb83c6d0e02a00d204f4692a89a5921";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=Imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "9fb83c6d0e02a00d204f4692a89a5921";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=Imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let cityName = document.querySelector("h1");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
searchCity("Omaha");
let currentLocationWeather = document.querySelector("#current-location");
currentLocationWeather.addEventListener("click", displayCurrent);
