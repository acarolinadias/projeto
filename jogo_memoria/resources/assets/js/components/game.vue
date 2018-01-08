<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">JOGO {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="game.gameEnded" v-on:click.prevent="closeGame">Fechar Jogo</a></strong>
            </div>
            <!--<table class="board grid">

                <td v-for="(piece, index) of game.board">
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(index)">
                </td>

            </table>

            <table>
                <tr v-for="row of game.jogo">
                    <td v-for="cell of row"></td>
                    <td v-for="cell of row"></td>
                </tr>
            </table>-->
            <!--v-if="createGame"-->
            <div class="board" >
                <div class="cell" v-for="(piece, key) of board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
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
                board: this.createTableHidden(24),
                boardGame: this.createTable(24),
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
                return "Unknown";
            },
            adversaryPlayerName() {
                var ownNumber = this.ownPlayerNumber;
                if (ownNumber == 1)
                    return this.game.player2;
                if (ownNumber == 2)
                    return this.game.player1;
                return "Unknown";
            },
            message() {
                if (!this.game.gameStarted) {
                    return "Game has not started yet";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "Game has ended. You Win.";
                    } else if (this.game.winner == 0) {
                        return "Game has ended. There was a tie.";
                    }
                    return "Game has ended and " + this.adversaryPlayerName + " has won. You lost.";
                } else {
                    if (this.game.playerTurn == this.ownPlayerNumber) {
                        return "It's your turn";
                    } else {
                        return "It's " + this.adversaryPlayerName + " turn";
                    }
                }
                return "Game is inconsistent";
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

            closeGame() {
                this.$parent.close(this.game);
            },

            //JOGO
            pieceImageURL(piece) {
                var imgSrc = String(piece);
                //a imagem hidden ele atribui o numero 0
                if (imgSrc == '0') {
                    return 'img/hidden.png';
                }
                return 'img/' + imgSrc + '.png';
            },

            //funcao criar matriz hidden
            createTableHidden(index) {
                var i;
                var boardHidden = [];
                //por cada linha cria uma coluna com imagens hidden
                for (i = 0; i < index; i++) {
                    boardHidden[i] = 'hidden'; // ou 0
                }
                return boardHidden;
            },

            //funcao criar matriz jogo
            createTable(index) {
                var i, j;
                var array = [];
                var board = [];
                var imgLen = index / 2;
                //por cada linha preenche uma coluna com as imagens
                for (j = 1; j < imgLen + 1; j++) {
                    array.push(j);
                }

                var arrayAuxDup = array.slice(0);

                var arrayF = array.concat(arrayAuxDup);

                //Random
                var currentIndex = arrayF.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = arrayF[currentIndex];
                    arrayF[currentIndex] = arrayF[randomIndex];
                    arrayF[randomIndex] = temporaryValue;
                }
                //atribui aleatoriamente as imagens
                for (i = 0; i < index; i++) {
                    board[i] = arrayF[i];
                }

                console.log(arrayF);
                return board;
            },

            clickPiece(index) {
                var aux;

                this.board[index] = this.boardGame[index];
                this.currentValue = index;

                switch (this.click)
                {
                    case 0:
                        this.board[index] = this.boardGame[index];
                        this.cellCompare[0] = this.board[index];
                        this.cellCompare[1] = index;
                        this.currentValue = index;
                        this.click = 1;
                        break;

                    case 1:
                        aux = this.cellCompare[1];
                        this.board[index] = this.boardGame[index];
                        if(this.cellCompare[1] != index){
                            if(this.cellCompare[0] == this.board[index]) {
                                console.log("Sao iguais");
                            }else{
                                this.board[index] = 'hidden';
                                this.board[this.cellCompare[1]] = 'hidden';
                                setTimeout(this.flipCell(index, aux), 2000);

                            }
                            this.userTurn = (this.userTurn == 1)? 2 : 1;
                            this.click = 0;
                            this.cellCompare = [];
                        }
                        break;
                    default:
                        this.click = 0;
                        this.cellCompare = [];
                        break;

                }
                this.checkGameEnded();
            },
            //compara as imagens
            flipCell(index, cellCompare){
                this.board[index] = 'hidden';
                this.board[cellCompare] = 'hidden';
            },
            checkGameEnded: function(){
                //mostrar mensagens
                if (this.isBoardComplete()) {
                    if(this.counterPlayer1 > this.counterPlayer2){
                        this.successMessage = 'O jogo terminou! Jogador 1 Ganhou!!!!!';
                    }else if(this.counterPlayer1 < this.counterPlayer2){
                        this.successMessage = 'O jogo terminou! Jogador 2 Ganhou!!!!!';
                    }else{
                        this.successMessage = 'O jogo terminou! Empate';
                    }
                    this.showSuccess = true;
                    this.gameEnded = true;
                }
                return false;
            },
            isBoardComplete:function(){
                var returnValue = true;
                this.board.forEach(function(element) {
                    if (element === 0 || element == 'hidden') {
                        //console.log(element);
                        returnValue = false;
                        return;
                    }
                });
                return returnValue;
            },
        }
    }
</script>

<style scoped>

    .board {
        max-width: 276px;
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

    /*table {
        width: 100%;
    }

    td {
        width: 33.333%;
    }

    td:after {
        content: '';
        display: block;
        margin-top: 100%;
    }*/

</style>