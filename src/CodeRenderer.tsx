// eslint-disable-next-line no-unused-vars
import React, {CSSProperties} from "react"

const codeStyle: CSSProperties = {
    height: "100%",
    width: "20%",
    left: "82%",
    position: "absolute"
}


function CodeRenderer(props: { generateCode: () => string, key: number}) {
    return (
        <div style={codeStyle}>
            <text>code should show here</text>
            <text>{ props.generateCode() }</text>
        </div>
    )
}

export default CodeRenderer