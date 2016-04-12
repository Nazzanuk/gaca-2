app.service('Flights', ($http) => {

    var query = {
        airport: "",
        flight: ""
    };

    var loadFlights = (airport) => $http.get('public/json/airports.json?').then((response) => {
        //airports = response.data;
        console.log('airports', response.data);
    });

    var externalSearch = (input) => {
        var url = typeof(input) == 'String' ? input : $(input.target).attr('search-url');
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