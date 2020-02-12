import React from "react"

export const StateMap = props => {
    if (!props.gameState) return null
    const table = []
    props.gameState.forEach((value, key) => {
        table.push(
            <p>
                {key} => {value}
            </p>
        )
    })
    return <div style={{ background: "orange" }}>
        <h3>State</h3>>
        {table}
    </div>
}