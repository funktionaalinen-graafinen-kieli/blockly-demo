import * as React from "react"

import * as BlocklyJS from "blockly/javascript"
import BlocklyComponent from "./Blockly/BlocklyComponent"
import { Block, Value, Field } from "./Blockly/BlocklyReactConstants"
import CodeRenderer from "./CodeRenderer"

class Editor extends React.Component {
    private simpleWorkspace: BlocklyComponent | null = null

    generateCode = () : string => {
        if (this.simpleWorkspace) {
            return BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace)
        } else {
            console.log("funkly program code not found for generation")
            return ""
        }
    }
    componentDidMount(): void {
        this.simpleWorkspace?.workspace.addChangeListener(this.incrementKey)
    }
    componentWillUnmount(): void {
        this.simpleWorkspace?.workspace.removeChangeListener(this.incrementKey)
    }

    render = () => {
        return (
            <div className="Editor">
                <BlocklyComponent ref={event => this.simpleWorkspace = event} readOnly={false} move={
                    { scrollbars: true, drag: false, wheel: true }
                } initialXml={`
                    <xml xmlns="http://www.w3.org/1999/xhtml">
                        <block type="controls_ifelse" x="0" y="0"></block>
                    </xml>
                `}>
                    <Block type="test_react_field"/>
                    <Block type="text_print"/>
                    <Block type="controls_ifelse"/>
                    <Block type="logic_compare"/>
                    <Block type="logic_operation"/>
                    <Block type="logic_operation"/>
                    <Block type="logic_negate"/>
                    <Block type="logic_boolean"/>
                    <Block type="logic_null" disabled="true"/>
                    <Block type="logic_ternary"/>
                    <Block type="text_charAt">
                        <Value name="VALUE">
                            <Block type="variables_get">
                                <Field name="VAR">text</Field>
                            </Block>
                        </Value>
                    </Block>
                </BlocklyComponent>

                <CodeRenderer generateCode={this.generateCode} key={this.key}/>
            </div>
        )
    }

    private key = 0
    private incrementKey = () => {
        this.key++
    }
}

export default Editor