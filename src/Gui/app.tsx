import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor, { loadProject, saveProject } from "../BlocklyEditor/editor"

log.setLevel("trace")

const rowStyle = { height: "500px" }

const colStyle = { width: "500px" }

const backgroundStyle = { backgroundColor: "#ffefc1ff" }

const headerStyle = {
    alignItems: "left",
    backgroundColor: "#ffefc1ff",
    textIndent: "10%",
    fontColor: "rgb(255, 255, 255)"
}

interface hasUpdate {
    update(): void
}

const intervalUpdater = async (updatee: hasUpdate) => {
    return setInterval(() => {
        log.debug("Interval update happening")
        updatee.update()
    }, frametime)
}

export default class App extends React.Component<
    {},
    { game_running: boolean }
    > {
    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        super(props)
        this.state = { game_running: false }
    }

    toggle = () => {
        this.setState({ game_running: !this.state.game_running })
    }

    render() {
        let editorInstance = this.editorInstance.current!

        const getCode = () => {
            return editorInstance.state.code
        }
        let gameEngine
        if (this.state.game_running) {
            gameEngine = (
                <GameEngine
                    toggle={this.state.game_running}
                    program={getCode()}
                    updater={intervalUpdater}
                />
            )
        } else {
            gameEngine = null
        }

        return (
            <div>
                <Container fluid style={backgroundStyle}>
                    <Row>
                        <header style={headerStyle}>
                            <h1>FUNKLY</h1>
                        </header>
                    </Row>
                    <Row style={rowStyle}>
                        <Col style={colStyle}>
                            <Editor ref={this.editorInstance} />
                        </Col>
                    </Row>
                    <Row>
                        <button onClick={this.toggle}>
                            {this.state.game_running ? "stop" : "run"}
                        </button>
                        <button
                            onClick={() =>
                                saveProject(
                                    editorInstance.state.blockXml.toString()
                                )
                            }
                        >
                            SAVE
                        </button>
                        <button
                            onClick={() =>
                                loadProject(
                                    editorInstance.blocklyReactInstance.current!
                                )
                            }
                        >
                            LOAD
                        </button>
                    </Row>
                    <Row style={rowStyle}>
                        <Col style={colStyle}>{gameEngine}</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
