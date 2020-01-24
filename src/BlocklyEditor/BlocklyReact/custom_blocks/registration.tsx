import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import log from "loglevel"

import {funklyBlockType, Generator} from "./generator"


function createCustomBlock(id: funklyBlockType, style: string, configuration: object) {
    if (style !in ["logic_blocks", "math_blocks"]) {
        log.error("Non-enabled blockly style!")
    }
    Blocks[id] = {
        init: function () {
            this.jsonInit(configuration)
            this.setStyle(style)
        }
    }

    BlocklyJS[id] = Generator[id]
}

const condJson = {
    "type:": funklyBlockType.COND,
    "message0": "if: %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "IF"
        }
    ],
    "message1": "do: %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "DO"
        }
    ],
    "message2": "else: %1",
    "args2": [
        {
            "type": "input_statement",
            "name": "ELSE"
        }
    ],
    "previousStatement": null,
    "nextStatement": 3,
}

createCustomBlock(funklyBlockType.COND, "logic_blocks", condJson)

const gtJson = {
    "type:": funklyBlockType.GT,
    "message0": "is: %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "NUMBER0"
        }
    ],
    "message1": "greater than: %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "NUMBER1"
        }
    ],
    "previousStatement": null
}

createCustomBlock(funklyBlockType.GT, "logic_blocks", gtJson)

const numberJson = {
    "type:": funklyBlockType.NUMBER,
    "message0": "%1",
    "args0": [
        {
            "type": "field_number",
            "name:": "NUMBER_CONSTANT",
            "value": 1
        }
    ],
    "previousStatement": null
}
createCustomBlock(funklyBlockType.NUMBER, "math_blocks", numberJson)
