
import * as BlocklyJS from "blockly/javascript"
import {Block} from "blockly"
import {Lang} from "../../../Lang/lang"
import * as log from "loglevel"


class Generator {
    static funkly_cond(block: Block) {

        const conditionCode = block.getInput("IF") ?
            BlocklyJS.statementToCode(block, "IF", BlocklyJS.ORDER_NONE || "false") : ""

        const doBranch = BlocklyJS.statementToCode(block, "DO", BlocklyJS.ORDER_ADDITION || "false")

        const elseBranch = BlocklyJS.statementToCode(block, "ELSE")

        log.trace(
            `condition: ${conditionCode}
        doBranch: ${doBranch}
        elseBranch: ${elseBranch}`
        )
        return Lang.cond(conditionCode)(doBranch)(elseBranch)
    }


    static funkly_gt(block: Block) {
        const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL || "false")
        const arg1 = BlocklyJS.statementToCode(block, "NUMBER1", BlocklyJS.ORDER_RELATIONAL || "false")

        return Lang.gt(arg0)(arg1)
    }


    static funkly_number(block: Block) {
        // TODO: This always returns the OR case. Figure out why and how to fix
        const arg0 = BlocklyJS.valueToCode(block, "NUMBER_CONSTANT", BlocklyJS.ORDER_ATOMIC) || 0
        log.trace(block.getInput("NUMBER_CONSTANT"))

        return Lang.wrap(arg0)
    }
}

enum funklyBlockType {
    COND = "funkly_cond",
    GT = "funkly_gt",
    NUMBER = "funkly_number"
}

export {funklyBlockType, Generator}
