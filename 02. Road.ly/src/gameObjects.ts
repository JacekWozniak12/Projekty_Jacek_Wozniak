export class Point  {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    CalculateDistance(to: Point): number {
        return Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2);
    }
}

export class DrawablePoint extends Point implements Drawable{
    
    canvasCTX: CanvasRenderingContext2D; 
    
    constructor(x: number, y:number, ctx: CanvasRenderingContext2D){
        super(x, y);
        this.canvasCTX = ctx;
    }

    Draw(){

    }

}

export class Circle extends DrawablePoint {
    radius: number;
    fill: string;
}

export class PlayerControlledBall extends Circle {
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
    Draw();
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
