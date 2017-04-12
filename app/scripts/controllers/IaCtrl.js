/**
 * @ngdoc function
 * @name spectrumIaApp.controller:IaCtrl
 * @description
 * # IaCtrl
 * Controller of the spectrumIaApp
 */
(function () {
    'use strict';

    function IaCtrl (GameService, localStorageService) {
        const vm = this;

        //Récupère les infos de la partie
        vm.getInfos = function () {
            GameService.infosGameState.get(function (infos) {
                vm.draw(infos.tableau);
                console.log(infos)
            });
        };

        //Lance le timer pour les données
        vm.launchTimer = function () {
            setInterval(function () {
                vm.getInfos();
            }, 3000);
        };

        //Construction du plateau de jeu
        vm.draw = function (tableau) {

            var elem = document.getElementById("canvas");

            if (elem.getContext) {
                var ctx = elem.getContext('2d');
                var x = 0;
                var y = 0;
                var j = 0;

                for(var i = 0; i < tableau.length; i++){
                    for (var position in tableau[i]) {
                        if(j == 19){
                            y+= 15;
                            j = 0;
                            x = 0;
                        }
                        if(tableau[i][position] == 0){      //pas de boules
                            ctx.fillRect(x, y, 5, 5);
                        }else if(tableau[i][position] == 1){    //boules blanches joueur 1
                            ctx.beginPath();
                            ctx.arc(x+3,y+3,5,0,2*Math.PI);
                            ctx.stroke();
                        }else if(tableau[i][position] == 2){    //boules noires joueur 2
                            ctx.beginPath();
                            ctx.arc(x+3,y+3,5,0,2*Math.PI);
                            ctx.fill();
                        }
                        x += 15;
                        j++;

                    }
                }
            }
        };

       var counterGame = function (partie) {
           var startDateTime = new Date(vm.partie.infos.createdAt);
           var startStamp = startDateTime.getTime();
           var newDate = new Date();
           var newStamp = newDate.getTime();
           function updateClock() {
               newDate = new Date();
               newStamp = newDate.getTime();
               var diff = Math.round((newStamp-startStamp)/1000);

               var d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
               diff = diff-(d*24*60*60);
               var h = Math.floor(diff/(60*60));
               diff = diff-(h*60*60);
               var m = Math.floor(diff/(60));
               diff = diff-(m*60);
               var s = diff;

               document.getElementById("time-elapsed").innerHTML = "Temps écoulé depuis le début de la partie: "+m+" minute(s), "+s+" second(s)";
           }

           setInterval(updateClock, 1000);
       };

        /**
         * Controller entry point
         */
        (function () {
            vm.partie = localStorageService.get('PartieCourante');
            counterGame(vm.partie);
            vm.getInfos();
            vm.launchTimer();
        }());
    }

    angular.module('spectrumIaApp').controller('IaCtrl', IaCtrl);
}());

