let output = document.getElementsByClassName("dayField");
let statFields = document.getElementsByClassName("statFields");
getForecast();

function getForecast() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let weatherForecast = JSON.parse(this.responseText);
            console.log(weatherForecast)

            for (let i = 0; i < weatherForecast.list.length; i++) {
                if (i % 8 === 0) {
                    let temperature = Math.floor(weatherForecast.list[i].main.temp);
                    let humidity = weatherForecast.list[i].main.humidity;
                    let date = weatherForecast.list[i].dt_txt;
                    let clouds = weatherForecast.list[i].weather[0].icon;
                    let windSpeed = weatherForecast.list[i].wind.speed;

                    windSpeed *= 10;
                    windSpeed = Math.round(windSpeed) / 10;

                    let windDirection = weatherForecast.list[i].wind.deg;

                    clouds = 'https://openweathermap.org/img/wn/' + clouds + '@2x.png';

                    let day = date.split(/(\s+)/)[0];
                    let time = date.split(/(\s+)/)[2];

                    console.log(day);

                    output[i / 8].innerHTML = '<h2>' + day + '</h2>' + output[i / 8].innerHTML;
                    statFields[i / 8].innerHTML += `<div class="statField">Temperatur<br><p style="color: #d90024">${temperature}°C</p></div>`;
                    statFields[i / 8].innerHTML += `<div class="statField">Clouds<br><img src="${clouds}" alt="cloud"></div>`;
                    statFields[i / 8].innerHTML += `<div class="statField">Feuchtigkeit<br><p style="color: #377eff">${humidity}%</p></div>`;
                    statFields[i / 8].innerHTML += `<div class="statField">Wind<br><p style="color: #999999; text-transform: lowercase">${windSpeed} m/s<br>${windDirection}°</p></div>`;
                }
            }
        }
    }

    xhttp.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=7872055&appid=0e694892e1439f8f7f82eaf343aa68c4&units=metric', true);
    xhttp.send();
}