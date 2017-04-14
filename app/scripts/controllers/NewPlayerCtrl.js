/**
 * @ngdoc function
 * @name spectrumIaApp.controller:NewPlayerCtrl
 * @description
 * # NewPlayerCtrl
 * Controller of the spectrumIaApp
 */
(function () {
    'use strict';

    function NewPlayerCtrl ($location, localStorageService, GameService) {
        const vm = this;

        vm.pseudo = "";
        vm.creationError = false;

        vm.create = function () {
            localStorageService.set('NewPlayerInfos', {pseudo: vm.pseudo});
            GameService.createNewPlayer.get(function () {
                $location.path('/human');
            }, function (err) {
                vm.creationError = true;
            });
        };

        vm.cancel = function () {
            $location.path('/');
        };

        /**
         * Controller entry point
         */
        (function () {
        }());
    }

    angular.module('spectrumIaApp').controller('NewPlayerCtrl', NewPlayerCtrl);
}());

