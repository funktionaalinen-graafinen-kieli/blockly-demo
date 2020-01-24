// Class to test out lang features
import {Lang} from "lang"

class Entity {
    constructor(x, y, t) {
        this.x = x;
        this.y = y;
    }
}

let e = new Entity(1,-1)
Lang.gt(e, 0)
