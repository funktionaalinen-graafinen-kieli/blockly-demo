import * as BlocklyJS from "blockly/javascript"
import { Block } from "blockly"
import * as log from "loglevel"
import { publicImages } from "../../../Gui/image_storage"
import { entityDefaultSize } from "../../../GameEngine/config"

enum funklyBlockType {
    COND = "funkly_cond",
    GT = "funkly_gt",
    MATH = "funkly_math",
    TRIG = "funkly_trig",
    COL = "funkly_col",
    NUMBER = "funkly_number",
    ENTITY = "funkly_entity",
    BIND = "funkly_bind",
    KEY = "funkly_key",
    BINDGET = "funkly_bindget",
    GET = "funkly_get",
    IMG = "funkly_img"
}

function funklyCodegen(type: funklyBlockType) {
    if (type === funklyBlockType.COND) return funkly_cond
    else if (type === funklyBlockType.GT) return funkly_gt
    else if (type === funklyBlockType.NUMBER) return funkly_number
    else if (type === funklyBlockType.ENTITY) return funkly_entity
    else if (type === funklyBlockType.BIND) return funkly_bind
    else if (type === funklyBlockType.BINDGET) return funkly_bindget
    else if (type === funklyBlockType.GET) return funkly_get
    else if (type === funklyBlockType.COL) return funkly_col
    else if (type === funklyBlockType.KEY) return funkly_key
    else if (type === funklyBlockType.MATH) return funkly_math
    else if (type === funklyBlockType.TRIG) return funkly_trig
    else if (type === funklyBlockType.IMG) return funkly_img
    else log.error("Invalid funkly block type")

    function funkly_cond(block: Block) {

        const conditionCode = block.getInput("IF") ?
            BlocklyJS.statementToCode(block, "IF", BlocklyJS.ORDER_NONE)
            : ""

        const doBranch = BlocklyJS.statementToCode(block, "DO", BlocklyJS.ORDER_ADDITION)
        const elseBranch = BlocklyJS.statementToCode(block, "ELSE")

        return "cond" + argwrap(conditionCode, doBranch, elseBranch)
    }

    function funkly_trig(block: Block) {

        const func = block.getFieldValue("func") || "sin"
        return funkly_arg1(func)(block)
    }

    function funkly_math(block: Block) {

        const func = block.getFieldValue("func") || "add"
        return funkly_arg2(func)(block)
    }

    function funkly_arg2(f: String){
        return (block: Block) => {
            const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL)
            const arg1 = BlocklyJS.statementToCode(block, "NUMBER1", BlocklyJS.ORDER_RELATIONAL)
            return f + argwrap(arg0,arg1)
        }
    }

    function funkly_arg1(f: String){
        return (block: Block) => {
            const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL)
            return f + argwrap(arg0)
        }
    }

    function funkly_gt(block: Block) {
        const arg0 = BlocklyJS.statementToCode(block, "NUMBER0", BlocklyJS.ORDER_RELATIONAL)
        const arg1 = BlocklyJS.statementToCode(block, "NUMBER1", BlocklyJS.ORDER_RELATIONAL)

        return "gt" + argwrap(arg0, arg1)
    }

    function funkly_col(block: Block) {
        const arg0 = block.getFieldValue("e1") || "default_e1"
        const arg1 = block.getFieldValue("e2") || "default_e2"
        return "col" + argwrap(`'${arg0}'`,`'${arg1}'`)
    }

    function funkly_get(block: Block) {
        const arg0 = block.getFieldValue("entity") || "default_entity"
        const arg1 = block.getFieldValue("property") || "default_property"
        return "get" + argwrap("'" + arg0 + "_" + arg1 + "'")
    }

    function funkly_bindget(block: Block) {
        const arg0 = block.getFieldValue("id") || "default_bind"
        return "get" + argwrap("'" + arg0 + "'")
    }

    function funkly_key(block: Block) {
        const arg0 = block.getFieldValue("key") || "default_key"
        return "get" + argwrap("'key_" + arg0 + "'")
    }

    function funkly_number(block: Block) {
        const arg0 = block.getFieldValue("NUM")

        return wrap(arg0)
    }

    function funkly_entity(block: Block) {
        const id = block.getFieldValue("id") || "default_entity"
        const x = BlocklyJS.statementToCode(block, "x", BlocklyJS.ORDER_RELATIONAL)
        const initx = block.getFieldValue("initx") || 0
        const y = BlocklyJS.statementToCode(block, "y", BlocklyJS.ORDER_RELATIONAL)
        const inity = block.getFieldValue("inity") || 0
        const img = BlocklyJS.statementToCode(block, "img", BlocklyJS.ORDER_RELATIONAL)

        let output = `"${id}": {`
        output += `"x": ["pack(${x})", ${initx}],`
        output += `"y": ["pack(${y})", ${inity}],`

        output += `"w": ["packF(id)", ${entityDefaultSize["width"]}],`
        output += `"h": ["packF(id)", ${entityDefaultSize["height"]}],`
        const imgDefault = publicImages.entries().next().value[1]
        if (img === "") {
            output +=  `"img": ["packF(id)", "${imgDefault}"]`
        } else {
            output +=  `"img": ["pack(${(img)})", "${imgDefault}"]`
        }

        output += "}"
        return output
    }

    function funkly_bind(block: Block) {
        const bindName = BlocklyJS.valueToCode(block, "id", BlocklyJS.ORDER_RELATIONAL) || "default_bind"
        const f = BlocklyJS.statementToCode(block, "f", BlocklyJS.ORDER_RELATIONAL)
        const init = 0

        let output = `${bindName}: {`
        output += `"f": ["pack(${f})", ${init}],`
        output += "}"
        return output
    }

    function funkly_img(block: Block) {
        const arg0 = block.getFieldValue("IMAGE") || "default_image"
        return `'\\"${strip(arg0)}\\"'`
    }
}

const wrap = (x: string) => "("+x+")"

// TODO find better fix for stray spaces
// strip spaces
//args = args.map(x=>x.replace(/\s/g,""));
const strip = (x: string) => x.replace(/\s/g,"")

// wrap varArg of arguments as arguments to curried function
const argwrap = (...xs: string[]) => cat(...xs.map(s => {
    return wrap(strip(s))
}))

const cat = (...xs: string[]) => xs.reduce((x,y) => x+y)

export { funklyBlockType, funklyCodegen }
