const element_P1 = document.querySelector("#player1");
const element_P2 = document.querySelector("#player2");
const element_Score_P1 = document.querySelector(".player1-score");
const element_Score_P2 = document.querySelector(".player2-score");
const P1 : string = 'x';
const P2 : string = 'o';
let P1Score = 0;
let P2Score = 0;

class Board{  

    NUMBER_OF_MOVES : number = 9;

    cells: Cell[] = new Array();
    playerTurn: number;
    movesAmount : number = 1;

    Draw(htmlElement: string){
        
        const element_GameBoard = document.querySelector(htmlElement);
        element_GameBoard.innerHTML = "";
        this.cells = new Array();

        for(let i = 0; i < 9; i++){
            this.CreateCell(i, element_GameBoard);
        }
    }

    constructor(){
        this.Start();
    }

    private Start() {
        this.SelectPlayer();
    }

    private SelectPlayer() {
        this.playerTurn = Math.round(Math.random()) + 1;
        this.playerTurn == 1 ?
            Setup(<HTMLDivElement>element_P1, <HTMLDivElement>element_P2) :
            Setup(<HTMLDivElement>element_P2, <HTMLDivElement>element_P1);
    }

    private CreateCell(i: number, element_GameBoard: Element) {
        let el = document.createElement("div");
        let c = new Cell(el, this);

        el.className = "cell cell" + i;

        c.content = "";
        c.representation = el;

        let binding = c.SelectedCell.bind(c);
        el.addEventListener("click", binding);
        
        this.cells.push(c);
        element_GameBoard.appendChild(el);
    }

    CellWasSelected() {    
        if (!this.CheckIfFinished()){
            this.CurrentPlayer(); 
        }
    }

    CurrentPlayer(){
        this.playerTurn != 1 ? this.playerTurn = 1 : this.playerTurn = 2
        this.movesAmount++;
        
        if(this.playerTurn == 1){
            SelectDeselect(
                <HTMLDivElement> element_P1, 
                <HTMLDivElement> element_P2
                );
        }
        else{
            SelectDeselect(
                <HTMLDivElement> element_P2, 
                <HTMLDivElement> element_P1
            );
        }
    }

    CheckIfFinished() : boolean{
        if(this.CheckIfWon(this.playerTurn)){
            this.DisplayWin();
            return true;
        }
        else if(this.movesAmount >= this.NUMBER_OF_MOVES){
            this.DisplayDraw();
            return true;
        }
        else return false;
    }

    DisplayWin(){
        alert("Player "+this.playerTurn+" won");
        if(this.playerTurn == 1) P1Score++;
        if(this.playerTurn == 2) P2Score++;
        this.RefreshGameBoard();
    }

    DisplayDraw(){
        alert("Draw");
        this.RefreshGameBoard();
    }

    private RefreshGameBoard() {
        element_Score_P1.innerHTML = ""+P1Score;
        element_Score_P2.innerHTML = ""+P2Score;
        this.movesAmount = 0;
        this.Draw("#game-board");
        this.CurrentPlayer();
    }

    CheckIfWon(player : number) : boolean{
        let checkFor : string;
        if(this.playerTurn == 1) checkFor = P1; 
        else checkFor = P2;

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
            this.cells[4].content == checkFor &&
            this.cells[6].content == checkFor) {
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
    }
}

class Cell{

    board : Board;
    content: string;
    representation: HTMLDivElement;

    constructor(representation : HTMLDivElement, board : Board){
        this.board = board;
        this.content = "";
        this.representation = representation;
    }

    SelectedCell(){
        if(this.content == ""){

            if(this.board.playerTurn == 1){
                this.content = P1;
                this.representation.innerHTML = P1;
            }
            else if(this.board.playerTurn == 2) {
                this.content = P2;
                this.representation.innerHTML = P2;
            }
    
            this.board.CellWasSelected();
            this.representation.click = null;
        }
    }
}

function GameHandler(){
    const gameBoard = new Board;
    gameBoard.Draw("#game-board");
}

function SelectDeselect(current : HTMLDivElement, previous : HTMLDivElement ){
    Select(current);
    Deselect(previous);
}

function Select(element : HTMLDivElement){
    element.classList.replace("inactive", "active");
}

function Deselect(element : HTMLDivElement){
    element.classList.replace("active", "inactive");
}

function Setup(chosen : HTMLDivElement, another : HTMLDivElement ){
    chosen.classList.add("active");
    another.classList.add("inactive");
}

GameHandler();
