import React from "react"
import ReactDOM from "react-dom"

import * as log from "loglevel"
import {blockRendering} from "blockly"

import BlocklyEditor from "./BlocklyEditor/editor"
import {FunklyRenderer} from "./BlocklyEditor/BlocklyReact/funkly_renderer"

import Main from "./GameEngine/main"

class Adapter extends React.Component<{}, {toggle: boolean}> {
    constructor(props: {}) {
        super(props)
        this.state = {toggle: false}
    }

    onClick = () => {
        this.setState({toggle : !this.state.toggle} )
    }

    render = () => {
        if (this.state.toggle) {
            return (
                <div>
                    <button onClick={this.onClick}> press this to change component </button>
		    <BlocklyEditor/>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.onClick}> press this to change component </button>
                    <Main/>
                </div>
            )
        }
    }
}

log.setLevel("trace")

//blockRendering.unregister("geras")
blockRendering.register("funkly_renderer", FunklyRenderer)

ReactDOM.render(
    <Adapter/>,
    document.getElementById("root")
)

