import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import PropTypes from "prop-types"
import * as log from "loglevel"

import GameEngine from "./game_engine"
import {frametime} from "./config"
import Editor from "../BlocklyEditor/editor"


log.setLevel("trace")

const rowStyle = {
    height: "500px"
}

const colStyle = {
    width: "500px"
}

const intervalUpdater = async (updateable) =>  {
    return setInterval(()=>{
        log.debug("Interval update happening")
        updateable.update()
    }, frametime)
}

export default class EngineMain extends React.Component {
    EditorInstance = React.createRef()

    constructor(props) {
        super(props)
        this.state = {
            gameState: null,
            game_running: false,
        }
    }

    toggle = () => {
        this.setState({ game_running: !this.state.game_running })
    }

    render() {
        const getCode = () => {
            return this.EditorInstance.current.state.code
        }
        let gameEngine
        if (this.state.game_running) {
            gameEngine = <GameEngine
                toggle={ this.state.game_running }
                program={ getCode() }
                updater={ intervalUpdater }
            />
        } else {
            gameEngine = null
        }

        return (
            <Container fluid>
                <Row style={rowStyle}>
                    <Col style={colStyle}>
                        <Editor ref={this.EditorInstance} />
                    </Col>
                </Row>
                <Row>
                    <button onClick={this.toggle}>
                        {this.state.game_running ? "stop" : "run"}
                    </button>
                </Row>
                <Row style={rowStyle}>
                    <Col style={colStyle}>
                        {gameEngine}
                    </Col>
                </Row>
            </Container>
        )
    }
}

EngineMain.propTypes = {
    editor: PropTypes.element.isRequired
}
