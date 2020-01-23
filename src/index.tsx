import React from "react"
import ReactDOM from "react-dom"
import * as log from "loglevel"

import Editor from "./BlocklyEditor/editor"

log.setLevel("trace");
ReactDOM.render(<Editor/>, document.getElementById("root"))
