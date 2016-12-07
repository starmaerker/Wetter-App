"use strict";

var test;
searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Please enter a City Name');
    }
    var http = new XMLHttpRequest();
    var apiKey = 'ca5922913be2b792b2e069fffc59e329';
    var url1 = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
	var url2 = 'http://api.openweathermap.org/data/2.5/weather?zip=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url1);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
			
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
			
            updateWeather(weatherData, data);
			
			
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();
}

function updateWeather(weatherData, data) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
	
	var rise = new Date(data.sys.sunrise * 1000);
	var set = new Date(data.sys.sunset * 1000);
	rise.toISOString();
	set.toISOString();
	
	
	var node = document.createElement("DIV");
	var textnode = document.createTextNode("Sunrise: " + rise + " Sunset: " + set );
	node.appendChild(textnode);
	document.getElementById("weather").appendChild(document.createElement("br"));
	document.getElementById("weather").appendChild(document.createElement("br"));
	document.getElementById("weather").appendChild(node);
} 


    


