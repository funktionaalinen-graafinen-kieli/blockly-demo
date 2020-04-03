import React from "react"
import Blockly from "blockly"

import Editor from "../BlocklyEditor/editor"

const entityMap = {
    entities: {
        "J|*C80I]n-iaRWfN[9B1": {
            name: ["packF(id)", "kilpikonna"],
            img: ["pack(  '\"/static/media/turtle.fda1f442.png\"')", "/static/media/default_image.5d478a5d.png"]
        },
        "]h;BXQeK[(LG98GJ4~2M": {
            name: ["packF(id)", "muovipussi"],
            img: ["pack(  '\"/static/media/plasticbag.7e82159b.png\"')", "/static/media/default_image.5d478a5d.png"]
        },
        "J|*C80I]naRWfN[9B1": {
            name: ["packF(id)", "test"],
            img: ["pack(  '\"/static/media/turtle.fda1f442.png\"')", "/static/media/default_image.5d478a5d.png"]
        },
        "]h;BXQe(LG98GJ4~2M": {
            name: ["packF(id)", "test2"],
            img: ["pack(  '\"/static/media/plasticbag.7e82159b.png\"')", "/static/media/default_image.5d478a5d.png"]
        },
        "J|*C80I]nasdfRWfN[9B1": {
            name: ["packF(id)", "test3"],
            img: ["pack(  '\"/static/media/turtle.fda1f442.png\"')", "/static/media/default_image.5d478a5d.png"]
        },
        "]h;BXQe(LGsdf98GJ4~2M": {
            name: ["packF(id)", "test4"],
            img: ["pack(  '\"/static/media/plasticbag.7e82159b.png\"')", "/static/media/default_image.5d478a5d.png"]
        }
    }
}

interface CharacterCardProps {
    name: string
    img: string
}

const CharacterCard = (props: CharacterCardProps) => {
    return (
        <div className="funkly-character-card">
            <img src={props.img} alt="..." style={{ height: 50, width: 50 }} />
            <p>{props.name}</p>
        </div>
    )
}

interface CharacterSelectorProps {
    characterMap: Map<string, Blockly.Workspace>
    setSelectedCharacter: ((_: string) => void)
    editor: React.RefObject<Editor>
}

const CharacterSelector = (props: CharacterSelectorProps) => {
    if (!props.editor.current) return null
    // We should hook somehow that after the ref is fulfilled a re-render / re-mount is triggered
    const editor = props.editor!.current

    const setSelectedCharacter = (entityId: string) => {
        console.log("setSelectedCharacter:", entityId)
        props.setSelectedCharacter(entityId)
        editor.refreshSelected()
    }

    const createNewCharacter = (id: string, name: string, img: string) => {
        // TODO
        // entityMap["entities"][id] = { name: ["packF(id)", name], img: [`pack(  '\"${img}\"')`, img] }
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyItems: "center" }}>
            {Object.values(entityMap.entities).map((entity, index) => {
                const entityId = Object.keys(entityMap["entities"])[index]
                return (
                    <div
                        key={index}
                        style={{ padding: 10, cursor: "pointer" }}
                        onClick={() => setSelectedCharacter(entityId)}
                    >
                        <CharacterCard name={entity.name[1]} img={entity.img[1] } />
                    </div>
                )
            })}
        </div>
    )
}

export default CharacterSelector
