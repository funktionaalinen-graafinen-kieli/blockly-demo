import Blockly from "blockly"

export function FunklyRenderer(name: string) {
    // @ts-ignore
    FunklyRenderer.superClass_.constructor.call(this, name)
}
Blockly.utils.object.inherits(FunklyRenderer, Blockly.blockRendering.Renderer)