var app = angular.module('app', []);



(function () {
    app.controller('ESearchCtrl', ['$scope', function ($scope) {

        $scope.types = ["E-Services"];
        $scope.audiences = ["All Audiences", "Pilot", "Airman", "Aircraft", "Airlines/operators", "Airports", "Training centres"];
        $scope.sectors = ["All Sectors", "Air Navigation Services", "Information Technology", "Finance & Admin", "International Organization", "Safety & Organization", "Corporate Core", "Human Resources", "Saudi Academy of Civil Aviation"]

        $scope.set = function (key, value) {
            console.log(key, value);
            $scope.filters[key] = value;
        };

        $scope.filters = {
            search: "",
            type: 0,
            audience: 0,
            sector: 0
        };

        $scope.$watch('filters', function () {
            filterResults();
        }, true);

        $(document).on("click", ".search-after", function () {
            console.log('.search-after')
            console.log($(this).prev())
            $(this).prev().click();
        });

        var results = [
            {
                title: "Form 39 OBSTACLE EVALUATION REQUEST",
                date: "Mar 2011",
                icon: "file-pdf-o",
                type: "Circulars",
                audience: "Pilot",
                sector: "Information Technology"
            },
            {
                title: "Form 8320-1 Major Repair & Or Alteration",
                date: "Jul 2009",
                icon: "file-pdf-o",
                type: "Circulars",
                audience: "Pilot",
                sector: "Information Technology"
            },
            {
                title: "Form 8130-9 Statement Of Conformity",
                date: "Jul 2009",
                icon: "file-pdf-o",
                type: "News",
                audience: "Pilot",
                sector: "Information Technology"
            },
            {
                title: "Form 8130-9 Statement Of Conformity",
                date: "Jul 2009",
                icon: "file-pdf-o",
                type: "News",
                audience: "Pilot",
                sector: "Information Technology"
            }
        ];

        var genResults = function () {
            //generates random results
            var titles = [
                [
                    "Information Required",
                    "Export",
                    "Checklist",
                    "Component",
                    "Major Alteration Status",
                    "SUPS Notification",
                    "BACS Notification",
                    "",
                    "",
                    ""
                ],
                [
                    " of ",
                    " from ",
                    " with ",
                    " regarding ",
                    " ",
                    " ",
                    " "
                ],
                [
                    "Pilot School Certification",
                    "Statement Of Conformity",
                    "OBSTACLE EVALUATION REQUEST",
                    "Operation of Scheduled Flights",
                    "Operation of Vharter Flights",
                    "Incident Notification",
                    "Incident Help",
                    "Direct Help",
                    "Battery Replacement of ELT",
                    "Wheel Maintenance of TSR",
                    "General Maintenance",
                    "Rolling ELT Update",
                    "Inspection Program"
                ]
            ];

            var types = ["E-Services"];
            var audiences = ["Pilot", "Airman", "Aircraft", "Airlines/operators", "Airports", "Training centres"];
            var sectors = ["Air Navigation Services", "Information Technology", "Finance & Admin", "International Organization", "Safety & Organization", "Corporate Core", "Human Resources", "Saudi Academy of Civil Aviation"]
            var months = ["Jan", "Feb", "Jul", "Mar", "Aug"];
            var files = ["file-pdf-o", "file-text-o", "link"];

            for (var i = 0; i < 141; i++) {
                var result = {};

                result.title = "Form "
                + _.random(1000, 9000) + " "
                + _.sample(titles[0])
                + _.sample(titles[1])
                + _.sample(titles[2]);

                result.date = _.sample(months) + " " + _.random(1990, 2015);
                result.icon = _.sample(files);
                result.type = _.sample(types);
                result.audience = _.sample(audiences);
                result.sector = _.sample(sectors);
                result.available = _.sample([true, true, true, true, true, true, true, false]);

                if (result.type == "E-Services") {
                    result.icon = "globe";
                }

                results.push(result);
            }

            results = _.shuffle(results);
        };

        genResults();

        $scope.currentResults = results;

        var filterResults = function () {
            var filters = $scope.filters;
            $scope.currentResults = _.filter(results, function (result) {
                var flag = true;

                flag = flag * (filters.search == "" || result.title.toLowerCase().indexOf(filters.search.toLowerCase()) > -1);
                flag = flag * ($scope.types[filters.type] == "All Types" || $scope.types[filters.type] == result.type);
                flag = flag * ($scope.audiences[filters.audience] == "All Audiences" || $scope.audiences[filters.audience] == result.audience);
                flag = flag * ($scope.sectors[filters.sector] == "All Sectors" || $scope.sectors[filters.sector] == result.sector);

                return flag
            });
            console.log($scope.currentResults);

            setTimeout(function () {
                $('.result').velocity('stop').velocity('transition.flipYIn', {stagger: 50});
            }, 50)
        }

    }]);
}());

(function () {
    app.controller('EServiceCtrl', ['$scope', function ($scope) {
        var showPopup = function () {
            $('.e-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hidePopup = function () {
            $('.e-popup').velocity('stop').velocity('transition.fadeOut', 200);
        };

        var events = function () {
            $(document).on('click', '.show-e-popup', showPopup);
            $(document).on('click', '.hide-e-popup', hidePopup);
        };

        var init = function () {
            events();
        };

        init();

        //$scope.showPopup = showPopup;
    }]);
}());

(function () {
    app.controller('GalleryCtrl', ['$scope', function ($scope) {
    }]);
}());
(function () {
    app.controller('HeaderCtrl', ['$scope', function ($scope) {

    }]);
}());

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

(function () {
    app.controller('LoginCtrl', ['$scope', function ($scope) {
        var showPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hidePopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeOut', 200);
        };

        var events = function () {
            $(document).on('click', '.show-login-popup', showPopup);
            $(document).on('click', '.hide-login-popup', hidePopup);
        };

        var init = function () {
            events();
        };

        init();

        //$scope.showPopup = showPopup;
    }]);
}());

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

