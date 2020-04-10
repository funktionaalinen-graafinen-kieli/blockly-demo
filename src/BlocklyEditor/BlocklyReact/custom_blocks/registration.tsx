//@ts-nocheck
import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import { Block, Extensions, FieldDropdown } from "blockly"
import log from "loglevel"

import { entityImages } from "../../../Gui/image_storage"
import { funklyBlockType, funklyCodegen } from "./generator"
import { entityDefaultSize } from "../../../GameEngine/config"

function parent_entity(block: Block): Block | undefined {
    const root_parent = block.getRootBlock()
    if (root_parent.type === "funkly_entity") return root_parent
    else return undefined
}

/* Dropdown with the block being passed treated as a special entry named "tämä" */
function dropdownWithThis(block: Block, entities: () => Block[]) {
    if (block.type !== "funkly_entity") log.info("Called entityThisDropdown with no entity parent")

    const options: string[][] = []
    const parent = parent_entity(block)
    if (parent) options.push(["tämä", parent.id])
    else options.push(["?", "NOT_SELECTED"])

    entities()
        .filter(e => e !== parent)
        .forEach(e => options.push([e.getFieldValue("name"), e.id]))
    return options
}


function createCustomBlock(id: funklyBlockType, style: string, configuration: object, deletable = true) {
    if (!["logic_blocks", "math_blocks", "text_blocks"].includes(style)) {
        log.debug("Non-enabled blockly style!")
    }
    Blocks[id] = {
        init: function () {
            this.jsonInit(configuration)
            this.setStyle(style)
            this.setDeletable(deletable)
        }
    }

    BlocklyJS[id] = funklyCodegen(id)
}

const guardJson = {
    "type:": funklyBlockType.COND,
    message0: "jos %1",
    args0: [
        {
            type: "input_statement",
            name: "IF",
            check: "Boolean"
        }
    ],
    message1: "niin %1",
    args1: [
        {
            type: "input_statement",
            name: "DO"
        }
    ],
    tooltip: "Tooltip here",
    helpUrl: "https://google.com",
    previousStatement: null,
    nextStatement: "Guard"
}

createCustomBlock(funklyBlockType.GUARD, "logic_blocks", guardJson)

const condJson = {
    "type:": funklyBlockType.COND,
    message0: "jos %1",
    args0: [
        {
            type: "input_statement",
            name: "IF",
            check: ["Boolean"]
        }
    ],
    message1: "niin %1",
    args1: [
        {
            type: "input_statement",
            name: "DO"
        }
    ],
    message2: "muuten %1",
    args2: [
        {
            type: "input_statement",
            name: "ELSE"
        }
    ],
    tooltip: "Tooltip here",
    helpUrl: "https://google.com",
    previousStatement: null
}

createCustomBlock(funklyBlockType.COND, "logic_blocks", condJson)

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
    previousStatement: "Number"
}

createCustomBlock(funklyBlockType.NUMBER, "math_blocks", numberJson)

const randJson = {
    "type:": funklyBlockType.RAND,
    message0: "Satunnainen luku * %1",
    args0: [
        {
            type: "field_number",
            name: "NUM",
            value: "1"
        }
    ],
    previousStatement: "Number"
}
createCustomBlock(funklyBlockType.RAND, "math_blocks", randJson)

const entityJson = {
    "type:": funklyBlockType.ENTITY,
    inputsInline: false,
    message0: "Hahmo %1",
    args0: [
        {
            type: "field_input",
            name: "name",
            text: "nimi",
            spellcheck: false
        }
    ],
    message1: "x = %2 %1",
    args1: [
        {
            type: "input_statement",
            name: "x",
            check: "Number"
        },
        {
            type: "field_number",
            name: "initx",
            value: "1"
        }
    ],
    message2: "y = %2 %1",
    args2: [
        {
            type: "input_statement",
            name: "y",
            check: "Number"
        },
        {
            type: "field_number",
            name: "inity",
            value: "1"
        }
    ],
    message3: "kuva %1",
    args3: [
        {
            type: "input_statement",
            name: "img",
            check: ["Image"]
        }
    ],
    message4: "leveys %1",
    args4: [
        {
            type: "field_number",
            name: "width",
            value: `${entityDefaultSize["width"]}`
        }
    ],
    message5: "korkeus %1",
    args5: [
        {
            type: "field_number",
            name: "height",
            value: `${entityDefaultSize["height"]}`
        }
    ],
    message6: "osumasäde %1",
    args6: [
        {
            type: "field_number",
            name: "radius",
            value: `${entityDefaultSize["radius"]}`
        }
    ],
}

