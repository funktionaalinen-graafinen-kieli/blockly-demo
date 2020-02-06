import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import * as log from "loglevel"
import {id, frameTime} from "./utils"
import GameEngine from "./game_engine"
import EvalFunc from "../Lang/eval"
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
    "events": {
        "frameTime": ["packF(id)", 16],
        "time": ["pack(add(get('time'))(get('frameTime')))", 0],
        "everySecond": ["packF(timer)", [false, 0, 1000]],
        "width": ["packF(id)", 450]
    }
}

`

log.setLevel("trace")
export default function Main(props) {
    const [codeInput, setCodeInput] = useState(dogeRace)
    const [code, setCode] = useState(null)
    const [state, setState] = useState(null)

    const iterate = (state) => {
        if(!state) return null
        const table = []
        state.forEach((value,key,map)=>{
            table.push(<p>{key} => {value}</p>)
        })
        return table
    }

    return(
        <Container fluid>
            <Row>
                <Col>
                    {code && <GameEngine
                        objectList={EvalFunc(code)}
                        setState={(i)=>setState(i)}
                    />}
                </Col>
                <Col>
                    <textarea value={codeInput} onChange={(i)=>setCodeInput(i.target.value)} style={{width:500, height: 750}} />
                    <button onClick={()=>code ? setCode(null) : setCode(codeInput)}>{code ? "stop" : "run"}</button>
                </Col>
                <Col style={{backgroundColor:"orange"}}>
                    <p>State</p>
                    {iterate(state)}
                </Col>
            </Row>
        </Container>
    )
}
