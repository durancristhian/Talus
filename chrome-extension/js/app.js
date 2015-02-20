$(document).on("ready", init);

function init () {

	console.log("Hi developers (:");

	GetData();
}

function GetData () {

	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Buenos+Aires&units=metric&lang=es")
		.done(function getJSONDoneCallback (data) {

			UpdateUI(data);
		})
		.fail(function getJSONFailCallback () {

			console.log("Error :(");
		});
}

function UpdateUI (data) {

	// Review this values
	$(".current-weather__place-city").text(data.name);
	$(".current-weather__place-country").text(data.sys.country);
	$(".current-weather__temp-value").text(data.main.temp.toPrecision(2));
	$(".current-weather__temp-min-value").text(data.main.temp_min);
	$(".current-weather__temp-max-value").text(data.main.temp_max);
	$(".current-weather__humidity").text(data.main.humidity);
	$(".current-weather__wind").text(data.wind.speed);

	// Init animation of .current-weather box
	new WOW().init();
}