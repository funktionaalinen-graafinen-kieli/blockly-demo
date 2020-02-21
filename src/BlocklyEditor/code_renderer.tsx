import React from "react"

function CodeRenderer(props: { debugToggle: boolean, code?: string }) {
    if (!props.debugToggle) return null
    return (
        <div>
            <h2>Generoitu JS</h2>
            <pre>
                {props.code}
            </pre>
        </div>
    )
}

export default CodeRenderer
