(function() {
    'use strict';

    function GameService(Config, $resource, localStorageService) {

        var apiPath = Config;
        var partieCourante = {
            infos: ''
        };
        var newPlayer = '';
        if(localStorageService.get('PartieCourante')){
            partieCourante = localStorageService.get('PartieCourante');
        }
        if(localStorageService.get('NewPlayerInfos')){
            newPlayer = localStorageService.get('NewPlayerInfos');
        }

        //Récupération des informations de la partie en cours
        var infosGameState = $resource(apiPath +'/info/' + partieCourante.infos.id, {}, {
            get: {
                method: "GET"
            }
        });

        //Récupérations de toutes les parties
        var games = $resource(apiPath + '/parties', {}, {
            query: {
                method: "GET",
                isArray: true
            }
        });

        //Démarrage partie
        var startGame = $resource(apiPath + '/start/' + partieCourante.infos.id, {}, {
            get: {
                method: "GET"
            }
        });

        //Création d'un joueur humain
        var createNewPlayer = $resource(apiPath + '/connect/' + newPlayer.pseudo, {}, {
            get: {
                method: "GET"
            }
        });

        return {
            infosGameState: infosGameState,
            games: games,
            startGame: startGame,
            createNewPlayer: createNewPlayer
        };
    }
    angular.module('spectrumIaApp').factory('GameService', GameService);
}());
