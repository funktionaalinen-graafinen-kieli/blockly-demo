import React from "react"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor from "../BlocklyEditor/editor"
import CodeRenderer from "../BlocklyEditor/code_renderer"
import { ButtonRow } from "./button_row"
import { ThemeContextConsumer } from "../themeContext"

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
        return (
            <div className="funkly-container">
                <h1 className="funkly-title">FUNKLY</h1>
                <div className="funkly-buttons">
                    <ThemeContextConsumer>
                        {(context: any) => (
                            <ButtonRow
                                editor={context}
                                gameRunning={this.state.gameRunning}
                                debugToggle={this.state.debugToggle}
                                toggleGame={this.toggleGame}
                                toggleDebug={this.toggleDebug}
                            />
                        )}
                    </ThemeContextConsumer>
                </div>
                <div className="funkly-blockly-editor">
                    <ThemeContextConsumer>
                        {(context: any) => <Editor contextState={context} />}
                    </ThemeContextConsumer>
                    <Editor ref={this.editorInstance} />
                </div>
                <div className="funkly-engine">
                    {this.state.gameRunning && (
                        <ThemeContextConsumer>
                            {(context: any) => (
                                <GameEngine
                                    debugToggle={this.state.debugToggle}
                                    toggle={this.state.gameRunning}
                                    program={context.editorState.code}
                                    updater={intervalUpdater}
                                />
                            )}
                        </ThemeContextConsumer>
                    )}
                </div>
                <div className="funkly-char-selection" />
                <div className="funkly-debug">
                    <ThemeContextConsumer>
                        {(context: any) => (
                            <CodeRenderer debugToggle={this.state.debugToggle} code={context.editorState} />
                        )}
                    </ThemeContextConsumer>
                </div>
            </div>
        )
    }
}

App.contextType = ThemeContextConsumer
