"use strict";

app.run(function () {
    $('body').addClass('active');

    $('body').on('onerror', 'img', function () {
        console.log('img error');
        $(this).hide();
        // or $(this).css({visibility:"hidden"});
    });
});
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
        scope: {
            lang: '@',
            flightsUrl: '@',
            airportsUrl: '@',
            weatherUrl: '@',

            stringFlightInfo: '@',
            stringSearchText: '@',
            stringArrivals: '@',
            stringDepartures: '@',
            stringTime: '@',
            stringFlightNumber: '@',
            stringGate: '@',
            stringAirline: '@',
            stringNoResults: '@',
            stringFrom: '@',
            stringTo: '@',
            stringTerminal: '@',
            stringBaggage: '@',
            stringExpected: '@',
            stringDeparting: '@',
            stringSort: '@'
        },
        controller: function controller($scope, $element, $timeout, Flights, Airports, Translation) {
            var _this2 = this;

            var _showArrivals = true;

            var getTime = function getTime(time) {
                return moment(time, "DDMMYYYY HHmmss").format('HH:mm');
            };

            var getAirport = function getAirport() {
                return _.findWhere(Airports.getAirports(), { code: Flights.getQuery().airport }).name;
            };

            var events = function events() {
                $timeout(function () {
                    return $($element).on('mousewheel', '.flight-cards', function (e, delta) {
                        this.scrollLeft -= e.originalEvent.deltaY * 1;
                        this.scrollLeft += e.originalEvent.deltaX * 1;
                        event.preventDefault();
                    });
                });
            };

            var search = function search() {
                console.log('searching again...x');
                Flights.loadFlights(_this2.flightsUrl);
            };

            var init = function init() {
                events();
                Airports.setWeatherUrl(_this2.weatherUrl);
                Airports.loadAirports(_this2.airportsUrl);

                if (Flights.getQuery().airport) Flights.loadFlights(_this2.flightsUrl);else Flights.loadFlights(_this2.flightsUrl);
            };

            init();

            _.extend(this, {
                search: search,
                getTime: getTime,
                getAirport: getAirport,
                getAirports: Airports.getAirports,
                getQuery: Flights.getQuery,
                getFlights: Flights.getFlights,
                showArrivals: function showArrivals() {
                    return _showArrivals;
                },
                changeShowing: function changeShowing() {
                    return _showArrivals = !_showArrivals;
                }
            });
        }
    };
});
app.service('Airports', function ($http, Translation) {
    var airports = [],
        weatherUrl = "",
        OPEN_WEATHER_KEY = '44756d87096e5a658578891c2abcca4e';

    var setWeatherUrl = function setWeatherUrl(string) {
        return weatherUrl = string;
    };

    var getWeather = function getWeather(index) {
        return $http.get(weatherUrl + '&lat=' + airports[index].coords.lat + '&lon=' + airports[index].coords.lon).then(function (response) {
            airports[index].weather = response.data;
            console.log('weather', response.data);
            console.log('airports', airports);
        });
    };

    //return $http.get(WEATHER_SERVICE_URL + "&lat=" + dest.coords[0] + "&lon=" + dest.coords[1] + "&locale=" + CURRENT_LOCALE).then(function (response) {
    //    console.log(dest, response.data);
    //    weather = response.data;
    //});

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
        setWeatherUrl: setWeatherUrl,
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

app.service('Flights', function ($http, Airports, Translation) {

    var FLIGHTS_DEFAULT_JSON = {};

    var query = {
        airport: "",
        flight: ""
    },
        flights = [];

    var loadFlights = function loadFlights() {
        var url = arguments.length <= 0 || arguments[0] === undefined ? 'public/json/airport-flights.json' : arguments[0];

        console.log(' query', query);
        console.log(' Airports.getAirports()', Airports.getAirports());
        //if (!query.airport) query.airport = Airports.loadAirports().then(() => {query.airport = Airports.getAirports()[0].code, loadFlights()});

        flights = [];
        return $http.get(url + 'airportCode=' + query.airport).then(function (response) {
            flights = response.data.FLIGHT;
            for (var i in flights) {
                flights[i].AIRLINE = flights[i].AIRLINE.trim();
                flights[i].flightNumber = flights[i].AIRLINE + flights[i].FL_NUMBER;
            }
            console.log('flights', flights);
        }, function (response) {
            console.error('error! Flights JSON missing, using defaults', response);
            flights = FLIGHTS_DEFAULT_JSON.FLIGHT;
            for (var i in flights) {
                flights[i].AIRLINE = flights[i].AIRLINE.trim();
                flights[i].flightNumber = flights[i].AIRLINE + flights[i].FL_NUMBER;
            }
            console.log('flights', flights);
        });
    };

    var externalSearch = function externalSearch(url) {
        console.log('externalSearch', url);
        if (!query.airport) return;
        window.location.href = url + 'airportCode=' + query.airport + '&flightNumber=' + query.flight;
    };

    var getUrlParam = function getUrlParam(name) {
        var url = window.location.href,
            results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        return !results ? undefined : results[1] || undefined;
    };

    var init = function init() {
        if (getUrlParam('airportCode')) query.airport = getUrlParam('airportCode');
        if (getUrlParam('flightNumber')) query.flight = getUrlParam('flightNumber');

        console.log('query', query);
    };

    init();

    return {
        getQuery: function getQuery() {
            return query;
        },
        getFlights: function getFlights() {
            return flights;
        },
        externalSearch: externalSearch,
        loadFlights: loadFlights
    };
});
app.service('Translation', function ($rootScope) {

    var currentLang = 'en',
        translations = [];

    var setLang = function setLang(lang) {
        return currentLang = lang;
    };

    var getLang = function getLang() {
        return currentLang;
    };

    var addTranslation = function addTranslation(en, ar) {
        return translations.push({ en: en, ar: ar });
    };

    var getTranslation = function getTranslation(en) {
        var obj = _.findWhere(translations, { en: en });

        return currentLang == 'en' ? obj.en : obj.ar ? obj.ar : obj.en;
    };

    var init = function init() {
        if ($('body').hasClass('arabic')) setLang('ar');
    };

    init();

    _.extend($rootScope, {
        getLang: getLang,
        tran: getTranslation
    });

    return {
        addTranslation: addTranslation,
        getTranslation: getTranslation,
        setLang: setLang
    };
});
app.directive('searchFlightBoxItem', function () {
    return {
        controllerAs: 'search',
        templateUrl: 'search-flight-box-item.html',
        bindToController: true,
        scope: {
            airportsUrl: '@',
            searchUrl: '@',
            weatherUrl: '@',
            lang: '@',
            stringChoose: '@',
            stringFlightNo: '@',
            stringSearch: '@',
            stringArrivals: '@'
        },
        controller: function controller(Airports, Flights, Translation) {
            var _this3 = this;

            var calcTemp = function calcTemp(temp) {
                return Math.round(temp - 273.15);
            };

            var changeSelect = function changeSelect(airport) {
                console.log('changeSelect', airport);
                Airports.geocode(Airports.getAirports().indexOf(airport));
                Flights.getQuery().airport = airport.code;
            };

            var init = function init() {
                Airports.setWeatherUrl(_this3.weatherUrl);
                Airports.loadAirports(_this3.airportsUrl);
            };

            init();

            _.extend(this, {
                getQuery: Flights.getQuery,
                externalSearch: function externalSearch() {
                    return Flights.externalSearch(_this3.searchUrl);
                },
                getAirports: Airports.getAirports,
                geocode: Airports.geocode,
                changeSelect: changeSelect,
                calcTemp: calcTemp
            });
        }
    };
});