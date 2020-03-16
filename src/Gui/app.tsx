import React from "react"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor from "../BlocklyEditor/editor"
import CodeRenderer from "../BlocklyEditor/code_renderer"
import { ButtonRow } from "./button_row"
import { FunklyState } from "../Store/funkly_store"

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
        funklyState: FunklyState
    }
> {
    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = { debugToggle: false, gameRunning: false, funklyState: new FunklyState() }
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

    render() {
        const editorInstance = this.editorInstance.current!
        const funklyState = this.state.funklyState
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
                    <Editor setCode={funklyState.setCode} setBlockXml={funklyState.setBlockXml} /> 
                </div>
                <div className="funkly-engine">
                    {this.state.gameRunning && (
                        <GameEngine
                            debugToggle={this.state.debugToggle}
                            toggle={this.state.gameRunning}
                            program={funklyState.code}
                            updater={intervalUpdater}
                        />
                    )}
                </div>
                <div className="funkly-char-selection" />
                <div className="funkly-debug">
                    <CodeRenderer debugToggle={this.state.debugToggle} code={funklyState.code} />
                </div>
            </div>
        )
    }
}
