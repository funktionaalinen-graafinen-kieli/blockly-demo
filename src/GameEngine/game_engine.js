import React from "react"
import Entity from "./Entity.js"
import {frameTime} from "./utils"

const GAMESTYLE = {backgroundColor: "green", width: "100%", height: "100%"}

class MapWithDefault extends Map {
    get(key) {
        if (!this.has(key)) return this.default()
        return super.get(key)
    }
  
    constructor(defaultFunction, entries) {
        super(entries)
        this.default = defaultFunction
    }
}

export default class GameEngine extends React.Component {
    constructor(props) {
        super(props)

        this.state = {toggle: props.toggle, gameState: new MapWithDefault(()=> [(x,s)=>x,false]), entities: [], keymap: new Map()}
        console.log(this.props.objectList)
        this.gameArea = React.createRef()
    }

    getVal = name => this.state.gameState.get(name)[1]


    componentDidMount() {
        const entities = this.props.objectList["entities"]
        Object.keys(entities).forEach(entityName => {
            this.state.entities.push(new Entity(this.state.gameState, entityName, entities[entityName]))
        })

        const binds = this.props.objectList["binds"]
        Object.keys(binds).forEach(eventName => {
            this.state.gameState.set(eventName,binds[eventName])
        })
        //this.state.gameState.setDefault = key => [(x,s) => x,false]
        console.log(this.state.gameState.get("key_a"))
        //this.props.addEvents(this.state.gameState,this.timer)
        /* TODO: Should the component actually run itself? The more react way
           Would be for the component's owner component to call for updates */
        this.run()
    }

    updateState = (k, v) => {
        this.setState({state:this.state.gameState.set(k,[v[0],this.applyF(k,this.state.gameState)])})
    }

    update() {
        for (let [key, value] of this.state.gameState) {
            this.saveKeysToState()
            this.updateState(key,value)
        }
    }

    applyF(key,state) {
        let p = state.get(key)
        return p[0](p[1],state)
    }

    run = async () =>  {
        setInterval(()=>{
            this.update()
        }, frameTime)
    }

    handleKeyDown = (e) => {
        this.state.keymap.set(e.key,true)
        //console.log("down",e.key)
    }

    handleKeyUp = (e) => {
        this.state.keymap.set(e.key,false)
        //console.log("up",e.key)
    }

    saveKeysToState = () => {
        Array.from(this.state.keymap,([k,v]) => this.state.gameState.set("key_"+k,[(x,s) => x, v]))
        //console.log(this.state.gameState)
    }

    clamp = (num, min, max) => {
        return num <= min ? min : num >= max ? max : num
    }

    render() {
        // TODO: Why? Props should be immutable
        this.props.setState(this.state.gameState)
        if (!this.state.entities.length) return null
        return (
            <div style={GAMESTYLE}
                ref={this.gameArea}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                tabIndex="0"
            >
                {
                    this.state.entities.map((entity,key) =>
                        <div key={key}>
                            <img
                                style={{
                                    width: 50, height: 50, position:"absolute",
                                    left: this.clamp(window.innerWidth*(this.getVal(entity.x)/1000),0,300),
                                    top: this.clamp(window.innerHeight*(this.getVal(entity.y)/1000),0,300)
                                }}
                                src={this.getVal(entity.img)}
                                alt=""
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}
