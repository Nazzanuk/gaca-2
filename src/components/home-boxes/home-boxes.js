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

    app.controller('MapCtrl', ['PopupService', '$scope', '$element', '$timeout', function (PopupService, $scope, $element, $timeout) {

        var markers = [];
        var infoWindows = [];

        window.initMap = function () {
            var mapCenter = {lat: 24.410777, lng: 44.856970};

            var map = new google.maps.Map($element[0], {
                zoom: 4,
                center: mapCenter
            });

            _.each(pins, function (pin) {
                var infoWindow = new google.maps.InfoWindow({
                    content: "<div style='color: #000000'>" + pin.name + "</div>"
                });
                infoWindows.push(infoWindow);

                var marker = new google.maps.Marker({
                    position: pin.position,
                    map: map,
                    title: pin.name
                });

                marker.addListener('click', function() {
                    _.each(infoWindows, function (infoWindow) {
                        infoWindow.close();
                    });
                    infoWindow.open(map, marker);
                });

                markers.push(marker);

            });


        };

        var init = function () {
            $timeout(function () {
                initMap();
            }, 500);
        };

        init();
    }]);
}());
