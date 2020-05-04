import { Controller } from "./Controller";
import { Timer } from "./Timer";
import { Renderer } from './Renderer';
import { Generator } from './Generator';

export class Game{

    state = {
        MENU: 0, RUNNING: 1, WON: 2, LOST: 3
    }

    controller: Controller;
    timer : Timer;
    renderer : Renderer;
    generator : Generator;

    constructor(){
        this.renderer = new Renderer("gameView");
        
        this.timer = new Timer();

        this.controller = new Controller();
        this.controller.setCanvasCTX(this.renderer.canvasCTX);

        this.generator = new Generator();    
    }

    Start(){
        this.Update();
    }

    Update(){
        this.controller.Update();
        this.renderer.Update();
        window.requestAnimationFrame(this.Update);
    }
    

}


