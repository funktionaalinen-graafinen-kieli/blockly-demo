import React from "react"
import ReactDOM from "react-dom"
import * as log from "loglevel"
import {id, frameTime} from "./utils"
import GameEngine from "./game_engine"
import EvalFunc from "../Lang/eval"

log.setLevel("trace")
ReactDOM.render(
    <GameEngine
        entityList={EvalFunc}
        addEvents={(state: any, timer: any) => {
            state.set("frameTime", [id, frameTime])
            state.set("time", [(x: any, s: any) => x + s.get("frameTime")[1], 0])
            state.set("everySecond", [timer, [false, 0, 1000]])
        }}
    />,
    document.getElementById("root")
)
