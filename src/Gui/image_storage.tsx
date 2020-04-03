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
import default_image from "./assets/entity_images/default_image.png"
import playbutton from "./assets/gui_images/playbutton.png"
import stopbutton from "./assets/gui_images/stopbutton.png"
import savebutton from "./assets/gui_images/savebutton.png"
import loadbutton from "./assets/gui_images/loadbutton.png"
import debugon from "./assets/gui_images/debugon.png"
import debugoff from "./assets/gui_images/debugoff.png"
import xmlbutton from "./assets/gui_images/xmlbutton.png"
import choosefile from "./assets/gui_images/choosefile.png"
import mouseicon from "./assets/gui_images/mouseicon.png"
import yaxis from "./assets/gui_images/yaxis.png"
import xaxis from "./assets/gui_images/xaxis.png"
import plusbutton from "./assets/gui_images/plusbutton.png"
import plusbuttonwhite from "./assets/gui_images/plusbuttonwhite.png"

export const entityImages = new Map([
    ["default_image", default_image],
    ["bread_doge", breadoge],
    ["muscle_doge", muscledoge],
    ["doge", doge],
    ["dancingdoge", dogedance],
    ["strange_doge", strangedoge],
    ["muovipussi", plasticbag],
    ["kilpikonna", turtle],
    ["meduusa", jellyfish],
    ["sininen_palikka", sininen],
    ["pisteet_100", score_100],
    ["pisteet_tyhja", score_empty],
    ["animoitumeduusa", animatedjellyfish]
])

export const guiImages = new Map([
    ["play", playbutton],
    ["stop", stopbutton],
    ["save", savebutton],
    ["load", loadbutton],
    ["debugon", debugon],
    ["debugoff", debugoff],
    ["xml", xmlbutton],
    ["choosefile", choosefile],
    ["mouseicon", mouseicon],
    ["yaxis", yaxis],
    ["xaxis", xaxis],
    ["plusbutton", plusbutton],
    ["plusbuttonwhite", plusbuttonwhite]
])