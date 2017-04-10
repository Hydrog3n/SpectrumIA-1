/**
 * @ngdoc function
 * @name spectrumIaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spectrumIaApp
 */
(function () {
    'use strict';

    function MainCtrl ($location) {
        const vm = this;

        vm.modes = [{
            name : 'IA'
        },{
            name: 'HUMAN'
        }];

        vm.selectServer = function (serv) {
            serv = 'test';
            $location.path('/ia').search({param: serv});

        };

        vm.sendHuman = function () {
            $location.path('/human');
        };

        /**
         * Controller entry point
         */
        (function () {
            //@todo récupération des serveurs disponibles
        }());
    }

    angular.module('spectrumIaApp').controller('MainCtrl', MainCtrl);
}());

