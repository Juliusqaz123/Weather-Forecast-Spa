// SERVICES
weatherApp.service('cityService', function() {

    this.city = "New York, NY";

});

weatherApp.service('weatherService', ['$resource', function($resource){

    this.GetWeather = function(city, days) {
       var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

         return weatherAPI.get({q: city, cnt: days, APPID:'3b6eec304a4783004c99e802891b6799'});
    };
}]);
