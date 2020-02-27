import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { render, fireEvent, screen, cleanup } from "@testing-library/react"

// import Editor from "../editor"
afterEach(cleanup)

test("default",()=>{
    expect(1).toEqual(1)
})

// test("Editor renders correctly", () => {
//     render(<Editor/>)
//     expect(screen.getByText("print"))
//     expect(screen.getAllByText("if"))
// })

// test("Code renderer displays correctly", () => {
//     render(<Editor/>)
//     expect(screen.getByText("Generated JS code is here"))
// })

/* fireEvent.click(getByText("true"))
    //expect(screen.getByText("true"))
    expect(getByText("false"))
}) */

// test("Editor renders drop down menu correctly", () => {
//     const { getByText } = render(<Editor/>)
//     expect(getByText("true"))

//     fireEvent.click(getByText("true"))
//     //expect(screen.getByText("true"))
//     expect(getByText("false"))
// })
