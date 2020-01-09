import React from "react"
import ReactDOM from "react-dom"
import Editor from "./Editor"
import * as log from "loglevel"

log.setLevel("trace")
ReactDOM.render(<Editor/>, document.getElementById("root"))
