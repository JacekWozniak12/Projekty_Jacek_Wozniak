var element_P1 = document.querySelector("#player1");
var element_P2 = document.querySelector("#player2");
var element_Score_P1 = document.querySelector(".player1-score");
var element_Score_P2 = document.querySelector(".player2-score");
var P1 = 'x';
var P2 = 'o';
var P1Score = 0;
var P2Score = 0;
var Board = /** @class */ (function () {
    function Board() {
        this.NUMBER_OF_MOVES = 9;
        this.cells = new Array();
        this.movesAmount = 1;
        this.Start();
    }
    Board.prototype.Draw = function (htmlElement) {
        var element_GameBoard = document.querySelector(htmlElement);
        element_GameBoard.innerHTML = "";
        this.cells = new Array();
        for (var i = 0; i < 9; i++) {
            this.CreateCell(i, element_GameBoard);
        }
    };
    Board.prototype.Start = function () {
        this.SelectPlayer();
    };
    Board.prototype.SelectPlayer = function () {
        this.playerTurn = Math.round(Math.random()) + 1;
        this.playerTurn == 1 ?
            Setup(element_P1, element_P2) :
            Setup(element_P2, element_P1);
    };
    Board.prototype.CreateCell = function (i, element_GameBoard) {
        var el = document.createElement("div");
        var c = new Cell(el, this);
        el.className = "cell cell" + i;
        c.content = "";
        c.representation = el;
        var binding = c.SelectedCell.bind(c);
        el.addEventListener("click", binding);
        this.cells.push(c);
        element_GameBoard.appendChild(el);
    };
    Board.prototype.CellWasSelected = function () {
        if (!this.CheckIfFinished()) {
            this.CurrentPlayer();
        }
    };
    Board.prototype.CurrentPlayer = function () {
        this.playerTurn != 1 ? this.playerTurn = 1 : this.playerTurn = 2;
        this.movesAmount++;
        if (this.playerTurn == 1) {
            SelectDeselect(element_P1, element_P2);
        }
        else {
            SelectDeselect(element_P2, element_P1);
        }
    };
    Board.prototype.CheckIfFinished = function () {
        if (this.movesAmount >= this.NUMBER_OF_MOVES) {
            this.DisplayDraw();
            return true;
        }
        else if (this.CheckIfWon(this.playerTurn)) {
            this.DisplayWin();
            return true;
        }
        else
            return false;
    };
    Board.prototype.DisplayWin = function () {
        alert("Player " + this.playerTurn + " won");
        if (this.playerTurn == 1)
            P1Score++;
        if (this.playerTurn == 2)
            P2Score++;
        this.RefreshGameBoard();
    };
    Board.prototype.DisplayDraw = function () {
        alert("Draw");
        this.RefreshGameBoard();
    };
    Board.prototype.RefreshGameBoard = function () {
        this.Start();
        element_Score_P1.innerHTML = "" + P1Score;
        element_Score_P2.innerHTML = "" + P2Score;
        this.movesAmount = 1;
        this.Draw("#game-board");
    };
    Board.prototype.CheckIfWon = function (player) {
        var checkFor;
        if (this.playerTurn == 1)
            checkFor = P1;
        else
            checkFor = P2;
        // will do cleaner way, for now would suffice
        if (this.cells[0].content == checkFor &&
            this.cells[1].content == checkFor &&
            this.cells[2].content == checkFor) {
            return true;
        }
        if (this.cells[0].content == checkFor &&
            this.cells[3].content == checkFor &&
            this.cells[6].content == checkFor) {
            return true;
        }
        if (this.cells[0].content == checkFor &&
            this.cells[4].content == checkFor &&
            this.cells[8].content == checkFor) {
            return true;
        }
        if (this.cells[1].content == checkFor &&
            this.cells[4].content == checkFor &&
            this.cells[7].content == checkFor) {
            return true;
        }
        if (this.cells[2].content == checkFor &&
            this.cells[5].content == checkFor &&
            this.cells[8].content == checkFor) {
            return true;
        }
        if (this.cells[3].content == checkFor &&
            this.cells[4].content == checkFor &&
            this.cells[5].content == checkFor) {
            return true;
        }
        if (this.cells[6].content == checkFor &&
            this.cells[7].content == checkFor &&
            this.cells[8].content == checkFor) {
            return true;
        }
        return false;
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell(representation, board) {
        this.board = board;
        this.content = "";
        this.representation = representation;
    }
    Cell.prototype.SelectedCell = function () {
        if (this.content == "") {
            if (this.board.playerTurn == 1) {
                this.content = P1;
                this.representation.innerHTML = P1;
            }
            else if (this.board.playerTurn == 2) {
                this.content = P2;
                this.representation.innerHTML = P2;
            }
            this.board.CellWasSelected();
            this.representation.click = null;
        }
    };
    return Cell;
}());
function GameHandler() {
    var gameBoard = new Board;
    gameBoard.Draw("#game-board");
}
function ScoreHandler() {
}
function SelectDeselect(current, previous) {
    Select(current);
    Deselect(previous);
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