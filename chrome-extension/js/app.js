(function () {

	// Variables
	var cityId = localStorage.getItem("city");
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

		if(!cityId) ShowConfiguration();
		else InitApp();
	}

	function ShowConfiguration () {

		if(cityId) {

			$("#current-city-id").text(cityId);

			$(".configuration .with-city-id").show();
			$(".configuration .without-city-id").hide();
		} else {

			$(".configuration .with-city-id").hide();
			$(".configuration .without-city-id").show();
		}

		$(".app").hide();
		$(".configuration").fadeIn("slow");
	}

	function InitApp () {

		$(".app").show();
		GetData();
	}

	function GetData () {

		var forecastsWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lang=es&cnt=6&id=" + cityId;
		var todaysWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&id=" + cityId;

		$.getJSON(todaysWeatherUrl)
			.done(function (mainInfo) {

				UpdateMainInfo(mainInfo);

				$.getJSON(forecastsWeatherUrl)
					.done(function (forecastWeatherInfo) {

						UpdateForecastBoxes(forecastWeatherInfo);

						new WOW().init();
					})
					.fail(ShowError);
			})
			.fail(ShowError);
	}

	function UpdateMainInfo (data) {

		var place = $(".place");
		place.text(data.name + ", " + data.sys.country);

		var today = $(".box.today");
		today.find(".box__image").append("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='weather icon'>");
		today.find(".box__content").text(data.main.temp.toPrecision(2) + "°");
	}

	function UpdateForecastBoxes (data) {

		var forecastBoxes = $(".box:not(.today)");

		$.each(data.list, function (index, value) {

			var box = forecastBoxes[index];

			$(box).find(".box__title").text(weekday[index + 1]);
			$(box).find(".box__image").append("<img src='http://openweathermap.org/img/w/" + value.weather[0].icon + ".png' alt='weather icon'>");
			$(box).find(".box__content").text(value.temp.day.toPrecision(2) + "°");
		});
	}

	// Auxiliar functions
	function ShowError () {

		$(".app").hide();
		$(".error").fadeIn("slow");
	}

	function Reload () {

		window.location.reload();
	}

	// Events
	$("#show-configuration").on("click", function () {

		ShowConfiguration();
	});

	$(".configuration button").on("click", function () {

		var inputValue = $(".configuration input").val();

		if(inputValue) {

			localStorage.setItem("city", inputValue);
			Reload();
		}
	});

	$("#delete-current-city-id").on("click", function () {

		localStorage.removeItem("city");
		Reload();
	});
})();