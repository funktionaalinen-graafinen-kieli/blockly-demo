import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import * as Blockly from "blockly"
import * as log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import { Block, Category, Field, Shadow, Value } from "./BlocklyReact/blockly_jsx_wrappers"
import { BLOCKLYCONFIG } from "./BlocklyReact/blockly_workspace_config"

const editorBlocks = (
    <React.Fragment>
        <Category name="Matematiikka" colour={230}>
            <Block type="funkly_collide" />
            <Block type="funkly_math">
                <Value name="NUMBER0">
                    <Shadow type="funkly_number" />
                </Value>
                <Value name="NUMBER1">
                    <Shadow type="funkly_number" />
                </Value>
            </Block>
            <Block type="funkly_trig">
                <Value name="NUMBER0">
                    <Shadow type="funkly_number" />
                </Value>
            </Block>
            <Block type="funkly_number" />
        </Category>
        <Category name="Logiikka" colour={200}>
            <Block type="funkly_cond" />
            <Block type="funkly_comp">
                <Value name="NUMBER0">
                    <Shadow type="funkly_number" />
                </Value>
                <Value name="NUMBER1">
                    <Shadow type="funkly_number" />
                </Value>
            </Block>
        </Category>
        <Category name="Hahmopalikat" colour={140}>
            <Block type="funkly_entity">
                <Value name="x">
                    <Shadow type="funkly_get" />
                </Value>
                <Value name="y">
                    <Shadow type="funkly_get" />
                </Value>
                <Value name="img">
                    <Shadow type="funkly_img" />
                </Value>
            </Block>
            <Block type="funkly_guientity">
                <Value name="img">
                    <Shadow type="funkly_img" />
                </Value>
                <Value name="text">
                    <Shadow type="funkly_bindget">
                        <Field name="id">time</Field>
                    </Shadow>
                </Value>
            </Block>
            <Block type="funkly_keyboard_input" />
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

class Editor extends React.Component<{ contextState: any }> {
    blocklyReactInstance = React.createRef<BlocklyComponent>()
    constructor(props: any) {
        super(props)
    }

    private generateXml = (): string => {
        const workspace = this.blocklyReactInstance.current!.primaryWorkspace
        return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace))
    }

    private generateCode = (): string => {
        const workspace = this.blocklyReactInstance.current!.primaryWorkspace
        const entities = workspace
            .getBlocksByType("funkly_entity", true)
            .concat(workspace.getBlocksByType("funkly_guientity", true))

        // Generate code for each entity and place commas
        let engineCode = '{ "entities": {'
        entities.slice(0, -1).forEach(e => (engineCode += BlocklyJS.blockToCode(e) + ","))
        // Leave out comma from last entity
        engineCode += BlocklyJS.blockToCode(entities.slice(-1)[0])
        engineCode += "}, "
        engineCode += defaultBinds + "}"

        return engineCode
    }

    setCode = (engineCode: string, xmlWorkspace: string) => {
        this.props.contextState.setCode(engineCode)
        this.props.contextState.setBlockXml(xmlWorkspace)
    }

    importXml = (xmlInput: string) => {
        const stripped = xmlInput.slice(26)
        const stringed = decodeURI(eval(stripped))
        const parsed = Blockly.Xml.textToDom(stringed)

        const workspace = this.blocklyReactInstance.current!.primaryWorkspace
        Blockly.Xml.domToWorkspace(parsed, workspace)
    }

    generateAndSetCode = () => {
        this.setCode(this.generateCode(), this.generateXml())
    }

    componentDidMount(): void {
        this.blocklyReactInstance.current!.primaryWorkspace.addChangeListener(this.generateAndSetCode)
        log.debug("Mounted change listener on workspace")
    }

    componentWillUnmount(): void {
        this.blocklyReactInstance.current!.primaryWorkspace.removeChangeListener(this.generateAndSetCode)
    }

    render = () => {
        return (
            <div className="Editor">
                <BlocklyComponent ref={this.blocklyReactInstance} {...BLOCKLYCONFIG}>
                    {editorBlocks}
                </BlocklyComponent>
            </div>
        )
    }
}

function saveProject(blockXml: string | undefined): void {
    if (!blockXml) {
        console.debug("Editor is null")
        return
    }
    localStorage.setItem("defaultProject", blockXml)
}

function loadProject(blocklyComponent: BlocklyComponent | undefined | null): void {
    if (!blocklyComponent) {
        console.debug("Editor is null")
        return
    }
    const a = localStorage.getItem("defaultProject") || '<xml xmlns="https://developers.google.com/blockly/xml"/>'
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(a), blocklyComponent.primaryWorkspace)
}

export default Editor
export { saveProject, loadProject }
