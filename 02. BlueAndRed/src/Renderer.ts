import { Drawable, GameBall } from './GameObjects';

export class Renderer {
    screenSize = {x:800, y:600};
    
    canvas: HTMLCanvasElement;
    canvasCTX: CanvasRenderingContext2D;
    objectsToDraw: Drawable[];

    constructor(canvasName: string) {
        this.getCanvas(canvasName);
        this.setCanvasSize();
        this.objectsToDraw = new Array();
    }

    private getCanvas(canvasName: string) {
        this.canvas = document.querySelector("#" + canvasName);
        this.canvasCTX = this.canvas.getContext('2d');
    }

    private setCanvasSize() {
        this.canvas.width = this.screenSize.x;
        this.canvas.height = this.screenSize.y;
    }

    addObjectToDraw(object: Drawable){
        this.objectsToDraw.push(object);
    }

    start(){
        this.objectsToDraw.forEach(element => {
            element.canvasCTX = this.canvasCTX;
        });
    }

    update(){
        this.refresh();
        this.objectsToDraw.forEach(element => {
            element.draw();
        });
    };

    refresh(){
        this.canvasCTX.
        clearRect(0, 0, this.screenSize.x, this.screenSize.y);
    }
}

