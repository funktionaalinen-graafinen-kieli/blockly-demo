export default class Entity {
    name
    x
    y
    w
    h
    img
    text
    setVal(k, v) {
        const key = this.id + "_" + k
        // No idea why `this.k = key` fails when the below doesn't
        this[k] = key
        //console.warn("state",this.state)
        this.state.set(key, v)
    }

    constructor(state, id, vars) {
        this.id = id
        this.state = state
        Object.keys(vars).forEach(k => {
            this.setVal(k, vars[k])
        })
    }
}
