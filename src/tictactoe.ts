class Board{  

    cells: Cell[] = new Array();
    playerTurn: number;
    winner: number;
    movesAmount : number = 0;

    constructor(){
        this.playerTurn = Math.random() + 1;
    }

    Draw(htmlElement: string){
        
        const element_GameBoard = document.querySelector(htmlElement);
        
        for(let i = 0; i < 9; i++){

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
    }

    SelectCell(){    
        this.CheckIfFinished();
        this.CurrentPlayer();
    }

    CurrentPlayer(){
        this.playerTurn != 1 ? 1 : 2
        this.movesAmount++;
    }

    CheckIfFinished() : boolean{
        if(this.movesAmount > 8){
            this.DisplayDraw();
        }
        else{
            return false
        }
    }

    DisplayDraw(){
        alert("Draw");
    }
}

class Cell{

    content: string;
    representation: HTMLElement;

    DrawContent(){
        this.representation.innerHTML == 't';
    }

}

const element_Score_P1 = document.querySelector("player1-score");
const element_Score_P2 = document.querySelector("player2-score");

function GameHandler(){
    const gameBoard = new Board;
    gameBoard.Draw("#game-board");
}

function ScoreHandler(){

}

GameHandler();