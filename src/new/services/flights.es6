app.service('Flights', ($http) => {

    var query = {
        airport: "",
        flight: ""
    }, flights = [];

    var loadFlights = (airport) => $http.get('public/json/airports.json?').then((response) => {
        flights = response.data;
        console.log('airports', response.data);
    });

    var externalSearch = (url) => {
        console.log('externalSearch', url);
        if (!query.airport) return;
        window.location.href = `${url}?airport=${query.airport}&flight=${query.flight}`;
    };

    var init = () => {

    };

    init();

    return {
        getQuery: () => query,
        externalSearch
    };
});

var getUrlParam = (name) => {
    var url = window.location.href, results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return !results ? undefined : results[1] || undefined;
};