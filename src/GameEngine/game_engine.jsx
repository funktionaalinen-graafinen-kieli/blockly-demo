import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"

import Entity from "./entity.js"
import evalFunc from "../Lang/eval_func"
import {StateMap} from "./state_map"

import { posFactor, imgSize, gameboard, } from "./config"
import { clamp } from "./utils"

const dogeRace = ` 
{
    "entities": {
        "e1": {
            "x": ["pack(add(1)(get('e1_x')))", 1],
            "y": ["packF(id)", 0],
            "img": ["packF(id)", "http://www.pngmart.com/files/11/Shiba-Inu-Doge-Meme-PNG-Image.png" ]
        },
        "e2": {
            "x": ["pack(cond(gt(get('time'))(3000))(add(2)(get('e2_x')))(get('e2_x')))", 1],
            "y": ["packF(id)", 60],
            "img": ["packF(id)", "https://www.pikpng.com/pngl/b/58-584318_doge-bread-clipart.png" ]
        },
        "e3": {
            "x": ["pack(add(1)(get('e3_x')))", 1],
            "y": ["pack(add(get('e3_y'))(mul(sin(mul(get('e3_x'))(0.02)))(1)))", 120],
            "img": ["packF(id)", "http://www.pngmart.com/files/11/Doge-Meme-PNG-Picture.png" ]
        },
        "e4": {
            "x": ["pack(cond(get('key_d'))(add(2)(get('e4_x')))(cond(get('key_a'))(add(-2)(get('e4_x')))(get('e4_x'))))", 1],
            "y": ["pack(cond(get('key_s'))(add(2)(get('e4_y')))(cond(get('key_w'))(add(-2)(get('e4_y')))(get('e4_y'))))", 180],
            "img": ["packF(id)", "http://www.pngmart.com/files/11/Doge-Meme-PNG-Picture.png" ]
        }
    },
    "binds": {
        "frameTime": ["packF(id)", 16],
        "time": ["pack(add(get('time'))(get('frameTime')))", 0],
        "everySecond": ["packF(timer)", [false, 0, 1000]],
        "width": ["packF(id)", 450]
    }
}
`

class MapWithDefault extends Map {
    get(key) {
        if (!this.has(key)) return this.default()
        return super.get(key)
    }
  
    constructor(defaultFunction, entries) {
        super(entries)
        this.default = defaultFunction
    }
}

export default class GameEngine extends React.Component {
    state = {
        gameState: new MapWithDefault(() => [(x, s) => x, false]),
        entities: [],
        updater: null,
        keymap: new Map()
    }

    componentDidMount() {
        let parsedObjectList
        try {
            parsedObjectList = evalFunc(this.props.program)
        } catch (error) {
            console.debug("Caught error in parsing block json")
            console.debug(error)
            parsedObjectList = evalFunc(dogeRace)
        }

        const entities = parsedObjectList["entities"]
        Object.keys(entities).forEach(entityName => {
            this.state.entities.push(new Entity(this.state.gameState, entityName, entities[entityName]))
        })

        const binds = parsedObjectList["binds"]
        Object.keys(binds).forEach(eventName => {
            this.state.gameState.set(eventName,binds[eventName])
        })

        this.setState({updater: this.props.updater(this)})
    }

    componentWillUnmount() {
        this.state.updater.then(val => clearInterval(val))
    }

    gameArea = React.createRef()

    getVal = name => this.state.gameState.get(name)[1]

    applyF(key,state) {
        let p = state.get(key)
        return p[0](p[1],state)
    }

    handleKeyDown = (e) => {
        this.state.keymap.set(e.key,true)
    }

    handleKeyUp = (e) => {
        this.state.keymap.set(e.key,false)
    }

    update() {
        for (let [key, value] of this.state.gameState) {
            this.saveKeysToState()
            this.updateState(key,value)
        }
    }

    updateState = (k, v) => {
        this.setState({state:this.state.gameState.set(k,[v[0],this.applyF(k,this.state.gameState)])})
    }

    saveKeysToState = () => {
        Array.from(this.state.keymap,([k,v]) => this.state.gameState.set("key_"+k,[(x,s) => x, v]))
    }

    render() {
        // console.warn('gameboard:',gameboard)
        if (!this.props.toggle) return null
        if (!this.state.entities.length) return null

        return (
        <Row>
            <Col>
                <div style={gameboard['containerStyle']}
                    ref={this.gameArea}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                    tabIndex="0"
                >
                    {
                        this.state.entities.map((entity,key) =>
                            <div key={key}>
                                <img
                                    style={{
                                        width: imgSize['width'], height: imgSize['height'], position: "absolute",
                                        left: clamp(window.innerWidth*(this.getVal(entity.x) * posFactor),0,gameboard['size']['width']),
                                        top: clamp(window.innerHeight*(this.getVal(entity.y) * posFactor),0,gameboard['size']['height'])
                                    }}
                                    src={this.getVal(entity.img)}
                                    alt="loading..."
                                />
                            </div>
                        )
                    }
                </div>
            </Col>
            <Col>
                <StateMap gameState={this.state.gameState}/>
            </Col>

        </Row>)
    }
}
GameEngine.propTypes = {
    program: PropTypes.any.isRequired,
    toggle: PropTypes.bool.isRequired,
    updater: PropTypes.func.isRequired
}
