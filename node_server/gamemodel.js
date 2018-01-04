/*jshint esversion: 6 */

class Game {
    constructor(ID, player1Name, name, maxPlayers) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.name=name;
        this.maxPlayers=maxPlayers;
        this.player1= player1Name;
        this.player2= '';
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [0,0,0,0,0,0,0,0,0];
        this.jogo2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //this.populate(5);
       
    }

    populate(value){
        var x, y;
        for(x = 0 ;x < 10; x++){
            for(y = 0; y<10; y++){
                this.jogo[x][y] == value;
            }
        }
    }

    join(player2Name){
        this.player2= player2Name;
        this.gameStarted = true;
    }

    hasRow(value){

        if(this.maxPlayers == 2){
            return
                ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value) && (this.board[3]==value)) ||
                ((this.board[4]==value) && (this.board[5]==value) && (this.board[6]==value) && (this.board[7]==value)) ||
                ((this.board[8]==value) && (this.board[10]==value) && (this.board[11]==value) && (this.board[12]==value)) ||
                ((this.board[13]==value) && (this.board[14]==value) && (this.board[15]==value) || (this.board[16]==value));
        }



    }  

    checkGameEnded(){
        if (this.hasRow(1)) {
            this.winner = 1;
            this.gameEnded = true;
            return true;
        } else if (this.hasRow(2)) {
            this.winner = 2;
            this.gameEnded = true;
            return true;
        } else if (this.isBoardComplete()) {
            this.winner = 0;
            this.gameEnded = true;
            return true;
        }
        return false;
    }

    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, index){
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


}class cell{
    constructor(index, img){
        this.index=index;
        this.img=img;
    }
}

module.exports = Game;
