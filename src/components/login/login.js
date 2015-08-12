(function () {
    app.controller('LoginCtrl', ['$scope', 'PopupService', function ($scope, PopupService) {
        var showLoginPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeIn', 200);
            $('html').addClass('no-scroll');
        };
        var hideLoginPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeOut', 200);
            $('html').removeClass('no-scroll');
        };

        var showRegisterPopup = function () {
            $('.register-popup').velocity('stop').velocity('transition.fadeIn', 200);
            $('html').addClass('no-scroll');
        };
        var hideRegisterPopup = function () {
            $('.register-popup').velocity('stop').velocity('transition.fadeOut', 200);
            $('html').removeClass('no-scroll');
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
