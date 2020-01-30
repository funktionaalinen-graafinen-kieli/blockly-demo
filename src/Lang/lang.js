// basic blocks
// each is a curried function
class Lang {
    
    // HELPER FUNCTIONS
    // functions used to simplify writing new functions

    /**
     * removes \n
     */
    static cleanString = s => s.replace(/\/\n/g,"");

    /**
     *
     */
    static infix = (op,x,y) => this.cat(this.wrap(x),op,this.wrap(y));

    /**
     * Wrap a string in parens
     */
    static wrap = x => "("+x+")";

    /**
     * concatenate strings
     */
    static cat = (...xs) => xs.reduce((x,y) => String(x)+String(y),"");

    // BASIC FUNCTIONS

    static add = x => y => this.infix("+",x,y);
    static sub = x => y => this.infix("-",x,y);
    static gt = x => y => this.infix(">",x,y);
    static lt = x => y => this.infix("<",x,y);

    /**
     * Curried functional -style conditional.
     * Feed it cond(condition)(do_branch)(else_branch)
     * @param b
     * @returns {function(*): function(*): string}
     */
    static cond = b => f => g => this.cat(b,"?",this.infix(":",f,g));

    // state handling functions

    /**
     * Stores a value with a name
     * or changes existing variable.
     */
    static mutate = name => val => "eval"+this.wrap(this.infix("=",name,val));

    /**
     * Gets a value from the global state map in GameEngine
     */
    static get = v => this.cat("getVal",this.wrap(v));
}

exports.Lang = Lang;
