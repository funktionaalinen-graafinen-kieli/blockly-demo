import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as log from "loglevel"

import BlocklyComponent from "./Blockly/blockly_component"
import { Block, Value, Field } from "./Blockly/blockly_jsx_wrappers"
import blocklyConfig from "./Blockly/config"
import CodeRenderer from "./code_renderer"


const blocks =  (
    <React.Fragment>
        <Block type="test_react_field"/>
        <Block type="text_print"/>
        <Block type="controls_ifelse"/>
        <Block type="logic_compare"/>
        <Block type="logic_operation"/>
        <Block type="logic_operation"/>
        <Block type="logic_negate"/>
        <Block type="logic_boolean"/>
        <Block type="logic_null" disabled={false}/>
        <Block type="text_charAt">
            <Value name="VALUE">
                <Block type="variables_get">
                    <Field name="VAR">text</Field>
                </Block>
            </Value>
        </Block>
    </React.Fragment>
)

class Editor extends React.Component {
    private simpleWorkspace!: BlocklyComponent
    readonly state = { code: "" }

    generateCode = () => {
        // Concise null check
        this.setState({code : BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace)})
    }
    componentDidMount(): void {
        this.simpleWorkspace?.workspace.addChangeListener(this.generateCode)
        log.trace("Mounted change listener on workspace")
    }
    componentWillUnmount(): void {
        this.simpleWorkspace?.workspace.removeChangeListener(this.generateCode)
    }


    render = () => {
        return (
            <div className="Editor">
                <BlocklyComponent
                    ref = {(event: BlocklyComponent) => { this.simpleWorkspace = event }}
                    {...blocklyConfig}>
                    {blocks}
                </BlocklyComponent>
                <CodeRenderer code={this.state.code}/>
            </div>
        )
    }
}

export default Editor