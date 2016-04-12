'use strict';

app.directive('boxItem', function () {
    return {
        controllerAs: 'box',
        templateUrl: 'box-item.html',
        bindToController: true,
        transclude: true,
        scope: {
            header: '@',
            styleClass: '@',
            icon: '@',
            active: '='
        },
        controller: function controller($scope, $element, $timeout) {
            var _this = this;

            var visible = false;

            this.active = this.active == undefined ? false : this.active;

            //var showPopup = function () {
            //    PopupService.setPopupHeader($element.find('.popup-title').text());
            //    PopupService.setPopupContent($element.find('.popup-content').html());
            //    PopupService.showPopup();
            //};

            var changeActive = function changeActive() {
                _this.active = !_this.active;

                console.log('zzz');
                $timeout(function () {
                    return google.maps.event.trigger(map, 'resize');
                }, 50);
            };

            var init = function init() {
                $timeout(function () {
                    return visible = true;
                });
            };

            init();

            _.extend(this, {
                changeActive: changeActive,
                isVisible: function isVisible() {
                    return visible;
                }
                //showPopup
            });
        }
    };
});
app.directive('flightsItem', function () {
    return {
        controllerAs: 'flights',
        templateUrl: 'flights-item.html',
        bindToController: true,
        transclude: true,
        scope: {},
        controller: function controller($scope, $element, $timeout, Flights, Airports) {

            var init = function init() {
                Flights.getQuery();
            };

            init();

            _.extend(this, {});
        }
    };
});
app.run(function () {
    $('body').addClass('active');
});
app.directive('searchFlightBoxItem', function () {
    return {
        controllerAs: 'search',
        templateUrl: 'search-flight-box-item.html',
        bindToController: true,
        scope: {},
        controller: function controller(Airports) {

            var init = function init() {};

            var calcTemp = function calcTemp(temp) {
                return Math.round(temp - 273.15);
            };

            init();

            _.extend(this, {
                getAirports: Airports.getAirports,
                geocode: Airports.geocode,
                calcTemp: calcTemp
            });
        }
    };
});
app.service('Airports', function ($http) {
    var airports = [],
        OPEN_WEATHER_KEY = '44756d87096e5a658578891c2abcca4e';

    var getWeather = function getWeather(index) {
        return $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + airports[index].coords.lat + '&lon=' + airports[index].coords.lng + '&APPID=' + OPEN_WEATHER_KEY).then(function (response) {
            airports[index].weather = response.data;
            console.log('weather', response.data);
            console.log('airports', airports);
        });
    };

    var geocode = function geocode(index) {
        if (airports[index].coords != undefined) return;
        console.log('index', index);
        $http.get('http://maps.google.com/maps/api/geocode/json?address=' + airports[index].name + '%20airport&sensor=false').then(function (response) {

            airports[index].coords = response.data.results[0].geometry.location;
            getWeather(index);
            console.log('coords', airports[index]);
        });
    };

    var loadAirports = function loadAirports(airport) {
        return $http.get('public/json/airports.json').then(function (response) {
            airports = response.data;
            geocode(0);
            console.log('airports', response.data);
        });
    };

    var init = function init() {
        loadAirports();
    };

    init();

    return {
        getAirports: function getAirports() {
            return airports;
        },
        geocode: geocode
    };
});
app.service('Flights', function ($http, $location) {

    var query = {
        airport: "",
        flight: ""
    };

    var loadFlights = function loadFlights(airport) {
        return $http.get('public/json/airports.json?').then(function (response) {
            airports = response.data;
            geocode(0);
            console.log('airports', response.data);
        });
    };

    var init = function init() {
        console.log('flight', getUrlParam('airport'));
        console.log('flight', getUrlParam('flight'));
    };

    init();

    return {
        getQuery: function getQuery() {
            return query;
        }
    };
});

var getUrlParam = function getUrlParam(name) {
    var url = window.location.href,
        results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return !results ? undefined : results[1] || undefined;
};