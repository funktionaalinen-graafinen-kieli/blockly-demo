export default class Entity {
    setVal(k,v) {
        const key = this.name+"_"+k
        // No idea why `this.k = key` fails when the below doesn't
        this[k] = key
        //console.warn("state",this.state)
        this.state.set(key,v)
    }

    constructor(state, name, vars) {
        this.name = name
        this.state = state
        Object.keys(vars).forEach(k => {
            this.setVal(k,vars[k])
        })
    }
}
