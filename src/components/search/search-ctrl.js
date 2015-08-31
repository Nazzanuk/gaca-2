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
