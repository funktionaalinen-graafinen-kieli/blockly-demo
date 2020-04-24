import React from "react"

import GameEngine from "./game_engine"
import { RenderGame } from "./render_game"

interface GameComponentProps {
    gameRunning: boolean
    debugToggle: boolean
    program: string
    isFullscreen: boolean
    gameAreaWidth: number
    gameAreaHeight: number
}

const GameComponent: React.FC<GameComponentProps> = (props: GameComponentProps) => {
    if (!props.gameRunning) return null
    const gameEngine = new GameEngine(props.program)

    return (
        <RenderGame
            debugToggle={props.debugToggle}
            gameEngine={gameEngine}
            isFullscreen={props.isFullscreen}
            gameAreaWidth={props.gameAreaWidth}
            gameAreaHeight={props.gameAreaHeight}
        />
    )
}

export default React.memo(GameComponent)
