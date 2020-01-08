import * as React from "react"

import * as BlocklyJS from "blockly/javascript"
import BlocklyComponent, { Block, Value, Field, Shadow } from "./components/Blockly"

class Editor extends React.Component {
    generateCode = () => {
        if (this.simpleWorkspace) {
            const code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace)
            console.log(code)
        }
    }

    render = () => {
        return (
            <div className = "Editor">
                <button onClick={this.generateCode}>Convert</button>
                <BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} move={{
                    scrollbars: true,
                    drag: false,
                    wheel: true
                }}>
                    <Block type="test_react_field"/>
                    <Block type="text_print"/>
                    <Block type="controls_ifelse" />
                    <Block type="logic_compare" />
                    <Block type="logic_operation" />
                    <Block type="logic_operation" />
                    <Block type="logic_negate" />
                    <Block type="logic_boolean" />
                    <Block type="logic_null" disabled="true" />
                    <Block type="logic_ternary" />
                    <Block type="text_charAt">
                        <Value name="VALUE">
                            <Block type="variables_get">
                                <Field name="VAR">text</Field>
                            </Block>
                        </Value>
                    </Block>
                </BlocklyComponent>
            </div>
        )
    }
    private simpleWorkspace: BlocklyComponent | null = null
}

export default Editor