<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
                <h2>Seu nome atual: {{currentPlayer}}</h2>
                <p>Alterar nome atual <input v-model.trim="currentPlayer"></p>
                <p><em></em></p>
                <hr>
                    <h3 class="text-center">Criar jogo</h3>
                    <p>
                        <button class="btn btn-xs btn-success" v-on:click.prevent="showCreateGame">Multiplayer</button>
                        <a class="btn btn-xs btn-success" v-on:click.prevent="createSinglePlayer">Singleplayer</a>
                    </p>
                    <div v-if="singlePlayer==false">
                    <createGame v-if="createGameShow" @game-saved="gameSaved"></createGame>
                    <hr>
                        <h4>Jogos Pendentes (<a @click.prevent="loadLobby">Refresh</a>)
                    </h4>
                    <lobby :games="lobbyGames" @join-click="join"></lobby>

                    <template v-for="game in activeGames">
                        <game :game="game":currentPlayer="currentPlayer" @fazer-jogada="fazerJogada"></game>
                    </template>
                    </div>
                    <div v-else>
                        <singlePlayer></singlePlayer>
                    </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Lobby from './lobby.vue';
    import Game from './game.vue';
    import CreateGame from './createGame.vue';
    import SiglePlayer from './singleplayer.vue';

    export default {
        data: function () {
            return {
                title: 'Jogo da Memória - Multiplayer',
                currentPlayer: 'Player X',
                lobbyGames: [],
                activeGames: [],
                socketId: "",
                createGameShow: false,
                maxPlayers:0,
                click: 0,
                cellCompare: [],
                maxPlayer: '',
                name: '',
                singlePlayer:false,
                playerTurn:'',

            }
        },
        sockets: {
            connect() {
                console.log('socket connected');
                this.socketId = this.$socket.id;
            },
            discconnect() {
                console.log('socket disconnected');
                this.socketId = "";
            },
            lobby_changed() {
                this.loadLobby();
            },
            my_active_games_changed() {
                this.loadActiveGames();
            },
            my_active_games(games) {
                this.activeGames = games;
            },
            my_lobby_games(games) {
                this.lobbyGames = games;
            },
            invalid_play(errorObject) {
                if (errorObject.type == 'Invalid_Game') {
                    alert("Erro: o jogo não existe no servidor");
                } else if (errorObject.type == 'Invalid_Player') {
                    alert("Erro: Jogador não válido para este jogo");
                } else if (errorObject.type == 'Invalid_Play') {
                    alert("Erro: Mover não é válido ou não é sua vez");
                } else {
                    alert("Erro: " + errorObject.type);
                }
            },
            game_changed(game) {
                for (var lobbyGame of this.lobbyGames) {
                    if (game.gameID == lobbyGame.gameID) {
                        Object.assign(lobbyGame, game);
                        break;
                    }
                }
                for (var activeGame of this.activeGames) {
                    if (game.gameID == activeGame.gameID) {
                        Object.assign(activeGame, game);
                        break;
                    }
                }
            },
        },
        methods: {
            fazerJogada(index, gameId){
                this.$socket.emit('fazer_jogada', {index:index, socketId:gameId, currentPlayer:this.currentPlayer});
            },
            checkPair(index, gameId){
                this.$socket.emit('check-pair', {index:index, socketId:gameId, currentPlayer:this.currentPlayer});
            },
            checkPairTrue(index, gameId){
                this.$socket.emit('check-pair-true', {index:index, socketId:gameId, currentPlayer:this.currentPlayer});
            },
            createSinglePlayer(){
                console.log("Create");
                this.singlePlayer=true;
            },
            gameSaved(name, maxPlayers) {
                console.log(name);
                this.maxPlayers=maxPlayers;
                this.createGame(name);
            },
            showCreateGame() {
                this.createGameShow = true;
                this.singlePlayer=false;
            },
            loadLobby() {
                this.$socket.emit('get_my_lobby_games');
            },

            loadActiveGames() {
                this.$socket.emit('get_my_activegames');
            },
            createGame(name) {
                if (this.currentPlayer == "") {
                    alert('O Player atual está vazio - Não é possível criar um jogo');
                    return;
                }
                else {
                    this.$socket.emit('create_game', {playerName: this.currentPlayer, name, maxPlayers:this.maxPlayers});
                    this.createGameShow = false;

                }
            },
            join(game) {
                if (game.player1 == this.currentPlayer) {
                    alert('Não pode participar de um jogo porque o seu nome é o mesmo que o Jogador 1');
                    return;
                }

                this.players += 1;
                this.$socket.emit('join_game', {gameID: game.gameID, playerName: this.currentPlayer});
                this.$socket.emit('get_game', {gameID: game.gameID});
            },

            play(game, index) {
                this.$socket.emit('play', {gameID: game.gameID, index: index});
            },

            close(game) {
                this.$socket.emit('remove_game', {gameID: game.gameID});
            }

        },
        components: {
            'lobby': Lobby,
            'game': Game,
            'createGame': CreateGame,
            'singlePlayer':SiglePlayer

        },
        mounted() {
            this.loadLobby();
        }

    }
</script>

<style>

</style>