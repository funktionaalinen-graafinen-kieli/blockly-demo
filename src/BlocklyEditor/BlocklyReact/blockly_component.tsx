import React from "react"
import Blockly from "blockly"
import eventHandlers from "./custom_event_handlers"
import locale from "blockly/msg/en"

import "./blockly_theme"
import "./custom_blocks/registration"

Blockly.setLocale(locale)
export class BlocklyComponent extends React.Component<{}> {
    private toolbox = React.createRef<HTMLElement>()
    private blocklyDiv = React.createRef<HTMLDivElement>()
    primaryWorkspace!: Blockly.Workspace

    componentDidMount() {
        const { children, ...rest } = this.props

        this.primaryWorkspace = Blockly.inject(this.blocklyDiv.current!, {
            toolbox: this.toolbox.current!,
            ...rest
        })
        // register custom events
        eventHandlers.forEach(e => this.primaryWorkspace.addChangeListener(e))

    }

    changeWorkspaceContents(newBlocks: Blockly.Workspace) {
        // TODO: Figure a nicer way to do this
        console.debug("replacing workspace contents with contents of ")
        console.debug(newBlocks)
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.workspaceToDom(newBlocks), this.primaryWorkspace)

    }

    render() {
        return (
            <React.Fragment>
                <div ref={this.blocklyDiv} id="blocklyDiv" className="funkly-blockly-div" />
                {/* Needed to ignore xml error
                //@ts-ignore */}
                <xml
                    xmlns="https://developers.google.com/blockly/xml"
                    is="blockly"
                    style={{ display: "none" }}
                    ref={this.toolbox}
                >
                    {this.props.children}
                    {/* Needed to ignore xml error
                //@ts-ignore */}
                </xml>
            </React.Fragment>
        )
    }
}
export default BlocklyComponent
