import React from "react"
import ReactDOM from "react-dom"

import * as log from "loglevel"

import App from "./Gui/app"

log.setLevel("trace")

ReactDOM.render(
    <App />, document.getElementById("root")
)
