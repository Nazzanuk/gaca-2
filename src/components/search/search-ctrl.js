(function () {
    app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {

        //var ServiceUrl = "CHANGE_ME!";

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

        $scope.currentResults = results;

        var getResults = function () {
            $http.get(ServiceUrl).then(function (response) {
                $scope.currentResults = response.data;
            });
        };

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
        };

        var init = function () {
            getResults();
        };

        init();

    }]);
}());
