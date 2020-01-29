// Class to test out lang features
// TODO fix import 
Lang = require('./lang');

// adds Lang to scope
with (Lang.Lang) {
    console.log(gt(1)(0))
}
