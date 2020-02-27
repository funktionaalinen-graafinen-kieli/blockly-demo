import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as Blockly from "blockly"
import * as log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import { Block, Category } from "./BlocklyReact/blockly_jsx_wrappers"
import { BLOCKLYCONFIG } from "./BlocklyReact/blockly_workspace_config"

const editorBlocks = (
    <React.Fragment>
        <Category name="Matikka" colour={230}>
            <Block type="funkly_col" />
            <Block type="funkly_math" />
            <Block type="funkly_trig" />
            <Block type="funkly_number" />
        </Category>
        <Category name="Logiikka" colour={200}>
            <Block type="funkly_cond" />
            <Block type="funkly_comp" />
        </Category>
        <Category name="Hahmopalikat" colour={140}>
            <Block type="funkly_entity" />
            <Block type="funkly_guientity" />
            <Block type="funkly_key" />
            <Block type="funkly_bindget" />
            <Block type="funkly_get" />
            <Block type="funkly_img" />
        </Category>
    </React.Fragment>
)

const defaultBinds = `
"binds": {
    "frameTime": ["packF(id)", 16],
    "time": ["pack(add(get('time'))(get('frameTime')))", 0],
    "random": ["(x,s) => Math.random()", 0],
    "everySecond": ["packF(timer)", [false, 0, 1000]]
}
`

class Editor extends React.Component<{}> {
    blocklyReactInstance = React.createRef<BlocklyComponent>()
    readonly state = { code: "", blockXml: "" }

    private generateCode = (): [string, string] => {
        const workspace = this.blocklyReactInstance.current!.workspace
        const entities = workspace.getBlocksByType("funkly_entity", true)
            .concat(workspace.getBlocksByType("funkly_guientity", true))

        const xmlWorkspace = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace))

        // Generate code for each entity and place commas
        let engineCode = '{ "entities": {'
        entities.slice(0, -1).forEach(e => (engineCode += BlocklyJS.blockToCode(e) + ","))
        // Leave out comma from last entity
        engineCode += BlocklyJS.blockToCode(entities.slice(-1)[0])
        engineCode += "}, "
        engineCode += defaultBinds + "}"

        return [engineCode, xmlWorkspace]
    }

    setCode = (engineCode: string, xmlWorkspace: string) => {
        this.setState({
            code: engineCode,
            blockXml: xmlWorkspace
        })
    }

    generateAndSetCode = () => {
        this.setCode(...this.generateCode())
    }

    componentDidMount(): void {
        this.blocklyReactInstance.current!.workspace.addChangeListener(this.generateAndSetCode)
        log.debug("Mounted change listener on workspace")
    }

    componentWillUnmount(): void {
        this.blocklyReactInstance.current!.workspace.removeChangeListener(this.generateAndSetCode)
    }

    render = () => {
        Blockly.Flyout.prototype.autoClose = false
        return (
            <div className="Editor">
                <BlocklyComponent ref={this.blocklyReactInstance} {...BLOCKLYCONFIG}>
                    {editorBlocks}
                </BlocklyComponent>
            </div>
        )
    }
}

function saveProject(blockXml: string): void {
    localStorage.setItem("defaultProject", blockXml)
}

function loadProject(blocklyComponent: BlocklyComponent): void {
    const a = localStorage.getItem("defaultProject") || '<xml xmlns="https://developers.google.com/blockly/xml"/>'
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(a), blocklyComponent.workspace)
}

export default Editor
export { saveProject, loadProject }
