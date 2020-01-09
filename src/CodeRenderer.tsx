import React, {CSSProperties} from "react"
import * as log from "loglevel"

const codeStyle: CSSProperties = {
    height: "100%",
    width: "20%",
    left: "82%",
    position: "absolute"
}


function CodeRenderer(props: { generateCode: () => string, key: number}) {
    log.trace("Firing renderer")
    return (
        <div style={codeStyle}>
            code should show here
            { props.generateCode() }
        </div>
    )
}

export default CodeRenderer