import React from "react"
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
        }
    }
}

interface CharacterCardProps {
    name: string
    img: string
}

const CharacterCard = (props: CharacterCardProps) => {
    return (
        <div style={{ height: 75, width: 50, backgroundColor: "tomato", borderRadius: 5 }}>
            <img src={props.img} style={{ height: 50, width: 50 }} />
            <p>{props.name}</p>
        </div>
    )
}

interface CharacterSelectorProps {
    editor: React.RefObject<Editor>
}

const CharacterSelector = (props: CharacterSelectorProps) => {
    if (!props.editor.current) return null
    // We should hook somehow that after the ref is fulfilled a re-render / re-mount is triggered
    const editor = props.editor!.current

    const setSelectedCharacter = () => {
        // TODO
    }

    const createNewCharacter = (id: string, name: string, img: string) => {
        // TODO
        // entityMap["entities"][id] = { name: ["packF(id)", name], img: [`pack(  '\"${img}\"')`, img] }
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "100px 100px 100px" }}>
            {Object.values(entityMap.entities).map((entity, index) => (
                <div key={index}>
                    {console.log("index % 3:", index % 3)}
                    {console.log("Math.floor(index / 3):", Math.floor(index / 3))}
                    <CharacterCard
                        name={"Test"}
                        img={"https://staging-funkly.herokuapp.com/static/media/turtle.fda1f442.png"}
                    />
                </div>
            ))}
        </div>
    )
}

export default CharacterSelector
