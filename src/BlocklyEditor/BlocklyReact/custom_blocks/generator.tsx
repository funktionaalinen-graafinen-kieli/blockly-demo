import * as BlocklyJS from "blockly/javascript"
import {Block} from "blockly"
import * as log from "loglevel"

enum funklyBlockType {
    COND = "funkly_cond",
    GT = "funkly_gt",
    ADD = "funkly_add",
    NUMBER = "funkly_number",
    ENTITY = "funkly_entity",
    BIND = "funkly_bind",
    GET = "funkly_get"
}

function funklyCodegen(type: funklyBlockType) {
    if (type === funklyBlockType.COND) return funkly_cond
    else if (type === funklyBlockType.GT) return funkly_gt
    else if (type === funklyBlockType.NUMBER) return funkly_number
    else if (type === funklyBlockType.ENTITY) return funkly_entity
    else if (type === funklyBlockType.BIND) return funkly_bind
    else if (type === funklyBlockType.GET) return funkly_get
    else if (type === funklyBlockType.ADD) return funkly_arg2("add")
    else log.error("Invalid funkly block type")

    function funkly_cond(block: Block) {

        const conditionCode = block.getInput("IF") ?
            BlocklyJS.statementToCode(block, "IF", BlocklyJS.ORDER_NONE)
            : ""

        const doBranch = BlocklyJS.statementToCode(block, "DO", BlocklyJS.ORDER_ADDITION)

        const elseBranch = BlocklyJS.statementToCode(block, "ELSE")

        log.trace(
            `condition: ${conditionCode}
        doBranch: ${doBranch}
        elseBranch: ${elseBranch}`
        )
        return "cond" + argwrap(conditionCode, doBranch, elseBranch)
    }

    function funkly_arg2(f: String){
        return (block: Block) => {
            const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL)
            const arg1 = BlocklyJS.statementToCode(block, "NUMBER1", BlocklyJS.ORDER_RELATIONAL)
            return f + argwrap(arg0,arg1)
        }
    }

    function funkly_gt(block: Block) {
        const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL)
        const arg1 = BlocklyJS.statementToCode(block, "NUMBER1", BlocklyJS.ORDER_RELATIONAL)

        return "gt" + argwrap(arg0, arg1)
    }

    function funkly_get(block: Block) {
        const arg0 = BlocklyJS.valueToCode(block, "key", BlocklyJS.ORDER_RELATIONAL) || "default_key"
        log.trace(block)
        return "get" + argwrap(arg0)
    }

    function funkly_number(block: Block) {
        // TODO: This always returns the OR case. Figure out why and how to fix
        const arg0 = block.getFieldValue("NUM") || 0

        return wrap(arg0)
    }

    function funkly_entity(block: Block) {
        const id = block.getFieldValue("id") || "default_entity"
        const x = BlocklyJS.statementToCode(block, "x", BlocklyJS.ORDER_RELATIONAL)
        const y = BlocklyJS.statementToCode(block, "y", BlocklyJS.ORDER_RELATIONAL)
        const img = block.getFieldValue("img") || "default_img"

        const xDelay = 0
        const yDelay = 0

        console.log(id)
        let output = `"${id}": {`

        output += `"x": ["pack(${x})", ${xDelay}],`
        output += `"y": ["pack(${y})", ${yDelay}],`
        output +=  `"img": ["packF(id)", ${img}]`

        output += "},"
        return output
        /*
        e1": {
            "x": ["pack(cond(lt(get('e1_x'))(get('width')))(add(1)(get('e1_x')))(get('e1_x')))", 1],
            "y": ["packF(id)", 0],
            "img": ["packF(id)", "http://www.pngmart.com/files/11/Shiba-Inu-Doge-Meme-PNG-Image.png" ]
        }
        */

    }
    function funkly_bind(block: Block) {
        const bindName = BlocklyJS.valueToCode(block, "id", BlocklyJS.ORDER_RELATIONAL) || "default_bind"
        const f = BlocklyJS.statementToCode(block, "f", BlocklyJS.ORDER_RELATIONAL)

        const functionInterval = 0

        let output = `${bindName}: {`

        output += `"f": ["pack(${f})", ${functionInterval}],`

        output += "}"
        return output

    }
}

const wrap = (x: string) => "("+x+")"

// TODO find better fix for stray spaces
// strip spaces
//args = args.map(x=>x.replace(/\s/g,""));
const strip = (x: string) => x.replace(/\s/g,"");

// wrap varArg of arguments as arguments to curried function
const argwrap = (...xs: string[]) => cat(...xs.map(s => {
    return wrap(strip(s))
}))

const cat = (...xs: string[]) => xs.reduce((x,y) => x+y)

export {funklyBlockType, funklyCodegen}
