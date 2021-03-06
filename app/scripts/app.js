'use strict';

/**
 * @ngdoc overview
 * @name spectrumIaApp
 * @description
 * # spectrumIaApp
 *
 * Main module of the application.
 */
angular
    .module('spectrumIaApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/ia', {
                templateUrl: 'views/ia.html',
                controller: 'IaCtrl',
                controllerAs: 'ia'
            })
            .when('/human', {
                templateUrl: 'views/human.html',
                controller: 'HumanCtrl',
                controllerAs: 'human'
            })
            .when('/result', {
                templateUrl: 'views/result.html',
                controller: 'ResultCtrl',
                controllerAs: 'result'
            })
            .when('/newplayer', {
                templateUrl: 'views/newPlayer.html',
                controller: 'NewPlayerCtrl',
                controllerAs: 'newplayer'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('_', window._)
    .run(function ($rootScope) {
        $rootScope._ = window._;
    })
    .config(function (ConfigProvider) {
        ConfigProvider.useConfig('https://spectrum.loicvaille.ovh');
    });

