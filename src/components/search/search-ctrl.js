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
