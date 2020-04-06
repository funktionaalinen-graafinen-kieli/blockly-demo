import React, { useState } from "react"
import Blockly from "blockly"

import { guiImages } from "../../Gui/image_storage"
import Editor, { generateCode } from "../../BlocklyEditor/editor"
import { NewCharacterMenu, NewCharacterButton } from "./new_character_menu"

interface CharacterCardProps {
    name: string
    img: string
    delete: (_: string) => void
}

const CharacterCard = (props: CharacterCardProps) => {
    return (
        <div className="funkly-character-card">
            <img
                src={guiImages.get("deleteButton")}
                alt="delete"
                style={{ position: "absolute", height: 20, width: 20 }}
                onClick={() => props.delete(props.name)}
            />
            <img src={props.img} alt="..." style={{ height: 50, width: 50 }} />
            <p>{props.name}</p>
        </div>
    )
}

interface CharacterCardGridProps {
    characterMap: Map<string, Blockly.Workspace>
    setSelectedCharacter: (_: string) => void
    deleteCharacter: (_: string) => void
}

const CharacterCardGrid = (props: CharacterCardGridProps) => {
    const entities = JSON.parse(generateCode(props.characterMap)).entities
    
    const cardList: JSX.Element[] = []
    Object.values(entities).forEach((entity: any, index) => {
        const entityId = Object.keys(entities)[index]
        cardList.push(
            <div
                key={index}
                style={{ padding: 10, cursor: "pointer" }}
                onClick={() => props.setSelectedCharacter(entityId)}
            >
                <CharacterCard
                    name={entity.name[1]}
                    img={entity.img[1]}
                    delete={() => props.deleteCharacter(entityId)}
                />
            </div>
        )
    })

    return <>{cardList}</>
}
interface CharacterSelectorProps {
    characterMap: Map<string, Blockly.Workspace>
    editor: React.RefObject<Editor>
}


const CharacterSelector = (props: CharacterSelectorProps) => {
    const [newEntityMode, setNewEntityMode] = useState(false)

    // We should hook somehow that after the ref is fulfilled a re-render / re-mount is triggered
    const editor = props.editor.current!

    const setSelectedCharacter = (entityId: string) => {
        console.debug("setSelectedCharacter:", entityId)
        editor.setSelectedCharacter(entityId)
    }

    const deleteCharacter = (entityId: string) => {
        console.debug("deleted character: " + entityId)
        props.characterMap.delete(entityId)
        const newSelected = props.characterMap.values().next().value
        if (newSelected) { editor.setSelectedCharacter(newSelected) }
        // How can we force an update here
    }

    return (
        <>
            {newEntityMode ? (
                <NewCharacterMenu
                    setNewEntityMode={setNewEntityMode}
                    setSelectedCharacter={setSelectedCharacter}
                    characterMap={props.characterMap}
                />
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyItems: "center" }}>
                    <CharacterCardGrid 
                        deleteCharacter={deleteCharacter}
                        setSelectedCharacter={setSelectedCharacter}
                        characterMap={props.characterMap} 
                    />
                    <NewCharacterButton setNewEntityMode={setNewEntityMode}/>
                </div>
            )}
        </>
    )
}

export default CharacterSelector
