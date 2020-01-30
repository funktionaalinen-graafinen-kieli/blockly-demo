
## Creating blocks
* https://sites.google.com/view/blockly-user-summit-2019/hackathon/rendering-quick-start
* https://developers.google.com/blockly/guides/create-custom-blocks/generating-code
* https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
* Block json _has_ to contain a message for every argument containing the string "%1"
For example this
``` 
const block_json = {
      "type:": "funkly_custom_block",
      "message0": "%1",
      "args0": [
          {
              "type": "field_number",
              "name:": "A_NUMBER"
          }
      ]
  }
```
Would _not_ work without the message. Blockly won't realize that the inputs exist or something without the %1 messages.

If you have an existing message that _doesn't_ contain the string "%1" blockly will correctly raise an error.


Blocklys own definitions (useful as an example):
* https://github.com/google/blockly/tree/master/generators
* https://github.com/google/blockly/tree/master/blocks


React-dropdown field sample
```typescript
// generator.tsx


function reactFieldCode(block: Block) {
    // See link for actual implementation of the code generation logic
    // https://developers.google.com/blockly/guides/create-custom-blocks/generating-code
    return "console.log('Custom block, code generation not implemented yet');\n"
}

//react_test_field.tsx

import * as React from "react"
import * as ReactDOM from "react-dom"
import {Field, DropDownDiv, BlocklyOptions} from "blockly"
/*
class BlocklyReactField extends Field {
    private div_: Element | undefined
    static fromJson = (options: BlocklyOptions) => new BlocklyReactField(options)

    showEditor_() {
        this.div_ = DropDownDiv.getContentDiv()
        ReactDOM.render(this.render(), this.div_)

        let border = this.sourceBlock_.getColourBorder()
        border = border.colourBorder || border.colourLight
        DropDownDiv.setColour(this.sourceBlock_.getColour(), border.colourBorder)

        DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this))
    }

    dropdownDispose_() { if (this.div_) ReactDOM.unmountComponentAtNode(this.div_) }

    render() { return <FieldRenderComponent/> }
}

const FieldRenderComponent: React.FC = () => {
    return <div style={{color: "#fff"}}>
        Hello from React!
    </div>
}

export default BlocklyReactField


// registration.tsx


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

Blocks["react_test_field"] = {
    init: function () {
        this.jsonInit(testReactField)
        this.setStyle("loop_blocks")
    }
}

BlocklyJS["react_test_field"] = Generator.reactFieldCode
Blockly.fieldRegistry.register("react_test_field", BlocklyReactField)
*/

```
