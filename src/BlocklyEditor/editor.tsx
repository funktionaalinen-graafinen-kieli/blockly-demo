import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as Blockly from "blockly"
import * as log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import {Block} from "./BlocklyReact/blockly_jsx_wrappers"
import CodeRenderer from "./code_renderer"
import {BLOCKLYCONFIG} from "./BlocklyReact/blockly_workspace_config"

const editorBlocks =  (
    <React.Fragment>
        <Block type="funkly_add"/>
        <Block type="funkly_number"/>
        <Block type="funkly_cond"/>
        <Block type="funkly_gt"/>
        <Block type="funkly_entity"/>
        <Block type="funkly_bind"/>
        <Block type="funkly_get"/>
        <Block type="text"/>
    </React.Fragment>
)

class Editor extends React.Component {
    private blocklyComponent!: BlocklyComponent
    readonly state = {code: "", blockXml: ""}

    generateCode = () => {
        const workspace = this.blocklyComponent.workspace
        const entities = workspace.getBlocksByType("funkly_entity",true)

        const xmlWorkspace = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace))

        // Generate code for each entity and place commas
        let engineCode = '{ "entities": {'
        entities.slice(0,-1).forEach(e => engineCode += BlocklyJS.blockToCode(e) + ',')
        engineCode += BlocklyJS.blockToCode(entities.slice(-1)[0])
        engineCode += "} }"

        this.setState({
            code: engineCode,
            blockXml : xmlWorkspace
        })
    }

    componentDidMount(): void {
        this.blocklyComponent?.workspace.addChangeListener(this.generateCode)
        log.debug("Mounted change listener on workspace")
    }

    componentWillUnmount(): void {
        this.blocklyComponent?.workspace.removeChangeListener(this.generateCode)
    }

    render = () => {
        return (
            <div className="Editor">
                <BlocklyComponent
                    ref={(event: BlocklyComponent) => {
                        this.blocklyComponent = event
                    }}
                    {...BLOCKLYCONFIG}
                >
                    {editorBlocks}
                </BlocklyComponent>
                <CodeRenderer code={this.state.code} blockXml={this.state.blockXml}/>
            </div>
        )
    }
}

export default Editor
