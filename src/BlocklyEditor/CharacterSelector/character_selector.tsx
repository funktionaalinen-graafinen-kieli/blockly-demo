import React, { useState } from "react"
import Blockly from "blockly"

import { guiImages } from "../Gui/image_storage"
import Editor, { generateCode } from "../BlocklyEditor/editor"

const entityBaseXml = (entityId: string, entity_type: string) => {
    if (entity_type === "TIETOVEKOTIN") {
        return `<xml xmlns="https://developers.google.com/blockly/xml">
                    <block type="funkly_guientity" id="${entityId}" x="420" y="239">
                        <field name="name">esimerkkinimi</field>
                        <field name="initx">1</field>
                        <field name="inity">1</field>
                        <field name="width">60</field>
                        <field name="height">60</field>
                        <field name="radius">60</field>
                        <statement name="x">
                        <shadow type="funkly_get" >
                            <field name="entity">NOT_SELECTED</field>
                            <field name="property">x</field>
                        </shadow>
                        </statement>
                        <statement name="y">
                        <shadow type="funkly_get" >
                            <field name="entity">NOT_SELECTED</field>
                            <field name="property">y</field>
                        </shadow>
                        </statement>
                        <statement name="img">
                        <shadow type="funkly_img" >
                            <field name="IMAGE">actual_pisteet_tyhja_address</field>
                        </shadow>
                        </statement>
                    </block>
                </xml>`
    }
    return `<xml xmlns="https://developers.google.com/blockly/xml">
                <block type="funkly_entity" id="${entityId}" x="420" y="239">
                    <field name="name">esimerkkinimi</field>
                    <field name="initx">1</field>
                    <field name="inity">1</field>
                    <field name="width">60</field>
                    <field name="height">60</field>
                    <field name="radius">60</field>
                    <statement name="x">
                    <shadow type="funkly_get" >
                        <field name="entity">NOT_SELECTED</field>
                        <field name="property">x</field>
                    </shadow>
                    </statement>
                    <statement name="y">
                    <shadow type="funkly_get" >
                        <field name="entity">NOT_SELECTED</field>
                        <field name="property">y</field>
                    </shadow>
                    </statement>
                    <statement name="img">
                    <shadow type="funkly_img" >
                        <field name="IMAGE">/static/media/default_image.a25c40e5.png</field>
                    </shadow>
                    </statement>
                </block>
            </xml>`
}

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
    characterMap: Map<string, Blockly.Workspace>
    setSelectedCharacter: (_: string) => void
}

const NewCharacterMenu = (props: NewCharacterMenuProps) => {
    const buttonClick = (entityType: string) => {
        props.setNewEntityMode(false)
        createNewCharacter(entityType)
    }
    
    const createNewCharacter = (entityType: string) => {
        const workspace = new Blockly.Workspace()
        const entityId = generateId(10)

        // TODO: Find a cleaner way
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(entityBaseXml(entityId, entityType)), workspace)
        props.characterMap.set(entityId, workspace)
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

const NewCharacterButton = (props: NewCharacterButtonProps) => <img
    src={guiImages.get("pluswhite")}
    alt="add character"
    width={75}
    height={75}
    style={{ position: "absolute", right: 0, bottom: 0 }}
    onClick={() => props.setNewEntityMode(true)}
/>


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
        console.debug("delete character")
        props.characterMap.delete(entityId)
    }

    const entities = JSON.parse(generateCode(props.characterMap)).entities

    const characterCards = Object.values(entities).map((entity: any, index) => {
        const entityId = Object.keys(entities)[index]
        return (
            <div
                key={index}
                style={{ padding: 10, cursor: "pointer" }}
                onClick={() => setSelectedCharacter(entityId)}
            >
                <CharacterCard
                    name={entity.name[1]}
                    img={entity.img[1]}
                    delete={() => deleteCharacter(entityId)}
                />
            </div>
        )
    })

    return (
        <>
            {newEntityMode ? (
                <NewCharacterMenu
                    setNewEntityMode={setNewEntityMode}
                    characterMap={props.characterMap}
                    setSelectedCharacter={setSelectedCharacter}
                />
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyItems: "center" }}>
                    {characterCards} 
                    <NewCharacterButton setNewEntityMode={setNewEntityMode}/>
                </div>
            )}
        </>
    )
}

export default CharacterSelector
