// Class to test out lang features
// TODO fix import 
Lang = require('./lang');

test = `
        {
            "e1": {
                "x": ["add(get(e1_x))(1)", 1],
                "y": ["add(get(e1_x))(get(e1_y))", 0]
            }
        }
        `

// adds Lang to scope
with (Lang.Lang) {
    var t = JSON.parse(test)
    console.log(t);
}
