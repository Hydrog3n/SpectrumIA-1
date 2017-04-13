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
        vm.draw = function (tableau) {

            var elem = document.getElementById("canvasHuman");

            if (elem.getContext) {
                var ctx = elem.getContext('2d');
                ctx.clearRect(0, 0, canvasHuman.width, canvasHuman.height);
                var x = 0;
                var y = 0;
                var j = 0;

                if(tableau){
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
                }else{      //Construction d'un tableau vierge
                    while(y < 19*15){
                        if(j == 19){
                            y+= 15;
                            j = 0;
                            x = 0;
                        }
                        if(y !== 19*15){
                            ctx.fillRect(x, y, 5, 5);
                            x += 15;
                            j++;
                        }
                    }
                }

            }
        };
    });
