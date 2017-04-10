/**
 * @ngdoc function
 * @name spectrumIaApp.controller:ResultCtrl
 * @description
 * # ResultCtrl
 * Controller of the spectrumIaApp
 */
(function () {
    'use strict';

    function ResultCtrl ($location) {
        const vm = this;

        vm.title = "Result view";
        vm.result = $location.search().param;



        /**
         * Controller entry point
         */
        (function () {

        }());
    }

    angular.module('spectrumIaApp').controller('ResultCtrl', ResultCtrl);
}());

