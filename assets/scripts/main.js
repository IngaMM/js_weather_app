const getWeatherData = () => {
  const loading = document.getElementById("loading");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const img = document.querySelector("img");
  const temperature = document.getElementById("temperature");
  const conversionButtonCtoF = document.getElementById("conversionButtonCtoF");
  const conversionButtonFtoC = document.getElementById("conversionButtonFtoC");

  errorMessage.classList.add("invisible"); // Do not show error message
  loading.classList.remove("invisible"); // Show loading message
  const city = document.getElementById("city").value; // Get city name from input field
  const url =
    "https://api.openweathermap.org/data/2.5/weather?APPID=1fc3358fe4cd05550f79f25b6ec4e4e0&q=" +
    city;
  fetch(url, { mode: "cors" })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      // Fill weather data object
      weatherData = {};
      weatherData.description = response.weather[0].description;
      weatherData.tempC = response.main.temp - 273.15;
      weatherData.tempF = (weatherData.tempC * 9) / 5 + 32;
      weatherData.iconURL =
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";

      loading.classList.add("invisible"); // Do not show loading message any more
      title.textContent = "The current weather in " + city + ":";

      // Format & set description and image
      let descriptionArray = weatherData.description.split(" ");
      let descriptionArrayCap = descriptionArray.map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      );
      description.textContent = descriptionArrayCap.join(" ");
      img.src = weatherData.iconURL;

      // Give temperature in Celsius and show conversion button to F
      temperature.textContent =
        "Temperature [°C]: " + weatherData.tempC.toFixed(1);
      conversionButtonFtoC.classList.add("invisible");
      conversionButtonCtoF.classList.remove("invisible");

      // Set background image and font color in dependance of weather icon
      setBackgroundImageAndColor(response.weather[0].icon);
    })
    .catch(function(error) {
      // Show error message and default background & font color
      loading.classList.add("invisible");
      errorMessage.classList.remove("invisible");
      errorMessage.textContent = "City not found";
      title.textContent = "";
      description.textContent = "";
      img.src = "";
      temperature.textContent = "";
      setBackgroundImageAndColor("");
      conversionButtonFtoC.classList.add("invisible");
      conversionButtonCtoF.classList.add("invisible");
      console.log(error);
    });
};

// Conversion function for C to F
const convertCtoF = () => {
  conversionButtonCtoF.classList.add("invisible");
  conversionButtonFtoC.classList.remove("invisible");
  temperature.textContent = "Temperature [°F]: " + weatherData.tempF.toFixed(1);
};

// Conversion function for F to C
const convertFtoC = () => {
  conversionButtonFtoC.classList.add("invisible");
  conversionButtonCtoF.classList.remove("invisible");
  temperature.textContent = "Temperature [°C]: " + weatherData.tempC.toFixed(1);
};

// Function to set background image and font color in dependance of weather icon
const setBackgroundImageAndColor = icon => {
  let color;
  let backgroundImage;
  switch (icon) {
    case "01d":
      backgroundImage = "url('./assets/pictures/clear_day.jpg')";
      color = "black";
      break;
    case "01n":
      backgroundImage = "url('./assets/pictures/clear_night.jpg')";
      color = "white";
      break;
    case "02d":
    case "03d":
    case "04d":
      backgroundImage = "url('./assets/pictures/clouds_day.jpg')";
      color = "black";
      break;
    case "02n":
    case "03n":
    case "04n":
      backgroundImage = "url('./assets/pictures/clouds_night.jpg')";
      color = "white";
      break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      backgroundImage = "url('./assets/pictures/rain.jpg')";
      color = "white";
      break;
    case "11d":
    case "11n":
      backgroundImage = "url('./assets/pictures/thunderstorm.jpg')";
      color = "white";
      break;
    case "13d":
    case "13n":
      backgroundImage = "url('./assets/pictures/snow.jpg')";
      color = "white";
      break;
    case "50d":
    case "50n":
      backgroundImage = "url('./assets/pictures/mist.jpg')";
      color = "black";
      break;
    default:
      backgroundImage = "url('./assets/pictures/default_background.jpg')";
      color = "black";
  }
  document.body.style.backgroundImage = backgroundImage;
  document.body.style.color = color;
};
