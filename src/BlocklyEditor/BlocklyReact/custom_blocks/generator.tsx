import * as BlocklyJS from "blockly/javascript"
import {Block} from "blockly"
import * as log from "loglevel"

enum funklyBlockType {
    COND = "funkly_cond",
    GT = "funkly_gt",
    NUMBER = "funkly_number"
}

function funklyCodegen(type: funklyBlockType) {
    if (type === funklyBlockType.COND) return funkly_cond
    else if (type === funklyBlockType.GT) return funkly_gt
    else if (type === funklyBlockType.NUMBER) return funkly_number
    else log.error("Invalid funkly block type")

    function funkly_cond(block: Block) {

        const conditionCode = block.getInput("IF") ?
            BlocklyJS.statementToCode(block, "IF", BlocklyJS.ORDER_NONE || "false")
            : ""

        const doBranch = BlocklyJS.statementToCode(block, "DO", BlocklyJS.ORDER_ADDITION || "false")

        const elseBranch = BlocklyJS.statementToCode(block, "ELSE")

        log.trace(
            `condition: ${conditionCode}
        doBranch: ${doBranch}
        elseBranch: ${elseBranch}`
        )
        return funcwrap("cond", conditionCode, doBranch, elseBranch)
    }


    function funkly_gt(block: Block) {
        const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL || "false")
        const arg1 = BlocklyJS.statementToCode(block, "NUMBER1", BlocklyJS.ORDER_RELATIONAL || "false")

        return funcwrap("gt", arg0, arg1)
    }


    function funkly_number(block: Block) {
        // TODO: This always returns the OR case. Figure out why and how to fix
        const arg0 = BlocklyJS.valueToCode(block, "NUMBER_CONSTANT", BlocklyJS.ORDER_ATOMIC) || 0
        log.trace(block.getInput("NUMBER_CONSTANT"))

        return wrap(arg0)
    }
}

const wrap = (x: string) => "("+x+")"

const cat = (...xs: string[]) => xs.reduce((x,y) => x+y)

const funcwrap = (func: string, ...args: string[]) => {
    return func + "(" + cat(...args) + ")"

}

export {funklyBlockType, funklyCodegen}
