document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherInfo = document.getElementById("weatherInfo");

    const apiKey = "efd15ec9bbc20d98c99091e4cfba5cb7"; // Replace with your OpenWeatherMap API key

    const getWeather = async () => {
        const city = cityInput.value.trim();
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            alert(error.message);
        }
    };

    const displayWeather = (data) => {
        const { main, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        const icon = weather[0].icon;

        weatherInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        `;
        weatherInfo.style.display = "block";
    };

    getWeatherBtn.addEventListener("click", getWeather);
});