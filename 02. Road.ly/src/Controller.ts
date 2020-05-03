class Controller {
    PlayerControlledBall = { x: 0, y: 0, radius: 10, speed: 1 };
    constructor() {
        window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
    }
    onDeviceOrientationChange(e: any): void {
        this.ConsoleLogData(e);
    }
    private ConsoleLogData(e: any) {
        console.log(e.alpha, e.beta, e.gamma);
    }
}
