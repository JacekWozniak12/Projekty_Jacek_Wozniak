import { Controller } from "./Controller";
import { Timer } from "./Timer";
import { Renderer } from './Renderer';
import { Generator } from './Generator';
import { CollisionHandler } from './GameObjects';

export class Game{

    state = {
        MENU: 0, RUNNING: 1, WON: 2, LOST: 3
    }

    controller: Controller;
    timer : Timer;
    renderer : Renderer;
    physics : Physics;
    generator : Generator;

    constructor(){
        this.renderer = new Renderer("gameView");
        
        this.timer = new Timer();
        this.physics = new Physics();

        this.controller = new Controller(
            this.renderer.screenSize.x/2, 
            this.renderer.screenSize.y/2
            );
        this.controller.setCanvasCTX(this.renderer.canvasCTX);

        this.renderer.addObjectToDraw(this.controller.playerControlledBall);
        this.physics.addObjectToHandle(this.controller.playerControlledBall);
    
        this.generator = new Generator();    
    }

    start(){
        this.update();
    }

    update(){
        console.log("test");
        this.controller.update();
        this.physics.update();
        this.renderer.update();
        window.requestAnimationFrame(this.update.bind(this));
    }
    
}

export class Physics{
    
    objectsToHandle: CollisionHandler[];

    constructor() {
        this.objectsToHandle = new Array();
    }

    addObjectToHandle(object: CollisionHandler){
        this.objectsToHandle.push(object);
    }

    update(){
        this.objectsToHandle.forEach(element => {
            element.calculateCollisionsWithCanvas();
        });
    };

}


