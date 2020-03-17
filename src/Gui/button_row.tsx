import Editor, { loadProject, saveProject } from "../BlocklyEditor/editor"
import { download } from "../GameEngine/utils"
import React from "react"
import { guiImages } from "./image_storage"

const handleUpload = (editor: Editor) => (event: React.FormEvent<HTMLInputElement>) => {
    if (editor && event.currentTarget.files) {
        const uploaded = event.currentTarget.files.item(0)!
        uploaded.text().then(it => {
            editor.importXml(it)
        })
    }
}

interface buttonProps {
    editor: Editor
    blockXml: string
    gameRunning: boolean
    debugToggle: boolean
    toggleGame: () => void
    toggleDebug: () => void
}

export const ButtonRow: React.FC<buttonProps> = (props: buttonProps) => {
    return (
        <>
            <button onClick={props.toggleGame}>{
                props.gameRunning 
                    ? <img className="funkly-button-icon" src={guiImages.get("stop")}/>
                    : <img className="funkly-button-icon" src={guiImages.get("play")}/>
            } </button>
            <button onClick={props.toggleDebug}>
                {props.debugToggle 
                    ? <img className="funkly-button-icon" src={guiImages.get("debugoff")}/> 
                    : <img className="funkly-button-icon"  src={guiImages.get("debugon")}/> }
            </button>
            <button
                onClick={() => {
                    saveProject(props.blockXml)
                }}
            >
                <img className="funkly-button-icon" src={guiImages.get("save")}/>
            </button>
            <button
                onClick={() => {
                    loadProject(props.editor.blocklyReactInstance.current)
                }}
            >
                <img className="funkly-button-icon" src={guiImages.get("load")}/>
            </button>
            <button
                onClick={() =>
                    download(
                        "funkly-download.js",
                        `export const initialXml = "${encodeURI(props.blockXml)}"`
                    )
                }
            >
                <img className="funkly-button-icon" src={guiImages.get("xml")}/>
            </button>
            <input
                type="file"
                id="importedCode"
                name="importedCode"
                onInput={handleUpload(props.editor)}
            />
            <label className="funkly-file-load" htmlFor="importedCode">
                <img className="funkly-button-icon" src={guiImages.get("choosefile")} />
            </label>
        </>
    )
}
