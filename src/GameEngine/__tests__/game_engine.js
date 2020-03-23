import "@testing-library/jest-dom/extend-expect"

/*import React from "react"
import { render, cleanup } from "@testing-library/react"

import GameEngine from "../game_engine"
import GameComponent from "../game_component"
afterEach(cleanup) */
import { MapWithDefault } from "../utils"


test("MapWithDefault",()=>{
    const testMap = new MapWithDefault(false, [
        ["a","hello world"],
        ["b", () => "test fn return val"]
    ])
    expect(testMap.get("a")).toEqual("hello world")
    expect(testMap.get("b")()).toEqual("test fn return val")
    expect(testMap.get("c")).toEqual(false)
})
/*
const testProgram = `{
    "entities": {
        "4pid7|lk3wy)ahaslre": {
            "name": [ "packF(id)", "esimerkkinimi" ],
            "x": [ "pack(clamp(  get('4pid7|lk3wy)ahaslre_x'))(0)(600))", 1 ],
            "y": [ "pack(clamp(  get('4pid7|lk3wy)ahaslre_y'))(0)(400))", 1 ],
            "w": [ "packF(id)", 60 ],
            "h": [ "packF(id)", 60 ],
            "r": [ "packF(id)", 30 ],
            "text": [ "pack('')", "" ],
            "img": ["pack('/static/media/default_image.5d478a5d.png')","/static/media/default_image.5d478a5d.png"]
        }
    },
    "binds": {
        "frametime": [ "packF(id)", 16 ],
        "time": [ "pack(add(get('time'))(get('frametime')))", 0 ],
        "random": [ "(x,s) => math.random()", 0 ],
        "everysecond": [ "packF(timer)", [ false, 0, 1000 ] ]
    }
}
`

test("GameEngine", () => {
    const gameEngine = new GameEngine(testProgram)
    // TODO: make some actual assertions pass
    //gameEngine.applyF("a", gameEngine.current.state.gameState)
    // expect(gameEngine.getVal("e1")).toBe(true)
    expect(gameEngine.gameState.get("e1")[1]).toBe(undefined)
})
test("GameComponent", () => {
    render(
        <GameComponent
            debugToggle={true}
            gameRunning={true}
            program={testProgram}
        />
    )
    // TODO: Expect the component to have rendered here
})
*/

