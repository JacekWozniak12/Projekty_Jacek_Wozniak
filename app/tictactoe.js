var Board = /** @class */ (function () {
    function Board() {
        this.movesAmount = 0;
    }
    Board.prototype.Draw = function (htmlElement) {
        var element_GameBoard = document.querySelector(htmlElement);
        for (var i = 0; i < 9; i++) {
            var el = document.createElement("p");
            el.className = "cell cell" + i;
            element_GameBoard.appendChild(el);
        }
    };
    Board.prototype.CurrentPlayer = function () {
        this.playerTurn != 1 ? 1 : 2;
    };
    Board.prototype.SelectCell = function () {
        //
    };
    Board.prototype.CheckIfFinished = function () {
        if (this.movesAmount > 8)
            return true;
        else {
            return false;
        }
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell() {
    }
    Cell.prototype.DrawContent = function () {
        this.representation.innerHTML == '';
    };
    return Cell;
}());
var element_Score_P1 = document.querySelector("player1-score");
var element_Score_P2 = document.querySelector("player2-score");
var gameBoard = new Board;
gameBoard.Draw("#game-board");