createCustomBlock(funklyBlockType.ENTITY, "text_blocks", entityJson, false)

const guiEntityJson = {
    "type:": funklyBlockType.GUIENTITY,
    inputsInline: false,
    message0: "Tietovekotin %1",
    args0: [
        {
            type: "field_input",
            name: "name",
            text: "nimi",
            spellcheck: false
        }
    ],
    message1: "aloitus-x %1, \n leveys %2",
    args1: [
        {
            type: "field_number",
            name: "initx",
            value: "1"
        },
        {
            type: "field_number",
            name: "width",
            value: "50"
        }

    ],
    message2: "aloitus-y %1, korkeus %2",
    args2: [
        {
            type: "field_number",
            name: "inity",
            value: "1"
        },
        {
            type: "field_number",
            name: "height",
            value: "50"
        }
    ],
    message3: "kuva %1",
    args3: [
        {
            type: "input_statement",
            name: "img",
            check: ["Image"]
        }
    ],
    message4: "info: %1",
    args4: [
        {
            type: "input_statement",
            name: "text",
            //TODO implement block that allows users to construct strings
            //check: ["String"]
        }
    ],
}

createCustomBlock(funklyBlockType.GUIENTITY, "text_blocks", guiEntityJson)

const colJson = {
    "type:": funklyBlockType.COLLIDE,
    inputsInline: true,
    message0: "%1 törmää %2",
    args0: [
        {
            type: "input_dummy",
            name: "e1"
        },
        {
            type: "input_dummy",
            name: "e2"
        }
    ],
    extensions: ["col_dropdown"],
    previousStatement: "Boolean"
}

createCustomBlock(funklyBlockType.COLLIDE, "logic_blocks", colJson)

Extensions.register("col_dropdown", function (this: Block) {
    // change how this gets here
    const charMap = window.currentUser.charMap

    const entities = () => [...charMap]
                .filter(([k, v]) => k !== "")
                .map(([id,w]) => w.getBlockById(id))
                .filter((b) => b && b.type === "funkly_entity")

    const dropdownOptions = () => dropdownWithThis(this, entities)

    // Removes fielddropdown validation to allow not-yet-existent entities
    FieldDropdown.prototype.doClassValidation_ = function(newValue: any) {
        return newValue;
    };

    this.getInput("e1").appendField(new FieldDropdown(dropdownOptions), "e1")
    this.getInput("e2").appendField(new FieldDropdown(dropdownOptions), "e2")
})

const getJson = {
    "type:": funklyBlockType.GET,
    inputsInline: true,
    message0: "%1 %2",
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
    // change how this gets here
    const charMap = window.currentUser.charMap

    const entities = () => [...charMap]
                .filter(([k, v]) => k !== "")
                .map(([id,w]) => w.getBlockById(id))
                .filter((b) => b && b.type === "funkly_entity")

    const dropdownOptions = () => {
        return dropdownWithThis(this, entities)
    }

    this.getInput("entity").appendField(new FieldDropdown(dropdownOptions), "entity")

    const propertyMap =
        new Map([
            ["name", "name"],
            ["x", "x"],
            ["y", "y"],
            ["w", "w"],
            ["h", "h"],
            ["text", "text"]
        ])
    this.getInput("property").appendField(newCustomDropdown(propertyMap), "property")
})

const bindGetJson = {
    "type:": funklyBlockType.BINDGET,
    inputsInline: true,
    message0: "%1",
    args0: [
        {
            type: "input_dummy",
            name: "name"
        }
    ],
    extensions: ["bind_dropdown"],
    previousStatement: null
}

createCustomBlock(funklyBlockType.BINDGET, "text_blocks", bindGetJson)

