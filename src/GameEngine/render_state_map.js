import React from "react"

export const RenderStateMap = props => {
    if (!props.gameState) return null
    const table = []
    props.gameState.forEach((value, key) => {
        table.push(
            <p>
                {key} => {value}
            </p>
        )
    })
    return table
}