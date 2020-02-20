import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import { Block, Extensions, FieldDropdown } from "blockly"
import log from "loglevel"

import { publicImages } from "../../../Gui/image_storage"
import { funklyBlockType, funklyCodegen } from "./generator"

function createCustomBlock(id: funklyBlockType, style: string, configuration: object) {
    if (!["logic_blocks", "math_blocks", "text_blocks"].includes(style)) {
        log.debug("Non-enabled blockly style!")
    }
    Blocks[id] = {
        init: function() {
            this.jsonInit(configuration)
            this.setStyle(style)
        }
    }

    BlocklyJS[id] = funklyCodegen(id)
}

const condJson = {
    "type:": funklyBlockType.COND,
    message0: "jos: %1",
    args0: [
        {
            type: "input_statement",
            name: "IF"
        }
    ],
    message1: "tee: %1",
    args1: [
        {
            type: "input_statement",
            name: "DO"
        }
    ],
    message2: "muuten: %1",
    args2: [
        {
            type: "input_statement",
            name: "ELSE"
        }
    ],
    previousStatement: null
}

createCustomBlock(funklyBlockType.COND, "logic_blocks", condJson)

const gtJson = {
    "type:": funklyBlockType.GT,
    message0: "tämä: %1",
    args0: [
        {
            type: "input_statement",
            name: "NUMBER0"
        }
    ],
    message1: "on suurempi kuin: %1",
    args1: [
        {
            type: "input_statement",
            name: "NUMBER1"
        }
    ],
    previousStatement: null
}

createCustomBlock(funklyBlockType.GT, "logic_blocks", gtJson)

const numberJson = {
    "type:": funklyBlockType.NUMBER,
    message0: "%1",
    args0: [
        {
            type: "field_number",
            name: "NUM",
            value: "1"
        }
    ],
    previousStatement: null
}
createCustomBlock(funklyBlockType.NUMBER, "math_blocks", numberJson)

const entityJson = {
    "type:": funklyBlockType.ENTITY,
    inputsInline: true,
    message0: "Hahmo: %1",
    args0: [
        {
            type: "field_input",
            name: "id",
            text: "default text",
            spellcheck: false
        }
    ],
    message1: "x: %2 %1",
    args1: [
        {
            type: "input_statement",
            name: "x"
        },
        {
            type: "field_number",
            name: "initx",
            value: "1"
        }
    ],
    message2: "y: %2 %1",
    args2: [
        {
            type: "input_statement",
            name: "y"
        },
        {
            type: "field_number",
            name: "inity",
            value: "1"
        }
    ],
    message3: "img: %1",
    args3: [
        {
            type: "input_statement",
            name: "img"
        }
    ],
}

createCustomBlock(funklyBlockType.ENTITY, "text_blocks", entityJson)

const getJson = {
    "type:": funklyBlockType.GET,
    inputsInline: true,
    message0: "get: %1 %2",
    args0: [
        {
            type: "input_dummy",
            name: "entity"
        },
        {
            type: "input_dummy",
            name: "property"
        }
    ],
    extensions: ["entity_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.GET, "text_blocks", getJson)

Extensions.register("entity_dropdown", function(this: Block) {
    const entities = () => this.workspace.getBlocksByType("funkly_entity", true)

    this.getInput("entity").appendField(new FieldDropdown(function() {
        let options: string[][] = [["none", "DEFAULT_NONE"]]
        entities().forEach(e => options.push([e.getFieldValue("id"),e.getFieldValue("id")]))
        return options
    }), "entity")

    this.getInput("property").appendField(
        newCustomDropdown(
            new Map([
                ["x", "x"],
                ["y", "y"]
            ])
        ),
        "property"
    )
})

const bindGetJson = {
    "type:": funklyBlockType.BINDGET,
    inputsInline: true,
    message0: "get: %1",
    args0: [
        {
            type: "input_dummy",
            name: "id"
        }
    ],
    extensions: ["bind_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.BINDGET, "text_blocks", bindGetJson)

//TODO declare binds elsewhere
Extensions.register("bind_dropdown", function(this: Block) {
    this.getInput("id").appendField(newCustomDropdown(new Map([["time","time"]])), "id")
})

const mathJson = {
    "type:": funklyBlockType.MATH,
    inputsInline: true,
    message0: "%1",
    args0: [
        {
            type: "input_statement",
            name: "NUMBER0"
        }
    ],
    message1: "%1",
    args1: [
        {
            type: "input_dummy",
            name: "func"
        }
    ],
    message2: "%1",
    args2: [
        {
            type: "input_statement",
            name: "NUMBER1"
        }
    ],
    extensions: ["math_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.MATH, "math_blocks", mathJson)

Extensions.register("math_dropdown", function(this: Block) {
    this.getInput("func").appendField(newCustomDropdown(new Map([
        ["+","add"],
        ["-","sub"],
        ["*","mul"],
        ["/","div"]
    ])), "func")
})

const trigJson = {
    "type:": funklyBlockType.TRIG,
    inputsInline: true,
    message0: "%1",
    args0: [
        {
            type: "input_dummy",
            name: "func"
        }
    ],
    message1: "%1",
    args1: [
        {
            type: "input_statement",
            name: "NUMBER0"
        }
    ],
    extensions: ["trig_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.TRIG, "math_blocks", trigJson)

Extensions.register("trig_dropdown", function(this: Block) {
    this.getInput("func").appendField(newCustomDropdown(new Map([
        ["sin","sin"],
        ["cos","cos"],
        ["tan","tan"]
    ])), "func")
})

const keyJson = {
    "type:": funklyBlockType.KEY,
    inputsInline: true,
    message0: "input: %1",
    args0: [
        {
            type: "input_dummy",
            name: "key"
        }
    ],
    extensions: ["key_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.KEY, "logic_blocks", keyJson)

//TODO make key selection system
Extensions.register("key_dropdown", function(this: Block) {
    this.getInput("key").appendField(newCustomDropdown(new Map([["w","w"],["a","a"],["s","s"],["d","d"]])), "key")
})

const imgJson = {
    "type:": funklyBlockType.IMG,
    inputsInline: true,
    message0: "image: %1",
    args0: [
        {
            type: "input_dummy",
            name: "IMAGE"
        }
    ],
    extensions: ["img_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.IMG, "text_blocks", imgJson)

Extensions.register("img_dropdown", function(this: Block) {
    this.getInput("IMAGE").appendField(newCustomDropdown(publicImages), "IMAGE")
})

/**
 * Helper method for creating custom FieldDropdowns
 * @param values Map of dropdown display- and internal values
 * @returns blockly FieldDropdown() containing the passed values as the options
 */
const newCustomDropdown = (values: Map<string, string>) =>
    new FieldDropdown(function() {
        let options: string[][] = []
        if (values.size == 0) options = [["none", "DEFAULT_NONE"]]
        for (const [display, internal] of values) {
            options.push([display, internal])
        }
        return options
    })

const bindSetJson = {
    "type:": funklyBlockType.BIND,
    inputsInline: true,
    message0: "name: %1",
    args0: [
        {
            type: "input_value",
            name: "id",
            check: "String"
        }
    ],
    message1: "function: %1",
    args1: [
        {
            type: "input_statement",
            name: "f"
        }
    ]
}

createCustomBlock(funklyBlockType.BIND, "text_blocks", bindSetJson)
