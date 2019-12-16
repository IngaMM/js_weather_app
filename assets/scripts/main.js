const loading = document.getElementById("loading");
const title = document.getElementById("title");
const description = document.getElementById("description");
const img = document.querySelector("img");
const temperature = document.getElementById("temperature");
const conversionButtonCtoF = document.getElementById("conversionButtonCtoF");
const conversionButtonFtoC = document.getElementById("conversionButtonFtoC");

function getWeatherData() {
  errorMessage.classList.add("invisible");
  loading.classList.remove("invisible");
  const city = document.getElementById("city").value;
  const url =
    "http://api.openweathermap.org/data/2.5/weather?APPID=1fc3358fe4cd05550f79f25b6ec4e4e0&q=" +
    city;
  fetch(url, { mode: "cors" })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      weatherData = {};
      weatherData.description = response.weather[0].description;
      weatherData.tempC = response.main.temp - 273.15;
      weatherData.tempF = (weatherData.tempC * 9) / 5 + 32;
      weatherData.iconURL =
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      loading.classList.add("invisible");
      title.innerHTML = "The current weather in " + city + ":";
      let description_array = weatherData.description.split(" ");
      // Capitalize first letter
      let description_array_cap = description_array.map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      );
      description.innerHTML = description_array_cap.join(" ");
      img.src = weatherData.iconURL;
      temperature.innerHTML =
        "Temperature [°C]: " + weatherData.tempC.toFixed(1);
      conversionButtonFtoC.classList.add("invisible");
      conversionButtonCtoF.classList.remove("invisible");
    })
    .catch(function(error) {
      loading.classList.add("invisible");
      errorMessage.classList.remove("invisible");
      errorMessage.innerHTML = "City not found.";
      title.innerHTML = "";
      description.innerHTML = "";
      img.src = "";
      temperature.innerHTML = "";
      conversionButtonFtoC.classList.add("invisible");
      conversionButtonCtoF.classList.add("invisible");

      console.log(error);
    });
}

function convertCtoF() {
  conversionButtonCtoF.classList.add("invisible");
  conversionButtonFtoC.classList.remove("invisible");
  temperature.innerHTML = "Temperature [°F]: " + weatherData.tempF.toFixed(1);
}

function convertFtoC() {
  conversionButtonFtoC.classList.add("invisible");
  conversionButtonCtoF.classList.remove("invisible");
  temperature.innerHTML = "Temperature [°C]: " + weatherData.tempC.toFixed(1);
}
