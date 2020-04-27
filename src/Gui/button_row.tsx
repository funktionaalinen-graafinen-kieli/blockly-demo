import Editor, { loadDefaultProject } from "../BlocklyEditor/editor"
import { download } from "../GameEngine/utils"
import React from "react"
import { guiImages } from "./image_storage"

const handleUpload = (editor: Editor) => (event: React.FormEvent<HTMLInputElement>) => {
    if (editor && event.currentTarget.files) {
        const uploaded = event.currentTarget.files.item(0)!
        uploaded.text().then(it => {
            // Remove the bubblegummy const variable = stuff from the file contents and invalid quote marks
            const decoded = decodeURI(it).slice(27, -1)
            editor.importXml(decoded)
        })
    }
}

interface ButtonProps {
    gameRunning: boolean
    debugToggle: boolean
    toggleGame: () => void
    toggleDebug: () => void
    blockXml: string
    editor: Editor
    changeFull: () => void
    isFullscreen: boolean
}

export const ButtonRow: React.FC<ButtonProps> = (props: ButtonProps) => {
    const loadDefaultButtonClicked = () => {
        loadDefaultProject(props.editor)
    }

    return (
        <>
            <button onClick={props.toggleGame}>
                {props.gameRunning ? (
                    <img className="funkly-button-icon" src={guiImages.get("stop")} alt="stop" />
                ) : (
                        <img className="funkly-button-icon" src={guiImages.get("play")} alt="play" />
                    )}{" "}
            </button>
            <button onClick={props.toggleDebug}>
                {props.debugToggle ? (
                    <img className="funkly-button-icon" src={guiImages.get("debugoff")} alt="debug off" />
                ) : (
                        <img className="funkly-button-icon" src={guiImages.get("debugon")} alt="degub on" />
                    )}
            </button>
            <button onClick={loadDefaultButtonClicked}>
                <img className="funkly-button-icon" src={guiImages.get("load")} alt="load" />
            </button>
            <button
                onClick={() =>
                    download("funkly-download.js", `export const initialXml = "${encodeURI(props.blockXml)}"`)
                }
            >
                <img className="funkly-button-icon" src={guiImages.get("xml")} alt="xml" />
            </button>
            <input
                type="file"
                id="importedCode"
                className="hidden"
                name="importedCode"
                onInput={handleUpload(props.editor)}
            />
            <label className="funkly-file-load" htmlFor="importedCode">
                <img className="funkly-button-icon" src={guiImages.get("choosefile")} alt="chooseFile" />
            </label>
            <button onClick={props.changeFull}>
                <img
                    className="funkly-button-icon"
                    src={props.isFullscreen
                        ? guiImages.get("minimize")
                        : guiImages.get("maximize")
                    } alt="toggle fullscreen"
                />
            </button>
        </>
    )
}
