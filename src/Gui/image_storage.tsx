import doge from "./assets/entity_images/shoudoge.png"
import breadoge from "./assets/entity_images/breadoge.png"
import dogedance from "./assets/entity_images/dogedance.gif"
import muscledoge from "./assets/entity_images/muscledoge.png"
import strangedoge from "./assets/entity_images/strangedoge.png"
import plasticbag from "./assets/entity_images/plasticbag.png"
import plasticbag_green from "./assets/entity_images/plasticbag_green.png"
import plasticbag_pink from "./assets/entity_images/plasticbag_pink.png"
import turtle from "./assets/entity_images/turtle.png"
import jellyfish from "./assets/entity_images/jellyfish.gif"
import jellyfish_orange from "./assets/entity_images/jellyfish_orange.gif"
import sininen from "./assets/entity_images/sininen.svg"
<<<<<<< HEAD
import animatedjellyfish from "./assets/entity_images/animatedjellyfish.png"
import default_image from "./assets/entity_images/default_image.png"

import score_100 from "./assets/gui_entity_images/pistemittari_100.jpg"
import score_empty from "./assets/gui_entity_images/white_rectangle.jpg"

=======
import score_100 from "./assets/entity_images/pistemittari_100.jpg"
import score_empty from "./assets/entity_images/valkoinen_suorakulmio.png"
import jellyfish_transparent from "./assets/entity_images/jellyfish_transparent.png"
import default_image from "./assets/entity_images/default_image.png"

>>>>>>> develop
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
import plusbuttongrey from "./assets/gui_images/plusbuttongrey.png"
import plusbuttonwhite from "./assets/gui_images/plusbuttonwhite.png"
import xbutton from "./assets/gui_images/xbutton.png"
import xbuttonwhite from "./assets/gui_images/xbuttonwhite.png"
import xbuttongrey from "./assets/gui_images/xbuttongrey.png"
import deletebutton from "./assets/gui_images/deletebutton.png"
import maximize from "./assets/gui_images/maximize.png"
import minimize from "./assets/gui_images/minimize.png"

export const entityImages = new Map([
    ["default_image", default_image],
    ["bread_doge", breadoge],
    ["muscle_doge", muscledoge],
    ["doge", doge],
    ["dancingdoge", dogedance],
    ["strange_doge", strangedoge],
    ["muovipussi", plasticbag],
    ["vihreä muovipussi", plasticbag_green],
    ["pinkki muovipussi", plasticbag_pink],
    ["kilpikonna", turtle],
    ["meduusa", jellyfish],
    ["oranssi meduusa", jellyfish_orange],
    ["sininen_palikka", sininen],
    ["animoitumeduusa", animatedjellyfish]
])

export const guiEntityImages = new Map([
    ["pisteet_100", score_100],
    ["pisteet_tyhja", score_empty],
<<<<<<< HEAD
=======
    ["lapinäkyvä meduusa", jellyfish_transparent]
>>>>>>> develop
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
    ["plus", plusbutton],
    ["plusgrey", plusbuttongrey],
    ["pluswhite", plusbuttonwhite],
    ["xbutton", xbutton],
    ["xbuttonwhite", xbuttonwhite],
    ["xbuttongrey", xbuttongrey],
    ["deleteButton", deletebutton],
    ["maximize", maximize],
    ["minimize", minimize]
])
