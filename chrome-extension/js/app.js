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
	$(".current-weather__temp").text(data.main.temp.toPrecision(2));

	// Init animation of .current-weather box
	new WOW().init();
}