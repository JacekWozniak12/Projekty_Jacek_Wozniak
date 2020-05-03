class Game{

    state = {
        MENU: 0, RUNNING: 1, WON: 2, LOST: 3
    }

    controller : Controller;
    timer : Timer;
    renderer : Renderer;
    generator : Generator;

    constructor(){
        this.timer = new Timer();
        this.controller = new Controller();
        this.renderer = new Renderer("gameView");
        this.generator = new Generator();    
    }

}


