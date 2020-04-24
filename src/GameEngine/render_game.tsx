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

    const calculatedWidth = Math.min(width, 100) + "%"
    const calculatedHeight = Math.min(h, 100) + "%"

    const calculatedX = Math.min(x, 100) + "%"
    const calculatedY = Math.min(y, 100) + "%"

    return {
        backgroundColor: background,
        display: "flex",
        width: calculatedWidth,
        height: calculatedHeight,
        position: "absolute",
        left: calculatedX,
        top: calculatedY,
        transform: `rotate(${ro}deg)`
    }
}

interface RenderGameProps {
    debugToggle: boolean
    gameEngine: GameEngine
    isFullscreen: boolean
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
                className={`funkly-game-area + ${props.isFullscreen ? "-full" : ""}`}
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
                                getVal(entity.x),
                                // (y [0-500]/500) * game_area_height
                                getVal(entity.y),
                                getVal(entity.ro)
                            )}
                        >
                            <img style={{ width: "100%" }} src={getVal(entity.img)} alt="loading..." />
                            <div className="funkly-gui-entity-info" >
                                {getVal(entity.text)}
                            </div>
                        </div>
                    ))}
            </div>
            {debugToggle && <StateMap gameState={props.gameEngine.gameState} />}
        </>
    )
}
