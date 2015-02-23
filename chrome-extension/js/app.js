var forecastsWeatherUrl = "";
var id;
var todaysWeatherUrl = "";
var weekday = new Array(7);
weekday[0]= "Lunes";
weekday[1]= "Martes";
weekday[2]= "Miércoles";
weekday[3]= "Jueves";
weekday[4]= "Viernes";
weekday[5]= "Sábado";
weekday[6]= "Domingo";

$(document).on("ready", Init);

function Init () {

	console.log("Hi developers (:");

	id = localStorage.getItem("city");

	if(id) {

		InitApp();
	}
	else {

		ShowConfiguration();
	}
}

function ShowConfiguration () {

	$(".configuration").fadeIn("slow");
	$(".configuration button").on("click", UpdateCityId);
}

function UpdateCityId () {

	var inputValue = $(".configuration input").val();

	if(inputValue) {

		localStorage.setItem("city", inputValue);
		Reload();
	}
}

function InitApp () {

	$(".app").show();
	GetData();
	$("#delete-city-code").on("click", DeleteCityCode);
}

function DeleteCityCode (event) {

	event.preventDefault();

	if(confirm("¿Desea borrar la información almacenada?")) {

		localStorage.removeItem("city");
		Reload();
	}
}

function Reload () {

	window.location = window.location;
}

function GetData () {

	forecastsWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&cnt=6&id=" + id;
	todaysWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&id=" + id;

	$.getJSON(todaysWeatherUrl)
		.done(UpdateMainInfo)
		.fail(ShowError);

	$.getJSON(forecastsWeatherUrl)
		.done(UpdateForecastBoxes)
		.fail(ShowError);
}

function UpdateMainInfo (data) {

	$(".place").text(data.name + ", " + data.sys.country);

	var today = $(".box.today");
	today.find(".box__content").text(data.main.temp.toPrecision(2) + "°");
	today.find(".box__image").append("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='weather icon'>");
	today.addClass("wow fadeInDown");

	new WOW().init();
}

function UpdateForecastBoxes (data) {

	var forecastBoxes = $(".box:not(.today)");

	$.each(data.list, function (index, value) {

		var box = forecastBoxes[index];

		$(box).find(".box__title").text(weekday[index + 1]);
		$(box).find(".box__image").append("<img src='http://openweathermap.org/img/w/" + value.weather[0].icon + ".png' alt='weather icon'>");
		$(box).find(".box__content").text(value.temp.day.toPrecision(2) + "°");
		$(box).addClass("wow fadeInDown");
	});

	$(".links").addClass("wow fadeInDown");

	new WOW().init();
}

function ShowError () {

	$(".app").hide();
	$(".error").fadeIn("slow");
	console.log("Error :(");
}