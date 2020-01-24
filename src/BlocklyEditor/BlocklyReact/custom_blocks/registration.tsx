import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import Blockly, {BlocklyOptions, Field} from "blockly"

import * as Generator from "./generator"


const cond = {
    "type:": "funkly_cond",
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

class CondField extends Field {
    static fromJson = (options: BlocklyOptions) => new CondField(options)
}

Blocks["funkly_cond"] = {
    init: function() {
        this.jsonInit(cond)
        this.setStyle("logic_blocks")
    }
}

BlocklyJS["funkly_cond"] = Generator.cond
Blockly.fieldRegistry.register("funkly_cond_field", CondField)


const gt = {
    "type:": "funkly_gt",
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

class GreaterThan extends Field {
    static fromJson = (options: BlocklyOptions) => new GreaterThan(options)
}

Blocks["funkly_gt"] = {
    init: function() {
        this.jsonInit(gt)
        this.setStyle("logic_blocks")
    }
}

BlocklyJS["funkly_gt"] = Generator.gt
Blockly.fieldRegistry.register("funkly_gt_field", GreaterThan)


const number = {
    "type:": "funkly_number",
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

class FunklyNumber extends Field {
    static fromJson = (options: BlocklyOptions) => new FunklyNumber(options)
}

Blocks["funkly_number"] = {
    init: function() {
        this.jsonInit(number)
        this.setStyle("math_blocks")
    }
}

BlocklyJS["funkly_number"] = Generator.number
Blockly.fieldRegistry.register("funkly_number_field", FunklyNumber)
