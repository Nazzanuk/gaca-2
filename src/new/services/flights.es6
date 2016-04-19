app.service('Flights', ($http, Airports, Translation) => {

    var FLIGHTS_DEFAULT_JSON = {};

    var query = {
        airport: "",
        flight: ""
    }, flights = [];

    var loadFlights = (url = 'public/json/airport-flights.json') => {
        console.log(' query', query);
        console.log(' Airports.getAirports()', Airports.getAirports());
        //if (!query.airport) query.airport = Airports.loadAirports().then(() => {query.airport = Airports.getAirports()[0].code, loadFlights()});

        flights = 'loading';
        return $http.get(`${url}airportCode=${query.airport}`).then((response) => {
            flights = response.data.FLIGHT;
            for (var i in flights) {
                flights[i].AIRLINE = flights[i].AIRLINE.trim();
                flights[i].flightNumber = flights[i].AIRLINE + flights[i].FL_NUMBER;
            }
            console.log('flights', flights);
        }, (response) => {
            console.error('error! Flights JSON missing, using defaults', response);
            flights = FLIGHTS_DEFAULT_JSON.FLIGHT;
            for (var i in flights) {
                flights[i].AIRLINE = flights[i].AIRLINE.trim();
                flights[i].flightNumber = flights[i].AIRLINE + flights[i].FL_NUMBER
            }
            console.log('flights', flights);
        })
    };

    var externalSearch = (url) => {
        console.log('externalSearch', url);
        if (!query.airport) return;
        window.location.href = `${url}airportCode=${query.airport}&flightNumber=${query.flight}`;
    };

    var getUrlParam = (name) => {
        var url = window.location.href, results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        return !results ? undefined : results[1] || undefined;
    };

    var init = () => {
        if (getUrlParam('airportCode')) query.airport = getUrlParam('airportCode');
        if (getUrlParam('flightNumber')) query.flight = getUrlParam('flightNumber');

        console.log('query', query);
    };

    init();

    return {
        getQuery: () => query,
        getFlights: () => flights,
        externalSearch,
        loadFlights
    };
});