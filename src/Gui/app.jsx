import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor, { loadProject, saveProject } from "../BlocklyEditor/editor"

log.setLevel("trace")

const rowStyle = {
    height: "500px"
}

const colStyle = {
    width: "500px"
}

const intervalUpdater = async updateable => {
    return setInterval(() => {
        log.debug("Interval update happening")
        updateable.update()
    }, frametime)
}

export default class App extends React.Component {
    editorInstance = React.createRef()

    constructor(props) {
        super(props)
        this.state = {
            gameState: null,
            game_running: false
        }
    }

    toggle = () => {
        this.setState({ game_running: !this.state.game_running })
    }

    render() {
        const getCode = () => {
            return this.editorInstance.current.state.code
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
            <Container fluid>
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
                                this.editorInstance.current.state.blockXml.toString()
                            )
                        }
                    >
                        SAVE
                    </button>
                    <button
                        onClick={() =>
                            loadProject(
                                this.editorInstance.current.blocklyComponent
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
        )
    }
}
