app.directive('facilitiesItem', () => ({
    controllerAs: 'facilities',
    templateUrl: 'facilities-item.html',
    bindToController: true,
    transclude: true,
    scope: {
        image: '@',
        description: '@',
        link: '@'
    },
    controller: function ($scope, $element, $timeout, Translation, $sce) {

        var facilities = [];

        var loadFacilities = () => {
            $element.find('facility-item').each(function () {
                facilities.push(getAttrs($(this)));
            });
        };

        var init = () => {
            $timeout(loadFacilities);
        };

        init();

        _.extend(this, {
            getFacilities: () => facilities,
            getDescription: () => $sce.trustAsHtml(this.description)
        });
    }
}));

var getAttrs = ($el) => {
    var obj = {};
    $($el[0].attributes).each(function () {
        obj[this.nodeName] = this.value;
    });
    return obj;
};