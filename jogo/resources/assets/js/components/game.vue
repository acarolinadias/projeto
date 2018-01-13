<template>
    <div>

        <div class="game-zone-content">
            <div class="alert"
                 :class="alerttype">
                <strong>{{message}} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="game.gameEnded"
                                                               v-on:click.prevent="closeGame">Fechar Jogo</a></strong>
            </div>

            <div v-if="(game.maxPlayers<=2 )" class="board">
                <div class="cell" v-for="(piece, key) of game.board">
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <div v-else class="boardGrande">
                <div class="cell" v-for="(piece, key) of game.board">
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <hr>
            <div class="points" v-for="(player) of game.players">
                <p v-if="(player!=null)">Player : {{player.playerName}} -> {{player.pontuacao}} pontos</p>


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
                    return "O jogo terminou, o " + this.adversaryPlayerName + " ganhou. Perdes-te";
                }
                else {
                    this.showSuccess = true;
                    if (this.game.getCurrentPlayerName == this.currentPlayer) {
                        return "É A TUA VEZ DE JOGAR";
                    } else {
                        if( this.game.getCurrentPlayerName == "bot" && this.game.bot==true)
                        {
                            console.log("BOT a jogar!!!!")

    var random1 = Math.floor(Math.random() * 16);

                            this.$parent.fazerJogada(random1, this.game.gameID);
                            this.$parent.checkPair(random1, this.game.gameID);
                            this.$parent.checkPairTrue(random1, this.game.gameID);

                                setTimeout(function(){
                                do{
                                var random2 = Math.floor(Math.random() * 16);
                                if(random1==random2 || this.game.cartasVirada.includes(random2))
                                            {
                                        var random2 = Math.floor(Math.random() * 16);
                                            }else{
                                        break;
                                    }
                            }while(1);

                            this.$parent.fazerJogada(random2, this.game.gameID);
                            this.$parent.checkPair(random2, this.game.gameID);
                            this.$parent.checkPairTrue(random2, this.game.gameID);
                            }.bind(this), 2000);





                        }

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


            //decrementa pontos em caso de falha
            clickPiece: function (index) {
                if (this.lastclick == null) {
                    this.lastclick = index;
                }

                else {
                    if (index != this.lastclick) {
                        this.$parent.fazerJogada(index, this.game.gameID);
                        this.$parent.checkPair(index, this.game.gameID);
                        this.$parent.checkPairTrue(index, this.game.gameID);
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