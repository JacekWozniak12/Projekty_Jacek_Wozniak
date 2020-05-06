export class Point  {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    calculateDistance(to: Point): number {
        return Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2);
    }
}

export class DrawablePoint extends Point implements Drawable{
    
    canvasCTX: CanvasRenderingContext2D; 
    
    constructor(x: number, y:number, ctx: CanvasRenderingContext2D){
        super(x, y);
        this.canvasCTX = ctx;
    }

    draw(){
        this.canvasCTX.fillRect(25,25,100,100);
    }

}

export class Circle extends DrawablePoint {
    CIRCLE_CALC = 2 * Math.PI;
    radius: number;
    fill: string;

    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D){
        super(x, y, ctx);
        this.radius = radius;
    }

    draw(){
        this.canvasCTX.beginPath();
        this.canvasCTX.arc(
            this.x, 
            this.y,
            this.radius,
            0,
            this.CIRCLE_CALC);
        this.canvasCTX.stroke();
        console.log(this.x + " " + this.y);
    }
}

export class PlayerControlledBall extends Circle {
    constructor(x, y, radius, ctx, speed){
        super(x, y, radius, ctx);
        this.speed = speed;
        this.destination = new Point(0, 0);
    }
    speed: number;
    destination: Point;
}

export class Item extends Circle {
    rank: number;
    score: number;
    time: number;
}

export interface Drawable{
    canvasCTX: CanvasRenderingContext2D;
    draw();
}

export interface Collidable{
    collisionSpot;

}

export class CollisionTree{

}

export class CollisionBox{

}

export class Rectangle{
    X: Point;
    Y: Point;
    U: Point;
    V: Point;

    constructor(X: Point, Y: Point){
        this.X = X;
        this.Y = Y;
        this.U = new Point(Y.x, X.y);
        this.V = new Point(X.x, Y.y);
    }
}
