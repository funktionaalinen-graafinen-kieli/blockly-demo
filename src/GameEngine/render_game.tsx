import * as React from "react"

import { posFactor, gameBoard, gameStyle } from "./config"
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

const entityDivStyle = (debug: boolean, width: number, h: number, x: number, y: number): React.CSSProperties  => {
    let background
    if (debug) background = "red"
    else background = ""

    return {
        backgroundColor: background,
        display: "flex",
        width: width,
        height: h,
        position: "absolute",
        left: clamp(
            window.innerWidth * x * posFactor,
            0,
            gameBoard["width"]
        ),
        top: clamp(
            window.innerHeight * y * posFactor,
            0,
            gameBoard["height"]
        )
    }
}

export const renderGame = (debugToggle: boolean, gameEngine: GameEngine) => {
    let stateMap
    if (debugToggle) stateMap = <div style={{ position: "absolute" }}>
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
                    <div key={key}
                        style={
                            entityDivStyle(
                                debugToggle,
                                gameEngine.getVal(entity.w),
                                gameEngine.getVal(entity.h),
                                gameEngine.getVal(entity.x),
                                gameEngine.getVal(entity.y)
                            )
                        }>
                        <img
                            src={gameEngine.getVal(entity.img)}
                            alt="loading..."
                        />
                        <text
                            style={{
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bold",
                                WebkitTextStroke: "1px black",
                                marginLeft: "40%",
                                marginTop: "10%",
                                position: "absolute"
                            }}>
                            {gameEngine.getVal(entity.text)}
                        </text>

                    </div>
                ))}
            </div>
            {stateMap}
        </>
    )
}


