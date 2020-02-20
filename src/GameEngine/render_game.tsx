import * as React from "react"
import { Row, Col } from "react-bootstrap"

import { posFactor, imgSize, gameboard } from "./config"
import { clamp } from "./utils"
import GameEngine, { MapWithDefault } from "./game_engine"
import Entity from "./entity"

function StateMap(props: {gameState: MapWithDefault}) {
    if (!props.gameState) return <></>

    const table: React.ReactElement[] = []
    // @ts-ignore
    props.gameState.forEach((value, key) => {
        table.push(
            <p key={key}>
                {key} :: {value.toString()}
            </p>
        )
    })

    return (
        <div style={{ background: "orange" }}>
            <h3>State</h3>

            {table}
        </div>
    )
}


export const renderGame = (gameEngine: GameEngine) => {

    return (
        <Row>
            <Col>
                <div
                    style={gameboard["containerStyle"]}
                    ref={gameEngine.gameArea}
                    onKeyDown={gameEngine.handleKeyDown}
                    onKeyUp={gameEngine.handleKeyUp}
                    tabIndex={0}
                >
                    {gameEngine.state.entities.map((entity: Entity, key) => (
                        <div key={key}>
                            <img
                                style={{
                                    width: imgSize["width"],
                                    height: imgSize["height"],
                                    position: "absolute",
                                    left: clamp(
                                        // @ts-ignore
                                        window.innerWidth * (gameEngine.getVal(entity.x) * posFactor),
                                        0,
                                        gameboard["size"]["width"]
                                    ),
                                    top: clamp(
                                        // @ts-ignore
                                        window.innerHeight * (gameEngine.getVal(entity.y) * posFactor),
                                        0,
                                        gameboard["size"]["height"]
                                    )
                                }}
                                // @ts-ignore
                                src={gameEngine.getVal(entity.img)}
                                alt="loading..."
                            />
                        </div>
                    ))}
                </div>
            </Col>
            <Col>
                <StateMap gameState={gameEngine.state.gameState} />
            </Col>
        </Row>
    )
}


