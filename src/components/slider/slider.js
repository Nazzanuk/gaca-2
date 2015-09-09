(function () {
    app.controller('SliderCtrl', ['$scope', '$element', '$interval', function ($scope, $element, $interval) {

        var items, $firstSliderItem, amountVisible, interval;
        $scope.dots, $scope.dotIndex;
        $scope.data = {};
        $scope.data.active = true;

        var topIndex = 0;
        var topLength = 3;

        var setTop = function (index) {
            if (topIndex == index) return;
            $('.banner-image').eq(topIndex).velocity('stop').velocity('transition.fadeOut');
            $('.banner-image').eq(index).velocity('stop').velocity('transition.fadeIn');
            topIndex = index;
        };

        var getTop = function () {
            return topIndex;
        };

        var getTops = function () {
            return new Array(topLength);
        };

        var isTop = function (index) {
            return topIndex == index;
        };

        var changeActive = function () {
            $scope.data.active = !$scope.data.active;
        };

        var isActive = function () {
            return $scope.data.active;
        };

        var isFirst = function () {
            return $scope.dotIndex == 0;
        };

        var isLast = function () {
            return $scope.dotIndex >= ($scope.dots - 1);
        };

        var nextDot = function () {
            var next = $scope.dotIndex + 1;
            if (next >= $scope.dots) next = 0;
            return next;
        };

        var prevDot = function () {
            var prev = $scope.dotIndex - 1;
            if (prev <= -1) prev = $scope.dots -1;
            return prev;
        };

        var setPosition = function (index) {
            $('.slider-holder').velocity('stop').velocity({'translateX': (index * -100) + '%'}, 600);
            $scope.dotIndex = index;

            $interval.cancel(interval);
            interval = $interval(function () {
                //setPosition(nextDot());
            }, 7000);
        };

        var nextPosition = function() {
            setPosition(nextDot())
        };

        var prevPosition = function() {
            setPosition(prevDot())
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
                //setPosition(nextDot());
            }, 7000);
        };

        init();

        $(window).resize(function () {
            initialise();
            $scope.$apply();
        });

        $scope.setPosition = setPosition;
        $scope.getDots = getDots;
        $scope.changeActive = changeActive;
        $scope.isActive = isActive;
        $scope.nextPosition = nextPosition;
        $scope.prevPosition = prevPosition;
        $scope.isFirst = isFirst;
        $scope.isLast = isLast;
        $scope.setTop = setTop;
        $scope.getTop = getTop;
        $scope.isTop = isTop;
        $scope.getTops = getTops;

    }]);
}());
