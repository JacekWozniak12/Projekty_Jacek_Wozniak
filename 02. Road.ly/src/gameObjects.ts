class Point {
    x: number;
    y: number;
    
    CalculateDistance(to: Point): number {
        return 0;
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
