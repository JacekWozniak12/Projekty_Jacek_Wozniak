import { Controller } from "./Controller";
import { Timer } from "./Timer";
import { Renderer } from './Renderer';
import { GameBall, Drawable, DrawablePoint } from './GameObjects';
import { Physics } from "./Physics";

export enum State {
    MENU = 0, 
    RUNNING, 
    WON, 
    LOST
}

export class Game{

    state: State = State.RUNNING;
    controller: Controller;
    timer : Timer;
    renderer : Renderer;
    physics : Physics;
    generator : Generator;
    
    todefeat: number = 0;

    timeDisplay: string = "timer";
    timeBeforeChangeDisplay: string = "timer2";
    result: string = "result";
    rendererDisplay: string = "gameView";

    element_timeDisplay : HTMLElement;
    element_timeBeforeChangeDisplay : HTMLElement;
    element_result: HTMLElement;
    
    timePassed: number = 0;


    constructor(){       
        this.setup();
    }

    private setup(){
        this.renderer = new Renderer(this.rendererDisplay);
        
        this.element_timeBeforeChangeDisplay = document.
        querySelector("#" + this.timeBeforeChangeDisplay);
        this.element_timeDisplay = document.
        querySelector("#" + this.timeDisplay);
        this.element_result = document.
        querySelector("#" + this.result);

        this.timer = new Timer();
        this.physics = new Physics();

        for(let i = 20; i < 200; i += 20){
            this.AddBall(i, i);
            this.todefeat++;  
        }

        this.controller = new Controller(this.renderer.canvasCTX);
        this.renderer.addObjectToDraw(this.controller.playerControlledBall);
        this.physics.addObjectToHandle(this.controller.playerControlledBall);
    
    }

    private AddBall(x: number, y:number) {
        let ball = new GameBall(x, y, 10, this.renderer.canvasCTX);
        this.renderer.addObjectToDraw(ball);
        this.physics.addObjectToHandle(ball);
    }

    start(){
        this.howLongSinceColorChanged = 0;
        this.RandomizeColorOnObjects();
        this.update();
    }

    restart(){
        this.setup();
    }

    howLongSinceColorChanged : number;

    update(){
        if(this.state === State.RUNNING)
        {
            this.timer.update();
            this.objectColors();                     
            this.controller.update();
            this.physics.update();
            this.renderer.update();
            this.checkWinConditions();
            this.checkLoseConditions();
            if(isNaN(this.timePassed)) this.timePassed = 0;
            this.timePassed += this.timer.deltaTime;
            this.element_timeDisplay.innerHTML = ""+this.timePassed.toFixed(1);
            window.requestAnimationFrame(this.update.bind(this));
        }
    }
    
    checkWinConditions() {
        if(this.controller.playerControlledBall.eaten >= this.todefeat){
            this.state = State.WON;
            this.element_result.innerHTML = "Won";
        }
    }

    checkLoseConditions(){
        if(this.controller.playerControlledBall.defeated == true){
            this.state = State.LOST;
            this.element_result.innerHTML = "Lost";
        }
    }

    objectColors() {

        if(isNaN(this.howLongSinceColorChanged)){
            this.howLongSinceColorChanged = 0;
        }

        if(this.howLongSinceColorChanged >= 10){
            this.RandomizeColorOnObjects();
            this.howLongSinceColorChanged = 0;
        }
        else this.howLongSinceColorChanged = this.howLongSinceColorChanged + this.timer.deltaTime;

        let b = 10 - this.howLongSinceColorChanged;
        this.element_timeBeforeChangeDisplay.innerHTML = b.toFixed(2)+"";
    }

    private RandomizeColorOnObjects() {
        this.renderer.objectsToDraw.forEach(element => {
            let b = element as GameBall;
            b.randomizeColor();
        });
    }

    pause(){
        if(this.state === State.RUNNING) this.state = State.MENU
        else this.state = State.RUNNING;
    }

}


