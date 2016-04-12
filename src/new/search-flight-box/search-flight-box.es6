app.directive('searchFlightBoxItem', () => ({
    controllerAs: 'search',
    templateUrl: 'search-flight-box-item.html',
    bindToController: true,
    scope: {},
    controller: function (Airports, Flights) {

        var init = () => {
        };

        var calcTemp = (temp) => Math.round(temp - 273.15);

        var changeSelect = (airport) => {
            console.log('changeSelect',airport);
            Airports.geocode(Airports.getAirports().indexOf(airport));
            Flights.getQuery().airport = airport.code;
        };


        init();

        _.extend(this, {
            getQuery: Flights.getQuery,
            externalSearch: Flights.externalSearch,
            getAirports: Airports.getAirports,
            geocode: Airports.geocode,
            changeSelect,
            calcTemp
        });
    }
}));