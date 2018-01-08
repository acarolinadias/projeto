/*jshint esversion: 6 */

class Game {
    constructor(ID, player1Name, name, maxPlayers) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.name = name;
        this.maxPlayers = maxPlayers;
        this.player1 = player1Name;
        this.player2 = '';
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [];
        this.boardGame = [];
        this.click = 0;
        this.cellCompare = [];
        this.createTableHidden(16);
        this.populate(16);
    }

    populate(value) {
        var i, j;
        var array = [];
        var imgLen = value / 2;
        //por cada linha preenche uma coluna com as imagens
        for (j = 1; j < imgLen + 1; j++) {
            array.push(j);
        }

        var arrayAuxDup = array.slice(0);

        var arrayF = array.concat(arrayAuxDup);

        //Random
        var currentIndex = arrayF.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arrayF[currentIndex];
            arrayF[currentIndex] = arrayF[randomIndex];
            arrayF[randomIndex] = temporaryValue;
        }
        for (i = 0; i < value; i++) {

            this.boardGame[i] = arrayF[i];
        }


    }

    createTableHidden(index) {
        var i;
        var boardHidden = [];
        //por cada linha cria uma coluna com imagens hidden
        for (i = 0; i < index; i++) {
            this.board[i] = 0; // ou 0
        }
    }

    join(player2Name) {
        this.player2 = player2Name;
        this.gameStarted = true;
    }

    decreasePoints(userTurn) {
        if (userTurn == 1) {
            this.counterPlayer1 -= 20;
            this.counterPlayer1 = Math.max(0, this.counterPlayer1);
        } else {
            this.counterPlayer2 -= 20;
            this.counterPlayer2 = Math.max(0, this.counterPlayer2);
        }
    }

    //incrementa pontos em caso de sucesso
    givePoints(userTurn) {
        if (userTurn == 1) {
            this.counterPlayer1 += 30;
        } else {
            this.counterPlayer2 += 30;
        }
    }
    getBoard() {
        return this.board;
    }

    play(playerNumber, index) {
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }
        if (this.board[index] !== 0) {
            return false;
        }
        this.board[index] = playerNumber;
        if (!this.checkGameEnded()) {
            this.playerTurn = this.playerTurn == 1 ? 2 : 1;
        }
        return true;
    }

    fazerJogada(index){

        var aux;
        this.board[index] = this.boardGame[index];
        this.currentValue = index;
        switch (this.click) {
            case 0:
                this.board[index] = this.boardGame[index];
                this.cellCompare[0] = this.board[index];
                this.cellCompare[1] = index;
                this.currentValue = index;
                this.click = 1;
                return true;
                break;

            case 1:
                aux = this.cellCompare[1];
                this.board[index] = this.boardGame[index];
                if (this.cellCompare[1] != index) {
                    if (this.cellCompare[0] == this.board[index]) {
                        console.log("Sao iguais");
                        return true;
                        this.givePoints(this.userTurn);
                    } else {
                        this.decreasePoints(this.userTurn);
                        this.board[index] = 'hidden';
                        this.board[this.cellCompare[1]] = 'hidden';
                        return true;
                        //setTimeout(this.flipCell(index, aux), 2000);

                    }
                    this.click = 0;
                    this.cellCompare = [];
                    return true;
                }
                break;
            default:
                this.click = 0;
                this.cellCompare = [];
                return true;
                break;

        }
        this.checkGameEnded();
    }
    checkGameEnded(){

            //mostrar mensagens
            if (this.isBoardComplete()) {
                if (this.counterPlayer1 > this.counterPlayer2) {
                    this.successMessage = 'O jogo terminou! Jogador 1 Ganhou!!!!!';
                } else if (this.counterPlayer1 < this.counterPlayer2) {
                    this.successMessage = 'O jogo terminou! Jogador 2 Ganhou!!!!!';
                } else {
                    this.successMessage = 'O jogo terminou! Empate';
                }
                this.showSuccess = true;
                this.gameEnded = true;
            }
            return false;

    }
    isBoardComplete() {
        var returnValue = true;
        this.board.forEach(function (element) {
            if (element === 0 || element == 'hidden') {
                //console.log(element);
                returnValue = false;
                return;
            }
        });
        return returnValue;
    }
}


class cell {
    constructor(index, img) {
        this.index = index;
        this.img = img;
    }
}

class piece {
    constructor(urlImage, status) {
        this.urlImage = urlImage;
        this.status = status;
    }
}

module.exports = Game;
