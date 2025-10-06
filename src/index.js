const body = document.getElementById("body");
const toggleBtn = document.getElementById("toggle-mode");
const toggleIcon = document.getElementById("toggle-icon");


const starttBtn = document.getElementById("start-app");
const main = document.getElementById("main");
const welcomePage = document.getElementById("home");
const footer = document.getElementById("footer");

const apiKey = "7cc5e775d12335ef0f3a89e8c56388e6"
const cityInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const displayCityData = document.getElementById("city-data")
const displayMessage = document.getElementById("display-message")
const weatherIconDisplay = document.createElement("img")
let cityName = cityInput.value.trim()
let data;


const temperatureDiv = document.getElementById("temperature")
const humidityDiv = document.getElementById("humidity")
const windspeedDiv = document.getElementById("windspeed")


const displayAdviceBtn = document.getElementById("get-heads-up")
const displayDiv = document.getElementById("message-container")
const weatherAdvice = document.getElementById("display-suggestion")
const closeBtn = document.getElementById("close")


const currentCityDate = document.getElementById("current-date")
const currentCityTime = document.getElementById("current-time")
let intervalId;


const cityDisplay = document.getElementById("current-city"); 
console.log(cityDisplay.innerText)
const forecastContainer = document.getElementById("forecastDiv");





// start app
starttBtn.addEventListener("click", () => {
    welcomePage.classList.add("hidden");
    main.classList.add("block", "md:flex");
    main.classList.remove("hidden" );
    footer.classList.remove("lg:hidden")
})

// get current Weather 
searchBtn.addEventListener("click", getWeather)
async function getWeather() {
    try {
        
        cityName = cityInput.value.trim()

        // fetching data from openweathermap Api
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        console.log(response)
        data = await response.json()
        

        // error handling to response from the API data
        if (response.ok === false && cityName === "" || !isNaN(cityName)){
            console.log("pls input city name");
            displayMessage.textContent = "Please Input a valid city name "
            displayMessage.classList.add("text-red-900", "bg-red-200", "rounded-md", "p-1")
            cityInput.classList.add("border-red-600", "border-2")
            displayAdviceBtn.classList.add("hidden");
            
            setTimeout(() =>{
                displayMessage.textContent = ""
                displayMessage.classList.remove("text-red-900", "bg-red-200", "rounded-md", "p-1")
                cityInput.classList.remove("border-red-600", "border-2")
                // displayAdviceBtn.classList.remove("hidden");
            }, 3000)
            return;
        }

        if (intervalId) {
            clearInterval(intervalId);
        }
        currentDateTime();
        intervalId = setInterval(currentDateTime, 1000)
        
        domUpdate()
        getWeatherEmoji();

    } 
    catch (error) {
        console.log(error);
        displayMessage.textContent = "Check your network and input, then try again... "
        console.log("pls input city name");
        displayMessage.classList.add("text-red-900", "bg-red-200", "rounded-md")
        cityInput.classList.add("border-red-600", "border-2")
        // displayAdviceBtn.classList.toggle("flex");
        
        setTimeout(() =>{
            displayMessage.textContent = ""
            cityInput.classList.remove("border-red-600", "border-2")
            // displayAdviceBtn.classList.remove("hidden");
        }, 3000)
        return;
    }

    cityInput.value = "";
}


// function for updating the dom 
function domUpdate() {
    displayCityData.innerHTML = 
    `   
        <h1 class="text-2xl md:text-4xl font-semibold  ">${cityName.toUpperCase()}</h1>
        <p class="text-sm lg:text-base font-mono  ">${data.weather[0].description}</p>
        <h2 class="my-4 text-3xl lg:text-6xl font-bold  ">${data.main.temp}℃</h2>
        
    `

    // updating other weather data 
    // temperature
    temperatureDiv.innerHTML = 
    `   
        <h2 class="text-xs md:text-xs lg:text-sm ">Temperature</h2>
        <img class="w-8 h-8 flex items-center justify-center " src="./assets/temperature-icon.png" alt="temp img" />
        <h2>${data.main.temp}℃</h2>
    
    `

    // humidity
    humidityDiv.innerHTML = 
    `   
        <h2 class="text-xs md:text-xs lg:text-sm ">Humidity</h2>
        <img class="w-8 h-8 flex items-center justify-center " src="./assets/humidity-icon.png" alt="temp img" />
        <h2>${data.main.humidity}%</h2>
    
    `

    // windspeed 
    windspeedDiv.innerHTML = 
    `   
        <h2 class="text-xs md:text-xs lg:text-sm ">Windspeed</h2>
        <img class="w-8 h-8 flex items-center justify-center " src="./assets/windspeed-icon.png" alt="temp img" />
        <h2>${data.wind.speed}km/h</h2>
    
    `
}


