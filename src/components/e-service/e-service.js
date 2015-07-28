(function () {
    app.controller('EServiceCtrl', ['$scope', function ($scope) {
        var showPopup = function () {
            $('.e-popup').velocity('stop').velocity('transition.slideUpIn', 200);
        };
        var hidePopup = function () {
            $('.e-popup').velocity('stop').velocity('transition.slideUpOut', 200);
        };

        var events = function () {
            $(document).on('click', '.show-e-popup', showPopup);
            $(document).on('click', '.hide-e-popup', hidePopup);
        };

        var init = function () {
            events();
        };

        init();

        //$scope.showPopup = showPopup;
    }]);
}());
