import React from "react"

export const MouseLocation = (props: {children?: React.ReactNode}) => {
    const [mouseX, setMouseX] = React.useState(0)
    const [mouseY, setMouseY] = React.useState(0)
    const hoverAction = (event: React.MouseEvent<HTMLDivElement>) => {
        const [newX, newY] = [event.nativeEvent.offsetX, event.nativeEvent.offsetY]
        setMouseX(newX)
        setMouseY(newY)
    }
    return (
        <div onMouseMove={hoverAction}>
            Hiiren sijainti: {mouseX}, {mouseY}
            {props.children}
        </div>
    )
}

