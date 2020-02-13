import React from "react"
import * as log from "loglevel"
import GameEngine from "./game_engine"
import { Container, Row, Col } from "react-bootstrap"
import {frametime} from "./config"

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
            console.debug(this.props.editor.code)
            // Miksi ylempi ei kaadu
            return this.props.editor.state.code
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
                    <Col style={colStyle}>{this.props.editor}</Col>
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
