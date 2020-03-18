import React from "react"

interface CodeRendererProps {
    debugToggle: boolean, code: string
}

const CodeRenderer: React.FC<CodeRendererProps> = (props: CodeRendererProps) => {
    return (
        <div>
            { props.debugToggle && props.code && <><h2>Generoitu JS</h2>
                <pre>
                    {JSON.stringify(JSON.parse(props.code), null, 4)}
                </pre>
            </>
            }
        </div>
    )
}

export default CodeRenderer
