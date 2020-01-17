import React, {CSSProperties} from "react"
import * as log from "loglevel"

const codeStyle: CSSProperties = {
    height: "100%",
    width: "20%",
    left: "82%",
    position: "absolute"
}


function CodeRenderer(props: { code: string}) {
    log.trace("Firing renderer")
    return (
        <div style={codeStyle}>
            <h1>Generated JS code is here</h1>
            { props.code }
        </div>
    )
}

export default CodeRenderer
