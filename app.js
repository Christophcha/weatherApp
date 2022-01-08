//const loc = document.querySelector('.location');
//const temp = document.querySelector('.temp');
//const icon = document.querySelector('.icon');
//const description = document.querySelector('.description');
//const humidity = document.querySelector('.humidity');


window.addEventListener('load', (event) => {


    getLocation();
    getDate();
    getTime();

});

function getLocation() {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //reveals data after user clicks allow
            const hidden = document.querySelector('.hidden').style.display = "block";

            const API_KEY = 'a17219c9cc185112751d1230555c14bd';
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    weatherData(data);
                });

        });

    }
}

function weatherData(data) {
    const temperature = document.querySelector('.temp');
    const temperatureHigh = document.querySelector('.temp-high');
    const temperatureLow = document.querySelector('.temp-low');
    const humidityPercent = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind');
    const geoLocation = document.querySelector('.location');
    const weatherDescription = document.querySelector('.description');


    let { temp, temp_max, temp_min, humidity } = data.main;
    let { speed } = data.wind;
    let name = data.name;
    let { icon } = data.weather[0];
    let { description } = data.weather[0];

    // let iconCode = icon;
    //const weatherIcon = document.querySelector('.icon').innerHTML = '<img src =\'http://openweathermap.org/img/w/' + icon + '.png\'>';
    // let img = new Image();
    // img.src = 'http://openweathermap.org/img/w/' + iconCode + '.png';

    geoLocation.innerHTML = name;
    temperature.innerHTML = temp.toFixed(0) + "°";
    temperatureHigh.innerHTML = "H: " + temp_max.toFixed(0) + "°";
    temperatureLow.innerHTML = "L: " + temp_min.toFixed(0) + "°";

    document.querySelector('.icon').innerHTML = '<img src =\'http://openweathermap.org/img/w/' + icon + '.png\'>';
    weatherDescription.innerHTML = description.toUpperCase();

    humidityPercent.innerHTML += humidity + "%";
    windSpeed.innerHTML += speed.toFixed(0) + " mph";


    //weatherIcon.innerHTML = icon; // shows icon code
    //document.body.appendChild(img);
    //weatherIcon.innerHTML = `http://openweathermap.org/img/w/` + iconCode + ".png";

}

function getDate() {
    let date = document.querySelector('.date');

    let currentDay = new Date();
    date.innerHTML = ('' + currentDay.getMonth(-2) + 1) + "-" + ('0' + currentDay.getDate()).slice(-2) + '-' + (currentDay.getFullYear());
}

function getTime() {
    let time = document.querySelector('.time');
    let amPm = document.querySelector('.am-pm');

    let currentTime = new Date();
    time.innerHTML = ('0' + currentTime.getHours()) + ":" + ('0' + currentTime.getMinutes()).slice(-2) + ':' + ('0' + currentTime.getSeconds()).slice(-2);

    if (currentTime.getHours() < 12) {
        amPm.innerHTML = "AM"
    } else {
        amPm.innerHTML = "PM"
    }
    setTimeout(getTime, 1000);
}


