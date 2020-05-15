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

    constructor(){       
        this.setup();
    }

    private setup(){
        this.renderer = new Renderer("gameView");

        this.timer = new Timer();
        this.physics = new Physics();

        this.controller = new Controller(this.renderer.canvasCTX);
        this.renderer.addObjectToDraw(this.controller.playerControlledBall);
        this.physics.addObjectToHandle(this.controller.playerControlledBall);
        
        for(let i = 20; i < 200; i += 20){
            this.AddBall(i, i);  
        }
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
            window.requestAnimationFrame(this.update.bind(this));
        }
    }
    
    checkWinConditions() {
        if(this.physics.objectsToHandle.length <= 1){
            this.state = State.WON;
            // SET INFO
        }
    }

    checkLoseConditions(){
        if(this.controller.playerControlledBall.defeated == true){
            this.state = State.LOST;
            // SET INFO
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
        else this.howLongSinceColorChanged = this.howLongSinceColorChanged as number + this.timer.deltaTime as number;
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


