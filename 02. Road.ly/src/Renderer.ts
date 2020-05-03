class Renderer {
    screenSize;
    canvas: HTMLCanvasElement;
    canvasCTX: CanvasRenderingContext2D;
    constructor(canvasID: string) {
        this.canvas = document.querySelector(canvasID);
        this.canvasCTX = this.canvas.getContext('2d');
    }
}
