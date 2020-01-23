// simply returns the previous value (use when you do not want a variable to change)
let id = (x,s) => x;

let getVal = name => state.get(name)[1];

// Engine
const frameTime = 1000 / 60; //60fps in ms
var state = new Map();

var e = new Entity("e", state, [
    ["x",[(x,s) => s.get('everySecond')[1][0] ? x+1 : x,1]],
    ["y",[id,1]],
    ["img",[id,"/path/to/img"]]
    ]);

var checkTime = (time,prev,interval) =>
    time - prev >= interval;

var timer = (x,s) => 
    getVal("time") - x[1] >= x[2] ? [true,getVal("time"),x[2]] : [false,x[1],x[2]]

//var timer = (name,offset,interval)

// Each global variable has a name and a pair containing its state transition function and current value.
// (name, [ function of (val, state) -> newVal, currentValue ])
state.set("frameTime",[id,frameTime]);
state.set("time",[(x,s) => x+s.get('frameTime')[1],0]);
state.set("everySecond",[timer,[false,0,1000]]);


// apply the state transition function of a value to its current value and return the result
function applyF(key,state) {
    //store the pair
    let p = state.get(key);

    // apply the function to its value
    return p[0](p[1],state);
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// call like this:
//      await sleep(2000);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    while (true) {
        var nextState = new Map();
        // iterates through all key-value pairs in state
        for (let [key, value] of state) {
            //console.log(key + ' = ' + value[1]); // for testing
            // puts the new pair into nextState
            nextState.set(key, [value[0], applyF(key,state)]);
        }
        state = nextState; // nextState replaces previous
        await sleep(frameTime);
        //await sleep(100); //for testing
    }
}
