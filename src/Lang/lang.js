// basic blocks
// each is a curried function
export default class Lang {

    static add = x => y => "(" + x + ")+(" + y + ")"

    static cond = b => f => g => b + "?" + f + ":" + g

    static gt = x => y => "(" + x + ")>(" + y + ")"

    // state handling functions

    // p must be string
    static mutate = p => v => "eval(" + p + "=" + v + ")"

    // p and f are strings
    static timer = p => f => t => mutate(p)("setInterval(eval(()=>" + f + ")," + t + ")")
}
