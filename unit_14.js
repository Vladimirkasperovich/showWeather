

// 6359304 // madrid
//625144 // minsk
//703448 // kyiv*/

let select = document.createElement('select');
select.id = 'city-select';
let box = document.querySelector('.box');
    box.append(select);
    
    let city = {
        6359304: 'Madrid',
        625144: 'Minsk',
        703448: 'Kyiv'

    }
    for (let key in city) {
         let option = document.createElement('option');
         option.value = key;
         option.innerHTML = city[key];
         select.append(option)
       
       
    }

function getWeather() {
    
     const param = {
         "url": "https://api.openweathermap.org/data/2.5/",
         "appid": "15c9a33acfa3d9f1a6a03e80b65d6dcd"
     }
     fetch(`${param.url}weather?id=${select.value}&appid=${param.appid}`)
         .then(weather => {
             return weather.json();
         }).then(showWeather);
}

function showWeather(data) {
    console.log(data);

    document.querySelector('.out-name').textContent = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg';
    document.querySelector('.logo').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
    document.querySelector('.description').innerHTML = data.weather[0]['description'];

    let arr = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    let windDirection = (Math.round(data.wind.deg / 45) % 8);
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        if (windDirection === i) {
            out += arr[i];
        }
    }

    document.querySelector('.wind-direction').textContent = out;
    document.querySelector('.wind-speed').textContent = data.wind.speed;
    document.querySelector('.pressure').textContent = data.main.pressure;
}
getWeather()
document.querySelector('#city-select').onchange = getWeather;