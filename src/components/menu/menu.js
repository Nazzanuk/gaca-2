(function () {
    app.controller('MenuCtrl', ['$scope', function ($scope) {

        var showing = false;

        var toggleidebar = function () {
            if (showing) hideSidebar()
            else showSidebar();
        };

        var showSidebar = function () {
            $('.content-area, .menu').velocity('stop').velocity({'margin-left': '200px'}, 300);
            $('.menu-overlay').show();
            showing = true;
        };

        var hideSidebar = function () {
            $('.content-area, .menu').velocity('stop').velocity({'margin-left': '0'}, 300);
            //$('.header').velocity('stop').velocity({'left': '0'}, 300);
            $('.menu-overlay').hide();
            showing = false;
        };

        var events = function () {
            $(document).on('click', '.header-menu', toggleidebar);
            $(document).on('click', '.menu-overlay, .header-close', hideSidebar);
        };

        var init = function () {
            events();
        };

        init();

    }]);
}());
