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

        vm.player1 = {};
        vm.player2 = {};

        //Récupère les infos de la partie
        vm.getInfos = function () {
            GameService.infosGameState.get(function (infos) {
                vm.draw(infos.tableau);
                console.log(infos)
                vm.infos = infos;
                vm.player1 = _.find(infos.player, {numerojoueur: 1});
                vm.player2 = _.find(infos.player, {numerojoueur: 2});
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

            vm.tableau = tableau;
            var elem = document.getElementById("canvas");

            if (elem.getContext) {
                var ctx = elem.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var x = 0;
                var y = 0;
                var j = 0;

                for(var i = 0; i < vm.tableau.length; i++){
                    for (var position in vm.tableau[i]) {
                        if(j == 19){
                            y+= 15;
                            j = 0;
                            x = 0;
                        }
                        if(vm.tableau[i][position] == 0){      //pas de boules
                            ctx.fillRect(x, y, 5, 5);
                        }else if(vm.tableau[i][position] == 1){    //boules blanches joueur 1
                            ctx.beginPath();
                            ctx.arc(x+3,y+3,5,0,2*Math.PI);
                            ctx.stroke();
                        }else if(vm.tableau[i][position] == 2){    //boules noires joueur 2
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
        $('#canvas').click(function(e) {
            var x = e.offsetX,
                y = e.offsetY;

            console.log(x)
            console.log(y)
            /*for(var i=0;i<vm.tableau.length;i++) { // check whether:
                if(x > vm.tableau[i][5]            // mouse x between x and x + width
                    && x < vm.tableau[i][5] + vm.tableau[i][5]
                    && y > vm.tableau[i][5]            // mouse y between y and y + height
                    && y < vm.tableau[i][5] + vm.tableau[i][5]) {
                    alert('Rectangle ' + i + ' clicked');
                }
            }*/
        });

       var counterGame = function () {
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

               vm.minutesGame = m;
               vm.secondsGame = s;
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

