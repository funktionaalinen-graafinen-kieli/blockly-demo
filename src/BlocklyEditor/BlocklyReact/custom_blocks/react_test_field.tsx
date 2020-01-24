
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
*/
