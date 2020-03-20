import "@testing-library/jest-dom/extend-expect"

import React from "react"
import { render, cleanup } from "@testing-library/react"

import App from "../app"
afterEach(cleanup)

jest.mock("../../GameEngine/game_engine",()=>()=><></>)
jest.mock("../../BlocklyEditor/editor", ()=>()=><></>)

test("App renders correctly", () => {
    const tree = render(<App/>)
    expect(tree).toMatchSnapshot()
})
