import React from "react"
import { Container, Row, Col } from "react-bootstrap"
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
    }
> {
    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = { debugToggle: false, gameRunning: false }
        setInterval(() => {this.forceUpdate()}, 1000)
    }

    toggleGame = () => {
        this.setState(prevState => ({ gameRunning: !prevState.gameRunning }))
    }

    toggleDebug = () => {
        this.setState(prevState => ({ debugToggle: !prevState.debugToggle }))
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
            <Container fluid className="funkly-container-background">
                <Row>
                    <header className="funkly-header">
                        <h1>FUNKLY</h1>
                    </header>
                </Row>
                <Row className="funkly-button-row">
                    <ButtonRow
                        editor={editorInstance}
                        gameRunning={this.state.gameRunning}
                        debugToggle={this.state.debugToggle}
                        toggleGame={this.toggleGame}
                        toggleDebug={this.toggleDebug}
                    />
                </Row>
                <Row className="funkly-content-row">
                    <Col lg={7}>
                        <Editor ref={this.editorInstance} />
                    </Col>
                    <Col lg={4}>
                        <Row className="funkly-game-div">{gameEngine}</Row>
                        <Row className="funkly-char-selection" />
                    </Col>
                </Row>
                <Row className="funkly-debug">
                    <CodeRenderer debugToggle={this.state.debugToggle} code={this.editorInstance.current?.state.code} />
                </Row>
            </Container>
        )
    }
}
