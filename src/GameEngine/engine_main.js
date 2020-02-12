import React from "react"
import * as log from "loglevel"
import GameEngine from "./game_engine"
import { Container, Row, Col } from "react-bootstrap"

const cellStyle = {
    width: "500px",
    height: "500px"
}
log.setLevel("trace")

const renderStateMap = state => {
    if (!state) return null
    const table = []
    state.forEach((value, key) => {
        table.push(
            <p>
                {key} => {value}
            </p>
        )
    })
    return table
}

export default class EngineMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: null,
            game_running: false
        }
    }

    toggle = () => {
        this.setState({ game_running: !this.state.game_running })
    }

    render() {
        const { gameState } = this.state
        const getCode = () => {
            return this.props.editor.code
        }
        // React complained the amount of updates
        const updateFunction = (i) => {
            if (Math.random() < 0.1) this.setState({ gameState: i })
        }
        return (
            <Container fluid>
                <Row>
                    <Col style={cellStyle}>{this.props.editor}</Col>
                </Row>
                <Row>
                    <Col style={cellStyle}>
                        <GameEngine
                            toggle={this.game_running}
                            objectList={getCode}
                            setState={updateFunction}
                        />
                        <button onClick={this.toggle}>
                            {this.state.game_running ? "stop" : "run"}
                        </button>
                    </Col>
                    <Col style={cellStyle}>
                        <div style={{ background: "orange" }}>
                            <p>State</p>
                            {renderStateMap(gameState)}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
