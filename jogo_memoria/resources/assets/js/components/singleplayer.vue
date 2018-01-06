<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <h2>Jogador Atual : {{ currentPlayer }}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded" v-on:click.prevent="restartGame">Restart</a></strong>
            </div>

            <div class="board">
                <div class="cell" v-for="(piece, key) of board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <hr>
            <div class="points" >
                <p>Pontuação Jogador 1 : {{ counterPlayer1 }}</p>
                <p>Pontuação Jogador 2 : {{ counterPlayer2 }}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data: function(){
            return {
                title: 'Jogo da memória - SinglePlayer',
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentValue: 1,
                gameEnded:false,
                player1User: '',
                player2User: '',
                userTurn: 1,
                counterPlayer1: 0,
                counterPlayer2: 0,
                board: this.createTableHidden(16),
                boardGame: this.createTable(16),
                click: 0,
                cellCompare: [],
            }
        },

        methods: {
            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                //a imagem hidden ele atribui o numero 0
                if(imgSrc == '0'){
                    return 'img/hidden.png';
                }
                return 'img/' + imgSrc + '.png';
            },

            //funcao criar matriz hidden
            createTableHidden: function (index) {
                var i;
                var boardHidden = [];
                //por cada linha cria uma coluna com imagens hidden
                for(i = 0 ; i < index; i++){
                    boardHidden[i] = 'hidden'; // ou 0
                }
                return boardHidden;
            },

            //funcao criar matriz jogo
            createTable: function (index) {
                var i, j;
                var array = [];
                var board = [];
                var imgLen = index / 2;
                //por cada linha preenche uma coluna com as imagens
                for(j = 1; j < imgLen+1; j++){
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
                for(i = 0 ; i < index; i++){
                    board[i] = arrayF[i];
                }

                    console.log(arrayF);

                return board;
            },

            //decrementa pontos em caso de falha
            decreasePoints: function (userTurn) {
                if(userTurn == 1){
                    this.counterPlayer1 -= 20;
                    this.counterPlayer1 = Math.max(0, this.counterPlayer1);
                }else{
                    this.counterPlayer2 -= 20;
                    this.counterPlayer2 = Math.max(0, this.counterPlayer2);
                }
            },
            //incrementa pontos em caso de sucesso
            givePoints: function (userTurn) {
                if(userTurn == 1){
                    this.counterPlayer1+=30;
                }else{
                    this.counterPlayer2+=30;
                }
            },

            clickPiece: function(index) {
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
                                this.givePoints(this.userTurn);

                            }else{
                                this.decreasePoints(this.userTurn);
                                this.board[index] = 'hidden';
                                this.board[this.cellCompare[1]] = 'hidden';
                                //setTimeout(this.flipCell(index, aux), 2000);

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
            flipCell: function(index, cellCompare){
                this.board[index] = 'hidden';
                this.board[cellCompare] = 'hidden';
            },

            restartGame:function(){
                console.log('restartGame');
                this.board = this.createTableHidden(16);
                this.showSuccess= false;
                this.showFailure= false;
                this.successMessage= '';
                this.failMessage= '';
                //this.currentValue= 1;
                this.gameEnded= false;
                this.cellCompare=[];
                this.click = 0;
                this.counterPlayer1 = 0;
                this.counterPlayer2 = 0;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - START
            // ----------------------------------------------------------------------------------------
            hasRow: function(value){
                //console.log("Value: " + value);
                return  ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value)&& (this.board[3]==value)) ||
                    ((this.board[4]==value) && (this.board[5]==value) && (this.board[6]==value)&& (this.board[7]==value)) ||
                    ((this.board[8]==value) && (this.board[9]==value) && (this.board[10]==value)  && (this.board[11]==value)) ||
                    ((this.board[12]==value) && (this.board[13]==value) && (this.board[14]==value) && (this.board[15]==value));
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
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - END
            // ----------------------------------------------------------------------------------------
            playerName: function(playerNumber){
                console.log("Player num: " + playerNumber);
                console.log("Nome: " +this.player1User);
                /*if(this.player1User != undefined && playerNumber == 1){
                    return this.player1User.name;
                }
                if(this.player2User != undefined && playerNumber == 2){
                    return this.player2User.name;
                }*/
                return 'Jogador '+ playerNumber;
            }
        },

        computed:{
            currentPlayer: function(){
                console.log("Turn: " + this.userTurn);
                console.log("Player: " + this.playerName(this.userTurn));
                this.playerName(this.currentValue);
                return 'Jogador ' + this.userTurn;
            }
        },
        mounted(){
            if(this.$root.$data.player1){
                this.player1User = this.$root.$data.player1;
            }
            if(this.$root.$data.player2 ){
                this.player2User = this.$root.$data.player2;
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

    .close-btn{
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