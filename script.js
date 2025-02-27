// Select elements from the HTML
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const weatherIcon = document.getElementById("weatherIcon");
const forecastContainer = document.getElementById("forecastContainer");

// API key for OpenWeather 
const apiKey = "676162458e1b3adfea2caf5bd43f3a65";

// Function to fetch current weather data
function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            fetchForecast(city); // Fetch the 7-day forecast
        })
        .catch(error => {
            alert(error.message);
        });
}

// Function to fetch 7-day forecast data
function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data.list);
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
        });
}

// Function to update the UI with current weather data
function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherCondition.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
}

// Function to display the 7-day forecast
function displayForecast(forecastList) {
    forecastContainer.innerHTML = ""; // Clear previous forecast
    
    for (let i = 0; i < forecastList.length; i += 8) { // Get one forecast per day
        const day = forecastList[i];
        const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const description = day.weather[0].description;
        
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <p>${date}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <p>${temp}°C</p>
            <p>${description}</p>
        `;
        
        forecastContainer.appendChild(forecastItem);
    }
}

// When the document is fully loaded
window.addEventListener("load", () => {
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
});
