//@ts-nocheck
import * as React from "react"
import * as BlocklyJS from "blockly/javascript"
import Blockly from "blockly"
import log from "loglevel"

import BlocklyComponent from "./BlocklyReact/blockly_component"
import { Block, Category, Shadow, Value } from "./BlocklyReact/blockly_jsx_wrappers"
import { BLOCKLYCONFIG } from "./BlocklyReact/blockly_workspace_config"
import { initialXml } from "./BlocklyReact/initial_xml"
import { SetCharacterMap } from "../Gui/app"

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
    setCharacterMap: SetCharacterMap
    characterMap: ReadonlyMap<string, Blockly.Workspace>
    selectedCharacter: string | undefined
    setSelectedCharacter: (_: string | undefined) => void
}

interface EditorState {
}

class Editor extends React.Component<EditorProps, EditorState> {
    blocklyReactInstance = React.createRef<BlocklyComponent>()
    
    /* 
     * Takes a valid xml string as input, parsed it to blockly blocks and imports them to charactermap
     */
    importXml = (xmlInput: string) => {
        console.debug("importing xml")
        console.debug(xmlInput)

        const parsedDom = Blockly.Xml.textToDom(xmlInput)
        const entityBlocks = parsedDom.querySelectorAll("xml > block")
        const newCharacterMap = new Map()

        entityBlocks.forEach((block, _) => {
            const entityId = block.getAttribute("id")!

            const workspace = new Blockly.Workspace()
            Blockly.Xml.domToBlock(block, workspace)
            
            newCharacterMap.set(entityId, workspace)

        })

        window.funklyCharMap = this.props.characterMap
        this.props.setCharacterMap(
            newCharacterMap, 
            // After changing the workspace contents manually, which might not Blockly's event listeners
            // we want to manually trigger the onBlocklyChange things
            () => this.onBlocklychange()
        )

    }

    onBlocklychange = () => {
        const blockXml = generateXml(this.props.characterMap)
        
        this.props.setCode(generateCode(this.props.characterMap))
        this.props.setBlockXml(blockXml)

        window.funklyCharMap = this.props.characterMap
        
        saveProject(blockXml)
    }

    // Set undefined to clear selected character
    setSelectedCharacter(newSelected: string | undefined): void {
        const blocklyReact = this.blocklyReactInstance.current!

        if (newSelected === undefined) {
            blocklyReact.primaryWorkspace.clear()
            this.props.setSelectedCharacter(undefined)
            return
        }

        // Update the previous selected characters workspace contents before switching current character
        if (this.props.selectedCharacter) {
            const previousSelectedCharacter = this.props.characterMap.get(this.props.selectedCharacter)
            if (previousSelectedCharacter) {
                const oldWorkspaceContents = Blockly.Xml.workspaceToDom(blocklyReact.primaryWorkspace)
                /* Using clearWorkspaceAndLoadFromXml caused weird runtime TypeError: b.setResizesEnabled 
                 *  is not a function. We work around by clearing and loading manually 
                 */
                previousSelectedCharacter.clear()
                Blockly.Xml.domToWorkspace(oldWorkspaceContents, previousSelectedCharacter)
            }
        }
        this.props.setSelectedCharacter(newSelected)
        
        const newWorkspace = this.props.characterMap.get(newSelected)
        if (newWorkspace) blocklyReact.setPrimaryWorkspaceContents(newWorkspace)
        
    }

    deleteCharacter = (entityId: string) => {
        console.debug("deleted character: " + entityId)

        // copy charactermap, omitting the entityId that is being deleted
        const characterDeletedMap = new Map(this.props.characterMap)
        characterDeletedMap.delete(entityId)

        window.funklyCharMap = this.props.characterMap  
        this.props.setCharacterMap(
            characterDeletedMap, 
            () => this.setSelectedCharacter(characterDeletedMap.keys().next().value)
        )
    }


    componentDidMount(): void {
        const blocklyReact = this.blocklyReactInstance.current!

        blocklyReact.primaryWorkspace.addChangeListener(this.onBlocklychange)
        log.debug("Mounted change listener on workspace")

        // FIXME: do this in a nicer way 
        window.funklyCharMap = this.props.characterMap

        loadProject(this)    }

    componentWillUnmount(): void {
        this.blocklyReactInstance.current!.primaryWorkspace.removeChangeListener(this.onBlocklychange)
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

function generateXml(characterMap: ReadonlyMap<string, Blockly.Workspace>): string {
    let xmlString = '<xml xmlns="https://developers.google.com/blockly/xml">'
    characterMap.forEach((workspace, key) => {
        // if there exists a block with id `key` convert it to xml
        if (workspace.getBlockById(key)) {
            xmlString += Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(workspace.getBlockById(key)))
        }
    })
    xmlString += "</xml>"
    
    return xmlString 
}

function generateCode(characterMap: ReadonlyMap<string, Blockly.Workspace>): string {
    
    let entities: Blockly.Block[] = []
    for (const [key, workspace] of characterMap) {
        if (workspace.getBlockById(key))  { 
            entities = entities.concat(workspace.getBlockById(key))
        } else {
            console.debug(`Charactermap had key ${key} but it's workspace was missing a block by that id. 
                          This usually means some character's workspace was cleared `)
        }
    }

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
    localStorage.setItem("savedProject", encodeURI(blockXml))
}

function loadProject(editor: Editor) {

    const savedXml = localStorage.getItem("savedProject")
    const savedProject = 
        savedXml ? decodeURI(savedXml)
            : '<xml xmlns="https://developers.google.com/blockly/xml"/>'
    editor.importXml(savedProject)
}

function loadDefaultProject(editor: Editor) {
    const defaultProject = decodeURI(initialXml) || '<xml xmlns="https://developers.google.com/blockly/xml"/>'
    editor.importXml(defaultProject)
}

export default Editor
export { saveProject, loadProject, loadDefaultProject, generateCode }
