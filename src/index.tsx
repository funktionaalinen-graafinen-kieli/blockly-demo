import React from "react"
import ReactDOM from "react-dom"

import * as log from "loglevel"
import { blockRendering } from "blockly"

import { FunklyRenderer } from "./BlocklyEditor/BlocklyReact/funkly_renderer"

import App from "./Gui/app"

log.setLevel("trace")

//blockRendering.unregister("geras")
blockRendering.register("funkly_renderer", FunklyRenderer)

ReactDOM.render(
    <React.Fragment>
        <App />
    </React.Fragment>,
    document.getElementById("root")
)
