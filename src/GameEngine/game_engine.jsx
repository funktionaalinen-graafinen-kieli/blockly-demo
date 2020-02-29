import React from "react"
import PropTypes from "prop-types"

import Entity from "./entity.js"
import evalFunc from "../Lang/eval_func"
import { renderGame } from "./render_game"

export class MapWithDefault extends Map {
    get(key) {
        if (!this.has(key)) return this.defaultValue
        return super.get(key)
    }

    constructor(defaultValue, entries) {
        super(entries)
        this.defaultValue = defaultValue
    }
}

export default class GameEngine extends React.Component {
    gameArea = React.createRef()
    state = {
        gameState: new MapWithDefault(false),
        entities: [],
        updater: null,
        keymap: new Map(),
        code: null,
    }

    renderCode() {
        this.setState({ code:this.props.program })
        let parsedObjectList
        try {
            parsedObjectList = evalFunc(this.props.program)
        } catch (error) {
            console.debug("This should never happen with the blocks generating the json")
            console.debug("Caught error in parsing block json")
            console.debug(error)
            this.setState({ updater: this.props.updater(this) })
            return
        }

        const entities = parsedObjectList["entities"]
        Object.keys(entities).forEach(entityName => {
            this.state.entities.push(new Entity(this.state.gameState, entityName, entities[entityName]))
        })

        const binds = parsedObjectList["binds"]
        Object.keys(binds).forEach(eventName => {
            this.state.gameState.set(eventName, binds[eventName])
        })
    }


    componentDidMount() {
        this.setState({ updater: this.props.updater(this) })
    }

    //FIXME: This doesn't actually unmount the timer
    /*componentWillUnmount() {
        clearInterval(this.props.updater(this))
    }*/

    getVal = name => this.state.gameState.get(name)[1]

    applyF(key, state) {
        let p = state.get(key)
        return p[0](p[1], state)
    }

    handleKeyDown = e => {
        this.state.keymap.set(e.key, true)
    }

    handleKeyUp = e => {
        this.state.keymap.set(e.key, false)
    }

    update() {
        let newState = new MapWithDefault(false, this.state.gameState)

        for (let [key, value] of this.state.gameState) {
            newState.set(key, [value[0], this.applyF(key, this.state.gameState)])
        }

        Array.from(this.state.keymap, ([k, v]) => { newState.set("key_" + k, [(x, _) => x, v]) })
        this.setState({ gameState: newState })
    }

    render() {
        if(this.state.code !== this.props.program){
            this.setState({
                gameState: new MapWithDefault(false),
                entities: [],
                updater: null,
                keymap: new Map(),
                code: null
            },()=>this.renderCode())
        }
        if (!this.props.toggle) return null
        if (!this.state.entities.length) return null

        return renderGame(this.props.debugToggle, this)
    }
}
GameEngine.propTypes = {
    debugToggle: PropTypes.bool.isRequired,
    program: PropTypes.any.isRequired,
    toggle: PropTypes.bool.isRequired,
    updater: PropTypes.func.isRequired
}
