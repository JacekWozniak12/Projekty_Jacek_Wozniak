class Game{

    Start(){
        // handle player input
        this.GameLoop();
    }

    GameLoop(){

        window.requestAnimationFrame(this.GameLoop)
    }

    Finish(){

    }

    Pause(){

    }

}

class Renderer{

}

class Controller{

}

class Point {
    x : number;
    y : number;
}

class Circle extends Point{
    radius : number;
}


class PlayerControlledBall extends Circle{
    //
}

class Item extends Circle{

}

class Timer{
    //
}





