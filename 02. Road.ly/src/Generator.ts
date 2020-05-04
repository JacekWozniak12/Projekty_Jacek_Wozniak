import { Point } from "./GameObjects";

export class Generator {
    AmountOfItems: number;
    MaxAmountOfItems: number;
    StartAmountOfItems: number;
    TimeBeforeNextSpawn: number;
    
    Generate(amount: number) {
        
        while(amount > 0){
            amount--;
            alert(amount);
        }
    }

    SpawnPlayer(position : Point){
        
    }

    

}
