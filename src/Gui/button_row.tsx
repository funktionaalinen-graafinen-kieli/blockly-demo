import Editor, { loadProject, saveProject, loadDefaultProject } from "../BlocklyEditor/editor"
import { download } from "../GameEngine/utils"
import React, { useEffect } from "react"
import { guiImages } from "./image_storage"

const handleUpload = (editor: Editor) => (event: React.FormEvent<HTMLInputElement>) => {
    if (editor && event.currentTarget.files) {
        const uploaded = event.currentTarget.files.item(0)!
        uploaded.text().then(it => {
            editor.importXml(it)
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
}

export const ButtonRow: React.FC<ButtonProps> = (props: ButtonProps) => {
    useEffect(() => {
        saveButtonClicked()
    }, [props.blockXml])

    const saveButtonClicked = () => {
        if (props.blockXml) saveProject(props.blockXml)
    }

    const loadDefaultButtonClicked = () => {
        loadDefaultProject(props.editor.blocklyReactInstance.current)
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
        </>
    )
}
