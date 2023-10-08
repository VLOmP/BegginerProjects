const APIKey = "Your API key goes here";

const buttonSearchOne = document.querySelector(".search-icon-one");
const buttonSearchTwo = document.querySelector(".search-icon-two");

const cloudIcons = {
    cloud: "<i class='bx bx-cloud'></i>",
    drizzle: "<i class='bx bx-cloud-drizzle' ></i>",
    lightning: "<i class='bx bx-cloud-lightning'></i>",
    rain: "<i class='bx bx-cloud-rain'></i>",
    snow: "<i class='bx bx-cloud-snow'></i>",
    sun: "<i class='bx bx-sun' ></i>",
    cloudMoon: "<i class='bi bi-cloud-moon'></i>",
    default: "<i class='bi bi-wind'></i>"
}

let dateInfo;
let dateInfoHour;

buttonSearchOne.addEventListener("click", ClickSearchButtonOne);
buttonSearchTwo.addEventListener("click", ClickSearchButtonTwo);


function ClickSearchButtonOne() {
    const cityName = document.querySelector(".input-city-one").value;
    
    fetchCity(cityName);
}

function ClickSearchButtonTwo() {
    const cityName = document.querySelector(".input-city-two").value;
    
    fetchCity(cityName);
    animate();
}

async function fetchCity(cityName) {
    const dataCity = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`).then(response => response.json());

    getDate(dataCity);
    leftContent(dataCity);
    rightContent(dataCity);
}

function rightContent(dataCity) {
    const location = document.querySelector(".text-location");
    const temp = document.querySelector(".text-temperature");
    const descClime = document.querySelector(".text-clime");
    const divClime = document.querySelector(".text-down div");
    const weekDay = document.querySelector(".text-day");
    const dateDay = document.querySelector(".date-day");
    const dateMonth = document.querySelector(".date-month");
    const dateYear = document.querySelector(".date-year");
    const hour = document.querySelector(".localhour-hour");
    const minutes = document.querySelector(".localhour-minutes");
    const feelsLike = document.querySelector(".feelslike-number span");
    const minTemp = document.querySelector(".mintemp-number span");
    const maxTemp = document.querySelector(".maxtemp-number span");

    let country;

    if (dataCity.sys.country) {
        country = dataCity.sys.country;
    } else {
        country = "N/A"
    }

    const dateWeekName = {
        "Mon": "Monday",
        "Tue": "Tuesday",
        "Wed": "Wednesday",
        "Thu": "Thursday",
        "Fri": "Friday",
        "Sat": "Saturday",
        "Sun": "Sunday"
    };
      
    dateInfo[0] = dateWeekName[dateInfo[0]];

    const dateMonthName = {
        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "Aug": "August",
        "Sept": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    }

    dateInfo[1] = dateMonthName[dateInfo[1]] || dateInfo[1];

    weekDay.innerHTML = `${dateInfo[0]}`;
    dateMonth.innerHTML = `${dateInfo[1]}`;
    dateDay.innerHTML = `${dateInfo[2]}`;
    dateYear.innerHTML = `${dateInfo[3]}`;

    hour.innerHTML = `${dateInfoHour[0]}`;
    minutes.innerHTML = `${dateInfoHour[1]}`;

    feelsLike.innerHTML = `${Math.round(dataCity.main.feels_like)}°C`;
    minTemp.innerHTML = `${Math.round(dataCity.main.temp_min)}°C`;
    maxTemp.innerHTML = `${Math.round(dataCity.main.temp_max)}°C`;
    
    location.innerHTML = `${dataCity.name}, ${country}`;
    temp.innerHTML = `${Math.round(dataCity.main.temp)}°C`;
    descClime.innerHTML = `${dataCity.weather[0].main}`;

    switch(dataCity.weather[0].main) {
        case "Clouds":
            divClime.innerHTML = `${cloudIcons.cloud}`;
            break;
        case "Clear":
            divClime.innerHTML = `${cloudIcons.sun}`;
            break;
        case "Snow":
            divClime.innerHTML = `${cloudIcons.snow}`;
            break;
        case "Rain":
            divClime.innerHTML = `${cloudIcons.rain}`;
            break;
        case "Drizzle":
            divClime.innerHTML = `${cloudIcons.drizzle}`;
            break;
        case "Thunderstorm":
            divClime.innerHTML = `${cloudIcons.lightning}`;
            break;
        case "Snow":
            divClime.innerHTML = `${cloudIcons.snow}`;
            break;
        default:
            divClime.innerHTML = `${cloudIcons.default}`;
            break;
    }
}

function leftContent(dataCity) {
    const humidity = document.querySelector(".humi-percentage");
    const windSpeed = document.querySelector(".wind-kmh");

    humidity.innerHTML = `${dataCity.main.humidity} %`;
    windSpeed.innerHTML = `${Math.round(dataCity.wind.speed)} km/h`;
}

function getDate(dataCity) {
    let newDate = new Date();
    let localTime = newDate.getTime();
    let localOffset = newDate.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let cityTime = utc + (1000 * dataCity.timezone);
    let getDate = new Date(cityTime);

    dateInfo = getDate.toString().split(' ');
    dateInfoHour = dateInfo[4].toString().split(':');
}

function animate() {
    const textUp = document.querySelector(".text-up");
    const textDown = document.querySelector(".text-down");

    const searchTwo = document.querySelector(".search-two");
    const localhour = document.querySelector(".localHour");
    const othersInfo = document.querySelector(".others-info");
    const moreInfo = document.querySelector(".more-info");

    textUp.classList.add("fade-in-mid");
    textDown.classList.add("fade-in-mid");

    searchTwo.classList.add("fade-in-mid");
    localhour.classList.add("fade-in-mid");
    othersInfo.classList.add("fade-in-mid");
    moreInfo.classList.add("fade-in-mid");

    function delayTwo() {
        textUp.classList.remove("fade-in-mid");
        textDown.classList.remove("fade-in-mid");

        searchTwo.classList.remove("fade-in-mid");
        localhour.classList.remove("fade-in-mid");
        othersInfo.classList.remove("fade-in-mid");
        moreInfo.classList.remove("fade-in-mid");
    }

    setTimeout(delayTwo, 0);
}

function visible() {
    const initialSearch = document.querySelector(".initial-search");
    const rightSide = document.querySelector(".right-container");

    initialSearch.classList.add("fade-out");
    rightSide.classList.add("fade-out");

    function delayOne() {
        const mainContainer = document.querySelector(".main-container");
        const leftSide = document.querySelector(".left-container");
        const rightSide = document.querySelector(".right-container");

        const searchTwo = document.querySelector(".search-two");
        const localhour = document.querySelector(".localHour");
        const othersInfo = document.querySelector(".others-info");
        const moreInfo = document.querySelector(".more-info");
        const initialSearch = document.querySelector(".initial-search");
        const textUp = document.querySelector(".text-up");
        const textDown = document.querySelector(".text-down");

        rightSide.classList.add("down-up");
        leftSide.classList.add("down-up");
        searchTwo.classList.add("fade-in");
        localhour.classList.add("fade-in");
        othersInfo.classList.add("fade-in");
        moreInfo.classList.add("fade-in");
        
        textUp.classList.add("fade-in");
        textDown.classList.add("fade-in");
        
        initialSearch.classList.add("hidden");
        leftSide.classList.remove("hidden");
        searchTwo.classList.remove("hidden");
        localhour.classList.remove("hidden");
        othersInfo.classList.remove("hidden");
        moreInfo.classList.remove("hidden");

        mainContainer.style.height = 'auto';
    }
    
    setTimeout(delayOne, 300);
}

function toggleMode() {
    const body = document.querySelector("body");
    body.classList.toggle("light");
}