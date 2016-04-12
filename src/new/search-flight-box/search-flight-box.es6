app.directive('searchFlightBoxItem', () => ({
    controllerAs: 'search',
    templateUrl: 'search-flight-box-item.html',
    bindToController: true,
    scope: {},
    controller: function (Airports) {

        var init = () => {
        };

        var calcTemp = (temp) => Math.round(temp - 273.15);

        init();

        _.extend(this, {
            getAirports: Airports.getAirports,
            geocode: Airports.geocode,
            calcTemp
        });
    }
}));