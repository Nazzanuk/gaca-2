(function () {
    app.controller('SliderCtrl', ['$scope', '$element', '$interval', function ($scope, $element, $interval) {

        var items, $firstSliderItem, amountVisible, interval;
        $scope.dots, $scope.dotIndex;

        var nextDot = function () {
            var next = $scope.dotIndex + 1;
            if (next >= $scope.dots) next = 0;
            return next;

        };

        var setPosition = function (index) {
            $('.slider-holder').velocity({'translateX': (index * -100) + '%'}, 600);
            $('.banner-image').eq($scope.dotIndex).velocity('stop').velocity('transition.fadeOut');
            $('.banner-image').eq(index).velocity('stop').velocity('transition.fadeIn');
            $scope.dotIndex = index;

            $interval.cancel(interval);
            interval = $interval(function () {
                setPosition(nextDot());
            }, 7000);
        };

        var getDots = function () {
            return _.range(0, $scope.dots);
        };

        var initialise = function () {
            items = $element.find('.slider-item').length;
            $firstSliderItem = $element.find('.slider-item').eq(0);
            amountVisible = $(window).width() > 767 ? 3 : 1;
            $scope.dots = Math.ceil(items / amountVisible);
            $scope.dotIndex = 0;
        };

        var init = function () {
            initialise();

            $interval(function () {
                setPosition(nextDot());
            }, 7000);
        };

        init();

        $(window).resize(function () {
            initialise();
            $scope.$apply();
        });

        $scope.setPosition = setPosition;
        $scope.getDots = getDots;

    }]);
}());
