class Point implements Drawable {
    x: number;
    y: number;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement){
        
    }

    CalculateDistance(to: Point): number {
        return Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2);
    }

    Draw(){

    }

    Refresh(){
        return;
    }
}

class Circle extends Point {
    radius: number;
}

class PlayerControlledBall extends Circle {
    speed: number;
}

class Item extends Circle {
    rank: number;
    score: number;
    time: number;
}

interface Drawable{
    canvas: HTMLCanvasElement;
    Draw();
    Refresh();
}

