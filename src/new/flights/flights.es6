app.directive('flightsItem', () => ({
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
    controller: function ($scope, $element, $timeout, Flights, Airports, Translation) {
        var showArrivals = true;

        var getTime = (time) => moment(time, "DDMMYYYY HHmmss").format('HH:mm');

        var getAirport = () => _.findWhere(Airports.getAirports(), {code: Flights.getQuery().airport}).name;

        var events = () => {
            $timeout(() => $($element).on('mousewheel', '.flight-cards', function (e, delta) {
                this.scrollLeft -= (e.originalEvent.deltaY * 1);
                this.scrollLeft += (e.originalEvent.deltaX * 1);
                event.preventDefault();
            }));
        };

        var search = () => {
            console.log('searching again...x');
            Flights.loadFlights(this.flightsUrl);
        };

        var init = () => {
            events();
            Airports.setWeatherUrl(this.weatherUrl);
            Airports.loadAirports(this.airportsUrl);

            if (Flights.getQuery().airport) Flights.loadFlights(this.flightsUrl);
            else Flights.loadFlights(this.flightsUrl);
        };

        var getFilteredFlights = () => {
            if (showArrivals) return _.filter(Flights.getFlights(), {ARR_DEP:"A"});
            else return _.filter(Flights.getFlights(), {ARR_DEP:"D"});
        };

        init();

        _.extend(this, {
            search,
            getTime,
            getAirport,
            getFilteredFlights,
            getAirports: Airports.getAirports,
            getQuery: Flights.getQuery,
            getFlights: Flights.getFlights,
            showArrivals: () => showArrivals,
            changeShowing: () => showArrivals = !showArrivals
        });
    }
}));