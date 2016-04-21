app.directive('facilitiesItem', () => ({
    controllerAs: 'facilities',
    templateUrl: 'facilities-item.html',
    bindToController: true,
    transclude: true,
    scope: {
    },
    controller: function ($scope, $element, $timeout, Translation) {

        var init = () => {

        };

        init();

        _.extend(this, {

        });
    }
}));