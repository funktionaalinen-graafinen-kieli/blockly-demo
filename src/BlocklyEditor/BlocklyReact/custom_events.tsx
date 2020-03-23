import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import * as Blockly from "blockly"

const getType = (event: any) => {
    if (event.type == Blockly.Events.CHANGE) {
        let workspace = Blockly.Workspace.getById(event.workspaceId)
        let block = workspace.getBlockById(event.blockId)

        if (block.type === "funkly_get") {
            if (event.name === "property") {
                let p = block.getParent()
                
                let v = event.newValue
                //use length of value to find numbers (TODO FIND BETTER WAY)
                if (v.length === 1) block.setPreviousStatement(true, "Number")
                if (v === "name") block.setPreviousStatement(true, "String")
                if (v === "text") block.setPreviousStatement(true, "String")
            }


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
            //this.getField
        }
        //console.log("TYPE: ", block.type)
        //workspace.removeChangeListener(test);
    }
}

// include in events if you wish to log all events
const logEvents = (e: any)=>console.trace(e)

// events in this list get added
//let events = [logEvents, getType]
let events = [getType]

export default events
