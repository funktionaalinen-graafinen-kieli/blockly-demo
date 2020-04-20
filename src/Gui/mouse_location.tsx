import React from "react"
import { guiImages } from "./image_storage"

export const MouseLocation = (props: { children?: React.ReactNode }) => {
    const [mouseX, setMouseX] = React.useState(0)
    const [mouseY, setMouseY] = React.useState(0)
    const myRef = React.createRef<HTMLDivElement>()
    const hoverAction = (event: React.MouseEvent<HTMLDivElement>) => {
        const [newX, newY] = [event.nativeEvent.clientX, event.nativeEvent.clientY]
        const offsetLeft = myRef ? myRef.current ? myRef.current.offsetLeft : 0 : 0
        const offsetTop = myRef ? myRef.current ? myRef.current.offsetTop : 0 : 0
        // 25 left padding used in funkly_app.css
        setMouseX(newX - offsetLeft)
        setMouseY(newY - offsetTop)
    }
    return (
        <div onMouseMove={hoverAction} ref={myRef}>
            <div className="funkly-mouse-location">
                <img className="funkly-mouse-icon" src={guiImages.get("mouseicon")} alt="mouseicon" />
                {mouseX}, {mouseY}
            </div>
            {props.children}
        </div>
    )
}

