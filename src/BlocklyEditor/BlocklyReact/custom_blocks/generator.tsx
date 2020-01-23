// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as BlocklyJS from "blockly/javascript"
import {Block} from "blockly"
import {Lang} from "../../../Lang/lang"
import * as log from "loglevel"

function reactFieldCode(block: Block) {
    // See link for actual implementation of the code generation logic
    // https://developers.google.com/blockly/guides/create-custom-blocks/generating-code
    return "console.log('Custom block, code generation not implemented yet');\n"
}

function cond(block: Block) {

    let doBranch = ""
    let elseBranch = ""
    let conditionCode = ""

    if (block.getInput("IF")) conditionCode = BlocklyJS.valueToCode(block, "IF", BlocklyJS.ORDER_NONE || "false")
    if (block.getInput("DO")) doBranch = BlocklyJS.statementToCode(block, "DO")

    if (block.getInput("ELSE")) {
        elseBranch = BlocklyJS.statementToCode(block, "ELSE")
    }
    //let code = ""
    //code += "if (" + conditionCode + ") {\n" + doBranch + "}"
    //code += " else {\n" + elseBranch + "}"
    // return code
    log.trace(`condition: ${conditionCode}
        doBranch: ${doBranch}
        elseBranch: ${elseBranch}`
    )
    log.trace(Lang.cond(conditionCode)(doBranch)(elseBranch))
    return Lang.cond(conditionCode)(doBranch)(elseBranch)
}
export {reactFieldCode, cond}