//TODO declare binds elsewhere
Extensions.register("bind_dropdown", function (this: Block) {
    this.getInput("name").appendField(newCustomDropdown(new Map([["aika", "time"], ["satunnainen", "random"]])), "name")
})

const compJson = {
    "type:": funklyBlockType.COMP,
    inputsInline: true,
    message0: "%1",
    args0: [
        {
            type: "input_statement",
            name: "NUMBER0",
            check: "Number"
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
            name: "NUMBER1",
            check: "Number"
        }
    ],
    extensions: ["comp_dropdown"],
    previousStatement: "Boolean"
}

createCustomBlock(funklyBlockType.COMP, "logic_blocks", compJson)

Extensions.register("comp_dropdown", function (this: Block) {
    this.getInput("func").appendField(newCustomDropdown(new Map([
        [">", "gt"],
        ["<", "lt"],
        ["==", "eq"],
        ["!=", "neq"],
        [">=", "geq"],
        ["<=", "leq"]
    ])), "func")
})

const mathJson = {
    "type:": funklyBlockType.MATH,
    inputsInline: true,
    message0: "%1",
    args0: [
        {
            type: "input_statement",
            name: "NUMBER0",
            check: "Number"
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
            name: "NUMBER1",
            check: "Number"
        }
    ],
    extensions: ["math_dropdown"],
    previousStatement: "Number"
}

createCustomBlock(funklyBlockType.MATH, "math_blocks", mathJson)

Extensions.register("math_dropdown", function (this: Block) {
    this.getInput("func").appendField(newCustomDropdown(new Map([
        ["+", "add"],
        ["-", "sub"],
        ["*", "mul"],
        ["/", "div"],
        ["%", "mod"]
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
            name: "NUMBER0",
            check: "Number"
        }
    ],
    extensions: ["trig_dropdown"],
    previousStatement: "Number"
}

createCustomBlock(funklyBlockType.TRIG, "math_blocks", trigJson)

Extensions.register("trig_dropdown", function (this: Block) {
    this.getInput("func").appendField(newCustomDropdown(new Map([
        ["sin", "sin"],
        ["cos", "cos"],
        ["tan", "tan"]
    ])), "func")
})

const keyJson = {
    "type:": funklyBlockType.KEY,
    inputsInline: true,
    message0: "syöte = %1",
    args0: [
        {
            type: "input_dummy",
            name: "key"
        }
    ],
    extensions: ["key_dropdown"],
    previousStatement: "Boolean"
}

createCustomBlock(funklyBlockType.KEY, "logic_blocks", keyJson)

//TODO make key selection system
Extensions.register("key_dropdown", function (this: Block) {
    this.getInput("key").appendField(newCustomDropdown(new Map([["w", "w"], ["a", "a"], ["s", "s"], ["d", "d"]])), "key")
})

const imgJson = {
    "type:": funklyBlockType.IMG,
    inputsInline: true,
    message0: "%1",
    args0: [
        {
            type: "input_dummy",
            name: "IMAGE"
        }
    ],
    extensions: ["img_dropdown"],
    previousStatement: "Image"
}

createCustomBlock(funklyBlockType.IMG, "text_blocks", imgJson)

Extensions.register("img_dropdown", function (this: Block) {
    this.getInput("IMAGE").appendField(newCustomDropdown(entityImages), "IMAGE")
})

/**
 * Helper method for creating custom FieldDropdowns
 * @param values Map of dropdown display- and internal values
 * @returns blockly FieldDropdown() containing the passed values as the options
 */
const newCustomDropdown = (values: Map<string, string>) =>
    new FieldDropdown(function () {
        let options: string[][] = []
        for (const [display, internal] of values) {
            options.push([display, internal])
        }
        if (options.length === 0) options.push(["?", "?"])
        return options
    })

const bindSetJson = {
    "type:": funklyBlockType.BIND,
    inputsInline: true,
    message0: "name %1",
    args0: [
        {
            type: "input_value",
            name: "id",
            check: "String"
        }
    ],
    message1: "function %1",
    args1: [
        {
            type: "input_statement",
            name: "f"
        }
    ]
}

createCustomBlock(funklyBlockType.BIND, "text_blocks", bindSetJson)
