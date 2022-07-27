const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

//ville par défault
let cityInput = "Rennes";

//event listener pour les villes enregistrée
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
  });
});

//ajout du submit au formulaire
form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Merci de rentrer une ville");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
  e.preventDefault();
});

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=a8b1f3e8bab049e48b5140057222707&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = Math.round(data.current.temp_c) + "°";
      conditionOutput.innerHTML = data.current.condition.text;
      const date = data.location.localtime;
      const time = date.substr(5);

      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      icon.src = "./icons/" + iconId;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#3764fa";
        if (timeOfDay == "night") {
          btn.style.background = "#0a153a";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#3764fa";
        if (timeOfDay == "night") {
          btn.style.background = "#0a153a";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#3764fa";
        if (timeOfDay == "night") {
          btn.style.background = "#0a153a";
        }
      } else {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/snow.jpg)`;
        btn.style.background = "#3764fa";
        if (timeOfDay == "night") {
          btn.style.background = "#0a153a";
        }
      }
      app.style.opacity = "1";
    })
    .catch(() => {
      alert("Ville non trouvée. Merci de réessayer");
      app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";
