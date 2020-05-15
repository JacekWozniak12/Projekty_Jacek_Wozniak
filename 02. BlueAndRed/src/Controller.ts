import { PlayerControlledBall, Point } from './GameObjects';

export class Controller {
    
    playerControlledBall : PlayerControlledBall;
    
    constructor(canvasCTX : CanvasRenderingContext2D) {
        this.playerControlledBall = new PlayerControlledBall(
            canvasCTX.canvas.width/2, 
            canvasCTX.canvas.height/2, 
            30, 
            canvasCTX, 
            0.1);
        window.
        addEventListener(
            'deviceorientation', 
            ((event: CustomEvent) => {
                this.onDeviceOrientationChange(event);
            }) as EventListener, true);
    }

    onDeviceOrientationChange(e: any): void {
        this.playerControlledBall.destination = 
        new Point(
            e.alpha * this.playerControlledBall.speed, 
            e.beta * this.playerControlledBall.speed
            );
    }

    update(){
        this.playerControlledBall.x += this.playerControlledBall.destination.x;
        this.playerControlledBall.y += this.playerControlledBall.destination.y;
    }
}
