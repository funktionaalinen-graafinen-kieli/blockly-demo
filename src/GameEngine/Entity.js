export default class Entity {
    setVal(k,v) {
        let key = this.name+"_"+k
        eval("this."+k+" = \""+key+"\"")
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
