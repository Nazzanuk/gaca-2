(function () {
    app.controller('LoginCtrl', ['$scope', function ($scope) {
        var showPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hidePopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeOut', 200);
        };

        var events = function () {
            $(document).on('click', '.show-login-popup', showPopup);
            $(document).on('click', '.hide-login-popup', hidePopup);
        };

        var init = function () {
            events();
        };

        init();

        //$scope.showPopup = showPopup;
    }]);
}());
