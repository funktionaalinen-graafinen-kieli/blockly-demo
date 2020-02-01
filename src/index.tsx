import React from "react"
import ReactDOM from "react-dom"

import BlocklyEditor from "./BlocklyEditor/editor"

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
                    <a onClick={this.onClick}> press to change component </a>
                </div>
            )
        } else {
            return (
                <div>
                    <a onClick={this.onClick}> press to change component </a>
                    <Main/>
                </div>
            )
        }
    }
}
ReactDOM.render(
    <Adapter/>,
    document.getElementById("root")
)

