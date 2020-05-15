export class Timer {
    
    private timeLeft: number;
    private previousDate: number;

    deltaTime: number;

    update(){
        this.deltaTime = (Date.now() - this.previousDate) / 1000;
        this.previousDate = Date.now();
    } 

    addTime(value: number): number {
        this.timeLeft += value;
        return this.timeLeft;
    }

    
}
