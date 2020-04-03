import React, { useState } from "react"
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
    delete: any
}

const CharacterCard = (props: CharacterCardProps) => {
    return (
        <div className="funkly-character-card">
            <img
                src={"https://cdn2.iconfinder.com/data/icons/minimal-4/100/close-512.png"}
                alt="..."
                style={{ position: "absolute", height: 20, width: 20 }}
                onClick={props.delete}
            />
            <img src={props.img} alt="..." style={{ height: 50, width: 50 }} />
            <p>{props.name}</p>
        </div>
    )
}

interface NewCharacterMenuProps {
    toggleNewCharacterMode: any
    createNewCharacter: any
}

const NewCharacterMenu = (props: NewCharacterMenuProps) => {
    return (
        <div style={{ padding: 10 }}>
            <p>Hahmo</p>
            <form
                onSubmit={() => {
                    props.toggleNewCharacterMode()
                    props.createNewCharacter()
                }}
            >
                <label>Nimi</label>
                <br />
                <input type="text" />
                <hr />
                <label>Kuva</label>
                <br />
                <select>
                    <option>Doge 1</option>
                    <option>Doge 2</option>
                    <option>Doge 3</option>
                    <option>Doge 4</option>
                </select>
                <hr />
                <button type="submit">{"Valmis"}</button>
            </form>
        </div>
    )
}

interface CharacterSelectorProps {
    editor: React.RefObject<Editor>
}

const CharacterSelector = (props: CharacterSelectorProps) => {
    const [showNewEntityMode, setShowNewEntityMode] = useState(false)

    if (!props.editor.current) return null
    // We should hook somehow that after the ref is fulfilled a re-render / re-mount is triggered
    const editor = props.editor!.current

    const setSelectedCharacter = (entityId: string) => {
        console.log("setSelectedCharacter:", entityId)
        editor.setSelectedCharacter(entityId)
    }

    const createNewCharacter = (id: string, name: string, img: string) => {
        // TODO
        // entityMap["entities"][id] = { name: ["packF(id)", name], img: [`pack(  '\"${img}\"')`, img] }
    }

    const deleteCharacter = (entityId: string) => {
        const entities = entityMap.entities
        // delete entities[entityId]
    }

    return (
        <>
            {showNewEntityMode ? (
                <NewCharacterMenu
                    toggleNewCharacterMode={() => setShowNewEntityMode(false)}
                    createNewCharacter={createNewCharacter}
                />
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyItems: "center" }}>
                    {Object.values(entityMap.entities).map((entity, index) => {
                        const entityId = Object.keys(entityMap["entities"])[index]
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
                    })}
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/media-buttons-1/200/761-512.png"
                        width={75}
                        height={75}
                        style={{ position: "absolute", right: 0, bottom: 0 }}
                        onClick={() => setShowNewEntityMode(true)}
                    />
                </div>
            )}
        </>
    )
}

export default CharacterSelector
