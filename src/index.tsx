import React from "react";
import ReactDOM from "react-dom";
import * as log from "loglevel";
import { id, frameTime } from "./utils";

import Editor from "./BlocklyEditor/editor";
import GameEngine from "./GameEngine/game_engine.js";

log.setLevel("trace");
ReactDOM.render(
  <GameEngine
    entityList={[
      [
        [
          "x",
          [(x: any, s: any) => (s.get("everySecond")[1][0] ? x + 1 : x), 1]
        ],
        ["y", [id, 1]],
        [
          "img",
          [
            id,
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg"
          ]
        ]
      ]
    ]}
    addEvents={(state: any, timer: any) => {
      state.set("frameTime", [id, frameTime]);
      state.set("time", [(x: any, s: any) => x + s.get("frameTime")[1], 0]);
      state.set("everySecond", [timer, [false, 0, 1000]]);
    }}
  />,
  document.getElementById("root")
);
