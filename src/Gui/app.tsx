import React from "react"
import Blockly from "blockly"
import log from "loglevel"

import CodeRenderer from "../BlocklyEditor/code_renderer"
import Editor from "../BlocklyEditor/editor"
import CharacterSelector from "../BlocklyEditor/CharacterSelector/character_selector"
import GameComponent from "../GameEngine/game_component"
import { ButtonRow } from "./button_row"
import { guiImages } from "./image_storage"
import { MouseLocation } from "./mouse_location"
import "./funkly_app.css"
import "./blockly_override.css"
import "./fullscreen-layout.css"

log.setLevel("trace")

// TODO: move this into a more univeral location
export type SetCharacterMap = (_: ReadonlyMap<string, Blockly.Workspace>, callback?: () => void) => void

interface AppState {
    code: string
    blockXml: string
    debugToggle: boolean
    gameRunning: boolean
    mouse_x: number
    mouse_y: number
    game_area_width: number
    game_area_height: number
    characterMap: ReadonlyMap<string, Blockly.Workspace>
    // An undefined selectedCharacter means a character is not selected
    selectedCharacter: string | undefined
    full: boolean
}

export class App extends React.Component<{}, AppState> {
    editorInstance = React.createRef<Editor>()

    setCode = (code: string) => {
        this.setState({ code })
    }

    setBlockXml = (blockXml: string) => {
        this.setState({ blockXml })
    }

    setCharacterMap = (characterMap: ReadonlyMap<string, Blockly.Workspace>, callback?: () => void) => {
        // This guards against accidentally setting characterMap as something non-iterable
        if (characterMap instanceof Map) { } else throw new Error("Invalid input type for setCharacterMap. Give a Map")
        this.setState({ characterMap }, callback)
    }

    // This should only be used in Editor
    // and otherwise editor's setSelectedCharacter should be used for its side effects
    setSelectedCharacter = (selectedCharacter: string | undefined) => {
        this.setState({ selectedCharacter })
    }

    toggleGame = () => {
        this.setState({ gameRunning: !this.state.gameRunning })
    }

    toggleDebug = () => {
        this.setState({ debugToggle: !this.state.debugToggle })
    }

    constructor(props: {}) {
        // Call super with empty props list
        super(props)
        this.state = {
            code: "",
            blockXml: "",
            debugToggle: false,
            gameRunning: false,
            mouse_x: 0,
            mouse_y: 0,
            game_area_width: 600,
            game_area_height: 400,
            characterMap: new Map(),
            selectedCharacter: undefined,
            full: false,
        }
    }

    render() {
        if (this.state.game_area_width === 600 && this.state.full) {
            this.setState({ game_area_width: 1600, game_area_height: 800 })
        } else if (this.state.game_area_width === 1600 && !this.state.full) {
            this.setState({ game_area_width: 600, game_area_height: 400 })
        }
        const editorInstance = this.editorInstance.current!

        return (
            <div className={`funkly-container${this.state.full ? "-full" : ""}`}>
                <img className={`funkly-title${this.state.full ? "-full" : ""}`} src={guiImages.get("logo")} />
                <div className={`funkly-buttons${this.state.full ? "-full" : ""}`}>
                    <ButtonRow
                        gameRunning={this.state.gameRunning}
                        debugToggle={this.state.debugToggle}
                        toggleGame={this.toggleGame}
                        toggleDebug={this.toggleDebug}
                        editor={editorInstance}
                        blockXml={this.state.blockXml}
                        changeFull={() => this.setState({ full: !this.state.full })}
                    />
                </div>
                <div className={`funkly-blockly-editor${this.state.full ? "-full" : ""}`}>
                    <Editor
                        setBlockXml={this.setBlockXml}
                        setCode={this.setCode}
                        setCharacterMap={this.setCharacterMap}
                        characterMap={this.state.characterMap}
                        setSelectedCharacter={this.setSelectedCharacter}
                        selectedCharacter={this.state.selectedCharacter}
                        gameAreaWidth={this.state.game_area_width}
                        gameAreaHeight={this.state.game_area_height}
                        ref={this.editorInstance}
                    />
                </div>
                <div className={`funkly-engine${this.state.full ? "-full" : ""}`}>
                    <MouseLocation>
                        <GameComponent
                            gameRunning={this.state.gameRunning}
                            debugToggle={this.state.debugToggle}
                            program={this.state.code}
                            isFullscreen={this.state.full}
                            gameAreaWidth={this.state.game_area_width}
                            gameAreaHeight={this.state.game_area_height}
                        />
                    </MouseLocation>
                </div>
                <div className={`funkly-char-selection${this.state.full ? "-full" : ""}`} >
                    <CharacterSelector
                        editor={this.editorInstance}
                        characterMap={this.state.characterMap}
                        setCharacterMap={this.setCharacterMap}
                        selectedCharacter={this.state.selectedCharacter}
                    />
                </div>
                <div className={`funkly-debug${this.state.full ? "-full" : ""}`} >
                    <CodeRenderer debugToggle={this.state.debugToggle} code={this.state.code} />
                </div>
            </div>
        )
    }
}
