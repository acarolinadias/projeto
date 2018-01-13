<template>
    <div>
        <div>
            <h2>Escolher modo de Jogo</h2>
            <button v-on:click.prevent="createVSbot()" class="btn btn-success">Contra BOTS</button>
            <button v-on:click.prevent="createVSele()" class="btn btn-success">Contra Ninguém</button>
        </div>

        <div>
            <div v-if="modoJogo==true">
                //contra bot
            </div>
            <div v-else>
                //alone
                <div class="game-zone-content">
                    <div class="alert alert-success" v-if="showSuccess">
                        <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                        <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded"
                                                                                v-on:click.prevent="restartGame">Restart</a></strong>
                    </div>

                    <div class="board">
                        <div class="cell" v-for="(piece, key) of board">
                            <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                        </div>
                    </div>
                    <hr>
                    <div class="points">
                        <p>Pontuação Jogador 1 : {{ counterPlayer1 }}</p>
                        <p>Pontuação Jogador 2 : {{ counterPlayer2 }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>


<script type="text/javascript">
    export default {
        props: ['game', 'currentPlayer'],
        data: function () {
            return {
                click: 0,
                cellCompare: [],
                showSuccess: true,
                lastclick: 0,

            }
        },

        computed: {

            createVSbot(){
                modoJogo = true;
            },

            message() {
                if (!this.game.gameStarted) {

                }
                else if (this.game.gameEnded) {
                    this.showSuccess = true;
                    return "Jogo terminado";
                    if (this.game.winner == this.currentPlayer) {
                        return "Você ganhou!";
                    }
                    else if (this.game.winner == 0) {
                        return "Game has ended. There was a tie.";
                    }
                    return "Game has ended and " + this.adversaryPlayerName + " has won. You lost.";
                }
                else {
                    this.showSuccess = true;
                    if (this.game.getCurrentPlayerName == this.currentPlayer) {
                        return "É A TUA VEZ DE JOGAR";
                    } else {
                        return "É A VEZ DE  " + this.game.getCurrentPlayerName + " JOGAR";
                    }
                }
                return "À espera de jogadores!";
            },
            alerttype() {
                if (!this.game.gameStarted) {
                    return "alert-warning";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.playerNumber) {
                        return "alert-success";
                    } else if (this.game.winner == 0) {
                        return "alert-info";
                    }
                    return "alert-danger";
                }
                if (this.game.playerTurn == this.playerNumber) {
                    return "alert-success";
                } else {
                    return "alert-info";
                }
            }
        },
        methods: {

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
                if (this.lastclick == null) {
                    this.lastclick = index;
                }
                else {
                    if (index != this.lastclick) {
                        this.$parent.fazerJogada(index, this.game.gameID);
                        this.$parent.checkPair(index, this.game.gameID);

                    }
                    this.lastclick = index;
                }


            },


            //compara as imagens
            flipCell: function (index, cellCompare) {
                this.board[index] = 'hidden';
                this.board[cellCompare] = 'hidden';
            },

            restartGame: function () {
                this.showSuccess = false;
                this.successMessage = '';
                this.cellCompare = [];
                this.click = 0;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - START
            // ----------------------------------------------------------------------------------------


            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - END
            // ----------------------------------------------------------------------------------------
            playerName: function (playerNumber) {
                return 'Jogador ' + playerNumber;
            }
        }
    }

</script>


<style>

    h2 {
        text-align: center;
    }

    .points {
        text-align: center;
        font-size: 15px;
    }

    .close-btn {
        border: none;
        float: right;
        background-color: transparent;
    }

    .board {
        max-width: 276px;
        margin: 0 auto;
        border-style: solid;
        border-width: 0px 0 0 0px;
        border-color: black;
    }

    .boardGrande {
        max-width: 400px;
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