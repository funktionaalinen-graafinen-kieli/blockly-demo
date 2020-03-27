import React from "react"
import Editor from "../BlocklyEditor/editor"

const entityMap = {
    "entities": {
        "J|*C80I]n-iaRWfN[9B1": {
            "name": [
                "packF(id)",
                "kilpikonna"
            ],
            "img": [
                "pack(  '\"/static/media/turtle.fda1f442.png\"')",
                "/static/media/default_image.5d478a5d.png"
            ]
        },
        "]h;BXQeK[(LG98GJ4~2M": {
            "name": [
                "packF(id)",
                "muovipussi"
            ],
            "img": [
                "pack(  '\"/static/media/plasticbag.7e82159b.png\"')",
                "/static/media/default_image.5d478a5d.png"
            ]
        }
    }
}

interface CharacterSelectorProps {
    editor: React.RefObject<Editor> 
}

const CharacterSelector = (props: CharacterSelectorProps) => {
    if (!props.editor.current) return null
    // We should hook somehow that after the ref is fulfilled a re-render / re-mount is triggered
    const editor = props.editor!.current

    const setSelectedCharacter = () => {
        editor.setSelectedCharacter
    }
    const createNewCharacter = () => {
        editor.createNewCharacter
    }

    return null
}

export default CharacterSelector
