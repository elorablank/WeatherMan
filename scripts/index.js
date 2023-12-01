"use strict"

const cities = [
    {
        name: "Indianapolis, IN",
        latitude: "39.7687501997877",
        longitude: "-86.15755459073418"
    }, 
    {
        name: "Atlanta, GA",
        latitude: "33.748430737434795",
        longitude: "-84.39164892644436"
    }, 
    {
        name: "Miami, FL",
        latitude: "25.76307851409245",
        longitude: "-80.19152186971137"
    }, 
    {
        name: "Los Angeles, CA",
        latitude: "34.054794878491286",
        longitude: "-118.22914134482899"
    },
    {
        name: "Aurora, CO",
        latitude: "39.72947995829194",
        longitude: "-104.82862789807483"
    },
    {
        name: "Minneapolis, MN",
        latitude: "44.97771075747267",
        longitude: "-93.24637420538235"
    }
]


window.onload = function () {
    const dropDown = document.getElementById("city")
    dropDown.onchange = getForecastURL
    populateDropDown(cities, dropDown)
}

function populateDropDown (cities, element) {
    let html = `<option>Choose a city...</option>`
    for (let index = 0; index < cities.length; index += 1) {
        const city = cities[index]
        html += `<option value="${city.latitude},${city.longitude}">${city.name}</option>`
    }
    element.innerHTML = html
}

function getForecastURL (event) {
    const select = event.target.value
    fetch (`https://api.weather.gov/points/${select}`)
    .then (response => response.json())
    .then (data => getForecastData(data.properties.forecast))
}

function getForecastData (forecast) {
    fetch (forecast)
    .then (response => response.json())
    .then (data => loopData(data.properties.periods))
}

function loopData (times) {
    let html = ""
    for (let index = 0; index < times.length; index += 1) {
        const time = times[index];
        html += `<div class="row m-2 p-3">
        <div class="col">
            <h1>${time.name}</h1>
        </div>
        <div class="col">
            <h1>Temperature ${time.temperature} ${time.temperatureUnit} Winds ${time.windDirection} ${time.windSpeed}</h1>
        </div>
        <div class="col">
            <h1>${time.shortForecast}</h1>
        </div>
    </div>`
    }
    const results = document.querySelector("#forecastResult")
    results.innerHTML = html
}