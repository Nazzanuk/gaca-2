var app = angular.module('app', []);
app.controller('CheckDestinationCtrl', function ($scope, $timeout, $http, $sce) {

    var currentDestination = 0;
    var weather = {};

    var destinations = [];

    var getCurrentDestination = function () {
        return destinations[currentDestination];
    };

    var get = function (key) {
        return function () {
            return key;
        }
    };

    var set = function (key) {
        return function (value) {
            key = value;
        }
    };

    var getWeatherText = function () {
        try {
            return weather.weather[0].description
        } catch (e) {
            return "No weather data available";
        }
    };

    var getWeatherIcon = function () {
        return "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"

    };

    var getWeatherTemp = function () {
        return Math.round(weather.main.temp - 272.15);
    };

    var setDestination = function (index) {
        currentDestination = index;
        loadWeather();
    };

    var getUrl = function () {
        return $sce.trustAsResourceUrl("http://www.flightstats.co.uk/FlightStatus/flightStatusByFlight.do?flightNumber=" + $scope.flightNumber + "&x=26&y=10");
    };

var loadWeather = function () {
    weather = {};
    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
    var dest = getCurrentDestination();
    return $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + dest.coords[0] + "&lon=" + dest.coords[1]).then(function (response) {
        console.log(dest, response.data);
        weather = response.data;
    });
};

    var events = function () {

    };

    var init = function () {
        events();
        if (initialDestinations != undefined) {
            destinations = initialDestinations;
            loadWeather();
        }
    };

    init();

    $scope.getDestination = get(currentDestination);
    $scope.getCurrentDestination = getCurrentDestination;
    $scope.getDestinations = get(destinations);
    $scope.getWeather = get(weather);
    $scope.setDestination = setDestination;
    $scope.getWeatherText = getWeatherText;
    $scope.getWeatherIcon = getWeatherIcon;
    $scope.getWeatherTemp = getWeatherTemp;
    $scope.getUrl = getUrl;

});

app.controller('ContactCtrl', function ($scope, $timeout, $http) {

    var events = function () {
        $timeout(function () {
            $('.contact-icon').addClass('active')
        },100);

        $(document).on('click', '.contact-icon', function () {
            $('.contact-box').toggleClass('active')
        });
    };

    var getContactBoxHeight = function () {
        return $('.contact-box').height() + 80;
    };

    var init = function () {
        events();
    };

    init();

    $scope.getContactBoxHeight = getContactBoxHeight;

});



(function () {
    app.controller('ECatalogueCtrl', ['$scope', '$element', '$interval', function ($scope, $element, $interval) {
        var eServices = [];

        var genEServices = function () {
            for (var i = 1;i <=100; i++) {
                eServices.push({
                    id:  _.random(1000, 9999),
                    title:_.sample(['Export of', 'Statement of', 'Regarding', 'Information Required']) + " of " + " "
                        + _.sample([
                            'Wheel Maintenance of TSR',
                            'Inspection Program',
                            'ELT Update',
                            'Incident Help',
                            'Charter Flights',
                            'General Maintenance',
                            'Scheduled Flights'
                        ]),
                    popularity: _.random(0, 10),
                    date:_.random(2000, 2015) * 10000 + _.random(1, 1) * 100 +  _.random(1, 28),
                    audience:_.sample(['Pilot', 'Airman', 'Aircraft', 'Airlines', 'Airports', 'Training Centres']),
                    sector:_.sample(["Air Navigation Services", 'Information Technology', 'Finance & Admin', 'International Organisation'])
                });
            }

        };

        var getEServices = function (filter, sort) {
            //console.log(filter, sort);
            var filteredList = _.where(eServices, filter, sort);
            var sortedList = _.sortBy(filteredList, sort);
            return _.first(sortedList, 3);
        };

        var init = function () {
            genEServices();
        };

        init();

        $scope.getEServices = getEServices;

    }]);
}());