// get weather emoji function 
function getWeatherEmoji() {

    switch(true){
        // thunderstorm
        case (data.weather[0].id >= 200 && data.weather[0].id < 300):
            weatherIconDisplay.src = "/src/assets/cloud-lightening.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);

            displayBtn.addEventListener("click", () => {
                displayDiv.classList.add("block");
                weatherAdvice.textContent = "Thunderstorms expected. Best to stay indoors until it passes. stay safe 🫵"
            })
            return

        // drizzle    
        case (data.weather[0].id >= 300 && data.weather[0].id < 400):
            weatherIconDisplay.src = "/src/assets/drizzle.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "Light drizzle outside. best you take a small umbrella if you are heading out"

            showWeatherAvice()
            closePopout()
            return;

        // rain
        case (data.weather[0].id >= 500 && data.weather[0].id < 600):
            weatherIconDisplay.src = "/src/assets/cloud-rain.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "Rainy weather ahead. Carry an umbrella if you are going out and watchout for slippery roads"

            showWeatherAvice()
            closePopout()
            return;

        // snow
        case (data.weather[0].id >= 600 && data.weather[0].id < 700):
            weatherIconDisplay.src = "/src/assets/snow.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "Its a snowy day, dress warmly and be careful if you are travelling"

            showWeatherAvice()
            closePopout()
            return;

        // fog mist dust tornado
        case (data.weather[0].id >= 700 && data.weather[0].id < 800):
            weatherIconDisplay.src = "/src/assets/fog-mist.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "Visibility is low due to mist/fog. drive or walk carefully"

            showWeatherAvice()
            closePopout()
            return;

        // clear cloud
        case (data.weather[0].id === 800):
            console.log("equal")
            weatherIconDisplay.src = "/src/assets/clear-cloud.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "It`s a bright and sunny day, perfect time to head outside and enjoy the fresh air dont forget your sun glasses😎"

            showWeatherAvice()
            closePopout()
            return;

        // clouds
        case (data.weather[0].id >= 801 && data.weather[0].id < 810):
            weatherIconDisplay.src = "/src/assets/cloud-and-sun.png";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "The sky is cloudy today, it might feel cooler then usual, so a light jacket could be handy"
            
            showWeatherAvice()
            closePopout()
            return;

        default:
            console.log("default")
            weatherIconDisplay.src = "/src/assets/danger-default";
            weatherIconDisplay.classList.add("w-26")
            displayCityData.appendChild(weatherIconDisplay);
            weatherAdvice.textContent = "Probable a dangerous weather condition out there, be extra careful as you moe about your day"

            showWeatherAvice()
            closePopout()
            return;
    }
}


// show weather advice button
function showWeatherAvice() {

    displayAdviceBtn.classList.remove("hidden")
    displayAdviceBtn.classList.add("flex")
    displayAdviceBtn.addEventListener("click", () => {
        console.log("clicked")
        displayDiv.classList.remove("hidden");
        displayDiv.classList.add("flex");
            
    })
}


// close popout message window
function closePopout() {
    closeBtn.addEventListener("click", function () {
        displayDiv.classList.add("hidden")
        displayDiv.classList.add("flex");
        // displayDiv.classList.remove("translate-y-0");
    })
}

// Get current date and time
function currentDateTime() {

    const now = Date.now();
    const cityOffset = data.timezone * 1000;
    const localTime = new Date(now + cityOffset);
    const cityDate = localTime.toDateString();
    console.log(cityDate)
    const cityTime = localTime.toLocaleTimeString()
    console.log(cityTime)

    currentCityDate.innerHTML =` <p>Current Date: ${cityDate}</p> `;
    currentCityTime.innerHTML =` <p>Current Time: ${cityTime}</p> `;


}




// WEATHER FORECAST 
// get current city weather 
async function getWeatherByIP() {
    try{
        
        //Get current location by IP address
        const ipResponse = await fetch("http://ip-api.com/json/");
        const ipData = await ipResponse.json();
        console.log(ipData.city)

        // Show city name
        cityDisplay.textContent = `Weather in ${ipData.city = "Awka"}`;

        //Fetch weather forecast
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ipData.lat}&lon=${ipData.lon}&appid=${apiKey}&units=metric`);
        const data = await response.json()

        // Filter for noon forecasts
        let dailyForecasts = data.list.filter(item => 
        item.dt_txt.includes("12:00:00"));
        console.log(dailyForecasts)
        forecasts = dailyForecasts.slice(1, 4)
        console.log(forecasts)
        
        // Clear old results
        forecastContainer.innerHTML = "";
        
        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            const temp = forecast.main.temp;
            const description = forecast.weather[0].description;
            const icon = forecast.weather[0].icon;
            console.log(forecast)

        // Create forecast card
        const card = document.createElement("div");
        card.className = "shadow-md shadow-gray-700 place-items-center rounded-2xl p-2 text-center ";

        card.innerHTML = `
        <h3 class="font-bold text-xs md:text-xs lg:text-sm ">${date}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="mx-auto w-8 h-8 flex items-center justify-center ">
        <p class="text-sm ">${temp}°C</p>
        <p class="capitalize text-xs md:text-xs lg:text-sm font-mono   ">${description}</p>
        `;

        forecastContainer.appendChild(card);
        });
    
    }
    catch(error){
        console.log(error);
    }
}
getWeatherByIP();


// // light and dark mode + local storage
// Apply a theme
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("bg-black", "text-white");
    body.classList.remove("bg-white");

    toggleIcon.classList.add("ph-toggle-right");
    toggleBtn.classList.add("border");
    toggleBtn.classList.remove("bg-white");

    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("bg-white");
    body.classList.remove("bg-black", "text-white");

    toggleIcon.classList.remove("ph-toggle-right");
    toggleBtn.classList.add("bg-white", "border");
    toggleBtn.classList.remove("bg-black");

    localStorage.setItem("theme", "light");
  }
}

// Load saved theme on refresh
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "light"; // default light
  applyTheme(savedTheme);
});

// Toggle theme on click
toggleBtn.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});

function getCurrentYear() {

    const copyright = document.getElementById("copyright");
    
    const date = new Date()
    const currentYear = date.getFullYear()
    console.log(currentYear)

    copyright.textContent = `copyright @${currentYear}`
}

getCurrentYear()