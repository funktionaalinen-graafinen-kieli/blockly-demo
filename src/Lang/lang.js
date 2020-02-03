// basic blocks
// each is a curried function

// HELPER FUNCTIONS
// functions used to simplify writing new functions

/**
    * removes \n
    */
export const cleanString = s => s.replace(/\/\n/g,"")

/**
    *
    */
export const infix = (op,x,y) => cat(wrap(x),op,wrap(y))

/**
    * Wrap a string in parens
    */
export const wrap = x => "("+x+")"
export const quote = x => "'"+x+"'"

/**
    * concatenate strings
    */
export const cat = (...xs) => xs.reduce((x,y) => String(x)+String(y),"")

// BASIC FUNCTIONS

export const id = x => x
export const add = x => y => infix("+",x,y)
export const sub = x => y => infix("-",x,y)
export const mul = x => y => infix("*",x,y)
export const gt = x => y => infix(">",x,y)
export const lt = x => y => infix("<",x,y)

// Trig
export const sin = x => cat("Math.sin",wrap(x))
/**
    * Curried functional -style conditional.
    * Feed it cond(condition)(do_branch)(else_branch)
    * @param b
    * @returns {function(*): function(*): string}
    */
export const cond = b => f => g => cat(b,"?",infix(":",f,g))

// state handling functions

/**
    * Stores a value with a name
    * or changes existing variable.
    */
export const mutate = name => val => "eval"+wrap(infix("=",name,val))

// GAMEENGINe
/**
    * Gets a value from the state map in GameEngine
    */
export const get = v => cat("s.get",wrap(quote(v)),"[1]")

// TODO document this func
export const timer = x => get("time") - x[1] >= x[2] ? [true,get("time"),x[2]] : [false,x[1],x[2]]

// packages a funklang function with all arguments
export const pack = f => cat("(x,s) => ",f)

// packages a funklang function which is missing one argument.
// applies 'x' as the missing argument
export const packF = f => cat("(x,s) => ",wrap(eval(f)),wrap('x'))
