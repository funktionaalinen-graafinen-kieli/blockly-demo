import Editor, { loadProject, saveProject } from "../BlocklyEditor/editor"
import { download } from "../GameEngine/utils"
import React, { useState, useEffect } from "react"
import { guiImages } from "./image_storage"
import ClipLoader from "react-spinners/ClipLoader"

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
    const [saveProjectIndicator, setSaveProjectIndicator] = useState(false)

    useEffect(() => {
        if (props.editor) {
            loadButtonClicked()
        }
    }, [props.editor])

    useEffect(() => {
        const autoSave = setInterval(() => {
            saveButtonClicked()
        }, 8000)
        return () => {
            clearInterval(autoSave)
        }
    }, [props.blockXml])

    const saveButtonClicked = () => {
        saveProject(props.blockXml)
        setSaveProjectIndicator(true)
        setTimeout(() => {
            setSaveProjectIndicator(false)
        }, 1500)
    }

    const loadButtonClicked = () => {
        loadProject(props.editor.blocklyReactInstance.current)
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
            <button onClick={saveButtonClicked}>
                {saveProjectIndicator ? (
                    <ClipLoader size={50} color="orange" loading={true} />
                ) : (
                    <img className="funkly-button-icon" src={guiImages.get("save")} alt="save" />
                )}
            </button>
            <button onClick={loadButtonClicked}>
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
