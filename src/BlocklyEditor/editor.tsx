import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as Blockly from "blockly"
import * as log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import { Block } from "./BlocklyReact/blockly_jsx_wrappers"
import CodeRenderer from "./code_renderer"
import { BLOCKLYCONFIG } from "./BlocklyReact/blockly_workspace_config"

const editorBlocks = (
    <React.Fragment>
        <Block type="funkly_add" />
        <Block type="funkly_number" />
        <Block type="funkly_cond" />
        <Block type="funkly_gt" />
        <Block type="funkly_entity" />
        // TODO implement list of binds (same way as entities)
        //<Block type="funkly_bind" />
        <Block type="funkly_get" />
        <Block type="text" />
    </React.Fragment>
)

const defaultBinds = `
"binds": {
    "frameTime": ["packF(id)", 16],
    "time": ["pack(add(get('time'))(get('frameTime')))", 0],
    "everySecond": ["packF(timer)", [false, 0, 1000]]
}
`

class Editor extends React.Component<{}> {
    private blocklyComponent!: BlocklyComponent
    readonly state = { code: "", blockXml: "" }

    generateCode = () => {
        const workspace = this.blocklyComponent.workspace
        const entities = workspace.getBlocksByType("funkly_entity", true)

        const xmlWorkspace = Blockly.Xml.domToPrettyText(
            Blockly.Xml.workspaceToDom(workspace)
        )

        // Generate code for each entity and place commas
        let engineCode = '{ "entities": {'
        entities
            .slice(0, -1)
            .forEach(e => (engineCode += BlocklyJS.blockToCode(e) + ","))
        // Leave out comma from last entity
        engineCode += BlocklyJS.blockToCode(entities.slice(-1)[0])
        engineCode += "}, "
        engineCode += defaultBinds + "}"

        this.setState({
            code: engineCode,
            blockXml: xmlWorkspace
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
                <CodeRenderer
                    code={this.state.code}
                    blockXml={this.state.blockXml}
                />
            </div>
        )
    }
}

function saveProject(blockXml: string): void {
    localStorage.setItem("defaultProject", blockXml)
}

function loadProject(blocklyComponent: BlocklyComponent): void {
    const a =
        localStorage.getItem("defaultProject") ||
        '<xml xmlns="https://developers.google.com/blockly/xml"/>'
    Blockly.Xml.clearWorkspaceAndLoadFromXml(
        Blockly.Xml.textToDom(a),
        blocklyComponent.workspace
    )
}

export default Editor
export {saveProject, loadProject}
