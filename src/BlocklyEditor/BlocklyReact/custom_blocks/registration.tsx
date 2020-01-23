import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import Blockly from "blockly"

import * as Generator from "./generator"
import CondField from "./funkly_cond"
import BlocklyReactField from "./react_test_field"



const testReactField = {
    "type": "react_test_field",
    "message0": "custom field %1 !DOES NOT CODE GEN YET!",
    "args0": [
        {
            "type": "react_test_field",
            "name": "FIELD",
            "text": "Click me"
        },
    ],
    "previousStatement": null,
    "nextStatement": null,
}

const cond = {
    "type:": "funkly_cond",

    "message0": "if: %1",
    "args0": [
        {
            "type": "input_value",
            "name": "IF",
            "check": "Boolean"
        }
    ],
    "message1": "do: %1",
    "args1": [
        {
            "type": "input_statement",
            "name": "DO"
        }
    ], "message2": "else: %1",
    "args2": [
        {
            "type": "input_statement",
            "name": "ELSE"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
}


Blocks["funkly_cond"] = {
    init: function() {
        this.jsonInit(cond)
        this.setStyle("logic_blocks")
    }
}

BlocklyJS["funkly_cond"] = Generator.cond
Blockly.fieldRegistry.register("funkly_cond_field", CondField)


Blocks["react_test_field"] = {
    init: function () {
        this.jsonInit(testReactField)
        this.setStyle("loop_blocks")
    }
}

BlocklyJS["react_test_field"] = Generator.reactFieldCode
Blockly.fieldRegistry.register("react_test_field", BlocklyReactField)
