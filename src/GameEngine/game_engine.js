import React, {useEffect, useState} from "react"
import * as log from "loglevel"
import Entity from "./Entity.js"

const frameTime = 1000 / 60 // 60fps

export default function GameEngine() {
    const [state, setState] = useState(new Map())
    const updateState = (k,v) => {
        setState(state.set(k,[v[0], applyF(k,state)]))
    }

    let getVal = name => state.get(name)[1]

    const timer = (x,s) => {
        if(getVal("time") - x[1] >= x[2]){
            return [true,getVal("time"),x[2]]
        } else{
            return [false,x[1],x[2]]
        }
    }

    let id = (x, s) => x
  
    state.set("frameTime",[id,frameTime])
    state.set("time",[(x,s) => {
        return x+s.get("frameTime")[1]},0])
    state.set("everySecond",[timer,[false,0,1000]])
  
    const entity = new Entity("e", state, [
        [
            "x",
            [(x, s) => (s.get("everySecond")[1][0] ? x + 1 : x), 1]
        ],
        ["y", [id, 1]],
        ["img", [id, "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg"]]
    ])
  
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
  
    function applyF(key,state) {
        //store the pair
        let p = state.get(key)
  
        // apply the function to its value
        return p[0](p[1],state)
    }
  
    async function run() {
        while (true) {
            // console.warn("x:",getVal(entity.x))
            // iterates through all key-value pairs in state
            for (let [key, value] of state) {
                //console.log(key + ' = ' + value[1]); // for testing
                // puts the new pair into nextState
                updateState(key,value)
            }
            await sleep(frameTime)
            //await sleep(100); //for testing
        }
    }

    console.warn("x:",getVal(entity.x))
  
    useEffect(()=>{
        run()
    },[])

    return (
        <div>
            <img style={{width: 500, height: 500, backgroundColor: "red", position:"absolute", left:0, top:0}}/>
            <img
                style={{width: 20, height: 20, position:"absolute", left: getVal(entity.x), top: getVal(entity.y)}}
                src={getVal(entity.img)}
            />
        </div>
    )
}
