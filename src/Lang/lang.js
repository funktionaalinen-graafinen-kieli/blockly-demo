// removes \n and runs eval
var makeJs = s => eval(s.replace(/\/\n/g,''));

// BASIC FUNCTIONS
var add = x => y => infix("+",x,y);

var sub = x => y => infix("-",x,y);

var gt = x => y => infix(">",x,y);

var lt = x => y => infix("<",x,y);

var cond = b => f => g => cat(b,"?",infix(":",f,g));

// STATE HANDLING FUNCTIONS

// Stores a value with a name
// or changes existing variable.
var mutate = name => val => "eval"+w(infix("=",name,val));

// name is the name of the Timer that setInterval returns.f is function to run. t is interval in ms
var timer = name => f => t => mutate(name)(cat("setInterval(eval(()=>",f,"),",t,")"));

// HELPER FUNCTIONS

var infix = (op,x,y) => cat(w(x),op,w(y));

// wrap in parens
var w = x => "("+x+")";

// concatenate strings
var cat = (...xs) => xs.reduce((x,y) => String(x)+String(y),"");
