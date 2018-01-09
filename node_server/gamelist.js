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
    	var game = new Game(this.contadorID, playerName, name, maxPlayers);
    	game.player1SocketID = socketID;
    	this.games.set(game.gameID, game);
    	return game;
    }

    joinGame(gameID, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	game.join(playerName);
    	game.player2SocketID = socketID;
    	return game;
    }

    removeGame(gameID, socketID) {
        console.log("gameID: " + gameID + " - socketID: " +socketID);
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}

    	for(var player of game.players ){
    		console.log("player: " + player);
		}

    	this.games.delete(gameID);

    	return game;
    }

    getConnectedGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((value.player1SocketID == socketID) || (value.player2SocketID == socketID)) {
    			games.push(value);
    		}
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((!value.gameStarted) && (!value.gameEnded))  {
    			if ((value.player1SocketID != socketID) && (value.player2SocketID != socketID)) {
    				games.push(value);
    			}
    		}
		}
		return games;
    }
}

module.exports = GameList;
