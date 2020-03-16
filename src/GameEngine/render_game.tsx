import * as React from "react"

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
        <div className="funkly-statemap">
            <h3>State</h3>
            {table}
        </div>
    )
}

const entityDivStyle = (debug: boolean, width: number, h: number, x: number, y: number): React.CSSProperties => {
    let background
    if (debug) background = "red"
    else background = ""

    return {
        backgroundColor: background,
        display: "flex",
        width: width,
        height: h,
        position: "relative",
        left: x,
        top: y
    }
}

export const renderGame = (debugToggle: boolean, gameEngine: GameEngine) => {
    let stateMap
    if (debugToggle)
        stateMap = (
            <StateMap gameState={gameEngine.state.gameState} />
        )
    else stateMap = null

    return (
        <>
            <div
                className="funkly-game-area"
                ref={gameEngine.gameArea}
                onKeyDown={gameEngine.handleKeyDown}
                onKeyUp={gameEngine.handleKeyUp}
                tabIndex={0}
            >
                {gameEngine.state.entities.map((entity: Entity, key) => (
                    <div
                        key={key}
                        style={entityDivStyle(
                            debugToggle,
                            gameEngine.getVal(entity.w),
                            gameEngine.getVal(entity.h),
                            gameEngine.getVal(entity.x),
                            gameEngine.getVal(entity.y)
                        )}
                    >
                        <img style={{ width: "100%" }} src={gameEngine.getVal(entity.img)} alt="loading..." />
                        <div
                            style={{
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bold",
                                WebkitTextStroke: "1px black",
                                marginLeft: "40%",
                                marginTop: "10%",
                                position: "absolute"
                            }}
                        >
                            {gameEngine.getVal(entity.text)}
                        </div>
                    </div>
                ))}
            </div>
            {stateMap}
        </>
    )
}
