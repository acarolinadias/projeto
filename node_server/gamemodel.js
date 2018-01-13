/*jshint esversion: 6 */

class Game {
    constructor(ID, player1Name, name, maxPlayers, socketId) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.name = name;
        this.maxPlayers = maxPlayers;
        this.player1 = player1Name;
        this.players = [];
        console.log(this.players);
        this.players[1] = new Player(player1Name, socketId);
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [];
        this.boardGame = [];
        this.cartasVirada = [];
        this.click = 0;
        this.cellCompare = [];
        console.log("HERE");
        switch (parseInt(this.maxPlayers)) {
            case 1:
            case 2:
                this.createTableHidden(16);
                this.populate(16);
                break;
            case 3:
                this.createTableHidden(24);
                this.populate(24);
                break;
            case 4:
                this.createTableHidden(36);
                this.populate(36);
                break;
        }

        if (this.maxPlayers == 1)
        {
            this.gameStarted=true;
        }
        this.turn=0;

        this.getCurrentPlayerName ="";
        this.lastClick=-1;
        this.acertou = false;

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

    join(player2Name, socketId) {
        var player = new Player(player2Name, socketId);
        this.players.push(player);
        if (this.players.length-1 == this.maxPlayers) {
            this.gameStarted = true;
            this.setGetters();
        }
    }

    decreasePoints(userTurn) {
        /*if (userTurn == 1) {
            this.counterPlayer1 -= 20;
            this.counterPlayer1 = Math.max(0, this.counterPlayer1);
        } else {
            this.counterPlayer2 -= 20;
            this.counterPlayer2 = Math.max(0, this.counterPlayer2);
        }*/
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

    currentPlayer()
    {
        return (((this.turn+parseInt(this.maxPlayers))%parseInt(this.maxPlayers))+1);
    }
    currentPlayerClass()
    {
        return this.players[(((this.turn+parseInt(this.maxPlayers))%parseInt(this.maxPlayers))+1)];
    }
    currentPlayerName()
    {
        return (this.players[((this.turn+parseInt(this.maxPlayers))%parseInt(this.maxPlayers))+1].playerName);
    }
    checkPair(index, player)
    {

        if(this.gameStarted==true){
            if(player == this.currentPlayerName()) {
                if(!this.cartasVirada.includes(index)){
                    if (this.click==2) {
                            if(this.boardGame[index]!=this.boardGame[this.lastClick])
                            {
                                var waitTill = new Date(new Date().getTime() + 1.5 * 1000);
                                while(waitTill > new Date()){}
                                this.board[index]=0;
                                this.board[this.lastClick]=0;
                                this.nextTurn();
                            }

                            this.click=0;
                    }

                }

            }

        }
    }

    checkPairTrue(index, player){
        if(this.gameStarted==true) {
            if (player == this.currentPlayerName()) {
                if(this.cartasVirada.includes(index)){
                   if(this.acertou){
                       var waitTill = new Date(new Date().getTime() + 1.5 * 1000);
                       while(waitTill > new Date()){}
                       this.board[index]= 200;
                       this.board[this.lastClick] = 200;
                       this.acertou = false;
                       this.lastClick=-1;
                   }
                }
            }
        }
    }

    fazerJogada(index, player){

        if(this.gameStarted==true){

            if(player == this.currentPlayerName()) {
            if(!this.cartasVirada.includes(index)){


            switch (this.click) {
                case 0:
                    this.board[index]=this.boardGame[index];
                    this.lastClick=index;
                    this.click=1;
                    break;
                case 1:
                    this.board[index]=this.boardGame[index];
                    if(this.boardGame[index]==this.boardGame[this.lastClick])
                    {
                        this.cartasVirada.push(index);
                        this.cartasVirada.push(this.lastClick);
                        this.acertou = true;
                        this.click=0;
                        this.currentPlayerClass().pontuacao+=10;
                        this.checkGameEnded();
                    }else{
                        this.click=2;
                    }
                    break;
            }
        }}

        }
        else{
            console.log("GAME NOT STARTED");
        }

    }
    nextTurn()
    {
        this.turn++;
        this.setGetters();

    }
    setGetters()
    {
        this.getCurrentPlayerName=(this.players[((this.turn+parseInt(this.maxPlayers))%parseInt(this.maxPlayers))+1].playerName);

    }
    checkGameEnded(){


            if (this.isBoardComplete()) {
                var winner=this.players[1];
                for(var player of this.players)
                {
                    if(winner.pontuacao<player.pontuacao)
                    {
                        winner=player;
                    }
                }
                this.winner=winner.playerName;
                console.log("WINNER : " +this.winner);
                return true;
            }
            return false;

    }
    isBoardComplete() {
        var returnValue = true;
        this.board.forEach(function (element) {
            if (element === 0 || element == 'hidden') {
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
class Player{
    constructor(playerName, socketId)
    {
        this.playerName=playerName;
        this.socketId=socketId;
        this.pontuacao=0;
    }
}

module.exports = Game;
