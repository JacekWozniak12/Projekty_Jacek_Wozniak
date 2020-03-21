var Board = /** @class */ (function () {
    function Board() {
        this.cells = new Array();
        this.movesAmount = 0;
        this.playerTurn = Math.random() + 1;
    }
    Board.prototype.Draw = function (htmlElement) {
        var element_GameBoard = document.querySelector(htmlElement);
        for (var i = 0; i < 9; i++) {
            var el = document.createElement("div");
            el.className = "cell cell" + i;
            var c = new Cell;
            c.content = "";
            c.representation = el;
            el.addEventListener("click", this.SelectCell.bind(this));
            el.addEventListener("click", c.DrawContent.bind(this));
            this.cells.push(c);
            element_GameBoard.appendChild(el);
        }
    };
    Board.prototype.SelectCell = function () {
        this.CheckIfFinished();
        this.CurrentPlayer();
    };
    Board.prototype.CurrentPlayer = function () {
        this.playerTurn != 1 ? 1 : 2;
    };
    Board.prototype.CheckIfFinished = function () {
        if (this.movesAmount > 8) {
            this.DisplayDraw();
        }
        else {
            return false;
        }
    };
    Board.prototype.DisplayDraw = function () {
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell() {
    }
    Cell.prototype.DrawContent = function () {
        this.representation.innerHTML == 't';
    };
    return Cell;
}());
var element_Score_P1 = document.querySelector("player1-score");
var element_Score_P2 = document.querySelector("player2-score");
function GameHandler() {
    var gameBoard = new Board;
    gameBoard.Draw("#game-board");
}
function ScoreHandler() {
}
GameHandler();
//# sourceMappingURL=tictactoe.js.map