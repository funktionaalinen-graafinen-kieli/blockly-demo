interface BlocklyConfig {
    readOnly: boolean,
    trashcan: boolean
    move: {
        scrollbars: boolean,
        drag: boolean,
        wheel: boolean
    },
    initialXml: string
}

export const BLOCKLYCONFIG: BlocklyConfig = {
    readOnly: false,
    trashcan: true,
    move: {scrollbars: true, drag: false, wheel: true},
    initialXml:`
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="funkly_cond" x="0" y="0"></block>
        </xml>`
}