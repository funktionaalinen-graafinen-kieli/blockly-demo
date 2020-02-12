import React from "react"
import * as log from "loglevel"
import GameEngine from "./game_engine"
import { Container, Row, Col } from "react-bootstrap"
import {FRAMETIME} from "./utils"

log.setLevel("trace")

const cellStyle = {
    width: "500px",
    height: "500px"
}

const intervalUpdater = async (updateable) =>  {
    setInterval(()=>{
        log.debug("Interval update happening")
        updateable.update()
    }, FRAMETIME)
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
            return this.props.editor.code
        }

        return (
            <Container fluid>
                <Row>
                    <Col style={cellStyle}>{this.props.editor}</Col>
                </Row>
                <Row>
                    <button onClick={this.toggle}>
                        {this.state.game_running ? "stop" : "run"}
                    </button>
                </Row>
                <Row>
                    <Col style={cellStyle}>
                        <GameEngine
                            toggle={ this.game_running }
                            objectList={ getCode() }
                            updater={ intervalUpdater }
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}
