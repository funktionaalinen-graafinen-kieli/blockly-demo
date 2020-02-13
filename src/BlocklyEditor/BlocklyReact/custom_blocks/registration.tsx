import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import log from "loglevel"

import {funklyBlockType, funklyCodegen} from "./generator"


function createCustomBlock(id: funklyBlockType, style: string, configuration: object) {
    if (!["logic_blocks", "math_blocks", "text_blocks"].includes(style)) {
        log.debug("Non-enabled blockly style!")
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

const addJson = {
    "type:": funklyBlockType.ADD,
    "message0": "add: %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "NUMBER0"
        }
    ],
    "message1": "to: %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "NUMBER1"
        }
    ],
    "previousStatement": null
}

createCustomBlock(funklyBlockType.ADD, "math_blocks", addJson)

const numberJson = {
    "type:": funklyBlockType.NUMBER,
    "message0": "num: %1",
    "args0": [
        {
            "type": "field_number",
            "name": "NUM",
            "value": "1"
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
            "type": "field_input",
            "name": "id",
            "text": "default text",
            "spellcheck": false
        }
    ],
    "message1": "x: %2 %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "x"
        },
        {
            "type": "field_number",
            "name": "initx",
            "value": "1"
        }
    ],
    "message2": "y: %2 %1",
    "args2": [
        {
            "type": "input_statement",
            "name": "y"
        },
        {
            "type": "field_number",
            "name": "inity",
            "value": "1"
        }
    ],
    "message3": "img: %1",
    "args3": [
        {
            "type": "field_input",
            "name": "img",
            "text": "text",
            "spellcheck": false
        }
    ]
}

createCustomBlock(funklyBlockType.ENTITY, "text_blocks", entityJson)

const getJson = {
    "type:": funklyBlockType.GET,
    "inputsInline": true,
    "message0": "get key: %1",
    "args0": [
        {
            "type": "input_value",
            "name": "key",
            "check": "String"
        }
    ],
    "previousStatement": null,
}

createCustomBlock(funklyBlockType.GET, "text_blocks", getJson)

const bindJson = {
    "type:": funklyBlockType.BIND,
    "inputsInline": true,
    "message0": "name: %1",
    "args0": [
        {
            "type": "input_value",
            "name": "id",
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

createCustomBlock(funklyBlockType.BIND, "text_blocks", bindJson)
