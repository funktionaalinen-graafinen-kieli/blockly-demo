import React from "react"

export function StateMap(props) {
    if (!props.gameState) return <></>
    const table = []
    props.gameState.forEach((value, key) => {
        table.push(
            <p key={key}>
                {key} => {value}
            </p>
        )
    })

    return (
        <div style={{ background: "orange" }}>
            <h3>State</h3>

            {table}
        </div>
    )
}
