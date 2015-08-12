(function () {
    app.controller('BoxCtrl', ['$scope', '$element', 'PopupService', function ($scope, $element, PopupService) {
        $scope.data = {};
        $scope.data.active = true;

        var showPopup = function () {
            PopupService.setPopupHeader($element.find('.popup-title').text());
            PopupService.setPopupContent($element.find('.popup-content').html());
            PopupService.showPopup();
        };

        var changeActive = function () {
            $scope.data.active = !$scope.data.active;
        };

        $scope.changeActive = changeActive;
        $scope.showPopup = showPopup;
    }]);
}());
