import Blockly from "blockly"

/* This doesn't work. Seems like blockly doesn't support modern ES classes / their prototypes?

export class FunklyRenderer extends Blockly.blockRendering.Renderer {
    constructor(name: string) {
        super(name)
    }
}
Blockly.utils.object.inherits(FunklyRenderer, Blockly.blockRendering.Renderer)
*/

// This works

export function FunklyRenderer(name: string) {
    // @ts-ignore
    FunklyRenderer.superClass_.constructor.call(this, name)
}
Blockly.utils.object.inherits(FunklyRenderer, Blockly.blockRendering.Renderer)

FunklyRenderer.prototype.makeConstants_ = function() {
    // @ts-ignore
    return new CustomNotchProvider()
}

const CustomNotchProvider = function() {
    // @ts-ignore
    CustomNotchProvider.superClass_.constructor.call(this)
    // @ts-ignore
    this.NOTCH_WIDTH = 20
    // @ts-ignore
    this.NOTCH_HEIGHT = 10
}

Blockly.utils.object.inherits(CustomNotchProvider, Blockly.blockRendering.ConstantProvider)

CustomNotchProvider.prototype.makeNotch = function() {
    let width = this.NOTCH_WIDTH
    let height = this.NOTCH_HEIGHT
    function makeMainPath(horizontal_direction: number) {
        return Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(0, height),
            Blockly.utils.svgPaths.point(horizontal_direction * width, 0),
            Blockly.utils.svgPaths.point(0, -height)
        ])
    }
    let pathLeft = makeMainPath(1)
    let pathRight = makeMainPath(-1)

    return {
        width: width,
        height: height,
        pathLeft: pathLeft,
        pathRight: pathRight
    }
}

CustomNotchProvider.prototype.makePuzzleTab = function() {
    let width = this.TAB_WIDTH
    let height = this.TAB_HEIGHT

    function makeMainPath(vertical_direction: number) {
        return Blockly.utils.svgPaths.line([
            Blockly.utils.svgPaths.point(-width, 0),
            Blockly.utils.svgPaths.point(0, -1 * vertical_direction * height),
            Blockly.utils.svgPaths.point(width, 0)
        ])
    }

    let pathUp = makeMainPath(1)
    let pathDown = makeMainPath(-1)

    return {
        width: width,
        height: height,
        pathDown: pathDown,
        pathUp: pathUp
    }
}
