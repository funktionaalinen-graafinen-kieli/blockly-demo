import Blockly from "blockly"

const getType = (event: any) => {
    if (event.type == Blockly.Events.CHANGE) {
        const block = event.block
        if (block && block.type === "funkly_get") {
            if (event.name === "property") {
                const v = event.newValue
                //use length of value to find numbers (TODO: FIND BETTER WAY)
                if (v.length === 1) block.setPreviousStatement(true, "Number")
                if (v === "name") block.setPreviousStatement(true, "String")
                if (v === "text") block.setPreviousStatement(true, "String")
            }
        }
    }
}

const condType = (event: any) => {
    if (event.type === Blockly.Events.MOVE) {
        // blocks connecting to cond
        const workspace = Blockly.Workspace.getById(event.workspaceId)

        if (event.newParentId) {
            const block = workspace.getBlockById(event.newParentId)
            if (block && block.type === "funkly_cond") {
                let child = workspace.getBlockById(event.blockId)
                const con = child.previousConnection
                const check = con.getCheck()
                if (block.getInput("DO").connection.getCheck() == null) {
                    block.getInput("DO").setCheck(check)
                    block.getInput("ELSE").setCheck(check)
                    block.setPreviousStatement(true, check)
                }

            }
        }
        if (event.oldParentId) {
            let block = workspace.getBlockById(event.oldParentId)
            if (block && block.type === "funkly_cond") {
                //only reset if all completely disconnected
                if (block.getInputTargetBlock("DO") == null &&
                    block.getInputTargetBlock("ELSE") == null &&
                    block.getPreviousBlock() == null) {

                    block.getInput("DO").setCheck(null)
                    block.getInput("ELSE").setCheck(null)
                    block.setPreviousStatement(true, null)
                }
            }
        }

        // cond connecting to other blocks
        let block = workspace.getBlockById(event.blockId)
        if (block && block.type === "funkly_cond") {
            const p = block.getParent()
            if (p != null) {
                const b = p.getInputWithBlock(block)
                if (b) {
                    const con = b.connection
                    const check = con.getCheck()
                    block.getInput("DO").setCheck(check)
                    block.getInput("ELSE").setCheck(check)
                    block.setPreviousStatement(true, check)
                }
                //if connected to guard disconnect
                if (p.getNextBlock() && p.getNextBlock().id === event.blockId) {
                    block.previousConnection.disconnect()
                }
            } else {
                //only reset if all inputs disconnected
                if (block.getInputTargetBlock("DO") == null &&
                    block.getInputTargetBlock("ELSE") == null &&
                    block.getPreviousBlock() == null) {
                    block.getInput("DO").setCheck(null)
                    block.getInput("ELSE").setCheck(null)
                    block.setPreviousStatement(true, null)
                }
            }
        }
    }
}

// helper function
function setGuardIfField(b: any, workspace: any) {
    const prev = b.getPreviousBlock()
    const next = b.getNextBlock()
    if (next && next.type == "funkly_guard") {
        b.getInput("IF").setVisible(true)
    } else {
        b.getInput("IF").setVisible(false)
    }

    if (prev && prev.type == "funkly_guard") setGuardIfField(prev, workspace)

    workspace.render()
}

// helper function
function setGuardCheck(b: any, event: any, workspace: any) {

    if (event.newParentId) {
        const p = workspace.getBlockById(event.newParentId)
        if (p && p.type === "funkly_guard") {
            const con = b.previousConnection
            const check = con.getCheck()
            p.getInput("DO").setCheck(check)

            check.push("Guard")
            p.setPreviousStatement(true, check)
        }
    }
    if (event.oldParentId) {
        const p = workspace.getBlockById(event.oldParentId)
        if (p && p.type === "funkly_guard") {
            p.getInput("DO").setCheck(null)
            p.setPreviousStatement(true, null)
        }
    }
}

const guardBlock = (event: any) => {
    const workspace = Blockly.Workspace.getById(event.workspaceId)
    if (event.type === Blockly.Events.CREATE || event.type === Blockly.Events.MOVE) {
        const block = workspace.getBlockById(event.blockId)
        if (block && block.type == "funkly_guard") {
            setGuardIfField(block, workspace)
        }
        if (block) {
            setGuardCheck(block, event, workspace)
        }
    }
}

// const logEvents = (e: any)=>console.trace(e)

// events handlers in this list get added
const eventHandlers = [getType, condType, guardBlock]

export default eventHandlers
