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

const condType = (event: any) => {
    if (event.type == Blockly.Events.MOVE) {
        // blocks connecting to cond
        if (event.newParentId) {
            let workspace = Blockly.Workspace.getById(event.workspaceId)
            let block = workspace.getBlockById(event.newParentId)
            if (block.type === "funkly_cond") {
                let child = workspace.getBlockById(event.blockId)
                const con = child.previousConnection
                const check = con.getCheck()
                block.getInput("DO").setCheck(check)
                block.getInput("ELSE").setCheck(check)
                block.setPreviousStatement(true, check)

            }
        }
        if (event.oldParentId) {
            let workspace = Blockly.Workspace.getById(event.workspaceId)
            let block = workspace.getBlockById(event.oldParentId)
            if (block.type === "funkly_cond") {
                block.getInput("DO").setCheck(null)
                block.getInput("ELSE").setCheck(null)
                block.setPreviousStatement(true, null)
            }
        }

        // cond connecting to other blocks
        let workspace = Blockly.Workspace.getById(event.workspaceId)
        let block = workspace.getBlockById(event.blockId)
        if (block && block.type === "funkly_cond") {
            const p = block.getParent()
            if (p != null) {
                const con = p.getInputWithBlock(block).connection
                const check = con.getCheck()
                block.getInput("DO").setCheck(check)
                block.getInput("ELSE").setCheck(check)
                block.setPreviousStatement(true, check)
            } else {
                block.getInput("DO").setCheck(null)
                block.getInput("ELSE").setCheck(null)
                block.setPreviousStatement(true, null)
            }
        }
    }
}

// include in events if you wish to log all events
const logEvents = (e: any)=>console.trace(e)

// events in this list get added
let events = [getType, condType]

export default events
