// Defin API key
const apiKey = "aba6ff9d6de967d5eac6fd79114693cc";

// DOM elements
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const weatherCard = document.querySelector(".card");
const weatherInfo = document.querySelector(".weather");

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeather(city);
  }
});

// Event listener for pressing Enter in the input field
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city !== "") {
      fetchWeather(city);
    }
  }
});

// Function to fetch weather data
function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => console.error(error));
}

// Function to display weather data
function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  weatherCard.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  document.querySelector(".city").innerText = `Weather in ${name}`;
  document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = `${temp}°C`;
  document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;

  weatherInfo.classList.remove("loading");
}

// Initialize weather with a default city (e.g., "Manipal")
fetchWeather("Manipal");