/**
 * @license
 *
 * Copyright 2019 Google LLC
 * Copyright 2020 Kerkko Pelttari - Add typing, change to tsx
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
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */
import * as React from "react"
import * as Blockly from "blockly"
import locale from "blockly/msg/en"

import "./custom_blocks/registration"

const blocklyDivStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
    position: "absolute"
}

Blockly.setLocale(locale)
export class BlocklyComponent extends React.Component<{ initialXml: string }> {
    private toolbox!: HTMLElement
    private primaryWorkspace!: Blockly.Workspace
    private blocklyDiv: HTMLElement | null = null

    componentDidMount() {
        const { initialXml, children, ...rest } = this.props

        if (this.blocklyDiv) {
            this.primaryWorkspace = Blockly.inject(this.blocklyDiv, {
                toolbox: this.toolbox,
                ...rest
            })
        }

        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace)
        }
    }

    get workspace() {
        return this.primaryWorkspace
    }

    render() {
        const { children } = this.props
        return (
            <React.Fragment>
                <div ref={e => (this.blocklyDiv = e)} id="blocklyDiv" style={blocklyDivStyle} />
                {/* Needed to ignore xml error
                //@ts-ignore */}
                <xml
                    xmlns="https://developers.google.com/blockly/xml"
                    is="blockly"
                    style={{ display: "none" }}
                    ref={(toolbox: HTMLElement) => {
                        this.toolbox = toolbox
                    }}
                >
                    {children}
                    {/* Needed to ignore xml error
                //@ts-ignore */}
                </xml>
            </React.Fragment>
        )
    }
}
export default BlocklyComponent
