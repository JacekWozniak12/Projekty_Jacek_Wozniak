const element_P1 = document.querySelector("#player1");
const element_P2 = document.querySelector("#player2");
const element_Score_P1 = document.querySelector("player1-score");
const element_Score_P2 = document.querySelector("player2-score");

class Board{  

    NUMBER_OF_MOVES : number = 9;

    cells: Cell[] = new Array();
    playerTurn: number;
    winner: number;
    movesAmount : number = 1;

    Draw(htmlElement: string){
        
        const element_GameBoard = document.querySelector(htmlElement);
        
        for(let i = 0; i < 9; i++){

            this.CreateCell(i, element_GameBoard);
        }
    }

    constructor(){
        this.Start();
    }

    private Start() {
        this.playerTurn = Math.random() + 1;
        this.playerTurn == 1 ?
            Setup(<HTMLDivElement>element_P1, <HTMLDivElement>element_P2):
            Setup(<HTMLDivElement>element_P2, <HTMLDivElement>element_P1);
    }

    private CreateCell(i: number, element_GameBoard: Element) {
        let el = document.createElement("div");
        el.className = "cell cell" + i;
        let c = new Cell;
        c.content = "";
        c.representation = el;
        el.addEventListener("click", this.SelectCell.bind(this));
        el.addEventListener("click", c.DrawContent.bind(c));
        this.cells.push(c);
        element_GameBoard.appendChild(el);
    }

    SelectCell(){    
        this.CheckIfFinished();
        this.CurrentPlayer();
    }

    CurrentPlayer(){
        this.playerTurn != 1 ? this.playerTurn = 1 : this.playerTurn = 2
        this.movesAmount++;
        
        if(this.playerTurn == 1){
            ChangePlayer(
                <HTMLDivElement> element_P1, 
                <HTMLDivElement> element_P2
                );
        }
        else{
            ChangePlayer(
                <HTMLDivElement> element_P2, 
                <HTMLDivElement> element_P1
            );
        }
    }

    CheckIfFinished() : boolean{
        if(this.movesAmount >= this.NUMBER_OF_MOVES){
            this.DisplayDraw();
        }
        else{
            return false
        }
    }

    DisplayDraw(){
        alert("Draw");
        this.Reset();
    }

    private Reset() {
        this.Start();
    }
}

class Cell{

    content: string;
    representation: HTMLElement;

    DrawContent(){
        this.representation.innerHTML == 't';
    }

}

function GameHandler(){
    const gameBoard = new Board;
    gameBoard.Draw("#game-board");
}

function ScoreHandler(){

}

function ChangePlayer(previous : HTMLDivElement, current : HTMLDivElement ){
    Deselect(previous);
    Select(current);
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
