// @ts-nocheck
import Blockly from "blockly"

// taken from https://github.com/google/blockly-samples/tree/master/rendering/rendering-walkthrough

export function TypedConnectionShapeRenderer(name) {
  TypedConnectionShapeRenderer.superClass_.constructor.call(this, name);
};
Blockly.utils.object.inherits(TypedConnectionShapeRenderer,
    Blockly.blockRendering.Renderer);

Blockly.blockRendering.register('typed_connection_shapes',
    TypedConnectionShapeRenderer);

function TypedConnectionShapeProvider() {
  TypedConnectionShapeProvider.superClass_.constructor.call(this);
  this.NOTCH_WIDTH = 20
  this.NOTCH_HEIGHT = 10
};
Blockly.utils.object.inherits(TypedConnectionShapeProvider,
    Blockly.blockRendering.ConstantProvider);

TypedConnectionShapeRenderer.prototype.makeConstants_ = function() {
  return new TypedConnectionShapeProvider();
};

// New code is below this line.

/**
 * Create a new function to return a rounded puzzle tab that works for input and
 * output connections.
 */
TypedConnectionShapeProvider.prototype.makeRounded = function() {
  var width = this.NOTCH_WIDTH
  var height = this.NOTCH_HEIGHT

  function makeMainPath(left) {
    var height = width / 2;
    const { point, line, arc } = Blockly.utils.svgPaths
    return arc(
        'a',
        '0 0 ' + (left ? 1 : 0),
        height,
        point((left ? -1 : 1) * width, 0)
    );
  }

  var pathLeft = makeMainPath(false);
  var pathRight = makeMainPath(true);

  return {
    width: width,
    height: height,
    pathLeft: pathLeft,
    pathRight: pathRight
  };
};

//TEST
TypedConnectionShapeProvider.prototype.makeSquared = function() {
    let width = this.NOTCH_WIDTH
    let height = this.NOTCH_HEIGHT
    function makeMainPath(horizontal_direction: number) {
        const { point, line } = Blockly.utils.svgPaths
        return line([
            point(0, height),
            point(horizontal_direction * width, 0),
            point(0, -height)
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

TypedConnectionShapeProvider.prototype.makeVNotch = function() {
    let width = this.NOTCH_WIDTH
    let height = this.NOTCH_HEIGHT
    function makeMainPath(horizontal_direction: number) {
        const { point, line } = Blockly.utils.svgPaths
        return line([
            point(0, 0),
            point(horizontal_direction * width / 2, height),
            point(horizontal_direction * width / 2, -height)
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

TypedConnectionShapeProvider.prototype.makeTriangleWave = function() {
    let width = this.NOTCH_WIDTH
    let height = this.NOTCH_HEIGHT / 2
    //hdir is -1 or 1 depending on left or right
    function makeMainPath(hdir: number) {
        const { point, line } = Blockly.utils.svgPaths
        return line([
            point(0, 0),
            point(hdir * width / 8, height),
            point(hdir * width / 8, -height),
            point(0, 0),
            point(hdir * width / 8, height),
            point(hdir * width / 8, -height),
            point(0, 0),
            point(hdir * width / 8, height),
            point(hdir * width / 8, -height),
            point(0, 0),
            point(hdir * width / 8, height),
            point(hdir * width / 8, -height)
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

TypedConnectionShapeProvider.prototype.makeSquareWave = function() {
    let width = this.NOTCH_WIDTH
    let height = this.NOTCH_HEIGHT / 2
    //hdir is -1 or 1 depending on left or right
    function makeMainPath(hdir: number) {
        const { point, line } = Blockly.utils.svgPaths
        return line([
            point(hdir * width / 5, 0),
            point(0, height),
            point(hdir * width / 5, 0),
            point(0, -height),
            point(hdir * width / 5, 0),
            point(0, height),
            point(hdir * width / 5, 0),
            point(0, -height),
            point(hdir * width / 5, 0),
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

/**
 * Override the init function.
 * @override
 */
TypedConnectionShapeProvider.prototype.init = function() {
  TypedConnectionShapeProvider.superClass_.init.call(this);
  // Add calls to create shape objects for the new connection shapes.
  this.SQUARED = this.makeSquared();
  this.ROUNDED = this.makeRounded();
  this.SQUAREWAVE = this.makeSquareWave();
  this.VNOTCH = this.makeVNotch();
  this.NOTCH = this.makeTriangleWave();
};


/**
 * Override the shapeFor function to inspect the connection's type checks.
 * Return a rounded tab for inputs and outputs that accept numbers and strings.
 * Return a squared tab for other inputs and outputs.
 * Return the normal notch for previous and next connections.
 * @override
 */
TypedConnectionShapeProvider.prototype.shapeFor = function(connection) {
  var checks = connection.getCheck();
  switch (connection.type) {
    case Blockly.PREVIOUS_STATEMENT:
    case Blockly.NEXT_STATEMENT:
      if (checks && checks.indexOf('Number') != -1) {
        return this.ROUNDED;
      }
      if (checks && checks.indexOf('Boolean') != -1) {
        return this.SQUARED;
      }
      if (checks && checks.indexOf('Image') != -1) {
        return this.SQUAREWAVE;
      }
      return this.NOTCH;
    default:
      return this.VNOTCH;
  }
};
