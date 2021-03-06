/*jshint esversion: 6 */

var app = require('http').createServer();

var io = require('socket.io')(app);

var Game = require('./gamemodel.js');
var GameList = require('./gamelist.js');

app.listen(8080, function(){
	console.log('listening on *:8080');
});

// ------------------------
// Estrutura dados - server
// ------------------------

let games = new GameList();

io.on('connection', function (socket) {
    console.log('client has connected');

    socket.on('create_game', function (data){
    	let game = games.createGame(data.playerName, socket.id, data.name, data.maxPlayers, false);
		socket.join(game.gameID);
		socket.emit('my_active_games_changed');
		io.emit('lobby_changed');
    });



    socket.on('create_game_bot', function (data){
        let game = games.createGame_bot(data.playerName, socket.id, data.name, data.maxPlayers, true);
        socket.join(game.gameID);
        socket.emit('my_active_games_changed');
        io.emit('lobby_changed');
    });



    socket.on('join_game', function (data){
    	let game = games.joinGame(data.gameID, data.playerName, socket.id);
		socket.join(game.gameID);
		io.to(game.gameID).emit('my_active_games_changed');
		io.emit('lobby_changed');
    });


    socket.on('remove_game', function (data) {
        let game = games.removeGame(data.gameID, socket.id);
        socket.emit('my_active_games_changed');

    });

    socket.on('my_active_games_changed', function (data) {
        var my_games= games.getConnectedGamesOf(socket.id);
        socket.emit('my_active_games', my_games);
    });


    socket.on('play', function (data){
		let game = games.gameByID(data.gameID);
		if (game === null) {
			socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
			return;
		}

		if (game.play(numPlayer, data.index)) {
			io.to(game.gameID).emit('game_changed', game);
		} else {
			socket.emit('invalid_play', {'type': 'Invalid_Play', 'game': game});
			return;
		}
    });

    socket.on('get_game', function (data){
		let game = games.gameByID(data.gameID);
		socket.emit('game_changed', game);
    });

    socket.on('get_my_activegames', function (data){
        var my_games= games.getConnectedGamesOf(socket.id);
        socket.emit('my_active_games', my_games);
    });


    socket.on('fazer_jogada', function (data){
        let game = games.gameByID(data.socketId);
        //console.log(game);
        if (game === null) {
            socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
            return;
        }
        if(data.index != null && data.currentPlayer != null)
        {
            game.fazerJogada(data.index, data.currentPlayer);
        }

        io.to(game.gameID).emit('game_changed', game);

    });


    socket.on('check-pair', function (data){
        let game = games.gameByID(data.socketId);
        if (game === null) {
            socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
            return;
        }
        if(data.index != null && data.currentPlayer != null)
        {
            game.checkPair(data.index, data.currentPlayer);
        }

        io.to(game.gameID).emit('game_changed', game);

    });


    socket.on('check-pair-true', function (data){
        let game = games.gameByID(data.socketId);
        if (game === null) {
            socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
            return;
        }
        if(data.index != null && data.currentPlayer != null)
        {
            game.checkPairTrue(data.index, data.currentPlayer);
        }

        io.to(game.gameID).emit('game_changed', game);

    });


    socket.on('get_my_lobby_games', function (){
    	var my_games= games.getLobbyGamesOf(socket.id);
    	socket.emit('my_lobby_games', my_games);
    });

});
 