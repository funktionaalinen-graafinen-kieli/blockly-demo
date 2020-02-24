import { initialXml } from "./initial_xml"

interface BlocklyWorkSpaceOptions {
    readOnly: boolean
    trashcan: boolean
    move: {
        scrollbars: boolean
        drag: boolean
        wheel: boolean
    }
    initialXml: string
    renderer: string
}

export const BLOCKLYCONFIG: BlocklyWorkSpaceOptions = {
    readOnly: false,
    trashcan: true,
    renderer: "funkly_renderer",
    move: { scrollbars: true, drag: false, wheel: true },
    initialXml: decodeURI(initialXml)
}
