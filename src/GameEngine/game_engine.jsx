import React from "react"
import PropTypes from "prop-types"

import Entity from "./entity.js"
import evalFunc from "../Lang/eval_func"
import { renderGame } from "./render_game"

export class MapWithDefault extends Map {
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
    gameArea = React.createRef()
    state = {
        gameState: new MapWithDefault(() => [(x, s) => x, false]),
        entities: [],
        updater: null,
        keymap: new Map()
    }

    componentDidMount() {
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

        this.setState({ updater: this.props.updater(this) })
    }

    componentWillUnmount() {
        this.state.updater.then(val => clearInterval(val))
    }

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
        let newState = new MapWithDefault(() => [(x, s) => x, false], this.state.gameState)

        for (let [key, value] of this.state.gameState) {
            newState.set(key, [value[0], this.applyF(key, this.state.gameState)])
        }

        Array.from(this.state.keymap, ([k, v]) => { newState.set("key_" + k, [(x, _) => x, v]) })

        this.setState({gameState: newState})
    }

    render() {
        // console.warn('gameboard:',gameboard)
        if (!this.props.toggle) return null
        if (!this.state.entities.length) return null

        return renderGame(this)
    }
}
GameEngine.propTypes = {
    program: PropTypes.any.isRequired,
    toggle: PropTypes.bool.isRequired,
    updater: PropTypes.func.isRequired
}
