// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as BlocklyJS from "blockly/javascript"
import {Block} from "blockly"
import {Lang} from "../../../Lang/lang"
import * as log from "loglevel"

/*
function reactFieldCode(block: Block) {
    // See link for actual implementation of the code generation logic
    // https://developers.google.com/blockly/guides/create-custom-blocks/generating-code
    return "console.log('Custom block, code generation not implemented yet');\n"
}
*/

function cond(block: Block) {

    const conditionCode = block.getInput("IF") ?
        BlocklyJS.valueToCode(block, "IF", BlocklyJS.ORDER_NONE || "false") : ""

    const doBranch = BlocklyJS.statementToCode(block, "DO", BlocklyJS.ORDER_ADDITION || "false")

    const elseBranch = sanitise(BlocklyJS.statementToCode(block, "ELSE"))

    log.trace(
        `condition: ${conditionCode}
        doBranch: ${doBranch}
        elseBranch: ${elseBranch}`
    )
    return Lang.cond(conditionCode)(doBranch)(elseBranch)
}

function gt(block: Block) {
    const arg0 = BlocklyJS.valueToCode(block, "arg0", BlocklyJS.ORDER_RELATIONAL || "false")
    const arg1 = BlocklyJS.valueToCode(block, "arg1", BlocklyJS.ORDER_RELATIONAL || "false")

    return [Lang.gt(arg0)(arg1), BlocklyJS.ORDER_RELATIONAL]
}

function sanitise(code: string) {
    // Regex containing the whitelist of allowed characters, negated to make it replace all characters
    // not explicitly allowed with empty string(s).
    return code.replace("[^a-z0-9åäö{}[\\]().,_-]", "")
}


export {cond, gt}
