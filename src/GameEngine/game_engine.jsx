import React from "react"
import PropTypes from "prop-types"

import Entity from "./entity.js"
import evalFunc from "../Lang/eval_func"
import { RenderGame } from "./render_game"
import { FunklyContext } from "../Store/funkly_store"

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


export const evalProgram = (program) => {
    const gameState = new MapWithDefault(false, [])
    let parsedObjectList
    try {
        parsedObjectList = evalFunc(program)
    } catch (error) {
        console.debug("Program for game was invalid JSON")
        console.debug(program)
        console.debug("This should never happen with the blocks generating the json")
        console.debug(error)
        return [[], []]
    }
    const parsedEntities = parsedObjectList["entities"]
    const entities = []
    Object.keys(entities).forEach(entityId => {
        entities.push(new Entity(gameState, entityId, parsedEntities[entityId]))
    })

    const binds = parsedObjectList["binds"]
    Object.keys(binds).forEach(eventName => {
        gameState.set(eventName, binds[eventName])
    })
    return [entities, gameState]
}

export default class GameEngine extends React.Component {
    constructor(props) {
        super(props)
        this.gameArea = React.createRef()

        console.info(props.program)
        const [entities, gameState] = evalProgram(props.program)

        this.state = {
            entities: entities,
            gameState: gameState, 
            updater: this.props.updater(this),
            keymap: new Map(),
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.updater)
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
        let newState = new MapWithDefault(false, this.state.gameState)

        for (let [key, value] of this.state.gameState) {
            newState.set(key, [value[0], this.applyF(key, this.state.gameState)])
        }

        Array.from(this.state.keymap, ([k, v]) => { newState.set("key_" + k, [(x, _) => x, v]) })
        this.setState({ gameState: newState })
    }

    render() {
        const engine = this
        return <FunklyContext.Consumer>
            {({ debugToggle, gameRunning }) => (
                gameRunning && <RenderGame debugToggle={debugToggle} gameEngine={engine}/>
            )}
        </FunklyContext.Consumer>
    }
}

GameEngine.propTypes = {
    program: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired
}
