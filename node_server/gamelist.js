/*jshint esversion: 6 */

var Game = require('./gamemodel.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(playerName, socketID, name, maxPlayers) {
    	this.contadorID = this.contadorID+1;
    	var game = new Game(this.contadorID, playerName, name, maxPlayers, socketID, false);
    	game.player1SocketID = socketID;
    	this.games.set(game.gameID, game);
    	return game;
    }

    createGame_bot(playerName, socketID, name, maxPlayers) {
        this.contadorID = this.contadorID+1;
        var game = new Game(this.contadorID, playerName, name, maxPlayers, socketID, true);
        game.player1SocketID = socketID;
        this.games.set(game.gameID, game);
        return game;
    }


    joinGame(gameID, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	game.join(playerName, socketID);
    	return game;
    }

    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);
    	//game.players=[];
		this.games.delete(gameID);
    	return game;
    }

    getConnectedGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		for(var player of value.players) {
                if(player != null) {
                    //console.log("socket do player:"+player.socketId);
                    //console.log("socket do jogo:"+socketID);
                	if (( player.socketId == socketID)) {
                        games.push(value);
                    }
                }
            }
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
		var verifica = 0;

        for (var [key, value] of this.games) {
        	if((!value.gameStarted) && (!value.gameEnded))
        		for(var player of value.players) {
					if(player != null) {
						if (( player.socketId != socketID)) {
						}
						else{
                            verifica ++;
						}
					}
            }else{
        		verifica++;
			}
        }
        if(verifica==0)
        games.push(value);
		return games;
    }
}

module.exports = GameList;
