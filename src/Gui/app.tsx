import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import * as log from "loglevel"

import GameEngine from "../GameEngine/game_engine"
import { frametime } from "../GameEngine/config"
import Editor from "../BlocklyEditor/editor"
import CodeRenderer from "../BlocklyEditor/code_renderer"
import { ButtonRow } from "./button_row"

log.setLevel("trace")

const rowStyle = {
    height: "720px",
    marginRight: "15px",
    marginBottom: "15px"
}

const buttonStyle = { marginLeft: "0px" }
const gameDiv = {
    marginLeft: "10px",
    marginBottom: "13px",
    width: "575px",
    height: "405px"
}

const backgroundStyle = { 
    height: "100%",
    backgroundColor: "#fff0c5ff"
}

const headerStyle = {
    alignItems: "left",
    backgroundColor: "#fff0c5ff",
    textIndent: "15px"

}

const charSelectionStyle = {
    marginLeft: "10px",
    backgroundColor: "#7cdceb",
    width: "575px",
    height: "300px"
}

const debugInfoStyle = {}

const intervalUpdater = async (updatee: { update(): void }) => {
    return setInterval(() => {
        updatee.update()
    }, frametime)
}

export default class App extends React.Component<{}, {
    debugToggle: boolean,
    gameRunning: boolean
}> {

    editorInstance = React.createRef<Editor>()

    constructor(props: {}) {
        super(props)
        this.state = { debugToggle: false, gameRunning: false }
        setInterval(() => {
            this.forceUpdate()
        }, 1000)
    }

    toggleGame = () => {
        this.setState({ gameRunning: !this.state.gameRunning })
    }

    toggleDebug = () => {
        this.setState({ debugToggle: !this.state.debugToggle })
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
            <div>
                <Container fluid style={backgroundStyle}>
                    <Row>
                        <header style={headerStyle}>
                            <h1>FUNKLY</h1>
                        </header>
                    </Row>
                    <Row style={buttonStyle}>
                        <ButtonRow
                            editor={editorInstance}
                            gameRunning={this.state.gameRunning}
                            debugToggle={this.state.debugToggle}
                            toggleGame={this.toggleGame}
                            toggleDebug={this.toggleDebug}
                        />
                    </Row>
                    <Row style={rowStyle}>
                        <Col lg={7}>
                            <Editor ref={this.editorInstance}/>
                        </Col>
                        <Col lg={4}>
                            <Row style={gameDiv}>
                                {gameEngine}
                            </Row>
                            <Row style={charSelectionStyle}/>
                        </Col>
                    </Row>
                    <Row style={debugInfoStyle}>
                        <CodeRenderer
                            debugToggle={this.state.debugToggle}
                            code={this.editorInstance.current?.state.code}
                        />
                    </Row>
                </Container>
            </div>
        )
    }
}
