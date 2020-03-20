/**
 * Evaluate a javascript statement with Lang's context
 */
export const langEval = code => eval(eval(code))

// HELPER FUNCTIONS
// functions used to simplify writing new functions

/**
 * Returns a string without newlines ("\n")
 */
export const cleanString = s => s.replace(/\/\n/g, "")

/**
 *
 */
export const infix = (op, x, y) => cat(wrap(x), op, wrap(y))

/** Wrap a string in parens */
export const wrap = x => "(" + x + ")"
/** Wrap a string in quotes */
export const quote = x => "'" + x + "'"

/**
 * concatenate strings
 */
export const cat = (...xs) => xs.reduce((x, y) => String(x) + String(y), "")

// BASIC FUNCTIONS

export const id = x => x

export const add = x => y => `Number(${infix("+", x, y)})`
export const sub = x => y => `Number(${infix("-", x, y)})`
export const mul = x => y => `Number(${infix("*", x, y)})`
export const div = x => y => `Number(${infix("/", x, y)})`
export const mod = x => y => `Number(${infix("%", x, y)})`

export const rand = x => `Math.random()`

export const gt = x => y => infix(">", x, y)
export const lt = x => y => infix("<", x, y)
export const geq = x => y => infix(">=", x, y)
export const leq = x => y => infix("<=", x, y)
export const eq = x => y => infix("==", x, y)
export const neq = x => y => infix("!=", x, y)

export const and = x => y => infix("&&", x, y)
export const or = x => y => infix("||", x, y)

export const clamp = num => min => max => `(${num} <= ${min} ? ${min} : ${num} >= ${max} ? ${max} : ${num})`

/** Trig */
export const sin = x => cat("Math.sin", wrap(x))
export const cos = x => cat("Math.cos", wrap(x))
export const tan = x => cat("Math.tan", wrap(x))
/**
 * Curried functional -style conditional.
 * Feed it cond(condition)(do_branch)(else_branch)
 * @param b
 * @returns {function(*): function(*): string}
 */
export const cond = b => f => g => cat(b, "?", infix(":", f, g))

// state handling functions

/**
 * Stores a value at key name or
 * replace old value at key name with new value.
 */
export const mutate = name => val => "eval" + wrap(infix("=", name, val))

// GameEngine utils
/**
 * Gets a value from the state map in GameEngine
 */
export const get = v => cat("s.get", wrap(quote(v)), "[1]")

// TODO: document this func
export const timer = x => (get("time") - x[1] >= x[2] ? [true, get("time"), x[2]] : [false, x[1], x[2]])

//const col1 = (x1,y1,h1,w1,x2,y2,h2,w2) => `${x1}<${x2}&&${x2}<${x1}+${w1} ? ${y1}<${y2}&&${y2}<${y1}+${h1} || ${y1}<${y2}+${h2}&&${y2}+${h2}<${y1}+${h1} : ${y1}<${y2}&&${y2}<${y1}+${h1} || ${y1}<${y2}+${h2}&&${y2}+${h2}<${y1}+${h1}`
//const colh = e1 => e2 => col1(get(e1+'_x'),get(e1+'_y'),get(e1+'_h'),get(e1+'_w'),get(e2+'_x'),get(e2+'_y'),get(e2+'_h'),get(e2+'_w'))

// tweak hitbox by adding offset based on height and width
export const col = e1 => e2 => col1(
    get(e1+'_x'),
    //add(get(e1+'_y'))(div(get(e1+'_h'))(5)),
    get(e1+'_y'),
    get(e1+'_r'),
    get(e2+'_x'),
    //add(get(e2+'_y'))(div(get(e2+'_h'))(5)),
    get(e2+'_y'),
    get(e2+'_r')
)
// helper functions for col
const col1 = (x1,y1,r1,x2,y2,r2) => `${disth(x1,y1,x2,y2)}<${r1}+${r2}`

export const dist = e1 => e2 => disth(get(e1+'_x'),get(e1+'_y'),get(e2+'_x'),get(e2+'_y'))
const disth = (x1,y1,x2,y2) => `Math.sqrt(Math.pow(${x1}-${x2},2)+Math.pow(${y1}-${y2},2))`

// packages a funklang function with all arguments
export const pack = f => cat("(x,s) => ", f)

// packages a funklang function which is missing one argument.
// applies 'x' as the missing argument
export const packF = f => cat("(x,s) => ", wrap(eval(f)), wrap("x"))
