(function () {
    app.controller('LoginCtrl', ['$scope', function ($scope) {
        var showLoginPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hideLoginPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeOut', 200);
        };

        var showRegisterPopup = function () {
            $('.register-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hideRegisterPopup = function () {
            $('.register-popup').velocity('stop').velocity('transition.fadeOut', 200);
        };

        var events = function () {
            $(document).on('click', '.show-login-popup', showLoginPopup);
            $(document).on('click', '.hide-login-popup', hideLoginPopup);
            $(document).on('click', '.show-register-popup', showRegisterPopup);
            $(document).on('click', '.hide-register-popup', hideRegisterPopup);
        };

        var init = function () {
            events();
        };

        init();

        //$scope.showPopup = showPopup;
    }]);
}());
