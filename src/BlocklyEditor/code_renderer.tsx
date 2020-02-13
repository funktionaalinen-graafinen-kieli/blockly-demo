import React, {CSSProperties} from "react"

const codeStyle: CSSProperties = {
    height: "100%",
    width: "20%",
    left: "82%",
    position: "absolute"
}


function CodeRenderer(props: { code: string, blockXml: string}) {
    let engineCode = '"entities": {'
    engineCode += props.code
    engineCode += "}"

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
