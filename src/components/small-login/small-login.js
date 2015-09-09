app.controller('SmallLoginCtrl', function ($scope, $timeout, $http) {

    var events = function () {
        $(document).on('click', '.show-small-login', function () {
            $('.small-login-box, .small-login-back').addClass('active');
        });

        $(document).on('click', '.small-login-back', function () {
            $('.small-login-box, .small-login-back').removeClass('active')
        });
    };

    var init = function () {
        events();
    };

    init();

    //$scope.getResults = getResults;

});
