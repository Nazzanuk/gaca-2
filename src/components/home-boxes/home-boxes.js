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
                if (pin.content == undefined) pin.content = "";
                var infoWindow = new google.maps.InfoWindow({
                    content: "<div style='color: #000000'>" + pin.name + "</div>"
                    + "<div>" + pin.content +"</div>"
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

    app.controller('GetInTouchCtrl', ['PopupService', '$scope', '$element', '$timeout', function (PopupService, $scope, $element, $timeout) {

        $scope.contactSector = '';
        $scope.contactDepartment = '';

        var sectors = {
            'air-nav':{
                'sector-1':"Sector 1",
                'sector-2':"Sector 2",
                'sector-3':"Sector 3",
                'sector-4':"Sector 4"
            },
            'safety-org':{
                'sector-5':"Sector 5",
                'sector-6':"Sector 6",
                'sector-7':"Sector 7"
            }
        };

        var getDepartments = function () {
            return sectors[$scope.contactSector];
        };

        var init = function () {
        };

        init();

        $scope.getDepartments = getDepartments;
    }]);

    app.controller('DestinationCtrl', ['$scope', '$element', '$timeout', function ($scope, $element, $timeout) {

    }]);
}());
