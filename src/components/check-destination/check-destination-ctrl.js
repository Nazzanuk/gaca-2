app.controller('CheckDestinationCtrl', function ($scope, $timeout, $http) {

    var currentDestination = "";
    var weather = {};

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

    var setDestination = function (destination) {
        currentDestination = destination;
        loadWeather();
    };

    var loadWeather = function () {
        weather = {};
        return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + currentDestination).then(function (response) {
            console.log(currentDestination, response.data);
            weather = response.data;
        });
    };

    var events = function () {

    };

    var init = function () {
        events();
        loadWeather();
    };

    init();

    $scope.getDestination = get(currentDestination);
    $scope.getWeather = get(weather);
    $scope.setDestination = setDestination;
    $scope.getWeatherText = getWeatherText;
    $scope.getWeatherIcon = getWeatherIcon;
    $scope.getWeatherTemp = getWeatherTemp;

});
