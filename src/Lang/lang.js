class Entity {
    constructor(x, y, t) {
        this.x = x;
        this.y = y;
    }
}

var e = new Entity(1,-1);
var t;

// basic blocks
// each is a curried function
var add = x => y => "("+x+")+("+y+")";

var cond = b => f => g => b+"?"+f+":"+g;

var gt = x => y => "("+x+")>("+y+")";

// state handling functions

// p must be string
var mutate = p => v => "eval("+p+"="+v+")";

// p and f are strings
var timer = p => f => t => mutate(p)("setInterval(eval(()=>"+f+"),"+t+")");
