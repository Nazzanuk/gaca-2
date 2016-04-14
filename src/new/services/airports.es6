app.service('Airports', ($http, Translation) => {
    var airports = [],
        weatherUrl = "",
        OPEN_WEATHER_KEY = '44756d87096e5a658578891c2abcca4e';

    var setWeatherUrl = (string) => weatherUrl = string;

    var getWeather = (index) => $http.get(`${weatherUrl}&lat=${airports[index].coords.lat}&lon=${airports[index].coords.lon}`).then((response) => {
        airports[index].weather = response.data;
        console.log('weather', response.data);
        console.log('airports', airports);
    });

    //return $http.get(WEATHER_SERVICE_URL + "&lat=" + dest.coords[0] + "&lon=" + dest.coords[1] + "&locale=" + CURRENT_LOCALE).then(function (response) {
    //    console.log(dest, response.data);
    //    weather = response.data;
    //});

    var geocode = (index) => {
        if (airports[index].coords) getWeather(index);
        else console.log('no coords', airports);
    };

    var loadAirports = (url = 'public/json/airports.json') => $http.get(url).then((response) => {
        airports = response.data;
        geocode(0);
        console.log('airports', airports);
    }, (response) => {
        console.error('error! Airports JSON missing, using defaults', response);
        airports = AIRPORTS_DEFAULT_JSON;
    });

    var init = () => {
        //loadAirports();
    };

    init();

    return {
        getAirports: () => airports,
        setWeatherUrl,
        loadAirports,
        geocode
    };
});

var AIRPORTS_DEFAULT_JSON = [
    {
        "name": "London Heathrow",
        "arabicName": "مطار لندن - هيثرو",
        "code": "LHW",
        "coords": {
            "lat":51.47,
            "lon": -0.45
        }
    },
    {
        "name": "London Gatwick",
        "arabicName": "جاتويك",
        "code": "LGW",
        "coords": {
            "lat":51.17,
            "lon": -0.18
        }
    },
    {
        "name": "Jeddah",
        "arabicName": "جدة",
        "code": "JED"
    }
];