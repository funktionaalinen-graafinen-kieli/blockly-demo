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
    gameRunning: boolean
    debugToggle: boolean
    toggleGame: () => void
    toggleDebug: () => void
}

export const ButtonRow: React.FC<buttonProps> = (props: buttonProps) => {
    return (
        <>
            <button onClick={props.toggleGame}>
               {props.gameRunning ? <img width={50} height={50} src={guiImages.get("stop")}></img> : <img width={50} height={50} src={guiImages.get("play")}></img>}
            </button>
            <button onClick={props.toggleDebug}>{props.debugToggle ? "debug pois" : "debug päälle"}</button>
            <button
                onClick={() => {
                    saveProject(props.editor?.state.blockXml.toString())
                }}
            >
                TALLENNA
            </button>
            <button
                onClick={() => {
                    loadProject(props.editor.blocklyReactInstance.current)
                }}
            >
                LATAA
            </button>
            <button
                onClick={() =>
                    download(
                        "funkly-download.js",
                        `export const initialXml = "${encodeURI(props.editor.state.blockXml.toString()!)}"`
                    )
                }
            >
                xml
            </button>
            <input type="file" id="importedCode" name="importedCode" onInput={handleUpload(props.editor)} />
        </>
    )
}
