import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import {Block, Value, Field} from "./BlocklyReact/blockly_jsx_wrappers"
import blocklyConfig from "./BlocklyReact/config"
import CodeRenderer from "./code_renderer"

const editorBlocks =  (
    <React.Fragment>
        <Block type="funkly_cond"/>
        <Block type="funkly_gt"/>
        <Block type="funkly_number"/>
        {/*
        <Block type="logic_compare"/>
        <Block type="logic_operation"/>
        <Block type="logic_negate"/>
        <Block type="logic_boolean"/>
        <Block type="logic_null" disabled={false}/>
        <Block type="text"/>
        <Block type="text_print"/>
        <Block type="text_charAt">
            <Value name="VALUE">
                <Block type="variables_get">
                    <Field name="VAR">text</Field>
                </Block>
            </Value>
        </Block>
        */}
    </React.Fragment>
)

class Editor extends React.Component {
  private blocklyComponent!: BlocklyComponent
  readonly state = {code: ""};

  generateCode = () => {
      this.setState({code: BlocklyJS.workspaceToCode(this.blocklyComponent.workspace)})
  }
  componentDidMount(): void {
    this.blocklyComponent?.workspace.addChangeListener(this.generateCode)
    log.trace("Mounted change listener on workspace")
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
                  {...blocklyConfig}
              >
                  {editorBlocks}
              </BlocklyComponent>
              <CodeRenderer code={this.state.code} />
          </div>
      )
  }
}

export default Editor
