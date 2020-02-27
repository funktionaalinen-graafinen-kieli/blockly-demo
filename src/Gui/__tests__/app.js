import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { render, fireEvent, screen, cleanup } from "@testing-library/react"

import App from "../app"
afterEach(cleanup)

jest.mock("../../GameEngine/game_engine",()=>()=><></>)
jest.mock("../../BlocklyEditor/editor", ()=>()=><></>)

test("default",()=>{
    expect(1).toEqual(1)
})

test("App renders correctly", () => {
    const tree = render(<App/>)
    expect(tree).toMatchSnapshot()
})