import * as React from "react"

import { frametime } from "./config"
import Entity from "./entity"
import GameEngine from "./game_engine"
import { MapWithDefault } from "./utils"

interface StateMapProps {
    gameState: MapWithDefault
}

const StateMap: React.FC<StateMapProps> = (props: StateMapProps) => {
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

const entityDivStyle = (
    debug: boolean,
    width: number,
    h: number,
    x: number,
    y: number,
    ro: number
): React.CSSProperties => {
    let background
    if (debug) background = "red"
    else background = ""

    return {
        backgroundColor: background,
        display: "flex",
        width: width,
        height: h,
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${ro}deg)`
    }
}

interface RenderGameProps {
    debugToggle: boolean
    gameEngine: GameEngine
    gameAreaWidth: number
    gameAreaHeight: number
}

export const RenderGame = (props: RenderGameProps) => {
    const [key, setKey] = React.useState(0)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setKey(key + 1)
            props.gameEngine.update()
        }, frametime)
        return () => clearInterval(interval)
    })
    const getVal = (name: string) => props.gameEngine.gameState.get(name)[1]
    const debugToggle = props.debugToggle

    return (
        <>
            <div
                className="funkly-game-area"
                onKeyDown={props.gameEngine.handleKeyDown}
                onKeyUp={props.gameEngine.handleKeyUp}
                tabIndex={0}
                style={{ width: props.gameAreaWidth, height: props.gameAreaHeight }}
            >
                {
                    //@ts-ignore
                    props.gameEngine.entities.map((entity: Entity) => (
                        <div
                            key={entity.id}
                            style={entityDivStyle(
                                debugToggle,
                                getVal(entity.w),
                                getVal(entity.h),
                                // (x [0-500]/500) * game_area_width
                                getVal(entity.x) ? getVal(entity.x) / 500 * props.gameAreaWidth : 0,
                                // (y [0-500]/500) * game_area_height
                                getVal(entity.y) ? getVal(entity.y) / 500 * props.gameAreaHeight : 0,
                                getVal(entity.ro)
                            )}
                        >
                            <img style={{ width: "100%" }} src={getVal(entity.img)} alt="loading..." />
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
                                {getVal(entity.text)}
                            </div>
                        </div>
                    ))}
            </div>
            {debugToggle && <StateMap gameState={props.gameEngine.gameState} />}
        </>
    )
}
