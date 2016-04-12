app.directive('searchFlightBoxItem', () => ({
    controllerAs: 'search',
    templateUrl: 'search-flight-box-item.html',
    bindToController: true,
    scope: {},
    controller: function (Airports, Flights) {

        var init = () => {
        };

        var calcTemp = (temp) => Math.round(temp - 273.15);



        init();

        _.extend(this, {
            getQuery: Flights.getQuery,
            getAirports: Airports.getAirports,
            geocode: Airports.geocode,
            calcTemp
        });
    }
}));