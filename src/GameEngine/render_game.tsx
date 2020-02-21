import * as React from "react"

import { posFactor, imgSize, gameBoard, gameStyle} from "./config"
import { clamp } from "./utils"
import GameEngine, { MapWithDefault } from "./game_engine"
import Entity from "./entity"

function StateMap(props: { gameState: MapWithDefault }) {
    if (!props.gameState) return <></>

    const table: React.ReactElement[] = []
    props.gameState.forEach((value, key) => {
        table.push(
            <p key={key}>
                {key} :: {value.toString()}
            </p>
        )
    })

    return (
        <div style={{ background: "orange", marginTop: "1200px" }}>
            <h3>State</h3>

            {table}
        </div>
    )
}


export const renderGame = (debugToggle: boolean, gameEngine: GameEngine) => {
    let stateMap
    if (debugToggle) stateMap = <div style={{position: "absolute"}}>
        <StateMap gameState={gameEngine.state.gameState} />
    </div>
    else stateMap = null

    return (
        <>
            <div
                style={gameStyle}
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
                                    gameBoard["width"]
                                ),
                                top: clamp(
                                    // @ts-ignore
                                    window.innerHeight * (gameEngine.getVal(entity.y) * posFactor),
                                    0,
                                    gameBoard["height"]
                                )
                            }}
                            // @ts-ignore
                            src={gameEngine.getVal(entity.img)}
                            alt="loading..."
                        />
                    </div>
                ))}
            </div>
            {stateMap}
        </>
    )
}


