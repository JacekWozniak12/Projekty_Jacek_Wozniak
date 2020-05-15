import { CollisionHandler } from './GameObjects';

export class Physics {
    objectsToHandle: CollisionHandler[];
    constructor() {
        this.objectsToHandle = new Array();
    }
    addObjectToHandle(object: CollisionHandler) {
        this.objectsToHandle.push(object);
    }
    update() {
        this.objectsToHandle.forEach(element => {
            element.calculateCollision(this);
        });
    }
    ;
}
