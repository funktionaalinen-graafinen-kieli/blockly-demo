import React from "react"
import { guiImages } from "./image_storage"

export const MouseLocation = (props: {children?: React.ReactNode}) => {
    const [mouseX, setMouseX] = React.useState(0)
    const [mouseY, setMouseY] = React.useState(0)
    const hoverAction = (event: React.MouseEvent<HTMLDivElement>) => {
        const [x, y] = [event.clientX, event.clientY]
        console.log(`x: ${x}, y: ${y}`)
        const [newX, newY] = [event.nativeEvent.offsetX, event.nativeEvent.offsetY]
        setMouseX(newX)
        setMouseY(newY)
    }
    return (
        <div onMouseMove={hoverAction}>
            <div className="funkly-mouse-location">
                <img className="funkly-mouse-icon" src={guiImages.get("mouseicon")} alt="mouseicon" />
                {mouseX}, {mouseY}
            </div>
            {props.children}
        </div>
    )
}

