import { PlayerControlledBall, Point } from './GameObjects';

export class Controller {
    
    playerControlledBall : PlayerControlledBall;
    
    constructor(x: number, y: number) {
        this.playerControlledBall = 
        new PlayerControlledBall(x, y, 50, null, 0.01);
        window.
        addEventListener(
            'deviceorientation', 
            ((event: CustomEvent) => {
                this.onDeviceOrientationChange(event);
            }) as EventListener, true);
    }

    setCanvasCTX(canvasCTX : CanvasRenderingContext2D){
        this.playerControlledBall.canvasCTX = canvasCTX;
    }

    onDeviceOrientationChange(e: any): void {
        console.log(this);
        this.playerControlledBall.destination = 
        new Point(
            e.alpha * this.playerControlledBall.speed, 
            (e.beta - 45) * this.playerControlledBall.speed
            );
    }

    update(){
        this.playerControlledBall.x += this.playerControlledBall.destination.x;
        this.playerControlledBall.y += this.playerControlledBall.destination.y;
    }
}
