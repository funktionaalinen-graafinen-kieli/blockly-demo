import React from "react"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor from "../BlocklyEditor/editor"
import CodeRenderer from "../BlocklyEditor/code_renderer"
import { ButtonRow } from "./button_row"
import { FunklyState, FunklyContext } from "../Store/funkly_store"

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
        funklyState: FunklyState
    }
> {
    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = { funklyState: new FunklyState() }
        setInterval(() => {
            this.forceUpdate()
        }, 1000)
    }

    render() {
        const editorInstance = this.editorInstance.current!
        return (
            <div className="funkly-container">
                <h1 className="funkly-title">FUNKLY</h1>
                <div className="funkly-buttons">
                    <FunklyContext.Provider value={this.state.funklyState}>
                        <ButtonRow
                            editor={editorInstance}
                        />
                    </FunklyContext.Provider>
                </div>
                <div className="funkly-blockly-editor">
                    <FunklyContext.Provider value={this.state.funklyState}>
                        <Editor 
                            setBlockXml={this.state.funklyState.setBlockXml} 
                            setCode={this.state.funklyState.setCode} 
                        />
                    </FunklyContext.Provider>
                </div>
                <div className="funkly-engine">
                    <FunklyContext.Provider value={this.state.funklyState}>
                        <GameEngine updater={intervalUpdater} />
                    </FunklyContext.Provider>
                </div>
                <div className="funkly-char-selection" />
                <div className="funkly-debug">
                    <FunklyContext.Provider value={this.state.funklyState}>
                        <CodeRenderer />
                    </FunklyContext.Provider>
                </div>
            </div>
        )
    }
}
