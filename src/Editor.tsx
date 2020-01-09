import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as log from "loglevel"

import BlocklyComponent from "./Blockly/BlocklyComponent"
import { Block, Value, Field } from "./Blockly/BlocklyReactConstants"
import CodeRenderer from "./CodeRenderer"
import {ReactElement} from "react"

interface BlocklyConfig {
    readOnly: boolean,
    move: {
        scrollbars: boolean,
        drag: boolean,
        wheel: boolean
    },
    initialXml: string
}
const blocklyConfig: BlocklyConfig = {
    readOnly : false,
    move:{ scrollbars: true, drag: false, wheel: true },
    initialXml : `
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="controls_ifelse" x="0" y="0"></block>
        </xml>`
}

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
        <Block type="logic_null" disabled="false"/>
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
    private simpleWorkspace: BlocklyComponent | null = null
    readonly state = { key: 0 }

    generateCode = () : string => {
        // Concise null check
        const code: string = this.simpleWorkspace
            && BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace)
        return code
    }
    componentDidMount(): void {
        this.simpleWorkspace?.workspace.addChangeListener(this.incrementKey)
        log.trace("Mounted change listener on workspace")
    }
    componentWillUnmount(): void {
        this.simpleWorkspace?.workspace.removeChangeListener(this.incrementKey)
    }


    render = () => {
        return (
            <div className="Editor">
                <BlocklyComponent
                    ref = {(event: BlocklyComponent | null) => { this.simpleWorkspace = event }}
                    {...blocklyConfig}>
                    {blocks}
                </BlocklyComponent>
                <CodeRenderer generateCode={this.generateCode} key={this.state.key}/>
            </div>
        )
    }

    private incrementKey = () => {
        log.trace("Incrementing key, current val: " + this.state.key)
        this.setState({key : this.state.key + 1})
    }
}

export default Editor