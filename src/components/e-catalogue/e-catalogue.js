(function () {
    app.controller('ECatalogueCtrl', ['$scope', '$element', '$interval', function ($scope, $element, $interval) {
        var eServices = [];

        var genEServices = function () {
            for (var i = 1;i <=100; i++) {
                eServices.push({
                    id:  _.random(1000, 9999),
                    title:_.sample(['Export of', 'Statement of', 'Regarding', 'Information Required']) + " of " + " "
                        + _.sample([
                            'Wheel Maintenance of TSR',
                            'Inspection Program',
                            'ELT Update',
                            'Incident Help',
                            'Charter Flights',
                            'General Maintenance',
                            'Scheduled Flights'
                        ]),
                    popularity: _.random(0, 10),
                    date:_.random(2000, 2015) * 10000 + _.random(1, 1) * 100 +  _.random(1, 28),
                    audience:_.sample(['Pilot', 'Airman', 'Aircraft', 'Airlines', 'Airports', 'Training Centres']),
                    sector:_.sample(["Air Navigation Services", 'Information Technology', 'Finance & Admin', 'International Organisation'])
                });
            }

        };

        var getEServices = function (filter, sort) {
            //console.log(filter, sort);
            var filteredList = _.where(eServices, filter, sort);
            var sortedList = _.sortBy(filteredList, sort);
            return _.first(sortedList, 3);
        };

        var init = function () {
            genEServices();
        };

        init();

        $scope.getEServices = getEServices;

    }]);
}());
