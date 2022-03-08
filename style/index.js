function currentDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${month} ${date}, ${year} <br /> ${day} ${hours}:${minutes}`;
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

currentDate();

function submitCity() {
  event.preventDefault();
  let input = document.querySelector("#submit");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
  let apiKey = "9a88f3694f9360d3ea2018d1b74ae6d4";
  let city = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

function displayWeather(response) {
  let homePosition = response.data.name;
  let homeCountry = response.data.sys.country;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${homePosition}, ${homeCountry}`;
  let degrees = Math.round(response.data.main.temp);
  let degreesCelsius = document.querySelector("#currentTemp");
  degreesCelsius.innerHTML = degrees;

  let currentEmoji = document.querySelector("#currentEmoji");
  currentEmoji.innerHTML = response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;
  console.log(response.data);
}

function showPositionWeather(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "9a88f3694f9360d3ea2018d1b74ae6d4";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);
