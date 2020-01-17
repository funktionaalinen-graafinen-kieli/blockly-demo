import "@testing-library/jest-dom/extend-expect"

import React from "react"
import {render, fireEvent, screen, cleanup} from "@testing-library/react"

import Editor from "../editor"
afterEach(cleanup);

test("Editor renders buttons correctly", () => {
    render(<Editor/>)
    expect(screen.getByText("print"))
    expect(screen.getAllByText("if"))
})

test("Code renderer displays correctly", () => {
    render(<Editor/>)
    expect(screen.getByText("Generated JS code is here"))
})

test("Editor renders drop down menu correctly", () => {
    let rendered = render(<Editor/>)
    let container = rendered.container

    fireEvent.click(container.querySelector("blocklyDropDownContent"), {button: 1})
    expect(container.getByText("blockly:u"))
    expect(container.getByText("blockly:s"))
})
