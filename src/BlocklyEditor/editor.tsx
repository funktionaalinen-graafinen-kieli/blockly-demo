import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import Blockly from "blockly"
import log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import { Block, Category, Field, Shadow, Value } from "./BlocklyReact/blockly_jsx_wrappers"
import { BLOCKLYCONFIG } from "./BlocklyReact/blockly_workspace_config"
import { initialXml } from "./BlocklyReact/initial_xml"

const editorBlocks = (
    <React.Fragment>
        <Category name="Matematiikka">
            <Block type="funkly_rand" />
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
        <Category name="Logiikka">
            <Block type="funkly_collide" />
            <Block type="funkly_cond" />
            <Block type="funkly_guard" />
            <Block type="funkly_comp">
                <Value name="NUMBER0">
                    <Shadow type="funkly_number" />
                </Value>
                <Value name="NUMBER1">
                    <Shadow type="funkly_number" />
                </Value>
            </Block>
            <Block type="funkly_keyboard_input" />
        </Category>
        <Category name="Hahmopalikat" colour={100}>
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
interface EditorProps {
    setCode: (_: string) => void
    setBlockXml: (_: string) => void
    characterMap: Map<string, Blockly.Workspace>
}

interface EditorState {
    selectedCharacter: string
}

class Editor extends React.Component<EditorProps, EditorState> {
    blocklyReactInstance = React.createRef<BlocklyComponent>()
    state = { selectedCharacter: "" }

    setCode = (engineCode: string, xmlWorkspace: string) => {
        this.props.setCode(engineCode)
        this.props.setBlockXml(xmlWorkspace)
    }

    importXml = (xmlInput: string) => {
        const stripped = xmlInput.slice(26)
        const decoded = decodeURI(eval(stripped))
        const parsedDom = Blockly.Xml.textToDom(decoded)

        const entityBlocks = parsedDom.querySelectorAll("xml > block")
        console.log(entityBlocks)
        entityBlocks.forEach((block, _) => {
            const entityId = block.getAttribute("id")!
            let workspace
            if (this.props.characterMap.has(entityId)) {
                this.props.characterMap.set(entityId, new Blockly.Workspace())
            }
            workspace = this.props.characterMap.get(entityId)!

            Blockly.Xml.domToWorkspace(block, workspace)
        })
    }

    generateAndSetCode = () => {
        this.setCode(generateCode(this.props.characterMap), generateXml(this.props.characterMap))
        
        /*  this causes weird issues with entities getting overridden and only one 
            entity being on the characterMap at once */
        const workspaceContents = this.blocklyReactInstance.current!.primaryWorkspace
        this.props.characterMap.set(this.state.selectedCharacter, workspaceContents)
    }

    componentDidMount(): void {
        const blocklyReact = this.blocklyReactInstance.current!

        blocklyReact.primaryWorkspace.addChangeListener(this.generateAndSetCode)
        log.debug("Mounted change listener on workspace")
    }

    componentWillUnmount(): void {
        this.blocklyReactInstance.current!.primaryWorkspace.removeChangeListener(this.generateAndSetCode)
    }

    setSelectedCharacter(newSelected: string): void {
        const blocklyReact = this.blocklyReactInstance.current!

        const newWorkspace = this.props.characterMap.get(newSelected)
        if (newWorkspace) blocklyReact.changeWorkspaceContents(newWorkspace)
        this.setState({ selectedCharacter: newSelected })
        
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

function generateXml(characterMap: Map<string, Blockly.Workspace>): string {
    let output = '<xml xmlns="https://developers.google.com/blockly/xml">'
    characterMap.forEach((workspace, _) => {
        //xml.push(Blockly.Xml.workspaceToDom(workspace))
        output += Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace))
    })
    output += "</xml>"
    return output
}

function generateCode(characterMap: Map<string, Blockly.Workspace>): string {
    let entities: Blockly.Block[] = []
    characterMap.forEach((workspace, _) => {
        entities = entities.concat(
            workspace.getBlocksByType("funkly_entity", true).concat(workspace.getBlocksByType("funkly_guientity", true))
        )
    })

    // Generate code for each entity and place commas
    let engineCode = '{ "entities": {'
    entities.slice(0, -1).forEach(e => (engineCode += BlocklyJS.blockToCode(e) + ","))
    // Leave out comma from last entity
    engineCode += BlocklyJS.blockToCode(entities.slice(-1)[0])
    engineCode += "}, "
    engineCode += defaultBinds + "}"

    return engineCode
}

function saveProject(blockXml: string): void {
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
    const xml = Blockly.Xml.textToDom(a)
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, blocklyComponent.primaryWorkspace)
}

function loadDefaultProject(blocklyComponent: BlocklyComponent | undefined | null): void {
    if (!blocklyComponent) {
        console.debug("Editor is null")
        return
    }
    const a = decodeURI(initialXml) || '<xml xmlns="https://developers.google.com/blockly/xml"/>'
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(a), blocklyComponent.primaryWorkspace)
}

export default Editor
export { saveProject, loadProject, loadDefaultProject, generateCode }
