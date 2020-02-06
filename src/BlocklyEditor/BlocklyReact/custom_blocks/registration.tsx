import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import log from "loglevel"

import {funklyBlockType, funklyCodegen} from "./generator"


function createCustomBlock(id: funklyBlockType, style: string, configuration: object) {
    if (!["logic_blocks", "math_blocks"].includes(style)) {
        log.error("Non-enabled blockly style!")
    }
    Blocks[id] = {
        init: function () {
            this.jsonInit(configuration)
            this.setStyle(style)
        }
    }

    BlocklyJS[id] = funklyCodegen(id)
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

const entityJson = {
    "type:": funklyBlockType.ENTITY,
    "inputsInline": true,
    "message0": "name: %1",
    "args0": [
        {
            "type": "input_value",
            "name": "id",
            "check": "String"
        }
    ],
    "message1": "x: %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "x"
        }
    ],
    "message2": "y: %1",
    "args2": [
        {
            "type": "input_statement",
            "name": "y"
        }
    ],
    "message3": "img: %1",
    "args3": [
        {
            "type": "input_value",
            "name": "img",
            "check": "String"
        }
    ]
}

createCustomBlock(funklyBlockType.ENTITY, "text_blocks", entityJson)

const eventJson = {
    "type:": funklyBlockType.EVENT,
    "inputsInline": true,
    "message0": "name: %1",
    "args0": [
        {
            "type": "input_value",
            "name": "eventName",
            "check": "String"
        }
    ],
    "message1": "function: %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "f"
        }
    ]
}

createCustomBlock(funklyBlockType.EVENT, "text_blocks", eventJson)
