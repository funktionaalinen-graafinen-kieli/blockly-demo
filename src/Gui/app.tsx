import React from "react"
import * as log from "loglevel"

import CodeRenderer from "../BlocklyEditor/code_renderer"
import Editor from "../BlocklyEditor/editor"
import GameComponent from "../GameEngine/game_component"
import { ButtonRow } from "./button_row"
import { MouseLocation } from "./mouse_location"
import "./app.css"


log.setLevel("trace")

export default class App extends React.Component<
    {},
    {
        code: string
        blockXml: string
        debugToggle: boolean
        gameRunning: boolean 
        mouse_x: number
        mouse_y: number
    }
> {
    editorInstance = React.createRef<Editor>()
   
    setCode = (code: string) => {this.setState({ code })}
    setBlockXml = (blockXml: string) => {this.setState({ blockXml })}
    toggleGame = () => { this.setState({ gameRunning: !this.state.gameRunning }) }
    toggleDebug = () => { this.setState({ debugToggle: !this.state.debugToggle }) }

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = { 
            code: "", 
            blockXml: "",
            debugToggle: false, 
            gameRunning: false, 
            mouse_x: 0, 
            mouse_y: 0 
        }
    }

    render() {
        const editorInstance = this.editorInstance.current!

        return (
            <div className="funkly-container">
                <h1 className="funkly-title">FUNKLY</h1>
                <div className="funkly-buttons">
                    <ButtonRow
                        gameRunning={this.state.gameRunning}
                        debugToggle={this.state.debugToggle}
                        toggleGame={this.toggleGame}
                        toggleDebug={this.toggleDebug}
                        editor={editorInstance}
                        blockXml={this.state.blockXml}
                    />
                </div>
                <div className="funkly-blockly-editor">
                    <Editor 
                        setBlockXml={this.setBlockXml} 
                        setCode={this.setCode} 
                    />
                </div>
                <div className="funkly-engine" >
                    <MouseLocation>
                        <GameComponent 
                            gameRunning={this.state.gameRunning} 
                            debugToggle={this.state.debugToggle} 
                            program={this.state.code} 
                        />
                    </MouseLocation>
                </div>
                <div className="funkly-char-selection" />
                <div className="funkly-debug">
                    <CodeRenderer debugToggle={this.state.debugToggle} code={this.state.code}/>
                </div>
            </div>
        )
    }
}
