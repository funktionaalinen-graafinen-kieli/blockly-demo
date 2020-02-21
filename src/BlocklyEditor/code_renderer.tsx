import React from "react"

function CodeRenderer(props: { debugToggle: boolean, code?: string }) {
    if (!props.debugToggle || !props.code) return null
    return (
        <div>
            <h2>Generoitu JS</h2>
            <pre>
                {JSON.stringify(JSON.parse(props.code), null, 4)}
            </pre>
        </div>
    )
}

export default CodeRenderer
