/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview XML wrappers for block, category, value, field and shadow.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React, { ReactElement } from "react"

interface BlocklyProps {
    children?: ReactElement | string
    type?: string
    disabled?: boolean
    name?: string
    is?: string
    colour?: number
}

const createBlocklyElement = (type: string, props: BlocklyProps) => {
    // Spread operator is needed to extend props here
    const properties = { ...props, is: "blockly" }
    // Recursively create children elements
    if (props.children) return React.createElement(type, properties, properties.children)
    else return React.createElement(type, props)
}

const Block = (p: BlocklyProps) => {
    return createBlocklyElement("block", p)
}
const Category = (p: BlocklyProps) => { return createBlocklyElement("category", p) }
/*
const Value = (p: BlocklyProps) => { return createBlocklyElement("value", p) }
const Field = (p: BlocklyProps) => { return createBlocklyElement("field", p) }
const Shadow = (p: BlocklyProps) => { return createBlocklyElement("shadow", p) }
export {Block, Category, Value, Field, Shadow}
*/

export { Block, Category }
