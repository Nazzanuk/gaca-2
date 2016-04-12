app.service('Airports', ($http) => {
    var airports = [], OPEN_WEATHER_KEY = '44756d87096e5a658578891c2abcca4e';

    var getWeather = (index) => $http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${airports[index].coords.lat}&lon=${airports[index].coords.lng}&APPID=${OPEN_WEATHER_KEY}`).then((response) => {
        airports[index].weather = response.data;
        console.log('weather', response.data);
        console.log('airports', airports);
    });

    var geocode = (index) => {
        if (airports[index].coords != undefined) return;
        console.log('index', index);
        $http.get(`http://maps.google.com/maps/api/geocode/json?address=${airports[index].name}%20airport&sensor=false`).then((response) => {

            airports[index].coords = response.data.results[0].geometry.location;
            getWeather(index);
            console.log('coords', airports[index]);
        });
    };

    var loadAirports = (airport) => $http.get('public/json/airports.json').then((response) => {
        airports = response.data;
        geocode(0);
        console.log('airports', response.data);
    });

    var init = () => {
        loadAirports();
    };

    init();

    return {
        getAirports: () => airports,
        geocode
    };
});