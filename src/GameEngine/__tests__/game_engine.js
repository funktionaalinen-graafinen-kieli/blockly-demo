import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { render, fireEvent, screen, cleanup } from "@testing-library/react"

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

// test("GameEngine",() => {
//     const ge = new GameEngine({
//         "entities": {
//             "e1": {
//                 "x": ["pack(add((1))(get('e1_x')))", 1],
//                 "y": ["pack((0))", 1],
//                 "img": ["pack(\"dogedance.4f5ec440.gif\")", "breadoge.e7c76454.png"]
//             }
//         },
//         "binds": {
//             "frameTime": ["packF(id)", 16],
//             "time": ["pack(add(get('time'))(get('frameTime')))", 0],
//             "everySecond": ["packF(timer)", [false, 0, 1000]]
//         }
//     },true
//     ,setInterval(() => {
//         log.debug("Interval update happening")
//         updatee.update()
//     }, 1000))
//     // console.warn("gameengine:",ge)
//     // ge.applyF("a",ge.state.gameState)
//     // console.warn("GameEngine:",ge)
//     expect(ge.getVal("abc")).toBe(false)
// })

