// removes \n and runs eval
var makeJs = s => eval(s.replace(/\/\n/g,''));

// BASIC FUNCTIONS
// each is a curried function
var add = x => y => infix("+",x,y);

var sub = x => y => infix("-",x,y);

var gt = x => y => infix(">",x,y);

var lt = x => y => infix("<",x,y);

var cond = b => f => g => infix("?",b,infix(":",f,g));

// STATE HANDLING FUNCTIONS

// Stores a value with a name
// or changes existing variable.
var mutate = name => val => "eval"+w(infix("=",name,val));

// 
var timer = name => f => t => mutate(p)(cat("setInterval(eval(()=>",f,"),",t,")"));

// HELPER FUNCTIONS

var infix = (op,x,y) => cat(w(x),op,w(y));

// wrap in parens
var w = x => "("+x+")";

// concatinate strings
var cat = (...xs) => xs.reduce((x,y) => String(x)+String(y),"");