(function () {
    app.controller('SearchCtrl', ['$scope', function ($scope) {

        $scope.types = ["All Types", "E-Services", "Regulations", "Circulars", "Public Ads", "News", "Events", "General", "Forms", "Emergency Notices", "Reports"];
        $scope.audiences = ["All Audiences", "Pilot", "Airman", "Aircraft", "Airlines/operators", "Airports", "Training centres"];
        $scope.sectors = ["All Sectors", "Air Navigation Services", "Information Technology", "Finance & Admin", "International Organization", "Safety & Organization", "Corporate Core", "Human Resources", "Saudi Academy of Civil Aviation"]

        $scope.set = function (key, value) {
            console.log(key, value);
            $scope.filters[key] = value;
        };

        $scope.filters = {
            search: "",
            type: 0,
            audience: 0,
            sector: 0
        };

        $scope.$watch('filters', function () {
            filterResults();
        }, true);

        $(document).on("click", ".search-after", function () {
            console.log('.search-after')
            console.log($(this).prev())
            $(this).prev().click();
        });

        var results = [
            {
                title: "Form 39 OBSTACLE EVALUATION REQUEST",
                date: "Mar 2011",
                icon: "file-pdf-o",
                type: "Circulars",
                audience: "Pilot",
                sector: "Information Technology"
            },
            {
                title: "Form 8320-1 Major Repair & Or Alteration",
                date: "Jul 2009",
                icon: "file-pdf-o",
                type: "Circulars",
                audience: "Pilot",
                sector: "Information Technology"
            },
            {
                title: "Form 8130-9 Statement Of Conformity",
                date: "Jul 2009",
                icon: "file-pdf-o",
                type: "News",
                audience: "Pilot",
                sector: "Information Technology"
            },
            {
                title: "Form 8130-9 Statement Of Conformity",
                date: "Jul 2009",
                icon: "file-pdf-o",
                type: "News",
                audience: "Pilot",
                sector: "Information Technology"
            }
        ];

        var genResults = function () {
            //generates random results
            var titles = [
                [
                    "Information Required",
                    "Export",
                    "Checklist",
                    "Component",
                    "Major Alteration Status",
                    "SUPS Notification",
                    "BACS Notification",
                    "",
                    "",
                    ""
                ],
                [
                    " of ",
                    " from ",
                    " with ",
                    " regarding ",
                    " ",
                    " ",
                    " "
                ],
                [
                    "Pilot School Certification",
                    "Statement Of Conformity",
                    "OBSTACLE EVALUATION REQUEST",
                    "Operation of Scheduled Flights",
                    "Operation of Vharter Flights",
                    "Incident Notification",
                    "Incident Help",
                    "Direct Help",
                    "Battery Replacement of ELT",
                    "Wheel Maintenance of TSR",
                    "General Maintenance",
                    "Rolling ELT Update",
                    "Inspection Program"
                ]
            ];

            var types = ["E-Services", "E-Services", "E-Services", "Regulations", "Circulars", "Public Ads", "News", "Events", "General", "Forms", "Emergency Notices", "Reports"];
            var audiences = ["Pilot", "Airman", "Aircraft", "Airlines/operators", "Airports", "Training centres"];
            var sectors = ["Air Navigation Services", "Information Technology", "Finance & Admin", "International Organization", "Safety & Organization", "Corporate Core", "Human Resources", "Saudi Academy of Civil Aviation"]
            var months = ["Jan", "Feb", "Jul", "Mar", "Aug"];
            var files = ["file-pdf-o", "file-text-o", "link"];

            for (var i = 0; i < 141; i++) {
                var result = {};

                result.title = "Form "
                + _.random(1000, 9000) + " "
                + _.sample(titles[0])
                + _.sample(titles[1])
                + _.sample(titles[2]);

                result.date = _.sample(months) + " " + _.random(1990, 2015);
                result.icon = _.sample(files);
                result.type = _.sample(types);
                result.audience = _.sample(audiences);
                result.sector = _.sample(sectors);
                result.available = _.sample([true, true, true, true, true, true, true, false]);

                if (result.type == "E-Services") {
                    result.icon = "globe";
                }

                results.push(result);
            }

            results = _.shuffle(results);
        };

        genResults();

        $scope.currentResults = results;

        var filterResults = function () {
            var filters = $scope.filters;
            $scope.currentResults = _.filter(results, function (result) {
                var flag = true;

                flag = flag * (filters.search == "" || result.title.toLowerCase().indexOf(filters.search.toLowerCase()) > -1);
                flag = flag * ($scope.types[filters.type] == "All Types" || $scope.types[filters.type] == result.type);
                flag = flag * ($scope.audiences[filters.audience] == "All Audiences" || $scope.audiences[filters.audience] == result.audience);
                flag = flag * ($scope.sectors[filters.sector] == "All Sectors" || $scope.sectors[filters.sector] == result.sector);

                return flag
            });
            console.log($scope.currentResults);

            setTimeout(function () {
                $('.result').velocity('stop').velocity('transition.flipYIn', {stagger: 50});
            }, 50)
        }

    }]);
}());

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
