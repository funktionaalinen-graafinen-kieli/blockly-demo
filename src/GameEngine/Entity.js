export default class Entity {
    setVal(k,v) {
        var key = this.name+"_"+k
        eval("this."+k+" = \""+key+"\"")
        this.state.set(key,v)
    }

    constructor(name, state, values) {
        this.name = name
        this.state = state
        for (let [k,v] of values) {
            this.setVal(k,v)
        }
    }

}
