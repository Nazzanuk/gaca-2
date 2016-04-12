app.service('Flights', ($http, $location) => {

    var query = {
        airport: "",
        flight: ""
    };

    var loadFlights = (airport) => $http.get('public/json/airports.json?').then((response) => {
        airports = response.data;
        geocode(0);
        console.log('airports', response.data);
    });

    var init = () => {
        console.log('flight', getUrlParam('airport'));
        console.log('flight', getUrlParam('flight'));
    };

    init();

    return {
        getQuery: () => query
    };
});

var getUrlParam = (name) => {
    var url = window.location.href, results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return !results ? undefined : results[1] || undefined;
};