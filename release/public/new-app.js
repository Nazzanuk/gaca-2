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
        scope: {
            airportsUrl: '@',
            searchUrl: '@',
            lang: '@',
            stringChoose: '@',
            stringFlightNo: '@',
            stringSearch: '@'
        },
        controller: function controller(Airports, Flights) {
            var _this2 = this;

            var calcTemp = function calcTemp(temp) {
                return Math.round(temp - 273.15);
            };

            var changeSelect = function changeSelect(airport) {
                console.log('changeSelect', airport);
                Airports.geocode(Airports.getAirports().indexOf(airport));
                Flights.getQuery().airport = airport.code;
            };

            var init = function init() {
                Airports.loadAirports(_this2.airportsUrl);
            };

            init();

            _.extend(this, {
                getQuery: Flights.getQuery,
                externalSearch: function externalSearch() {
                    return Flights.externalSearch(_this2.searchUrl);
                },
                getAirports: Airports.getAirports,
                geocode: Airports.geocode,
                changeSelect: changeSelect,
                calcTemp: calcTemp
            });
        }
    };
});
app.service('Airports', function ($http) {
    var airports = [],
        OPEN_WEATHER_KEY = '44756d87096e5a658578891c2abcca4e';

    var getWeather = function getWeather(index) {
        return $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + airports[index].coords.lat + '&lon=' + airports[index].coords.lon + '&APPID=' + OPEN_WEATHER_KEY).then(function (response) {
            airports[index].weather = response.data;
            console.log('weather', response.data);
            console.log('airports', airports);
        });
    };

    var geocode = function geocode(index) {
        if (airports[index].coords) getWeather(index);else console.log('no coords', airports);
    };

    var loadAirports = function loadAirports() {
        var url = arguments.length <= 0 || arguments[0] === undefined ? 'public/json/airports.json' : arguments[0];
        return $http.get(url).then(function (response) {
            airports = response.data;
            geocode(0);
            console.log('airports', airports);
        }, function (response) {
            console.error('error! Airports JSON missing, using defaults', response);
            airports = AIRPORTS_DEFAULT_JSON;
        });
    };

    var init = function init() {
        //loadAirports();
    };

    init();

    return {
        getAirports: function getAirports() {
            return airports;
        },
        loadAirports: loadAirports,
        geocode: geocode
    };
});

var AIRPORTS_DEFAULT_JSON = [{
    "name": "London Heathrow",
    "arabicName": "مطار لندن - هيثرو",
    "code": "LHW",
    "coords": {
        "lat": 51.47,
        "lon": -0.45
    }
}, {
    "name": "London Gatwick",
    "arabicName": "جاتويك",
    "code": "LGW",
    "coords": {
        "lat": 51.17,
        "lon": -0.18
    }
}, {
    "name": "Jeddah",
    "arabicName": "جدة",
    "code": "JED"
}];
app.service('Flights', function ($http) {

    var query = {
        airport: "",
        flight: ""
    },
        flights = [];

    var loadFlights = function loadFlights(airport) {
        return $http.get('public/json/airports.json?').then(function (response) {
            flights = response.data;
            console.log('airports', response.data);
        });
    };

    var externalSearch = function externalSearch(url) {
        console.log('externalSearch', url);
        if (!query.airport) return;
        window.location.href = url + '?airport=' + query.airport + '&flight=' + query.flight;
    };

    var init = function init() {};

    init();

    return {
        getQuery: function getQuery() {
            return query;
        },
        externalSearch: externalSearch
    };
});

var getUrlParam = function getUrlParam(name) {
    var url = window.location.href,
        results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return !results ? undefined : results[1] || undefined;
};