import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import * as Blockly from "blockly"

const test = (event: any) => {
    if (event.type == Blockly.Events.CHANGE) {
        console.log('EVENT TEST')
        let workspace = Blockly.Workspace.getById(event.workspaceId)
        workspace.removeChangeListener(test);
    }
    //const p = this.getParent()
    //this.setOnChange(() => null)

    //const setNewMap = (map: any,check: any) => {
        //const v = this.getField("property").getValue()
        //this.getInput("property").removeField("property")
        //this.getInput("property").appendField(newCustomDropdown(propertyMap), "property")
        //this.getField("property").setValue(v)
        //this.setPreviousStatement(true, check)
    //}

    //if (p != null) {
        //const con = p.getInputWithBlock(this).connection
        //const check = con.getCheck()
        //setNewMap(propertyMap,check)
    //} else {
        //setNewMap(propertyMap,null)
    //}
    ////this.getField
    //this.setOnChange(onChange)
}

// include in events if you wish to log all events
const logEvents = (e: any)=>console.trace(e)

let events = [test]

export default events
