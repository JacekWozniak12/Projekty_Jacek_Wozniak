var element_P1 = document.querySelector("#player1");
var element_P2 = document.querySelector("#player2");
var element_Score_P1 = document.querySelector("player1-score");
var element_Score_P2 = document.querySelector("player2-score");
var Board = /** @class */ (function () {
    function Board() {
        this.NUMBER_OF_MOVES = 9;
        this.cells = new Array();
        this.movesAmount = 1;
        this.playerTurn = Math.random() + 1;
        this.playerTurn == 1 ?
            Setup(element_P1, element_P2) :
            Setup(element_P2, element_P1);
    }
    Board.prototype.Draw = function (htmlElement) {
        var element_GameBoard = document.querySelector(htmlElement);
        for (var i = 0; i < 9; i++) {
            this.CreateCell(i, element_GameBoard);
        }
    };
    Board.prototype.CreateCell = function (i, element_GameBoard) {
        var el = document.createElement("div");
        el.className = "cell cell" + i;
        var c = new Cell;
        c.content = "";
        c.representation = el;
        el.addEventListener("click", this.SelectCell.bind(this));
        el.addEventListener("click", c.DrawContent.bind(c));
        this.cells.push(c);
        element_GameBoard.appendChild(el);
    };
    Board.prototype.SelectCell = function () {
        this.CheckIfFinished();
        this.CurrentPlayer();
    };
    Board.prototype.CurrentPlayer = function () {
        this.playerTurn != 1 ? this.playerTurn = 1 : this.playerTurn = 2;
        this.movesAmount++;
        if (this.playerTurn == 1) {
            ChangePlayer(element_P1, element_P2);
        }
        else {
            ChangePlayer(element_P2, element_P1);
        }
    };
    Board.prototype.CheckIfFinished = function () {
        if (this.movesAmount >= this.NUMBER_OF_MOVES) {
            this.DisplayDraw();
        }
        else {
            return false;
        }
    };
    Board.prototype.DisplayDraw = function () {
        alert("Draw");
        this.Reset();
    };
    Board.prototype.Reset = function () {
        this.movesAmount = 0;
        this.playerTurn = Math.random() + 1;
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
function GameHandler() {
    var gameBoard = new Board;
    gameBoard.Draw("#game-board");
}
function ScoreHandler() {
}
function ChangePlayer(previous, current) {
    Deselect(previous);
    Select(current);
}
function Select(element) {
    element.classList.replace("inactive", "active");
}
function Deselect(element) {
    element.classList.replace("active", "inactive");
}
function Setup(chosen, another) {
    chosen.classList.add("active");
    another.classList.add("inactive");
}
GameHandler();
//# sourceMappingURL=tictactoe.js.map