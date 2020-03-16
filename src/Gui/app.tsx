import React from "react"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor from "../BlocklyEditor/editor"
import CodeRenderer from "../BlocklyEditor/code_renderer"
import { ButtonRow } from "./button_row"
import { FunklyContextConsumer } from "../funklyContext"

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
    }
> {
    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = { debugToggle: false, gameRunning: false }
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
        return (
            <div className="funkly-container">
                <h1 className="funkly-title">FUNKLY</h1>
                <div className="funkly-buttons">
                    <FunklyContextConsumer>
                        {(context: any) => (
                            <ButtonRow
                                editor={context}
                                gameRunning={this.state.gameRunning}
                                debugToggle={this.state.debugToggle}
                                toggleGame={this.toggleGame}
                                toggleDebug={this.toggleDebug}
                            />
                        )}
                    </FunklyContextConsumer>
                </div>
                <div className="funkly-blockly-editor">
                    <FunklyContextConsumer>{(context: any) => <Editor contextState={context} />}</FunklyContextConsumer>
                </div>
                <div className="funkly-engine">
                    {this.state.gameRunning && (
                        <FunklyContextConsumer>
                            {(context: any) => (
                                <GameEngine
                                    debugToggle={this.state.debugToggle}
                                    toggle={this.state.gameRunning}
                                    program={context.editorState.code}
                                    updater={intervalUpdater}
                                />
                            )}
                        </FunklyContextConsumer>
                    )}
                </div>
                <div className="funkly-char-selection" />
                <div className="funkly-debug">
                    <FunklyContextConsumer>
                        {(context: any) => (
                            <CodeRenderer debugToggle={this.state.debugToggle} code={context.editorState} />
                        )}
                    </FunklyContextConsumer>
                </div>
            </div>
        )
    }
}

App.contextType = FunklyContextConsumer
