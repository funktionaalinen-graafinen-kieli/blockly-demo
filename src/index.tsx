import React from "react";
import ReactDOM from "react-dom";
import * as log from "loglevel";

import Editor from "./BlocklyEditor/editor";
import GameEngine from "./GameEngine/game_engine.js";

log.setLevel("trace");
ReactDOM.render(<GameEngine />, document.getElementById("root"));
