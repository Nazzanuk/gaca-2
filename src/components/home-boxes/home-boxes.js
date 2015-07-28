(function () {
    app.controller('BoxCtrl', ['$scope', function ($scope) {
        $scope.data = {};
        $scope.data.active = true;

        var changeActive = function () {
            $scope.data.active = !$scope.data.active;
        };

        $scope.changeActive = changeActive;
    }]);
}());
