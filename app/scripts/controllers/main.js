/**
 * @ngdoc function
 * @name spectrumIaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spectrumIaApp
 */
(function () {
    'use strict';

    function MainCtrl ($location, GameService, localStorageService, $timeout) {
        const vm = this;

        vm.partiesDispo = [];
        vm.partieSelected = null;
        vm.modes = [{
            name : 'IA'
        },{
            name: 'HUMAN'
        }];
        vm.startError = false;

        vm.sendIA = function () {
            localStorageService.clearAll();
            var partieChoisie = _.find(vm.nomsParties, {name: vm.partieSelected});
            localStorageService.set('PartieCourante', partieChoisie);

            if(partieChoisie.infos.numtour == 0){
                $timeout(function () {
                    //StartGame
                    GameService.startGame.get(function (resp) {
                        if(resp.msg == "game started"){
                            $location.path('/ia');
                        }
                    }, function () {
                        vm.startError = true;
                        $timeout(function () {
                            $location.path('/ia');
                            vm.startError = false;
                        }, 2000);
                    });
                },2000);
            }else{
                $location.path('/ia');
            }
        };

        vm.sendHuman = function () {
            $location.path('/newplayer');
        };

        vm.constructSelectionGames = function (parties) {
            vm.nomsParties = [];
            for(var i = 0; i < parties.length; i++){
                if(parties[i].player[0] != undefined && parties[i].player[1] != undefined
                    && parties[i].finpartie == false){
                    var nom = {
                        name: parties[i].player[0].name + "   vs   " + parties[i].player[1].name,
                        infos: parties[i]
                    };
                    vm.nomsParties.push(nom);
                }
            }
        };

        /**
         * Controller entry point
         */
        (function () {
            var i = 0;
            //Récupération de toutes les parties en cours
            GameService.games.query(function (parties) {
                if(i == 0){
                    vm.constructSelectionGames(parties);
                }
            });
        }());
    }

    angular.module('spectrumIaApp').controller('MainCtrl', MainCtrl);
}());

