import React, {CSSProperties} from "react"

const codeStyle: CSSProperties = {
    height: "100%",
    width: "20%",
    left: "82%",
    position: "absolute"
}


function CodeRenderer(props: { code: string}) {
    return (
        <div style={codeStyle}>
            <h2>Generoitu JS</h2>
            { props.code }
        </div>
    )
}

export default CodeRenderer
