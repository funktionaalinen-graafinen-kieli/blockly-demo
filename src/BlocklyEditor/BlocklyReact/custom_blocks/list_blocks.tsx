import * as BlocklyJS from "blockly/javascript"
import * as Blocks from "blockly/blocks"
import { Block, Extensions, FieldDropdown } from "blockly"
import log from "loglevel"

import { entityImages } from "../../../Gui/image_storage"
import { funklyBlockType, funklyCodegen } from "./generator"
import { entityDefaultSize } from "../../../GameEngine/config"

const listWithJson = {
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

createCustomBlock(funklyBlockType.LISTWITH, "list_blocks", listWithJson)
