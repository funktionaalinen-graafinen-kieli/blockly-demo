
import {Field, BlocklyOptions} from "blockly"


class CondField extends Field {
    static fromJson = (options: BlocklyOptions) => new CondField(options)
}

export default CondField
