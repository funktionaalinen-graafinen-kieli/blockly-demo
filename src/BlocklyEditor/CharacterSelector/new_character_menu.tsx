import React from "react"
import Blockly from "blockly"

import { entityBaseXml } from "./new_character_xml"
import { guiImages } from "../../Gui/image_storage"

const generateId = (len: number) => {
    var text = ""
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < len; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length))
    }
    return text
}

interface NewCharacterMenuProps {
    setNewEntityMode: React.Dispatch<React.SetStateAction<boolean>>
    characterMap: ReadonlyMap<string, Blockly.Workspace>
    setCharacterMap: (_: ReadonlyMap<string, Blockly.Workspace>) => void
    setSelectedCharacter: (_: string) => void
}

export const NewCharacterMenu = (props: NewCharacterMenuProps) => {
    const buttonClick = (entityType: string) => {
        props.setNewEntityMode(false)
        createNewCharacter(entityType)
    }
    
    const createNewCharacter = (entityType: string) => {
        const workspace = new Blockly.Workspace()
        const entityId = generateId(10)

        // TODO: Find a cleaner way
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(entityBaseXml(entityId, entityType)), workspace)

        const newCharacterMap = new Map(props.characterMap)
        newCharacterMap.set(entityId, workspace )
        props.setCharacterMap(newCharacterMap)

        props.setSelectedCharacter(entityId)
    }

    return (
        <div style={{ padding: 10 }}>
            <button onClick={() => buttonClick("HAHMO")}>Hahmo</button>
            <button onClick={() => buttonClick("TIETOVEKOTIN")}>Tietovekotin</button>
        </div>
    )
}

interface NewCharacterButtonProps {
    setNewEntityMode: React.Dispatch<React.SetStateAction<boolean>>
}

/*export const NewCharacterButton = (props: NewCharacterButtonProps) => <img
    src={guiImages.get("plus")}
    alt="add character"
    width={75}
    height={75}
    style={{ position: "absolute", right: 0, bottom: 0 }}
    onClick={() => props.setNewEntityMode(true)}
/>*/

export const NewCharacterButton = (props: NewCharacterButtonProps) => <img
    className="funkly-new-character-button"
    src={guiImages.get("plusgrey")} alt="ass character"
    onClick={() => props.setNewEntityMode(true)}
/>

