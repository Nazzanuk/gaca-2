app.controller('ContactCtrl', function ($scope, $timeout, $http) {

    var events = function () {
        $timeout(function () {
            $('.contact-icon').addClass('active')
        },100);

        $(document).on('click', '.contact-icon', function () {
            $('.contact-box').toggleClass('active')
        });
    };

    var getContactBoxHeight = function () {
        return $('.contact-box').height() + 80;
    };

    var init = function () {
        events();
    };

    init();

    $scope.getContactBoxHeight = getContactBoxHeight;

});
