var forecastsWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Buenos+Aires&units=metric&lang=es&cnt=6";
var todaysWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Buenos+Aires&units=metric&lang=es";
var weekday = new Array(7);
weekday[0]= "Lunes";
weekday[1]= "Martes";
weekday[2]= "Miércoles";
weekday[3]= "Jueves";
weekday[4]= "Viernes";
weekday[5]= "Sábado";
weekday[6]= "Domingo";

$(document).on("ready", init);

function init () {

	console.log("Hi developers (:");

	GetData();
}

function GetData () {

	$.getJSON(todaysWeatherUrl)
		.done(function (data) {

			UpdateMainInfo(data);
		})
		.fail(function () {

			showError();
		});

	$.getJSON(forecastsWeatherUrl)
		.done(function (data) {

			UpdateForecastBoxes(data);
		})
		.fail(function () {

			showError();
		});
}

function UpdateMainInfo (data) {

	$(".place").text(data.name + ", " + data.sys.country);

	var imageName = data.weather[0].icon;
	var today = $(".box.today");
	today.find(".box__content").text(data.main.temp.toPrecision(2) + "°");
	today.find(".box__image").append("<img src='http://openweathermap.org/img/w/" + imageName + ".png' alt='weather icon'>");
	today.addClass("wow fadeInDown");

	new WOW().init();
}

function UpdateForecastBoxes (data) {

	var forecastBoxes = $(".box:not(.today)");

	$.each(data.list, function (index, value) {

		var box = forecastBoxes[index];
		var imageName = value.weather[0].icon;

		$(box).find(".box__title").text(weekday[index + 1]);
		$(box).find(".box__image").append("<img src='http://openweathermap.org/img/w/" + imageName + ".png' alt='weather icon'>");
		$(box).find(".box__content").text(value.temp.day.toPrecision(2) + "°");
		$(box).addClass("wow fadeInDown");
	});

	new WOW().init();
}

function showError () {

	$(".app").hide();
	$(".error").fadeIn("slow");
	console.log("Error :(");
}