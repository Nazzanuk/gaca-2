(function () {
    app.controller('EServiceCtrl', ['$scope', function ($scope) {
        var showPopup = function () {
            $('html, body').addClass('no-scroll');
            $('.e-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hidePopup = function () {
            $('html, body').removeClass('no-scroll');
            $('.e-popup').velocity('stop').velocity('transition.fadeOut', 200);
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
