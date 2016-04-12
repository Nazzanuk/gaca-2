app.directive('searchFlightBoxItem', () => ({
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
    controller: function (Airports, Flights) {

        var calcTemp = (temp) => Math.round(temp - 273.15);

        var changeSelect = (airport) => {
            console.log('changeSelect', airport);
            Airports.geocode(Airports.getAirports().indexOf(airport));
            Flights.getQuery().airport = airport.code;
        };

        var init = () => {
            Airports.loadAirports(this.airportsUrl)
        };

        init();

        _.extend(this, {
            getQuery: Flights.getQuery,
            externalSearch: () => Flights.externalSearch(this.searchUrl),
            getAirports: Airports.getAirports,
            geocode: Airports.geocode,
            changeSelect,
            calcTemp
        });
    }
}));