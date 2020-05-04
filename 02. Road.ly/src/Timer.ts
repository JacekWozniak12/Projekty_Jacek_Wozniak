export class Timer {
    
    private timeLeft: number;
    
    AddTime(value: number): number {
        this.timeLeft += value;
        return this.timeLeft;
    }

    
}
