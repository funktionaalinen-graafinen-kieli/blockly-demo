import Blockly from "blockly"

export function disableBlocklyValidations() {
    const proto = Blockly.FieldDropdown.prototype
    const prevValidation = proto.doClassValidation_
    // Having type validation here wouldn't do anything since only blockly interoperates with this function
    // eslint-disable-next-line
    proto.doClassValidation_ = function (newValue: any) {
        return newValue
    }
    // Turn validations back on
    return () => { proto.doClassValidation_ = prevValidation }
}


