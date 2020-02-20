import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { render, fireEvent, screen, cleanup } from "@testing-library/react"

import * as BlocklyJS from "blockly/javascript"
import GameEngine, {MapWithDefault} from "../game_engine"

afterEach(cleanup)

test('MapWithDefault',()=>{
    const defaultFunc = () => [(x, s) => x, false]
    const testMap = new MapWithDefault(defaultFunc)
    testMap.set('a','hello world')
    testMap.set('b','abc')
    expect(testMap.get('a')).toEqual('hello world')
    expect(testMap.get('c')[0](1,0)).toEqual(1)
    expect(testMap.get('c')[1]).toEqual(false)
})

// test('test',() => {
//     BlocklyJS.blockToCode('abc')
//     render(<GameEngine
//         toggle={true}
//         program={'{ "entities": {"e1": {"x": ["pack( add((1))(get(\'e1_x\')))", 1],"y": ["pack( (0))", 1],"img": ["pack( "/static/media/breadoge.e7c76454.png")", "/static/media/breadoge.e7c76454.png"]},"e2": {"x": ["pack( cond(gt(get(\'time\'))((3000)))(add((2))(get(\'e2_x\')))(get(\'e2_x\')))", 1],"y": ["pack( get(\'e2_y\'))", 60],"img": ["pack( cond(gt(get(\'time\'))((3000)))("/static/media/shoudoge.70eebbbd.png")("/static/media/strangedoge.6c2e0766.png"))", "/static/media/breadoge.e7c76454.png"]},"e3": {"x": ["pack( cond(get(\'key_d\'))(add((2))(get(\'e3_x\')))(cond(get(\'key_a\'))(add((-2))(get(\'e3_x\')))(get(\'e3_x\'))))", 1],"y": ["pack( cond(get(\'key_s\'))(add((2))(get(\'e3_y\')))(cond(get(\'key_w\'))(add((-2))(get(\'e3_y\')))(get(\'e3_y\'))))", 120],"img": ["pack( "/static/media/muscledoge.ecd737eb.png")", "/static/media/breadoge.e7c76454.png"]}}, "binds": { "frameTime": ["packF(id)", 16], "time": ["pack(add(get(\'time\'))(get(\'frameTime\')))", 0], "everySecond": ["packF(timer)", [false, 0, 1000]] } }'}
//         updater={async () => setInterval((updatee) => {
//             updatee.update()
//         }, 1000)}
//         />)
// })