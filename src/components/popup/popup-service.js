(function () {
    app.service('PopupService', ['$sce', function ($sce) {
        var that = this;

        var popupContent = "hello";
        var popupHeader = "hello";

        var setPopupHeader =  function (content) {
            popupHeader = content;
        };

        var getPopupHeader =  function () {
            return popupHeader;
        };

        var setPopupContent =  function (content) {
            popupContent = content;
        };

        var getPopupContent =  function () {
            return popupContent;
        };

        var showPopup = function () {
            $('html, body').addClass('no-scroll');
            $('.generic-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };

        var hidePopup = function () {
            $('html, body').removeClass('no-scroll');
            $('.generic-popup').velocity('stop').velocity('transition.fadeOut', 200);
        };

        var events = function () {
            $(document).on('click', '.show-generic-popup', showPopup);
            $(document).on('click', '.hide-generic-popup', hidePopup);
        };

        var init = function () {
            events();
        };

        init();

        that.showPopup = showPopup;
        that.hidePopup = hidePopup;
        that.getPopupContent = getPopupContent;
        that.setPopupContent = setPopupContent;
        that.setPopupHeader = setPopupHeader;
        that.getPopupHeader = getPopupHeader;
    }]);
}());
