// basic blocks
// each is a curried function
class Lang {

    static add = x => y => "(" + x + ")+(" + y + ")"

    /**
     * Curried functional -style conditional.
     * Feed it cond(condition)(do_branch)(else_branch)
     * @param b
     * @returns {function(*): function(*): string}
     */
    static cond = b => f => g => b + "?" + f + ":" + g

    static gt = x => y => "(" + x + ")>(" + y + ")"

    // state handling functions

    // p must be string
    static mutate = p => v => "eval(" + p + "=" + v + ")"

    // p and f are strings
    static timer = p => f => t => Lang.mutate(p)("setInterval(eval(()=>" + f + ")," + t + ")")
}

export {Lang}