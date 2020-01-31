import React from "react"
import ReactDOM from "react-dom"

import BlocklyEditor from "./BlocklyEditor/editor"

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
                    <p onClick={this.onClick}> press this to change component </p>
                    <BlocklyEditor/>
                </div>
            )
        } else {
            return (
                <div>
                    <p onClick={this.onClick}> press this to change component </p>
                    <p/>
                    RENDER GAME ENGINE HERE
                </div>
            )
        }
    }
}
ReactDOM.render(
    <Adapter/>,
    document.getElementById("root")
)

