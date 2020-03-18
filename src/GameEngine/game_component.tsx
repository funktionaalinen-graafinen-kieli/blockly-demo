import React from "react"

import GameEngine from "./game_engine"
import { RenderGame } from "./render_game"

interface GameComponentProps {
    gameRunning: boolean
    debugToggle: boolean
    program: string
}

export const GameComponent: React.FC<GameComponentProps> = (props: GameComponentProps) => {
    if (!props.gameRunning) return null
    
    console.debug(props.program)
    const gameEngine = new GameEngine(props.program)
    return (
        <RenderGame 
            debugToggle={props.debugToggle}
            gameEngine={gameEngine}
        />
    )
}
