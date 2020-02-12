import React from "react"
import * as log from "loglevel"
import GameEngine from "./game_engine"
import EvalFunc from "../Lang/eval_func"
import {Container, Row, Col} from "react-bootstrap"

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

const cellStyle = {
    width: "500px",
    height: "500px"
}
log.setLevel("trace")

const renderGame = (codefunction, updateFunction) => {
    return <>
        {codefunction() && <GameEngine
            objectList={EvalFunc(codefunction())}
            setState={updateFunction}
        />}
    </>
}

const renderStateMap = (state) => {
    if(!state) return null
    const table = []
    state.forEach((value,key)=>{
        table.push(<p>{key} => {value}</p>)
    })
    return table
}

export default class EngineMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codeInput: dogeRace,
            editor: this.props.editor,
            state: null
        }
    }

    render() {
        const {gameState} = this.state
        const codeFunction = () => {
            log.debug(this.state.editor)
            if (this.state.editor.code) {
                return this.state.editor.code
            } else {
                return ""
            }
        }
        const currentCode = codeFunction()
        return(
            <Container fluid>
                <Row>
                    <Col style={cellStyle}>
                        {this.props.editor}
                    </Col>
                </Row>
                <Row>
                    <Col style={cellStyle}> {
                        renderGame(codeFunction,
                        // React complained the amount of updates
                        (i) => { if (Math.random() < .1) this.setState({gameState: i}) }
                        )}
                    </Col>
                    <Col style={cellStyle}>
                        <button onClick={()=>currentCode ? this.setState({code:null}) : this.setState({code:currentCode})}>{currentCode ? "stop" : "run"}</button>
                    </Col>
                    <Col style={cellStyle}>
                        <div style={{background: "orange"}}>
                        <p>State</p>
                        { renderStateMap(gameState) }
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
