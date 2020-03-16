import React from "react"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor from "../BlocklyEditor/editor"
import CodeRenderer from "../BlocklyEditor/code_renderer"
import { ButtonRow } from "./button_row"

import "./app.css"
log.setLevel("trace")

export const intervalUpdater = async (updatee: { update(): void }) => {
    return setInterval(() => {
        updatee.update()
    }, frametime)
}

export default class App extends React.Component<
    {},
    {
        debugToggle: boolean
        gameRunning: boolean
        mouse_x: number
        mouse_y: number
    }
    > {
    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = { debugToggle: false, gameRunning: false, mouse_x: -1, mouse_y: -1 }
        setInterval(() => {
            this.forceUpdate()
        }, 1000)
    }

    toggleGame = () => {
        this.setState(prevState => ({ gameRunning: !prevState.gameRunning }))
    }

    toggleDebug = () => {
        this.setState(prevState => ({ debugToggle: !prevState.debugToggle }))
    }

    hoverAction = (event: React.MouseEvent<HTMLDivElement>) => {
        const mouse_x = event.nativeEvent.offsetX
        const mouse_y = event.nativeEvent.offsetY
        
        this.setState({ mouse_x, mouse_y })
    }


    render() {
        let editorInstance = this.editorInstance.current!
        const getCode = () => editorInstance.state.code
        let gameEngine
        if (this.state.gameRunning) {
            gameEngine = (
                <GameEngine
                    debugToggle={this.state.debugToggle}
                    toggle={this.state.gameRunning}
                    program={getCode()}
                    updater={intervalUpdater}
                />
            )
        } else {
            gameEngine = null
        }

        return (
            <div className="funkly-container">
                <h1 className="funkly-title">FUNKLY</h1>
                <div className="funkly-buttons">
                    <ButtonRow
                        editor={editorInstance}
                        gameRunning={this.state.gameRunning}
                        debugToggle={this.state.debugToggle}
                        toggleGame={this.toggleGame}
                        toggleDebug={this.toggleDebug}
                    />
                </div>
                <div className="funkly-blockly-editor">
                    <Editor ref={this.editorInstance} />
                </div>
                <div className="funkly-engine" onMouseMove={this.hoverAction}>
                    Hiiren sijainti: {this.state.mouse_x}, {this.state.mouse_y}
                    {gameEngine}
                </div>
                <div className="funkly-char-selection" />
                <div className="funkly-debug">
                    <CodeRenderer debugToggle={this.state.debugToggle} code={this.editorInstance.current?.state.code} />
                </div>
            </div>
        )
    }
}
