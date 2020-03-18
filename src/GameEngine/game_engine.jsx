import { mapWithDefault } from "./utils"
import Entity from "./entity.js"
import evalFunc from "../Lang/eval_func"

const evalProgram = (program) => {
    const gameState = new mapWithDefault(false, [])
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
        console.debug(entities)
        console.debug(gameState)
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
        let newState = new mapWithDefault(false, this.gameState)

        for (let [key, value] of this.gameState) {
            newState.set(key, [value[0], this.applyF(key, this.gameState)])
        }

        Array.from(this.keymap, ([k, v]) => { newState.set("key_" + k, [(x, _) => x, v]) })
        this.gameState = newState
    }
}

