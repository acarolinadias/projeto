<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">JOGO {{game.gameID}}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert"
                 :class="alerttype">
                <strong>{{message}} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="game.gameEnded" v-on:click.prevent="closeGame">Fechar
                    Jogo</a></strong>
            </div>

            <div class="game-zone-content">
                <div class="alert alert-success" v-if="showSuccess">
                    <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                    <strong>{{successMessage}} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded"
                                                                          v-on:click.prevent="restartGame">Restart</a></strong>
                </div>

                <div class="board">
                    <div class="cell" v-for="(piece, key) of game.board">
                        <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                    </div>
                </div>
                <hr>
                <div class="points">
                    <p>Pontuação Jogador 1 : {{counterPlayer1}}</p>
                    <p>Pontuação Jogador 2 : {{counterPlayer2}}</p>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>


<script type="text/javascript">
    export default {
        props: ['game'],
        data: function () {
            return {
                boardGame: this.getBoardGame(),
                click: 0,
                cellCompare: []
            }
        },

        computed: {
            ownPlayerNumber() {
                if (this.game.player1SocketID == this.$parent.socketId) {
                    return 1;
                } else if (this.game.player2SocketID == this.$parent.socketId) {
                    return 2;
                }
                return 0;
            },
            ownPlayerName() {
                var ownNumber = this.ownPlayerNumber;
                if (ownNumber == 1)
                    return this.game.player1;
                if (ownNumber == 2)
                    return this.game.player2;
                return "Unknown 1";
            },
            adversaryPlayerName() {
                var ownNumber = this.ownPlayerNumber;
                if (ownNumber == 1)
                    return this.game.player2;
                if (ownNumber == 2)
                    return this.game.player1;
                return "Unknown 2";
            },
            message() {
                if (!this.game.gameStarted) {

                }
                else if (this.game.gameEnded) {
                    return "Jogo terminado";
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "Você ganhou!";
                    }
                    else if (this.game.winner == 0) {
                        return "Game has ended. There was a tie.";
                    }
                    return "Game has ended and " + this.adversaryPlayerName + " has won. You lost.";
                }
                else {
                    if (this.game.playerTurn == this.ownPlayerNumber) {
                        return "It's your turn";
                    } else {
                        return "It's " + this.adversaryPlayerName + " turn";
                    }
                }
                return "À espera de jogadores!";
            },
            alerttype() {
                if (!this.game.gameStarted) {
                    return "alert-warning";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "alert-success";
                    } else if (this.game.winner == 0) {
                        return "alert-info";
                    }
                    return "alert-danger";
                }
                if (this.game.playerTurn == this.ownPlayerNumber) {
                    return "alert-success";
                } else {
                    return "alert-info";
                }
            }
        },
        methods: {
            getBoardGame() {

                console.log(this.game);


            },

            closeGame() {
                this.$parent.close(this.game);
            },

            //JOGO
            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                //a imagem hidden ele atribui o numero 0
                if (imgSrc == '0') {
                    return 'img/hidden.png';
                }
                return 'img/' + imgSrc + '.png';
            },

            //funcao criar matriz hidden

            //funcao criar matriz jogo


            //decrementa pontos em caso de falha
            clickPiece: function (index) {

                this.$parent.fazerJogada(index, this.game.gameID);
            },


            //compara as imagens
            flipCell: function (index, cellCompare) {
                this.board[index] = 'hidden';
                this.board[cellCompare] = 'hidden';
            },

            restartGame: function () {
                console.log('restartGame');
                this.board = this.createTableHidden(16);
                this.showSuccess = false;
                this.showFailure = false;
                this.successMessage = '';
                this.failMessage = '';
                //this.currentValue= 1;
                this.gameEnded = false;
                this.cellCompare = [];
                this.click = 0;
                this.counterPlayer1 = 0;
                this.counterPlayer2 = 0;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - START
            // ----------------------------------------------------------------------------------------



            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - END
            // ----------------------------------------------------------------------------------------
            playerName: function (playerNumber) {
                console.log("Player num: " + playerNumber);
                console.log("Nome: " + this.player1User);
                /*if(this.player1User != undefined && playerNumber == 1){
                    return this.player1User.name;
                }
                if(this.player2User != undefined && playerNumber == 2){
                    return this.player2User.name;
                }*/
                return 'Jogador ' + playerNumber;
            }
        }
    }

</script>


<style>

    h2 {
        text -align: center;
    }

    .points {
        text -align: center;
        font-size: 15px;
    }

    .close-btn {
        border: none;
        float: right;
        background-color: transparent;
    }

    .board {
        max -width: 276px;
        margin: 0 auto;
        border-style: solid;
        border-width: 0px 0 0 0px;
        border-color: black;
    }

    .cell {
        display: inline-block;
        border-style: solid;
        border-width: 2px 2px 2px 2px;
        border-color: black;
        margin-left: -2px;
        margin-top: -2px;
    }

    img {
        width: 50px;
        height: 50px;
        margin: 5px;
        padding: 0;
        border-style: none;
    }
</style>