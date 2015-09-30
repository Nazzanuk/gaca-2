app.controller('CheckDestinationCtrl', function ($scope, $timeout, $http, $sce) {

    var currentDestination = 0;
    var weather = {};

    var destinations = [];

    var getCurrentDestination = function () {
        return destinations[currentDestination];
    };

    var get = function (key) {
        return function () {
            return key;
        }
    };

    var set = function (key) {
        return function (value) {
            key = value;
        }
    };

    var getWeatherText = function () {
        try {
            return weather.weather[0].description
        } catch (e) {
            return "No weather data available";
        }
    };

    var getWeatherIcon = function () {
        return "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"

    };

    var getWeatherTemp = function () {
        return Math.round(weather.main.temp - 272.15);
    };

    var setDestination = function (index) {
        currentDestination = index;
        loadWeather();
    };

    var getUrl = function () {
        return $sce.trustAsResourceUrl("http://www.flightstats.co.uk/FlightStatus/flightStatusByFlight.do?flightNumber=" + $scope.flightNumber + "&x=26&y=10");
    };

    var loadWeather = function () {
        weather = {};
        //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
        var dest = getCurrentDestination();
        return $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + dest.coords[0] + "&lon=" + dest.coords[1]).then(function (response) {
            console.log(dest, response.data);
            weather = response.data;
        });
    };

    var events = function () {

    };

    var init = function () {
        events();
        if (initialDestinations != undefined) {
            destinations = initialDestinations;
            loadWeather();
        }
    };

    init();

    $scope.getDestination = get(currentDestination);
    $scope.getCurrentDestination = getCurrentDestination;
    $scope.getDestinations = get(destinations);
    $scope.getWeather = get(weather);
    $scope.setDestination = setDestination;
    $scope.getWeatherText = getWeatherText;
    $scope.getWeatherIcon = getWeatherIcon;
    $scope.getWeatherTemp = getWeatherTemp;
    $scope.getUrl = getUrl;

});
