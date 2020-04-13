import React from "react"
import ReactDOM from "react-dom"

import * as log from "loglevel"
import { blockRendering } from "blockly"

import { TypedConnectionShapeRenderer } from "./BlocklyEditor/BlocklyReact/funkly_renderer"

import { App } from "./Gui/app"
import Blockly from "blockly"

log.setLevel("trace")

Blockly.Flyout.prototype.autoClose = false
//@ts-ignore

blockRendering.register("funkly_renderer", TypedConnectionShapeRenderer)

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
