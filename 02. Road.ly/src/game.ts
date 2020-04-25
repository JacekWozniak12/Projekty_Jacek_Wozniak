class Game{

    controller : Controller;
    timer : Timer;
    renderer : Renderer;
    generator : Generator;

    constructor(){
        this.timer = new Timer();
        this.controller = new Controller();
        this.renderer = new Renderer();
        this.generator = new Generator();

        
    }

    Start(){
        // generate level
        this.GameLoop();
    }

    GameLoop(){
        
        window.requestAnimationFrame(this.GameLoop)
    }

    Finish(){
        // handle finish state
    }

    Pause(){
        
    }

}

class Renderer{

}

class Controller{

    PlayerControlledBall = {x: 0, y: 0, radius: 10, speed: 1 };

    constructor(){
        window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
    }

    onDeviceOrientationChange(e : any) : void{
        this.ConsoleLogData(e);
    }

    private ConsoleLogData(e: any) {
        console.log(e.alpha, e.beta, e.gamma);
    }
}

class Timer{
    private timeLeft : number;

    AddTime(value : number) : number{
        this.timeLeft += value;
        return this.timeLeft;
    }

}

class Generator{
    
    AmountOfItems : number;
    MaxAmountOfItems : number;
    StartAmountOfItems : number;
    TimeBeforeNextSpawn : number;
    
    Generate(amount : number){

    }





}




