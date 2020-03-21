class Board{  

    cells: Cell[];
    playerTurn: number;
    movesAmount = 0;

    Draw(htmlElement: string){
        const element_GameBoard = document.querySelector(htmlElement);
        for(let i = 0; i < 9; i++){
            let el = document.createElement("p");
            el.className = "cell cell" + i;
            element_GameBoard.appendChild(el);
        }
    }

    CurrentPlayer(){
        this.playerTurn != 1 ? 1 : 2
    }

    SelectCell(){
        //
    }

    CheckIfFinished() : boolean{
        if(this.movesAmount > 8) return true;
        else{
            return false
        }
    }
}

class Cell{

    content: string;
    representation: HTMLElement;

    DrawContent(){
        this.representation.innerHTML == '';
    }


}

const element_Score_P1 = document.querySelector("player1-score");
const element_Score_P2 = document.querySelector("player2-score");

const gameBoard = new Board;
gameBoard.Draw("#game-board");