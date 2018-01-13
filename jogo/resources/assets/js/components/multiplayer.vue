<template>

    <div>
        <div v-if="loggedUser">
            <login :user="loggedUser" @login="login"></login>
        </div>
        <div v-else>
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

                        <createGame v-if="createGameShow" @game-saved="gameSaved"></createGame>
                        <hr>
                            <h4>Jogos Pendentes (<a @click.prevent="loadLobby">Refresh</a>)
                        </h4>
                        <lobby :games="lobbyGames" @join-click="join"></lobby>

                        <template v-for="game in activeGames">
                            <game :game="game":currentPlayer="currentPlayer" @fazer-jogada="fazerJogada"></game>
                        </template>


            </div>
    </div>
</div>
</template>

<script type="text/javascript">
    import Lobby from './lobby.vue';
    import Game from './game.vue';
    import CreateGame from './createGame.vue';
    import SiglePlayer from './singleplayer.vue';
    import Login from './login.vue';

    export default {
        data: function () {
            return {
                title: 'Jogo da Memória - Multiplayer',
                loggedUser:null,
                currentPlayer: 'Player X',
                lobbyGames: [],
                activeGames: [],
                socketId: "",
                createGameShow: false,
                maxPlayers:1,
                click: 0,
                cellCompare: [],
                maxPlayer: '',
                name: '',
                singlePlayer:false,
                playerTurn:'',
                singleGame:[],

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
            login(token)
            {
                if(token!=null)
                {const AuthStr = 'Bearer '.concat(token);
                    console.log(AuthStr);
                    axios.get('http://dad.api/api/user', { headers: { Authorization: AuthStr } })
                    .then(
                    response=>{
                    this.loggedUser=response.data;

                    console.log(this.loggedUser.name);
                    this.currentUser=this.loggedUser.name;
                }

                    );}
            },

            getUserLigado: function(token){


            },
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
                    if (this.currentPlayer == "") {
                    alert('O Player atual está vazio - Não é possível criar um jogo');
                    return;
                }
                    else {
                    this.$socket.emit('create_game', {playerName: this.currentPlayer, name:"SinglePlayer", maxPlayers:this.maxPlayers});


                }
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

            remove(game) {
                if(game.players[1].playerName == this.currentPlayer){
                    this.$socket.emit('remove_game', {gameID: game.gameID});
                }else{
                    alert("Nao tem privilegios parta eliminar o jogo");
                }

            }

        },
        components: {
            'lobby': Lobby,
            'game': Game,
            'createGame': CreateGame,
            'singlePlayer':SiglePlayer,
            'login':Login

        },
        mounted() {
            this.loadLobby();
        }

    }
</script>

<style>

</style>