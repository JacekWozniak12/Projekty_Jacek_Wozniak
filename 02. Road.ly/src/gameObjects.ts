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
    }
}

export class Ball extends Circle implements CollisionHandler{
    static : boolean = false;
    weight : number = 1;

    speed: number = 5;
    destination: Point;

    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D)
    {
        super(x, y, radius, ctx);
        this.destination = new Point(this.randomizeDestination(1), this.randomizeDestination(1));
    }

    randomizeDestination(x : number) : number{
        return Math.random() * x * this.speed;
    }

    calculateCollision(){
        this.move();
        if(!this.static){
            this.calculateCollisionsWithCanvas();
            this.calculateCollisionsWithGameObject();
        }
    }

    move(){
        this.x += this.destination.x;
        this.y += this.destination.y;
    }

    spawn(point: Point){
        this.x = point.x;
        this.y = point.y;
    }

    calculateCollisionsWithGameObject(){

    }

    calculateCollisionsWithCanvas(){
        this.HandleXCanvas();
        this.HandleYCanvas(); 
    }

    private HandleYCanvas() {
        if ((this.destination.y + this.y) + this.radius > this.canvasCTX.canvas.height) {
            this.y = this.canvasCTX.canvas.height - this.radius;
            this.destination.y = this.randomizeDestination(-1);
        }
        else if ((this.destination.y + this.y) - this.radius < 0) {
            this.y = 0 + this.radius;
            this.destination.y = this.randomizeDestination(1);
        }
    }

    private HandleXCanvas() {
        if ((this.destination.x + this.x) + this.radius > this.canvasCTX.canvas.width) {
            this.x = this.canvasCTX.canvas.width - this.radius;
            this.destination.x = this.randomizeDestination(-1);
        }
        else if ((this.destination.x + this.x) - this.radius < 0) {
            this.x = 0 + this.radius;
            this.destination.x = this.randomizeDestination(1);
        }
    }
}

export class PlayerControlledBall extends Ball implements CollisionHandler {
    
    constructor(x, y, radius, ctx, speed){
        super(x, y, radius, ctx);
        this.speed = speed;
        this.destination = new Point(0, 0);
    }

    static: boolean = false;
    weight: number = 1;

    calculateCollision(){
        if(!this.static){
            this.calculateCollisionsWithCanvas();
            this.calculateCollisionsWithGameObject();
        }
    }

    calculateCollisionsWithCanvas(){
            if((this.destination.x + this.x) + this.radius > this.canvasCTX.canvas.width) 
                this.x = this.canvasCTX.canvas.width - this.radius;
            else
            if((this.destination.x + this.x) - this.radius < 0) 
                this.x = 0 + this.radius;
            
            if((this.destination.y + this.y) + this.radius > this.canvasCTX.canvas.height) 
                this.y = this.canvasCTX.canvas.height - this.radius;  
            else 
            if((this.destination.y + this.y) - this.radius < 0)
                this.y = 0 + this.radius;                   
    }

    calculateCollisionsWithGameObject(){
        return;
    }
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

export interface CollisionHandler{
    static: boolean;
    weight: number;

    calculateCollision();
    calculateCollisionsWithGameObject();
    calculateCollisionsWithCanvas();
}

export interface Pickable{
    canBePickedBy: Picker[];

    getPicked();
}

export interface Picker{
    pick();
}

export interface Collidable{
    collisionSpot;

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

export class CollisionTree{

}

export class CollisionBox{

}

