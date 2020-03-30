import Blockly from "blockly"

const funklyThemeJson = {
    "math_blocks": {
        "colourPrimary": "#1f7fbf",
        "colourSecondary":"#8abadb",
        "colourTertiary":"#1842ab",
        "hat": ""
     },
    "logic_blocks": {
       "colourPrimary": "#a667bf",
       "colourSecondary":"#e89cff",
       "colourTertiary":"#684178",
       "hat": ""
    },
    "text_blocks": {
        "colourPrimary": "#00b035",
        "colourSecondary":"#8cd481",
        "colourTertiary":"#1b6e00",
        "hat": ""
     }
}

const categoryJson = {}

export const funklyTheme = new Blockly.Theme('funkly_theme', funklyThemeJson, categoryJson)