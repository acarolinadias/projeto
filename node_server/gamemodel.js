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
    }

    populate(value) {
        var x, y;
        for (x = 0; x < 4; x++) {
            for (y = 0; y < 10; y++) {
                this.jogo[x][y] == value;
            }
        }
    }


    join(player2Name) {
        this.player2 = player2Name;
        this.gameStarted = true;
    }

    /*hasRow(value){
        if(this.maxPlayers == 2){
            return
                ((this.jogo2[0]==value) && (this.jogo2[1]==value) && (this.jogo2[2]==value) && (this.jogo2[3]==value)) ||
                ((this.jogo2[4]==value) && (this.jogo2[5]==value) && (this.jogo2[6]==value) && (this.jogo2[7]==value)) ||
                ((this.jogo2[8]==value) && (this.jogo2[10]==value) && (this.jogo2[11]==value) && (this.jogo2[12]==value)) ||
                ((this.jogo2[13]==value) && (this.jogo2[14]==value) && (this.jogo2[15]==value) || (this.jogo2[16]==value));
        }
    } */

    /*checkGameEnded(){
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
    }
    isBoardComplete(){
        var returnValue = true;
        this.board.forEach(function(element) {
            if (element === 0 || element == 'hidden') {
                //console.log(element);
                returnValue = false;
                return;
            }
        });
        return returnValue;
    }*/

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
