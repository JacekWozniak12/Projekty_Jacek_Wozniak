import { Physics } from './Physics';
export class Point  {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    calculateDistance(to: Point) : number {
        return Math.sqrt(Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2));
    }
}

export class DrawablePoint extends Point implements Drawable{
    
    canvasCTX: CanvasRenderingContext2D; 
    
    colorValue: string = "#ccc"; 

    constructor(x: number, y:number, ctx: CanvasRenderingContext2D){
        super(x, y);
        this.canvasCTX = ctx;
    }

    draw(){
        this.canvasCTX.fillStyle = this.colorValue;
        this.canvasCTX.fillRect(1,1,1,1);
    }

}

export class Circle extends DrawablePoint {
    CIRCLE_CALC = 2 * Math.PI;
    radius: number;
    fill: string;
    colorValue = "#000";
    redValue = "#a00";
    blueValue = "#00a";

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
        this.canvasCTX.fillStyle = this.colorValue;
        this.canvasCTX.fill();
    }
}

export class GameBall extends Circle implements CollisionHandler{
    static : boolean = false;
    weight : number = 1;

    speed: number = 5;
    defeated: boolean = false;
    destination: Point;

    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D)
    {
        super(x, y, radius, ctx);
        this.destination = new Point(this.randomizeDestination(1), this.randomizeDestination(1));
    }

    randomizeDestination(x : number) : number{
        return Math.random() * x * this.speed;
    }

    calculateCollision(physics: Physics){
        this.move();
        if(!this.static){
            this.calculateCollisionsWithCanvas();
            this.calculateCollisionsWithGameObject(physics);
        }
    }

    move(){
        this.x += this.destination.x;
        this.y += this.destination.y;
    }

    calculateCollisionsWithGameObject(physics: Physics){
        physics.objectsToHandle.forEach(element => {
            if(this == element){
            }
            else{
            let a = element.calculateDistance(new Point(this.x, this.y));
            let b = element as GameBall;
            if(Math.abs(a) - this.radius - b.radius <= 0){
                console.log(a);
                this.destination.x = this.clamp(this.x - element.x, -1, 1);
                this.destination.y = this.clamp(this.y - element.y, -1, 1);
            }
        }
        });
    }

    clamp(value: number, min : number, max: number) : number{
        if(value < min) return min;
        if(value > max) return max;
        return value;
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

    randomizeColor(){
        if(this.defeated){
            return;
        }
        else
        switch(Math.round(Math.random())){
            case 0: this.setColor(this.redValue);
            break;
            case 1: this.setColor(this.blueValue);
            break;
            default: return;
        }
    }

    setColor(colorValue : string) {
        this.colorValue = colorValue;
    }
}

export class PlayerControlledBall extends GameBall implements CollisionHandler {
    
    constructor(x, y, radius, ctx, speed){
        super(x, y, radius, ctx);
        this.speed = speed;
        this.destination = new Point(0, 0);
    }

    static: boolean = false;
    weight: number = 1;
    eaten: number = 0;

    calculateCollision(physics: Physics){
        if(!this.static){
            this.calculateCollisionsWithCanvas();
            this.calculateCollisionsWithGameObject(physics);
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

    calculateCollisionsWithGameObject(physics: Physics){
        physics.objectsToHandle.forEach(element => {
            if(this == element){
            }
            else{
                let a = element.calculateDistance(new Point(this.x, this.y));
                let b = element as GameBall;
            if(Math.abs(a) - this.radius - b.radius <= 0){
                this.eat(b);
            }
        }
        });
    }

    eat(ball : GameBall){
        if(this.colorValue == ball.colorValue && ball.defeated == false){
            ball.defeated = true;
            ball.setColor("#fff");
            this.eaten++;
        }
        else {
            if(ball.defeated == false) this.defeated = true;
        }
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

export interface CollisionHandler extends Point{
    static: boolean;
    weight: number;

    calculateCollision(physics: Physics);
    calculateCollisionsWithGameObject(physics: Physics);
    calculateCollisionsWithCanvas();
}

export interface Pickable{
    canBePickedBy: Picker[];

    getPicked();
}

export interface Picker{
    pick();
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


