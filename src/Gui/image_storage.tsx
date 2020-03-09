import doge from "./assets/entity_images/shoudoge.png"
import breadoge from "./assets/entity_images/breadoge.png"
import dogedance from "./assets/entity_images/dogedance.gif"
import muscledoge from "./assets/entity_images/muscledoge.png"
import strangedoge from "./assets/entity_images/strangedoge.png"
import plasticbag from "./assets/entity_images/plasticbag.png"
import turtle from "./assets/entity_images/turtle.png"
import jellyfish from "./assets/entity_images/jellyfish.gif"
import sininen from "./assets/entity_images/sininen.svg"
import score_100 from "./assets/entity_images/pistemittari_100.jpg"
import score_empty from "./assets/entity_images/valkoinen_suorakulmio.jpg"
import animatedjellyfish from "./assets/entity_images/animatedjellyfish.png"
import playbutton from "./assets/gui_images/playbutton.png"
import stopbutton from "./assets/gui_images/stopbutton.png"

export const entityImages = new Map([
    ["bread_doge", breadoge],
    ["muscle_doge", muscledoge],
    ["doge", doge],
    ["dancingdoge", dogedance],
    ["strange_doge", strangedoge],
    ["plastic_bag", plasticbag],
    ["turtle", turtle],
    ["jellyfish", jellyfish],
    ["sininen_palikka", sininen],
    ["pisteet_100", score_100],
    ["pisteet_tyhja", score_empty],
    ["animatedjellyfish", animatedjellyfish]
])

export const guiImages = new Map([
    ["play", playbutton],
    ["stop", stopbutton]
])