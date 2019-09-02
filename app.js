// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })

        .when('/forecast/', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        });

});
//Services
weatherApp.service('cityService', function () {
    'use strict';
});


// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    'use strict';
    $scope.city = 'New York, NY';
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource','$routeParams', 'cityService',  function ($scope, $resource, $routeParams, cityService) {
    'use strict';
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/weather?q=London,uk&&APPID=3b6eec304a4783004c99e802891b6799', {callback:           "JSON_CALLBACK"}, {get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2});

    $scope.convertToCelsius = function(degK){
        return Math.round(degK - 273.15);
    }

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);
