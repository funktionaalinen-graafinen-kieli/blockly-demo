import React from "react"
import ReactDOM from "react-dom"
import * as log from "loglevel"
import {id, frameTime} from "./utils"
import GameEngine from "./game_engine"
import EvalFunc from "../Lang/eval"

log.setLevel("trace")
export default function Main() {
    return(
        <>
            <GameEngine
                objectList={EvalFunc()}
            />
        </>
    )
}
