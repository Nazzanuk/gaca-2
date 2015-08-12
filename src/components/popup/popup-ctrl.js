(function () {
    app.controller('PopupCtrl', ['$scope', 'PopupService', '$sce', function ($scope, PopupService, $sce) {

        var getPopupContent =  function () {
            return $sce.trustAsHtml(PopupService.getPopupContent());
        };

        var events = function () {
        };

        var init = function () {
            events();
        };

        init();

        $scope.showPopup = PopupService.showPopup;
        $scope.hidePopup = PopupService.hidePopup;
        $scope.getPopupContent = getPopupContent;
        $scope.getPopupHeader = PopupService.getPopupHeader;
    }]);
}());
