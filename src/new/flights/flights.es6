app.directive('flightsItem', () => ({
    controllerAs: 'flights',
    templateUrl: 'flights-item.html',
    bindToController: true,
    transclude: true,
    scope: {

    },
    controller: function ($scope, $element, $timeout, Flights, Airports) {


        var init = () => {
            Flights.getQuery();
        };

        init();

        _.extend(this, {

        });
    }
}));