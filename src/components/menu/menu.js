app.controller('MenuCtrl', ['$scope', function ($scope) {

    var showing = false;

    var toggleSidebar = function () {
        if (showing) hideSidebar();
        else showSidebar();
    };

    var showSidebar = function () {
        $('.content-area, .menu').addClass('active');
        $('.menu-overlay').addClass('active');
        showing = true;
    };

    var hideSidebar = function () {
        $('.content-area, .menu').removeClass('active');
        $('.menu-overlay').removeClass('active');
        showing = false;
    };

    var events = function () {
        $(document).on('click', '.header-menu', toggleSidebar);
        $(document).on('click', '.menu-overlay, .header-close', hideSidebar);
    };

    var init = function () {
        events();
    };

    init();

}]);

app.controller('MenuItemCtrl', ['$scope', function ($scope) {

    $scope.active;

    $scope.toggleActive = function () {
        $scope.active = !$scope.active;
    };

}]);
