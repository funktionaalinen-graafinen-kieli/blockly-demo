import { initialXml } from "./initial_xml"

interface BlocklyWorkSpaceOptions {
    readOnly: boolean
    trashcan: boolean
    zoom: {
        controls: boolean
        wheel: boolean
        startScale: number
        maxScale: number
        minScale: number
        scaleSpeed: number
    }
    move: {
        scrollbars: boolean
        drag: boolean
        wheel: boolean
    }
    initialXml: string
}

export const BLOCKLYCONFIG: BlocklyWorkSpaceOptions = {
    readOnly: false,
    trashcan: true,
    zoom: { controls: true, wheel: false, startScale: 0.8, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
    move: { scrollbars: true, drag: false, wheel: true },
    initialXml: decodeURI(initialXml)
}
