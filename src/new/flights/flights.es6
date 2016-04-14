app.directive('flightsItem', () => ({
    controllerAs: 'flights',
    templateUrl: 'flights-item.html',
    bindToController: true,
    transclude: true,
    scope: {
        lang: '@',
        flightsUrl: '@',
        airportsUrl: '@'
    },
    controller: function ($scope, $element, $timeout, Flights, Airports) {
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
            console.log('searching again...x')
            Flights.loadFlights(this.flightsUrl);
        };

        var init = () => {
            events();
            Airports.loadAirports(this.airportsUrl);

            if (Flights.getQuery().airport) Flights.loadFlights(this.flightsUrl);
        };

        init();

        _.extend(this, {
            search,
            getTime,
            getAirport,
            getAirports: Airports.getAirports,
            getQuery: Flights.getQuery,
            getFlights: Flights.getFlights,
            showArrivals: () => showArrivals,
            changeShowing: () => showArrivals = !showArrivals
        });
    }
}));