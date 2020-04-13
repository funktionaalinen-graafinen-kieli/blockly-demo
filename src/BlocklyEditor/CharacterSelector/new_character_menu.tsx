import React from "react"
import Blockly from "blockly"

import { SetCharacterMap } from "../../Gui/app"
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
    setSelectedCharacter: ((_: string) => void)
    characterMap: ReadonlyMap<string, Blockly.Workspace>
    setCharacterMap: SetCharacterMap
}

export const NewCharacterMenu = (props: NewCharacterMenuProps) => {
    const buttonClick = (entityType: string) => {
        props.setNewEntityMode(false)
        createNewCharacter(entityType)
    }
    
    const createNewCharacter = (entityType: string) => {
        const workspace = new Blockly.Workspace()
        const entityId = generateId(10)

        const entityXml = entityBaseXml(entityId, entityType)
        console.debug(entityXml)

        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(entityXml), workspace)

        const newCharacterMap = new Map(props.characterMap)
        newCharacterMap.set(entityId, workspace)
        props.setCharacterMap(newCharacterMap, () => props.setSelectedCharacter(entityId))

        // this broke characterMap  so it was removed from props
        // probably because of the react state asynchronity with props.setCharacterMap
    }

    return (
        <div>
            <button className="funkly-char-or-other" onClick={() => buttonClick("HAHMO")}> Hahmo </button>
            vai
            <button className="funkly-char-or-other" onClick={() => buttonClick("TIETOVEKOTIN")}> Tietovekotin </button>
        </div>
    )
}

interface NewCharacterButtonProps {
    setNewEntityMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewCharacterButton = (props: NewCharacterButtonProps) => <img
    className="funkly-new-character-button"
    src={guiImages.get("plusgrey")} alt="add character"
    onClick={() => props.setNewEntityMode(true)}
/>

