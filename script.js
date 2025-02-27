// Select elements from the HTML
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");

// API key for OpenWeather
const apiKey = "676162458e1b3adfea2caf5bd43f3a65";

// Function to fetch weather data from OpenWeather API
function fetchWeather(city) {
    // Construct the API URL with city name and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    // Fetch data from API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found"); // Handle errors
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            displayWeather(data); // Call function to update the UI
        })
        .catch(error => {
            alert(error.message); // Show error message if something goes wrong
        });
}

// Function to update the UI with fetched weather data
function displayWeather(data) {
    cityName.textContent = data.name; // Update city name
    temperature.textContent = `${Math.round(data.main.temp)}°C`; // Show temperature
    weatherCondition.textContent = data.weather[0].description; // Show weather condition
}

// When the document is fully loaded
window.addEventListener("load", () => {
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim(); // Get the city name from input
        if (city) {
            fetchWeather(city); // Call function to get weather data
        }
    });
});
