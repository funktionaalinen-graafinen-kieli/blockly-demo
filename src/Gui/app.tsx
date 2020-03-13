import React from "react"
import { Container, Row, Col } from "react-bootstrap"
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
        let gameEngine
        if (this.state.gameRunning) {
            gameEngine = (
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
            )
        } else {
            gameEngine = null
        }

        return (
            <Container fluid className="funkly-container-background">
                <Row className="funkly-button-row">
                    <div>
                        <header className="funkly-header">
                            <h1>FUNKLY</h1>
                        </header>
                    </div>
                    <div className="align-right">
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
                    <ThemeContextConsumer>
                        {(context: any) => (
                            <CodeRenderer debugToggle={this.state.debugToggle} code={context.editorState} />
                        )}
                    </ThemeContextConsumer>
                </Row>
            </Container>
        )
    }
}

App.contextType = ThemeContextConsumer
