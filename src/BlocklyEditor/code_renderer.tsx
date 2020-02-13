import React, {CSSProperties} from "react"
import {Block} from "blockly"
import * as BlocklyJS from "blockly/javascript"

const codeStyle: CSSProperties = {
    height: "100%",
    width: "20%",
    left: "82%",
    position: "absolute"
}


function CodeRenderer(props: { code: string, entities: Block[], blockXml: string}) {
    let engineCode = '{ "entities": {'
    props.entities.slice(0,-1).forEach(e => engineCode += BlocklyJS.blockToCode(e) + ',')
    engineCode += BlocklyJS.blockToCode(props.entities.slice(-1)[0])
    engineCode += "} }"

    return (
        <div style={codeStyle}>
            <h2>Generoitu JS</h2>
            { engineCode }
            <h2>Palikka-xml</h2>

            { props.blockXml.toString() }
        </div>
    )
}

export default CodeRenderer
