import React from "react"
import { FunklyContext } from "../Store/funkly_store"

const CodeRenderer: React.FC = (props) => {
    return (
        <FunklyContext.Consumer>
            {({code, debugToggle}) => (
                <div>
                    { debugToggle && code && <><h2>Generoitu JS</h2>
                        <pre>
                            {JSON.stringify(JSON.parse(code), null, 4)}
                        </pre>
                    </>
                    }
                </div>
            )}
        </FunklyContext.Consumer>
    )
}

export default CodeRenderer
