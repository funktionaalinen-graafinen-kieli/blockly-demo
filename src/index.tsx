import React from "react"
import ReactDOM from "react-dom"

import * as log from "loglevel"
import {blockRendering} from "blockly"

import BlocklyEditor from "./BlocklyEditor/editor"
import {FunklyRenderer} from "./BlocklyEditor/BlocklyReact/funkly_renderer"

import EngineMain from "./GameEngine/engine_main"

log.setLevel("trace")

//blockRendering.unregister("geras")
blockRendering.register("funkly_renderer", FunklyRenderer)

ReactDOM.render(
    <React.Fragment>
        <EngineMain editor={<BlocklyEditor/>} />
    </React.Fragment>,
    document.getElementById("root")
)