(function () {
    app.controller('EServiceCtrl', ['$scope', function ($scope) {
        var showPopup = function () {
            $('html, body').addClass('no-scroll');
            $('.e-popup').velocity('stop').velocity('transition.fadeIn', 200);
        };
        var hidePopup = function () {
            $('html, body').removeClass('no-scroll');
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
    app.controller('GalleryCtrl', ['$scope', function ($scope) {
    }]);
}());
(function () {
    app.controller('BoxCtrl', ['$scope', '$element', 'PopupService', '$timeout', function ($scope, $element, PopupService, $timeout) {
        $scope.data = {};
        $scope.data.active = true;

        var showPopup = function () {
            PopupService.setPopupHeader($element.find('.popup-title').text());
            PopupService.setPopupContent($element.find('.popup-content').html());
            PopupService.showPopup();
        };

        var changeActive = function () {
            $scope.data.active = !$scope.data.active;

            console.log('zzz');
            $timeout(function () {
                google.maps.event.trigger(map, 'resize');
            }, 50);
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

(function () {
    app.controller('HeaderCtrl', ['$scope', function ($scope) {

        var events = function () {
            $(document).on('focus mouseover', '.search-box input', function () {
                $('.search-box').css({'width': '230px'});
            });

            $(document).on('blur mouseleave', '.search-box input', function () {
                $('.search-box').css({'width': ''});
            });

            $(document).on('mouseover', '.sub-item', function () {
                if (!$(this).hasClass('active')) {
                    $('.sub-item').removeClass('active');
                    $('.sub-menu').velocity('stop');
                    $('.sub-menu').hide();
                    $(this).addClass('active');
                    $(this).find('.sub-menu').velocity('stop').velocity('transition.slideDownIn', 300);
                    $(this).find('[class^="col-"]').velocity('stop').velocity('transition.slideLeftIn', {
                        stagger: 100,
                        duration: 600
                    });
                }
            });

            $(document).on('mouseleave', '.sub-item', function () {
                var that = this;
                if ($(this).hasClass('active')) {
                    $(that).removeClass('active');
                    $(this).find('.sub-menu').velocity('stop').velocity('transition.slideUpOut', {delay:500,duration:300});
                }
            });

            $(document).on('click', '.hide-alert', function () {
                $('.hide-alert').velocity('stop').hide();
            });
        };

        var init = function () {
            events();
        };

        init();

    }]);
}());

(function () {
    app.controller('LoginCtrl', ['$scope', 'PopupService', function ($scope, PopupService) {
        var showLoginPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeIn', 200);
            $('html').addClass('no-scroll');
        };
        var hideLoginPopup = function () {
            $('.login-popup').velocity('stop').velocity('transition.fadeOut', 200);
            $('html').removeClass('no-scroll');
        };

        var showRegisterPopup = function () {
            $('.register-popup').velocity('stop').velocity('transition.fadeIn', 200);
            $('html').addClass('no-scroll');
        };
        var hideRegisterPopup = function () {
            $('.register-popup').velocity('stop').velocity('transition.fadeOut', 200);
            $('html').removeClass('no-scroll');
        };

        var events = function () {
            $(document).on('click', '.show-login-popup', showLoginPopup);
            $(document).on('click', '.hide-login-popup', hideLoginPopup);
            $(document).on('click', '.show-register-popup', showRegisterPopup);
            $(document).on('click', '.hide-register-popup', hideRegisterPopup);
        };

        var init = function () {
            events();
        };

        init();

        //$scope.showPopup = showPopup;
    }]);
}());

app.controller('MenuCtrl', ['$scope', function ($scope) {

    var showing = false;

    var toggleSidebar = function () {
        if (showing) hideSidebar();
        else showSidebar();
    };

    var showSidebar = function () {
        $('.content-area, .menu').addClass('active');
        $('.menu-overlay').addClass('active');
        showing = true;
    };

    var hideSidebar = function () {
        $('.content-area, .menu').removeClass('active');
        $('.menu-overlay').removeClass('active');
        showing = false;
    };

    var events = function () {
        $(document).on('click', '.header-menu', toggleSidebar);
        $(document).on('click', '.menu-overlay, .header-close', hideSidebar);
    };

    var init = function () {
        events();
    };

    init();

}]);

app.controller('MenuItemCtrl', ['$scope', function ($scope) {

    $scope.active;

    $scope.toggleActive = function () {
        $scope.active = !$scope.active;
    };

}]);

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


(function () {
    app.controller('SearchCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

        //var ServiceUrl = "CHANGE_ME!";

        var results;
        var loading = false;
        $scope.types = types;
        $scope.audiences = audiences;
        $scope.sectors = sectors;

        $scope.set = function (key, value) {
            console.log(key, value);
            $scope.filters[key] = value;
        };

        $scope.search = "";

        $scope.filters = {
            type: 0,
            audience: 0,
            sector: 0
        };

        $scope.$watch('filters', function () {
            filterResults();
        }, true);

        $(document).on("click", ".search-after", function () {
            console.log('.search-after');
            console.log($(this).prev());
            $(this).prev().click();
        });

        $(document).on("click", "#searchBtn", function () {
            getResults($('#searchInput').val());
        });

        var isLoading = function () {
            return loading;
        };

        var getResults = function (searchTerm) {
            $scope.currentResults = [];
            loading = true;
            if (searchTerm != undefined) {
                searchTerm = '&search=' + searchTerm
            } else {
                searchTerm = '';
            }
            //$timeout(function () {
            $http.get(SEARCH_SERVICE_URL + searchTerm).then(function (response) {
                loading = false;
                results = response.data.results;
                filterResults();
                console.log(results)
            });
            //}, 2000);

        };

        var filterResults = function () {
            var filters = $scope.filters;
            $scope.currentResults = _.filter(results, function (result) {
                var flag = true;

                //flag = flag * (filters.search == "" || result.title.toLowerCase().indexOf(filters.search.toLowerCase()) > -1);
                flag = flag * ($scope.types[filters.type] == "All Types" || $scope.types[filters.type] == result.type);
                flag = flag * ($scope.audiences[filters.audience] == "All Audiences" || $scope.audiences[filters.audience] == result.audience);
                flag = flag * ($scope.sectors[filters.sector] == "All Sectors" || $scope.sectors[filters.sector] == result.sector);

                return flag;
            });
            console.log($scope.currentResults);

            setTimeout(function () {
                $('.result').velocity('stop').velocity('transition.flipYIn', {stagger: 50});
            }, 50)
        };

        var init = function () {
            if (window.SEARCH_SERVICE_URL == undefined) {
                window.SEARCH_SERVICE_URL = "http://localhost:3000/gaca";
            }
            getResults($('#searchInput').val());
        };

        init();

        $scope.getResults = getResults;
        $scope.isLoading = isLoading;

    }]);
}());

(function () {
    app.controller('SliderCtrl', ['$scope', '$element', '$interval', function ($scope, $element, $timeout) {

        var items, $firstSliderItem, amountVisible, timeout;
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

            $timeout.cancel(timeout);
            timeout = $timeout(function () {
                setTop(nextTop());
            }, 7000);
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

        var nextTop = function () {
            var next = topIndex + 1;
            if (next >= topLength) next = 0;
            return next;
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

            timeout = $timeout(function () {
                setTop(nextTop());
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

app.controller('SmallLoginCtrl', function ($scope, $timeout, $http) {

    var events = function () {
        $(document).on('click', '.show-small-login', function () {
            $('.small-login-box, .small-login-back').addClass('active');
        });

        $(document).on('click', '.small-login-back, .close-login-box', function () {
            $('.small-login-box, .small-login-back').removeClass('active')
        });
    };

    var init = function () {
        events();
    };

    init();

    //$scope.getResults = getResults;

});
