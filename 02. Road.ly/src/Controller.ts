import { PlayerControlledBall, Point } from './GameObjects';

export class Controller {
    
    playerControlledBall : PlayerControlledBall;
    
    constructor() {
        this.playerControlledBall = new PlayerControlledBall(0, 0, null);
        window.addEventListener('deviceorientation', this.onDeviceOrientationChange, true);
    }

    setCanvasCTX(canvasCTX : CanvasRenderingContext2D){
        this.playerControlledBall.canvasCTX = canvasCTX;
    }

    onDeviceOrientationChange(e: any): void {
        this.ConsoleLogData(e);
        this.playerControlledBall.destination = new Point(e.alpha, e.beta);
    }

    ConsoleLogData(e: any) : void{
        console.log(e.alpha, e.beta, e.gamma);
    }

    Update(){
        
    }
}
