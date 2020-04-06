import { funklyTheme } from "./blockly_theme"
import { initialXml } from "./initial_xml"
import Blockly from "blockly"

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
    renderer: string
    theme: Blockly.Theme
}

export const BLOCKLYCONFIG: BlocklyWorkSpaceOptions = {
    readOnly: false,
    trashcan: true,
    renderer: "funkly_renderer",
    theme: funklyTheme,
    zoom: { controls: true, wheel: false, startScale: 0.8, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
    move: { scrollbars: true, drag: false, wheel: true },
    // FIXME: use editor's xml parsing here (give it the raw xml stirng or something)
    initialXml: decodeURI(initialXml)
}
