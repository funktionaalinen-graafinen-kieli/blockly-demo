interface BlocklyConfig {
    readOnly: boolean,
    move: {
        scrollbars: boolean,
        drag: boolean,
        wheel: boolean
    },
    initialXml: string
}

const blocklyConfig: BlocklyConfig = {
    readOnly: false,
    move: {scrollbars: true, drag: false, wheel: true},
    initialXml:`
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="controls_ifelse" x="0" y="0"></block>
        </xml>`
}

export default blocklyConfig