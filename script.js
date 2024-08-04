const appKey = "9452c95d2ebb44cd885398a76ae5c364";

const searchInput = document.querySelector("#search-txt");
const searchButton = document.querySelector("#search-btn");
const moreButton = document.querySelector("#more-btn");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");
const description = document.querySelector("#description");
const windSpeed = document.querySelector("#wind-speed");
const moreDetails = document.querySelector("#more-details");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);
moreButton.addEventListener("click", toggleMoreDetails);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {
        alert("Please enter a city name");
    } else {
        const searchLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${appKey}&units=metric`;
        httpsRequestAsync(searchLink, theResponse);
    }
}

function theResponse(response) {
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = `http://openweathermap.org/img/wn/${jsonObject.weather[0].icon}@2x.png`;
    temperature.innerHTML = `${jsonObject.main.temp.toFixed(1)}°C`;
    humidity.innerHTML = `Humidity: ${jsonObject.main.humidity}%`;
    description.innerHTML = `Description: ${jsonObject.weather[0].description}`;
    windSpeed.innerHTML = `Wind Speed: ${jsonObject.wind.speed} m/s`;
}

function httpsRequestAsync(url, callback) {
    const httpsRequest = new XMLHttpRequest();
    httpsRequest.onreadystatechange = () => {
        if (httpsRequest.readyState === 4 && httpsRequest.status === 200) {
            callback(httpsRequest.responseText);
        } else if (httpsRequest.readyState === 4) {
            alert("Error fetching weather data");
        }
    };
    httpsRequest.open("GET", url, true);
    httpsRequest.send();
}

function toggleMoreDetails() {
    if (moreDetails.style.display === "none") {
        moreDetails.style.display = "block";
    } else {
        moreDetails.style.display = "none";
    }
}
