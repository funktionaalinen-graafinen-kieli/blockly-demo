import React from "react"

class FunklyState {
    code = ""
    blockXml = ""
    debugToggle = false
    gameRunning = false

    setCode = (code: string) => {this.code = code}
    setBlockXml = (blockXml: string) => {this.blockXml = blockXml}
    toggleGame = () => { this.gameRunning= !this.gameRunning }
    toggleDebug = () => { this.debugToggle = !this.debugToggle }

}

const FunklyContext = React.createContext(new FunklyState())

export { FunklyState, FunklyContext }
