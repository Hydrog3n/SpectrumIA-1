/**
 * @ngdoc function
 * @name spectrumIaApp.controller:IaCtrl
 * @description
 * # IaCtrl
 * Controller of the spectrumIaApp
 */
(function () {
    'use strict';

    function IaCtrl ($location) {
        const vm = this;

        vm.title = "IA vs IA view";

        vm.server = $location.search().param;

        /**
         * Controller entry point
         */
        (function () {

        }());
    }

    angular.module('spectrumIaApp').controller('IaCtrl', IaCtrl);
}());

