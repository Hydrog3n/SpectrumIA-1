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

        vm.create = function () {
            console.log(vm.pseudo)
            localStorageService.set('NewPlayerInfos', {pseudo: vm.pseudo});
            GameService.createNewPlayer.get(function () {
                console.log('joueur créé')
            }, function (err) {
                console.log(err)
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

