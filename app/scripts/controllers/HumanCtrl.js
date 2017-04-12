'use strict';

/**
 * @ngdoc function
 * @name spectrumIaApp.controller:HumanCtrl
 * @description
 * # HumanCtrl
 * Controller of the spectrumIaApp
 */
angular.module('spectrumIaApp')
    .controller('HumanCtrl', function (GameService) {
        const vm = this;

        //Construction du plateau de jeu
        vm.draw = function () {

            var elem = document.getElementById("canvas");

            if (elem.getContext) {
                var ctx = elem.getContext('2d');
                var x = 0;
                var y = 0;
                var j = 0;

                while(y < 19*15){
                    if(j == 19){
                        y+= 15;
                        j = 0;
                        x = 0;
                    }
                    if(y !== 19*15){
                        console.log("X: ", x , "-- Y: ", y);
                        ctx.strokeRect(x, y, 15, 15);
                        x += 15;
                        j++;
                    }
                }
                ctx.fillRect(75,125,15,15).fillStyle="#FF0000";

            }
        };
    });
