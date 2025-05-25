document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "d95e37d5461ecec95ed5fe3e46b39eab";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");

  async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      const data = await response.json();

      // Check if data has expected structure
      if (data.cod !== 200) {
        throw new Error(data.message || "City not found");
      }

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Could not retrieve weather data. Check the city name.");
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
});

