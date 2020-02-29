import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { render, cleanup } from "@testing-library/react"

import { intervalUpdater } from "../../Gui/app"
import GameEngine, { MapWithDefault } from "../game_engine"

afterEach(cleanup)

test("MapWithDefault",()=>{
    const defaultFunc = () => [(x, s) => x, false]
    const testMap = new MapWithDefault(defaultFunc)
    testMap.set("a","hello world")
    testMap.set("b","abc")
    expect(testMap.get("a")).toEqual("hello world")
    // expect(testMap.get("c")[0](1,0)).toEqual(1)
    // expect(testMap.get("c")[1]).toEqual(false)
})

test("GameEngine",() => {
    const gameEngine = React.createRef()
    render(
        <GameEngine ref={gameEngine}
            updater={intervalUpdater}
            debugToggle={true}
            toggle={true}
            program={
                {
                    "entities": {
                        "e1": {
                            "x": ["pack(add((1))(get('e1_x')))", 1],
                            "y": ["pack((0))", 1],
                            "img": ["pack(\"dogedance.4f5ec440.gif\")", "breadoge.e7c76454.png"]
                        }
                    },
                    "binds": {
                        "frameTime": ["packF(id)", 16],
                        "time": ["pack(add(get('time'))(get('frameTime')))", 0],
                        "everySecond": ["packF(timer)", [false, 0, 1000]]
                    }
                }
            }
        />
    )
    gameEngine.current.applyF("a", gameEngine.current.state.gameState)
    expect(gameEngine.current.getVal("abc")).toBe(false)
})

