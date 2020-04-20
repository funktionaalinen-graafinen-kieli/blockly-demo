import { MapWithDefault } from "./utils"
import Entity from "./entity.js"
import evalFunc from "../Lang/eval_func"


const evalProgram = (program) => {
    const gameState = new MapWithDefault(false, [])
    let parsedObjectList
    try {
        parsedObjectList = evalFunc(program)
    } catch (error) {
        console.debug("Program for game was invalid JSON. This should never happen with the blocks generating the json")
        console.debug(`Program: ${program}`)
        console.debug(error)
        return [[], []]
    }
    const parsedEntities = parsedObjectList["entities"]
    const entities = []
    Object.keys(parsedEntities).forEach(entityId => {
        entities.push(new Entity(gameState, entityId, parsedEntities[entityId]))
    })

    const binds = parsedObjectList["binds"]
    Object.keys(binds).forEach(eventName => {
        gameState.set(eventName, binds[eventName])
    })
    return [entities, gameState]
}


export default class GameEngine {
    constructor(program) {
        const [entities, gameState] = evalProgram(program)
        this.entities = entities
        this.gameState = gameState 
        this.keymap = new Map()
    }

    applyF(key, state) {
        let p = state.get(key)
        return p[0](p[1], state)
    }

    handleKeyDown = (e) => {
        this.keymap.set(e.key, true)
    }

    handleKeyUp = (e) => {
        this.keymap.set(e.key, false)
    }

    update() {
        let newState = new MapWithDefault(false, this.gameState)

        this.gameState.forEach((value, key) => {
            newState.set(key, [value[0], this.applyF(key, this.gameState)])
        })

        this.keymap.forEach((v, k) => newState.set("key_" + k, [(x, _) => x, v]))
        this.gameState = newState
    }
}

