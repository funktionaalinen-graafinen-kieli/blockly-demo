import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import { Block, Extensions, FieldDropdown } from "blockly"
import log from "loglevel"

import { entityImages } from "../../../Gui/image_storage"
import { funklyBlockType, funklyCodegen } from "./generator"
import { entityDefaultSize } from "../../../GameEngine/config"

export function parent_entity(block: Block): Block | undefined {
    const root_parent = block.getRootBlock()
    if (root_parent.type === "funkly_entity") return root_parent
    else return undefined
}

/* Dropdown with the block being passed treated as a special entry named "tämä" */
export function dropdownWithThis(block: Block, entities: () => Block[]) {
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

export function createCustomBlock(id: funklyBlockType, style: string, configuration: object) {
    if (!["logic_blocks", "math_blocks", "text_blocks"].includes(style)) {
        log.debug("Non-enabled blockly style!")
    }
    Blocks[id] = {
        init: function () {
            this.jsonInit(configuration)
            this.setStyle(style)
            //            this.setColour(290)
        }
    }

    BlocklyJS[id] = funklyCodegen(id)
}

/**
 * Helper method for creating custom FieldDropdowns
 * @param values Map of dropdown display- and internal values
 * @returns blockly FieldDropdown() containing the passed values as the options
 */
export function newCustomDropdown(values: Map<string, string>) {
    return new FieldDropdown(function () {
        let options: string[][] = []
        for (const [display, internal] of values) {
            options.push([display, internal])
        }
        if (options.length === 0) options.push(["?", "?"])
        return options
    })
}
